<template>
  <Card>
    <div class="title" >年度业绩情况（整体）</div>
    <!-- :span-method="handleSpan"  -->
    <Table border :columns="query.columns" :data="query.data1"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
    <div class="title" >年度业绩情况（新客）</div>
    <Table border :columns="query.columns" :data="query.data2" :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
    <div class="title" >年度业绩情况（老客）</div>
    <Table border :columns="query.columns" :data="query.data3"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
  </Card>
</template>
<script>
import * as api from "@/api/amiyaHospitalOperationBoard";

export default {
  props: {
    params: Object,
    completeRate:Number
  },
  data() {
    return {
      query: {
        columns: [
        //   {
        //     title: "组别",
        //     key: "groupName",
        //     align: "center",
        //     minWidth: 150,
        //     className: 'test-name',
            
        //   },
          {
            title: "指标",
            key: "sortName",
            align: "center",
            minWidth: 160,
            className: 'test-name',
          },
         
          {
            title: "1月",
            key: "januaryPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        }
                    },
                    params.index == 0 ?  (params.row.januaryPerformance ?  Math.round( params.row.januaryPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.januaryPerformance
                );
            },
          },
          {
            title: "2月",
            key: "februaryPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.februaryPerformance ?  Math.round( params.row.februaryPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.februaryPerformance
                    
                );
            },
          },
          {
            title: "3月",
            key: "marchPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.marchPerformance ?  Math.round( params.row.marchPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.marchPerformance
                   
                );
            },
          },
          {
            title: "4月",
            key: "aprilPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.aprilPerformance ?  Math.round( params.row.aprilPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.aprilPerformance
                   
                );
            },
          },
          {
            title: "5月",
            key: "mayPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.mayPerformance ?  Math.round( params.row.mayPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.mayPerformance
                );
            },
          },
          {
            title: "6月",
            key: "junePerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.junePerformance ?  Math.round( params.row.junePerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.junePerformance
                );
            },
          },
          {
            title: "7月",
            key: "julyPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.julyPerformance ?  Math.round( params.row.julyPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.julyPerformance
                );
            },
          },
          {
            title: "8月",
            key: "augustPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.augustPerformance ?  Math.round( params.row.augustPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.augustPerformance
                   
                );
            },
          },
          {
            title: "9月",
            key: "septemberPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.septemberPerformance ?  Math.round( params.row.septemberPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.septemberPerformance
                );
            },
          },
          {
            title: "10月",
            key: "octoberPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.octoberPerformance ?  Math.round( params.row.octoberPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.octoberPerformance
                   
                );
            },
          },
          {
            title: "11月",
            key: "novemberPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                    params.index == 0 ?  (params.row.novemberPerformance ?  Math.round( params.row.novemberPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.novemberPerformance
                );
            },
          },
          {
            title: "12月",
            key: "decemberPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                        },
                    },
                   
                    // params.row.decemberPerformance ?  Math.round( params.row.decemberPerformance/10000 *1000 / 10 ) / 100 : 0
                    params.index == 0 ?  (params.row.decemberPerformance ?  Math.round( params.row.decemberPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.decemberPerformance
                );
            },
          },
          {
            title: "合计",
            key: "sumPerformance",
            align: "center",
            minWidth: 100,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          //  color:params.index == 2 && params.row.sumPerformance == null || params.row.sumPerformance == '/' ? '#000'  : params.row.sumPerformance > this.completeRate ? 'green' : 'red'
                        },
                    },
                    params.index == 0 ?  (params.row.sumPerformance ?  Math.round( params.row.sumPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.sumPerformance
                    // params.index == 1 ?  (params.row.sumPerformance ?  Math.round( params.row.sumPerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.sumPerformance
                    // params.index == 2 && params.row.sumPerformance == null || params.row.sumPerformance == '/' ? '/'  : params.index == 2 && params.row.sumPerformance ?  params.row.sumPerformance + '%' :  params.index == 3  || params.row.sumPerformance == '/' ? params.row.sumPerformance : params.row.sumPerformance ?  Math.round( params.row.sumPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "平均",
            key: "averagePerformance",
            align: "center",
            minWidth: 100,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          //  color:params.index == 2 && params.row.averagePerformance == null || params.row.averagePerformance == '/' ? '#000'  : params.row.averagePerformance > this.completeRate ? 'green' : 'red'
                        },
                    },
                    // params.row.sumPerformance ?  Math.round( params.row.sumPerformance/10000 *1000 / 10 ) / 100 : 0
                    params.index == 0 ?  (params.row.averagePerformance ?  Math.round( params.row.averagePerformance/10000 *1000 / 10 ) / 100 : 0) : params.row.averagePerformance
                    // params.index == 2 && params.row.averagePerformance == null || params.row.averagePerformance == '/' ? '/'  : params.index == 2 && params.row.averagePerformance ?  params.row.averagePerformance + '%' : params.index == 3 || params.row.averagePerformance == '/'  ? params.row.averagePerformance : params.row.averagePerformance ?  Math.round( params.row.averagePerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
        ],
        data1: [],
        data2: [],
        data3: [],
      },
    };
  },
  methods: {
    // rowClassName(row, index) {
    //     // 根据条件设置特定行的类名，例如这里根据key值设置背景色
    //     if (index === 0) {
    //         return 'bg-color-row';
    //     }
    //     if (index === 1) {
    //         return 'demo-table-info-row';
    //     } 
    //     return '';
       
    // },
    rowClassName: function (row, index) {
      if (index % 2 === 0) {
        return 'ivu-table-stripe-even';
      } else {
        return 'ivu-table-stripe-odd';
      }
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
        // 合并第一列
        // if(columnIndex == 0){
        //     if(rowIndex === 0){
        //         return [7,1]
        //     }else if(rowIndex  >= 1){
        //         return [0,0]
        //     }
        // }
    },
    // 月度业绩目标达成情况
    getAssistantTotalAchievementByYearClick() {
      const { hospitalId, endDate } = this.params;
      const data = {
        year: this.$moment(endDate).format("YYYY"),
        hospitalId:hospitalId,
      };
      api.getHospitalTotalAchievementByYear(data).then((res) => {
        if (res.code === 0) {
          const { totalPerformanceData , newCustomerPerformanceData ,oldCustomerPerformanceData} = res.data.data;
          this.query.data1 = totalPerformanceData
          this.query.data2 = newCustomerPerformanceData.slice(0, 1);
          this.query.data3 = oldCustomerPerformanceData.slice(0, 1);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.ivu-table-stripe-even td {
  background-color: #fff!important;
}

/deep/.ivu-table-stripe-odd td {
  background-color: #f0f8fa!important;
}
/deep/ .ivu-table .ivu-table-body tr td, 
.ivu-table .ivu-table-header th {
  border: 1px solid #000 !important;
}
/deep/.ivu-table th.test-name {
    background: #ffc000;
    color: #000;
    border: 1px solid #000 !important;
}
/deep/.ivu-table-border td:nth-child(1){
    background: #ffc000 !important;
    color: #000;
    font-weight: bold;
    
}
/deep/.bg-color-row{
    background: #ffc000 !important;
    color: #000;
     /* font-weight: bold; */
}
/deep/.first-column-bg td:first-child {
  background-color: #f2f2f2; /* 设置你想要的背景颜色 */
}

.title{
    font-size: 18px;
    font-weight: bold;
    color: #000; 
    text-align: center;
    margin-bottom: 10px;
}
</style>
