<template>
  <div class="container">
    <div class="title">啊美雅（直播中）数据运营看板</div>
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
        v-model="params.baseLiveAnchorId"
        placeholder="请选择主播"
        filterable
        style="width:180px;margin-right:10px;text-align: start;"
        :disabled="isDirector == 'false'"
      >
        <Option
          v-for="item in params.liveAnchorBaseInfos"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Button type="primary" @click="getData">查询</Button>
    </div>
    <!-- 卡片 -->
    <div class="card_list">
      <Card class="card_item2"> 
        <items :params="params" ref="items"/>
      </Card>
    </div>
    <!-- 折线图 -->
    <Card  class="m_b">
        <div class="h3">当月线索&业绩趋势</div>
        <monthLine :totalAchievementAndDateSchedule="liveStreamingDataObj" />
    </Card>
    <!-- 漏斗图 -->
    <Card  class="m_b">
        <div class="h3">直播中转化漏斗图</div>
        <funnel
        ref="funnel"
        :params="params"
        ></funnel>
    </Card>
    <!-- 派单/上门/成交转化周期 -->
    <Card  class="m_b">
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
        <div class="card_list">
            <Card class="card_item"> 
                <div class="h3">登记派单周期</div>
                <customerBar :liveStreamingData="LivingCycleDataObj.sendCycleData" title="周期"/>
            </Card>
            <Card class="card_item"> 
              <div class="h3">登记上门/成交周期</div>
                <customerBar :liveStreamingData="LivingCycleDataObj.toHospitalCycleData" title="周期"/>
            </Card>
        </div>
        <div class="card_list">
            <Card class="card_item"> 
                <div class="h3">线索目标达成率</div>
                <customerBar :liveStreamingData="LivingClueTargetDataObj.clueTargetComplete" title="百分比"/>
            </Card>
            <Card class="card_item"> 
              <div class="h3">业绩占比</div>
                <customerBar :liveStreamingData="LivingPerformanceRateObj.performanceRate" title="百分比"/>
            </Card>
        </div>
    </Card>
   
    <!-- 账号获客占比和业绩占比 -->
    <Card  class="m_b">
        <div class="card_list">
            <Card class="card_item"> 
                <div class="m_b m_t line">
                  <div class="h3">平台获客占比</div>
                  <pieItem :pieData="LivingContentplatformClueDataObj.contentPlatformClueRate" title="总线索" :total="LivingContentplatformClueDataObj.contentPlatformTotalClue"/>
                </div>
                <div class="m_b">
                  <div class="h3">账号获客占比</div>
                  <pieItem :pieData="LivingContentplatformClueDataObj.accountClueRate" title="总线索" :total="LivingContentplatformClueDataObj.accountTotalClue"/>
                </div>
            </Card>
            <Card class="card_item">
              <div class="m_b m_t line">
                <div class="h3">平台业绩占比</div>
                <pieItem :pieData="LivingContentplatformPerformanceDataObj.contentPlatformPerformanceRate" title="总业绩" :total="LivingContentplatformPerformanceDataObj.contentPlatformTotalPerformance"/>
                
              </div>
              <div class="m_b">
                <div class="h3">账号业绩占比</div>
                <pieItem :pieData="LivingContentplatformPerformanceDataObj.accountPerformanceRate" title="总业绩" :total="LivingContentplatformPerformanceDataObj.accountTotalPerformance"/>
              </div>
            </Card>
            
        </div>
    </Card>
    <Card  class="m_b">
      <div class="card_list">
        <Card class="card_item">
          <div class="m_b">
            <div class="h3">抖音-账号获客占比</div>
            <pieItem :pieData="LivingContentplatformClueDataObj.tikTokClueRate" title="总线索" :total="LivingContentplatformClueDataObj.tikTokTotalClue"/>
          </div>
          
        </Card>
        <Card class="card_item">
          <div class="m_b">
            <div class="h3">视频号-账号获客占比</div>
            <pieItem :pieData="LivingContentplatformClueDataObj.wechatVideoClueRate" title="总线索" :total="LivingContentplatformClueDataObj.wechatVideoTotalClue"/>
          </div>
        </Card>
        
      </div>
      <div class="card_list">
        <Card class="card_item">
            <div class="m_b">
            <div class="h3">小红书-账号获客占比</div>
            <pieItem :pieData="LivingContentplatformClueDataObj.xiaoHongShuClueRate" title="总线索" :total="LivingContentplatformClueDataObj.xiaoHongShuTotalClue"/>
          </div>
        </Card>
        <Card class="card_item">
          <div class="m_b">
            <div class="h3">日不落-账号获客占比</div>
            <pieItem :pieData="LivingContentplatformClueDataObj.riBuLuoClueRate" title="总线索" :total="LivingContentplatformClueDataObj.riBuLuoTotalClue"/>
          </div>
        </Card>
      </div>
    </Card>
  </div>
