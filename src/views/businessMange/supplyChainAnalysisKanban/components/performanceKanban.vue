<template>
  <div>
    <!-- <div class="result"> -->
      <!-- <div class="scroll-item" style="height:420px"> -->
        <div class="top_con">
          <!-- <div class="date_con">
            <DatePicker
              type="month"
              placeholder="请选择年月"
              style="width: 160px;margin:0 10px"
              transfer
              :value="month"
              v-model="month"
            ></DatePicker>
            <Button type="primary" @click="getamiyaAchievementData"
              >查询</Button
            >
          </div> -->
          <div class="titles">业绩看板</div>
        </div>
        <div class="item_content">
            
          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">下单GMV</div>
                <div class="h4">{{performanceKanbanParams.gmvData.orderGmv}}</div>
              </div>
              <div class="item_center">
                <div>
                  <div>目标完成率</div>
                  <div class="h5">{{performanceKanbanParams.gmvData.orderGmvCompleteRate}}%</div>
                </div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.orderGMVChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.orderGMVChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.orderGMVChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.orderGMVChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.orderGMVYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.orderGMVYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.orderGMVYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.orderGMVYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
            <div class="h3">数据诊断：</div>
            <div class="bottom_text">
              <div>
                对比时间进度：
                <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.orderGMVToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.orderGMVToDateSchedule) + '%'}}</span>
                <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.orderGMVToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.orderGMVToDateSchedule) + '%'}}</span>
                <span class="h5"  v-else>-</span>
              </div>
              <div>对比时间进度，业绩偏差：<span>{{performanceKanbanParams.gmvData.orderGMVDeviation}}元</span></div>
              <div>距目标达成，后期需完成：<span>{{performanceKanbanParams.gmvData.laterCompleteEveryDayOrderGMV}}元/天</span></div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">直播间投流</div>
                <div class="h4">{{performanceKanbanParams.gmvData.qianChuanPutIn}}</div>
              </div>
              <div class="item_center">
                <div>
                  <div>目标完成率</div>
                  <div class="h5">{{performanceKanbanParams.gmvData.qianChuanPutInCompleteRate}}%</div>
                </div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.qianChuanPutInChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.qianChuanPutInChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.qianChuanPutInChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.qianChuanPutInChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.qianChuanPutInYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.qianChuanPutInYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.qianChuanPutInYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.qianChuanPutInYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
            <div style="margin-top:50px"></div>
            <div class="bottom_text">
              <div>
                对比时间进度：
                <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.qianChuanToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.qianChuanToDateSchedule) + '%'}}</span>
                <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.qianChuanToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.qianChuanToDateSchedule) + '%'}}</span>
                <span class="h5"  v-else>-</span>
              </div>
              <div>对比时间进度，业绩偏差：<span>{{performanceKanbanParams.gmvData.qianChuanDeviation}}元</span></div>
              <div>距目标达成，后期需完成：<span>{{performanceKanbanParams.gmvData.laterCompleteEveryDayQianChuan}}元/天</span></div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" v-if="performanceKanbanParams.actives == 'whole'">
            <div class="item">
              <div class="item_top">
                <div class="">刀刀组GMV</div>
                <div class="h4">{{performanceKanbanParams.gmvData.daoDaoOrderGmv}}</div>
              </div>
              <div class="item_center">
                <div>
                  <div>目标完成率</div>
                  <div class="h5">{{performanceKanbanParams.gmvData.daoDaoOrderGmvCompleteRate}}%</div>
                </div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.daoDaoOrderGMVChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.daoDaoOrderGMVChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.daoDaoOrderGMVChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.daoDaoOrderGMVChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.daoDaoOrderGMVYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.daoDaoOrderGMVYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.daoDaoOrderGMVYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.daoDaoOrderGMVYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
            <div style="margin-top:50px"></div>
            <div class="bottom_text">
              <div>
                对比时间进度：
                <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.daoDaoOrderGMVToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.daoDaoOrderGMVToDateSchedule) + '%'}}</span>
                <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.daoDaoOrderGMVToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.daoDaoOrderGMVToDateSchedule) + '%'}}</span>
                <span class="h5"  v-else>-</span>
              </div>
              <div>对比时间进度，业绩偏差：<span>{{performanceKanbanParams.gmvData.daoDaoOrderGMVDeviation}}元</span></div>
              <div>距目标达成，后期需完成：<span>{{performanceKanbanParams.gmvData.laterCompleteEveryDayDaoDaoOrderGMV}}元/天</span></div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" v-if="performanceKanbanParams.actives == 'whole'">
            <div class="item">
              <div class="item_top">
                <div class="">吉娜组GMV</div>
                <div class="h4">{{performanceKanbanParams.gmvData.jiNaOrderGmv}}</div>
              </div>
              <div class="item_center">
                <div>
                  <div>目标完成率</div>
                  <div class="h5">{{performanceKanbanParams.gmvData.jiNaOrderGmvCompleteRate}}%</div>
                </div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.jiNaOrderGMVChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.jiNaOrderGMVChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.jiNaOrderGMVChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.jiNaOrderGMVChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.jiNaOrderGMVYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.jiNaOrderGMVYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.jiNaOrderGMVYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.jiNaOrderGMVYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
            <div style="margin-top:50px"></div>
            <div class="bottom_text">
              <div>
                对比时间进度：
                <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.jinaOrderGMVToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.jinaOrderGMVToDateSchedule) + '%'}}</span>
                <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.jinaOrderGMVToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.jinaOrderGMVToDateSchedule) + '%'}}</span>
                <span class="h5"  v-else>-</span>
              </div>
              <div>对比时间进度，业绩偏差：<span>{{performanceKanbanParams.gmvData.jinaOrderGMVDeviation}}元</span></div>
              <div>距目标达成，后期需完成：<span>{{performanceKanbanParams.gmvData.jInaLaterCompleteEveryDayOrderGMV}}元/天</span></div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">退款GMV</div>
                <div class="h4">{{performanceKanbanParams.gmvData.refunGMV}}</div>
              </div>
              <div class="item_center">
                <div>
                  <div>目标完成率</div>
                  <div class="h5">{{performanceKanbanParams.gmvData.refunGMVCompleteRate}}%</div>
                </div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.refunGMVChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.refunGMVChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.refunGMVChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.refunGMVChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.gmvData.refunGMVYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.gmvData.refunGMVYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.gmvData.refunGMVYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.gmvData.refunGMVYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  props:{
    performanceKanbanParams:Object
  },
  data() {
    return {
      month: this.$moment().format("YYYY-MM"),
    };
  },
  methods: {
    getamiyaAchievementData() {},
  },
};
</script>

