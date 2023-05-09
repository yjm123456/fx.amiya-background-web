<template>
  <div>
    <!-- <Card style="width:100%">
      <div>排名方式：机构按运营健康指标进行排名</div>
      <div>计算方式：上门率权重50%，成交率权重20%，复购率权重30%</div>
    </Card> -->
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
        <Button type="primary" @click="getRankData">查询</Button>
      </div>
      <hospitalTable :rankList="rankList"></hospitalTable>
    </Card>
    <Card style="margin:10px 0">
      <div>
        本机构全国排名第 <span class="h5">{{myRank == null ? '-' : myRank.rank}}</span> 名
        <Tooltip placement="top">
            <i class="iconfont icon-guize guize"></i>
            <div slot="content" >
                <p >排名方式：按运营健康指标进行排名</p>
                <p >计算方式：上门率权重50%，成交率</p>
                <p >权重20%，复购率权重30%</p>
            </div>
        </Tooltip>
        <!-- <Poptip trigger="hover" title="排名方式：机构按运营健康指标进行排名" content="计算方式：上门率权重50%，成交率权重20%，复购率权重30%">
          <i class="iconfont icon-guize guize"></i>
      </Poptip> -->
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalBoard";
import hospitalTable from "../components/hospitalTable.vue"
export default {

  props: ["activeName"],
  components: {
    hospitalTable,
  },
  data() {
    return {
      // 机构数据
      rankList:[],
      // 总排名
      myRank:0,
      month: this.$moment().format("YYYY-MM"),
    };
  },
  methods: {
    // 机构数据
    getRankData(){
      const data = {
        year:this.$moment(this.month).format("YYYY"),
        month:this.$moment(this.month).format("MM"),
      }
      api.getRankData(data).then((res) => {
        if(res.code === 0){
          const {myRank,rankList} = res.data.rankData
          this.rankList = rankList ? rankList : []
          this.myRank = myRank
        }
      })
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "hospitalRanking") {
          this.getRankData()
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
.guize{
  margin-left: 10px;
  color: #2d8cf0;
}
</style>