
<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入日记名称"
            style="width: 200px"
            @keyup.enter.native="getDiaryInfo()"
          />
          <Select
            v-model="query.isReleased"
            placeholder="请选择发布状态"
            style="width: 200px;margin-left: 10px"
          >
            <Option
              v-for="item in releaseStateList"
              :value="item.isReleased"
              :key="item.isReleased"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getDiaryInfo()"
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
      width="1000"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="封面标题" prop="coverTitle" >
          <Input v-model="form.coverTitle" placeholder="请输入封面标题"></Input>
        </FormItem>
        <FormItem label="详情标题" prop="detailsTitle">
          <Input v-model="form.detailsTitle" placeholder="请输入详情标题"></Input>
        </FormItem>
        
        <FormItem label="标签" prop="tagIds" style="width:965px;">
          <div style="display:flex;">
          <Select
            v-model="form.tagIds"
            placeholder="请选择标签"
            filterable
            multiple
          >
            <Option
              v-for="item in tagList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button type="primary" style="margin-left:50px" 
          @click="
              labelcontrolModal = true;
            ">添加标签</Button>
          </div>
        </FormItem>
        <Row :gutter="30">
          <Col span="9">
            <FormItem :label="viewslabel" prop="views">
              <Input v-model="form.views" placeholder="请输入初始浏览量" type="number"></Input>
            </FormItem>
          </Col>
          <Col span="9">
            <FormItem :label="likelabel" prop="givingLikes">
              <Input v-model="form.givingLikes" placeholder="请输入初始点赞量"  type="number"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem label="是否发布" prop="releaseState">
              <i-switch v-model="form.releaseState"/>
            </FormItem>
          </Col>
         </Row>
         <Row :gutter="30">
          <Col span="8">
            <FormItem label="封面图" prop="thumbPictureUrl">
              <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="轮播图" prop="bannerImage">
              <upload :uploadObj="bannerUploadObj" @uploadChange="handleBannerUploadObj" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="视频" prop="videoUrl">
              <vedioUpload :uploadObj="videouploadObj" @uploadChange="videouploadObjHandleUploadChange" />
            </FormItem>
          </Col>
         </Row>
          <FormItem>
           <div>封面图（宽：750 ，高：400，大小：5M） ； 轮播图 （宽：750 ，高：1000 大小：5M）；  视频 （宽：750 ，高：1000 ，大小：10M）</div>
          </FormItem>
          <FormItem label="日记详情" prop="detailsDescription">
            <editor v-model="form.detailsDescription" ref="editor"></editor>
          </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="labelcontrolModal"
      :title="title"
      :mask-closable="false"
      width="1000"
      @on-visible-change="labelhandleModalVisibleChange"
    >
      <Form
        ref="labelform"
        :model="labelform"
        :rules="labelValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="标签名称" prop="name">
          <Input v-model="labelform.name" placeholder="请输入标签名称"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="labelcancelSubmit('labelform')">取消</Button>
        <Button type="primary" @click="labelHandleSubmit('labelform')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/beautifulDiary";
