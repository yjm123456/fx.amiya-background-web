
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '250px' }"></div>
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
   activeName:String,
   times:Object
  },
  data() {
    return {
      flag:false,
      myChart: "",
      liveAnchorName: [],
      performance:[],
      orderNum:[]
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
    getOrderOperationCondition() {
        const {startDate,endDate} = this.times
      const data = {
        startDate: startDate ? this.$moment(startDate).format('YYYY-MM-DD') : null,
        endDate:endDate ? this.$moment(endDate).format('YYYY-MM-DD') : null
      };
      let orderNum = []
      let performance = []
      let liveAnchorName = []
      if(startDate || startDate){
        this.flag = true
        api.CustomerServicePerformanceInfo(data).then((res) => {
          if (res.code === 0) {
            const { orderData } = res.data;
            orderData.map((item) => {
                orderNum.push(item.orderNum)
                performance.push(item.performance != 0 ? ((item.performance)/1000).toFixed(2) : 0)
                liveAnchorName.push(item.liveAnchorName)
            });
            this.orderNum = orderNum
            this.performance = performance
            this.liveAnchorName = liveAnchorName
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
          
        xAxis: {
          type: 'category',
          data: this.liveAnchorName
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          x:'left',
          data: ['派单量', '业绩'],
          left:'12%'
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
            trigger: 'axis',
            formatter(params) {
                let val0 = params[0]["value"];
                let val1 = params[1]["value"];
                let circle = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:`;
                let data0 = `${circle}#384766"></span> ${
                    params[0]["seriesName"]
                }: ${val0} `;
                let data1 = `${circle}#88682f"></span> ${
                    params[1]["seriesName"]
                }: ${val1} k`;
                return `${params[0].axisValueLabel}<br/>${data0}<br/>${data1}`;
            },
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
          top: '12%',
          containLabel: true
        },
        series: [
          {
            name: '派单量',
            data: this.orderNum,
            type: 'bar',
            barWidth : 30,//柱图宽度
            // stack:'Total',
            itemStyle: { 
                normal: { 
                    color: '#384766'  // 折线的颜⾊
                } 
            },
            },
            {
                name: '业绩',
                data: this.performance,
                type: 'bar',
                barWidth : 30,//柱图宽度
                // stack:'Total',
                itemStyle: { 
                normal: { 
                    color: '#88682f'  // 折线的颜⾊
                } 
            },
           }
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
      activeName(value){
          if(value == '行政客服业绩'){
              this.getOrderOperationCondition()
          }
      },
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 200px;
}
.echart_text{
    display: flex;
    justify-content: flex-end;
    margin-right: 10%;
}
.text{
    margin-left: 15px;
}
</style>

