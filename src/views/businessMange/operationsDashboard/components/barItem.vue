<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '95%', height: '410px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    barItemData: Array,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let name = []
      let newValueList = []
      let oldValueList = []
      value.map(item=>{
        name.unshift(item.name)
        newValueList.unshift(item.newCustomerPerformance)
        oldValueList.unshift(item.oldCustomerPerformance)
      })
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
            show:false
        },
        grid: {
          left: "10%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",

        },
        yAxis: {
          type: "category",
          data: name,
          axisLabel: {
            formatter: function(value) {
                return value.length > 5 ? value.slice(0, 5) + '...' : value;
            }
        }
        },
        series: [
          {
            name: "新客",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            emphasis: {
              focus: "series",
            },
            data: newValueList,
            sort: 'desc' // 设置为'desc'以从高到低排序
          },
          {
            name: "老客",
            type: "bar",
            stack: "total",
            label: {
              show: false,
              color:'#fff'
            },
            emphasis: {
              focus: "series",
            },
            data: oldValueList,
            sort: 'desc' // 设置为'desc'以从高到低排序
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
    barItemData(value) {
      // this.$nextTick(() => {
      this.myEcharts(value);
      // let list = [{name:'张三',newValue:120,oldValue:320},{name:'张三2',newValue:220,oldValue:320},{name:'张三2',newValue:11,oldValue:320}]
      // let list2 = list.map((item,index)=>{
      //   return item.newValue + item.oldValue
      // })
      // let list3 = list2.sort((a,b)=>b-a)
      // console.log(list3)
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 410px;
  // margin-left: 5%;
}
</style>
