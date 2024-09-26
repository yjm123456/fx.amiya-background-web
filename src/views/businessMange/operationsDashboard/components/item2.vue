<template>
    <div class="center_content">
          <div class="center_item">
            
            <div class="item1" >
              <div class="h2">直播前</div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：<span class="f_w">{{totalFlowRateAndDateSchedule.todayBeforeLivingClue}}</span></div>
                    <div class="item_left">累计线索：<span class="f_w">{{totalFlowRateAndDateSchedule.totalBeforeLivingClue}}</span></div>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.beforeLivingClueYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.beforeLivingClueYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.beforeLivingClueYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.beforeLivingClueYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.beforeLivingClueChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.beforeLivingClueChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.beforeLivingClueChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.beforeLivingClueChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div  >目标达成：<span class="f_w">{{totalFlowRateAndDateSchedule.beforeLivingClueCompleteRate ? totalFlowRateAndDateSchedule.beforeLivingClueCompleteRate + '%' : '0%'}}</span></div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">直播中</div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：<span  class="f_w">{{totalFlowRateAndDateSchedule.todayLivingClue}}</span></div>
                    <div class="item_left">累计线索：<span class="f_w">{{totalFlowRateAndDateSchedule.totalLivingClue}}</span></div>
                    
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.livingClueYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.livingClueYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.livingClueYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.livingClueYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.livingClueChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.livingClueChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.livingClueChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.livingClueChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div >目标达成：<span class="f_w">{{totalFlowRateAndDateSchedule.livingClueCompleteRate ? totalFlowRateAndDateSchedule.livingClueCompleteRate + '%' : '0%'}}</span></div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">直播后</div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：<span  class="f_w">{{totalFlowRateAndDateSchedule.todayTotalAfterLivingClue}}</span></div>
                    <div class="item_left">累计线索：<span class="f_w">{{totalFlowRateAndDateSchedule.totalAfterLivingClue}}</span></div>
                    
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.totalAfterLivingClueYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.totalAfterLivingClueYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.totalAfterLivingClueYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.totalAfterLivingClueYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.totalAfterLivingClueChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.totalAfterLivingClueChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.totalAfterLivingClueChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.totalAfterLivingClueChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>目标达成：<span class="f_w">{{totalFlowRateAndDateSchedule.totalAfterLivingClueCompleteRate ? totalFlowRateAndDateSchedule.totalAfterLivingClueCompleteRate + '%' : '0%'}}</span></div>
                </div>
              </div>
            </div>
            <div class="item4" >
              <div class="h2">总线索</div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：<span  class="f_w">{{totalFlowRateAndDateSchedule.todayClue}}</span></div>
                    <div class="item_left">累计线索：<span class="f_w">{{totalFlowRateAndDateSchedule.totalClue}}</span></div>
                    
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.clueYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.clueYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.clueYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.clueYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(totalFlowRateAndDateSchedule.clueChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(totalFlowRateAndDateSchedule.clueChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(totalFlowRateAndDateSchedule.clueChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(totalFlowRateAndDateSchedule.clueChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div >目标达成：<span class="f_w">{{totalFlowRateAndDateSchedule.clueCompleteRate ? totalFlowRateAndDateSchedule.clueCompleteRate + '%' : '0%'}}</span></div>
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
    text-align:start
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