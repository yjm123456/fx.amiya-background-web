<template>
  <div class="content">
    <Card style="width:100%">
      <div class="list">
        <div class="item blue">
          <div class="item_title">本月上门率</div>
          <div class="item_num">{{hospitalDataRatio.toHospitalRatio + '%'}}</div>
          <div class="item_proportion">上月上门率环比 
            <!-- {{hospitalDataRatio.toHospitalRatioChainRatio}} -->
            <span v-if="Math.sign(hospitalDataRatio.toHospitalRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.toHospitalRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.toHospitalRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.toHospitalRatioChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-dingdan icon" style="font-size:40px"></i>
        </div>
        <div class="item green">
          <div class="item_title">本月新客成交率</div>
          <div class="item_num">{{hospitalDataRatio.newCustomerDealRatio + '%'}}</div>
          <div class="item_proportion">上月新客成交率环比 
            <!-- {{hospitalDataRatio.newCustomerDealRatioChainRatio}} -->
            <span v-if="Math.sign(hospitalDataRatio.newCustomerDealRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.newCustomerDealRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.newCustomerDealRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.newCustomerDealRatioChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
        <div class="item skyblue">
          <div class="item_title">本月老客成交率</div>
          <div class="item_num">{{hospitalDataRatio.oldCustomerDealRatio + '%'}}</div>
          <div class="item_proportion">上月老客成交率环比 
            <!-- {{hospitalDataRatio.oldCustomerDealRatioChainRatio}} -->
            <span v-if="Math.sign(hospitalDataRatio.oldCustomerDealRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.oldCustomerDealRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.oldCustomerDealRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.oldCustomerDealRatioChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="item yellow">
          <div class="item_title">本月新客占比</div>
          <div class="item_num">{{hospitalDataRatio.newCustomerRatio + '%'}}</div>
          <div class="item_proportion">上月新客占比环比 
            <!-- {{hospitalDataRatio.newCustomerRatioChainRatio}} -->
            <span v-if="Math.sign(hospitalDataRatio.newCustomerRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.newCustomerRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.newCustomerRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.newCustomerRatioChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-dingdan icon" style="font-size:40px"></i>
        </div>
        <div class="item orange">
          <div class="item_title">本月老客占比</div>
          <div class="item_num">{{hospitalDataRatio.oldCustomerRatio + '%'}}</div>
          <div class="item_proportion">上月老客占比环比 
            <!-- {{hospitalDataRatio.oldCustomerRatioChainRatio}} -->
            <span v-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
        <div class="item ">
         </div> 
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
      hospitalDataRatio:{}
    };
  },
  methods: {
     // 数据比例
    gethospitalDataRatio(){
      api.gethospitalDataRatio().then((res) => {
        if(res.code === 0){
          this.hospitalDataRatio = res.data.hospitalDataRatio
        }
      })
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "dataProportion") {
          this.gethospitalDataRatio()
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
  padding: 0 30px;
  box-sizing: border-box;
  .item {
    width: 400px;
    height: 130px;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    color: #fff;
    border-radius: 6px;
    margin: 0 1%;
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
  }
  .yellow {
    background: #ffb142;
  }
  .orange {
    background: #ff705e;
  }
  .skyblue {
    background: skyblue;
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
