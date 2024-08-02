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
    CustomerFlowRateByEmployeeAndHospital: Array,
    title: String,
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
      let list2 = [];
      let list3 = [];
      value.map((item) => {
        name.unshift(item.name);
        if (this.title == "助理") {
          list1.unshift(item.distributeConsulationNum);
          list2.unshift(item.sendOrderNum);
          list3.unshift(item.visitNum);
        } else {
          list1.unshift(item.sendOrderNum);
          list2.unshift(item.visitNum);
          list3.unshift(item.newCustomerDealNum);
        }
      });
      let option = {
        tooltip: {
          trigger: "axis",
        },
        calculable: true,
        xAxis: [
          {
            type: "value",
            // prettier-ignore
            
          },
        ],
        yAxis: [
          {
            type: "category",
            data: name,
            axisLabel: {
              formatter: function(value) {
                return value.length > 5 ? value.slice(0, 5) + "..." : value;
              },
            },
          },
        ],
        series: [
          {
            name: this.title == "助理" ? "分诊量" : "派单量",
            type: "bar",
            data: list1,
          },
          {
            name: this.title == "助理" ? "派单量" : "上门量",
            type: "bar",
            data: list2,
          },
          {
            name: this.title == "助理" ? "上门量" : "成交量",
            type: "bar",
            data: list3,
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
    CustomerFlowRateByEmployeeAndHospital(value) {
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
  height: 800px;
  // margin-left: 5%;
}
</style>
