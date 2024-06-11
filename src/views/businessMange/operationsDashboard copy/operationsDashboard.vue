<template>
  <div class="container">
    <div class="content_top">
      <!-- <jadeJueDiagram :brokenLine="brokenLine"/> -->
      <Card class="left">
          <div class="left_title">当日获客情况</div>
          <jadeJueDiagram :customerData="dayCustomerData"/> 
          <div style="margin-top:-120px">
            <div class="left_title">当月获客情况</div>
            <jadeJueDiagram :customerData="monthCustomerData"/> 
          </div>
      </Card>
      <Card class="center">
        <div class="c_title">
          <div class="c_item"></div>
          <div class="c_item">
            <span class="left_title">啊美雅运营看板</span>
            <span class="tab_name" @click="amyOperationsTableModel = true"><i class="iconfont icon-qiehuan-xue qiehuan"></i> 表格数据</span>
          </div>
          <div class="c_item2"><DatePicker type="date" placeholder="Select date" style="width: 140px;cursor: pointer;" v-model="selectedDate" :clearable="false" @on-change="getData"/></div>
        </div>
        <div class="center_content">
          <div class="center_item">
            <div class="item1">
              <div class="item_title">时间指标</div>
              <div class="time" >{{this.$moment(selectedDate).format("YYYY-MM-DD")}}</div>
            </div>
            <div class="item2">
              <div class="item_title">时间进度</div>
              <div class="time">{{totalAchievementAndDateSchedule.dateSchedule}}%</div>
            </div>
            <div class="item3">
              <div class="item_title">总业绩</div>
              <div class="time">{{totalAchievementAndDateSchedule.totalAchievement}}</div>
            </div>
          </div>
          <div>
            <div class="h4">业绩趋势</div>
            <monthLine :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule"/>
          </div>
        </div>
      </Card>
      <Card class="right">
        <span class="left_title">当月客户运营情况</span>
        <customerBar :customerBarData="customerBarData" style="margin-bottom:60px"/>
        <span class="left_title h3">指标转化</span>
        <funnelPlot :funnelPlotData="funnelPlotData"/>
      </Card>
    </div>
    <div class="content_bottom">
      <Card class="b_left">
        <div class="assistant">
            <assistantItem  :employeeDatas="employeeDatas"  />
        </div>
        <div class="assistant_echarts">
          <div class="assistant_customer">
            <span class="left_title">助理获客情况</span>
            <assistantCustomerAcquisition :employeeDistributeConsulationNumAndAddWechats="assistantCustomerData"/> 
          </div>
          <div class="assistant_customer">
            <span class="left_title">助理客户运营情况</span>
            <assistantOperations :getEmployeeCustomerAnalizes="assistantCustomerData"/>
          </div>
        </div>
      </Card>
      <Card class="b_right">
        <div>
          <span class="left_title m_t">业绩贡献占比</span>
          <performanceProportions :getEmployeePerformanceRankings="assistantCustomerData"/>
        </div>
      </Card>
    </div>
    <!-- 表格 -->
    <amyOperationsTable :amyOperationsTableModel.sync="amyOperationsTableModel" :selectedDate="this.$moment(selectedDate).format('YYYY-MM-DD')" :dateSchedule="totalAchievementAndDateSchedule.dateSchedule"/>
  </div>
</template>
<script>
import jadeJueDiagram from "./components/jadeJueDiagram.vue";
import monthLine from "./components/monthLine.vue";
import customerBar from "./components/customerBar.vue";
import funnelPlot from "./components/funnelPlot.vue";
import assistantItem from "./components/assistantItem.vue";
import assistantCustomerAcquisition from "./components/assistantCustomerAcquisition.vue";
import assistantOperations from "./components/assistantOperations.vue";
import performanceProportions from "./components/performanceProportion.vue";
import amyOperationsTable from "./components/amyOperationsTable.vue";
import * as api from "@/api/amiyaOperationsBoard";

