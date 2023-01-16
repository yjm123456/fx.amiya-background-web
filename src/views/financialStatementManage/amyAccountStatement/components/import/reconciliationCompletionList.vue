<template>
  <div>
    <Modal
      v-model="control"
      title="成交情况"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="85%"
    >
      <Card class="container">
        <div style="margin-bottom:10px">当前对账单编号： <span style="color:#f46544">{{reconciliationParams.id}}</span></div>
        <div>
          <!-- <Table border :columns="query.columns" :data="query.data"></Table> -->
          <Tabs ref="tabs" v-model="active"  type="card" v-if="reconciliationParams.tabFlag==true">
            <TabPane label="下单平台成交情况" name="order">
              <div>
                <order
                  :active="active"
                  :reconciliationParams="reconciliationParams"
                  ref="order"
                  @settlePriceChange="settlePriceChange"
                ></order>  
              </div> 
            </TabPane>
            <TabPane label="内容平台成交情况" name="contentOrder">
              <div>
                <contentOrder
                  :active="active"  
                  :reconciliationParams="reconciliationParams"
                  ref="contentOrder"
                  @settlePriceChange="settlePriceChange"
                ></contentOrder>
              </div>
            </TabPane>
            <TabPane label="升单情况" name="liter">
              <div>
                <liter
                  :active="active"  
                  :reconciliationParams="reconciliationParams"
                  ref="liter"
                  @settlePriceChange="settlePriceChange"
                ></liter>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <!-- <div class="page_wrap">
          <Page
            ref="pages"
            :current="query.pageNum"
            :page-size="query.pageSize"
            :total="query.totalCount"
            show-total
            show-elevator
            @on-change="handlePageChange"
          />
        </div> -->
      </Card>
      <Modal
        v-model="controlModal"
        title="审核"
        :mask-closable="false"
        @on-visible-change="handleModalVisibleChanges"
        width="800"
      >
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidates"
          label-position="left"
          :label-width="110"
        >
        <div class="form_content">
          <div class="form_left">
            <FormItem label="成交金额" prop="checkPriceRight">
              <Input
                v-model="form.checkPriceRight"
                placeholder="请输入成交金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="信息服务费比例" prop="proportionOfInformationServiceFee">
              <Input
                v-model="form.proportionOfInformationServiceFee"
                placeholder="请输入信息服务费比例"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="信息服务费金额" prop="informationServiceFeePrice">
              <Input
                v-model="form.informationServiceFeePrice"
                placeholder="请输入信息服务费金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="系统使用费比例" prop="systemUsageFeeProportion">
              <Input
                v-model="form.systemUsageFeeProportion"
                placeholder="请输入系统使用费比例"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="系统使用费金额" prop="systemUsageFeePrice">
              <Input
                v-model="form.systemUsageFeePrice"
                placeholder="请输入系统使用费金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="服务费合计" prop="totalServiceFee">
              <Input
                v-model="form.totalServiceFee"
                placeholder="请输入服务费合计"
                type="number"
                number
                disabled
              />
            </FormItem>
          </div>
          <div class="form_right">
            <FormItem label="审核状态" prop="checkState">
              <Select v-model="form.checkState" placeholder="审核状态">
                <Option
                  v-for="item in checkStateArr"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
            <FormItem label="对账金额" prop="checkPrice">
              <Input
                v-model="form.checkPrice"
                placeholder="请输入对账金额"
                type="number"
                number
              />
            </FormItem>
            <FormItem label="服务费合计" prop="settlePrice">
              <Input
                v-model="form.settlePrice"
                placeholder="请输入服务费合计"
                type="number"
                number
              />
            </FormItem>
            <FormItem label="审核图片" prop="checkPicture" key="checkPicture">
              <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
            </FormItem>
            <FormItem label="审核备注" prop="checkRemark">
              <Input v-model="form.checkRemark" type="textarea" :rows="3"></Input>
            </FormItem>
          </div>
        </div>
          <Spin fix v-if="flag == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
        </Form>
        <div slot="footer">
          <Button @click="cancelSubmit('form')">取消</Button>
          <Button type="primary" @click="handleSubmit('form')">确定</Button>
        </div>
      </Modal>
      <div slot="footer" class="foot">
        <div class="foot_left">
          <div class="foot_title">当前对账单合计服务费：<span style="color:red;font-weight:bold">{{reconciliationParams.returnBackTotalPrice == 0 ? 0 : reconciliationParams.returnBackTotalPrice.toFixed(2)}}</span></div>
          <!-- <div class="foot_title">累计审核服务费合计：<span style="color:red;font-weight:bold">{{settlePriceNum1 == 0 && settlePriceNum2 == 0 && settlePriceNum3 ==0 ? 0 : (settlePriceNum1+settlePriceNum2+settlePriceNum3).toFixed(2) }}</span></div> -->
          <div class="foot_title">累计审核服务费合计：<span style="color:red;font-weight:bold">{{settlePriceNum.toFixed(2) }}</span></div>
        </div>
        <div>
          <Button @click="handleCancel">取消</Button>
          <Button type="primary" @click="submitRecon">对账完成</Button>
        </div>
        
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/contentPlatFormOrderDealInfo";
import * as reconapi from "@/api/reconciliationDocuments";
import upload from "@/components/upload/upload";
import * as orderapi from "@/api/orderManage";
import order from "../order.vue"
import contentOrder from "../contentOrder.vue"
import liter from "../liter.vue"
export default {
  components: {
    upload,
    order,
    contentOrder,
    liter
  },
  props: {
    reconciliationCompletionListModel: Boolean,
    reconciliationParams: Object,
  },
  data() {
    return {
      active:"order",
      settlePriceNum:0,
      flag: false,
      // 审核状态 审核成功/审核失败
      checkStateArr: [
        { id: 2, name: "审核通过" },
        { id: 1, name: "审核不通过" },
      ],
      controlModal: false,
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 2,
        // 文件列表
        uploadList: [],
      },
      form: {
        // 左边字段
        // 成交金额
        checkPriceRight:0,
        // 信息服务费比例
        proportionOfInformationServiceFee:0,
        // 信息服务费金额
        informationServiceFeePrice:0,
        // 系统使用费比列
        systemUsageFeeProportion:0,
        // 系统使用费金额
        systemUsageFeePrice:0,
        // 服务费合计
        totalServiceFee:0,

        // 右边字段
        id: null,
        // 审核状态
        checkState: "",
        // 对账金额
        checkPrice: null,
        // 服务费合计
        settlePrice: null,
        // 审核备注
        checkRemark: "",
        // 审核图片
        checkPicture: [],
        // 成交情况id
        orderDealInfoId: "",
      },

      ruleValidates: {
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkPrice: [
          {
            required: true,
            message: "请输入对账金额",
          },
        ],
        settlePrice: [
          {
            required: true,
            message: "请输入服务费合计",
          },
        ],
      },
      control: false,
      query: {
        // 最小金额
        minAddOrderPrice: null,
        // 最大金额
        maxAddOrderPrice: null,
        //是否到院
        isToHospital: -1,
        // 到院开始时间
        tohospitalStartDate: "",
        // 到院结束时间
        toHospitalEndDate: "",
        // 是否成交
        isDeal: -1,
        // 到院医院
        lastDealHospitalId: -1,
        // 是否陪诊
        isAccompanying: -1,
        // 新老客业绩
        isOldCustomer: -1,
        // 是否回款
        isReturnBakcPrice: -1,
        // 回款开始时间
        returnBackPriceStartDate: "",
        // 回款结束时间
        returnBackPriceEndDate: "",
        // 跟进人员
        customerServiceId: -1,
        // 派单开始时间
        sendStartDate: "",
        // 派单结束时间
        sendEndDate: "",
        // 面诊状态
        consultationType: -1,
        toHospitalType: -1,
        ReturnBackPriceState: "-1",
        consultationEmpId: -1,
        contentPlatFormId: null,
        liveAnchorId: null,
        hospitalId: "",
        hospitalList: [{ id: -1, name: "全部医院" }],
        lastDealHospitalList: [{ id: -1, name: "全部到院医院" }],
        startDate: "",
        endDate: "",
        contentPlateFormId: "",
        keyword: "",
        checkState: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "对账单编号",
            key: "reconciliationDocumentsId",
            minWidth: 170,
            align: "center",
          },
          {
            title: "成交编号",
            key: "id",
            minWidth: 170,
            align: "center",
          },
          {
            title: "订单号",
            key: "contentPlatFormOrderId",
            minWidth: 170,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 140,
            align: "center",
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
            align: "center",
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 120,
            align: "center",
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "对账金额",
            key: "checkPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 120,
            align: "center",
          },
          
          {
            title: "操作",
            align: "center",
            minWidth: 100,
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:
                        params.row.isDeal == false ||
                        params.row.checkStateText == "审核通过",
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const {
                          id,
                          contentPlatFormOrderId,
                          price,
                          settlePrice,
                        } = params.row;
                        this.controlModal = true;
                        this.form.id = contentPlatFormOrderId;
                        this.form.orderDealInfoId = id;
                        this.form.checkPrice = this.reconciliationParams.totalDealPrice;
                        this.form.settlePrice = this.reconciliationParams.returnBackTotalPrice;
                        // 成交金额
                        this.form.checkPriceRight = price
                        this.form.proportionOfInformationServiceFee = this.reconciliationParams.returnBackPricePercent
                        this.form.systemUsageFeeProportion = this.reconciliationParams.systemUpdatePricePercent
                        this.form.informationServiceFeePrice = ((this.form.checkPriceRight * this.form.proportionOfInformationServiceFee) /100).toFixed(2)
                        this.form.systemUsageFeePrice = ((this.form.checkPriceRight * this.form.systemUsageFeeProportion) /100).toFixed(2)
                        this.form.totalServiceFee = (Number(this.form.informationServiceFeePrice) + Number(this.form.systemUsageFeePrice)).toFixed(2)
                      },
                    },
                  },
                  "审核"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      settlePriceNum:0,
      settlePriceNum1:0,
      settlePriceNum2:0,
      settlePriceNum3:0,
    };
  },
  methods: {
    settlePriceChange(value){
      this.settlePriceNum = value
    },
    settlePriceChange1(value){
      this.settlePriceNum1 = value
    },
    settlePriceChange2(value){
      this.settlePriceNum2 = value
    },
    settlePriceChange3(value){
      this.settlePriceNum3 = value
    },
    submitRecon() {
      // let settlePriceNum = (this.settlePriceNum1+this.settlePriceNum2+this.settlePriceNum3).toFixed(2)
      // if(this.reconciliationParams.returnBackTotalPrice != settlePriceNum){
      if(this.reconciliationParams.returnBackTotalPrice != this.settlePriceNum){
        this.$Message.warning('当前对账服务费合计金额有偏差，无法完成对账，请检查！')
        return
      }
      this.$Modal.confirm({
        title: "对账完成提示",
        content: "是否确定完成对账？",
        onOk: () => {
          const data = {
            idList: this.reconciliationParams.idList,
            reconciliationState: 3,
            questionReason: "",
          };
          reconapi.tagReconciliationState(data).then((res) => {
            if (res.code === 0) {
              this.$Message.success("已成功对账");
              this.$emit("update:reconciliationCompletionListModel", false);
            }
          });
        },
        onCancel: () => {},
      });
    },
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },
    // 图片
    handleUploadChange(values) {
      this.form.checkPicture = values;
    },
    // 审核
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            checkState,
            checkPrice,
            settlePrice,
            checkRemark,
            checkPicture,
            orderDealInfoId,
            informationServiceFeePrice,
            systemUsageFeePrice,
            checkPriceRight,
            totalServiceFee
          } = this.form;
          const data = {
            id,
            checkState,
            settlePrice,
            checkPrice,
            checkRemark,
            checkPicture,
            orderDealInfoId,
            reconciliationDocumentsId: this.reconciliationParams.id,
            informationPrice:Number(informationServiceFeePrice),
            systemUpdatePrice:Number(systemUsageFeePrice)
          };
          if(checkPriceRight != checkPrice || totalServiceFee !=settlePrice){
            this.$Modal.confirm({
              title: "审核确认提示",
              content: "当前成交单与对账单的对账金额或服务费合计不一致，是否仍要审核通过？",
              onOk: () => {
                orderapi.checkContentPlateFormOrder(data).then((res) => {
                  if (res.code === 0) {
                    this.flag = false;
                    this.controlModal = false;
                    this.cancelSubmit("form");
                    this.getContentPlatFormOrderDealInfo(
                      this.reconciliationParams.customerPhone
                    );
                    this.$Message.success({
                      content: "提交成功",
                      duration: 3,
                    });
                  } else if (res.code != -1 || res.code != 0) {
                    this.$Message.error("操作失败，请联系管理员");
                  } else {
                    setTimeout(() => {
                      this.flag = false;
                    }, 3000);
                  }
                });
              },
              onCancel: () => {},
            });
            return
          }
          this.flag = true;
          orderapi.checkContentPlateFormOrder(data).then((res) => {
            if (res.code === 0) {
              this.flag = false;
              this.controlModal = false;
              this.cancelSubmit("form");
              this.getContentPlatFormOrderDealInfo(
                this.reconciliationParams.customerPhone
              );
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
            } else if (res.code != -1 || res.code != 0) {
              this.$Message.error("操作失败，请联系管理员");
            } else {
              setTimeout(() => {
                this.flag = false;
              }, 3000);
            }
          });
        }
      });
    },
    // 获取内容平台已成交列表
    getContentPlatFormOrderDealInfo(value) {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        pageNum,
        pageSize,
        keyword,
        checkState,
        contentPlateFormId,
        startDate,
        endDate,
        hospitalId,
        liveAnchorId,
        consultationEmpId,
        ReturnBackPriceState,
        toHospitalType,
        isToHospital,
        tohospitalStartDate,
        toHospitalEndDate,
        isDeal,
        lastDealHospitalId,
        isAccompanying,
        isOldCustomer,
        isReturnBakcPrice,
        returnBackPriceStartDate,
        returnBackPriceEndDate,
        customerServiceId,
        sendStartDate,
        sendEndDate,
        consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword: value,
        checkState: checkState == -1 ? null : checkState,
        contentPlateFormId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        hospitalId: hospitalId == -1 ? null : hospitalId,
        liveAnchorId,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        ReturnBackPriceState:
          ReturnBackPriceState == "-1" ? null : ReturnBackPriceState,
        toHospitalType: toHospitalType == -1 ? null : toHospitalType,
        isToHospital: isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate:
          isToHospital == "true"
            ? tohospitalStartDate
              ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD")
              : null
            : null,
        toHospitalEndDate:
          isToHospital == "true"
            ? toHospitalEndDate
              ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
              : null
            : null,
        isDeal: isDeal == -1 ? null : isDeal,
        lastDealHospitalId:
          lastDealHospitalId == -1 ? null : lastDealHospitalId,
        isAccompanying: isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer: isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice: isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceStartDate
              ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD")
              : null
            : null,
        returnBackPriceEndDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceEndDate
              ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD")
              : null
            : null,
        customerServiceId: customerServiceId == -1 ? null : customerServiceId,
        sendStartDate: sendStartDate
          ? this.$moment(sendStartDate).format("YYYY-MM-DD")
          : "",
        sendEndDate: sendEndDate
          ? this.$moment(sendEndDate).format("YYYY-MM-DD")
          : "",
        consultationType: consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
      };
      api.getContentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
          let settlePriceNum = 0
          this.query.data.map(item=>{
            if(this.reconciliationParams.id == item.reconciliationDocumentsId){
              settlePriceNum +=item.settlePrice
            }
          })
          this.settlePriceNum = settlePriceNum
        } else if (res.code != -1 || res.code != 0) {
          this.$Message.error("操作失败，请联系管理员");
        }
      });
    },
    // 获取内容平台已成交列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        checkState,
        contentPlateFormId,
        startDate,
        endDate,
        hospitalId,
        liveAnchorId,
        consultationEmpId,
        ReturnBackPriceState,
        toHospitalType,

        isToHospital,
        tohospitalStartDate,
        toHospitalEndDate,
        isDeal,
        lastDealHospitalId,
        isAccompanying,
        isOldCustomer,
        isReturnBakcPrice,
        returnBackPriceStartDate,
        returnBackPriceEndDate,
        customerServiceId,
        sendStartDate,
        sendEndDate,
        consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword: this.customerPhone,
        checkState: checkState == -1 ? null : checkState,
        contentPlateFormId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        hospitalId: hospitalId == -1 ? null : hospitalId,
        liveAnchorId,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        ReturnBackPriceState:
          ReturnBackPriceState == "-1" ? null : ReturnBackPriceState,
        toHospitalType: toHospitalType == -1 ? null : toHospitalType,
        isToHospital: isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate:
          isToHospital == "true"
            ? tohospitalStartDate
              ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD")
              : null
            : null,
        toHospitalEndDate:
          isToHospital == "true"
            ? toHospitalEndDate
              ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
              : null
            : null,
        isDeal: isDeal == -1 ? null : isDeal,
        lastDealHospitalId:
          lastDealHospitalId == -1 ? null : lastDealHospitalId,
        isAccompanying: isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer: isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice: isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceStartDate
              ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD")
              : null
            : null,
        returnBackPriceEndDate:
          isReturnBakcPrice == "true"
            ? returnBackPriceEndDate
              ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD")
              : null
            : null,
        customerServiceId: customerServiceId == -1 ? null : customerServiceId,
        sendStartDate: sendStartDate
          ? this.$moment(sendStartDate).format("YYYY-MM-DD")
          : "",
        sendEndDate: sendEndDate
          ? this.$moment(sendEndDate).format("YYYY-MM-DD")
          : "",
        consultationType: consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
      };
      api.getContentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
         let settlePriceNum = 0
          this.query.data.map(item=>{
            if(this.reconciliationParams.id == item.reconciliationDocumentsId){
              settlePriceNum +=item.settlePrice
            }
          })
          this.settlePriceNum = settlePriceNum
        } else if (res.code != -1 || res.code != 0) {
          this.$Message.error("操作失败，请联系管理员");
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:reconciliationCompletionListModel", false);
      this.$emit("getHospitalInfo");
      this.active ="order"
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("importFileForm");
        this.active ="order"
      }
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChanges(value) {
      if (!value) {
        this.isEdit = false;
        this.controlModal = false;
        this.uploadObj.uploadList = [];
        this.$refs["form"].resetFields();
      }
    },
  },
  created(){
   
  },
  watch: {
    reconciliationCompletionListModel(value) {
      this.control = value;
      if(value == true){  
        this.$nextTick(()=>{
          this.$refs.order.getContentPlatFormOrderDealInfo(this.reconciliationParams.customerPhone)
          this.$refs.contentOrder.getContentPlatFormOrderDealInfo(this.reconciliationParams.customerPhone)
          this.$refs.liter.getContentPlatFormOrderDealInfo(this.reconciliationParams.customerPhone)
          this.$refs.order.getTotalCheckReturnBackPriceByIdChange(this.reconciliationParams.id)
        })
      }
      
    },
  },
};
</script>
<style scoped>
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
.foot{
  display: flex;
  justify-content: space-between;
}
.foot_left{
  display: flex;
}
.foot_title{
  font-size: 16px;
  margin-right: 30px;
}
.form_content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.form_left,.form_right{
  width: 49%;
}
</style>
