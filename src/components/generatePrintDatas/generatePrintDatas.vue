<template>
  <div class="content">
    <Modal
      title="生成打印数据"
      footer-hide
      v-model="generatePrintDataModals"
      width="80%"
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
          <div style="color:orange">打印参数标注参考：目标打印机-另存为pdf；布局：纵向；纸张尺寸：A0；缩放：75%</div>
          <div class="container_list">
            <Card class="container">
              <div class="list">
                <div class="h2">优秀机构运营健康指标</div>
                <div>
                  <goodHospitalTarget
                    :indicatorsId="indicatorsId"
                    ref="goodHospitalTarget"
                  ></goodHospitalTarget>
                </div>
              </div>
            </Card>
            <Card class="container">
              <div class="list">
                <div class="h2">本机构运营数据分析</div>
                <div>
                  <operatingDataOfTheInstitution
                    :indicatorsId="indicatorsId"
                    :hospitalId="hospitalId"
                    ref="operatingDataOfTheInstitution"
                  ></operatingDataOfTheInstitution>
                </div>
              </div>
            </Card>
          </div>
        <div class="container_list">
          <Card class="container">
            <div class="list">
              <div class="h2">本机构网咨运营数据分析</div>
              <div>
                <networkConsultingOperation
                  :indicatorsId="indicatorsId"
                  :hospitalId="hospitalId"
                  ref="networkConsultingOperation"
                ></networkConsultingOperation>
              </div>
            </div>
          </Card>
          <Card class="container">
            <div class="list">
              <div class="h2">本机构咨询师运营数据分析</div>
              <div>
                <consultantOperations
                  :indicatorsId="indicatorsId"
                  :hospitalId="hospitalId"
                  ref="consultantOperations"
                ></consultantOperations>
              </div>
            </div>
          </Card>
        </div>
        <div class="container_list">
        <Card class="container">
          <div class="list">
            <div class="h2">本机构医生运营数据分析</div>
            <div>
              <doctorOperation
                :indicatorsId="indicatorsId"
                :hospitalId="hospitalId"
                ref="doctorOperation"
              ></doctorOperation>
            </div>
          </div>
        </Card>
        <Card class="container">
          <div class="list">
            <div class="h2">本机构成交品相数据分析</div>
            <div>
              <finishedProductAppearance
                :indicatorsId="indicatorsId"
                :hospitalId="hospitalId"
                ref="finishedProductAppearance"
              ></finishedProductAppearance>
            </div>
          </div>
        </Card>
        </div>
        <Card class="container2" >
          <div class="list">
            <div class="h2">本机构运营提升计划</div>
            <div>
              <operationImprovement
                :indicatorsId="indicatorsId"
                :hospitalId="hospitalId"
                ref="operationImprovement"
              ></operationImprovement>
            </div>
          </div>
        </Card>
      </div>
      <div class="footer">
        <Button @click="cancel" style="margin-right: 10px;margin-top:20px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import goodHospitalTarget from "./components/goodHospitalTarget.vue";
import operatingDataOfTheInstitution from "./components/operatingDataOfTheInstitution.vue";
import networkConsultingOperation from "./components/networkConsultingOperation.vue";
import consultantOperations from "./components/consultantOperations.vue";
import doctorOperation from "./components/doctorOperation.vue";
import finishedProductAppearance from "./components/finishedProductAppearance.vue";
import operationImprovement from "./components/operationImprovement.vue";
export default {
  components: {
    goodHospitalTarget,
    operatingDataOfTheInstitution,
    networkConsultingOperation,
    consultantOperations,
    doctorOperation,
    finishedProductAppearance,
    operationImprovement
  },
  props: {
    generatePrintDataModal: Boolean,
    indicatorsId: String,
    hospitalId: Number,
  },
  data() {
    return {
      generatePrintDataModals: false,
    };
  },
  methods: {
    // 取消
    cancel(name) {
      this.$emit("update:generatePrintDataModal", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:generatePrintDataModal", false);
      }
    },
  },
  watch: {
    generatePrintDataModal: {
      handler(generatePrintDataModal) {
        this.generatePrintDataModals = generatePrintDataModal;
        if (generatePrintDataModal == true) {
          // 
          this.$refs.goodHospitalTarget.getGreatHospitalOperationHealth(
            this.indicatorsId
          );
          // 
          this.$refs.goodHospitalTarget.byIdRemark(this.indicatorsId);
          this.$refs.operatingDataOfTheInstitution.getHospitalOperationData(
            this.indicatorsId,
            this.hospitalId
          );
          this.$refs.operatingDataOfTheInstitution.getHospitalOperationRemark(
            this.indicatorsId,
            this.hospitalId
          );
          this.$refs.operatingDataOfTheInstitution.getbyIdHospitalOperationIndicator(
            this.indicatorsId,
            this.hospitalId
          );
          // 网咨
          this.$refs.networkConsultingOperation.getHospitalOnlineConsultRemark(
            this.indicatorsId,
            this.hospitalId
          );
          this.$refs.networkConsultingOperation.getHospitalInfo(
            this.indicatorsId,
            this.hospitalId
          );
          // 咨询
          this.$refs.consultantOperations.getHospitalConsultRemark(
            this.indicatorsId,
            this.hospitalId
          );
          this.$refs.consultantOperations.getHospitalInfo(
            this.indicatorsId,
            this.hospitalId
          );
          // 医生
          this.$refs.doctorOperation.getHospitalConsultRemark(
            this.indicatorsId,
            this.hospitalId
          );
          this.$refs.doctorOperation.getHospitalInfo(
            this.indicatorsId,
            this.hospitalId
          );
          // 成交品相
          this.$refs.finishedProductAppearance.gethospitalDealRemark(
            this.indicatorsId,
            this.hospitalId
          );
          this.$refs.finishedProductAppearance.getHospitalInfo(
            this.indicatorsId,
            this.hospitalId
          );
          //
          this.$refs.operationImprovement.getbyIdHospitalImprovePlan(
            this.indicatorsId,
            this.hospitalId
          );
          
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.img_o {
  width: 100%;
  height: auto;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.h2 {
  font-weight: bold;
  font-size: 20px;
  color: #000;
}
.list {
  margin-bottom: 20px;
}
.container_list{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.container{
  width: 49%;
  
}
.container2{
  width: 100%;
}
</style>
