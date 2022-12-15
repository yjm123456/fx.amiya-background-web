<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" type="card">
      <TabPane label="接单客户" name="orderReceivingCustomer">
        <div>
          <orderReceivingCustomer
            :activeName="activeName"
            :buyAgainType="buyAgainType"
          ></orderReceivingCustomer>
        </div>
      </TabPane>
      <TabPane label="我的客户" name="myCustomer">
        <div>
          <myCustomer
            :activeName="activeName"
            :buyAgainType="buyAgainType"
          ></myCustomer>
        </div>
      </TabPane>
      <TabPane label="待查重客户" name="unDuplicateCheckingCustomer">
        <div>
          <unDuplicateCheckingCustomer
            :activeName="activeName"
            :buyAgainType="buyAgainType"
          ></unDuplicateCheckingCustomer>
        </div>
      </TabPane>
      <TabPane label="重单客户" name="duplicateCheckingCustomer">
        <div>
          <duplicateCheckingCustomer
            :activeName="activeName"
            :buyAgainType="buyAgainType"
          ></duplicateCheckingCustomer>
        </div>
      </TabPane>

    </Tabs>
  </div>
</template>
<script>
import * as api from "@/api/customerManage";
import orderReceivingCustomer from "./views/orderReceivingCustomer.vue"
import myCustomer from "./views/myCustomer.vue"
import unDuplicateCheckingCustomer from "./views/unDuplicateCheckingCustomer.vue"
import duplicateCheckingCustomer from "./views/duplicateCheckingCustomer.vue"


export default {
  components:{
    orderReceivingCustomer,
    myCustomer,
    unDuplicateCheckingCustomer,
    duplicateCheckingCustomer,

  },
  data(){
    return {
      activeName: "orderReceivingCustomer",
      buyAgainType:[]
    }
  },
  methods:{
    // 获取升单类型
    getAppTypeList(){
      api.appTypeList().then((res) => {
        if(res.code === 0){
          const {buyAgainType} = res.data
          this.buyAgainType = buyAgainType
        }
      })
    },
  },
  created(){
    this.getAppTypeList()
  }
  
}
</script>
