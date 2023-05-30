<template>
    <div>
        <div class="content">
            <div class="item">
                <div class="h2">当月派单</div>
                <div class="item_top">
                    <i-circle :percent="100" :size="180" :trail-width="10"
                        :stroke-width="10">
                        <h3>{{achievementdata.thisMonthSendOrderPerformance}}</h3>
                    </i-circle>
                    <div class="data">
                        <div  class="data_item">
                            <div  class="text">环比</div>
                            <div  class="num">{{achievementdata.thisMonthSendOrderPerformanceChainRatio}}%</div>
                        </div>
                        <div  class="data_item">
                            <div  class="text">同比</div>
                            <div  class="num">{{achievementdata.thisMonthSendOrderPerformanceYearOnYear}}%</div>
                        </div>
                        <div  class="data_item">
                            <div  class="text">占比</div>
                            <div  class="num">{{achievementdata.thisMonthSendOrderPerformanceProportion}}%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="h2">历史派单</div>
                <div class="item_top">
                    <i-circle :percent="100" :size="180" :trail-width="10"
                        :stroke-width="10">
                        <h3 >{{achievementdata.historySendOrderPerformance}}</h3>
                    </i-circle>
                    <div class="data">
                        <div  class="data_item">
                            <div  class="text">环比</div>
                            <div  class="num">{{achievementdata.historySendOrderPerformanceChainRatio}}%</div>
                        </div>
                        <div  class="data_item">
                            <div  class="text">同比</div>
                            <div  class="num">{{achievementdata.historySendOrderPerformanceYearOnYear}}%</div>
                        </div>
                        <div  class="data_item">
                            <div  class="text">占比</div>
                            <div  class="num">{{achievementdata.historySendOrderPerformanceProportion}}%</div>
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
</style>
