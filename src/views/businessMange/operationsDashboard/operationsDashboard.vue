<template>
  <div>
    <Card>
      <div class="content_title">啊美雅医美业务运营情况</div>
      <!-- tab切换 -->
      <div class="tab_content">
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
        <div class="date_con">
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
      <div v-if="selected == '业绩'">
        <Card class="m_b ">
          <items :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule"/>
        </Card>
        <!-- 当月业绩趋势 -->
        <Card  class="m_b">
          <div class="h3">当月业绩趋势</div>
          <monthLine :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule"/>
        </Card>
        <!-- 业绩情况分析 -->
        <Card  class="m_b">
          <div class="h3">业绩情况分析</div>
          <div class="pie_list">
            <Card class="pie_item">
              <div class="pie_title">总业绩分析</div>
              <pieItem :pieItemData="totalPerformancePie" :selected="selected"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">刀刀组业绩分析</div>
              <pieItem :pieItemData="daodaoTotalPerformancePie" :selected="selected"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">吉娜组业绩分析</div>
              <pieItem :pieItemData="jinaTotalPerformancePie" :selected="selected"/>
            </Card>
          </div>
        </Card>
        <!-- 助理业绩对比和机构业绩对比图 -->
        <Card  class="m_b ">
          <div class="customer_bar_content">
            <Card class="customer_bar">
              <div class="bar_title">助理业绩对比</div>
              <barItem :barItemData="customerObj"/>
            </Card>
            <Card class="customer_bar">
              <div class="bar_title">机构业绩对比</div>
              <barItem :barItemData="hospitalObj"/>
            </Card>
          </div>
          
        </Card>
      </div>
      <!-- 线索 -->
      <div v-else-if="selected == '线索'">
        <!--  -->
        <Card  class="m_b">
          <item2 ref="item2" :params="params" :totalFlowRateAndDateSchedule="totalFlowRateAndDateSchedule" />
        </Card>
         <!-- 当月业绩趋势 -->
        <Card  class="m_b">
          <div class="h3">当月线索趋势</div>
          <monthLine2 :totalAchievementAndDateSchedule="totalFlowRateAndDateSchedule" :selected="selected"/>
        </Card>
        <!-- 线索分析 -->
        <Card  class="m_b">
          <div class="h3">平台线索分析</div>
          <div class="pie_list">
            <Card class="pie_item">
              <div class="pie_title">整体线索占比</div>
              <pieItem :pieItemData="totalFlowRate" :selected="selected"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">刀刀组线索占比</div>
              <pieItem :pieItemData="groupDaoDaoFlowRate" :selected="selected"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">吉娜组线索占比</div>
              <pieItem :pieItemData="groupJiNaFlowRate" :selected="selected"/>
            </Card>
          </div>
        </Card>
        <!-- 平台数据分析 -->
        <Card  class="m_b ">
          <div class="h3">部门平台线索分析</div>
          <div class="flow_content m_t">
            <Card class="flow_item margin_r">
              <div class="pie_title">
                <span>抖音线索分析</span>
                <span class="tab_name" @click="getFlowRateDetailsByContentPlatform('抖音线索详情')"><i class="iconfont icon-qiehuan-xue qiehuan"></i> 详情</span>
              </div>
              <flowBarItem :flowBarItemData="flowBarItemData.douYinFolwRateAnalize" />
            </Card>
            <Card class="flow_item ">
              <div class="pie_title">
                <span>视频号线索分析</span>
                <span class="tab_name" @click="getFlowRateDetailsByContentPlatform('视频号线索详情')"><i class="iconfont icon-qiehuan-xue qiehuan"></i> 详情</span>
              </div>
              <flowBarItem :flowBarItemData="flowBarItemData.videoNumberFolwRateAnalize" />
            </Card>
          </div>
          <div class="flow_content m_t">
            <Card class="flow_item margin_r">
              <div class="pie_title">
                <span>小红书线索分析</span>
                <span class="tab_name" @click="getFlowRateDetailsByContentPlatform('小红书线索详情')"><i class="iconfont icon-qiehuan-xue qiehuan"></i> 详情</span>
              </div>
              <flowBarItem :flowBarItemData="flowBarItemData.xiaoHongShuFolwRateAnalize" />
            </Card>
            <Card class="flow_item ">
              <div class="pie_title">
                <span>私域线索分析</span>
                <span class="tab_name" @click="getFlowRateDetailsByContentPlatform('私域线索详情')"><i class="iconfont icon-qiehuan-xue qiehuan"></i> 详情</span>
              </div>
              <flowBarItem :flowBarItemData="flowBarItemData.privateDataFolwRateAnalize" />
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
        
        <div >
          <!-- 线索转化和客户转化情况-->
          <trafficConversionTable :params="params" :platformList="platformList" ref="trafficConversionTable" />
          <!-- 线索转化和客户转化情况-助理 -->
          <assistantTable :params="params" :platformList="platformList" ref="assistantTable" />
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

