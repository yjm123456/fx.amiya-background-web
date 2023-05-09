<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" type="card">
      <TabPane label="全部" name="allOrder">
        <div>
          <allOrder
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
            :typeList="typeList"
          ></allOrder>
        </div>
      </TabPane>
      <TabPane label="未处理" name="unhandled">
        <div>
          <unhandled
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
            :typeList="typeList"
          ></unhandled>
        </div>
      </TabPane>
      <TabPane label="跟进中" name="followingUp">
        <div>
          <followingUp
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
            :typeList="typeList"
          ></followingUp>
        </div>
      </TabPane>
      <TabPane label="已到院" name="arrived">
        <div>
          <arrived
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
            :typeList="typeList"
          ></arrived>
        </div>
      </TabPane>
      <TabPane label="已成交" name="closed">
        <div>
          <closed
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
            :typeList="typeList"
          ></closed>
        </div>
      </TabPane>
      <TabPane label="重单" name="duplicateOrder">
        <div>
          <duplicateOrder
            :activeName="activeName"
            :toHospitalTypeList = "toHospitalTypeList"
            :typeList="typeList"
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
      toHospitalTypeList:[],
      // 消费类型
      typeList:[]
    }
  },
  methods:{
    // 消费类型列表
    getContentPlatFormOrderDealInfotypeList() {
      api.ContentPlatFormOrderDealInfotypeList().then((res) => {
        if (res.code === 0) {
          const { typeList } = res.data;
          this.typeList = typeList
        }
      });
    },
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
    this.getContentPlatFormOrderDealInfotypeList()
  }
  
}
</script>
