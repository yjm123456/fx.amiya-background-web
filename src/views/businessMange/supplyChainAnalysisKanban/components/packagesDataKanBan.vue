<template>
  <div>
    <!-- <div class="result"> -->
      <!-- <div class="scroll-item" > -->
        <div class="top_con">
          <div class="titles">业绩分析</div>
        </div>
        <div class="item_content">
          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">下单件数</div>
                <div class="h4">{{performanceKanbanParams.packagesData.orderCount}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.orderCountChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.orderCountChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.orderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.orderCountChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.orderCountYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.orderCountYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.orderCountYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.orderCountYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">实际件数</div>
                <div class="h4">{{performanceKanbanParams.packagesData.actualOrderCount}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.actualOrderCountChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.actualOrderCountChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.actualOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.actualOrderCountChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.actualOrderCountYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.actualOrderCountYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.actualOrderCountYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.actualOrderCountYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}"  v-if="performanceKanbanParams.actives == 'whole'">
            <div class="item">
              <div class="item_top">
                <div class="">刀刀组件数</div>
                <div class="h4">{{performanceKanbanParams.packagesData.daoDaoOrderCount}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.daoDaoOrderCountChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.daoDaoOrderCountChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.daoDaoOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.daoDaoOrderCountChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.daoDaoOrderCountYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.daoDaoOrderCountYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.daoDaoOrderCountYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.daoDaoOrderCountYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}"  v-if="performanceKanbanParams.actives == 'whole'">
            <div class="item">
              <div class="item_top">
                <div class="">吉娜组件数</div>
                <div class="h4">{{performanceKanbanParams.packagesData.jinaOrderCount}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.jinaOrderCountChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.jinaOrderCountChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.jinaOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.jinaOrderCountChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.jinaOrderCountYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.jinaOrderCountYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.jinaOrderCountYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.jinaOrderCountYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">退款件数</div>
                <div class="h4">{{performanceKanbanParams.packagesData.refundCount}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.refundCountChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.refundCountChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.refundCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.refundCountChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.packagesData.refundCountYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.packagesData.refundCountYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.packagesData.refundCountYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.packagesData.refundCountYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div class="item_content">
          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">下单件单价</div>
                <div class="h4">{{performanceKanbanParams.singlePrice.singlePrice}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.singlePriceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.singlePriceChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.singlePriceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.singlePriceChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.singlePriceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.singlePriceYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.singlePriceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.singlePriceYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">实际件单价</div>
                <div class="h4">{{performanceKanbanParams.singlePrice.actualSinglePrice}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.actualSinglePriceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.actualSinglePriceChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.actualSinglePriceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.actualSinglePriceChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.actualSinglePriceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.actualSinglePriceYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.actualSinglePriceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.actualSinglePriceYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}"  v-if="performanceKanbanParams.actives == 'whole'">
            <div class="item">
              <div class="item_top">
                <div class="">刀刀组件单价</div>
                <div class="h4">{{performanceKanbanParams.singlePrice.daoDaoActualSinglePrice}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.daoDaoActualSinglePriceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.daoDaoActualSinglePriceChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.daoDaoActualSinglePriceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.daoDaoActualSinglePriceChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.daoDaoActualSinglePriceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.daoDaoActualSinglePriceYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.daoDaoActualSinglePriceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.daoDaoActualSinglePriceYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}"  v-if="performanceKanbanParams.actives == 'whole'">
            <div class="item">
              <div class="item_top">
                <div class="">吉娜组件单价</div>
                <div class="h4">{{performanceKanbanParams.singlePrice.jinaActualSinglePrice}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.jinaActualSinglePriceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.jinaActualSinglePriceChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.jinaActualSinglePriceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.jinaActualSinglePriceChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.jinaActualSinglePriceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.jinaActualSinglePriceYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.jinaActualSinglePriceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.jinaActualSinglePriceYearOnYear) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="item_con" :style="{width:performanceKanbanParams.actives == 'whole' ? '18%' : '32%'}" >
            <div class="item">
              <div class="item_top">
                <div class="">退款件单价</div>
                <div class="h4">{{performanceKanbanParams.singlePrice.refundSinglePrice}}</div>
              </div>
              <div class="item_center ">
                <div class="cen mr">
                  <div>环比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.refundSinglePriceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.refundSinglePriceChainRatio) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.refundSinglePriceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.refundSinglePriceChainRatio) + '%'}}</span>
                  <span class="h5"  v-else>-</span>
                </div>
                <div class="cen mr">
                  <div>同比</div>
                  <span  class="h5" v-if="Math.sign(performanceKanbanParams.singlePrice.refundSinglePriceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(performanceKanbanParams.singlePrice.refundSinglePriceYearOnYear) + '%'}}</span>
                  <span class="h5" v-else-if="Math.sign(performanceKanbanParams.singlePrice.refundSinglePriceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(performanceKanbanParams.singlePrice.refundSinglePriceYearOnYear) + '%'}}</span>
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
  margin-top: 50px;
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
  height: 130px;
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
