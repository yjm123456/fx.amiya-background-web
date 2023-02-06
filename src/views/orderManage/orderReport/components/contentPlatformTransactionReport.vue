<template>
  <div>
    <Modal
      v-model="contentDealModals"
      title="内容平台成交报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
      <DatePicker
        type="date"
        placeholder="下单开始日期"
        style="width: 160px;"
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
        v-model="query.checkState"
        placeholder="审核状态"
        style="width: 12.5rem; margin-left: 10px"
      >
        <Option
          v-for="item in query.checkStateListAll"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Select
        v-model="query.contentPlatFormId"
        placeholder="请选择主播平台"
        @on-change="contentPlateChange(query.contentPlatFormId)"
        style="width: 180px; margin-left: 10px"
      >
        <Option
          v-for="item in contentPalteForms"
          :value="item.id"
          :key="item.id"
          >{{ item.contentPlatformName }}</Option
        >
      </Select>
      <Select
        v-model="query.liveAnchorId"
        placeholder="请选择主播IP账号"
        style="width: 180px; margin-left: 10px"
        :disabled="query.contentPlatFormId == null"
      >
        <Option v-for="item in liveAnchors" :value="item.id" :key="item.id">{{
          item.hostAccountName
        }}</Option>
      </Select>
      <Select
        v-model="query.dealHospitalId"
        style="width: 210px; margin-left: 10px"
        placeholder="医院"
        filterable
      >
        <Option
          v-for="item in dealHospitalList"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Button
        type="primary"
        style="margin:0 10px"
        @click="ContentPlatFormOrderDealReport"
        >查询</Button
      >
      <Button
        type="primary"
        @click="exportsendOrder"
        v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
        >导出</Button
      >
      <Card class="container">
        <div>
          <Table
            border
            :columns="query.columns"
            :data="query.data"
            height="700"
          ></Table>
        </div>
      </Card>
      <div slot="footer" class=" foot">
        <div style="display:flex">
          <div class="num">
            合计对账金额：
            <div style="color:red">{{ checkPrice }}</div>
          </div>
          <div class="num">
            服务费合计：
            <div style="color:red">{{ settlePrice }}</div>
          </div>
          <div class="num">
            合计定金金额：
            <div style="color:red">{{ depositAmount }}</div>
          </div>
          <div class="num">
            合计成交金额：
            <div style="color:red">{{ dealAmount }}</div>
          </div>

          <div class="num">
            总条数：
            <div style="color:red">{{ pageCount }}</div>
          </div>
        </div>
        <Button @click="cancelSubmits()">关闭页面</Button>
        <!-- <Button type="primary" @click="handleSubmit()">确定</Button> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as apis from "@/api/customerManage.js";
