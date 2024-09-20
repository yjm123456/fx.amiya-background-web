<template>
  <Card>
    <div class="title">啊美雅（行政客服）数据运营看板</div>
    <!-- 时间进度及筛选 -->
    <div class="time">
      <span>
        <span class="completeRateSize">时间进度：</span>
        <Progress
          :percent="completeRate > 100 ? 100 : completeRate"
          hide-info
          style="width:180px;"
          stroke-color="dodgerblue"
          :stroke-width="13"
          border
        >
        </Progress>
        <span class="completeRateSize"> {{ completeRate }}%</span>
      </span>
      <DatePicker
        type="date"
        placeholder="请选择开始时间"
        style="width: 160px;margin-left:30px"
        transfer
        :value="params.startDate"
        v-model="params.startDate"
      ></DatePicker>
      <DatePicker
        type="date"
        placeholder="请选择结束时间"
        style="width: 160px;margin:0 10px"
        transfer
        :value="params.endDate"
        v-model="params.endDate"
      ></DatePicker>
      <Select
        v-model="params.assistantId"
        placeholder="请选择助理"
        filterable
        style="width:180px;margin-right:10px;text-align: start;"
        :disabled="isDirector == 'false' && isCustomerService == 'true'"
      >
        <Option
          v-for="item in params.employee"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Button type="primary" @click="getData">查询</Button>
    </div>
    <Card style="margin-top:10px">
      <items ref="items" :params="params" title="部门"/>
      <items ref="items2" :params="params" title="个人"/>
    </Card>
    <Card style="margin-top:10px">
      <div class="h3">部门线索趋势</div>
      <monthLine :params="params" :adminCustomerServiceCustomerTypeBrokenLineDataObj="adminCustomerServiceCustomerTypeBrokenLineDataObj"/>
    </Card>
    <Card style="margin-top:10px">
      <div class="h3">部门&个人-线索转化漏斗图</div>
      <funnel :params="params" :adminCustomerFilterDataObj="adminCustomerFilterDataObj" :isFlag="isFlag"/>
    </Card>
    <!-- 饼图 -->
    <Card style="margin-top:10px">
      <div class="h3">分诊量&加v率</div>
      <div  class="list h3">
        <Card class="item">
          <div class="h2">分诊量</div>
          <pieItem :pieData="adminCustomerAnalysisDataObj.distributeConsulationDataList" title="分诊量"/>
        </Card>
        <Card  class="item">
          <div class="h2">加v率</div>
          <pieItem :pieData="adminCustomerAnalysisDataObj.distributeConsulationAddWechatDataList" title="加v率"/>
        </Card>
      </div>
      <div  class="list h3">
        <Card class="item">
          <div class="h2">分诊量</div>
          <pieItem :pieData="adminCustomerAnalysisDataObj.effAndPotDataList" title="分诊量"/>
        </Card>
        <Card  class="item">
          <div class="h2">加v率</div>
          <pieItem :pieData="adminCustomerAnalysisDataObj.effAndPotAddWechatDataList" title="加v率"/>
        </Card>
      </div>
    </Card>
    <!-- 柱形图 -->
    <Card style="margin-top:10px">
      <div class="h3">分诊量&加v率</div>
      <div  class="list h3">
        <Card class="item">
          <div class="por"><span class="h2">分诊量</span> <span @click="detailModel = true;title='分诊量'"><i class="iconfont icon-qiehuan-xue qiehuan"></i><span>详情</span></span></div>
          <barItem :barItemData="adminCustomerAssistantDisAndAddVDataObj.assistantDistributeData" title="分诊量"/>
        </Card>
        <Card  class="item">
          <div class="por"><span class="h2">加v率</span> <span @click="detailModel = true;title='加v率'"><i class="iconfont icon-qiehuan-xue qiehuan"></i><span>详情</span></span></div>
          <barItem :barItemData="adminCustomerAssistantDisAndAddVDataObj.assistantAddWechatData" title="加v率"/>
        </Card>
      </div>
    </Card>
    <!-- 详情 -->
    <barDetail :detailModel.sync="detailModel" :detailData="this.title == '分诊量' ? adminCustomerAssistantDisAndAddVDataObj.assistantDistributeDataDetail : this.title == '加v率' ? adminCustomerAssistantDisAndAddVDataObj.assistantAddWechatDataDetail : []" :title="title"/>
  </Card>
