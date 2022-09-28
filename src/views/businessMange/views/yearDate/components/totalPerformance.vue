<template>
    <Modal
        v-model="totalPerformanceModels"
        title="总业绩"
        :mask-closable="false"
        @on-visible-change="handleModalVisibleChange"
        width="1000"
    >
        <div class="wrapper">
            <div ref="dom" :style="{ width: '100%', height: '350px' }" ></div>
        </div>
        <div slot="footer">
            <Button @click="cancel()">取消</Button>
        </div>
    </Modal>
</template>
<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
    props:{
        totalPerformanceModel:Boolean,
        totalPerformanceList:Array
    },
    components:{
        
    },
    data(){
        return{
            totalPerformanceModels:false,
            myChart: "",
        }
    },
    methods:{
        cancel(){
            this.$emit("update:totalPerformanceModel", false);
        },
        // modal 显示状态发生变化时触发
        handleModalVisibleChange(value) {
            if (!value) {
                this.$emit("update:totalPerformanceModel", false);
            }
        },
        // 业绩
    myEcharts(value) {
        const date = []
        const perfomancePrices = []
        value.map(item=>{
            date.push(item.date)
            perfomancePrices.push(item.perfomancePrice)
        })
     
      let option = {
        title: {
          text: "总业绩折线图",
          x: "center",
          style:{
            marginLeft:-20
          }

        },
        xAxis: {
          type: 'category',
          data: date ,
          name: '月份',
        },
        yAxis: {
          type: 'value',
          name: '总业绩',
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
        tooltip: {
            trigger: 'axis',
            // formatter: params => {
            //     return `<div style="border:0;color:#666;text-align: left;width:180px">
            //               <p style="color:#000"> ${params[0].axisValue}</p>
            //               <div class="flex justify-content-space-between">
            //                 <div>
            //                     <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
            //                       <span> ${params[0].seriesName }: ${params[0].data ? (params[0].data).toFixed(2)  :'0' }
                                    
            //                       </span>
            //                   </div>
            //               </div>
            //             </div>`
            // },
            formatter: params => {
                return `<div style="border:0;color:#666;text-align: left;width:180px">
                          <p style="color:#000"> ${params[0].axisValue}</p>
                          <div class="flex justify-content-space-between">
                            <div>
                                <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> ${params[0].seriesName}:
                                    ${(function () {
                                        if (params[0].data >= 1000 && params[0].data < 10000) {
                                            return (params[0].data / 1000).toFixed(2) + 'K'
                                        } else if (params[0].data >= 10000) {
                                            return (params[0].data / 10000).toFixed(2) + 'W'
                                        } else if (params[0].data < 1000) {
                                            return (params[0].data).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                          </div>
                        </div>`
            },
          },
        
        
        grid: {
          top: '12%',
          containLabel: true,
        },
        legend: {
          x:'center',
          y:'bottom',
          data: ['总业绩'],
          
          
        },
        series: [
           {
                name: '总业绩',
                type: 'line',
                data: perfomancePrices,
                itemStyle: { 
                    normal: { 
                        color: '#2d8cf0',  // 折线的颜⾊
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
    watch: {
        totalPerformanceModel: {
            handler(value) {
                this.totalPerformanceModels = value
            },
            deep: true,
        },
        totalPerformanceList(value){
            this.myEcharts(value);
        }
    },
}
</script>
