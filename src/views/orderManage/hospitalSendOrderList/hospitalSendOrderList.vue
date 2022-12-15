<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" type="card">
      <TabPane label="全部" name="allOrder">
        <div>
          <allOrder
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
          ></allOrder>
        </div>
      </TabPane>
      <TabPane label="未处理" name="unhandled">
        <div>
          <unhandled
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
          ></unhandled>
        </div>
      </TabPane>
      <TabPane label="跟进中" name="followingUp">
        <div>
          <followingUp
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
          ></followingUp>
        </div>
      </TabPane>
      <TabPane label="已到院" name="arrived">
        <div>
          <arrived
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
          ></arrived>
        </div>
      </TabPane>
      <TabPane label="已成交" name="closed">
        <div>
          <closed
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
          ></closed>
        </div>
      </TabPane>
      <TabPane label="重单" name="duplicateOrder">
        <div>
          <duplicateOrder
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
          ></duplicateOrder>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import allOrder from "./components/allOrder.vue"
import unhandled from "./components/unhandled.vue"
import followingUp from "./components/followingUp.vue"
import arrived from "./components/arrived.vue"
import closed from "./components/closed.vue"
import duplicateOrder from "./components/duplicateOrder.vue"

export default {
  components:{
    allOrder,
    unhandled,
    followingUp,
    arrived,
    closed,
    duplicateOrder
  },
  data(){
    return {
      activeName: "allOrder",
      // 到院类型
      toHospitalTypeList:[]
    }
  },
  methods:{
     //   获取订单到院类型
    getcontentPlateFormOrderToHospitalTypeList() {
      api.contentPlateFormOrderToHospitalTypeList().then((res) => {
        if (res.code === 0) {
          const { orderTypes } = res.data;
          this.toHospitalTypeList = orderTypes;
        }
      });
    },
  },
  created(){
    this.getcontentPlateFormOrderToHospitalTypeList()
  }
  
}
</script>
