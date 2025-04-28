<template>
  <Card style="margin-top:10px;">
    <Table border :columns="query.columns" :data="query.data1"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
  </Card>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
import * as healthValueApi from "@/api/healthValue";

export default {
  props: {
    params: Object,
  },
  data() {
    return {
      title1:'',
      title2:'',
      title3:'',
      query: {
        columns: [
          {
            title: "年度",
            key: "yearAndMonth",
            minWidth:80,
            tooltip:true,
            className: 'test-name',
            align:'center'
          },
          
          {
            title: "线索目标",
            key: "clueTarget",
            minWidth:110,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.clueTarget );
            }
          },
          {
            title: "分诊量",
            key: "distributeConsulationNum",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.distributeConsulationNum );
            }
          },
          {
            title: "加v",
            key: "addWechatCount",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.addWechatCount );
            }
          },
          {
            title: "派单数",
            key: "sendOrderCount",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.sendOrderCount );
            }
          },
          {
            title: "上门数",
            key: "toHospitalCount",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.toHospitalCount );
            }
          },
          {
            title: "成交数",
            key: "dealCount",
            minWidth:140,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.dealCount );
            }
          },
          {
            title: "新客业绩",
            minWidth:150,
            align:'center',
            className: 'test-name',
            key: "newCustomerPerformance",
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.newCustomerPerformance ? (params.row.newCustomerPerformance).toFixed(2) : 0 );
            }
          },
          {
            title: "加v率",
            key: "addWechatRate",
            align:'center',
            className: 'test-name',
            minWidth:110,
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color: params.row.addWechatRate > this.healthValueParams.AddWeChatHealthValueThisMonth ? 'green' : 'red'
                        },
                    },
                   
                    params.row.addWechatRate + '%'
                );
            },
          },
          {
            title: "派单率",
            key: "sendOrderRate",
            minWidth:140,
            className: 'test-name',
            align:'center',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:params.row.sendOrderRate > this.healthValueParams.SendOrderRateHealthValueThisMonth ? 'green' : 'red'
                        },
                    },
                    params.row.sendOrderRate+'%'
                );
            },
          },
          
          {
            title: "上门率",
            key: "toHospitalRate",
            align:'center',
            minWidth:110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:params.row.toHospitalRate > this.healthValueParams.ToHospitalRateHealthValueThisMonth ? 'green' : 'red'
                        },
                    },
                    params.row.toHospitalRate + '%'
                );
            },
          },
          {
            title: "成交率",
            key: "dealRate",
            minWidth:140,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                           color:params.row.dealRate > this.healthValueParams.DealRateHealthValueThisMonth ? 'green' : 'red'
                        },
                    },
                    params.row.dealRate+'%'
                );
            },
          },
          {
            title: "新客客单价",
            className: 'test-name',
            key: "newCustomerUnitPrice",
            minWidth:110,
            align:'center',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.newCustomerUnitPrice ? (params.row.newCustomerUnitPrice).toFixed(2) : 0 );
            }
          },
        ],
        data1: [],
      },
      healthValueParams:{
        // 当月加v率健康值
        AddWeChatHealthValueThisMonth:0,
        // 当月派单率健康值
        SendOrderRateHealthValueThisMonth:0,
        // 当月上门率健康值
        ToHospitalRateHealthValueThisMonth:0,
        // 当月成交率健康值
        DealRateHealthValueThisMonth:0,
        // 当月复购率健康值
        ThisMonthRepeateBuyRate:0,
      }
    };
  },
  methods: {
    // 获取当月获客情况数据
    getHealthValueLists() {
      healthValueApi.getHealthValid().then((res) => {
        if (res.code == 0) {
          const {list} = res.data
          // 当月加v率健康值
          this.healthValueParams.AddWeChatHealthValueThisMonth = list.find(item=>item.id == 'AddWeChatHealthValueThisMonth').rate
          // 当月派单率健康值
          this.healthValueParams.SendOrderRateHealthValueThisMonth = list.find(item=>item.id == 'SendOrderRateHealthValueThisMonth').rate
          // 当月上门率健康值
          this.healthValueParams.ToHospitalRateHealthValueThisMonth = list.find(item=>item.id == 'ToHospitalRateHealthValueThisMonth').rate
           // 当月成交率健康值
          this.healthValueParams.DealRateHealthValueThisMonth = list.find(item=>item.id == 'DealRateHealthValueThisMonth').rate
          // 当月复购率健康值
          this.healthValueParams.ThisMonthRepeateBuyRate = list.find(item=>item.id == 'ThisMonthRepeateBuyRate').rate
         
        }
      });
    },
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
    
    // 医美业绩趋势
    getTotalAchievementByYearClick() {
      const { endDate, startDate } = this.params;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
      api.BeforeLivingYearTransformDataa(data).then((res) => {
        if (res.code === 0) {
          this.query.data1 = res.data.data
        }
      });
    },
  },
};
</script>
<style scoped lang="less" >
/deep/.ivu-table-stripe-even td {
  background-color: #fff!important;
}

/deep/.ivu-table-stripe-odd td {
  background-color: #f0f8fa!important;
}
/deep/ .ivu-table .ivu-table-body tr td, 
.ivu-table .ivu-table-header th {
  border: 1px solid #000 !important;
    color: #000;
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
 /deep/.ivu-table .demo-table-info-row td{
        background-color: #7edafb;
        color: #000;
        background: skyblue;
}

 /* .ivu-table-border td:nth-child(2){
     background: #ffc000;
     color: #000;
     font-weight: bold;
 } */
.title{
    font-size: 18px;
    font-weight: bold;
    color: #000; 
    text-align: center;
    margin-bottom: 10px;
}
</style>
