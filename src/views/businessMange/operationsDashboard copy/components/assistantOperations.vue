<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '400px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    getEmployeeCustomerAnalizes: Object,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const { getEmployeeCustomerAnalizes } = value;
      let employeeNames = [];
      let sendOrderNums = [];
      let visitNums = [];
      let dealNums = [];

      getEmployeeCustomerAnalizes ? getEmployeeCustomerAnalizes.map((item) => {
        employeeNames.unshift(item.employeeName);
        sendOrderNums.unshift(item.sendOrderNum);
        visitNums.unshift(item.visitNum);
        dealNums.unshift(item.dealNum);
      }) : [];
     

      let option ={
        
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          textStyle:{
            align:'left'
          }
        },
        legend: {
            top:'3%'
        },
        grid: {
          left: "0%",
          right: "10%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          
        },
        yAxis: {
          type: "category",
          data: employeeNames,
        //   show: false, // 隐藏X轴
        },
        series: [
          {
            name: "派单量",
            type: "bar",
            data: sendOrderNums,
          },
          {
            name: "上门量",
            type: "bar",
            data: visitNums,
          },
          {
            name: "成交量",
            type: "bar",
            data: dealNums,
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
  watch: {
    getEmployeeCustomerAnalizes(value) {
      // this.$nextTick(() => {
      this.myEcharts(value);
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 180px;
  // margin-left: 5%;
}
</style>
