<template>
  <div>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" :row-class-name="rowClassName" height="700"></Table>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalAchievement";
export default {
    props: ["activeName"],
  data() {
    return {
      // 查询
      query: {
        columns: [
          {
            title: "城市",
            key: "city",
            width:100,
            align:'center',
          },
          {
            title: "医院",
            key: "hospitalName",
            width:180,
            tooltip:true
          },
          {
            title: "派单量",
            key: "sendNum",
            width:90,
            align:'center',
          },
          {
            title: "上门数",
            key: "visitNum",
            width:90,
            align:'center',
          },
          {
            title: "上门率",
            key: "visitRate",
            align:'center',
            width:110,
            render: (h, params) => {
              return h(
                    "div",
                    params.row.visitRate ? params.row.visitRate + '%' : 0
                  )
                
            },
          },
          {
            title: "新客成交",
            key: "newCustomerDealNum",
            width:140,
            align:'center',
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            wdith:110,
            render: (h, params) => {
              return h(
                    "div",
                    params.row.newCustomerDealRate ? params.row.newCustomerDealRate + '%' : 0
                  )
                
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerAchievement",
            width:120,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.newCustomerAchievement ? (params.row.newCustomerAchievement).toFixed(2) : 0
                  )
                
            },
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width:110,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.newCustomerUnitPrice ? (params.row.newCustomerUnitPrice).toFixed(2) : 0
                  )
                
            },
          },
          {
            title: "老客成交",
            key: "oldCustomerDealNum",
            width:110,
            align:'center',
          },
          {
            title: "老客业绩",
            key: "oldCustomerAchievement",
            width:110,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.oldCustomerAchievement ? (params.row.oldCustomerAchievement).toFixed(2) : 0
                  )
                
            },
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width:110,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.oldCustomerUnitPrice ? (params.row.oldCustomerUnitPrice).toFixed(2) : 0
                  )
                
            },
          },
          {
            title: "总业绩",
            width:140,
            align:'center',
            key: "totalAchievement",
            render: (h, params) => {
              return h(
                    "div",
                    params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
                  )
                
            },
          },
          {
            title: "新老客占比",
            key: "newOrOldCustomerRate",
            wdith:110,
            align:'center',
          },
          
        ],
        data: [],
      },
    };
  },
  methods: {
    rowClassName (row, index) {
        if (index === 0) {
            return 'one';
        }else if (index === 1) {
            return 'two';
        }else if (index === 2) {
            return 'three';
        }
        return '';
    },
    // 全国机构运营当日数据
    getHospitalOperationDailyData() {
      api.getHospitalOperationDailyData().then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.query.data = performance;
        }
      });
    },
  },
  created() {
  },
  watch:{
    activeName: {
      handler(value) {
        if (value === "todayDate") {
          this.isTab = true
          this.getHospitalOperationDailyData();
        }
      },
      immediate: true,
    },
  }
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
.ivu-table .one td{
    color: red;
}
.ivu-table .two td{
    color:  #ff6600;
}
.ivu-table .three td{
    color: orange;
}
</style>