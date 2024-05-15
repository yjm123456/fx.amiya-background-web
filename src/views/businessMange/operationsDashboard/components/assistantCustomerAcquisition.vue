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
    employeeDistributeConsulationNumAndAddWechats: Object,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const { employeeDistributeConsulationNumAndAddWechats } = value;
      let employeeNames = [];
      let distributeConsulationNums = [];
      let addWechatNums = [];

      employeeDistributeConsulationNumAndAddWechats ? employeeDistributeConsulationNumAndAddWechats.map((item) => {
        employeeNames.unshift(item.employeeName);
        distributeConsulationNums.unshift(item.distributeConsulationNum);
        addWechatNums.unshift(item.addWechatNum);
      }) : [];
     

      let option = {
        
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
            name: "分诊",
            type: "bar",
            data: distributeConsulationNums,
          },
          {
            name: "加v",
            type: "bar",
            data: addWechatNums,
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
    employeeDistributeConsulationNumAndAddWechats(value) {
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
