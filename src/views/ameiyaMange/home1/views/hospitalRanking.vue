<template>
  <div>
    <Card style="width:100%">
      <div>排名方式：机构按运营健康指标进行排名</div>
      <div>计算方式：上门率权重50%，成交率权重20%，复购率权重30%</div>
    </Card>
    <Card style="margin:10px 0">
        <div class="date_con">
        <DatePicker
          type="month"
          placeholder="请选择年月"
          style="width: 160px;margin:0 10px"
          transfer
          :value="month"
          v-model="month"
        ></DatePicker>
        <Button type="primary" @click="getHospitalIndexDataHospitalData">查询</Button>
      </div>
      <tables></tables>
    </Card>
    <Card style="margin:10px 0">
      <div>本机构全国排名第 <span class="h5">2</span> 名</div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
import tables from "../components/table2.vue"
export default {

  props: ["activeName"],
  components: {
    tables,
  },
  data() {
    return {
      // 机构数据
      hospitalData:{

      },
      month: this.$moment().format("YYYY-MM"),
    };
  },
  methods: {
    moreClick(){
        this.$router.push("/hospitalSendOrderList");
      },
    
    // 机构数据
    getHospitalIndexDataHospitalData(){
      api.getHospitalIndexDataHospitalData().then((res) => {
        if(res.code === 0){
          this.hospitalData = res.data.hospitalData
        }
      })
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "hospitalRanking") {
          this.getHospitalIndexDataHospitalData()
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped lang="less">
.h5{
    font-size: 18px;
    color: red;
}
.date_con{
  text-align: right;
  margin-bottom: 10px;
  padding-right: 18px;
}
</style>