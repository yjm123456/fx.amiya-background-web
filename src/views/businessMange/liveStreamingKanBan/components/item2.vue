<template>
  <div class="center_content">
    <div class="center_item">
      <div class="item1">
        <!-- <div class="h2">
          直播中线索
        </div>
        <div class="h1">{{liveStreamingObj.clueCount ? liveStreamingObj.clueCount : 0}}</div> -->
        <div class="h2">直播中线索</div>
        <div class="item">
          <div class="item_left">
              <div>当日线索：<span class="f_w">{{liveStreamingObj.currentClueCount}}</span></div>
              <div class="item_left">累计线索：<span class="f_w">{{liveStreamingObj.clueCount}}</span></div>
              <div class="item_left">线索目标：<span class="f_w">{{liveStreamingObj.clueTarget}}</span></div>
          </div>
          <div class="item_right">
              <div>去年同比：
                <span  class="h5" v-if="Math.sign(liveStreamingObj.clueYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(liveStreamingObj.clueYearOnYear) + '%'}}</span>
                <span class="h5" v-else-if="Math.sign(liveStreamingObj.clueYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(liveStreamingObj.clueYearOnYear) + '%'}}</span>
                <span class="h5"  v-else>-</span>
                </div>
              <div>上月环比：
                <span  class="h5" v-if="Math.sign(liveStreamingObj.clueChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(liveStreamingObj.clueChain) + '%'}}</span>
                <span class="h5" v-else-if="Math.sign(liveStreamingObj.clueChain)== -1"><span  class="green">下降</span>{{ Math.abs(liveStreamingObj.clueChain) + '%'}}</span>
                <span class="h5"  v-else>-</span>
              </div>
              <div  >目标达成：<span class="f_w" :style="{color:liveStreamingObj.clueTargetCompleteRate < completeRate ? 'red' :'green'}">{{liveStreamingObj.clueTargetCompleteRate ? liveStreamingObj.clueTargetCompleteRate + '%' : '0%'}}</span></div>
          </div>
        </div>
      </div>
      
      <div class="item2">
        <!-- <div class="h2">
          新客业绩
        </div>
        <div class="h1">{{liveStreamingObj.performance ? liveStreamingObj.performance : 0}}</div> -->
        <div class="h2">新客业绩</div>
        <div class="item">
          <div class="item_left">
              <div>业绩目标：<span class="f_w">{{liveStreamingObj.performanceTarget}}</span></div>
              <div>当日业绩：<span class="f_w">{{liveStreamingObj.currentPerformance}}</span></div>
              <div>当月业绩：<span class="f_w">{{liveStreamingObj.currentMontPerformance}}</span></div>
              <div class="item_left ">累计业绩：<span class="f_w">{{liveStreamingObj.performance}}</span></div>
          </div>
          <div class="item_right2">
              <div>去年同比：
                <span  class="h5" v-if="Math.sign(liveStreamingObj.performanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(liveStreamingObj.performanceYearOnYear) + '%'}}</span>
                <span class="h5" v-else-if="Math.sign(liveStreamingObj.performanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(liveStreamingObj.performanceYearOnYear) + '%'}}</span>
                <span class="h5"  v-else>-</span>
                </div>
              <div>上月环比：
                <span  class="h5" v-if="Math.sign(liveStreamingObj.performanceChain)== 1"> <span  class="red ">增长</span>{{ Math.abs(liveStreamingObj.performanceChain) + '%'}}</span>
                <span class="h5" v-else-if="Math.sign(liveStreamingObj.performanceChain)== -1"><span  class="green">下降</span>{{ Math.abs(liveStreamingObj.performanceChain) + '%'}}</span>
                <span class="h5"  v-else>-</span>
              </div>
              <div  >
              目标达成：
              <span class="f_w" :style="{color:liveStreamingObj.performanceTargetCompleteRate	 < completeRate ? 'red' :'green'}">
                {{liveStreamingObj.performanceTargetCompleteRate	 ? liveStreamingObj.performanceTargetCompleteRate	 + '%' : '0%'}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="item3">
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/amiyaLivingOperationBoard";

export default {
  props: {
    params: Object,
    title:String,
    completeRate:Number
  },
  data() {
    return {
      liveStreamingObj: {},
    };
  },
  methods: {
    
    // 获取直播中客资
    getLivingCustomerAndPerformanceDatas() {
      const { startDate, endDate, baseLiveAnchorId } = this.params;
      const data = {
        startDate: startDate? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: baseLiveAnchorId,
      };
      api.getLivingCustomerAndPerformanceData(data).then((res) => {
        if (res.code === 0) {
          this.liveStreamingObj = res.data.data;
        }
      });
    },
   
  },
};
</script>

<style scoped>
.center_content{
  width: 100%;
}
.center_item{
  width: 100%;
  display: flex;
  justify-content: center;
  /* padding: 0 10px;
  box-sizing: border-box; */
  text-align: center;
  color: #fff;
}
.item1,.item2,.item3,.item4{
  /* flex:1; */
  width: 32%;
  margin:0 10px;
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
  /* margin-right: 7%; */
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
.item_right2{
  margin-top:20px;
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
