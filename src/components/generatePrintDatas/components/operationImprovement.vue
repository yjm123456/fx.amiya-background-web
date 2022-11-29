<template>
  <div>
    <div class="content">
      <div class="left">
        <Card>
          <div>
            <div class="h1">啊美雅批注</div>
            <div>
              <div class="h2">运营优点：</div>
              <!-- <Input
                v-model="form.amiyaImprovePlanRemark"
                style="width: 100%; "
                type="textarea"
                :rows="5"
                disabled
              /> -->
              <table1 ref="inadequateOperationTable1" :remarkParams="amyremarkParams1" :operationalBenefits="amyoperationalBenefits" />
              <div class="h2">运营不足：</div>
              <!-- <Input
                v-model="form.amiyaShareSuccessCase"
                style="width: 100%; "
                type="textarea"
                :rows="5"
                disabled
              /> -->
              <table2 ref="inadequateOperationTable1" :remarkParams="amyremarkParams2" :operationalBenefits="amyinadequateOperation" />  
              <div class="h2">提升计划：</div>
              <!-- <Input
                v-model="form.amiyaImproveSuggestionRemark"
                style="width: 100%; "
                type="textarea"
                :rows="5"
                disabled
              /> -->
              <table3 ref="inadequateOperationTable1" :remarkParams="amyremarkParams3" :operationalBenefits="amypromotionPlan" />
              <div class="h2">运营需求：</div>
              <!-- <Input
                v-model="form.amiyaImproveDemandRemark"
                style="width: 100%; "
                type="textarea"
                :rows="5"
                disabled
              /> -->
              <table4 ref="inadequateOperationTable1" :remarkParams="amyremarkParams4" :operationalBenefits="amyoperationalNeeds" />
            </div>
          </div>
        </Card>
      </div>
      <div class="right">
        <Card>
          <div>
            <div class="h1">本月机构运营分析与提升计划</div>
            <div>
              <div class="h2">运营优点：</div>
              <!-- <Input
                v-model="form.amiyaImprovePlanRemark"
                style="width: 100%; "
                type="textarea"
                :rows="5"
                disabled
              /> -->
              <table1 ref="inadequateOperationTable1" :remarkParams="remarkParams1" :operationalBenefits="operationalBenefits" />
              <div class="h2">运营不足：</div>
              <!-- <Input
                v-model="form.amiyaShareSuccessCase"
                style="width: 100%; "
                type="textarea"
                :rows="5"
                disabled
              /> -->
              <table2 ref="inadequateOperationTable1" :remarkParams="remarkParams2" :operationalBenefits="inadequateOperation" />  
              <div class="h2">提升计划：</div>
              <!-- <Input
                v-model="form.amiyaImproveSuggestionRemark"
                style="width: 100%; "
                type="textarea"
                :rows="5"
                disabled
              /> -->
              <table3 ref="inadequateOperationTable1" :remarkParams="remarkParams3" :operationalBenefits="promotionPlan" />
              <div class="h2">运营需求：</div>
              <!-- <Input
                v-model="form.amiyaImproveDemandRemark"
                style="width: 100%; "
                type="textarea"
                :rows="5"
                disabled
              /> -->
              <table4 ref="inadequateOperationTable1" :remarkParams="remarkParams4" :operationalBenefits="operationalNeeds" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import table1 from "./table.vue"
import table2 from "./table.vue"
import table3 from "./table.vue"
import table4 from "./table.vue"

