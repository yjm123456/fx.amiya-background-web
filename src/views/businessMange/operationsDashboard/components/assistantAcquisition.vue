<template>
  <div class="container">
    <!-- 助理获客情况 -->
        <Table border :columns="query.columns" :data="assistantAcquisitionData"></Table>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    activeName: String,
    assistantAcquisitionData:Array
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
            title: "潜在分诊量",
            key: "potentialAllocationConsulation",
            minWidth: 120,
            align: "center",
          },
          {
            title: "潜在分诊目标",
            key: "potentialAllocationConsulationTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "潜在分诊达成率",
            key: "potentialAllocationConsulationTargetComplete",
            minWidth: 160,
            align: "center",
          },
          {
            title: "潜在加微量",
            key: "potentialAddWechat",
            minWidth: 120,
            align: "center",
          },
          {
            title: "潜在加微目标",
            key: "potentialAddWechatTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "潜在加微达成率",
            key: "potentialAddWechatTargetComplete",
            minWidth: 180,
            align: "center",
          },
          {
            title: "有效分诊量",
            key: "effectiveAllocationConsulation",
            minWidth: 120,
            align: "center",
          },
          {
            title: "有效分诊目标",
            key: "effectiveAllocationConsulationTarget",
            minWidth: 130,
            align: "center",
          },
          {
            title: "有效分诊达成率",
            key: "effectiveAllocationConsulationTargetComplete",
            minWidth: 150,
            align: "center",
          },
          {
            title: "有效加微量",
            key: "effectiveAddWechat",
            minWidth: 120,
            align: "center",
          },
          {
            title: "有效加微目标",
            key: "effectiveAddWechatTarget",
            minWidth: 130,
            align: "center",
          },
          {
            title: "有效加微达成率",
            key: "effectiveAddWechatTargetComplete",
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
