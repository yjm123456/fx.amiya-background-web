<template>
  <div>
    <!-- <Card class="container"> -->
    <div class="content">
      <!-- <div class="list1">
        <ul class="ul">
          <li v-for="(item, index) in title_list" :key="index" class="li">
            <span
              ref="spans"
              :style="{ color: activeStep === index ? '#1987e1' : 'skyblue' }"
              @click="jump(index)"
            >
              <div
                class="cirle"
                :style="{
                  border:
                    activeStep === index
                      ? '2px solid #1987e1'
                      : '1px solid skyblue',
                }"
              ></div>
              {{ item.title }}
            </span>
            <div class="line"></div>
          </li>
        </ul>
      </div> -->
      <div class="result" @scroll="onScroll">
        <div class="scroll-item" style="height:450px">
          <div class="top_con">
            <div class="titles">业绩看板</div>
            <div class="date_con">
              <DatePicker
                type="month"
                placeholder="请选择年月"
                style="width: 160px;margin:0 10px"
                transfer
                :value="month"
                v-model="month"
              ></DatePicker>
              <Button type="primary" @click="getamiyaAchievementData">查询</Button>
            </div>
          </div>
          <div class="item_content">
            <div class="item_con">
              <div class="item">
                <div class="item_top">
                  <div class="">总业绩</div>
                  <div class="h4">{{achievementdataInfo.totalPerformance}}</div>
                </div>
                <div class="item_center">
                  <div>
                    <div>目标完成率</div>
                    <div  class="h5">{{achievementdataInfo.totalPerformanceCompleteRate}}%</div>
                  </div>
                  <div class="cen">
                    <div>环比</div>
                    <!-- <div  class="h5">{{achievementdataInfo.totalPerformanceChainRatio}}%</div> -->
                    <span  class="h5" v-if="Math.sign(achievementdataInfo.totalPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.totalPerformanceChainRatio) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.totalPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.totalPerformanceChainRatio) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                  </div>
                </div>
                <div class="item_center">
                  <div>
                    <div></div>
                    <div  class="h5"></div>
                  </div>
                  <div class="cen">
                    <div>同比</div>
                    <!-- <div  class="h5">{{achievementdataInfo.totalPerformanceYearOnYear}}%</div> -->
                    <span  class="h5" v-if="Math.sign(achievementdataInfo.totalPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.totalPerformanceYearOnYear) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.totalPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.totalPerformanceYearOnYear) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="h3">数据诊断：</div>
              <div class="bottom_text">
                <!-- <div>对比时间进度：<span >{{achievementdataInfo.totalPerformanceToDateSchedule}}%</span></div> -->
                <div>
                  对比时间进度：
                  <span  class="h5" v-if="Math.sign(achievementdataInfo.totalPerformanceToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.totalPerformanceToDateSchedule) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.totalPerformanceToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.totalPerformanceToDateSchedule) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                </div>
                <div>对比时间进度，业绩偏差：<span >{{achievementdataInfo.totalPerformanceDeviation}}元</span></div>
                <div>距目标达成，后期需完成：<span >{{achievementdataInfo.laterCompleteEveryDayTotalPerformance}}元/天</span></div>
              </div>
            </div>

            <div class="item_con">
              <div class="item">
                <div class="item_top">
                  <div class="">刀刀组业绩</div>
                  <div class="h4">{{achievementdataInfo.groupDaoDaoPerformance}}</div>
                </div>
                <div class="item_center">
                  <div>
                    <div>目标完成率</div>
                    <div  class="h5">{{achievementdataInfo.groupDaoDaoPerformanceCompleteRate}}%</div>
                  </div>
                  <div class="cen">
                    <div>环比</div>
                    <!-- <div  class="h5">{{achievementdataInfo.groupDaoDaoPerformanceChainRatio}}%</div> -->
                    <span  class="h5" v-if="Math.sign(achievementdataInfo.groupDaoDaoPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.groupDaoDaoPerformanceChainRatio) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.groupDaoDaoPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.groupDaoDaoPerformanceChainRatio) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                  </div>
                </div>
                <div class="item_center">
                  <div>
                    <div>占比</div>
                    <div  class="h5">{{achievementdataInfo.groupDaoDaoPerformanceProportion}}%</div>
                  </div>
                  <div class="cen">
                    <div>同比</div>
                    <!-- <div  class="h5">{{achievementdataInfo.groupDaoDaoPerformanceYearOnYear}}%</div> -->
                    <span  class="h5" v-if="Math.sign(achievementdataInfo.groupDaoDaoPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.groupDaoDaoPerformanceYearOnYear) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.groupDaoDaoPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.groupDaoDaoPerformanceYearOnYear) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                  </div>
                </div>
              </div>
              <div style="margin-top:50px"></div>
              <div class="bottom_text">
                <!-- <div>对比时间进度：<span >{{achievementdataInfo.groupDaoDaoPerformanceToDateSchedule}}%</span></div> -->
                <div>
                  对比时间进度：
                  <span  class="h5" v-if="Math.sign(achievementdataInfo.groupDaoDaoPerformanceToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.groupDaoDaoPerformanceToDateSchedule) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.groupDaoDaoPerformanceToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.groupDaoDaoPerformanceToDateSchedule) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                </div>
                <div>对比时间进度，业绩偏差：<span >{{achievementdataInfo.groupDaoDaoPerformanceDeviation}}元</span></div>
                <div>距目标达成，后期需完成：<span >{{achievementdataInfo.laterCompleteEveryDayGroupDaoDaoPerformance}}元/天</span></div>
              </div>
            </div>

            <div class="item_con">
              <div class="item">
                <div class="item_top">
                  <div class="">吉娜组业绩</div>
                  <div class="h4">{{achievementdataInfo.groupJinaPerformance}}</div>
                </div>
                <div class="item_center">
                  <div>
                    <div>目标完成率</div>
                    <div  class="h5">{{achievementdataInfo.groupJinaPerformanceCompleteRate}}%</div>
                  </div>
                  <div class="cen">
                    <div>环比</div>
                    <!-- <div  class="h5">{{achievementdataInfo.groupJinaPerformanceChainRatio}}%</div> -->
                    <span  class="h5" v-if="Math.sign(achievementdataInfo.groupJinaPerformanceChainRatio)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.groupJinaPerformanceChainRatio) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.groupJinaPerformanceChainRatio)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.groupJinaPerformanceChainRatio) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                  </div>
                </div>
                <div class="item_center">
                  <div class="cen">
                    <div>占比</div>
                    <div  class="h5">{{achievementdataInfo.groupJinaPerformanceProportion}}%</div>
                  </div>
                  <div class="cen">
                    <div>同比</div>
                    <!-- <div  class="h5">{{achievementdataInfo.groupJinaPerformanceYearOnYear}}%</div> -->
                    <span  class="h5" v-if="Math.sign(achievementdataInfo.groupJinaPerformanceYearOnYear)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.groupJinaPerformanceYearOnYear) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.groupJinaPerformanceYearOnYear)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.groupJinaPerformanceYearOnYear) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                  </div>
                </div>
              </div>
              <div style="margin-top:50px"></div>
              <div class="bottom_text">
                <!-- <div>对比时间进度：<span >{{achievementdataInfo.groupJinaPerformanceToDateSchedule}}%</span></div> -->
                <div>
                  对比时间进度：
                  <span  class="h5" v-if="Math.sign(achievementdataInfo.groupJinaPerformanceToDateSchedule)== 1"> <span  class="red ">增长</span>{{ Math.abs(achievementdataInfo.groupJinaPerformanceToDateSchedule) + '%'}}</span>
                    <span class="h5" v-else-if="Math.sign(achievementdataInfo.groupJinaPerformanceToDateSchedule)== -1"><span  class="green">下降</span>{{ Math.abs(achievementdataInfo.groupJinaPerformanceToDateSchedule) + '%'}}</span>
                    <span class="h5"  v-else>-</span>
                </div>
                
                <div>对比时间进度，业绩偏差：<span >{{achievementdataInfo.groupJinaPerformanceDeviation}}元</span></div>
                <div>距目标达成，后期需完成：<span >{{achievementdataInfo.laterCompleteEveryDayGroupJinaPerformance}}元/天</span></div>
              </div>
            </div>
            <div class="item_con">
              <div class="item">
                <div class="item_top">
                  <div class="">退款业绩</div>
                  <div class="h4">{{achievementdataInfo.refundPerformance}}</div>
                </div>
                </div>
            </div>


            
          </div>

         

          

        </div>
        <div class="scroll-item" style="height:570px">
          <div class="top_con">
            <div class="titles">业绩分析</div>
            <div class="date_con">
              <DatePicker
                type="month"
                placeholder="请选择年月"
                style="width: 160px;margin:0 10px"
                transfer
                :value="month2"
                v-model="month2"
              ></DatePicker>
              <Button type="primary" @click="getamiyaAchievementDetailData">查询</Button>
            </div>
          </div>
          <div class="tab">
            <Tabs
              type="card"
              v-model="active"
              class="tabs"
            >
              <TabPane label="新客/老客" name="newAndOldCustomers">
                <div>
                  <newAndOldCustomers :active="active" :achievementdata="achievementdata"></newAndOldCustomers>
                </div>
              </TabPane>
              <TabPane label="有效/潜在" name="effectivePotential">
                <div>
                  <effectivePotential :active="active" :achievementdata="achievementdata"></effectivePotential>
                </div>
              </TabPane>
              <TabPane label="当月派单/历史派单" name="dispatch">
                <div>
                  <dispatch :active="active" :achievementdata="achievementdata"></dispatch>
                </div>
              </TabPane>
              <TabPane label="抖音/视频号" name="tiktokVideo">
                <div>
                  <tiktokVideo :active="active" :achievementdata="achievementdata"></tiktokVideo>
                </div>
              </TabPane>
              <TabPane label="主播视频/助理照片" name="anchorPicVedio">
                <div>
                  <anchorPicVedio :active="active" :achievementdata="achievementdata"></anchorPicVedio>
                </div>
              </TabPane>
              <TabPane label="主播接诊/非主播接诊" name="hostReception">
                <div>
                  <hostReception :active="active" :achievementdata="achievementdata"></hostReception>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div class="scroll-item" style="height:1050px">
          <!-- <div class="top_con">
            <div class="titles">业绩趋势</div>
            <div class="date_con">
              <DatePicker
                type="month"
                placeholder="请选择年月"
                style="width: 160px;margin:0 10px"
                transfer
                :value="month3"
                v-model="month3"
              ></DatePicker>
              <Date-picker 
                type="year" 
                placeholder="选择年" 
                style="width: 160px;margin:0 10px"
                :value="year"
                v-model="year"
              >
              </Date-picker>
              
              <Button type="primary" @click="dispatchDealChange">查询</Button>
            </div>
          </div> -->
          <div class="date_content">
            <div class="titles">年业绩趋势</div>  
            <div class="date_con">
              <!-- <DatePicker
                type="month"
                placeholder="请选择年月"
                style="width: 160px;margin:0 10px"
                transfer
                :value="month3"
                v-model="month3"
              ></DatePicker> -->
              <Date-picker 
                type="year" 
                placeholder="选择年" 
                style="width: 160px;margin:0 10px"
                :value="year"
                v-model="year"
              >
              </Date-picker>
              
              <Button type="primary" @click="getamiyaAchievementDetailDataLineYear">查询</Button>
            </div>
          </div>
          <div class="line_content">
            <Card style="background:#f5f5f5;height:400px;margin:10px 0">
                <yearLine :yearBrokenLineListData="yearBrokenLineListData"/>
            </Card>
          </div>

          <div class="date_content2">
            <div class="titles month_title">月业绩趋势</div>  
            <div class="date_con">
              <DatePicker
                type="month"
                placeholder="请选择年月"
                style="width: 160px;margin:0 10px"
                transfer
                :value="month3"
                v-model="month3"
              ></DatePicker>
              
              <Button type="primary" @click="getamiyaAchievementDetailDataLineMonth">查询</Button>
            </div>
          </div>
          <div >
            <Card style="background:#f5f5f5;height:400px;margin:10px 0">
                <monthLine :monthBrokenLineListData="monthBrokenLineListData"/>
            </Card>
          </div>
          
        </div>
        <div class="scroll-item" style="height:1070px">
          <div class="titles">业绩转化漏斗</div>
          <operate></operate>
        </div>
      </div>
    </div>
    <!-- </Card> -->
  </div>
