<template>
  <div>
     <Table border :columns="query.columns" :data="query.data"></Table>
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
        <!-- <div class="foot_left">
          <div class="foot_title">当前对账单合计服务费：<span style="color:red;font-weight:bold">{{reconciliationParams.returnBackTotalPrice == 0 ? 0 : reconciliationParams.returnBackTotalPrice.toFixed(2)}}</span></div>
          <div class="foot_title">累计审核服务费合计：<span style="color:red;font-weight:bold">{{settlePriceNum == 0 ? 0 : settlePriceNum.toFixed(2)}}</span></div>
        </div> -->
     <Modal
        v-model="controlModal"
        title="审核"
        :mask-closable="false"
        @on-visible-change="handleModalVisibleChanges"
        width="70%"
      >
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidates"
          label-position="left"
          :label-width="130"
        >
        <div class="form_content">
          <div class="form_left">
            <div class="form_title">审核中的成交单</div>
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
            <FormItem label="系统使用费比例" prop="systemUsageFeeProportion">
              <Input
                v-model="form.systemUsageFeeProportion"
                placeholder="请输入系统使用费比例"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="成交服务费合计" prop="totalServiceFee">
              <Input
                v-model="form.totalServiceFee"
                placeholder="请输入服务费合计"
                type="number"
                number
                disabled
              />
            </FormItem>
          </div>
          <div class="form_left">
            <div class="form_title">成交对账单已对账数据</div>
            <FormItem label="已对账金额" prop="checkPriceNum">
              <Input
                v-model="form.checkPriceNum"
                placeholder="请输入已对账金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="已对账信息服务费金额" prop="informationServiceFeePrice">
              <Input
                v-model="form.informationServiceFeePrice"
                placeholder="请输入已对账信息服务费金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="已对账系统使用费金额" prop="systemUsageFeePrice">
              <Input
                v-model="form.systemUsageFeePrice"
                placeholder="请输入已对账系统使用费金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="已对账服务费合计" prop="totalServiceFeeReconciled">
              <Input
                v-model="form.totalServiceFeeReconciled"
                placeholder="请输入已对账服务费合计"
                type="number"
                number
                disabled
              />
            </FormItem>
          </div>
          <div class="form_right">
            <div class="form_title">对账单</div>
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
                @on-change="checkPriceChange"
              />
            </FormItem>
            <FormItem label="当前信息服务费" prop="currentInformationServiceFee"> 
              <Input
                v-model="form.currentInformationServiceFee"
                placeholder="请输入当前信息服务费"
                type="number"
                number
                
              />
            </FormItem>
            <FormItem label="当前系统使用费" prop="currentSystemUsagefee">
              <Input
                v-model="form.currentSystemUsagefee"
                placeholder="请输入当前系统使用费"
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
            <FormItem label="客服结算服务费" prop="customerServiceSettlePrice">
              <Input
                v-model="form.customerServiceSettlePrice"
                placeholder="请输入客服结算服务费"
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
          <Spin fix v-if="isLoading == true">
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
  </div>
</template>

<script>
import * as api from "@/api/contentPlatFormOrderDealInfo";
import * as reconapi from "@/api/reconciliationDocuments";
import upload from "@/components/upload/upload";
import * as orderapi from "@/api/orderManage";

