<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '400px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    brokenLineData: Object,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {
        orderGMVBrokenLineList,
        orderPackagesBrokenLineList,
        qianChuanPutInBrokenLineList,
        refundGMVBrokenLineList,
        refundPackagesBrokenLineList,
        refundSinglePriceBrokenLineList,
        singlePriceBrokenLineList,
      } = value;
      let date = [];
      let orderGMVBrokenLineLists = [];
      let orderPackagesBrokenLineLists = [];
      let qianChuanPutInBrokenLineLists = [];
      let refundGMVBrokenLineLists = [];
      let refundPackagesBrokenLineLists = [];
      let refundSinglePriceBrokenLineLists = [];
      let singlePriceBrokenLineLists = [];
      orderGMVBrokenLineList.map((item) => {
        date.push(item.date);
        orderGMVBrokenLineLists.push(item.performance);
      });
      orderPackagesBrokenLineList.map((item) => {
        orderPackagesBrokenLineLists.push(item.performance);
      });
      qianChuanPutInBrokenLineList.map((item) => {
        qianChuanPutInBrokenLineLists.push(item.performance);
      });
      refundGMVBrokenLineList.map((item) => {
        refundGMVBrokenLineLists.push(item.performance);
      });
      refundPackagesBrokenLineList.map((item) => {
        refundPackagesBrokenLineLists.push(item.performance);
      });
      refundSinglePriceBrokenLineList.map((item) => {
        refundSinglePriceBrokenLineLists.push(item.performance);
      });
      singlePriceBrokenLineList.map((item) => {
        singlePriceBrokenLineLists.push(item.performance);
      });
      let option = {
        xAxis: {
          type: "category",
          data: date,
          name: "日期",
        },
        yAxis: {
          name: "业绩/元",
          type: "value",
          axisLabel: {
            formatter: (value) => {
              return value;
            },
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            let list = [];
            let listItem = "";
            let axisValueLabel = params[0].axisValueLabel + "号";
            for (let i = 0; i < params.length; i++) {
              list.push(
                '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                  params[i].color +
                  ';margin-right: 5px;border-radius: 50%;}"></i>' +
                  '<span style="display:inline-block;">' +
                  params[i].seriesName +
                  '</span><span style="display:inline-block;">&nbsp&nbsp' +
                  params[i].data +
                  "元" +
                  "</span>"
              );
            }
            listItem = list.join("<br>");
            return axisValueLabel + "<br>" + listItem;
          },
        },

        grid: {
          top: "17%",
          containLabel: true,
        },
        legend: {
          x: "center",
          y: "top",
          data: [
            "下单GMV",
            "直播间投流",
            "退款GMV",
            "下单件数",
            "退款件数",
            "下单件单价",
            "退款件单价",
          ],
          selected: {
            下单GMV: true,
            直播间投流: false,
            退款GMV: false,
            下单件数: false,
            退款件数: false,
            下单件单价: false,
            退款件单价: false,
          },
        },
        series: [
          {
            name: "下单GMV",
            type: "line",
            data: orderGMVBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#2d8cf0", // 折线的颜⾊
              },
            },
          },
          {
            name: "直播间投流",
            type: "line",
            data: qianChuanPutInBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#19be6b", // 折线的颜⾊
              },
            },
          },
          {
            name: "退款GMV",
            type: "line",
            data: refundGMVBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#ff9900", // 折线的颜⾊
              },
            },
          },
          {
            name: "下单件数",
            type: "line",
            data: orderPackagesBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#E46CBB", // 折线的颜⾊
              },
            },
          },
          {
            name: "退款件数",
            type: "line",
            data: refundPackagesBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#9A66E4", // 折线的颜⾊
              },
            },
          },
          {
            name: "下单件单价",
            type: "line",
            data: singlePriceBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#ed3f14", // 折线的颜⾊
              },
            },
          },
          {
            name: "退款件单价",
            type: "line",
            data: refundSinglePriceBrokenLineLists,
            itemStyle: {
              normal: {
                color: "#82cae5", // 折线的颜⾊
              },
            },
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
    brokenLineData(value) {
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
