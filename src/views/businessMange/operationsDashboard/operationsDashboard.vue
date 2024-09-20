<template>
  <div>
    <Card>
      <div class="content_title">
        <div class="h2">{{selected == '图表' ? '啊美雅线索&业绩运营看板'  : '啊美雅医美转化运营分析'}}</div>
      </div>
      <!-- tab切换 -->
      <div class="tab_content" >
        <div class="tab" v-if="selected == '图表'">
          <div
            class="tab_item"
            v-for="(item, index) in list5"
            :key="index"
            @click="selectTab4(index, item)"
            :class="{ active: selected4 == item}"
          >
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="tab" v-else></div>
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
          <Button type="primary" @click="getData">查询</Button>
        </div>
      </div>
      <!-- 业绩 -->
      <div v-if="selected == '图表'">
        <Card class="m_b ">
          <div class="name">线索</div>
          <item2 ref="item2" :params="params" :totalFlowRateAndDateSchedule="totalFlowRateAndDateSchedule" />
        </Card>
        <Card class="m_b ">
          <div class="name">业绩</div>
          <items :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule"/>
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
          <div class="h3">新老客业绩转化漏斗</div>
          <!-- <Tabs type="card" v-model="active"  style="width:100%" >
              <TabPane label="整体" name="whole">
                <div>
                  <funnel
                    :active="active"
                    ref="whole"
                    :params="params"
                  ></funnel>
                </div>
              </TabPane>
              <TabPane label="抖音" name="tiktok">
                <div>
                  <tiktok
                    :active="active"
                    ref="tiktok"
                    :params="params"
                  ></tiktok>
                </div>
              </TabPane>
              <TabPane label="视频号" name="vedio">
                <div>
                  <vedio
                    :active="active"
                    ref="vedio"
                    :params="params"
                  ></vedio>
                </div>
              </TabPane>
          </Tabs> -->
          <funnel
            :active="active"
            ref="whole"
            :params="params"
            :selected4="selected4"
            :liveAnchorBaseInfos="liveAnchorBaseInfos"
          ></funnel>
        </Card>

        <!-- 平台线索分析 -->
        <Card  class="m_b">
          <div class="h3">平台线索&业绩分析</div>
          <div class="pie_list">
            <Card  class="pie_item">
              <div class="pie_title">总线索分析</div>
              <pieItem2 :pieItemData="totalFlowRateByContentPlatForm" :pieItemData3="totalFlowRateByContentPlatFormTotalFlowRateNumber" selected="线索"/>
            </Card>
            <Card  class="pie_item">
              <div class="pie_title">总业绩分析</div>
              <pieItem :pieItemData="totalFlowRateByContentPlatFormAchievement" :pieItemData2="totalFlowRateByContentPlatFormAchievement2" selected="平台总业绩" />
            </Card>
          </div>
        </Card>
        <!-- 部门业绩分析 -->
        <Card  class="m_b">
          <div class="h3">部门线索&业绩分析</div>
          <div class="pie_list">
            
            <Card class="pie_item">
              <div class="pie_title">总线索分析</div>
              <pieItem :pieItemData="totalFlowRateByDepartment" :pieItemData3="totalFlowRateByDepartmentTotalFlowRateNumber" selected="线索" />
            </Card>
            <Card class="pie_item">
              <div class="pie_title">总业绩分析</div>
              <pieItem :pieItemData="totalBelongChannelPerformance" :pieItemData2="totalBelongChannelPerformance2" selected="业绩" title="部门业绩分析"/>
            </Card>
          </div>
        </Card>
        <!-- 新老客业绩分析 -->
        <Card  class="m_b">
          <div class="h3">新老客成交量&业绩分析</div>
          <div class="pie_list">
            <Card class="pie_item">
              <div class="pie_title">成交量占比</div>
              <pieItem :pieItemData="totalNewOrOldCustomerNumAchievement" :pieItemData3="totalNewOrOldCustomerNumAchievement2" selected="线索" title="有效潜在"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">总业绩分析</div>
              <pieItem :pieItemData="totalPerformancePie" :pieItemData2="totalPerformancePie2" selected="业绩" />
            </Card>
          </div>
        </Card>
        <!-- 有效潜在业绩分析 -->
        <Card  class="m_b">
          <div class="h3">有效/潜在线索&业绩分析</div>
          <div class="pie_list">
            <Card class="pie_item">
              <div class="pie_title">总线索分析</div>
              <pieItem :pieItemData="totalFlowRateByIsEffictive" :pieItemData3="totalFlowRateByIsEffictiveTotalFlowRateNumber" selected="线索" title="有效潜在"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">总业绩分析</div>
              <pieItem :pieItemData="totalIsEffictivePerformance" :pieItemData2="totalIsEffictivePerformance2" selected="业绩" />
            </Card>
          </div>
        </Card>
        <!-- 当月历史业绩分析 -->
        <Card  class="m_b">
          <div class="h3">当月/历史派单量&业绩分析</div>
          <div class="pie_list">
            <Card class="pie_item">
              <div class="pie_title">派单量占比</div>
              <pieItem :pieItemData="totalIsHistoryPerformanceNumAchievement" :pieItemData3="totalIsHistoryPerformanceNumAchievement2" selected="线索"  title="有效潜在"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">总业绩分析</div>
              <pieItem :pieItemData="totalIsHistoryPerformance" :pieItemData2="totalIsHistoryPerformance2" selected="业绩" />
            </Card>
          </div>
        </Card>
        <!-- 助理 -->
        <Card  class="m_b ">
          <!-- 平台切换 -->
          <div class="tab" >
            <div
              class="tab_item"
              v-for="(item, index) in platformList2"
              :key="index"
              @click="checkTab2(index, item)"
              :class="{ active2: item.isSelected }"
            >
              <i class="iconfont  icons" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="customer_bar_content">
            <Card class="customer_bar">
              <div class="h3">助理线索分析</div>
              <div class="x_title">
                <div>总分诊：{{CustomerFlowRateByEmployeeAndHospital.totalDistributeConsulationByEmployee}}</div>
                <div>总派单：{{CustomerFlowRateByEmployeeAndHospital.totalSendOrderByEmployee}}</div>
                <div>总上门：{{CustomerFlowRateByEmployeeAndHospital.totalVisitByEmployee}}</div>
              </div>
              <customerAndHospital :CustomerFlowRateByEmployeeAndHospital="CustomerFlowRateByEmployeeAndHospital.employeeFlowRate" title="助理"/>
            </Card>
            <Card class="customer_bar">
              <div class="h3">助理业绩分析</div>
              <barItem :barItemData="customerObj"/>
            </Card>
          </div>
          <!-- 机构 -->
          <div class="customer_bar_content mr">
            <Card class="customer_bar">
              <div class="h3">机构线索分析</div>
              <div class="x_title">
                <div>总派单：{{CustomerFlowRateByEmployeeAndHospital.totalSendOrderByHospital}}</div>
                <div>总上门：{{CustomerFlowRateByEmployeeAndHospital.totalVisitByHospital}}</div>
                <div>总成交：{{CustomerFlowRateByEmployeeAndHospital.totalDealByHospital}}</div>
              </div>
              <customerAndHospital :CustomerFlowRateByEmployeeAndHospital="CustomerFlowRateByEmployeeAndHospital.hospitalFlowRate" title="机构"/>
            </Card>
            <Card class="customer_bar">
              <div class="h3">机构业绩分析</div>
              <barItem :barItemData="hospitalObj"/>
            </Card>
          </div>
        </Card>
        
      </div>
     
      <!-- 转化 -->
      <div v-else-if="selected == '转化'">
        <!-- 平台切换 -->
        <div class="tab2" >
          <div
            class="tab_item"
            v-for="(item, index) in platformList"
            :key="index"
            @click="checkTab(index, item)"
            :class="{ active2: item.isSelected }"
          >
            <i class="iconfont  icons" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </div>
        </div>
        <!-- 主播筛选 -->
          <div class="tab_content2">
              <div class="tab">
                <div
                  class="tab_item"
                  v-for="(item, index) in list5"
                  :key="index"
                  @click="selectTab5(index, item)"
                  :class="{ active: selected5 == item}"
                >
                  <span>{{ item }}</span>
                </div>
              </div>
          </div>
        
        <div >
          <!-- 线索转化和客户转化情况-->
          <trafficConversionTable :params="params" :platformList="platformList" :liveAnchorBaseInfos="liveAnchorBaseInfos" ref="trafficConversionTable" :selected="selected5"/>
          <!-- 线索转化和客户转化情况-助理 -->
          <assistantTable :params="params" :platformList="platformList" :liveAnchorBaseInfos="liveAnchorBaseInfos" ref="assistantTable" :selected="selected5"/>
          <!-- 助理业绩目标达成情况 -->
          <assistantTargetCompleteDataTable :params="params" :platformList="platformList" :liveAnchorBaseInfos="liveAnchorBaseInfos" ref="assistantTargetCompleteDataTable" :selected="selected5"/>
          <!-- 机构转化情况 -->
          <hospitalTable :params="params" :platformList="platformList" ref="hospitalTable"/>
        </div>
      </div>
      <!-- 详情 -->
      <detail :detailModel.sync="detailModel" :detailFlowBarItemData="detailFlowBarItemData" :title="titles"/>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as healthValueApi from "@/api/healthValue";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";

