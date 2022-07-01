
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
    orderVisitInfo:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {newCustomerVisit,oldCustomerVisit} = value
      newCustomerVisit.sort(function(a,b){
          return a < b ? 1 : -1
      });
      oldCustomerVisit.sort(function(a,b){
          return a < b ? 1 : -1
      });
      let datas =[]
      let newCustomerVisits = [] 
      let oldCustomerVisits = []
      newCustomerVisit.map(item=>{
        datas.push(item.date)
        newCustomerVisits.push(item.orderNum)
      })
      
      oldCustomerVisit.map(items=>{
        oldCustomerVisits.push(items.orderNum)
      })
      let option = {
        title: {
          text: "上门数",
          x: "35px",
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
          data: ['新诊上门', '复诊上门'],
          left:'13%'
        },
        series: [
           {
                name: '新诊上门',
                type: 'line',
                data: newCustomerVisits,
                itemStyle: { 
                    normal: { 
                        color: '#384766'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '复诊上门',
                type: 'line',
                data: oldCustomerVisits,
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
    orderVisitInfo(value){
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

