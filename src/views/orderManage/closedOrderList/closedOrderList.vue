<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="下单平台已完成订单" name="singlePlatformCompleted">
        <div>
          <singlePlatformCompleted
            :activeName="activeName"
            :checkStateListAll="checkStateListAll"
            :companyNameAllList ="companyNameAllList"
          ></singlePlatformCompleted>
        </div>
      </TabPane>
      <TabPane label="内容平台已完成订单" name="contentCompleted">
        <div>
          <contentCompleted
            :activeName="activeName"
            :checkStateListAll="checkStateListAll"
          ></contentCompleted>
        </div>
      </TabPane>
      <TabPane label="内容平台成交情况" name="transactionOfContentPlatform">
        <div>
          <transactionOfContentPlatform
            :activeName="activeName"
            :checkStateListAll="checkStateListAll"
            :employee ="employee"
            :companyNameAllList ="companyNameAllList"
          ></transactionOfContentPlatform>
        </div>
      </TabPane>
      <TabPane label="客户在院消费查询" name="customerConsumptionInTheHospital">
        <div>
          <customerConsumptionInTheHospital
            :activeName="activeName"
            :hospitalParams="hospitalParams"
          ></customerConsumptionInTheHospital>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import singlePlatformCompleted from "./components/singlePlatformCompleted.vue"
import contentCompleted from "./components/contentCompleted.vue"
import transactionOfContentPlatform from "./components/transactionOfContentPlatform.vue"
import customerConsumptionInTheHospital from "./components/customerConsumptionInTheHospital.vue"
import * as api from "@/api/customerManage.js";
import * as orderApi from "@/api/orderManage";
import * as corApi from "@/api/corporateManagement";
import * as empApi from "@/api/employeeManage";

export default {
  components:{
    singlePlatformCompleted,
    contentCompleted,
    transactionOfContentPlatform,
    customerConsumptionInTheHospital
  },
  data(){
    return {
      activeName: "singlePlatformCompleted",
      checkStateListAll: [{ id: -1, name: "全部审核状态" }],
      employee:[{ id: -1, name: "全部归属客服" }],
       // 收款公司 开票公司
      companyNameAllList: [{ id: -1, name: "全部开票公司" }],
      hospitalParams:{
        // 医院成交类型
        hospitalDealTypeList:[{id:'-1',name:'全部成交类型'}],
        // 医院消费类型
        hospitalConsumptionTypeList:[{id:'-1',name:'全部消费类型'}],
        // 医院退款类型
        hospitalRefundTypeList:[{id:'-1',name:'全部退款类型'}],
        hospitalList: [{ id: -1, name: "全部医院" }],
      }
    }
  },
  methods:{
    // 获取医院列表
    getHospitalList() {
      empApi.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalParams.hospitalList = [
            ...this.hospitalParams.hospitalList,
            ...hospitalInfo,
          ];
        }
      });
    },
    // 获取医院成交类型
    getHospitalDealTypeList(){
      orderApi.getHospitalDealTypeList().then(res=>{
        if(res.code == 0){
          const {hospitalDealTypeList} = res.data
          this.hospitalParams.hospitalDealTypeList = [...this.hospitalParams.hospitalDealTypeList,...hospitalDealTypeList]

        }
      })
          
    },
    // 获取医院消费类型
    getHospitalConsumptionTypeList(){
      orderApi.getHospitalConsumptionTypeList().then(res=>{
        if(res.code == 0){
          const {hospitalConsumptionTypeList} = res.data

          this.hospitalParams.hospitalConsumptionTypeList = [...this.hospitalParams.hospitalConsumptionTypeList,...hospitalConsumptionTypeList]
          
        }
      })
    },
    //  获取医院退款类型
    getHospitalRefundTypeList(){
      orderApi.getHospitalRefundTypeList().then(res=>{
        if(res.code == 0){
          const {hospitalRefundTypeList} = res.data

          this.hospitalParams.hospitalRefundTypeList = [...this.hospitalParams.hospitalRefundTypeList,...hospitalRefundTypeList]
        }
      })
    },
    // 获取公司管理数据下拉框
    getCompany() {
      corApi.getCompanyBaseInfoNameList().then((res) => {
        if (res.code === 0) {
          this.companyNameAllList = [
            ...this.companyNameAllList,
            ...res.data.nameList,
          ];
        }
      });
    },
    // 获取客服列表
    getCustomerServiceList() {
      orderApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
        }
      });
    },
    // 获取审核情况（下拉框）
    getCheckStateList() {
      api.getCheckStateList().then((res) => {
        if (res.code === 0) {
          const { checkStateList } = res.data;
          this.checkStateList = checkStateList;
          this.checkStateListAll = [
            ...this.checkStateListAll,
            ...checkStateList,
          ];
        }
      });
    },
  },
  created(){
    this.getCheckStateList()
    this.getCustomerServiceList()
    this.getCompany()
    this.getHospitalDealTypeList()
    this.getHospitalConsumptionTypeList()
    this.getHospitalRefundTypeList()
    this.getHospitalList()
  }
}
</script>
