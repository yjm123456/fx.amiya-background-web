<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      
      <TabPane label="维多对账单" name="weiduo">
        <div>
          <weiduo
            :activeName="activeName"
          ></weiduo>
        </div>
      </TabPane>
      <TabPane label="连天美对账单" name="liantianmei">
        <div>
          <liantianmei
            :activeName="activeName"
          ></liantianmei>
        </div>
      </TabPane>
      <TabPane label="其他对账单" name="statementOfAccount">
        <div>
          <statementOfAccount
            :activeName="activeName"
          ></statementOfAccount>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import statementOfAccount from "./views/statementOfAccount.vue"
import weiduo from "./views/weiduo.vue"
import liantianmei from "./views/liantianmei.vue"

export default {
  components:{
    statementOfAccount,
    weiduo,
    liantianmei
  },
  data(){
    return {
      activeName: "weiduo",
    }
  },
  methods:{
    
  }
}
</script>
