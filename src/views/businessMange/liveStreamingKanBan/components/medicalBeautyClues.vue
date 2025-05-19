<template>
  <Card style="margin-top:10px">
    <div class="title" ></div>
    <Table border :columns="query.columns" :data="query.data1" :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
  </Card>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
import * as shoppingCartRegistrationApi from "@/api/shoppingCartRegistration";
import * as healthValueApi from "@/api/healthValue";

export default {
  props: {
    params: Object,
  },
  data() {
    return {
      // 部门
      belongChannelList:[],
      query: {
        columns: [
          {
            title: "年月",
            key: "yearAndMonth",
            align: "center",
            minWidth: 100,
            className: 'test-name',
            
          },
          {
            title: "线索目标",
            key: "clueTarget",
            align: "center",
            minWidth: 100,
            className: 'test-name',
          },
          {
            title: "下卡",
            key: "clueCount",
            align: "center",
            minWidth: 100,
            className: 'test-name',
          },
          {
            title: "分诊",
            key: "distributeConsulationNum",
            align: "center",
            minWidth: 100,
            className: 'test-name',
          },
          {
            title: "加v",
            key: "addWechatCount",
            align: "center",
            minWidth: 100,
            className: 'test-name',
          },
          {
            title: "派单数",
            key: "sendOrderCount",
            align: "center",
            minWidth: 100,
            className: 'test-name',
          },
          {
            title: "上门数",
            key: "toHospitalCount",
            align: "center",
            minWidth: 100,
            className: 'test-name',
          },
          {
            title: "成交数",
            key: "dealCount",
            align: "center",
            minWidth: 100,
            className: 'test-name',
          },
          {
            title: "新客业绩",
            key: "newCustomerPerformance",
            align: "center",
            minWidth: 160,
            className: 'test-name',
          },
          {
            title: "加v率",
            key: "addWechatRate",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          color: params.row.addWechatRate > this.healthValueParams.AddWeChatHealthValueThisMonth ? 'green' : 'red'
                        },
                    },
                    params.row.addWechatRate ?  params.row.addWechatRate + '%' : 0
                );
            },
          },
          {
            title: "派单率",
            key: "sendOrderRate",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          color: params.row.sendOrderRate > this.healthValueParams.SendOrderRateHealthValueThisMonth ? 'green' : 'red'
                        },
                    },
                    params.row.sendOrderRate ?  params.row.sendOrderRate + '%' : 0
                );
            },
          },
          {
            title: "上门率",
            key: "toHospitalRate",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          color: params.row.toHospitalRate > this.healthValueParams.ToHospitalRateHealthValueThisMonth ? 'green' : 'red'
                        },
                    },
                    params.row.toHospitalRate ?  params.row.toHospitalRate + '%' : 0
                );
            },
          },
          {
            title: "成交率",
            key: "dealRate",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          color: params.row.dealRate > this.healthValueParams.DealRateHealthValueThisMonth ? 'green' : 'red'
                        },
                    },
                    params.row.dealRate ?  params.row.dealRate + '%' : 0
                );
            },
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            align: "center",
            minWidth: 120,
            className: 'test-name',
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
         //  当月成交率健康值
         DealRateHealthValueThisMonth:0,
      }
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
        }
      });
    },
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
    // // 获取归属部门
    // getshoppingCartGetBelongChannelList() {
    //   shoppingCartRegistrationApi.shoppingCartGetBelongChannelList().then((res) => {
    //     if (res.code === 0) {
    //       const {belongChannelList} = res.data
    //       this.belongChannelList =belongChannelList
    //     }
    //   });
    // },
    // 医美业绩趋势
    getTotalCluesByYearClick() {
      const { startDate, endDate ,baseLiveAnchorId} = this.params;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        baseLiveAnchorId:baseLiveAnchorId
      };
      api.LivingYearTransformData(data).then((res) => {
        if (res.code === 0) {
          this.query.data1 =res.data.data
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
 /deep/.ivu-table .ivu-table-body tr td, 
.ivu-table .ivu-table-header th {
    color: #000;
  border: 1px solid #000 !important;
}
/deep/.ivu-table th.test-name {
    background: #ffc000;
    color: #000;
    border: 1px solid #000 !important;
}
// /deep/.ivu-table-border td:nth-child(1){
//     background: #ffc000 !important;
//     color: #000;
//     font-weight: bold;
    
// }
/deep/.bg-color-row{
    background: #ffc000 !important;
    color: #000;
    /* font-weight: bold; */
}
/deep/.first-column-bg td:first-child {
  background-color: #f2f2f2; /* 设置你想要的背景颜色 */
}
/* .ivu-table .demo-table-info-row td{
       background-color: #7edafb;
       color: #000;
       background: skyblue;
 }
 .ivu-table-border td:nth-child(2){
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
