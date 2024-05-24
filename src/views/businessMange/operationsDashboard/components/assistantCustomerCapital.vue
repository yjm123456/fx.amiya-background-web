<template>
  <div class="container">
    <!-- 助理指标转化 -->
        <Table border :columns="query.columns" :data="assistantCustomerCapitalData"></Table>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    activeName: String,
    assistantCustomerCapitalData:Array
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
            title: "加微率",
            key: "addWechatRate",
            minWidth: 100,
            align: "center",
          },
          {
            title: "派单率",
            key: "sendOrderRate",
            minWidth: 100,
            align: "center",
          },
          {
            title: "7日派单率",
            key: "sevenDaySendOrderRate",
            minWidth: 120,
            align: "center",
          },
          {
            title: "上门率",
            key: "toHospitalRate",
            minWidth: 100,
            align: "center",
          },
          {
            title: "15日上门率",
            key: "fifteenDaySendOrderRate",
            minWidth: 140,
            align: "center",
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            minWidth: 120,
            align: "center",
          },
          {
            title: "老客上门率",
            key: "oldCustomerToHospitalRate",
            minWidth: 120,
            align: "center",
          },
          {
            title: "复购率",
            key: "rePurchaseRate",
            minWidth: 100,
            align: "center",
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            minWidth: 120,
            align: "center",
          },
          
        ],
        
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
