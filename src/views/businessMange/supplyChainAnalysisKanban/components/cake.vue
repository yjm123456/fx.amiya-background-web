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
    name:String,
    types:String
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
          text: this.name,
          x: "30%",
          // x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter:this.name == "下单GMV占比分析"  || this.name == "实际GMV占比分析" || this.name == "退款GMV占比分析" || this.name == "品牌看板下单GMV占比分析" || this.name == "品项看板下单GMV占比分析" ? "{b} : {c}元 ({d}%)" : "{b} : {c}件 ({d}%)",
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
            const {createOrderGMVAnalizeData,createOrderNumAnalizeData,actualGMVAnalizeData,actualNumAnalizeData,refundGMVAnalizeData,refundNumAnalizeData} = value.categoryAnalizeData
            // 品类看板 下单GMV占比分析
            if(this.name == '下单GMV占比分析'){
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
            }
            // 品类看板 下单件数占比分析
            if(this.name == '下单件数占比分析'){
              if(createOrderNumAnalizeData){
                this.order =  createOrderNumAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
            }
            // 品类看板 实际GMV占比分析
            if(this.name == '实际GMV占比分析'){
              if(actualGMVAnalizeData){
                this.order =  actualGMVAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
            }
            // 品类看板 实际件数占比分析
            if(this.name == '实际件数占比分析'){
              if(actualNumAnalizeData){
                this.order =  actualNumAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
            }
            // 品类看板 退款GMV占比分析
            if(this.name == '退款GMV占比分析'){
              if(refundGMVAnalizeData){
                this.order =  refundGMVAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
            }
            // 品类看板 退款件数占比分析
            if(this.name == '退款件数占比分析'){
              if(refundNumAnalizeData){ 
                this.order =  refundNumAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
            }




            // 品牌看板 下单GMV占比分析
            if(this.name == '下单GMV占比分析' && this.types == '品牌看板'){
              if(value.brandAnalizeData.createOrderGMVAnalizeData){
                this.order =  value.brandAnalizeData.createOrderGMVAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
            }
            // 品牌看板 下单件数占比分析
            if(this.name == '下单件数占比分析'&& this.types == '品牌看板'){
              if(value.brandAnalizeData.createOrderNumAnalizeData){
                this.order =  value.brandAnalizeData.createOrderNumAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
            }
            // 品项看板 下单GMV占比分析
            if(this.name == '下单GMV占比分析' && this.types == '品项看板'){
              if(value.itemDetailsAnalizeData.createOrderGMVAnalizeData){
                this.order =  value.itemDetailsAnalizeData.createOrderGMVAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
            }
            // 品项看板 下单件数占比分析
            if(this.name == '下单件数占比分析' && this.types == '品项看板'){
              if(value.itemDetailsAnalizeData.createOrderNumAnalizeData){
                this.order =  value.itemDetailsAnalizeData.createOrderNumAnalizeData.map((item) => {
                    return {
                      name: item.id,
                      value: item.name,
                    };
                  });
                  this.$nextTick(() => {
                    this.myEcharts();
                  });
              }
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
