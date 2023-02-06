<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="商城" name="shoppingMall">
        <div>
          <shoppingMall
            :activeName="activeName"
            :params="params"
          ></shoppingMall>
        </div>
      </TabPane>
      <TabPane label="积分兑换" name="pointExchange">
        <div>
          <pointExchange
            :activeName="activeName"
            :params="params"
          ></pointExchange>
        </div>
      </TabPane>
      <TabPane label="加钱购" name="overValueExchange">
        <div>
          <overValueExchange
            :activeName="activeName"
            :params="params"
          ></overValueExchange>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import * as api from "@/api/goodsManage";

import shoppingMall from "./components/shoppingMall.vue"
import pointExchange from "./components/pointExchange.vue"
import overValueExchange from "./components/overValueExchange.vue"

export default {
  components:{
    shoppingMall,
    pointExchange,
    overValueExchange
  },
  data(){
    return {
      activeName: "shoppingMall",
      
      params:{
        miniprogramName:[],
      }
    }
  },
  methods:{
    // 获取小程序名称列表
    getminiprogramNameList() {
      api.miniprogramNameList().then((res) => {
        if (res.code === 0) {
          const { nameList } = res.data;
          this.params.miniprogramName = nameList;
        }
      });
    },
  },
  created(){
    this.getminiprogramNameList()
  }
}
</script>
