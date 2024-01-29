<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" type="card">
      <TabPane label="待审核" name="audit">
        <div>
          <audit
            :activeName="activeName"
            :params="params"
          ></audit>
        </div>
      </TabPane>
      <TabPane label="已审核-助理薪资" name="audited">
        <div>
          <audited
            :activeName="activeName"
            :params="params"
          ></audited>
        </div>
      </TabPane>
      <TabPane label="已审核-行政客服薪资" name="administrativeCustomerService">
        <div>
          <administrativeCustomerService
            :activeName="activeName"
            :params="params"
          ></administrativeCustomerService>
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
import audit from "./views/audit.vue"
import audited from "./views/audited.vue"
import administrativeCustomerService from "./views/administrativeCustomerService.vue"

export default {
  components:{
    audit,
    audited,
    administrativeCustomerService
  },
  data(){
    return {
      activeName: "audit",
      params:{
        // 全部上传人
        creteEmpNameList:[{id:-1,name:'全部上传人'}],
        // 客服
        employeeList:[],
        // 全部客服
        employeeAll:[{id:-1,name:'全部助理'}],
        // 全部助理(客服管理员)
        employeePositionAdmin:[{id:-1,name:'全部助理'}],
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
        checkStateListAll:[{id:-1,name:'全部审核状态'}],
        // 新老客业绩
        isOldCustoemrList:[{
            type:-1,
            name:'全部业绩'
        },{
            type:'false',
            name:'新客业绩'
        },{
            type:'true',
            name:'老客业绩'
        },],
        // 获取薪资审核类型
        reconciliationtCheckType:[],
        // 根据职位获取员工
        employeePosition:[],

      }
    }
  },
  methods:{
    // 根据职位id获取员工
    getEmployeeByPositionIdAdmin(){
      const data = {
        // （客服管理员)线上id
        positionId:4
      }
      employeeManageApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const {employee} =res.data
          this.params.employeePositionAdmin = [...this.params.employeePositionAdmin,...employee]
        }
      });
    },
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
    // 获取薪资审核类型
    geReconciliationtCheckType(){
      reconciliationDocumentsSettleApi.geReconciliationtCheckType().then((res) => {
        if (res.code === 0) {
          const {reconciliationtCheckType} =res.data
          this.params.reconciliationtCheckType = reconciliationtCheckType
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
    this.geReconciliationtCheckType()
    this.getEmployeeByPositionId()
    this.getEmployeeByPositionIdAdmin()
  }
}
</script>
