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
                    <div class="h3">个人</div>
                    <div class="left_customer" >
                        <span class="r_t4">转化周期</span>
                        <div class="r_t4" style="margin-top:310%"><span class="num" >{{performance.employeeData.sendCycle}}</span>天</div>
                        <div class="r_t4" style="margin-top:89%"><span class="num">{{performance.employeeData.hospitalCycle}}</span>天</div>
                    </div>
                    <div class="new_customer">
                        <div class="center_data">
                            <div  class="c_text"><span>{{performance.employeeData.dataList[0].name}}</span> <span class="num">{{performance.employeeData.dataList[0].value}}</span> 个</div>
                            <div  class="c_text"><span>{{performance.employeeData.dataList[1].name}}</span> <span class="num">{{performance.employeeData.dataList[1].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.employeeData.dataList[2].name}}</span> <span class="num">{{performance.employeeData.dataList[2].value}}</span> 单</div>
                            <div  class="c_text"><span>{{performance.employeeData.dataList[3].name}}</span> <span class="num">{{performance.employeeData.dataList[3].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.employeeData.dataList[4].name}}</span> <span class="num">{{performance.employeeData.dataList[4].value}}</span> 人</div>
                        </div>
                        <div class="right_data">
                            <div class="r_content6">
                                <span class="r_t2">实际值</span>
                                <span class="r_t3">当月健康值</span>
                            </div>
                          
                            <div  class="r_content2">
                                <span class="r_t2" >加v率：<span class="num"  :style="{color:performance.employeeData.addWeChatRate < performance.employeeData.addWeChatRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.employeeData.addWeChatRate}}</span>%</span>
                                <span  class="r_t3"><span class="num">{{performance.employeeData.addWeChatRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content3">
                                <span class="r_t2" style="margin-top:14%">派单率：<span class="num" :style="{color:performance.employeeData.sendOrderRate < performance.employeeData.sendOrderRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.employeeData.sendOrderRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{performance.employeeData.sendOrderRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:14%">上门率：<span class="num" :style="{color:performance.employeeData.toHospitalRate < performance.employeeData.toHospitalRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.employeeData.toHospitalRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{performance.employeeData.toHospitalRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:14%">成交率：<span class="num" :style="{color:performance.employeeData.dealRate < performance.employeeData.dealRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.employeeData.dealRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{performance.employeeData.dealRateHealthValueThisMonth}}</span>%</span>
                            </div>
                        </div>
                    </div>
            </Card>
            <Card class="content2">
                    <div class="h3">部门</div>
                    <div class="left_customer" >
                        <span class="r_t4">转化周期</span>
                        <div class="r_t4" style="margin-top:308%"><span class="num" >{{performance.departData.sendCycle}}</span>天</div>
                        <div class="r_t4" style="margin-top:87%"><span class="num">{{performance.departData.hospitalCycle}}</span>天</div>
                    </div>
                    <div class="new_customer">
                        <div class="center_data">
                            <div  class="c_text"><span>{{performance.departData.dataList[0].name}}</span> <span class="num">{{performance.departData.dataList[0].value}}</span> 个</div>
                            <div  class="c_text"><span>{{performance.departData.dataList[1].name}}</span> <span class="num">{{performance.departData.dataList[1].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.departData.dataList[2].name}}</span> <span class="num">{{performance.departData.dataList[2].value}}</span> 单</div>
                            <div  class="c_text"><span>{{performance.departData.dataList[3].name}}</span> <span class="num">{{performance.departData.dataList[3].value}}</span> 人</div>
                            <div  class="c_text"><span>{{performance.departData.dataList[4].name}}</span> <span class="num">{{performance.departData.dataList[4].value}}</span> 人</div>
                        </div>
                        <div class="right_data">
                            <div class="r_content6">
                                <span class="r_t2">实际值</span>
                                <span class="r_t3">当月健康值</span>
                            </div>
                          
                            <div  class="r_content2">
                                <span class="r_t2" >加v率：<span class="num" :style="{color:performance.employeeData.addWeChatRate < performance.employeeData.addWeChatRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.departData.addWeChatRate}}</span>%</span>
                                <span  class="r_t3"><span class="num">{{performance.departData.addWeChatRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content3">
                                <span class="r_t2" style="margin-top:14%">派单率：<span class="num" :style="{color:performance.employeeData.sendOrderRate < performance.employeeData.sendOrderRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.departData.sendOrderRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{performance.departData.sendOrderRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:14%">上门率：<span class="num" :style="{color:performance.employeeData.toHospitalRate < performance.employeeData.toHospitalRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.departData.toHospitalRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{performance.departData.toHospitalRateHealthValueThisMonth}}</span>%</span>
                            </div>
                            <div  class="r_content4">
                                <span class="r_t2" style="margin-top:14%">成交率：<span class="num" :style="{color:performance.employeeData.dealRate < performance.employeeData.dealRateHealthValueThisMonth ? 'red' : '#2f8cf0'}">{{performance.departData.dealRate}}</span>%</span>
                                <span  class="r_t3" style="margin-top:14%"><span class="num">{{performance.departData.dealRateHealthValueThisMonth}}</span>%</span>
                            </div>
                        </div>
                    </div>
            </Card>
            
            
        </div>

  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";

export default {
    props:{
        params:Object,
    },
  data() {
    return {
      selected: "当月",
      list: ["当月","历史"],
      isFlag:false,
      performance:{}
    };
  },
  methods: {
    selectTab(index, value) {
      this.selected = value;
      // this.list[index].isSelected = !this.list[index].isSelected;
      this.getBeforeLiveFilterDataClick()
    },
    // 直播前漏斗图
    getBeforeLiveFilterDataClick(){
        const { startDate, endDate, assistantId } = this.params;
        const data ={
            startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            assistantId: assistantId,
            current:this.selected == '当月' ? true : false,
            history:this.selected == '历史' ? true : false,

        }
        api.getBeforeLiveFilterData(data).then(res=>{
            if(res.code == 0){
                this.performance = res.data.data
                this.isFlag = true
            }
        })
    }
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
    background-image: url(../../../../assets/images/new2.png)  ;
    min-width:600px;
    background-size: 100% 100%;
    position: relative;
    margin-top: 30px;
    margin: 50px 0 0 -50px;
}
.old_customer{
     width:100%;
    height: 500px;
    background-image: url(../../../../assets/images/new2.png) ;
    background-size: 100% 100%;
    position: relative;
    min-width:600px; 
    margin-left: 10px;
}
.h3{
    font-size: 18px;
    // color: #000;
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
    left: 8%;
    top:15%;
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
    margin-top: 12%;
}
.r_content4{
    margin-top: 14%;
}
.r_content5{
    margin-top: 12%;
}
.r_content6{
    margin-bottom: 30%;
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
    margin-top: 47%;
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

