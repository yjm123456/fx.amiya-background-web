<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="待提报指标数据" name="indicatorsToBeReported">
        <div>
          <indicatorsToBeReported
            :activeName="activeName"
          ></indicatorsToBeReported>
        </div>
      </TabPane>
      <TabPane label="已提报指标数据" name="reportedIndicators">
        <div>
          <reportedIndicators
            :activeName="activeName"
          ></reportedIndicators>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import indicatorsToBeReported from "./indicatorsToBeReported/indicatorsToBeReported.vue"
import reportedIndicators from "./reportedIndicators/reportedIndicators.vue"

export default {
  components:{
    indicatorsToBeReported,
    reportedIndicators
  },
  data(){
    return {
      activeName: "indicatorsToBeReported",
    }
  },
  methods:{
    
  }
}
</script>