import items from "./components/item.vue"
import item2 from "./components/item2.vue"
import monthLine from "./components/monthLine.vue"
import monthLine2 from "./components/monthLine2.vue"
import pieItem from "./components/pieItem.vue"
import barItem from "./components/barItem.vue"
import flowBarItem from "./components/3dBarItem.vue"
import trafficConversionTable from "./components/trafficConversionTable.vue"
import assistantTable from "./components/assistantTable.vue"
import hospitalTable from "./components/hospitalTable.vue"
import detail from "./components/detail.vue"
export default {
  components:{
    items,
    item2,
    monthLine,
    monthLine2,
    pieItem,
    barItem,
    flowBarItem,
    trafficConversionTable,
    assistantTable,
    hospitalTable,
    detail
  },
  data() {
    return {
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
      list: ["业绩","线索","转化"],
      selected:"业绩",
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
      // 详情model
      detailModel:false,
      titles:"",
      // 线索
      totalFlowRateAndDateSchedule:{},
      totalFlowRate:[],
      groupDaoDaoFlowRate:[],
      groupJiNaFlowRate:[],
      // 饼图分组
      groupFlowRateCompare:{},
      // 详情
      detailFlowBarItemData:[]
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
    selectTab(index, value) {
      this.selected = value
      // this.list[index].isSelected = !this.list[index].isSelected;
      this.getData()
    },

    getData() {
      const {startDate,endDate} = this.params
      if (!startDate || !endDate) {
        this.$Message.warning("请选择日期！");
        return;
      }
      this.getTimeSpanClick()
      if(this.selected == '业绩'){
        this.getNewOrOldCustomerCompare();
        this.getNewOrOldCustomerCompareByEmployeeAndHospital();
        this.getTotalAchievementAndDateSchedule();
      }else if(this.selected == '线索'){
          this.getTotalFlowRateAndDateSchedule();
          this.getGroupFlowRateCompare();
          this.getFlowRateByContentPlatform();
      }else if(this.selected == '转化'){
        this.$nextTick(()=>{
          this.$refs.trafficConversionTable.getCompanyTransformData();
          this.$refs.assistantTable.getAssistantTransformData();
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
      };
      api.getTotalAchievementAndDateSchedule(data).then((res) => {
        if (res.code == 0) {
          this.totalAchievementAndDateSchedule = res.data.data;
          // this.pieItemData = [
          //   { value: 40, name: '新客' },
          //   { value: 60, name: '老客' },
          // ]
          // this.barItemData={
          //   data1:[320, 302, 301, 334, 390, 330, 350],
          //   data2:[120, 132, 101, 134, 90, 230, 210],
          //   name:['杭州连天美医疗美容医院有限公司杭州连天美医疗美容医院有限公司', '上海伊莱美医疗美容医院', '沈阳和平百嘉丽医疗美容医院有限公司', '杭州维多利亚医疗美容医院有限公司', '北京丽都医疗美容医院有限公司', '湖南雅美医疗美容医院有限公司长沙雅美医疗美容医院', '佛山曙光金子医学美容医院有限公司']
          // }
          // this.flowBarItemData={
          //  data1: [
          //               {value: 300, itemStyle: {color: '#5DC6D6'}},
          //               {value: 498, itemStyle: {color: '#A0A8F5'}},
          //               {value: 778, itemStyle: {color: '#D091FA'}},
          //               {value: 1382, itemStyle: {color: '#F69655'}},

          //           ],
          //           data2:[
          //               {value: 300, itemStyle: {color: '#2DB6C8'}},
          //               {value: 498, itemStyle: {color: '#8C97F8'}},
          //               {value: 778, itemStyle: {color: '#C77AF9'}},
          //               {value: 1382, itemStyle: {color: '#F48853'}},

          //           ],data3:[
          //               {value: 300, itemStyle: {color: '#5DC6D6'}},
          //               {value: 498, itemStyle: {color: '#A0A8F5'}},
          //               {value: 778, itemStyle: {color: '#D091FA'}},
          //               {value: 1382, itemStyle: {color: '#F69655'}},

          //           ]

          // }
        }
      });
    },
    // 根据条件获取新老客业绩占比（分组）
    getNewOrOldCustomerCompare() {
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
      api.getNewOrOldCustomerCompare(data).then((res) => {
        if (res.code == 0) {
          // const {totalPerformanceNewCustomer,totalPerformanceOldCustomer,groupDaoDaoPerformanceNewCustomer,groupDaoDaoPerformanceOldCustomer,groupJiNaPerformanceNewCustomer,groupJiNaPerformanceOldCustomer} = res.data.data
          // 总业绩
          // this.totalPerformancePie = [{value:totalPerformanceNewCustomer,name:'新客'},{value:totalPerformanceOldCustomer,name:'老客'}]
          // this.daodaoTotalPerformancePie = [{value:groupDaoDaoPerformanceNewCustomer,name:'新客'},{value:groupDaoDaoPerformanceOldCustomer,name:'老客'}]
          // this.jinaTotalPerformancePie = [{value:groupJiNaPerformanceNewCustomer,name:'新客'},{value:groupJiNaPerformanceOldCustomer,name:'老客'}]
          const {totalNewOrOldCustomer,groupDaoDaoNewOrOldCustomer,groupJiNaNewOrOldCustomer} = res.data.data
          this.totalPerformancePie = [
            {value:totalNewOrOldCustomer.totalPerformanceNewCustomerNumber,name:'新客',rate:totalNewOrOldCustomer.totalPerformanceNewCustomerRate},
            {value:totalNewOrOldCustomer.totalPerformanceOldCustomerNumber,name:'老客',rate:totalNewOrOldCustomer.totalPerformanceOldCustomerRate}
          ]
          this.daodaoTotalPerformancePie = [
            {value:groupDaoDaoNewOrOldCustomer.totalPerformanceNewCustomerNumber,name:'新客',rate:groupDaoDaoNewOrOldCustomer.totalPerformanceNewCustomerRate},{value:groupDaoDaoNewOrOldCustomer.totalPerformanceOldCustomerNumber,name:'老客',rate:groupDaoDaoNewOrOldCustomer.totalPerformanceOldCustomerRate}
          ]
          this.jinaTotalPerformancePie = [
            {value:groupJiNaNewOrOldCustomer.totalPerformanceNewCustomerNumber,name:'新客',rate:groupJiNaNewOrOldCustomer.totalPerformanceNewCustomerRate},{value:groupJiNaNewOrOldCustomer.totalPerformanceOldCustomerNumber,name:'老客',rate:groupJiNaNewOrOldCustomer.totalPerformanceOldCustomerRate}
          ]
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
    getTotalFlowRateAndDateSchedule(){
      const {startDate,endDate} = this.params
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
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
      };
      api.getGroupFlowRateCompare(data).then((res) => {
        if (res.code == 0) {
          const {totalFlowRate,groupDaoDaoFlowRate,groupJiNaFlowRate} = res.data.data

          this.totalFlowRate =  [
            {value:totalFlowRate.douYinNumber,name:'抖音',rate:totalFlowRate.douYinRate},
            {value:totalFlowRate.videoNumberNumber,name:'视频号',rate:totalFlowRate.videoNumberRate},
            {value:totalFlowRate.xiaoHongShuNumber,name:'小红书',rate:totalFlowRate.xiaoHongShuRate},
            {value:totalFlowRate.privateDataNumber,name:'私域',rate:totalFlowRate.privateDataRate},
          ]

          this.groupDaoDaoFlowRate = [
            {value:groupDaoDaoFlowRate.douYinNumber,name:'抖音',rate:groupDaoDaoFlowRate.douYinRate},
            {value:groupDaoDaoFlowRate.videoNumberNumber,name:'视频号',rate:groupDaoDaoFlowRate.videoNumberRate},
            {value:groupDaoDaoFlowRate.xiaoHongShuNumber,name:'小红书',rate:groupDaoDaoFlowRate.xiaoHongShuRate},
            {value:groupDaoDaoFlowRate.privateDataNumber,name:'私域',rate:groupDaoDaoFlowRate.privateDataRate},
          ]
          this.groupJiNaFlowRate = [
            {value:groupJiNaFlowRate.douYinNumber,name:'抖音',rate:groupJiNaFlowRate.douYinRate},
            {value:groupJiNaFlowRate.videoNumberNumber,name:'视频号',rate:groupJiNaFlowRate.videoNumberRate},
            {value:groupJiNaFlowRate.xiaoHongShuNumber,name:'小红书',rate:groupJiNaFlowRate.xiaoHongShuRate},
            {value:groupJiNaFlowRate.privateDataNumber,name:'私域',rate:groupJiNaFlowRate.privateDataRate},
          ]
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
    
  },
  created(){
    this.getData()
    this.getContentValidList()
    this.getHealthValueLists()
    this.getTimeSpanClick()
  }
};
</script>

<style scoped lang="less">
.content_title{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
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
  width: 32%;
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
</style>
