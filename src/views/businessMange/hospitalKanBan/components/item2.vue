<template>
    <div class="center_content">
          <div class="center_item">
            <div class="item1" >
              <div class="h2">
                新客上门
                <!-- <Tooltip placement="top-start" >
                  <i
                    class="iconfont icon-info info"
                    style="color:#fff;font-size:18px;"
                  ></i>
                  <template #content>
                    <p>1、直播间下单199（199面诊卡，199</p>
                    <p>面膜），视频号下单未付款的顾客</p>
                    <p>2、直播间公屏捞客顾客</p>
                  </template>
                </Tooltip> -->
              </div>
              <div class="item">
                <div class="item_left">
                    <div>当日上门：<span class="f_w">{{hospitalPerformanceObj.todayNewCustomerNum}}</span></div>
                    <span >累计上门：<span class="f_w">{{hospitalPerformanceObj.totalNewCustomerNum}}</span></span>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.newCustomerNumYearOnYearData)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.newCustomerNumYearOnYearData) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.newCustomerNumYearOnYearData)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.newCustomerNumYearOnYearData) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.newCustomerNumChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.newCustomerNumChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.newCustomerNumChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.newCustomerNumChainRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">
                老客上门
                <!-- <Tooltip placement="top-start" >
                  <i
                    class="iconfont icon-info info"
                    style="color:#fff;font-size:18px;"
                  ></i>
                  <template #content >
                    <p>1、来源渠道直播前/中/后，主动私信</p>
                    <p>的顾客</p>
                    <p>2、直播后各平台的粉丝群顾客</p>
                  </template>
                </Tooltip> -->
              </div>
              <div class="item">
                <div class="item_left">
                    <div>当日上门：<span class="f_w">{{hospitalPerformanceObj.todayOldCustomerNum}}</span></div>
                    <span >累计上门：<span class="f_w">{{hospitalPerformanceObj.totalOldCustomerNum}}</span></span>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.oldCustomerNumYearOnYearData)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.oldCustomerNumYearOnYearData) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.oldCustomerNumYearOnYearData)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.oldCustomerNumYearOnYearData) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.oldCustomerNumChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.oldCustomerNumChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.oldCustomerNumChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.oldCustomerNumChainRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">
                总上门
                <!-- <Tooltip placement="top-start" >
                  <i
                    class="iconfont icon-info info"
                    style="color:#fff;font-size:18px;"
                  ></i>
                  <template #content>
                    <p>小风车/短视频/福袋/产品转化/其他，</p>
                    <p>获取的顾客资源</p>
                  </template>
                </Tooltip> -->
              </div>
              <div class="item">
                <div class="item_left">
                    <div>当日上门：<span class="f_w">{{hospitalPerformanceObj.todayTotalCustomerNum}}</span></div>
                    <span >累计上门：<span class="f_w">{{hospitalPerformanceObj.totalTotalCustomerNum}}</span></span>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.totalCustomerNumYearOnYearData)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.totalCustomerNumYearOnYearData) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.totalCustomerNumYearOnYearData)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.totalCustomerNumYearOnYearData) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(hospitalPerformanceObj.totalCustomerNumChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(hospitalPerformanceObj.totalCustomerNumChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(hospitalPerformanceObj.totalCustomerNumChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalPerformanceObj.totalCustomerNumChainRate) + '%'}}</span>
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
        
    },
    data(){
        return{
            hospitalPerformanceObj:{}
        }
    },
    methods:{
        // 获取助理业绩
        getdistributeConsulationData(){
            const {startDate,endDate,hospitalId} = this.params
            const data = {
                startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
                endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
                hospitalId:hospitalId 
            }
            api.hospitalVisitData(data).then(res=>{
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