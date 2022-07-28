<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px;"
            @keyup.enter.native="getAnchor()"
          />
          <Select v-model="query.valid" style="width: 200px; margin-left: 10px">
            <Option
              v-for="item in query.validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAnchor()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>

    <Modal
      v-model="controlModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1100"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="80"
      >
        <Row :gutter="30">
          <Col span="12">
            <FormItem label="主播名称" prop="liveAnchorName">
              <Input v-model="form.liveAnchorName" placeholder="请输入主播名称"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="昵称" prop="nickName">
              <Input v-model="form.nickName"  placeholder="请输入昵称"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="12">
            <FormItem label="个性签名" prop="individualitySignature">
              <Input v-model="form.individualitySignature" type="textarea" :rows="3"  placeholder="请输入个性签名"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="简介" prop="description">
              <Input v-model="form.description"  type="textarea" :rows="3"  placeholder="请输入简介"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          
          <Col span="13">
            <FormItem label="上传合同" prop="contractUrl">
              <uploadFile
                :uploadObj="uploadFileObj"
                @uploadChange="handleUploadFileChange"
                ref="uploadFile"
              />
              <div style="color:red;margin-right:5px">
                *注：该文件只支持pdf格式<span
                  style="margin-left:10px;color:#2d8cf0;cursor: pointer;"
                  @click="jumpHtml"
                  >请点击进入在线转换地址</span
                >
              </div>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="到期时间" prop="dueTime">
              <DatePicker
                type="date"
                style="width:100%"
                placeholder="请选择到期时间"
                :value="form.dueTime"
                v-model="form.dueTime"
              ></DatePicker>
            </FormItem>
          </Col>
          
          <!-- <Col span="12">
            <FormItem label="合同地址" prop="contractUrl">
              <Input v-model="form.contractUrl"  placeholder="请输入合同地址"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="视频地址" prop="videoUrl">
              <Input v-model="form.videoUrl"  placeholder="请输入视频地址"></Input>
            </FormItem>
          </Col> -->
        </Row>
        <Row :gutter="30">
          
          <!-- <Col span="12">
            <FormItem label="是否主推" prop="isMain">
              <i-switch v-model="form.isMain" />
            </FormItem>
          </Col> -->
          <Col span="8">
            <FormItem label="头像" prop="thumbPicture">
              <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="详情图" prop="detailPicture">
              <upload :uploadObj="detailUploadObj" @uploadChange="detailHandleUploadChange" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="视频" prop="videoUrl">
              <vedioUpload :uploadObj="videouploadObj" @uploadChange="videouploadObjHandleUploadChange" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          
          
          <Col span="12">
            <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
            <i-switch v-model="form.valid" />
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/liveAnchorBaseInfo";
import upload from "@/components/upload/upload";
import uploadFile from "@/components/upload/uploadFile";
import vedioUpload from "@/components/upload/uploadVedio";
export default {
  components: {
    upload,
    uploadFile,
    vedioUpload
  },
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        valid:'true',
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "主播",
            key: "liveAnchorName",
            width:120
          },
          {
            title: "头像",
            key: "thumbPicture",
            align: "center",
            width:120,
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.thumbPicture,
                  },
                }),
              ]);
            },
          },
          {
            title: "详情图",
            key: "detailPicture",
            align: "center",
            width:'120',
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.detailPicture,
                  },
                }),
              ]);
            },
          },
          {
            title: "昵称",
            key: "nickName",
            width:120
          },
          {
            title: "个性签名",
            key: "individualitySignature",
          },
          {
            title: "简介",
            key: "description",
          },
          
          // {
          //   title: "是否主推",
          //   key: "isMain",
          //   align: "center",
          //   width:100,
          //   render: (h, params) => {
          //     return h(
          //       "i-switch",
          //       {
          //         props: {
          //           value: params.row.isMain,
          //           size: "default",
          //           disabled:
          //             params.row.isMain === true || params.row.isMain === false,
          //         },
          //       },
          //       h("span", { isMain: "open" }, "开"),
          //       h("span", { isMain: "close" }, "关")
          //     );
          //   },
          // },
          {
            title: "是否有效",
            key: "valid",
            width:100,
            align:'center',
            render: (h, params) => {
              if (params.row.valid == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "操作",
            key: "",
            width: 300,
            align:'center',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        api.byIdGetLiveAnchorBaseInfoInfo(id).then((res) => {
                          if (res.code === 0) {
                            if (res.data.liveAnchorBaseInfo.videoUrl) {
                              window.open(res.data.liveAnchorBaseInfo.videoUrl);
                            } else {
                              this.$Message.error("暂无视频");
                            }
                          }
                        });
                      },
                    },
                  },
                  "查看视频"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        api.byIdGetLiveAnchorBaseInfoInfo(id).then((res) => {
                          if (res.code === 0) {
                            if (res.data.liveAnchorBaseInfo.contractUrl) {
                              window.open(res.data.liveAnchorBaseInfo.contractUrl);
                            } else {
                              this.$Message.error("暂无上传合同");
                            }
                          }
                        });
                      },
                    },
                  },
                  "预览合同"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdGetLiveAnchorBaseInfoInfo(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              valid,
                              id,
                              contractUrl,
                              description,
                              detailPicture,
                              dueTime,
                              individualitySignature,
                              isMain,
                              liveAnchorName,
                              nickName,
                              videoUrl,
                              thumbPicture,
                            } = res.data.liveAnchorBaseInfo;
                            this.isEdit = true;
                            this.form.valid = valid;
                            this.form.description = description;
                            this.form.detailPicture = detailPicture;
                            this.detailUploadObj.uploadList = [this.form.detailPicture];
                            this.form.contractUrl = contractUrl;
                            this.form.dueTime = dueTime ? this.$moment(new Date(dueTime)).format("YYYY-MM-DD") : null;
                            this.form.individualitySignature = individualitySignature;
                            this.form.isMain = isMain;
                            this.form.liveAnchorName = liveAnchorName;
                            this.form.nickName = nickName;
                            this.form.thumbPicture = thumbPicture;
                            this.uploadObj.uploadList = [this.form.thumbPicture];
                            this.form.videoUrl = videoUrl;
                            this.videouploadObj.uploadList = [this.form.videoUrl]
                            this.uploadFileObj.uploadList = this.form.contractUrl ? [this.form.contractUrl] : [];
                            this.form.id = id;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteLiveAnchorBaseInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getAnchor();
                                this.$Message.success({
                                  content: "删除成功",
                                  duration: 3,
                                });
                              }
                            });
                          },
                          onCancel: () => {},
                        });
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
        validList:[
          {
            type:'true',
            name:'有效'
          },
          {
            type:'false',
            name:'无效'
          }
        ]
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      detailUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 上传文件
      uploadFileObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
        // 文件名称
        uploadListName: [],
      },
      videouploadObj: {
        // 是否开启多个视频
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 接收子组件的文件名称
      uploadFileName: [],
      form: {
        // 是否有效
        valid: false,
        id:"",
        // 主播名称
        liveAnchorName:'',
        // 头像
        thumbPicture:'',
        // 昵称
        nickName:'',
        // 个性签名
        individualitySignature:'',
        // 简介
        description:'',
        // 详情图
        detailPicture:'',
        // 合同地址
        contractUrl:'',
        // 视频地址
        videoUrl:'',
        // 到期时间
        dueTime:'',
        // 是否主推
        isMain:0
      },

      ruleValidate: {
        liveAnchorName: [
          {
            required: true,
            message: "请输入主播名称",
          },
        ],
        nickName: [
          {
            required: true,
            message: "请输入昵称",
          },
        ],
        individualitySignature: [
          {
            required: true,
            message: "请输入个性签名",
          },
        ],
        dueTime: [
          {
            required: true,
            message: "请选择到期时间",
          },
        ],
        // contractUrl: [
        //   {
        //     required: true,
        //     message: "请输入合同地址",
        //   },
        // ],
        videoUrl: [
          {
            required: true,
            message: "请输入视频地址",
          },
        ],

        thumbPicture: [
          {
            required: true,
            message: "请上传头像",
          },
        ],
        detailPicture: [
          {
            required: true,
            message: "请上传详情图",
          },
        ],
      },
    };
  },
  methods: {
    // 视频
    videouploadObjHandleUploadChange(values){
      this.form.videoUrl = values[0];
    },
    // PDF转换地址
    jumpHtml() {
      window.open("https://smallpdf.com/cn/word-to-pdf");
    },
    // 上传文件
    handleUploadFileChange(values, uploadListName) {
      this.form.contractUrl = values[0];
      this.uploadFileName = uploadListName;
    },
    // 图片
    handleUploadChange(values) {
      this.form.thumbPicture = values[0];
    },
    detailHandleUploadChange(values) {
      this.form.detailPicture = values[0];
    },
    // 获取物流公司列表
    getAnchor() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,valid} = this.query;
      const data = { pageNum, pageSize ,keyword,valid };
      api.getLiveAnchorBaseInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchorBaseInfos;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取物流公司列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,valid} = this.query;
        const data = { pageNum, pageSize ,keyword,valid };
        api.getLiveAnchorBaseInfo(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.liveAnchorBaseInfos;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const { liveAnchorName, nickName, thumbPicture ,individualitySignature,description,detailPicture,contractUrl,videoUrl,dueTime,isMain ,id,valid} = this.form;
            const  data = { 
              id,
              valid,
              liveAnchorName ,
              nickName,
              thumbPicture ,
              individualitySignature,
              description,
              detailPicture,
              contractUrl,
              videoUrl,
              dueTime:dueTime ? this.$moment(new Date(dueTime)).format("YYYY-MM-DD") : null,
              isMain
            } 
            // 修改
            api.editLiveAnchorBaseInfo(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getAnchor();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { liveAnchorName, nickName, thumbPicture ,individualitySignature,description,detailPicture,contractUrl,videoUrl,dueTime,isMain } = this.form;
            const  data = { 
              liveAnchorName ,
              nickName,
              thumbPicture ,
              individualitySignature,
              description,
              detailPicture,
              contractUrl,
              videoUrl,
              dueTime:dueTime ? this.$moment(new Date(dueTime)).format("YYYY-MM-DD") : null,
              isMain
            } 
            // 添加
            api.addLiveAnchorBaseInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getAnchor();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              }
            });
          }
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.detailUploadObj.uploadList = [];
      this.uploadFileObj.uploadList = [];
       this.videouploadObj.uploadList = []
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.uploadObj.uploadList = [];
        this.detailUploadObj.uploadList = [];
        this.uploadFileObj.uploadList = [];
        this.videouploadObj.uploadList = []
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getAnchor();
    // this.getLogisticsCompanyList()
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>