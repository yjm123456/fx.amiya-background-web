<template>
  <div>
    <Modal
      v-model="customerNoDispatchModels"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
      :footer-hide="false"
      title="客服未派单报表"
    >
      <div class="top" style="margin-top:60px">
        <Tabs ref="tabs" v-model="activeName" @on-click="tabChange">
          <TabPane label="下单平台未派单报表" name="orderDistribution">
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
                  placeholder="请选择归属客服"
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
                <Button
                  type="primary"
                  style="margin:0 10px"
                  @click="getCustomerServiceUnDispatch(1)"
                  >查询</Button
                >
                <Button
                  type="primary"
                  @click="exportsendOrder"
                  v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
                  >导出</Button
                >
              </div>
              <Table
                border
                :columns="query.columns"
                :data="query.data"
                height="600"
              ></Table>
            </div>
          </TabPane>
          <TabPane label="内容平台未派单报表" name="contentDispatch">
            <div>
              <div class="header">
                <DatePicker
                  type="date"
                  placeholder="下单开始日期"
                  style="width: 160px; margin-left: 10px"
                  :value="contentInfo.startDate"
                  v-model="contentInfo.startDate"
                ></DatePicker>
                <DatePicker
                  type="date"
                  placeholder="下单结束日期"
                  style="width: 160px; margin-left: 10px"
                  :value="contentInfo.endDate"
                  v-model="contentInfo.endDate"
                ></DatePicker>
                <Select
                  v-model="contentInfo.employeeId"
                  style="width: 200px;margin-left: 10px"
                  placeholder="请选择归属客服"
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
                  v-model="contentInfo.contentPlateFormId"
                  placeholder="请选择主播平台"
                  @on-change="
                    contentPlateChange(contentInfo.contentPlateFormId)
                  "
                  style="width: 180px; margin-left: 10px"
                  filterable
                >
                  <Option
                    v-for="(item, j) in contentInfo.contentPalteForms"
                    :value="item.id"
                    :key="j"
                    >{{ item.contentPlatformName }}</Option
                  >
                </Select>
                <Select
                  v-model="contentInfo.liveAnchorId"
                  placeholder="请选择主播IP账号"
                  style="width: 180px; margin-left: 10px"
                  :disabled="contentInfo.contentPlateFormId === null"
                  filterable
                >
                  <Option
                    v-for="(item, ind) in contentInfo.liveAnchors"
                    :value="item.id"
                    :key="ind"
                    >{{ item.hostAccountName }}</Option
                  >
                </Select>
                <Select
                  v-model="contentInfo.orderStatus"
                  placeholder="请选择订单状态"
                  style="width:200px;margin-left:10px"
                >
                  <Option
                    v-for="item in contentInfo.orderStatusList"
                    :value="item.orderStatus"
                    :key="item.orderStatus"
                    >{{ item.orderStatusText }}</Option
                  >
                </Select>
                <Button
                  type="primary"
                  style="margin:0 10px"
                  @click="getcustomerunContentPlatFormSendOrderList(2)"
                  >查询</Button
                >
                <Button
                  type="primary"
                  @click="exportContent"
                  v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
                  >导出</Button
                >
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
    customerNoDispatchModel: {
      type: Boolean,
    },
  },
  data() {
    return {
      activeName: "orderDistribution",
      customerNoDispatchModels: false,
      // 下单平台
      query: {
        actualPaymentNum: 0,
        pageCount: 0,
        employeeIds: null,
        positionName: "",
        employee: [{ name: "全部归属客服", id: -1 }],
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        employeeId: -1,
        columns: [
          {
            title: "归属客服",
            key: "bindCustomerServiceName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 220,
            align: "center",
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 150,
            align: "center",
          },

          {
            title: "下单日期",
            tooltip: true,
            minWidth: 200,
            align: "center",
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
            title: "预约医院",
            key: "appointmentHospital",
            minWidth: 220,
            align: "center",
          },

          {
            title: "商品",
            key: "goodsName",
            minWidth: 300,
            align: "center",
          },
          {
            title: "订单状态",
            key: "statusText",
            minWidth: 150,
            align: "center",
          },

          {
            title: "实付款",
            key: "actualPayment",
            minWidth: 150,
            align: "center",
          },
          {
            title: "手机号",
            key: "encryptPhone",
            minWidth: 150,
            align: "center",
          },
        ],
        data: [],
      },
      // 内容平台
      contentInfo: {
        isDisabled: false,
        orderStatus: null,
        contentPlateFormId: null,
        liveAnchors: [],
        contentPalteForms: [],
        // 主播
        liveAnchorId: "",
        // 所属平台
        contentPlateFormId: "",
        totalDepositNum: 0,
        dealAmountNum: 0,
        pageCount: 0,
        employeeIds: null,
        positionName: "",
        employee: [{ name: "全部归属客服", id: -1 }],
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        employeeId: -1,
        // 订单状态
        orderStatusList: [],
        columns: [
          {
            title: "归属客服",
            key: "employeeName",
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
            title: "项目",
            key: "goodsName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 300,
          },
          {
            title: "客户姓名",
            key: "customerName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 120,
            align: "center",
          },

          {
            title: "定金",
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
          {
            title: "订单类型",
            key: "orderTypeText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 120,
            align: "center",
          },

          {
            title: "预约医院",
            key: "appointmentHospital",
            minWidth: 220,
            align: "center",
          },
          // {
          //   title: "预约时间",
          //   key: "appointmentDate",
          //   minWidth: 130,
          //   align: "center",
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //       params.row.appointmentDate == "未确认时间"
          //         ? "未确认时间"
          //         : this.$moment(params.row.appointmentDate).format(
          //             "YYYY-MM-DD"
          //           )
          //     );
          //   },
          // },
          {
            title: "备注",
            key: "remark",
            minWidth: 300,
          },
          {
            title: "后期项目铺垫",
            key: "lateProjectStage",
            minWidth: 300,
            align: "center",
          },
        ],
        data: [],
      },
    };
  },
  methods: {
    tabChange() {
      if (this.activeName == "orderDistribution") {
        // 下单平台
        this.getCustomerServiceUnDispatch();
        this.contentInfo.orderStatus = null;
        this.contentInfo.contentPlateFormId = "";
        this.contentInfo.liveAnchorId = "";
        // this.contentInfo.employeeId = -1;
        this.query.employeeId =
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
        // this.query.employeeId = -1;
        this.contentInfo.employeeId =
          sessionStorage.getItem("positionName") == "客服"
            ? Number(sessionStorage.getItem("employeeId"))
            : -1;
        this.contentInfo.isDisabled =
          sessionStorage.getItem("positionName") == "客服" ? true : false;
        this.query.startDate = this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
      }
    },
    // 获取客服
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.query.employee = [...this.query.employee, ...employee];
          this.contentInfo.employee = [
            ...this.contentInfo.employee,
            ...employee,
          ];
          this.query.employee.map((item) => {
            if (this.query.positionName == "客服") {
              if (item.id == this.query.employeeIds) {
                this.query.employeeId = item.id;
              }
            }
          });
          this.contentInfo.employee.map((item) => {
            if (this.query.positionName == "客服") {
              if (item.id == this.query.employeeIds) {
                this.contentInfo.employeeId = item.id;
                this.contentInfo.isDisabled =
                  sessionStorage.getItem("positionName") == "客服"
                    ? true
                    : false;
              }
            }
          });
          // this.getCustomerServiceUnDispatch();
        }
      });
    },
    // 获取客服下单平台未派单
    getCustomerServiceUnDispatch(val) {
      const { startDate, endDate, employeeId } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        employeeId,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      api.customerUnSendOrderReport(data).then((res) => {
        if (res.code === 0) {
          const { customerUnSendOrderReport } = res.data;
          this.query.data = customerUnSendOrderReport;
          this.query.pageCount = this.query.data.length;
          let actualPaymentNum = 0;
          this.query.data.map((item, index) => {
            actualPaymentNum += Number(item.actualPayment);
          });
          this.query.actualPaymentNum =
            Math.floor(actualPaymentNum * 100) / 100;
        }
      });
    },
    // 客服下单平台未派单导出
    exportsendOrder() {
      const { startDate, endDate, employeeId } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        employeeId,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.customerUnSendOrderReportExport(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "客服下单平台未派单报表";
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
    // 获取客服内容平台未派单
    getcustomerunContentPlatFormSendOrderList(val) {
      const {
        startDate,
        endDate,
        employeeId,
        contentPlateFormId,
        liveAnchorId,
        orderStatus,
      } = this.contentInfo;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        employeeId,
        contentPlateFormId: contentPlateFormId ? contentPlateFormId : "",
        liveAnchorId,
        orderStatus,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      api.customerunContentPlatFormSendOrderList(data).then((res) => {
        if (res.code === 0) {
          const { unSendOrder } = res.data;
          this.contentInfo.data = unSendOrder;
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
    // 客服内容平台未派单导出
    exportContent() {
      const {
        startDate,
        endDate,
        employeeId,
        contentPlateFormId,
        liveAnchorId,
        orderStatus,
      } = this.contentInfo;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        employeeId,
        contentPlateFormId,
        liveAnchorId,
        orderStatus,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.contentInfo.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.customerunContentPlatFormSendOrderListExport(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "客服内容平台未派单报表";
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
        this.contentInfo.contentPlateFormId = "";
        this.contentInfo.liveAnchorId = "";
        this.activeName = "orderDistribution";
        this.$emit("update:customerNoDispatchModel", false);
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
      this.contentInfo.contentPlateFormId = "";
      this.contentInfo.liveAnchorId = "";
      this.activeName = "orderDistribution";
      this.$emit("update:customerNoDispatchModel", false);
    },
  },
  created() {
    const positionName = sessionStorage.getItem("positionName");
    const employeeIds = sessionStorage.getItem("employeeId");
    this.query.positionName = positionName;
    this.query.employeeIds = employeeIds;
  },
  watch: {
    customerNoDispatchModel(value) {
      this.customerNoDispatchModels = value;
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
</style>
