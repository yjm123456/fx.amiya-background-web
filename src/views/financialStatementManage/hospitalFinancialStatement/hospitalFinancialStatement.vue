<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" @on-click="handleTabClick">
      <TabPane label="下单平台对账单" name="statementOfOrderPlatform">
        <div>
          <statementOfOrderPlatform
            :activeName="activeName"
          ></statementOfOrderPlatform>  
        </div> 
      </TabPane>
      <TabPane label="内容平台对账单" name="contentPlatformStatement">
        <div>
          <contentPlatformStatement
            :activeName="activeName"  
          ></contentPlatformStatement>
        </div>
      </TabPane>
      <TabPane label="客户升单对账单" name="customerUpgradeStatement">
        <div>
          <customerUpgradeStatement 
            :activeName="activeName"
          ></customerUpgradeStatement>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import statementOfOrderPlatform from "./components/statementOfOrderPlatform.vue"
import contentPlatformStatement from "./components/contentPlatformStatement.vue"
import customerUpgradeStatement from "./components/customerUpgradeStatement.vue"
export default {
  components:{
    statementOfOrderPlatform,
    contentPlatformStatement,
    customerUpgradeStatement
  },
  data(){
    return {
      activeName: "statementOfOrderPlatform",
    }
  },
  methods: {
    handleTabClick(name) {
      this.activeName = name;
    },
  },
}
</script>