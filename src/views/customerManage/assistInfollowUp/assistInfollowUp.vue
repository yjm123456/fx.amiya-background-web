<template>
  <div>
    <Tabs ref="tabs" v-model="activeName"> 
      <TabPane label="未处理追踪回访提报" name="unprocessedFollowUpCallSubmission">  
        <div>
          <unprocessedFollowUpCallSubmission
            :activeName="activeName" 
          ></unprocessedFollowUpCallSubmission>
        </div>
      </TabPane>
      <TabPane label="已处理追踪回访提报" name="processedFollowUpReport">
        <div>
          <processedFollowUpReport
            :activeName="activeName"
          ></processedFollowUpReport>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import unprocessedFollowUpCallSubmission from "./components/unprocessedFollowUpCallSubmission.vue"
import processedFollowUpReport from "./components/processedFollowUpReport.vue"

export default {
  components:{
    unprocessedFollowUpCallSubmission,
    processedFollowUpReport
  },
  data(){
    return {
      activeName: "unprocessedFollowUpCallSubmission",
    }
  },
  methods:{
    
  }
}
</script>