</template>
<script>
import * as api from "@/api/amiyaAchievement";
import newAndOldCustomers from "../components/newAndOldCustomers.vue";
import effectivePotential from "../components/effectivePotential.vue";
import dispatch from "../components/dispatch.vue";
import tiktokVideo from "../components/tiktokVideo.vue";
import anchorPicVedio from "../components/anchorPicVedio.vue";
import hostReception from "../components/hostReception.vue";
import yearLine from "../components/yearLine.vue"
import monthLine from "../components/monthLine.vue"
import operate from "./operate.vue"
export default {
  components: {
    newAndOldCustomers,
    effectivePotential,
    dispatch,
    tiktokVideo,
    anchorPicVedio,
    hostReception,
    yearLine,
    monthLine,
    operate
  },
  props: ["activeName"],
  data() {
    return {
      scrollTop: 0,
      active: "newAndOldCustomers",
      jumpIndex: 0,
      isTab: false,
      activeStep: 0,
      title_list: [
        { title: "总业绩" },
        { title: "业绩分析" },
        { title: "业绩趋势" },
      ],
      month: this.$moment().format("YYYY-MM"),
      month2: this.$moment().format("YYYY-MM"),
      year: this.$moment().format("YYYY"),
      month3: this.$moment().format("YYYY-MM"),
      
      // 总业绩,主播业绩,退款
      achievementdataInfo:{},
      // 业绩分析
      achievementdata: {},
      // 年折线图
      yearBrokenLineListData:{},
      // 月折线图
      monthBrokenLineListData:{}
    };
  },
  methods: {
    // 总业绩,主播业绩,退款
    getamiyaAchievementData(){
      let str = String(this.$moment(this.month).format("MM"));
      let month = str.substr(str.length - 1, 1);
      if (!this.month) {
        this.$Message.warning("请选择日期");
        return;
      }
      const data = {
        year: this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
        month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
        day:0,
        liveAnchorBaseId:'',
        isSelfLKiveAnchor:true,
      };
      //总业绩,主播业绩,退款
      api.amiyaAchievementData(data).then((res) => {
        if (res.code === 0) {
          const { achievementdata } = res.data;
          this.achievementdataInfo = achievementdata
        }
      });
    },
    // 业绩分析看板
    getamiyaAchievementDetailData() {
      let str = String(this.$moment(this.month2).format("MM"));
      let month2 = str.substr(str.length - 1, 1);
      if (!this.month2) {
        this.$Message.warning("请选择日期");
        return;
      }
      const data = {
        year: this.$moment(this.month2).format("YYYY")? this.$moment(this.month2).format("YYYY") : null,
        month:Number(this.$moment(this.month2).format("MM")) >= 10 ? this.$moment(this.month2).format("MM") : month2,
        day:0,
        liveAnchorBaseId:'',
        isSelfLKiveAnchor:true,
      };
      // 业绩分析
      api.amiyaAchievementDetailData(data).then((res) => {
        if (res.code === 0) {
          const { achievementdata } = res.data;
          this.achievementdata = achievementdata
        }
      });
    },
    // 业绩趋势年
    getamiyaAchievementDetailDataLineYear() {
      if (!this.year) {
        this.$Message.warning("请选择日期");
        return;
      }
      const data = {
        year: this.$moment(this.year).format("YYYY")? this.$moment(this.year).format("YYYY") : null,
        month:0,
        day:0,
        liveAnchorBaseId:'',
        isSelfLKiveAnchor:true,
      };
      // 业绩趋势
      api.amiyaAchievementDetailDataLine(data).then((res) => {
        if (res.code === 0) {
          const { brokenLineListData } = res.data;
          this.yearBrokenLineListData = brokenLineListData
        }
      });
    },
    // 业绩趋势月
    getamiyaAchievementDetailDataLineMonth() {
      let str = String(this.$moment(this.month3).format("MM"));
      let month3 = str.substr(str.length - 1, 1);
      if (!this.month3) {
        this.$Message.warning("请选择日期");
        return;
      }
      const data = {
        year: this.$moment(this.month3).format("YYYY")? this.$moment(this.month3).format("YYYY") : null,
        month:Number(this.$moment(this.month3).format("MM")) >= 10 ? this.$moment(this.month3).format("MM") : month3,
        day:0,
        liveAnchorBaseId:'',
        isSelfLKiveAnchor:true,
      };
      // 业绩趋势
      api.amiyaAchievementDetailDataLine(data).then((res) => {
        if (res.code === 0) {
          const { brokenLineListData } = res.data;
          this.monthBrokenLineListData = brokenLineListData
        }
      });
    },
    jump(index) {
      this.jumpIndex = index;
      var items = document.querySelectorAll(".scroll-item");
      for (var i = 0; i < items.length; i++) {
        if (index === i) {
          items[i].scrollIntoView({
            block: "start", //默认跳转到顶部
            behavior: "smooth", //滚动的速度
          });
        }
      }
    },
    onScroll(e) {
      let scrollItems = document.querySelectorAll(".scroll-item");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        this.scrollTop = e.target.scrollTop;
        if (judge) {
          this.activeStep = i;
          break;
        }
      }
    },
  },
  created() {
    this.getamiyaAchievementData()
    this.getamiyaAchievementDetailData()
    this.getamiyaAchievementDetailDataLineYear()
    this.getamiyaAchievementDetailDataLineMonth()
  },
  // watch: {
  //   activeName: {
  //     handler(value) {
  //       if (value === "performance") {
  //         this.month = this.$moment().format("YYYY-MM")
  //         this.month2 = this.$moment().format("YYYY-MM")
  //         this.year = this.$moment().format("YYYY")
  //         this.month3 = this.$moment().format("YYYY-MM")
  //         this.getamiyaAchievementData()
  //         this.getamiyaAchievementDetailData()
  //         this.getamiyaAchievementDetailDataLineYear()
  //         this.getamiyaAchievementDetailDataLineMonth()
          
  //       }
  //     },
  //     immediate: true,
  //   },
  // },
};
</script>
<style lang="less" scoped>
.ivu-card-body {
  width: 100% !important; 
}
.container {
  // margin-top: 16px;
}
.top_con {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  // padding: 0 1.5%;
  // box-sizing: border-box;
}
.titles {
  font-size: 18px;
  font-weight: bold;
}

