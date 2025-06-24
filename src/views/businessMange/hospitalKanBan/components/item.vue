<template>

    <div class="center_content">
          <div class="center_item">
            <div class="item1" >
              <div class="h2">新客业绩：<span class="f_w">{{hospitalPerformanceObj.todayNewCustomerPerformance}}</span></div>
              <div class="item">
                <div class="item_left">
                    <div>累计业绩：<span  class="f_w">{{hospitalPerformanceObj.newCustomerPerformance ? hospitalPerformanceObj.newCustomerPerformance : 0 }}</span></div>
                    <div >上期业绩：<span  class="f_w">{{hospitalPerformanceObj.lastMonthNewCustomerPerformance}}</span></div>
                    <div >同期业绩：<span  class="f_w">{{hospitalPerformanceObj.lastYearNewCustomerPerformance}}</span></div>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.newCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.newCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.newCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.newCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.newCustomerPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.newCustomerPerformanceChain) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.newCustomerPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.newCustomerPerformanceChain) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">老客业绩：<span class="f_w">{{hospitalPerformanceObj.todayOldCustomerPerformance}}</span></div>
              <div class="item">
                <div class="item_left">
                    <div>累计业绩：<span  class="f_w">{{hospitalPerformanceObj.oldCustomerPerformance ? hospitalPerformanceObj.oldCustomerPerformance : 0 }}</span></div>
                    <div >上期业绩：<span  class="f_w">{{hospitalPerformanceObj.lastMonthOldCustomerPerformance}}</span></div>
                    <div >同期业绩：<span  class="f_w">{{hospitalPerformanceObj.lastYearOldCustomerPerformance}}</span></div>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.oldCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.oldCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.oldCustomerPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.oldCustomerPerformanceChain) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.oldCustomerPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.oldCustomerPerformanceChain) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">总业绩：<span>{{hospitalPerformanceObj.todayTotalPerformance}}</span></div>
              <div class="item">
                <div class="item_left">
                    <div>累计业绩：<span  class="f_w">{{hospitalPerformanceObj.totalPerformance ? hospitalPerformanceObj.totalPerformance : 0 }}</span></div>
                    <div>上期业绩：<span  class="f_w">{{hospitalPerformanceObj.lastMonthTotalPerformance}}</span></div>
                    <div>同期业绩：<span  class="f_w">{{hospitalPerformanceObj.lastYearTotalPerformance}}</span></div>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.totalPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.totalPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.totalPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.totalPerformanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.totalPerformanceChain) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.totalPerformanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.totalPerformanceChain) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
        </div>
           
    </div>
</template>
<script>
import * as api from "@/api/amiyaHospitalOperationBoard";

export default{
    props:{
        params:Object,
        completeRate:Number
    },
    data(){
        return{
            hospitalPerformanceObj:{}
        }
    },
    methods:{
        // 获取机构业绩
        getAssistantPerformance(){
            const {startDate,endDate,hospitalId} = this.params
            const data = {
                startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
                endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
                hospitalId:hospitalId 
            }
            api.hospitalPerformance(data).then(res=>{
                if(res.code === 0){
                    this.hospitalPerformanceObj =  res.data.data
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
.f_w{
  font-weight: bold;
}

</style>