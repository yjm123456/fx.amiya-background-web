
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '350px' }" ></div>
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
      let hospitalName =[]
      let prices = [] 
      let orderNums = []
      value.map(item=>{
        hospitalName.push(item.hospitalName)
        prices.push(item.price != 0 ? ((item.price)/1000).toFixed(2) : 0)
        orderNums.push(item.orderNum)
      })
      let option = {
        title: {
          text: "医院复购",
          x: "40%",
          y:"-0.5%"
        },
        xAxis: {
          type: 'category',
          data: hospitalName
        },
        yAxis: {
          type: 'value',
          
        },
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
          x:'52%',
          data: ['业绩', '订单量'],
        },
        series: [
           {
                name: '业绩',
                type: 'bar',
                data: prices,
                barWidth : 15,//柱图宽度
                itemStyle: { 
                    normal: { 
                        color: '#384766'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '订单量',
                type: 'bar',
                data: orderNums,
                barWidth : 15,//柱图宽度
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
  height: 300px;
}
</style>

