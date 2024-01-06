<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" type="card">
      <TabPane label="客户预约日程" name="customerAppointmentSchedule">
        <div>
          <customerAppointmentSchedule
            :activeName="activeName"
          ></customerAppointmentSchedule>
        </div>
      </TabPane>
      <TabPane label="预约日历" name="appointmentData">
        <div>
          <appointmentData
            :activeName="activeName"
          ></appointmentData>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import customerAppointmentSchedule from "../components/customerAppointmentSchedule.vue"
import appointmentData from "../components/appointmentData.vue"

export default {
  components:{
    customerAppointmentSchedule,
    appointmentData,
  },
  data(){
    return {
      activeName: "customerAppointmentSchedule",
    }
  },
  methods:{
    
  }
}
</script>