<style scoped>
.titles {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}
.result {
  width: 100%;
  /* height: 730px; */
  overflow-y: scroll;
  color: #000;
}
.scroll-item {
  width: 100%;
  /* height: 330px; */
  margin-top: 20px;
  background: #fff;
  border-radius: 2%;
  padding: 1%;
  box-sizing: border-box;
}
.scroll-item > span {
  font-size: 40px;
}
.scroll-item:first-child {
  margin-top: 0;
}
.scroll-item:last-child {
  /* height: 730px; */
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
  margin-left: -28px;
}
.li:nth-child(2) {
  margin-left: -16px;
}
.li:nth-child(3) {
  margin-left: -16px;
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
.scroll_left1,
.scroll_left2,
.scroll_left3,
.scroll_left4,
.scroll_left5 {
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}
.scroll_left1 {
  background: #9a66e4;
}
.scroll_left2 {
  background: #2d8cf0;
}
.scroll_left3 {
  background: #19be6b;
}
.scroll_left4 {
  background: #ff9900;
}
.scroll_left5 {
  background: #e46cbb;
}
.scroll_right,
.scroll_right2 {
  background: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
.scroll_right2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.l_h4 {
  font-weight: bold;
}
.chart_content {
  display: flex;
  margin-top: 50px;
}
.chart_left {
  width: 40%;
}
.chart_right {
  width: 58%;
  margin-left: 2%;
}
.red {
  color: green;
  margin-right: 4px;
}
.green {
  color: red;
  margin-right: 4px;
}
.item_con {
  width: 18%;
  /* margin-right: 10px; */
}
.item_con2 {
  width: 10%;
}
.item {
  border: 1px solid hsl(0, 9%, 90%);
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 5px;
  height: 180px;
}
.item_center {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.h4 {
  font-size: 16px;
  font-weight: bold;
}
.h5 {
  font-size: 14px;
  font-weight: bold;
}
.cen {
  width: 110px;
  text-align: start;
}
.bottom_text {
  margin-top: 5px;
  color: rgb(173, 168, 168);
}
.item_content {
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
}
.h3 {
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px;
}
.date_con {
  text-align: end;
}
.red {
  color: green;
  margin-right: 4px;
}
.green {
  color: red;
  margin-right: 4px;
}
.mr {
  margin-top: 8px;
}
</style>
