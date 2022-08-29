
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
    daodaoBaseBusiness:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {addWechatBrokenLine,consulationCardNumBrokenLine,thisMonthConsulationCardConsumedNumBrokenLine,
      historyConsulationCardConsumedNumBrokenLine,thisMonthConsulationCardRefundNumBrokenLine,historyConsulationCardRefundNumBrokenLine} = value
      let date =[]
      let addWechatBrokenLines =[]
      let consulationCardNumBrokenLines =[]
      let thisMonthConsulationCardConsumedNumBrokenLines =[]
      let historyConsulationCardConsumedNumBrokenLines =[]
      let thisMonthConsulationCardRefundNumBrokenLines =[]
      let historyConsulationCardRefundNumBrokenLines =[]
      addWechatBrokenLine.map(item=>{
        date.push(item.date)
        addWechatBrokenLines.push(item.performance)
      })
      consulationCardNumBrokenLine.map(item=>{
        consulationCardNumBrokenLines.push(item.performance)
      })
      thisMonthConsulationCardConsumedNumBrokenLine.map(item=>{
        thisMonthConsulationCardConsumedNumBrokenLines.push(item.performance)
      })
      historyConsulationCardConsumedNumBrokenLine.map(item=>{
        historyConsulationCardConsumedNumBrokenLines.push(item.performance)
      })
      thisMonthConsulationCardRefundNumBrokenLine.map(item=>{
        thisMonthConsulationCardRefundNumBrokenLines.push(item.performance)
      })
      historyConsulationCardRefundNumBrokenLine.map(item=>{
        historyConsulationCardRefundNumBrokenLines.push(item.performance)
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
          data: ['加V', '面诊卡下单','当月面诊卡消耗','历史面诊卡消耗','当月面诊卡退单','历史面诊卡退单'],
        },
        series: [
           {
                name: '加V',
                type: 'line',
                data: addWechatBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '面诊卡下单',
                type: 'line',
                data: consulationCardNumBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '当月面诊卡消耗',
                type: 'line',
                data: thisMonthConsulationCardConsumedNumBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '历史面诊卡消耗',
                type: 'line',
                data: historyConsulationCardConsumedNumBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#9A66E4'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '当月面诊卡退单',
                type: 'line',
                data: thisMonthConsulationCardRefundNumBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#ed3f14'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '历史面诊卡退单',
                type: 'line',
                data: historyConsulationCardRefundNumBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#73c0de'  // 折线的颜⾊
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
    daodaoBaseBusiness(value){
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

