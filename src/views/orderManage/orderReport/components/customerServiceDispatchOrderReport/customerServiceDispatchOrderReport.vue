<template>
  <div>
    <Modal
      v-model="customerServiceDispatchOrderModels"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
      :footer-hide="false"
      title="客服已派单报表"
    >
      <div class="top" style="margin-top:60px">
        <Tabs ref="tabs" v-model="activeName" @on-click="tabChange">
          <TabPane label="下单平台已派单报表" name="orderDistribution">
            <div>
              <div class="header">
                <DatePicker
                  type="date"
                  placeholder="下单开始日期"
                  style="width: 160px; margin-left: 10px"
                  :value="query.startDate"
                  v-model="query.startDate"
                ></DatePicker>
                <DatePicker
                  type="date"
                  placeholder="下单结束日期"
                  style="width: 160px; margin-left: 10px"
                  :value="query.endDate"
                  v-model="query.endDate"
                ></DatePicker>
                <Select
                  v-model="query.employeeId"
                  style="width: 200px;margin-left: 10px"
                  placeholder="请选择派单客服"
                  filterable
                  :disabled="query.positionName == '客服'"
                >
                  <Option
                    v-for="(item, index) in query.employee"
                    :value="item.id"
                    :key="index"
                    >{{ item.name }}</Option
                  >
                </Select>
                <Select
                  v-model="query.belongEmpId"
                  style="width: 200px;margin-left: 10px"
                  placeholder="请选择归属客服"
                  filterable
                  :disabled="query.positionName == '客服'"
                >
                  <Option
                    v-for="(item, a) in query.belongEmpList"
                    :value="item.id"
                    :key="a"
                    >{{ item.name }}</Option
                  >
                </Select>
                <Select
                  v-model="query.orderStatus"
                  style="width: 220px;margin-left: 10px"
                  placeholder="请选择订单状态"
                  filterable
                >
                  <Option
                    v-for="(item, sta) in query.statusCodeList"
                    :value="item.status"
                    :key="sta"
                    >{{ item.statusText }}</Option
                  >
                </Select>
                <Button
                  type="primary"
                  style="margin:0 10px"
                  @click="getCustomerServiceDispatchedOrders(1)"
                  >查询</Button
                >
                <Button type="primary" @click="exportsendOrder"  v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
              </div>
              <Table
                border
                :columns="query.columns"
                :data="query.data"
                height="600"
              ></Table>
            </div>
          </TabPane>
          <TabPane label="内容平台已派单报表" name="contentDispatch">
            <div>
              <div class="header">
                <div class="content_con">
                  <div class="content_left">
                    <div style="margin-bottom:10px">
                      <DatePicker
                        type="date"
                        placeholder="派单开始日期"
                        style="width: 160px; margin-left: 10px"
                        :value="contentInfo.startDate"
                        v-model="contentInfo.startDate"
                      ></DatePicker>
                      <DatePicker
                        type="date"
                        placeholder="派单结束日期"
                        style="width: 160px; margin-left: 10px"
                        :value="contentInfo.endDate"
                        v-model="contentInfo.endDate"
                      ></DatePicker>
                      <!-- <Input
                        v-model="contentInfo.commissionRatio"
                        placeholder="请输入佣金比例(%)"
                        type="number"
                        number
                        style="width:160px;margin-left: 10px"
                        @keyup.enter.native="getcustomerunContentPlatFormSendOrderList(2)"
                      /> -->
                      <Select
                        v-model="contentInfo.employeeId"
                        style="width: 160px;margin-left: 10px"
                        placeholder="请选择派单客服"
                        filterable
                        :disabled="contentInfo.isDisabled == true"
                      >
                        <Option
                          v-for="(item, i) in contentInfo.employee"
                          :value="item.id"
                          :key="i"
                          >{{ item.name }}</Option
                        >
                      </Select>
                      <Select
                        v-model="contentInfo.belongEmpId"
                        style="width: 160px;margin-left: 10px"
                        placeholder="请选择归属客服"
                        filterable
                        :disabled="contentInfo.isDisabled == true"
                      >
                        <Option
                          v-for="(item, j) in contentInfo.belongEmpList"
                          :value="item.id"
                          :key="j"
                          >{{ item.name }}</Option
                        >
                      </Select>
                      <Select
                        v-model="contentInfo.contentPlatFormId"
                        placeholder="请选择主播平台"
                        @on-change="
                          contentPlateChange(contentInfo.contentPlatFormId)
                        "
                        style="width: 160px; margin-left: 10px"
                        filterable
                      >
                        <Option
                          v-for="(item, ind) in contentInfo.contentPalteForms"
                          :value="item.id"
                          :key="ind"
                          >{{ item.contentPlatformName }}</Option
                        >
                      </Select>
                      <Select
                        v-model="contentInfo.liveAnchorId"
                        placeholder="请选择主播IP账号"
                        style="width: 160px; margin-left: 10px"
                        :disabled="contentInfo.contentPlatFormId === null"
                        filterable
                      >
                        <Option
                          v-for="(item, b) in contentInfo.liveAnchors"
                          :value="item.id"
                          :key="b"
                          >{{ item.hostAccountName }}</Option
                        >
                      </Select>
                      <Select
                        v-model="contentInfo.orderStatus"
                        placeholder="请选择订单状态"
                        style="width:160px;margin-left:10px"
                      >
                        <Option
                          v-for="(item, c) in contentInfo.orderStatusList"
                          :value="item.orderStatus"
                          :key="c"
                          >{{ item.orderStatusText }}</Option
                        >
                      </Select>
                    </div>
                    <div>
                      <Select
                        v-model="contentInfo.IsToHospital"
                        style="width: 160px;margin-left: 10px"
                        placeholder="请选择到院状态"
                      >
                        <Option
                          v-for="item in contentInfo.toTheHospitalList"
                          :value="item.id"
                          :key="item.id"
                          >{{ item.name }}</Option
                        >
                      </Select>
                      <DatePicker
                        type="date"
                        placeholder="到院开始日期"
                        style="width: 160px;margin-left: 10px"
                        :value="contentInfo.toHospitalStartDate"
                        v-model="contentInfo.toHospitalStartDate"
                        transfer
                        :disabled="contentInfo.IsToHospital != 'true'"
                      ></DatePicker>
                      <DatePicker
                        type="date"
                        placeholder="到院结束日期"
                        style="width: 160px; margin-left: 10px"
                        :value="contentInfo.toHospitalEndDate"
                        v-model="contentInfo.toHospitalEndDate"
                        transfer
                        :disabled="contentInfo.IsToHospital != 'true'"
                      ></DatePicker>
                      <Select
                        v-model="contentInfo.toHospitalType"
                        style="width: 160px;margin-left: 10px"
                        placeholder="请选择到院类型"
                        :disabled="contentInfo.IsToHospital != 'true'"
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
                      <Select
                        v-model="contentInfo.isAcompanying"
                        style="width: 160px;margin-left:10px"
                        placeholder="请选择陪诊状态"
                      >
                        <Option
                          v-for="item in contentInfo.isAcompanyingList"
                          :value="item.type"
                          :key="item.type"
                          >{{ item.name }}</Option
                        >
                      </Select>
                      <Select
                        v-model="contentInfo.isOldCustomer"
                        style="width: 160px;margin-left:10px"
                        placeholder="请选择新老客业绩状态"
                      >
                        <Option
                          v-for="item in contentInfo.isOldCustomerList"
                          :value="item.type"
                          :key="item.type"
                          >{{ item.name }}</Option
                        >
                      </Select>
                      <Select
                        v-model="contentInfo.hospitalId"
                        style="width: 200px;margin-left: 10px"
                        placeholder="请选择派单医院"
                        filterable
                      >
                        <Option
                          v-for="(item, ie) in dispatchHospital"
                          :value="item.id"
                          :key="ie"
                          >{{ item.name }}</Option
                        >
                      </Select>
                    </div>
                  
                  </div>
                  <div class="content_right">
                    <Button
                      type="primary"
                      style="margin:0 10px"
                      @click="getcustomerunContentPlatFormSendOrderList(2)"
                      >查询</Button
                    >
                    <Button type="primary" @click="exportContent"  v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
                  </div>
                </div>
              </div>
              <Table
                border
                :columns="contentInfo.columns"
                :data="contentInfo.data"
                height="600"
              ></Table>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div slot="footer" class="footer"></div>
      <div slot="footer" class=" foot">
        <div style="display:flex" v-if="activeName == 'orderDistribution'">
          <div class="num">
            合计采购单价：
            <div style="color:red">{{ query.purchaseSinglePriceNum }}</div>
          </div>
          <div class="num">
            合计采购数量：
            <div style="color:red">{{ query.purchaseAllNum }}</div>
          </div>
          <div class="num">
            合计采购总价：
            <div style="color:red">{{ query.purchasePriceNum }}</div>
          </div>
          <div class="num">
            合计实付款：
            <div style="color:red">{{ query.actualPaymentNum }}</div>
          </div>
          <div class="num">
            总条数：
            <div style="color:red">{{ query.pageCount }}</div>
          </div>
        </div>
        <div v-else style="display:flex">
          <div class="num">
            合计定金金额：
            <div style="color:red">{{ contentInfo.totalDepositNum }}</div>
          </div>
          <div class="num">
            合计成交金额：
            <div style="color:red">{{ contentInfo.dealAmountNum }}</div>
          </div>
          <div class="num">
            总条数：
            <div style="color:red">{{ contentInfo.pageCount }}</div>
          </div>
        </div>
        <Button @click="cancelSubmits()">关闭页面</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import { download } from "@/utils/util";
