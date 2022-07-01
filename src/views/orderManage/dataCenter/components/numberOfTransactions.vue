
<template>
  <div class="wrapper">
    <div class="echart_text" v-if="flag">
        <div>累计新诊成交：{{orderData.allNewCustomerDeal}}</div>
        <div class="text">累计复诊成交：{{orderData.allOldCustomerDeal}}</div>
    </div>
    <div ref="dom" :style="{ width: '100%', height: '250px' }"></div>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
   activeName:String,
   times:Object
  },
  data() {
    return {
      flag:false,
      myChart: "",
      //新诊成交
      orderOperationCondition: [],
      //   日期
      dates:[],
      orderData:{},
      //   复诊成交
      oldCustomerDealArr:[]
    };
  },
  computed: {
    isCollapsed() {
      return this.$store.state.home.isCollapsed;
    },
  },
  watch: {
    isCollapsed(value) {
      setTimeout(() => {
        if (this.myChart) this.myChart.resize();
      }, 400);
    },
  },
  methods: {
    getOrderOperationCondition() {
        const {startDate,endDate} = this.times
      const data = {
        startDate: startDate ? this.$moment(startDate).format('YYYY-MM-DD') : null,
        endDate:endDate ? this.$moment(endDate).format('YYYY-MM-DD') : null
      };
      if(startDate || startDate){
        this.flag = true
        api.OrderDealLine(data).then((res) => {
          if (res.code === 0) {
            const { orderData } = res.data;
            this.orderData = orderData
            let orders = []
            let date = []
            let oldCustomerDealArr = []
            orderData.newCustomerDeal.sort(function(a,b){
                return a < b ? 1 : -1
            });
                orderData.newCustomerDeal.map((item) => {
                orders.push(item.orderNum)
                date.push(item.date)
            });
            
            orderData.oldCustomerDeal.sort(function(a,b){
                return a < b ? 1 : -1
            });
            orderData.oldCustomerDeal.map((item) => {
                oldCustomerDealArr.push(item.orderNum)
            });
            this.orderOperationCondition = orders
            this.dates = date
            this.oldCustomerDealArr = oldCustomerDealArr
            this.$nextTick(() => {
              this.myEcharts();
            });
          }
        });
      }else{
        this.$Message.error('请选择时间')
      }
    },
    // 订单经营情况
    myEcharts() {
      let option = {
          
        xAxis: {
          type: 'category',
          data: this.dates
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          x:'left',
          data: ['新诊成交', '复诊成交'],
          left:'12%'
        },
        // dataZoom: [
        //     {
        //     type: "slider",
        //     realtime: true,
        //     start: 0,
        //     end: 100,
        //     xAxisIndex: [0],
        //     },
        // ],
        tooltip: {
            trigger: 'axis'
        },
        grid: {
          top: '12%',
          containLabel: true
        },
        series: [
          {
            name: '新诊成交',
            data: this.orderOperationCondition,
            type: 'line',
            // stack:'Total',
            itemStyle: { 
                normal: { 
                    color: '#384766'  // 折线的颜⾊
                } 
            },
            },
            {
                name: '复诊成交',
                data: this.oldCustomerDealArr,
                type: 'line',
                // stack:'Total',
                itemStyle: { 
                normal: { 
                    color: '#88682f'  // 折线的颜⾊
                } 
            },
           }
        ]
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.clear(); 
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch:{
      activeName(value){
          if(value == '成交量'){
              this.getOrderOperationCondition()
          }
      },
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 200px;
}
.echart_text{
    display: flex;
    justify-content: flex-end;
    margin-right: 10%;
}
.text{
    margin-left: 15px;
}
</style>

