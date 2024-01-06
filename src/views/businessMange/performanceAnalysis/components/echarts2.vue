<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '50%', height: '360px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    echartsDate: Object,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let list = {
        a: "3%",
        b: "4%",
        c: "5%",
        d: "6%",
        e: "7%",
        f: "8%",
        g: "9%",
        h: "10%",
        i: "11%",
        data: [
          {
            value: 45,
            name: "派单量",
            rate: "45%",
            qoq: "56%",
            yoy: "66%",
          },
          {
            value: 55,
            name: "上门量",
            rate: "62%",
            qoq: "83%",
            yoy: "80%",
          },
          {
            value: 5,
            name: "下卡量",
            rate: "1%",
            qoq: "2%",
            yoy: "3%",
          },
          {
            value: 15,
            name: "退卡量",
            rate: "4%",
            qoq: "5%",
            yoy: "6%",
          },
          {
            value: 25,
            name: "分诊量",
            rate: "7%",
            qoq: "8%",
            yoy: "8%",
          },
          {
            value: 35,
            name: "加v量",
            rate: "12%",
            qoq: "23%",
            yoy: "34%",
          },
          
          
          {
            value: 65,
            name: "成交量",
            rate: "6%",
            qoq: "8%",
            yoy: "8%",
          },
        ],
      };

      let data = [];
      let name = [];
      let list1 = []
      let list2 = []
      let list3 = []
      let list4 = []
      let list5 = []
      let list6 = []
      let list7 = []
      list.data.map((item) => {
        data.push(item.value);
        name.push(item.name);
        if(item.name == '下卡量'){
          list1.push(item)
          return
        }else if(item.name == '退卡量'){
          list2.push(item)
          return
        }else if(item.name == '分诊量'){
          list3.push(item)
          return
        }else if(item.name == '加v量'){
          list4.push(item)
          return
        }else if(item.name == '派单量'){
          list5.push(item)
          return
        }else if(item.name == '上门量'){
          list6.push(item)
          return
        }else if(item.name == '成交量'){
          list7.push(item)
          return
        }
      });
let mergedArr = list7.concat(list6, list5,list4,list3,list2,list1);
      let option = {
        title: {
          text: "运营看板",
        },

        legend: {},
        grid: {
          left: "3%",
          right: "20%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          formatter: (params) => {
            // 打印确认params是对象还是数组
            // 对象：取鼠标悬浮当前项索引params.dataIndex
            // 数组：取鼠标悬浮当前项索引params[0].dataIndex
            let index = params.dataIndex;
            let obj = mergedArr[index]; // 通过索引取当前项完整的接口返回值
            let str = `${obj.name}：${obj.value}<br/>
			        目标达成率：${obj.rate}<br/>
			        环比：${obj.qoq}<br/>
              同比：${obj.yoy}<br/>`;
            return str;
          },
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          inverse: true,
        },
        yAxis: {
          type: "category",
          position: "right",
          // data: name
        },

        series: [
          {
            name: "运营看板",
            type: "bar",
            // data:data,
            data: mergedArr.map((i) => {
              return i.value;
            }),
            label: {
              show: true,
              color: "#000",
              formatter: (params) => {
                // 打印确认params是对象还是数组
                // 对象：取鼠标悬浮当前项索引params.dataIndex
                // 数组：取鼠标悬浮当前项索引params[0].dataIndex
                let index = params.dataIndex;
                let obj = mergedArr[index]; // 通过索引取当前项完整的接口返回值
                let str = `${obj.name} ${obj.value}`;
                return str;
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
  mounted() {
    this.myEcharts();
  },

  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch: {
    echartsDate(value) {
      console.log(value);
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
