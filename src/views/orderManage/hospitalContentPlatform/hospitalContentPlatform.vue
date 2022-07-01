<template>
  <div>
    <Card>
      <div>
        <DatePicker
          type="date"
          placeholder="开始日期"
          style="width: 200px"
          :value="query.startDate"
          v-model="query.startDate"
          transfer
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="结束日期"
          style="width: 200px; margin-left: 10px"
          :value="query.endDate"
          v-model="query.endDate"
          transfer
        ></DatePicker>
        <Input
          v-model="query.keyword"
          placeholder="请输入商品名称或订单号"
          style="width: 200px; margin: 0 10px"
          @keyup.enter.native="getHospitalContentList()"
        />
        <Button type="primary" @click="getHospitalContentList()">查询</Button>
      </div>
      <div style="margin-top: 10px">
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="pages">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handleProjectPageChange"
        />
      </div>
    </Card>
    <Modal v-model="controlModal" title="确认" :mask-closable="false" @on-visible-change="handleModalVisibleChange">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="是否成交" prop="isFinish" key="是否成交">
          <i-switch v-model="form.isFinish" />
        </FormItem>
        <FormItem label="未成交原因" prop="unDealReason" v-if="form.isFinish !== true" key="未成交原因">
          <Input
            v-model="form.unDealReason"
            placeholder="请输入未成交原因"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="成交金额" v-if="form.isFinish === true" prop="dealAmount" key="成交金额">
          <Input
            v-model="form.dealAmount"
            placeholder="请输入成交金额"
            type="number"
          ></Input>
        </FormItem>
        <FormItem label="后期项目铺垫"  v-if="form.isFinish === true" key="后期项目铺垫">
          <Input
            v-model="form.lastProjectStage"
            placeholder="请输入后期项目铺垫"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="成交凭证" key="成交凭证" v-if="form.isFinish === true">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
    <Modal v-model="imgControlModal" title="重单退回" :mask-closable="false" @on-visible-change="handleModalVisibleChange">
      <Form
        ref="imgForm"
        :model="imgForm"
        :rules="dealRuleValidate"
        label-position="left"
        :label-width="130"
      >
       
        <FormItem label="重单截图" key="重单截图" prop="repeatePictureUrl">
          <upload :uploadObj="delUploadObj" @uploadChange="dealHandleUploadChange" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel('imgForm')">取消</Button>
        <Button type="primary" @click="dealSubmit('imgForm')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import logoMin from "@/assets/images/logo_min.png"
