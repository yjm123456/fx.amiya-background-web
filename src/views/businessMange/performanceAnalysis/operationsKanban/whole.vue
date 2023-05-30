<template>
    <div>
        <div class="top">
            <div class="left">
                <Button :type="effectiveType" @click="effectiveClick">有效业绩</Button>
                <Button :type="potentialType" style="margin-left:10px" @click="potentialClick">潜在业绩</Button>
            </div>
            <div class="right">
                <DatePicker
                  type="month"
                  placeholder="请选择年月"
                  style="width: 160px;margin:0 10px"
                  transfer
                  :value="month"
                  v-model="month"
                ></DatePicker>
                <Button type="primary" @click="getPerformanceOperationData">查询</Button>
                <!-- <Button type="primary" style="margin-left:10px">累计（默认）</Button>
                <Button type="primary" style="margin-left:10px">当月</Button> -->
            </div>
         </div>
        
        <div class="center" v-if="isFlag == true">
            <Card class="content">
                <div style="width:100%">
                    <div class="h3">新客业绩</div>
                    <div class="new_customer">
                        <div class="left_data">
                            <div>
                                <div>分诊成交转化率：{{performance.newCustomerData.allocationConsulationToDealRate}}%</div>
                                <div>分诊成交能效：{{performance.newCustomerData.allocationConsulationToDealPrice}}元</div>
                            </div>
                            <div class="l_dispitch">
                                <div>派单成交转化率：{{performance.newCustomerData.sendOrderToDealRate}}%</div>
                                <div>派单成交能效：{{performance.newCustomerData.sendOrderToDealPrice}}元</div>
                            </div>
                        </div>
                        <div class="center_data">
                            <div><span>{{performance.newCustomerData.newCustomerOperationDataDetails[0].name}}</span> <span>{{performance.newCustomerData.newCustomerOperationDataDetails[0].value}}</span> 张</div>
                            <div class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[1].name}}</span> <span>{{performance.newCustomerData.newCustomerOperationDataDetails[1].value}}</span> 张</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[2].name}}</span> <span>{{performance.newCustomerData.newCustomerOperationDataDetails[2].value}}</span> 张</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[3].name}}</span> <span>{{performance.newCustomerData.newCustomerOperationDataDetails[3].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[4].name}}</span> <span>{{performance.newCustomerData.newCustomerOperationDataDetails[4].value}}</span> 单</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[5].name}}</span> <span>{{performance.newCustomerData.newCustomerOperationDataDetails[5].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.newCustomerData.newCustomerOperationDataDetails[6].name}}</span> <span>{{performance.newCustomerData.newCustomerOperationDataDetails[6].value}}</span> 人</div>

                        </div>
                        <div class="right_data">
                            <div class="r_content6">
                                <span class="r_t2">实际值</span>
                                <!-- <span  class="r_t">累计健康值</span> -->
                                <span class="r_t3">当月健康值</span>
                            </div>
                            <div  class="r_content">
                                <span class="r_t2">退卡率：{{performance.newCustomerData.refundCardRate}}%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.refundCardRateHealthValueSum}}%</span> -->
                                <span  class="r_t3">{{performance.newCustomerData.refundCardRateHealthValueThisMonth}}%</span>
                            </div>
                            <div  class="r_content2">
                                <span class="r_t2">加v率：{{performance.newCustomerData.addWeChatRate}}%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.addWeChatRateHealthValueSum}}%</span> -->
                                <span  class="r_t3">{{performance.newCustomerData.addWeChatRateHealthValueThisMonth}}%</span>
                            </div>
                            <div  class="r_content3">
                                <span class="r_t2" style="margin-top:10%">派单率：{{performance.newCustomerData.sendOrderRate}}%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.sendOrderRateHealthValueSum}}%</span> -->
                                <span  class="r_t3" style="margin-top:10%">{{performance.newCustomerData.sendOrderRateHealthValueThisMonth}}%</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:10%">上门率：{{performance.newCustomerData.toHospitalRate}}%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.toHospitalRateHealthValueSum}}%</span> -->
                                <span  class="r_t3" style="margin-top:10%">{{performance.newCustomerData.toHospitalRateHealthValueThisMonth}}%</span>
                            </div>
                            <div  class="r_content5">
                                <span class="r_t2" style="margin-top:10%">成交率：{{performance.newCustomerData.dealRate}}%</span>
                                <!-- <span  class="r_t">{{performance.newCustomerData.dealRateHealthValueSum}}%</span> -->
                                <span  class="r_t3" style="margin-top:10%">{{performance.newCustomerData.dealRateHealthValueThisMonth}}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
             <Card class="content">
                <div style="width:100%">
                    <div class="h3">老客业绩</div>
                    <div class="old_customer">
                        <div class="left_old">
                            <div class="proportion">2次复购占比：{{performance.oldCustomerData.secondTimeBuyRateProportion}}%</div>
                            <div class="proportion2">3次复购占比：{{performance.oldCustomerData.thirdTimeBuyRateProportion}}%</div>
                            <div class="proportion3">4次及以上复购占比：{{performance.oldCustomerData.fourthTimeOrMoreBuyRateProportion}}%</div>
                        </div>
                        <div class="center_old">
                            <div class="people">总成交<div>{{performance.oldCustomerData.totalDealPeople}}人</div></div>
                            <div  class="people2">2次复购<div>{{performance.oldCustomerData.secondDealPeople}}人</div></div>
                            <div  class="people3">3次复购<div>{{performance.oldCustomerData.thirdDealPeople}}人</div></div>
                            <div  class="people4">4次及以上复购<div>{{performance.oldCustomerData.fourthOrMoreDealPeople}}人</div></div>
                        </div>
                        <div class="right_old">
                            <div>2次转化率：{{performance.oldCustomerData.secondTimeBuyRate}}%</div>
                            <div class="r_text2">3次转化率：{{performance.oldCustomerData.thirdTimeBuyRate}}%</div>
                            <div  class="r_text3">4次及以上转化率：{{performance.oldCustomerData.fourthTimeOrMoreBuyRate}}%</div>
                            <div  class="r_text4">复购率：{{performance.oldCustomerData.buyRate}}%</div>
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
        
        
    },
    data(){
        return{
            month: this.$moment().format("YYYY-MM"),
            // 是否为有效客资
            isEffectiveCustomerData:true,
            // 按钮切换
            effectiveType: "primary",
            potentialType: "default",
            // 
            performance:{},
            isFlag:false,
        }
    },
    methods:{
        // 有效业绩
        effectiveClick(){
            this.effectiveType = "primary";
            this.potentialType = "default";
            this.isEffectiveCustomerData = true
            this.getPerformanceOperationData()
        },
        // 潜在业绩
        potentialClick(){
            this.potentialType = "primary";
            this.effectiveType = "default";
            this.isEffectiveCustomerData = false
            this.getPerformanceOperationData()

        },
        // 经营看板数据
        getPerformanceOperationData(){
            let str = String(this.$moment(this.month).format("MM"));
            let month = str.substr(str.length - 1, 1);
            if (!this.month) {
                this.$Message.warning("请选择日期");
                return;
            }
            const data ={
                year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
                month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
                contentPlatFormId:'',
                isEffectiveCustomerData:this.isEffectiveCustomerData
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
    created(){
        this.getPerformanceOperationData()
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

<style scoped>
.ivu-card-body {
  width: 100% !important;
}
.top{
    display: flex;
    justify-content: space-between;
}
.center{
    width: 100%;
    /* display: flex;
    justify-content: space-between; */
}
.content{
    width: 100%;
    margin-top: 10px;
}
.new_customer{
    width:100%;
    height: 450px;
    background-image: url(../../../../assets/images/new_customer.png)  ;
    min-width:900px;
    background-size: 100% 100%;
    position: relative;
}
.old_customer{
    width:90%;
    height: 300px;
    /* margin: 30px auto 0; */
    background-image: url(../../../../assets/images/old_customer.png) ;
    background-size: 100% 100%;
    position: relative;
    min-width:900px;
}
.h3{
    font-size: 18px;
    color: #000;
    font-weight: bold;
}
.right_data{
    position: absolute;
    right: 0%;
    top:20%;
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
    margin-top: 8%;
}
.r_content3{
    margin-top: 8%;
}
.r_content4{
    margin-top: 8%;
}
.r_content5{
    margin-top: 8%;
}
.r_content6{
    margin-bottom: 10%;
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
    top: 10%;
    left: 44%;
}
.c_text{
    margin-top: 31%;
    width: 120px;
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
    top: 28%;
    left: 20%;
}
.proportion{
    margin-left: 60px;
}
.proportion2{
    margin-left: -12%;
    margin-top: 15px;
}
.proportion3{
    margin-left: -104%;
    margin-top: 15px;
}
.center_old{
    position: absolute;
    top: 9%;
    left: 44%;
    text-align: center;
}
.people{
    /* width:140px; */
}
.people2{
    margin-top: 30%;
    /* width:100px; */
}
.people3{
    margin-top: 30%;
    /* width:80px; */
}
.people4{
    margin-top: 30%;
    /* width:80px; */
}
.right_old{
    position: absolute;
    right: 0%;
    top: 24%;
}
.r_text2{
    margin-top: 47px;
}
.r_text3{
    margin-top: 47px;
}
.r_text4{
    margin-left: 95%;
    margin-top: -62%;
    width: 160px;
}
</style>