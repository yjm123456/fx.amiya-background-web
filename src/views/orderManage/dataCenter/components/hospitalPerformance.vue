
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '250px' }" ></div>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    hospitalOrderAndPriceInfoVo:Array
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let hospitalNames =[]
      let prices = [] 
      let orderNums = []
      value.map(item=>{
        hospitalNames.push(item.hospitalName)
        prices.push(item.price != 0 ? ((item.price)/1000).toFixed(2) : 0)
        orderNums.push(item.orderNum)
      })
      let option = {
        // title: {
        //   text: "医院业绩",
        //   x: "left",
        //   style:{
        //     marginLeft:-20
        //   }

        // },
        xAxis: {
          type: 'category',
          data: hospitalNames
        },
        yAxis: {
          type: 'value',
          // name: '元',
          
        },
        // dataZoom: [
        //     {
        //     type: "slider",
        //     realtime: true,
        //     start: 0,
        //     end: 100,
        //     xAxisIndex: [0],
        //     },
        // ],
        tooltip: {
            trigger: 'axis',
            formatter(params) {
              let val0 = params[0]["value"];
              let val1 = params[1]["value"];
              let circle = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:`;
              let data0 = `${circle}#384766"></span> ${
                params[0]["seriesName"]
              }: ${val0} k`;
              let data1 = `${circle}#88682f"></span> ${
                params[1]["seriesName"]
              }: ${val1}`;
              return `${params[0].axisValueLabel}<br/>${data0}<br/>${data1}`;
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '12%',
          containLabel: true
        },
        legend: {
          x:'left',
          data: ['价格', '单量'],
          left:'12%'
        },
        series: [
           {
                name: '价格',
                type: 'bar',
                data: prices,
                barWidth : 30,//柱图宽度
                itemStyle: { 
                    normal: { 
                        color: '#384766'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '单量',
                type: 'bar',
                data: orderNums,
                barWidth : 30,//柱图宽度
                itemStyle: { 
                    normal: { 
                        color: '#88682f'  // 折线的颜⾊
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
    hospitalOrderAndPriceInfoVo(value){
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
}
</style>

