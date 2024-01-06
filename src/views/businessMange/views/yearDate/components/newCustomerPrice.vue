<template>
    <Modal
        v-model="newCustomerPriceModels"
        title="新客客单价"
        :mask-closable="false"
        @on-visible-change="handleModalVisibleChange"
        width="1000"
    >
        <div class="wrapper">
            <div style="color:#516b91;font-size:16px">{{date}}年  {{hospital}}</div>
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
        newCustomerPriceModel:Boolean,
        newCustomerPriceList:Array,
        hospital:String,
        date:String,
    },
    components:{
        
    },
    data(){
        return{
            newCustomerPriceModels:false,
            myChart: "",
        }
    },
    methods:{
        cancel(){
            this.$emit("update:newCustomerPriceModel", false);
        },
        // modal 显示状态发生变化时触发
        handleModalVisibleChange(value) {
            if (!value) {
                this.$emit("update:newCustomerPriceModel", false);
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
          text: "新客客单价折线图",
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
          name: '新客客单价',

        },
        tooltip: {
            trigger: 'axis',
          },
        
        
        grid: {
          top: '12%',
          containLabel: true,
        },
        legend: {
          x:'center',
          y:'bottom',
          data: ['新客客单价'],
          
        },
        series: [
           {
                name: '新客客单价',
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
        newCustomerPriceModel: {
            handler(value) {
                this.newCustomerPriceModels = value
            },
            deep: true,
        },
        newCustomerPriceList(value){
            this.myEcharts(value);
        }
    },
}
</script>
