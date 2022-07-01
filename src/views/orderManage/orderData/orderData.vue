<template>
  <div>
    <Card :dis-hover="true" style="margin-bottom:16px;">
      <Select
        v-model="employeeId"
        style="width: 200px;margin-right: 10px"
        placeholder="请选择客服"
        v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }"
      >
        <Option v-for="item in employeeList" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Input
        v-model="keyword"
        style="width:200px;margin-right: 10px"
        placeholder="请输入订单号或商品名称"
        @keyup.enter.native="getData()"
      />
      <Select
        v-model="statusCode"
        style="width: 200px;margin-right: 10px"
        placeholder="请选择订单状态"
      >
        <Option
          v-for="item in statusCodeList"
          :value="item.value"
          :key="item.value"
          >{{ item.name }}</Option
        >
      </Select>
      <Button type="primary" @click="getData()"
        >查询</Button
      >
    </Card>
    <div>
      <Row :gutter="20">
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: orderData.unBindCustoemrServiceQuantity ? '20%' : '25%',
          }"
        >
          <infor-card
            icon="icon-zongdingdan"
            background="#19BE6B"
            title="总订单"
          >
            <countTo
              :startVal="0"
              :endVal="orderData.totalOrderQuantity"
              :duration="3000"
            ></countTo>
          </infor-card>
        </Col>
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: orderData.unBindCustoemrServiceQuantity ? '20%' : '25%',
          }"
        >
          <infor-card
            icon="icon-jinrixinzeng"
            background="#2D8CF0"
            title="今日新增订单"
            ><countTo
              :startVal="0"
              :endVal="orderData.todayIncrementQuantity"
              :duration="3000"
            ></countTo
          ></infor-card>
        </Col>
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: orderData.unBindCustoemrServiceQuantity ? '20%' : '25%',
          }"
        >
          <infor-card
            @click.native="handleTodayStatusChangeOrderList"
            icon="icon-zhuangtai"
            background="#E46CBB"
            :title="orderData.latelyStatusChangeDate ? '有订单更新' : ''"
          >
            <span
              v-if="!orderData.latelyStatusChangeDate"
              style="font-size:22px;"
            >
              今天暂无订单更新
            </span>
            <span v-else>
              <Time :time="orderData.latelyStatusChangeDate" />
            </span>
          </infor-card>
        </Col>
        <Col
          v-if="orderData.unBindCustoemrServiceQuantity"
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: orderData.unBindCustoemrServiceQuantity ? '20%' : '25%',
          }"
        >
          <infor-card
            icon="icon-weibangding"
            background="#ED3F14"
            title="未绑定客服订单"
            ><countTo
              :startVal="0"
              :endVal="orderData.unBindCustoemrServiceQuantity"
              :duration="3000"
            ></countTo
          ></infor-card>
        </Col>
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: orderData.unBindCustoemrServiceQuantity ? '20%' : '25%',
          }"
        >
          <infor-card
            icon="icon-weipaidan"
            background="#9A66E4"
            title="未派单订单"
            ><countTo
              :startVal="0"
              :endVal="orderData.unSendOrderQuantity"
              :duration="3000"
            ></countTo
          ></infor-card>
        </Col>
      </Row>
    </div>
    <div style="margin-top:10px">
      <Row :gutter="20">
        <Col span="8">
          <Card>
            <pie :employeeId="employeeId" ref="pie"></pie>
          </Card>
        </Col>
        <Col span="16">
          <Card>
            <orderList
              :employeeId="employeeId"
              :keyword="keyword"
              :statusCode="statusCode"
              ref="orderList"
            ></orderList>
          </Card>
        </Col>
      </Row>
    </div>
    <!-- 今天订单状态发生改变的订单列表 -->
    <todayStatusChangeOrderList
      :controlModal="controlModal"
      :employeeId="employeeId"
      :keyword="keyword"
      :statusCode="statusCode"
      @handleModalChange="controlModal = false"
    >
    </todayStatusChangeOrderList>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import inforCard from "./components/infor-card";
import pie from "./components/pie";
import orderList from "./components/orderList";
import * as api from "@/api/orderManage";
import todayStatusChangeOrderList from "./components/todayStatusChangeOrderList";
export default {
  components: {
    countTo,
    inforCard,
    pie,
    orderList,
    todayStatusChangeOrderList,
  },
  data() {
    return {
      employeeList: [],

      employeeId: 0,

      keyword: "",

      statusCodeList: [
        {
          name: "等待买家付款",
          value: "WAIT_BUYER_PAY",
        },
        {
          name: "等待卖家发货",
          value: "WAIT_SELLER_SEND_GOODS",
        },
        {
          name: "等待买家确认收货",
          value: "WAIT_BUYER_CONFIRM_GOODS",
        },
        {
          name: "交易成功",
          value: "TRADE_FINISHED",
        },
        {
          name: "退款成功后交易自动关闭",
          value: "TRADE_CLOSED",
        },
        {
          name: "付款以前卖家或买家主动关闭交易",
          value: "TRADE_CLOSED_BY_TAOBAO",
        },
        {
          name: "买家已签收,货到付款专用",
          value: "TRADE_BUYER_SIGNED",
        },
        {
          name: "暂停",
          value: "POP_ORDER_PAUSE POP",
        },
        {
          name: "取消",
          value: "TRADE_CANCELED",
        },
        {
          name: "已锁定",
          value: "LOCKED",
        },
      ],

      statusCode: "",

      orderData: {},

      controlModal: false,
    };
  },
  methods: {
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeList = [...this.employeeList, ...employee];
        }
      });
    },

    getData() {
      const data = {
        employeeId: this.employeeId,
      };
      api.getHeadOrderData(data).then((res) => {
        if (res.code === 0) {
          let { orderData } = res.data;
          this.orderData = orderData;
        }
      });
      this.$refs.pie.getOrderStatusData();
      this.$refs.orderList.byEmployeeIdGetOrderList();
    },

    handleTodayStatusChangeOrderList() {
      this.controlModal = true;
    },
  },
  mounted() {
    this.getCustomerServiceList();
    this.getData();
  },
};
</script>
<style lang="less" scoped>
/deep/ .ivu-row {
  margin-right: 0 !important;
}
</style>
