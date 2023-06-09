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
          <div class="item_title">总业绩</div>
          <div class="item_num">{{dealPerformance.totalPerformance}}</div>
          <div class="item_proportion">
            环比  
            <span v-if="Math.sign(dealPerformance.totalPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(dealPerformance.totalPerformanceChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(dealPerformance.totalPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(dealPerformance.totalPerformanceChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(dealPerformance.totalPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(dealPerformance.totalPerformanceYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(dealPerformance.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(dealPerformance.totalPerformanceYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-yejifenxi icon" style="font-size:40px"></i>
        </div>
        <div class="item green1">
          <div class="item_title">新客业绩</div>
          <div class="item_num">{{dealPerformance.newCustomerPerformance}}</div>
          <div class="item_proportion">
            环比 
            <span v-if="Math.sign(dealPerformance.newCustomerPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(dealPerformance.newCustomerPerformanceChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(dealPerformance.newCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(dealPerformance.newCustomerPerformanceChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(dealPerformance.newCustomerPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(dealPerformance.newCustomerPerformanceYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(dealPerformance.newCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(dealPerformance.newCustomerPerformanceYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-jixiaokaohejieguo icon2" style="font-size:45px"></i>
        </div>
        <div class="item green2">
          <div class="item_title">老客业绩</div>
          <div class="item_num">{{dealPerformance.oldCustomerPerformance}}</div>
          <div class="item_proportion">
            环比 
            <span v-if="Math.sign(dealPerformance.oldCustomerPerformanceChainRatio)== 1"> <span  class="red">增长</span>{{ Math.abs(dealPerformance.oldCustomerPerformanceChainRatio) + '%'}}</span>
            <span v-else-if="Math.sign(dealPerformance.oldCustomerPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(dealPerformance.oldCustomerPerformanceChainRatio) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <div class="item_proportion">
            同比  
            <span v-if="Math.sign(dealPerformance.oldCustomerPerformanceYearOnYear)== 1"> <span  class="red">增长</span>{{ Math.abs(dealPerformance.oldCustomerPerformanceYearOnYear) + '%'}}</span>
            <span v-else-if="Math.sign(dealPerformance.oldCustomerPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(dealPerformance.oldCustomerPerformanceYearOnYear) + '%'}}</span>
            <span v-else>0%</span>
          </div>
          <i class="iconfont icon-jixiaokaohebumenpingfen icon2" style="font-size:45px"></i>
        </div>
      </div>
    </Card>
    <Card style="margin:10px 0"> 
      <div class="top">
          <div class="title">科室看板</div>
        </div>
      <rankTable :departmentRankList="departmentRankList"></rankTable>
    </Card>
    <Card style="margin:10px 0"> 
        <div class="top">
          <div class="title">邀约看板</div>
        </div>
      <consultantRankTable :consultantRankList="consultantRankList"></consultantRankTable>
    </Card>
    <Card style="margin:10px 0"> 
        <div class="top">
          <div class="title">接诊看板</div>
        </div>
      <resevieTable :rankList="rankList"></resevieTable>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalBoard";
import rankTable from "../components/rankTable.vue"
import consultantRankTable from "../components/consultantRankTable.vue"
import resevieTable from "../components/resevieTable.vue"
export default {

  props: ["activeName"],
  components: {
    rankTable,
    consultantRankTable,
    resevieTable
  },
  data() {
    return {
      // 机构总业绩数据
      dealPerformance:{},
      // 科室数据
      departmentRankList:[],
      // 邀约数据
      consultantRankList:[],
      // 接诊数据
      rankList:[],

      month: this.$moment().format("YYYY-MM"),
      type:0,
      accumulateType:'primary',
      monthsType:'default',
    };
  },
  methods: {
    // 调用所有接口
    handlerChange(){
        this.getDealPerformance()
        this.getDepartmentRankList()
        this.getConsultantRankList()
        this.getSceneConsultantRankList()
    },
    // 累计
    accumulate(){
      this.accumulateType = 'primary'
      this.monthsType = 'default'
      this.type = 0
      this.getDepartmentRankList()
      this.getConsultantRankList()
      this.getSceneConsultantRankList()
      
    },
    // 当月
    months(){
        this.monthsType = 'primary'
        this.accumulateType = 'default'
        this.type = 1
        this.getDepartmentRankList()
        this.getConsultantRankList()
        this.getSceneConsultantRankList()
    },
    
    // 总业绩数据
    getDealPerformance(){
      const data = {
        year:this.$moment(this.month).format("YYYY"),
        month:this.$moment(this.month).format("MM"),
      }
      api.getDealPerformance(data).then((res) => {
        if(res.code === 0){
          this.dealPerformance = res.data.dealPerformance
        }
      })
    },

    // 科室数据
    getDepartmentRankList(){
      const data = {
        year:this.$moment(this.month).format("YYYY"),
        month:this.$moment(this.month).format("MM"),
        type:this.type
      }
      api.getDepartmentRankList(data).then((res) => {
        if(res.code === 0){
          this.departmentRankList = res.data.rankList
        }
      })
    },

    // 邀约数据
    getConsultantRankList(){
      const data = {
        year:this.$moment(this.month).format("YYYY"),
        month:this.$moment(this.month).format("MM"),
        type:this.type
      }
      api.getConsultantRankList(data).then((res) => {
        if(res.code === 0){
          this.consultantRankList = res.data.rankList
        }
      })
    },

    // 接诊数据
    getSceneConsultantRankList(){
      const data = {
        year:this.$moment(this.month).format("YYYY"),
        month:this.$moment(this.month).format("MM"),
        type:this.type
      }
      api.getSceneConsultantRankList(data).then((res) => {
        if(res.code === 0){
          this.rankList = res.data.rankList
        }
      })
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "dealBulletinBoard") {
          this.handlerChange()
          this.month = this.$moment().format("YYYY-MM")
          this.type = 0
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
  height: 750px;
  overflow-y: scroll;
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
      bottom: 6px;
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
