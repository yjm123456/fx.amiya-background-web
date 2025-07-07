<template>
  <Card style="overflow-x:hidden">
    <!-- 啊美雅（医美）助理数据运营看板 -->
    <!-- <div class="title">{{this.selected5 == '整体' ? '啊美雅（医美）助理整体数据运营看板' : '啊美雅（医美）助理转化数据运营看板'}}</div> -->
    <div class="title">医院运营看板</div>
    <div class="d_p">
      <!-- 时间进度及筛选 -->
      <div class="time">
        <div class="tab_content2">
          <div class="tab">
            <div
              class="tab_item"
              v-for="(item, index) in list5"
              :key="index"
              @click="selectTab5(item)"
              :class="{ active: selected5 == item }"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <span>
          <span class="completeRateSize">时间进度：</span>
          <Progress
            :percent="completeRate > 100 ? 100 : completeRate"
            hide-info
            style="width:180px;"
            stroke-color="dodgerblue"
            :stroke-width="13"
            border
          >
          </Progress>
          <span class="completeRateSize"> {{ completeRate }}%</span>
        </span>
        <DatePicker
          type="date"
          placeholder="请选择开始时间"
          style="width: 160px;margin-left:30px"
          transfer
          :value="params.startDate"
          v-model="params.startDate"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="请选择结束时间"
          style="width: 160px;margin:0 10px"
          transfer
          :value="params.endDate"
          v-model="params.endDate"
        ></DatePicker>
        <Select
          v-model="params.hospitalId"
          placeholder="请选择医院"
          filterable
          style="width:200px;margin-right:10px;text-align: start;"
        >
          <Option
            v-for="item in params.hospitalInfo"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <Button type="primary" @click="getData">查询</Button>
      </div>
    </div>
    <div v-if="selected5 == '整体'">
      <!-- 卡片 -->
      <div  class="title_p">业绩</div>
      <item ref="items" :params="params" :completeRate="completeRate"/>
      <div  class="title_p">上门</div>
      <items2 ref="items2" :params="params" :completeRate="completeRate"/>
      <!-- 折线图 -->
      <Card >
        <div class="h2">当月业绩&上门趋势</div>
        <!-- tab切换 -->
        <div class="tab_content">
          <div class="tab">
            <div
              class="tab_item"
              v-for="(item, index) in list2"
              :key="index"
              @click="selectTab2(index, item)"
              :class="{ active: selected2 == item }"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <monthLine  :brokenLineDataObj="brokenLineDataObj" v-if="selected2 == '业绩'"/>
        <monthLine2  :brokenLineDataObj="assistantDistributeConsulationBrokenLineDataObj" v-if="selected2 == '上门'"/>
      </Card>
      <!-- 漏斗图 -->
      <Card class="mr">
        <div class="h2">新老客转化周期漏斗</div>
        <!-- tab切换 -->
        <div class="tab_content">
          <div class="tab">
            <div
              class="tab_item"
              v-for="(item, index) in list"
              :key="index"
              @click="selectTab(index, item)"
              :class="{ active: selected == item }"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        
        <div  class="list">
          <!-- <Card class="item">
            <div class="h2">新客业绩</div>
            <funnel :funnelData="funnelObj.newCustomerData"/>
          </Card>
          <Card  class="item">
            <div class="h2">老客业绩</div>
            <funnel :funnelData="funnelObj.oldCustomerData"/>
          </Card> -->
          <!-- 新客转化周期根据助理分诊派单转化周期接口获取 -->
          <funnel :funnelObj="funnelObj" :isFlag="isFlag" :assistantTransformCycleDataObj="assistantTransformCycleDataObj" :selected="selected"/>
        </div>
      </Card>
      <Card class="mr ">
        <!-- tab切换 -->
        <div class="tab_content">
          <div class="tab">
            <div
              class="tab_item"
              v-for="(item, index) in list4"
              :key="index"
              @click="selectTab4(index, item)"
              :class="{ active: selected4 == item }"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="list3">
          <Card class="item3">
            <div class="h2 h3">新客上门转化周期</div>
            <cycleBar :barData="assistantTransformCycleDataObj.toHospitalCycleData"/>
          </Card>
          <Card class="item3">
            <div class="h2 h3">新客上门率</div>
            <cycleBar2 :barData="hospitalVisitRateDataObj.items" title="上门率"/>
          </Card>
          <!-- <Card class="item3">
            <div class="h2 h3">医院老客复购率</div>
            <cycleBar :barData="assistantTransformCycleDataObj.oldCustomerRePurcheData" title="复购率"/>
          </Card> -->
        </div>
        <div class="list3">
          <Card class="item3" style="margin:10px 0">
            <div class="h2 h3">新客成交率</div>
            <cycleBar2 :barData="hospitalDealRateDataObj.items" title="成交率"/>
          </Card>
          <Card class="item3" style="margin:10px 0">
            <div class="h2 h3">老客复购率</div>
            <cycleBar :barData="assistantTransformCycleDataObj.oldCustomerRePurcheData" title="复购率"/>
          </Card>
        </div>
        <div class="list3">
          <Card class="item3">
            <div class="h2 h3">新客客单价</div>
            <cycleBar3 :barData="performanceRateDataNew" />
          </Card>
          <Card class="item3">
            <div class="h2 h3">老客客单价</div>
            <cycleBar3 :barData="performanceRateDataOld" />
          </Card>
        </div>
      </Card>  
      <!-- 助理目标完成率和业绩占比 -->
      <!-- <Card class="mr">
        <div class="tab2" >
          <div
            class="tab_item2"
            v-for="(item, index) in platformList3"
            :key="index"
            @click="checkTab3(index, item)"
            :class="{ active2: item.isSelected }"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div  class="list ">
          <Card class="item">
            <div class="h2">医院上门人数</div>
            <div class="x_title">
              <div>总上门：{{assistantHospitalCluesDataObj.totalVisitCount ? assistantHospitalCluesDataObj.totalVisitCount : 0}}</div>
              <div>总成交：{{assistantHospitalCluesDataObj.totalDealCount ? assistantHospitalCluesDataObj.totalDealCount : 0}}</div>
              <div>总成交率：{{assistantHospitalCluesDataObj.dealRate ? assistantHospitalCluesDataObj.dealRate : 0}}%</div>

            </div>
            <customerBar :assiatantTargetCompleteAndPerformanceRateData="assistantHospitalCluesDataObj.items"  title="人数"  :completeRate="completeRate"/>
          </Card>
          <Card  class="item">
            <div class="h2">医院业绩贡献</div>
            <customerBar :assiatantTargetCompleteAndPerformanceRateData="assistantHospitalPerformanceData"  title="目标完成率"/>
          </Card>
        </div>
      </Card> -->
    </div>
    <div v-else>
      <!-- 月度业绩目标达成情况  -->
      <monthlyTargetAchievementStatus ref="monthlyTargetAchievementStatus" :params="params" :completeRate="completeRate"/>
      <!-- 月度线索转化情况 -->
      <monthlyLeadConversionStatus ref="monthlyLeadConversionStatus" :params="params" :completeRate="completeRate"/>
    </div>
    
   
    
  </Card>
