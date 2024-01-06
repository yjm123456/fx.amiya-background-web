<template>
    <div>
        <Table border :columns="query.columns" :data="rankList" height="580" :row-class-name="rowClassName"></Table>
    </div>
</template>
<script>

export default {
    props:{
        rankList:Array
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
            align:'center',
            minWidth:50
          },
          {
            title: "机构",
            key: "name",
            align:'center',
            minWidth:350
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
            minWidth:150
          },
          {
            title: "成交率",
            key: "dealRatio",
            align:'center',
            minWidth:150,
            render: (h, params) => {
              return h(
                "div",
                params.row.dealRatio == 0 ?   '0%' : params.row.dealRatio+ '%' 
              );
            },
          },
          {
            title: "复购率",
            key: "repurchaseRatio",
            align:'center',
            minWidth:150,
            render: (h, params) => {
              return h(
                "div",
                params.row.repurchaseRatio == 0 ?   '0%' : params.row.repurchaseRatio+ '%' 
              );
            },
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            align:'center',
            minWidth:150
          },
        ],
        data: [],
      },
        }
    },
    methods:{
      rowClassName (row, index) {
        if (index === 0) {
            return 'one';
        }else if (index === 1) {
            return 'two';
        }else if (index === 2) {
            return 'three';
        }
        return '';
    },
    }
}
</script>
<style >
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
.ivu-table .one td{
    color: red;
}
.ivu-table .two td{
    color:  #ff6600;
}
.ivu-table .three td{
    color: orange;
}
</style>
