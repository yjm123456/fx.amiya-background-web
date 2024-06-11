<template>
  <div>
    <Modal
      v-model="amyOperationsTableModels"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
      :footer-hide="false"
      title="啊美雅表格数据"
    >
      <div class="top" >
        <div class="time_content">
          <span>时间进度：{{dateSchedule}}%</span>
          <span>{{selectedDate}}</span>
        </div>
        <Tabs ref="tabs" v-model="activeName" @on-click="tabChange">
          <TabPane label="运营看板-分组" name="amyBusinessKanBan">
            <!-- 业绩情况 -->
            <div class="container">
              <Card class="content">
                  <div class="title">当日业绩情况</div>
                  <amyBusinessKanBans :companyPerformanceData="daycompanyPerformanceData" />
              </Card>
              <Card class="content">
                  <div class="title">当月业绩情况</div>
                  <amyBusinessKanBans :companyPerformanceData="monthcompanyPerformanceData" :dateSchedule="dateSchedule"/>
              </Card>
            </div>
            
            <!-- 新客运营情况 -->
            <div class="container">
              <Card class="content">
                  <div class="title">当日新客运营情况</div>
                  <newOperations :companyOperationsData="daycompanyOperationsData"/>
              </Card>
              <Card class="content">
                  <div class="title">当月新客运营情况</div>
                  <newOperations :companyOperationsData="monthcompanyOperationsData" :dateSchedule="dateSchedule"/>
              </Card>
            </div>
            <!-- 老客运营情况 -->
            <div class="container">
              <Card class="content">
                  <div class="title">当日老客运营情况</div>
                  <newOperations :companyOperationsData="oldDaycompanyOperationsData"/>
              </Card>
              <Card class="content">
                  <div class="title">当月老客运营情况</div>
                  <newOperations :companyOperationsData="oldMonthcompanyOperationsData" :dateSchedule="dateSchedule"/>
              </Card>
            </div>
            <!-- 当月/历史分诊新客转化情况 -->
            <div class="container">
              <Card class="content">
                  <div class="title">当月分诊新客转化情况</div>
                  <triageNewCustomers :triageNewCustomersData="triageNewCustomersData" isTitle="当月分诊" />
              </Card>
              <Card class="content">
                  <div class="title">历史派单新客转化情况</div>
                  <triageNewCustomers :triageNewCustomersData="triageNewCustomersData2" isTitle="历史派单" />
              </Card>
            </div>
            <!-- 指标转化情况-有效客资 -->
            <div >
                <div class="title">指标转化情况-有效客资</div>
                <tableIndicatorConversion 
                  :tableIndicatorConversionData="effectiveTableIndicatorConversionData"
                  isTitle="有效" 
                  :sevenDaySendOrderHealthValue="params.sevenDaySendOrderHealthValuee"
                  :fifteenVisitHealthValuue="params.fifteenVisitHealthValuuee"
                  :oldCustomerVisitHealthValue="params.oldCustomerVisitHealthValue"
                  :addWechatRateHealthValue="params.addWechatRateHealthValueE"
                  :sendOrderHealthValue="params.sendOrderHealthValueE"
                  :toHospitalRateHealthValueThisMonth="params.toHospitalRateHealthValueThisMonth"
                  :newCustomerDealHealValue="params.newCustomerDealHealValue"
                  :newCustomerUnitPriceHealthValue="params.newCustomerUnitPriceHealthValue"
                  :oldCustomerUnitPriceHealthValue="params.oldCustomerUnitPriceHealthValue"
                />
            </div>
            <!-- 指标转化情况-潜在客资 -->
            <div >
                <div class="title">指标转化情况-潜在客资</div>
                <tableIndicatorConversion 
                  :tableIndicatorConversionData="potentialTableIndicatorConversionData" 
                  isTitle="有效" 
                  :sevenDaySendOrderHealthValue="params.sevenDaySendOrderHealthValueh"
                  :fifteenVisitHealthValuue="params.fifteenVisitHealthValuueh"
                  :oldCustomerVisitHealthValue="params.oldCustomerVisitHealthValue"
                  :addWechatRateHealthValue="params.addWechatRateHealthValueH"
                  :sendOrderHealthValue="params.sendOrderHealthValueH"
                  :toHospitalRateHealthValueThisMonth="params.toHospitalRateHealthValueThisMonth"
                  :newCustomerDealHealValue="params.newCustomerDealHealValue"
                  :newCustomerUnitPriceHealthValue="params.newCustomerUnitPriceHealthValue"
                  :oldCustomerUnitPriceHealthValue="params.oldCustomerUnitPriceHealthValue"
                />
            </div>
            <!-- 指标转化情况 -->
            <div >
                <div class="title">指标转化情况</div>
                <tableIndicatorConversion 
                  :tableIndicatorConversionData="tableIndicatorConversionData" 
                  isTitle="无效" 
                />
            </div>
          </TabPane>
          <TabPane label="运营看板-助理" name="customerBusiness">
            <div>
              <!-- 助理业绩情况 -->
              <div class="container">
                <Card class="content">
                    <div class="title">当日业绩情况</div>
                    <assistantDayPerformance :assistantformanceData="dayAssistantformanceData"/>
                </Card>
                <Card class="content">
                    <div class="title">当月业绩情况</div>
                    <assistantDayPerformance :assistantformanceData="monthAssistantformanceData"/>
                </Card>
              </div>
              <!-- 助理获客情况 -->
              <div class="container">
                <Card class="content">
                    <div class="title">当日获客情况</div>
                    <assistantAcquisition :assistantAcquisitionData="dayAssistantCustomerAcquisition" :liveAnchorBaseInfos="liveAnchorBaseInfos"/>
                </Card>
                <Card class="content">
                    <div class="title">当月获客情况</div>
                    <assistantAcquisition :assistantAcquisitionData="monthAssistantCustomerAcquisition" :liveAnchorBaseInfos="liveAnchorBaseInfos"/>
                </Card>
              </div>
              <!-- 助理新客运营情况 -->
              <div class="container">
                <Card class="content">
                    <div class="title">当日新客运营情况</div>
                    <assistantOperationsDataComponent :assistantOperationsData="dayNewassistantOperationsData" title="新客"/>
                </Card>
                <Card class="content">
                    <div class="title">当月新客运营情况</div>
                    <assistantOperationsDataComponent :assistantOperationsData="monthNewassistantOperationsData" title="新客"/>
                </Card>
              </div>
              <!-- 助理老客运营情况 -->
              <div class="container">
                <Card class="content">
                    <div class="title">当日老客运营情况</div>
                    <assistantOperationsDataComponent :assistantOperationsData="dayOldassistantOperationsData" title="老客"/>
                </Card>
                <Card class="content">
                    <div class="title">当月老客运营情况</div>
                    <assistantOperationsDataComponent :assistantOperationsData="monthOldassistantOperationsData" title="老客"/>
                </Card>
              </div>
              <!-- 指标转化情况-有效客资 -->
              <div >
                  <div class="title">指标转化情况-有效客资</div>
                  <assistantCustomerCapital :assistantCustomerCapitalData="assistantCustomerCapitalEffectiveData"/>
              </div>
              <!-- 指标转化情况-潜在客资 -->
              <div >
                  <div class="title">指标转化情况-潜在客资</div>
                  <assistantCustomerCapital :assistantCustomerCapitalData="assistantCustomerCapitalPotentialData"/>
              </div>
              <!-- 指标转化情况 -->
              <div >
                  <div class="title">指标转化情况</div>
                  <assistantCustomerCapital :assistantCustomerCapitalData="assistantCustomerCapitalData"/>
              </div>
            </div>
          </TabPane>
          <TabPane label="运营看板-获客" name="triageBusiness">
            <div>
              <!-- 获客情况 -->
              <div class="container">
                <Card class="content">
                    <div class="title">当日获客情况</div>
                    <customerAcquisition :companyCustomerAcquisition="daycompanyCustomerAcquisition"/>
                </Card>
                <Card class="content">
                    <div class="title">当月获客情况</div>
                    <customerAcquisition :companyCustomerAcquisition="monthcompanyCustomerAcquisition"/>
                </Card>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div slot="footer" class=" foot">
        <Button @click="cancelSubmits()">关闭页面</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/amiyaOperationsBoard";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";
