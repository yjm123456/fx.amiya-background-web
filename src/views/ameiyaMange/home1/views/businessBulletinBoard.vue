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
        <Button type="primary" @click="gethospitalDataRatio">查询</Button>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="item yellow">
          <div class="item_title">本月新客占比</div>
          <div class="item_num">{{hospitalDataRatio.newCustomerRatio + '%'}}</div>
          <div class="item_proportion">上月新客占比环比 
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
            <span v-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
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
            <span v-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
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
            <span v-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
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
            <span v-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalDataRatio.oldCustomerRatioChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalDataRatio.oldCustomerRatioChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
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
      hospitalDataRatio:{},
      month: this.$moment().format("YYYY-MM"),
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
        if (value === "businessBulletinBoard") {
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
  padding: 0 50px;
  box-sizing: border-box;
  margin-bottom: 26px;
  .item {
    width: 550px;
    height: 130px;
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
.date_con{
  text-align: right;
  margin-bottom: 10px;
  padding-right: 73px;
  box-sizing: border-box;
}
</style>
