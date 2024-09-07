<template>
  <Card>
    <div class="title">啊美雅（医美）助理数据运营看板</div>
    <!-- 时间进度及筛选 -->
    <div class="time">
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
        v-model="params.assistantId"
        placeholder="请选择助理"
        filterable
        style="width:180px;margin-right:10px;text-align: start;"
        :disabled="isDirector == 'false' && isCustomerService == 'true'"
      >
        <Option
          v-for="item in params.employee"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Button type="primary" @click="getData">查询</Button>
    </div>
    <!-- 卡片 -->
    <item ref="items" :params="params"/>
    <items2 ref="items2" :params="params"/>
    <!-- 折线图 -->
    <Card >
      <div class="h2">当月业绩&客资趋势</div>
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
      <monthLine2  :brokenLineDataObj="assistantDistributeConsulationBrokenLineDataObj" v-if="selected2 == '客资'"/>
    </Card>
    <!-- 漏斗图 -->
    <Card class="mr">
      <div class="h2">新老客业绩转化漏斗</div>
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
        <funnel :funnelObj="funnelObj" :isFlag="isFlag"/>
      </div>
    </Card>
    <!-- 饼图 -->
    <Card class="mr">
      <div class="h2 h3">客资分类--线索&业绩</div>
      <div  class="list h3">
        <Card class="item">
          <div class="h2">客资线索</div>
          <pieItem2 :pieData="typeCount.data" :total="typeCount.total" title="总线索"/>
        </Card>
        <Card  class="item">
          <div class="h2">客资业绩</div>
          <pieItem2 :pieData="typePerformance.data" :total="typePerformance.total" title="总业绩"/>
        </Card>
      </div>

      <div class="h2 h3">有效/潜在--线索&业绩</div>
      <div  class="list h3">
        <Card class="item">
          <div class="h2">有效/潜在分诊量</div>
          <pieItem :pieData="distributeConsulationData" :totalNumber="totalFlowRateNumber" title="总线索"/>
        </Card>
        <Card  class="item">
          <div class="h2">有效/潜在业绩</div>
          <pieItem :pieData="performanceEffictiveOrNoData" :totalNumber="totalPerformanceNumber" title="总业绩"/>
        </Card>
      </div>
      <div class="h2 h3">当月/历史--派单量&业绩</div>
      <div  class="list h3">
        <Card class="item">
          <div class="h2">当月/历史派单量</div>
          <pieItem :pieData="sendOrderData" :totalNumber="totalPerformanceNumber2" title="总线索"/>
        </Card>
        <Card  class="item">
          <div class="h2">当月/历史业绩</div>
          <pieItem :pieData="performanceHistoryOrNoData" :totalNumber="totalPerformanceNumber3" title="总业绩"/>
        </Card>
      </div>
      <div class="h2 h3">新老客--成交量&业绩占比</div>
      <div  class="list ">
        <Card class="item">
          <div class="h2">新老客成交占比</div>
          <pieItem :pieData="customerDealData" :totalNumber="totalPerformanceNumber4" title="总线索"/>
        </Card>
        <Card  class="item">
          <div class="h2">新老客业绩占比</div>
          <pieItem :pieData="performanceNewCustonerOrNoData" :totalNumber="totalPerformanceNumber5" title="总业绩"/>
        </Card>
      </div>
    </Card>
    <!-- 助理目标完成率和业绩占比 -->
    <Card class="mr">
      <div class="h2 h3">助理--目标完成率&业绩贡献</div>
      <div  class="list ">
        <Card class="item">
          <div class="h2">助理目标完成率</div>
          <customerBar :assiatantTargetCompleteAndPerformanceRateData="assiatantTargetCompleteAndPerformanceRateDataObj.targetCompleteData"  />
        </Card>
        <Card  class="item">
          <div class="h2">助理业绩贡献</div>
          <customerBar :assiatantTargetCompleteAndPerformanceRateData="assiatantTargetCompleteAndPerformanceRateDataObj.performanceRateData"  />
        </Card>
      </div>
    </Card>
    <!-- 机构线索分析和机构业绩分析 -->
    <Card class="mr">
      <div class="h2 h3">机构--线索&业绩</div>
      <div class="list">
        <Card class="item">
          <div class="h2">助理线索分析</div>
          <div class="x_title">
            <div>总派单：{{assistantHospitalCluesDataObj.totalSendOrderCount}}</div>
            <div>总上门：{{assistantHospitalCluesDataObj.totalVisitCount}}</div>
            <div>总成交：{{assistantHospitalCluesDataObj.totalDealCount}}</div>
          </div>
          <hospitalBar :hospitalBarData="assistantHospitalCluesDataObj.items" />
        </Card>
        <Card class="item">
          <div class="h2">助理业绩分析</div>
          <barItem :barItemData="assistantHospitalPerformanceData"/>
        </Card>
      </div>
    </Card>
   
    
  </Card>
