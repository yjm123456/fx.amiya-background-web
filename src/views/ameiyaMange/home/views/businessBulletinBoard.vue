<template>
  <div class="content">
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
        <Button type="primary" @click="getOperationData">查询</Button>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="item blue">
          <div class="item_title">新客上门量</div>
          <div class="item_num">{{operateData.newCustomerToHospitalCount}}</div>
          <div class="item_proportion">环比 
            <span v-if="Math.sign(operateData.newCustomerToHospitalChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.newCustomerToHospitalChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.newCustomerToHospitalChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.newCustomerToHospitalChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">同比
            <span v-if="Math.sign(operateData.newCustomerToHospitalYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.newCustomerToHospitalYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.newCustomerToHospitalYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.newCustomerToHospitalYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-yonghuguanli2 icon" style="font-size:40px"></i>
        </div>
        <div class="item green1">
          <div class="item_title">新客成交量</div>
          <div class="item_num">{{operateData.newCustomerDealCount }}</div>
          <div class="item_proportion">环比 
            <span v-if="Math.sign(operateData.newCustomerDealChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.newCustomerDealChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.newCustomerDealChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.newCustomerDealChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">同比
            <span v-if="Math.sign(operateData.newCustomerDealYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.newCustomerDealYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.newCustomerDealYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.newCustomerDealYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-yonghudenglu icon2" style="font-size:45px"></i>
        </div>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="item green2">
          <div class="item_title">老客上门量</div>
          <div class="item_num">{{operateData.oldCustomerToHospitalCount }}</div>
          <div class="item_proportion">环比 
            <span v-if="Math.sign(operateData.oldCustomerToHospitalChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.oldCustomerToHospitalChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.oldCustomerToHospitalChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.oldCustomerToHospitalChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">同比
            <span v-if="Math.sign(operateData.oldCustomerToHospitalYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.oldCustomerToHospitalYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.oldCustomerToHospitalYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.oldCustomerToHospitalYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-yonghu icon" style="font-size:40px"></i>
        </div>
        <div class="item yellow">
          <div class="item_title">老客成交量</div>
          <div class="item_num">{{operateData.oldCustomerDealCount}}</div>
          <div class="item_proportion">环比 
            <span v-if="Math.sign(operateData.oldCustomerDealChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.oldCustomerDealChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.oldCustomerDealChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.oldCustomerDealChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">同比
            <span v-if="Math.sign(operateData.oldCustomerDealYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.oldCustomerDealYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.oldCustomerDealYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.oldCustomerDealYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-yonghushouquan icon2" style="font-size:43px"></i>
        </div>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="item orange">
          <div class="item_title">新客上门率</div>
          <div class="item_num">{{operateData.newCustomerToHospitalRatio + '%'}}</div>
          <div class="item_proportion">环比 
            <span v-if="Math.sign(operateData.newCustomerToHospitalRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.newCustomerToHospitalRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.newCustomerToHospitalRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.newCustomerToHospitalRatioChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">同比
            <span v-if="Math.sign(operateData.newCustomerToHospitalRatioYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.newCustomerToHospitalRatioYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.newCustomerToHospitalRatioYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.newCustomerToHospitalRatioYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">健康值
            <span>{{operateData.newCustomerToHospitalRatioHealthValue}}%</span>
          </div>
          <i class="iconfont icon-yonghu_tudi icon" style="font-size:38px"></i>
        </div>
        <div class="item orange2">
          <div class="item_title">新客成交率</div>
          <div class="item_num">{{operateData.newCustomerDealRation + '%'}}</div>
          
          <div class="item_proportion">环比 
            <span v-if="Math.sign(operateData.newCustomerDealRationChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.newCustomerDealRationChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.newCustomerDealRationChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.newCustomerDealRationChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">同比
            <span v-if="Math.sign(operateData.newCustomerDealRationYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.newCustomerDealRationYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.newCustomerDealRationYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.newCustomerDealRationYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">健康值
            <span>{{operateData.newCustomerDealRationHealthValue}}%</span>
          </div>
          <i class="iconfont icon-yonghuguanli icon2" style="font-size:45px"></i>
        </div>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="item orange3">
          <div class="item_title">老客复购率</div>
          <div class="item_num">{{operateData.oldCustomerRepurchaseRatio + '%'}}</div>
          <div class="item_proportion">环比 
            <span v-if="Math.sign(operateData.oldCustomerRepurchaseRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.oldCustomerRepurchaseRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.oldCustomerRepurchaseRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.oldCustomerRepurchaseRatioChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">同比
            <span v-if="Math.sign(operateData.oldCustomerRepurchaseRatioYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.oldCustomerRepurchaseRatioYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.oldCustomerRepurchaseRatioYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.oldCustomerRepurchaseRatioYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">健康值
            <span>{{operateData.oldCustomerRepurchaseRatioHealthValue}}%</span>
          </div>
          <i class="iconfont icon-tianjiayonghu icon" style="font-size:40px"></i>
        </div>
        <div class="item orange4">
          <div class="item_title">老客成交率</div>
          <div class="item_num">{{operateData.oldCustomerDealRation + '%'}}</div>
          <div class="item_proportion">环比 
            <span v-if="Math.sign(operateData.oldCustomerDealRationChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.oldCustomerDealRationChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.oldCustomerDealRationChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.oldCustomerDealRationChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">同比
            <span v-if="Math.sign(operateData.oldCustomerDealRationYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(operateData.oldCustomerDealRationYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(operateData.oldCustomerDealRationYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(operateData.oldCustomerDealRationYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">健康值
           <span>{{operateData.oldCustomerDealRationHealthValue}}%</span>
          </div>
          <i class="iconfont icon-yonghuguanli1 icon2" style="font-size:45px"></i>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalBoard";

export default {
  props: ["activeName"],
  components: {},
  data() {
    return {
      operateData:{},
      month: this.$moment().format("YYYY-MM"),
    };
  },
  methods: {
     // 运营看板
    getOperationData(){
      const data ={
        year:this.$moment(this.month).format("YYYY"),
        month:this.$moment(this.month).format("MM"),
      }
      api.getOperationData(data).then((res) => {
        if(res.code === 0){
          this.operateData = res.data.operateData
        }
      })
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "businessBulletinBoard") {
          this.getOperationData()
          this.month = this.$moment().format("YYYY-MM")
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
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
  padding: 0 50px;
  box-sizing: border-box;
  margin-bottom: 26px;
  .item {
    width: 550px;
    height: 145px;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    color: #fff;
    border-radius: 6px;
    margin: 0 2%;
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
  .orange3 {
    background: #b8b53d;
  }
  .orange4 {
    background: #d39057;
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
  padding-right: 73px;
  box-sizing: border-box;
}
</style>
