<template>
  <div>
    <Card>
      <div class="content_title">
        <div class="h2">{{selected == '整体' ? '啊美雅运营看板'  : selected == '助理' ?  '啊美雅助理运营看板' : '啊美雅转化看板'}}</div>
      </div>
      <!-- tab切换 -->
      <div class="tab_content fl_end" >
        <div class="date_con">
          <!-- tab切换 -->
          <div class="tab_content2">
              <div class="tab">
                <div
                  class="tab_item"
                  v-for="(item, index) in list"
                  :key="index"
                  @click="selectTab(index, item)"
                  :class="{ active: selected == item}"
                >
                  <span>{{ item }}</span>
                </div>
              </div>
          </div>

          <span>
            <span class="completeRateSize">时间进度：</span>
            <Progress :percent="completeRate >100 ? 100 : completeRate" hide-info style="width:180px;" stroke-color="dodgerblue" :stroke-width="13" border> </Progress>
            <span class="completeRateSize"> {{completeRate}}%</span>
          </span>

          <DatePicker
            type="date"
            placeholder="请选择开始时间"
            style="width: 140px;margin-left:30px"
            transfer
            :value="params.startDate"
            v-model="params.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="请选择结束时间"
            style="width: 140px;margin:0 10px"
            transfer
            :value="params.endDate"
            v-model="params.endDate"
          ></DatePicker>
          <Select
            v-model="params.assistantId"
            placeholder="请选择助理"
            filterable
            style="width:160px;margin-right:10px;text-align: start;"
            :disabled="isDirector == 'false' && isCustomerService == 'true'"
            v-if="selected == '助理'"
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
      </div>
      <!-- 主播筛选 -->
      <div class="tab" v-if="selected == '整体'">
        <div
          class="tab_item"
          v-for="(item, index) in list4"
          :key="index"
          @click="selectTab4(index, item)"
          :class="{ active: selected4 == item}"
        >
          <span>{{ item }}</span>
        </div>
      </div>
      <!-- 整体板块 -->
      <div v-if="selected == '整体'">
        <Card class="m_b ">
          <div class="name">线索</div>
          <item2 ref="item2" :params="params" :totalFlowRateAndDateSchedule="totalFlowRateAndDateSchedule" :completeRate="completeRate"/>
        </Card>
        <Card class="m_b ">
          <div class="name">业绩</div>
          <items :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule" :completeRate="completeRate"/>
        </Card>
        <!-- 当月业绩趋势 -->
        <Card  class="m_b">
          <div class="h3">当月线索&业绩趋势</div>
          <!-- tab切换 -->
          <div class="tab_content">
            <div class="tab">
              <div
                class="tab_item"
                v-for="(item, index) in list2"
                :key="index"
                @click="selectTab3(index, item)"
                :class="{ active: selected3 == item}"
              >
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
          <monthLine :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule" v-if="selected3 == '业绩'"/>
          <monthLine2 :totalAchievementAndDateSchedule="totalFlowRateAndDateSchedule"  v-if="selected3 == '线索'"/>
        </Card>

        <!-- 漏斗图 -->
        <Card  class="m_b">
          <div class="h3">新老客转化周期漏斗</div>
          <funnel
            :active="active"
            ref="whole"
            :params="params"
            :selected4="selected4"
            :liveAnchorBaseInfos="liveAnchorBaseInfos"
            :conversionCycleObj="conversionCycleObj"
          ></funnel>
        </Card>
        <Card class="m_b">
          <div class="list3">
            <Card class="item3">
              <div class="h3 t_c">主播分诊派单转化周期</div>
              <cycleBar :barData="conversionCycleObj.sendCycleData" />
            </Card>
            <Card class="item3">
              <div class="h3 t_c">主播分诊上门转化周期</div>
              <cycleBar :barData="conversionCycleObj.toHospitalCycleData"/>
            </Card>
            <Card class="item3">
              <div class="h3 t_c">当月老客复购率</div>
              <cycleBar :barData="conversionCycleObj.oldCustomerRePurcheData" title="复购率"/>
            </Card>
          </div>
      </Card>  
        <!-- 助理 -->
        <Card  class="m_b ">
          <div class="customer_bar_content">
            <Card class="customer_bar">
              <div class="h3">助理目标完成率</div>
              <customerBar :assiatantTargetCompleteAndPerformanceRateData="assiatantTargetCompleteAndPerformanceRateDataObj.targetCompleteData"  title="目标完成率" :completeRate="completeRate"/>
            </Card>
            <Card  class="customer_bar">
              <div class="h3">助理业绩贡献</div>
              <customerBar :assiatantTargetCompleteAndPerformanceRateData="assiatantTargetCompleteAndPerformanceRateDataObj.performanceRateData"  />
            </Card>
          </div>
          <!-- 机构 -->
          <div class="customer_bar_content mr">
            <Card class="customer_bar">
              <div class="h3">助理业绩分析</div>
              <barItem :barItemData="customerObj"/>
            </Card>
            
            <Card class="customer_bar">
              <div class="h3">机构业绩分析</div>
              <barItem :barItemData="hospitalObj"/>
            </Card>
          </div>
        </Card>
        
      </div>
      <!-- 助理板块 -->
      <div v-else-if="selected == '助理'">
        <!-- 卡片 -->
        <item3 ref="item3" :params="params" :completeRate="completeRate"/>
        <item4 ref="item4" :params="params" :completeRate="completeRate"/>
        <!-- 折线图 -->
        <Card  class="m_b ">
            <div class="h3">当月业绩&线索趋势</div>
            <!-- tab切换 -->
            <div class="tab_content">
                <div class="tab">
                <div
                    class="tab_item"
                    v-for="(item, index) in list5"
                    :key="index"
                    @click="selectTab5(index, item)"
                    :class="{ active: selected5 == item }"
                >
                    <span>{{ item }}</span>
                </div>
                </div>
            </div>
            <monthLine3  :brokenLineDataObj="brokenLineDataObj" v-if="selected5 == '业绩'"/>
            <monthLine4  :brokenLineDataObj="assistantDistributeConsulationBrokenLineDataObj" v-if="selected5 == '线索'"/>
        </Card>
        <!-- 漏斗图 -->
        <Card class="mr">
            <div class="h3">新老客转化周期漏斗</div>
            <!-- tab切换 -->
            <div class="tab_content">
                <div class="tab">
                <div
                    class="tab_item"
                    v-for="(item, index) in list6"
                    :key="index"
                    @click="selectTab6(index, item)"
                    :class="{ active: selected6 == item }"
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
                <funnel2 :funnelObj="funnelObj" :isFlag="isFlag" :assistantTransformCycleDataObj="assistantTransformCycleDataObj" :selected="selected6"/>
            </div>
        </Card>
        <Card class="mr ">
            <!-- tab切换 -->
            <div class="tab_content">
                <div class="tab">
                <div
                    class="tab_item"
                    v-for="(item, index) in list7"
                    :key="index"
                    @click="selectTab7(index, item)"
                    :class="{ active: selected7 == item }"
                >
                    <span>{{ item }}</span>
                </div>
                </div>
            </div>
            <div class="list3">
                <Card class="item3">
                <div class="h3">助理分诊派单转化周期</div>
                <cycleBar2 :barData="assistantTransformCycleDataObj.sendCycleData"/>
                </Card>
                <Card class="item3">
                <div class="h3">助理分诊上门转化周期</div>
                <cycleBar2 :barData="assistantTransformCycleDataObj.toHospitalCycleData"/>
                </Card>
                <Card class="item3">
                <div class="h3">当月老客复购率</div>
                <cycleBar2 :barData="assistantTransformCycleDataObj.oldCustomerRePurcheData" title="复购率"/>
                </Card>
            </div>
        </Card>  
        <!-- 助理目标完成率和业绩占比 -->
        <Card class="mr">
            <div class="h3">助理--目标完成率&业绩贡献</div>
            
            <div  class="list " style="margin-top:10px">
                <Card class="item">
                <div class="h3">助理目标完成率</div>
                <customerBar2 :assiatantTargetCompleteAndPerformanceRateData="assiatantTargetCompleteAndPerformanceRateDataObj2.targetCompleteData"  title="目标完成率" :completeRate="completeRate"/>
                </Card>
                <Card  class="item">
                <div class="h3">助理业绩贡献</div>
                <customerBar2 :assiatantTargetCompleteAndPerformanceRateData="assiatantTargetCompleteAndPerformanceRateDataObj2.performanceRateData"  />
                </Card>
            </div>
            </Card>
            <!-- 机构线索分析和机构业绩分析 -->
            <Card class="mr">
            <div class="h3">机构--线索&业绩</div>
            <!-- 平台切换 -->
            <div class="tab_content" >
                <div class="tab">
                    <div
                        class="tab_item"
                        v-for="(item, index) in platformList2"
                        :key="index"
                        @click="checkTab8(index, item)"
                        :class="{ active2: item.isSelected }"
                    >
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
            <div class="list">
                <Card class="item">
                    <div class="h3">机构线索分析</div>
                    <div class="x_title">
                        <div>总派单：{{assistantHospitalCluesDataObj.totalSendOrderCount}}</div>
                        <div>总上门：{{assistantHospitalCluesDataObj.totalVisitCount}}</div>
                        <div>总成交：{{assistantHospitalCluesDataObj.totalDealCount}}</div>
                    </div>
                    <hospitalBar2 :hospitalBarData="assistantHospitalCluesDataObj.items" />
                </Card>
                <Card class="item">
                    <div class="h3">机构业绩分析</div>
                    <barItem2 :barItemData="assistantHospitalPerformanceData"/>
                </Card>
            </div>
        </Card>
      </div>
      <!-- 转化板块 -->
      <div v-else>
        <!-- 刀刀组助理（年度）总业绩趋势 -->
        <totalAchievementByYear :params="params" ref="totalAchievementByYear"/>
        <!--助理（月度）业绩达成分析 -->
        <assistantTargetCompleteDataTable :params="params"  ref="assistantTargetCompleteDataTable" />
        <!-- 主播（月度）业绩转化分析-->
        <trafficConversionTable :params="params" ref="trafficConversionTable" />
        <!-- 助理（月度）业绩转化分析-->
        <customerTable :params="params" ref="customerTable" :liveAnchorBaseInfos="liveAnchorBaseInfos"/>
        
        
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as healthValueApi from "@/api/healthValue";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";
import * as employeeManageApi from "@/api/employeeManage";
import {processEnv} from "@/http/baseUrl";
// 整体
import items from "./components/item.vue"
import item2 from "./components/item2.vue"
import monthLine from "./components/monthLine.vue"
import monthLine2 from "./components/monthLine2.vue"
import barItem from "./components/barItem.vue"
import funnel from "./components/funnel.vue"
import customerBar from "./components/customerBar.vue"
import cycleBar from "./components/cycleBar.vue"
// 助理
import item3 from "./components/item3.vue"
import item4 from "./components/item4.vue"
import monthLine3 from "./components/monthLine3.vue"
import monthLine4 from "./components/monthLine4.vue"
import funnel2 from "./components/funnel2.vue"
import cycleBar2 from "./components/cycleBar2.vue"
import customerBar2 from "./components/customerBar2.vue"
import hospitalBar2 from "./components/hospitalBar2.vue"
import barItem2 from "./components/barItem2.vue"
// 转化
import assistantTargetCompleteDataTable from "./components/assistantTargetCompleteDataTable.vue"
import totalAchievementByYear from "./components/totalAchievementByYear.vue"
import trafficConversionTable from "./components/trafficConversionTable.vue"
import customerTable from "./components/customerTable.vue"


