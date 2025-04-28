<template>
  <Card style="margin-top:10px">
    <div class="title" >刀刀组</div>
    <Table border :columns="query.columns" :data="query.data1"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
    <div class="title" >吉娜组</div>
    <Table border :columns="query.columns" :data="query.data2" :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
  </Card>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
import * as healthValueApi from "@/api/healthValue";

export default {
  props: {
    params: Object,
  },
  data() {
    return {
      query: {
        columns: [
          {
            title: "部门",
            key: "department",
            minWidth:80,
            tooltip:true,
            className: 'test-name',
            align:'center'
          },
          
          {
            title: "线索目标",
            key: "clueTarget",
            minWidth:110,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.clueTarget );
            }
          },
          {
            title: "线索实际",
            key: "clueNum",
            minWidth:110,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.clueNum );
            }
          },
          {
            title: "线索完成率",
            key: "clueCompleteRate",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.clueCompleteRate  ? params.row.clueCompleteRate  + '%' : 0);
            }
          },
          {
            title: "加v实际",
            key: "addWeChatNum",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      } 
                },
                      params.row.addWeChatNum );
            }
          },
          {
            title: "加v率",
            key: "addWeChatRate",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                      color: params.row.addWeChatRate > this.healthValueParams.AddWeChatHealthValueThisMonth ? 'green' : 'red'
                      } 
                },
                      params.row.addWeChatRate ? params.row.addWeChatRate + '%' : 0 );
            }
          },
        ],
        data1: [],
        data2: [],
      },
      healthValueParams:{
        // 当月加v率健康值
        AddWeChatHealthValueThisMonth:0,
      }
    };
  },
  methods: {
    // rowClassName(row, index) {
    //     // 根据条件设置特定行的类名，例如这里根据key值设置背景色
    //     if (index === 0) {
    //         return 'bg-color-row';
    //     }
    //     if (index === 1) {
    //         return 'demo-table-info-row';
    //     } 
    //     return '';
       
    // },
    rowClassName: function (row, index) {
      if (index % 2 === 0) {
        return 'ivu-table-stripe-even';
      } else {
        return 'ivu-table-stripe-odd';
      }
    },
    // 获取当月获客情况数据
    getHealthValueLists() {
      healthValueApi.getHealthValid().then((res) => {
        if (res.code == 0) {
          const {list} = res.data
          // 当月加v率健康值
          this.healthValueParams.AddWeChatHealthValueThisMonth = list.find(item=>item.id == 'AddWeChatHealthValueThisMonth').rate
         
        }
      });
    },
    // 医美业绩趋势
    adminCustomerMonthTransformDataClick() {
      const { endDate, startDate } = this.params;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
      api.adminCustomerMonthTransformData(data).then((res) => {
        if (res.code === 0) {
          const { daoDaoData ,jiNaData} = res.data.data;
          this.query.data1 = daoDaoData
          this.query.data2 = jiNaData;
        }
      });
    },
  },
};
</script>
<style scoped lang="less" >
/deep/.ivu-table-stripe-even td {
  background-color: #fff!important;
}

/deep/.ivu-table-stripe-odd td {
  background-color: #f0f8fa!important;
}
/deep/ .ivu-table .ivu-table-body tr td, 
.ivu-table .ivu-table-header th {
  border: 1px solid #000 !important;
  color: #000;
}
/deep/.ivu-table th.test-name {
    background: #ffc000;
    color: #000;
    border: 1px solid #000 !important;
}
/deep/.ivu-table-border td:nth-child(1){
    background: #ffc000 !important;
    color: #000;
    font-weight: bold;
    
}
/deep/.bg-color-row{
    background: #ffc000 !important;
    color: #000;
    /* font-weight: bold; */
}
/deep/.first-column-bg td:first-child {
  background-color: #f2f2f2; /* 设置你想要的背景颜色 */
}
 /deep/.ivu-table .demo-table-info-row td{
        background-color: #7edafb;
        color: #000;
        background: skyblue;
}

 /* .ivu-table-border td:nth-child(2){
     background: #ffc000;
     color: #000;
     font-weight: bold;
 } */
.title{
    font-size: 18px;
    font-weight: bold;
    color: #000; 
    text-align: center;
    margin-bottom: 10px;
}
</style>
