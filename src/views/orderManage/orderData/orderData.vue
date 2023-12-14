<template>
  <div>
    <Card :dis-hover="true" style="margin-bottom:16px;">
      <DatePicker
        type="date"
        placeholder="请选择日期"
        style="width: 140px;"
        :value="query.date"
        v-model="query.date"
      ></DatePicker>
      <Select
        v-model="query.baseLiveAnchorId"
        style="width: 160px; margin-left: 10px"
        placeholder="请选择基础主播"
        filterable
        transfer
      >
        <Option
          v-for="item in liveAnchorBaseInfos"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
    </Select>
    <Select
        v-model="query.contentPlatformId"
        placeholder="请选择主播平台"
        @on-change="contentPlateChange(query.contentPlatformId)"
        style="width: 160px; margin-left: 10px"
        filterable
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
        style="width: 160px; margin-left: 10px"
        :disabled="query.contentPlatformId === null || query.contentPlatformId === -1"
        filterable
      >
        <Option
          v-for="item in liveAnchors"
          :value="item.id"
          :key="item.id"
          >{{ item.hostAccountName }}</Option
        >
      </Select>
      <Select
        v-model="query.wechatNoId"
        placeholder="请选择主播微信号"
        filterable
        style="width: 160px; margin: 0 10px"
      >
        <Option
          v-for="(item,indexs) in weChatListAll"
          :value="item.id"
          :key="indexs"
          >{{ item.weChatNo }}</Option
        >
      </Select>
      <Select
        v-model="query.source"
        placeholder="请选择来源"
        style="width: 160px; margin-right: 10px"
        filterable
      >
        <Option
          v-for="item in sourceList"
          :value="item.orderSource"
          :key="item.orderSource"
          >{{ item.orderSourceText }}</Option
        >
      </Select>
      <Select
        v-model="query.assistantId"
        style="width: 160px;margin-right: 10px"
        placeholder="请选择客服"
        :disabled="isDirector == 'false' && isCustomerService == 'true'"
      >
        <Option v-for="item in employeeListAll" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Button type="primary" @click="getQuery()"
        >查询</Button
      >
    </Card>
    <div>
      <Row :gutter="20">
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: '20%',
          }"
        >
          <infor-card
            icon="icon-zongdingdan"
            background="orange"
            title="总分诊"
          >
            <countTo
              :startVal="0"
              :endVal="orderData.totalShoppingCartRegistionCount"
              :duration="3000"
            ></countTo>
          </infor-card>
        </Col>
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: '20%',
          }"
        >
          <infor-card
            icon="icon-zongdingdan"
            background="#19BE6B"
            title="总订单"
          >
            <countTo
              :startVal="0"
              :endVal="orderData.totalOrderCount"
              :duration="3000"
            ></countTo>
          </infor-card>
        </Col>
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: '20%',
          }"
        >
          <infor-card
            icon="icon-jinrixinzeng"
            background="#2D8CF0"
            title="今日新增订单"
            ><countTo
              :startVal="0"
              :endVal="orderData.todayOrderCount"
              :duration="3000"
            ></countTo
          ></infor-card>
        </Col>
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width: '20%',
          }"
        >
          <infor-card
            icon="icon-dingdan"
            background="#E46CBB"
            title="未派单订单"
            ><countTo
              :startVal="0"
              :endVal="orderData.unSendOrderCount"
              :duration="3000"
            ></countTo
          ></infor-card>
        </Col>
        <Col
          style="float: left;height: 120px;padding-bottom: 10px;"
          :style="{
            width:'20%',
          }"
        >
          <infor-card
            icon="icon-yiwancheng"
            background="#9A66E4"
            title="今日成交订单"
            ><countTo
              :startVal="0"
              :endVal="orderData.todayDealOrderCount"
              :duration="3000"
            ></countTo
          ></infor-card>
        </Col>
      </Row>
    </div>
    <div style="margin-top:10px">
      <Row :gutter="20">
        <Col span="12">
          <Card>
            <todayList :queryParams="query" ref="todayList"></todayList>
          </Card>
        </Col>
        <Col span="12">
          <Card>
            <todayReservation :queryParams="query" ref="todayReservation"></todayReservation>
          </Card>
        </Col>
      </Row>
      <Row :gutter="20" style="margin-top:10px">
        <Col span="12">
          <Card>
            <performanceCompletion :queryParams="query" ref="performanceCompletion"/>
          </Card>
        </Col>
        <Col span="12">
          <Card>
            <todayFollowUp :queryParams="query" ref="todayFollowUp" ></todayFollowUp>
          </Card>
        </Col>
      </Row>
    </div>
   
  </div>
</template>

<script>
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as orderApi from "@/api/orderManage";
import * as liveAnchorApi from "@/api/liveAnchorWechatInfo";
import * as assistantHomePageApi from "@/api/assistantHomePage";
import performanceCompletion from "./components/performanceCompletion.vue"
import * as api from "@/api/orderManage";

