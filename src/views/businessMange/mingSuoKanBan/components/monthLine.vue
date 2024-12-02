
<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '280px',marginTop:'10px' }" ></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "@/components/theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    mingSuoObj:Object
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 总业绩
    myEcharts(value) {
      const {totalCluesBrokenLineList,totalPerformanceBrokenLineList} = value
      let date =[]
      let totalCluesBrokenLineLists =[]
      let totalPerformanceBrokenLineLists =[]
     
      totalCluesBrokenLineList ? totalCluesBrokenLineList.map(item=>{
        date.push(item.date)
        totalCluesBrokenLineLists.push(item.performance)
      }) : []
      totalPerformanceBrokenLineList ? totalPerformanceBrokenLineList.map(item=>{
        totalPerformanceBrokenLineLists.push(item.performance)
      }):[]
      let option = {
        xAxis: {
          type: 'category',
          data: date  ,
          name: '日期',
        },
        yAxis: {
          // name: '总业绩/w',
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
                   params[i].seriesName == '总业绩' ? list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].data + 'w'  +
                        '</span>'
                    ) :
                    list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].data + '人' + 
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
          data: ['总线索','总业绩'],
          selected:{
            '总线索':true,
            '总业绩':true,
          },
          textStyle:{
            color:'#000'
          }
        },
        series: [
            
            {
                name: '总线索',
                type: 'line',
                data: totalCluesBrokenLineLists,
                itemStyle: { 
                    normal: { 
                        color: '#0AABBD'  // 折线的颜⾊
                    } 
                },
            },
            {
                name: '总业绩',
                type: 'line',
                data: totalPerformanceBrokenLineLists,
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
    mingSuoObj(value){
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
  height: 220px;
  // margin-left: 5%;
}
</style>