export default {
  components: {
    jadeJueDiagram,
    monthLine,
    customerBar,
    funnelPlot,
    assistantItem,
    assistantCustomerAcquisition,
    assistantOperations,
    performanceProportions,
    amyOperationsTable
  },
  data() {
    return {
      
      // 日期
      selectedDate: this.$moment().format("YYYY-MM-DD"),
      // 当月获客情况数据
      monthCustomerData: {},
      // 当日获客情况数据
      dayCustomerData: {},
      // 时间进度、总业绩和折线图数据
      totalAchievementAndDateSchedule: {},
      // 客户运营情况数据
      customerBarData:{},
      // 指标转化
      funnelPlotData:[],
      // 助理业绩数据
      assistantCustomerData:{},
      // 
      employeeDatas:[],
      // 切换表格数据model
      amyOperationsTableModel:false
    };
  },
  methods: {
    getData(){
      this.getMonthCustomerData();
      this.getDayCustomerData();
      this.getTotalAchievementAndDateSchedule();
      this.getCustomerAnalizeDatas();
      this.getCustomerIndexTransformationDatas();
      this.getEmployeePerformanceAnalizeDatas()
    },
    // 获取当月获客情况数据
    getMonthCustomerData() {
        if (!this.selectedDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM") + '-01',
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getCustomerData(data).then((res) => {
        if (res.code == 0) {
          this.monthCustomerData = res.data.data;
        }
      });
    },
    // 获取当日获客情况数据
    getDayCustomerData() {
        if (!this.selectedDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getCustomerData(data).then((res) => {
        if (res.code == 0) {
          this.dayCustomerData = res.data.data;
        }
      });
    },
    // 获取时间进度和总业绩
    getTotalAchievementAndDateSchedule() {
        if (!this.selectedDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM") + '-01',
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getTotalAchievementAndDateSchedule(data).then((res) => {
        if (res.code == 0) {
          this.totalAchievementAndDateSchedule = res.data.data;
        }
      });
    },
    // 获取客户运营情况
    getCustomerAnalizeDatas() {
        if (!this.selectedDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM") + '-01',
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getCustomerAnalizeData(data).then((res) => {
        if (res.code == 0) {
          this.customerBarData = res.data.data
        }
      });
    },
    // 获取指标转化
    getCustomerIndexTransformationDatas() {
        if (!this.selectedDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM") + '-01',
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getCustomerIndexTransformationData(data).then((res) => {
        if (res.code == 0) {
          this.funnelPlotData = res.data.data
        }
      });
    },
    // 获取助理业绩分析数据
    getEmployeePerformanceAnalizeDatas() {
        if (!this.selectedDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(this.selectedDate).format("YYYY-MM") + '-01',
        endDate: this.$moment(this.selectedDate).format("YYYY-MM-DD"),
      };
      api.getEmployeePerformanceAnalizeData(data).then((res) => {
        if (res.code == 0) {
         this.assistantCustomerData = res.data.data
         let list  = res.data.data.employeeDatas ?  res.data.data.employeeDatas.slice(0, 4) : []
        this.employeeDatas =  list.map((item,index)=>{
          if(index == 0){
            return{
              completeRate:item.completeRate,
              employeeName:item.employeeName,
              performance:item.performance,
              background:'linear-gradient(to right,#b1b8f3, #6f7dfc)'
            }
          }else if (index==1){
            return{
              completeRate:item.completeRate,
              employeeName:item.employeeName,
              performance:item.performance,
              background:'linear-gradient(to right,#92c4fd, #3d92f3)'
            }
          }else if (index==2){
            return{
              completeRate:item.completeRate,
              employeeName:item.employeeName,
              performance:item.performance,
              background:'linear-gradient(to right,#d9a7fa, #ba5afa)'
            }
          }else if (index==3){
            return{
              completeRate:item.completeRate,
              employeeName:item.employeeName,
              performance:item.performance,
              background:'linear-gradient(to right,#f8a2f1, #fa5aed)'
            }
          }
         })
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="less" scoped>
/* 修改iView日期选择器下拉框的背景颜色 */
/deep/
.ivu-date-picker-dropdown {
  background-color: red;
}
.content_top{
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.left{
  width: 20%;
  text-align: center;
  border-radius: 5px;
}
.right{
  width: 24%;
}
.left{
  height: 525px;
}
.left_title{
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.center{
  width: 54%;
  border-radius: 5px;
}
.tab_name{
  font-size: 12px;
  color: dodgerblue;
  margin-left: 10px;
  display: flex;
  align-items: center;
  
  
}
.c_title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.qiehuan{
  font-size: 20px;
  margin-right: 2px;
}
.center_content{

}
.center_item{
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: center;
}
.item1,.item2,.item3{
  flex:1;
  margin:10px;
  padding: 20px 0;
  box-sizing: border-box;
  border-radius: 10px;
}
.item1{
  background-image:   linear-gradient(to right,#b1b8f3, #6f7dfc);
  
}
.item2{
  background: linear-gradient(to right,#92c4fd, #3d92f3);
}
.item3{
  background:  linear-gradient(to right,#d9a7fa, #ba5afa);
}
.item_title{
  font-size: 18px;
  margin-bottom: 6px;
  color: #fff;
}
.time{
  color: #fff;
}
.date_content{
  position: relative;
}
.c_item{
  flex:1;
  text-align: center;
  display: flex;
}
.c_item2{
  text-align: end;
  margin-right: 20px;
}
.h4{
  font-size: 16px;
  font-weight: bold;
  padding-left: 20px;
  margin-top: 20px;
}
.content_bottom{
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.b_left{
  width: 75%;
  border-radius: 5px;
}
.b_right{
  width: 24%;
  border-radius: 5px;
   text-align: center;
   padding-top: 40px;
   box-sizing: border-box;
}
.assistant{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
// .assistant div{
//   width: 100%;
//   text-align: center;
//   color: #fff;
//   margin: 0 auto;
// }
.assistant_customer{
  width: 48%;
}
.assistant_echarts{
  display: flex;
  height: 450px;
  text-align: center;
  margin-top: 40px;
}

</style>