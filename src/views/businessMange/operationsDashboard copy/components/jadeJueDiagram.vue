<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '180px'}"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    customerData: Object,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let data = [
        {
          name: "下卡量",
          value: this.customerData.addCardNum,
        },
        {
          name: "退卡量",
          value: this.customerData.refundCardNum,
        },
        {
          name: "分诊量",
          value: this.customerData.distributeConsulationNum,
        },
        {
          name: "加v量",
          value: this.customerData.addWechatNum,
        },
      ];
      // let colorArr = ["#6f7dfc", "#ba5afa", "#3d92f3", "#fa5aed"];
      let colorArr = ["#2d8cf0", "#19be6b", "#ff9900", "#E46CBB"];
      let arrName = getArrayValue(data, "name");
      let arrValue = getArrayValue(data, "value");
      let sumVal = eval(arrValue.join("+"));
      let objData = array2obj(data, "name");
      let optionData = getData(data);

      function getArrayValue(array, key) {
        var res = [];
        if (array) {
          array.forEach(function(t) {
            res.push(t[key]);
          });
        }
        return res;
      }

      function array2obj(array, key) {
        var resObj = {};
        for (var i = 0; i < array.length; i++) {
          resObj[array[i][key]] = array[i];
        }
        return resObj;
      }

      function getData(data) {
        var res = {
          series: [],
          yAxis: [],
        };
        let center = ["48%", "50%"];
        for (let i = 0; i < data.length; i++) {
          let radius = [70 - i * 15 + "%", 65 - i * 15 + "%"];
          res.series.push({
            name: "",
            type: "pie",
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius,
            center,
            label: {
              show: false,
            },
            itemStyle: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              borderWidth: 5,
              borderRadius: 10 // 设置环的边框圆角
            },
            data: [
              {
                value: data[i].value,
                name: data[i].name,
              },
              {
                value: sumVal - data[i].value,
                name: "",
                itemStyle: {
                  color: "transparent",
                  borderWidth: 0,
                  borderRadius: 10 // 设置环的边框圆角
                  
                },
                tooltip: {
                  show: false,
                },
                hoverAnimation: false,
              },
            ],
          });
          res.series.push({
            name: "",
            type: "pie",
            silent: true,
            z: 1,
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius,
            center,
            label: {
              show: false,
            },
            itemStyle: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              borderWidth: 5,
              borderRadius: 10 // 设置环的边框圆角
              
            },
            data: [
              {
                value: 7.5,
                itemStyle: {
                  color: "transparent",
                  borderWidth: 0,
                },
                tooltip: {
                  show: false,
                },
                hoverAnimation: false,
              },
              {
                value: 2.5,
                name: "",
                itemStyle: {
                  color: "rgba(0,0,0,0)",
                  borderWidth: 0,
                },
                tooltip: {
                  show: false,
                },
                hoverAnimation: false,
              },
            ],
          });
          res.yAxis.push(((data[i].value / sumVal) * 100).toFixed(2) + "%");
        }
        return res;
      }
      // 环形图旁边的圆点颜色样式
      let rich = {};
      colorArr.map((item, index) => {
        rich["circle" + index] = {
          color: item,
          fontSize: 25,
          lineHeight: 60,
        };
      });
      // 图例的样式
      let legendRich = {
        value: {
          fontSize: 12,
          lineHeight: 30,
          color: "#000",
          padding: [0, 0, 0, 5],
        },
        per: {
          fontSize: 12,
          lineHeight: 30,
          color: "#000",
          padding: [0, 0, 0, 5],
        },
      };
      colorArr.map((item, index) => {
        legendRich["title" + index] = {
          fontSize: 12,
          lineHeight: 15,
          color: item,
          padding: [0, 0, 0, 5],
        };
      });
      let option = {
        backgroundColor: "#fff",
        color: colorArr,
        legend: {
            // orient: 'horizontal', // 设置为横向
            // left: 'right',       // 水平位置，可选值：'left', 'center', 'right'
            // top: 'bottom'    ,     // 垂直位置，可选值：'top', 'middle', 'bottom'
          show: true,
          icon: "circle",
        //   top: "center",
        //   right: "20%",
          top: '15%',
          orient: 'horizontal',
          left: 'left', 
          data: arrName,
          width: 10,
          padding: [0, 10],
          itemGap: 8,
          formatter: function(name) {
            let str = ``;
            // console.log("objData", objData);
            data.map((item, index) => {
              if (item.name == name) {
                let per = (item.value / sumVal) * 100;
                str = `{value|${name}}{${"title" + index}|}{per|${item.value}}`;
              }
            });
            return str;
          },
          textStyle: {
            rich: legendRich,
            display:'flex',
          },
          
        },
        
        grid: {
          top: "0%",
          bottom: "0%",
          left: "-50%",
          // containLabel: false,
          
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            // axisLabel: {
            //   show: true,
            //   interval: 0,
            //   inside: true,
            //   position: "right",
            //   formatter: function(v, i) {
            //     return `{${"circle" + i}|}`;
            //   },
            //   rich,
            // },
            // data: optionData.yAxis,
          },
        ],
        xAxis: [
          {
            show: false,
          },
          
        ],
        series: optionData.series,
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
    customerData(value) {
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
  height: 350px;
  
  // margin-left: 5%;
}
</style>
