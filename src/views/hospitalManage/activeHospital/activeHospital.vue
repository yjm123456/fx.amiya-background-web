<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <DatePicker
                type="date"
                placeholder="开始时间"
                :value="query.startDate"
                v-model="query.startDate"
                style="width: 150px; "
              ></DatePicker>
              <DatePicker
                type="date"
                placeholder="结束时间"
                :value="query.endDate"
                v-model="query.endDate"
                style="width: 150px; margin-left: 10px"
              ></DatePicker>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getactiveHospitalList()"
            >查询</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
export default {
  data() {
    return {
      // 查询
      query: {
        startDate:this.$moment().startOf('year').format('YYYY-MM-DD'),
        endDate:this.$moment().format('YYYY-MM-DD'),
        columns: [
          {
            title: "医院",
            key: "hospitalName",
            align:'center'
          },
          {
            title: "派单数",
            key: "sendOrderCount",
            align:'center'
          },
          
        ],
        data: [],
        totalCount: 0,
      },

     
    };
  },
  methods: {
    // 获取活跃医院列表
    getactiveHospitalList() {
      
      const { startDate,endDate} = this.query;
      const data = { 
        startDate :this.$moment(startDate).format('YYYY-MM-DD'),
        endDate :this.$moment(endDate).format('YYYY-MM-DD'),
      };
      api.activeHospitalList(data).then((res) => {
        if (res.code === 0) {
          this.query.data = res.data.data;
        }
      });
    },
  
  },
  created() {
    this.getactiveHospitalList();
   
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>