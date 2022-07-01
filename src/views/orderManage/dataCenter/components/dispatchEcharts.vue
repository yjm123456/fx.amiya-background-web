
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '250px' }" ></div>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    orderDataInfo:Object
  },
  data() {
    return {
      myChart: "",
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
    // 派单情况
    myEcharts(value) {
      const {sendOrderDataListCount,unSendOrderDataListCount} = value
      sendOrderDataListCount.sort(function(a,b){
          return a < b ? 1 : -1
      });
      unSendOrderDataListCount.sort(function(a,b){
          return a < b ? 1 : -1
      });
      let datas =[]
      let sendOrderDataListCounts = [] 
      let unSendOrderDataListCounts = []
      sendOrderDataListCount.map(item=>{
        datas.push(item.date)
        sendOrderDataListCounts.push(item.orderNum)
      })
      
      unSendOrderDataListCount.map(items=>{
        unSendOrderDataListCounts.push(items.orderNum)
      })
      let option = {
        title: {
          text: "派单",
          x: "60px",
          y:"-2px"

        },
        xAxis: {
          type: 'category',
          data: datas
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['已派单', '未派单'],
          left:'13%',
          x:'left',
        },
        // dataZoom: [
        //     {
        //     type: "slider",
        //     realtime: true,
        //     start: 0,
        //     end: 100,
        //     xAxisIndex: [0],
        //     },
        // ],
        tooltip: {
            trigger: 'axis'
        },
        grid: {
          top: '12%',
          containLabel: true
        },
        series: [
           {
                name: '已派单',
                type: 'line',
                data: sendOrderDataListCounts,
                itemStyle: { 
                    normal: { 
                        color: '#384766'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '未派单',
                type: 'line',
                data: unSendOrderDataListCounts,
                itemStyle: { 
                    normal: { 
                        color: '#88682f'  // 折线的颜⾊
                    } 
                },
            },
        ]
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
  watch:{
    orderDataInfo(value){
      // this.$nextTick(() => {
        this.myEcharts(value);
      // });
    },
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 180px;
  // margin-left: 5%;
}
</style>

