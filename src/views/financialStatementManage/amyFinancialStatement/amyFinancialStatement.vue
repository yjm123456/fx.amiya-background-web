<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" @on-click="handleTabClick">
      <TabPane label="下单平台对账单" name="singlePlatform">
        <div>
          <singlePlatform
            :activeName="activeName"
            :hospitalList = "hospitalList"
          ></singlePlatform>  
        </div> 
      </TabPane>
      <TabPane label="内容平台对账单" name="contentPlatform">
        <div>
          <contentPlatform
            :activeName="activeName"  
            :hospitalList = "hospitalList"
          ></contentPlatform>
        </div>
      </TabPane>
      <TabPane label="客户升单对账单" name="customerUpgrade">
        <div>
          <customerUpgrade 
            :activeName="activeName"
            :hospitalList = "hospitalList"
          ></customerUpgrade>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import singlePlatform from "./components/singlePlatform.vue"
import contentPlatform from "./components/contentPlatform.vue"
import customerUpgrade from "./components/customerUpgrade.vue"
import * as api from "@/api/orderManage";
export default {
  components:{
    singlePlatform ,
    contentPlatform ,
    customerUpgrade
  },
  data(){
    return {
      activeName: "singlePlatform",
      hospitalList: [{ name: "全部医院", id: -1 }],
    }
  },
  methods: {
    handleTabClick(name) {
      this.activeName = name;
    },
    // 获取合作过的医院列表
    getHospitalList() {
      api.getHospitalList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalList = [
            ...this.hospitalList,
            ...hospitalInfo,
          ];
        }
      });
    },
  },
  created(){
    this.getHospitalList();
  }
}
</script>