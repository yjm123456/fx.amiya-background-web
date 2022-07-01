<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '600px' }"></div>
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
    employeeId: Number,
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
    getOrderStatusData() {
      const data = {
        employeeId: this.employeeId,
      };
      api.getOrderStatusData(data).then((res) => {
        if (res.code === 0) {
          const { order } = res.data;
          this.order = order.map((item) => {
            return {
              name: item.statusText,
              value: item.quantity,
            };
          });
          this.$nextTick(() => {
            this.myEcharts();
          });
        }
      });
    },
    // 订单状态分布
    myEcharts() {
      let legend = this.order.map((_) => _.name);
      let option = {
        title: {
          text: "订单状态分布",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: legend,
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
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
}
</style>
