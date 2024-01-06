<template>
  <div>
    <Card :dis-hover="true">
      <div class="tab_con">
        <Tabs type="card" v-model="active" v-if="isTab === true" class="tabs">
            <TabPane label="业绩看板" name="performanceBoard">
              <div>
                <performanceBoard
                  :active="active"
                ></performanceBoard>
              </div>
            </TabPane>
            <TabPane label="经营看板" name="businessKanban">
              <div>
                <businessKanban
                  :active="active"
                ></businessKanban>
              </div>
            </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
import performanceBoard  from "./performanceBoard/performanceBoard.vue";
import businessKanban from "./businessKanban/businessKanban.vue"
export default {
  components:{
    performanceBoard,
    businessKanban
  },
  props: ["activeName"],
  data() {
    return {
      active:'performanceBoard',
      isTab:false,
      month:''
    };
  },
  methods: {
  },
  created() {
    
  },
  watch:{
    activeName: {
      handler(value) {
        if (value === "jina") {
          this.isTab = true
        }
      },
      immediate: true,
    },
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.tabs{
  margin-top: 10px;
}
.tab_con{
  position: relative;
  background: #f5f5f5;
}
.month_con{
  position: absolute;
  right: 5px;
  top: -12px;
}
</style>
