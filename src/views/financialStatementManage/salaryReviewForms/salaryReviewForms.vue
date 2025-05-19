<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" type="card">
      <TabPane label="助理业绩" name="assistantPerformance">
        <div>
          <assistantPerformance
            :activeName="activeName"
            :params="params"
          ></assistantPerformance>
        </div>
      </TabPane>
      <TabPane label="助理业绩-已提取" name="assistantPerformanceExtracted">
        <div>
          <assistantPerformanceExtracted
            :activeName="activeName"
            :params="params"
          ></assistantPerformanceExtracted>
        </div>
      </TabPane>
      <TabPane label="行政客服-已提取" name="administration">
        <div>
          <administration
            :activeName="activeName"
            :params="params"
          ></administration>
        </div>
      </TabPane>
      
    </Tabs>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import * as cusApi from "@/api/customerManage.js";
import * as reconciliationDocumentsSettleApi from "@/api/reconciliationDocumentsSettle";
import * as employeeManageApi from "@/api/employeeManage";
import assistantPerformance from "./views/assistantPerformance.vue"
import assistantPerformanceExtracted from "./views/assistantPerformanceExtracted.vue"
import administration from "./views/administration.vue"
import {processEnv} from "@/http/baseUrl";

export default {
  components:{
    assistantPerformance,
    assistantPerformanceExtracted,
    administration
  },
  data(){
    return {
      processEnv,
      activeName: "assistantPerformance",
      params:{
        // 全部上传人
        creteEmpNameList:[{id:-1,name:'全部上传人'}],
        // 客服
        employeeList:[],
        // 全部客服
        employeeAll:[{id:-1,name:'全部归属客服'}],
        // 全部助理(客服管理员)
        // employeePositionAdmin:[{id:-1,name:'全部助理'}],
        
        // 根据职位获取员工
        employeePosition:[],
        // 薪资业绩类型
        PerformanceTypeList:[],
        performanceTypeListAll:[{id:-1,name:'全部业绩类型'}]

      }
    }
  },
  methods:{
    // 根据职位id获取员工
    // getEmployeeByPositionIdAdmin(){
    //   const data = {
    //     // （客服管理员)线上id 4 测试5
    //     positionId:processEnv.VUE_APP_BASE_URL == 'https://www.ameiyes.com' ? 4 : 5
        
    //   }
    //   employeeManageApi.getEmployeeByPositionId(data).then((res) => {
    //     if (res.code === 0) {
    //       const {employee} =res.data
    //       this.params.employeePositionAdmin = [...this.params.employeePositionAdmin,...employee]
    //     }
    //   });
    // },
    // 根据职位id获取员工
    getEmployeeByPositionId(){
      const data = {
        // (行政客服) 测试线上都是30
        positionId:30
      }
      employeeManageApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const {employee} =res.data
          this.params.employeePosition = employee
        }
      });
    },
    
    // 获取薪资业绩类型
    getPerformanceType() {
      reconciliationDocumentsSettleApi.PerformanceType().then((res) => {
        if (res.code === 0) {
          const {PerformanceTypeList} =res.data
          this.params.PerformanceTypeList = PerformanceTypeList
          this.params.performanceTypeListAll = [...this.params.performanceTypeListAll,...PerformanceTypeList]
        }
      });
    },
    // 获取上传人列表
    getcreateEmpNameList() {
      reconciliationDocumentsSettleApi.createEmpNameList().then((res) => {
        if (res.code === 0) {
          const {creteEmpNameList} =res.data
          this.params.creteEmpNameList = [...this.params.creteEmpNameList,...creteEmpNameList]
        }
      });
    },
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.params.employeeAll = [...this.params.employeeAll, ...employee];
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
    this.getcreateEmpNameList()
    this.getPerformanceType()
    this.getEmployeeByPositionId()
  }
}
</script>
