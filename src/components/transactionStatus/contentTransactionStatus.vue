<template>
  <div class="content">
    <!-- 管理员端成交情况 -->
    <Modal
      title="成交情况"
      footer-hide
      v-model="transactionStatusParams.transactionStatusModel"
      width="85%"
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
        <Table
          border
          :columns="query.columns"
          :data="transactionStatusPage.data"
        ></Table>
        <div class="page">
          <Page
            ref="pages"
            :current="transactionStatusPage.pageNum"
            :page-size="transactionStatusPage.pageSize"
            :total="transactionStatusPage.totalCount"
            show-total
            show-elevator
            @on-change="handlePageChange"
          />
        </div>
        <div class="footer">
          <Button @click="cancel" style="margin-right: 10px">关闭页面</Button>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="editModel"
      title="修改成交情况"
      :mask-closable="false"
      @on-visible-change="handleModalChange"
    >
      <Form
        ref="confirmForm"
        :model="confirmForm"
        :rules="confirmRuleValidate"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="是否到院" prop="isToHospital" key="是否到院">
          <i-switch
            v-model="confirmForm.isToHospital"
            :disabled="confirmForm.isFinish == true"
            @on-change="isToHospitalChange"
          />
        </FormItem>
        <FormItem label="到院类型" prop="toHospitalType" key="到院类型" v-if="confirmForm.isToHospital === true">
          <Select
              v-model="confirmForm.toHospitalType"
              placeholder="请选择到院类型"
              clearable
              filterable
            >
              <Option
                v-for="item in toHospitalTypeList"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select>
        </FormItem>
        <FormItem
          label="到院时间"
          prop="toHospitalDate"
          v-if="confirmForm.isToHospital == true"
          key="到院时间"
        >
          <DatePicker
            type="date"
            placeholder="到院时间"
            style="width: 100%"
            v-model="confirmForm.toHospitalDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="是否陪诊" prop="isAcompanying" key="是否陪诊" v-if="confirmForm.isToHospital === true">
          <i-switch
            v-model="confirmForm.isAcompanying"
          />
        </FormItem>
        <FormItem label="是否成交" prop="isFinish" key="是否成交">
          <i-switch v-model="confirmForm.isFinish" @on-change="switchChange" />
          <!--  @on-change="switchChange"  -->
        </FormItem>
        <FormItem
          label="到院医院"
          prop="lastDealHospitalId"
          key="到院医院"
          v-if="confirmForm.isFinish == true"
        >
          <Select
            v-model="confirmForm.lastDealHospitalId"
            placeholder="请选择到院医院"
            filterable
          >
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem
          label="未成交原因"
          prop="unDealReason"
          v-if="confirmForm.isFinish != true"
          key="未成交原因"
        >
          <Input
            v-model="confirmForm.unDealReason"
            placeholder="请输入未成交原因"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem
          label="未成交截图"
          key="未成交截图"
          v-if="confirmForm.isFinish != true"
        >
          <upload
            :uploadObj="noDealuploadObj"
            @uploadChange="noDealhandleUploadChange"
          />
        </FormItem>
        <FormItem
          label="成交金额"
          v-if="confirmForm.isFinish == true"
          prop="dealAmount"
          key="成交金额"
        >
          <Input
            v-model="confirmForm.dealAmount"
            placeholder="请输入成交金额"
            type="number"
          ></Input>
        </FormItem>
        <FormItem
          label="成交时间"
          prop="DealDate"
          v-if="confirmForm.isFinish == true"
          key="成交时间"
        >
          <DatePicker
            type="date"
            placeholder="成交时间"
            style="width: 100%"
            v-model="confirmForm.DealDate"
          ></DatePicker>
        </FormItem>
        <!-- <FormItem
          label="佣金比例(%)"
          prop="commissionRatio"
          key="佣金比例(%)"
          :rules="[
            {
              required: true,
              message: '佣金比例最小为1，最为为100',
              trigger: 'change',
              type: 'number',
              max: 100,
              min:1
            },
          ]"
          v-if="confirmForm.isFinish === true"
        >
          <Input
            v-model="confirmForm.commissionRatio"
            placeholder="请输入佣金比例"
            type="number"
            number
          ></Input>
        </FormItem> -->
        <FormItem
          label="抖店订单号"
          prop="otherContentPlatFormOrderId"
          key="抖店订单号"
        >
          <Input
            v-model="confirmForm.otherContentPlatFormOrderId"
            placeholder="请输入抖店订单号"
          ></Input>
        </FormItem>
        <FormItem
          label="后期项目铺垫"
          v-if="confirmForm.isFinish == true"
          key="后期项目铺垫"
        >
          <Input
            v-model="confirmForm.lastProjectStage"
            placeholder="请输入后期项目铺垫"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem
          label="面诊状态"
          prop="consultatioType"
          key="面诊状态"
        >
          <Input
            v-model="transactionStatusParams.consultationTypeText"
            placeholder="请输入面诊状态"
            disabled
          ></Input>
        </FormItem>
        <FormItem
          label="邀约凭证"
          key="邀约凭证"
        >
          <upload :uploadObj="invitationDocumentsUploadObj" @uploadChange="invitationDocumentsHandleUploadChange" />
        </FormItem>
        <FormItem
          label="成交凭证"
          key="成交凭证"
          v-if="confirmForm.isFinish == true"
        >
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <!-- <div style="color:red;font-size:3px" v-if="confirmForm.isFinish === true">*注：请上传该手机号客户在贵公司系统的成交凭证截图</div> -->
      </Form>
      <div slot="footer">
        <Button @click="handleCancelClick('confirmForm')">取消</Button>
        <Button type="primary" @click="submiteChange('confirmForm')"
          >确定</Button
        >
      </div>
    </Modal>
    <!-- 查看邀约凭证 -->
    <viewImg :viewCustomerPhotosModel.sync="viewCustomerPhotosModel" :viewImgParams="viewImgParams"></viewImg>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/employeeManage";
