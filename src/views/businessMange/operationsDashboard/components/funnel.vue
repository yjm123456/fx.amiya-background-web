<template>
  <div>
    <!-- tab切换 -->
    <div class="tab_content">
      <div class="tab">
        <div
          class="tab_item"
          v-for="(item, index) in list"
          :key="index"
          @click="selectTab(index, item)"
          :class="{ active: selected == item }"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </div>

    <div class="center" v-if="isFlag == true">
            <Card class="content">
                    <div class="h3">新客</div>
                    <!-- <div class="new_left">
                        <div >
                            <div>
                                <div>分诊成交转化率：<span class="num">{{performance.newCustomerData.allocationConsulationToDealRate}}</span>%</div>
                                <div>分诊成交能效：<span class="num">{{performance.newCustomerData.allocationConsulationToDealPrice}}</span>元</div>
                            </div>
                            <div>
                                <div>派单成交转化率：<span class="num">{{performance.newCustomerData.sendOrderToDealRate}}</span>%</div>
                                <div>派单成交能效：<span class="num">{{performance.newCustomerData.sendOrderToDealPrice}}</span>元</div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="left_customer">
                        <div class="r_content6">
                            <span class="r_t2">转化周期</span>
                        </div>
                        <div  class="r_content2" style="margin-top:-18px">
                            <span class="r_t2" ><span class="num">{{performance.newCustomerData.flowClueToDealPrice}}</span>元</span>
                        </div>
                        <div  class="r_content3">
                            <span class="r_t2" style="margin-top:14%"><span class="num">{{performance.newCustomerData.allocationConsulationToDealPrice}}</span>元</span>
                        </div>
                        <div  class="r_content4">
                            <span class="r_t2" style="margin-top:12%"><span class="num">{{performance.newCustomerData.addWeChatToDealPrice}}</span>元</span>
                        </div>
                        <div  class="r_content5">
                            <span class="r_t2" style="margin-top:12%"><span class="num">{{performance.newCustomerData.sendOrderToDealPrice}}</span>元</span>
                        </div>
                        <div  class="r_content5">
                            <span class="r_t2" style="margin-top:12%"><span class="num">{{performance.newCustomerData.visitToDealPrice}}</span>元</span>
                        </div>
                        <div  class="r_content5">
                            <span class="r_t2" style="margin-top:12%"><span class="num">{{performance.newCustomerData.dealToPrice}}</span>元</span>
                        </div>
                    </div> -->
                    <div class="left_customer" v-if="selected == '整体'">
                        <div>转化周期</div>
                        <div style="margin-top:357%"><span class="num" >{{conversionCycleObj.totalSendCycle}}</span>天</div>
                        <div style="margin-top:70%"><span class="num">{{conversionCycleObj.totalToHospitalCycle}}</span>天</div>
                    </div>
                    <div class="left_customer" v-else-if="selected == '有效'">
                        <div>转化周期</div>
                        <div style="margin-top:357%"><span class="num" >{{conversionCycleObj.effectiveSendCycle}}</span>天</div>
                        <div style="margin-top:70%"><span class="num">{{conversionCycleObj.effectiveToHospitalCycle}}</span>天</div>
                    </div>
                    <div class="left_customer"  v-else-if="selected == '潜在'">
                        <div>转化周期</div>
                        <div style="margin-top:357%"><span class="num" >{{conversionCycleObj.potionelSendCycle}}</span>天</div>
                        <div style="margin-top:70%"><span class="num">{{conversionCycleObj.potionelToHospitalCycle}}</span>天</div>
                    </div>
                    <div class="new_customer">
                        <div class="center_data">
                            <div><span>{{performance.newCustomerData.newCustomerOperationDataDetails[0].name}}</span> <span class="num">{{performance.newCustomerData.newCustomerOperationDataDetails[0].value}}</span> 个</div>
                            <!-- <div class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[1].name}}</span> <span class="num">{{performance.newCustomerData.newCustomerOperationDataDetails[1].value}}</span> 个</div> -->
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[1].name}}</span> <span class="num">{{performance.newCustomerData.newCustomerOperationDataDetails[1].value}}</span> 个</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[2].name}}</span> <span class="num">{{performance.newCustomerData.newCustomerOperationDataDetails[2].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[3].name}}</span> <span class="num">{{performance.newCustomerData.newCustomerOperationDataDetails[3].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[4].name}}</span> <span class="num">{{performance.newCustomerData.newCustomerOperationDataDetails[4].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[5].name}}</span> <span class="num">{{performance.newCustomerData.newCustomerOperationDataDetails[5].value}}</span> 人</div>
                        </div>
                        <div class="right_data">
                            <div class="r_content6">
                                <span class="r_t2">实际值</span>
                                <!-- <span  class="r_t">累计健康值</span> -->
                                <span class="r_t3">健康值</span>
                            </div>
                            <!-- <div  class="r_content">
                                <span class="r_t2">退卡率：<span class="num">{{performance.newCustomerData.refundCardRate}}</span>%</span>
                                <span  class="r_t3"><span class="num">{{performance.newCustomerData.refundCardRateHealthValueThisMonth}}</span>%</span>
                            </div> -->
                            <div  class="r_content">
                                <span class="r_t2" >有效率：<span class="num" :style="{color:performance.newCustomerData.clueEffictiveRate < performance.newCustomerData.clueEffictiveRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.newCustomerData.clueEffictiveRate}}</span>%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.addWeChatRateHealthValueSum}}%</span> -->
                                <span  class="r_t3"><span class="num">{{performance.newCustomerData.clueEffictiveRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content2">
                                <span class="r_t2" >加v率：<span class="num" :style="{color:performance.newCustomerData.addWeChatRate < performance.newCustomerData.addWeChatRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.newCustomerData.addWeChatRate}}</span>%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.addWeChatRateHealthValueSum}}%</span> -->
                                <span  class="r_t3"><span class="num">{{performance.newCustomerData.addWeChatRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content3">
                                <span class="r_t2" style="margin-top:17%">派单率：<span class="num" :style="{color:performance.newCustomerData.sendOrderRate < performance.newCustomerData.sendOrderRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.newCustomerData.sendOrderRate}}</span>%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.sendOrderRateHealthValueSum}}%</span> -->
                                <span  class="r_t3" style="margin-top:17%"><span class="num">{{performance.newCustomerData.sendOrderRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:12%">上门率：<span class="num" :style="{color:performance.newCustomerData.toHospitalRate < performance.newCustomerData.toHospitalRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.newCustomerData.toHospitalRate}}</span>%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.toHospitalRateHealthValueSum}}%</span> -->
                                <span  class="r_t3" style="margin-top:12%"><span class="num">{{performance.newCustomerData.toHospitalRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content5">
                                <span class="r_t2" style="margin-top:14%">成交率：<span class="num" :style="{color:performance.newCustomerData.dealRate < performance.newCustomerData.dealRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.newCustomerData.dealRate}}</span>%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.dealRateHealthValueSum}}%</span> -->
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{performance.newCustomerData.dealRateHealthValueThisMonth}}</span>%</span>
                            </div>
                        </div>
                    </div>
            </Card>
            <Card class="content2">
                    <div class="h3">老客</div>
                    <div class="old_customer">
                        <div class="left_old">
                            <div class="proportion2">2次复购率：<span  class="num">{{performance.oldCustomerData.secondTimeBuyRateProportion}}</span>%</div>
                            <div class="proportion2">3次复购率：<span  class="num">{{performance.oldCustomerData.thirdTimeBuyRateProportion}}</span>%</div>
                            <div class="proportion2">4次复购率：<span  class="num">{{performance.oldCustomerData.fourthTimeBuyRateProportion}}</span>%</div>
                            <div class="proportion2">5次复购率：<span  class="num">{{performance.oldCustomerData.fifthTimeOrMoreBuyRateProportion}}</span>%</div>
                        </div>
                        <div class="center_old">
                            <div class="people">总成交<div><span  class="num">{{performance.oldCustomerData.totalDealPeople}}</span>人</div></div>
                            <div  class="people2">2次复购<div><span  class="num">{{performance.oldCustomerData.secondDealPeople}}</span>人</div></div>
                            <div  class="people3">3次复购<div><span  class="num">{{performance.oldCustomerData.thirdDealPeople}}</span>人</div></div>
                            <div  class="people4">4次复购<div><span  class="num">{{performance.oldCustomerData.fourthDealCustomer}}</span>人</div></div>
                            <div  class="people4">5次复购<div><span  class="num">{{performance.oldCustomerData.fifThOrMoreOrMoreDealCustomer}}</span>人</div></div>
                        </div>
                        <div class="right_old">
                            <!-- <div class="r_text1">2次转化率：<span  class="num">{{performance.oldCustomerData.secondTimeBuyRate}}</span>%</div>
                            <div class="r_text2">3次转化率：<span  class="num">{{performance.oldCustomerData.thirdTimeBuyRate}}</span>%</div>
                            <div  class="r_text3">4次转化率：<span  class="num">{{performance.oldCustomerData.fourthTimeBuyRate}}</span>%</div>
                            <div  class="r_text4">5次及以上转化率：<span  class="num">{{performance.oldCustomerData.fifthTimeOrMoreBuyRate}}</span>%</div> -->
                            <div  class="r_text5">复购率：<span  class="num">{{performance.oldCustomerData.buyRate}}</span>%</div>
                        </div>
                        <div class="right_customer">
                            <div class="r_content6">
                                <span class="r_t2">转化周期</span>
                            </div>
                            <div  class="r_content2" style="margin-top:-32px">
                                <span class="r_t2" ><span class="num">{{performance.oldCustomerData.secondDealCycle}}</span>天</span>
                            </div>
                            <div  class="r_content3">
                                <span class="r_t2" style="margin-top:29%"><span class="num">{{performance.oldCustomerData.thirdDealCycle}}</span>天</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:29%"><span class="num">{{performance.oldCustomerData.fourthDealCycle}}</span>天</span>
                            </div>
                            <div  class="r_content5">
                                <span class="r_t2" style="margin-top:29%"><span class="num">{{performance.oldCustomerData.fifthDealCycle}}</span>天</span>
                            </div>
                        </div>
                    </div>
            </Card>
            
        </div>

  </div>
</template>
<script>
import * as api from "@/api/amiyaAchievement";

export default {
    props:{
        active:String,
        selected4:String,
        params:Object,
        liveAnchorBaseInfos:Array,
        conversionCycleObj:Object

    },
  data() {
    return {
      selected: "整体",
      list: ["整体","有效", "潜在"],
      isFlag:false,
      performance:{}
    };
  },
  methods: {
    selectTab(index, value) {
      this.selected = value;
      // this.list[index].isSelected = !this.list[index].isSelected;
      this.getPerformanceOperationData()
    },
    // 经营看板数据
    getPerformanceOperationData(){
        const data ={
            year:this.$moment(this.params.endDate).format("YYYY")? this.$moment(this.params.endDate).format("YYYY") : null,
            month:Number(this.$moment(this.params.endDate).format("MM")) >= 10 ? this.$moment(this.params.endDate).format("MM") : this.$moment(this.params.endDate).format("MM"),
            // contentPlatFormId:this.active == 'tiktok' ? this.params.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id : this.active == 'vedio' ?  this.params.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id : '',
            isEffectiveCustomerData:this.selected == '整体' ? null : this.selected == '有效' ? true : false,
            contentPlatFormId:'',
            liveAnchorBaseId:this.selected4 == '刀刀' ? this.liveAnchorBaseInfos.find(item=>item.name == '刀刀').id : this.selected4 == '吉娜' ? this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id : this.selected4 == '璐璐' ? this.liveAnchorBaseInfos.find(item=>item.name == '璐璐').id :  ''

        }
        api.performanceOperationData(data).then(res=>{
            if(res.code == 0){
                const {performance} = res.data
                this.performance = performance
                this.isFlag = true
            }
        })
    }
  },
  watch:{
        active(value){
            if(value == 'whole'){
                this.getPerformanceOperationData()
            }
        }
    }
  
  
}

</script>
<style scoped lang="less">
/deep/ .ivu-card-body{
    width: 100%;
    padding-bottom:20px
}
.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 15px 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.tab{
  display: flex;
}
.tab_item {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.active {
  color: #fff;
  border: 1px solid #2f8cf0;
  background: #2f8cf0;
}
.ivu-card-body {
  width: 100% !important;
}
.top{
    display: flex;
    justify-content: space-between;
}
.center{
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow-x: hidden;
}
.content{
   width:100%;
   margin-right: 10px;
//     height:500px;
//     background-image: url(../../../../assets/images/new.png)  ;
//     min-width:200px;
//     background-size: 100% 100%;
//     position: relative;
//     /* display: flex;
//     justify-content: space-between; */
}
.content2{
     width:100%;
     position: relative;
//     height: 500px;
//     background-image: url(../../../../assets/images/old.png) ;
//     background-size: 100% 100%;
//     position: relative;
//     min-width:900px; 
//     margin-left: 10px;
}
.new_customer{
     width:100%;
    height:400px;
    background-image: url(../../../../assets/images/new.png)  ;
    min-width:600px;
    background-size: 100% 100%;
    position: relative;
    margin-top: 30px;
    margin: 50px 0 0 -50px;
}
.old_customer{
     width:100%;
    height: 500px;
    background-image: url(../../../../assets/images/old.png) ;
    background-size: 100% 100%;
    position: relative;
    min-width:600px; 
    margin-left: 10px;
}
.h3{
    font-size: 18px;
    color: #000;
    font-weight: bold;
    text-align: center;
}
.right_data{
    position: absolute;
    right: -6%;
    top:-6%;
}
.left_customer{
    position: absolute;
    left: 10%;
    top:14%;
}
.right_customer{
    position: absolute;
    right: -8%;
    top:18%;
}
.r_content,.r_content2,.r_content3,.r_content4,.r_content5,.r_content6{
    width: 200px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}
.r_content{
    margin-top: 8%;
}
.r_content2{
    margin-top: 15%;
}
.r_content3{
    margin-top: 3%;
}
.r_content4{
    margin-top: 8%;
}
.r_content5{
    margin-top: 6%;
}
.r_content6{
    margin-bottom: 23%;
}

.new_left{
position: absolute
}
.r_t{
    width: 160px;
    /* margin-right: 28%; */
    text-align: center;
}
.r_t2{
    width: 240px;
    /* margin-right: 10%; */
    text-align: center;
    margin-top: 4%;
}

.r_t3{
    width: 160px;
    /* margin-right: 6%; */
    text-align: center;
    margin-top: 4%;
}
.center_data{
    position: absolute;
    top: 8%;
    left: 44%;
}
.c_text{
    margin-top: 33%;
    width: 120px;
}
.num{
    font-size: 16px;
    color: #2f8cf0;
}
.l_dispitch{
    /* width: 100px; */
    margin-top: 20px;
    margin-left: 150px;
}
.left_data{
    position: absolute;
    top: 60%;
    left: 4%;
}

.left_old{
    position: absolute;
    top: 7%;
    left: 16%;
}

.proportion2{
    margin-left: -33%;
    margin-top: 69px;
}

.center_old{
    position: absolute;
    top: 8%;
    left: 50%;
    text-align: center;
}
.people{
    /* width:140px; */
}
.people2{
    margin-top: 105%;
    /* width:100px; */
}
.people3{
    margin-top: 101%;
    /* width:80px; */
}
.people4{
    margin-top: 97%;
}

.right_old{
    position: absolute;
    right: 13%;
    top: 50%;
}
.r_text1{
    margin-top: -33px;
    margin-left: -35px;
}
.r_text2{
    margin-top: 80px;
    margin-left: -35px;
}
.r_text3{
    margin-top: 70px;
    margin-left: -35px;
}
.r_text4{
    margin-left: -15%;
    margin-top: 45%;
    width: 180px;
}
.r_text5{
    // margin-left: 39%;
    // margin-top: -109%;
    // width: 160px;
}
</style>
