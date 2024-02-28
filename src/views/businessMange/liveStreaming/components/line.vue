
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
      const {actualReturnBackMoneyData,investFlowData,orderGMVData,refundGMVData,} = value
      let date =[]
      let actualReturnBackMoneyDatas =[]
      let investFlowDatas =[]
      let orderGMVDatas =[]
      let refundGMVDatas =[]
      
      actualReturnBackMoneyData.map(item=>{
        date.push(item.date)
        actualReturnBackMoneyDatas.push(item.performance)
      })
      investFlowData.map(item=>{
        investFlowDatas.push(item.performance)
      })
      orderGMVData.map(item=>{
        orderGMVDatas.push(item.performance)
      })
      refundGMVData.map(item=>{
        refundGMVDatas.push(item.performance)
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
          data: ['下单GMV', '退单GMV','实际回款','直播付费'],
          selected:{
            '下单GMV':true,
            '退单GMV':true,
            '实际回款':false,
            '直播付费':false,

          }
        },
        series: [
           {
                name: '下单GMV',
                type: 'line',
                data: orderGMVDatas,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '退单GMV',
                type: 'line',
                data: refundGMVDatas,
                itemStyle: { 
                    normal: { 
                        color: '#19be6b'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '实际回款',
                type: 'line',
                data: actualReturnBackMoneyDatas,
                itemStyle: { 
                    normal: { 
                        color: '#ff9900'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '直播付费',
                type: 'line',
                data: investFlowDatas,
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

