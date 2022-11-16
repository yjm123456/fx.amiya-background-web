<template>
  <div>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="600"></Table>
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
            title: "咨询师",
            key: "consulationName",
            width:'100px',
          },
          {
            title: "派单数",
            key: "sendOrderNum",
            width:'90px',
          },
          {
            title: "新客上门数",
            key: "newCustomerVisitNum",
            width:'120px',
          },
          {
            title: "新客上门率",
            key: "newCustomerVisitRate",
            width:'120px',
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitRate + "%");
            },
          },
          {
            title: "新客成交数",
            key: "newCustomerDealNum",
            width:'100px',
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            width:'100px',
            render: (h, params) => {
              return h("div", params.row.newCustomerDealRate + "%");
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerDealPrice",
            width:'100px',
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width:'100px',
          },
          {
            title: "老客上门数",
            key: "oldCustomerVisitNum",
            width:'100px',
          },
          {
            title: "老客成交数",
            key: "oldCustomerDealNum",
            width:'100px',
          },
          {
            title: "老客成交率",
            key: "oldCustomerDealRate",
            width:'100px',
            render: (h, params) => {
              return h("div", params.row.oldCustomerDealRate + "%");
            },
          },

          {
            title: "老客业绩",
            key: "oldCustomerDealPrice",
            width:'100px',
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width:'100px',
          },
          {
            title: "老客业绩占比",
            key: "oldCustomerAchievementRate",
            width:'100px',
            render: (h, params) => {
              return h("div", params.row.oldCustomerAchievementRate + "%");
            },
          },

          {
            title: "总业绩",
            key: "lasttMonthTotalAchievement",
            width:'100px',
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
      api.getHospitalConsultRemark(data).then((res) => {
        if (res.code === 0) {
          const { hospitalConsultRemark } = res.data;
          this.query.amiyaConsultRemark =
            hospitalConsultRemark.amiyaConsultRemark;
          this.query.hospitalConsultRemark =
            hospitalConsultRemark.hospitalConsultRemark;
        }
      });
    },
    // 获取本机构网咨运营数据列表
    getHospitalInfo(val1,val2) {
      const { indicatorsId, hospitalId, keyword } = this.query;
      const data = {
        indicatorsId: val1,
        hospitalId: val2,
        keyword,
      };
      api.getHospitalConsulationOperationData(data).then((res) => {
        if (res.code === 0) {
          const { hospitalOperationDataInfo } = res.data;
          this.query.data = hospitalOperationDataInfo;
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
  watch: {
   
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
