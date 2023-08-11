<template>
  <div class="wrapper">
    <div >
      <div class="query">
        <Select
          v-model="query.employeeId"
          style="width: 200px; margin-right: 10px"
          placeholder="请选择客服"
          :disabled="isDirector == 'false'"
        >
          <Option
            v-for="item in employee"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <Button
            type="primary"
            style="margin-left: 10px"
            @click="getCompany()"
            >查询</Button
          >
      </div>
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
    <!--客户信息  -->
    <customerMessage :customerMessageModel.sync="customerMessageModel" :customerMessageObj="customerMessageObj" :customerInfoComParams2="customerInfoComParams2" ></customerMessage>
     <!-- 追踪回访 -->
    <trackReturnVisit
      @resetControlTrackReturnVisitDisplay="resetControlTrackReturnVisitDisplay"
      :params="trackReturnVisitComParams"
    />
  </div>
</template>

<script>
import * as api from "@/api/rFMCustomerInfo";
import { on, off } from "@/utils/util";
import tdTheme from "./theme.json";
import * as echarts from "echarts";
import * as orderApi from "@/api/orderManage";
import trackReturnVisit from "@/components/trackReturnVisit/trackReturnVisit";
import customerMessage from "@/components/customerMessage/customerMessage"
import * as customerManageApi from "@/api/customerManage";

echarts.registerTheme("tdTheme", tdTheme);
export default {
  components:{
    trackReturnVisit,
    customerMessage
  },
  props: {
    hospitalListData: Array,
    active:String,
    employee:Array
  },
  data() {
    return {
      customerMessageModel:false,
      // 客户信息组件参数
      customerInfoComParams2: {
        userId: "",
        encryptPhone: "",
        tabGlag:false
      },
      customerMessageObj:{},
      // 追踪回访组件参数
      trackReturnVisitComParams: {
        device: "",
        encryptPhone: "",
        controlTrackReturnVisitDisplay: false,
      },

      dataAll:[],
      numAll:0,
      myChart: "",
      detail:'',
      rfmType:null,
      rfmTypeText:'',
      // 是否查看数据中心
      readDataCenter:sessionStorage.getItem('readDataCenter'),
      // 是否是客服
      positionName:sessionStorage.getItem('positionName'),
      employeeId:sessionStorage.getItem('employeeId'),
      isDirector :sessionStorage.getItem('isDirector'),
      query: {
        // isDirector是否是管理员
        // employeeId:sessionStorage.getItem('isDirector') == 'false' ? Number(sessionStorage.getItem('employeeId')) : -1,
        employeeId:sessionStorage.getItem('isDirector') == 'false' ? Number(sessionStorage.getItem('employeeId')) : -1,
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
            minWidth:180,
            tooltip:true,
            align:'center'
          },
          {
            title: "操作",
            width: 140,
            fixed: "right",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { encryptPhone,userId } = params.row;
                        // 
                        let data = {
                          encryptPhone:encryptPhone
                        }
                        
                        customerManageApi.getBaseAndBindCustomerInfoByEncryptPhone(data).then((res) => {
                          if(res.code === 0){
                            this.customerInfoComParams2.userId = userId;
                            this.customerInfoComParams2.encryptPhone = encryptPhone;
                            this.customerInfoComParams2.tabGlag = true;
                            this.customerMessageModel = true
                            this.customerMessageObj = res.data.customer
                          }
                        })
                      },
                    },
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { encryptPhone } = params.row;
                        this.trackReturnVisitComParams.encryptPhone = encryptPhone;
                        this.trackReturnVisitComParams.controlTrackReturnVisitDisplay = true;
                      },
                    },
                  },
                  "回访"
                ),
                
              ]);
            },
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
    resetControlTrackReturnVisitDisplay() {
      this.trackReturnVisitComParams.controlTrackReturnVisitDisplay = false;
    },
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
        //     axisLabel:{
        //     formatter:(value) => {
        //         if(value >= 10000){
        //             value = (value / 10000) + 'W';
        //         }
        //         if(value >= 1000){
        //             value = (value / 1000) + 'K';
        //         }
        //         return value;
        //     }
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
            //  {
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
      if(this.active == 'zhulicustomerRFMBar'){
        this.getDetail(value)
      }
    },
    //  调用详情接口
    getDetail(value){
      this.rfmType = value
      const {pageNum,pageSize,employeeId} = this.query
      const data = {
        rfmType:value,
        liveAnchorBaseId:'',
        employeeId:employeeId == -1 ? null : employeeId,
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
        const {pageSize,employeeId} = this.query
      const data = {
        rfmType:this.rfmType,
        liveAnchorBaseId:'',
        employeeId:employeeId == -1 ? null : employeeId,
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
    // 助理
    getCompany(){
      if(sessionStorage.getItem('isDirector') == 'true'){
        const data = {
          LiveAnchorBaseId:'',
          employeeId:this.query.employeeId == -1 ? null : this.query.employeeId,
        }
        api.getAllCustomerByRFM(data).then(res=>{
          if(res.code === 0){
            this.dataAll = res.data.allCustomerByRFM
              this.myEcharts(res.data.allCustomerByRFM);
          }
        })
      }else{
        const data = {
          LiveAnchorBaseId:'',
          employeeId:Number(sessionStorage.getItem('employeeId')),
        }
        api.getAllCustomerByRFM(data).then(res=>{
          if(res.code === 0){
            this.dataAll = res.data.allCustomerByRFM
              this.myEcharts(res.data.allCustomerByRFM);
          }
        })
      }
      // if(sessionStorage.getItem('isDirector') == 'true'){
      //   const data = {
      //     LiveAnchorBaseId:'',
      //     employeeId:this.query.employeeId == -1 ? null : this.query.employeeId,
      //   }
      //   api.getAllCustomerByRFM(data).then(res=>{
      //     if(res.code === 0){
      //       this.dataAll = res.data.allCustomerByRFM
      //         this.myEcharts(res.data.allCustomerByRFM);
      //     }
      //   })
      // }else{
      //   if(this.query.employeeId){
      //     const data = {
      //       LiveAnchorBaseId:'',
      //       employeeId:Number(sessionStorage.getItem('employeeId')),
      //     }
      //     api.getAllCustomerByRFM(data).then(res=>{
      //       if(res.code === 0){
      //         this.dataAll = res.data.allCustomerByRFM
      //           this.myEcharts(res.data.allCustomerByRFM);
      //       }
      //     })
      //   }else{
      //     const data = {
      //       LiveAnchorBaseId:'',
      //       employeeId:-1,
      //     }
      //     api.getAllCustomerByRFM(data).then(res=>{
      //       if(res.code === 0){
      //         this.dataAll = res.data.allCustomerByRFM
      //           this.myEcharts(res.data.allCustomerByRFM);
      //       }
      //     })
      // }
      // }
      
      
    },

  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch: {
    active: {
      handler(value) {
        if (value === "zhulicustomerRFMBar") {
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
.query{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
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
