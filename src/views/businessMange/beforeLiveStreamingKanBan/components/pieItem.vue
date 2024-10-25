<template>
  <div class="wrapper">
    <div class="allNum" :style="{top: pieLength == 0 ? 0 : pieLength == 1 ?  '22px' : pieLength == 2 ?   '45px' : pieLength == 3 ? '68px' :pieLength == 4 ? '92px' : pieLength == 5 ? '108px' : pieLength == 6 ? '128px' : pieLength == 7 ? '148px' : pieLength == 8 ? '168px' : '0px' }" v-if="pieLength">{{title}}<span style="font-size:14px;"> {{total}}{{title == '总线索' ? '人' : 'w'}}</span></div>
    <div ref="dom" :style="{ width: '100%', height: '180px' }"></div>
    
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "@/components/theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    pieData: Array,
    title:String,
    total:Number
  },
  data() {
    return {
      myChart: "",
      // 根据数组条数定位总线索或者是总业绩
      pieLength:0,
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let option = {
        tooltip: {
          trigger: "item",
          // echarts计算的百分比
          // formatter: '{b} : {d}%'
          // 根据接口返回的百分比
          formatter: (params) => {
                let list = []
                let listItem = ''
                // let axisValueLabel = params[0].axisValueLabel + '号'
                for (let i = 0; i < value.length; i++) {
                  if(params.value == value[i].value){
                    list.push(
                        "<div style='text-align:left;line-height: 1px;'>" + 
                        '<span style="display:inline-block">' +
                        value[i].name +
                        '</span><span style="display:inline-block">&nbsp&nbsp' +
                        value[i].value  +'%' +
                        '</span>' + 
                        "</div>"
                    )
                  }
                }
                listItem = list.join('<br>')
                return  listItem
            }
        },
        legend: {
          orient: "vertical",
          left: "left",
          formatter: 
          this.title == '总线索'  ?  function (name) {
                var total = 0;
                var data = option.series[0].data;
                for (var i = 0, l = data.length; i < l; i++) {
                    total += data[i].value;
                }
                for (var i = 0, l = data.length; i < l; i++) {
                    if (data[i].name == name) {
                        var percentage = data[i].performance == 0 ? '0人' : data[i].performance  + '人'
                        var rate = data[i].value == 0 ? '0' : data[i].value 
                        // +  rate +'%';
                        return percentage == 0 ?  name + '(' + ' ' + percentage + ')'+ ' ' +  '0%' :  name + '(' + ' ' + percentage + ')'+ ' ' +  rate +'%';
                    }
                }
                return name ;
            }:
            function (name) {
              var total = 0;
              var data = option.series[0].data;
              for (var i = 0, l = data.length; i < l; i++) {
                  total += data[i].value;
              }
              for (var i = 0, l = data.length; i < l; i++) {
                  if (data[i].name == name) {
                      var percentage = data[i].performance == 0 ? '0w' : data[i].performance  + 'w'
                      var rate = data[i].value == 0 ? '0' : data[i].value 
                      return percentage == 0 ?  name + '(' + ' ' + percentage + ')'+ ' ' +  '0%' :  name + '(' + ' ' + percentage + ')'+ ' ' +  rate +'%';
                  }
              }
              return name ;
        }
        },
        series: [
          {
            type: "pie",
            // radius: ["40%", "70%"],
            radius: '50%',
            data: value,
            labelLine: {
              show: false
            },
            label: {
              show: false,
            },
          },
        ],
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
    pieData(value) {
      // this.$nextTick(() => {
      this.myEcharts(value);
      this.pieLength = value.length
      // });
    },
    
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 180px;
  // margin-left: 5%;
  position: relative;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}
.allNum{
  position: absolute;
  top: 48px;
  left: 33px;
  font-size: 11.5px;
  color: #999;
}
.allNum2{
  position: absolute;
  top: 95px;
  left: 33px;
  font-size: 11.5px;
  color: #999;
  
}
</style>
