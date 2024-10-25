<template>
  <div class="center_content">
    <div class="title">{{title}}</div>
    <div class="center_item">
      <div class="item1">
        <div class="h2">直播前线索 <span v-if="title == '部门'" > <span @click="detailModel = true"><i class="iconfont icon-qiehuan-xue qiehuan f_s"></i><span class="f_s">详情</span> </span></span></div>
        <div class="item">
          <div class="item_left">
            <div>
                <span>当日：<span class="b_w">{{ employeeData.currentDayCustomerCount ? title == '个人' ? employeeData.currentDayCustomerCount : departmentData.currentDayCustomerCount : 0}}</span></span>
            </div>
          </div>
          <div class="item_right">
            <div>
              <span>累计：<span  class="b_w">{{departmentData.customerCount ? title == '部门' ? departmentData.customerCount : employeeData.customerCount : 0}}</span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="item2">
        <div class="h2"> 医美业绩</div>
        <div class="item">
          <div class="item_left">
            <div>
                <span>当日：<span  class="b_w">{{employeeData.currentDayPerformance ? title == '个人' ? employeeData.currentDayPerformance : departmentData.currentDayPerformance : 0}}</span></span>
            </div>
          </div>
          <div class="item_right">
            <div>
              <span>累计：<span  class="b_w">{{departmentData.performance ? title == '部门' ? departmentData.performance : employeeData.performance : 0}}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 详情 -->
    <detail :detailModel.sync ="detailModel" :params="params"/> 
  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
import detail from "./detail.vue"
export default {
  components:{
    detail
  },
  props: {
    params: Object,
    title:String
  },
  data() {
    return {
      // 部门
      departmentData: {},
      //个人
      employeeData: {},
      // 详情model
      detailModel:false,
    };
  },
  methods: {
    // 获取直播前客资和业绩数据
    getBeforeLiveClueAndPerformanceData() {
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.getBeforeLiveClueAndPerformanceData(data).then((res) => {
        if (res.code === 0) {
          const {departmentData,employeeData} = res.data.data
          this.departmentData = departmentData
          this.employeeData = employeeData
        }
      });
    },
  
  },
};
</script>

<style scoped>
.center_content {
  width: 100%;
  margin-bottom: 10px;
}
.center_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* padding: 0 10px;
  box-sizing: border-box; */
  text-align: center;
  color: #fff;
}
.item1,
.item2,
.item3,
.item4 {
  flex: 1;
  margin: 10px;
  padding: 10px 0;
  box-sizing: border-box;
  border-radius: 10px;
}
.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: start;
  /* font-weight: bold; */
}
.item1 {
  background-image: linear-gradient(to right, #8ed6e5, #0aabbd);
}
.item2 {
  background: linear-gradient(to right, #aeb5f3, #7381fb);
}
.item3 {
  background: linear-gradient(to right, #d7a3fa, #bb5df9);
}
.item4 {
  background: linear-gradient(to right, #f69a56, #f37f51);
}
.h1{
  font-size: 24px;
  font-weight: bold;
}
.h2 {
  font-size: 16px;
  margin-bottom: 10px;
}
.h3 {
  font-size: 16px;
  text-align: center;
}
.h5 {
  font-size: 14px;
  font-weight: bold;
}
.red {
  color: green;
  margin-right: 4px;
}
.green {
  color: red;
  margin-right: 4px;
}
.f_w {
  font-weight: bold;
}
.title{
  font-size: 14px;
  font-weight: bold;
  padding-left: 15px;
  color: #000;
}
.info{
  position: relative;
  top: 2px;
}
.b_w{
  font-weight: bold;
  font-size: 15px;
}
.f_s{
  font-size: 12px;
  position: relative;
  top: -2px;
  margin-left: 4px;
  cursor: pointer;
  color: #2f8cf0;
  font-weight: bold;
}
.qihuan{
  cursor: pointer;
}
</style>
