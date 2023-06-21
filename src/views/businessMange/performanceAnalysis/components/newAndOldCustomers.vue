<template>
    <div>
        <div class="content">
            <div class="item">
                <div class="h2">新客业绩</div>
                <div class="item_top">
                    <!-- <i-circle :percent="achievementdata.newCustomerPerformance" :size="150" dashboard :stroke-width="10" :trail-width="10">
                        <span class="demo-i-circle-inner" style="font-size:24px">{{achievementdata.newCustomerPerformance}}</span>
                    </i-circle> -->
                    <i-circle
                        :size="150"
                        :trail-width="10"
                        :stroke-width="10"
                        :percent="achievementdata.newCustomerPerformanceCompleteRate > 100 ? 100 : achievementdata.newCustomerPerformanceCompleteRate"
                        stroke-linecap="square"
                        stroke-color="#43a3fb">
                        <div class="demo-i-circle-custom">
                            <h3 style="margin-bottom:5px">{{achievementdata.newCustomerPerformance}}</h3>
                        </div>
                    </i-circle>
                    <!-- <i-circle :percent="achievementdata.newCustomerPerformanceCompleteRate > 100 ? 100 : achievementdata.newCustomerPerformanceCompleteRate" >
                        <span class="demo-i-circle-inner" style="font-size:24px">{{achievementdata.newCustomerPerformance}}</span>
                    </i-circle> -->
                    <div class="data">
                        <div  class="data_item2">
                            <div  class="text">目标完成率</div>
                            <div class="num">{{achievementdata.newCustomerPerformanceCompleteRate}}%</div>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">环比</div>
                            <!-- <div  class="num">{{achievementdata.newCustomerPerformanceChainRatio}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.newCustomerPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.newCustomerPerformanceChainRatio) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.newCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.newCustomerPerformanceChainRatio) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">同比</div>
                            <!-- <div  class="num">{{achievementdata.newCustomerPerformanceYearOnYear}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.newCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.newCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.newCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.newCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">占比</div>
                            <div  class="num">{{achievementdata.newCustomerPerformanceProportion}}%</div>
                        </div>
                    </div>
                </div>
                <div class="bottom_text">
                    <div>数据诊断：</div>
                    <!-- <div>1、对比时间进度：<span style="color:#000;font-weight:bold">{{achievementdata.newCustomerPerformanceToDateSchedule}}%</span></div> -->
                    <div>
                        对比时间进度：
                        <span  class="num" v-if="Math.sign(achievementdata.newCustomerPerformanceToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.newCustomerPerformanceToDateSchedule) + '%'}}</span>
                        <span class="num" v-else-if="Math.sign(achievementdata.newCustomerPerformanceToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.newCustomerPerformanceToDateSchedule) + '%'}}</span>
                        <span class="num"  v-else>-</span>
                    </div>
                    <div>对比时间进度，业绩偏差：<span style="color:#000;font-weight:bold">{{achievementdata.newCustomerPerformanceDeviation}}元</span></div>
                    <div>距目标达成，后期需完成：<span style="color:#000;font-weight:bold">{{achievementdata.laterCompleteEveryDayNewCustomerPerformance}}元/天</span></div>
                </div>
            </div>
            <div class="item">
                <div class="h2">老客业绩</div>
                <div class="item_top">
                    <!-- <i-circle :percent="achievementdata.oldCustomerPerformance" :size="150" dashboard :stroke-width="10" :trail-width="10">
                        <span class="demo-i-circle-inner" style="font-size:24px">{{achievementdata.oldCustomerPerformance}}</span>
                    </i-circle> -->
                    <i-circle
                        :size="150"
                        :trail-width="10"
                        :stroke-width="10"
                        :percent="achievementdata.oldCustomerPerformanceCompleteRate > 100 ? 100 : achievementdata.oldCustomerPerformanceCompleteRate"
                        stroke-linecap="square"
                        stroke-color="#43a3fb">
                        <div class="demo-i-circle-custom">
                            <h3 style="margin-bottom:5px">{{achievementdata.oldCustomerPerformance}}</h3>
                        </div>
                    </i-circle>
                    <div class="data">
                        <div  class="data_item2">
                            <div  class="text">目标完成率</div>
                            <div class="num">{{achievementdata.oldCustomerPerformanceCompleteRate}}%</div>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">环比</div>
                            <!-- <div  class="num">{{achievementdata.oldCustomerPerformanceChainRatio}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.oldCustomerPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.oldCustomerPerformanceChainRatio) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.oldCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.oldCustomerPerformanceChainRatio) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">同比</div>
                            <!-- <div  class="num">{{achievementdata.oldCustomerPerformanceYearOnYear}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.oldCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.oldCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">占比</div>
                            <div  class="num">{{achievementdata.oldCustomerPerformanceProportion}}%</div>
                        </div>
                    </div>
                </div>
                <div class="bottom_text">
                    <div>数据诊断：</div>
                    <!-- <div>1、对比时间进度：<span style="color:#000;font-weight:bold">{{achievementdata.oldCustomerPerformanceToDateSchedule}}%</span></div> -->
                    <div>
                        对比时间进度：
                        <span  class="num" v-if="Math.sign(achievementdata.oldCustomerPerformanceToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.oldCustomerPerformanceToDateSchedule) + '%'}}</span>
                        <span class="num" v-else-if="Math.sign(achievementdata.oldCustomerPerformanceToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.oldCustomerPerformanceToDateSchedule) + '%'}}</span>
                        <span class="num"  v-else>-</span>
                    </div>
                    <div>对比时间进度，业绩偏差：<span style="color:#000;font-weight:bold">{{achievementdata.oldCustomerPerformanceDeviation}}元</span></div>
                    <div>距目标达成，后期需完成：<span style="color:#000;font-weight:bold">{{achievementdata.laterCompleteEveryDayOldCustomerPerformance}}元/天</span></div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{
        achievementdata:Object
    },
}
</script>
<style scoped>
.content{
    margin-top: 40px;
    display: flex;
}
.item{
    width: 50%;
    /* display:flex; */
    padding-left: 70px;
    box-sizing: border-box;
}
.item_top{
    display: flex;
}
.data{
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 40px;
    margin-top: 10px;
}
.data_item{
    width: 140px;
}

.num{
    font-size: 16px;
    font-weight: bold;
    color: #000;
}
.bottom_text{
    margin-top: 60px;
    padding-left: 10px;
}
.h2{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 30px;
}
.red{
  color: green;
  margin-right: 4px;
  font-size: 14px;
}
.green{
  color: red;
  margin-right: 4px;
  font-size: 14px;
}
.data_item2{
    width: 140px;
    text-align: start;
}
</style>
