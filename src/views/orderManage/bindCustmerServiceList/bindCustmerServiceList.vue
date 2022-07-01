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
    </Tabs>
  </div>
</template>

<script>
import bindCustomerService from "./components/bindCustomerService";
import boundCustomerServiceOrder from "./components/boundCustomerServiceOrder";
import customerServiceContentPlatformBound from "./components/customerServiceContentPlatformBound.vue"
export default {
  components: { bindCustomerService, boundCustomerServiceOrder,customerServiceContentPlatformBound },
  data() {
    return { activeName: "bindCustomerService" };
  },
  computed: {},
};
</script>
