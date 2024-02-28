<template>
  <div >
    <!-- 内容 -->
    <div class="item_content">
      <div class="item">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.totalPerformance}}</div>
            <div class="rising_powder_name">总业绩</div>
          </div>
          <div class="icon_back">
            <i
              class="iconfont icon-zongyeji rising_powder_icon icon_one"
            ></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div>
              <div class="h5_bold">{{params.afterPerformance.totalPerformanceTarget}}</div>
              <div class="h6">目标</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.totalPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.totalPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.totalPerformanceChainRatio ? params.afterPerformance.totalPerformanceChainRatio : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
            <div>
              <div class="h5_bold" :style="{color: !params.afterPerformance.totalPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.totalPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.totalPerformanceCompleteRate ? params.afterPerformance.totalPerformanceCompleteRate : '-'}}%</div>
              <div class="h6">达成率</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.totalPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.totalPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.totalPerformanceYearOnYear ? params.afterPerformance.totalPerformanceYearOnYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
        <div class="increase_content">
          <div class="increase_item">
            <div class="increase_green"></div>
            <div class="increase_title">增长</div>
          </div>
          <div class="increase_item">
            <div class="increase_red"></div>
            <div class="increase_title">下降</div>
          </div>
        </div>
      </div>

      <div class="item2">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.newCustomerPerformance}}</div>
            <div class="rising_powder_name">新客业绩</div>
          </div>
          <div class="icon_back2">
            <i class="iconfont icon-yuangongyejibaobiao icon_one"></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div>
              <div class="h5_bold">{{params.afterPerformance.newCustomerPerformanceTarget}}</div>
              <div class="h6">目标</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.newCustomerPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.newCustomerPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.newCustomerPerformanceChainRatio ? params.afterPerformance.newCustomerPerformanceChainRatio : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
            <div>
              <div class="h5_bold" :style="{color: !params.afterPerformance.newCustomerPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.newCustomerPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.newCustomerPerformanceCompleteRate ? params.afterPerformance.newCustomerPerformanceCompleteRate : '-'}}%</div>
              <div class="h6">完成率</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.newCustomerPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.newCustomerPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.newCustomerPerformanceYearOnYear ? params.afterPerformance.newCustomerPerformanceYearOnYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
        <div class="increase_content">
          <div class="increase_item">
            <div class="increase_green"></div>
            <div class="increase_title">增长</div>
          </div>
          <div class="increase_item">
            <div class="increase_red"></div>
            <div class="increase_title">下降</div>
          </div>
        </div>
      </div>

      <div class="item3">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.oldCustomerPerformance}}</div>
            <div class="rising_powder_name">老客业绩</div>
          </div>
          <div class="icon_back3">
            <i class="iconfont icon-yuangongyeji1 rising_powder_icon "></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div>
              <div class="h5_bold">{{params.afterPerformance.oldCustomerPerformanceTarget}}</div>
              <div class="h6">目标</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.oldCustomerPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.oldCustomerPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.oldCustomerPerformanceChainRatio ? params.afterPerformance.oldCustomerPerformanceChainRatio : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
            <div>
              <div class="h5_bold" :style="{color: !params.afterPerformance.oldCustomerPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.oldCustomerPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.oldCustomerPerformanceCompleteRate ? params.afterPerformance.oldCustomerPerformanceCompleteRate : '-'}}%</div>
              <div class="h6">达成率</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.oldCustomerPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.oldCustomerPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.oldCustomerPerformanceYearOnYear ? params.afterPerformance.oldCustomerPerformanceYearOnYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
        <div class="increase_content">
          <div class="increase_item">
            <div class="increase_green"></div>
            <div class="increase_title">增长</div>
          </div>
          <div class="increase_item">
            <div class="increase_red"></div>
            <div class="increase_title">下降</div>
          </div>
        </div>
      </div>

      <div class="item4">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.effectivePerformance}}</div>
            <div class="rising_powder_name">有效业绩</div>
          </div>
          <div class="icon_back4">
            <i class="iconfont icon-yeji rising_powder_icon icon_one"></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div>
              <div class="h5_bold">{{params.afterPerformance.effectivePerformanceTarget}}</div>
              <div class="h6">目标</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.effectivePerformanceToDateSchedule  ? '#636060' : params.afterPerformance.effectivePerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.effectivePerformanceChainRatio ? params.afterPerformance.effectivePerformanceChainRatio : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
            <div>
              <div class="h5_bold" :style="{color: !params.afterPerformance.effectivePerformanceToDateSchedule  ? '#636060' : params.afterPerformance.effectivePerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.effectivePerformanceCompleteRate ? params.afterPerformance.effectivePerformanceCompleteRate : '-'}}%</div>
              <div class="h6">达成率</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.effectivePerformanceToDateSchedule  ? '#636060' : params.afterPerformance.effectivePerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.effectivePerformanceYearOnYear ? params.afterPerformance.effectivePerformanceYearOnYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
        <div class="increase_content">
          <div class="increase_item">
            <div class="increase_green"></div>
            <div class="increase_title">增长</div>
          </div>
          <div class="increase_item">
            <div class="increase_red"></div>
            <div class="increase_title">下降</div>
          </div>
        </div>
      </div>

      <div class="item5">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.potentialPerformance}}</div>
            <div class="rising_powder_name">潜在业绩</div>
          </div>
          <div class="icon_back5">
            <i
              class="iconfont icon-yejifenxi1 rising_powder_icon rising_powder_icon"
            ></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div>
              <div class="h5_bold">{{params.afterPerformance.potentialPerformanceTarget}}</div>
              <div class="h6">目标</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.potentialPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.potentialPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.potentialPerformanceChainRatio ? params.afterPerformance.potentialPerformanceChainRatio : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
            <div>
              <div class="h5_bold" :style="{color: !params.afterPerformance.potentialPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.potentialPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.potentialPerformanceCompleteRate ? params.afterPerformance.potentialPerformanceCompleteRate : '-'}}%</div>
              <div class="h6">达成率</div>
            </div>
            <div class="date_mr">
              <div class="h5_bold" :style="{color: !params.afterPerformance.potentialPerformanceToDateSchedule  ? '#636060' : params.afterPerformance.potentialPerformanceToDateSchedule > 0 ?'green' : 'red'}">{{params.afterPerformance.potentialPerformanceYearOnYear ? params.afterPerformance.potentialPerformanceYearOnYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
        <div class="increase_content">
          <div class="increase_item">
            <div class="increase_green"></div>
            <div class="increase_title">增长</div>
          </div>
          <div class="increase_item">
            <div class="increase_red"></div>
            <div class="increase_title">下降</div>
          </div>
        </div>
      </div>

      <div class="item6">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.newCustomerEffectivePerformance}}</div>
            <div class="rising_powder_name">新客有效业绩</div>
          </div>
          <div class="icon_back6">
            <i class="iconfont icon-yuangongyeji2 rising_powder_icon icon_one"></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div class="date_mr">
              <div class="h5_bold" >{{params.afterPerformance.newCustomerEffectivePerformanceChain ? params.afterPerformance.newCustomerEffectivePerformanceChain : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
            <div>
              <div class="h5_bold" >{{params.afterPerformance.newCustomerEffectivePerformanceYearToYear ? params.afterPerformance.newCustomerEffectivePerformanceYearToYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
        
      </div>

      <div class="item7">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.newCustomerPotentialPerformance}}</div>
            <div class="rising_powder_name">新客潜在业绩</div>
          </div>
          <div class="icon_back7">
            <i class="iconfont icon-kehuguanli rising_powder_icon rising_powder_icon"></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div class="date_mr">
              <div class="h5_bold" >{{params.afterPerformance.newCustomerPotentialPerformanceChain ? params.afterPerformance.newCustomerPotentialPerformanceChain : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
            <div class="date_mr">
              <div class="h5_bold" >{{params.afterPerformance.newCustomerPotentialPerformanceYearToYear ? params.afterPerformance.newCustomerPotentialPerformanceYearToYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
        
      </div>

      <div class="item8">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.oldCustomerEffectivePerformance}}</div>
            <div class="rising_powder_name">老客有效业绩</div>
          </div>
          <div class="icon_back8">
            <i class="iconfont icon-yuangongyeji rising_powder_icon icon_one"></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div class="date_mr">
              <div class="h5_bold" >{{params.afterPerformance.oldCustomerEffectivePerformanceChain ? params.afterPerformance.oldCustomerEffectivePerformanceChain : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
           
            <div class="date_mr">
              <div class="h5_bold" >{{params.afterPerformance.oldCustomerEffectivePerformanceYearToYear ? params.afterPerformance.oldCustomerEffectivePerformanceYearToYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
        
      </div>

      <div class="item9">
        <div class="item_icon_con">
          <div>
            <div class="rising_powder">{{params.afterPerformance.oldCustomerPotentialPerformance}}</div>
            <div class="rising_powder_name">老客潜在业绩</div>
          </div>
          <div class="icon_back9">
            <i class="iconfont icon-icon_jianlibu-kaohezhuanyuanzhuanyongye rising_powder_icon icon_one"></i>
          </div>
        </div>
        <div class="data_content">
          <div class="bor">
            <div class="date_mr">
              <div class="h5_bold" >{{params.afterPerformance.oldCustomerPotentialPerformanceChain ? params.afterPerformance.oldCustomerPotentialPerformanceChain : '-'}}%</div>
              <div class="h6">环比</div>
            </div>
          </div>
          <div>
            <div class="date_mr">
              <div class="h5_bold" >{{params.afterPerformance.oldCustomerPotentialPerformanceYearToYear ? params.afterPerformance.oldCustomerPotentialPerformanceYearToYear : '-'}}%</div>
              <div class="h6">同比</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {},
  props: {
    params: Object,
    activeName:String
  },
  data() {
    return {
      
      
    };
  },
  methods: {
    
  },
  watch: {
    activeName: {
      handler(value) {
        // this.getData()
        this.$emit("getData")
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.item,
.item2,
.item3,
.item4,
.item5,
.item6,
.item7,
.item8,
.item9{
  /* width: 140px; */
  width: 10%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
}
.item {
  background-image: linear-gradient(to bottom, #e8efff, #fff);
}
.item2 {
  background-image: linear-gradient(to bottom, #e9fffe, #fff);
}
.item3 {
  background-image: linear-gradient(to bottom, #edfff3, #fff);
}
.item4 {
  background-image: linear-gradient(to bottom, #fff4fc, #fff);
}
.item5 {
  background-image: linear-gradient(to bottom, #fff1f3, #fff);
}
.item6 {
  background-image: linear-gradient(to bottom, #fffae6, #fff);
}
.item7 {
  background-image: linear-gradient(to bottom, #eef9ff, #fff);
}
.item8 {
  background-image: linear-gradient(to bottom, #f5ffef, #fff);
}
.item9 {
  background-image: linear-gradient(to bottom, #fff8ef, #fff);
}
.item_icon_con {
  display: flex;
  justify-content: space-between;
}
.rising_powder {
  font-size: 22px;
  font-weight: bold;
}
.rising_powder_name {
  font-size: 13px;
  color: #979797;
}
.icon_back,
.icon_back2,
.icon_back3,
.icon_back4,
.icon_back5,
.icon_back6,
.icon_back7,
.icon_back8,
.icon_back9 {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 50%;
  opacity: 0.8;
  color: #8db1e0;
}
.icon_back {
  background: #dbeafd;
}
.icon_back2 {
  background: #d1fbf9;
}
.icon_back3 {
  background: #daffe7;
}
.icon_back4 {
  background: #ffeaf8;
}
.icon_back5 {
  background: #ffe3e8;
}
.icon_back6 {
  background: #fff6d0;
}
.icon_back7 {
  background: #dcf2ff;
}
.icon_back8 {
  background: #E8FFD7;
}
.icon_back9 {
  background: #FFEFDE;
}
.rising_powder_icon {
  font-size: 22px;
}
.icon_one {
  font-size: 18px !important;
}
.data_content {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
.bor {
  width: 50%;
  border-right: 1px solid #d9d9d9;
}
.h5_bold {
  font-size: 14px;
  font-weight: bold;
  color: #636060;
}
.h6 {
  font-size: 10px;
}
.date_mr {
  margin-top: 5px;
}
.increase_green,
.increase_red {
  width: 6px;
  height: 6px;

  border-radius: 50%;
}
.increase_green {
  background: #008000;
}
.increase_red {
  background: #ff0000;
}
.increase_title {
  font-size: 10px;
  color: #979797;
}
.increase_item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.increase_content {
  display: flex;
  margin-top: 10px;
}
.item_content {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.m_r{
  margin-top: 45px;
}
</style>
