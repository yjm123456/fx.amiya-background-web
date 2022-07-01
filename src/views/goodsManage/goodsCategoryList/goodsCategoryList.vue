<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="商城" name="shoppingMall">
        <div>
          <shoppingMall
            :activeName="activeName"
          ></shoppingMall>
        </div>
      </TabPane>
      <TabPane label="积分兑换" name="pointExchange">
        <div>
          <pointExchange
            :activeName="activeName"
          ></pointExchange>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import shoppingMall from "./components/shoppingMall.vue"
import pointExchange from "./components/pointExchange.vue"

export default {
  components:{
    shoppingMall,
    pointExchange
  },
  data(){
    return {
      activeName: "shoppingMall",
    }
  },
  methods:{
    
  }
}
</script>
