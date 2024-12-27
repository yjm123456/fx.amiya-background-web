<template>
    <div class="center_content">
          <div class="center_item">
            <div class="item1" >
              <div class="h2">新客业绩</div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：<span class="b_w">{{totalAchievementAndDateSchedule.todayNewCustomerPerformance}}</span></div>
                    <div class="item_left">累计业绩：<span class="b_w">{{totalAchievementAndDateSchedule.newCustomerPerformance}}</span></div>
                    
                </div>
                <div class="item_right">
                    <div>
                      去年同比：
                      <span  class="h5" v-if="Math.sign(totalAchievementAndDateSchedule.newCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalAchievementAndDateSchedule.newCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalAchievementAndDateSchedule.newCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalAchievementAndDateSchedule.newCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>
                      上月环比：
                      <span  class="h5" v-if="Math.sign(totalAchievementAndDateSchedule.newCustomerPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalAchievementAndDateSchedule.newCustomerPerformanceChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalAchievementAndDateSchedule.newCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalAchievementAndDateSchedule.newCustomerPerformanceChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>目标达成：<span class="h5" :style="{color:totalAchievementAndDateSchedule.newCustomerPerformanceCompleteRate < completeRate ? 'red' :'green'}">{{totalAchievementAndDateSchedule.newCustomerPerformanceCompleteRate}}%</span></div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">老客业绩</div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：<span class="b_w">{{totalAchievementAndDateSchedule.todayOldCustomerPerformance}}</span></div>
                    <div class="item_left">累计业绩：<span class=" b_w">{{totalAchievementAndDateSchedule.oldCustomerPerformance}}</span></div>
                    
                </div>
                <div class="item_right">
                    <div>
                      去年同比：
                      <span  class="h5" v-if="Math.sign(totalAchievementAndDateSchedule.oldCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalAchievementAndDateSchedule.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalAchievementAndDateSchedule.oldCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalAchievementAndDateSchedule.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>
                      上月环比：
                      <span  class="h5" v-if="Math.sign(totalAchievementAndDateSchedule.oldCustomerPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalAchievementAndDateSchedule.oldCustomerPerformanceChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalAchievementAndDateSchedule.oldCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalAchievementAndDateSchedule.oldCustomerPerformanceChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>

                    </div>
                    <div>目标达成：<span class="h5" :style="{color:totalAchievementAndDateSchedule.oldCustomerPerformanceCompleteRate < completeRate ? 'red' :'green'}">{{totalAchievementAndDateSchedule.oldCustomerPerformanceCompleteRate}}%</span></div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">总业绩</div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：<span class="b_w">{{totalAchievementAndDateSchedule.todayTotalPerformance}}</span></div>
                    <div class="item_left">累计业绩：<span class="b_w">{{totalAchievementAndDateSchedule.totalPerformance}}</span></div>
                </div>
                <div class="item_right">
                    <div>
                      去年同比：
                      <span  class="h5" v-if="Math.sign(totalAchievementAndDateSchedule.totalPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalAchievementAndDateSchedule.totalPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalAchievementAndDateSchedule.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalAchievementAndDateSchedule.totalPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>
                      上月环比：
                      <span  class="h5" v-if="Math.sign(totalAchievementAndDateSchedule.totalPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalAchievementAndDateSchedule.totalPerformanceChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalAchievementAndDateSchedule.totalPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalAchievementAndDateSchedule.totalPerformanceChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>

                    </div>
                    <div>目标达成：<span class="h5" :style="{color:totalAchievementAndDateSchedule.totalPerformanceCompleteRate < completeRate ? 'red' :'green'}">{{totalAchievementAndDateSchedule.totalPerformanceCompleteRate}}%</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
export default{
    props:{
        totalAchievementAndDateSchedule:Object,
        completeRate:Number
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.center_content{
  width: 100%;
}
.center_item{
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* padding: 0 10px;
  box-sizing: border-box; */
  text-align: center;
  color: #fff;
}
.item1,.item2,.item3{
  flex:1;
  margin:10px;
  padding: 10px 0;
  box-sizing: border-box;
  border-radius: 10px;
}
.item{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: start;
    font-size: 14px;
}
.item1{
  background-image:   linear-gradient(to right,#8ED6E5, #0AABBD);
}
.item2{
  background: linear-gradient(to right,#AEB5F3, #7381FB);
}
.item3{
  background:  linear-gradient(to right,#D7A3FA, #BB5DF9);
}
.h2{
    font-size: 16px;
    margin-bottom:5px ;
}
.h3{
    font-size:16px;
    text-align:left
}
.h5{
  font-size: 14px;
  font-weight: bold;
}
.red{
  color: green;
  margin-right: 4px;
}
.green{
  color: red;
  margin-right: 4px;
}
.b_w{
  font-weight: bold;
}
</style>