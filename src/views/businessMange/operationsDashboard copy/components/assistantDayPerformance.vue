<template>
  <div class="container">
    <!-- 助理业绩情况 -->
        <Table border :columns="query.columns" :data="assistantformanceData"></Table>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    activeName: String,
    assistantformanceData:Array
  },
  data() {
    return {
      query: {
        columns: [
          {
            title: "助理",
            key: "assistantName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "新客业绩",
            key: "currentMonthNewCustomerPerformance",
            minWidth: 150,
            align: "center",
          },
          {
            title: "新客业绩目标",
            key: "newCustomerPerformanceTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "新客业绩目标达成率",
            key: "newCustomerPerformanceTargetComplete",
            minWidth: 180,
            align: "center",
          },
          {
            title: "老客业绩",
            key: "currentMonthOldCustomerPerformance",
            minWidth: 150,
            align: "center",
          },
          {
            title: "老客业绩目标",
            key: "oldCustomerTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "老客业绩目标达成率",
            key: "oldCustomerTargetComplete",
            minWidth: 180,
            align: "center",
          },
          {
            title: "总业绩",
            key: "totalPerformance",
            minWidth: 180,
            align: "center",
          },

          {
            title: "总业绩目标",
            key: "totalPerformanceTarget",
            minWidth: 130,
            align: "center",
          },
          {
            title: "总业绩目标完成率",
            key: "totalPerformanceTargetComplete",
            minWidth: 150,
            align: "center",
          },
        ],
        data: [],
        totalCount: 0,
      },
      
    };
  },
  methods: {
   
   
  },
  created() {
    
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "amyBusinessKanBan") {
         
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.content{
    width: 49.5%;
}
.title{
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-bottom: 10px;
}
</style>
