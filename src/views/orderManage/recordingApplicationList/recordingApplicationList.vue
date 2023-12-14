<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" type="card">
      <TabPane label="我提交的" name="mySubmit">
        <div>
          <mySubmit
            :activeName="activeName"
            :params="params"
          ></mySubmit>
        </div>
      </TabPane>
      <TabPane label="我收到的" name="myReceive">
        <div>
          <myReceive
            :activeName="activeName"
            :params="params"
          ></myReceive>
        </div>
      </TabPane>
      <TabPane label="历史记录" name="history" v-if="readDataCenter=='true'">
        <div>
          <history
            :activeName="activeName"
            :params="params"
          ></history>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import * as cusApi from "@/api/customerManage.js";

import mySubmit from "./views/mySubmit.vue"
import myReceive from "./views/myReceive.vue"
import history from "./views/history.vue"

export default {
  components:{
    mySubmit,
    myReceive,
    history
  },
  data(){
    return {
      readDataCenter:sessionStorage.getItem("readDataCenter"),
      activeName: "mySubmit",
      params:{
        // 客服
        employeeList:[],
        // 全部客服
        employeeAll:[{id:-1,name:'全部提交人'}],
        employeeAll2:[{id:-1,name:'全部接收人'}],
        employeeAll3:[{id:-1,name:'全部创建人'}],
        // 医院
        hospitalInfo:[],
        // 全部医院
        hospitallist:[{id:-1,name:'全部医院'}],
        // 审核状态
        checkStateList:[
          {
            id:2,
            name:'审核通过'
          },
          {
            id:1,
            name:'审核不通过'
          },
        ],
        // 全部审核状态
        checkStateListAll:[{id:-1,name:'全部审核状态'}]

      }
    }
  },
  methods:{
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.params.employeeAll = [...this.params.employeeAll, ...employee];
          this.params.employeeAll2 = [...this.params.employeeAll2, ...employee];
          this.params.employeeAll3 = [...this.params.employeeAll3, ...employee];
          this.params.employeeList = employee;
        }
      });
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.params.hospitalInfo = res.data.hospitalInfo;
          this.params.hospitallist = [...this.params.hospitallist, ...res.data.hospitalInfo];
        }
      });
    },
    // 获取审核情况（下拉框）
    getCheckStateList() {
      cusApi.getCheckStateList().then((res) => {
        if (res.code === 0) {
          const { checkStateList } = res.data;
          this.params.checkStateListAll = [
            ...this.params.checkStateListAll,
            ...checkStateList,
          ];
        }
      });
    },
  },
  created(){
    this.getCustomerServiceList()
    this.getHospitalInfonameList()
    this.getCheckStateList()
  }
}
</script>
