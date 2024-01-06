<template>
  <div class="con">
        <Table border :columns="query.columns" :data="query.data" :row-class-name="rowClassName" height="350" class="table"></Table>
  </div>
</template>
<script>
export default {
  props:{
    performanceKanbanParams:Object
  },
  data() {
    return {
      // 查询
      query: {
        columns: [
          {
            title: "品牌名称",
            key: "brandName",
          },
          {
            title: "下单GMV",
            key: "createOrderGMV",
          },
          {
            title: "下单件数",
            key: "createOrderQuantity",
          },
          {
            title: "件单价",
            key: "singlePrice",
          },
          
        ],
        data: [],
      },

     
    };
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
        if (index === (this.query.rowIndex-1)) {
            return 'demo-table-error-row';
        }
        return '';
    },
  },
  watch: {
    performanceKanbanParams: {
      handler(value) {
        const {topCreateOrderGMVDtoList}  = value.brandAnalizeData
        if(topCreateOrderGMVDtoList){
            this.query.data = topCreateOrderGMVDtoList
        }
      },
      deep: true,
    },
  },
  
};
</script>
<style lang="less" >
.con{
    padding: 0 1%;
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
.ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
}
.table{
    margin-top: 20px;
}
</style>