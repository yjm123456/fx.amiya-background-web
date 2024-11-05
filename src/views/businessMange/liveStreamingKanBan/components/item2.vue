<template>
  <div class="center_content">
    <div class="center_item">
      <div class="item1">
        <div class="h2">
          直播中线索
        </div>
        <div class="h1">{{liveStreamingObj.clueCount ? liveStreamingObj.clueCount : 0}}</div>
      </div>
      <div class="item2">
        <div class="h2">
          新客业绩
        </div>
        <div class="h1">{{liveStreamingObj.performance ? liveStreamingObj.performance : 0}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/amiyaLivingOperationBoard";

export default {
  props: {
    params: Object,
    title:String
  },
  data() {
    return {
      liveStreamingObj: {},
    };
  },
  methods: {
    
    // 获取直播中客资
    getLivingCustomerAndPerformanceDatas() {
      const { startDate, endDate, baseLiveAnchorId } = this.params;
      const data = {
        startDate: startDate? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        baseLiveAnchorId: baseLiveAnchorId,
      };
      api.getLivingCustomerAndPerformanceData(data).then((res) => {
        if (res.code === 0) {
          this.liveStreamingObj = res.data.data;
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
  justify-content: center;
  text-align: center;
  color: #fff;
}
.item1,
.item2 {
  width: 30%;
  margin: 10px 5%;
  padding: 15px 0;
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

.h1{
  font-size: 20px;
  font-weight: bold;
}
.h2 {
  font-size: 16px;
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
</style>
