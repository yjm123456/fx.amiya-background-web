<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import * as echarts from "echarts";
require("echarts/theme/macarons");
export default {
  props: {
    requirementTypeRateList: Array,
  },
  data() {
    return {
      myChart: "",
    };
  },
  computed: {
    isCollapsed() {
      return this.$store.state.home.isCollapsed;
    },
  },
  watch: {
    requirementTypeRateList() {
      this.$nextTick(() => {
        this.myEcharts();
      });
    },

    isCollapsed() {
      setTimeout(() => {
        if (this.myChart) this.myChart.resize();
      }, 400);
    },
  },
  methods: {
    myEcharts() {
      let requirementTypeRateList = this.requirementTypeRateList.map((item) => {
        return {
          name: item.name,
          value: item.requirementTypeRate,
        };
      });
      let legend = requirementTypeRateList.map((_) => _.name);
      let option = {
        title: {
          text: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
          backgroundColor:"#fff"
        },
        legend: {
          y: "top",
          x: "center",
          data: legend,
        },
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: requirementTypeRateList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.myChart = echarts.init(this.$refs.dom, "macarons");
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
