
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '250px' }" ></div>
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
      const {designCardActualData,designCardOrderData,designCardRefundData} = value
      let date =[]
      let designCardActualDatas =[]
      let designCardOrderDatas =[]
      let designCardRefundDatas =[]
      
      designCardActualData.map(item=>{
        date.push(item.date)
        designCardActualDatas.push(item.performance)
      })
      designCardOrderData.map(item=>{
        designCardOrderDatas.push(item.performance)
      })
      designCardRefundData.map(item=>{
        designCardRefundDatas.push(item.performance)
      })
      
      let option = {
        
        xAxis: {
          type: 'category',
          data: date  ,
          name: '月份',
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
                        params[i].data  + '单' +
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
          data: ['设计卡下单', '设计卡退单','设计卡实际'],
          selected:{
            '设计卡下单':true,
            '设计卡退单':true,
            '设计卡实际':false,

          }
        },
        series: [
           {
                name: '设计卡下单',
                type: 'line',
                data: designCardOrderDatas,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '设计卡退单',
                type: 'line',
                data: designCardRefundDatas,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '设计卡实际',
                type: 'line',
                data: designCardActualDatas,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
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
  height:200px;
  // margin-left: 5%;
}
</style>

