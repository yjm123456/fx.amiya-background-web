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
    barData: Array,
    title:String
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
        name.unshift(item.key);
        list1.unshift(item.value);
      });
      let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: this.title == '复购率' ? (params) => {
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
                        params[i].value  +   '%'  +
                        '</span>'
                    ) 

                }
                listItem = list.join('<br>')
                return listItem
            } :
            (params) => {
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
                        params[i].value  +   '天'  +
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
            top:'1%',
            left: '1%',
            right: '8%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            name: '天',
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
    barData(value) {
      // this.$nextTick(() => {
      this.myEcharts(value);
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 95%;
  height: 200px;
  // margin-left: 5%;
}
</style>