</template>
<script>
import * as employeeManageApi from "@/api/employeeManage";
import * as api from "@/api/amiyaOperationsBoard";
import items from "./components/item2.vue"
import monthLine from "./components/monthLine.vue"
import funnel from "./components/funnel.vue"
import pieItem from "./components/pieItem.vue"
import barItem from "./components/barItem.vue"
import barDetail from "./components/barDetail.vue"
export default {
  components:{
    items,
    monthLine,
    funnel,
    pieItem,
    barItem,
    barDetail
  },
  data() {
    return {
      title:'',
      // 详情model
      detailModel:false,
      // 用于漏斗图加载
      isFlag:false,
      // 时间进度
      completeRate: 0,
      params: {
        // 当年
        // startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 助理
        employee: [],
        assistantId: "",
      },
      // 是否为客服
      isCustomerService: sessionStorage.getItem("isCustomerService"),
      // 是否为管理员
      isDirector: sessionStorage.getItem("isDirector"),
      // 折线图数据
      adminCustomerServiceCustomerTypeBrokenLineDataObj:{},
      // 漏斗图
      adminCustomerFilterDataObj:{},
      // 饼图数据
      adminCustomerAnalysisDataObj:{},
      // 柱形图数据
      adminCustomerAssistantDisAndAddVDataObj:{}
    };
  },
  methods: {
    getData() {
      this.getTimeSpanClick()
      this.getadminCustomerServiceCustomerTypeBrokenLineData()
      this.getadminCustomerFilterData()
      this.getadminCustomerAnalysisData()
      this.getadminCustomerAssistantDisAndAddVData()
      this.$nextTick(()=>{
        this.$refs.items.getadminCustomerServiceCustomerTypeData()
        this.$refs.items2.getadminCustomerServiceCustomerTypeAddWechatData()
      })
    },
    //   获取时间进度
    getTimeSpanClick() {
      const data = { 
        startDate:null,
        endDate:this.$moment(this.params.endDate).format("YYYY-MM-DD"),
        keyWord:''
      }
      api.getTimeSpan(data).then((res) => {
        if (res.code === 0) {
          // const { contentPalteForms } = res.data;
          this.completeRate = res.data.data;
        }
      });
    },
    // 根据职位id获取员工
    getEmployeeByPositionIdAdmin() {
      const data = {
        // （行政客服)线上id 30 测试30
        positionId: 30,
      };
      employeeManageApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.params.employee = employee;
          // 是客服但不是管理员获取登录id
          this.params.assistantId =
            sessionStorage.getItem("isDirector") == "false" &&
            sessionStorage.getItem("isCustomerService") == "true" ? Number(sessionStorage.getItem("employeeId")) : employee[0].id;
        }
      });
    },
    // 折线图数据
    getadminCustomerServiceCustomerTypeBrokenLineData(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.adminCustomerServiceCustomerTypeBrokenLineData(data).then((res) => {
        if (res.code === 0) {
          this.adminCustomerServiceCustomerTypeBrokenLineDataObj = res.data.data
        }
      })
    },
    // 漏斗图数据
    getadminCustomerFilterData(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.adminCustomerFilterData(data).then(res=>{
        if(res.code == 0){
          this.adminCustomerFilterDataObj = res.data.data
          this.isFlag = true
        }
      })
    },
    // 饼图数据
    getadminCustomerAnalysisData(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.adminCustomerAnalysisData(data).then(res=>{
        if(res.code == 0){
          this.adminCustomerAnalysisDataObj = res.data.data
        }
      })
    },
    // 行政客服分诊加v率柱形图
    getadminCustomerAssistantDisAndAddVData(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.adminCustomerAssistantDisAndAddVData(data).then(res=>{
        if(res.code == 0){
          this.adminCustomerAssistantDisAndAddVDataObj = res.data.data
        }
      })
    },
  },
  created() {
    this.getEmployeeByPositionIdAdmin();
     setTimeout(()=>{
        this.getData();
    },1000)
  },
};
</script>
<style scoped lang="less">
.completeRateSize{
  font-weight: bold;
  font-size: 14px;
  margin-left: 5px;
}
/* 添加边框样式 */
/deep/ .ivu-progress-inner {
  border: 3px solid dodgerblue;
  border-radius: 10px;
}
.title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}
.time {
  text-align: end;
}
.h3{
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.list{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.item{
  width: 49%;
  position: relative;
}
.h2{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
.qiehuan{
  font-size: 14px;
  margin-right: 2px;
  color: rgb(21, 142, 241);
}
.por{
  cursor: pointer;
}
</style>
