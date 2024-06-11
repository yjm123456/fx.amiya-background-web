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
    funnelPlotData: Array,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      // const { datas } = value;
      // let names = [];
      // let values = [];

      // datas
      //   ? datas.map((item) => {
      //       names.push(item.name);
      //       values.push(item.value);
      //     })
      //   : [];

      let option = {
        title: null,
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}",
        },

        toolbox: {
          show: false, //是否显示工具箱开关
          feature: {
            dataView: { show: false, readOnly: false }, //数据视图打开并允许编辑
            restore: { show: false }, //重新加载视图
            saveAsImage: { show: false }, //保存为图片
          },
        },
        //   legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: names
        //   },
        series: [
          {
            type: "funnel",
            width: "70%",
            height: "90%",
            left: "16%",
            top: "7%",
            label: {
              position: "left",
            },
            data: value,
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
    funnelPlotData(value) {
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
