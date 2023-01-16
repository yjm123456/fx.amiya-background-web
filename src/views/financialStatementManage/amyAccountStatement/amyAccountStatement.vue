<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" @on-click="handleTabClick" type="card">
      <TabPane label="当前对账" name="currentReconciliation">
        <div>
          <currentReconciliation
            :activeName="activeName"
            :hospitalInfo="hospitalInfo"
          ></currentReconciliation>  
        </div> 
      </TabPane>
      <TabPane label="待确认对账单" name="statementToBeConfirmed">
        <div>
          <statementToBeConfirmed
            :activeName="activeName"  
            :hospitalInfo="hospitalInfo"
          ></statementToBeConfirmed>
        </div>
      </TabPane>
      <TabPane label="问题账单" name="problemBill">
        <div>
          <problemBill 
            :activeName="activeName"
            :hospitalInfo="hospitalInfo"
          ></problemBill>
        </div>
      </TabPane>
      <TabPane label="当月对账完成账单" name="curAccountStatement">
        <div>
          <curAccountStatement 
            :activeName="activeName"
            :hospitalAllList="hospitalAllList"
          ></curAccountStatement>
        </div>
      </TabPane>
      <TabPane label="历史对账" name="historicalReconciliation">
        <div>
          <historicalReconciliation 
            :activeName="activeName"
            :hospitalAllList="hospitalAllList"
          ></historicalReconciliation>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
import currentReconciliation from "./views/currentReconciliation/currentReconciliation.vue"
import statementToBeConfirmed from "./views/statementToBeConfirmed/statementToBeConfirmed.vue"
import problemBill from "./views/problemBill/problemBill.vue"
import curAccountStatement from "./views/curAccountStatement/curAccountStatement.vue"
import historicalReconciliation from "./views/historicalReconciliation/historicalReconciliation.vue"
export default {
  components:{
    currentReconciliation ,
    statementToBeConfirmed ,
    problemBill,
    curAccountStatement,
    historicalReconciliation,
  },
  data(){
    return {
      activeName: "currentReconciliation",
      hospitalInfo:[],
      hospitalAllList:[{id:-1,name:'全部医院'}]
    }
  },
  methods: {
    handleTabClick(name) {
      this.activeName = name;
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      api.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
          this.hospitalAllList = [...this.hospitalAllList,...res.data.hospitalInfo];
        }
      });
    },
    
  },
  created(){
    this.getHospitalInfonameList()
  }
}
</script>