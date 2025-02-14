<template>
  <Card>
    <div class="title" >月度线索转化情况</div>
    <Table border :columns="query.columns" :data="query.data"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
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
        //     {
        //     title: "助理",
        //     key: "groupName",
        //     align: "center",
        //     minWidth: 120,
        //     className: 'test-name',
        //   },
          {
            title: "月份",
            key: "yearAndMonth",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:'#000'
                        },
                    },
                    params.row.yearAndMonth
                );
            },
          },
         
          {
            title: "分诊量",
            key: "distributeConsulationNum",
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
                    params.row.distributeConsulationNum
                );
            },
          },
          {
            title: "加v量",
            key: "addWechatCount",
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
                    
                    params.row.addWechatCount
                );
            },
          },
          {
            title: "加v率",
            key: "addWechatRate",
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
                   
                    params.row.addWechatRate + '%'
                );
            },
          },
          {
            title: "派单量",
            key: "sendOrderCount",
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
                   
                    params.row.sendOrderCount
                );
            },
          },
          {
            title: "派单率",
            key: "sendOrderRate",
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
                    params.row.sendOrderRate+'%'
                );
            },
          },
          {
            title: "上门量",
            key: "toHospitalCount",
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
                    params.row.toHospitalCount
                );
            },
          },
          {
            title: "上门率",
            key: "toHospitalRate",
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
                    params.row.toHospitalRate + '%'
                );
            },
          },
          {
            title: "新客成交量",
            key: "newCustomerDealCount",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          color:'#000'
                        },
                    },
                   
                    params.row.newCustomerDealCount
                );
            },
          },
          {
            title: "成交率",
            key: "dealRate",
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
                    params.row.dealRate+'%'
                );
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerPerformance",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:'#000'
                        },
                    },
                   
                    params.row.newCustomerPerformance ?  Math.round( params.row.newCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          color:'#000'
                        },
                    },
                    params.row.newCustomerUnitPrice
                );
            },
          },
          {
            title: "老客成交量",
            key: "oldCustomerDealCount",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:'#000'
                        },
                    },
                    params.row.oldCustomerDealCount
                );
            },
          },
          {
            title: "复购率",
            key: "oldCustomerBuyRate",
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
                    params.row.oldCustomerBuyRate + '%'
                );
            },
          },
          {
            title: "老客业绩",
            key: "oldCustomerPerformance",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:'#000'
                        },
                    },
                    params.row.oldCustomerPerformance ?  Math.round( params.row.oldCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:'#000'
                        },
                    },
                    params.row.oldCustomerUnitPrice
                );
            },
          },
          {
            title: "总业绩",
            key: "totalPerformance",
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
                    params.row.totalPerformance ?  Math.round( params.row.totalPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "新老客占比",
            key: "newAndOldCustomerRate",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:'#000'
                        },
                    },
                    params.row.newAndOldCustomerRate
                );
            },
          },
        ],
        data: [],
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
    // 月度线索转化情况
    assistantYearTransformDataClick() {
      const { assistantId, startDate,endDate } = this.params;
      const data = {
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId:assistantId,
        showTikTok:true,
        showXiaoHongShu:true,
        showWechatVideo:true,
        showPrivateDomain:true

      };
      api.assistantYearTransformData(data).then((res) => {
        if (res.code === 0) {
          this.query.data = res.data.data;
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
