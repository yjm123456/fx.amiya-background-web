<template>
  <div>
    <!-- <Card class="container"> -->
      
      <div class="content">
        <div class="list1">
          <ul class="ul">
            <li v-for="(item, index) in title_list" :key="index" class="li">
              <span
                ref="spans"
                :style="{ color: activeStep === index ? '#1987e1' : 'skyblue' }"
                @click="jump(index)"
              >
                <div
                  class="cirle"
                  :style="{
                    border:
                      activeStep === index
                        ? '2px solid #1987e1'
                        : '1px solid skyblue',
                  }"
                ></div>
                {{ item.title }}
              </span>
              <div class="line"></div>
            </li>
          </ul>
        </div>
        <div class="result" @scroll="onScroll">
          <div class="scroll-item">
            <div class="top_con">
              <div class="titles">啊美雅业绩</div>
              <div class="date_con">
                <DatePicker
                  type="month"
                  placeholder="请选择年月"
                  style="width: 160px;margin:0 10px"
                  transfer
                  :value="month"
                  v-model="month"
                ></DatePicker>
                <Button type="primary" @click="getAchievementClick">查询</Button>
              </div>
            </div>
            <div class="s_content">
              <div class="scroll_top">
                <div class="scroll_left1">
                  <div class="l_h3">总业绩</div>
                  <div class="l_h4">{{performance.totalPerformance ? (performance.totalPerformance).toFixed(2) : 0.00}}</div>
                </div>
                <div class="scroll_right">
                  <div>同比：
                    <span v-if="Math.sign(performance.totalPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(performance.totalPerformanceYearOnYear) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performance.totalPerformanceYearOnYear) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>环比：
                    <span v-if="Math.sign(performance.totalPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(performance.totalPerformanceChainRatio) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.totalPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performance.totalPerformanceChainRatio) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>目标达成：
                    <span v-if="Math.sign(performance.totalPerformanceTargetComplete)== 1"> {{ Math.abs(performance.totalPerformanceTargetComplete) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.totalPerformanceTargetComplete)== -1">{{ Math.abs(performance.totalPerformanceTargetComplete) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="scroll_top">
                <div class="scroll_left2">
                  <div class="l_h3">新客业绩</div>
                  <div class="l_h4">{{performance.newPerformance ? (performance.newPerformance).toFixed(2) : 0.00}}</div>
                </div>
                <div class="scroll_right">
                 <div>同比：
                    <span v-if="Math.sign(performance.newPerformanceYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(performance.newPerformanceYearOnYear) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.newPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performance.newPerformanceYearOnYear) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>环比：
                    <span v-if="Math.sign(performance.newPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(performance.newPerformanceChainRatio) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.newPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performance.newPerformanceChainRatio) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>目标达成：
                    <span v-if="Math.sign(performance.newPerformanceTargetComplete)== 1"> {{ Math.abs(performance.newPerformanceTargetComplete) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.newPerformanceTargetComplete)== -1">{{ Math.abs(performance.newPerformanceTargetComplete) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="scroll_top">
                <div class="scroll_left3">
                  <div class="l_h3">老客业绩</div>
                  <div class="l_h4">{{performance.oldPerformance ? (performance.oldPerformance).toFixed(2) : 0.00}}</div>
                </div>
                <div class="scroll_right">
                  <div>同比：
                    <span v-if="Math.sign(performance.oldPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(performance.oldPerformanceYearOnYear) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.oldPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performance.oldPerformanceYearOnYear) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>环比：
                    <span v-if="Math.sign(performance.oldPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(performance.oldPerformanceChainRatio) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.oldPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performance.oldPerformanceChainRatio) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>目标达成：
                    <span v-if="Math.sign(performance.oldPerformanceTargetComplete)== 1">{{ Math.abs(performance.oldPerformanceTargetComplete)+ '%' }}</span>
                    <span v-else-if="Math.sign(performance.oldPerformanceTargetComplete)== -1">{{ Math.abs(performance.oldPerformanceTargetComplete)+ '%' }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="scroll_top">
                <div class="scroll_left4">
                  <div class="l_h3">带货业绩</div>
                  <div class="l_h4">{{performance.commercePerformance ? (performance.commercePerformance).toFixed(2) : 0.00}}</div>
                </div>
                <div class="scroll_right">
                  <div>同比：
                    <span v-if="Math.sign(performance.commercePerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(performance.commercePerformanceYearOnYear) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.commercePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performance.commercePerformanceYearOnYear) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>环比：
                    <span v-if="Math.sign(performance.commercePerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(performance.commercePerformanceChainRatio) + '%'}}</span>
                    <span v-else-if="Math.sign(performance.commercePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performance.commercePerformanceChainRatio) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>目标达成：
                    <span v-if="Math.sign(performance.commercePerformanceTargetComplete)== 1"> {{ Math.abs(performance.commercePerformanceTargetComplete)+ '%' }}</span>
                    <span v-else-if="Math.sign(performance.commercePerformanceTargetComplete)== -1">{{ Math.abs(performance.commercePerformanceTargetComplete) + '%' }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart_content">
              <div class="chart_left">
                <Card style="background:#f5f5f5">
                    <totalPerformancePie :achievement="performance.performanceRatios"></totalPerformancePie>
                </Card>
              </div>
              <div class="chart_right">
                <Card style="background:#f5f5f5;height:100%">
                  <achievement :performance="performance"></achievement>
                </Card>
              </div>
            </div>
          </div>
          <div class="scroll-item">
            <div class="top_con">
              <div class="titles">分组业绩</div>
              <div class="date_con">
                <DatePicker
                  type="month"
                  placeholder="请选择年月"
                  style="width: 160px;margin:0 10px"
                  transfer
                  :value="month2"
                  v-model="month2"
                ></DatePicker>
                <Button type="primary" @click="groupPerformance">查询</Button>
              </div>
            </div>
            <div class="s_content2">
              <div class="scroll_top">
                <div class="scroll_left2">
                  <div class="l_h3">刀刀组业绩</div>
                  <div class="l_h4">{{grouping.groupDaoDaoPerformance ? (grouping.groupDaoDaoPerformance).toFixed(2) : 0.00}}</div>
                </div>
                <div class="scroll_right">
                  <div>同比：
                    <span v-if="Math.sign(grouping.groupDaoDaoPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(grouping.groupDaoDaoPerformanceYearOnYear) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.groupDaoDaoPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(grouping.groupDaoDaoPerformanceYearOnYear) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>环比：
                    <span v-if="Math.sign(grouping.groupDaoDaoPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(grouping.groupDaoDaoPerformanceChainRatio) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.groupDaoDaoPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(grouping.groupDaoDaoPerformanceChainRatio) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>目标达成：
                    <span v-if="Math.sign(grouping.groupDaoDaoPerformanceCompleteRate)== 1"> {{ Math.abs(grouping.groupDaoDaoPerformanceCompleteRate) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.groupDaoDaoPerformanceCompleteRate)== -1">{{ Math.abs(grouping.groupDaoDaoPerformanceCompleteRate) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="scroll_top">
                <div class="scroll_left3">
                  <div class="l_h3">吉娜组业绩</div>
                  <div class="l_h4">{{grouping.groupJinaPerformance ? (grouping.groupJinaPerformance).toFixed(2) : 0.00}}</div>
                </div>
                <div class="scroll_right">
                 <div>同比：
                    <span v-if="Math.sign(grouping.groupJinaPerformanceYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(grouping.groupJinaPerformanceYearOnYear) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.groupJinaPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(grouping.groupJinaPerformanceYearOnYear) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>环比：
                    <span v-if="Math.sign(grouping.groupJinaPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(grouping.groupJinaPerformanceChainRatio) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.groupJinaPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(grouping.groupJinaPerformanceChainRatio) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>目标达成：
                    <span v-if="Math.sign(grouping.groupJinaPerformanceCompleteRate)== 1"> {{ Math.abs(grouping.groupJinaPerformanceCompleteRate) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.groupJinaPerformanceCompleteRate)== -1">{{ Math.abs(grouping.groupJinaPerformanceCompleteRate) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <!-- <div class="scroll_top">
                <div class="scroll_left4">
                  <div class="l_h3">合作达人业绩</div>
                  <div class="l_h4">{{grouping.cooperationLiveAnchorPerformance ? (grouping.cooperationLiveAnchorPerformance).toFixed(2) : 0.00 }}</div>
                </div>
                <div class="scroll_right">
                  <div>同比：
                    <span v-if="Math.sign(grouping.cooperationLiveAnchorPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(grouping.cooperationLiveAnchorPerformanceYearOnYear) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.cooperationLiveAnchorPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(grouping.cooperationLiveAnchorPerformanceYearOnYear) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>环比：
                    <span v-if="Math.sign(grouping.cooperationLiveAnchorPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(grouping.cooperationLiveAnchorPerformanceChainRatio) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.cooperationLiveAnchorPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(grouping.cooperationLiveAnchorPerformanceChainRatio) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>目标达成：
                    <span v-if="Math.sign(grouping.cooperationLiveAnchorPerformanceCompleteRate)== 1">{{ Math.abs(grouping.cooperationLiveAnchorPerformanceCompleteRate)+ '%' }}</span>
                    <span v-else-if="Math.sign(grouping.cooperationLiveAnchorPerformanceCompleteRate)== -1">{{ Math.abs(grouping.cooperationLiveAnchorPerformanceCompleteRate)+ '%' }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="scroll_top">
                <div class="scroll_left5">
                  <div class="l_h3">黄V组业绩</div>
                  <div class="l_h4">{{grouping.groupYellowVPerformance ? (grouping.groupYellowVPerformance).toFixed(2) : 0.00}}</div>
                </div>
                <div class="scroll_right">
                  <div>同比：
                    <span v-if="Math.sign(grouping.groupYellowVPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(grouping.groupYellowVPerformanceYearOnYear) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.groupYellowVPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(grouping.groupYellowVPerformanceYearOnYear) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>环比：
                    <span v-if="Math.sign(grouping.groupYellowVPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(grouping.groupYellowVPerformanceChainRatio) + '%'}}</span>
                    <span v-else-if="Math.sign(grouping.groupYellowVPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(grouping.groupYellowVPerformanceChainRatio) + '%'}}</span>
                    <span v-else>-</span>
                  </div>
                  <div>目标达成：
                    <span v-if="Math.sign(grouping.groupYellowVPerformanceCompleteRate)== 1"> {{ Math.abs(grouping.groupYellowVPerformanceCompleteRate)+ '%' }}</span>
                    <span v-else-if="Math.sign(grouping.groupYellowVPerformanceCompleteRate)== -1">{{ Math.abs(grouping.groupYellowVPerformanceCompleteRate) + '%' }}</span>
                    <span v-else>-</span>
                  </div>
                </div>
              </div> -->
            </div>
            <div class="chart_content">
              <div class="chart_left">
                <Card style="background:#f5f5f5">
                    <groupingPie :achievement="grouping.performanceRatios"></groupingPie>
                </Card>
              </div>
              <div class="chart_right">
                <Card style="background:#f5f5f5;height:100%">
                  <groupingLine :performance="grouping"></groupingLine>
                </Card>
              </div>
            </div>
          </div>
          <div class="scroll-item">
            <div class="top_con">
              <div class="titles">派单成交业绩</div>
              <div class="date_con">
                <DatePicker
                  type="month"
                  placeholder="请选择年月"
                  style="width: 160px;margin:0 10px"
                  transfer
                  :value="month3"
                  v-model="month3"
                ></DatePicker>
                <Button type="primary" @click="dispatchDealChange">查询</Button>
              </div>
            </div>
            <div class="s_content2">
              <div class="scroll_top">
                  <div class="scroll_left2">
                    <div class="l_h3">历史派单当月成交</div>
                    <div class="l_h4">{{dispatchDeal.historySendDuringMonthDeal ? (dispatchDeal.historySendDuringMonthDeal).toFixed(2) : 0.00}}</div>
                  </div>
                  <div class="scroll_right2">
                    <div>同比：
                      <span v-if="Math.sign(dispatchDeal.historySendDuringMonthDealYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(dispatchDeal.historySendDuringMonthDealYearOnYear) + '%'}}</span>
                      <span v-else-if="Math.sign(dispatchDeal.historySendDuringMonthDealYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(dispatchDeal.historySendDuringMonthDealYearOnYear) + '%'}}</span>
                      <span v-else>-</span>
                    </div>
                    <div>环比：
                      <span v-if="Math.sign(dispatchDeal.historySendDuringMonthDealChainRatio)== 1"> <span class="red">增长</span>{{ Math.abs(dispatchDeal.historySendDuringMonthDealChainRatio) + '%'}}</span>
                      <span v-else-if="Math.sign(dispatchDeal.historySendDuringMonthDealChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(dispatchDeal.historySendDuringMonthDealChainRatio) + '%'}}</span>
                      <span v-else>-</span>
                    </div>
                    <span style="color:#2d8cf0;cursor:pointer" @click="detailedClick(true)">明细</span>
                  </div>
                </div>
            
            <div class="scroll_top">
              <div class="scroll_left3">
                <div class="l_h3">当月派单当月成交</div>
                <div class="l_h4">{{dispatchDeal.duringMonthSendDuringMonthDeal ? (dispatchDeal.duringMonthSendDuringMonthDeal).toFixed(2) :0.00}}</div>
              </div>
              <div class="scroll_right2">
                <div>同比：
                  <span v-if="Math.sign(dispatchDeal.duringMonthSendDuringMonthDealYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(dispatchDeal.duringMonthSendDuringMonthDealYearOnYear) + '%'}}</span>
                  <span v-else-if="Math.sign(dispatchDeal.duringMonthSendDuringMonthDealYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(dispatchDeal.duringMonthSendDuringMonthDealYearOnYear) + '%'}}</span>
                  <span v-else>-</span>
                </div>
                <div>环比：
                  <span v-if="Math.sign(dispatchDeal.duringMonthSendDuringMonthDealChainRatio)== 1"> <span class="red">增长</span>{{ Math.abs(dispatchDeal.duringMonthSendDuringMonthDealChainRatio) + '%'}}</span>
                  <span v-else-if="Math.sign(dispatchDeal.duringMonthSendDuringMonthDealChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(dispatchDeal.duringMonthSendDuringMonthDealChainRatio) + '%'}}</span>
                  <span v-else>-</span>
                </div>
                <span style="color:#2d8cf0;cursor:pointer" @click="detailedClick(false)">明细</span>
              </div>
              </div>
            </div>
            <div class="chart_content">
              <div class="chart_left">
                <Card style="background:#f5f5f5">
                    <dispatchDealPie :performanceRatioVo="dispatchDeal.performanceRatioVo"></dispatchDealPie>
                </Card>
              </div>
              <div class="chart_right">
                <Card style="background:#f5f5f5;height:100%">
                  <dispatchDealLine :dispatchDeal="dispatchDeal"></dispatchDealLine>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 明细 -->
      <detailed :detailedModel.sync="detailedModel" :detailedList="detailedList"></detailed>
    <!-- </Card> -->
  </div>
</template>
<script>
import * as api from "@/api/amiyaAchievement";
import totalPerformancePie from "./components/pie.vue"
import achievement from "./components/achievement.vue"
import dispatchDealPie from "./components/dispatchDealPie.vue"
import dispatchDealLine from "./components/dispatchDealLine.vue"
import detailed from "./components/detailed.vue"
import groupingLine from "./components/groupingLine.vue"
import groupingPie from "./components/groupingPie.vue"
export default {
  components:{
    totalPerformancePie,
    achievement,
    dispatchDealPie,
    dispatchDealLine,
    detailed,
    groupingLine,
    groupingPie
  },
  props: ["activeName"],
  data() {
    return {
      activeStep: 0,
      title_list: [
        { title: "啊美雅业绩" },
        { title: "分组业绩" },
        { title: "派单成交业绩" },
      ],
      month: this.$moment().format("YYYY-MM"),
      month2: this.$moment().format("YYYY-MM"),
      month3: this.$moment().format("YYYY-MM"),
      performance:{},
      // 成交业绩
      dispatchDeal:{},
      // 分组业绩
      grouping:{},
      // 明细
      detailedList:[],
      detailedModel:false,
      isGrouping:false,
      isdispatchDeal:false,
      isperformance:false,

      
    };
  },
  methods: {
    // 明细
    detailedClick(value){
      let str= String(this.$moment(this.month2).format("MM"))
      let month2 = str.substr(str.length - 1, 1)
      const data = {
        year:this.$moment(this.month2).format("YYYY") ? this.$moment(this.month2).format("YYYY") : null,
        month:Number(this.$moment(this.month2).format("MM")) >= 10 ? this.$moment(this.month2).format("MM") : month2,
        isHistorySendOrder:value
      }
      api.getSendAndDealPerformanceDetailList(data).then((res) => {
        if (res.code === 0) {
          this.detailedModel =  true
          const { performance } = res.data;
          this.detailedList =performance
        }
      });
    },
    // 总业绩看板
    getAchievementClick() {
      let str= String(this.$moment(this.month).format("MM"))
      let month = str.substr(str.length - 1, 1)
      if(!this.month ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month).format("YYYY") ? this.$moment(this.month).format("YYYY") : null,
        month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month
      }
      // 啊美雅总业绩看板
      api.totalPerformance(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isperformance = true;
          sessionStorage.setItem('performance',JSON.stringify(performance))
          this.performance = sessionStorage.getItem('performance') ? JSON.parse(sessionStorage.getItem('performance')) : {}
        }
      });
    },
    // 分组业绩
    groupPerformance(){
      let str= String(this.$moment(this.month2).format("MM"))
      let month2 = str.substr(str.length - 1, 1)
      if(!this.month2 ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month2).format("YYYY") ? this.$moment(this.month2).format("YYYY") : null,
        month:Number(this.$moment(this.month2).format("MM")) >= 10 ? this.$moment(this.month2).format("MM") : month2
      }
      // 分组业绩
      api.groupPerformance(data).then((res) => {
        if (res.code === 0) {
          this.isGrouping = true
          const { performance } = res.data;
          sessionStorage.setItem('grouping',JSON.stringify(performance))
          this.grouping = sessionStorage.getItem('grouping') ? JSON.parse(sessionStorage.getItem('grouping')) : {}
        }
      });

    },
    // 派单成交业绩
    dispatchDealChange() {
      let str= String(this.$moment(this.month3).format("MM"))
      let month3 = str.substr(str.length - 1, 1)
      if(!this.month3 ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month3).format("YYYY") ? this.$moment(this.month3).format("YYYY") : null,
        month:Number(this.$moment(this.month3).format("MM")) >= 10 ? this.$moment(this.month3).format("MM") : month3
      }
      // 派单成交业绩
      api.sendAndDealPerformance(data).then((res) => {
        if (res.code === 0) {
          this.isdispatchDeal = true
          const { performance } = res.data;
          sessionStorage.setItem('dispatchDeal',JSON.stringify(performance))
          this.dispatchDeal = sessionStorage.getItem('dispatchDeal') ? JSON.parse(sessionStorage.getItem('dispatchDeal')) : {}
        }
      });

    },
    jump(index) {
      var items = document.querySelectorAll(".scroll-item");
      for (var i = 0; i < items.length; i++) {
        if (index === i) {
          items[i].scrollIntoView({
            block: "start", //默认跳转到顶部
            behavior: "smooth", //滚动的速度
          });
        }
      }
    },
    onScroll(e) {
      let scrollItems = document.querySelectorAll(".scroll-item");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        if (judge) {
          this.activeStep = i;
          break;
        }
      }
    },
  },
  created() {
    // if(this.isperformance == true){
    //   this.performance = JSON.parse(sessionStorage.getItem('performance'))
    // }
    // if(this.isdispatchDeal == true){
    //   this.dispatchDeal = JSON.parse(sessionStorage.getItem('dispatchDeal'))
    // }
    // if(this.isGrouping == true){
    //   this.grouping = JSON.parse(sessionStorage.getItem('grouping'))
    // }
    // if(!sessionStorage.getItem('performance')){
    //  this.getAchievementClick()
    // }else{
    //    this.performance = JSON.parse(sessionStorage.getItem('performance'))
    // }
    // if(!sessionStorage.getItem('dispatchDeal')){
    //   this.dispatchDealChange()
    // }else{
    //   this.dispatchDeal = JSON.parse(sessionStorage.getItem('dispatchDeal'))
    // }
    // if(!sessionStorage.getItem('grouping')){
    //   this.groupPerformance()
    // }else{
    //   this.grouping = JSON.parse(sessionStorage.getItem('grouping'))
    // }
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "ameya") {
          // this.getAchievementClick()
          // this.dispatchDealChange()
          // this.groupPerformance()
          // if(!sessionStorage.getItem('performance')){
          //  this.getAchievementClick()
          // }
          // if(!sessionStorage.getItem('dispatchDeal')){
          //   this.dispatchDealChange()
          // }
          // if(!sessionStorage.getItem('grouping')){
          //   this.groupPerformance()
          // }

          if(this.isperformance == true){
            this.performance = JSON.parse(sessionStorage.getItem('performance'))
          }else{
            this.getAchievementClick()
          }
          if(this.isdispatchDeal == true){
            this.dispatchDeal = JSON.parse(sessionStorage.getItem('dispatchDeal'))
          }else{
            this.dispatchDealChange()
          }
          if(this.isGrouping == true){
             this.grouping = JSON.parse(sessionStorage.getItem('grouping'))
          }else{
            this.groupPerformance()
          }

        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  // margin-top: 16px;
}
.top_con {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  // padding: 0 1.5%;
  // box-sizing: border-box;
}
.titles {
  font-size: 18px;
  font-weight: bold;
}

.list1 {
  width: 10%;
  /* height: 40px;
  margin-bottom: 20px;
  background: pink; */
  overflow-y: hidden;
  background: #fff;
  border-radius: 2%;
}
.ul {
  height: 40px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.li {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.li > span {
  cursor: pointer;
}
.result {
  width: 90%;
  height: 730px;
  overflow-y: scroll;
  margin-left: 10px;
  color: #000;
}
.scroll-item {
  width: 100%;
  height: 730px;
  margin-top: 20px;
  background: #fff;
  border-radius: 2%;
  padding: 2%;
  box-sizing: border-box;
}
.scroll-item > span {
  font-size: 40px;
}
.scroll-item:first-child {
  margin-top: 0;
}
.scroll-item:last-child {
  height: 730px;
}
.content {
  width: 100%;
  display: flex;
}
.line {
  height: 100px;
  width: 1px;
  /* color: skyblue; */
  display: block;
  border: 1px solid skyblue;
  margin-left: 7%;
}
.li:nth-child(1) {
  margin-left: 0px;
}
.li:nth-child(2) {
  margin-left: -16px;
}
.li:nth-child(3) {
  margin-left: 15px;
}
.li:last-child .line {
  border: none;
}
.cirle {
  width: 15px;
  height: 15px;
  border: 1px solid skyblue;
  display: inline-block;
  border-radius: 50%;
  font-weight: bold;
}

.s_content,
.scroll_top {
  display: flex;
}
.s_content {
  justify-content: space-between;
}
.s_content2 {
  display: flex;
  justify-content: space-around;
}
.l_h3,
.l_h4 {
  font-size: 18px;
}
.scroll_left1,.scroll_left2,.scroll_left3,.scroll_left4,.scroll_left5 {
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}
.scroll_left1{
  background: #9A66E4
}
.scroll_left2{
  background: #2d8cf0;
}
.scroll_left3{
  background: #19be6b;
}
.scroll_left4{
  background: #ff9900;
}
.scroll_left5{
  background: #E46CBB;
}
.scroll_right,.scroll_right2{
  background: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
.scroll_right2{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.l_h4 {
  font-weight: bold;
}
.chart_content{
  display: flex;
  margin-top: 50px;
}
.chart_left{
  width: 40%;
}
.chart_right{
  width: 58%;
  margin-left: 2%;
}
.red{
  color: green;
  margin-right: 4px;
}
.green{
  color: red;
  margin-right: 4px;
}
</style>
