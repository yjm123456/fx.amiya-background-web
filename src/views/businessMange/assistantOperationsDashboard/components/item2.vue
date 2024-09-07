<template>
    <div class="center_content">
          <div class="center_item">
            <div class="item1" >
              <div class="h2">一类客资</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：{{assistantPerformanceObj.firstTypeCurrentDay}}</div>
                    <span >累计：</span>
                    <span >{{assistantPerformanceObj.firstTypeTotal}}</span>
                </div>
                <div class="item_right">
                    <div>当月同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.firstTypeYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.firstTypeYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.firstTypeYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.firstTypeYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                      </div>
                    <div>当月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.firstTypeChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.firstTypeChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.firstTypeChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.firstTypeChainRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">二类客资</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：{{assistantPerformanceObj.secondTypeCurrentDay}}</div>
                    <span >累计：</span>
                    <span >{{assistantPerformanceObj.secondTypeTotal}}</span>
                </div>
                <div class="item_right">
                    <div>当月同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.secondTypeYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.secondTypeYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.secondTypeYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.secondTypeYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>当月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.secondTypeChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.secondTypeChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.secondTypeChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.secondTypeChainRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">三类客资</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：{{assistantPerformanceObj.thirdTypeCurrentDay}}</div>
                    <span >累计：</span>
                    <span >{{assistantPerformanceObj.thirdTypeTotal}}</span>
                </div>
                <div class="item_right">
                    <div>当月同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.thirdTypeYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.thirdTypeYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.thirdTypeYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.thirdTypeYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>当月环比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.thirdTypeChainRate)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.thirdTypeChainRate) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.thirdTypeChainRate)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.thirdTypeChainRate) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="item4" >
              <div class="h2">总客资</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：{{assistantPerformanceObj.totalTypeCurrentDay}}</div>
                    <span >累计：</span>
                    <span >{{assistantPerformanceObj.totalTypeTotal}}</span>
                </div>
                <div class="item_right">
                    <div>当月同比：
                      <span  class="h5" v-if="Math.sign(assistantPerformanceObj.totalTypeYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(assistantPerformanceObj.totalTypeYearOnYear) + '%'}}</span>
                      <span class="h5" v-else-if="Math.sign(assistantPerformanceObj.totalTypeYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(assistantPerformanceObj.totalTypeYearOnYear) + '%'}}</span>
                      <span class="h5"  v-else>-</span>
                    </div>
                    <div>当月环比：
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