<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="下单平台派单" name="hospitalDispatch">
        <div>
          <hospitalDispatch
            :activeName="activeName"
          ></hospitalDispatch>
        </div>
      </TabPane>
      <TabPane label="内容平台派单" name="hospitalContentPlatform">
        <div>
          <hospitalContentPlatform
            :activeName="activeName"
          ></hospitalContentPlatform>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import hospitalDispatch from "./components/hospitalDispatch.vue"
import hospitalContentPlatform from "./components/hospitalContentPlatform.vue"

export default {
  components:{
    hospitalDispatch,
    hospitalContentPlatform
  },
  data(){
    return {
      activeName: "hospitalDispatch",
    }
  },
  methods:{
    
  },
  
}
</script>
