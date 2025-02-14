<template>
  <Card>
    <div class="title" >月度业绩目标达成情况（整体）</div>
    <!-- :span-method="handleSpan"  -->
    <Table border :columns="query.columns" :data="query.data1"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
    <div class="title" >月度业绩目标达成情况（新客）</div>
    <Table border :columns="query.columns" :data="query.data2" :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
    <div class="title" >月度业绩目标达成情况（老客）</div>
    <Table border :columns="query.columns" :data="query.data3"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
  </Card>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";

export default {
  props: {
    params: Object,
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
                           color:'#000'
                        },
                    },
                    params.index == 2 && params.row.januaryPerformance ? params.row.januaryPerformance + '%' : params.index == 3 ? params.row.januaryPerformance : params.row.januaryPerformance ?  Math.round( params.row.januaryPerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                    
                    params.index == 2 ? params.row.februaryPerformance + '%' : params.index == 3 ? params.row.februaryPerformance : params.row.februaryPerformance ?  Math.round( params.row.februaryPerformance/10000 *1000 / 10 ) / 100 : 0
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
                            color:'#000'
                        },
                    },
                   
                    params.index == 2 ? params.row.marchPerformance + '%' : params.index == 3 ? params.row.marchPerformance : params.row.marchPerformance ?  Math.round( params.row.marchPerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                   
                    params.index == 2 ? params.row.aprilPerformance + '%' : params.index == 3 ? params.row.aprilPerformance : params.row.aprilPerformance ?  Math.round( params.row.aprilPerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                    // params.row.mayPerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.mayPerformance + '%': params.row.mayPerformance  : 0
                    params.index == 2 ? params.row.mayPerformance + '%' : params.index == 3 ? params.row.mayPerformance : params.row.mayPerformance ?  Math.round( params.row.mayPerformance/10000 *1000 / 10 ) / 100 : 0
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
                            color:'#000'
                        },
                    },
                    // params.row.junePerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.junePerformance + '%': params.row.junePerformance  : 0
                    params.index == 2 ? params.row.junePerformance + '%' : params.index == 3 ? params.row.junePerformance : params.row.junePerformance ?  Math.round( params.row.junePerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                    // params.row.julyPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.julyPerformance + '%': params.row.julyPerformance : 0
                    params.index == 2 ? params.row.julyPerformance + '%' : params.index == 3 ? params.row.julyPerformance : params.row.julyPerformance ?  Math.round( params.row.julyPerformance/10000 *1000 / 10 ) / 100 : 0
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
                          color:'#000'
                        },
                    },
                   
                    params.index == 2 ? params.row.augustPerformance + '%' : params.index == 3 ? params.row.augustPerformance : params.row.augustPerformance ?  Math.round( params.row.augustPerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                    params.index == 2 ? params.row.septemberPerformance + '%' : params.index == 3 ? params.row.septemberPerformance : params.row.septemberPerformance ?  Math.round( params.row.septemberPerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                   
                    params.index == 2 ? params.row.octoberPerformance + '%' : params.index == 3 ? params.row.octoberPerformance : params.row.octoberPerformance ?  Math.round( params.row.octoberPerformance/10000 *1000 / 10 ) / 100 : 0
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
                          color:'#000'
                        },
                    },
                    params.index == 2 ? params.row.novemberPerformance + '%' : params.index == 3 ? params.row.novemberPerformance : params.row.novemberPerformance ?  Math.round( params.row.novemberPerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                   
                    params.index == 2 ? params.row.decemberPerformance + '%' : params.index == 3 ? params.row.decemberPerformance : params.row.decemberPerformance ?  Math.round( params.row.decemberPerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                    params.index == 2 && params.row.sumPerformance == null || params.row.sumPerformance == '/' ? '/'  : params.index == 2 && params.row.sumPerformance ?  params.row.sumPerformance + '%' :  params.index == 3  || params.row.sumPerformance == '/' ? params.row.sumPerformance : params.row.sumPerformance ?  Math.round( params.row.sumPerformance/10000 *1000 / 10 ) / 100 : 0
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
                           color:'#000'
                        },
                    },
                    params.index == 2 && params.row.averagePerformance == null || params.row.averagePerformance == '/' ? '/'  : params.index == 2 && params.row.averagePerformance ?  params.row.averagePerformance + '%' : params.index == 3 || params.row.averagePerformance == '/'  ? params.row.averagePerformance : params.row.averagePerformance ?  Math.round( params.row.averagePerformance/10000 *1000 / 10 ) / 100 : 0
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
    rowClassName(row, index) {
        // 根据条件设置特定行的类名，例如这里根据key值设置背景色
        if (index === 0) {
            return 'bg-color-row';
        }
        if (index === 1) {
            return 'demo-table-info-row';
        } 
        return '';
       
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
      const { assistantId, startDate } = this.params;
      const data = {
        year: this.$moment(startDate).format("YYYY"),
        assistantId:assistantId,
      };
      api.getAssistantTotalAchievementByYear(data).then((res) => {
        if (res.code === 0) {
          const { totalPerformanceData , newCustomerPerformanceData ,oldCustomerPerformanceData} = res.data.data;
          this.query.data1 = totalPerformanceData
          this.query.data2 = newCustomerPerformanceData.slice(0, 3);
          this.query.data3 = oldCustomerPerformanceData.slice(0, 3);
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
// /deep/ .ivu-table-wrapper-with-border{
//     border: none;
// }
/* 确保没有全局样式覆盖 */
// /deep/ .ivu-table {
//   border-collapse: separate;
//   border-spacing: 0;
//   border-right: 1px solid #000;
//   border-bottom: 1px solid #000;
// }
 
// /deep/ .ivu-table-wrapper {
//   overflow: auto; 
// }
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
    // font-weight: bold;
}
.first-column-bg td:first-child {
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
