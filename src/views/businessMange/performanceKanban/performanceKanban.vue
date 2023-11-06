<template>
  <div class="container_con">
    <div class="date_con">
      <DatePicker
        type="month"
        placeholder="请选择年月"
        style="width: 160px;margin:0 10px"
        transfer
        :value="month"
        v-model="month"
      ></DatePicker>
      <Button type="primary" @click="search">查询</Button>
    </div>
     <!-- 达人业绩 -->
    <div class="item">
      <item :cooperateLiveAnchorPerformanceDataList ="cooperateLiveAnchorPerformanceDataList"/>
    </div>
    <!-- 机构排名 -->
    <hospital :cooperatehospitalRankList="cooperatehospitalRankList"/>
  </div>
</template>
<script>
import * as api from "@/api/cooperateLiveAnchorAchievement";

import item from "./components/item.vue";
import hospital from "./components/hospital.vue";
export default {
  components: {
    item,
    hospital
  },
  data() {
    return {
        // 日期
        month: this.$moment().format("YYYY-MM"),
        // 达人业绩数据
        cooperateLiveAnchorPerformanceDataList:[],
        // 机构排名数据
        cooperatehospitalRankList:[]
    };
  },
  methods: {
    // 查询
    search(){
        this.getcooperateLiveAnchorPerformanceData();
        this.getcooperatehospitalRank()
    },
    // 获取合作达人业绩
    getcooperateLiveAnchorPerformanceData(){
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM"))? this.$moment(this.month).format("MM") : null,
        }
        api.cooperateLiveAnchorPerformanceData(data).then(res=>{
            if(res.code ==0){
                const {data} = res.data
                data.map((item,index) => {
                    if(item.liveanchorName == '整体业绩'){
                        data.unshift(data.splice(index , 1)[0]);
                    }
                })
                this.cooperateLiveAnchorPerformanceDataList = data
            }
        })
    },
    // 机构排名
    getcooperatehospitalRank(){
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM"))? this.$moment(this.month).format("MM") : null,
        }
        api.cooperatehospitalRank(data).then(res=>{
            if(res.code ==0){
                const {data} = res.data
                this.cooperatehospitalRankList = data
            }
        })
    }
  },
  created() {
    this.search()
  },
};
</script>
<style scoped>
.item {
  background: #e9ebef;
  border-radius: 5px;
  padding: 20px 1%;

}
.date_con{
    text-align: end;
    margin: 10px 1% 20px 0;
}
</style>
