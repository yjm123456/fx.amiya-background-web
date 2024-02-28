
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
    brokenLine:Object,
    
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
      const {increaseFansData,increaseFansFeeData,showcaseFeeDta,showcaseIncomeData,} = value
      let date =[]
      let increaseFansDatas =[]
      let increaseFansFeeDatas =[]
      let showcaseFeeDtas =[]
      let showcaseIncomeDatas =[]
      
      increaseFansData.map(item=>{
        date.push(item.date)
        increaseFansDatas.push(item.performance)
      })
      increaseFansFeeData.map(item=>{
        increaseFansFeeDatas.push(item.performance)
      })
      showcaseFeeDta.map(item=>{
        showcaseFeeDtas.push(item.performance)
      })
      showcaseIncomeData.map(item=>{
        showcaseIncomeDatas.push(item.performance)
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
                        params[i].data  + `${params[i].seriesName == '涨粉量' ? '个' : '元' }` +
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
          data: ['涨粉量', '橱窗收入','涨粉付费','橱窗付费'],
          selected:{
            '涨粉量':true,
            '橱窗收入':true,
            '涨粉付费':false,
            '橱窗付费':false,

          }
        },
        series: [
           {
                name: '涨粉量',
                type: 'line',
                data: increaseFansDatas,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '橱窗收入',
                type: 'line',
                data: increaseFansFeeDatas,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '涨粉付费',
                type: 'line',
                data: showcaseFeeDtas,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '橱窗付费',
                type: 'line',
                data: showcaseIncomeDatas,
                itemStyle: { 
                    normal: { 
                        color: '#E46CBB'  // 折线的颜⾊
                    } 
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
    brokenLine(value){
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

