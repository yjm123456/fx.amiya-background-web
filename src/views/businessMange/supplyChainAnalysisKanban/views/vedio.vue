<template>
  <div>
    <Card :dis-hover="true">
      <Tabs ref="tabs2" v-model="active" type="card" v-if="isTab == true">
        <TabPane label="整体" name="whole">
          <div v-if="active === 'whole'">
            <whole
              :active="active"
              :activeName="activeNames"
              :params="params"
              ref="whole"
            ></whole>
          </div>
        </TabPane>
        <TabPane label="刀刀" name="daodao">
          <div v-if="active === 'daodao'">
            <daodao
              :active="active"
              :activeName="activeNames"
              :params="params"
            ></daodao>
          </div>
        </TabPane>
        <TabPane label="吉娜" name="jina">
          <div v-if="active === 'jina'">
            <jina
              :active="active"
              :activeName="activeNames"
              :params="params"
            ></jina>
          </div>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
import whole from "../components/whole.vue";
import daodao from "../components/daodao.vue";
import jina from "../components/jina.vue";
export default {
  props: {
    activeName: String,
    params: Object,
  },
  components: {
    whole,
    daodao,
    jina,
  },
  data() {
    return {
      active: "whole",
      isTab: false,
      activeNames:'vedio'
    };
  },
  methods: {},
  watch: {
    activeName: {
      handler(value) {
        if (value == "vedio") {
          this.$nextTick(() => {
            this.isTab = true;
          });
          this.active = "whole";
          this.activeNames = 'vedio'
          if(this.$refs.whole){
            this.$refs.whole.getData()
          }
        }
      },
      immediate: true,
    },
  },
};
</script>
