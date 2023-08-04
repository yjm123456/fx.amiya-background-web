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
    myEcharts(value) {
      const {actualSinglePriceAnalizeData} = value.categoryAnalizeData
      let name = []
      let values = []
      if(actualSinglePriceAnalizeData){
        actualSinglePriceAnalizeData.map(item=>{
          name.push(item.id)
          values.push(item.name)
        })
      }
      
      // let legend = this.order.map((_) => _.name);
      let option = {
        title: {
          text: "实际件单价分析",
          x: "center",
        },
       xAxis: {
          type: 'category',
          data: name,
          name: '品类',
        },
        yAxis: {
          type: 'value',
          name: '元',
        },
        tooltip: {
            trigger: 'axis',
             formatter: params => {
                return `<div style="border:0;color:#666;text-align: left;width:100%">
                          <p style="color:#000"> ${params[0].axisValue}</p>
                          <div class="flex justify-content-space-between">
                            <div>
                                <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[0].name}：${params[0].value+'元'}
                                    
                                  </span>
                              </div>
                             
                          </div>
                        </div>`
            },
          },
        series: [
          {
            data: values,
            type: 'bar',
            barWidth:'15px'
          }
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
            // const {createOrderGMVAnalizeData} = value.categoryAnalizeData
            // if(createOrderGMVAnalizeData){
            //   // this.order =  createOrderGMVAnalizeData.map((item) => {
            //   //     return {
            //   //       name: item.id,
            //   //       value: item.name,
            //   //     };
            //   //   });
              
                this.$nextTick(() => {
                  this.myEcharts(value);
                });
            // }
            
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
