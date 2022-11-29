<template>
  <div>
    <Modal
      v-model="controlModels"
      :title="detailTitle"
      :mask-closable="false"
      fullscreen
      @on-visible-change="handleModalVisibleChange"
    >
      <div class="title" v-if="employeeType == 'hospitalEmployee'">指标编号：<p  class="p">{{indicatorsId}}</p>医院编号： <p class="p">{{hospitalId}}</p></div>
      <Tabs ref="tabss" v-model="active" v-if="controlModels==true">
        <TabPane label="全国优秀机构运营健康指标" name="goodHospitalTarget">
            <div>
            <goodHospitalTarget
                :active="active"
                :indicatorsId="indicatorsId"
            ></goodHospitalTarget>
            </div>
        </TabPane>
        <TabPane label="本机构运营数据分析" name="operatingDataOfTheInstitution">
            <div>
            <operatingDataOfTheInstitution
                :active="active"
                :indicatorsId="indicatorsId"
                :indicatorNameList="indicatorNameList"
                :hospitalInfo="hospitalInfo"
                :hospitalId="hospitalId"
            ></operatingDataOfTheInstitution>
            </div>
        </TabPane>
        <TabPane label="本机构线上咨询师数据分析" name="networkConsultingOperation">
            <div>
            <networkConsultingOperation
                :active="active"
                :indicatorsId="indicatorsId"
                :hospitalId="hospitalId"
            ></networkConsultingOperation>
            </div>
        </TabPane>
        <TabPane label="本机构现场咨询师数据分析" name="consultantOperations">
            <div>
            <consultantOperations
                :active="active"
                :indicatorsId="indicatorsId"
                :hospitalId="hospitalId"
            ></consultantOperations>
            </div>
        </TabPane>
        <TabPane label="本机构科室数据分析" name="doctorOperation">
            <div>
            <doctorOperation
                :active="active"
                :indicatorsId="indicatorsId"
                :hospitalId="hospitalId"
            ></doctorOperation>
            </div>
        </TabPane>
        <TabPane label="本机构执行品项数据分析" name="finishedProductAppearance">
            <div>
            <finishedProductAppearance
                :active="active"
                :indicatorsId="indicatorsId"
                :hospitalId="hospitalId"
            ></finishedProductAppearance>
            </div>
        </TabPane>
        <TabPane label="本机构运营提升计划" name="operationImprovement">
            <div>
            <operationImprovement
                :active="active"
                :indicatorsId="indicatorsId"
                :hospitalId="hospitalId"
            ></operationImprovement>
            </div>
        </TabPane>
        </Tabs>
      
      <div slot="footer">
        <Button @click="handleCancelClick()">关闭</Button>
      </div>
    </Modal>
   
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import * as hospitalManage from "@/api/hospitalManage";
import goodHospitalTarget from "./components/goodHospitalTarget.vue"
import operatingDataOfTheInstitution from "./components/operatingDataOfTheInstitution.vue"
import networkConsultingOperation from "./components/networkConsultingOperation.vue"
import consultantOperations from "./components/consultantOperations.vue"
import doctorOperation from "./components/doctorOperation.vue"
import finishedProductAppearance from "./components/finishedProductAppearance.vue"
import operationImprovement from "./components/operationImprovement.vue"
export default {
  props: {
    controlModal: Boolean,
    indicatorsId:String,
    hospitalId:Number,
    detailTitle:String
  },
  components: {
    goodHospitalTarget,
    operatingDataOfTheInstitution,
    networkConsultingOperation,
    consultantOperations,
    doctorOperation,
    finishedProductAppearance,
    operationImprovement
  },
  data() {
    return {
      controlModels: false,
      active:'goodHospitalTarget',
      hospitalInfo:[{id:-1,name:'全部医院'}],
      indicatorNameList:[],
      detailTitles:'',
      employeeType:sessionStorage.getItem('employeeType')
    };
  },

  methods: {
    // 获取机构运营指标名称列表
    getHospitalOperationIndicatorNameList() {
      api.getHospitalOperationIndicatorNameList().then((res) => {
        if (res.code === 0) {
          const {indicatorNameList} = res.data
          this.indicatorNameList = indicatorNameList;
          
        }
      });
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = [...this.hospitalInfo,...res.data.hospitalInfo];
        }
      });
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancelClick();
        // this.$emit("update:controlModal", false);
        // this.$emit("HospitalIndicatorFill");
        // this.active = 'goodHospitalTarget'
      }
    },
    // 取消
    handleCancelClick(name) {
        this.$emit("update:controlModal", false);
        this.$emit("HospitalIndicatorFill");
        this.active = 'goodHospitalTarget' 
    },
  },
  created(){
    this.getHospitalOperationIndicatorNameList()
    this.getHospitalInfonameList()
  },
  watch: {
    controlModal(value) {
      this.controlModels = value;
      this.indicatorsId = this.indicatorsId
    },
  },
};
</script>
<style scoped>
.p{
  color: red;
  margin-right: 20px;
}
.title{
  display: flex;
}
</style>
