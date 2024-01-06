
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
    performanceCompleteRate:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {addWeChatCompleteRateBrokenLine,consulationCardUsedCompleteRateBrokenLine,sendOrderCompleteRateBrokenLine,
      newCustomerVisitCompleteRateBrokenLine,newCustomerDealCompleteRateBrokenLine,thisMonthConsulationCardRefundCompleteRateBrokenLine,historyConsulationCardRefundCompleteRateBrokenLine} = value
      let date =[]
      let addWeChatCompleteRateBrokenLines =[]
      let consulationCardUsedCompleteRateBrokenLines =[]
      let sendOrderCompleteRateBrokenLines =[]
      let newCustomerVisitCompleteRateBrokenLines =[]
      let newCustomerDealCompleteRateBrokenLines =[]
      let thisMonthConsulationCardRefundCompleteRateBrokenLines =[]
      let historyConsulationCardRefundCompleteRateBrokenLines =[]
      addWeChatCompleteRateBrokenLine.map(item=>{
        date.push(item.date)
        addWeChatCompleteRateBrokenLines.push(item.performance)
      })
      consulationCardUsedCompleteRateBrokenLine.map(item=>{
        consulationCardUsedCompleteRateBrokenLines.push(item.performance)
      })
      sendOrderCompleteRateBrokenLine.map(item=>{
        sendOrderCompleteRateBrokenLines.push(item.performance)
      })
      newCustomerVisitCompleteRateBrokenLine.map(item=>{
        newCustomerVisitCompleteRateBrokenLines.push(item.performance)
      })
      newCustomerDealCompleteRateBrokenLine.map(item=>{
        newCustomerDealCompleteRateBrokenLines.push(item.performance)
      })
      thisMonthConsulationCardRefundCompleteRateBrokenLine.map(item=>{
        thisMonthConsulationCardRefundCompleteRateBrokenLines.push(item.performance)
      })
      historyConsulationCardRefundCompleteRateBrokenLine.map(item=>{
        historyConsulationCardRefundCompleteRateBrokenLines.push(item.performance)
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
            // formatter: params => {
            //     return `<div style="border:0;color:#666;text-align: left;width:180px">
            //               <p style="color:#000"> ${params[0].axisValue}</p>
            //               <div class="flex justify-content-space-between">
            //                 <div>
            //                     <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[0].seriesName }: ${params[0].data ? params[0].data + '%' :'0%' }
                                    
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[1].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[1].seriesName }: ${params[1].data ? params[1].data + '%' :'0%' }
                                    
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[2].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[2].seriesName }:${params[2].data ? params[2].data + '%' :'0%' }
                                  
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[3].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[3].seriesName }: ${params[3].data ? params[3].data + '%' :'0%' }
                                    
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[4].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[4].seriesName }: ${params[4].data ? params[4].data + '%' :'0%' }
                                   
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[5].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[5].seriesName }: ${params[5].data ? params[5].data + '%' :'0%' }
                                   
            //                       </span>
            //                   </div>
            //               </div>
            //             </div>`
            // },
          },
        
        
        grid: {
          top: '12%',
          containLabel: true,
        },
        legend: {
          x:'center',
          y:'bottom',
          data: ['加v', '下单面诊卡消耗','派单','新客上门','新客成交','当月面诊卡退单','历史面诊卡退单'],
        },
        series: [
           {
                name: '加v',
                type: 'line',
                data: addWeChatCompleteRateBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '下单面诊卡消耗',
                type: 'line',
                data: consulationCardUsedCompleteRateBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '派单',
                type: 'line',
                data: sendOrderCompleteRateBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '新客上门',
                type: 'line',
                data: newCustomerVisitCompleteRateBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#9A66E4'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '新客成交',
                type: 'line',
                data: newCustomerDealCompleteRateBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#ed3f14'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '当月面诊卡退单',
                type: 'line',
                data: thisMonthConsulationCardRefundCompleteRateBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#73c0de'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '历史面诊卡退单',
                type: 'line',
                data: historyConsulationCardRefundCompleteRateBrokenLines,
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
    performanceCompleteRate(value){
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

