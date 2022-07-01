<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入项目名称"
            style="width: 200px"
            @keyup.enter.native="getItemInfo()"
          />
          <Select
            v-model="query.valid"
            style="width: 160px; margin-left: 10px"
            placeholder="请选择状态"
          >
            <Option
              v-for="item in validList"
              :value="item.valid"
              :key="item.valid"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getItemInfo()"
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
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="天猫商品编号" prop="otherAppItemId" key="otherAppItemId">
          <Input
            v-model="form.otherAppItemId"
            style="width: 100%"
            placeholder="请输入天猫商品编号"
          ></Input>
        </FormItem>
        <FormItem label="项目名称" prop="name" key="name">
          <Input v-model="form.name" placeholder="请输入项目名称"></Input>
        </FormItem>
        <FormItem label="科室" prop="hospitalDepartmentId">
          <Select v-model="form.hospitalDepartmentId" placeholder="请选择科室" filterable>
            <Option
              v-for="item in AmiyaHospitalDepartmentList"
              :value="item.id"
              :key="item.id"
              >{{ item.departmentName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="缩略图" prop="thumbPicUrl" key="thumbPicUrl">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <FormItem label="售价" prop="salePrice" key="salePrice">
          <InputNumber
            :min="1"
            v-model="form.salePrice"
            style="width: 100%"
            placeholder="请输入项目售价"
          ></InputNumber>
        </FormItem>
        <FormItem label="直播价" prop="livePrice" key="livePrice">
          <InputNumber
            :min="1"
            v-model="form.livePrice"
            style="width: 100%"
            placeholder="请输入直播价"
          ></InputNumber>
        </FormItem>
        <FormItem label="是否限购" prop="isLimitBuy" key="isLimitBuy">
          <i-switch v-model="form.isLimitBuy" />
        </FormItem>
        <FormItem label="限购数量" prop="limitBuyQuantity" v-if="form.isLimitBuy" key="limitBuyQuantity">
          <InputNumber
            :min="1"
            v-model="form.limitBuyQuantity"
            style="width: 100%"
            placeholder="请输入限购数量"
          ></InputNumber>
        </FormItem>
        <FormItem label="项目简介" prop="description" key="description">
          <Input
            type="textarea"
            :autosize="true"
            v-model="form.description"
            placeholder="请输入项目简介"
          ></Input>
        </FormItem>
        <FormItem label="项目规格" prop="standard" key="standard">
          <Input v-model="form.standard" placeholder="请输入项目规格"></Input>
        </FormItem>
        <!-- <FormItem label="治疗部位" prop="parts" key="parts">
          <Input v-model="form.parts" placeholder="请输入治疗部位"></Input>
        </FormItem> -->
        <FormItem label="承诺" prop="commitment" key="commitment">
          <Input v-model="form.commitment" placeholder="请输入承诺"></Input>
        </FormItem>
        <FormItem label="预约须知" prop="appointmentNotice" key="appointmentNotice">
          <Input
            v-model="form.appointmentNotice"
            placeholder="请输入预约须知"
          ></Input>
        </FormItem>
        <FormItem label="是否有效" prop="valid" v-show="isEdit === true" key="valid">
          <i-switch v-model="form.valid" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/itemManage";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  data() {
    return {
      // 获取科室列表（下拉框）
      AmiyaHospitalDepartmentList:[],
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      validList:[{
          valid:'true',
          name:'有效'
        },{
          valid:'false',
          name:'无效'
        }],
      // 查询
      query: {
        valid:'true',
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "天猫商品编号",
            key: "otherAppItemId",
            minWidth: 150,
          },
          {
            title: "项目名称",
            key: "name",
            minWidth: 250,
          },
          {
            title: "科室",
            key: "departmentName",
            minWidth: 100,
          },
          {
            title: "缩略图",
            key: "thumbPicUrl",
            align: "center",
            minWidth: 100,
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
                    src: params.row.thumbPicUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "售价",
            key: "salePrice",
            minWidth: 100,
          },
          {
            title: "直播价",
            key: "livePrice",
            minWidth: 100,
          },
          {
            title: "简介",
            key: "description",
            minWidth: 200,
          },
          {
            title: "规格",
            key: "standard",
            minWidth: 100,
          },
          // {
          //   title: "部位",
          //   key: "parts",
          //   minWidth: 100,
          // },
          {
            title: "是否限购",
            key: "isLimitBuy",
            minWidth: 100,
            render: (h, params) => {
              if (params.row.isLimitBuy == true) {
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
            title: "限购数量",
            key: "limitBuyQuantity",
            minWidth: 100,
          },
          {
            title: "承诺",
            key: "commitment",
            minWidth: 200,
          },
          {
            title: "保障",
            key: "guarantee",
            minWidth: 200,
          },
          {
            title: "预约须知",
            key: "appointmentNotice",
            minWidth: 200,
          },
          {
            title: "创建时间",
            key: "createDate",
            minWidth: 110,
            render: (h, params) => {
              params.row.createDate = params.row.createDate
                ? params.row.createDate.substr(0, 10)
                : "";
              return h("div", {}, params.row.createDate);
            },
          },
          {
            title: "创建人",
            key: "createName",
            minWidth: 100,
          },
          {
            title: "修改时间",
            key: "updateDate",
            minWidth: 110,
            render: (h, params) => {
              params.row.updateDate = params.row.updateDate
                ? params.row.updateDate.substr(0, 10)
                : "";
              return h("div", {}, params.row.updateDate);
            },
          },
          {
            title: "修改人",
            key: "updateName",
            minWidth: 100,
          },
          {
            title: "是否有效",
            key: "valid",
            minWidth: 100,
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
            width: 150,
            align: "center",
            fixed: "right",
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
                        api.byIdGetItemInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            this.form = res.data.itemInfo;
                            this.uploadObj.uploadList = [this.form.thumbPicUrl];
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
                            api.deleteItemInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getItemInfo();
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

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 对应天猫的商品编号
        otherAppItemId: null,
        // 项目名称
        name: "",
        // 科室
        hospitalDepartmentId:'',
        // 缩略图
        thumbPicUrl: "",
        // 售价
        salePrice: null,
        // 直播价
        livePrice: null,
        // 是否限购
        isLimitBuy: false,
        // 限购数量
        limitBuyQuantity: null,
        // 项目简介
        description: "",
        // 项目规格
        standard: "",
        // 治疗部位
        parts: "",
        // 承诺
        commitment: "",
        // 保障
        guarantee: "",
        // 预约须知
        appointmentNotice: "",
        id: "",
        // 是否有效
        valid: false,
      },

      ruleValidate: {
        otherAppItemId: [
          {
            required: true,
            message: "请输入天猫商品编号",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入项目名称",
          },
        ],
        thumbPicUrl: [
          {
            required: true,
            message: "请上传缩略图",
          },
        ],
        salePrice: [
          {
            required: true,
            message: "请输入售价",
          },
        ],
        limitBuyQuantity: [
          {
            required: true,
            message: "请输入限购数量",
          },
        ],
        // description: [
        //   {
        //     required: true,
        //     message: "请输入项目简介",
        //   },
        // ],
        standard: [
          {
            required: true,
            message: "请输入项目规格",
          },
        ],
        // parts: [
        //   {
        //     required: true,
        //     message: "请输入治疗部位",
        //   },
        // ],
        hospitalDepartmentId: [
          {
            required: true,
            message: "请选择科室",
          },
        ],
      },
    };
  },
  methods: {
    // 获取医院科室
    getDepartmentList(){
      api.getDepartment().then((res) => {
        if(res.code === 0){
          const {AmiyaHospitalDepartmentList} = res.data
          this.AmiyaHospitalDepartmentList = AmiyaHospitalDepartmentList
        }
      })
    },
    // 获取项目列表
    getItemInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize,valid } = this.query;
      const data = { keyword, pageNum, pageSize ,valid};
      api.ItemInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.itemInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取项目列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize,valid } = this.query;
      const data = { keyword, pageNum, pageSize,valid };
      api.ItemInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.itemInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 图片
    handleUploadChange(values) {
      this.form.thumbPicUrl = values[0];
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            api.updateItemInfo(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getItemInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            // 添加
            const { id, valid, ...data } = this.form;
            api.addItemInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getItemInfo();
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
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getItemInfo();
    this.getDepartmentList()
  },
  watch:{
    'form.isLimitBuy'(newVal){
      if(!newVal) {
        this.$nextTick(()=>{
          this.form.limitBuyQuantity = null;
        })
      }
    }
  }
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