</template>
<script>
import * as employeeManageApi from "@/api/employeeManage";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";
import * as api from "@/api/amiyaLivingOperationBoard";
import * as amiyaOperationsBoardApi from "@/api/amiyaOperationsBoard";

import items from "./components/item2.vue"
import monthLine from "./components/monthLine.vue"
import funnel from "./components/funnel.vue"
import customerBar from "./components/customerBar.vue"
import pieItem from "./components/pieItem.vue"
export default {
  components:{
    items,
    monthLine,
    funnel,
    customerBar,
    pieItem
  },
  data() {
    return {
      // 用于漏斗图加载
      isFlag: false,
      // 时间进度
      completeRate: 0,
      params: {
        // 当年
        // startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 主播基础id
        liveAnchorBaseInfos: [],
        // 主播
        baseLiveAnchorId:''
      },
      // 是否为客服
      isCustomerService: sessionStorage.getItem("isCustomerService"),
      // 是否为管理员
      isDirector: sessionStorage.getItem("isDirector"),
      employeeId:sessionStorage.getItem('employeeId'),
      // 折线图
      liveStreamingDataObj:{},
      // 周期
      LivingCycleDataObj:{},
      // 目标完成率
      LivingClueTargetDataObj:[],
      // 直播中业绩贡献占比
      LivingPerformanceRateObj:{},
      // 账号获客占比
      LivingContentplatformClueDataObj:{},
      // 账号业绩占比
      LivingContentplatformPerformanceDataObj:{},
      selected: "当月",
      list: ["当月","历史"],
    };

  },
  methods:{
    //   获取时间进度
    getTimeSpanClick() {
      const data = {
        startDate: null,
        endDate: this.$moment(this.params.endDate).format("YYYY-MM-DD"),
        keyWord: "",
      };
      amiyaOperationsBoardApi.getTimeSpan(data).then((res) => {
        if (res.code === 0) {
          this.completeRate = res.data.data;
        }
      });
    },
    // 主播基础数据列表
    getLiveAnchorBaseInfoValids(){
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const {liveAnchorBaseInfos} = res.data
          this.params.liveAnchorBaseInfos = liveAnchorBaseInfos
          // 根据登录id获取绑定主播
          employeeManageApi.byIdGetAmiyaEmployee(this.employeeId).then(res=>{
              if(res.code == 0){
                const {liveAnchorBaseId} = res.data.employeeInfo
                // 是管理员 但可能未绑定主播情况 默认获取数组的第一个主播
                if(this.isCustomerService == 'true' && liveAnchorBaseId != ''){
                  this.params.baseLiveAnchorId = liveAnchorBaseId
                }else{
                  this.params.baseLiveAnchorId = liveAnchorBaseInfos ? liveAnchorBaseInfos[0].id : '' 
                }
              }
            })
            
        }
      });
    },
    // 根据员工id获取绑定主播
    getbyIdGetAmiyaEmployee(value){
      employeeManageApi.byIdGetAmiyaEmployee(value).then(res=>{
        if(res.code == 0){
          const {liveAnchorBaseId} = res.data.employeeInfo
          console.log(this.isCustomerService,liveAnchorBaseId)
          if(this.isCustomerService == 'true' && liveAnchorBaseId != ''){
            this.params.baseLiveAnchorId = liveAnchorBaseId
            console.log(1)
          }else{
            console.log(2,this.liveAnchorBaseInfos )
            this.params.baseLiveAnchorId = this.liveAnchorBaseInfos ? this.liveAnchorBaseInfos[0].id : '' 
          }
        }
      })
    },
    // 折线图
    getLivingCustomerAndPerformanceBrokenLineDatas(){
      const { startDate, endDate, baseLiveAnchorId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: baseLiveAnchorId,
      }
      api.getLivingCustomerAndPerformanceBrokenLineData(data).then((res) => {
        if (res.code === 0) {
          this.liveStreamingDataObj = res.data.data
        }
      });
    },
    // 登记派单周期和登记上门/成交周期
    getLivingCycleDatas(){
      const { startDate, endDate, baseLiveAnchorId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: baseLiveAnchorId,
        isCurrent:this.selected == '当月' ? true : false
      }
      api.getLivingCycleData(data).then((res) => {
        if (res.code === 0) {
          this.LivingCycleDataObj = res.data.data
        }
      });
    },
    // 直播中线索目标完成率
    getLivingClueTargetDatas(){
      const { startDate, endDate, baseLiveAnchorId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: baseLiveAnchorId,
      }
      api.getLivingClueTargetData(data).then((res) => {
        if (res.code === 0) {
          this.LivingClueTargetDataObj =res.data.data
        }
      });
    },
    // 直播中业绩贡献占比
    getLivingPerformanceRates(){
      const { startDate, endDate, baseLiveAnchorId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: baseLiveAnchorId,
      }
      api.getLivingPerformanceRate(data).then((res) => {
        if (res.code === 0) {
          this.LivingPerformanceRateObj = res.data.data
        }
      });
    },
    // 直播中账号获客占比
    getLivingContentplatformClueDatas(){
      const { startDate, endDate, baseLiveAnchorId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: baseLiveAnchorId,
      }
      api.getLivingContentplatformClueData(data).then((res) => {
        if (res.code === 0) {
          this.LivingContentplatformClueDataObj = res.data.data
        }
      });
    },
    // 直播中账号业绩占比
    getLivingContentplatformPerformanceDatas(){
      const { startDate, endDate, baseLiveAnchorId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: baseLiveAnchorId,
      }
      api.getLivingContentplatformPerformanceData(data).then((res) => {
        if (res.code === 0) {
          this.LivingContentplatformPerformanceDataObj = res.data.data
        }
      });
    },
    selectTab(index, value) {
      this.selected = value;
      // this.list[index].isSelected = !this.list[index].isSelected;
      this.getLivingCycleDatas()
    },
    getData(){
        this.getTimeSpanClick()
        this.$nextTick(()=>{
            this.$refs.items.getLivingCustomerAndPerformanceDatas()
            this.$refs.funnel.getLivingFilterDatas()
        })
        this.getLivingCustomerAndPerformanceBrokenLineDatas()
        this.getLivingCycleDatas()
        this.getLivingClueTargetDatas()
        this.getLivingPerformanceRates()
        this.getLivingContentplatformClueDatas()
        this.getLivingContentplatformPerformanceDatas()
    }
  },
  mounted(){
    // this.getEmployeeByPositionIdAdmin()
    this.getLiveAnchorBaseInfoValids()
    setTimeout(()=>{
        this.getData()
    },1000)
  }
};
</script>

<style scoped>
.container {
  background: #fff;
  padding: 0 10px;
  box-sizing: border-box;
}
.title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}
.time {
  text-align: end;
}
.h3 {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.card_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.card_item {
  width: 49.5%;
}
.card_item2{
  width: 100%;
}

.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 15px 0;
  width: 100%;
  /* padding: 0 10px; */
  /* box-sizing: border-box; */
}
.tab{
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
.m_b{
    margin-bottom: 10px;
}
.m_t{
  margin-top: 10px;
}
.position_re{
  position: absolute;
  top: 0px;
}
.line{
  border-bottom: 1px solid rgb(216, 216, 216);
}
</style>