import * as healthValueApi from "@/api/healthValue";

import amyBusinessKanBans from "./amyBusinessKanBan.vue"
import customerAcquisition from "./customerAcquisition.vue"
import newOperations from "./newOperations.vue"
import tableIndicatorConversion from "./tableIndicatorConversion.vue"
import assistantDayPerformance from "./assistantDayPerformance.vue"
import assistantAcquisition from "./assistantAcquisition.vue"
import assistantOperationsDataComponent from "./assistantOperationsDataComponent.vue"
import assistantCustomerCapital from "./assistantCustomerCapital.vue"
import triageNewCustomers from "./triageNewCustomers.vue"
export default {
  components:{
    amyBusinessKanBans,
    customerAcquisition,
    newOperations,
    tableIndicatorConversion,
    assistantDayPerformance,
    assistantAcquisition,
    assistantOperationsDataComponent,
    assistantCustomerCapital,
    triageNewCustomers
  },
  props: {
    amyOperationsTableModel:Boolean,
    selectedDate:String,
    dateSchedule:Number
  },
  data() {
    return {
      startDates:'',
      // 控制首次进入页面加载接口
      isHomeLogin:sessionStorage.setItem('isHomeLogin',true),
      isCustomerBusiness:sessionStorage.setItem('isCustomerBusiness',true),
      params:{
        // 潜在-7日派单率
        sevenDaySendOrderHealthValueh:0,
        // 有效-7日派单率
        sevenDaySendOrderHealthValuee:0,
        // 潜在-15日上门率
        fifteenVisitHealthValuueh:0,
        // 有效-15日上门率
        fifteenVisitHealthValuuee:0,
        // 老客上门率健康值
        oldCustomerVisitHealthValue:0,
        // 加v率健康值-潜在客资
        addWechatRateHealthValueH:0,
        // 加v率健康值-有效客资
        addWechatRateHealthValueE:0,
        // 派单率健康值-潜在客资
        sendOrderHealthValueH:0,
        // 派单率健康值-有效客资
        sendOrderHealthValueE:0,
        // 当月上门率健康值
        toHospitalRateHealthValueThisMonth:0,
        // 新客成交率健康值
        newCustomerDealHealValue:0,
        // 新客客单价健康值
        newCustomerUnitPriceHealthValue:0,
        // 老客客单价健康值
        oldCustomerUnitPriceHealthValue:0,
      },
      activeName: "amyBusinessKanBan",
      amyOperationsTableModels: false,
      // 当日业绩情况
      daycompanyPerformanceData:[],
      // 当月业绩情况
      monthcompanyPerformanceData:[],
      // 当日获客情况
      daycompanyCustomerAcquisition:[],
      // 当月获客情况
      monthcompanyCustomerAcquisition:[],
      // 当日新客运营情况
      daycompanyOperationsData:[],
      // 当月新客运营情况
      monthcompanyOperationsData:[],
      // 当日老客运营情况
      oldDaycompanyOperationsData:[],
      // 当月老客运营情况
      oldMonthcompanyOperationsData:[],
      // 指标转化情况
      tableIndicatorConversionData:[],
      // 指标转化情况-潜在客资
      potentialTableIndicatorConversionData:[],
      // 指标转化情况-有效客资
      effectiveTableIndicatorConversionData:[],
      // 助理当日业绩情况
      dayAssistantformanceData:[],
      // 助理当日业绩情况
      monthAssistantformanceData:[],
      // 助理当日获客情况
      dayAssistantCustomerAcquisition:[],
      // 助理当月获客情况
      monthAssistantCustomerAcquisition:[],
      // 助理当日新客运营情况
      dayNewassistantOperationsData:[],
      // 助理当月新客运营情况
      monthNewassistantOperationsData:[],
      // 助理当日老客运营情况
      dayOldassistantOperationsData:[],
      // 助理当月老客运营情况
      monthOldassistantOperationsData:[],
      // 助理指标转化有效客资
      assistantCustomerCapitalEffectiveData:[],
      // 助理指标转化潜在客资
      assistantCustomerCapitalPotentialData:[],
      // 助理指标转化
      assistantCustomerCapitalData:[],
      // 基础主播
      liveAnchorBaseInfos:[],
      // 公司当月分诊情况
      triageNewCustomersData:[],
      // 公司历史分诊情况
      triageNewCustomersData2:[]

    };
  },
  methods: {
    getData(){
      
      if(sessionStorage.getItem('isHomeLogin') == 'true'){
          this.getDayCustomerData()
          this.getMonthCustomerData()
          this.getDayCompanyOperationsData()
          this.getMonthCompanyOperationsData()
          this.getDayOldCompanyOperationsData()
          this.getMonthOldCompanyOperationsData()
          this.getcompanyIndicatorConversionDataChange()
          this.getcompanyNewCustomerConversionData()
          this.getcompanyNewCustomerConversionData2()
          this.getpotentialTableIndicatorConversionData()
          this.geteffectiveTableIndicatorConversionData()
          this.getHealthValueLists()
          sessionStorage.setItem('isHomeLogin',false)
        }

    },
    customerBusinessData(){
      
      if(sessionStorage.getItem('isCustomerBusiness') == 'true'){
          this.getDayassistantPerformanceData()
          this.getMonthassistantPerformanceData()
          this.getDayassistantCustomerAcquisition()
          this.getMonthassistantCustomerAcquisition()
          this.getDayNewassistantOperationsData()
          this.getMonthNewassistantOperationsData()
          this.getDayOldassistantOperationsData()
          this.getMonthOldassistantOperationsData()
          this.getEffectiveassistantIndicatorConversionData()
          this.getPotentialassistantIndicatorConversionData()
          this.getassistantIndicatorConversionDatas()
          sessionStorage.setItem('isCustomerBusiness',false)
        }
    },
    tabChange() {
      if(this.activeName=='amyBusinessKanBan'){
          this.getData()
      }else if(this.activeName=='customerBusiness'){
        
        if(sessionStorage.getItem('isCustomerBusiness') == 'true'){
          this.getLiveAnchorBaseInfoValid()
          setTimeout(() => {
            this.customerBusinessData()
          }, 200);
        }
        
      }else if(this.activeName=='triageBusiness'){
        this.getDayCompanyCustomerAcquisition()
        this.getMonthCompanyCustomerAcquisition()
      }
    },
    // 获取当月获客情况数据
    getHealthValueLists() {
      healthValueApi.getHealthValid().then((res) => {
        if (res.code == 0) {
          const {list} = res.data
          // 潜在-7日派单率
          this.params.sevenDaySendOrderHealthValueh = list.find(item=>item.id == 'SevenDaySendOrderHealthValue-H').rate
          // 有效-7日派单率
          this.params.sevenDaySendOrderHealthValuee = list.find(item=>item.id == 'SevenDaySendOrderHealthValue-E').rate
          // 潜在-15日上门率
          this.params.fifteenVisitHealthValuueh = list.find(item=>item.id == 'FifteenVisitHealthValuue-H').rate
          // 有效-15日上门率
          this.params.fifteenVisitHealthValuuee = list.find(item=>item.id == 'FifteenVisitHealthValuue-E').rate
          // 老客上门率健康值
          this.params.oldCustomerVisitHealthValue= list.find(item=>item.id == 'OldCustomerVisitHealthValue').rate
          // 加v率健康值-潜在客资
          this.params.addWechatRateHealthValueH= list.find(item=>item.id == 'AddWechatRateHealthValue-H').rate
          // 加v率健康值-有效客资
          this.params.addWechatRateHealthValueE= list.find(item=>item.id == 'AddWechatRateHealthValue-E').rate
          // 派单率健康值-潜在客资
          this.params.sendOrderHealthValueH= list.find(item=>item.id == 'SendOrderHealthValue-H').rate
          // 派单率健康值-有效客资
          this.params.sendOrderHealthValueE= list.find(item=>item.id == 'SendOrderHealthValue-E').rate
          // 当月上门率健康值
          this.params.toHospitalRateHealthValueThisMonth= list.find(item=>item.id == 'ToHospitalRateHealthValueThisMonth').rate
          // 新客成交率健康值
          this.params.newCustomerDealHealValue= list.find(item=>item.id == 'NewCustomerDealHealValue').rate
          // 新客客单价健康值
          this.params.newCustomerUnitPriceHealthValue= list.find(item=>item.id == 'NewCustomerUnitPriceHealthValue').rate
          // 老客客单价健康值
          this.params.oldCustomerUnitPriceHealthValue= list.find(item=>item.id == 'OldCustomerUnitPriceHealthValue').rate
        }
      });
    },
   
   // 获取当日业绩情况数据
    getDayCustomerData() {
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getcompanyPerformanceData(data).then((res) => {
        if (res.code == 0) {
          this.daycompanyPerformanceData = res.data.data;
        }
      });
    },
   // 获取当月业绩情况数据
    getMonthCustomerData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getcompanyPerformanceData(data).then((res) => {
        if (res.code == 0) {
          this.monthcompanyPerformanceData = res.data.data;
        }
      });
    },
    // 获取当日获客情况数据
    getDayCompanyCustomerAcquisition() {
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getcompanyCustomerAcquisition(data).then((res) => {
        if (res.code == 0) {
          this.daycompanyCustomerAcquisition = res.data.data;
        }
      });
    },
   // 获取当月获客情况数据
    getMonthCompanyCustomerAcquisition() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getcompanyCustomerAcquisition(data).then((res) => {
        if (res.code == 0) {
          this.monthcompanyCustomerAcquisition = res.data.data;
        }
      });
    },

    // 获取当日新客运营情况数据
    getDayCompanyOperationsData() {
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isOldCustomer:false
      };
      api.getcompanyOperationsData(data).then((res) => {
        if (res.code == 0) {
          this.daycompanyOperationsData = res.data.data;
        }
      });
    },
   // 获取当月新客运营情况数据
    getMonthCompanyOperationsData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isOldCustomer:false
      };
      api.getcompanyOperationsData(data).then((res) => {
        if (res.code == 0) {
          this.monthcompanyOperationsData = res.data.data;
        }
      });
    },
    // 获取当日老客运营情况数据
    getDayOldCompanyOperationsData() {
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isOldCustomer:true
      };
      api.getcompanyOperationsData(data).then((res) => {
        if (res.code == 0) {
          this.oldDaycompanyOperationsData = res.data.data;
        }
      });
    },
   // 获取当月老客运营情况数据
    getMonthOldCompanyOperationsData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isOldCustomer:true
      };
      api.getcompanyOperationsData(data).then((res) => {
        if (res.code == 0) {
          this.oldMonthcompanyOperationsData = res.data.data;
        }
      });
    },
    // 获取指标转化情况-潜在客资
    getpotentialTableIndicatorConversionData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isEffective:false
      };
      api.getcompanyIndicatorConversionData(data).then((res) => {
        if (res.code == 0) {
          this.potentialTableIndicatorConversionData = res.data.data;
        }
      });
    },
    // 获取指标转化情况-有效客资
    geteffectiveTableIndicatorConversionData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isEffective:true
      };
      api.getcompanyIndicatorConversionData(data).then((res) => {
        if (res.code == 0) {
          this.effectiveTableIndicatorConversionData = res.data.data;
        }
      });
    },
    // 获取指标转化情况
    getcompanyIndicatorConversionDataChange() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getcompanyIndicatorConversionData(data).then((res) => {
        if (res.code == 0) {
          this.tableIndicatorConversionData = res.data.data;
        }
      });
    },
    // 获取助理当日业绩情况数据
    getDayassistantPerformanceData() {
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        liveAnchorIds: String(this.liveAnchorBaseInfos)

      };
      api.getassistantPerformanceData(data).then((res) => {
        if (res.code == 0) {
          this.dayAssistantformanceData = res.data.data;
        }
      });
    },
   // 获取助理当月业绩情况数据
    getMonthassistantPerformanceData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantPerformanceData(data).then((res) => {
        if (res.code == 0) {
          this.monthAssistantformanceData = res.data.data;
        }
      });
    },
    // 获取助理当日获客情况数据
    getDayassistantCustomerAcquisition() {
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantCustomerAcquisition(data).then((res) => {
        if (res.code == 0) {
          this.dayAssistantCustomerAcquisition= res.data.data;
        }
      });
    },
   // 获取助理当月获客情况数据
    getMonthassistantCustomerAcquisition() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantCustomerAcquisition(data).then((res) => {
        if (res.code == 0) {
          this.monthAssistantCustomerAcquisition = res.data.data;
        }
      });
    },
    // 获取助理当日新客运营情况数据
    getDayNewassistantOperationsData() {
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isOldCustomer:false,
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantOperationsData(data).then((res) => {
        if (res.code == 0) {
          this.dayNewassistantOperationsData= res.data.data;
        }
      });
    },
   // 获取助理当月新客运营情况数据
    getMonthNewassistantOperationsData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isOldCustomer:false,
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantOperationsData(data).then((res) => {
        if (res.code == 0) {
          this.monthNewassistantOperationsData = res.data.data;
        }
      });
    },
    // 获取助理当日老客运营情况数据
    getDayOldassistantOperationsData() {
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isOldCustomer:true,
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantOperationsData(data).then((res) => {
        if (res.code == 0) {
          this.dayOldassistantOperationsData= res.data.data;
        }
      });
    },
   // 获取助理当月老客运营情况数据
    getMonthOldassistantOperationsData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isOldCustomer:true,
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantOperationsData(data).then((res) => {
        if (res.code == 0) {
          this.monthOldassistantOperationsData = res.data.data;
        }
      });
    },
    // 获取当月分诊情况数据
    getcompanyNewCustomerConversionData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isCurrentMonth: true
      };
      api.companyNewCustomerConversionData(data).then((res) => {
        if (res.code == 0) {
          this.triageNewCustomersData = res.data.data;
        }
      });
    },
    // 获取历史分诊情况数据
    getcompanyNewCustomerConversionData2() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isCurrentMonth: false
      };
      api.companyNewCustomerConversionData(data).then((res) => {
        if (res.code == 0) {
          this.triageNewCustomersData2 = res.data.data;
        }
      });
    },
    // 获取助理指标转化有效客资数据
    getEffectiveassistantIndicatorConversionData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isEffective :true,
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantIndicatorConversionData(data).then((res) => {
        if (res.code == 0) {
          this.assistantCustomerCapitalEffectiveData = res.data.data;
        }
      });
    },
    // 获取助理指标转化潜在客资数据
    getPotentialassistantIndicatorConversionData() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        isEffective :false,
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantIndicatorConversionData(data).then((res) => {
        if (res.code == 0) {
          this.assistantCustomerCapitalPotentialData = res.data.data;
        }
      });
    },
    // 获取助理指标转化数据
    getassistantIndicatorConversionDatas() {
      const data = {
        startDate: this.startDates,
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        liveAnchorIds: String(this.liveAnchorBaseInfos)
      };
      api.getassistantIndicatorConversionData(data).then((res) => {
        if (res.code == 0) {
          this.assistantCustomerCapitalData = res.data.data;
        }
      });
    },
    // 获取基础主播
    getLiveAnchorBaseInfoValid() {
      const data = {
        isSelfLiveAnchor:true
      };
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid(data).then((res) => {
        if (res.code == 0) {
          let idList =  res.data.liveAnchorBaseInfos.map(item=>{
            return item.id
          })
          this.liveAnchorBaseInfos = idList
        }
      });
    },
    
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:amyOperationsTableModel", false);
        this.activeName= "amyBusinessKanBan"
        this.isHomeLogin=sessionStorage.setItem('isHomeLogin',true)
        this.isCustomerBusiness=sessionStorage.setItem('isCustomerBusiness',true)
        
      }
    },
    // 取消
    cancelSubmits(name) {
      this.activeName = "amyBusinessKanBan";
      this.$emit("update:amyOperationsTableModel", false);
      this.isHomeLogin=sessionStorage.setItem('isHomeLogin',true)
      this.isCustomerBusiness=sessionStorage.setItem('isCustomerBusiness',true)
    },
  },
  created() {
    
  },
  watch: {
    amyOperationsTableModel(value) {
      this.amyOperationsTableModels = value;
      // this.getCustomerServiceList()
      if(value == true){
        // console.log( this.$moment(this.selectedDate).format("YYYY-MM")+'-01')
        this.startDates = this.$moment(this.selectedDate).format("YYYY-MM")+'-01'
        this.getData()
      }
      
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.ivu-card-body {
  width: 100%;
}
.top {
  width: 100%;
  
}

.foot {
  text-align: end;
}

.num {
  margin-right: 20px;
  font-size: 18px;
  display: flex;
}
.container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.content{
    width: 49.5%;
    // overflow-x: scroll;
}
.title{
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-bottom: 10px;
}
.time_content{
  text-align: end;
  color: rgb(15, 115, 230);
  font-size: 18px;
  
}
.time_content span{
  margin-left: 20px;
}
</style>