export default {
  props: {
    customerServiceDispatchOrderModel: {
      type: Boolean,
    },
    dispatchHospital: Array,
  },
  data() {
    return {
      // 到院状态
      toHospitalTypeList: [],
      activeName: "orderDistribution",
      customerServiceDispatchOrderModels: false,
      // 下单平台
      query: {
        purchaseSinglePriceNum: 0,
        purchaseAllNum: 0,
        purchasePriceNum: 0,
        actualPaymentNum: 0,
        pageCount: 0,
        employeeIds: null,
        positionName: "",
        employee: [{ name: "全部派单客服", id: -1 }],
        belongEmpList: [{ name: "全部归属客服", id: -1 }],
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        employeeId: -1,
        belongEmpId: -1,
        orderStatus: "",
        statusCodeList: [
          {
            statusText: "等待买家付款",
            status: "WAIT_BUYER_PAY",
          },
          {
            statusText: "等待卖家发货",
            status: "WAIT_SELLER_SEND_GOODS",
          },
          {
            statusText: "等待买家确认收货",
            status: "WAIT_BUYER_CONFIRM_GOODS",
          },
          {
            statusText: "买家已签收,货到付款专用",
            status: "TRADE_BUYER_SIGNED",
          },
          {
            statusText: "交易成功",
            status: "TRADE_FINISHED",
          },
          {
            statusText: "付款以后用户退款成功，交易自动关闭",
            status: "TRADE_CLOSED",
          },
          {
            statusText: "付款以前，卖家或买家主动关闭交易",
            status: "TRADE_CLOSED_BY_TAOBAO",
          },
          {
            statusText: "咨询订单",
            status: "SEEK_ADVICE",
          },
          {
            statusText: "定金订单",
            status: "BARGAIN_MONEY",
          },
        ],
        columns: [
          {
            title: "派单客服",
            key: "sendName",
            minWidth: 120,
            align: "center",
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 200,
            align: "center",
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "派单日期",
            key: "sendDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.sendDate
                  ? this.$moment(params.row.sendDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "派单医院",
            key: "hospitalName",
            minWidth: 220,
            align: "center",
          },
          {
            title: "预约时间",
            key: "time",
            minWidth: 130,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.time == "未明确时间"
                  ? params.row.time
                  : params.row.time
              );
            },
          },
          {
            title: "商品",
            key: "goodsName",
            minWidth: 220,
            align: "center",
          },
          {
            title: "订单状态",
            key: "statusText",
            minWidth: 160,
          },
          {
            title: "采购单价",
            key: "purchaseSinglePrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "采购数量",
            key: "purchaseNum",
            minWidth: 120,
            align: "center",
          },

          {
            title: "采购总价",
            key: "purchasePrice",
            minWidth: 150,
            align: "center",
          },
          {
            title: "实付款",
            key: "actualPayment",
            minWidth: 120,
            align: "center",
          },
          {
            title: "电话",
            key: "encryptPhone",
            minWidth: 120,
            align: "center",
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
            align: "center",
          },
        ],
        data: [],
      },
      // 内容平台
      contentInfo: {
        // 是否陪诊
        isAcompanying:-1,
        // 新老客业绩
        isOldCustomer:-1,
        // 佣金比例
        commissionRatio:null,
        hospitalId: -1,
        // 是否禁用
        isDisabled: false,
        orderStatus: null,
        liveAnchors: [],
        contentPalteForms: [],
        // 主播
        liveAnchorId: "",
        // 所属平台
        contentPlatFormId: "",
        totalDepositNum: 0,
        dealAmountNum: 0,
        pageCount: 0,
        employeeIds: null,
        positionName: "",
        employee: [{ name: "全部派单客服", id: -1 }],
        belongEmpList: [{ name: "全部归属客服", id: -1 }],
        belongEmpId: -1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        toHospitalStartDate: "",
        toHospitalEndDate: "",
        IsToHospital: -1,
        toHospitalType: null,
        employeeId: -1,
        // 订单状态
        orderStatusList: [],
        // 是否到院数组
        toTheHospitalList: [
          {
            id: -1,
            name: "全部到院状态",
          },
          {
            id: 'true',
            name: "已到院",
          },
          {
            id: 'false',
            name: "未到院",
          },
        ],
        // 是否陪诊
        isAcompanyingList:[
          {
            type:-1,
            name:'全部陪诊状态'
          },
          {
            type:'true',
            name:'是'
          },
          {
            type:'false',
            name:'否'
          }
        ],
        // 是否为老客
        isOldCustomerList:[
          {
            type:-1,
            name:'全部客户业绩'
          },
          {
            type:'true',
            name:'老客'
          },
          {
            type:'false',
            name:'新客'
          }
        ],
        IsToHospital: -1,
        columns: [
          {
            title: "派单人员",
            key: "senderName",
            minWidth: 120,
            align: "center",
          },
          {
            title: "派单时间",
            key: "sendDate",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.sendDate
                  ? this.$moment(params.row.sendDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 100,
            align: "center",
          },
          {
            title: "到院类型",
            key: "toHospitalTypeText",
            minWidth: 120,
            align: "center",
            
          },
          {
            title: "到院时间",
            key: "toHospitalDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.toHospitalDate
                  ? this.$moment(params.row.toHospitalDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          // {
          //   title: "归属客服",
          //   key: "belongEmpName",
          //   minWidth: 120,
          //   align: "center",
          // },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 200,
            align: "center",
          },
          {
            title: "下单平台",
            key: "contentPlatFormName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "主播微信号",
            key: "liveAnchorWeChatNo",
            minWidth: 160,
            align: "center",
          },
          {
            title: "项目",
            key: "goodsName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 150,
            align: "center",
          },
          {
            title: "客户姓名",
            key: "customerName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "是否陪诊",
            key: "isAcompanying",
            minWidth: 120,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 120,
            align: "center",
          },
          // {
          //   title: "订单类型",
          //   key: "orderTypeText",
          //   minWidth: 150,
          //   align: "center",
          // },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 150,
            align: "center",
          },
          {
            title: "抖店订单号",
            key: "otherContentPlatFormOrderId",
            minWidth: 180,
            align: "center",
          },
          {
            title: "定金金额",
            key: "depositAmount",
            minWidth: 100,
            align: "center",
          },
          {
            title: "成交金额",
            key: "dealAmount",
            minWidth: 140,
            align: "center",
          },
          // {
          //   title: "佣金比例(%)",
          //   key: "commissionRatio",
          //   minWidth: 140,
          //   align: "center",
          //   render: (h, params) => {
          //     return h(
          //           "div",
          //           params.row.commissionRatio  ? params.row.commissionRatio + '%' : '0%'
          //         )
          //       ;
          //   }
          // },
          // {
          //   title: "成交时间",
          //   key: "dealDate",
          //   minWidth: 130,
          //   align: "center",
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //         params.row.dealDate ? this.$moment(params.row.dealDate).format(
          //             "YYYY-MM-DD"
          //           ):''
          //     );
          //   },
          // },
          // {
          //   title: "预约医院",
          //   key: "appointmentHospital",
          //   minWidth: 220,
          //   align: "center",
          // },
          {
            title: "派单医院",
            key: "sendHospital",
            minWidth: 220,
            align: "center",
          },
          // {
          //   title: "是否到院",
          //   key: "isToHospital",
          //   minWidth: 100,
          //   align: "center",
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //         params.row.isToHospital == false ? '否' : '是'
          //     );
          //   },
          // },
          // {
          //   title: "咨询内容",
          //   key: "consultingContent",
          //   minWidth: 300,
          // },
          // {
          //   title: "后期项目铺垫",
          //   key: "lateProjectStage",
          //   minWidth: 300,
          //   align: "center",
          // },
          // {
          //   title: "未成交原因",
          //   key: "unDealReason",
          //   minWidth: 300,
          // },
          {
            title: "派单留言",
            key: "sendOrderRemark",
            minWidth: 300,
          },
          // {
          //   title: "医院备注",
          //   key: "hospitalRemark",
          //   minWidth: 300,
          // },
        ],
        data: [],
      },
    };
  },
  methods: {
    //   获取订单到院类型
    getcontentPlateFormOrderToHospitalTypeList() {
      api.contentPlateFormOrderToHospitalTypeList().then((res) => {
        if (res.code === 0) {
          const { orderTypes } = res.data;
          this.toHospitalTypeList = orderTypes;
        }
      });
    },
    tabChange() {
      if (this.activeName == "orderDistribution") {
        // 下单平台
        this.getCustomerServiceDispatchedOrders();
        // 切换的时候清空内容平台所筛选内容
        this.contentInfo.orderStatus = null;
        this.contentInfo.contentPlatFormId = "";
        this.contentInfo.liveAnchorId = "";
        // 如果是客服 则只能查询该客服的订单
        this.query.employeeId =
          sessionStorage.getItem("positionName") == "客服"
            ? Number(sessionStorage.getItem("employeeId"))
            : -1;
        this.query.belongEmpId =
          sessionStorage.getItem("positionName") == "客服"
            ? Number(sessionStorage.getItem("employeeId"))
            : -1;
        this.contentInfo.startDate = this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.contentInfo.endDate = this.$moment(new Date()).format(
          "YYYY-MM-DD"
        );
      } else {
        // 内容平台
        this.getcustomerunContentPlatFormSendOrderList();
        this.getContentValidList();
        this.getContentPlateFormOrderStatusList();
        // 如果是客服 则只能查询该客服的订单
        this.contentInfo.employeeId =
          sessionStorage.getItem("positionName") == "客服"
            ? Number(sessionStorage.getItem("employeeId"))
            : -1;
        this.contentInfo.belongEmpId =
          sessionStorage.getItem("positionName") == "客服"
            ? Number(sessionStorage.getItem("employeeId"))
            : -1;
        this.contentInfo.isDisabled =
          sessionStorage.getItem("positionName") == "客服" ? true : false;
        (this.query.orderStatus = ""),
          (this.query.startDate = this.$moment()
            .startOf("month")
            .format("YYYY-MM-DD"));
        this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
      }
    },
    // 获取客服
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.query.employee = [...this.query.employee, ...employee];
          this.query.belongEmpList = [...this.query.belongEmpList, ...employee];
          this.contentInfo.employee = [
            ...this.contentInfo.employee,
            ...employee,
          ];
          this.contentInfo.belongEmpList = [
            ...this.contentInfo.belongEmpList,
            ...employee,
          ];
          this.query.employee.map((item) => {
            if (this.query.positionName == "客服") {
              if (item.id == this.query.employeeIds) {
                this.query.employeeId = item.id;
                this.query.belongEmpId = item.id;
              }
            }
          });
          this.contentInfo.employee.map((item) => {
            if (this.contentInfo.positionName == "客服") {
              if (item.id == this.contentInfo.employeeIds) {
                this.contentInfo.employeeId = item.id;
                this.contentInfo.belongEmpId = item.id;
                this.contentInfo.isDisabled =
                  sessionStorage.getItem("positionName") == "客服"
                    ? true
                    : false;
              }
            }
          });
          // this.getCustomerServiceDispatchedOrders();
        }
      });
    },
    // 获取客服下单平台已派单
    getCustomerServiceDispatchedOrders(val) {
      const {
        startDate,
        endDate,
        employeeId,
        belongEmpId,
        orderStatus,
      } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        employeeId:sessionStorage.getItem("positionName") == "客服" ? Number(sessionStorage.getItem("employeeId")) :(employeeId == -1 ? null : employeeId),
        belongEmpId:sessionStorage.getItem("positionName") == "客服" ? Number(sessionStorage.getItem("employeeId")) :(belongEmpId == -1 ? null : belongEmpId),
        orderStatus,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      api.customerSendOrderReport(data).then((res) => {
        if (res.code === 0) {
          const { customerSendOrderReport } = res.data;
          this.query.data = customerSendOrderReport;
          this.query.pageCount = this.query.data.length;
          let actualPaymentNum = 0;
          let purchaseSinglePriceNum = 0;
          let purchaseAllNum = 0;
          let purchasePriceNum = 0;
          this.query.data.map((item, index) => {
            actualPaymentNum += Number(item.actualPayment);
            purchaseSinglePriceNum += Number(item.purchaseSinglePrice);
            purchaseAllNum += Number(item.purchaseNum);
            purchasePriceNum += Number(item.purchasePrice);
          });
          this.query.actualPaymentNum =
            Math.floor(actualPaymentNum * 100) / 100;
          this.query.purchaseSinglePriceNum =
            Math.floor(purchaseSinglePriceNum * 100) / 100;
          this.query.purchaseAllNum = Math.floor(purchaseAllNum * 100) / 100;
          this.query.purchasePriceNum =
            Math.floor(purchasePriceNum * 100) / 100;
        }
      });
    },
    // 客服下单平台已派单导出
    exportsendOrder() {
      const {
        startDate,
        endDate,
        employeeId,
        belongEmpId,
        orderStatus,
      } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        employeeId:sessionStorage.getItem("positionName") == "客服" ? Number(sessionStorage.getItem("employeeId")) :(employeeId == -1 ? null : employeeId),
        belongEmpId:sessionStorage.getItem("positionName") == "客服" ? Number(sessionStorage.getItem("employeeId")) :(belongEmpId == -1 ? null : belongEmpId),
        orderStatus,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.customerSendOrderReportExport(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "客服下单平台已派单报表";
        download(res, name);
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentInfo.contentPalteForms = contentPalteForms;
        }
      });
    },
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      api.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.contentInfo.liveAnchors = liveAnchors;
        }
      });
    },
    // 获取内容平台订单状态
    getContentPlateFormOrderStatusList() {
      api.contentPlateFormOrderStatusList().then((res) => {
        if (res.code === 0) {
          const { orderStatus } = res.data;
          this.contentInfo.orderStatusList = orderStatus;
        }
      });
    },
    // 获取客服内容平台已派单
    getcustomerunContentPlatFormSendOrderList(val) {
      const {
        startDate,
        endDate,
        employeeId,
        contentPlatFormId,
        liveAnchorId,
        orderStatus,
        belongEmpId,
        hospitalId,
        toHospitalStartDate,
        toHospitalEndDate,
        IsToHospital,
        toHospitalType,
        isAcompanying,
        isOldCustomer,
        commissionRatio
      } = this.contentInfo;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        employeeId:sessionStorage.getItem("positionName") == "客服" ? Number(sessionStorage.getItem("employeeId")) :(employeeId == -1 ? -1 : employeeId),
        contentPlatFormId: contentPlatFormId ? contentPlatFormId : "",
        liveAnchorId,
        orderStatus,
        belongEmpId:sessionStorage.getItem("positionName") == "客服" ? Number(sessionStorage.getItem("employeeId")) :(belongEmpId == -1 ? -1 : belongEmpId),
        hospitalId: hospitalId == -1 ? null : hospitalId,
        IsToHospital:IsToHospital== -1 ? null : IsToHospital,
        toHospitalStartDate:
          IsToHospital != 'true'
            ? null
            : toHospitalStartDate
            ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD")
            : null,
        toHospitalEndDate:
          IsToHospital != 'true'
            ? null
            : toHospitalEndDate
            ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
            : null,
        toHospitalType:
          IsToHospital != 'true'
            ? null
            : toHospitalType == -1
            ? null
            : toHospitalType,
        isAcompanying: isAcompanying == -1 ? null : isAcompanying,
        isOldCustomer: isOldCustomer == -1 ? null : isOldCustomer,
        commissionRatio
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择派单日期");
        return;
      }
      api.customerSendContentPlatFormOrderReport(data).then((res) => {
        if (res.code === 0) {
          const { customerSendContentPlatFormOrderReport } = res.data;
          this.contentInfo.data = customerSendContentPlatFormOrderReport;
          this.contentInfo.pageCount = this.contentInfo.data.length;
          let totalDepositNum = 0;
          let dealAmountNum = 0;

          this.contentInfo.data.map((item, index) => {
            totalDepositNum += Number(item.depositAmount);
            dealAmountNum += Number(item.dealAmount);
          });
          this.contentInfo.totalDepositNum =
            Math.floor(totalDepositNum * 100) / 100;
          this.contentInfo.dealAmountNum =
            Math.floor(dealAmountNum * 100) / 100;
        }
      });
    },
    // 客服内容平台已派单导出
    exportContent() {
      const {
        startDate,
        endDate,
        employeeId,
        contentPlatFormId,
        liveAnchorId,
        orderStatus,
        belongEmpId,
        toHospitalStartDate,
        toHospitalEndDate,
        IsToHospital,
        toHospitalType,
        isAcompanying,
        isOldCustomer,
        commissionRatio
      } = this.contentInfo;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        employeeId:sessionStorage.getItem("positionName") == "客服" ? Number(sessionStorage.getItem("employeeId")) :(employeeId == -1 ? -1 : employeeId),
        contentPlatFormId,
        liveAnchorId,
        orderStatus,
        belongEmpId:sessionStorage.getItem("positionName") == "客服" ? Number(sessionStorage.getItem("employeeId")) :(belongEmpId == -1 ? -1 : belongEmpId),
        IsToHospital:IsToHospital==-1?null:IsToHospital,
        toHospitalStartDate:
          IsToHospital != 'true'
            ? null
            : toHospitalStartDate
            ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD")
            : null,
        toHospitalEndDate:
          IsToHospital != 'true'
            ? null
            : toHospitalEndDate
            ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
            : null,
        toHospitalType:
          IsToHospital != 'true'
            ? null
            : toHospitalType == -1
            ? null
            : toHospitalType,
        isAcompanying: isAcompanying == -1 ? null : isAcompanying,
        isOldCustomer: isOldCustomer == -1 ? null : isOldCustomer,
        commissionRatio
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择派单日期");
        return;
      }
      if (this.contentInfo.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.customerSendContentPlatFormOrderExport(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "客服内容平台已派单报表";
        download(res, name);
      });
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.query.data = [];
        this.query.startDate = this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
        this.actualPaymentNum = 0;
        this.totalPurchasePrice = 0;
        this.query.status = "";
        this.contentInfo.orderStatus = null;
        this.contentInfo.contentPlatFormId = "";
        this.contentInfo.liveAnchorId = "";
        this.contentInfo.hospitalId = -1;
        this.activeName = "orderDistribution";
        this.$emit("update:customerServiceDispatchOrderModel", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.control = false;
      this.query.data = [];
      this.query.startDate = this.$moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
      this.actualPaymentNum = 0;
      this.totalPurchasePrice = 0;
      this.query.status = "";
      this.contentInfo.orderStatus = null;
      this.contentInfo.contentPlatFormId = "";
      this.contentInfo.liveAnchorId = "";
      this.contentInfo.hospitalId = -1;
      this.activeName = "orderDistribution";
      this.$emit("update:customerServiceDispatchOrderModel", false);
    },
  },
  created() {
    const positionName = sessionStorage.getItem("positionName");
    const employeeIds = sessionStorage.getItem("employeeId");
    this.query.positionName = positionName;
    this.query.employeeIds = employeeIds;
    this.getcontentPlateFormOrderToHospitalTypeList();
  },
  watch: {
    customerServiceDispatchOrderModel(value) {
      this.customerServiceDispatchOrderModels = value;
      // this.getCustomerServiceList()
    },
  },
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px;
  box-sizing: border-box;
}
.header {
  margin-bottom: 20px;
}
.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.num {
  margin-right: 20px;
  font-size: 18px;
  display: flex;
}
.content_con {
  display: flex;
  align-items: center;
}
</style>
