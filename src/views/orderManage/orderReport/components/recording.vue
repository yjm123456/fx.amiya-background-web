
<template>
  <div class="wrapper">
    <!-- <div ref="dom" :style="{ width: '100%', height: '300px' }"></div> -->
    <div class="none_data">暂无数据</div>
    <!-- <div class="none_data" v-if="!orderData.todayAddOrderNum.length">暂无数据</div> -->
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    orderData:{
        type:Object
    }
  },
  data() {
    return {
      myChart: "",
      hospitalOrders:[],
      xDate:[],
      yDate:[]
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
    // 各医院接单情况
    myEcharts() {
      let option = {
        xAxis: {
            type: 'category',
            data: this.xDate,
            axisLabel: {
            show: true,
              textStyle: {
                color: '#fff',  //更改坐标轴文字颜色
                fontSize : 12    //更改坐标轴文字大小
              }
          },
          "axisTick": {       //y轴刻度线
              "show": false
          },
          "splitLine": {     //网格线
              "show": false
          }
        },
        yAxis: {
            //隐藏Y轴数据
            axisLabel: {
                formatter: function () {
                    return "";
                }
            },
            dispaly: "none",
            "axisLine": {       //y轴
                "show": false
            },
            "axisTick": {       //y轴刻度线
                "show": false
            },
            "splitLine": {     //网格线
                "show": false
            },
        },
        label: {
            show: true,
            position: 'top'
        },
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                data: this.yDate,
                type: 'bar',
                barWidth : 30,//柱图宽度
                itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                          offset: 0,
                          color: "#184B6C" // 0% 处的颜色
                      }, {
                          offset: 1,
                          color: "#00E2DB" // 100% 处的颜色
                      }], false)
                  }
              }
            }
        ]
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
  },
  watch:{
      orderData(value){
          const { todayAddOrderNum } = value
        //   this.hospitalOrders = value.todayHospitalOrderNum
        let xDate = []
        let yDate = []
        todayAddOrderNum.map((item=>{
            xDate.push(item.hospitalName)
            yDate.push(item.orderCount)
        }))
        this.xDate = xDate
        this.yDate = yDate
        // this.$nextTick(() => {
        //     this.myEcharts();
        // });
      }
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 300px;
  position: relative;
}
.none_data{
    position: absolute;
    right: 45%;
    bottom: 50%;
}
</style>

