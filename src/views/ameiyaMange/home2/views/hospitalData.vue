<template>
  <div class="content">
    <Card style="width:100%">
      <div class="list">
        <div class="item blue">
          <div class="item_title">本月派单量</div>
          <div class="item_num">{{hospitalData.thisMonthSendOrderCount}}</div>
          <div class="item_proportion">
            上月环比  
            <span v-if="Math.sign(hospitalData.sendOrderCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.sendOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-dingdan icon" style="font-size:40px"></i>
        </div>
        <div class="item green">
          <div class="item_title">本月成交量</div>
          <div class="item_num">{{hospitalData.thisMonthDealCount}}</div>
          <div class="item_proportion">
            上月环比 
            <span v-if="Math.sign(hospitalData.dealCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.dealCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.dealCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.dealCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
        <i-circle
          :percent="hospitalData.thisMonthSendOrderDealRatio"
          :size="120"
          stroke-linecap="square"
          stroke-color="#2263b2"
          trail-color="#eaeef2"
        >
          <span style="font-size:16px;font-weight:bold">{{hospitalData.thisMonthSendOrderDealRatio}}%</span>
          <div style="margin-top:8px;font-size:12px">本月派单成交量</div>
        </i-circle>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="item yellow">
          <div class="item_title">全年派单量</div>
          <div class="item_num">{{hospitalData.yearSendOrderCount}}</div>
          <div class="item_proportion">总派单 {{hospitalData.totalSendOrderCount}}</div>
          <i class="iconfont icon-dingdan icon" style="font-size:40px"></i>
        </div>
        <div class="item orange">
          <div class="item_title">全年成交量</div>
          <div class="item_num">{{hospitalData.yearDealCount}}</div>
          <div class="item_proportion">总成交量 {{hospitalData.totalDealCount}}</div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
        <i-circle
          :percent="hospitalData.yearSendOrderDealRatio"
          :size="120"
          stroke-linecap="square"
          stroke-color="#2263b2"
          trail-color="#eaeef2"
        >
          <span style="font-size:16px;font-weight:bold">{{hospitalData.yearSendOrderDealRatio}}%</span>
          <div style="margin-top:8px;font-size:12px">全年派单成交量</div>
        </i-circle>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
export default {

  props: ["activeName"],
  components: {},
  data() {
    return {
      // 机构数据
      hospitalData:{

      }
    };
  },
  methods: {
    // 机构数据
    getHospitalIndexDataHospitalData(){
      api.getHospitalIndexDataHospitalData().then((res) => {
        if(res.code === 0){
          this.hospitalData = res.data.hospitalData
        }
      })
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "hospitalData") {
          this.getHospitalIndexDataHospitalData()
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
  justify-content: space-around;
  padding: 0 30px 0 12px;
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
    background: #2263b2;
  }
  .green {
    background: #59b47d;
    margin: 0 20px 0 0px;
  }
  .yellow {
    background: #ffb142;
  }
  .orange {
    background: #ff705e;
    margin: 0 20px 0 0px;
  }
}
.red{
  color: #fff;
  margin-right: 4px;
  margin-left: 7px;
}
.green{
  color: #fff;
  margin-right: 4px;
  margin-left: 7px;
}
</style>
