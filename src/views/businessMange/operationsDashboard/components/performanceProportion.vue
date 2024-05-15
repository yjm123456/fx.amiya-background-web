<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '450px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    getEmployeePerformanceRankings: Object,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const { getEmployeePerformanceRankings } = value;
      let employeeNames = [];
      let performances = [];
      let color  = ['#6f7dfc','#3d92f3','#ba5afa','#fa5aed','#7330fc'];

      getEmployeePerformanceRankings ? getEmployeePerformanceRankings.map((item) => {
        employeeNames.push(item.employeeName);
        performances.push(item.performance);
      }): [];
      let numberWithNames = performances.map((number, index) => {
        return { value:number, color: color[index] };
      });
      
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: (params) => {
                let list = []
                let listItem = ''
                let axisValueLabel = params[0].axisValueLabel
                
                for (let i = 0; i < params.length; i++) {
                    list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color.colorStops[0].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].name +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].value  +'%' +
                        '</span>'
                    )
                }
                listItem = list.join('<br>')
                return axisValueLabel + '<br>' + listItem
            }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: employeeNames,
          },
        ],
        yAxis: [
          {
            name: '占比/%',
            type: "value",
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "60%",
            data: numberWithNames.map(item => {
            return {
                value: item.value,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 1, // 渐变方向从上到下
                        [
                            {offset: 0, color: item.color}, // 柱图顶部颜色
                            {offset: 1, color: '#fff'} // 柱图底部颜色
                        ]
                    )
                }
            };
        }),
            
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
    getEmployeePerformanceRankings(value) {
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
