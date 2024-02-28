<template>
    <div>
        <div class="item_content">
            <div class="item">
                <div class="item_icon_con">
                    <div >
                        <div class="rising_powder">{{beforePerformance.orderGMV}}</div>
                        <div  class="rising_powder_name">下单GMV</div>
                    </div>
                    <div class="icon_back"><i class="iconfont icon-xiaoshouhanjine rising_powder_icon icon_one"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">{{beforePerformance.orderGMVTarget}}</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold" :style="{color: !beforePerformance.orderGMVToDateSchedule  ? '#636060' : beforePerformance.orderGMVToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.orderGMVChainRatio ? beforePerformance.orderGMVChainRatio : '-'}}%</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold" :style="{color: !beforePerformance.orderGMVToDateSchedule  ? '#636060' : beforePerformance.orderGMVToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.orderGMVTargetCompleteRate ? beforePerformance.orderGMVTargetCompleteRate : '-'}}%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold" :style="{color: !beforePerformance.orderGMVToDateSchedule  ? '#636060' : beforePerformance.orderGMVToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.orderGMVYearOnYear ? beforePerformance.orderGMVYearOnYear : '-'}}%</div>
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
                        <div class="rising_powder">{{beforePerformance.refundGMV}}</div>
                        <div  class="rising_powder_name">退款GMV</div>
                    </div>
                    <div class="icon_back2"><i class="iconfont icon-tuikuan rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">{{beforePerformance.refundGMVTarget}}</div>
                            <div class="h6">预算</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold" :style="{color: !beforePerformance.refundGMVToDateSchedule  ? '#636060' : beforePerformance.refundGMVToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.refundGMVChainRatio ? beforePerformance.refundGMVChainRatio : '-'}}%</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold" :style="{color: !beforePerformance.refundGMVToDateSchedule  ? '#636060' : beforePerformance.refundGMVToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.refundGMVTargetCompleteRate ? beforePerformance.refundGMVTargetCompleteRate : '-'}}%</div>
                            <div  class="h6"> 消耗</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold" :style="{color: !beforePerformance.refundGMVToDateSchedule  ? '#636060' : beforePerformance.refundGMVToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.refundGMVYearOnYear ? beforePerformance.refundGMVYearOnYear : '-'}}%</div>
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
                        <div class="rising_powder">{{beforePerformance.actualReturnBackMoney}}</div>
                        <div  class="rising_powder_name">实际回款</div>
                    </div>
                    <div class="icon_back3"><i class="iconfont icon-huikuan rising_powder_icon "></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">{{beforePerformance.actualReturnBackMoneyTarget}}</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold" :style="{color: !beforePerformance.actualReturnBackMoneyToDateSchedule  ? '#636060' : beforePerformance.actualReturnBackMoneyToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.actualReturnBackMoneyChainRatio ? beforePerformance.actualReturnBackMoneyChainRatio : '-'}}%</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold" :style="{color: !beforePerformance.actualReturnBackMoneyToDateSchedule  ? '#636060' : beforePerformance.actualReturnBackMoneyToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.actualReturnBackMoneyTargetCompleteRate ? beforePerformance.actualReturnBackMoneyTargetCompleteRate : '-'}}%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold" :style="{color: !beforePerformance.actualReturnBackMoneyToDateSchedule  ? '#636060' : beforePerformance.actualReturnBackMoneyToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.actualReturnBackMoneyYearOnYear ? beforePerformance.actualReturnBackMoneyYearOnYear : '-'}}%</div>
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

            <div class="item4">
                <div class="item_icon_con">
                    <div >
                        <div class="rising_powder">{{beforePerformance.investFlow}}</div>
                        <div  class="rising_powder_name">直播付费</div>
                    </div>
                    <div class="icon_back4"><i class="iconfont icon-shouyintai3 rising_powder_icon icon_one"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">{{beforePerformance.investFlowTarget}}</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold" :style="{color: !beforePerformance.investFlowToDateSchedule  ? '#636060' : beforePerformance.investFlowToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.investFlowChainRatio ? beforePerformance.investFlowChainRatio : '-'}}%</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold" :style="{color: !beforePerformance.investFlowToDateSchedule  ? '#636060' : beforePerformance.investFlowToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.investFlowTargetCompleteRate ? beforePerformance.investFlowTargetCompleteRate : '-'}}%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold" :style="{color: !beforePerformance.investFlowToDateSchedule  ? '#636060' : beforePerformance.investFlowToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.investFlowYearOnYear ? beforePerformance.investFlowYearOnYear : '-'}}%</div>
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
        beforePerformance:Object
    }
}
</script>

<style scoped>

.item,.item2,.item3,.item4,.item5,.item6,.item7{
    /* width: 140px; */
    width: 23%;
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
.item4{
    background-image: linear-gradient(to bottom, #FFF4FC, #fff);
}
.item5{
    background-image: linear-gradient(to bottom, #FFF1F3, #fff);
}
.item6{
    background-image: linear-gradient(to bottom, #FFFAE6, #fff);
}
.item7{
    background-image: linear-gradient(to bottom, #EEF9FF, #fff);
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