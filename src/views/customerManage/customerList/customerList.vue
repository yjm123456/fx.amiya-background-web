<template>
  <div>
    <Tabs v-model="activeName" @on-click="handleTabsSwitch" name="customerList">
      <TabPane
        label="客户RFM分析"
        name="customerRFM"
        tab="customerList"
      >
        <customerRFM
          :activeName="activeName"
          :employee="employee"
        ></customerRFM>
      </TabPane>
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
import * as api from "@/api/customerManage";

import bindCustomerServiceList from "./components/bindCustomerServiceList";
import appletCustomerList from "./components/appletCustomerList";
import customerRFM from "./components/customerRFM";
export default {
  components: {
    bindCustomerServiceList,
    appletCustomerList,
    customerRFM
  },
  data() {
    return {
      activeName: "customerRFM",
      employee: [{ name: "全部客服", id: -1 }],
    };
  },
  created(){
    this.getCustomerServiceList()
  },
  methods: {
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
        }
      });
    },
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
