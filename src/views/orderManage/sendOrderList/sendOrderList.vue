<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="未派单订单列表" name="undeliveredOrderList">
        <div>
          <undeliveredOrderList
            :activeName="activeName"
            @handleCustomerInfoComParams="handleCustomerInfoComParams"
          ></undeliveredOrderList>
        </div>
      </TabPane>
      <TabPane label="已派单信息列表" name="orderedOrderList">
        <div>
          <orderedOrderList
            :activeName="activeName"
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
import undeliveredOrderList from "./components/undeliveredOrderList";
import orderedOrderList from "./components/orderedOrderList";
import customerInfo from "@/components/customerInfo/customerInfo";
export default {
  components: { undeliveredOrderList, orderedOrderList, customerInfo },
  data() {
    return {
      activeName: "undeliveredOrderList",

      // 客户信息组件参数
      customerInfoComParams: {
        userId: "",
        encryptPhone: "",
        controlCustomerInfoDisplay: false,
      },
    };
  },
  methods: {
    handleCustomerInfoComParams(customerInfoComParams) {
      this.customerInfoComParams = customerInfoComParams;
    },

    resetControlCustomerInfoDisplay() {
      this.customerInfoComParams.controlCustomerInfoDisplay = false;
    },
  },
};
</script>

