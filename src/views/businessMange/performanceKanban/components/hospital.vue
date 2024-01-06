<template>
  <div>
    <Card class="container">
      <div class="top">
        <div class="title">医院业绩排名</div>
        <div class="title">总计：<span class="total_num">{{totalPerformance}}</span></div>
      </div>
      
      <div>
        <Table border :columns="query.columns" :data="this.cooperatehospitalRankList" :row-class-name="rowClassName"></Table>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  props: {
    cooperatehospitalRankList: Array,
  },
  data() {
    return {
      totalPerformance:0,
      // 查询
      query: {
        columns: [
          {
            title: "排名",
            key: "rank",
            minWidth:60,
            align:'center',
          },
          {
            title: "机构",
            key: "hospitalName",
            minWidth:200,
            tooltip:true,

          },
          {
            title: "总业绩",
            key: "totalPerformance",
            minWidth:180,
            align:'center',
          },
          {
            title: "新客业绩",
            key: "newCustomerPerformance",
            minWidth:180,
            align:'center',
          },
          {
            title: "老客业绩",
            key: "oldCustomerPerformance",
            minWidth:180,
            align:'center',
          },
          {
            title: "业绩占比",
            key: "performanceRatio",
            minWidth:180,
            align:'center',
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    params.row.performanceRatio ? params.row.performanceRatio + '%' : 0
                ),
              ])
            }
          },
          {
            title: "新客业绩占比",
            key: "newCustomerPerformanceRatio",
            minWidth:180,
            align:'center',
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    params.row.newCustomerPerformanceRatio ? params.row.newCustomerPerformanceRatio + '%' : 0
                ),
              ])
            }
          },
          {
            title: "老客业绩占比",
            key: "oldCustomerPerformanceRatio",
            minWidth:180,
            align:'center',
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    params.row.oldCustomerPerformanceRatio ? params.row.oldCustomerPerformanceRatio + '%' : 0
                ),
              ])
            }
          },
        ],
      },
    };
  },
  methods:{
    rowClassName (row, index) {
        if (index === 0) {
            return 'one';
        }else if (index === 1) {
            return 'two';
        }else if (index === 2) {
            return 'three';
        }
        if (index === (this.query.rowIndex-1)) {
            return 'demo-table-error-row';
        }
        return '';
    },
  },
  watch:{
    cooperatehospitalRankList(value){
      if(value){
        let totalPerformance = 0
        value.map(item=>{
          totalPerformance += Number(item.totalPerformance);
        })
        this.totalPerformance = Math.floor(totalPerformance * 100) / 100;
      }
    }
  }
};
</script>
<style lang="less" >
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 30px;
  padding: 0 .5%;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.title {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
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
.ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
}
.top{
  display: flex;
  justify-content: space-between;
}
.total_num{
  color: red;
}
</style>
