<template>
  <div>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="390"></Table>
      </div>
      <div class="h1">机构分析</div>
      <Input
        v-model="query.hospitalConsultRemark"
        style="width: 100%; "
        type="textarea"
        :rows="3"
        disabled
      />
      <div class="h1">啊美雅批注</div>
      <Input
        v-model="query.amiyaConsultRemark"
        style="width: 100%; "
        type="textarea"
        :rows="3"
        disabled
      />
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
export default {
  props: {
    hospitalId: Number,
    indicatorsId: String,
  },
  data() {
    return {
      // 查询
      query: {
        amiyaConsultRemark: "",
        hospitalConsultRemark: "",
        keyword: "",
        indicatorsId: "",
        hospitalId: null,
        columns: [
          {
            title: "医生",
            key: "doctorName",
            width:150
          },
          {
            title: "新客接诊人数",
            key: "newCustomerAcceptNum",
            width:140
          },
          {
            title: "新客成交人数",
            key: "newCustomerDealNum",
            width:140
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            width:140,
            render: (h, params) => {
              return h("div", params.row.newCustomerDealRate + "%");
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerAchievement",
            width:120
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width:130
          },
          {
            title: "新客业绩占比",
            key: "newCustomerAchievementRate",
            width:140,
            render: (h, params) => {
              return h("div", params.row.newCustomerAchievementRate + "%");
            },
          },
          {
            title: "老客接诊人数",
            key: "oldCustomerAcceptNum",
            width:140
          },
          {
            title: "老客成交人数",
            key: "oldCustomerDealNum",
            width:140
          },
          {
            title: "老客成交率",
            key: "oldCustomerDealRate",
            width:140,
            render: (h, params) => {
              return h("div", params.row.oldCustomerDealRate + "%");
            },
          },

          {
            title: "老客业绩",
            key: "oldCustomerAchievement",
            width:150
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width:130
          },
          {
            title: "老客业绩占比",
            key: "oldCustomerAchievementRate",
            width:150,
            render: (h, params) => {
              return h("div", params.row.oldCustomerAchievementRate + "%");
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      employeeType: sessionStorage.getItem("employeeType"),
      // 控制 modal
      controlModal: false,
    };
  },
  methods: {
    getHospitalConsultRemark(val1,val2) {
      const data = {
        indicatorId: val1,
        hospitalId: val2,
      };
      api.getHospitalDoctorRemark(data).then((res) => {
        if (res.code === 0) {
          const { hospitalDoctorRemark } = res.data;
          this.query.amiyaConsultRemark =
            hospitalDoctorRemark.amiyaDoctorRemark;
          this.query.hospitalConsultRemark =
            hospitalDoctorRemark.hospitalDoctorRemark;
        }
      });
    },
    // 获取本机构医生运营数据列表
    getHospitalInfo(val1,val2) {
      const { indicatorsId, hospitalId, keyword } = this.query;
      const data = {
        indicatorsId: val1,
        hospitalId: val2,
        keyword,
      };
      api.getHospitalDoctorOperation(data).then((res) => {
        if (res.code === 0) {
          const { hospitalDoctorOperationData } = res.data;
          this.query.data = hospitalDoctorOperationData;
        }
      });
    },

   

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    // this.getLogisticsCompanyList()
  },
  
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.h1 {
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 5px 0;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
