<template>
    <div>
        <!-- <div class="top">
          <div class="title">今日未处理任务</div>
          <div class="more" @click="moreClick">更多></div>
        </div> -->
        <Table border :columns="query.columns" :data="query.data"></Table>
    </div>
</template>
<script>
import * as api from "@/api/hospitalManage";

export default {
    data(){
        return{
            // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "派单状态",
            key: "orderStatusText",
          },
          {
            title: "处理状态",
            key: "processStatus",
          },
          {
            title: "项目名称",
            key: "item",
          },
          {
            title: "用户信息",
            key: "userInfo",
          },
          {
            title: "最后更新内容",
            key: "lastFollowContent",
          },
          
        ],
        data: [],
      },
        }
    },
    methods:{
      moreClick(){
        this.$router.push("/hospitalSendOrderList");
      },
        // 获取医院获取今日未处理任务
        getTodayNotRepeatedSendOrders() {
            api.getTodayNotRepeatedSendOrder().then((res) => {
                if (res.code === 0) {
                    this.query.data = res.data.todayNoRepeatedSendOrder;
                }
            });
        },
    },
    created(){
        this.getTodayNotRepeatedSendOrders()
    }
}
</script>
<style scoped>
.top{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.title{
  font-size: 16px;
  font-weight: bold;
}
.more{
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
