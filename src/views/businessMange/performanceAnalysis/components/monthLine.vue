
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '400px' }" ></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    monthBrokenLineListData:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {assistantPhotoPerformanceBrokenLineList,effectivePerformanceBrokenLineList,historySendOrderPerformanceBrokenLineList,
      liveAnchorReceptionPerformanceBrokenLineList,liveAnchorVideoPerformanceBrokenLineList,newCustomerPerformanceBrokenLineList,noLiveAnchorReceptionPerformanceBrokenLineList,oldCustomerPerformanceBrokenLineList,potentialPerformanceBrokenLineList,thisMonthSendOrderPerformanceBrokenLineList,tikTokPerformanceBrokenLineList,videoPerformanceBrokenLineList
      } = value
      let date =[]
      let assistantPhotoPerformanceBrokenLineLists =[]
      let effectivePerformanceBrokenLineLists =[]
      let historySendOrderPerformanceBrokenLineLists =[]
      let liveAnchorReceptionPerformanceBrokenLineLists =[]
      let liveAnchorVideoPerformanceBrokenLineLists =[]
      let newCustomerPerformanceBrokenLineLists =[]
      let noLiveAnchorReceptionPerformanceBrokenLineLists =[]
      let oldCustomerPerformanceBrokenLineLists =[]
      let potentialPerformanceBrokenLineLists =[]
      let thisMonthSendOrderPerformanceBrokenLineLists =[]
      let tikTokPerformanceBrokenLineLists =[]
      let videoPerformanceBrokenLineLists =[]
      assistantPhotoPerformanceBrokenLineList.map(item=>{
        date.push(item.date)
        assistantPhotoPerformanceBrokenLineLists.push(item.performance)
      })
      effectivePerformanceBrokenLineList.map(item=>{
        effectivePerformanceBrokenLineLists.push(item.performance)
      })
      historySendOrderPerformanceBrokenLineList.map(item=>{
        historySendOrderPerformanceBrokenLineLists.push(item.performance)
      })
      liveAnchorReceptionPerformanceBrokenLineList.map(item=>{
        liveAnchorReceptionPerformanceBrokenLineLists.push(item.performance)
      })
      liveAnchorVideoPerformanceBrokenLineList.map(item=>{
        liveAnchorVideoPerformanceBrokenLineLists.push(item.performance)
      })
      newCustomerPerformanceBrokenLineList.map(item=>{
        newCustomerPerformanceBrokenLineLists.push(item.performance)
      })
      noLiveAnchorReceptionPerformanceBrokenLineList.map(item=>{
        noLiveAnchorReceptionPerformanceBrokenLineLists.push(item.performance)
      })
      oldCustomerPerformanceBrokenLineList.map(item=>{
        oldCustomerPerformanceBrokenLineLists.push(item.performance)
      })
      potentialPerformanceBrokenLineList.map(item=>{
        potentialPerformanceBrokenLineLists.push(item.performance)
      })
      thisMonthSendOrderPerformanceBrokenLineList.map(item=>{
        thisMonthSendOrderPerformanceBrokenLineLists.push(item.performance)
      })

      tikTokPerformanceBrokenLineList.map(item=>{
        tikTokPerformanceBrokenLineLists.push(item.performance)
      })
      videoPerformanceBrokenLineList.map(item=>{
        videoPerformanceBrokenLineLists.push(item.performance)
      })
      
      let option = {
        
        xAxis: {
          type: 'category',
          data: date  ,
          name: '日期',
        },
        yAxis: {
          name: '业绩/w',
          type: 'value',
          axisLabel:{
            formatter:(value) => {
                // if(value >= 10000){
                //     value = (value / 10000) + 'W';
                // }
                // if(value >= 1000){
                //     value = (value / 1000) + 'K';
                // }
                return value + 'w';
            }
        }

        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                let list = []
                let listItem = ''
                let axisValueLabel = params[0].axisValueLabel + '号'
                for (let i = 0; i < params.length; i++) {
                    list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].data +'w' +
                        '</span>'
                    )
                }
                listItem = list.join('<br>')
                return axisValueLabel + '<br>' + listItem
            }
            //  formatter: params => {
            //     return `<div style="border:0;color:#666;text-align: left;width:180px">
            //               <p style="color:#000"> ${params[0].axisValue + '号'}</p>
            //               <div class="flex justify-content-space-between">
            //                 <div>
            //                     <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[0].seriesName}:
            //                         ${(function () {
            //                             return params[0].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[1].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[1].seriesName}:
            //                         ${(function () {
            //                             return params[1].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[2].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[2].seriesName}:
            //                         ${(function () {
            //                             return params[2].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[3].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[3].seriesName}:
            //                         ${(function () {
            //                             return params[3].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[4].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[4].seriesName}:
            //                         ${(function () {
            //                             return params[4].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[5].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[5].seriesName}:
            //                         ${(function () {
            //                             return params[5].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[6].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[6].seriesName}:
            //                         ${(function () {
            //                             return params[6].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[7].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[7].seriesName}:
            //                         ${(function () {
            //                             return params[7].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[8].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[8].seriesName}:
            //                         ${(function () {
            //                             return params[8].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[9].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[9].seriesName}:
            //                         ${(function () {
            //                             return params[9].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[10].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[10].seriesName}:
            //                         ${(function () {
            //                             return params[10].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>
            //                   <div>
            //                     <i class="dot" style="background: ${params[11].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[11].seriesName}:
            //                         ${(function () {
            //                             return params[11].data + 'w'
            //                         })()}
            //                       </span>
            //                   </div>

            //               </div>
            //             </div>`
            // },
          },
        
        
        grid: {
           top: '17%',
          containLabel: true,
        },
        legend: {
          x:'center',
          y:'top',
          data: ['新客业绩', '老客业绩','有效业绩','潜在业绩', '当月派单','历史派单','抖音业绩', '视频号业绩','主播视频业绩','助理照片业绩', '主播接诊业绩','非主播接诊业绩'],
          selected:{
            '新客业绩':true,
            '老客业绩':true,
            '有效业绩':false,
            '潜在业绩':false,
            '当月派单':false,
            '历史派单':false,
            '抖音业绩':false,
            '视频号业绩':false,
            '主播视频业绩':false,
            '助理照片业绩':false,
            '主播接诊业绩':false,
            '非主播接诊业绩':false,
          }
        },
        series: [
           {
                name: '新客业绩',
                type: 'line',
                data: newCustomerPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '老客业绩',
                type: 'line',
                data: oldCustomerPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '有效业绩',
                type: 'line',
                data: effectivePerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '潜在业绩',
                type: 'line',
                data: potentialPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#E46CBB'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '当月派单',
                type: 'line',
                data: thisMonthSendOrderPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#9A66E4'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '历史派单',
                type: 'line',
                data: historySendOrderPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#ed3f14'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '抖音业绩',
                type: 'line',
                data: tikTokPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#82cae5'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '视频号业绩',
                type: 'line',
                data: videoPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#7070d0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '主播视频业绩',
                type: 'line',
                data: liveAnchorVideoPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#1c3459'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '助理照片业绩',
                type: 'line',
                data: assistantPhotoPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#d58877'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '主播接诊业绩',
                type: 'line',
                data: liveAnchorReceptionPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#b68bc8'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '非主播接诊业绩',
                type: 'line',
                data: noLiveAnchorReceptionPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#fadf8f'  // 折线的颜⾊
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
    monthBrokenLineListData(value){
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