import upload from "@/components/upload/upload";
import vedioUpload from "@/components/upload/uploadVedio";
import editor from "@/components/editor/editor";
export default {
  components: {
    upload,
    editor,
    vedioUpload
  },
  data() {
    return {
        viewslabel:'初始浏览量',
        likelabel:'初始点赞量',
        releaseStateList : [
            {
                isReleased:-1,
                name:'全部状态'
            },
            {
                isReleased:1,
                name:'已发布'
            },
            {
                isReleased:2,
                name:'未发布'
            }
        ],
      // 标签数据
      tagList:[],
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      bannerUploadObj: {
        // 是否开启多图
        multiple: true,
        // 图片个数
        length: 10,
        // 文件列表
        uploadList: [],
      },
      videouploadObj: {
        // 是否开启多个视频
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },

      // 查询
      query: {
        isReleased:-1,
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "封面标题",
            key: "coverTitle",
          },
          {
            title: "详情标题",
            key: "detailsTitle",
          },
          {
            title: "封面图",
            key: "thumbPictureUrl",
            align: "center",
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
                    src: params.row.thumbPictureUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "发布状态",
            align: "center",
            width:150,
            
            render :(h , params)=> {
                return h(
                    "i-switch",{
                    props: {
                    value: params.row.releaseState,
                    size:"default",
                    },
                    on : {
                      "on-change" : (value) => {
                          if(value===true){
                              this.form.releaseState = true
                              this.editStatus(params.row.id,true,()=>{
                                this.getDiaryInfo()
                              })
                          }else{
                              this.form.releaseState = false
                              this.editStatus(params.row.id,false,()=>{
                                this.getDiaryInfo()
                              })
                          }
                          
                      }
                    }
                },
                h("span", {releaseState: "open"},"开"),
                h("span", {releaseState: "close"},"关")
              )
            }
          },
          {
            title: "添加时间",
            key: "createDate",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "操作",
            key: "",
            width: 150,
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
                        this.title = "修改";
                        api.byIdBeauty(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            const { bannerImage,beautyDiaryTagName,coverTitle,createDate,detailsDescription,detailsTitle,givingLikes,id,releaseState,thumbPictureUrl,videoUrl,views} = res.data.beautyDiaryManage
                            this.form = {
                                tagIds:beautyDiaryTagName,
                                coverTitle,
                                detailsTitle,
                                releaseState,
                                views,
                                givingLikes,
                                thumbPictureUrl,
                                videoUrl,
                                detailsDescription,
                                bannerImage,
                                id
                            };
                            this.uploadObj.uploadList = [this.form.thumbPictureUrl];
                            this.form.bannerImage = this.form.bannerImage.map(
                             (item) => item.picUrl
                            );
                            // 回显轮播图
                            this.bannerUploadObj.uploadList = this.form.bannerImage
                            this.videouploadObj.uploadList = this.form.videoUrl ? [this.form.videoUrl] : [];
                            this.form.tagIds = this.form.tagIds.map(
                             (item) => item.id
                            );
                            this.likelabel = '点赞量'
                            this.viewslabel = '浏览量'
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
                            api.deleteBeauty(id).then((res) => {
                              if (res.code === 0) {
                                this.getDiaryInfo();
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
      },

      // 控制 modal
      controlModal: false,
      labelcontrolModal:false,
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,


      form: {
        id:"",
        // 封面标题
        coverTitle:"",
        // 详情标题
        detailsTitle:"",
        // 发布状态
        releaseState:true,
        // 初始浏览量
        views:"",
        // 初始点赞量
        givingLikes:"",
        // 封面图片
        thumbPictureUrl:"",
        // 视频
        videoUrl:"",
        // 日记详情
        detailsDescription:"",
        // 轮播图
        bannerImage:[],
        // 标签
        tagIds:[]
      },
      labelform:{
        name:"",
      },
      labelValidate:{
        name: [
          {
            required: true,
            message: "请输入标签名称",
          },
        ],
      },
      ruleValidate: {
        coverTitle: [
          {
            required: true,
            message: "请输入封面标题",
          },
        ],
        detailsTitle: [
          {
            required: true,
            message: "请输入详情标题",
          },
        ],
        views: [
          {
            required: true,
            message: "请输入浏览量",
          },
        ],
        givingLikes: [
          {
            required: true,
            message: "请输入点赞量",
          },
        ],
        thumbPictureUrl: [
          {
            required: true,
            message: "请上传封面图片",
          },
        ],
        bannerImage: [
          {
            required: true,
            message: "请上传轮播图片",
          },
        ],
        detailsDescription: [
          {
            required: true,
            message: "请输入日记详情",
          },
          {
            validator: (rule, value, callback) => {
                const text = this.$refs.editor.editor.txt.text();
                let replaceText = text.replace(/&nbsp;|\s+/g,''); 
                if(!text || replaceText === '') {
                    callback(new Error("请输入日记详情"));
                } else {
                callback();
                }   
            },
            trigger: "change",
          },
        ],
        
      },
    };
  },
  methods: {
    //   修改是否发布状态
    editStatus(id,releaseState,callback){
        const data = { 
            id,
            releaseState
        }
        api.editUpdateReleaseState(data).then((res) => {
        if (res.code === 0) {
        this.$Message.success({
            content: "已修改成功",
            duration: 3,
        });
        callback && callback()
        }
      });
    },
    // 获取日记标签
    getTagList(){
        api.getnameList().then((res) => {
            if (res.code === 0) {
                const { tagInfo } = res.data;
                this.tagList = tagInfo;
            }
        });
    },
    // 获取日记列表
    getDiaryInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize ,isReleased} = this.query;
      
      const data = { keyword, pageNum, pageSize,
      isReleased :isReleased==-1 ? '' : (isReleased == 1? true : false)
      };
      api.getBeautyDiaryManageList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.beautyDiaryManages;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取日记列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize ,isReleased} = this.query;
      const data = { keyword, pageNum, pageSize ,
      isReleased :isReleased==-1 ? '' : (isReleased == 1? true : false)
      };
      api.getBeautyDiaryManageList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.beautyDiaryManages;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 图片
    handleUploadChange(values) {
      this.form.thumbPictureUrl = values[0];
    },
    handleBannerUploadObj(values){
        this.form.bannerImage = values
    },
    // 视频
    videouploadObjHandleUploadChange(values){
      this.form.videoUrl = values[0];
    },
    // 添加标签确认按钮
    labelHandleSubmit(){
        const data = {
            name:this.labelform.name
        }
        api.addBeautyDiary(data).then((res) => {
            if (res.code === 0) {
                this.labelcancelSubmit()
                this.getTagList()
                this.$Message.success({
                content: "添加成功",
                duration: 3,
                });
            }
        });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            let { coverTitle,detailsTitle,releaseState,views,givingLikes,thumbPictureUrl,videoUrl,detailsDescription,bannerImage,tagIds,id} = this.form;
            const data = {
                coverTitle,detailsTitle,releaseState,thumbPictureUrl,videoUrl,detailsDescription,tagIds,id,
                bannerImage: bannerImage.map((url, index) => {
                return {
                  // 图片地址
                  picUrl: url,
                  // 图片顺序索引
                  displayIndex: index,
                };
              }),
                views:Number(views),
                givingLikes:Number(givingLikes),
                
            }
            // 修改
            api.editBeautiful(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit();
                this.getDiaryInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            let { coverTitle,detailsTitle,releaseState,views,givingLikes,thumbPictureUrl,videoUrl,detailsDescription,bannerImage,tagIds} = this.form;
            const data = {
                coverTitle,detailsTitle,releaseState,thumbPictureUrl,videoUrl,detailsDescription,tagIds,
                bannerImage: bannerImage.map((url, index) => {
                return {
                  // 图片地址
                  picUrl: url,
                  // 图片顺序索引
                  displayIndex: index,
                };
              }),
                views:Number(views),
                givingLikes:Number(givingLikes),
                
            }
            let setReleaseState =  localStorage.setItem("releaseStates",releaseState)
            // 添加
            api.addBeautiful(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit();
                this.getDiaryInfo();
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
    labelcancelSubmit(){
        this.labelcontrolModal = false
    },
    // 取消
    cancelSubmit(name) {
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.bannerUploadObj.uploadList = [];
      this.videouploadObj.uploadList = [];
      this.likelabel = '初始点赞量'
      this.viewslabel = '初始浏览量'
    //   this.$refs[name].resetFields();
    },
    labelhandleModalVisibleChange(value){
        if (!value) {
        this.$refs["labelform"].resetFields();
      }
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.uploadObj.uploadList = [];
        this.bannerUploadObj.uploadList = [];
        this.videouploadObj.uploadList = [];
        this.likelabel = '初始点赞量'
        this.viewslabel = '初始浏览量'
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getDiaryInfo();
    // this.getScaleTagList();
    this.getTagList()
    
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

.ivu-select-dropdown-list,.ivu-select-dropdown{
    height: 163px !important;
}
.left{
    display: flex;
}
</style>
