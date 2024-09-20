<template>

    <div class="center_content">
          <div class="center_item">
            <div class="item1" >
              <div class="h2">新客业绩：<span>{{assistantPerformanceObj.newCustomerPerformance ? assistantPerformanceObj.newCustomerPerformance : 0 }}</span></div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：{{assistantPerformanceObj.todayNewCustomerPerformance}}</div>
                    <div >上期业绩：{{assistantPerformanceObj.lastMonthNewCustomerPerformance}}</div>
                    <div >同期业绩：{{assistantPerformanceObj.lastYearNewCustomerPerformance}}</div>
                    <div >目标业绩：{{assistantPerformanceObj.newCustomerPerformanceTarget}}</div>
                </div>
                <div class="item_right">
                    <div>超出进度：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceTargetSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceTargetSchedule) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceTargetSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceTargetSchedule) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceChain) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceChain) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>目标达成：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceTargetCompleteRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceTargetCompleteRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.newCustomerPerformanceTargetCompleteRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.newCustomerPerformanceTargetCompleteRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">老客业绩：<span>{{assistantPerformanceObj.oldCustomerPerformance ? assistantPerformanceObj.oldCustomerPerformance : 0 }}</span></div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：{{assistantPerformanceObj.todayOldCustomerPerformance}}</div>
                    <div >上期业绩：{{assistantPerformanceObj.lastMonthOldCustomerPerformance}}</div>
                    <div >同期业绩：{{assistantPerformanceObj.lastYearOldCustomerPerformance}}</div>
                    <div >目标业绩：{{assistantPerformanceObj.oldCustomerPerformanceTarget}}</div>
                </div>
                <div class="item_right">
                    <div>超出进度：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceTargetSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceTargetSchedule) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceTargetSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceTargetSchedule) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceChain) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceChain) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>目标达成：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceTargetCompleteRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceTargetCompleteRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.oldCustomerPerformanceTargetCompleteRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.oldCustomerPerformanceTargetCompleteRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">总业绩：<span>{{assistantPerformanceObj.totalPerformance ? assistantPerformanceObj.totalPerformance : 0 }}</span></div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：{{assistantPerformanceObj.todayTotalPerformance}}</div>
                    <div >上期业绩：{{assistantPerformanceObj.lastMonthTotalPerformance}}</div>
                    <div >同期业绩：{{assistantPerformanceObj.lastYearTotalPerformance}}</div>
                    <div >目标业绩：{{assistantPerformanceObj.totalPerformanceTarget}}</div>
                </div>
                <div class="item_right">
                    <div>超出进度：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.totalPerformanceTargetSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceTargetSchedule) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.totalPerformanceTargetSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceTargetSchedule) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.totalPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.totalPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceChain) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.totalPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceChain) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>目标达成：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.totalPerformanceTargetCompleteRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceTargetCompleteRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.totalPerformanceTargetCompleteRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalPerformanceTargetCompleteRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
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
.item1,.item2,.item3,.item4{
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
    /* font-weight: bold; */
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
.item4{
  background:  linear-gradient(to right,#F69A56, #F37F51);
}
.h2{
    font-size: 16px;
    margin-bottom:5px ;
}
.h3{
    font-size:16px;
    text-align:center
}
.h5{
  font-size: 14px;
  /* font-weight: bold; */
}
.red{
  color: green;
  margin-right: 4px;
}
.green{
  color: red;
  margin-right: 4px;
}
.f_w{
  font-weight: bold;
}

</style>