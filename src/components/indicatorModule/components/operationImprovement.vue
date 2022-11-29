<template>
  <div>
    <div class="content" v-if="employeeType == 'hospitalEmployee'">
      <div class="left">
        <Card :dis-hover="true">
          <div>
            <div class="h1">本月机构运营分析与提升计划</div>
            <!-- <div class="h3">本机构</div> -->
            <div>
              <div class="title_con">
                <div class="h2">运营优点：</div>
                <Button type="primary" @click="$refs.inadequateOperationTable1.addTableS()">添加</Button>
              </div>
              <inadequateOperationTable1 ref="inadequateOperationTable1" :remarkParams="remarkParams1" :operationalBenefits="operationalBenefits"/>
              <!-- <Input
                v-model="form.hospitalImprovePlan"
                placeholder="请输入提升措施与计划"
                style="width: 100%; "
                type="textarea"
                :rows="3"
              /> -->
              <div class="title_con">
                <div class="h2">运营不足：</div>
                <Button type="primary" @click="$refs.inadequateOperationTable2.addTableS()">添加</Button>
              </div>
              <inadequateOperationTable2 ref="inadequateOperationTable2" :remarkParams="remarkParams2" :operationalBenefits="inadequateOperation"/>
              <!-- <Input
                v-model="form.hospitalShareSuccessCase"
                placeholder="请输入分享本机构成功案例分享"
                style="width: 100%; "
                type="textarea"
                :rows="3"
              /> -->
              <!-- <div class="h3">对啊美雅</div> -->
              <div class="title_con">
                <div class="h2">提升计划：</div>
                <Button type="primary" @click="$refs.inadequateOperationTable3.addTableS()">添加</Button>
              </div>
              <inadequateOperationTable3 ref="inadequateOperationTable3" :remarkParams="remarkParams3" :operationalBenefits="promotionPlan"/>
              <!-- <Input
                v-model="form.improveSuggestionToAmiya"
                placeholder="请输入提升建议"
                style="width: 100%; "
                type="textarea"
                :rows="3"
              /> -->
              <div class="title_con">
                <div class="h2">运营需求：</div>
                <Button type="primary" @click="$refs.inadequateOperationTable4.addTableS()">添加</Button>
              </div>
              <inadequateOperationTable4 ref="inadequateOperationTable4" :remarkParams="remarkParams4" :operationalBenefits="operationalNeeds"/>
              <!-- <Input
                v-model="form.improveDemandToAmiya"
                placeholder="请输入提升需求"
                style="width: 100%; "
                type="textarea"
                :rows="3"
              /> -->
            </div>
            <div class="button">
              <Button type="primary" @click="hospitalHandleSubmit('form')">提交</Button>
            </div>
          </div>
        </Card>
      </div>
      <div class="right">
        <Card>
          <div>
            <div class="h1">啊美雅批注</div>
            <div>
              <div class="h2">运营优点：</div>
              <amyDisabled1 ref="amyDisabled1" :amyremarkParams="amyremarkParams1" :amyoperationalBenefits="amyoperationalBenefits"/>
              <!-- <Input
                v-model="form.amiyaImprovePlanRemark"
                style="width: 100%; "
                type="textarea"
                :rows="3"
                disabled
              /> -->
              <div class="h2">运营不足：</div>
              <amyDisabled2 ref="amyDisabled2" :amyremarkParams="amyremarkParams2" :amyoperationalBenefits="amyinadequateOperation"/>
              <!-- <Input
                v-model="form.amiyaShareSuccessCase"
                style="width: 100%; "
                type="textarea"
                :rows="3"
                disabled
              /> -->
              <div class="h2">提升计划：</div>
              <amyDisabled3 ref="amyDisabled3" :amyremarkParams="amyremarkParams3" :amyoperationalBenefits="amypromotionPlan"/>
              <!-- <Input
                v-model="form.amiyaImproveSuggestionRemark"
                style="width: 100%; "
                type="textarea"
                :rows="3"
                disabled
              /> -->
              <div class="h2">运营需求：</div>
              <amyDisabled4 ref="amyDisabled4" :amyremarkParams="amyremarkParams4" :amyoperationalBenefits="amyoperationalNeeds"/>
              <!-- <Input
                v-model="form.amiyaImproveDemandRemark"
                style="width: 100%; "
                type="textarea"
                :rows="3"
                disabled
              /> -->
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="content" v-else>
      <div class="left">
        <Card :dis-hover="true">
          <div>
            <div class="h1">啊美雅批注</div>

            <div>
              <div class="title_con">
                <div class="h2">运营优点：</div>
                <Button type="primary" @click="$refs.inadequateOperationTable1.addTableS()">添加</Button>
              </div>
              <inadequateOperationTable1 ref="inadequateOperationTable1"  :remarkParams="amyremarkParams1" :operationalBenefits="amyoperationalBenefits"/>
              <!-- <Input
                v-model="form.amiyaImprovePlanRemark"
                placeholder="请输入提升措施与计划"
                style="width: 100%; "
                type="textarea"
                :rows="3"
              /> -->
              <div class="title_con">
                <div class="h2">运营不足：</div>
                <Button type="primary" @click="$refs.inadequateOperationTable2.addTableS()">添加</Button>
              </div>
              <inadequateOperationTable2 ref="inadequateOperationTable2" :remarkParams="amyremarkParams2" :operationalBenefits="amyinadequateOperation"/>
              <!-- <Input
                v-model="form.amiyaShareSuccessCase"
                placeholder="请输入分享本机构成功案例批注"
                style="width: 100%; "
                type="textarea"
                :rows="3"
              /> -->
              <div class="title_con">
                <div class="h2">提升计划：</div>
                <Button type="primary" @click="$refs.inadequateOperationTable3.addTableS()">添加</Button>
              </div>
              <inadequateOperationTable3 ref="inadequateOperationTable3" :remarkParams="amyremarkParams3" :operationalBenefits="amypromotionPlan"/>
              <!-- <Input
                v-model="form.amiyaImproveSuggestionRemark"
                placeholder="请输入提升建议"
                style="width: 100%; "
                type="textarea"
                :rows="3"
              /> -->
              <div class="title_con">
                <div class="h2">运营需求：</div>
                <Button type="primary" @click="$refs.inadequateOperationTable4.addTableS()">添加</Button>
              </div>
              <inadequateOperationTable4 ref="inadequateOperationTable4" :remarkParams="amyremarkParams4" :operationalBenefits="amyoperationalNeeds"/>
              <!-- <Input
                v-model="form.amiyaImproveDemandRemark"
                placeholder="请输入提升需求"
                style="width: 100%; "
                type="textarea"
                :rows="3"
              /> -->
              <div class="button">
                <Button type="primary" @click="amyHandleSubmit('form')"
                  >提交</Button
                >
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div class="right">
        <Card>
          <div>
            <div class="h1">本月机构运营分析与提升计划</div>
            <!-- <div class="h3">本机构</div> -->
            <div>
                <div class="h2">运营优点：</div>
                <hospitalDisabled1 ref="hospitalDisabled1" :remarkParams="remarkParams1" :operationalBenefits="operationalBenefits"/>
              <!-- <Input
                v-model="form.hospitalImprovePlan"
                style="width: 100%; "
                type="textarea"
                :rows="3"
                disabled
              /> -->
              <div class="h2">运营不足：</div>
              <hospitalDisabled2 ref="hospitalDisabled2"  :remarkParams="remarkParams2" :operationalBenefits="inadequateOperation"/>
              <!-- <Input
                v-model="form.hospitalShareSuccessCase"
                style="width: 100%; "
                type="textarea"
                :rows="3"
                disabled
              /> -->
              <!-- <div class="h3">对啊美雅</div> -->
              <div class="h2">提升计划：</div>
              <hospitalDisabled3 ref="hospitalDisabled3"  :remarkParams="remarkParams3" :operationalBenefits="promotionPlan"/>
              <!-- <Input
                v-model="form.improveSuggestionToAmiya"
                style="width: 100%; "
                type="textarea"
                :rows="3"
                disabled
              /> -->
              <div class="h2">运营需求：</div>
              <hospitalDisabled4 ref="hospitalDisabled4"  :remarkParams="remarkParams4" :operationalBenefits="operationalNeeds"/>
              <!-- <Input
                v-model="form.improveDemandToAmiya"
                style="width: 100%; "
                type="textarea"
                :rows="3"
                disabled
              /> -->
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import inadequateOperationTable1 from "../components/table/inadequateOperationTable.vue"
import inadequateOperationTable2 from "../components/table/inadequateOperationTable.vue"
import inadequateOperationTable3 from "../components/table/inadequateOperationTable.vue"
import inadequateOperationTable4 from "../components/table/inadequateOperationTable.vue"
import amyDisabled1 from "./table/amyDisabled.vue"
import amyDisabled2 from "./table/amyDisabled.vue"
import amyDisabled3 from "./table/amyDisabled.vue"
import amyDisabled4 from "./table/amyDisabled.vue"
import hospitalDisabled1 from "./table/hospitalDisabled.vue"
import hospitalDisabled2 from "./table/hospitalDisabled.vue"
import hospitalDisabled3 from "./table/hospitalDisabled.vue"
import hospitalDisabled4 from "./table/hospitalDisabled.vue"
export default {
  props: {
    active: String,
    hospitalId: Number,
    indicatorsId: String,
  },
  components: {
    inadequateOperationTable1,
    inadequateOperationTable2,
    inadequateOperationTable3,
    inadequateOperationTable4,
    amyDisabled1,
    amyDisabled2,
    amyDisabled3,
    amyDisabled4,
    hospitalDisabled1,
    hospitalDisabled2,
    hospitalDisabled3,
    hospitalDisabled4
  },
  data() {
    return {
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
    getHospitalHandleSubmit(){
      let indicatorId = this.indicatorsId;
      const data = {
        indicatorId: indicatorId,
        hospitalId: this.hospitalId,
      };
      api.getImprovePlanAndRemark(data).then((res) => {
        if(res.code === 0){
          const {improvePlan} = res.data
          // 运营优点
      // operationalBenefits:[],
      // // 运营不足
      // inadequateOperation:[],
      // // 提升计划
      // promotionPlan:[],
      // // 运营需求
      // operationalNeeds:[],
          improvePlan.map(item=>{
            if(item.type == '运营优点'){
              this.operationalBenefits = item.data
              this.remarkParams1.type = '运营优点'
            }else if(item.type == '运营不足'){
              this.inadequateOperation = item.data
              this.remarkParams2.type = '运营不足'
            }else if(item.type == '提升计划'){
              this.promotionPlan = item.data
              this.remarkParams3.type = '提升计划'
            }else if(item.type == '运营需求'){
              this.operationalNeeds = item.data
              this.remarkParams4.type = '运营需求'
            }
          })
          
        }
      })
    },
    // 医院端批注
    hospitalHandleSubmit(){
      let hospitalList1 =  this.$refs.inadequateOperationTable1.query.data
      let hospitalList2 =  this.$refs.inadequateOperationTable2.query.data
      let hospitalList3 =  this.$refs.inadequateOperationTable3.query.data
      let hospitalList4 =  this.$refs.inadequateOperationTable4.query.data
      let hospitalAllList = hospitalList1.concat(...hospitalList2,...hospitalList3,...hospitalList4)
      // 添加
      api.addImprovePlanAndRemark(hospitalAllList).then((res) => {
        if(res.code === 0){
          this.$Message.success('提交成功')
          this.getHospitalHandleSubmit()
        }
      })
    },
    // 获取阿美雅批注
    getsAmiyaRemark(){
      let indicatorId = this.indicatorsId;
      const data = {
        indicatorId: indicatorId,
        hospitalId: this.hospitalId,
      };
      api.getsAmiyaRemark(data).then((res) => {
        if(res.code === 0){
          const {remark} = res.data
          remark.map(item=>{
            if(item.type == '运营优点'){
              this.amyoperationalBenefits = item.data
              this.amyremarkParams1.type = '运营优点'
            }else if(item.type == '运营不足'){
              this.amyinadequateOperation = item.data
              this.amyremarkParams2.type = '运营不足'
            }else if(item.type == '提升计划'){
              this.amypromotionPlan = item.data
              this.amyremarkParams3.type = '提升计划'
            }else if(item.type == '运营需求'){
              this.amyoperationalNeeds = item.data
              this.amyremarkParams4.type = '运营需求'
            }
          })
          
        }
      })
    },
    // 啊美雅端批注
    amyHandleSubmit(){
      let amyList1 =  this.$refs.inadequateOperationTable1.query.data
      let amyList2 =  this.$refs.inadequateOperationTable2.query.data
      let amyList3 =  this.$refs.inadequateOperationTable3.query.data
      let amyList4 =  this.$refs.inadequateOperationTable4.query.data
      let amyAllList = amyList1.concat(...amyList2,...amyList3,...amyList4)
      // 添加
      api.addsAmiyaRemark(amyAllList).then((res) => {
        if(res.code === 0){
          this.$Message.success('提交成功')
          this.getsAmiyaRemark()
        }
      })
    },
    handleSubmit() {
      const {
        indicatorId,
        hospitalId,
        hospitalImprovePlan,
        amiyaImprovePlanRemark,
        hospitalShareSuccessCase,
        amiyaShareSuccessCase,
        improveSuggestionToAmiya,
        amiyaImproveSuggestionRemark,
        improveDemandToAmiya,
        amiyaImproveDemandRemark,
      } = this.form;
      const data = {
        indicatorId: sessionStorage.getItem("fillInindicatorId"),
        hospitalId: this.hospitalId,
        hospitalImprovePlan,
        amiyaImprovePlanRemark,
        hospitalShareSuccessCase,
        amiyaShareSuccessCase,
        improveSuggestionToAmiya,
        amiyaImproveSuggestionRemark,
        improveDemandToAmiya,
        amiyaImproveDemandRemark,
      };
      
      // 添加
      api.addHospitalImprovePlan(data).then((res) => {
        if (res.code === 0) {
          this.isEdit = false;
          this.getbyIdHospitalImprovePlan();
          this.$Message.success({
            content: "提交成功",
            duration: 3,
          });
        }
      });
    },
    getbyIdHospitalImprovePlan() {
      let indicatorId = this.indicatorsId;
      const data = {
        indicatorId: indicatorId,
        hospitalId: this.hospitalId,
      };
      api.byIdHospitalImprovePlan(data).then((res) => {
        if (res.code === 0) {
          const { hospitalImprovePlanInfo } = res.data;
          //机构
          this.form.hospitalImprovePlan =
            hospitalImprovePlanInfo.hospitalImprovePlan;
          this.form.hospitalShareSuccessCase =
            hospitalImprovePlanInfo.hospitalShareSuccessCase;
          this.form.improveSuggestionToAmiya =
            hospitalImprovePlanInfo.improveSuggestionToAmiya;
          this.form.improveDemandToAmiya =
            hospitalImprovePlanInfo.improveDemandToAmiya;
          //阿美雅
          this.form.amiyaImprovePlanRemark =
            hospitalImprovePlanInfo.amiyaImprovePlanRemark;
          this.form.amiyaShareSuccessCase =
            hospitalImprovePlanInfo.amiyaShareSuccessCase;
          this.form.amiyaImproveSuggestionRemark =
            hospitalImprovePlanInfo.amiyaImproveSuggestionRemark;
          this.form.amiyaImproveDemandRemark =
            hospitalImprovePlanInfo.amiyaImproveDemandRemark;
        }
      });
    },
  },
  watch: {
    active: {
      handler(value) {
        if (value === "operationImprovement") {
          sessionStorage.setItem("fillInindicatorId", this.indicatorsId);
          this.getbyIdHospitalImprovePlan();
          this.getHospitalHandleSubmit()
          this.getsAmiyaRemark()
        }
      },
      immediate: true,
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
  margin: 10px 10px 10px 0;
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
.title_con{
    display: flex;
    align-items: center;
    margin: 10px 0px;
}
</style>