</template>
<script>
import {processEnv} from "@/http/baseUrl";

import * as api from "@/api/amiyaOperationsBoard";
import * as orderApi from "@/api/orderManage";
import * as employeeManageApi from "@/api/employeeManage";
import item from "./components/item.vue";
import items2 from "./components/item2.vue";
import monthLine from "./components/monthLine.vue"
import monthLine2 from "./components/monthLine2.vue"
import funnel from "./components/funnel.vue"
import pieItem from "./components/pieItem.vue"
import pieItem2 from "./components/pieItem2.vue"
import customerBar from "./components/customerBar.vue"
import barItem from "./components/barItem.vue"
import hospitalBar from "./components/hospitalBar.vue"
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
    pieItem2
  },
  data() {
    return {
      list: ["全部业绩","有效业绩", "潜在业绩"],
      list2: ["业绩","客资"],
      selected:'全部业绩',
      selected2:'业绩',
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
      // 机构线索分析
      assistantHospitalCluesDataObj:{},
      // 机构业绩分析
      assistantHospitalPerformanceData:[],
      // 用于加载数据
      isFlag:false,
      // 客资线索
      typeCount:[],
      // 客资业绩
      typePerformance:[]
    };
  },
  methods: {
    //   获取时间进度
    getTimeSpanClick() {
      const data = {
        startDate: null,
        endDate: this.$moment(this.params.endDate).format("YYYY-MM-DD"),
        keyWord: "",
      };
      api.getTimeSpan(data).then((res) => {
        if (res.code === 0) {
          // const { contentPalteForms } = res.data;
          this.completeRate = res.data.data;
        }
      });
    },
    // 查询
    getData() {
      this.getTimeSpanClick();
      this.$nextTick(()=>{
          this.$refs.items.getAssistantPerformance()
          this.$refs.items2.getdistributeConsulationData()
      })
      this.getbrokenLineData()
      this.getassistantDistributeConsulationBrokenLineData()
      this.getassistantPerformanceFilterData()
      this.getanalysisData()
      this.getassiatantTargetCompleteAndPerformanceRateData()
      this.getassistantHospitalCluesData()
      this.getassistantHospitalPerformanceData()
    },
    // 根据职位id获取员工
    getEmployeeByPositionIdAdmin(){
      const data = {
        // （客服管理员)线上id 4 测试5
        positionId:processEnv.VUE_APP_BASE_URL == 'https://app.ameiyes.com' ? 4 : 5
        
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
    // 获取折线图数据
    getbrokenLineData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId 
        }
        api.brokenLineData(data).then(res=>{
            if(res.code === 0){
                this.brokenLineDataObj =  res.data.data
            }
        })
    },
    // 获取分诊折线图数据
    getassistantDistributeConsulationBrokenLineData(){
      const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId 
        }
        api.assistantDistributeConsulationBrokenLineData(data).then(res=>{
            if(res.code === 0){
                this.assistantDistributeConsulationBrokenLineDataObj =  res.data.data
            }
        })
    },
    // 获取漏斗图数据
    getassistantPerformanceFilterData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId,
            isEffectiveCustomerData:this.selected == '全部业绩' ? null : this.selected == '有效业绩' ? true : false,
        }
        api.assistantPerformanceFilterData(data).then(res=>{
            if(res.code === 0){
                this.funnelObj =  res.data.data
                this.isFlag = true
            }
        })
    },
    // 获取饼图数据
    getanalysisData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId,
        }
        api.analysisData(data).then(res=>{
            if(res.code === 0){
                const {distributeConsulationData ,performanceEffictiveOrNoData,sendOrderData,performanceHistoryOrNoData,customerDealData,performanceNewCustonerOrNoData,typeCount,typePerformance} = res.data.data
                // 有效/潜在分诊量
                this.distributeConsulationData = [
                  {name:'有效',value:distributeConsulationData.effictiveNumber,rate:distributeConsulationData.effictiveRate},
                  {name:'潜在',value:distributeConsulationData.notEffictiveNumber,rate:distributeConsulationData.notEffictiveRate},
                ]
                this.totalFlowRateNumber = distributeConsulationData.totalFlowRateNumber
                // 有效/潜在业绩
                this.performanceEffictiveOrNoData = [
                  {name:'有效',value:performanceEffictiveOrNoData.effictivePerformanceNumber,rate:performanceEffictiveOrNoData.effictivePerformanceRate},
                  {name:'潜在',value:performanceEffictiveOrNoData.notEffictivePerformanceNumber,rate:performanceEffictiveOrNoData.notEffictivePerformanceRate},
                ]
                this.totalPerformanceNumber = performanceEffictiveOrNoData.totalPerformanceNumber
                // 当月/历史派单量
                this.sendOrderData = [
                  {name:'当月',value:sendOrderData.thisMonthPerformanceNumber,rate:sendOrderData.thisMonthPerformanceRate},
                  {name:'历史',value:sendOrderData.historyPerformanceNumber,rate:sendOrderData.historyPerformanceRate},
                ]
                this.totalPerformanceNumber2 = sendOrderData.totalPerformanceNumber
                // 当月/历史业绩
                this.performanceHistoryOrNoData = [
                  {name:'当月',value:performanceHistoryOrNoData.thisMonthPerformanceNumber,rate:performanceHistoryOrNoData.thisMonthPerformanceRate},
                  {name:'历史',value:performanceHistoryOrNoData.historyPerformanceNumber,rate:performanceHistoryOrNoData.historyPerformanceRate},
                ]
                this.totalPerformanceNumber3 = performanceHistoryOrNoData.totalPerformanceNumber
                //新老客成交量占比
                this.customerDealData = [
                  {name:'新客',value:customerDealData.totalPerformanceNewCustomerNumber,rate:customerDealData.totalPerformanceNewCustomerRate},
                  {name:'老客',value:customerDealData.totalPerformanceOldCustomerNumber,rate:customerDealData.totalPerformanceOldCustomerRate},
                ]
                this.totalPerformanceNumber4 = customerDealData.totalPerformanceNumber
                // 新老客业绩占比
                this.performanceNewCustonerOrNoData = [
                  {name:'新客',value:performanceNewCustonerOrNoData.totalPerformanceNewCustomerNumber,rate:performanceNewCustonerOrNoData.totalPerformanceNewCustomerRate},
                  {name:'老客',value:performanceNewCustonerOrNoData.totalPerformanceOldCustomerNumber,rate:performanceNewCustonerOrNoData.totalPerformanceOldCustomerRate},
                ]
                this.totalPerformanceNumber5 = performanceNewCustonerOrNoData.totalPerformanceNumber
                // 客资线索
                this.typeCount = typeCount 
                // 客资业绩
                this.typePerformance = typePerformance
                
                

            }
        })
    },
    // 获取助理目标完成率和业绩占比  
    getassiatantTargetCompleteAndPerformanceRateData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId,
        }
        api.assiatantTargetCompleteAndPerformanceRateData(data).then(res=>{
            if(res.code === 0){
                this.assiatantTargetCompleteAndPerformanceRateDataObj =  res.data.data
            }
        })
    },
    // 获取机构线索分析
    getassistantHospitalCluesData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId,
        }
        api.assistantHospitalCluesData(data).then(res=>{
            if(res.code === 0){
                this.assistantHospitalCluesDataObj =  res.data.data
            }
        })
    },
    // 获取机构业绩 
    getassistantHospitalPerformanceData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId,
        }
        api.assistantHospitalPerformanceData(data).then(res=>{
            if(res.code === 0){
                this.assistantHospitalPerformanceData =  res.data.data
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
      }else if(value == '客资'){
        this.getassistantDistributeConsulationBrokenLineData()

      }
    },
  },
  created() {
    this.getEmployeeByPositionIdAdmin();
    setTimeout(()=>{

        this.getData();
    },1000)
  },
};
</script>
<style scoped>
.title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}
.time {
  text-align: end;
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
  
}
.h3{
  margin-bottom: 10px;
}
.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 15px 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
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
</style>
