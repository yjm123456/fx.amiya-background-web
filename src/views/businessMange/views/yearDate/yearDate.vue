
<template>
    <div>
        <Card class="container">
            <div class="right">
                <DatePicker
                    type="year"
                    placeholder="请选择年"
                    style="width: 200px"
                    v-model="query.year"
                    transfer
                    :options="options"
                ></DatePicker>
                <Button type="primary" @click="getHospitalOperationYearData" style="margin-left: 10px">查询</Button>
            </div>
            <div style="height:680px">
                <!--前十机构运营数据（11条数据10条+1条总计）  -->
                <Table :row-class-name="rowClassName" :columns="query.columns" :data="query.data1" border height="400"></Table>
                <!-- 其他机构运营数据 -->
                <Table :columns="query.columns2" :data="query.data2" border :show-header="false" v-if="query.data2" height="250"></Table>
                <!-- 合计 -->
                <Table :columns="query.columns3" :data="query.data3" border :show-header="false" v-if="query.data3" :row-class-name="rowClassName2" height="50"></Table>
            </div>
            <!-- 派单量折线图 -->
            <dispital :dispitalModel.sync="dispitalModel" :dispatchList="dispatchList" :hospital="hospital" :date="year"></dispital>
            <!-- 上门数折线图 -->
            <doorToDoor :doorToDoorModel.sync="doorToDoorModel" :doorToDoorList="doorToDoorList" :hospital="hospital" :date="year"></doorToDoor>
            <!-- 上门率折线图 -->
            <doorToDoorRate :doorToDoorRateModel.sync="doorToDoorRateModel" :doorToDoorRateList="doorToDoorRateList" :hospital="hospital" :date="year"></doorToDoorRate>
            <!-- 新客成交 -->
            <newCustomerDeal :newCustomerDealModel.sync="newCustomerDealModel" :newCustomerDealList="newCustomerDealList" :hospital="hospital" :date="year"></newCustomerDeal>
            <!-- 新客成交率 -->
            <newCustomerDealRate :newCustomerDealRateModel.sync="newCustomerDealRateModel" :newCustomerDealRateList="newCustomerDealRateList" :hospital="hospital" :date="year"></newCustomerDealRate>
            <!-- 新客业绩 -->
            <newCustomerPerformance :newCustomerPerformanceModel.sync="newCustomerPerformanceModel" :newCustomerPerformanceList="newCustomerPerformanceList" :hospital="hospital" :date="year"></newCustomerPerformance>
            <!-- 新客客单价 -->
            <newCustomerPrice :newCustomerPriceModel.sync="newCustomerPriceModel" :newCustomerPriceList="newCustomerPriceList" :hospital="hospital" :date="year"></newCustomerPrice>
            <!-- 老客成交 -->
            <oldDeal :oldDealModel.sync="oldDealModel" :oldDealList="oldDealList" :hospital="hospital" :date="year"></oldDeal>
            <!-- 老客业绩 -->
            <oldPerformance :oldPerformanceModel.sync="oldPerformanceModel" :oldPerformanceList="oldPerformanceList" :hospital="hospital" :date="year"></oldPerformance>
            <!-- 老客客单价 -->
            <oldPerformancePrice :oldPerformancePriceModel.sync="oldPerformancePriceModel" :oldPerformancePriceList="oldPerformancePriceList" :hospital="hospital" :date="year"></oldPerformancePrice>
            <!-- 总业绩 -->
            <totalPerformance :totalPerformanceModel.sync="totalPerformanceModel" :totalPerformanceList="totalPerformanceList" :hospital="hospital" :date="year"></totalPerformance>
        </Card>
    </div>
