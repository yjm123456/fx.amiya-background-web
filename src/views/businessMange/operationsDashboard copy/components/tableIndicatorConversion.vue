<template>
  <div class="container">
    <!-- 指标转化情况 -->
    <Table border :columns="query.columns" :data="tableIndicatorConversionData"></Table>
  </div>
</template>
<script>


export default {
  components: {
  },
  props: {
    activeName: String,
    tableIndicatorConversionData:Array,
    isTitle:String,
    sevenDaySendOrderHealthValue:Number,
    fifteenVisitHealthValuue:Number,
    oldCustomerVisitHealthValue:Number,
    addWechatRateHealthValue:Number,
    sendOrderHealthValue:Number,
    toHospitalRateHealthValueThisMonth:Number,
    newCustomerDealHealValue:Number,
    newCustomerUnitPriceHealthValue:Number,
    oldCustomerUnitPriceHealthValue:Number,
  },
  data() {
    return {
      query: {
        columns: [
          {
            title: "分组",
            key: "groupName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "加微率",
            key: "addWechatRate",
            minWidth: 160,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '加微率' +'（' +this.addWechatRateHealthValue + '%）' : '加微率'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.addWechatRate > this.addWechatRateHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.addWechatRate + '%'
                  );
                } else if (params.row.addWechatRate< this.addWechatRateHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.addWechatRate+ '%'
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.addWechatRate+ '%'
                  );
              }
                
            },
          },
          {
            title: "派单率",
            key: "sendOrderRate",
            minWidth: 160,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '派单率' +'（' +this.sendOrderHealthValue + '%）' : '派单率'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.sendOrderRate > this.sendOrderHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.sendOrderRate + '%'
                  );
                } else if (params.row.sendOrderRate< this.sendOrderHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.sendOrderRate+ '%'
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.sendOrderRate+ '%'
                  );
              }
                
            },
          },
          {
            title: "7日派单率",
            key: "sevenDaySendOrderRate",
            minWidth: 180,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '7日派单率' +'（' +this.sevenDaySendOrderHealthValue + '%）' : '7日派单率'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.sevenDaySendOrderRate > this.sevenDaySendOrderHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.sevenDaySendOrderRate + '%'
                  );
                } else if (params.row.sevenDaySendOrderRate< this.sevenDaySendOrderHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.sevenDaySendOrderRate+ '%'
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.sevenDaySendOrderRate+ '%'
                  );
              }
                
            },
          },
          {
            title: "上门率",
            key: "toHospitalRate",
            minWidth: 160,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '上门率' +'（' +this.toHospitalRateHealthValueThisMonth + '%）' : '上门率'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.toHospitalRate > this.toHospitalRateHealthValueThisMonth) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.toHospitalRate + '%'
                  );
                } else if (params.row.toHospitalRate< this.toHospitalRateHealthValueThisMonth) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.toHospitalRate+ '%'
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.toHospitalRate+ '%'
                  );
              }
                
            },
          },
          {
            title: "15日上门率",
            key: "fifteenDaySendOrderRate",
            minWidth: 180,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '15日上门率' +'（' +this.fifteenVisitHealthValuue + '%）' : '15日上门率'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.fifteenDaySendOrderRate > this.fifteenVisitHealthValuue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.fifteenDaySendOrderRate + '%'
                  );
                } else if (params.row.fifteenDaySendOrderRate< this.fifteenVisitHealthValuue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.fifteenDaySendOrderRate+ '%'
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.fifteenDaySendOrderRate+ '%'
                  );
              }
                
            },
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            minWidth: 180,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '新客成交率' +'（' +this.newCustomerDealHealValue + '%）' : '新客成交率'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.newCustomerDealRate > this.newCustomerDealHealValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.newCustomerDealRate + '%'
                  );
                } else if (params.row.newCustomerDealRate< this.newCustomerDealHealValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.newCustomerDealRate+ '%'
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.newCustomerDealRate+ '%'
                  );
              }
                
            },
          },
          {
            title: "老客上门率",
            key: "oldCustomerToHospitalRate",
            minWidth: 170,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '老客上门率' +'（' +this.oldCustomerVisitHealthValue + '%）' : '老客上门率'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.oldCustomerToHospitalRate > this.oldCustomerVisitHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.oldCustomerToHospitalRate + '%'
                  );
                } else if (params.row.oldCustomerToHospitalRate< this.oldCustomerVisitHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.oldCustomerToHospitalRate+ '%'
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.oldCustomerToHospitalRate+ '%'
                  );
              }
                
            },
          },
          {
            title: "复购率",
            key: "rePurchaseRate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.rePurchaseRate + '%'
              );
            },
          },
          
          
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            minWidth: 180,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '新客客单价' +'（' +this.newCustomerUnitPriceHealthValue + '）' : '新客客单价'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.newCustomerUnitPrice > this.newCustomerUnitPriceHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.newCustomerUnitPrice 
                  );
                } else if (params.row.newCustomerUnitPrice< this.newCustomerUnitPriceHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.newCustomerUnitPrice
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.newCustomerUnitPrice
                  );
              }
                
            },
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            minWidth: 180,
            align: "center",
            renderHeader: (h, { column }) => {
              return h('span', [
              //   column.title,
                h('span', {
                  style: {
                    // color: 'red',
                  },
                  domProps: {
                    innerHTML: this.isTitle == '有效' ? '老客客单价' +'（' +this.oldCustomerUnitPriceHealthValue + '）' : '老客客单价'
                  //   + ' *',
                  },
                }),
              ]);
            },
            render: (h, params) => {
              if(this.isTitle == '有效'){
                if (params.row.oldCustomerUnitPrice > this.oldCustomerUnitPriceHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.oldCustomerUnitPrice 
                  );
                } else if (params.row.oldCustomerUnitPrice< this.oldCustomerUnitPriceHealthValue) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.oldCustomerUnitPrice
                  );
                }
              }else{
                 return h(
                    "div",
                    {
                      style: {
                        // color: "red",
                      },
                    },
                    params.row.oldCustomerUnitPrice
                  );
              }
                
            },
          },
         
          
        ],
        data: [],
        totalCount: 0,
      },
      
    };
  },
  methods: {
   
  },
  created() {
    
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "amyBusinessKanBan") {
          
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.content{
    width: 49.5%;
}
.title{
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-bottom: 10px;
}
</style>
