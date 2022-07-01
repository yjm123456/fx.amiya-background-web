
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '300px' }"></div>
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
    startDate: "",
    endDate: "",
  },
  data() {
    return {
      myChart: "",

      orderOperationCondition: [],
      dates:[]
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
    getOrderOperationCondition(datas) {
      const data = {
        startDate: datas.startDate ? datas.startDate : null,
        endDate:datas.endDate ? datas.endDate : null
      };
      if(data.startDate || data.startDate){
        api.getOrderOperationCondition(data).then((res) => {
          if (res.code === 0) {
            const { orderOperationCondition } = res.data;
            let orders = []
            let date = []
            orderOperationCondition.sort(function(a,b){
              return a < b ? 1 : -1
          });
            orderOperationCondition.map((item) => {
              orders.push(item.orderNum)
              date.push(item.date)
            });
            this.orderOperationCondition = orders
            this.dates = date
            this.$nextTick(() => {
              this.myEcharts();
            });
          }
        });
      }else{
        this.$Message.error('请选择时间')
      }
      
    },
    // 订单经营情况
    myEcharts() {
      let option = {
        title: {
          text: "订单经营情况",
          x: "center",
        },
        xAxis: {
          type: 'category',
          data: this.dates
        },
        yAxis: {
          type: 'value'
        },
        dataZoom: [
            {
            type: "slider",
            realtime: true,
            start: 0,
            end: 100,
            xAxisIndex: [0],
            },
        ],
        tooltip: {
            trigger: 'axis'
        },
        series: [
          {
            data: this.orderOperationCondition,
            type: 'line'
          }
        ]
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
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
}
</style>

