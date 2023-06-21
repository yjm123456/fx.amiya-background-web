<template>
    <div>
        <div class="content">
            <div class="item">
                <div class="h2">有效业绩</div>
                <div class="item_top">
                    <!-- <i-circle :percent="achievementdata.effectivePerformance" :size="150" dashboard :stroke-width="10" :trail-width="10">
                        <span class="demo-i-circle-inner" style="font-size:24px">{{achievementdata.effectivePerformance}}</span>
                    </i-circle> -->
                    <!-- <i-circle
                        :size="150"
                        :trail-width="4"
                        :stroke-width="5"
                        :percent="achievementdata.effectivePerformance"
                        stroke-linecap="square"
                        stroke-color="#43a3fb">
                        <div class="demo-i-circle-custom">
                            <h3 style="margin-bottom:5px">{{achievementdata.effectivePerformance}}</h3>
                        </div>
                    </i-circle> -->
                    <i-circle
                        :size="150"
                        :trail-width="10"
                        :stroke-width="10"
                        :percent="achievementdata.effectivePerformanceCompleteRate > 100 ? 100 : achievementdata.effectivePerformanceCompleteRate"
                        stroke-linecap="square"
                        stroke-color="#43a3fb">
                        <div class="demo-i-circle-custom">
                            <h3 style="margin-bottom:5px">{{achievementdata.effectivePerformance}}</h3>
                        </div>
                    </i-circle>
                    <div class="data">
                        <div  class="data_item2">
                            <div  class="text">目标完成率</div>
                            <div class="num">{{achievementdata.effectivePerformanceCompleteRate}}%</div>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">环比</div>
                            <!-- <div  class="num">{{achievementdata.effectivePerformanceChainRatio}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.effectivePerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.effectivePerformanceChainRatio) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.effectivePerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.effectivePerformanceChainRatio) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">同比</div>
                            <!-- <div  class="num">{{achievementdata.effectivePerformanceYearOnYear}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.effectivePerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.effectivePerformanceYearOnYear) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.effectivePerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.effectivePerformanceYearOnYear) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">占比</div>
                            <div  class="num">{{achievementdata.effectivePerformanceProportion}}%</div>
                        </div>
                    </div>
                </div>
                <div class="bottom_text">
                    <div>数据诊断：</div>
                    <!-- <div>1、对比时间进度：<span style="color:#000;font-weight:bold">{{achievementdata.effectivePerformanceToDateSchedule}}%</span></div> -->
                    <div>
                        对比时间进度：
                        <span  class="num" v-if="Math.sign(achievementdata.effectivePerformanceToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.effectivePerformanceToDateSchedule) + '%'}}</span>
                        <span class="num" v-else-if="Math.sign(achievementdata.effectivePerformanceToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.effectivePerformanceToDateSchedule) + '%'}}</span>
                        <span class="num"  v-else>-</span>
                    </div>
                    <div>对比时间进度，业绩偏差：<span style="color:#000;font-weight:bold">{{achievementdata.effectivePerformanceDeviation}}元</span></div>
                    <div>距目标达成，后期需完成：<span style="color:#000;font-weight:bold">{{achievementdata.laterCompleteEveryDayEffectivePerformance}}元/天</span></div>
                </div>
            </div>
            <div class="item">
                <div class="h2">潜在业绩</div>
                <div class="item_top">
                    <!-- <i-circle :percent="achievementdata.potentialPerformance" :size="150" dashboard :stroke-width="10" :trail-width="10">
                        <span class="demo-i-circle-inner" style="font-size:24px">{{achievementdata.potentialPerformance}}</span>
                    </i-circle> -->
                    <i-circle
                        :size="150"
                        :trail-width="10"
                        :stroke-width="10"
                        :percent="achievementdata.potentialPerformanceCompleteRate > 100 ? 100 : achievementdata.potentialPerformanceCompleteRate"
                        stroke-linecap="square"
                        stroke-color="#43a3fb">
                        <div class="demo-i-circle-custom">
                            <h3 style="margin-bottom:5px">{{achievementdata.potentialPerformance}}</h3>
                        </div>
                    </i-circle>
                    <div class="data">
                        <div  class="data_item2">
                            <div  class="text">目标完成率</div>
                            <div class="num">{{achievementdata.potentialPerformanceCompleteRate}}%</div>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">环比</div>
                            <!-- <div  class="num">{{achievementdata.potentialPerformanceChainRatio}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.potentialPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.potentialPerformanceChainRatio) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.potentialPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.potentialPerformanceChainRatio) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">同比</div>
                            <!-- <div  class="num">{{achievementdata.potentialPerformanceYearOnYear}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.potentialPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.potentialPerformanceYearOnYear) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.potentialPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.potentialPerformanceYearOnYear) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">占比</div>
                            <div  class="num">{{achievementdata.potentialPerformanceProportion}}%</div>
                        </div>
                    </div>
                </div>
                <div class="bottom_text">
                    <div>数据诊断：</div>
                    <!-- <div>1、对比时间进度：<span style="color:#000;font-weight:bold">{{achievementdata.potentialPerformanceToDateSchedule}}%</span></div> -->
                    <div>
                        对比时间进度：
                        <span  class="num" v-if="Math.sign(achievementdata.potentialPerformanceToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.potentialPerformanceToDateSchedule) + '%'}}</span>
                        <span class="num" v-else-if="Math.sign(achievementdata.potentialPerformanceToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.potentialPerformanceToDateSchedule) + '%'}}</span>
                        <span class="num"  v-else>-</span>
                    </div>
                    <div>对比时间进度，业绩偏差：<span style="color:#000;font-weight:bold">{{achievementdata.potentialPerformanceDeviation}}元</span></div>
                    <div>距目标达成，后期需完成：<span style="color:#000;font-weight:bold">{{achievementdata.laterCompleteEveryDayPotentialPerformance}}元/天</span></div>
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
