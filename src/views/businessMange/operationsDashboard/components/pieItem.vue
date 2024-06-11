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
    pieItemData: Array,
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
          formatter: function (name) {
            var total = 0;
            var data = option.series[0].data;
            for (var i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
            }
            for (var i = 0, l = data.length; i < l; i++) {
                if (data[i].name == name) {
                    var percentage = data[i].value == 0 ? '0%' : ((data[i].value / total) * 100).toFixed(2) + '%';
                    return  name + '(' + ' ' + percentage + ')';
                }
            }
            return name + ' 0%';
        }
        },
        series: [
          {
            type: "pie",
            // radius: ["40%", "70%"],
            radius: '50%',
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
    pieItemData(value) {
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
