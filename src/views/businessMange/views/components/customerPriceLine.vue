
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '360px' }" ></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    daodaoGuestUnitPricePerformance:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {totalGuestUnitPricePerformanceBrokenLine,newGuestUnitPricePerformanceBrokenLine,oldGuestUnitPricePerformanceBrokenLine,} = value
      let date =[]
      let totalGuestUnitPricePerformanceBrokenLines =[]
      let newGuestUnitPricePerformanceBrokenLines =[]
      let oldGuestUnitPricePerformanceBrokenLines =[]
      totalGuestUnitPricePerformanceBrokenLine.map(item=>{
        date.push(item.date)
        totalGuestUnitPricePerformanceBrokenLines.push(item.performance)
      })
      newGuestUnitPricePerformanceBrokenLine.map(item=>{
        newGuestUnitPricePerformanceBrokenLines.push(item.performance)
      })
      oldGuestUnitPricePerformanceBrokenLine.map(item=>{
        oldGuestUnitPricePerformanceBrokenLines.push(item.performance)
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
            formatter:(value) => {
                if(value >= 10000){
                    value = (value / 10000) + 'W';
                }
                if(value >= 1000){
                    value = (value / 1000) + 'K';
                }
                return value;
            }
        }

        },
        tooltip: {
            trigger: 'axis',
            formatter: params => {
                return `<div style="border:0;color:#666;text-align: left;width:220px">
                          <p style="color:#000"> ${params[0].axisValue}</p>
                          <div class="flex justify-content-space-between">
                            <div>
                                <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[0].seriesName}:
                                    ${(function () {
                                        if (params[0].data >= 1000 && params[0].data < 10000) {
                                            return ((params[0].data) / 1000).toFixed(2) + 'K'
                                        } else if (params[0].data >= 10000) {
                                            return (params[0].data / 10000).toFixed(2) + 'W'
                                        } else if (params[0].data < 1000) {
                                            return (params[0].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[1].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[1].seriesName}:
                                    ${(function () {
                                        if (params[1].data >= 1000 && params[1].data < 10000) {
                                            return (params[1].data / 1000).toFixed(2) + 'k'
                                        } else if (params[1].data >= 10000) {
                                            return (params[1].data / 10000).toFixed(2) + 'w'
                                        } else if (params[1].data < 1000) {
                                            return (params[1].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[2].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[2].seriesName}:
                                    ${(function () {
                                        if (params[2].data >= 1000 && params[2].data < 10000) {
                                            return (params[2].data / 1000).toFixed(2) + 'k'
                                        } else if (params[2].data >= 10000) {
                                            return (params[2].data / 10000).toFixed(2) + 'w'
                                        } else if (params[2].data < 1000) {
                                            return (params[2].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                          </div>
                        </div>`
            },
          },
        
        
        grid: {
          top: '12%',
          containLabel: true,
        },
        legend: {
          x:'center',
          y:'bottom',
          data: ['总客单价', '新客客单价','老客客单价'],
        },
        series: [
           {
                name: '总客单价',
                type: 'line',
                data: totalGuestUnitPricePerformanceBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '新客客单价',
                type: 'line',
                data: newGuestUnitPricePerformanceBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '老客客单价',
                type: 'line',
                data: oldGuestUnitPricePerformanceBrokenLines,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
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
    daodaoGuestUnitPricePerformance(value){
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

