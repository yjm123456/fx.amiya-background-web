<template>
    <div>
        <!-- 科室 -->
        <Table border :columns="query.columns" :data="departmentRankList" ></Table>
    </div>
</template>
<script>
import * as api from "@/api/hospitalManage";

export default {
    props:{
        departmentRankList:Array
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
            title: "排名",
            key: "rank",
            align:'center'
          },
          {
            title: "科室",
            key: "departMentName",
            align:'center'
          },
          {
            title: "上门率",
            key: "toHospitalRatio",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.toHospitalRatio == 0 ?   '0%' : params.row.toHospitalRatio+ '%' 
              );
            },
          },
          {
            title: "成交率",
            key: "dealRation",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.dealRation == 0 ?   '0%' : params.row.dealRation+ '%' 
              );
            },
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            align:'center'
          },
          {
            title: "业绩",
            key: "performance",
            align:'center'
          },
          {
            title: "占比",
            key: "performanceRatio",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.performanceRatio == 0 ?   '0%' : params.row.performanceRatio+ '%' 
              );
            },
          },
          
        ],
        data: [],
      },
        }
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
