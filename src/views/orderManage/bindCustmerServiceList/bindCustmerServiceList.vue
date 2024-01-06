<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="绑定客服" name="bindCustomerService">
        <div>
          <bindCustomerService :activeName="activeName"></bindCustomerService>
        </div>
      </TabPane>
      <TabPane label="已绑定客服订单" name="boundCustomerServiceOrder">
        <div>
          <boundCustomerServiceOrder :activeName="activeName"></boundCustomerServiceOrder>
        </div>
      </TabPane>
      <TabPane label="已绑定客服内容平台订单" name="customerServiceContentPlatformBound">
        <div>
          <customerServiceContentPlatformBound :activeName="activeName"></customerServiceContentPlatformBound>
        </div>
      </TabPane>
      <TabPane label="已绑定客户池客服手机号" name="customerPool">
        <div>
          <customerPool :activeName="activeName"></customerPool>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import bindCustomerService from "./components/bindCustomerService";
import boundCustomerServiceOrder from "./components/boundCustomerServiceOrder";
import customerServiceContentPlatformBound from "./components/customerServiceContentPlatformBound.vue"
import customerPool from "./components/customerPool.vue"
export default {
  components: { bindCustomerService, boundCustomerServiceOrder,customerServiceContentPlatformBound,customerPool },
  data() {
    return { activeName: "bindCustomerService" };
  },
  computed: {},
};
</script>
