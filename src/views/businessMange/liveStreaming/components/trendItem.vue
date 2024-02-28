<template>
  <div class="content">
    <div class="title">趋势看板</div>
    <Tabs ref="tabs" v-model="activeName" type="card" class="tabs">
      <TabPane label="公司" name="company">
        <lineChart
          title="公司"
          :activeName="activeName"
          v-if="activeName == 'company'"
          :params="params"
          ref="company"
        />
      </TabPane>
      <TabPane label="刀刀组" name="daodao">
        <lineChart
          title="刀刀组"
          :activeName="activeName"
          v-if="activeName == 'daodao'"
          :params="params"
          ref="company"
        />
      </TabPane>
      <TabPane label="吉娜组" name="jina">
        <lineChart
          title="吉娜组"
          :activeName="activeName"
          v-if="activeName == 'jina'"
          :params="params"
          ref="company"
        />
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import lineChart from "./lineChart.vue";

export default {
  props: {
    params: Object,
  },
  components: {
    lineChart,
  },
  data() {
    return {
      activeName: "company",
    };
  },
  methods: {
    
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
.tabs{
  margin-top: 30px;
}
</style>
