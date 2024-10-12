<template>
  <div class="wrapper">
    <div ref="dom" :style="{ width: '100%', height: '800px' }"></div>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    hospitalBarData: Array,
  },
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let name = [];
      let list1 = [];
      let list2 = [];
      let list3 = [];
      let list4 = [];
      let list5 = [];
      value.map((item) => {
        name.unshift(item.name);
        list1.unshift(item.sendOrderCount);
        list2.unshift(item.visitCount);
        list3.unshift(item.dealCount);
        list4.unshift(item.toHospitalRate);
        list5.unshift(item.dealRate);
      });
      let option = {
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                let list = []
                let listItem = ''
                let axisValueLabel = params[0].axisValueLabel
                let toHospitalRate = 0
                let dealRate = 0
                for (let i = 0; i < params.length; i++) {
                  let seriesName = params[i].seriesName
                  // 因柱形图不显示柱子 tooltip需要显示  取上门率和成交率的值
                  value.map((item,index)=>{
                    params.map(item2=>{
                      if(item.name == item2.axisValueLabel){
                        toHospitalRate =  item.toHospitalRate
                        dealRate =  item.dealRate
                      }
                    })
                  })
                  seriesName == '上门量' ?  list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp' +
                        params[i].data  +
                        '</span><span style="display:inline-block;margin-left:10px">&nbsp' +
                        '上门率 ' +  toHospitalRate + '%' +
                        '</span>'
                    )
                  : seriesName == '成交量' ?  list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp' +
                        params[i].data   +
                        '</span><span style="display:inline-block;margin-left:10px">&nbsp' +
                        '成交率 ' +  dealRate + '%'  +
                        '</span>'
                    )
                  : list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].data  +
                        '</span>'
                    )
                  
                }
                listItem = list.join('<br>')
                return axisValueLabel + '<br>' + listItem
            }
          },
        calculable: true,
        xAxis: [
          {
            type: "value",
            // prettier-ignore
            
          },
        ],
        yAxis: [
          {
            type: "category",
            data: name,
            axisLabel: {
              formatter: function(value) {
                return value.length > 5 ? value.slice(0, 5) + "..." : value;
              },
            },
          },
        ],
        series: [
          {
            name:  "派单量",
            type: "bar",
            data: list1,
          },
          {
            name:  "上门量",
            type: "bar",
            data: list2,
          },
          
          // {
          //   name:  "上门率",
          //   type: "bar",
          //   data: list4,
          //   label:{
          //     show:false
          //   }
          // },
          {
            name:  "成交量",
            type: "bar",
            data: list3,
            
          },
          // {
          //   name:  "成交率",
          //   type: "bar",
          //   data: list5,
          // },
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
    hospitalBarData(value) {
      // this.$nextTick(() => {
      this.myEcharts(value);
      // let list = [{name:'张三',newValue:120,oldValue:320},{name:'张三2',newValue:220,oldValue:320},{name:'张三2',newValue:11,oldValue:320}]
      // let list2 = list.map((item,index)=>{
      //   return item.newValue + item.oldValue
      // })
      // let list3 = list2.sort((a,b)=>b-a)
      // console.log(list3)
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 800px;
  // margin-left: 5%;
}
</style>
