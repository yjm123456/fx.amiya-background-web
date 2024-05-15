<template>
  <div>
    <Card>
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="filterCriteria.keyWord"
            placeholder="请输入关键字"
            style="width: 170px; "
            @keyup.enter.native="getListData()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 120px;margin-left: .625rem"
            :value="filterCriteria.startDate"
            v-model="filterCriteria.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 120px; margin-left: .625rem"
            :value="filterCriteria.endDate"
            v-model="filterCriteria.endDate"
          ></DatePicker>
          <Select
            v-model="filterCriteria.belongEmpId"
            placeholder="请选择行政客服"
            filterable
            style="width: 160px;margin-left:10px"
          >
            <Option
              v-for="item in params.employeePosition"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="filterCriteria.chooseHospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 160px;margin-left:10px"
          >
            <Option
              v-for="item in params.hospitallist"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="filterCriteria.isOldCustoemr"
            placeholder="请选择业绩"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="item in params.isOldCustoemrList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="filterCriteria.createEmpId"
            placeholder="请选择上传人"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="item in params.creteEmpNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="filterCriteria.isGenerateSalry"
            placeholder="请选择生成薪资状态"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in isGenerateSalryList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getListData()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="invoiceClick()"
            >生成薪资</Button
          >
        </div>
      </div>
    </Card>
    <div class="card_content">
      <Card class="card">
        <div class="title">助理业绩</div>
        <assistantPerformance
          :filterCriteria="filterCriteria"
          ref="assistantPerformance"
        />
      </Card>
      <Card class="card">
        <div class="title">稽查业绩</div>
        <auditPerformance
          :filterCriteria="filterCriteria"
          ref="auditPerformance"
        />
      </Card>
    </div>
    <!-- 生成薪资 -->
    <administrationGenerateSalary
      :params="params"
      :filterCriteria="filterCriteria"
      :administrationGenerateSalaryModel.sync="administrationGenerateSalaryModel"
      @getListData="getListData"
    />
  </div>
</template>
<script>
import assistantPerformance from "../components/assistantPerformance.vue";
import auditPerformance from "../components/auditPerformance.vue";
import administrationGenerateSalary from "../components/administrationGenerateSalary";
export default {
  components: {
    assistantPerformance,
    auditPerformance,
    administrationGenerateSalary,
  },
  props: {
    params: Object,
    activeName: String,
  },
  data() {
    return {
      filterCriteria: {
        isGenerateSalry: 1,
        keyWord: "",
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        chooseHospitalId: -1,
        isOldCustoemr: -1,
        belongEmpId: -1,
        checkState: 2,
        createEmpId: -1,

        // 助理业绩
        assistantPerformanceList: [],
        // 稽查业绩
        auditPerformanceList: [],
      },
      isGenerateSalryList: [
        {
          id: 1,
          name: "未生成薪资单",
        },
        {
          id: 2,
          name: "已生成薪资单",
        },
      ],
      administrationGenerateSalaryModel: false,
    };
  },
  methods: {
    // 查询
    getListData() {
      this.$refs.assistantPerformance.getListWithPageByCustomerCompensation();
      this.$refs.auditPerformance.getListWithPageByCustomerInspectData();
    },
    // 生成薪资
    invoiceClick() {
      // 助理业绩
      this.filterCriteria.assistantPerformanceList = this.$refs.assistantPerformance.generateSalaryParams.generateSalaryList;
      // 稽查业绩
      this.filterCriteria.auditPerformanceList = this.$refs.auditPerformance.generateSalaryParams.generateSalaryList;
      
      let type = (this.filterCriteria.assistantPerformanceList.length == 0 || this.filterCriteria.assistantPerformanceList == []) && (this.filterCriteria.auditPerformanceList.length == 0 || this.filterCriteria.auditPerformanceList == [])
      if (type) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      let assistantPerformance = this.filterCriteria.assistantPerformanceList.map(item=>{return item.checkBelongEmpName})
      let auditPerformance = this.filterCriteria.auditPerformanceList.map(item=>item.inspectEmpName)
      let concatList = assistantPerformance.concat(auditPerformance)
      let firstValue = concatList[0]
      let isFlag = concatList.every(value => value === firstValue)
      if(isFlag == true){
        this.administrationGenerateSalaryModel = true;
      }else{
        this.$Message.warning('生成薪资存在多名助理数据，请核对后重新选择！')
      }
    },
  },
  
  mounted() {
    this.getListData();
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "administrativeCustomerService") {
          this.getListData();
          // 提成金额合计
          this.commissionPrice = 0;
          // 审核客服业绩合计
          this.checkedPrice = 0;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.card_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.card {
  width: 49.5%;
}
.title {
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
</style>
