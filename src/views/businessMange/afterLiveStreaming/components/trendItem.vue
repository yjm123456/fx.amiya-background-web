<template>
  <div class="content">
    <div class="title">趋势看板</div>
    <div class="top">
      <div class="date_con">
        <DatePicker
          type="month"
          placeholder="请选择年月"
          style="width: 160px;margin:0 10px"
          transfer
          :value="params.month"
          v-model="params.month"
        ></DatePicker>
        <Button type="primary" @click="getData">查询</Button>
      </div>
    </div>
    <Tabs ref="tabs" v-model="activeName" type="card" class="tabs">
      <TabPane label="公司" name="company">
        <lineChart
          :activeName="activeName"
          v-if="activeName == 'company'"
          :brokenData="brokenData"
        />
      </TabPane>
      <TabPane label="刀刀组" name="daodao">
        <lineChart
          :activeName="activeName"
          v-if="activeName == 'daodao'"
          :brokenData="brokenData"
        />
      </TabPane>
      <TabPane label="吉娜组" name="jina">
        <lineChart
          :activeName="activeName"
          v-if="activeName == 'jina'"
          :brokenData="brokenData"
        />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import * as api from "@/api/newBusinessDashboard";

import lineChart from "./lineChart.vue";
export default {
  props: { params: Object },
  components: {
    lineChart,
  },
  data() {
    return {
      activeName: "company",
      // 趋势看板数据
      brokenData:{}
      
    };
  },
  methods: {
    // 获取业绩数据
    getData() {
      if (!this.params.month) {
        this.$Message.warning("请选择日期！");
        return;
      }
      const data = {
        year: this.$moment(this.params.month).format("YYYY"),
        month:this.$moment(this.params.month).format("MM"),
        baseLiveAnchorId: this.activeName == "daodao" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "刀刀").id : this.activeName == "jina" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "吉娜").id : '',
        isSelfLiveanchor:this.activeName == 'daodao' || this.activeName == 'jina' ? true : '',
      };
      api.getAfterLivingBrokenData(data).then((res) => {
        if (res.code == 0) {
          this.brokenData = res.data.brokenData;
        }
      });
    },
  },
  watch: {
    activeName: {
      handler(value) {
        // this.getData()
        this.getData()
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 18px;
  width: 100px;
  height: 32px;
  background: #478bfc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 6px;
}
.content {
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}

.top {
  text-align: end;
}
</style>
