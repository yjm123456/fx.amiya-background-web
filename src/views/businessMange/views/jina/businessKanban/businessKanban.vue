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
                <div class="scroll-item4">
                    <div class="top_con">
                      <div class="titles">基础经营看板</div>
                      <div class="date_con">
                        <DatePicker
                          type="month"
                          placeholder="请选择年月"
                          style="width: 160px;margin:0 10px"
                          transfer
                          :value="month"
                          v-model="month"
                        ></DatePicker>
                        <Button type="primary" @click="getBaseBusinessPerformance">查询</Button>
                      </div>
                    </div>
                    <div class="s_content3">
                      <div class="scroll_top2">
                        <div class="scroll_left11">
                          <div class="l_h3">加V</div>
                          <div class="l_h4">{{jinaBaseBusiness.addWeChatNum ? jinaBaseBusiness.addWeChatNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                        <div>同比：
                            <span v-if="Math.sign(jinaBaseBusiness.addWeChatNumYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinaBaseBusiness.addWeChatNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.addWeChatNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.addWeChatNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaBaseBusiness.addWeChatNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.addWeChatNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.addWeChatNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.addWeChatNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaBaseBusiness.addWeChatNumTargetComplete)== 1"> {{ Math.abs(jinaBaseBusiness.addWeChatNumTargetComplete) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.addWeChatNumTargetComplete)== -1">{{ Math.abs(jinaBaseBusiness.addWeChatNumTargetComplete) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left12">
                          <div class="l_h3">面诊卡下单</div>
                          <div class="l_h4">{{jinaBaseBusiness.consulationCardNum ? jinaBaseBusiness.consulationCardNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaBaseBusiness.consulationCardNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.consulationCardNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.consulationCardNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.consulationCardNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaBaseBusiness.consulationCardNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.consulationCardNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.consulationCardNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.consulationCardNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaBaseBusiness.consulationCardNumTargetComplete)== 1"> {{ Math.abs(jinaBaseBusiness.consulationCardNumTargetComplete) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.consulationCardNumTargetComplete)== -1">{{ Math.abs(jinaBaseBusiness.consulationCardNumTargetComplete) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left13">
                          <div class="l_h3">当月面诊卡消耗</div>
                          <div class="l_h4">{{jinaBaseBusiness.thisMonthConsulationCardConsumedNum ? jinaBaseBusiness.thisMonthConsulationCardConsumedNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardConsumedNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardConsumedNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardConsumedNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardConsumedNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardConsumedNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardConsumedNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardConsumedNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardConsumedNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardConsumedNumTargetComplete	)== 1"> {{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardConsumedNumTargetComplete	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardConsumedNumTargetComplete	)== -1">{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardConsumedNumTargetComplete	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left15">
                          <div class="l_h3">历史面诊卡消耗</div>
                          <div class="l_h4">{{jinaBaseBusiness.historyConsulationCardConsumedNum ? jinaBaseBusiness.historyConsulationCardConsumedNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaBaseBusiness.historyConsulationCardConsumedNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.historyConsulationCardConsumedNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.historyConsulationCardConsumedNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.historyConsulationCardConsumedNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaBaseBusiness.historyConsulationCardConsumedNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.historyConsulationCardConsumedNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.historyConsulationCardConsumedNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.historyConsulationCardConsumedNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaBaseBusiness.historyConsulationCardConsumedNumTargetComplete	)== 1"> {{ Math.abs(jinaBaseBusiness.historyConsulationCardConsumedNumTargetComplete	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.historyConsulationCardConsumedNumTargetComplete	)== -1">{{ Math.abs(jinaBaseBusiness.historyConsulationCardConsumedNumTargetComplete	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="s_content3" style="margin-top:10px">
                      <div class="scroll_top2">
                        <div class="scroll_left16">
                          <div class="l_h3">当月面诊卡退单</div>
                          <div class="l_h4">{{jinaBaseBusiness.thisMonthConsulationCardRefundNum ? jinaBaseBusiness.thisMonthConsulationCardRefundNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardRefundNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardRefundNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardRefundNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardRefundNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardRefundNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardRefundNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardRefundNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardRefundNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardRefundNumTargetComplete	)== 1"> {{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardRefundNumTargetComplete	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.thisMonthConsulationCardRefundNumTargetComplete	)== -1">{{ Math.abs(jinaBaseBusiness.thisMonthConsulationCardRefundNumTargetComplete	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left17">
                          <div class="l_h3">历史面诊卡退单</div>
                          <div class="l_h4">{{jinaBaseBusiness.historyConsulationCardRefundNum ? jinaBaseBusiness.historyConsulationCardRefundNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaBaseBusiness.historyConsulationCardRefundNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.historyConsulationCardRefundNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.historyConsulationCardRefundNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.historyConsulationCardRefundNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaBaseBusiness.historyConsulationCardRefundNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaBaseBusiness.historyConsulationCardRefundNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaBaseBusiness.historyConsulationCardRefundNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(jinaBaseBusiness.historyConsulationCardRefundNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left18">
                          <div class="l_h3">面诊卡库存量</div>
                          <div class="l_h4">{{jinaBaseBusiness.consulationCardInventoryNum ? jinaBaseBusiness.consulationCardInventoryNum : 0}}</div>
                        </div>
                      </div>
                      
                    </div>
                    <div class="chart_content">
                        <Card style="background:#f5f5f5;width:100%;height:280px">
                          <baseBusinessLine :daodaoBaseBusiness="jinaBaseBusiness"></baseBusinessLine>
                        </Card>
                    </div>
                </div>
                <div class="scroll-item4">
                    <div class="top_con">
                      <div class="titles">派单成交</div>
                      <div class="date_con">
                        <DatePicker
                          type="month"
                          placeholder="请选择年月"
                          style="width: 160px;margin:0 10px"
                          transfer
                          :value="month2"
                          v-model="month2"
                        ></DatePicker>
                        <Button type="primary" @click="getSndAndDealNumPerformance">查询</Button>
                      </div>
                    </div>
                    <div class="s_content3">
                      <div class="scroll_top2">
                        <div class="scroll_left11">
                          <div class="l_h3">派单数</div>
                          <div class="l_h4">{{jinaSndAndDealNumPerformance.sendOrderNum ? jinaSndAndDealNumPerformance.sendOrderNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                        <div>同比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.sendOrderNumYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.sendOrderNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.sendOrderNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.sendOrderNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.sendOrderNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.sendOrderNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.sendOrderNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.sendOrderNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.sendOrderNumCompleteRate)== 1"> {{ Math.abs(jinaSndAndDealNumPerformance.sendOrderNumCompleteRate) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.sendOrderNumCompleteRate)== -1">{{ Math.abs(jinaSndAndDealNumPerformance.sendOrderNumCompleteRate) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left12">
                          <div class="l_h3">总上门数</div>
                          <div class="l_h4">{{jinaSndAndDealNumPerformance.totalVisitNum ? jinaSndAndDealNumPerformance.totalVisitNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.totalVisitNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.totalVisitNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.totalVisitNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.totalVisitNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.totalVisitNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.totalVisitNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.totalVisitNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.totalVisitNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.totalVisitNumCompleteRate)== 1"> {{ Math.abs(jinaSndAndDealNumPerformance.totalVisitNumCompleteRate) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.totalVisitNumCompleteRate)== -1">{{ Math.abs(jinaSndAndDealNumPerformance.totalVisitNumCompleteRate) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left13">
                          <div class="l_h3">新客上门数</div>
                          <div class="l_h4">{{jinaSndAndDealNumPerformance.newCustomerVisitNum ? jinaSndAndDealNumPerformance.newCustomerVisitNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerVisitNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerVisitNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerVisitNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerVisitNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerVisitNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerVisitNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerVisitNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerVisitNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerVisitNumCompleteRate	)== 1"> {{ Math.abs(jinaSndAndDealNumPerformance.newCustomerVisitNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerVisitNumCompleteRate	)== -1">{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerVisitNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left15">
                          <div class="l_h3">老客上门数</div>
                          <div class="l_h4">{{jinaSndAndDealNumPerformance.oldCustomerVisitNum ? jinaSndAndDealNumPerformance.oldCustomerVisitNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerVisitNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerVisitNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerVisitNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerVisitNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerVisitNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerVisitNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerVisitNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerVisitNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerVisitNumCompleteRate	)== 1"> {{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerVisitNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerVisitNumCompleteRate	)== -1">{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerVisitNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="s_content3" style="margin-top:10px">
                      <div class="scroll_top2">
                        <div class="scroll_left16">
                          <div class="l_h3">总成交数</div>
                          <div class="l_h4">{{jinaSndAndDealNumPerformance.totalDealNum ? jinaSndAndDealNumPerformance.totalDealNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.totalDealNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.totalDealNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.totalDealNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.totalDealNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.totalDealNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.totalDealNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.totalDealNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.totalDealNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.totalDealNumCompleteRate	)== 1"> {{ Math.abs(jinaSndAndDealNumPerformance.totalDealNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.totalDealNumCompleteRate	)== -1">{{ Math.abs(jinaSndAndDealNumPerformance.totalDealNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left17">
                          <div class="l_h3">新客成交数</div>
                          <div class="l_h4">{{jinaSndAndDealNumPerformance.newCustomerDealNum ? jinaSndAndDealNumPerformance.newCustomerDealNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerDealNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerDealNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerDealNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerDealNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerDealNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerDealNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerDealNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerDealNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerDealNumCompleteRate	)== 1"> {{ Math.abs(jinaSndAndDealNumPerformance.newCustomerDealNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.newCustomerDealNumCompleteRate	)== -1">{{ Math.abs(jinaSndAndDealNumPerformance.newCustomerDealNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left18">
                          <div class="l_h3">老客成交数</div>
                          <div class="l_h4">{{jinaSndAndDealNumPerformance.oldCustomerDealNum ? jinaSndAndDealNumPerformance.oldCustomerDealNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerDealNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerDealNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerDealNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerDealNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerDealNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerDealNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerDealNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerDealNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerDealNumCompleteRate	)== 1"> {{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerDealNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaSndAndDealNumPerformance.oldCustomerDealNumCompleteRate	)== -1">{{ Math.abs(jinaSndAndDealNumPerformance.oldCustomerDealNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                        <Card style="background:#f5f5f5;width:100%;height:280px">
                          <sndAndDealNumPerformanceLine :sndAndDealNumPerformance="jinaSndAndDealNumPerformance"></sndAndDealNumPerformanceLine>
                        </Card>
                    </div>
                </div>
                <div class="scroll-item4">
                    <div class="top_con">
                      <div class="titles">客单价看板</div>
                      <div class="date_con">
                        <DatePicker
                          type="month"
                          placeholder="请选择年月"
                          style="width: 160px;margin:0 10px"
                          transfer
                          :value="month3"
                          v-model="month3"
                        ></DatePicker>
                        <Button type="primary" @click="getGuestUnitPricePerformanceByLiveAnchorName">查询</Button>
                      </div>
                    </div>
                    <div class="s_content">
                      <div class="scroll_top">
                        <div class="scroll_left2">
                          <div class="l_h3">总客单价</div>
                          <div class="l_h4">{{jinaGuestUnitPricePerformance.totalGuestUnitPricePerformance ? (jinaGuestUnitPricePerformance.totalGuestUnitPricePerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                        <div>同比：
                            <span v-if="Math.sign(jinaGuestUnitPricePerformance.totalGuestUnitPricePerformanceYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinaGuestUnitPricePerformance.totalGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaGuestUnitPricePerformance.totalGuestUnitPricePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaGuestUnitPricePerformance.totalGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaGuestUnitPricePerformance.totalGuestUnitPricePerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaGuestUnitPricePerformance.totalGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaGuestUnitPricePerformance.totalGuestUnitPricePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaGuestUnitPricePerformance.totalGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left3">
                          <div class="l_h3">新诊客单价</div>
                          <div class="l_h4">{{jinaGuestUnitPricePerformance.newGuestUnitPricePerformance ? (jinaGuestUnitPricePerformance.newGuestUnitPricePerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(jinaGuestUnitPricePerformance.newGuestUnitPricePerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaGuestUnitPricePerformance.newGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaGuestUnitPricePerformance.newGuestUnitPricePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaGuestUnitPricePerformance.newGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaGuestUnitPricePerformance.newGuestUnitPricePerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaGuestUnitPricePerformance.newGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaGuestUnitPricePerformance.newGuestUnitPricePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaGuestUnitPricePerformance.newGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left4">
                          <div class="l_h3">复诊客单价</div>
                          <div class="l_h4">{{jinaGuestUnitPricePerformance.oldGuestUnitPricePerformance ? (jinaGuestUnitPricePerformance.oldGuestUnitPricePerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(jinaGuestUnitPricePerformance.oldGuestUnitPricePerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaGuestUnitPricePerformance.oldGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaGuestUnitPricePerformance.oldGuestUnitPricePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaGuestUnitPricePerformance.oldGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaGuestUnitPricePerformance.oldGuestUnitPricePerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaGuestUnitPricePerformance.oldGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaGuestUnitPricePerformance.oldGuestUnitPricePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaGuestUnitPricePerformance.oldGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                      <Card style="background:#f5f5f5;width:100%;height:400px">
                          <customerPriceLine :daodaoGuestUnitPricePerformance="jinaGuestUnitPricePerformance"></customerPriceLine>
                        </Card>
                    </div>
                </div>
                <div class="scroll-item4">
                    <div class="top_con">
                      <div class="titles">各版块完成率</div>
                      <div class="date_con">
                        <DatePicker
                          type="month"
                          placeholder="请选择年月"
                          style="width: 160px;margin:0 10px"
                          transfer
                          :value="month4"
                          v-model="month4"
                        ></DatePicker>
                        <Button type="primary" @click="getPerformanceCompleteRate">查询</Button>
                      </div>
                    </div>
                    <div class="s_content3">
                      <div class="scroll_top2">
                        <div class="scroll_left11">
                          <div class="l_h3">加v率</div>
                          <div class="l_h4">{{jinaPerformanceCompleteRate.addWeChatCompleteRate ? jinaPerformanceCompleteRate.addWeChatCompleteRate + '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                        <div>同比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.addWeChatCompleteRateYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.addWeChatCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.addWeChatCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.addWeChatCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.addWeChatCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.addWeChatCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.addWeChatCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.addWeChatCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.addWeChatCompleteRateTarget)== 1"> {{ Math.abs(jinaPerformanceCompleteRate.addWeChatCompleteRateTarget) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.addWeChatCompleteRateTarget)== -1">{{ Math.abs(jinaPerformanceCompleteRate.addWeChatCompleteRateTarget) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left12">
                          <div class="l_h3">下单面诊卡消耗率</div>
                          <div class="l_h4">{{jinaPerformanceCompleteRate.consulationCardUsedCompleteRate ? jinaPerformanceCompleteRate.consulationCardUsedCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateTarget)== 1"> {{ Math.abs(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateTarget) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateTarget)== -1">{{ Math.abs(jinaPerformanceCompleteRate.consulationCardUsedCompleteRateTarget) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left13">
                          <div class="l_h3">派单率</div>
                          <div class="l_h4">{{jinaPerformanceCompleteRate.sendOrderCompleteRate ? jinaPerformanceCompleteRate.sendOrderCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.sendOrderCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.sendOrderCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.sendOrderCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.sendOrderCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.sendOrderCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.sendOrderCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.sendOrderCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.sendOrderCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.sendOrderCompleteRateTarget	)== 1"> {{ Math.abs(jinaPerformanceCompleteRate.sendOrderCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.sendOrderCompleteRateTarget	)== -1">{{ Math.abs(jinaPerformanceCompleteRate.sendOrderCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left15">
                          <div class="l_h3">新客上门率</div>
                          <div class="l_h4">{{jinaPerformanceCompleteRate.newCustomerVisitCompleteRate ? jinaPerformanceCompleteRate.newCustomerVisitCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateTarget	)== 1"> {{ Math.abs(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateTarget	)== -1">{{ Math.abs(jinaPerformanceCompleteRate.newCustomerVisitCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="s_content3" style="margin-top:10px">
                      <div class="scroll_top2">
                        <div class="scroll_left16">
                          <div class="l_h3">新客成交率</div>
                          <div class="l_h4">{{jinaPerformanceCompleteRate.newCustomerDealCompleteRate ? jinaPerformanceCompleteRate.newCustomerDealCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.newCustomerDealCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.newCustomerDealCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.newCustomerDealCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.newCustomerDealCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.newCustomerDealCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.newCustomerDealCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.newCustomerDealCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.newCustomerDealCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.newCustomerDealCompleteRateTarget	)== 1"> {{ Math.abs(jinaPerformanceCompleteRate.newCustomerDealCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.newCustomerDealCompleteRateTarget	)== -1">{{ Math.abs(jinaPerformanceCompleteRate.newCustomerDealCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left17">
                          <div class="l_h3">当月面诊卡退单率</div>
                          <div class="l_h4">{{jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRate ? jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRate + '%': 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateTarget	)== 1"> {{ Math.abs(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateTarget	)== -1">{{ Math.abs(jinaPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left18">
                          <div class="l_h3">历史面诊卡退单率</div>
                          <div class="l_h4">{{jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRate ? jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateTarget	)== 1"> {{ Math.abs(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateTarget	)== -1">{{ Math.abs(jinaPerformanceCompleteRate.historyConsulationCardRefundCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                        <Card style="background:#f5f5f5;width:100%;height:280px">
                          <performanceCompleteRateLine :performanceCompleteRate="jinaPerformanceCompleteRate"></performanceCompleteRateLine>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    <!-- </Card> -->
</template>
<script>
import * as api from "@/api/amiyaAchievement";
import baseBusinessLine from "../../components/baseBusinessLine.vue"
import customerPriceLine from "../../components/customerPriceLine.vue"
import sndAndDealNumPerformanceLine from "../../components/sndAndDealNumPerformanceLine.vue"
import performanceCompleteRateLine from "../../components/performanceCompleteRateLine.vue"


export default {
  props: ["active"],
  components:{
    baseBusinessLine,
    customerPriceLine,
    sndAndDealNumPerformanceLine,
    performanceCompleteRateLine

  },
  data() {
    return {
      activeStep: 0,
      title_list: [
        { title: "基础经营看板" },
        { title: "派单成交" },
        { title: "客单价看板" },
        { title: "各版块完成率" },
      ],
      month:this.$moment().format("YYYY-MM"),
      month2:this.$moment().format("YYYY-MM"),
      month3:this.$moment().format("YYYY-MM"),
      month4:this.$moment().format("YYYY-MM"),
      jinaBaseBusiness:{},
      jinaSndAndDealNumPerformance:{},
      jinaGuestUnitPricePerformance:{},
      jinaPerformanceCompleteRate:{},
      isjinaBaseBusiness:false,
      isjinaSndAndDealNumPerformance:false,
      isjinaGuestUnitPricePerformance:false,
      isjinaPerformanceCompleteRate:false

    };
  },
  methods: {
    // 基础数据经营看板
    getBaseBusinessPerformance() {
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
      // 
      api.baseBusinessPerformance(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isjinaBaseBusiness = true;
          sessionStorage.setItem('jinaBaseBusiness',JSON.stringify(performance))
          this.jinaBaseBusiness = sessionStorage.getItem('jinaBaseBusiness') ? JSON.parse(sessionStorage.getItem('jinaBaseBusiness')) : {}
        }
      });
    },
    // 派单成交经营看板
    getSndAndDealNumPerformance() {
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
      api.sendAndDealNumPerformance(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isjinaSndAndDealNumPerformance = true;
          sessionStorage.setItem('jinaSndAndDealNumPerformance',JSON.stringify(performance))
          this.jinaSndAndDealNumPerformance = sessionStorage.getItem('jinaSndAndDealNumPerformance') ? JSON.parse(sessionStorage.getItem('jinaSndAndDealNumPerformance')) : {}
        }
      });
    },
    // 客单价经营看板
    getGuestUnitPricePerformanceByLiveAnchorName() {
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
      api.GuestUnitPricePerformanceByLiveAnchorName(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isjinaGuestUnitPricePerformance = true;
          sessionStorage.setItem('jinaGuestUnitPricePerformance',JSON.stringify(performance))
          this.jinaGuestUnitPricePerformance = sessionStorage.getItem('jinaGuestUnitPricePerformance') ? JSON.parse(sessionStorage.getItem('jinaGuestUnitPricePerformance')) : {}
        }
      });
    },
    // 各版块占比模块
    getPerformanceCompleteRate() {
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
      api.performanceCompleteRate(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isjinaPerformanceCompleteRate = true;
          sessionStorage.setItem('jinaPerformanceCompleteRate',JSON.stringify(performance))
          this.jinaPerformanceCompleteRate = sessionStorage.getItem('jinaPerformanceCompleteRate') ? JSON.parse(sessionStorage.getItem('jinaPerformanceCompleteRate')) : {}
        }
      });
    },
    jump(index) {
      var items = document.querySelectorAll(".scroll-item4");
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
      let scrollItems = document.querySelectorAll(".scroll-item4");
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
    
  },
  watch:{
    active: {
      handler(value) {
        if (value === "businessKanban") {
          if(this.isjinaBaseBusiness == true){
            this.jinaBaseBusiness = JSON.parse(sessionStorage.getItem('jinaBaseBusiness'))
          }else{
            this.getBaseBusinessPerformance()
          }
          if(this.isjinaGuestUnitPricePerformance == true){
            this.jinaGuestUnitPricePerformance = JSON.parse(sessionStorage.getItem('jinaGuestUnitPricePerformance'))
          }else{
            this.getGuestUnitPricePerformanceByLiveAnchorName()
          }
          if(this.isjinaSndAndDealNumPerformance == true){
            this.jinaSndAndDealNumPerformance = JSON.parse(sessionStorage.getItem('jinaSndAndDealNumPerformance'))
          }else{
            this.getSndAndDealNumPerformance()
          }
          if(this.isjinaPerformanceCompleteRate == true){
            this.jinaPerformanceCompleteRate = JSON.parse(sessionStorage.getItem('jinaPerformanceCompleteRate'))
          }else{
            this.getPerformanceCompleteRate()
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
  width: 11%;
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
.scroll-item4 {
  width: 100%;
  height: 630px;
  margin-top: 20px;
  background: #fff;
  border-radius: 2%;
  padding: 2%;
  box-sizing: border-box;
}
.scroll-item4 > span {
  font-size: 40px;
}
.scroll-item4:first-child {
  margin-top: 0;
}
.scroll-item4:last-child {
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
  margin-left: -12px;
}
.lis:nth-child(3) {
  margin-left: 0px;
}
.lis:nth-child(4) {
  margin-left: 16px;
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
.scroll_top ,.s_content3,.scroll_top2{
  display: flex;
}
.scroll_top2{
  margin-right: 15px;
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
  font-size: 16px;
}
.scroll_left11,.scroll_left12,.scroll_left13,.scroll_left14,.scroll_left15,.scroll_left16,.scroll_left17,.scroll_left18{
  width: 170px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.scroll_left1,.scroll_left2,.scroll_left3,.scroll_left4,.scroll_left5,.scroll_left6,.scroll_left7,.scroll_left8,.scroll_left9,.scroll_left10 {
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}
.scroll_left1{
  background: #9A66E4
}
.scroll_left2,.scroll_left11{
  background: #2d8cf0;
}
.scroll_left3,.scroll_left12{
  background: #19be6b;
}
.scroll_left4,.scroll_left13{
  background: #ff9900;
}
.scroll_left5,.scroll_left14{
  background: #E46CBB;
}
.scroll_left6,.scroll_left15{
  background: #9A66E4;
}
.scroll_left7,.scroll_left16{
  background: #ed3f14;
}
.scroll_left8,.scroll_left17{
  background: #73c0de;
}
.scroll_left9,.scroll_left18{
  background: #a2ce59;
}
.scroll_left10{
  background: #d5193d;
}
.scroll_right,.scroll_right2{
  background: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
.scroll_right2{
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 170px;
  padding: 10px;
  box-sizing: border-box;
}
.l_h4 {
  font-weight: bold;
}
.chart_content{
  width: 100%;
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
  color: red;
  margin-right: 4px;
}
.green{
  color: green;
  margin-right: 4px;
}
</style>
