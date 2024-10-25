<template>
  <div class="container">
    <div class="title">啊美雅（直播前）数据运营看板</div>
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
    <!-- 卡片 -->
    <div class="card_list">
      <Card class="card_item"> 
        <items :params="params" ref="items" title="个人" />
      </Card>
      <Card class="card_item"> 
        <items :params="params" ref="items2" title="部门" />
      </Card>
    </div>
    <!-- 折线图 -->
    <Card  class="m_b">
        <div class="h3">当月线索&业绩趋势</div>
        <!-- tab切换 -->
        <div class="tab_content">
            <div class="tab">
                <div
                class="tab_item"
                v-for="(item, index) in list"
                :key="index"
                @click="selectTab(index, item)"
                :class="{ active: selected == item}"
                >
                <span>{{ item }}</span>
                </div>
            </div>
        </div>
        <monthLine :totalAchievementAndDateSchedule="beforeLiveClueAndPerformanceBrokenDataObj" />
    </Card>
    <!-- 漏斗图 -->
    <Card  class="m_b">
        <div class="h3">直播前转化漏斗图</div>
        <funnel
        ref="funnel"
        :params="params"
        ></funnel>
    </Card>
    <!-- 派单/上门/成交转化周期 -->
    <Card  class="m_b">
        <div class="card_list">
            <Card class="card_item"> 
                <div class="h3">线索派单周期转化</div>
                <customerBar :beforeLiveTransformCycleData="beforeLiveTransformCycleDataObj.sendCycleData" title="周期"/>
            </Card>
            <Card class="card_item"> 
              <div class="h3">线索上门/成交周期转化</div>
                <customerBar :beforeLiveTransformCycleData="beforeLiveTransformCycleDataObj.toHospitalCycleData" title="周期"/>
            </Card>
        </div>
    </Card>
    <!-- 内容运营线索目标达成率和业绩贡献占比 -->
    <Card  class="m_b">
        <div class="card_list">
            <Card class="card_item"> 
                <div class="h3">线索目标达成率</div>
                <customerBar :beforeLiveTransformCycleData="getBeforeLiveTargetCompleteRateList" title="百分比"/>
            </Card>
            <Card class="card_item"> 
              <div class="h3">业绩贡献占比</div>
                <customerBar :beforeLiveTransformCycleData="getBeforeLivePerformanceRateList" title="百分比"/>
            </Card>
        </div>
    </Card>
    <!-- 部门平台线索占比和新客业绩占比 -->
    <Card  class="m_b">
        <div class="card_list">
            <Card class="card_item"> 
                <div class="m_b m_t">
                  <div class="h3">部门平台线索占比</div>
                  <pieItem :pieData="getBeforeLiveDepartmentContentPlatformClueRateObj.departmentContentPlatformClueRate" title="总线索" :total="getBeforeLiveDepartmentContentPlatformClueRateObj.departmentPerformance"/>
                </div>
                <div class="m_b">
                  <div class="h3">抖音-部门平台线索占比</div>
                  <pieItem :pieData="getBeforeLiveDepartmentContentPlatformClueRateObj.tikTokClueRate" title="总线索" :total="getBeforeLiveDepartmentContentPlatformClueRateObj.tikTokPerformance"/>
                </div>
                <div class="m_b">
                  <div class="h3">视频号-部门平台线索占比</div>
                  <pieItem :pieData="getBeforeLiveDepartmentContentPlatformClueRateObj.wechatVideoClueRate" title="总线索" :total="getBeforeLiveDepartmentContentPlatformClueRateObj.wechatVideoPerformance"/>
                </div>
                <div class="m_b">
                  <div class="h3">小红书-部门平台线索占比</div>
                  <pieItem :pieData="getBeforeLiveDepartmentContentPlatformClueRateObj.xiaohongshuClueRate" title="总线索" :total="getBeforeLiveDepartmentContentPlatformClueRateObj.xiaohongshuPerformance"/>
                </div>
                
            </Card>
            <Card class="card_item">
               <!-- tab切换 -->
              <div class="tab_content position_re">
                  <div class="tab">
                      <div
                      class="tab_item"
                      v-for="(item, index) in list2"
                      :key="index"
                      @click="selectTab2(index, item)"
                      :class="{ active: selected2 == item}"
                      >
                      <span>{{ item }}</span>
                      </div>
                  </div>
              </div>
              <div class="m_b m_t">
                  <div class="h3">部门平台业绩占比</div>
                  <pieItem :pieData="getBeforeLiveDepartmentContentPlatformPerformanceRateObj.departmentContentPlatformPerformanceRate" title="总业绩" :total="getBeforeLiveDepartmentContentPlatformPerformanceRateObj.departmentPerformance"/>
                </div>
                <div class="m_b">
                  <div class="h3">抖音-部门平台业绩占比</div>
                  <pieItem :pieData="getBeforeLiveDepartmentContentPlatformPerformanceRateObj.tikTokPerformanceRate" title="总业绩" :total="getBeforeLiveDepartmentContentPlatformPerformanceRateObj.tikTokPerformance"/>
                </div>
                <div class="m_b">
                  <div class="h3">视频号-部门平台业绩占比</div>
                  <pieItem :pieData="getBeforeLiveDepartmentContentPlatformPerformanceRateObj.wechatVideoPerformanceRate" title="总业绩" :total="getBeforeLiveDepartmentContentPlatformPerformanceRateObj.wechatVideoPerformance"/>
                </div>
                <div class="m_b">
                  <div class="h3">小红书-部门平台业绩占比</div> 
                  <pieItem :pieData="getBeforeLiveDepartmentContentPlatformPerformanceRateObj.xiaohongshuPerformanceRate" title="总业绩" :total="getBeforeLiveDepartmentContentPlatformPerformanceRateObj.xiaohongshuPerformance"/>
                </div>
            </Card>
        </div>
    </Card>
  </div>
