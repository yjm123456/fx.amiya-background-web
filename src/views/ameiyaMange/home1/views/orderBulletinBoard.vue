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
        <Button type="primary" @click="getHospitalIndexDataHospitalData">查询</Button>
      </div>
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
          <div class="item_proportion">
            上月环比  
            <span v-if="Math.sign(hospitalData.sendOrderCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.sendOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-dingdan icon" style="font-size:40px"></i>
        </div>
        <div class="item green1">
          <div class="item_title">本月成交量</div>
          <div class="item_num">{{hospitalData.thisMonthDealCount}}</div>
          <div class="item_proportion">
            上月环比 
            <span v-if="Math.sign(hospitalData.dealCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.dealCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.dealCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.dealCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            上月环比  
            <span v-if="Math.sign(hospitalData.sendOrderCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.sendOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
        <div class="item green2">
          <div class="item_title">本月成交量</div>
          <div class="item_num">{{hospitalData.thisMonthDealCount}}</div>
          <div class="item_proportion">
            上月环比 
            <span v-if="Math.sign(hospitalData.dealCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.dealCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.dealCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.dealCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            上月环比  
            <span v-if="Math.sign(hospitalData.sendOrderCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.sendOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="item yellow">
          <div class="item_title">全年派单量</div>
          <div class="item_num">{{hospitalData.yearSendOrderCount}}</div>
          <div class="item_proportion">总派单 {{hospitalData.totalSendOrderCount}}</div>
          <div class="item_proportion">
            上月环比  
            <span v-if="Math.sign(hospitalData.sendOrderCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.sendOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-dingdan icon" style="font-size:40px"></i>
        </div>
        <div class="item orange">
          <div class="item_title">全年成交量</div>
          <div class="item_num">{{hospitalData.yearDealCount}}</div>
          <div class="item_proportion">总成交量 {{hospitalData.totalDealCount}}</div>
          <div class="item_proportion">
            上月环比  
            <span v-if="Math.sign(hospitalData.sendOrderCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.sendOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
        <div class="item orange2">
          <div class="item_title">全年成交量</div>
          <div class="item_num">{{hospitalData.yearDealCount}}</div>
          <div class="item_proportion">
            上月环比  
            <span v-if="Math.sign(hospitalData.sendOrderCountChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(hospitalData.sendOrderCountChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(hospitalData.sendOrderCountChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">总成交量 {{hospitalData.totalDealCount}}</div>
          <i class="iconfont icon-qushi icon2" style="font-size:50px"></i>
        </div>
      </div>
    </Card>
    <Card style="margin:10px 0"> 
       <div class="top">
          <div class="title">今日未处理任务</div>
          <div class="more" @click="moreClick">更多></div>
        </div>
      <tables></tables>
    </Card>
    <!-- <Card>
      <datas :dataParams="dataParams"></datas> 
    </Card> -->
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
import tables from "../components/table.vue"
import datas from "../components/data.vue";
export default {

  props: ["activeName"],
  components: {
    datas,
    tables,
  },
  data() {
    return {
      // 机构数据
      hospitalData:{

      },
      month: this.$moment().format("YYYY-MM"),
    };
  },
  methods: {
    
    moreClick(){
        this.$router.push("/hospitalSendOrderList");
      },
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
        if (value === "orderBulletinBoard") {
          this.getHospitalIndexDataHospitalData()
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
  .green1 {
    background: #59b47d;
    margin: 0 20px;
  }
  .green2{
    background: #59a7b5;
  }
  .yellow {
    background: #ffb142;
  }
  .orange {
    background: #ff705e;
    margin: 0 20px;
  }
  .orange2 {
    background: #9859b5;
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
  padding-right: 18px;
}
</style>