.list1 {
  width: 10%;
  /* height: 40px;
  margin-bottom: 20px;
  background: pink; */
  overflow-y: hidden;
  background: #fff;
  border-radius: 2%;
}
.ul {
  height: 40px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.li {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.li > span {
  cursor: pointer;
}
.result {
  width: 100%;
  height: 730px;
  overflow-y: scroll;
  margin-left: 10px;
  color: #000;
}
.scroll-item {
  width: 100%;
  height: 330px;
  margin-top: 20px;
  background: #fff;
  border-radius: 2%;
  padding: 2%;
  box-sizing: border-box;
}
.scroll-item > span {
  font-size: 40px;
}
.scroll-item:first-child {
  margin-top: 0;
}
.scroll-item:last-child {
  height: 730px;
}
.content {
  width: 100%;
  display: flex;
}
.line {
  height: 100px;
  width: 1px;
  /* color: skyblue; */
  display: block;
  border: 1px solid skyblue;
  margin-left: 7%;
}
.li:nth-child(1) {
  margin-left: -28px;
}
.li:nth-child(2) {
  margin-left: -16px;
}
.li:nth-child(3) {
  margin-left: -16px;
}
.li:last-child .line {
  border: none;
}
.cirle {
  width: 15px;
  height: 15px;
  border: 1px solid skyblue;
  display: inline-block;
  border-radius: 50%;
  font-weight: bold;
}

.s_content,
.scroll_top {
  display: flex;
}
.s_content {
  justify-content: space-between;
}
.s_content2 {
  display: flex;
  justify-content: space-around;
}
.l_h3,
.l_h4 {
  font-size: 18px;
}
.scroll_left1,
.scroll_left2,
.scroll_left3,
.scroll_left4,
.scroll_left5 {
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
}
.scroll_left1 {
  background: #9a66e4;
}
.scroll_left2 {
  background: #2d8cf0;
}
.scroll_left3 {
  background: #19be6b;
}
.scroll_left4 {
  background: #ff9900;
}
.scroll_left5 {
  background: #e46cbb;
}
.scroll_right,
.scroll_right2 {
  background: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}
.scroll_right2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.l_h4 {
  font-weight: bold;
}
.chart_content {
  display: flex;
  margin-top: 50px;
}
.chart_left {
  width: 40%;
}
.chart_right {
  width: 58%;
  margin-left: 2%;
}
.red {
  color: green;
  margin-right: 4px;
}
.green {
  color: red;
  margin-right: 4px;
}
.item_con{
 width: 20%;
 margin-right: 50px;
}
.item_con2{
  width: 10%;
}
.item{
  border: 1px solid hsl(0, 9%, 90%);
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 5px;
  height: 180px;
}
.item_center{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.h4{
  font-size: 16px;
  font-weight: bold;
}
.h5{
  font-size: 14px;
  font-weight: bold;
}
.cen{
  width: 110px;
  text-align:start
}
.bottom_text{
  margin-top: 5px;
  color: rgb(173, 168, 168);
}
.item_content{
  width: 100%;
  display: flex;
  // justify-content: space-between;
  margin-top: 30px;
}
.h3{
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px;
}
.date_con{
  text-align: end;
}
.red{
  color: green;
  margin-right: 4px;
}
.green{
  color: red;
  margin-right: 4px;
}
.month_title{
  margin-top: 60px;
}
</style>
