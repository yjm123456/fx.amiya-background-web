
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '300px' }" id="myecharts"></div>
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

      yappointmentOperation: [],
      appointmentOperation:[]
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
    getAppointmentOperationCondition(datas) {
      // let oBr =document.getElementById('myecharts')
      // oBr.style.width = (document.body.clientWidth ) / 2.5 + 'px'
      // oBr.style.height = 300 +'px'
      const data = {
        startDate: datas.startDate ? datas.startDate : null,
        endDate:datas.endDate ? datas.endDate : null
      };
      if(data.startDate || data.endDate){
        api.getAppointmentOperationCondition(data).then((res) => {
          if (res.code === 0) {
            const { appointmentOperationCondition } = res.data;
            let appoint = []
            let dates = []
            appointmentOperationCondition.sort(function(a,b){
              return a < b ? 1 : -1
          });
            appointmentOperationCondition.map((item) => {
              appoint.push(item.appointmentNum)
              dates.push(item.date)
            });
            this.yappointmentOperation = appoint
            this.appointmentOperation = dates    
            this.$nextTick(() => {
              this.myEcharts();
            });
          }
        });
      }else{
        this.$Message.error('请选择时间')
      }
      
    },
    // 订单预约经营情况
    myEcharts() {
      let option = {
        title: {
          text: "预约经营情况",
          x: "center",
        },
        xAxis: {
          type: 'category',
          data: this.appointmentOperation
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
            data: this.yappointmentOperation,
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

