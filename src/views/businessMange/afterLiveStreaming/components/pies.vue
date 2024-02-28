<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '180px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    newAndOldCustomers: Array,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let option = {
        tooltip: {
          trigger: "item",
          formatter: '{b} : {c}%'
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "新老客业绩占比",
            type: "pie",
            radius: ["40%", "70%"],
            // avoidLabelOverlap: false,
            // label: {
            //   show: false,
            //   position: "center",
            // },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 10,
            //     fontWeight: "bold",
            //   },
            // },
            // labelLine: {
            //   show: false,
            // },
            data: value ,
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
    newAndOldCustomers(value) {
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
