<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '800px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    assiatantTargetCompleteAndPerformanceRateData: Array,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let name = [];
      let list1 = [];
      value.map((item) => {
        name.unshift(item.id);
        list1.unshift(item.name);
      });
      let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params) => {
                let list = []
                let listItem = ''
                let axisValueLabel = params[0].axisValueLabel 
                
                for (let i = 0; i < params.length; i++) {
                   list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].name +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].data  +   '%'  +
                        '</span>'
                    ) 

                }
                listItem = list.join('<br>')
                return listItem
            }
        },
        calculable: true,
        yAxis: [
          {
            type: "category",
            data: name,
            axisLabel: {
              formatter: function(value) {
                return value.length > 5 ? value.slice(0, 5) + "..." : value ;
              },
            },
          },
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        series: [
          {
            type: "bar",
            data: list1,
            // barWidth:'50'
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
    assiatantTargetCompleteAndPerformanceRateData(value) {
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
  height: 800px;
  // margin-left: 5%;
}
</style>
