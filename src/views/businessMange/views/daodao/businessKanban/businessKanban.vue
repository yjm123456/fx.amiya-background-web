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
                <div class="scroll-item3">
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
                          <div class="l_h4">{{daodaoBaseBusiness.addWeChatNum ? daodaoBaseBusiness.addWeChatNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                        <div>同比：
                            <span v-if="Math.sign(daodaoBaseBusiness.addWeChatNumYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.addWeChatNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.addWeChatNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.addWeChatNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoBaseBusiness.addWeChatNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.addWeChatNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.addWeChatNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.addWeChatNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoBaseBusiness.addWeChatNumTargetComplete)== 1"> {{ Math.abs(daodaoBaseBusiness.addWeChatNumTargetComplete) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.addWeChatNumTargetComplete)== -1">{{ Math.abs(daodaoBaseBusiness.addWeChatNumTargetComplete) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left12">
                          <div class="l_h3">面诊卡下单</div>
                          <div class="l_h4">{{daodaoBaseBusiness.consulationCardNum ? daodaoBaseBusiness.consulationCardNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoBaseBusiness.consulationCardNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.consulationCardNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.consulationCardNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.consulationCardNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoBaseBusiness.consulationCardNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.consulationCardNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.consulationCardNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.consulationCardNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoBaseBusiness.consulationCardNumTargetComplete)== 1"> {{ Math.abs(daodaoBaseBusiness.consulationCardNumTargetComplete) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.consulationCardNumTargetComplete)== -1">{{ Math.abs(daodaoBaseBusiness.consulationCardNumTargetComplete) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left13">
                          <div class="l_h3">当月面诊卡消耗</div>
                          <div class="l_h4">{{daodaoBaseBusiness.thisMonthConsulationCardConsumedNum ? daodaoBaseBusiness.thisMonthConsulationCardConsumedNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumTargetComplete	)== 1"> {{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumTargetComplete	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumTargetComplete	)== -1">{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardConsumedNumTargetComplete	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left15">
                          <div class="l_h3">历史面诊卡消耗</div>
                          <div class="l_h4">{{daodaoBaseBusiness.historyConsulationCardConsumedNum ? daodaoBaseBusiness.historyConsulationCardConsumedNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoBaseBusiness.historyConsulationCardConsumedNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.historyConsulationCardConsumedNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.historyConsulationCardConsumedNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.historyConsulationCardConsumedNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoBaseBusiness.historyConsulationCardConsumedNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.historyConsulationCardConsumedNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.historyConsulationCardConsumedNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.historyConsulationCardConsumedNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoBaseBusiness.historyConsulationCardConsumedNumTargetComplete	)== 1"> {{ Math.abs(daodaoBaseBusiness.historyConsulationCardConsumedNumTargetComplete	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.historyConsulationCardConsumedNumTargetComplete	)== -1">{{ Math.abs(daodaoBaseBusiness.historyConsulationCardConsumedNumTargetComplete	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="s_content3" style="margin-top:10px">
                      <div class="scroll_top2">
                        <div class="scroll_left16">
                          <div class="l_h3">当月面诊卡退单</div>
                          <div class="l_h4">{{daodaoBaseBusiness.thisMonthConsulationCardRefundNum ? daodaoBaseBusiness.thisMonthConsulationCardRefundNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardRefundNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardRefundNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardRefundNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardRefundNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardRefundNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardRefundNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardRefundNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardRefundNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardRefundNumTargetComplete	)== 1"> {{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardRefundNumTargetComplete	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.thisMonthConsulationCardRefundNumTargetComplete	)== -1">{{ Math.abs(daodaoBaseBusiness.thisMonthConsulationCardRefundNumTargetComplete	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left17">
                          <div class="l_h3">历史面诊卡退单</div>
                          <div class="l_h4">{{daodaoBaseBusiness.historyConsulationCardRefundNum ? daodaoBaseBusiness.historyConsulationCardRefundNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoBaseBusiness.historyConsulationCardRefundNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.historyConsulationCardRefundNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.historyConsulationCardRefundNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.historyConsulationCardRefundNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoBaseBusiness.historyConsulationCardRefundNumRatioVo)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoBaseBusiness.historyConsulationCardRefundNumRatioVo) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoBaseBusiness.historyConsulationCardRefundNumRatioVo)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoBaseBusiness.historyConsulationCardRefundNumRatioVo) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left18">
                          <div class="l_h3">面诊卡库存量</div>
                          <div class="l_h4">{{daodaoBaseBusiness.consulationCardInventoryNum ? daodaoBaseBusiness.consulationCardInventoryNum : 0}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                        <Card style="background:#f5f5f5;width:100%;height:280px">
                          <baseBusinessLine :daodaoBaseBusiness="daodaoBaseBusiness"></baseBusinessLine>
                        </Card>
                    </div>
                </div>
                <div class="scroll-item3">
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
                          <div class="l_h4">{{daodaoSndAndDealNumPerformance.sendOrderNum ? daodaoSndAndDealNumPerformance.sendOrderNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                        <div>同比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.sendOrderNumYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.sendOrderNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.sendOrderNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.sendOrderNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.sendOrderNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.sendOrderNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.sendOrderNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.sendOrderNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.sendOrderNumCompleteRate)== 1"> {{ Math.abs(daodaoSndAndDealNumPerformance.sendOrderNumCompleteRate) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.sendOrderNumCompleteRate)== -1">{{ Math.abs(daodaoSndAndDealNumPerformance.sendOrderNumCompleteRate) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left12">
                          <div class="l_h3">总上门数</div>
                          <div class="l_h4">{{daodaoSndAndDealNumPerformance.totalVisitNum ? daodaoSndAndDealNumPerformance.totalVisitNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.totalVisitNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.totalVisitNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.totalVisitNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.totalVisitNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.totalVisitNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.totalVisitNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.totalVisitNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.totalVisitNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.totalVisitNumCompleteRate)== 1"> {{ Math.abs(daodaoSndAndDealNumPerformance.totalVisitNumCompleteRate) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.totalVisitNumCompleteRate)== -1">{{ Math.abs(daodaoSndAndDealNumPerformance.totalVisitNumCompleteRate) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left13">
                          <div class="l_h3">新客上门数</div>
                          <div class="l_h4">{{daodaoSndAndDealNumPerformance.newCustomerVisitNum ? daodaoSndAndDealNumPerformance.newCustomerVisitNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerVisitNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerVisitNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerVisitNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerVisitNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerVisitNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerVisitNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerVisitNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerVisitNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerVisitNumCompleteRate	)== 1"> {{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerVisitNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerVisitNumCompleteRate	)== -1">{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerVisitNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left15">
                          <div class="l_h3">老客上门数</div>
                          <div class="l_h4">{{daodaoSndAndDealNumPerformance.oldCustomerVisitNum ? daodaoSndAndDealNumPerformance.oldCustomerVisitNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerVisitNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerVisitNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerVisitNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerVisitNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerVisitNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerVisitNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerVisitNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerVisitNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerVisitNumCompleteRate	)== 1"> {{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerVisitNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerVisitNumCompleteRate	)== -1">{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerVisitNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="s_content3" style="margin-top:10px">
                      <div class="scroll_top2">
                        <div class="scroll_left16">
                          <div class="l_h3">总成交数</div>
                          <div class="l_h4">{{daodaoSndAndDealNumPerformance.totalDealNum ? daodaoSndAndDealNumPerformance.totalDealNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.totalDealNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.totalDealNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.totalDealNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.totalDealNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.totalDealNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.totalDealNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.totalDealNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.totalDealNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.totalDealNumCompleteRate	)== 1"> {{ Math.abs(daodaoSndAndDealNumPerformance.totalDealNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.totalDealNumCompleteRate	)== -1">{{ Math.abs(daodaoSndAndDealNumPerformance.totalDealNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left17">
                          <div class="l_h3">新客成交数</div>
                          <div class="l_h4">{{daodaoSndAndDealNumPerformance.newCustomerDealNum ? daodaoSndAndDealNumPerformance.newCustomerDealNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerDealNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerDealNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerDealNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerDealNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerDealNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerDealNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerDealNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerDealNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerDealNumCompleteRate	)== 1"> {{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerDealNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.newCustomerDealNumCompleteRate	)== -1">{{ Math.abs(daodaoSndAndDealNumPerformance.newCustomerDealNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left18">
                          <div class="l_h3">老客成交数</div>
                          <div class="l_h4">{{daodaoSndAndDealNumPerformance.oldCustomerDealNum ? daodaoSndAndDealNumPerformance.oldCustomerDealNum : 0}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerDealNumYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerDealNumYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerDealNumYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerDealNumYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerDealNumChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerDealNumChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerDealNumChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerDealNumChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerDealNumCompleteRate	)== 1"> {{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerDealNumCompleteRate	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoSndAndDealNumPerformance.oldCustomerDealNumCompleteRate	)== -1">{{ Math.abs(daodaoSndAndDealNumPerformance.oldCustomerDealNumCompleteRate	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                        <Card style="background:#f5f5f5;width:100%;height:280px">
                          <sndAndDealNumPerformanceLine :sndAndDealNumPerformance="daodaoSndAndDealNumPerformance"></sndAndDealNumPerformanceLine>
                        </Card>
                    </div>
                </div>
                <div class="scroll-item3">
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
                          <div class="l_h4">{{daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformance ? (daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                        <div>同比：
                            <span v-if="Math.sign(daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformanceYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoGuestUnitPricePerformance.totalGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left3">
                          <div class="l_h3">新客客单价</div>
                          <div class="l_h4">{{daodaoGuestUnitPricePerformance.newGuestUnitPricePerformance ? (daodaoGuestUnitPricePerformance.newGuestUnitPricePerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(daodaoGuestUnitPricePerformance.newGuestUnitPricePerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoGuestUnitPricePerformance.newGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoGuestUnitPricePerformance.newGuestUnitPricePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoGuestUnitPricePerformance.newGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoGuestUnitPricePerformance.newGuestUnitPricePerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoGuestUnitPricePerformance.newGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoGuestUnitPricePerformance.newGuestUnitPricePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoGuestUnitPricePerformance.newGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top">
                        <div class="scroll_left4">
                          <div class="l_h3">老客客单价</div>
                          <div class="l_h4">{{daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformance ? (daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformance).toFixed(2) : 0.00}}</div>
                        </div>
                        <div class="scroll_right">
                          <div>同比：
                            <span v-if="Math.sign(daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformanceYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoGuestUnitPricePerformance.oldGuestUnitPricePerformanceChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                      <Card style="background:#f5f5f5;width:100%;height:400px">
                          <customerPriceLine :daodaoGuestUnitPricePerformance="daodaoGuestUnitPricePerformance"></customerPriceLine>
                        </Card>
                    </div>
                </div>
                <div class="scroll-item3">
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
                          <div class="l_h4">{{daodaoPerformanceCompleteRate.addWeChatCompleteRate ? daodaoPerformanceCompleteRate.addWeChatCompleteRate + '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                        <div>同比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.addWeChatCompleteRateYearOnYear)== 1"> <span class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.addWeChatCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.addWeChatCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.addWeChatCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.addWeChatCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.addWeChatCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.addWeChatCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.addWeChatCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.addWeChatCompleteRateTarget)== 1"> {{ Math.abs(daodaoPerformanceCompleteRate.addWeChatCompleteRateTarget) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.addWeChatCompleteRateTarget)== -1">{{ Math.abs(daodaoPerformanceCompleteRate.addWeChatCompleteRateTarget) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left12">
                          <div class="l_h3">下单面诊卡消耗率</div>
                          <div class="l_h4">{{daodaoPerformanceCompleteRate.consulationCardUsedCompleteRate ? daodaoPerformanceCompleteRate.consulationCardUsedCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateTarget)== 1"> {{ Math.abs(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateTarget) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateTarget)== -1">{{ Math.abs(daodaoPerformanceCompleteRate.consulationCardUsedCompleteRateTarget) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left13">
                          <div class="l_h3">派单率</div>
                          <div class="l_h4">{{daodaoPerformanceCompleteRate.sendOrderCompleteRate ? daodaoPerformanceCompleteRate.sendOrderCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.sendOrderCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.sendOrderCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.sendOrderCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.sendOrderCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.sendOrderCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.sendOrderCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.sendOrderCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.sendOrderCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.sendOrderCompleteRateTarget	)== 1"> {{ Math.abs(daodaoPerformanceCompleteRate.sendOrderCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.sendOrderCompleteRateTarget	)== -1">{{ Math.abs(daodaoPerformanceCompleteRate.sendOrderCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left15">
                          <div class="l_h3">新客上门率</div>
                          <div class="l_h4">{{daodaoPerformanceCompleteRate.newCustomerVisitCompleteRate ? daodaoPerformanceCompleteRate.newCustomerVisitCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateTarget	)== 1"> {{ Math.abs(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateTarget	)== -1">{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerVisitCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="s_content3" style="margin-top:10px">
                      <div class="scroll_top2">
                        <div class="scroll_left16">
                          <div class="l_h3">新客成交率</div>
                          <div class="l_h4">{{daodaoPerformanceCompleteRate.newCustomerDealCompleteRate ? daodaoPerformanceCompleteRate.newCustomerDealCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateTarget	)== 1"> {{ Math.abs(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateTarget	)== -1">{{ Math.abs(daodaoPerformanceCompleteRate.newCustomerDealCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left17">
                          <div class="l_h3">当月面诊卡退单率</div>
                          <div class="l_h4">{{daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRate ? daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRate + '%': 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateTarget	)== 1"> {{ Math.abs(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateTarget	)== -1">{{ Math.abs(daodaoPerformanceCompleteRate.thisMonthConsulationCardRefundCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                      <div class="scroll_top2">
                        <div class="scroll_left18">
                          <div class="l_h3">历史面诊卡退单率</div>
                          <div class="l_h4">{{daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRate ? daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRate+ '%' : 0+ '%'}}</div>
                        </div>
                        <div class="scroll_right2">
                          <div>同比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateYearOnYear) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>环比：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateChainRatio) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateChainRatio) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                          <div>目标达成：
                            <span v-if="Math.sign(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateTarget	)== 1"> {{ Math.abs(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateTarget	) + '%'}}</span>
                            <span v-else-if="Math.sign(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateTarget	)== -1">{{ Math.abs(daodaoPerformanceCompleteRate.historyConsulationCardRefundCompleteRateTarget	) + '%'}}</span>
                            <span v-else>-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chart_content">
                        <Card style="background:#f5f5f5;width:100%;height:280px">
                          <performanceCompleteRateLine :performanceCompleteRate="daodaoPerformanceCompleteRate"></performanceCompleteRateLine>
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
      daodaoBaseBusiness:{},
      daodaoGuestUnitPricePerformance:{},
      daodaoSndAndDealNumPerformance:{},
      daodaoPerformanceCompleteRate:{},
      isdaodaoBaseBusiness:false,
      isdaodaoSndAndDealNumPerformance:false,
      isdaodaoGuestUnitPricePerformance:false,
      isdaodaoPerformanceCompleteRate:false
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
        liveAnchorName:'刀刀'
      }
      // 
      api.baseBusinessPerformance(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isdaodaoBaseBusiness = true;
          sessionStorage.setItem('daodaoBaseBusiness',JSON.stringify(performance))
          this.daodaoBaseBusiness = sessionStorage.getItem('daodaoBaseBusiness') ? JSON.parse(sessionStorage.getItem('daodaoBaseBusiness')) : {}
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
        liveAnchorName:'刀刀'
      }
      // 
      api.sendAndDealNumPerformance(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isdaodaoSndAndDealNumPerformance = true;
          sessionStorage.setItem('daodaoSndAndDealNumPerformance',JSON.stringify(performance))
          this.daodaoSndAndDealNumPerformance = sessionStorage.getItem('daodaoSndAndDealNumPerformance') ? JSON.parse(sessionStorage.getItem('daodaoSndAndDealNumPerformance')) : {}
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
        liveAnchorName:'刀刀'
      }
      // 
      api.GuestUnitPricePerformanceByLiveAnchorName(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isdaodaoGuestUnitPricePerformance = true;
          sessionStorage.setItem('daodaoGuestUnitPricePerformance',JSON.stringify(performance))
          this.daodaoGuestUnitPricePerformance = sessionStorage.getItem('daodaoGuestUnitPricePerformance') ? JSON.parse(sessionStorage.getItem('daodaoGuestUnitPricePerformance')) : {}
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
        liveAnchorName:'刀刀'
      }
      // 
      api.performanceCompleteRate(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.isdaodaoPerformanceCompleteRate = true;
          sessionStorage.setItem('daodaoPerformanceCompleteRate',JSON.stringify(performance))
          this.daodaoPerformanceCompleteRate = sessionStorage.getItem('daodaoPerformanceCompleteRate') ? JSON.parse(sessionStorage.getItem('daodaoPerformanceCompleteRate')) : {}
        }
      });
    },
    jump(index) {
      var items = document.querySelectorAll(".scroll-item3");
      for (var i = 0; i < items.length; i++) {
        if (index === i) {
          // console.log(index,i)
          items[i].scrollIntoView({
            block: "start", //默认跳转到顶部
            behavior: "smooth", //滚动的速度
          });
          // if(i==0){
          //   console.log(0)
          // }else if(i==1){
          //   console.log(1)
          // }else if(i==2){
          //   console.log(2)
          // }else if(i==3){
          //   console.log(3)
          // }
        }
      }
    },
    onScroll(e) {
      let scrollItems = document.querySelectorAll(".scroll-item3");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        if (judge) {
          this.activeStep = i;
          // if(this.activeStep == i){
          //   if(i==0){
          //     console.log(0)
          //   }else if(i==1){
          //     console.log(1)
          //   }else if(i==2){
          //     console.log(2)
          //   }else if(i==3){
          //     console.log(3)
          //   }
          // }
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
          if(this.isdaodaoBaseBusiness == true){
            this.daodaoBaseBusiness = JSON.parse(sessionStorage.getItem('daodaoBaseBusiness'))
          }else{
            this.getBaseBusinessPerformance()
          }
          if(this.isdaodaoGuestUnitPricePerformance == true){
            this.daodaoGuestUnitPricePerformance = JSON.parse(sessionStorage.getItem('daodaoGuestUnitPricePerformance'))
          }else{
            this.getGuestUnitPricePerformanceByLiveAnchorName()
          }
          if(this.isdaodaoSndAndDealNumPerformance == true){
            this.daodaoSndAndDealNumPerformance = JSON.parse(sessionStorage.getItem('daodaoSndAndDealNumPerformance'))
          }else{
            this.getSndAndDealNumPerformance()
          }
          if(this.isdaodaoPerformanceCompleteRate == true){
            this.daodaoPerformanceCompleteRate = JSON.parse(sessionStorage.getItem('daodaoPerformanceCompleteRate'))
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
.scroll-item3 {
  width: 100%;
  height: 630px;
  margin-top: 20px;
  background: #fff;
  border-radius: 2%;
  padding: 2%;
  box-sizing: border-box;
}
.scroll-item3 > span {
  font-size: 40px;
}
.scroll-item3:first-child {
  margin-top: 0;
}
.scroll-item3:last-child {
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
.scroll_top,.s_content3,.scroll_top2 {
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
.scroll_left1,.scroll_left2,.scroll_left3,.scroll_left4,.scroll_left5,.scroll_left6,
.scroll_left7,.scroll_left8,.scroll_left9,.scroll_left10{
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

.scroll_right{
  background: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
.scroll_right2{
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 160px;
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
  color: green;
  margin-right: 4px;
}
.green{
  color: red;
  margin-right: 4px;
}
</style>
