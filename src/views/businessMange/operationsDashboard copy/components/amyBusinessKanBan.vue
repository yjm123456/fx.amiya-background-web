<template>
  <div class="containers">
    <!-- 业绩情况 -->
    <Table border :columns="query.columns" :data="companyPerformanceData"></Table>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    activeName: String,
    companyPerformanceData:Array,
    dateSchedule:Number
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
            render: (h, params) => {
              // 当月
              if(this.dateSchedule){
                if (params.row.newCustomerPerformanceTargetComplete > this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.newCustomerPerformanceTargetComplete + '%'
                  );
                } else if (params.row.newCustomerPerformanceTargetComplete< this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.newCustomerPerformanceTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.newCustomerPerformanceTargetComplete+ '%'
                  );
                }
             }else{
              // 当日
              if (params.row.newCustomerPerformanceTargetComplete > 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.newCustomerPerformanceTargetComplete+ '%'
                  );
                } else if (params.row.newCustomerPerformanceTargetComplete< 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.newCustomerPerformanceTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.newCustomerPerformanceTargetComplete+ '%'
                  );
                }
             }
            },
            
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
            render: (h, params) => {
              // 当月
              if(this.dateSchedule){
                if (params.row.oldCustomerTargetComplete > this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.oldCustomerTargetComplete+ '%'
                  );
                } else if (params.row.oldCustomerTargetComplete< this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.oldCustomerTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.oldCustomerTargetComplete+ '%'
                  );
                }
             }else{
              // 当日
              if (params.row.oldCustomerTargetComplete > 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.oldCustomerTargetComplete+ '%'
                  );
                } else if (params.row.oldCustomerTargetComplete< 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.oldCustomerTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.oldCustomerTargetComplete+ '%'
                  );
                }
             }
            },
          },
          {
            title: "总业绩",
            key: "totalPerformance",
            minWidth: 160,
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
            render: (h, params) => {
              // 当月
              if(this.dateSchedule){
                if (params.row.totalPerformanceTargetComplete > this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.totalPerformanceTargetComplete+ '%'
                  );
                } else if (params.row.totalPerformanceTargetComplete< this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.totalPerformanceTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.totalPerformanceTargetComplete+ '%'
                  );
                }
             }else{
              // 当日
              if (params.row.totalPerformanceTargetComplete > 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.totalPerformanceTargetComplete+ '%'
                  );
                } else if (params.row.totalPerformanceTargetComplete< 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.totalPerformanceTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.totalPerformanceTargetComplete+ '%'
                  );
                }
             }
            },
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
.containers {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

</style>
