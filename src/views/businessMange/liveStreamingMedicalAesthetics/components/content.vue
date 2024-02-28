<template>
    <div>
        <div class="item_content">
            <div class="item">
                <div class="item_icon_con">
                    <div >
                        <div class="rising_powder">{{liveStreamingPerformance.designCardOrder}}</div>
                        <div  class="rising_powder_name">设计卡下卡量</div>
                    </div>
                    <div class="icon_back"><i class="iconfont icon-xiaoshouhanjine rising_powder_icon icon_one"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">{{liveStreamingPerformance.designCardOrderTarget}}</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardOrderToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardOrderToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardOrderChainRatio ? liveStreamingPerformance.designCardOrderChainRatio : '-'}}%</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardOrderToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardOrderToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardOrderTargetCompleteRate ? liveStreamingPerformance.designCardOrderTargetCompleteRate : '-'}}%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardOrderToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardOrderToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardOrderYearOnYear ? liveStreamingPerformance.designCardOrderYearOnYear : '-'}}%</div>
                            <div  class="h6">同比</div>
                        </div>
                    </div>
                </div>
                <div class="increase_content">
                    <div class="increase_item">
                        <div class="increase_green"></div>
                        <div class="increase_title">增长</div>
                    </div>
                    <div class="increase_item">
                        <div class="increase_red"></div>
                        <div class="increase_title">下降</div>
                    </div>
                </div>
            </div>

            <div class="item2">
                <div class="item_icon_con">
                    <div >
                        <div class="rising_powder">{{liveStreamingPerformance.designCardRefund}}</div>
                        <div  class="rising_powder_name">设计卡退卡量</div>
                    </div>
                    <div class="icon_back2"><i class="iconfont icon-tuikuan rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">{{liveStreamingPerformance.designCardRefundTarget}}</div>
                            <div class="h6">预算</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardRefundToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardRefundToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardRefundChainRatio ? liveStreamingPerformance.designCardRefundChainRatio : '-'}}%</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardRefundToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardRefundToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardRefundTargetCompleteRate ? liveStreamingPerformance.designCardRefundTargetCompleteRate : '-'}}%</div>
                            <div  class="h6"> 消耗</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardRefundToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardRefundToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardRefundYearOnYear ? liveStreamingPerformance.designCardRefundYearOnYear : '-'}}%</div>
                            <div  class="h6">同比</div>
                        </div>
                    </div>
                </div>
                <div class="increase_content">
                    <div class="increase_item">
                        <div class="increase_green"></div>
                        <div class="increase_title">增长</div>
                    </div>
                    <div class="increase_item">
                        <div class="increase_red"></div>
                        <div class="increase_title">下降</div>
                    </div>
                </div>
            </div>

            <div class="item3">
                <div class="item_icon_con">
                    <div >
                        <div class="rising_powder">{{liveStreamingPerformance.designCardActual}}</div>
                        <div  class="rising_powder_name">实际卡量</div>
                    </div>
                    <div class="icon_back3"><i class="iconfont icon-huikuan rising_powder_icon "></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">{{liveStreamingPerformance.designCardActualTarget}}</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardActualToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardActualToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardActualChainRatio ? liveStreamingPerformance.designCardActualChainRatio : '-'}}%</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardActualToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardActualToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardActualTargetCompleteRate ? liveStreamingPerformance.designCardActualTargetCompleteRate : '-'}}%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold" :style="{color: !liveStreamingPerformance.designCardActualToDateSchedule  ? '#636060' : liveStreamingPerformance.designCardActualToDateSchedule > 0 ?'green' : 'red'}">{{liveStreamingPerformance.designCardActualYearOnYear ? liveStreamingPerformance.designCardActualYearOnYear : '-'}}%</div>
                            <div  class="h6">同比</div>
                        </div>
                    </div>
                </div>
                <div class="increase_content">
                    <div class="increase_item">
                        <div class="increase_green"></div>
                        <div class="increase_title">增长</div>
                    </div>
                    <div class="increase_item">
                        <div class="increase_red"></div>
                        <div class="increase_title">下降</div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
export default {
    props:{
        liveStreamingPerformance:Object
    }
}
</script>
<style scoped>

.item,.item2,.item3{
    /* width: 140px; */
    width: 28%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
}
.item{
    background-image: linear-gradient(to bottom, #E8EFFF, #fff);
}
.item2{
    background-image: linear-gradient(to bottom, #E9FFFE, #fff);
}
.item3{
    background-image: linear-gradient(to bottom, #EDFFF3, #fff);
}


.item_icon_con{
    display: flex;
    justify-content: space-between;
}
.rising_powder{
    font-size: 22px;
    font-weight: bold;
}
.rising_powder_name{
    font-size: 13px;
    color: #979797;
}
.icon_back,.icon_back2,.icon_back3,.icon_back4,.icon_back5,.icon_back6,.icon_back7{
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    box-sizing: border-box;
    border-radius: 50%;
    opacity: .8;
    color: #8DB1E0;
}
.icon_back{
    background: #DBEAFD;
}
.icon_back2{
    background: #D1FBF9;
}
.icon_back3{
    background: #DAFFE7;
}
.icon_back4{
    background: #FFEAF8;
}
.icon_back5{
    background: #FFE3E8;
}
.icon_back6{
    background: #FFF6D0;
}
.icon_back7{
    background: #DCF2FF;
}

.rising_powder_icon{
    font-size: 22px;
}
.icon_one{
    font-size: 18px !important
}
.data_content{
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
}
.bor{
    width: 50%;
    border-right: 1px solid #D9D9D9;
}
.h5_bold{
    font-size: 14px;
    font-weight: bold;
    color: #636060;
}
.h6{
    font-size: 10px;
}
.date_mr{
    margin-top: 5px;
}
.increase_green,.increase_red{
    width: 6px;
    height: 6px;
    
    border-radius: 50%;
}
.increase_green{
    background: #008000;
}
.increase_red{
    background: #FF0000;
}
.increase_title{
    font-size: 10px;
    color: #979797;
}
.increase_item{
    display: flex;
    align-items: center;
    margin-right: 10px;
    
}
.increase_content{
    display: flex;
    margin-top: 10px;
}
.item_content{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}
</style>