</template>
<script>
import * as employeeManageApi from "@/api/employeeManage";
import * as api from "@/api/amiyaOperationsBoard";
import items from "./components/item2.vue"
import monthLine from "./components/monthLine.vue"
import funnel from "./components/funnel.vue"
import customerBar from "./components/customerBar.vue"
import pieItem from "./components/pieItem.vue"
export default {
  components:{
    items,
    monthLine,
    funnel,
    customerBar,
    pieItem
  },
  data() {
    return {
      // 用于漏斗图加载
      isFlag: false,
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
      list: ["个人","部门"],
      selected:'个人',
      list2: ["当月","历史"],
      selected2:'当月',
      //   折线图数据
      beforeLiveClueAndPerformanceBrokenDataObj:{},
      //   转化周期
      beforeLiveTransformCycleDataObj:{},
      // 线索业绩占比
      getBeforeLivePerformanceRateList:[],
      // 线索目标达成率
      getBeforeLiveTargetCompleteRateList:[],
      // 平台线索占比
      getBeforeLiveDepartmentContentPlatformClueRateObj:{},
      // 平台业绩占比
      getBeforeLiveDepartmentContentPlatformPerformanceRateObj:{}
    };

  },
  methods:{
    // 根据职位id获取员工
    getEmployeeByPositionIdAdmin() {
      const data = {
        // （直播前)线上和测试id都是19
        positionId: 19,
      };
      employeeManageApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.params.employee = employee;
          // 是客服但不是管理员获取登录id
          this.params.assistantId = sessionStorage.getItem("isDirector") == "false" && sessionStorage.getItem("isCustomerService") == "true" ? Number(sessionStorage.getItem("employeeId")) : employee[0].id;
        }
      });
    },
    // 获取直播前折线图数据
    getBeforeLiveClueAndPerformanceBrokenDataClick() {
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
        employee:this.selected == '个人' ? true : false,
        department:this.selected == '部门' ? true : false,
      };
      api.getBeforeLiveClueAndPerformanceBrokenData(data).then((res) => {
        if (res.code === 0) {
          this.beforeLiveClueAndPerformanceBrokenDataObj = res.data.data
        }
      });
    },
    // 获取直播前转化周期
    getBeforeLiveTransformCycleDataClick() {
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD")  : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.getBeforeLiveTransformCycleData(data).then((res) => {
        if (res.code === 0) {
             this.beforeLiveTransformCycleDataObj = res.data.data
        }
      });
    },
    // 内容运营业绩贡献占比
    getBeforeLivePerformanceRateClick() {
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.getBeforeLivePerformanceRate(data).then((res) => {
        if (res.code === 0) {
             this.getBeforeLivePerformanceRateList = res.data.data.performanceRate
        }
      });
    },
    // 内容运营目标达成率
    getBeforeLiveTargetCompleteRateClick() {
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.getBeforeLiveTargetCompleteRate(data).then((res) => {
        if (res.code === 0) {
             this.getBeforeLiveTargetCompleteRateList = res.data.data.targetComplete
        }
      });
    },
    // 部门平台线索占比
    getBeforeLiveDepartmentContentPlatformClueRateClick() {
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
      };
      api.getBeforeLiveDepartmentContentPlatformClueRate(data).then((res) => {
        if (res.code === 0) {
             this.getBeforeLiveDepartmentContentPlatformClueRateObj = res.data.data
        }
      });
    },
    //  部门平台业绩占比
    getBeforeLiveDepartmentContentPlatformPerformanceRateClick() {
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId: assistantId,
        current:this.selected2 == '当月' ? true : false,
        history:this.selected2 == '历史' ? true : false,
      };
      api.getBeforeLiveDepartmentContentPlatformPerformanceRate(data).then((res) => {
        if (res.code === 0) {
             this.getBeforeLiveDepartmentContentPlatformPerformanceRateObj = res.data.data
        }
      });
    },
    // 业绩板块折线图切换
    selectTab(index, value) {
      this.selected = value
      this.getBeforeLiveClueAndPerformanceBrokenDataClick()
    },
     // 饼图当月/历史切换
    selectTab2(index, value) {
      this.selected2 = value
      this.getBeforeLiveDepartmentContentPlatformPerformanceRateClick()
    },
    getData(){
        this.$nextTick(()=>{
            this.$refs.items.getBeforeLiveClueAndPerformanceData()
            this.$refs.items2.getBeforeLiveClueAndPerformanceData()
            this.$refs.funnel.getBeforeLiveFilterDataClick()
        })
        this.getBeforeLiveClueAndPerformanceBrokenDataClick()
        this.getBeforeLiveTransformCycleDataClick()
        this.getBeforeLivePerformanceRateClick()
        this.getBeforeLiveTargetCompleteRateClick()
        this.getBeforeLiveDepartmentContentPlatformClueRateClick()
        this.getBeforeLiveDepartmentContentPlatformPerformanceRateClick()
    }
  },
  mounted(){
    this.getEmployeeByPositionIdAdmin()
    setTimeout(()=>{
        this.getData()
    },1000)
  }
};
</script>

<style scoped>
.container {
  background: #fff;
  padding: 0 10px;
  box-sizing: border-box;
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
.h3 {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.card_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.card_item {
  width: 49.5%;
}

.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 15px 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.tab{
  display: flex;
}
.tab{
  text-align: start;
  padding-left: 10px;
}
.tab_item {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.icons {
  font-size: 14px;
  margin-right: 2px;
}
.active {
  color: #fff;
  border: 1px solid #2f8cf0;
  background: #2f8cf0;
}
.m_b{
    margin-bottom: 10px;
}
.m_t{
  margin-top: 10px;
}
.position_re{
  position: absolute;
  top: 0px;
}
</style>
