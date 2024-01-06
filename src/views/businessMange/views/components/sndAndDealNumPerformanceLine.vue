
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '260px' }" ></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    sndAndDealNumPerformance:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {sendOrderBrokenLine,totalVisitBrokenLine,newCustomerVisitBrokenLine,
      oldCustomerVisitBrokenLine,totalDealBrokenLine,newCustomerDealBrokenLine,oldCustomerDealBrokenLine} = value
      let date =[]
      let sendOrderBrokenLines =[]
      let totalVisitBrokenLines =[]
      let newCustomerVisitBrokenLines =[]
      let oldCustomerVisitBrokenLines =[]
      let totalDealBrokenLines =[]
      let newCustomerDealBrokenLines =[]
      let oldCustomerDealBrokenLines =[]
      sendOrderBrokenLine.map(item=>{
        date.push(item.date)
        sendOrderBrokenLines.push(item.performance)
      })
      totalVisitBrokenLine.map(item=>{
        totalVisitBrokenLines.push(item.performance)
      })
      newCustomerVisitBrokenLine.map(item=>{
        newCustomerVisitBrokenLines.push(item.performance)
      })
      oldCustomerVisitBrokenLine.map(item=>{
        oldCustomerVisitBrokenLines.push(item.performance)
      })
      totalDealBrokenLine.map(item=>{
        totalDealBrokenLines.push(item.performance)
      })
      newCustomerDealBrokenLine.map(item=>{
        newCustomerDealBrokenLines.push(item.performance)
      })
      oldCustomerDealBrokenLine.map(item=>{
        oldCustomerDealBrokenLines.push(item.performance)
      })
      let option = {
        title: {
          text: "趋势图",
          x: "center",
          style:{
            marginLeft:-20
          }

        },
        xAxis: {
          type: 'category',
          data: date ,
          name: '月份',
        },
        yAxis: {
          type: 'value',
          axisLabel:{
        }

        },
        tooltip: {
            trigger: 'axis',
          },
        
        
        grid: {
          top: '12%',
          containLabel: true,
        },
        legend: {
          x:'center',
          y:'bottom',
          data: ['派单数', '总上门数','新客上门','老客上门','总成交数','新客成交','老客成交'],
        },
        series: [
           {
                name: '派单数',
                type: 'line',
                data: sendOrderBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '总上门数',
                type: 'line',
                data: totalVisitBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '新客上门',
                type: 'line',
                data: newCustomerVisitBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '老客上门',
                type: 'line',
                data: oldCustomerVisitBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#9A66E4'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '总成交数',
                type: 'line',
                data: totalDealBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#ed3f14'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '新客成交',
                type: 'line',
                data: newCustomerDealBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#73c0de'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '老客成交',
                type: 'line',
                data: oldCustomerDealBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#a2ce59'  // 折线的颜⾊
                    } 
                },
            },
            
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
    sndAndDealNumPerformance(value){
      // this.$nextTick(() => {
        this.myEcharts(value);
      // });
    },
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 180px;
  // margin-left: 5%;
}
</style>

