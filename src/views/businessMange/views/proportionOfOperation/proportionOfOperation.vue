<template>
  <div >
    <Card :dis-hover="true">
      <div class="tab_con">
        <Tabs type="card" v-model="active" v-if="isTab === true" class="tabs">
            <TabPane label="城市占比" name="cityProportion">
              <div>
                <cityProportion
                  :active="active"
                ></cityProportion>
              </div>
            </TabPane>
            <TabPane label="机构占比" name="hospitalProportion">
              <div>
                <hospitalProportion
                  :active="active"
                ></hospitalProportion>
              </div>
            </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
import cityProportion  from "./cityProportion/cityProportion.vue";
import hospitalProportion from "./hospitalProportion/hospitalProportion.vue"
export default {
  components:{
    cityProportion,
    hospitalProportion
  },
  props: ["activeName"],
  data() {
    return {
      active:'cityProportion',
      isTab:false,
    };
  },
  methods: {
    
  },
  created() {
    
  },
  watch:{
    activeName: {
      handler(value) {
        if (value === "proportionOfOperation") {
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
