<template>
    <div class="contents">
        <div class="title">月业绩完成情况</div>
        <div class="list1">
            <Card class="item_con">
                <div class="item">
                    <div class="item_left1">
                        <i class="iconfont icon-yiwancheng1 icon1"></i>
                    </div>
                    <div class="item_rigth">
                        <div class="num">{{monthPerformanceData.completedPerformance}}</div>
                        <div class="text">已完成</div>
                    </div>
                </div>
                
            </Card>
             <Card class="item_con">
                <div class="item">
                    <div class="item_left2">
                        <i class="iconfont icon-jinrixinzeng icon2"></i>
                    </div>
                    <div class="item_rigth">
                        <div class="num">{{monthPerformanceData.newCustomerPerformance}}</div>
                        <div class="text">新客业绩</div>
                    </div>
                </div>
                
            </Card>
            <Card class="item_con">
                <div class="item">
                    <div class="item_left3">
                        <i class="iconfont icon-jixiaokaohebumenpingfen icon1"></i>
                    </div>
                    <div class="item_rigth">
                        <div class="num">{{monthPerformanceData.oldCustomerPerformance}}</div>
                        <div class="text">老客业绩</div>
                    </div>
                </div>
                
            </Card>
        </div>
        <div class="list2">
            <Card class="item2">
                <div class="num">{{monthPerformanceData.triageCount}}</div>
                <div class="text">分诊量</div>
            </Card>
            <Card class="item3">
                <div class="item3_top">
                    <div class="num">{{monthPerformanceData.addWechat}}</div>
                    <div class="text">加v量</div>
                </div>
                <div class="item3_bottom">
                    加v率：{{monthPerformanceData.addWechatRatio}}%
                </div>
            </Card>
            <Card class="item3">
                <div class="item3_top">
                    <div class="num">{{monthPerformanceData.senOrderCount}}</div>
                    <div class="text">派单量</div>
                </div>
                <div class="item3_bottom">
                    派单率：{{monthPerformanceData.sendOrderRatio}}%
                </div>
            </Card>
            <Card class="item3">
                <div class="item3_top">
                    <div class="num">{{monthPerformanceData.toHospitalCount}}</div>
                    <div class="text">到院量</div>
                </div>
                <div class="item3_bottom">
                    到院率：{{monthPerformanceData.toHospitalCountRatio}}%
                </div>
            </Card>
            <Card class="item3">
                <div class="item3_top">
                    <div class="num">{{monthPerformanceData.dealCount}}</div>
                    <div class="text">成交量</div>
                </div>
                <div class="item3_bottom">
                    成交率：{{monthPerformanceData.dealRatio}}%
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import * as api from "@/api/assistantHomePage";

export default {
    props:{
        queryParams:Object
    },
    data(){
        return{
            // 月业绩完成情况
            monthPerformanceData:{}
        }
    },
    methods:{
        // 月业绩完成情况
        getMonthPerformanceData(){
            const {date,baseLiveAnchorId,contentPlatformId,liveAnchorId,wechatNoId,source,assistantId} = this.queryParams
            const data = {
                date:this.$moment(date).format("YYYY-MM-DD"),
                baseLiveAnchorId:baseLiveAnchorId == -1 ? null : baseLiveAnchorId,
                contentPlatformId:contentPlatformId == -1 ? null : contentPlatformId,
                liveAnchorId,
                wechatNoId:wechatNoId == -1 ? null : wechatNoId,
                source:source == -1 ? null : source,
                assistantId:assistantId == -1 ? null : assistantId,
            };
            api.monthPerformanceData(data).then((res) => {
                if (res.code === 0) {
                let { monthPerformanceData } = res.data;
                this.monthPerformanceData = monthPerformanceData;
                }
            });
        }
    }
}
</script>

<style scoped lang="less">
/deep/ .ivu-card-body{
    padding: 0;
    width: 100%;
}
.list1,.list2{
    width: 100%;
    display: flex;
}
.list1{
    margin-top: 30px;
}
.list2{
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 40px;
}
.item_con{
    display: flex;
    flex:1;
    margin: 10px 5px;
    height: 100px;

}
.item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.item_left1,.item_left2,.item_left3{
    width: 40%;
    height: 100px;
    text-align: center;
    line-height: 100px;
}
.item_left1{
    background: #19BE6B;
}
.item_left2{
    background: #2D8CF0;
}
.item_left3{
    background: #E46CBB;
}
.item_rigth{
    width: 100%;
    flex: 1;
    text-align: center;
}
.icon1,.icon2{
    color: #fff;
    font-weight: bold;
}
.icon1{
    font-size: 40px;
}
.icon2{
    font-size: 35px;
    
}
.title{
    font-size: 15px;
    font-weight: bold;
    color: #000;
}
.num{
    font-size: 16px;
    font-weight: bold;
}
.item2,.item3{
    width: 16%;
    height: 120px;
}
.item2{
    text-align: center;
    padding-top: 30px;
    box-sizing: border-box;
}
.item3{
    display: flex;
    text-align: center;
}
.item3_top{
    height: 80px;
    padding-top: 17px;
    box-sizing: border-box;
}
.item3_bottom{
    height: 40px;
    line-height: 40px;
    background: #e2e1e1;
    color: #000;
    font-size: 12px;
}
.contents{
    height: 430px;
}
</style>