
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
    achievementInfo:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {newCustomerAchievement,oldCustomerAchievement} = value
      newCustomerAchievement.sort(function(a,b){
          return a < b ? 1 : -1
      });
      oldCustomerAchievement.sort(function(a,b){
          return a < b ? 1 : -1
      });
      let datas =[]
      let newCustomerAchievements = [] 
      let oldCustomerAchievements = []
      newCustomerAchievement.map(item=>{
        datas.push(item.date)
        newCustomerAchievements.push(item.orderPrice)
      })
      
      oldCustomerAchievement.map(items=>{
        oldCustomerAchievements.push(items.orderPrice)
      })
      let option = {
        title: {
          text: "业绩",
          x: "80px",
          y:"-2px",
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
          data: ['新客业绩', '老客业绩'],
          left:'16%',
        },
        series: [
           {
                name: '新客业绩',
                type: 'line',
                data: newCustomerAchievements,
                itemStyle: { 
                    normal: { 
                        color: '#384766'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '老客业绩',
                type: 'line',
                data: oldCustomerAchievements,
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
    achievementInfo(value){
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
  // margin-left: 5%;
}
</style>

