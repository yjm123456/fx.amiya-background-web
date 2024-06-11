<template>
  <div class="container">
    <!-- 助理运营情况 -->
        <Table border :columns="title == '新客' ? query.columns:query2.columns" :data="assistantOperationsData"></Table>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    activeName: String,
    title: String,
    assistantOperationsData:Array
  },
  data() {
    return {
      query: {
        columns: [
          {
            title: "分组",
            key: "assistantName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "派单量",
            key: "sendOrder",
            minWidth: 100,
            align: "center",
          },
          {
            title: "派单目标",
            key: "sendOrderTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "派单目标达成率",
            key: "sendOrderTargetComplete",
            minWidth: 160,
            align: "center",
          },
          {
            title: "上门量",
            key: "toHospital",
            minWidth: 100,
            align: "center",
          },
          {
            title: "上门目标",
            key: "toHospitalTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "上门达成率",
            key: "toHospitalTargetComplete",
            minWidth: 130,
            align: "center",
          },
          {
            title: "成交量",
            key: "deal",
            minWidth: 100,
            align: "center",
          },
          {
            title: "成交目标",
            key: "dealTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交达成率",
            key: "dealTargetComplete",
            minWidth: 130,
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
            key: "assistantName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "上门量",
            key: "toHospital",
            minWidth: 100,
            align: "center",
          },
          {
            title: "上门目标",
            key: "toHospitalTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "上门达成率",
            key: "toHospitalTargetComplete",
            minWidth: 130,
            align: "center",
          },
          {
            title: "成交量",
            key: "deal",
            minWidth: 100,
            align: "center",
          },
          {
            title: "成交目标",
            key: "dealTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交达成率",
            key: "dealTargetComplete",
            minWidth: 130,
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
