<template>
  <div style="width:100%">
    <Card class="contents">
      <div class="title">趋势看板</div>
      <Tabs ref="tabs" v-model="activeName" type="card" style="width:100%;margin-top:30px">
        <TabPane label="公司" name="company">
          <lineChart
            title="公司"
            :activeName="activeName"
            v-if="activeName == 'company'"
            :params="params"
          />
        </TabPane>
        <TabPane label="刀刀组" name="daodao">
          <lineChart
            title="刀刀组"
            :activeName="activeName"
            v-if="activeName == 'daodao'"
            :params="params"
          />
        </TabPane>
        <TabPane label="吉娜组" name="jina">
          <lineChart
            title="吉娜组"
            :activeName="activeName"
            v-if="activeName == 'jina'"
            :params="params"
          />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
import lineChart from "./lineChart.vue";
export default {
  props:{
    params:Object
  },
  components: {
    lineChart,
  },
  data() {
    return {
      activeName: "company",
    };
  },
};
</script>
<style scoped lang="less">
.title {
  font-size: 18px;
  /* font-weight: bold; */
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
.contents {
  border-radius: 8px;
  width: 100%;
  border:2px solid #9abef8;
  position: relative;
  margin-bottom: 10px;
}
/deep/ .ivu-card,
.ivu-card-bordered,
.ivu-card-body {
  width: 100% !important;
}
</style>
