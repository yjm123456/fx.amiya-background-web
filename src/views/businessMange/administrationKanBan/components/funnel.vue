<template>
   
    <div class="center" v-if="isFlag == true">
            <Card class="content">
                    <div class="h3">当前组</div>
                    <div class="new_customer">
                        <div class="center_data">
                            <div  class="c_text"><span>{{adminCustomerFilterDataObj.groupData.dataList[0].name}}</span> <span class="num">{{adminCustomerFilterDataObj.groupData.dataList[0].value}}</span> 个</div>
                            <div  class="c_text"><span>{{adminCustomerFilterDataObj.groupData.dataList[1].name}}</span> <span class="num">{{adminCustomerFilterDataObj.groupData.dataList[1].value}}</span> 人</div>
                            <div  class="c_text"><span>{{adminCustomerFilterDataObj.groupData.dataList[2].name}}</span> <span class="num">{{adminCustomerFilterDataObj.groupData.dataList[2].value}}</span> 单</div>
                            <div  class="c_text"><span>{{adminCustomerFilterDataObj.groupData.dataList[3].name}}</span> <span class="num">{{adminCustomerFilterDataObj.groupData.dataList[3].value}}</span> 人</div>
                        </div>
                        <div class="right_data">
                            <div class="r_content6">
                                <span class="r_t2">实际值</span>
                                <span class="r_t3">当月健康值</span>
                            </div>
                          
                            <div  class="r_content2">
                                <span class="r_t2" >加v率：<span class="num">{{adminCustomerFilterDataObj.groupData.addWeChatRate}}</span>%</span>
                                <span  class="r_t3"><span class="num">{{adminCustomerFilterDataObj.groupData.addWeChatRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content3">
                                <span class="r_t2" style="margin-top:14%">派单率：<span class="num">{{adminCustomerFilterDataObj.groupData.sendOrderRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{adminCustomerFilterDataObj.groupData.sendOrderRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:14%">上门率：<span class="num">{{adminCustomerFilterDataObj.groupData.toHospitalRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{adminCustomerFilterDataObj.groupData.toHospitalRateHealthValueThisMonth}}</span>%</span>
                            </div>
                        </div>
                    </div>
            </Card>
            <Card class="content2">
                    <div class="h3">个人加v</div>
                    <div class="new_customer">
                        <div class="center_data">
                            <div  class="c_text"><span>{{adminCustomerFilterDataObj.addwechatData.dataList[0].name}}</span> <span class="num">{{adminCustomerFilterDataObj.addwechatData.dataList[0].value}}</span> 个</div>
                            <div  class="c_text"><span>{{adminCustomerFilterDataObj.addwechatData.dataList[1].name}}</span> <span class="num">{{adminCustomerFilterDataObj.addwechatData.dataList[1].value}}</span> 人</div>
                            <div  class="c_text"><span>{{adminCustomerFilterDataObj.addwechatData.dataList[2].name}}</span> <span class="num">{{adminCustomerFilterDataObj.addwechatData.dataList[2].value}}</span> 单</div>
                            <div  class="c_text"><span>{{adminCustomerFilterDataObj.addwechatData.dataList[3].name}}</span> <span class="num">{{adminCustomerFilterDataObj.addwechatData.dataList[3].value}}</span> 人</div>
                        </div>
                        <div class="right_data">
                            <div class="r_content6">
                                <span class="r_t2">实际值</span>
                                <span class="r_t3">当月健康值</span>
                            </div>
                          
                            <div  class="r_content2">
                                <span class="r_t2" >加v率：<span class="num">{{adminCustomerFilterDataObj.addwechatData.addWeChatRate}}</span>%</span>
                                <span  class="r_t3"><span class="num">{{adminCustomerFilterDataObj.addwechatData.addWeChatRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content3">
                                <span class="r_t2" style="margin-top:14%">派单率：<span class="num">{{adminCustomerFilterDataObj.addwechatData.sendOrderRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{adminCustomerFilterDataObj.addwechatData.sendOrderRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:14%">上门率：<span class="num">{{adminCustomerFilterDataObj.addwechatData.toHospitalRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{adminCustomerFilterDataObj.addwechatData.toHospitalRateHealthValueThisMonth}}</span>%</span>
                            </div>
                        </div>
                    </div>
            </Card>
            
            
        </div>

</template>
<script>
import * as api from "@/api/amiyaAchievement";

export default {
    props:{
        adminCustomerFilterDataObj:Object,
        isFlag:Boolean

    },
  data() {
    return {
     
    };
  },
  methods: {
    
  },
  watch:{
      
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
}
.content{
   width:100%;
   margin: 10px 10px 0 0;
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
     margin-top: 10px;

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
    background-image: url(../../../../assets/images/new3.png)  ;
    min-width:600px;
    background-size: 100% 100%;
    position: relative;
    margin-top: 30px;
    margin: 50px 0 0 -50px;
}
.old_customer{
     width:100%;
    height: 500px;
    background-image: url(../../../../assets/images/new3.png) ;
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
    left: -3%;
    top:12%;
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
    margin-top: 6%;
}
.r_content3{
    margin-top: 26%;
}
.r_content4{
    margin-top: 24%;
}
.r_content5{
    margin-top: 12%;
}
.r_content6{
    margin-bottom: 37%;
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
    top: -7%;
    left: 45%;
}
.c_text{
    margin-top: 63%;
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
    left: 48%;
    text-align: center;
}
.people{
    /* width:140px; */
}
.people2{
    margin-top: 54%;
    /* width:100px; */
}
.people3{
    margin-top: 57%;
    /* width:80px; */
}
.people4{
    margin-top: 50%;
}

.right_old{
    position: absolute;
    right: 0%;
    top: 24%;
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
    margin-left: 39%;
    margin-top: -109%;
    width: 160px;
}
</style>