import countTo from "vue-count-to";
import inforCard from "./components/infor-card";
import todayStatusChangeOrderList from "./components/todayStatusChangeOrderList";
import todayList from "./components/todayList.vue";
import todayReservation from "./components/todayReservation.vue"
import todayFollowUp from "./components/todayFollowUp.vue"
export default {
  components: {
    countTo,
    inforCard,
    todayList,
    todayStatusChangeOrderList,
    performanceCompletion,
    todayReservation,
    todayFollowUp
  },
  data() {
    return {
      // 是否为客服
      isCustomerService:sessionStorage.getItem('isCustomerService'),
      // 是否为管理员
      isDirector:sessionStorage.getItem('isDirector'),
      query:{
        date:this.$moment().format("YYYY-MM-DD"),
        baseLiveAnchorId:-1,
        contentPlatformId:-1,
        liveAnchorId:'',
        wechatNoId:-1,
        assistantId: sessionStorage.getItem('isDirector') == 'false' && sessionStorage.getItem('isCustomerService') == 'true' ? Number(sessionStorage.getItem('employeeId')): -1,
        source:-1
      },

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
      // 获取订单数据
      orderData: {},

      controlModal: false,
      // 全部基础主播id
      liveAnchorBaseInfos:[{id:-1,name:'全部基础主播'}],
      // 平台
        contentPalteForms:[{id:-1,contentPlatformName:'全部平台'}],
      // ip账号
      liveAnchors: [],
      // 主播微信号
      weChatListAll: [{id:-1,weChatNo:'全部主播微信号'}],
      // 来源
      sourceList: [{orderSource:-1,orderSourceText:'全部来源'}],
      // 客服
      employeeListAll: [{id:-1,name:'全部助理'}],

    };
  },
  methods: {
    // 主播基础数据列表
    getLiveAnchorBaseInfoValids(){
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const {liveAnchorBaseInfos} = res.data
          this.liveAnchorBaseInfos = [...this.liveAnchorBaseInfos,...liveAnchorBaseInfos]
        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = [...this.contentPalteForms,...contentPalteForms]
        }
      });
    },
    
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatformId: value,
      };
      orderApi.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors
        }
      });
    },
    contentPlateChange(value) {
      if (value == -1) {
        this.query.liveAnchorId = ''
        return;
      }
      
      this.getLiveValidList(value);
    },
    //  根据主播获取主播微信号
    getWeChatList() {
      const data = {
        liveanchorId: '',
      };
      liveAnchorApi.getvalidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorWechatInfos } = res.data;
          this.weChatListAll = [...this.weChatListAll,...liveAnchorWechatInfos];
        }
      });
    },
    // 获取订单来源
    getContentPlateFormOrderSourceList(){
      api.contentPlateFormOrderSourceList().then((res) => {
        if (res.code === 0) {
          const { orderSources } = res.data;
          this.sourceList = [...this.sourceList,...orderSources]
        }
      });
    },
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeListAll = [...this.employeeListAll, ...employee];
        }
      });
    },
    // 获取订单数据
    getOrderData() {
      const {date,baseLiveAnchorId,contentPlatformId,liveAnchorId,wechatNoId,source,assistantId} = this.query
      const data = {
        date:this.$moment(date).format("YYYY-MM-DD"),
        baseLiveAnchorId:baseLiveAnchorId == -1 ? null : baseLiveAnchorId,
        contentPlatformId:contentPlatformId == -1 ? null : contentPlatformId,
        liveAnchorId,
        wechatNoId:wechatNoId == -1 ? null : wechatNoId,
        source:source == -1 ? null : source,
        assistantId:assistantId == -1 ? null : assistantId,
      };
      assistantHomePageApi.orderData(data).then((res) => {
        if (res.code === 0) {
          let { orderData } = res.data;
          this.orderData = orderData;
        }
      });
    },
    // 查询
    getQuery(){
      this.getOrderData();
      this.$nextTick(()=>{
        this.$refs.todayList.getHospitalInfo();
        this.$refs.todayReservation.getTodayAppointmentData();
        this.$refs.performanceCompletion.getMonthPerformanceData();
        this.$refs.todayFollowUp.$refs.noFollow.gettodayTrackData();
      })
    },

    handleTodayStatusChangeOrderList() {
      this.controlModal = true;
    },
  },
  created() {
    this.getCustomerServiceList();
    this.getLiveAnchorBaseInfoValids();
    this.getContentValidList();
    this.getWeChatList();
    this.getContentPlateFormOrderSourceList();
    this.getQuery();
  },
};
</script>
<style lang="less" scoped>
/deep/ .ivu-row {
  margin-right: 0 !important;
}
</style>