</template>
<script>
import * as api from "@/api/hospitalAchievement";
import dispital from "./components/dispitch.vue"
import doorToDoor from "./components/doorToDoor.vue"
import doorToDoorRate from "./components/doorToDoorRate.vue"
import newCustomerDeal from "./components/newCustomerDeal.vue"
import newCustomerDealRate from "./components/newCustomerDealRate.vue"
import newCustomerPerformance from "./components/newCustomerPerformance.vue"
import newCustomerPrice from "./components/newCustomerPrice.vue"
import oldDeal from "./components/oldDeal.vue"
import oldPerformance from "./components/oldPerformance.vue"
import oldPerformancePrice from "./components/oldPerformancePrice.vue"
import totalPerformance from "./components/totalPerformance.vue"
export default {
    props: ["activeName"],
    components:{
      dispital,
      doorToDoor,
      doorToDoorRate,
      newCustomerDeal,
      newCustomerDealRate,
      newCustomerPerformance,
      newCustomerPrice,
      oldDeal,
      oldPerformance,
      oldPerformancePrice,
      totalPerformance
    },
  data() {
    return {
      options: {
            disabledDate (date) {
                return date && date.valueOf() > Date.now() - 86400000;
            }
        },
        year:"",
      // 查询
      query: {
        rowIndex:0,
        year:this.$moment().format("YYYY"),
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
                               this.dispitalModel = true
                               this.getHospitalSendOrderBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.sendNum
                ),
              ])
             }
          },
          {
            title: "上门数",
            key: "visitNum",
            width:90,
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
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.doorToDoorModel = true
                               this.getHospitalVisitBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.visitNum
                ),
              ])
             }
          },
          {
            title: "上门率",
            key: "visitRate",
            align:'center',
            width:110,
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
          {
            title: "新客成交",
            key: "newCustomerDealNum",
            width:100,
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
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.newCustomerDealModel = true
                               this.getHospitalNewCustomerDealBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.newCustomerDealNum ? params.row.newCustomerDealNum  : 0
                ),
              ])
             }
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            wdith:100,
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
          {
            title: "新客业绩",
            key: "newCustomerAchievement",
            width:120,
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
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.newCustomerPerformanceModel = true
                               this.getHospitalNewCustomerPerformanceBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.newCustomerAchievement ? (params.row.newCustomerAchievement).toFixed(2) : 0
                ),
              ])
             }
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width:120,
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
          {
            title: "老客成交",
            key: "oldCustomerDealNum",
            width:110,
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
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.oldDealModel = true
                               this.getHospitalOldCustomerDealBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.oldCustomerDealNum ? (params.row.oldCustomerDealNum).toFixed(2) : 0
                ),
              ])
             }
          },
          {
            title: "老客业绩",
            key: "oldCustomerAchievement",
            width:140,
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
                            const {hospitalId,hospitalName} = params.row
                            // 判断是最后一行总计的时候不弹窗
                            if(params.index !== (this.query.rowIndex-1)){
                               this.oldPerformanceModel = true
                               this.getHospitalOldCustomerPerformanceBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.oldCustomerAchievement ? (params.row.oldCustomerAchievement).toFixed(2) : 0
                ),
              ])
             }
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width:120,
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
          {
            title: "总业绩",
            width:150,
            align:'center',
            key: "totalAchievement",
            // render: (h, params) => {
            //   return h(
            //         "div",
            //         params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
            //       )
                
            // },
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
                               this.totalPerformanceModel = true
                               this.getHospitalTotalPriceBrokenLine(hospitalId)
                               this.hospital = hospitalName
                               this.year = String( this.$moment(this.query.year).format("YYYY"))
                            }
                        },
                        },
                    },
                    params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
                ),
              ])
             }
          },
          {
            title: "新老客占比",
            key: "newOrOldCustomerRate",
            wdith:110,
            align:'center',
          },
          
        ],
        columns2: [
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
                               this.dispitalModel = true
                               this.getHospitalSendOrderBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.sendNum
                ),
              ])
             }
          },
          {
            title: "上门数",
            key: "visitNum",
            width:90,
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
                               this.doorToDoorModel = true
                               this.getHospitalVisitBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.visitNum
                ),
              ])
             }
          },
          {
            title: "上门率",
            key: "visitRate",
            align:'center',
            width:110,
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
          {
            title: "新客成交",
            key: "newCustomerDealNum",
            width:100,
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
                               this.newCustomerDealModel = true
                               this.getHospitalNewCustomerDealBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.newCustomerDealNum ? params.row.newCustomerDealNum  : 0
                ),
              ])
             }
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            wdith:100,
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
          {
            title: "新客业绩",
            key: "newCustomerAchievement",
            width:120,
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
                               this.newCustomerPerformanceModel = true
                               this.getHospitalNewCustomerPerformanceBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.newCustomerAchievement ? (params.row.newCustomerAchievement).toFixed(2) : 0
                ),
              ])
             }
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width:120,
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
          {
            title: "老客成交",
            key: "oldCustomerDealNum",
            width:110,
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
                               this.oldDealModel = true
                               this.getHospitalOldCustomerDealBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.oldCustomerDealNum ? (params.row.oldCustomerDealNum).toFixed(2) : 0
                ),
              ])
             }
          },
          {
            title: "老客业绩",
            key: "oldCustomerAchievement",
            width:140,
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
                               this.oldPerformanceModel = true
                               this.getHospitalOldCustomerPerformanceBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.oldCustomerAchievement ? (params.row.oldCustomerAchievement).toFixed(2) : 0
                ),
              ])
             }
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width:120,
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
          {
            title: "总业绩",
            width:150,
            align:'center',
            key: "totalAchievement",
            // render: (h, params) => {
            //   return h(
            //         "div",
            //         params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
            //       )
                
            // },
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
                               this.totalPerformanceModel = true
                               this.getHospitalTotalPriceBrokenLine(hospitalId)
                            }
                        },
                        },
                    },
                    params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
                ),
              ])
             }
          },
          {
            title: "新老客占比",
            key: "newOrOldCustomerRate",
            wdith:110,
            align:'center',
          },
          
        ],
        columns3: [
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
            width:100,
            align:'center',
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            wdith:100,
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
            width:120,
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
            width:140,
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
            width:120,
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
            width:150,
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
        data1: [],
        data2: [],
        data3: [],
      },
      // 派单量折线图数据
      dispitalModel:false,
      dispatchList:[],
      hospital:'',
      // 上门数折线图数据
      doorToDoorModel:false,
      doorToDoorList:[],
      // 上门率折线图数据
      doorToDoorRateModel:false,
      doorToDoorRateList:[],
      // 新客成交折线图数据
      newCustomerDealModel:false,
      newCustomerDealList:[],
      // 新客成交率折线图数据
      newCustomerDealRateModel:false,
      newCustomerDealRateList:[],
      // 新客业绩折线图数据
      newCustomerPerformanceModel:false,
      newCustomerPerformanceList:[],
      // 新客客单价
      newCustomerPriceModel:false,
      newCustomerPriceList:[],
      // 老客成交
      oldDealModel:false,
      oldDealList:[],
      // 老客业绩
      oldPerformanceModel:false,
      oldPerformanceList:[],
      // 老客客单价
      oldPerformancePriceModel:false,
      oldPerformancePriceList:[],
      // 总业绩
      totalPerformanceModel:false,
      totalPerformanceList:[],
    };
  },
  mounted(){
    
  },
  methods: {
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
    // 根据医院id与年份获取派单折线图
    getHospitalSendOrderBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalSendOrderBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { sendOrderPerformance} = res.data;
          this.dispatchList = sendOrderPerformance;
          }
      });
    },
    // 根据医院id与年份获取上门数折线图
    getHospitalVisitBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalVisitBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { VisitPerformance} = res.data;
          this.doorToDoorList = VisitPerformance;
          }
      });
    },
    // 根据医院id与年份获取上门率折线图
    getHospitalVisitRateBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalVisitRateBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { VisitRatePerformance} = res.data;
          this.doorToDoorRateList = VisitRatePerformance;
          }
      });
    },
    // 根据医院id与年份获取新客成交折线图
    getHospitalNewCustomerDealBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalNewCustomerDealBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { NewCustomerDealPerformance} = res.data;
          this.newCustomerDealList = NewCustomerDealPerformance;
          }
      });
    },
    // 根据医院id与年份获取新客成交率折线图
    getHospitalNewCustomerDealRateBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalNewCustomerDealRateBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { NewCustomerDealRatePerformance} = res.data;
          this.newCustomerDealRateList = NewCustomerDealRatePerformance;
          }
      });
    },
    // 根据医院id与年份获取新客业绩折线图
    getHospitalNewCustomerPerformanceBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalNewCustomerPerformanceBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { NewCustomerPerformancePerformance} = res.data;
          this.newCustomerPerformanceList = NewCustomerPerformancePerformance;
          }
      });
    },
    // 根据医院id与年份获取新客客单价折线图
    getHospitalNewCustomerUnitPriceBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalNewCustomerUnitPriceBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { NewCustomerUnitPricePerformance} = res.data;
          this.newCustomerPriceList = NewCustomerUnitPricePerformance;
          }
      });
    },
    // 根据医院id与年份获取老客成交折线图
    getHospitalOldCustomerDealBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalOldCustomerDealBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { OldCustomerDealPerformance} = res.data;
          this.oldDealList = OldCustomerDealPerformance;
          }
      });
    },
    // 根据医院id与年份获取老客业绩折线图
    getHospitalOldCustomerPerformanceBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalOldCustomerPerformanceBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { OldCustomerPerformancePerformance} = res.data;
          this.oldPerformanceList = OldCustomerPerformancePerformance;
          }
      });
    },
    // 根据医院id与年份获取老客客单价折线图
    getHospitalOldCustomerUnitPriceBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalOldCustomerUnitPriceBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { OldCustomerUnitPricePerformance} = res.data;
          this.oldPerformancePriceList = OldCustomerUnitPricePerformance;
          }
      });
    },
    // 根据医院id与年份获取总业绩折线图
    getHospitalTotalPriceBrokenLine(value) {
        const data = {
            year: this.$moment(this.query.year).format("YYYY"),
            hospitalId:value
        }
      api.getHospitalTotalPriceBrokenLine(data).then((res) => {
          if (res.code === 0) {
          const { totalCustomerPerformance} = res.data;
          this.totalPerformanceList = totalCustomerPerformance;
          }
      });
    },
    













    // 全国机构运营当年数据
    getHospitalOperationYearData() {
        const data = {
            year: this.$moment(this.query.year).format("YYYY")
        }
        if(this.$moment(this.query.year).format("YYYY") > this.$moment().format("YYYY")){
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
    
  },
  created() {
  },
  watch:{
    activeName: {
      handler(value) {
        if (value === "yearDate") {
          this.isTab = true
        //   this.query.year=this.$moment().format("YYYY")
          this.getHospitalOperationYearData();
        }
      },
      immediate: true,
    },
  }
};
</script>
<style >
.right{
    display: flex;
    justify-content: flex-end;
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
.ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
}
.ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
}
.ivu-table .demo-table-info-cell-age {
    background-color: #ff6600;
    color: #fff;
}
.ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
}
</style>