export default {
  components: {
    upload,
  },
  props: {
    reconciliationParams: Object,
    active:String
  },
  data() {
    return {
      isLoading:false,
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
        // 系统使用费比列
        systemUsageFeeProportion:0,
        // 服务费合计
        totalServiceFee:0,

        // 中间字段
        // 已对账金额
        checkPriceNum:0,
        // 信息服务费金额
        informationServiceFeePrice:0,
        // 系统使用费金额
        systemUsageFeePrice:0,
        // 已对账服务费合计
        totalServiceFeeReconciled:0,

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
        // 当前服务费金额
        currentInformationServiceFee:null,
        // 当前系统使用费
        currentSystemUsagefee:null,
        // 客服结算服务费
        customerServiceSettlePrice:null
      },

      ruleValidates: {
        customerServiceSettlePrice: [
          {
            required: true,
            message: "请输入客服结算服务费",
          },
        ],
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
        // 面诊类型
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
            title: "登记时间",
            key: "createDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return params.row.createDate
                ? h(
                    "div",
                    this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                : "";
            },
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
            minWidth: 120,
            align: "center",
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
            title: "是否成交",
            key: "isDeal",
            minWidth: 100,
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
            minWidth: 110,
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
            title: "成交医院",
            key: "dealHospital",
            minWidth: 220,
            align: "center",
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 100,
            align: "center",
          },
          {
            title: "消费类型",
            key: "consumptionTypeText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 110,
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
              }else if (params.row.checkStateText == "审核中") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#fccc02",
                    },
                  },
                  params.row.checkStateText
                );
              }  else if (params.row.checkStateText == "未审核") {
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
            title: "归属主播",
            key: "belongLiveAnchor",
            minWidth: 100,
            align: "center",
          },
          {
            title: "归属客服",
            key: "createByEmpName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "操作",
            align: "center",
            minWidth: 80,
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
                        params.row.checkStateText == "审核通过"&& params.row.price == params.row.checkPrice,
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
                          checkPrice
                        } = params.row;
                        this.controlModal = true;
                        this.form.id = contentPlatFormOrderId;
                        this.form.orderDealInfoId = id;
                        this.form.checkPrice = (this.reconciliationParams.totalDealPrice).toFixed(2);
                        this.form.settlePrice = (this.reconciliationParams.returnBackTotalPrice).toFixed(2);
                        // 成交金额
                        this.form.checkPriceRight = price.toFixed(2)
                        // 信息服务费比例
                        this.form.proportionOfInformationServiceFee = this.reconciliationParams.returnBackPricePercent
                        // 系统使用费比例
                        this.form.systemUsageFeeProportion = this.reconciliationParams.systemUpdatePricePercent
                        const {checkPriceRight,proportionOfInformationServiceFee,systemUsageFeeProportion} = this.form
                        // 成交服务费合计(成交金额*（信息服务费比例+系统使用费比例）/100)
                        
                        // 已对账金额
                        this.form.checkPriceNum = checkPrice.toFixed(2)
                        // 已对账信息服务费金额（已对账金额*信息服务费比例/100）
                        this.form.informationServiceFeePrice = ((Number(this.form.checkPriceNum) * Number(this.form.proportionOfInformationServiceFee)) / 100).toFixed(2)
                        // 已对账系统使用费金额（已对账金额*系统使用费比例/100）
                        this.form.systemUsageFeePrice = ((Number(this.form.checkPriceNum) * Number(this.form.systemUsageFeeProportion)) / 100).toFixed(2)
                        // 已对账服务费合计(信息服务费金额+系统使用费金额)
                        // this.form.totalServiceFeeReconciled = (Number(this.form.informationServiceFeePrice) +  Number(this.form.systemUsageFeePrice)).toFixed(2)
                        this.form.totalServiceFeeReconciled = settlePrice
                        // // 当前信息服务费
                        // this.form.currentInformationServiceFee = (this.form.checkPrice * (this.form.proportionOfInformationServiceFee / 100)).toFixed(2)
                        // this.form.currentInformationServiceFee = Math.round((Number(this.form.checkPrice) * (this.form.proportionOfInformationServiceFee / 100))*100)/100
                        let price1 = Math.round( (Math.round(Math.abs(Number(this.form.checkPrice))*100*this.form.proportionOfInformationServiceFee)/10000) *100 )/100
                        if(this.form.checkPrice<0){
                          this.form.currentInformationServiceFee = -price1
                        }else{
                          this.form.currentInformationServiceFee = price1
                        }
                        // 当前系统服务费
                        // 正确的保留两位小数
                        // let price2 = (Number(this.form.checkPrice) * this.form.systemUsageFeeProportion)*100/10000
                        // this.form.currentSystemUsagefee = price2.toFixed(2)
                        // 计算方式 Math.round( (Math.round(Math.abs(Number(this.form.checkPrice))*100*this.form.systemUsageFeeProportion)/10000) *100 )/100
                        let price2 = Math.round( (Math.round(Math.abs(Number(this.form.checkPrice))*100*this.form.systemUsageFeeProportion)/10000) *100 )/100
                        if(this.form.checkPrice<0){
                          this.form.currentSystemUsagefee = -price2
                        }else{
                          this.form.currentSystemUsagefee = price2
                        }
                        // // 服务费合计
                        this.form.settlePrice = (this.form.currentInformationServiceFee + Number(this.form.currentSystemUsagefee)).toFixed(2)
                        // // this.form.settlePrice = (this.form.currentInformationServiceFee + Number(this.form.currentSystemUsagefee)).toFixed(2)
                        // if(this.form.checkPrice<0){
                        //   this.form.settlePrice = -(this.form.currentInformationServiceFee + Number(this.form.currentSystemUsagefee)).toFixed(2)
                        // }else{
                        //   this.form.settlePrice = (this.form.currentInformationServiceFee + Number(this.form.currentSystemUsagefee)).toFixed(2)
                        // }

                        // // // 客服结算服务费
                        this.form.customerServiceSettlePrice = proportionOfInformationServiceFee+systemUsageFeeProportion <=30 ?  this.form.settlePrice :  (this.form.checkPrice*0.3).toFixed(2)
                        // // this.form.customerServiceSettlePrice =  proportionOfInformationServiceFee+systemUsageFeeProportion <=30 ?  this.form.settlePrice :  (this.form.checkPrice*0.3).toFixed(2)
                        // if(this.form.checkPrice<0){
                        //   this.form.customerServiceSettlePrice = -proportionOfInformationServiceFee+systemUsageFeeProportion <=30 ?  this.form.settlePrice :  (this.form.checkPrice*0.3).toFixed(2)
                        // }else{
                        //   this.form.customerServiceSettlePrice = proportionOfInformationServiceFee+systemUsageFeeProportion <=30 ?  this.form.settlePrice :  (this.form.checkPrice*0.3).toFixed(2)
                        // }



                        // 成交服务费合计
                         // 为负数情况
                        if(Number(checkPriceRight) <0){
                          // let num = ((Math.abs(Number(checkPriceRight))*100 *(proportionOfInformationServiceFee+systemUsageFeeProportion))/10000).toFixed(2)
                          // this.form.totalServiceFee = (-num).toFixed(2)
                          let num = Math.round(((Math.abs(Number(checkPriceRight))*100 *(proportionOfInformationServiceFee+systemUsageFeeProportion))/10000)*100)/100
                          this.form.totalServiceFee = -num
                          // console.log(this.form.totalServiceFee,'为负数情况')
                          return
                        }else{
                          // .toFixed(2)银行家算法
                          // > (3.61).toFixed(1)    //四舍
                          // '3.6'
                          // > (3.69).toFixed(1)    //六入
                          // '3.7'
                          // > (3.651).toFixed(1)    //五考虑，五后非零，进
                          // '3.7'
                          // > (3.65).toFixed(1)    //五考虑，五后为零，五前为偶数，舍去
                          // '3.6'
                          // > (3.75).toFixed(1)    //五考虑，五后为零，五前为奇数，进
                          // '3.8'

                          
                          // this.form.totalServiceFee = Number(((Number(checkPriceRight)*100)*(proportionOfInformationServiceFee+systemUsageFeeProportion)/10000).toFixed(2))
                          this.form.totalServiceFee = Math.round(Number(((Number(checkPriceRight)*100)*(proportionOfInformationServiceFee+systemUsageFeeProportion)/10000))*100)/100
                          // console.log(this.form.totalServiceFee,'为正数情况')
                          return
                        }
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
      // 确认弹窗是否调用
      isConfim:false,
    };
  },
  methods: {
   checkPriceChange(){
      // 当前服务费金额
      // this.form.currentInformationServiceFee = (this.form.checkPrice * (Number(this.form.proportionOfInformationServiceFee) / 100)).toFixed(2)
      // this.form.currentSystemUsagefee = (this.form.checkPrice * (this.form.systemUsageFeeProportion / 100)).toFixed(2)
      // this.form.currentInformationServiceFee = Math.round((Number(this.form.checkPrice) * (this.form.proportionOfInformationServiceFee / 100))*100)/100
      // let price2 = (Number(this.form.checkPrice) * this.form.systemUsageFeeProportion)*100/10000
      // this.form.currentSystemUsagefee = price2.toFixed(2)
      // // this.form.currentSystemUsagefee = Math.round((Number(this.form.checkPrice) * (this.form.systemUsageFeeProportion / 100))*100)/100
      // this.form.settlePrice = (Number(this.form.currentInformationServiceFee) + Number(this.form.currentSystemUsagefee)).toFixed(2)
      // this.form.customerServiceSettlePrice = this.form.proportionOfInformationServiceFee+this.form.systemUsageFeeProportion <=30 ?  this.form.settlePrice :  this.form.checkPrice*0.3
      
      // 当前信息服务费
      let price1 = Math.round( (Math.round(Math.abs(Number(this.form.checkPrice))*100*this.form.proportionOfInformationServiceFee)/10000) *100 )/100
      if(this.form.checkPrice<0){
        this.form.currentInformationServiceFee = -price1
      }else{
        this.form.currentInformationServiceFee = price1
      }

      // 当前系统服务费
      let price2 = Math.round( (Math.round(Math.abs(Number(this.form.checkPrice))*100*this.form.systemUsageFeeProportion)/10000) *100 )/100
      if(this.form.checkPrice<0){
        this.form.currentSystemUsagefee = -price2
      }else{
        this.form.currentSystemUsagefee = price2
      }

      // 服务费合计
      this.form.settlePrice = (Number(this.form.currentInformationServiceFee) + Number(this.form.currentSystemUsagefee)).toFixed(2)

      // // 客服结算服务费
      this.form.customerServiceSettlePrice = this.form.proportionOfInformationServiceFee+this.form.systemUsageFeeProportion <=30 ?  this.form.settlePrice :  this.form.checkPrice*0.3


      
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
            totalServiceFee,
            currentSystemUsagefee,
            currentInformationServiceFee,
            customerServiceSettlePrice
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
            informationPrice:currentInformationServiceFee,
            systemUpdatePrice:currentSystemUsagefee,
            customerServiceSettlePrice
          };
          // 已对账金额+当前对账金额不能大于成交金额
          // 取绝对值判断 防止为负数时无法对账
          //                        已对账金额+对账金额
          // let res = Math.abs((Number(this.form.checkPriceNum)+Number(this.form.checkPrice)))
          let res = (Number(this.form.checkPriceNum)+Number(this.form.checkPrice))
          // 成交金额
          let res2 = Number(this.form.checkPriceRight)
          if(res>res2){
            this.$Message.warning({
              content:'已对账金额和当前对账金额合计不能大于成交金额！',
              duration: 3,
            });
            return
          }
          // 已对账服务费合计+当前对账单服务费合计不能大于成交服务费合计
          let num1 = Math.abs((Number(this.form.totalServiceFeeReconciled) *100 + Number(this.form.settlePrice)*100))
          let num2 = Math.abs(Number(this.form.totalServiceFee)*100)
          let content=""
          // 已对账服务费合计+当前对账单服务费合计不能大于成交服务费合计
          if(num1 > num2)
          {
             content="当前服务费合计加上已对账服务费合计已经" + "<span style='color:red'>超过</span>"  + "成交服务费合计定额"
          }
          //  成交金额 不等于 对账金额 或者 成交服务费合计 不等于 服务费合计
          if(checkPriceRight != checkPrice || totalServiceFee !=settlePrice)
          {
             content+="<br/>当前成交单与对账单的对账金额或服务费合计不一致"
          }
          if(content=="")
          {
             content="数据验证无误，请点击确认完成对账单审核"
          }
          else
          {
             content+="，是否仍要审核通过？"
          }
           this.$Modal.confirm({
              title: "确认提示",
              content: content ,
              onOk: () => {
                   this.isLoading = true;
                    orderapi.checkContentPlateFormOrder(data).then((res) => {
                      if (res.code === 0) {
                        this.isLoading = false;
                        this.controlModal = false;
                        this.cancelSubmit("form");
                        this.getContentPlatFormOrderDealInfo(
                          this.reconciliationParams.customerPhone
                        );
                        this.getTotalCheckReturnBackPriceByIdChange()
                        this.$Message.success({
                          content: "提交成功",
                          duration: 3,
                        });
                      } else {
                        setTimeout(() => {
                          this.isLoading = false;
                        }, 3000);
                      }
                    });
                return
              },
              onCancel: () => {},
            });
       

          
        }
      });
    },
    // 获取累计审核服务费合计
    getTotalCheckReturnBackPriceByIdChange(){
      const data = {
        recommandId:this.reconciliationParams.id
      }
      reconapi.getTotalCheckReturnBackPriceById(data).then((res) => {
        if(res.code === 0){
          this.$emit('settlePriceChange',res.data.TotalCheckReturnBackPriceById)
        }
      })
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
          // let settlePriceNum = 0
          // this.query.data.map(item=>{
          //   if(this.reconciliationParams.id == item.reconciliationDocumentsId){
          //     if(item.checkStateText=='审核通过' || item.checkState == '审核中'){
          //       settlePriceNum +=item.settlePrice
          //     }
          //   }
          // })
          // this.settlePriceNum = settlePriceNum
          // this.$emit('settlePriceChange2',settlePriceNum)
          // const data = {
          //   recommandId:this.reconciliationParams.id
          // }
          // reconapi.getTotalCheckReturnBackPriceById(data).then((res) => {
            
          //   if(res.code === 0){

          //     this.$emit('settlePriceChange',res.data.TotalCheckReturnBackPriceById)
          //   }
          // })
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
        keyword: this.reconciliationParams.customerPhone,
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
          // let settlePriceNum = 0
          // this.query.data.map(item=>{
          //   if(this.reconciliationParams.id == item.reconciliationDocumentsId){
          //     if(item.checkStateText=='审核通过' || item.checkState == '审核中'){
          //       settlePriceNum +=item.settlePrice
          //     }
          //   }
          // })
          // this.settlePriceNum = settlePriceNum
          // this.$emit('settlePriceChange2',settlePriceNum)
          // const data = {
          //   recommandId:this.reconciliationParams.id
          // }
          // reconapi.getTotalCheckReturnBackPriceById(data).then((res) => {
            
          //   if(res.code === 0){

          //     this.$emit('settlePriceChange',res.data.TotalCheckReturnBackPriceById)
          //   }
          // })
        } else if (res.code != -1 || res.code != 0) {
          this.$Message.error("操作失败，请联系管理员");
        }
      });
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
  
  watch: {
    active: {
      handler(value) {
        if (value === "contentOrder") {
          this.getContentPlatFormOrderDealInfo(this.reconciliationParams.customerPhone)
          this.settlePriceNum = 0
        }
      },
      immediate: true,
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
  width: 30%;
}
.form_title{
  font-weight: bold;
  margin: 10px 0 ;
  color: black;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
