<template>
  <div>
    <!-- <Tabs ref="tabs" v-model="activeName">
      <TabPane label="业绩看板" name="performance">
        <div>
          <performance
            :activeName="activeName"
          ></performance>
        </div>
      </TabPane>
      <TabPane label="经营看板" name="operate">
        <div>
          <operate
            :activeName="activeName"
          ></operate>
        </div>
      </TabPane>
    </Tabs> -->
    <performance></performance>
  </div>
</template>
<script>
import performance from "./views/performance.vue"
import operate from "./views/operate.vue"

export default {
  components:{
    performance,
    operate,
  },
  data(){
    return {
      activeName: "performance",
    }
  },
  methods:{
    
  }
}
</script>
