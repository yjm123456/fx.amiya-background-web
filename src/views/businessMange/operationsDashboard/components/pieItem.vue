<template>
  <div class="wrapper">
    <div class="allNum" v-if="selected == '业绩' " :style="{top:title == '部门业绩分析' ? '95px' : '48px'}">总业绩
      <span style="font-size:14px;">
      ({{pieItemData2.totalPerformanceNumber ? pieItemData2.totalPerformanceNumber : '0'}}w){{pieItemData2.totalPerformanceNumber == 0  ? ' 0%' : ' 100%'}} 
      </span>
    </div>
    <!-- 因字段不一样 -->
    <div class="allNum" v-if="selected == '平台总业绩' " :style="{top:'95px' }">总业绩
      <span style="font-size:14px;">
      ({{pieItemData2.totalFlowRateNumber ? pieItemData2.totalFlowRateNumber : '0'}}w){{pieItemData2.totalFlowRateNumber == 0  ? ' 0%' : ' 100%'}} 
      </span>
    </div>
    <div class="allNum2" v-if="selected == '线索'" :style="{top:title == '有效潜在' ? '48px' : '95px'}">总线索
      <span style="font-size:14px;">({{pieItemData3 ? pieItemData3 : '0'}}人){{pieItemData3 == 0 ? ' 0%' : ' 100%'}} </span>
    </div>
    <div ref="dom" :style="{ width: '100%', height: '180px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    pieItemData: Array,
    selected:String,
    pieItemData2:Object,
    pieItemData3:Number,
    title:String
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value,value2) {
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
                        '<span style="display:inline-block;">' +
                        value[i].name +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        value[i].rate  +'%' +
                        '</span>'
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
          formatter: this.selected == '业绩' ||  this.selected == '平台总业绩' ?  function (name) {
            var total = 0;
            // console.log(this.pieItemData2)
            var data = option.series[0].data;
            for (var i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
            }
            for (var i = 0, l = data.length; i < l; i++) {
                if (data[i].name == name) {
                    // var percentage = data[i].value == 0 ? '0%' : ((data[i].value / total) * 100).toFixed(2) + '%';
                    var percentage = data[i].value == 0 ? '0w' : data[i].value + 'w'
                    var rate = data[i].rate == 0 ? '0' : data[i].rate 
                    return  name + '(' + ' ' + percentage + ')'+ ' '  + rate +'%';
                }
            }
            return name ;
        }:function (name) {
            var total = 0;
            var data = option.series[0].data;
            for (var i = 0, l = data.length; i < l; i++) {
                total += data[i].value;
            }
            for (var i = 0, l = data.length; i < l; i++) {
                if (data[i].name == name) {
                    // var percentage = data[i].value == 0 ? '0%' : ((data[i].value / total) * 100).toFixed(2) + '%';
                    var percentage = data[i].value == 0 ? '0' : data[i].value  + '人'
                    var rate = data[i].rate == 0 ? '0' : data[i].rate 
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
    pieItemData(value) {
      // this.$nextTick(() => {
      this.myEcharts(value);
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
