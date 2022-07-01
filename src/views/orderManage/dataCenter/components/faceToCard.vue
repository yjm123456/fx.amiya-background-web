
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
    consultationCardInfo:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    //面诊卡情况
    myEcharts(value) {
      const {consultationCardInfoBuy,consultationCardInfoUsed} = value
      consultationCardInfoBuy.sort(function(a,b){
          return a < b ? 1 : -1
      });
      consultationCardInfoUsed.sort(function(a,b){
          return a < b ? 1 : -1
      });
      let datas =[]
      let consultationCardInfoBuys = [] 
      let consultationCardInfoUseds = []
      consultationCardInfoBuy.map(item=>{
        datas.push(item.date)
        consultationCardInfoBuys.push(item.orderNum)
      })
      
      consultationCardInfoUsed.map(items=>{
        consultationCardInfoUseds.push(items.orderNum)
      })
      let option = {
        title: {
          text: "面诊卡",
          x: "40px",
          style:{
            marginLeft:-20
          }

        },
        xAxis: {
          type: 'category',
          data: datas
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
            trigger: 'axis'
        },
        grid: {
          top: '12%',
          containLabel: true
        },
        legend: {
          x:'left',
          data: ['面诊卡下单量', '面诊卡消耗量'],
          left:'13%'
        },
        series: [
           {
                name: '面诊卡下单量',
                type: 'line',
                data: consultationCardInfoBuys,
                itemStyle: { 
                    normal: { 
                        color: '#384766'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '面诊卡消耗量',
                type: 'line',
                data: consultationCardInfoUseds,
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
    consultationCardInfo(value){
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

