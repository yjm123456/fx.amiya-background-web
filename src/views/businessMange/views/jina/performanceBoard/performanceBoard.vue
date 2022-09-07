<template>
    <!-- <Card class="containers"> -->
        <div class="contents">
            <div class="list2">
            <ul class="uls">
                <li v-for="(item, index) in title_list" :key="index" class="lis">
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
            <div class="results" @scroll="onScroll">
                <div class="scroll-items2">
                    <div class="top_con">
                      <div class="titles">吉娜组业绩</div>
                      <div class="date_con">
                        <DatePicker
                          type="month"
                          placeholder="请选择年月"
                          style="width: 160px;margin:0 10px"
                          transfer
                          :value="month"
                          v-model="month"
                        ></DatePicker>
                        <Button type="primary" @click="getPerformanceByLiveAnchorName">查询</Button>
                      </div>
                    </div>
                    <div class="s_content">
                      <div class="scroll_top">
                        <div class="scroll_left1">
                          <div class="l_h3">总业绩</div>
                          <div class="l_h4">{{jinaTotalPerformance.cueerntMonthTotalPerformance ? (jinaTotalPerformance.cueerntMonthTotalPerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(jinaTotalPerformance.totalPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaTotalPerformance.totalPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaTotalPerformance.totalPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaTotalPerformance.totalPerformanceChainratio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaTotalPerformance.totalPerformanceChainratio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.totalPerformanceChainratio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaTotalPerformance.totalPerformanceChainratio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaTotalPerformance.totalPerformanceTargetComplete)== 1"> {{ Math.abs(jinaTotalPerformance.totalPerformanceTargetComplete) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.totalPerformanceTargetComplete)== -1">{{ Math.abs(jinaTotalPerformance.totalPerformanceTargetComplete) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left2">
                          <div class="l_h3">新客业绩</div>
                          <div class="l_h4">{{jinaTotalPerformance.currentMonthNewCustomerPerformance ? (jinaTotalPerformance.currentMonthNewCustomerPerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                        <div>同比：
                            <span v-if="Math.sign(jinaTotalPerformance.newCustomerPerformanceYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinaTotalPerformance.newCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.newCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaTotalPerformance.newCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaTotalPerformance.newCustomerPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaTotalPerformance.newCustomerPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.newCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaTotalPerformance.newCustomerPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaTotalPerformance.newCustomerPerformanceTargetComplete)== 1"> {{ Math.abs(jinaTotalPerformance.newCustomerPerformanceTargetComplete) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.newCustomerPerformanceTargetComplete)== -1">{{ Math.abs(jinaTotalPerformance.newCustomerPerformanceTargetComplete) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left3">
                          <div class="l_h3">老客业绩</div>
                          <div class="l_h4">{{jinaTotalPerformance.currentMonthOldCustomerPerformance ? (jinaTotalPerformance.currentMonthOldCustomerPerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(jinaTotalPerformance.oldCustomerPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaTotalPerformance.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.oldCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaTotalPerformance.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaTotalPerformance.oldCustomerPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaTotalPerformance.oldCustomerPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.oldCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaTotalPerformance.oldCustomerPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaTotalPerformance.oldCustomerTargetComplete)== 1">{{ Math.abs(jinaTotalPerformance.oldCustomerTargetComplete)+ '%' }}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.oldCustomerTargetComplete)== -1">{{ Math.abs(jinaTotalPerformance.oldCustomerTargetComplete)+ '%' }}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left4">
                          <div class="l_h3">带货业绩</div>
                          <div class="l_h4">{{jinaTotalPerformance.currentMonthCommercePerformance ? (jinaTotalPerformance.currentMonthCommercePerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(jinaTotalPerformance.commercePerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaTotalPerformance.commercePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.commercePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaTotalPerformance.commercePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaTotalPerformance.commercePerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaTotalPerformance.commercePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.commercePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaTotalPerformance.commercePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaTotalPerformance.commercePerformanceTargetComplete)== 1"> {{ Math.abs(jinaTotalPerformance.commercePerformanceTargetComplete)+ '%' }}</span>
                            <span v-else-if="Math.sign(jinaTotalPerformance.commercePerformanceTargetComplete)== -1">{{ Math.abs(jinaTotalPerformance.commercePerformanceTargetComplete) + '%' }}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                      <div class="chart_left">
                        <Card style="background:#f5f5f5">
                            <pie :achievement="jinaTotalPerformance.performanceRatios"></pie>
                        </Card>
                      </div>
                      <div class="chart_right">
                        <Card style="background:#f5f5f5;height:100%">
                          <lines :jinaTotalPerformance="jinaTotalPerformance"></lines>
                        </Card>
                      </div>
                    </div>
                </div>
                <div class="scroll-items2">
                  <div class="top_con">
                    <div class="titles">成交业绩</div>
                    <div class="date_con">
                      <DatePicker
                        type="month"
                        placeholder="请选择年月"
                        style="width: 160px;margin:0 10px"
                        transfer
                        :value="month2"
                        v-model="month2"
                      ></DatePicker>
                      <Button type="primary" @click="getSendAndDealPerformanceByLiveAnchorName">查询</Button>
                    </div>
                  </div>
                  <div class="s_content2">
                    <div class="scroll_top">
                        <div class="scroll_left2">
                          <div class="l_h3">历史派单当月成交</div>
                          <div class="l_h4">{{jinadeal.historySendDuringMonthDeal ? (jinadeal.historySendDuringMonthDeal).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinadeal.historySendDuringMonthDealYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinadeal.historySendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinadeal.historySendDuringMonthDealYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinadeal.historySendDuringMonthDealYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinadeal.historySendDuringMonthDealChainRatio)== 1"> <span class="red">增长</span>{{ Math.abs(jinadeal.historySendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinadeal.historySendDuringMonthDealChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinadeal.historySendDuringMonthDealChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <span style="color:#2d8cf0;cursor:pointer" @click="detailedClick(true)">明细</span>
                        </div>
                      </div>
                  
                  <div class="scroll_top">
                    <div class="scroll_left3">
                      <div class="l_h3">当月派单当月成交</div>
                      <div class="l_h4">{{jinadeal.duringMonthSendDuringMonthDeal ? (jinadeal.duringMonthSendDuringMonthDeal).toFixed(2) :0.00}}</div>
                    </div>
                    <div class="scroll_right2">
                      <div>同比：
                        <span v-if="Math.sign(jinadeal.duringMonthSendDuringMonthDealYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinadeal.duringMonthSendDuringMonthDealYearOnYear) + '%'}}</span>
                        <span v-else-if="Math.sign(jinadeal.duringMonthSendDuringMonthDealYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinadeal.duringMonthSendDuringMonthDealYearOnYear) + '%'}}</span>
                        <span v-else>-</span>
                      </div>
                      <div>环比：
                        <span v-if="Math.sign(jinadeal.duringMonthSendDuringMonthDealChainRatio)== 1"> <span class="red">增长</span>{{ Math.abs(jinadeal.duringMonthSendDuringMonthDealChainRatio) + '%'}}</span>
                        <span v-else-if="Math.sign(jinadeal.duringMonthSendDuringMonthDealChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinadeal.duringMonthSendDuringMonthDealChainRatio) + '%'}}</span>
                        <span v-else>-</span>
                      </div>
                      <span style="color:#2d8cf0;cursor:pointer" @click="detailedClick(false)">明细</span>
                    </div>
                    </div>
                  </div>
                  <div class="chart_content">
                    <div class="chart_left">
                      <Card style="background:#f5f5f5">
                          <dispatchDealPie :performanceRatioVo="jinadeal.performanceRatioVo"></dispatchDealPie>
                      </Card>
                    </div>
                    <div class="chart_right">
                      <Card style="background:#f5f5f5;height:100%">
                        <dispatchDealLine :dispatchDeal="jinadeal"></dispatchDealLine>
                      </Card>
                    </div>
                  </div>
                </div>
                <div class="scroll-items2">
                  <div class="top_con">
                    <div class="titles">面诊业绩</div>
                    <div class="date_con">
                      <DatePicker
                        type="month"
                        placeholder="请选择年月"
                        style="width: 160px;margin:0 10px"
                        transfer
                        :value="month3"
                        v-model="month3"
                      ></DatePicker>
                      <Button type="primary" @click="getConsultationPerformanceByLiveAnchorName">查询</Button>
                    </div>
                  </div>
                  <div class="s_content2">
                    <div class="scroll_top">
                        <div class="scroll_left2">
                          <div class="l_h3">照片面诊</div>
                          <div class="l_h4">{{jinatoFace.pictureConsultationPerformance ? (jinatoFace.pictureConsultationPerformance).toFixed(2) : 0.00}} </div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinatoFace.pictureConsultationPerformanceYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinatoFace.pictureConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinatoFace.pictureConsultationPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinatoFace.pictureConsultationPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinatoFace.pictureConsultationPerformanceChainRatio)== 1"> <span class="red">增长</span>{{ Math.abs(jinatoFace.pictureConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinatoFace.pictureConsultationPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinatoFace.pictureConsultationPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <span style="color:#2d8cf0;cursor:pointer" @click="toFaceDetailedClick(true)">明细</span>
                        </div>
                      </div>
                  <div class="scroll_top">
                    <div class="scroll_left3">
                      <div class="l_h3">视频面诊</div>
                      <div class="l_h4">{{jinatoFace.videoConsultationPerformance ? (jinatoFace.videoConsultationPerformance).toFixed(2) :0.00}} </div>
                    </div>
                    <div class="scroll_right2">
                      <div>同比：
                        <span v-if="Math.sign(jinatoFace.videoConsultationPerformanceYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinatoFace.videoConsultationPerformanceYearOnYear) + '%'}}</span>
                        <span v-else-if="Math.sign(jinatoFace.videoConsultationPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinatoFace.videoConsultationPerformanceYearOnYear) + '%'}}</span>
                        <span v-else>-</span>
                      </div>
                      <div>环比：
                        <span v-if="Math.sign(jinatoFace.videoConsultationPerformanceChainRatio)== 1"> <span class="red">增长</span>{{ Math.abs(jinatoFace.videoConsultationPerformanceChainRatio) + '%'}}</span>
                        <span v-else-if="Math.sign(jinatoFace.videoConsultationPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinatoFace.videoConsultationPerformanceChainRatio) + '%'}}</span>
                        <span v-else>-</span>
                      </div>
                      <span style="color:#2d8cf0;cursor:pointer" @click="toFaceDetailedClick(false)">明细</span>
                    </div>
                    </div>
                  </div>
                  <div class="chart_content">
                    <div class="chart_left">
                      <Card style="background:#f5f5f5">
                          <toFacePie :performanceRatioVo="jinatoFace.performanceRatioVo"></toFacePie>
                      </Card>
                    </div>
                    <div class="chart_right">
                      <Card style="background:#f5f5f5;height:100%">
                        <toFaceLine :dispatchDeal="jinatoFace"></toFaceLine>
                      </Card>
                    </div>
                  </div>
                </div>
                <div class="scroll-items2">
                    <div class="top_con">
                      <div class="titles">独立/协助业绩</div>
                      <div class="date_con">
                        <DatePicker
                          type="month"
                          placeholder="请选择年月"
                          style="width: 160px;margin:0 10px"
                          transfer
                          :value="month4"
                          v-model="month4"
                        ></DatePicker>
                        <Button type="primary" @click="getIndependentOrAssistPerformanceByLiveAnchorName">查询</Button>
                      </div>
                    </div>
                    <div class="s_content">
                      <div class="scroll_top">
                        <div class="scroll_left2">
                          <div class="l_h3">主播独立业绩</div>
                          <div class="l_h4">{{jinaindependentAssist.liveAnchorIndenpendentPerformance ? (jinaindependentAssist.liveAnchorIndenpendentPerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                        <div>同比：
                            <span v-if="Math.sign(jinaindependentAssist.liveAnchorIndenpendentPerformanceYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinaindependentAssist.liveAnchorIndenpendentPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaindependentAssist.liveAnchorIndenpendentPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaindependentAssist.liveAnchorIndenpendentPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaindependentAssist.liveAnchorIndenpendentPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaindependentAssist.liveAnchorIndenpendentPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaindependentAssist.liveAnchorIndenpendentPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaindependentAssist.liveAnchorIndenpendentPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left3">
                          <div class="l_h3">助理独立业绩</div>
                          <div class="l_h4">{{jinaindependentAssist.customerServiceIndenpendentPerformance ? (jinaindependentAssist.customerServiceIndenpendentPerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(jinaindependentAssist.customerServiceIndenpendentPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaindependentAssist.customerServiceIndenpendentPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaindependentAssist.customerServiceIndenpendentPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaindependentAssist.customerServiceIndenpendentPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaindependentAssist.customerServiceIndenpendentPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaindependentAssist.customerServiceIndenpendentPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaindependentAssist.customerServiceIndenpendentPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaindependentAssist.customerServiceIndenpendentPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left4">
                          <div class="l_h3">助理协助业绩</div>
                          <div class="l_h4">{{jinaindependentAssist.customerServiceAssistPerformance ? (jinaindependentAssist.customerServiceAssistPerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(jinaindependentAssist.customerServiceAssistPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaindependentAssist.customerServiceAssistPerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaindependentAssist.customerServiceAssistPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaindependentAssist.customerServiceAssistPerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaindependentAssist.customerServiceAssistPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaindependentAssist.customerServiceAssistPerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaindependentAssist.customerServiceAssistPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaindependentAssist.customerServiceAssistPerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                      <div class="chart_left">
                        <Card style="background:#f5f5f5">
                            <independentAssistPie :achievement="jinaindependentAssist.performanceRatioVo"></independentAssistPie>
                        </Card>
                      </div>
                      <div class="chart_right">
                        <Card style="background:#f5f5f5;height:100%">
                          <independentAssistLine :jinaindependentAssist="jinaindependentAssist"></independentAssistLine>
                        </Card>
                      </div>
                    </div>
                </div>
            </div>
            <!-- 成交明细 -->
            <detailed :detailedModel.sync="detailedModel" :detailedList="detailedList"></detailed>
            <!-- 面诊明细 -->
            <toFaceDetailed :toFaceDetailedModel.sync="toFaceDetailedModel" :toFaceDetailedList="toFaceDetailedList"></toFaceDetailed>
        </div>
    <!-- </Card> -->
</template>
<script>
import * as api from "@/api/amiyaAchievement";
import pie from "./component/pie.vue"
import lines from "./component/lines.vue"
import detailed from "./component/detailed.vue"
import dispatchDealPie from "./component/dispatchDealPie.vue"
import dispatchDealLine from "./component/dispatchDealLine.vue"
import toFaceLine from "./component/toFaceLine.vue"
import toFacePie from "./component/toFacePie.vue"
import toFaceDetailed from "./component/toFaceDetailed.vue"
import independentAssistPie from "./component/independentAssistPie.vue"
import independentAssistLine from "./component/independentAssistLine.vue"
export default {
  components:{
    pie,
    lines,
    detailed,
    dispatchDealLine,
    dispatchDealPie,
    toFaceLine,
    toFacePie,
    toFaceDetailed,
    independentAssistPie,
    independentAssistLine
  },
  props: ["active"],
  data() {
    return {
      activeStep: 0,
      title_list: [
        { title: "吉娜组业绩" },
        { title: "成交业绩" },
        { title: "面诊业绩" },
        { title: "独立/协助业绩" },
      ],
      month:this.$moment().format("YYYY-MM"),
      month2:this.$moment().format("YYYY-MM"),
      month3:this.$moment().format("YYYY-MM"),
      month4:this.$moment().format("YYYY-MM"),
      jinaTotalPerformance:{},
      jinadeal:{},
      jinatoFace:{},
      jinaindependentAssist:{},
      isjinaTotalPerformance:false,
      isjinadeal:false,
      istoFaces:false,
      isjinaindependentAssist:false,
      // 明细
      detailedList:[],
      detailedModel:false,
      // 面诊明细
      toFaceDetailedModel:false,
      toFaceDetailedList:[]
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
        isHistorySendOrder:value,
        liveAnchorName:'吉娜'
      }
      api.getSendAndDealPerformanceDetailList(data).then((res) => {
        if (res.code === 0) {
          this.detailedModel =  true
          const { performance } = res.data;
          this.detailedList =performance
        }
      });
    },
    // 面诊明细
    toFaceDetailedClick(value){
      let str= String(this.$moment(this.month3).format("MM"))
      let month3 = str.substr(str.length - 1, 1)
      const data = {
        year:this.$moment(this.month3).format("YYYY") ? this.$moment(this.month3).format("YYYY") : null,
        month:Number(this.$moment(this.month3).format("MM")) >= 10 ? this.$moment(this.month3).format("MM") : month3,
        isVideo:value,
        liveAnchorName:'吉娜'
      }
      api.getPictureOrVideoPerformanceList(data).then((res) => {
        if (res.code === 0) {
          this.toFaceDetailedModel =  true
          const { performance } = res.data;
          this.toFaceDetailedList =performance
        }
      });
    },
    // 总业绩看板
    getPerformanceByLiveAnchorName() {
      let str= String(this.$moment(this.month).format("MM"))
      let month = str.substr(str.length - 1, 1)
      if(!this.month ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month).format("YYYY") ? this.$moment(this.month).format("YYYY") : null,
        month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
        liveAnchorName:'吉娜'
      }
      // 啊美雅总业绩看板
      api.PerformanceByLiveAnchorName(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isjinaTotalPerformance = true;
          sessionStorage.setItem('jinaTotalPerformance',JSON.stringify(performance))
          this.jinaTotalPerformance = sessionStorage.getItem('jinaTotalPerformance') ? JSON.parse(sessionStorage.getItem('jinaTotalPerformance')) : {}
        }
      });
    },
    // 派单成交业绩
    getSendAndDealPerformanceByLiveAnchorName() {
      let str= String(this.$moment(this.month2).format("MM"))
      let month2 = str.substr(str.length - 1, 1)
      if(!this.month2 ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month2).format("YYYY") ? this.$moment(this.month2).format("YYYY") : null,
        month:Number(this.$moment(this.month2).format("MM")) >= 10 ? this.$moment(this.month2).format("MM") : month2,
        liveAnchorName:'吉娜'
      }
      // 
      api.sendAndDealPerformanceByLiveAnchorName(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isjinadeal = true;
          sessionStorage.setItem('jinadeal',JSON.stringify(performance))
          this.jinadeal = sessionStorage.getItem('jinadeal') ? JSON.parse(sessionStorage.getItem('jinadeal')) : {}
        }
      });
    },
    // 面诊业绩
    getConsultationPerformanceByLiveAnchorName() {
      let str= String(this.$moment(this.month3).format("MM"))
      let month3 = str.substr(str.length - 1, 1)
      if(!this.month3 ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month3).format("YYYY") ? this.$moment(this.month3).format("YYYY") : null,
        month:Number(this.$moment(this.month3).format("MM")) >= 10 ? this.$moment(this.month3).format("MM") : month3,
        liveAnchorName:'吉娜'
      }
      // 
      api.consultationPerformanceByLiveAnchorName(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.istoFaces = true;
          sessionStorage.setItem('jinatoFace',JSON.stringify(performance))
          this.jinatoFace = sessionStorage.getItem('jinatoFace') ? JSON.parse(sessionStorage.getItem('jinatoFace')) : {}
        }
      });
    },
    // 独立/协助业绩
    getIndependentOrAssistPerformanceByLiveAnchorName() {
      let str= String(this.$moment(this.month4).format("MM"))
      let month4 = str.substr(str.length - 1, 1)
      if(!this.month4 ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month4).format("YYYY") ? this.$moment(this.month4).format("YYYY") : null,
        month:Number(this.$moment(this.month4).format("MM")) >= 10 ? this.$moment(this.month4).format("MM") : month4,
        liveAnchorName:'吉娜'
      }
      // 
      api.independentOrAssistPerformanceByLiveAnchorName(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isjinaindependentAssist = true;
          sessionStorage.setItem('jinaindependentAssist',JSON.stringify(performance))
          this.jinaindependentAssist = sessionStorage.getItem('jinaindependentAssist') ? JSON.parse(sessionStorage.getItem('jinaindependentAssist')) : {}
        }
      });
    },
    jump(index) {
      var items = document.querySelectorAll(".scroll-items2");
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
      let scrollItems = document.querySelectorAll(".scroll-items2");
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
    // if(!sessionStorage.getItem('jinaTotalPerformance')){
    //  this.getPerformanceByLiveAnchorName()
    // }else{
    //    this.jinaTotalPerformance = JSON.parse(sessionStorage.getItem('jinaTotalPerformance'))
    // }
  },
  mounted(){
    // if(this.isjinaTotalPerformance == true){
    //   this.jinaTotalPerformance = JSON.parse(sessionStorage.getItem('jinaTotalPerformance'))
    // }
  },
  watch:{
    active: {
      handler(value) {
        if (value === "performanceBoard") {
          if(this.isjinaTotalPerformance == true){
            this.jinaTotalPerformance = JSON.parse(sessionStorage.getItem('jinaTotalPerformance'))
          }else{
            this.getPerformanceByLiveAnchorName()
          }
          if(this.isjinadeal == true){
            this.jinadeal = JSON.parse(sessionStorage.getItem('jinadeal'))
          }else{
            this.getSendAndDealPerformanceByLiveAnchorName()
          }
          if(this.istoFaces == true){
            this.jinatoFace = JSON.parse(sessionStorage.getItem('jinatoFace'))
          }else{
            this.getConsultationPerformanceByLiveAnchorName()
          }
          if(this.isjinaindependentAssist == true){
            this.jinaindependentAssist = JSON.parse(sessionStorage.getItem('jinaindependentAssist'))
          }else{
            this.getIndependentOrAssistPerformanceByLiveAnchorName()
          }
        }
      },
      immediate: true,
    },
  }
};
</script>
<style lang="less" scoped>
.containers {
  // margin-top: 16px;

}
.top_con{
    display: flex;
    justify-s: space-between;
    margin-bottom: 10px;
    padding: 0 1.5%;
    box-sizing: border-box;
}
.titles{
    font-size: 18px;
    font-weight: bold;
}

.list2 {
  width: 10%;
  /* height: 40px;
  margin-bottom: 20px;
  background: pink; */
  overflow-y: hidden;
  background: #fff;
  border-radius: 2%;
}
.uls {
  height: 40px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.lis {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.li > span {
  cursor: pointer;
}
.results {
  width: 90%;
  height: 630px;
  overflow-y: scroll;
  margin-left: 10px;
  color: #000;
}
.scroll-items2 {
  width: 100%;
  height: 630px;
  margin-top: 20px;
  background: #fff;
  border-radius: 2%;
  padding: 2%;
  box-sizing: border-box;
}
.scroll-items2 > span {
  font-size: 40px;
}
.scroll-items2:first-child {
  margin-top: 0;
}
.scroll-items2:last-child {
  height: 630px;
}
.contents {
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
.lis:nth-child(1) {
  margin-left: 16px;
}
.lis:nth-child(2) {
  margin-left: 0px;
}
.lis:nth-child(3) {
  margin-left: 0px;
}
.lis:nth-child(4) {
  margin-left: 32px;
}
.lis:last-child .line {
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
