<template>
  <div class="contents">
    <Card style="width:100%">
      <div class="date_con">
        <DatePicker
          type="month"
          placeholder="请选择年月"
          style="width: 160px;margin:0 10px"
          transfer
          :value="month"
          v-model="month"
        ></DatePicker>
        <Button type="primary" @click="handlerChange">查询</Button>
        <Button
          :type="accumulateType"
          style="margin-left: 30px"
          @click="accumulate()"
          >累计</Button
      >
      <Button
          :type="monthsType"
          style="margin-left: 10px"
          @click="months()"
          >当月</Button
      >
      </div>
      <div class="list">
        <div class="item blue">
          <div class="item_title">派单量</div>
          <div class="item_num">{{orderData.sendOrderCount}}</div>
          <div class="item_proportion">
            环比  
            <span v-if="Math.sign(orderData.sendOrderCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.sendOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(orderData.sendOrderCountYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.sendOrderCountYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.sendOrderCountYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.sendOrderCountYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-CombinedShape icon" style="font-size:40px"></i>
        </div>
        <div class="item green1">
          <div class="item_title">已处理订单数量</div>
          <div class="item_num">{{orderData.processedOrderCount}}</div>
          <div class="item_proportion">
            环比 
            <span v-if="Math.sign(orderData.processedOrderChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.processedOrderChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.processedOrderChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.processedOrderChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(orderData.processedOrderYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.processedOrderYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.processedOrderYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.processedOrderYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-complete icon2" style="font-size:50px"></i>
        </div>
        <div class="item green2">
          <div class="item_title">未处理订单数量</div>
          <div class="item_num">{{orderData.untreatedOrderCount}}</div>
          <div class="item_proportion">
            环比 
            <span v-if="Math.sign(orderData.untreatedChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.untreatedChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.untreatedChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.untreatedChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(orderData.untreatedYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.untreatedYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.untreatedYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.untreatedYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-iconfontzhizuobiaozhun0262 icon3" style="font-size:50px"></i>
        </div>
      </div>

      <div class="list" style="margin-top:10px">
        <div class="item yellow">
          <div class="item_title">派单未上门订单数量</div>
          <div class="item_num">{{orderData.sendOrderNotToHospitalCount}}</div>
          <div class="item_proportion">
            环比  
            <span v-if="Math.sign(orderData.sendOrderNotToHospitalChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.sendOrderNotToHospitalChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.sendOrderNotToHospitalChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.sendOrderNotToHospitalChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(orderData.sendOrderNotToHospitalYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.sendOrderNotToHospitalYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.sendOrderNotToHospitalYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.sendOrderNotToHospitalYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-daipaidan icon3" style="font-size:40px"></i>
        </div>
        <div class="item orange">
          <div class="item_title">上门未成交订单数量</div>
          <div class="item_num">{{orderData.toHospitalNoDealCount}}</div>
          <div class="item_proportion">
            环比 
            <span v-if="Math.sign(orderData.toHospitalNoDealChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.toHospitalNoDealChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.toHospitalNoDealChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.toHospitalNoDealChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(orderData.toHospitalNoDealYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.toHospitalNoDealYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.toHospitalNoDealYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.toHospitalNoDealYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-yuyuedingdan icon2" style="font-size:50px"></i>
        </div>
        <div class="item orange2">
          <div class="item_title">成交未复购订单数量</div>
          <div class="item_num">{{orderData.dealNoRepurchaseCount}}</div>
          <div class="item_proportion">
            环比 
            <span v-if="Math.sign(orderData.dealNoRepurchaseChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.dealNoRepurchaseChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.dealNoRepurchaseChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.dealNoRepurchaseChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(orderData.dealNoRepurchaseYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(orderData.dealNoRepurchaseYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(orderData.dealNoRepurchaseYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(orderData.dealNoRepurchaseYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-wodedingdan icon3" style="font-size:50px"></i>
        </div>
      </div>
    </Card>
    <Card style="margin:10px 0"> 
       <div class="top">
          <div class="title">今日未处理任务</div>
          <div class="more" @click="moreClick">更多></div>
        </div>
      <tables :todayNoRepeatedSendOrder="todayNoRepeatedSendOrder"></tables>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalBoard";
import * as hospitalApi from "@/api/hospitalManage";

import tables from "../components/table.vue"
export default {

  props: ["activeName"],
  components: {
    tables,
  },
  data() {
    return {
      // 订单看板数据
      orderData:{},
      month: this.$moment().format("YYYY-MM"),
      // 今日未处理任务
      todayNoRepeatedSendOrder:[],
      type:1,
      accumulateType:'default',
      monthsType:'primary',
    };
  },
  methods: {
    // 累计
    accumulate(){
      this.accumulateType = 'primary'
      this.monthsType = 'default'
      this.type = 0
      this.getOrderData()
      
    },
    // 当月
    months(){
        this.monthsType = 'primary'
        this.accumulateType = 'default'
        this.type = 1
        this.getOrderData()
    },
    // 获取所有接口数据
    handlerChange(){
      this.getOrderData()
      
    },
    moreClick(){
        this.$router.push("/hospitalSendOrderList");
      },
    // 订单看板数据
    getOrderData(){
      const data = {
        year:this.$moment(this.month).format("YYYY"),
        month:this.$moment(this.month).format("MM"),
        type:this.type
      }
      api.getOrderData(data).then((res) => {
        if(res.code === 0){
          this.orderData = res.data.orderData
        }
      })
    },
    // 获取医院获取今日未处理任务
    getTodayNotRepeatedSendOrders() {
        hospitalApi.getTodayNotRepeatedSendOrder().then((res) => {
            if (res.code === 0) {
                this.todayNoRepeatedSendOrder = res.data.todayNoRepeatedSendOrder;
            }
        });
    },
  },
  created(){
    this.getTodayNotRepeatedSendOrders()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "orderBulletinBoard") {
          this.handlerChange()
          this.month = this.$moment().format("YYYY-MM")
          this.type = 1
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.contents{
  display: flex;
  flex-direction: column;
}
.top{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.title{
  font-size: 16px;
  font-weight: bold;
}
.more{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.left {
  width: 75%;
  margin-right: 10px;
}
.right {
  width: 24%;
}
.list {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  padding: 0 15px;
  box-sizing: border-box;
  .item {
    width: 450px;
    height: 130px;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    color: #fff;
    border-radius: 6px;
    .icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .icon2 {
      position: absolute;
      right: 10px;
      bottom: 0px;
    }
    .icon3 {
      position: absolute;
      right: 10px;
      bottom: 8px;
      font-size: 40px !important;
    }
    .item_title {
      font-size: 18px;
    }
    .item_num {
      font-size: 24px;
      margin: 5px 0;
    }
    .item_proportion {
      font-size: 12px;
    }
  }
  .blue {
    background: #4584a8;
  }
  .green1 {
    background: #c69ad5;
    margin: 0 20px;
  }
  .green2{
    background: #59a7b5;
  }
  .yellow {
    background: #ffb142;
  }
  .orange {
    background: #d7825d;
    margin: 0 20px;
  }
  .orange2 {
    background: #7e789c;
  }
}
.red{
  color: #0dfc01;
  margin-right: 4px;
  margin-left: 7px;
}
.green{
  color: #fc0113;
  margin-right: 4px;
  margin-left: 7px;
}
.date_con{
  text-align: right;
  margin-bottom: 10px;
  padding-right: 18px;
}
</style>
