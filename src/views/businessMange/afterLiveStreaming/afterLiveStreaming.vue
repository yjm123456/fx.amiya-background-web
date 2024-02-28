<template>
  <div>
    
    <Card class="contents">
        <div class="title">业绩看板</div>
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
                <contentItem  :activeName="activeName" :params="params" ref="company" v-if="activeName == 'company'" @getData="getData"/>
                <pieItemVue :activeName="activeName" :params="params" ref="company" v-if="activeName == 'company'"/>
            </TabPane>
            <TabPane label="刀刀组" name="daodao">
                <contentItem  :activeName="activeName" :params="params" ref="daodao" v-if="activeName == 'daodao'"  @getData="getData"/>
                <pieItemVue :activeName="activeName"  :params="params" ref="daodao" v-if="activeName == 'daodao'"/>
            </TabPane>
            <TabPane label="吉娜组" name="jina">
                <contentItem  :activeName="activeName" :params="params" ref="jina" v-if="activeName == 'jina'"  @getData="getData"/>
                <pieItemVue :activeName="activeName" :params="params" ref="jina" v-if="activeName == 'jina'"/>
            </TabPane>
        </Tabs>
    </Card>
    <!-- 趋势看板 -->
    <Card class="contents">
      <trendItem ref="lineData" :params="params"/>
    </Card>
  </div>
</template>
<script>
import contentItem from "./components/item.vue";
import pieItemVue from './components/pieItem.vue';
import trendItem from "./components/trendItem.vue"
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";
import * as api from "@/api/newBusinessDashboard";

export default {
  components: {
    contentItem,
    trendItem,
    pieItemVue
  },
  data() {
    return {
      params: {
        month: this.$moment().format("YYYY-MM"),
        // 获取基础主播数据
        liveAnchorBaseInfos: [],
        // 业绩数据
        afterPerformance:{}
      },
      activeName:'company'
    };
  },
  methods: {
    // 查询
    getLiveAnchorBaseInfoValid() {
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const { liveAnchorBaseInfos } = res.data;
          this.params.liveAnchorBaseInfos = liveAnchorBaseInfos;
          this.$nextTick(() => {
            this.getData()
            // this.$refs.lineData.getData()
          });
        }
      });
    },
    
    // 获取业绩数据(公司)
    getData() {
      if (!this.params.month) {
        this.$Message.warning("请选择日期！");
        return;
      }
      const data = {
        year: this.$moment(this.params.month).format("YYYY"),
        month: this.$moment(this.params.month).format("MM"),
        baseLiveAnchorId: this.activeName == "daodao" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "刀刀").id : this.activeName == "jina" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "吉娜").id : '',
        isSelfLiveanchor:this.activeName == 'daodao' || this.activeName == 'jina' ? true : '',
      };

      api.getAfterLivingBusinessData(data).then((res) => {
        if (res.code == 0) {
          this.params.afterPerformance = res.data.data;
        }
      });
    },
   
    
  },
  created(){
    this.getLiveAnchorBaseInfoValid()
  }
};
</script>

<style scoped>
.item_content {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.item {
  width: 49.5%;
}

.contents{
  border:2px solid #9abef8;
  border-radius: 8px;
  position: relative;
  margin-bottom: 10px;
}
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
.top {
  text-align: end;
}
</style>
