<template>
  <div class="container">
    <!-- 获客情况 -->
        <Table border :columns="query.columns" :data="companyCustomerAcquisition"></Table>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    activeName: String,
    companyCustomerAcquisition:Array
  },
  data() {
    return {
      query: {
        columns: [
          {
            title: "分组",
            key: "groupName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "下卡量",
            key: "orderCard",
            minWidth: 100,
            align: "center",
          },
          {
            title: "下卡目标",
            key: "orderCardTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "下卡目标完成率",
            key: "orderCardTargetComplete",
            minWidth: 180,
            align: "center",
          },
          {
            title: "退卡量",
            key: "refundCard",
            minWidth: 100,
            align: "center",
          },
          {
            title: "下卡异常",
            key: "orderCardError",
            minWidth: 120,
            align: "center",
          },
          {
            title: "分诊量",
            key: "allocationConsulation",
            minWidth: 100,
            align: "center",
          },
          {
            title: "分诊目标",
            key: "allocationConsulationTarget",
            minWidth: 100,
            align: "center",
          },

          {
            title: "加微量",
            key: "addWechat",
            minWidth: 100,
            align: "center",
          },
          {
            title: "加微目标",
            key: "addWechatTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "加微达成率",
            key: "addWechatTargetComplete",
            minWidth: 150,
            align: "center",
          },
         
          
        ],
        data: [],
        totalCount: 0,
      },
      query2: {
        columns: [
          {
            title: "分组",
            key: "groupName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "新客业绩",
            key: "currentMonthNewCustomerPerformance",
            minWidth: 120,
            align: "center",
          },
          {
            title: "新客业绩目标",
            key: "newCustomerPerformanceTarget",
            minWidth: 160,
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
            minWidth: 120,
            align: "center",
          },
          {
            title: "老客业绩目标",
            key: "oldCustomerTarget",
            minWidth: 160,
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
            minWidth: 100,
            align: "center",
          },

          {
            title: "总业绩目标",
            key: "totalPerformanceTarget",
            minWidth: 150,
            align: "center",
          },
          {
            title: "总业绩目标完成率",
            key: "totalPerformanceTargetComplete",
            minWidth: 180,
            align: "center",
          },
         
          
        ],
        data: [],
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
