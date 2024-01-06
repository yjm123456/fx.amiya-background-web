<template>
  <div>
    <Card class="container">
      <div>
        <div class="date_con">
            <DatePicker
            type="month"
            placeholder="请选择年月"
            style="width: 160px;margin:0 10px"
            transfer
            :value="month"
            v-model="month"
            ></DatePicker>
            <Button type="primary" @click="getDataChange">查询</Button>
        </div>
        <div class="h2">全国合作机构TOP10运营健康指标</div>
        <hospital :hospitalListData="hospitalListData"></hospital>
        <div class="h2">全国合作城市TOP10运营健康指标</div>
        <city :cityListData="cityListData"></city>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalAchievement";
import hospital from "./components/hospital.vue"
import city from "./components/city.vue"
export default {
    props: ["activeName"],
    components:{
        hospital,
        city
    },
  data() {
    return {
        month:this.$moment().format("YYYY-MM"),
        hospitalListData:[],
        cityListData:[]
    };
  },
  methods: {
    getDataChange(){
        this.getHospitalOperationMonthlyData()
        this.getCityOperationMonthlyData()
    },
    // 全国机构运营数据
    getHospitalOperationMonthlyData() {
      let str= String(this.$moment(this.month).format("MM"))
      let month = str.substr(str.length - 1, 1)
      if(!this.month ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month).format("YYYY") ? this.$moment(this.month).format("YYYY") : null,
        month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
        isCity:false
      }
      api.getHospitalOperationMonthlyData(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.hospitalListData = performance;
        }
      });
    },
    // 全国城市运营数据
    getCityOperationMonthlyData() {
      let str= String(this.$moment(this.month).format("MM"))
      let month = str.substr(str.length - 1, 1)
      if(!this.month ){
        this.$Message.warning('请选择日期')
        return
      }
      const data = {
        year:this.$moment(this.month).format("YYYY") ? this.$moment(this.month).format("YYYY") : null,
        month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
        isCity:true
      }
      api.getHospitalOperationMonthlyData(data).then((res) => {
        if (res.code === 0) {
          const { performance } = res.data;
          this.cityListData = performance;
        }
      });
    },
  },
  created() {
  },
  watch:{
    activeName: {
      handler(value) {
        if (value === "wholeCountry") {
          this.isTab = true
          this.getHospitalOperationMonthlyData()
          this.getCityOperationMonthlyData()
        }
      },
      immediate: true,
    },
  }
};
</script>
<style lang="less" scoped>
.h2{
    color: #000;
    font-size: 20px;
    font-weight: bold;
}
.date_con{
    display: flex;
    justify-content: flex-end;
}
</style>