import upload from "@/components/upload/upload";
import viewImg from "./viewImg.vue"

export default {
  components: {
    upload,
    viewImg
  },
  props: {
    transactionStatusParams: {
      type: Object,
    },
  },
  data() {
    return {
      viewCustomerPhotosModel:false,
      viewImgParams:{
        contentPlatFormOrderId:'',
        orderDealId:''
      },
      // 到院状态
      toHospitalTypeList:[],

      // 邀约凭证
      invitationDocumentsUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 5,
        // 文件列表
        uploadList: [],
      },
      noDealuploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 医院
      hospitalInfo: [],
      editModel: false,
      transactionStatusPage: {
        pageNum: 1,
        pageSize: 10,
        data: [],
        totalCount: 0,
      },

      confirmForm: {
        // 成交情况id
        dealId: "",
        id: null,
        // 是否成交
        isFinish: false,
        // 成交金额
        dealAmount: null,
        //后期铺垫
        lastProjectStage: "",
        // 成交凭证
        dealPictureUrl: "",
        // 未成交原因
        unDealReason: "",
        // 是否到院
        isToHospital: false,
        // 未成交截图
        unDealPictureUrl: "",
        // 成交时间
        DealDate: null,
        lastDealHospitalId: null,
        toHospitalDate: "",
        // 抖店订单号
        otherContentPlatFormOrderId: "",
        // 到院类型
        toHospitalType:null,
        // 是否陪诊
        isAcompanying:false,
        // 佣金比例
        commissionRatio:null,
        // 面诊状态
        consultatioType:'',
        // 邀约凭证
        invitationDocuments:[]
      },
      confirmRuleValidate: {
        commissionRatio: [
          {
            required: true,
            message: "请输入佣金比例(%)",
          },
        ],
        unDealReason: [
          {
            required: true,
            message: "请输入未成交原因",
            trigger: "blur",
          },
        ],
        dealAmount: [
          {
            required: true,
            message: "请输入成交金额",
          },
        ],
        DealDate: [
          {
            required: true,
            message: "请选择成交时间",
          },
        ],
        toHospitalDate: [
          {
            required: true,
            message: "请选择到院时间",
          },
        ],
        lastDealHospitalId: [
          {
            required: true,
            message: "请选择到院医院",
          },
        ],
        toHospitalType: [
          {
            required: true,
            message: "请选择到院类型",
          },
        ],
      },
      query: {
        repeateOrderPictureUrl: "",
        columns: [
          {
            title: "登记日期",
            key: "createDate",
            minWidth: 170,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD  HH:mm:ss"
                )
              );
            },
          },
          {
            title: "是否重单深度",
            key: "isRepeatProfundityOrder",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isRepeatProfundityOrder,
                    size: "default",
                    disabled:
                      params.row.isRepeatProfundityOrder === true ||
                      params.row.isRepeatProfundityOrder === false,
                  },
                },
                h("span", { isRepeatProfundityOrder: "open" }, "开"),
                h("span", { isRepeatProfundityOrder: "close" }, "关")
              );
            },
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isToHospital,
                    size: "default",
                    disabled:
                      params.row.isToHospital === true ||
                      params.row.isToHospital === false,
                  },
                },
                h("span", { isToHospital: "open" }, "开"),
                h("span", { isToHospital: "close" }, "关")
              );
            },
          },
          {
            title: "到院类型",
            key: "toHospitalTypeText",
            minWidth: 120,
          },
          {
            title: "到院时间",
            key: "tohospitalDate",
            minWidth: 150,
            render: (h, params) => {
              return h(
                "div",
                params.row.tohospitalDate
                  ? this.$moment(params.row.tohospitalDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "到院医院",
            key: "dealHospital",
            minWidth: 220,
          },
          {
            title: "是否陪诊",
            key: "isAcompanying",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isAcompanying,
                    size: "default",
                    disabled:
                      params.row.isAcompanying === true || params.row.isAcompanying === false,
                  },
                },
                h("span", { isAcompanying: "open" }, "开"),
                h("span", { isAcompanying: "close" }, "关")
              );
            },
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isDeal,
                    size: "default",
                    disabled:
                      params.row.isDeal === true || params.row.isDeal === false,
                  },
                },
                h("span", { isDeal: "open" }, "开"),
                h("span", { isDeal: "close" }, "关")
              );
            },
          },
          
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                params.row.dealDate
                  ? this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 140,
          },
          {
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isOldCustomer == true ? '老客业绩': '新客业绩'
                 
              );
            },
          },
          // {
          //   title: "佣金比例(%)",
          //   key: "commissionRatio",
          //   minWidth: 140,
          //   render: (h, params) => {
          //     return h(
          //           "div",
          //           params.row.commissionRatio!=0  ? params.row.commissionRatio + '%' : '0%'
          //         )
          //       ;
          //   }
          // },
          {
            title: "截图",
            key: "dealPicture",
            minWidth: 140,
            render: (h, params) => {
              return params.row.dealPicture
                ? h(
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
                          src: params.row.dealPicture,
                        },
                      }),
                      //   h("div", params.row.goodsName,)
                    ]
                  )
                : "";
            },
          },

          {
            title: "抖店订单号",
            key: "otherOrderId",
            minWidth: 150,
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
          },
          {
            title: "操作",
            key: "",
            width:200,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              const { statusText } = params.row;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // 审核通过不可编辑
                      disabled:params.row.checkState == 2
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.getcontentPlateFormOrderToHospitalTypeList()
                        api.ContentPlatFormOrderDealInfo(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              contentPlatFormOrderId,
                              isToHospital,
                              tohospitalDate,
                              isDeal,
                              lastDealHospitalId,
                              dealPicture,
                              price,
                              remark,
                              otherOrderId,
                              dealDate,
                              toHospitalType,
                              isAcompanying,
                              commissionRatio,
                              invitationDocuments
                            } = res.data.contentPlatFormOrderDealInfoInfo;
                            this.isEdit = true;
                            this.confirmForm.toHospitalDate = tohospitalDate
                              ? this.$moment(tohospitalDate).format(
                                  "YYYY-MM-DD"
                                )
                              : "";
                            this.confirmForm.isToHospital = isToHospital;
                            this.confirmForm.dealId = id;
                            this.confirmForm.isFinish = isDeal;
                            this.confirmForm.lastDealHospitalId = lastDealHospitalId;
                            this.confirmForm.dealPicture = dealPicture;
                            this.confirmForm.isAcompanying = isAcompanying;
                            this.confirmForm.commissionRatio = commissionRatio;
                            this.uploadObj.uploadList = this.confirmForm
                              .dealPicture
                              ? [this.confirmForm.dealPicture]
                              : [];
                            this.noDealuploadObj.uploadList = this.confirmForm
                              .dealPicture
                              ? [this.confirmForm.dealPicture]
                              : [];
                            this.confirmForm.dealAmount = price;
                            this.confirmForm.remark = remark;
                            this.confirmForm.unDealReason = remark;
                            this.confirmForm.lastProjectStage = remark;
                            this.confirmForm.otherContentPlatFormOrderId = otherOrderId;
                            this.confirmForm.toHospitalType = toHospitalType;
                            this.confirmForm.invitationDocuments = invitationDocuments;
                            this.invitationDocumentsUploadObj.uploadList = this.confirmForm.invitationDocuments ? this.confirmForm.invitationDocuments: [];
                            this.confirmForm.DealDate = dealDate
                              ? this.$moment(dealDate).format("YYYY-MM-DD")
                              : "";
                            this.confirmForm.id = contentPlatFormOrderId;
                            this.editModel = true;
                          }
                        });
                      },
                    },
                  },
                  "编辑"
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
                        const { id,contentPlatFormOrderId } = params.row;
                        this.viewCustomerPhotosModel = true
                        this.viewImgParams.contentPlatFormOrderId = contentPlatFormOrderId
                        this.viewImgParams.orderDealId = id
                       }
                    },
                  },
                  "查看邀约凭证"
                ),
              ]);
            },
          },
        ],
      },
    };
  },
  methods: {
    // 邀约凭证
     invitationDocumentsHandleUploadChange(values) {
      this.confirmForm.invitationDocuments = values;
    },
    //   获取订单到院类型
    getcontentPlateFormOrderToHospitalTypeList() {
      api.contentPlateFormOrderToHospitalTypeList().then((res) => {
        if (res.code === 0) {
          const { orderTypes } = res.data;
          this.toHospitalTypeList = orderTypes
        }
      });
    },
    // 是否到院
    isToHospitalChange(){
      if(this.confirmForm.isToHospital == false){
        this.confirmForm.toHospitalDate = null
        this.confirmForm.toHospitalType = null
        this.confirmForm.isAcompanying = false
      }
    },
    // 是否成交
    switchChange() {
      if (this.confirmForm.isFinish == true) {
        this.confirmForm.unDealReason = "";
        this.confirmForm.isToHospital = true;
        this.confirmForm.dealAmount = "";
        this.confirmForm.lastProjectStage = "";
        this.uploadObj.uploadList = [];
        this.confirmForm.DealDate = null;
      } else {
        this.confirmForm.dealAmount = null;
        this.confirmForm.lastProjectStage = "";
        this.confirmForm.isToHospital = false;
        this.confirmForm.unDealReason = "";
        this.noDealuploadObj.uploadList = [];
        this.confirmForm.DealDate = null;
        this.confirmForm.toHospitalDate = null;
        this.confirmForm.lastDealHospitalId = null;
        this.confirmForm.toHospitalType = null
        this.confirmForm.isAcompanying = false
        this.confirmForm.commissionRatio = null
      }
    },
    submiteChange(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            dealId,
            isFinish,
            lastDealHospitalId,
            isToHospital,
            toHospitalDate,
            dealAmount,
            lastProjectStage,
            dealPictureUrl,
            unDealReason,
            unDealPictureUrl,
            DealDate,
            otherContentPlatFormOrderId,
            toHospitalType,
            isAcompanying,
            commissionRatio,
            invitationDocuments
          } = this.confirmForm;
          const data = {
            id,
            dealId,
            isFinish,
            dealAmount: isFinish == true ? dealAmount : 0,
            lastProjectStage: isFinish == true ? lastProjectStage : "",
            dealPictureUrl:
              isFinish == true ? this.uploadObj.uploadList.toString() : "",
            unDealReason: isFinish == true ? "" : unDealReason,
            isToHospital: isFinish === true ? true : isToHospital,
            unDealPictureUrl:
              isFinish === false
                ? this.noDealuploadObj.uploadList.toString()
                : "",
            DealDate: DealDate
              ? this.$moment(DealDate).format("YYYY-MM-DD")
              : null,
            lastDealHospitalId,
            toHospitalDate: toHospitalDate
              ? this.$moment(toHospitalDate).format("YYYY-MM-DD")
              : null,
            otherContentPlatFormOrderId,
            toHospitalType:isToHospital == false ? 0 : toHospitalType,
            isAcompanying,
            commissionRatio:0,
            invitationDocuments
          };
          api.updateContentPlatFormOrderDealInfo(data).then((res) => {
            if (res.code === 0) {
              this.handleCancelClick("confirmForm");
              this.geTransactionStatus();
              this.$Message.success({
                content: "修改成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 未成交截图
    noDealhandleUploadChange(values) {
      this.confirmForm.unDealPictureUrl = values[0];
    },
    // 图片
    handleUploadChange(values) {
      this.confirmForm.dealPictureUrl = values[0];
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
        }
      });
    },
    // 获取成交情况列表
    geTransactionStatus() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        contentPlatFormOrderId,
        isHospital,
      } = this.transactionStatusParams;
      const { pageNum, pageSize } = this.transactionStatusPage;
      const data = {
        pageNum,
        pageSize,
        contentPlatFormOrderId,
      };
      //   等于2是医院端成交情况接口
      if (isHospital == 2) {
        api.hospitalContentPlatFormOrderDealInfo(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.transactionStatusPage.data = list;
            this.transactionStatusPage.totalCount = totalCount;
          }
        });
      } else {
        api.contentPlatFormOrderDealInfo(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.transactionStatusPage.data = list;
            this.transactionStatusPage.totalCount = totalCount;
          }
        });
      }
    },

    // 获取列表分页
    handlePageChange(pageNum) {
      const { contentPlatFormOrderId } = this.transactionStatusParams;
      const { pageSize } = this.transactionStatusPage;
      const data = {
        pageNum,
        pageSize,
        contentPlatFormOrderId,
      };
      api.contentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.transactionStatusPage.data = list;
          this.transactionStatusPage.totalCount = totalCount;
        }
      });
    },
    // 取消
    cancel(name) {
      this.transactionStatusParams.transactionStatusModel = false;
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
      }
    },

    handleModalChange(value) {
      if (!value) {
        this.editModel = false;
        this.uploadObj.uploadList = [];
        this.noDealuploadObj.uploadList = [];
      }
    },
    // 取消
    handleCancelClick(name) {
      this.isEdit = false;
      this.editModel = false;
      this.$refs[name].resetFields();
      this.uploadObj.uploadList = [];
      this.noDealuploadObj.uploadList = [];
      this.invitationDocumentsUploadObj.uploadList = []
    },
  },
  created() {
    this.getHospitalInfonameList();
  },
  watch: {
    transactionStatusParams: {
      handler(transactionStatusParams) {
        this.geTransactionStatus();
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.page {
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img {
  width: 100%;
  height: auto;
}
</style>
