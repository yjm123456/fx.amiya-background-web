<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '300px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    newCustomerToHospitalPerformanceRatio: Object,
  },
  data() {
    return {
      myChart: "",

      order: [],
    };
  },
  computed: {
    isCollapsed() {
      return this.$store.state.home.isCollapsed;
    },
  },
  watch: {
    isCollapsed(value) {
      setTimeout(() => {
        if (this.myChart) this.myChart.resize();
      }, 400);
    },
  },
  methods: {
    // 订单状态分布
    myEcharts() {
      let legend = this.order.map((_) => _.name);
      let option = {
        title: {
          text: "新客上门人数占比",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        // legend: {
        //   data: legend,
        //   x:'center',
        //   y:'bottom',
        // },
        legend: {
          orient: "vertical",
          left: "left",
          data: legend,
        },
        grid: {
          containLabel: true
        },
       
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.order,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: false,
              position: 'center'
            },
          },
        ],
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch:{
    newCustomerToHospitalPerformanceRatio(value){
      this.order = value.performanceList.map((item) => {
        return {
          name: item.hospitalName,
          value: item.performance,
        };
      });
      this.$nextTick(() => {
        this.myEcharts();
      });
    }
  }
};

</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
}
</style>
