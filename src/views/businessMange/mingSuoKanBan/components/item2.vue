<template>
    <div class="center_content">
          <div class="center_item">
            
            <div class="item1" >
              <div class="h2">总线索</div>
              <div class="item">
                <div class="item_left">
                    <div>当日线索：<span class="f_w">{{mingSuoObj.todayTotalClues}}</span></div>
                    <div class="item_left">累计线索：<span class="f_w">{{mingSuoObj.totalClues}}</span></div>
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(mingSuoObj.totalCluesYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(mingSuoObj.totalCluesYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(mingSuoObj.totalCluesYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(mingSuoObj.totalCluesYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(mingSuoObj.totalCluesChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(mingSuoObj.totalCluesChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(mingSuoObj.totalCluesChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(mingSuoObj.totalCluesChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div  >目标达成：<span class="f_w" :style="{color:mingSuoObj.totalCluesCompleteRate < completeRate ? 'red' :'green'}">{{mingSuoObj.totalCluesCompleteRate ? mingSuoObj.totalCluesCompleteRate + '%' : '0%'}}</span></div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">新客业绩</div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：<span  class="f_w">{{mingSuoObj.todayNewCustomerPerformance}}</span></div>
                    <div class="item_left">累计业绩：<span class="f_w">{{mingSuoObj.newCustomerPerformance}}</span></div>
                    
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(mingSuoObj.newCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(mingSuoObj.newCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(mingSuoObj.newCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(mingSuoObj.newCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(mingSuoObj.newCustomerPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(mingSuoObj.newCustomerPerformanceChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(mingSuoObj.newCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(mingSuoObj.newCustomerPerformanceChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div >目标达成：<span class="f_w" :style="{color:mingSuoObj.newCustomerPerformanceCompleteRate < completeRate ? 'red' :'green'}">{{mingSuoObj.newCustomerPerformanceCompleteRate ? mingSuoObj.newCustomerPerformanceCompleteRate + '%' : '0%'}}</span></div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">老客业绩</div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：<span  class="f_w">{{mingSuoObj.todayOldCustomerPerformance}}</span></div>
                    <div class="item_left">累计业绩：<span class="f_w">{{mingSuoObj.oldCustomerPerformance}}</span></div>
                    
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(mingSuoObj.oldCustomerPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(mingSuoObj.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(mingSuoObj.oldCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(mingSuoObj.oldCustomerPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(mingSuoObj.oldCustomerPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(mingSuoObj.oldCustomerPerformanceChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(mingSuoObj.oldCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(mingSuoObj.oldCustomerPerformanceChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>目标达成：<span class="f_w" :style="{color:mingSuoObj.oldCustomerPerformanceCompleteRate < completeRate ? 'red' :'green'}">{{mingSuoObj.oldCustomerPerformanceCompleteRate ? mingSuoObj.oldCustomerPerformanceCompleteRate + '%' : '0%'}}</span></div>
                </div>
              </div>
            </div>
            <div class="item4" >
              <div class="h2">总业绩</div>
              <div class="item">
                <div class="item_left">
                    <div>当日业绩：<span  class="f_w">{{mingSuoObj.todayTotalPerformance}}</span></div>
                    <div class="item_left">累计业绩：<span class="f_w">{{mingSuoObj.totalPerformance}}</span></div>
                    
                </div>
                <div class="item_right">
                    <div>去年同比：
                      <span  class="h5" v-if="Math.sign(mingSuoObj.totalPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(mingSuoObj.totalPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(mingSuoObj.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(mingSuoObj.totalPerformanceYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>上月环比：
                      <span  class="h5" v-if="Math.sign(mingSuoObj.totalPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(mingSuoObj.totalPerformanceChainRatio) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(mingSuoObj.totalPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(mingSuoObj.totalPerformanceChainRatio) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div >目标达成：<span class="f_w" :style="{color:mingSuoObj.totalPerformanceCompleteRate < completeRate ? 'red' :'green'}">{{mingSuoObj.totalPerformanceCompleteRate ? mingSuoObj.totalPerformanceCompleteRate + '%' : '0%'}}</span></div>
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
        mingSuoObj:Object,
        completeRate:Number
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