export default {
  props: {
    hospitalId: Number,
    indicatorsId: String,
  },
  components: {
    table1,
    table2,
    table3,
    table4
  },
  data() {
    return {
        // 运营优点
      operationalBenefits:[],
      // 运营不足
      inadequateOperation:[],
      // 提升计划
      promotionPlan:[],
      // 运营需求
      operationalNeeds:[],
      // 阿美雅端
      amyoperationalBenefits:[],
      // 运营不足
      amyinadequateOperation:[],
      // 提升计划
      amypromotionPlan:[],
      // 运营需求
      amyoperationalNeeds:[],
      // 医院端 机构参数
      remarkParams1:{
        hospitalId:this.hospitalId,
        indicatorId:this.indicatorsId,
        type:'',
      },
      // 医院端 机构参数
      remarkParams2:{
        hospitalId:this.hospitalId,
        indicatorId:this.indicatorsId,
        type:'',
      },
      remarkParams3:{
        hospitalId:this.hospitalId,
        indicatorId:this.indicatorsId,
        type:'',
      },
      remarkParams4:{
        hospitalId:this.hospitalId,
        indicatorId:this.indicatorsId,
        type:'',
      },
      // 阿美雅 
      amyremarkParams1:{
        hospitalId:this.hospitalId,
        indicatorId:this.indicatorsId,
        type:'',
      },
      // 阿美雅 
      amyremarkParams2:{
        hospitalId:this.hospitalId,
        indicatorId:this.indicatorsId,
        type:'',
      },
      // 阿美雅 
      amyremarkParams3:{
        hospitalId:this.hospitalId,
        indicatorId:this.indicatorsId,
        type:'',
      },
      // 阿美雅 
      amyremarkParams4:{
        hospitalId:this.hospitalId,
        indicatorId:this.indicatorsId,
        type:'',
      },
      employeeType: sessionStorage.getItem("employeeType"),
      form: {
        // 指标id
        indicatorId: "",
        // 医院id
        hospitalId: null,
        // 机构提升措施与计划
        hospitalImprovePlan: "",
        // 啊美雅对机构提升措施与计划批注
        amiyaImprovePlanRemark: "",
        // 机构分享成功案例
        hospitalShareSuccessCase: "",
        // 啊美雅对机构分享成功案例批注
        amiyaShareSuccessCase: "",
        // 机构对啊美雅的提升建议
        improveSuggestionToAmiya: "",
        // 啊美雅批注机构提升建议
        amiyaImproveSuggestionRemark: "",
        // 机构对啊美雅的提升需求
        improveDemandToAmiya: "",
        // 啊美雅批注机构提升需求
        amiyaImproveDemandRemark: "",
        id: "",
      },
      hospitalImprovePlanInfo: {},
      isEdit: true,
    };
  },
  methods: {
    // 获取医院端批注
    getHospitalHandleSubmit(indicatorsId,hospitalId) {
      const data = {
        indicatorId: indicatorsId,
        hospitalId: hospitalId,
      };
      api.getImprovePlanAndRemark(data).then((res) => {
        if (res.code === 0) {
          const { improvePlan } = res.data;
          // 运营优点
          // operationalBenefits:[],
          // // 运营不足
          // inadequateOperation:[],
          // // 提升计划
          // promotionPlan:[],
          // // 运营需求
          // operationalNeeds:[],
          improvePlan.map((item) => {
            if (item.type == "运营优点") {
              this.operationalBenefits = item.data;
              this.remarkParams1.type = "运营优点";
            } else if (item.type == "运营不足") {
              this.inadequateOperation = item.data;
              this.remarkParams2.type = "运营不足";
            } else if (item.type == "提升计划") {
              this.promotionPlan = item.data;
              this.remarkParams3.type = "提升计划";
            } else if (item.type == "运营需求") {
              this.operationalNeeds = item.data;
              this.remarkParams4.type = "运营需求";
            }
          });
        }
      });
    },
    // 获取阿美雅批注
    getsAmiyaRemark(indicatorsId,hospitalId) {
      const data = {
        indicatorId: indicatorsId,
        hospitalId: hospitalId,
      };
      api.getsAmiyaRemark(data).then((res) => {
        if (res.code === 0) {
          const { remark } = res.data;
          remark.map((item) => {
            if (item.type == "运营优点") {
              this.amyoperationalBenefits = item.data;
              this.amyremarkParams1.type = "运营优点";
            } else if (item.type == "运营不足") {
              this.amyinadequateOperation = item.data;
              this.amyremarkParams2.type = "运营不足";
            } else if (item.type == "提升计划") {
              this.amypromotionPlan = item.data;
              this.amyremarkParams3.type = "提升计划";
            } else if (item.type == "运营需求") {
              this.amyoperationalNeeds = item.data;
              this.amyremarkParams4.type = "运营需求";
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.content {
  display: flex;
  justify-content: space-between;
}
.left,
.right {
  width: 49%;
  margin-top: 20px;
}
.h1 {
  font-size: 22px;
  font-weight: bold;
  color: #000;
}
.h2 {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin: 10px 0;
}
.h3 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background: #dec350;
  margin: 10px 0;
  width: 40%;
  padding: 5px;
  box-sizing: border-box;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
