
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '440px' }" ></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    performance:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {groupDaoDaoPerformanceData,groupJinaPerformanceData,cooperationLiveAnchorPerformanceData,groupYellowVPerformanceData} = value
      let date =[]
      let groupDaoDaoPerformanceDatas =[]
      let groupJinaPerformanceDatas =[]
      let cooperationLiveAnchorPerformanceDatas =[]
      let groupYellowVPerformanceDatas = []
      if(groupDaoDaoPerformanceData){
        groupDaoDaoPerformanceData.map(item=>{
          date.push(item.date)
          groupDaoDaoPerformanceDatas.push(item.performance)
        })
      }
      if(groupJinaPerformanceData){
        groupJinaPerformanceData.map(item=>{
          groupJinaPerformanceDatas.push(item.performance)
        })
      }
      if(cooperationLiveAnchorPerformanceData){
        cooperationLiveAnchorPerformanceData.map(item=>{
          cooperationLiveAnchorPerformanceDatas.push(item.performance)
        })
      }
      if(groupYellowVPerformanceData){
        groupYellowVPerformanceData.map(item=>{
          groupYellowVPerformanceDatas.push(item.performance)
        })
      }
      
      
      
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
                return `<div style="border:0;color:#666;text-align: left;width:180px">
                          <p style="color:#000"> ${params[0].axisValue}</p>
                          <div class="flex justify-content-space-between">
                            <div>
                                <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[0].seriesName}:
                                    ${(function () {
                                        if (params[0].data >= 1000 && params[0].data < 10000) {
                                            return (params[0].data / 1000).toFixed(2) + 'K'
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
          data: ['刀刀组业绩', '吉娜组业绩'],
        },
        series: [
           {
                name: '刀刀组业绩',
                type: 'line',
                data: groupDaoDaoPerformanceDatas,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '吉娜组业绩',
                type: 'line',
                data: groupJinaPerformanceDatas,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            // {
            //     name: '合作达人业绩',
            //     type: 'line',
            //     data: cooperationLiveAnchorPerformanceDatas,
            //     itemStyle: { 
            //         normal: { 
            //             color: '#ff9900'  // 折线的颜⾊
            //         } 
            //     },
            // },
            // {
            //     name: '黄V组业绩',
            //     type: 'line',
            //     data: groupYellowVPerformanceDatas,
            //     itemStyle: { 
            //         normal: { 
            //             color: '#E46CBB'  // 折线的颜⾊
            //         } 
            //     },
            // },
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
    performance(value){
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

