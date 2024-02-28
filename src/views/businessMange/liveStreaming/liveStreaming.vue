<template>
  <div>
    <Card>
      <div class="top">
        <div class="title">直播中（带货）</div>
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
      <div class="item_content">
        <Card class="item">
          <item title="公司" :params="params" ref="company"/>
        </Card>
        <Card class="item">
          <item title="吉娜组" :params="params" ref="jina"/>
        </Card>
      </div>
      <div class="item_content">
        <Card class="item">
          <item title="刀刀组" :params="params" ref="daodao"/>
        </Card>
        <Card class="item">
          <trendItem :params="params" ref="lineData"/>
        </Card>
      </div>
    </Card>
  </div>
</template>
<script>
import item from "./components/item.vue";
import trendItem from "./components/trendItem.vue";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";

export default {
  components: {
    item,
    trendItem,
  },
  data() {
    return {
      params: {
        month: this.$moment().format("YYYY-MM"),
        // 获取基础主播数据
        liveAnchorBaseInfos: [],
       
      },
    };
  },
  methods: {
    // 获取基础主播
    getData() {
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const { liveAnchorBaseInfos } = res.data;
          this.params.liveAnchorBaseInfos = liveAnchorBaseInfos;
          this.$nextTick(() => {
            this.$refs.company.getData()
            this.$refs.daodao.getData()
            this.$refs.jina.getData()
            this.$refs.lineData.$refs.company.getData()
          
          });
        }
      });
    },
    
  },
  created(){
    this.getData()
  }
};
</script>

<style scoped>
.item_content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.item {
  width: 49.5%;
  border:2px solid #9abef8;
  border-radius: 8px;
  position: relative;
}
.top {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
}
</style>