import messageBoard from "@/components/messageBoard/messageBoard.vue"
import upload from "@/components/upload/upload";
export default {
  props: ["activeName"],
  components: {
    messageBoard,
    upload
  },
  data() {
    return {
      logoMin,
      controlModal:false,
      imgControlModal:false,
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      delUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      form:{
        id:null,
        // 是否成交
        isFinish:false,
        // 成交金额
        dealAmount:null,
        //后期铺垫  
        lastProjectStage:"",
        // 成交凭证
        dealPictureUrl:"",
        // 未成交原因
        unDealReason:""

      },
      imgForm:{
          id:"",
          orderId:"",
          repeatePictureUrl:""
      },
      query: {
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            title: "订单编号",
            key: "orderId",
            minWidth: 200,
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                params.row.appointmentDate === '未确定时间' ? '未确定时间' : this.$moment(params.row.appointmentDate).format("YYYY-MM-DD HH:mm:ss") 
              );
            },
          },
          {
            title: "项目",
            key: "thumbPicUrl",
            minWidth: 300,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                  style: {
                    display: "flex",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },
          {
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 400,
          },
          {
            title: "订单状态",
            key: "orderStatus",
            minWidth: 200,
          },
          {
            title: "定金金额",
            key: "depositAmount",
            minWidth: 200,
          },
          {
            title: "成交金额",
            key: "dealAmount",
            minWidth: 200,
          },
          {
            title: "成交凭证",
            key: "dealPictureUrl",
            minWidth: 200,
            render: (h, params) => {
              return params.row.dealPictureUrl ? h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                  style: {
                    display: "flex",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.dealPictureUrl,
                    },
                  }),
                ]
              ) : "";
            },
          },
          {
            title: "派单时间",
            key: "sendDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                params.row.sendDate ? this.$moment(params.row.sendDate).format("YYYY-MM-DD HH:mm:ss") :""
              );
            },
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 180,
            render: (h, params) => {
              const employeeType = window.sessionStorage.getItem(
                "employeeType"
              );
              if (employeeType === "hospitalEmployee") {
                return h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                    },
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          marginRight: "10px",
                        },
                      },
                      params.row.phone
                    ),
                    h("span", {
                      style: {
                        color: "#2d8cf0",
                        fontSize: "20px",
                      },
                      class: !params.row.bool
                        ? "iconfont icon-biyan"
                        : "iconfont icon-see",
                      on: {
                        click: () => {
                          if (params.row.bool) return;
                          const { orderId } = params.row;
                          const data = {
                            orderId,
                          };
                          api.contentPlatformPhone(data).then((res) => {
                            if (res.code === 0) {
                              params.row.phone = res.data.phone;
                              params.row.bool = true;
                            }
                          });
                        },
                      },
                    }),
                  ]
                );
              }
            },
          },
          {
            title: "未成交原因",
            key: "unDealReason",
            minWidth: 200,
          },
          {
            title: "后期项目铺垫",
            key: "lateProjectStage",
            minWidth: 400,
          },
          {
            title: "订单备注",
            key: "orderRemark",
            minWidth: 400,
          },
          {
            title: "派单留言",
            key: "sendOrderRemark",
            minWidth: 400,
          },
          {
            title: "操作",
            width: 200,
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
                      disabled: params.row.orderStatus =='未成交' || params.row.orderStatus =='已成交',
                    },
                    
                    on: {
                      click: () => {
                        const {id,orderId} = params.row;
                        this.controlModal = true
                        this.form.id = orderId
                      },
                    },
                  },
                  "确认"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.orderStatus =='未成交' || params.row.orderStatus =='已成交',
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const {id,orderId} = params.row;
                        this.imgForm.id = id
                        this.imgForm.orderId = orderId
                        this.imgControlModal = true
                      },
                    },
                  },
                  "重单退回"
                ),
              ]);
            },
          },
        ],
        data: [],
      },

      // 控制 modal
      controlModal: false,

      ruleValidate: {
        unDealReason: [
          {
            required: true,
            message: "请输入未成交原因",
            trigger: 'blur'
          },
        ],
        dealAmount: [
          {
            required: true,
            message: "请输入成交金额",
            trigger: 'blur'
          },
        ],
       
      },
      dealRuleValidate:{
          repeatePictureUrl: [
          {
            required: true,
            message: "请上传重单截图",
          },
        ],
      },
      // 客户信息组件参数 留言板
      messageBoardParams: {
        hospitalId: 0,
        id: 0,
        content: "",
        messageBoard:false
      },
    };
  },
  methods: {
    // 图片
    handleUploadChange(values) {
      this.form.dealPictureUrl = values[0];
    },
    // 图片
    dealHandleUploadChange(values) {
      this.imgForm.repeatePictureUrl = values[0];
    },
    // 医院获取派单信息
    getHospitalContentList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { startDate, endDate, keyword, pageNum, pageSize } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        pageNum,
        pageSize,
      };
      api.getHospitalContentPlateFormOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 医院获取派单信息分页
    handleProjectPageChange(pageNum) {
      const { startDate, endDate, keyword, pageSize } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        pageNum,
        pageSize,
      };
      api.getHospitalContentPlateFormOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 确认
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            const {id,isFinish,dealAmount,lastProjectStage,dealPictureUrl,unDealReason} = this.form
            const data ={
                id,
                isFinish,
                dealAmount  : isFinish==true ? dealAmount : 0,
                lastProjectStage : isFinish==true ? lastProjectStage : "",
                dealPictureUrl : isFinish==true ? dealPictureUrl : "",
                unDealReason : isFinish==true ? "" : unDealReason
            }
          api.finishContentPlateFormOrder(data).then((res) => {
            if (res.code === 0) {
              this.cancel("form");
              this.getHospitalContentList();
              this.$Message.success({
                content: "确认成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 重单退回
    dealSubmit(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                const {id,repeatePictureUrl,orderId} = this.imgForm
                const data = {
                    id,
                    orderId,
                    repeatePictureUrl
                }
                api.contentPlateFormOrderRepeate(data).then((res) => {
                    if (res.code === 0) {
                        this.cancel("imgForm");
                        this.getHospitalContentList();
                        this.$Message.success({
                            content: "确认成功",
                            duration: 3,
                        });
                    }
                });
            }
        })
    },

    // 取消
    cancel(name) {
      this.controlModal = false;
      this.imgControlModal = false
      this.uploadObj.uploadList = [];
      this.delUploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },
   
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
        this.cancel("imgForm")
      }
    },
  },
  created() {
    // this.getHospitalContentList();
  },
   watch:{
    activeName: {
      handler(value) {
        if (value === "hospitalContentPlatform") {
            this.getHospitalContentList();
        }
      },
      immediate: true,
    },
  }
};
</script>
<style lang="less" scoped>
.pages {
  margin-top: 16px;
  text-align: right;
}
.con {
  margin-bottom: 30px;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 24px;
    }
    .name {
      margin-right: 50px;
    }
  }
  .item-message {
    margin-left: 9%;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
