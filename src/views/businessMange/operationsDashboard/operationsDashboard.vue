<template>
  <div>
    <Card>
      <div class="content_title">啊美雅医美业务运营情况</div>
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
        <div class="date_con">
          <DatePicker
            type="date"
            placeholder="请选择开始时间"
            style="width: 160px;"
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
          <Button type="primary" @click="getData">查询</Button>
        </div>
      </div>
      <!-- 业绩 -->
      <div v-if="selected == '业绩'">
        <Card class="m_b ">
          <items :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule"/>
        </Card>
        <!-- 当月业绩趋势 -->
        <Card  class="m_b">
          <div class="h3">当月业绩趋势</div>
          <monthLine :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule"/>
        </Card>
        <!-- 业绩情况分析 -->
        <Card  class="m_b">
          <div class="h3">业绩情况分析</div>
          <div class="pie_list">
            <Card class="pie_item">
              <div class="pie_title">总业绩分析</div>
              <pieItem :pieItemData="totalPerformancePie"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">刀刀组业绩分析</div>
              <pieItem :pieItemData="daodaoTotalPerformancePie"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">吉娜组业绩分析</div>
              <pieItem :pieItemData="jinaTotalPerformancePie"/>
            </Card>
          </div>
        </Card>
        <!-- 助理业绩对比和机构业绩对比图 -->
        <Card  class="m_b ">
          <div class="customer_bar_content">
            <Card class="customer_bar">
              <div class="bar_title">助理业绩对比</div>
              <barItem :barItemData="customerObj"/>
            </Card>
            <Card class="customer_bar">
              <div class="bar_title">机构业绩对比</div>
              <barItem :barItemData="hospitalObj"/>
            </Card>
          </div>
          
        </Card>
      </div>
      <!-- 流量 -->
      <div v-else-if="selected == '流量'">
        <!--  -->
        <Card  class="m_b">
          <item2 />
        </Card>
         <!-- 当月业绩趋势 -->
        <Card  class="m_b">
          <div class="h3">当月业绩趋势</div>
          <monthLine :totalAchievementAndDateSchedule="totalAchievementAndDateSchedule"/>
        </Card>
        <!-- 流量分析 -->
        <Card  class="m_b">
          <div class="h3">平台流量分析</div>
          <div class="pie_list">
            <Card class="pie_item">
              <div class="pie_title">整体流量占比</div>
              <pieItem :pieItemData="pieItemData"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">刀刀组流量占比</div>
              <pieItem :pieItemData="pieItemData"/>
            </Card>
            <Card class="pie_item">
              <div class="pie_title">吉娜组流量占比</div>
              <pieItem :pieItemData="pieItemData"/>
            </Card>
          </div>
        </Card>
        <!-- 平台数据分析 -->
        <Card  class="m_b ">
          <div class="h3">部门平台流量分析</div>
          <div class="flow_content m_t">
            <Card class="flow_item margin_r">
              <div class="pie_title">抖音流量分析</div>
              <flowBarItem :flowBarItemData="flowBarItemData"/>
            </Card>
            <Card class="flow_item ">
              <div class="pie_title">视频号流量分析</div>
              <flowBarItem :flowBarItemData="flowBarItemData"/>
            </Card>
          </div>
          <div class="flow_content m_t">
            <Card class="flow_item margin_r">
              <div class="pie_title">小红书流量分析</div>
              <flowBarItem :flowBarItemData="flowBarItemData"/>
            </Card>
            <Card class="flow_item ">
              <div class="pie_title">私域流量分析</div>
              <flowBarItem :flowBarItemData="flowBarItemData"/>
            </Card>
          </div>
        </Card>
      </div>
      <!-- 转化 -->
      <div v-else-if="selected == '转化'">
        <!-- 平台切换 -->
        <div class="tab2" >
          <div
            class="tab_item"
            v-for="(item, index) in platformList"
            :key="index"
            @click="checkTab(index, item)"
            :class="{ active2: item.isSelected }"
          >
            <i class="iconfont  icons" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </div>
        </div>
        
        <div >
          <!-- 流量转化和客户转化情况-->
          <trafficConversionTable :params="params" :platformList="platformList" ref="trafficConversionTable" />
          <!-- 流量转化和客户转化情况-助理 -->
          <assistantTable :params="params" :platformList="platformList" ref="assistantTable" />
          <!-- 机构转化情况 -->
          <hospitalTable :params="params" :platformList="platformList" ref="hospitalTable"/>
        </div>
      </div>
      
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
import * as contentPlatForm from "@/api/baseDataMaintenance";

