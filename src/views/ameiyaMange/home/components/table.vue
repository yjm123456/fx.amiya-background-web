<template>
    <div>
      <!-- 今日未处理数据 -->
        <Table border :columns="query.columns" :data="todayNoRepeatedSendOrder" height="320"></Table>
    </div>
</template>
<script>

export default {
  props:{
    todayNoRepeatedSendOrder:Array
  },
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
        
    },
   
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
