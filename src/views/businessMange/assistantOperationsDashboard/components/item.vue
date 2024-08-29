<template>
    <div class="list">
       <div class="item">
            <div class="i_top">
                <div>新客业绩</div>
                <div class="h1">{{assistantPerformanceObj.newCustomerPerformance}}</div>
            </div>
            <div class="i_bottom">
                <div class="i_title">
                    <span class="right">当日业绩{{assistantPerformanceObj.todayNewCustomerPerformance}}</span>
                    <span class="right">超出进度
                        <span   v-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceTargetSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceTargetSchedule) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceTargetSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceTargetSchedule) + '%'}}</span>
                        <span   v-else>-</span>
                    </span>
                </div>
                <div class="i_title">
                    <span >上期业绩{{assistantPerformanceObj.lastMonthNewCustomerPerformance}}</span>
                    <span  class="right">环比
                        <span   v-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceChain) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceChain) + '%'}}</span>
                        <span   v-else>-</span>
                    </span>
                </div>
                <div class="i_title">
                    <span>同期业绩{{assistantPerformanceObj.lastYearNewCustomerPerformance}}</span>
                    <span  class="right">同比
                        <span   v-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceYearOnYear) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceYearOnYear) + '%'}}</span>
                        <span   v-else>-</span>
                    </span>
                </div>
                <div class="i_title">
                    <span>目标业绩{{assistantPerformanceObj.newCustomerPerformanceTarget}}</span>
                    <span  class="right">目标达成率
                        <span   v-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceTargetCompleteRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceTargetCompleteRate) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceTargetCompleteRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceTargetCompleteRate) + '%'}}</span>
                        <span   v-else>-</span>
                        
                    </span>
                </div>
            </div>
       </div>
       <div class="item">
            <div class="i_top">
                <div>老客业绩</div>
                <div class="h1">{{assistantPerformanceObj.oldCustomerPerformance}}</div>
            </div>
            <div class="i_bottom">
                <div class="i_title">
                    <span>当日业绩{{assistantPerformanceObj.todayOldCustomerPerformance}}</span>
                    <span  class="right">超出进度
                        <span   v-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceTargetSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceTargetSchedule) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceTargetSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceTargetSchedule) + '%'}}</span>
                        <span   v-else>-</span>
                    </span>
                </div>
                <div class="i_title">
                    <span>上期业绩{{assistantPerformanceObj.lastMonthOldCustomerPerformance}}</span>
                    <span  class="right">环比
                        <span   v-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceChain) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceChain) + '%'}}</span>
                        <span   v-else>-</span>

                    </span>
                </div>
                <div class="i_title">
                    <span>同期业绩{{assistantPerformanceObj.lastYearOldCustomerPerformance}}</span>
                    <span  class="right">同比
                        <span   v-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                        <span   v-else>-</span>

                    </span>
                </div>
                <div class="i_title">
                    <span>目标业绩{{assistantPerformanceObj.oldCustomerPerformanceTarget}}</span>
                    <span  class="right">目标达成率
                        <span   v-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceTargetCompleteRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceTargetCompleteRate) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceTargetCompleteRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceTargetCompleteRate) + '%'}}</span>
                        <span   v-else>-</span>

                    </span>
                </div>
            </div>
       </div>
       <div class="item">
            <div class="i_top">
                <div>总业绩</div>
                <div class="h1">{{assistantPerformanceObj.totalPerformance}}</div>
            </div>
            <div class="i_bottom">
                <div class="i_title">
                    <span>当日业绩{{assistantPerformanceObj.todayTotalPerformance}}</span>
                    <span  class="right">超出进度
                        <span   v-if="Math.sign(assistantPerformanceObj.totalPerformanceTargetSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceTargetSchedule) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.totalPerformanceTargetSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceTargetSchedule) + '%'}}</span>
                        <span   v-else>-</span>

                    </span>
                </div>
                <div class="i_title">
                    <span>上期业绩{{assistantPerformanceObj.lastMonthTotalPerformance}}</span>
                    <span  class="right">环比
                        <span   v-if="Math.sign(assistantPerformanceObj.totalPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceChain) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.totalPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceChain) + '%'}}</span>
                        <span   v-else>-</span>

                    </span>
                </div>
                <div class="i_title">
                    <span>同期业绩{{assistantPerformanceObj.lastYearTotalPerformance}}</span>
                    <span  class="right">同比
                        <span   v-if="Math.sign(assistantPerformanceObj.totalPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceYearOnYear) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceYearOnYear) + '%'}}</span>
                        <span   v-else>-</span>

                    </span>
                </div>
                <div class="i_title">
                    <span>目标业绩{{assistantPerformanceObj.totalPerformanceTarget}}</span>
                    <span  class="right">目标达成率
                        <span   v-if="Math.sign(assistantPerformanceObj.totalPerformanceTargetCompleteRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceTargetCompleteRate) + '%'}}</span>
                        <span  v-else-if="Math.sign(assistantPerformanceObj.totalPerformanceTargetCompleteRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceTargetCompleteRate) + '%'}}</span>
                        <span   v-else>-</span>

                    </span>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";

export default{
    props:{
        params:Object
    },
    data(){
        return{
            assistantPerformanceObj:{}
        }
    },
    methods:{
        // 获取助理业绩
        getAssistantPerformance(){
            const {startDate,endDate,assistantId} = this.params
            const data = {
                startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
                endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
                assistantId:assistantId 
            }
            api.assistantPerformance(data).then(res=>{
                if(res.code === 0){
                    this.assistantPerformanceObj =  res.data.data
                }
            })
        }
    }
}
</script>

<style scoped>
.list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}
.item{
    width: 32%;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding-top:10px;
    box-sizing: border-box;
    font-weight: bold;
    
}
.i_top{
    text-align: center;
    border-bottom: 1px solid #ccc;
    color: #dbb200;
    font-size: 18px;
}
.h1{
    font-size: 28px;
}
.i_bottom{
    padding: 10px 60px;
    box-sizing: border-box;
    background: #e1aa33;
    border-bottom-right-radius: 10px; /* 右下角 */
    border-bottom-left-radius: 10px; /* 左下角 */
    color: #000;
    text-align: start;
    
}
.i_title{
    display: flex;
    justify-content: space-between;
    text-align: start;

}

.red{
  color: green;
  margin-right: 4px;
}
.green{
  color: red;
  margin-right: 4px;
}
.right{
    width: 50%;
    text-align: start;
}
</style>