import { download } from "@/utils/util";
export default {
  props: {
    contentDealModal: {
      type: Boolean,
    },
    contentPalteForms: {
      type: Array,
    },
    dealHospitalList: {
      type: Array,
    },
  },
  data() {
    return {
      // 主播IP账号
      liveAnchors: [],
      checkPrice: 0,
      depositAmount: 0,
      settlePrice: 0,
      dealAmount: 0,
      pageCount: 0,
      contentDealModals: false,
      query: {
        dealHospitalId: -1,
        contentPlatFormId: null,
        liveAnchorId: null,
        checkStateListAll: [{ id: -1, name: "全部审核状态" }],
        checkState: -1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        columns: [
          {
            title: "订单号",
            key: "id",
            minWidth: 170,
          },

          // {
          //   title: "预约时间",
          //   key: "appointmentDate",
          //   minWidth: 140,
          //   render: (h, params) => {
          //     return h("div",params.row.appointmentDate == '未预约时间' ? '未预约时间':this.$moment(params.row.appointmentDate).format("YYYY-MM-DD"));
          //   },
          // },
          {
            title: "面诊类型",
            key: "consultationTypeText",
            minWidth: 100,
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 160,
          },

          {
            title: "预约医院",
            key: "appointmentHospitalName",
            minWidth: 220,
          },
          {
            title: "到院医院",
            key: "lastDealHospital",
            minWidth: 220,
          },
          {
            title: "项目",
            key: "goodsName",
            minWidth: 120,
          },
          {
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 400,
          },
          {
            title: "下单时间",
            key: "createDate",
            minWidth: 180,
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
            title: "下单平台",
            key: "contentPlatformName",
            minWidth: 100,
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 130,
          },
          {
            title: "主播微信号",
            key: "liveAnchorWeChatNo",
            minWidth: 130,
          },

          {
            title: "订单类型",
            key: "orderTypeText",
            minWidth: 120,
          },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 120,
            render: (h, params) => {
              if (params.row.orderStatusText == "已成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "医院重单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "已派单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "未成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
                    },
                  },
                  params.row.orderStatusText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.orderStatusText
                );
              }
            },
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
            minWidth: 120,
          },
          {
            title: "成交金额",
            key: "dealAmount",
            minWidth: 120,
          },
          {
            title: "成交时间",
            key: "sendDate",
            minWidth: 180,
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 140,
          },
          {
            title: "未成交原因",
            key: "unDealReason",
            minWidth: 300,
          },
          {
            title: "后期铺垫",
            key: "lateProjectStage",
            minWidth: 300,
          },
          {
            title: "新老客业绩",
            minWidth: 120,
            key: "isOldCustomer",
          },
          {
            title: "是否陪诊",
            minWidth: 100,
            key: "isAcompanying",
          },
          // {
          //   title: "佣金比例(%)",
          //   minWidth: 120,
          //   key: "commissionRatio",
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //       params.row.commissionRatio
          //         ? params.row.commissionRatio + "%"
          //         : "0%"
          //     );
          //   },
          // },
          {
            title: "备注",
            key: "remark",
            minWidth: 300,
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 180,
            render: (h, params) => {
              return params.row.checkDate
                ? h(
                    "div",
                    this.$moment(params.row.checkDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 120,
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
          },
          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 120,
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 300,
          },
          {
            title: "审核人",
            key: "checkByName",
            minWidth: 120,
          },
          {
            title: "是否回款",
            key: "isReturnBackPrice",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.isReturnBackPrice == true) {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.isReturnBackPrice == true ? "已回款" : "未回款"
                );
              } else if (params.row.isReturnBackPrice == false) {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.isReturnBackPrice == true ? "已回款" : "未回款"
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.isReturnBackPrice == true ? "已回款" : "未回款"
                );
              }
            },
          },
          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.returnBackDate
                ? h(
                    "div",
                    this.$moment(params.row.returnBackDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
        ],
        data: [],
      },
    };
  },
  methods: {
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
          this.liveAnchors = liveAnchors;
        }
      });
    },
    // 获取审核情况（下拉框）
    getCheckStateList() {
      apis.getCheckStateList().then((res) => {
        if (res.code === 0) {
          const { checkStateList } = res.data;
          this.checkStateList = checkStateList;
          this.query.checkStateListAll = [
            ...this.query.checkStateListAll,
            ...checkStateList,
          ];
        }
      });
    },
    // 获取内容平台成交订单报表
    ContentPlatFormOrderDealReport() {
      const {
        startDate,
        endDate,
        checkState,
        liveAnchorId,
        dealHospitalId,
      } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        checkState: checkState == -1 ? null : checkState,
        liveAnchorId,
        dealHospitalId: dealHospitalId == -1 ? null : dealHospitalId,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      api.ContentPlatFormOrderDealReport(data).then((res) => {
        if (res.code === 0) {
          const { ContentPlatFormOrderDealInfo } = res.data;
          this.query.data = ContentPlatFormOrderDealInfo;
          this.pageCount = this.query.data.length;
          let checkPrice = 0;
          let depositAmount = 0;
          let settlePrice = 0;
          let dealAmount = 0;
          this.query.data.map((item, index) => {
            checkPrice += Number(item.checkPrice);
            depositAmount += Number(item.depositAmount);
            settlePrice += Number(item.settlePrice);
            dealAmount += Number(item.dealAmount);
          });
          this.checkPrice = Math.floor(checkPrice * 100) / 100;
          this.depositAmount = Math.floor(depositAmount * 100) / 100;
          this.settlePrice = Math.floor(settlePrice * 100) / 100;
          this.dealAmount = Math.floor(dealAmount * 100) / 100;
        }
      });
    },
    // 导出
    exportsendOrder() {
      const {
        startDate,
        endDate,
        checkState,
        liveAnchorId,
        dealHospitalId,
      } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        checkState: checkState == -1 ? null : checkState,
        liveAnchorId,
        dealHospitalId: dealHospitalId == -1 ? null : dealHospitalId,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.ExportContentPlatFormOrderDealReport(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "内容平台成交报表";
        download(res, name);
      });
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        // this.$refs["form"].resetFields();
        this.$emit("update:contentDealModal", false);
      }
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        // this.$refs["form"].resetFields();
        this.$emit("update:contentDealModal", false);
        this.query.data = [];
        this.query.startDate = this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
        this.pageCount = 0;
        this.query.checkState = -1;
        this.checkPrice = 0;
        this.depositAmount = 0;
        this.settlePrice = 0;
        this.dealAmount = 0;
        this.query.liveAnchorId = null;
        this.query.contentPlatFormId = null;
        this.liveAnchors = [];
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.$emit("update:contentDealModal", false);
      this.query.data = [];
      this.query.startDate = this.$moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
      this.pageCount = 0;
      this.query.checkState = -1;
      this.checkPrice = 0;
      this.depositAmount = 0;
      this.settlePrice = 0;
      this.dealAmount = 0;
      this.query.liveAnchorId = null;
      this.query.contentPlatFormId = null;
      this.liveAnchors = [];
    },
  },
  created() {
    // this.ContentPlatFormOrderDealReport()
    this.getCheckStateList();
  },
  watch: {
    contentDealModal(value) {
      this.contentDealModals = value;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
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
