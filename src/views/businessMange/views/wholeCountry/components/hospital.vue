<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '300px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    hospitalListData: Array,
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
    myEcharts(value) {
      let hospitalNames = [];
      let totalAchievements = [];
      let sendNums = [];
      let visitNums = [];
      let visitRates = [];
      let newCustomerDealNums = [];
      let newCustomerDealRates = [];
      let newCustomerAchievements = [];
      let newCustomerUnitPrices = [];
      let oldCustomerDealNums = [];
      let oldCustomerAchievements = [];
      let oldCustomerUnitPrices = [];
      let newOrOldCustomerRates = [];
      value.map((item) => {
        hospitalNames.unshift(item.hospitalName);
        totalAchievements.unshift(item.totalAchievement);
        sendNums.unshift(item.sendNum);
        visitNums.unshift(item.visitNum);
        visitRates.unshift(item.visitRate);
        newCustomerDealNums.unshift(item.newCustomerDealNum);
        newCustomerDealRates.unshift(item.newCustomerDealRate);
        newCustomerAchievements.unshift(item.newCustomerAchievement);
        newCustomerUnitPrices.unshift(item.newCustomerUnitPrice);
        oldCustomerDealNums.unshift(item.oldCustomerDealNum);
        oldCustomerAchievements.unshift(item.oldCustomerAchievement);
        oldCustomerUnitPrices.unshift(item.oldCustomerUnitPrice);
        newOrOldCustomerRates.unshift(item.newOrOldCustomerRate);
      });
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: params => {
                return `<div style="border:0;color:#666;text-align: left;width:180px">
                          <p style="color:#000"> ${params[0].axisValue}</p>
                          <div class="flex justify-content-space-between">
                            <div>
                                <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[0].seriesName}:
                                    ${(function () {
                                        if (params[0].data >= 1000 && params[0].data < 10000) {
                                            return ((params[0].data) / 1000).toFixed(2) + 'K'
                                        } else if (params[0].data >= 10000) {
                                            return (params[0].data / 10000).toFixed(2) + 'W'
                                        } else if (params[0].data < 1000) {
                                            return (params[0].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[1].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[1].seriesName}:
                                    ${(function () {
                                        if (params[1].data >= 1000 && params[1].data < 10000) {
                                            return (params[1].data / 1000) + 'k'
                                        } else if (params[1].data >= 10000) {
                                            return (params[1].data / 10000) + 'w'
                                        } else if (params[1].data < 1000) {
                                            return (params[1].data)
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[2].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[2].seriesName}:
                                    ${(function () {
                                        if (params[2].data >= 1000 && params[2].data < 10000) {
                                            return (params[2].data / 1000).toFixed(2)+'%' + 'k'
                                        } else if (params[2].data >= 10000) {
                                            return (params[2].data / 10000).toFixed(2)+'%' + 'w'
                                        } else if (params[2].data < 1000) {
                                            return (params[2].data).toFixed(2)+'%'
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[3].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[3].seriesName}:
                                    ${(function () {
                                        if (params[3].data >= 1000 && params[3].data < 10000) {
                                            return (params[3].data / 1000).toFixed(2)+'%' + 'k'
                                        } else if (params[3].data >= 10000) {
                                            return (params[3].data / 10000).toFixed(2)+'%' + 'w'
                                        } else if (params[3].data < 1000) {
                                            return (params[3].data).toFixed(2)+'%'
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[4].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[4].seriesName}:
                                    ${(function () {
                                        if (params[4].data >= 1000 && params[4].data < 10000) {
                                            return (params[4].data / 1000).toFixed(2) + 'k'
                                        } else if (params[4].data >= 10000) {
                                            return (params[4].data / 10000).toFixed(2) + 'w'
                                        } else if (params[4].data < 1000) {
                                            return (params[4].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[5].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[5].seriesName}:
                                    ${(function () {
                                        if (params[5].data >= 1000 && params[5].data < 10000) {
                                            return (params[5].data / 1000).toFixed(2) + 'k'
                                        } else if (params[5].data >= 10000) {
                                            return (params[5].data / 10000).toFixed(2) + 'w'
                                        } else if (params[5].data < 1000) {
                                            return (params[5].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[6].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[6].seriesName}:
                                    ${(function () {
                                        if (params[6].data >= 1000 && params[6].data < 10000) {
                                            return (params[6].data / 1000).toFixed(2) + 'k'
                                        } else if (params[6].data >= 10000) {
                                            return (params[6].data / 10000).toFixed(2) + 'w'
                                        } else if (params[6].data < 1000) {
                                            return (params[6].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                              <div>
                                <i class="dot" style="background: ${params[7].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[7].seriesName}:
                                    ${(function () {
                                        if (params[7].data >= 1000 && params[7].data < 10000) {
                                            return (params[7].data / 1000).toFixed(2) + 'k'
                                        } else if (params[7].data >= 10000) {
                                            return (params[7].data / 10000).toFixed(2) + 'w'
                                        } else if (params[7].data < 1000) {
                                            return (params[7].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                          </div>
                        </div>`
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLabel:{
            formatter:(value) => {
                if(value >= 10000){
                    value = (value / 10000) + 'W';
                }
                if(value >= 1000){
                    value = (value / 1000) + 'K';
                }
                return value;
            }
        }
        },
        yAxis: {
          type: "category",
          data: hospitalNames,
        },
        series: [
          {
            name: "总业绩",
            type: "bar",
            stack: "total",
            barWidth : 15,//柱图宽度
            emphasis: {
              focus: "series",
            },
            data: totalAchievements,
          },
          {
            name: "派单量",
            type: "bar",
            stack: "total",
            barWidth : 15,//柱图宽度
            emphasis: {
              focus: "series",
            },
            data: sendNums,
          },
          {
            name: "上门率",
            type: "bar",
            stack: "total",
            barWidth : 15,//柱图宽度
            emphasis: {
              focus: "series",
            },
            data: visitRates,
          },
          {
            name: "新客成交率",
            type: "bar",
            stack: "total",
            barWidth : 15,//柱图宽度
            emphasis: {
              focus: "series",
            },
            data:newCustomerDealRates,
          },
          {
            name: "新客业绩",
            barWidth : 15,//柱图宽度
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: newCustomerAchievements,
          },
          {
            name: "新客客单价",
            barWidth : 15,//柱图宽度
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: newCustomerUnitPrices,
          },
          {
            name: "老客业绩",
            barWidth : 15,//柱图宽度
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: oldCustomerAchievements,
          },
          {
            name: "老客客单价",
            barWidth : 15,//柱图宽度
            type: "bar",
            stack: "total",
            // label: {
            //   show: true,
              
            // },
            emphasis: {
              focus: "series",
            },
            data: oldCustomerUnitPrices,
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
    hospitalListData(value) {
      this.myEcharts(value);
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
}
</style>
