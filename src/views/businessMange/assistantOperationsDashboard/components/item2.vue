<template>
    <div class="center_content">
          <div class="center_item">
            <div class="item1" >
              <div class="h2">
                一级线索
                <Tooltip placement="top-start" >
                  <i
                    class="iconfont icon-info info"
                    style="color:#fff;font-size:18px;"
                  ></i>
                  <template #content>
                    <p>1、直播间下单199（199面诊卡，199</p>
                    <p>面膜），视频号下单未付款的顾客</p>
                    <p>2、直播间公屏捞客顾客</p>
                  </template>
                </Tooltip>
              </div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：{{assistantPerformanceObj.firstTypeCurrentDay}}</div>
                    <span >累计线索：</span>
                    <span >{{assistantPerformanceObj.firstTypeTotal}}</span>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.firstTypeYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.firstTypeYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.firstTypeYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.firstTypeYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.firstTypeChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.firstTypeChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.firstTypeChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.firstTypeChainRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">
                二级线索
                <Tooltip placement="top-start" >
                  <i
                    class="iconfont icon-info info"
                    style="color:#fff;font-size:18px;"
                  ></i>
                  <template #content >
                    <p>1、来源渠道直播前/中/后，主动私信</p>
                    <p>的顾客</p>
                    <p>2、直播后各平台的粉丝群顾客</p>
                  </template>
                </Tooltip>
              </div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：{{assistantPerformanceObj.secondTypeCurrentDay}}</div>
                    <span >累计线索：</span>
                    <span >{{assistantPerformanceObj.secondTypeTotal}}</span>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.secondTypeYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.secondTypeYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.secondTypeYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.secondTypeYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.secondTypeChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.secondTypeChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.secondTypeChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.secondTypeChainRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">
                三级线索
                <Tooltip placement="top-start" >
                  <i
                    class="iconfont icon-info info"
                    style="color:#fff;font-size:18px;"
                  ></i>
                  <template #content>
                    <p>小风车/短视频/福袋/产品转化/其他，</p>
                    <p>获取的顾客资源</p>
                  </template>
                </Tooltip>
              </div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：{{assistantPerformanceObj.thirdTypeCurrentDay}}</div>
                    <span >累计线索：</span>
                    <span >{{assistantPerformanceObj.thirdTypeTotal}}</span>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.thirdTypeYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.thirdTypeYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.thirdTypeYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.thirdTypeYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.thirdTypeChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.thirdTypeChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.thirdTypeChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.thirdTypeChainRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item4" >
              <div class="h2">总线索</div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：{{assistantPerformanceObj.totalTypeCurrentDay}}</div>
                    <span >累计线索：</span>
                    <span >{{assistantPerformanceObj.totalTypeTotal}}</span>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.totalTypeYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalTypeYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.totalTypeYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalTypeYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.totalTypeChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalTypeChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.totalTypeChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalTypeChainRate) + '%'}}</span>
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
        params:Object,
        
    },
    data(){
        return{
            assistantPerformanceObj:{}
        }
    },
    methods:{
        // 获取助理业绩
        getdistributeConsulationData(){
            const {startDate,endDate,assistantId} = this.params
            const data = {
                startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
                endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
                assistantId:assistantId 
            }
            api.distributeConsulationData(data).then(res=>{
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