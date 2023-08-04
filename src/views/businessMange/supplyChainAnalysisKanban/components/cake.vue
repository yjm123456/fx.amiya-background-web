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
    performanceKanbanParams: Object,
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
    // 订单状态分布
    myEcharts() {
      let legend = this.order.map((_) => _.name);
      let option = {
        title: {
          text: "下单GMV占比分析",
          x: "30%",
          // x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}元 ({d}%)",
        },
        // legend: {
        //   data: legend,
        //   x:'center',
        //   y:'bottom',
        // },
        legend: {
          orient: "vertical",
          left: "left",
          data: legend,
        },
        grid: {
          containLabel: true
        },
       
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.order,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch:{
    performanceKanbanParams: {
        handler(value) {
            const {createOrderGMVAnalizeData} = value.categoryAnalizeData
            // let createOrderGMVAnalizeData = [{
            //   id:'生活类1',
            //   name:'100'
            // },{
            //   id:'生活类2',
            //   name:'200'
            // },{
            //   id:'生活类3',
            //   name:'300'
            // },{
            //   id:'生活类4',
            //   name:'400'
            // },{
            //   id:'生活类5',
            //   name:'500'
            // },{
            //   id:'生活类6',
            //   name:'600'
            // },{
            //   id:'生活类7',
            //   name:'34'
            // },{
            //   id:'生活类8',
            //   name:'546'
            // },{
            //   id:'生活类9',
            //   name:'23'
            // },{
            //   id:'生活类10',
            //   name:'343'
            // }]
            if(createOrderGMVAnalizeData){
              this.order =  createOrderGMVAnalizeData.map((item) => {
                  return {
                    name: item.id,
                    value: item.name,
                  };
                });
                this.$nextTick(() => {
                  this.myEcharts();
                });
            }
            
        },
        deep: true,
    },
  }
};

</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
}
</style>
