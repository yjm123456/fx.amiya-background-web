<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="医院对账业绩看板" name="hospitalReconciliation">
        <div>
          <hospitalReconciliation
            :activeName="activeName"
            :hospitalParams="hospitalParams"
          ></hospitalReconciliation>
        </div>
      </TabPane>
      <TabPane label="医院开票业绩" name="hospital">
        <div>
          <hospital
            :activeName="activeName"
            :hospitalParams="hospitalParams"
          ></hospital>
        </div>
      </TabPane>
      <TabPane label="子公司业绩看板" name="subsidiary">
        <div>
          <subsidiary
            :activeName="activeName"
            :subsidiaryParams="subsidiaryParams"
          ></subsidiary>
        </div>
      </TabPane>
      <TabPane label="主播业绩看板" name="liveAnchor">
        <div>
          <liveAnchor
            :activeName="activeName"
            :liveAnchorParams="liveAnchorParams"
          ></liveAnchor>
        </div>
      </TabPane>
      <!-- <TabPane label="客服录入成交单业绩" name="customerService">
        <div>
          <customerService
            :activeName="activeName"
          ></customerService>
        </div>
      </TabPane> -->
      <TabPane label="归属客服业绩看板" name="customerServicePerformance">
        <div>
          <customerServicePerformance
            :activeName="activeName"
          ></customerServicePerformance>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import * as hospitalApi from "@/api/hospitalManage";
import * as corApi from "@/api/corporateManagement";
import hospital from "./views/hospital.vue"
import subsidiary from "./views/subsidiary.vue"
import liveAnchor from "./views/liveAnchor.vue"
import customerService from "./views/customerService.vue"
import customerServicePerformance from "./views/customerServicePerformance.vue"
import hospitalReconciliation from "./views/hospitalReconciliation"

export default {
  components:{
    hospital,
    subsidiary,
    liveAnchor,
    customerService,
    customerServicePerformance,
    hospitalReconciliation
  },
  data(){
    return {
      activeName: "hospitalReconciliation",
      // 医院看板
      hospitalParams:{
        hospitalAllList:[{id:-1,name:'全部医院'}],
      },
      // 子公司看板
      subsidiaryParams:{
        hospitalAllList:[{id:-1,name:'全部医院'}],
        companyNameAllList: [{ id: -1, name: "全部收款公司" }],
      },
      // 主播看板
      liveAnchorParams:{

      },

    }
  },
  methods:{
     
    // 获取公司管理数据下拉框
    getCompany() {
      corApi.getCompanyBaseInfoNameList().then((res) => {
        if (res.code === 0) {
          this.subsidiaryParams.companyNameAllList = [
            ...this.subsidiaryParams.companyNameAllList,
            ...res.data.nameList,
          ];
        }
      });
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalApi.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalParams.hospitalAllList = [...this.hospitalParams.hospitalAllList,...res.data.hospitalInfo];
          this.subsidiaryParams.hospitalAllList = [...this.subsidiaryParams.hospitalAllList,...res.data.hospitalInfo];
        }
      });
    },
  },
  created(){
    this.getHospitalInfonameList()
    this.getCompany()
  }
}
</script>
