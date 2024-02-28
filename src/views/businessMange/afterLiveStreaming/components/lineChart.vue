
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '380px' }" ></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    brokenData:Object,
    
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
        // console.log(value)
      const {totalPerformanceBrokenLineList,newCustomerPerformanceBrokenLineList,oldCustomerPerformanceBrokenLineList,effectivePerformanceBrokenLineList,potentialPerformanceBrokenLineList,newCustomerEffectivePerformanceBrokenLineList,newCustomerPotentialPerformanceBrokenLineList,oldCustomerEffectivePerformanceBrokenLineList,oldCustomerPotentialPerformanceBrokenLineList} = value
      let date =[]
      let totalPerformanceBrokenLineLists =[]
      let newCustomerPerformanceBrokenLineLists =[]
      let oldCustomerPerformanceBrokenLineLists =[]
      let effectivePerformanceBrokenLineLists =[]
      let potentialPerformanceBrokenLineLists =[]
      let newCustomerEffectivePerformanceBrokenLineLists =[]
      let newCustomerPotentialPerformanceBrokenLineLists =[]
      let oldCustomerEffectivePerformanceBrokenLineLists =[]
      let oldCustomerPotentialPerformanceBrokenLineLists =[]
     
      
      totalPerformanceBrokenLineList.map(item=>{
        date.push(item.date)
        totalPerformanceBrokenLineLists.push(item.performance)
      })
      newCustomerPerformanceBrokenLineList.map(item=>{
        newCustomerPerformanceBrokenLineLists.push(item.performance)
      })
      oldCustomerPerformanceBrokenLineList.map(item=>{
        oldCustomerPerformanceBrokenLineLists.push(item.performance)
      })
      effectivePerformanceBrokenLineList.map(item=>{
        effectivePerformanceBrokenLineLists.push(item.performance)
      })
      potentialPerformanceBrokenLineList.map(item=>{
        potentialPerformanceBrokenLineLists.push(item.performance)
      })
      newCustomerEffectivePerformanceBrokenLineList.map(item=>{
        newCustomerEffectivePerformanceBrokenLineLists.push(item.performance)
      })
      newCustomerPotentialPerformanceBrokenLineList.map(item=>{
        newCustomerPotentialPerformanceBrokenLineLists.push(item.performance)
      })
      oldCustomerEffectivePerformanceBrokenLineList.map(item=>{
        oldCustomerEffectivePerformanceBrokenLineLists.push(item.performance)
      })
      oldCustomerPotentialPerformanceBrokenLineList.map(item=>{
        oldCustomerPotentialPerformanceBrokenLineLists.push(item.performance)
      })
      
      let option = {
        
        xAxis: {
          type: 'category',
          data: date  ,
          name: '日期',
        },
        yAxis: {
          name: '数据',
          type: 'value',
          axisLabel:{
              formatter:(value) => {
                  return value 
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
                        params[i].data  + '元' +
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
          data: ['总业绩', '新客业绩','老客业绩','有效业绩','潜在业绩','新客有效','新客潜在','老客有效','老客潜在'],
          selected:{
            '总业绩':true,
            '新客业绩':true,
            '老客业绩':false,
            '有效业绩':false,
            '潜在业绩':false,
            '新客有效':false,
            '新客潜在':false,
            '老客有效':false,
            '老客潜在':false,

          }
        },
        series: [
           {
                name: '总业绩',
                type: 'line',
                data: totalPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '新客业绩',
                type: 'line',
                data: newCustomerPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '老客业绩',
                type: 'line',
                data: oldCustomerPerformanceBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
                    } 
                },
            },
            {
            name: "有效业绩",
            type: "line",
            data: effectivePerformanceBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#E46CBB", // 折线的颜⾊
              },
            },
          },
          {
            name: "潜在业绩",
            type: "line",
            data: potentialPerformanceBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#9A66E4", // 折线的颜⾊
              },
            },
          },
          {
            name: "新客有效",
            type: "line",
            data: newCustomerEffectivePerformanceBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#ed3f14", // 折线的颜⾊
              },
            },
          },
          {
            name: "新客潜在",
            type: "line",
            data: newCustomerPotentialPerformanceBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#82cae5", // 折线的颜⾊
              },
            },
          },
          {
            name: "老客有效",
            type: "line",
            data: oldCustomerEffectivePerformanceBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#ff7070", // 折线的颜⾊
              },
            },
          },
          {
            name: "老客潜在",
            type: "line",
            data: oldCustomerPotentialPerformanceBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#9fe060", // 折线的颜⾊
              },
            },
          },
           
        ],
        
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
    brokenData(value){
        // console.log(value)
      this.$nextTick(() => {
        this.myEcharts(value);
      });
    },
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height:350px;
  // margin-left: 5%;
}
</style>

