
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '350px',marginTop:'10px' }" ></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    brokenLineDataObj:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {beforeLivingData,livingData,afterLivingData,total} = value
      let date =[]
      let beforeLivingDatas =[]
      let livingDatas =[]
      let afterLivingDatas =[]
      let totals =[]
      let totalTypes =[]
     
      beforeLivingData ? beforeLivingData.map(item=>{
        date.push(item.date)
        beforeLivingDatas.push(item.performance)
      }) : []
      livingData ? livingData.map(item=>{
        livingDatas.push(item.performance)
      }):[]
      afterLivingData ? afterLivingData.map(item=>{
        afterLivingDatas.push(item.performance)
      }):[]
      total ? total.map(item=>{
        totals.push(item.performance)
      }):[]
     
      let option = {
        
        xAxis: {
          type: 'category',
          data: date  ,
          name: '日期',
        },
        yAxis: {
          name: '人数',
          type: 'value',
          axisLabel:{
            formatter:(value) => {
                return value ;
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
                        params[i].data  +'人' +
                        '</span>'
                    )
                }
                listItem = list.join('<br>')
                return axisValueLabel + '<br>' + listItem
            }
          },
        
        
        grid: {
           top: '17%',
          containLabel: true,
        },
        legend: {
          x:'center',
          y:'top',
          data: ['直播前','直播中','直播后','总线索'],
          selected:{
            '直播前':true,
            '直播中':true,
            '直播后':true,
            '总线索':true,
          },
          textStyle:{
            color:'#000'
          }
        },
        series: [
            {
                name: '直播前',
                type: 'line',
                data: beforeLivingDatas,
                itemStyle: { 
                    normal: { 
                        
                        color: '#0AABBD'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '直播中',
                type: 'line',
                data: livingDatas,
                itemStyle: { 
                    normal: { 
                        color: '#7381FB'  // 折线的颜⾊
                    } 
                },
            },
            
            {
                name: '直播后',
                type: 'line',
                data: afterLivingDatas,
                itemStyle: { 
                    normal: { 
                        color: '#BB5DF9'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '总线索',
                type: 'line',
                data: totals,
                itemStyle: { 
                    normal: { 
                        color: '#F37F51'  // 折线的颜⾊
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
    brokenLineDataObj(value){
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
  height: 300px;
  // margin-left: 5%;
}
</style>

