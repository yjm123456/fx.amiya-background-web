<template>
  <div>
    <Tabs v-model="activeName" @on-click="handleTabsSwitch" name="customerList">
      <TabPane
        label="绑定客服客户列表"
        name="bindCustomerServiceList"
        tab="customerList"
      >
        <bindCustomerServiceList
          :activeName="activeName"
        ></bindCustomerServiceList>
      </TabPane>
      <TabPane
        label="小程序客户列表"
        name="appletCustomerList"
        tab="customerList"
      >
        <appletCustomerList 
          :activeName="activeName"
        ></appletCustomerList>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import bindCustomerServiceList from "./components/bindCustomerServiceList";
import appletCustomerList from "./components/appletCustomerList";
export default {
  components: {
    bindCustomerServiceList,
    appletCustomerList,
  },
  data() {
    return {
      activeName: "bindCustomerServiceList",
    };
  },
  methods: {
    handleModalVisibleChange(value) {
      if (value === false) {
        this.$emit("handleDetailModalChange");
      }
    },

    handleTabsSwitch(name) {
      this.activeName = name;
    },
  },
};
</script>
