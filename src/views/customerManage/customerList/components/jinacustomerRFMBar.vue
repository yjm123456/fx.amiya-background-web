<template>
  <div class="wrapper">
    <div class="content">
      <Card class="left"> 
        <span class="num_text">总人数：{{numAll}}</span>
        <div class="text_con" >
          <span class="num" v-for="(item,index) in dataAll" :key="index">
            <span class="num_text ">{{item.rfmTypeText}}：{{item.customerCount}}</span>
          </span>
        </div>
          <div ref="dom" :style="{ width: '100%', height: '600px' }"></div>
      </Card>
      
      <Card class="right">
       <div class="text">
         详情 <span v-if="rfmTypeText">（{{rfmTypeText}}）</span>
        </div> 
        <div>
          <Table border :columns="query.columns" :data="query.data"></Table>
        </div>
        <div class="page_wrap">
          <Page
            ref="pages"
            :current="query.pageNum"
            :page-size="query.pageSize"
            :total="query.totalCount"
            show-total
            show-elevator
            @on-change="handlePageChange"
          />
        </div>
      </Card>
    </div>
    
  </div>
</template>

<script>
import * as api from "@/api/rFMCustomerInfo";
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
import * as orderApi from "@/api/orderManage";

echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    hospitalListData: Array,
    active:String,
    liveAnchorBaseInfos:Array
  },
  data() {
    return {
      dataAll:[],
      numAll:0,
      myChart: "",
      detail:'',
      rfmType:null,
      rfmTypeText:'',
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "绑定客服",
            key: "customerServiceName",
            minWidth:140,
            tooltip:true,
            align:'center'
          },
          {
            title: "手机号",
            key: "phone",
            minWidth:180,
            tooltip:true,
            align:'center',
            render: (h, params) => {
              
              
                return h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                    },
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          marginRight: "10px",
                        },
                      },
                      params.row.phone
                    ),
                    h("span", {
                      style: {
                        color: "#2d8cf0",
                        fontSize: "20px",
                      },
                      class: !params.row.bool
                        ? "iconfont icon-biyan"
                        : "iconfont icon-see",
                      on: {
                        click: () => {
                          if (params.row.bool) return;
                          const { encryptPhone } = params.row;
                          const data = {
                            encryptPhone
                          }
                          orderApi.decryptoPhonesNew(data).then((res) => {
                            if (res.code === 0) {
                              params.row.phone = res.data.phone;
                              params.row.bool = true;
                            }
                          });
                        },
                      },
                    }),
                  ]
                );
            }
          },
          {
            title: "最新消费时间",
            key: "newConsumptionDate",
            minWidth:180,
            tooltip:true,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.newConsumptionDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "累计消费",
            key: "allPrice",
            minWidth:140,
            tooltip:true,
            align:'center'
          },
          {
            title: "总单数",
            key: "allOrderCount",
            minWidth:140,
            tooltip:true,
            align:'center'
          },
          {
            title: "距今消费间隔天数",
            key: "consumptionDate",
            minWidth:160,
            tooltip:true,
            align:'center'
          },
          {
            title: "RFM类型",
            key: "rfmTypeText",
            minWidth:140,
            tooltip:true,
            align:'center'
          },
          
        ],
        data: [],
        totalCount: 0,
      },
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
    myEcharts(value) {
      let data = [];
      let name = [];
      let day = [];
      let customerIncreaseFromYesterdays = []

      let num = 0
      value.map((item) => {
        data.push(item.totalConsumptionPrice);
        name.push(item.rfmTypeText);
        day.push(item.customerCount);
        customerIncreaseFromYesterdays.push(item.customerIncreaseFromYesterday);
        num+=item.customerCount

      });
      this.numAll = num
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: params => {
                return `<div style="border:0;color:#666;text-align: left;width:180px">
                          <p style="color:#000"> ${params[0].axisValue}</p>
                          <div class="flex justify-content-space-between">
                            <div>
                                <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> 客户数量: ${params[0].value}人</span>
                              </div>
                          </div>
                          <div class="flex justify-content-space-between">
                            <div>
                                <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> 较昨天: ${value.find(item=>item.rfmTypeText == params[0].name).customerIncreaseFromYesterday >= 0  ? '+' +  value.find(item=>item.rfmTypeText == params[0].name).customerIncreaseFromYesterday : value.find(item=>item.rfmTypeText == params[0].name).customerIncreaseFromYesterday}人</span>
                              </div>
                          </div>
                          <div class="flex justify-content-space-between">
                            <div>
                                <i class="dot" style="background: ${params[0].color};display: inline-block;width: 8px; height: 8px;border-radius: 50%;"></i>
                                  <span> 消费金额:
                                    ${(function () {
                                        if (value.find(item=>item.rfmTypeText == params[0].name).totalConsumptionPrice >= 1000 && value.find(item=>item.rfmTypeText == params[0].name).totalConsumptionPrice < 10000) {
                                            return ((value.find(item=>item.rfmTypeText == params[0].name).totalConsumptionPrice) / 1000).toFixed(2) + 'K'
                                        } else if (value.find(item=>item.rfmTypeText == params[0].name).totalConsumptionPrice >= 10000) {
                                            return (value.find(item=>item.rfmTypeText == params[0].name).totalConsumptionPrice / 10000).toFixed(2) + 'W'
                                        } else if (value.find(item=>item.rfmTypeText == params[0].name).totalConsumptionPrice < 1000) {
                                            return (value.find(item=>item.rfmTypeText == params[0].name).totalConsumptionPrice).toFixed(2)
                                        }
                                    })()}
                                  </span>
                              </div>
                          </div>
                          
                        </div>`
          },
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            name:'人',
            // axisLabel:{
            // formatter:(value) => {
            //     if(value >= 10000){
            //         value = (value / 10000) + 'W';
            //     }
            //     if(value >= 1000){
            //         value = (value / 1000) + 'K';
            //     }
            //     return value;
            // }
        // }
        },
        
        yAxis: {
            type: 'category',
            data: name,
        },
        series: [
            // {
            //   type: 'bar',
            //   data: data,
            // },
            {
              type: 'bar',
              data: day,
              
            },
            // {
            //   type: 'bar',
            //   data: customerIncreaseFromYesterdays,
            // },
        ],
        
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.clear();
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
      this.myChart.getZr().on("click", (params) => {
          const pointInPixel = [params.offsetX, params.offsetY];
          if (this.myChart.containPixel("grid", pointInPixel)) {
              let yIndex = this.myChart.convertFromPixel({ seriesIndex: 0 }, [
                  params.offsetX,
                  params.offsetY,
              ])[1];//柱形的下标 ，此处取[1]
              this.rfmTypeText = value[yIndex].rfmTypeText
              this.myDialog(yIndex)
          }
      });
      // this.myChart.on('click', (params) => {
      //   // 用于详情那边展示
      //   this.rfmTypeText = params.name
      //   if(params.name == '超级VIP'){
      //     this.myDialog(0)
      //   }else if(params.name == '重要价值客户'){
      //     this.myDialog(1)
      //   }else if(params.name == '重要保持客户'){
      //     this.myDialog(2)
      //   }else if(params.name == '重要发展客户'){
      //     this.myDialog(3)
      //   }else if(params.name == '重要挽留客户'){
      //     this.myDialog(4)
      //   }else if(params.name == '一般价值客户'){
      //     this.myDialog(5)
      //   }else if(params.name == '一般保持客户'){
      //     this.myDialog(6)
      //   }else if(params.name == '一般发展客户'){
      //     this.myDialog(7)
      //   }else if(params.name == '一般挽留客户'){
      //     this.myDialog(8)
      //   }
      // })
    },
    //详情方法
    myDialog(value){
      this.detail = value 
      if(this.active == 'jinacustomerRFMBar'){
        this.getDetail(value)
      }
    },
    //  调用详情接口
    getDetail(value){
      this.rfmType = value
      const {pageNum,pageSize} = this.query
      const data = {
        rfmType:value,
        liveAnchorBaseId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        employeeId:null,
        startDate:'',
        endDate:'',
        keyWord:'',
        pageNum,
        pageSize
      }
      api.getAllCustomerByRFMType(data).then(res=>{
        if(res.code === 0 ){
          const { list, totalCount } = res.data.allCustomerByRFMType;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      })
    },
    // 调用详情接口分页
    handlePageChange(pageNum) {
        const {pageSize} = this.query
      const data = {
        rfmType:this.rfmType,
        liveAnchorBaseId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        employeeId:null,
        startDate:'',
        endDate:'',
        keyWord:'',
        pageNum,
        pageSize
      }
      api.getAllCustomerByRFMType(data).then((res) => {
          if (res.code === 0) {
          const { list, totalCount } = res.data.allCustomerByRFMType;
          this.query.data = list;
          this.query.totalCount = totalCount;
          }
      });
    },
    // 公司
    getCompany(){
      const data = {
        LiveAnchorBaseId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        EmployeeId:null
      }
      api.getAllCustomerByRFM(data).then(res=>{
        if(res.code === 0){
          this.dataAll = res.data.allCustomerByRFM
            this.myEcharts(res.data.allCustomerByRFM);
        }
      })
    },
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch: {
    active: {
      handler(value) {
        if (value === "jinacustomerRFMBar") {
            this.isTab = true
             this.getCompany()
        }
       
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  
}
.content{
    width:100%;
    display: flex;
    justify-content: space-between;
}
.left{
    width: 49%;
}
.right{
    width: 50%;
}
.text{
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color:#000
}
.page_wrap{
  text-align: right;
  margin-top: 10px;
}
.num_text{
  font-size: 14px;
  font-weight: bold;
  color: #000;
}
.num{
  margin-right: 20px;
}
</style>
