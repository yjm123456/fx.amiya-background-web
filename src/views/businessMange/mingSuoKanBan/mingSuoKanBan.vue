<template>
  <div>
    <Card>
      <div class="content_title">
        
        <div class="h2">啊美雅美妍运营看板</div>
      </div>
      <div class="content">
        <div class="left">
          <!-- tab切换 -->
          <div class="tab_content">
            <div class="tab">
              <div
                class="tab_item"
                v-for="(item, index) in list2"
                :key="index"
                @click="selectTab2(index, item)"
                :class="{ active: selected2 == item }"
              >
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
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
              placeholder="请选择医生"
              filterable
              style="width:180px;margin-right:10px;text-align: start;"
          >
              <Option
              v-for="item in doctorList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
              >
          </Select>
          <Button type="primary" @click="getData">查询</Button>
        </div>
      </div>
      <div v-if="selected2 == '图表'">
        <Card class="m_b ">
          <item2 ref="item2" :params="params"  :completeRate="completeRate" :mingSuoObj="mingSuoObj"/>
        </Card>
        <Card class="m_b ">
          <div class="h3">当月线索&业绩趋势</div>
          <monthLine :mingSuoObj="mingSuoObj" />
        </Card>
        <!-- 漏斗图 -->
        <Card  class="m_b">
          <div class="h3">新老客转化周期漏斗</div>
          <funnel
              ref="whole"
              :params="params"
              :selected2="selected2"
              :cycleDataObj="cycleDataObj"
          ></funnel>
        </Card>
        <Card  class="m_b">
          <div class=" card_list">
            <Card class="card_item"> 
                <div class="h3">医美IP登记派单周期</div>
                <customerBar :liveStreamingData="cycleDataObj.sendCycleData" title="周期"/>
            </Card>
            <Card class="card_item"> 
            <div class="h3">医美IP登记上门/成交周期</div>
                <customerBar :liveStreamingData="cycleDataObj.toHospitalCycleData" title="周期"/>
            </Card>
          </div>
        </Card>
        <Card  class="m_b">
          <div class=" card_list">
            <Card class="card_item"> 
                <div class="h3">医生线索目标完成率</div>
                <customerBar :liveStreamingData="clueTargetData" />
            </Card>
            <Card class="card_item"> 
            <div class="h3">医生业绩目标完成率</div>
                <customerBar :liveStreamingData="performanceTargetData" title="医生"/>
            </Card>
          </div>
        </Card>
        <Card  class="m_b">
          <!-- tab切换 -->
          <!-- <div class="tab_content">
            <div class="tab">
              <div
                class="tab_item"
                v-for="(item, index) in list"
                :key="index"
                @click="selectTab(index, item)"
                :class="{ active: selected == item }"
              >
                <span>{{ item }}</span>
              </div>
            </div>
          </div> -->
          <div class=" card_list">
            <Card class="card_item"> 
                <div class="h3">助理业绩目标完成率</div>
                <customerBar :liveStreamingData="assiatantTargetCompleteAndPerformanceRateDataObj.targetCompleteData" title="医生"/>
            </Card>
            <Card class="card_item"> 
            <div class="h3">助理业绩贡献占比</div>
                <customerBar :liveStreamingData="assiatantTargetCompleteAndPerformanceRateDataObj.performanceRateData" title="医生"/>
            </Card>
          </div>
          <!-- 机构线索分析和机构业绩分析 -->
          <Card class="m_b">
            <!-- <div class="h3">机构--线索&业绩</div> -->
            <!-- 平台切换 -->
            <div class="tab2" >
              <div
                class="tab_item2"
                v-for="(item, index) in platformList2"
                :key="index"
                @click="checkTab2(index, item)"
                :class="{ active2: item.isSelected }"
              >
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="card_list">
              <Card class="card_item">
                <div class="h3">机构线索分析</div>
                <div class="x_title">
                  <div>总派单：{{assistantHospitalCluesDataObj.totalSendOrderCount}}</div>
                  <div>总上门：{{assistantHospitalCluesDataObj.totalVisitCount}}</div>
                  <div>总成交：{{assistantHospitalCluesDataObj.totalDealCount}}</div>
                </div>
                <hospitalBar :hospitalBarData="assistantHospitalCluesDataObj.items" />
              </Card>
              <Card class="card_item">
                <div class="h3">机构业绩分析</div>
                <barItem :barItemData="assistantHospitalPerformanceData"/>
              </Card>
            </div>
          </Card>
        </Card>
        <Card  class="m_b">
          <div class=" card_list">
            <Card class="card_item"> 
                <div class="h3">IP线索占比</div>
                <pieItem :pieData="platformClueDataList.contentPlatformClueRate" title="总线索" :total="platformClueDataList.contentPlatformTotalClue"/>
            </Card>
            <Card class="card_item"> 
            <div class="h3">IP业绩占比</div>
                <pieItem :pieData="platformPerformanceDataList.contentPlatformPerformanceRate" title="总业绩" :total="platformPerformanceDataList.contentPlatformTotalPerformance"/>
            </Card>
          </div>
        </Card>
     </div>
     <div v-else>
        <!-- 医美业绩趋势 -->
        <Card  class="m_b">
          <!-- 新老客筛选 -->
          <div class="tab" >
              <div
                class="tab_item"
                v-for="(item, index) in params.list6"
                :key="index"
                @click="selectTab6(index, item)"
                :class="{ active: params.selected6 == item}"
              >
                <span>{{ item }}</span>
              </div>
          </div>
          <totalAchievementByYear :params="params" ref="totalAchievementByYear"/>
        </Card>
        <!-- 医美（线索）获客分析 -->
        <Card  class="m_b">
          <!-- 部门筛选 -->
          <div class="tab" >
            <div
              class="tab_item"
              v-for="(item, index) in params.list7"
              :key="index"
              @click="selectTab7(index, item)"
              :class="{ active: params.selected7 == item}"
            >
              <span>{{ item }}</span>
            </div>
          </div>
          <medicalBeautyClues :params="params" ref="medicalBeautyClues"/>
        </Card>
        <!-- 机构转化情况 -->
        <hospitalTable :params="params"  ref="hospitalTable"/>
     </div>
    </Card>
  </div>
