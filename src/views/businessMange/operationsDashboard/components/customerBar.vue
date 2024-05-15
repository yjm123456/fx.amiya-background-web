<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '200px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    customerBarData: Object,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const { sendNum, visitNum, dealNum } = value;
      let totalNums = [];
      let groupDaoDaos = [];
      let groupJiNas = [];

      [dealNum] ? [dealNum].map((item) => {
        totalNums.push(item.totalNum);
        groupDaoDaos.push(item.groupDaoDao);
        groupJiNas.push(item.groupJiNa);
      }):[];
      [visitNum] ? [visitNum].map((item) => {
        totalNums.push(item.totalNum);
        groupDaoDaos.push(item.groupDaoDao);
        groupJiNas.push(item.groupJiNa);
      }) : [];
      
      [sendNum] ? [sendNum].map((item) => {
        totalNums.push(item.totalNum);
        groupDaoDaos.push(item.groupDaoDao);
        groupJiNas.push(item.groupJiNa);
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
            top:'13%'
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
          data: ["成交", "上门", "派单"],
          // show: false, // 隐藏X轴
        },
        series: [
          {
            name: "总人数",
            type: "bar",
            data: totalNums,
          },
          {
            name: "刀刀组人数",
            type: "bar",
            data: groupDaoDaos,
          },
          {
            name: "吉娜组人数",
            type: "bar",
            data: groupJiNas,
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
    customerBarData(value) {
      this.$nextTick(() => {
      this.myEcharts(value);
      });
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
