
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '380px' }" ></div>
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
    privateDomainAchievement:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let date =[]
      let orderPrice = []
      value.oldCustomerAchievement.map(item=>{
        date.push(item.date)
        orderPrice.push(item.orderPrice != 0 ? ((item.orderPrice)/1000).toFixed(2) : 0)
      })
      let option = {
        title: {
          text: "老客业绩",
          x: "38%",
          y:"-0.5%"
        },
        xAxis: {
          type: 'category',
          data: date
        },
        yAxis: {
          type: 'value',
          
        },
        tooltip: {
            trigger: 'axis',
            formatter(params) {
              let val0 = params[0]["value"];
              let circle = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:`;
              let data0 = `${circle}#384766"></span> ${
                params[0]["seriesName"]
              }: ${val0} k`;
              
              return `${params[0].axisValueLabel}<br/>${data0}<br/>`;
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
          x:'50%',
          data: ['业绩'],
        },
        series: [
           {
                name: '业绩',
                type: 'line',
                data: orderPrice,
                itemStyle: { 
                    normal: { 
                        color: '#384766'  // 折线的颜⾊
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
    privateDomainAchievement(value){
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
  height: 360px;
}
</style>