import items from "./components/item.vue"
import item2 from "./components/item2.vue"
import monthLine from "./components/monthLine.vue"
import monthLine2 from "./components/monthLine2.vue"
import pieItem from "./components/pieItem.vue"
import pieItem2 from "./components/pieItem.vue"
import barItem from "./components/barItem.vue"
import flowBarItem from "./components/3dBarItem.vue"
import trafficConversionTable from "./components/trafficConversionTable.vue"
import assistantTable from "./components/assistantTable.vue"
import assistantTargetCompleteDataTable from "./components/assistantTargetCompleteDataTable.vue"
import hospitalTable from "./components/hospitalTable.vue"
import detail from "./components/detail.vue"
import customerAndHospital from "./components/customerAndHospital.vue"
import funnel from "./components/funnel.vue"
import tiktok from "./components/tiktok.vue"
import vedio from "./components/vedio.vue"

export default {
  components:{
    items,
    item2,
    monthLine,
    monthLine2,
    pieItem,
    pieItem2,
    barItem,
    flowBarItem,
    trafficConversionTable,
    assistantTable,
    hospitalTable,
    detail,
    customerAndHospital,
    funnel,
    tiktok,
    vedio,
    assistantTargetCompleteDataTable
  },
  data() {
    return {
      active:'whole',
      completeRate:0,
      params:{
        // 当年
        // startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 平台
        contentPalteForms:[],
        // 流量转化线索有效率健康值
        ClueEffectiveRate:'',
          // 流量转化加v率健康值
        FlowTransformAddWeChatRate:'',
          // 流量转化派单率健康值
        FlowTransformSendOrderRate:'',
        // 流量转化上门率健康值
        FlowTransformToHospitalRate:'',
          // 客户转化成交率健康值
        CustomerTransformDealRate:'',
          // 助理流量转化加V率健康值
        AssistantFlowTransformAddWechatRate:'',
          // 助理流量转化上门率健康值
        AssistantFlowTransformToHospitalRate:'',
          // 助理客户转化成交率健康值
        AssistantCustomerFlowTransformDealRate:'',
        // 助理流量转化派单率健康值
        AssistantFlowTransformSendOrderRate:''
      },
      list: ["图表","转化"],
      list2: ["线索","业绩"],
      list4: ["全部","刀刀","吉娜"],
      list5: ["全部","刀刀","吉娜",'璐璐'],
      selected:"图表",
      selected2:"业绩",
      selected3:"线索",
      selected4:"全部",
      selected5:"全部",
      //详情 平台id
      platformId:'',
      // 业绩趋势
      totalAchievementAndDateSchedule:{},
      // 新客业绩
      newCustomer:{},
      // 老客业绩
      oldCustomer:{},
      // 总业绩
      totalCustomer:{},
      // 饼图数据
      pieItemData:[],
      // 3d线索分析数据
      flowBarItemData:{},
      // 总业绩饼图
      totalPerformancePie:[],
      // 刀刀组饼图
      daodaoTotalPerformancePie:[],
      // 吉娜组饼图
      jinaTotalPerformancePie:[],
      // 总业绩饼图
      totalPerformancePie2:{},
      // 刀刀组饼图
      daodaoTotalPerformancePie2:{},
      // 吉娜组饼图
      jinaTotalPerformancePie2:{},

      // 业绩部门
      // 总业绩饼图
      totalBelongChannelPerformance:[],
      // 刀刀组饼图
      groupDaoDaoBelongChannelPerformance:[],
      // 吉娜组饼图
      groupJiNaBelongChannelPerformance:[],
      // 总业绩饼图
      totalBelongChannelPerformance2:{},
      // 刀刀组饼图
      groupDaoDaoBelongChannelPerformance2:{},
      // 吉娜组饼图
      groupJiNaBelongChannelPerformance2:{},

      // 业绩有效潜在
      // 总业绩饼图
      totalIsEffictivePerformance:[],
      // 刀刀组饼图
      groupDaoDaoIsEffictivePerformance:[],
      // 吉娜组饼图
      groupJiNaIsEffictivePerformance:[],
      // 总业绩饼图
      totalIsEffictivePerformance2:{},
      // 刀刀组饼图
      groupDaoDaoIsEffictivePerformance2:{},
      // 吉娜组饼图
      groupJiNaIsEffictivePerformance2:{},

      // 业绩当月历史
      // 总业绩饼图
      totalIsHistoryPerformance:[],
      // 刀刀组饼图
      groupDaoDaoIsHistoryPerformance:[],
      // 吉娜组饼图
      groupJiNaIsHistoryPerformance:[],
      // 总业绩饼图
      totalIsHistoryPerformance2:{},
      // 刀刀组饼图
      groupDaoDaoIsHistoryPerformance2:{},
      // 吉娜组饼图
      groupJiNaIsHistoryPerformance2:{},

      // 助理业绩对比图
      customerObj:[],
      // 机构业绩对比图
      hospitalObj:[],
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
      // 详情model
      detailModel:false,
      titles:"",
      // 线索
      totalFlowRateAndDateSchedule:{},
      // 平台线索分析
      totalFlowRateByContentPlatForm:[],
      groupDaoDaoFlowRateByContentPlatForm:[],
      groupJiNaFlowRateByContentPlatForm:[],
      // 直播前中后线索分析
      totalFlowRateByDepartment:[],
      groupDaoDaoFlowRateByDepartment:[],
      groupJiNaFlowRateByDepartment:[],
      // 分组线索分析
      totalFlowRate:[],
      groupDaoDaoFlowRate:[],
      groupJiNaFlowRate:[],
      //有效潜在线索分析
      totalFlowRateByIsEffictive:[],
      groupDaoDaoFlowRateByIsEffictive:[],
      groupJiNaFlowRateByIsEffictive:[],

      // 饼图分组
      groupFlowRateCompare:{},
      // 详情
      detailFlowBarItemData:[],
      // 主播基础
      liveAnchorBaseInfos:[],
      // 线索 助理和机构
      CustomerFlowRateByEmployeeAndHospital:{},
      // 业绩饼图数据
      NewOrOldCustomerCompare:{},
      totalFlowRateByContentPlatFormTotalFlowRateNumber : 0,
      totalFlowRateByDepartmentTotalFlowRateNumber : 0,
      totalFlowRateByIsEffictiveTotalFlowRateNumber : 0,
      // 平台业绩
      totalFlowRateByContentPlatFormAchievement:[],
      totalFlowRateByContentPlatFormAchievement2:{},
      // 新老客 总业绩
      totalNewOrOldCustomerNumAchievement:[],
      totalNewOrOldCustomerNumAchievement2:0,
      // 当月历史 总业绩
      totalIsHistoryPerformanceNumAchievement:[],
      totalIsHistoryPerformanceNumAchievement2:0
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
    checkTab(index, value) {
      this.platformList[index].isSelected = !this.platformList[index].isSelected;
      this.getData()
    },
    checkTab2(index, value) {
      this.platformList2[index].isSelected = !this.platformList2[index].isSelected;
      this.getCustomerFlowRateByEmployeeAndHospital()
    },
    selectTab(index, value) {
      this.selected = value
      // this.list[index].isSelected = !this.list[index].isSelected;
      this.getData()
    },
    // 线索板块折线图切换
    selectTab2(index, value) {
      this.selected2 = value
      this.getTotalFlowRateAndDateSchedule()
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
      // this.list[index].isSelected = !this.list[index].isSelected;
      this.getTotalFlowRateAndDateSchedule()
      this.getTotalAchievementAndDateSchedule()
      this.getGroupFlowRateCompare()
      this.getNewOrOldCustomerCompare()
      this.$nextTick(()=>{

        this.$refs.whole.getPerformanceOperationData()
      })
    },
    // 转化板块 主播筛选
    selectTab5(index,value){
      this.selected5 = value
      this.$nextTick(()=>{
          this.$refs.trafficConversionTable.getCompanyTransformData();
          this.$refs.assistantTable.getAssistantTransformData();
          this.$refs.assistantTargetCompleteDataTable.getassistantTargetCompleteData();
        })
    },
    getData() {
      const {startDate,endDate} = this.params
      if (!startDate || !endDate) {
        this.$Message.warning("请选择日期！");
        return;
      }
      this.getTimeSpanClick()
      if(this.selected == '图表'){
        this.getNewOrOldCustomerCompare();
        this.getNewOrOldCustomerCompareByEmployeeAndHospital();
        this.getTotalAchievementAndDateSchedule();
        this.getTotalFlowRateAndDateSchedule();
        this.getGroupFlowRateCompare();
        this.getFlowRateByContentPlatform();
        this.getCustomerFlowRateByEmployeeAndHospital()
        this.$nextTick(()=>{
          
          if(this.active == 'whole'){
            this.$refs.whole.getPerformanceOperationData()
          }else if(this.active == 'tiktok'){
            this.$refs.tiktok.getPerformanceOperationData()
          }else if(this.active == 'vedio'){
            this.$refs.vedio.getPerformanceOperationData()
          }
        })
        
      }else if(this.selected == '转化'){
        this.$nextTick(()=>{
          this.$refs.trafficConversionTable.getCompanyTransformData();
          this.$refs.assistantTable.getAssistantTransformData();
          this.$refs.assistantTargetCompleteDataTable.getassistantTargetCompleteData();
          this.$refs.hospitalTable.getData();
        })
      }
    },
    // 获取业绩数据和折线图数据
    getTotalAchievementAndDateSchedule() {
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        keyWord:this.selected4 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected4 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id : this.selected4 == '璐璐' ? this.liveAnchorBaseInfos.find(item=>item.name == '璐璐').id :  ''
      };
      api.getTotalAchievementAndDateSchedule(data).then((res) => {
        if (res.code == 0) {
          this.totalAchievementAndDateSchedule = res.data.data;
        }
      });
    },
    // 根据条件获取新老客业绩占比（分组）
    getNewOrOldCustomerCompare() {
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        keyWord:this.selected4 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected4 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id : this.selected4 == '璐璐' ? this.liveAnchorBaseInfos.find(item=>item.name == '璐璐').id :  ''
      };
      api.getNewOrOldCustomerCompare(data).then((res) => {
        if (res.code == 0) {
          const {totalNewOrOldCustomer,groupDaoDaoNewOrOldCustomer,groupJiNaNewOrOldCustomer,totalBelongChannelPerformance,groupDaoDaoBelongChannelPerformance,groupJiNaBelongChannelPerformance,totalIsEffictivePerformance,groupDaoDaoIsEffictivePerformance,groupJiNaIsEffictivePerformance,totalIsHistoryPerformance,groupDaoDaoIsHistoryPerformance,groupJiNaIsHistoryPerformance,totalFlowRateByContentPlatForm,totalNewOrOldCustomerNum,totalIsHistoryPerformanceNum} = res.data.data
          // 平台业绩
          this.totalFlowRateByContentPlatFormAchievement =  totalFlowRateByContentPlatForm ? [
            {value:totalFlowRateByContentPlatForm.douYinNumber,name:'抖音',rate:totalFlowRateByContentPlatForm.douYinRate},
            {value:totalFlowRateByContentPlatForm.videoNumberNumber,name:'视频号',rate:totalFlowRateByContentPlatForm.videoNumberRate},
            {value:totalFlowRateByContentPlatForm.xiaoHongShuNumber,name:'小红书',rate:totalFlowRateByContentPlatForm.xiaoHongShuRate},
            {value:totalFlowRateByContentPlatForm.privateDataNumber,name:'私域',rate:totalFlowRateByContentPlatForm.privateDataRate},
          ] : []
          this.totalFlowRateByContentPlatFormAchievement2 = totalFlowRateByContentPlatForm
          // 新老客业绩 总业绩
          this.totalNewOrOldCustomerNumAchievement = [
            {value:totalNewOrOldCustomerNum.totalPerformanceNewCustomerNumber,name:'新客',rate:totalNewOrOldCustomerNum.totalPerformanceNewCustomerRate},
            {value:totalNewOrOldCustomerNum.totalPerformanceOldCustomerNumber,name:'老客',rate:totalNewOrOldCustomerNum.totalPerformanceOldCustomerRate},
          ]
          this.totalNewOrOldCustomerNumAchievement2 = totalNewOrOldCustomerNum.totalPerformanceNumber
          // 当月/历史 总业绩
          this.totalIsHistoryPerformanceNumAchievement = [
            {value:totalIsHistoryPerformanceNum.thisMonthPerformanceNumber,name:'当月',rate:totalIsHistoryPerformanceNum.thisMonthPerformanceRate},
            {value:totalIsHistoryPerformanceNum.historyPerformanceNumber,name:'历史',rate:totalIsHistoryPerformanceNum.historyPerformanceRate},
          ]
          this.totalIsHistoryPerformanceNumAchievement2=totalIsHistoryPerformanceNum.totalPerformanceNumber

          // 新老客业绩占比
          this.totalPerformancePie = [
            {value:totalNewOrOldCustomer.totalPerformanceNewCustomerNumber,name:'新客',rate:totalNewOrOldCustomer.totalPerformanceNewCustomerRate},
            {value:totalNewOrOldCustomer.totalPerformanceOldCustomerNumber,name:'老客',rate:totalNewOrOldCustomer.totalPerformanceOldCustomerRate},
          ]
          this.daodaoTotalPerformancePie = [
            {value:groupDaoDaoNewOrOldCustomer.totalPerformanceNewCustomerNumber,name:'新客',rate:groupDaoDaoNewOrOldCustomer.totalPerformanceNewCustomerRate},{value:groupDaoDaoNewOrOldCustomer.totalPerformanceOldCustomerNumber,name:'老客',rate:groupDaoDaoNewOrOldCustomer.totalPerformanceOldCustomerRate},
          ]
          this.jinaTotalPerformancePie = [
            {value:groupJiNaNewOrOldCustomer.totalPerformanceNewCustomerNumber,name:'新客',rate:groupJiNaNewOrOldCustomer.totalPerformanceNewCustomerRate},{value:groupJiNaNewOrOldCustomer.totalPerformanceOldCustomerNumber,name:'老客',rate:groupJiNaNewOrOldCustomer.totalPerformanceOldCustomerRate},
          ]
          this.totalPerformancePie2 = totalNewOrOldCustomer
          this.daodaoTotalPerformancePie2 = groupDaoDaoNewOrOldCustomer
          this.jinaTotalPerformancePie2 = groupJiNaNewOrOldCustomer
          // 部门业绩占比
          this.totalBelongChannelPerformance = [
            {value:totalBelongChannelPerformance.beforeLivingNumber,name:'直播前',rate:totalBelongChannelPerformance.beforeLivingRate},
            {value:totalBelongChannelPerformance.livingNumber,name:'直播中',rate:totalBelongChannelPerformance.livingRate},
            {value:totalBelongChannelPerformance.afterLivingNumber,name:'直播后',rate:totalBelongChannelPerformance.afterLivingRate},
            {value:totalBelongChannelPerformance.otherNumber,name:'其他',rate:totalBelongChannelPerformance.otherRate},
          ]
          this.groupDaoDaoBelongChannelPerformance = [
            {value:groupDaoDaoBelongChannelPerformance.beforeLivingNumber,name:'直播前',rate:groupDaoDaoBelongChannelPerformance.beforeLivingRate},
            {value:groupDaoDaoBelongChannelPerformance.livingNumber,name:'直播中',rate:groupDaoDaoBelongChannelPerformance.livingRate},
            {value:groupDaoDaoBelongChannelPerformance.afterLivingNumber,name:'直播后',rate:groupDaoDaoBelongChannelPerformance.afterLivingRate},
            {value:groupDaoDaoBelongChannelPerformance.otherNumber,name:'其他',rate:groupDaoDaoBelongChannelPerformance.otherRate},
          ]
          this.groupJiNaBelongChannelPerformance = [
            {value:groupJiNaBelongChannelPerformance.beforeLivingNumber,name:'直播前',rate:groupJiNaBelongChannelPerformance.beforeLivingRate},
            {value:groupJiNaBelongChannelPerformance.livingNumber,name:'直播中',rate:groupJiNaBelongChannelPerformance.livingRate},
            {value:groupJiNaBelongChannelPerformance.afterLivingNumber,name:'直播后',rate:groupJiNaBelongChannelPerformance.afterLivingRate},
            {value:groupJiNaBelongChannelPerformance.otherNumber,name:'其他',rate:groupJiNaBelongChannelPerformance.otherRate},
          ]
          this.totalBelongChannelPerformance2 = totalBelongChannelPerformance
          this.groupDaoDaoBelongChannelPerformance2 = groupDaoDaoBelongChannelPerformance
          this.groupJiNaBelongChannelPerformance2 = groupJiNaBelongChannelPerformance

          // 有效潜在
          this.totalIsEffictivePerformance = [
            {value:totalIsEffictivePerformance.effictivePerformanceNumber,name:'有效',rate:totalIsEffictivePerformance.effictivePerformanceRate},
            {value:totalIsEffictivePerformance.notEffictivePerformanceNumber,name:'潜在',rate:totalIsEffictivePerformance.notEffictivePerformanceRate},
          ]
          this.groupDaoDaoIsEffictivePerformance = [
            {value:groupDaoDaoIsEffictivePerformance.effictivePerformanceNumber,name:'有效',rate:groupDaoDaoIsEffictivePerformance.effictivePerformanceRate},
            {value:groupDaoDaoIsEffictivePerformance.notEffictivePerformanceNumber,name:'潜在',rate:groupDaoDaoIsEffictivePerformance.notEffictivePerformanceRate},
          ]
          this.groupJiNaIsEffictivePerformance = [
            {value:groupJiNaIsEffictivePerformance.effictivePerformanceNumber,name:'有效',rate:groupJiNaIsEffictivePerformance.effictivePerformanceRate},
            {value:groupJiNaIsEffictivePerformance.notEffictivePerformanceNumber,name:'潜在',rate:groupJiNaIsEffictivePerformance.notEffictivePerformanceRate},
          ]
          this.totalIsEffictivePerformance2 = totalIsEffictivePerformance
          this.groupDaoDaoIsEffictivePerformance2 = groupDaoDaoIsEffictivePerformance
          this.groupJiNaIsEffictivePerformance2 = groupJiNaIsEffictivePerformance

          // 当月/历史占比
          this.totalIsHistoryPerformance = [
            {value:totalIsHistoryPerformance.thisMonthPerformanceNumber,name:'当月',rate:totalIsHistoryPerformance.thisMonthPerformanceRate},
            {value:totalIsHistoryPerformance.historyPerformanceNumber,name:'历史',rate:totalIsHistoryPerformance.historyPerformanceRate},
          ]
          this.groupDaoDaoIsHistoryPerformance = [
            {value:groupDaoDaoIsHistoryPerformance.thisMonthPerformanceNumber,name:'当月',rate:groupDaoDaoIsHistoryPerformance.thisMonthPerformanceRate},
            {value:groupDaoDaoIsHistoryPerformance.historyPerformanceNumber,name:'历史',rate:groupDaoDaoIsHistoryPerformance.historyPerformanceRate},
          ]
          this.groupJiNaIsHistoryPerformance = [
            {value:groupJiNaIsHistoryPerformance.thisMonthPerformanceNumber,name:'当月',rate:groupJiNaIsHistoryPerformance.thisMonthPerformanceRate},
            {value:groupJiNaIsHistoryPerformance.historyPerformanceNumber,name:'历史',rate:groupJiNaIsHistoryPerformance.historyPerformanceRate},
          ]
          this.totalIsHistoryPerformance2 = totalIsHistoryPerformance
          this.groupDaoDaoIsHistoryPerformance2 = groupDaoDaoIsHistoryPerformance
          this.groupJiNaIsHistoryPerformance2 = groupJiNaIsHistoryPerformance
          
        
        }
      });
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
          // data.map(item=>{
          //   if(item.code == 'employee'){
          //     this.customerObj = item
          //   }else if(item.code == 'hospital'){
          //     this.hospitalObj = item
          //   }
          // })
          // this.totalAchievementAndDateSchedule = res.data.data;
          // this.totalAchievementAndDateSchedule = res.data.data;
         
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
        keyWord:this.selected4 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected4 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id : this.selected4 == '璐璐' ? this.liveAnchorBaseInfos.find(item=>item.name == '璐璐').id :  ''
      };
      api.getTotalFlowRateAndDateSchedule(data).then((res) => {
        if (res.code == 0) {
          this.totalFlowRateAndDateSchedule = res.data.data
        }
      });
    },
    // 根据条件获取线索分析占比（分组）
    getGroupFlowRateCompare(){
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        keyWord:this.selected4 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected4 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id : this.selected4 == '璐璐' ? this.liveAnchorBaseInfos.find(item=>item.name == '璐璐').id :  ''
      };
      api.getGroupFlowRateCompare(data).then((res) => {
        if (res.code == 0) {
          const {totalFlowRateByContentPlatForm,groupDaoDaoFlowRateByContentPlatForm,groupJiNaFlowRateByContentPlatForm,totalFlowRateByDepartment,groupDaoDaoFlowRateByDepartment,groupJiNaFlowRateByDepartment,totalFlowRate,groupDaoDaoFlowRate,groupJiNaFlowRate,totalFlowRateByIsEffictive,groupDaoDaoFlowRateByIsEffictive,groupJiNaFlowRateByIsEffictive} = res.data.data
          this.totalFlowRateByContentPlatFormTotalFlowRateNumber = totalFlowRateByContentPlatForm.totalFlowRateNumber
          this.totalFlowRateByDepartmentTotalFlowRateNumber = totalFlowRateByDepartment.totalFlowRateNumber
          this.totalFlowRateByIsEffictiveTotalFlowRateNumber = totalFlowRateByIsEffictive.totalFlowRateNumber
          // 平台线索分析
          this.totalFlowRateByContentPlatForm =  totalFlowRateByContentPlatForm ? [
            {value:totalFlowRateByContentPlatForm.douYinNumber,name:'抖音',rate:totalFlowRateByContentPlatForm.douYinRate},
            {value:totalFlowRateByContentPlatForm.videoNumberNumber,name:'视频号',rate:totalFlowRateByContentPlatForm.videoNumberRate},
            {value:totalFlowRateByContentPlatForm.xiaoHongShuNumber,name:'小红书',rate:totalFlowRateByContentPlatForm.xiaoHongShuRate},
            {value:totalFlowRateByContentPlatForm.privateDataNumber,name:'私域',rate:totalFlowRateByContentPlatForm.privateDataRate},
          ] : []

          this.groupDaoDaoFlowRateByContentPlatForm = groupDaoDaoFlowRateByContentPlatForm ? [
            {value:groupDaoDaoFlowRateByContentPlatForm.douYinNumber,name:'抖音',rate:groupDaoDaoFlowRateByContentPlatForm.douYinRate},
            {value:groupDaoDaoFlowRateByContentPlatForm.videoNumberNumber,name:'视频号',rate:groupDaoDaoFlowRateByContentPlatForm.videoNumberRate},
            {value:groupDaoDaoFlowRateByContentPlatForm.xiaoHongShuNumber,name:'小红书',rate:groupDaoDaoFlowRateByContentPlatForm.xiaoHongShuRate},
            {value:groupDaoDaoFlowRateByContentPlatForm.privateDataNumber,name:'私域',rate:groupDaoDaoFlowRateByContentPlatForm.privateDataRate},
          ] : []
          this.groupJiNaFlowRateByContentPlatForm = groupJiNaFlowRateByContentPlatForm ? [
            {value:groupJiNaFlowRateByContentPlatForm.douYinNumber,name:'抖音',rate:groupJiNaFlowRateByContentPlatForm.douYinRate},
            {value:groupJiNaFlowRateByContentPlatForm.videoNumberNumber,name:'视频号',rate:groupJiNaFlowRateByContentPlatForm.videoNumberRate},
            {value:groupJiNaFlowRateByContentPlatForm.xiaoHongShuNumber,name:'小红书',rate:groupJiNaFlowRateByContentPlatForm.xiaoHongShuRate},
            {value:groupJiNaFlowRateByContentPlatForm.privateDataNumber,name:'私域',rate:groupJiNaFlowRateByContentPlatForm.privateDataRate},
          ]:[]

          // // 部门线索分析
          this.totalFlowRateByDepartment = totalFlowRateByDepartment ?  [
            {value:totalFlowRateByDepartment.beforeLivingNumber,name:'直播前',rate:totalFlowRateByDepartment.beforeLivingRate},
            {value:totalFlowRateByDepartment.livingNumber,name:'直播中',rate:totalFlowRateByDepartment.livingRate},
            {value:totalFlowRateByDepartment.afterLivingNumber,name:'直播后',rate:totalFlowRateByDepartment.aftereLivingRate},
            {value:totalFlowRateByDepartment.otherNumber,name:'其他',rate:totalFlowRateByDepartment.otherRate},
          ] : []
          this.groupDaoDaoFlowRateByDepartment = groupDaoDaoFlowRateByDepartment ? [
            {value:groupDaoDaoFlowRateByDepartment.beforeLivingNumber,name:'直播前',rate:groupDaoDaoFlowRateByDepartment.beforeLivingRate},
            {value:groupDaoDaoFlowRateByDepartment.livingNumber,name:'直播中',rate:groupDaoDaoFlowRateByDepartment.livingRate},
            {value:groupDaoDaoFlowRateByDepartment.afterLivingNumber,name:'直播后',rate:groupDaoDaoFlowRateByDepartment.aftereLivingRate},
            {value:groupDaoDaoFlowRateByDepartment.otherNumber,name:'其他',rate:groupDaoDaoFlowRateByDepartment.otherRate},
          ] : []
          this.groupJiNaFlowRateByDepartment = groupJiNaFlowRateByDepartment ? [
            {value:groupJiNaFlowRateByDepartment.beforeLivingNumber,name:'直播前',rate:groupJiNaFlowRateByDepartment.beforeLivingRate},
            {value:groupJiNaFlowRateByDepartment.livingNumber,name:'直播中',rate:groupJiNaFlowRateByDepartment.livingRate},
            {value:groupJiNaFlowRateByDepartment.afterLivingNumber,name:'直播后',rate:groupJiNaFlowRateByDepartment.aftereLivingRate},
            {value:groupJiNaFlowRateByDepartment.otherNumber,name:'其他',rate:groupJiNaFlowRateByDepartment.otherRate},
          ] : []

          // 分组线索分析
          this.totalFlowRate =  [
            {value:totalFlowRate,name:'总线索',rate:100},
          ]
          this.groupDaoDaoFlowRate =  [
            {value:groupDaoDaoFlowRate,name:'刀刀组',rate:100},
          ]
          this.groupJiNaFlowRate =  [
            {value:groupJiNaFlowRate,name:'吉娜组',rate:100},
          ]

          // 有效潜在线索分析
          this.totalFlowRateByIsEffictive =  totalFlowRateByIsEffictive ? [
            {value:totalFlowRateByIsEffictive.effictiveNumber,name:'有效',rate:totalFlowRateByIsEffictive.effictiveRate},
            {value:totalFlowRateByIsEffictive.notEffictiveNumber,name:'潜在',rate:totalFlowRateByIsEffictive.notEffictiveRate},
          ] : []
          this.groupDaoDaoFlowRateByIsEffictive = totalFlowRateByIsEffictive ? [
            {value:groupDaoDaoFlowRateByIsEffictive.effictiveNumber,name:'有效',rate:groupDaoDaoFlowRateByIsEffictive.effictiveRate},
            {value:groupDaoDaoFlowRateByIsEffictive.notEffictiveNumber,name:'潜在',rate:groupDaoDaoFlowRateByIsEffictive.notEffictiveRate},
          ]:[]
          this.groupJiNaFlowRateByIsEffictive = totalFlowRateByIsEffictive ? [
            {value:groupJiNaFlowRateByIsEffictive.effictiveNumber,name:'有效',rate:groupJiNaFlowRateByIsEffictive.effictiveRate},
            {value:groupJiNaFlowRateByIsEffictive.notEffictiveNumber,name:'潜在',rate:groupJiNaFlowRateByIsEffictive.notEffictiveRate},
          ]:[]
        }
      });
    },
    // 根据条件获取平台线索分析
    getFlowRateByContentPlatform(){
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
      api.getFlowRateByContentPlatform(data).then((res) => {
        if (res.code == 0) {
            const {
              douYinFolwRateAnalize,
              videoNumberFolwRateAnalize,
              xiaoHongShuFolwRateAnalize,
              privateDataFolwRateAnalize,
            } = res.data.data;
          let colorList=[
            {color: '#5DC6D6'},
            {color: '#A0A8F5'},
            {color: '#D091FA'},
            {color: '#F69655'}

          ]
          for(var i=0;i<douYinFolwRateAnalize.length;i++){
            douYinFolwRateAnalize[i]['itemStyle'] =colorList[i]
            douYinFolwRateAnalize[i]['value'] =douYinFolwRateAnalize[i].rate
          }
          for(var i=0;i<videoNumberFolwRateAnalize.length;i++){
            videoNumberFolwRateAnalize[i]['itemStyle'] =colorList[i]
            videoNumberFolwRateAnalize[i]['value'] =videoNumberFolwRateAnalize[i].rate

          }
          for(var i=0;i<xiaoHongShuFolwRateAnalize.length;i++){
            xiaoHongShuFolwRateAnalize[i]['itemStyle'] =colorList[i]
            xiaoHongShuFolwRateAnalize[i]['value'] =xiaoHongShuFolwRateAnalize[i].rate
          }
          for(var i=0;i<privateDataFolwRateAnalize.length;i++){
            privateDataFolwRateAnalize[i]['itemStyle'] =colorList[i]
            privateDataFolwRateAnalize[i]['value'] =privateDataFolwRateAnalize[i].rate
          }
          this.flowBarItemData = {
            douYinFolwRateAnalize:douYinFolwRateAnalize,
            videoNumberFolwRateAnalize:videoNumberFolwRateAnalize,
            xiaoHongShuFolwRateAnalize:xiaoHongShuFolwRateAnalize,
            privateDataFolwRateAnalize:privateDataFolwRateAnalize,
          }
            
        }
      });
    },
    // 根据平台获取详细线索分析
    getFlowRateDetailsByContentPlatform(value){
      this.titles=value
      const {startDate,endDate} = this.params
      if(this.titles == '抖音线索详情'){
        this.platformId = this.params.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id
      }else if(this.titles == '视频号线索详情'){
        this.platformId = this.params.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id
      }else if(this.titles == '小红书线索详情'){
        this.platformId = this.params.contentPalteForms.find(item=>item.contentPlatformName == '小红书').id
      }else if(this.titles == '私域线索详情'){
        this.platformId = this.params.contentPalteForms.find(item=>item.contentPlatformName == '私域').id
      }
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        keyword:this.platformId
      };
      api.getFlowRateDetailsByContentPlatform(data).then((res) => {
        if (res.code == 0) {
          // this.flowBarItemData = res.data.data
          const {
              folwRateDetailsAnalize
            } = res.data.data;
          let colorList=[
            {color: '#5DC6D6'},
            {color: '#A0A8F5'},
            {color: '#D091FA'},
            {color: '#F69655'},
            {color: '#Ebb974'},
            {color: '#e1e767'},
            {color: '#8fe35a'},
            {color: '#eb9eca'},
            {color: '#ed828a'},
          ]
          for(var i=0;i<folwRateDetailsAnalize.length;i++){
            folwRateDetailsAnalize[i]['itemStyle'] =colorList[i]
            folwRateDetailsAnalize[i]['value'] =folwRateDetailsAnalize[i].rate
          }
         
          this.detailFlowBarItemData = folwRateDetailsAnalize
          if(!folwRateDetailsAnalize || folwRateDetailsAnalize.length  == 0){
            this.$Message.warning("暂无数据！");
            return
          }
          this.detailModel = true
        }
      });
    },
    // 获取当月获客情况数据
    getHealthValueLists() {
      healthValueApi.getHealthValid().then((res) => {
        if (res.code == 0) {
          const {list} = res.data
          // 流量转化线索有效率健康值
          this.params.ClueEffectiveRate = list.find(item=>item.id == 'ClueEffectiveRate').rate
          // 流量转化加v率健康值
          this.params.FlowTransformAddWeChatRate = list.find(item=>item.id == 'FlowTransformAdd WeChatRate').rate
          // 流量转化派单率健康值
          this.params.FlowTransformSendOrderRate = list.find(item=>item.id == 'FlowTransformSendOrderRate').rate
           // 流量转化上门率健康值
          this.params.FlowTransformToHospitalRate = list.find(item=>item.id == 'FlowTransformToHospitalRate').rate
          // 客户转化成交率健康值
          this.params.CustomerTransformDealRate = list.find(item=>item.id == 'CustomerTransformDealRate').rate
          
          // 助理流量转化加V率健康值
          this.params.AssistantFlowTransformAddWechatRate = list.find(item=>item.id == 'AssistantFlowTransformAddWechatRate').rate
          // 助理流量转化上门率健康值
          this.params.AssistantFlowTransformToHospitalRate = list.find(item=>item.id == 'AssistantFlowTransformToHospitalRate').rate
          // 助理流量转化派单率健康值
          this.params.AssistantFlowTransformSendOrderRate = list.find(item=>item.id == 'AssistantFlowTransformSendOrderRate').rate
          // 助理客户转化成交率健康值
          this.params.AssistantCustomerFlowTransformDealRate = list.find(item=>item.id == 'AssistantCustomerFlowTransformDealRate').rate
          
        }
      });
    },
    // 获取线索柱形图
    getCustomerFlowRateByEmployeeAndHospital() {
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        currentMonth:this.platformList2.find((item) => item.id == 1).isSelected,
        history:this.platformList2.find((item) => item.id == 2).isSelected,
      };
      api.getCustomerFlowRateByEmployeeAndHospital(data).then((res) => {
        if (res.code == 0) {
          this.CustomerFlowRateByEmployeeAndHospital= res.data.data
        }
      });
    },
    
  },

  created(){
    this.getContentValidList()
    this.getHealthValueLists()
    this.getTimeSpanClick()
    this.getLiveAnchorBaseInfoValids()
    // setTimeout(()=>{
      this.getData()
    // },1000)
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
}
.tab_content2{
  padding-top: 6px;
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
.tab,.tab2 {
  display: flex;
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
}
.m_b{
  margin-bottom: 10px;
  position: relative;
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
</style>
