<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="内容平台未派单订单列表" name="undeliveredOrderList">
        <div>
          <undeliveredOrderList
            :activeName="activeName"
            :consultationNameList="consultationNameList"
            :liveAnchorBaseInfos="liveAnchorBaseInfos"
            @handleCustomerInfoComParams="handleCustomerInfoComParams"
          ></undeliveredOrderList>
        </div>
      </TabPane>
      <TabPane label="内容平台已派单信息列表" name="orderedOrderList">
        <div>
          <orderedOrderList
            :activeName="activeName"
            :consultationNameList="consultationNameList"
            :liveAnchorBaseInfos="liveAnchorBaseInfos"
            @handleCustomerInfoComParams="handleCustomerInfoComParams"
          ></orderedOrderList>
        </div>
      </TabPane>
    </Tabs>

    <!-- 客户详情 -->
    <customerInfo
      @resetControlCustomerInfoDisplay="resetControlCustomerInfoDisplay"
      :customerInfoComParams="customerInfoComParams"
    />
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";

import undeliveredOrderList from "./components/undeliveredOrderList";
import orderedOrderList from "./components/orderedOrderList";
import customerInfo from "@/components/customerInfo/customerInfo";
export default {
  components: { undeliveredOrderList, orderedOrderList, customerInfo },
  data() {
    return {
      activeName: "undeliveredOrderList",
      // 面诊员
      consultationNameList:[{id:-1,name:'全部面诊员'}],
      // 客户信息组件参数
      customerInfoComParams: {
        userId: "",
        encryptPhone: "",
        controlCustomerInfoDisplay: false,
      },
      // 全部基础主播id
      liveAnchorBaseInfos:[{id:-1,name:'全部基础主播'}]
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
    getconsultationNameList(){
      api.consultationNameList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.consultationNameList = [...this.consultationNameList,...employee]
        }
      });
    },
    handleCustomerInfoComParams(customerInfoComParams) {
      this.customerInfoComParams = customerInfoComParams;
    },

    resetControlCustomerInfoDisplay() {
      this.customerInfoComParams.controlCustomerInfoDisplay = false;
    },
  },
  created(){
    this.getconsultationNameList()
    this.getLiveAnchorBaseInfoValids()
  }
};
</script>