</template>
<script>
import * as amiyaOperationsBoardApi from "@/api/amiyaOperationsBoard";
import * as api from "@/api/amiyaMingSuoOperationBoard";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";

import item2 from "./components/item2.vue"
import monthLine from "./components/monthLine.vue"
import funnel from "./components/funnel.vue"
import customerBar from "./components/customerBar.vue"
import pieItem from "./components/pieItem.vue"
import hospitalBar from "./components/hospitalBar.vue"
import barItem from "./components/barItem.vue"

import totalAchievementByYear from "./components/totalAchievementByYear.vue"
import medicalBeautyClues from "./components/medicalBeautyClues.vue"
import hospitalTable from "./components/hospitalTable.vue"


export default {
  components: {
    hospitalBar,
    barItem,
    item2,
    monthLine,
    funnel,
    customerBar,
    pieItem,
    totalAchievementByYear,
    medicalBeautyClues,
    hospitalTable
   
  },
  data() {
    return {
      
     
      selected: "当月",
      list: ["当月","历史"],
      list2:["图表","转化"],
      selected2: "图表",
      completeRate: 0,
      params: {
        list6:["全部","新客","老客"],
        list7:["直播前","直播后"],
        selected6:"全部",
        selected7:"直播前",
        // 当年
        // startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        assistantId:-1,
        // 平台
        assistantIdList: [
            {
                id:'34cc49b9-485d-4fa5-95dd-9dbf642faf1d',
                name:'林合晟'
            },
            {
                id:'c0ef9fb6-124b-4e7a-8f3c-3c503cd2dd5a',
                name:'马瑶'
            },
            {
                id:'166d81e3-6921-4ecb-8bf3-70be8ac2eefa',
                name:'李芬'
            },
            
        ],
      },
    // 卡片和折线图数据
    mingSuoObj:{},
    // 转化周期数据
    cycleDataObj:{},
    // 线索目标完成率
    clueTargetData:[],
    // 业绩目标完成率
    performanceTargetData:[],
    // 助理目标完成率和助理业绩占比
    assiatantTargetCompleteAndPerformanceRateDataObj:{},
    // IP线索占比
    platformClueDataList:{},
    // IP业绩占比
    platformPerformanceDataList:{},
    // 医生
    doctorList:[{id:-1,name:'全部医生'}],
    platformList2:[
      {
        name: "当月",
        id: 1,
        isSelected: true,
      },
      {
        name: "历史",
        id: 2,
        isSelected: false,
      },
    ],
    // 机构线索分析
    assistantHospitalCluesDataObj:{},
    // 机构业绩分析
    assistantHospitalPerformanceData:[],
    };
  },
  methods: {
    //   获取医生下拉框
    getDoctorList() {
      liveAnchorBaseInfoApi.getDoctorList().then((res) => {
        if (res.code === 0) {
          const {DoctorList} = res.data
          // this.params.assistantId = DoctorList  ? DoctorList[0].id : []
          this.doctorList = [...this.doctorList,...DoctorList] 
        }
      });
    },
    //   获取时间进度
    getTimeSpanClick() {
      const data = {
        startDate: null,
        endDate: this.$moment(this.params.endDate).format("YYYY-MM-DD"),
        keyWord: "",
      };
      amiyaOperationsBoardApi.getTimeSpan(data).then((res) => {
        if (res.code === 0) {
          // const { contentPalteForms } = res.data;
          this.completeRate = res.data.data;
          sessionStorage.setItem("completeRate", res.data.data);
        }
      });
    },
    checkTab2(index, value) {
      this.platformList2[index].isSelected = !this.platformList2[index].isSelected;
      this.getassistantHospitalCluesData()
    },
    // 年度趋势
    selectTab6(index,value){
      this.params.selected6 = value
      this.$refs.totalAchievementByYear.getTotalAchievementByYearClick()
    },
    // 年度趋势 部门筛选
    selectTab7(index,value){
      this.params.selected7 = value
      this.$refs.medicalBeautyClues.getTotalCluesByYearClick()
    },
    // 卡片和折线图数据
    getgetMingSuoAchievementAndDateSchedule(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
          startDate: this.$moment(startDate).format("YYYY-MM-DD"),
          endDate: this.$moment(endDate).format("YYYY-MM-DD"),
          keyWord: assistantId == -1 ? null : assistantId
          // this.selected2 == '马瑶' ? this.params.assistantIdList.find(item=>item.name == '马瑶').id : this.selected2 == '李芬' ? this.params.assistantIdList.find(item=>item.name == '李芬').id : this.selected2 == '林合晟' ? this.params.assistantIdList.find(item=>item.name == '林合晟').id  :   ''
        }
        api.getMingSuoAchievementAndDateSchedule(data).then(res=>{
          if(res.code == 0){
            this.mingSuoObj = res.data.data
          }
        })
    },
    // 登记派单周期和登记上门/成交周期
    getMingSuoTransformCycleDataClick(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: assistantId == -1 ? null : assistantId
        // this.selected2 == '马瑶' ? this.params.assistantIdList.find(item=>item.name == '马瑶').id : this.selected2 == '李芬' ? this.params.assistantIdList.find(item=>item.name == '李芬').id : this.selected2 == '林合晟' ? this.params.assistantIdList.find(item=>item.name == '林合晟').id  :   '',
      }
      api.getMingSuoTransformCycleData(data).then((res) => {
        if (res.code === 0) {
          this.cycleDataObj = res.data.data
        }
      });
    },
    // 线索目标完成率
    getMingSuoClueTargetDataClick(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: assistantId == -1 ? null : assistantId
        // this.selected2 == '马瑶' ? this.params.assistantIdList.find(item=>item.name == '马瑶').id : this.selected2 == '李芬' ? this.params.assistantIdList.find(item=>item.name == '李芬').id : this.selected2 == '林合晟' ? this.params.assistantIdList.find(item=>item.name == '林合晟').id  :   '',
      }
      api.getMingSuoClueTargetData(data).then((res) => {
        if (res.code === 0) {
          const {clueTargetComplete,performanceTargetComplete} = res.data.data
          this.clueTargetData = clueTargetComplete
          this.performanceTargetData = performanceTargetComplete
        }
      });
    },
    // 业绩目标完成率
    // getMingSuoPerformanceTargetDataClick(){
    //   const { startDate, endDate, assistantId } = this.params;
    //   const data = {
    //     startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
    //     endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
    //     baseLiveAnchorId: this.selected2 == '马瑶' ? this.params.assistantIdList.find(item=>item.name == '马瑶').id : this.selected2 == '李芬' ? this.params.assistantIdList.find(item=>item.name == '李芬').id : this.selected2 == '林合晟' ? this.params.assistantIdList.find(item=>item.name == '林合晟').id  :   '',
    //   }
    //   api.getMingSuoPerformanceTargetData(data).then((res) => {
    //     if (res.code === 0) {
    //       this.performanceTargetData = res.data.data.clueTargetComplete
    //     }
    //   });
    // },
    // 助理目标完成率和助理业绩占比柱形图
    mingsuoAssiatantTargetCompleteAndPerformanceRateDataClick(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: assistantId == -1 ? null : assistantId
        // this.selected2 == '马瑶' ? this.params.assistantIdList.find(item=>item.name == '马瑶').id : this.selected2 == '李芬' ? this.params.assistantIdList.find(item=>item.name == '李芬').id : this.selected2 == '林合晟' ? this.params.assistantIdList.find(item=>item.name == '林合晟').id  :   '',
        // isCurrent:this.selected == '当月' ? true : false
      }
      api.mingsuoAssiatantTargetCompleteAndPerformanceRateData(data).then((res) => {
        if (res.code === 0) {
          this.assiatantTargetCompleteAndPerformanceRateDataObj = res.data.data
        }
      });
    },
    selectTab(index, value) {
      this.selected = value;
      this.mingsuoAssiatantTargetCompleteAndPerformanceRateDataClick()
    },
    // 主播筛选
    selectTab2(index, value) {
      this.selected2 = value;
      // this.list[index].isSelected = !this.list[index].isSelected;
      this.getData()
    },
    // 账号线索占比
    getMingSuoContentplatformClueDataClick(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: assistantId == -1 ? null : assistantId
        // this.selected2 == '马瑶' ? this.params.assistantIdList.find(item=>item.name == '马瑶').id : this.selected2 == '李芬' ? this.params.assistantIdList.find(item=>item.name == '李芬').id : this.selected2 == '林合晟' ? this.params.assistantIdList.find(item=>item.name == '林合晟').id  :   '',
      }
      api.getMingSuoContentplatformClueData(data).then((res) => {
        if (res.code === 0) {
          this.platformClueDataList = res.data.data
        }
      });
    },
    // 账号业绩占比
    getMingSuoContentplatformPerformanceDataClick(){
      const { startDate, endDate, assistantId } = this.params;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: assistantId == -1 ? null : assistantId
        // this.selected2 == '马瑶' ? this.params.assistantIdList.find(item=>item.name == '马瑶').id : this.selected2 == '李芬' ? this.params.assistantIdList.find(item=>item.name == '李芬').id : this.selected2 == '林合晟' ? this.params.assistantIdList.find(item=>item.name == '林合晟').id  :   '',
      }
      api.getMingSuoContentplatformPerformanceData(data).then((res) => {
        if (res.code === 0) {
          this.platformPerformanceDataList = res.data.data
        }
      });
    },
     // 获取机构线索分析
    getassistantHospitalCluesData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            baseLiveAnchorId:assistantId == -1 ? null : assistantId,
            currentMonth:this.platformList2.find((item) => item.id == 1).isSelected,
            history:this.platformList2.find((item) => item.id == 2).isSelected,
        }
        api.getDoctorHospitalCluesData(data).then(res=>{
            if(res.code === 0){
                this.assistantHospitalCluesDataObj =  res.data.data
            }
        })
    },
    // 获取机构业绩 
    getassistantHospitalPerformanceData(){
        const {startDate,endDate,assistantId} = this.params
        const data = {
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            liveAnchorBaseId:assistantId == -1 ? null : assistantId,
        }
        api.getAssistantHospitalPerformanceData(data).then(res=>{
            if(res.code === 0){
                this.assistantHospitalPerformanceData =  res.data.data
            }
        })
    },
    getData(){
      if(this.selected2 == '图表'){
        this.getgetMingSuoAchievementAndDateSchedule()
        this.getMingSuoTransformCycleDataClick()
        this.getMingSuoClueTargetDataClick()
        // this.getMingSuoPerformanceTargetDataClick()
        this.mingsuoAssiatantTargetCompleteAndPerformanceRateDataClick()
        this.getMingSuoContentplatformClueDataClick()
        this.getMingSuoContentplatformPerformanceDataClick()
        this.getassistantHospitalCluesData()
        this.getassistantHospitalPerformanceData()
        this.$nextTick(()=>{
            this.$refs.whole.getMingSuoFilterDataClick()
        })
      }else{
        this.$nextTick(()=>{
          this.$refs.totalAchievementByYear.getTotalAchievementByYearClick()
          this.$refs.medicalBeautyClues.getTotalCluesByYearClick()
          this.$refs.hospitalTable.getData();
        })
      }
    }
    
  },

  created() {
    this.getDoctorList()
    this.getTimeSpanClick();
    this.getData()
  },
};
</script>

<style scoped lang="less">
.content_title {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}
.h2 {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 280px;
}
.right{
    text-align: end;
}
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
.m_b{
    margin-top: 10px;
}
.h3{
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: center;
}

.card_item {
  width: 49.5%;
}
.card_list{
    display: flex;
    justify-content: space-between;
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
.tab_item {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.active {
  color: #fff;
  border: 1px solid #2f8cf0;
  background: #2f8cf0;
}
.content{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.tab2{
  text-align: start;
  padding-left: 10px;
  display: flex;
  margin-bottom: 10px;
}
.tab_item2 {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.active2 {
  color: red;
  border: 1px solid red;
}
.x_title{
  position: absolute;
  right: 12%;
  top:20px;
}
</style>
