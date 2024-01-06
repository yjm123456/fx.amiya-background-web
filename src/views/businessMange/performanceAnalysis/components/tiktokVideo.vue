<template>
    <div>
        <div class="content">
            <div class="item">
                <div class="h2">抖音</div>
                <div class="item_top">
                    <i-circle :percent="100" :size="180" :trail-width="10"
                        :stroke-width="10">
                        <h3>{{achievementdata.tikTokPerformance}}</h3>
                    </i-circle>
                    <div class="data">
                        <div  class="data_item2">
                            <div  class="text">环比</div>
                            <!-- <div  class="num">{{achievementdata.tikTokPerformanceChainRatio}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.tikTokPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.tikTokPerformanceChainRatio) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.tikTokPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.tikTokPerformanceChainRatio) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">同比</div>
                            <!-- <div  class="num">{{achievementdata.tikTokPerformanceYearOnYear}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.tikTokPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.tikTokPerformanceYearOnYear) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.tikTokPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.tikTokPerformanceYearOnYear) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">占比</div>
                            <div  class="num">{{achievementdata.tikTokPerformanceProportion}}%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="h2">视频号</div>
                <div class="item_top">
                    <i-circle :percent="100" :size="180" :trail-width="10"
                        :stroke-width="10">
                        <h3>{{achievementdata.videoPerformance}}</h3>
                    </i-circle>
                    <div class="data">
                        <div  class="data_item2">
                            <div  class="text">环比</div>
                            <!-- <div  class="num">{{achievementdata.videoPerformanceChainRatio}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.videoPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.videoPerformanceChainRatio) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.videoPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.videoPerformanceChainRatio) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">同比</div>
                            <!-- <div  class="num">{{achievementdata.videoPerformanceYearOnYear}}%</div> -->
                            <span  class="num" v-if="Math.sign(achievementdata.videoPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdata.videoPerformanceYearOnYear) + '%'}}</span>
                            <span class="num" v-else-if="Math.sign(achievementdata.videoPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdata.videoPerformanceYearOnYear) + '%'}}</span>
                            <span class="num"  v-else>-</span>
                        </div>
                        <div  class="data_item2">
                            <div  class="text">占比</div>
                            <div  class="num">{{achievementdata.videoPerformanceProportion}}%</div>
                        </div>
                    </div>
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
    margin-top: 80px;
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