export default {
  components:{
    items,
    item2,
    item3,
    item4,
    monthLine,
    monthLine2,
    monthLine3,
    monthLine4,
    barItem,
    funnel,
    customerBar,
    cycleBar,
    funnel2,
    cycleBar2,
    customerBar2,
    hospitalBar2,
    barItem2,
    assistantTargetCompleteDataTable,
    totalAchievementByYear,
    trafficConversionTable,
    customerTable
  },
  data() {
    return {
      active:'whole',
      completeRate:0,
      // 是否为客服
      isCustomerService:sessionStorage.getItem('isCustomerService'),
      // 是否为管理员
      isDirector:sessionStorage.getItem('isDirector'),
      params:{
        // 当年
        // startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 助理
        employee: [],
        assistantId: '',
        // 平台
        contentPalteForms:[],
        // selected5:"业绩",
        // list5:["业绩","线索"],
        
      },
      // list: ["图表","转化","年度趋势"],
      list: ["整体","助理","转化"],
      list2: ["线索","业绩"],
      list4: ["全部","刀刀","吉娜"],
      selected:"整体",
      selected2:"业绩",
      selected3:"线索",
      selected4:"全部",
      
      //详情 平台id
      platformId:'',
      // 平台
      platformList: [
        {
          icon: "icon-douyin-",
          name: "抖音",
          id: 1,
          isSelected: true,
        },
        {
          icon: "icon-shipinhao",
          name: "视频号",
          id: 2,
          isSelected: true,
        },
        {
          icon: "icon-xiaohongshu1",
          name: "小红书",
          id: 3,
          isSelected: true,
        },
        {
          icon: "icon-siyuzhibo",
          name: "私域",
          id: 4,
          isSelected: true,
        },
      ],
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
      
       
      // ],
      // 详情model
      detailModel:false,
      titles:"",
      // 线索
      totalFlowRateAndDateSchedule:{},
      // 平台线索分析
      totalFlowRateByContentPlatForm:[],
      // 转化周期
      conversionCycleObj:{},
      // 业绩趋势
      totalAchievementAndDateSchedule:{},
      // 助理目标完成率和助理业绩贡献柱状图
      assiatantTargetCompleteAndPerformanceRateDataObj:{},
      // 助理业绩对比图
      customerObj:[],
      // 机构业绩对比图
      hospitalObj:[],
      // 主播基础
      liveAnchorBaseInfos:[],


      //助理板块
      // 折线图数据
      brokenLineDataObj:{},
      // 分诊折线图
      assistantDistributeConsulationBrokenLineDataObj:{},
      //   加载
      isFlag:false,
       // 漏斗图数据
      funnelObj:{},
      // 转化周期
      assistantTransformCycleDataObj:{},
      list5:["业绩","线索"],
      list6: ["整体","有效", "潜在"],
      list7: ["当月","历史"],
      selected5:"业绩",
      selected6:'整体',
      selected7:'当月',
      // 助理目标完成率和助理业绩贡献柱状图
      assiatantTargetCompleteAndPerformanceRateDataObj2:{},
      // 机构线索分析
      assistantHospitalCluesDataObj:{},
      // 机构业绩分析
      assistantHospitalPerformanceData:[],
      
    };
  },
  methods: {
    
  //   获取时间进度
    getTimeSpanClick() {
      const data = { 
        startDate:null,
        endDate:this.$moment(this.params.endDate).format("YYYY-MM-DD"),
        keyWord:''
      }
      api.getTimeSpan(data).then((res) => {
        if (res.code === 0) {
          // const { contentPalteForms } = res.data;
          this.completeRate = res.data.data;
          sessionStorage.setItem('completeRate',res.data.data)
        }
      });
    },
    // 主播基础数据列表
    getLiveAnchorBaseInfoValids(){
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const {liveAnchorBaseInfos} = res.data
          this.liveAnchorBaseInfos = liveAnchorBaseInfos
        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.params.contentPalteForms = contentPalteForms;
        }
      });
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
    // 线索
    // 根据条件获取线索数据
    // this.selected2 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected2 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id : 
    getTotalFlowRateAndDateSchedule(){
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        keyWord:this.selected4 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected4 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id :  ''
      };
      api.getTotalFlowRateAndDateSchedule(data).then((res) => {
        if (res.code == 0) {
          this.totalFlowRateAndDateSchedule = res.data.data
        }
      });
    },
    // 获取业绩数据和折线图数据
    getTotalAchievementAndDateSchedule() {
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        keyWord:this.selected4 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected4 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id :  ''
      };
      api.getTotalAchievementAndDateSchedule(data).then((res) => {
        if (res.code == 0) {
          this.totalAchievementAndDateSchedule = res.data.data;
        }
      });
    },
    // 根据条件获取平台线索分析
    getTransformCycleDataClick(){
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        liveAnchorBaseId:this.selected4 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected4 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id :  ''
      };
      api.getTransformCycleData(data).then((res) => {
        if (res.code == 0) {
          this.conversionCycleObj = res.data.data
        }
      })
    },
    // 获取助理目标完成率和业绩占比  
    getassiatantTargetCompleteAndPerformanceRateData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            // assistantId:assistantId,
        }
        api.assiatantTargetCompleteAndPerformanceRateData(data).then(res=>{
            if(res.code === 0){
                this.assiatantTargetCompleteAndPerformanceRateDataObj =  res.data.data
            }
        })
    },
    // 根据条件获取新老客业绩占比（助理与机构）
    getNewOrOldCustomerCompareByEmployeeAndHospital() {
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
      api.getNewOrOldCustomerCompareByEmployeeAndHospital(data).then((res) => {
        if (res.code == 0) {
          const {employeePerformance,hospitalPerformance} = res.data.data
          this.customerObj = employeePerformance
          this.hospitalObj = hospitalPerformance
        }
      });
    },
    selectTab(index, value) {
      this.selected = value
      this.getData()
    },
    // 业绩板块折线图切换
    selectTab3(index, value) {
      this.selected3 = value
      if(this.selected3 == '业绩'){
        this.getTotalAchievementAndDateSchedule()
      }else if(this.selected3 == '线索'){
        this.getTotalFlowRateAndDateSchedule()
      }
      
    },
    // 刀刀和吉娜切换
    selectTab4(index, value){
      this.selected4 = value
      this.getData()
    },
    
    getData() {
      const {startDate,endDate} = this.params
      if (!startDate || !endDate) {
        this.$Message.warning("请选择日期！");
        return;
      }
      this.getTimeSpanClick()
      if(this.selected == '整体'){
        this.getTotalAchievementAndDateSchedule();
        this.getTotalFlowRateAndDateSchedule();
        this.getTransformCycleDataClick()
        this.getassiatantTargetCompleteAndPerformanceRateData()
        this.getNewOrOldCustomerCompareByEmployeeAndHospital();
        this.$nextTick(()=>{
          if(this.active == 'whole'){
            this.$refs.whole.getPerformanceOperationData()
          }
        })
        
      } else if(this.selected == '助理'){
        this.$nextTick(()=>{
            this.$refs.item3.getAssistantPerformance()
            this.$refs.item4.getdistributeConsulationData()
        })
        this.getbrokenLineData()
        this.getassistantDistributeConsulationBrokenLineData()
        this.getassistantPerformanceFilterData()
        this.getAssistantTransformCycleDataClick()
        this.getassiatantTargetCompleteAndPerformanceRateData2()
        this.getassistantHospitalCluesData()
        this.getassistantHospitalPerformanceData()
      }else if(this.selected == '转化'){
        this.$nextTick(()=>{
          this.$refs.assistantTargetCompleteDataTable.getassistantTargetCompleteData();
          this.$refs.totalAchievementByYear.getTotalAchievementByYearClick()
          this.$refs.trafficConversionTable.getCompanyTransformData();
          this.$refs.customerTable.getAmiyaOperationsBoardassistantTransformData()
        })
      }
    },

    // 助理板块
    // 折线图切换
    selectTab5(index, value) {
      this.selected5 = value;
      if(value == '业绩'){
        this.getbrokenLineData()
      }else if(value == '线索'){
        this.getassistantDistributeConsulationBrokenLineData()

      }
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
        api.assistantEffOrPotBrokenLineData(data).then(res=>{
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
            isEffectiveCustomerData:this.selected6 == '整体' ? null : this.selected6 == '有效' ? true : false,
        }
        api.assistantPerformanceFilterData(data).then(res=>{
            if(res.code === 0){
                this.funnelObj =  res.data.data
                this.isFlag = true
            }
        })
    },
    // 转化周期
    getAssistantTransformCycleDataClick(){
        const {startDate,endDate,assistantId} = this.params
        // console.log(this.selected4)
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId,
            isCurrent:this.selected7 == '当月' ? true : false

        }
        api.getAssistantTransformCycleData(data).then(res=>{
            if(res.code === 0){
                this.assistantTransformCycleDataObj =  res.data.data

            }
        })
    },
    // 漏斗图 有效潜在切换
    selectTab6(index, value) {
      this.selected6 = value;
      this.getassistantPerformanceFilterData()
    },
    //柱状图当月/历史切换
    selectTab7(index,value){
      this.selected7 = value;
      this.getAssistantTransformCycleDataClick()
    },
    checkTab8(index, value) {
      this.platformList2[index].isSelected = !this.platformList2[index].isSelected;
      this.getassistantHospitalCluesData()
    },
    // 获取机构线索分析
    getassistantHospitalCluesData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId,
            currentMonth:this.platformList2.find((item) => item.id == 1).isSelected,
            history:this.platformList2.find((item) => item.id == 2).isSelected,
        }
        api.assistantHospitalCluesData(data).then(res=>{
            if(res.code === 0){
                this.assistantHospitalCluesDataObj =  res.data.data
            }
        })
    },
    // 获取助理目标完成率和业绩占比  
    getassiatantTargetCompleteAndPerformanceRateData2(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId:assistantId,
        }
        api.assiatantTargetCompleteAndPerformanceRateData(data).then(res=>{
            if(res.code === 0){
                this.assiatantTargetCompleteAndPerformanceRateDataObj2 =  res.data.data
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
  
    
  },

  created(){
    this.getContentValidList()
    this.getTimeSpanClick()
    this.getLiveAnchorBaseInfoValids()
    this.getEmployeeByPositionIdAdmin();
    this.getData()
  }
};
</script>

<style scoped lang="less">

.content_title{
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}
.h2{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 280px;
  color: #000;
}
// .tab_content2{
//   padding-top: 6px;
// }
.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 15px 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.tab,.tab2 {
  display: flex;
}
.fl_end{
  display: flex;
  justify-content: flex-end;
}
.tab{
  text-align: start;
  padding-left: 10px;
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
.icons {
  font-size: 14px;
  margin-right: 2px;
}
.active {
  color: #fff;
  border: 1px solid #2f8cf0;
  background: #2f8cf0;
}
.active2 {
  color: red;
  border: 1px solid red;
}

.h3{
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;
  color: #000;
  text-align: center;
  
}
.m_b{
  margin-bottom: 10px;
  position: relative;
  margin-top: 10px;
}
.m_t{
  margin-top: 10px;
}
.margin_r{
  margin-right: 10px;
}
.pie_list{
  display: flex;
  justify-content: space-between;

}
.pie_item{
  width: 49%;
  margin-top: 10px;
  color: #000;
}
.pie_title,.bar_title{
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.customer_bar_content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.customer_bar{
  width: 49%;
}
.flow_content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.flow_item{
  flex: 1;
}
.items{
  display: flex;
}
.items div{
  flex:1
}
.tab2{
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.tab_name{
  font-size: 14px;
  color: dodgerblue;
  margin-left: 5px;
  display: flex;
  align-items: center;
}
.c_title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.qiehuan{
  font-size: 14px;
}
.date_con{
  display: flex;
  align-items: center;
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
.x_title{
  position: absolute;
  right: 12%;
  top:20px;
}
.name{
  font-size: 14px;
  padding-left: 20px;
  font-weight: bold;
  color: #000;
}
.mr{
  margin-top: 10px;
}
.list3{
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.item3{
  width: 33%;
}
.t_c{
  text-align: center;
}
.per_list{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.per_item{
  flex:1
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
</style>