import items from "./components/item.vue"
import item2 from "./components/item2.vue"
import monthLine from "./components/monthLine.vue"
import pieItem from "./components/pieItem.vue"
import barItem from "./components/barItem.vue"
import flowBarItem from "./components/3dBarItem.vue"
import trafficConversionTable from "./components/trafficConversionTable.vue"
import assistantTable from "./components/assistantTable.vue"
import hospitalTable from "./components/hospitalTable.vue"
export default {
  components:{
    items,
    item2,
    monthLine,
    pieItem,
    barItem,
    flowBarItem,
    trafficConversionTable,
    assistantTable,
    hospitalTable
  },
  data() {
    return {
      params:{
        // 当年
        // startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 平台
        // contentPalteForms:[]
      },
      list: ["业绩","流量","转化"],
      selected:"转化",
      // 业绩趋势
      totalAchievementAndDateSchedule:{},
      // 新客业绩
      newCustomer:{},
      // 老客业绩
      oldCustomer:{},
      // 总业绩
      totalCustomer:{},
      // 饼图数据
      pieItemData:[],
      // 3d流量分析数据
      flowBarItemData:{},
      // 总业绩饼图
      totalPerformancePie:[],
      // 刀刀组饼图
      daodaoTotalPerformancePie:[],
      // 吉娜组饼图
      jinaTotalPerformancePie:[],
      // 助理业绩对比图
      customerObj:[],
      // 机构业绩对比图
      hospitalObj:[],
      // 平台
      platformList: [
        {
          icon: "icon-douyin-",
          name: "抖音",
          id: 1,
          isSelected: true,
        },
        {
          icon: "icon-shipinhao",
          name: "视频号",
          id: 2,
          isSelected: false,
        },
        {
          icon: "icon-xiaohongshu1",
          name: "小红书",
          id: 3,
          isSelected: false,
        },
        {
          icon: "icon-siyuzhibo",
          name: "私域",
          id: 4,
          isSelected: false,
        },
      ],
      
    };
  },
  methods: {
    //   获取平台（下拉框）
    // getContentValidList() {
    //   contentPlatForm.getContentPlatFormValidList().then((res) => {
    //     if (res.code === 0) {
    //       const { contentPalteForms } = res.data;
    //       this.params.contentPalteForms = contentPalteForms;
    //     }
    //   });
    // },
    checkTab(index, value) {
      this.platformList[index].isSelected = !this.platformList[index].isSelected;
      this.getData()
    },
    selectTab(index, value) {
      this.selected = value
      // this.list[index].isSelected = !this.list[index].isSelected;
      this.getData()
    },

    getData() {
      if(this.selected == '业绩'){
        this.getNewOrOldCustomerCompare()
        this.getNewOrOldCustomerCompareByEmployeeAndHospital()
      }else if(this.selected == '转化'){
        this.$nextTick(()=>{
          this.$refs.trafficConversionTable.getCompanyTransformData()
          this.$refs.assistantTable.getAssistantTransformData()
          this.$refs.hospitalTable.getData()
        })
      }
        this.getTotalAchievementAndDateSchedule()
    },
    // 获取业绩数据和折线图数据
    getTotalAchievementAndDateSchedule() {
      const {startDate,endDate} = this.params
        if (!startDate || !endDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
      api.getTotalAchievementAndDateSchedule(data).then((res) => {
        if (res.code == 0) {
          this.totalAchievementAndDateSchedule = res.data.data;
          this.pieItemData = [
            { value: 40, name: '新客' },
            { value: 60, name: '老客' },
          ]
          // this.barItemData={
          //   data1:[320, 302, 301, 334, 390, 330, 350],
          //   data2:[120, 132, 101, 134, 90, 230, 210],
          //   name:['杭州连天美医疗美容医院有限公司杭州连天美医疗美容医院有限公司', '上海伊莱美医疗美容医院', '沈阳和平百嘉丽医疗美容医院有限公司', '杭州维多利亚医疗美容医院有限公司', '北京丽都医疗美容医院有限公司', '湖南雅美医疗美容医院有限公司长沙雅美医疗美容医院', '佛山曙光金子医学美容医院有限公司']
          // }
          this.flowBarItemData={
           data1: [
                        {value: 300, itemStyle: {color: '#5DC6D6'}},
                        {value: 498, itemStyle: {color: '#A0A8F5'}},
                        {value: 778, itemStyle: {color: '#D091FA'}},
                        {value: 1382, itemStyle: {color: '#F69655'}},

                    ],
                    data2:[
                        {value: 300, itemStyle: {color: '#2DB6C8'}},
                        {value: 498, itemStyle: {color: '#8C97F8'}},
                        {value: 778, itemStyle: {color: '#C77AF9'}},
                        {value: 1382, itemStyle: {color: '#F48853'}},

                    ],data3:[
                        {value: 300, itemStyle: {color: '#5DC6D6'}},
                        {value: 498, itemStyle: {color: '#A0A8F5'}},
                        {value: 778, itemStyle: {color: '#D091FA'}},
                        {value: 1382, itemStyle: {color: '#F69655'}},

                    ]

          }
        }
      });
    },
    // 根据条件获取新老客业绩占比（分组）
    getNewOrOldCustomerCompare() {
      const {startDate,endDate} = this.params
        if (!startDate || !endDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
      api.getNewOrOldCustomerCompare(data).then((res) => {
        if (res.code == 0) {
          const {totalPerformanceNewCustomer,totalPerformanceOldCustomer,groupDaoDaoPerformanceNewCustomer,groupDaoDaoPerformanceOldCustomer,groupJiNaPerformanceNewCustomer,groupJiNaPerformanceOldCustomer} = res.data.data
          // this.totalAchievementAndDateSchedule = res.data.data;
          // 总业绩
          this.totalPerformancePie = [{value:totalPerformanceNewCustomer,name:'新客'},{value:totalPerformanceOldCustomer,name:'老客'}]
          this.daodaoTotalPerformancePie = [{value:groupDaoDaoPerformanceNewCustomer,name:'新客'},{value:groupDaoDaoPerformanceOldCustomer,name:'老客'}]
          this.jinaTotalPerformancePie = [{value:groupJiNaPerformanceNewCustomer,name:'新客'},{value:groupJiNaPerformanceOldCustomer,name:'老客'}]
        }
      });
    },
    // 根据条件获取新老客业绩占比（助理与机构）
    getNewOrOldCustomerCompareByEmployeeAndHospital() {
      const {startDate,endDate} = this.params
        if (!startDate || !endDate) {
          this.$Message.warning("请选择日期！");
          return;
        }
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
      api.getNewOrOldCustomerCompareByEmployeeAndHospital(data).then((res) => {
        if (res.code == 0) {
          const {employeePerformance,hospitalPerformance} = res.data.data
          this.customerObj = employeePerformance
          this.hospitalObj = hospitalPerformance
          // data.map(item=>{
          //   if(item.code == 'employee'){
          //     this.customerObj = item
          //   }else if(item.code == 'hospital'){
          //     this.hospitalObj = item
          //   }
          // })
          // this.totalAchievementAndDateSchedule = res.data.data;
          // this.totalAchievementAndDateSchedule = res.data.data;
         
        }
      });
    },
    
  },
  created(){
    this.getData()
    // this.getContentValidList()
    // let list2 =  [300,498,778,1382 ]
    // list2 = list2.map(item=>{return {value:item}})
    // let list3=[
    //   {color: '#5DC6D6'},
    //   {color: '#A0A8F5'},
    //   {color: '#D091FA'},
    //   {color: '#F69655'}

    // ]
    // for(var i=0;i<list2.length;i++){
    //   list2[i]['itemStyle'] =list3[i]
    // }
  }
};
</script>

<style scoped>
.content_title{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
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
.tab,.tab2 {
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
.icons {
  font-size: 14px;
  margin-right: 2px;
}
.active {
  color: #fff;
  border: 1px solid #2f8cf0;
  background: #2f8cf0;
}
.active2 {
  color: red;
  border: 1px solid red;
}
.h3{
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;
}
.m_b{
  margin-bottom: 10px;
}
.m_t{
  margin-top: 10px;
}
.margin_r{
  margin-right: 10px;
}
.pie_list{
  display: flex;
  justify-content: space-between;

}
.pie_item{
  width: 32%;
  margin-top: 10px;
}
.pie_title,.bar_title{
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.customer_bar_content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.customer_bar{
  width: 49%;
}
.flow_content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.flow_item{
  flex: 1;
}
.items{
  display: flex;
}
.items div{
  flex:1
}
.tab2{
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
