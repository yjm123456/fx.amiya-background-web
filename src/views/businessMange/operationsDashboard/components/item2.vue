<template>
    <div class="center_content">
          <div class="center_item">
            <div class="item1" >
              <div class="h2">线索量</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：{{totalFlowRateAndDateSchedule.todayTotalFlowRate}}</div>
                    <div class="h3">累计</div>
                    <div class="h3">{{totalFlowRateAndDateSchedule.totalFlowRate}}</div>
                </div>
                <div class="item_right">
                    <div>当月同比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.totalFlowRateYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.totalFlowRateYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.totalFlowRateYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.totalFlowRateYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>当月环比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.totalFlowRateChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.totalFlowRateChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.totalFlowRateChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.totalFlowRateChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div class="f_w">当月目标达成率：{{totalFlowRateAndDateSchedule.totalFlowRateCompleteRate ? totalFlowRateAndDateSchedule.totalFlowRateCompleteRate + '%' : '0%'}}</div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">退卡量</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：{{totalFlowRateAndDateSchedule.todayRefundCard}}</div>
                    <div class="h3">累计</div>
                    <div class="h3">{{totalFlowRateAndDateSchedule.totalRefundCard}}</div>
                </div>
                <div class="item_right">
                    <div>当月同比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.refundCardYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.refundCardYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.refundCardYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.refundCardYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>当月环比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.refundCardChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.refundCardChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.refundCardChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.refundCardChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div class="f_w">当月目标达成率：{{totalFlowRateAndDateSchedule.refundCardCompleteRate ? totalFlowRateAndDateSchedule.refundCardCompleteRate + '%' : '0%'}}</div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">分诊量</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：{{totalFlowRateAndDateSchedule.todayDistributeConsulation}}</div>
                    <div class="h3">累计</div>
                    <div class="h3">{{totalFlowRateAndDateSchedule.totalDistributeConsulation}}</div>
                </div>
                <div class="item_right">
                    <div>当月同比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.distributeConsulationYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.distributeConsulationYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.distributeConsulationYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.distributeConsulationYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>当月环比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.distributeConsulationChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.distributeConsulationChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.distributeConsulationChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.distributeConsulationChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div  class="f_w">当月目标达成率：{{totalFlowRateAndDateSchedule.distributeConsulationCompleteRate ? totalFlowRateAndDateSchedule.distributeConsulationCompleteRate + '%' : '0%'}}</div>
                </div>
              </div>
            </div>
            <div class="item4" >
              <div class="h2">加v量</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：{{totalFlowRateAndDateSchedule.todayAddWechat}}</div>
                    <div class="h3">累计</div>
                    <div class="h3">{{totalFlowRateAndDateSchedule.totalAddWechat}}</div>
                </div>
                <div class="item_right">
                    <div>当月同比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.addWechatYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.addWechatYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.addWechatYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.addWechatYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>当月环比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.addWechatChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.addWechatChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.addWechatChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.addWechatChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div class="f_w">当月目标达成率：{{totalFlowRateAndDateSchedule.addWechatCompleteRate ? totalFlowRateAndDateSchedule.addWechatCompleteRate + '%' : '0%'}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>
<script>

export default{
    props:{
        params:Object,
        totalFlowRateAndDateSchedule:Object
    },
    data(){
        return{
          
        }
    },
    methods:{
      
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