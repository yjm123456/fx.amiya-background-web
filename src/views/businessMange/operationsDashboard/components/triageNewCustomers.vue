<template>
  <div class="container">
    <!-- 公司当月/历史分诊情况 -->
    <Table border :columns="isTitle=='当月分诊' ? query.columns : query2.columns" :data="triageNewCustomersData"></Table>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    isTitle: String,
    activeName: String,
    triageNewCustomersData:Array
  },
  data() {
    return {
      title:'8%',
      query: {
        columns: [
          {
            title: "分组",
            key: "groupName",
            minWidth: 160,
            align: "center",
            // renderHeader: (h, { column }) => {
            // return h('span', [
            // //   column.title,
            //   h('span', {
            //     style: {
            //     //   color: 'red',
            //     },
            //     domProps: {
            //       innerHTML: this.title 
            //     //   + ' *',
            //     },
            //   }),
            // ]);
            // }
          },
          {
            title: "派单数",
            key: "sendOrderCount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "派单率",
            key: "sendOrderRate",
            minWidth: 120,
            align: "center",
          },
          {
            title: "分诊量",
            key: "distributeConsulationNum",
            minWidth: 120,
            align: "center",
          },
          {
            title: "加v",
            key: "addWechatCount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "加v率",
            key: "addWechatRate",
            minWidth: 120,
            align: "center",
          },
          
          {
            title: "上门数",
            key: "toHospitalCount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "上门率",
            key: "toHospitalRate",
            minWidth: 120,
            align: "center",
          },

          {
            title: "成交",
            key: "dealCount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交率",
            key: "dealRate",
            minWidth: 120,
            align: "center",
          },
          {
            title: "业绩",
            key: "performance",
            minWidth: 120,
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
            minWidth: 160,
            align: "center",
            // renderHeader: (h, { column }) => {
            // return h('span', [
            // //   column.title,
            //   h('span', {
            //     style: {
            //     //   color: 'red',
            //     },
            //     domProps: {
            //       innerHTML: this.title 
            //     //   + ' *',
            //     },
            //   }),
            // ]);
            // }
          },
          {
            title: "派单数",
            key: "sendOrderCount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "派单率",
            key: "sendOrderRate",
            minWidth: 120,
            align: "center",
          },
          {
            title: "上门数",
            key: "toHospitalCount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "上门率",
            key: "toHospitalRate",
            minWidth: 120,
            align: "center",
          },

          {
            title: "成交",
            key: "dealCount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "成交率",
            key: "dealRate",
            minWidth: 120,
            align: "center",
          },
          {
            title: "业绩",
            key: "performance",
            minWidth: 120,
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
