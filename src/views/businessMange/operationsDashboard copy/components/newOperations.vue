<template>
  <div class="container">
    <!-- 新客运营情况 -->
        <Table border :columns="query.columns" :data="companyOperationsData"></Table>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    activeName: String,
    companyOperationsData:Array,
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
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              // 当月
              if(this.dateSchedule){
                if (params.row.sendOrderTargetComplete > this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.sendOrderTargetComplete+ '%'
                  );
                } else if (params.row.sendOrderTargetComplete< this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.sendOrderTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.sendOrderTargetComplete+ '%'
                  );
                }
             }else{
              // 当日
              if (params.row.sendOrderTargetComplete > 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.sendOrderTargetComplete+ '%'
                  );
                } else if (params.row.sendOrderTargetComplete< 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.sendOrderTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.sendOrderTargetComplete+ '%'
                  );
                }
             }
            },
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
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              // 当月
              if(this.dateSchedule){
                if (params.row.toHospitalTargetComplete > this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.toHospitalTargetComplete+ '%'
                  );
                } else if (params.row.toHospitalTargetComplete< this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.toHospitalTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.toHospitalTargetComplete+ '%'
                  );
                }
             }else{
              // 当日
              if (params.row.toHospitalTargetComplete > 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.toHospitalTargetComplete+ '%'
                  );
                } else if (params.row.toHospitalTargetComplete< 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.toHospitalTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.toHospitalTargetComplete+ '%'
                  );
                }
             }
            },
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
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              // 当月
              if(this.dateSchedule){
                if (params.row.dealTargetComplete > this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.dealTargetComplete+ '%'
                  );
                } else if (params.row.dealTargetComplete< this.dateSchedule) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.dealTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.dealTargetComplete+ '%'
                  );
                }
             }else{
              // 当日
              if (params.row.dealTargetComplete > 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#04B05D",
                      },
                    },
                    params.row.dealTargetComplete+ '%'
                  );
                } else if (params.row.dealTargetComplete< 100) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "red",
                      },
                    },
                    params.row.dealTargetComplete+ '%'
                  );
                }else {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#515a6e",
                      },
                    },
                    params.row.dealTargetComplete+ '%'
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
