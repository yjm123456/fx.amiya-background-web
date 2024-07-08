
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
    totalAchievementAndDateSchedule:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {totalPerformanceBrokenLineList,newCustomerPerformanceBrokenLineList,oldCustomerPerformanceBrokenLineList,
      
      } = value
      let date =[]
      let totalPerformanceBrokenLineLists =[]
      let newCustomerPerformanceBrokenLineLists =[]
      let oldCustomerPerformanceBrokenLineLists =[]
     
      totalPerformanceBrokenLineList ? totalPerformanceBrokenLineList.map(item=>{
        date.push(item.date)
        totalPerformanceBrokenLineLists.push(item.performance)
      }) : []
      newCustomerPerformanceBrokenLineList ? newCustomerPerformanceBrokenLineList.map(item=>{
        newCustomerPerformanceBrokenLineLists.push(item.performance)
      }):[]
      oldCustomerPerformanceBrokenLineList ? oldCustomerPerformanceBrokenLineList.map(item=>{
        oldCustomerPerformanceBrokenLineLists.push(item.performance)
      }):[]
      
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
                        params[i].data  +'w' +
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
          data: ['新客业绩','老客业绩','总业绩'],
          selected:{
            '新客业绩':true,
            '老客业绩':true,
            '总业绩':true,
          },
          textStyle:{
            color:'#000'
          }
        },
        series: [
           
            {
                name: '新客业绩',
                type: 'line',
                data: newCustomerPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#0AABBD'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '老客业绩',
                type: 'line',
                data: oldCustomerPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#7381FB'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '总业绩',
                type: 'line',
                data: totalPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#BB5DF9'  // 折线的颜⾊
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
    totalAchievementAndDateSchedule(value){
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