</template>
<script>
import {processEnv} from "@/http/baseUrl";
import * as amiyaOperationsBoardApi from "@/api/amiyaOperationsBoard";
import * as hospitalManage from "@/api/hospitalManage";

import * as api from "@/api/amiyaHospitalOperationBoard";
import * as orderApi from "@/api/orderManage";
import * as employeeManageApi from "@/api/employeeManage";
import item from "./components/item.vue";
import items2 from "./components/item2.vue";
import monthLine from "./components/monthLine.vue"
import monthLine2 from "./components/monthLine2.vue"
import funnel from "./components/funnel.vue"
import pieItem from "./components/pieItem.vue"
import pieItem2 from "./components/pieItem2.vue"
import pieItem3 from "./components/pieItem3.vue"
import customerBar from "./components/customerBar.vue"
import cycleBar from "./components/cycleBar.vue"
import cycleBar2 from "./components/cycleBar2.vue"
import cycleBar3 from "./components/cycleBar3.vue"
import barItem from "./components/barItem.vue"
import hospitalBar from "./components/hospitalBar.vue"
import monthlyTargetAchievementStatus from "./components/monthlyTargetAchievementStatus.vue"
import monthlyLeadConversionStatus from "./components/monthlyLeadConversionStatus.vue"
export default {
  components: {
    item,
    monthLine,
    monthLine2,
    funnel,
    pieItem,
    customerBar,
    barItem,
    hospitalBar,
    items2,
    pieItem2,
    pieItem3,
    cycleBar,
    monthlyTargetAchievementStatus,
    monthlyLeadConversionStatus,
    cycleBar2,
    cycleBar3
  },
  data() {
    return {
      list: ["当月","历史"],
      list2: ["业绩","上门"],
      list4: ["当月","历史"],
      list5:["整体","转化"],
      list6:["新客","老客"],
      selected:'当月',
      selected2:'业绩',
      selected4:'当月',
      selected5:'整体',
      selected6:'新客',
      // 时间进度
      completeRate: 0,
      params: {
        // 当年
        // startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 助理
        employee: [],
        assistantId: '',
        // 医院
        hospitalInfo:[],
        hospitalId:null
      },
      // 是否为客服
      isCustomerService:sessionStorage.getItem('isCustomerService'),
      // 是否为管理员
      isDirector:sessionStorage.getItem('isDirector'),
      // 折线图数据
      brokenLineDataObj:{},
      // 分诊折线图
      assistantDistributeConsulationBrokenLineDataObj:{},
      // 漏斗图数据
      funnelObj:{},
      // 有效/潜在分诊量
      distributeConsulationData:[],
      totalFlowRateNumber:0,
      // 有效/潜在业绩
      performanceEffictiveOrNoData:[],
      totalPerformanceNumber:0,
      // 当月/历史派单量
      sendOrderData:[],
      totalPerformanceNumber2:0,
      // 当月/历史业绩
      performanceHistoryOrNoData:[],
      totalPerformanceNumber3:0,
      // 新老客成交量占比
      customerDealData:[],
      totalPerformanceNumber4:0,
      // 新老客业绩占比
      performanceNewCustonerOrNoData:[],
      totalPerformanceNumber5:0,
      // 助理目标完成率和助理业绩占比柱状图
      assiatantTargetCompleteAndPerformanceRateDataObj:{},
      // 医院线索分析
      assistantHospitalCluesDataObj:{},
      // 医院业绩分析
      assistantHospitalPerformanceData:[],
      // 用于加载数据
      isFlag:false,
      // 客资线索
      typeCount:[],
      // 客资业绩
      typePerformance:[],
      // 客户面诊类型派单量
      consulation:[],
      // 客户面诊类型业绩
      consulationPerformance:[],
      platformList2:[
        {
          name: "当月",
          id: 1,
          isSelected: true,
        },
        {
          name: "历史",
          id: 2,
          isSelected: false,
        },
      ],
      platformList3:[
        {
          name: "新客",
          id: 1,
          isSelected: true,
        },
        {
          name: "老客",
          id: 2,
          isSelected: false,
        },
      ],
      // 转化周期
      assistantTransformCycleDataObj:{},
      // 机构上门率数据
      hospitalVisitRateDataObj:{},
      // 机构成交率数据
      hospitalDealRateDataObj:{},
      // 机构新客客单价
      performanceRateDataNew:[],
      // 机构老客客单价
      performanceRateDataOld:[]
      
    };
  },
  methods: {
    selectTab5(value){
      this.selected5 = value;
      this.getData()
    },
    checkTab3(index, value) {
      this.platformList3[index].isSelected = !this.platformList3[index].isSelected;
      this.getassistantHospitalCluesData()
    },
    //   获取时间进度
    getTimeSpanClick() {
      const data = {
        startDate: null,
        endDate: this.$moment(this.params.endDate).format("YYYY-MM-DD"),
        keyWord: "",
      };
      amiyaOperationsBoardApi.getTimeSpan(data).then((res) => {
        if (res.code === 0) {
          // const { contentPalteForms } = res.data;
          this.completeRate = res.data.data;
          // sessionStorage.setItem('completeRate',res.data.data)
        }
      });
    },
    // 查询
    getData() {
      this.getTimeSpanClick();
      if(this.selected5 == '整体'){
        this.$nextTick(()=>{
            this.$refs.items.getAssistantPerformance()
            this.$refs.items2.getdistributeConsulationData()
        })
        this.getbrokenLineData()
        this.getassistantDistributeConsulationBrokenLineData()
        this.getassistantPerformanceFilterData()
        this.getAssistantTransformCycleDataClick() 
        this.getassistantHospitalCluesData()
        this.getassistantHospitalPerformanceData()
        this.getHospitalVisitRateData()
        this.getHospitalDealRateData()
        this.getHospitalDealRateDataNew()
        this.getHospitalDealRateDataOld()
      }else if(this.selected5 == '转化'){
        this.$nextTick(()=>{
            this.$refs.monthlyTargetAchievementStatus.getAssistantTotalAchievementByYearClick()
            this.$refs.monthlyLeadConversionStatus.getHospitalOperationYearData()
        })
      }
      
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          const {hospitalInfo} = res.data
          this.params.hospitalInfo = hospitalInfo
          this.params.hospitalId = hospitalInfo.find(item=>item.name == '杭州米兰柏羽医疗美容机构').id
        }
      });
    },
    // 根据职位id获取员工
    getEmployeeByPositionIdAdmin(){
      const data = {
        // （客服管理员)线上id 4 测试5
        positionId:processEnv.VUE_APP_BASE_URL == 'https://www.ameiyes.com' ? 4 : 5
        
      }
      employeeManageApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const {employee} =res.data
          this.params.employee = employee
          // 是客服但不是管理员获取登录id 
          this.params.assistantId =  sessionStorage.getItem('isDirector') == 'false' && sessionStorage.getItem('isCustomerService') == 'true' ? Number(sessionStorage.getItem('employeeId')) : employee[0].id
        }
      });
    },
    // 获取业绩折线图数据
    getbrokenLineData(){
        const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId 
        }
        api.hospitalPerformancebrokenLineData(data).then(res=>{
            if(res.code === 0){
                this.brokenLineDataObj =  res.data.data
            }
        })
    },
    // 获取上门折线图数据
    getassistantDistributeConsulationBrokenLineData(){
      const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId 
        }
        api.hospitalVisitBrokenLineData(data).then(res=>{
            if(res.code === 0){
                this.assistantDistributeConsulationBrokenLineDataObj =  res.data.data
            }
        })
    },
    // 获取漏斗图数据
    getassistantPerformanceFilterData(){
        const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId,
            isCurrentMonth: this.selected == '当月' ? true : false,
        }
        api.hospitalPerformanceFilterData(data).then(res=>{
            if(res.code === 0){
                this.funnelObj =  res.data.data
                this.isFlag = true
            }
        })
    },
    // 医院上门转化周期和医院老客复购率
    getAssistantTransformCycleDataClick(){
        const {startDate,endDate,hospitalId} = this.params
        // console.log(this.selected4)
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId,
            isCurrentMonth:this.selected4 == '当月' ? true : false

        }
        api.getHospitalTransformCycleData(data).then(res=>{
            if(res.code === 0){
                this.assistantTransformCycleDataObj =  res.data.data

            }
        })
    },
    // // 获取医院转化周期 
    // getassiatantTargetCompleteAndPerformanceRateData(){
    //     const {startDate,endDate,hospitalId} = this.params
    //     const data = {
    //         startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
    //         endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
    //         hospitalId:hospitalId,
    //     }
    //     api.getHospitalTransformCycleData(data).then(res=>{
    //         if(res.code === 0){
    //             this.assiatantTargetCompleteAndPerformanceRateDataObj =  res.data.data
    //         }
    //     })
    // },
    // 获取医院上门人数
    getassistantHospitalCluesData(){
        const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId,
            newCustomer:this.platformList3.find((item) => item.id == 1).isSelected,
            oldCustomer:this.platformList3.find((item) => item.id == 2).isSelected,
        }
        api.hospitalHospitalCluesData(data).then(res=>{
            if(res.code === 0){
                this.assistantHospitalCluesDataObj =  res.data.data
            }
        })
    },
    // 获取医院业绩贡献占比
    getassistantHospitalPerformanceData(){
        const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId,
            // newCustomer:this.platformList3.find((item) => item.id == 1).isSelected,
            // oldCustomer:this.platformList3.find((item) => item.id == 2).isSelected,
        }
        api.hospitalPerformanceRateData(data).then(res=>{
            if(res.code === 0){
                this.assistantHospitalPerformanceData =  res.data.data.performanceRateData
            }
        })
    },
    // 机构上门率数据
    getHospitalVisitRateData(){
        const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId,
            newCustomer:true,
            oldCustomer:false,
        }
        api.hospitalVisitRateData(data).then(res=>{
            if(res.code === 0){
                this.hospitalVisitRateDataObj =  res.data.data
            }
        })
    },
    // 机构复购率
    getHospitalDealRateData(){
      const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId,
            newCustomer:true,
            oldCustomer:false,
        }
        api.hospitalDealRateData(data).then(res=>{
            if(res.code === 0){
                this.hospitalDealRateDataObj =  res.data.data
            }
        })
    },
    // 机构新客客单价
    getHospitalDealRateDataNew(){
      const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId,
            newCustomer:true,
        }
        api.hospitalPerCustomerPriceDataData(data).then(res=>{
            if(res.code === 0){
                this.performanceRateDataNew =  res.data.data.performanceRateData
            }
        })
    },
    // 机构老客客单价
    getHospitalDealRateDataOld(){
      const {startDate,endDate,hospitalId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            hospitalId:hospitalId,
            oldCustomer:false,
        }
        api.hospitalPerCustomerPriceDataData(data).then(res=>{
            if(res.code === 0){
                this.performanceRateDataOld =  res.data.data.performanceRateData
            }
        })
    },
    
    // 漏斗图 有效潜在切换
    selectTab(index, value) {
      this.selected = value;
      this.getassistantPerformanceFilterData()
    },
    // 折线图切换
    selectTab2(index, value) {
      this.selected2 = value;
      if(value == '业绩'){
        this.getbrokenLineData()
      }else if(value == '上门'){
        this.getassistantDistributeConsulationBrokenLineData()

      }
    },
    // 
    selectTab4(index,value){
      this.selected4 = value;
      this.getAssistantTransformCycleDataClick()
    }
  },
  created() {
    this.getEmployeeByPositionIdAdmin();
    this.getHospitalInfonameList()
    setTimeout(()=>{
        this.getData();
    },1000)
  },
};
</script>
<style scoped lang="less">
.d_p{
  width: 100%;
  // display: flex;
}
.tab2{
  text-align: start;
  padding-left: 10px;
  display: flex;
  margin-bottom: 10px;
}
.tab_item2 {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.active2 {
  color: red;
  border: 1px solid red;
}
.completeRateSize{
  font-weight: bold;
  font-size: 14px;
  margin-left: 5px;
}
/* 添加边框样式 */
/deep/ .ivu-progress-inner {
  border: 3px solid dodgerblue;
  border-radius: 10px;
}
.title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  color: #000;
}
.time {
  text-align: end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
   color: #000;
}
.list{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item{
  width: 49%;
  position: relative;
}
.h2{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  
}
.h3{
  margin-bottom: 10px;
  color: #000;
}
.title_p{
    padding-left: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
}
.tab_content ,.tab_content2{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 15px 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.tab_content2{
  width: 202px;
}
.tab{
  display: flex;
}
.tab_item {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.active {
  color: #fff;
  border: 1px solid #2f8cf0;
  background: #2f8cf0;
}
.mr{
  margin: 10px 0;
}
.x_title{
  position: absolute;
  right: 12%;
  top:20px;
}
.list3{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.item3{
  width: 49%;
}
</style>
