<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="下单平台已完成订单" name="singlePlatformCompleted">
        <div>
          <singlePlatformCompleted
            :activeName="activeName"
            :checkStateListAll="checkStateListAll"
            :companyNameAllList ="companyNameAllList"
          ></singlePlatformCompleted>
        </div>
      </TabPane>
      <TabPane label="内容平台已完成订单" name="contentCompleted">
        <div>
          <contentCompleted
            :activeName="activeName"
            :checkStateListAll="checkStateListAll"
          ></contentCompleted>
        </div>
      </TabPane>
      <TabPane label="内容平台成交情况" name="transactionOfContentPlatform">
        <div>
          <transactionOfContentPlatform
            :activeName="activeName"
            :checkStateListAll="checkStateListAll"
            :employee ="employee"
            :companyNameAllList ="companyNameAllList"
          ></transactionOfContentPlatform>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import singlePlatformCompleted from "./components/singlePlatformCompleted.vue"
import contentCompleted from "./components/contentCompleted.vue"
import transactionOfContentPlatform from "./components/transactionOfContentPlatform.vue"

import * as api from "@/api/customerManage.js";
import * as orderApi from "@/api/orderManage";
import * as corApi from "@/api/corporateManagement";

export default {
  components:{
    singlePlatformCompleted,
    contentCompleted,
    transactionOfContentPlatform
  },
  data(){
    return {
      activeName: "singlePlatformCompleted",
      checkStateListAll: [{ id: -1, name: "全部审核状态" }],
      employee:[{ id: -1, name: "全部归属客服" }],
       // 收款公司 开票公司
      companyNameAllList: [{ id: -1, name: "全部开票公司" }],
    }
  },
  methods:{
    // 获取公司管理数据下拉框
    getCompany() {
      corApi.getCompanyBaseInfoNameList().then((res) => {
        if (res.code === 0) {
          this.companyNameAllList = [
            ...this.companyNameAllList,
            ...res.data.nameList,
          ];
        }
      });
    },
    // 获取客服列表
    getCustomerServiceList() {
      orderApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
        }
      });
    },
    // 获取审核情况（下拉框）
    getCheckStateList() {
      api.getCheckStateList().then((res) => {
        if (res.code === 0) {
          const { checkStateList } = res.data;
          this.checkStateList = checkStateList;
          this.checkStateListAll = [
            ...this.checkStateListAll,
            ...checkStateList,
          ];
        }
      });
    },
  },
  created(){
    this.getCheckStateList()
    this.getCustomerServiceList()
    this.getCompany()
  }
}
</script>
