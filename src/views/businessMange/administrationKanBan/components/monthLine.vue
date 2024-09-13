
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '350px',marginTop:'10px' }" ></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "@/components/theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    adminCustomerServiceCustomerTypeBrokenLineDataObj:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      const {firstType,sencondType,thirdType,totalType
      
      } = value
      let date =[]
      let firstTypes =[]
      let sencondTypes =[]
      let thirdTypes =[]
      let totalTypes =[]
     
      firstType ? firstType.map(item=>{
        date.push(item.date)
        firstTypes.push(item.performance)
      }) : []
      sencondType ? sencondType.map(item=>{
        sencondTypes.push(item.performance)
      }):[]
      thirdType ? thirdType.map(item=>{
        thirdTypes.push(item.performance)
      }):[]
       totalType ? totalType.map(item=>{
        totalTypes.push(item.performance)
      }):[]
      
      let option = {
        
        xAxis: {
          type: 'category',
          data: date  ,
          name: '日期',
        },
        yAxis: {
          name: '人数',
          type: 'value',
          axisLabel:{
            formatter:(value) => {
                return value ;
            }
        }

        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                let list = []
                let listItem = ''
                let axisValueLabel = params[0].axisValueLabel + '号'
                
                for (let i = 0; i < params.length; i++) {
                    list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].data  +'人' +
                        '</span>'
                    )
                }
                listItem = list.join('<br>')
                return axisValueLabel + '<br>' + listItem
            }
          },
        
        
        grid: {
           top: '17%',
          containLabel: true,
        },
        legend: {
          x:'center',
          y:'top',
          data: ['一类客资','二类客资','三类客资','总客资'],
          selected:{
            '一类客资':true,
            '二类客资':true,
            '三类客资':true,
            '总客资':true,
          },
          textStyle:{
            color:'#000'
          }
        },
        series: [
            {
                name: '一类客资',
                type: 'line',
                data: firstTypes,
                itemStyle: { 
                    normal: { 
                        
                        color: '#0AABBD'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '二类客资',
                type: 'line',
                data: sencondTypes,
                itemStyle: { 
                    normal: { 
                        color: '#7381FB'  // 折线的颜⾊
                    } 
                },
            },
            
            {
                name: '三类客资',
                type: 'line',
                data: thirdTypes,
                itemStyle: { 
                    normal: { 
                        color: '#BB5DF9'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '总客资',
                type: 'line',
                data: totalTypes,
                itemStyle: { 
                    normal: { 
                        color: '#F37F51'  // 折线的颜⾊
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
    adminCustomerServiceCustomerTypeBrokenLineDataObj(value){
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
  height: 300px;
  // margin-left: 5%;
}
</style>

