<template>
  <Card style="margin-top:10px">
    <div class="title" >全国医院月度运营情况</div>
    <!--前十机构运营数据（11条数据10条+1条总计）  -->
    <Table :row-class-name="rowClassName" :columns="query.columns" :data="query.data1" border height="400"></Table>
    <!-- 其他机构运营数据 -->
    <Table :columns="query.columns2" :data="query.data2" border :show-header="false" v-if="query.data2" height="250"></Table>
    <!-- 合计 -->
    <Table :columns="query.columns3" :data="query.data3" border :show-header="false" v-if="query.data3" :row-class-name="rowClassName2" height="62"></Table>
  </Card>
</template>
<script>
import * as api from "@/api/hospitalAchievement";
import * as healthValueApi from "@/api/healthValue";

export default {
  props: {
    params: Object,
  },
  data() {
    return {
      // 查询
      query: {
        rowIndex:0,
        year:this.$moment().format("YYYY"),
        columns: [
          {
            title: "城市",
            key: "city",
            minWidth:100,
            align:'center',
            className: 'test-name',
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth:150,
            tooltip:true,
            className: 'test-name',
          },
          // {
          //   title: "派单量",
          //   key: "sendNum",
          //   minWidth:90,
          //   align:'center',
          //   className: 'test-name',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId,hospitalName} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.dispitalModel = true
          //                      this.getHospitalSendOrderBrokenLine(hospitalId)
          //                      this.hospital = hospitalName
          //                      this.year = String( this.$moment(this.query.year).format("YYYY"))
          //                   }
          //               },
          //               },
          //           },
          //           params.row.sendNum
          //       ),
          //     ])
          //    }
          // },
          // {
          //   title: "上门数",
          //   key: "visitNum",
          //   minWidth:90,
          //   align:'center',
          //   className: 'test-name',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId,hospitalName} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.doorToDoorModel = true
          //                      this.getHospitalVisitBrokenLine(hospitalId)
          //                      this.hospital = hospitalName
          //                      this.year = String( this.$moment(this.query.year).format("YYYY"))
          //                   }
          //               },
          //               },
          //           },
          //           params.row.visitNum
          //       ),
          //     ])
          //    }
          // },
          {
            title: "上门率",
            key: "visitRate",
            align:'center',
            className: 'test-name',
            minWidth:110,
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    {
                        props: {
                        type: "primary",
                        size: "small",
                        },
                        style: {
                        
                        cursor:'pointer'
                        },
                        on: {
                        click: () => {
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.doorToDoorRateModel = true
                               this.getHospitalVisitRateBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                               
                            }
                        },
                        },
                    },
                    params.row.visitRate ? params.row.visitRate + '%' : 0
                ),
              ])
             }
          },
          // {
          //   title: "新客成交",
          //   key: "newCustomerDealNum",
          //   minWidth:100,
          //   align:'center',
          //   className: 'test-name',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId,hospitalName} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.newCustomerDealModel = true
          //                      this.getHospitalNewCustomerDealBrokenLine(hospitalId)
          //                      this.hospital = hospitalName
          //                      this.year = String( this.$moment(this.query.year).format("YYYY"))
          //                   }
          //               },
          //               },
          //           },
          //           params.row.newCustomerDealNum ? params.row.newCustomerDealNum  : 0
          //       ),
          //     ])
          //    }
          // },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            minWidth:110,
            className: 'test-name',
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    {
                        props: {
                        type: "primary",
                        size: "small",
                        },
                        style: {
                        
                        cursor:'pointer'
                        },
                        on: {
                        click: () => {
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.newCustomerDealRateModel = true
                               this.getHospitalNewCustomerDealRateBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.newCustomerDealRate ? params.row.newCustomerDealRate + '%' : 0
                ),
              ])
             }
          },
          // {
          //   title: "新客业绩",
          //   key: "newCustomerAchievement",
          //   minWidth:120,
          //   className: 'test-name',
          //   align:'center',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId,hospitalName} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.newCustomerPerformanceModel = true
          //                      this.getHospitalNewCustomerPerformanceBrokenLine(hospitalId)
          //                      this.hospital = hospitalName
          //                      this.year = String( this.$moment(this.query.year).format("YYYY"))
          //                   }
          //               },
          //               },
          //           },
          //           params.row.newCustomerAchievement ? (params.row.newCustomerAchievement).toFixed(2) : 0
          //       ),
          //     ])
          //    }
          // },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            minWidth:120,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    {
                        props: {
                        type: "primary",
                        size: "small",
                        },
                        style: {
                        
                        cursor:'pointer'
                        },
                        on: {
                        click: () => {
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.newCustomerPriceModel = true
                               this.getHospitalNewCustomerUnitPriceBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.newCustomerUnitPrice ? (params.row.newCustomerUnitPrice).toFixed(2) : 0
                ),
              ])
             }
          },
          // {
          //   title: "老客成交",
          //   key: "oldCustomerDealNum",
          //   minWidth:110,
          //   align:'center',
          //   className: 'test-name',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId,hospitalName} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.oldDealModel = true
          //                      this.getHospitalOldCustomerDealBrokenLine(hospitalId)
          //                      this.hospital = hospitalName
          //                      this.year = String( this.$moment(this.query.year).format("YYYY"))
          //                   }
          //               },
          //               },
          //           },
          //           params.row.oldCustomerDealNum ? (params.row.oldCustomerDealNum).toFixed(2) : 0
          //       ),
          //     ])
          //    }
          // },
          // {
          //   title: "老客业绩",
          //   key: "oldCustomerAchievement",
          //   minWidth:140,
          //   align:'center',
          //   className: 'test-name',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId,hospitalName} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.oldPerformanceModel = true
          //                      this.getHospitalOldCustomerPerformanceBrokenLine(hospitalId)
          //                      this.hospital = hospitalName
          //                      this.year = String( this.$moment(this.query.year).format("YYYY"))
          //                   }
          //               },
          //               },
          //           },
          //           params.row.oldCustomerAchievement ? (params.row.oldCustomerAchievement).toFixed(2) : 0
          //       ),
          //     ])
          //    }
          // },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            minWidth:120,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    {
                        props: {
                        type: "primary",
                        size: "small",
                        },
                        style: {
                        
                        cursor:'pointer'
                        },
                        on: {
                        click: () => {
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.oldPerformancePriceModel = true
                               this.getHospitalOldCustomerUnitPriceBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.oldCustomerUnitPrice ? (params.row.oldCustomerUnitPrice).toFixed(2) : 0
                ),
              ])
             }
          },
          // {
          //   title: "总业绩",
          //   minWidth:150,
          //   align:'center',
          //   className: 'test-name',
          //   key: "totalAchievement",
          //   // render: (h, params) => {
          //   //   return h(
          //   //         "div",
          //   //         params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
          //   //       )
                
          //   // },
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId,hospitalName} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.totalPerformanceModel = true
          //                      this.getHospitalTotalPriceBrokenLine(hospitalId)
          //                      this.hospital = hospitalName
          //                      this.year = String( this.$moment(this.query.year).format("YYYY"))
          //                   }
          //               },
          //               },
          //           },
          //           params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
          //       ),
          //     ])
          //    }
          // },
          {
            title: "新老客占比",
            key: "newOrOldCustomerRate",
            minWidth:110,
            align:'center',
            className: 'test-name',
          },
          
        ],
        columns2: [
          {
            title: "城市",
            key: "city",
            minWidth:100,
            align:'center',
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth:150,
            tooltip:true
          },
          // {
          //   title: "派单量",
          //   key: "sendNum",
          //   minWidth:90,
          //   align:'center',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.dispitalModel = true
          //                      this.getHospitalSendOrderBrokenLine(hospitalId)
          //                   }
          //               },
          //               },
          //           },
          //           params.row.sendNum
          //       ),
          //     ])
          //    }
          // },
          // {
          //   title: "上门数",
          //   key: "visitNum",
          //   minWidth:90,
          //   align:'center',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.doorToDoorModel = true
          //                      this.getHospitalVisitBrokenLine(hospitalId)
          //                   }
          //               },
          //               },
          //           },
          //           params.row.visitNum
          //       ),
          //     ])
          //    }
          // },
          {
            title: "上门率",
            key: "visitRate",
            align:'center',
            minWidth:110,
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    {
                        props: {
                        type: "primary",
                        size: "small",
                        },
                        style: {
                        
                        cursor:'pointer'
                        },
                        on: {
                        click: () => {
                            const {hospitalId} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.doorToDoorRateModel = true
                               this.getHospitalVisitRateBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.visitRate ? params.row.visitRate + '%' : 0
                ),
              ])
             }
          },
          // {
          //   title: "新客成交",
          //   key: "newCustomerDealNum",
          //   minWidth:100,
          //   align:'center',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.newCustomerDealModel = true
          //                      this.getHospitalNewCustomerDealBrokenLine(hospitalId)
          //                   }
          //               },
          //               },
          //           },
          //           params.row.newCustomerDealNum ? params.row.newCustomerDealNum  : 0
          //       ),
          //     ])
          //    }
          // },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            minWidth:110,
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    {
                        props: {
                        type: "primary",
                        size: "small",
                        },
                        style: {
                        
                        cursor:'pointer'
                        },
                        on: {
                        click: () => {
                            const {hospitalId} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.newCustomerDealRateModel = true
                               this.getHospitalNewCustomerDealRateBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.newCustomerDealRate ? params.row.newCustomerDealRate + '%' : 0
                ),
              ])
             }
          },
          // {
          //   title: "新客业绩",
          //   key: "newCustomerAchievement",
          //   minWidth:120,
          //   align:'center',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.newCustomerPerformanceModel = true
          //                      this.getHospitalNewCustomerPerformanceBrokenLine(hospitalId)
          //                   }
          //               },
          //               },
          //           },
          //           params.row.newCustomerAchievement ? (params.row.newCustomerAchievement).toFixed(2) : 0
          //       ),
          //     ])
          //    }
          // },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            minWidth:120,
            align:'center',
            
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    {
                        props: {
                        type: "primary",
                        size: "small",
                        },
                        style: {
                        
                        cursor:'pointer'
                        },
                        on: {
                        click: () => {
                            const {hospitalId} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.newCustomerPriceModel = true
                               this.getHospitalNewCustomerUnitPriceBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.newCustomerUnitPrice ? (params.row.newCustomerUnitPrice).toFixed(2) : 0
                ),
              ])
             }
          },
          // {
          //   title: "老客成交",
          //   key: "oldCustomerDealNum",
          //   minWidth:110,
          //   align:'center',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.oldDealModel = true
          //                      this.getHospitalOldCustomerDealBrokenLine(hospitalId)
          //                   }
          //               },
          //               },
          //           },
          //           params.row.oldCustomerDealNum ? (params.row.oldCustomerDealNum).toFixed(2) : 0
          //       ),
          //     ])
          //    }
          // },
          // {
          //   title: "老客业绩",
          //   key: "oldCustomerAchievement",
          //   minWidth:140,
          //   align:'center',
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.oldPerformanceModel = true
          //                      this.getHospitalOldCustomerPerformanceBrokenLine(hospitalId)
          //                   }
          //               },
          //               },
          //           },
          //           params.row.oldCustomerAchievement ? (params.row.oldCustomerAchievement).toFixed(2) : 0
          //       ),
          //     ])
          //    }
          // },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            minWidth:120,
            align:'center',
            render: (h, params) => {
              return h("div", [
                    h(
                    "div",
                    {
                        props: {
                        type: "primary",
                        size: "small",
                        },
                        style: {
                        
                        cursor:'pointer'
                        },
                        on: {
                        click: () => {
                            const {hospitalId} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.oldPerformancePriceModel = true
                               this.getHospitalOldCustomerUnitPriceBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.oldCustomerUnitPrice ? (params.row.oldCustomerUnitPrice).toFixed(2) : 0
                ),
              ])
             }
          },
          // {
          //   title: "总业绩",
          //   minWidth:150,
          //   align:'center',
          //   key: "totalAchievement",
          //   // render: (h, params) => {
          //   //   return h(
          //   //         "div",
          //   //         params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
          //   //       )
                
          //   // },
          //   render: (h, params) => {
          //     return h("div", [
          //           h(
          //           "div",
          //           {
          //               props: {
          //               type: "primary",
          //               size: "small",
          //               },
          //               style: {
                        
          //               cursor:'pointer'
          //               },
          //               on: {
          //               click: () => {
          //                   const {hospitalId} = params.row
          //                   // 判断是最后一行总计的时候不弹窗
          //                   if(params.index !== (this.query.rowIndex-1)){
          //                      this.totalPerformanceModel = true
          //                      this.getHospitalTotalPriceBrokenLine(hospitalId)
          //                   }
          //               },
          //               },
          //           },
          //           params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
          //       ),
          //     ])
          //    }
          // },
          {
            title: "新老客占比",
            key: "newOrOldCustomerRate",
            minWidth:110,
            align:'center',
          },
          
        ],
        columns3: [
          {
            title: "城市",
            key: "city",
            minWidth:100,
            align:'center',
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth:150,
            tooltip:true
          },
          // {
          //   title: "派单量",
          //   key: "sendNum",
          //   minWidth:90,
          //   align:'center',
            
          // },
          // {
          //   title: "上门数",
          //   key: "visitNum",
          //   minWidth:90,
          //   align:'center',
          // },
          {
            title: "上门率",
            key: "visitRate",
            align:'center',
            minWidth:110,
            render: (h, params) => {
              return h(
                    "div",
                    params.row.visitRate ? params.row.visitRate + '%' : 0
                  )
                
            },
          },
          // {
          //   title: "新客成交",
          //   key: "newCustomerDealNum",
          //   minWidth:100,
          //   align:'center',
          // },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            minWidth:110,
            render: (h, params) => {
              return h(
                    "div",
                    params.row.newCustomerDealRate ? params.row.newCustomerDealRate + '%' : 0
                  )
                
            },
          },
          // {
          //   title: "新客业绩",
          //   key: "newCustomerAchievement",
          //   minWidth:120,
          //   align:'center',
          //   render: (h, params) => {
          //     return h(
          //           "div",
          //           params.row.newCustomerAchievement ? (params.row.newCustomerAchievement).toFixed(2) : 0
          //         )
                
          //   },
          // },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            minWidth:120,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.newCustomerUnitPrice ? (params.row.newCustomerUnitPrice).toFixed(2) : 0
                  )
                
            },
          },
          // {
          //   title: "老客成交",
          //   key: "oldCustomerDealNum",
          //   minWidth:110,
          //   align:'center',
          // },
          // {
          //   title: "老客业绩",
          //   key: "oldCustomerAchievement",
          //   minWidth:140,
          //   align:'center',
          //   render: (h, params) => {
          //     return h(
          //           "div",
          //           params.row.oldCustomerAchievement ? (params.row.oldCustomerAchievement).toFixed(2) : 0
          //         )
                
          //   },
          // },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            minWidth:120,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.oldCustomerUnitPrice ? (params.row.oldCustomerUnitPrice).toFixed(2) : 0
                  )
                
            },
          },
          // {
          //   title: "总业绩",
          //   minWidth:150,
          //   align:'center',
          //   key: "totalAchievement",
          //   render: (h, params) => {
          //     return h(
          //           "div",
          //           params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
          //         )
                
          //   },
          // },
          {
            title: "新老客占比",
            key: "newOrOldCustomerRate",
            minWidth:110,
            align:'center',
             className: 'test-name',
          },
          
        ],
        data1: [],
        data2: [],
        data3: [],
      },
    }
  },
  methods: {
    // 全国机构运营当年数据
    getHospitalOperationYearData() {
        const data = {
            year: this.$moment(this.params.endDate).format("YYYY")
        }
        if(this.$moment(this.params.endDate).format("YYYY") > this.$moment().format("YYYY")){
          this.$Message.warning('不能大于当前年份')
          return 
        }
      api.getHospitalOperationYearData(data).then((res) => {
        if (res.code === 0) {
          const { topTenHospitalOperatingDataVo , otherHospitalOperatingDataVo , totalSum} = res.data.performance;
          this.query.data1 = topTenHospitalOperatingDataVo;
          this.query.rowIndex =topTenHospitalOperatingDataVo.length
          this.query.data2 = otherHospitalOperatingDataVo;
          this.query.data3 = [totalSum];
        }
      });
    },
    rowClassName2 (row, index) {
        if (index === 0) {
            return 'demo-table-error-row';
        }
        return '';
    },
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
};
</script>
<style  lang="less" scoped>
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

/deep/.bg-color-row{
    background: #ffc000 !important;
    color: #000;
}
/deep/.ivu-table .one td{
    color: red;
}
/deep/.ivu-table .two td{
    color:  #ff6600;
}
/deep/.ivu-table .three td{
    color: orange;
}
/deep/.ivu-table .demo-table-error-row td{
    background-color: #f3d782;
    color: #000;
}
.ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
}
.ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
}
/deep/.ivu-table .demo-table-info-cell-age {
    background-color: #f3d782;
    color: #000;
}
.ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
}
.title{
    font-size: 18px;
    font-weight: bold;
    color: #000; 
    text-align: center;
    margin-bottom: 10px;
}
</style>
