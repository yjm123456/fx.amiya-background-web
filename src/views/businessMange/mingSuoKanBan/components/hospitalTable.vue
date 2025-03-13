<template>
  <div>
    <Card class="container">
      <div class="h3">机构转化情况</div>
      <div>
        <Table border :columns="query.columns" :data="query.data"  :row-class-name="rowClassName"></Table>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
export default {
    props: {
        params:Object
    },
  data() {
    return {
      selected:'全部',
      // 平台
      platformList: [
        {
          name: "全部",
          id: 1,
          isSelected: true,
        },
        {
          name: "刀刀组",
          id: 1,
          isSelected: true,
        },
        {
          name: "吉娜组",
          id: 2,
          isSelected: true,
        },
        
        {
          name: "合作达人",
          id: 4,
          isSelected: true,
        },
        
      ],
      // 查询
      query: {
        columns: [
          // {
          //   title: "城市",
          //   key: "city",
          //   minWidth:100,
          //   align:'center',
          //   className: 'test-name',
          //   // render: (h, params) => {
          //   //     return h('div', { 
          //   //         style: { 
          //   //             // padding:'10px',backgroundColor: '#fff9e6',
          //   //             color:'#000',
          //   //             fontSize:'14px',
          //   //             fontWeight:'bold',
          //   //           } 
          //   //     },
          //   //           params.row.city );
          //   // }
          // },
          {
            title: "医院",
            key: "hospitalName",
            minWidth:180,
            tooltip:true,
            className: 'test-name',
            // render: (h, params) => {
            //     return h('div', { 
            //         style: { 
            //             // padding:'10px',backgroundColor: '#fff9e6',
            //             color:'#000',
            //             fontSize:'14px',
            //             fontWeight:'bold',
            //           } 
            //     },
            //           params.row.hospitalName );
            // }
          },
          {
            title: "派单量",
            key: "sendNum",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.sendNum );
            }
          },
          {
            title: "上门数",
            key: "visitNum",
            minWidth:90,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.visitNum );
            }
          },
          {
            title: "上门率",
            key: "visitRate",
            align:'center',
            className: 'test-name',
            minWidth:110,
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                     params.row.visitRate ? params.row.visitRate + '%' : 0);
            }
          },
          {
            title: "新客成交",
            key: "newCustomerDealNum",
            minWidth:140,
            className: 'test-name',
            align:'center',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.newCustomerDealNum );
            }
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            minWidth:110,
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                     params.row.newCustomerDealRate ? params.row.newCustomerDealRate + '%' : 0 );
            }
          },
          {
            title: "新客业绩",
            key: "newCustomerAchievement",
            minWidth:140,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.newCustomerAchievement ? (params.row.newCustomerAchievement).toFixed(2) : 0);
            }
          },
          
          {
            title: "老客成交",
            key: "oldCustomerDealNum",
            minWidth:140,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.oldCustomerDealNum );
            }
          },
          {
            title: "老客业绩",
            key: "oldCustomerAchievement",
            minWidth:140,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.oldCustomerAchievement ? (params.row.oldCustomerAchievement).toFixed(2) : 0 );
            }
          },
          
          {
            title: "总业绩",
            minWidth:150,
            align:'center',
            className: 'test-name',
            key: "totalAchievement",
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0 );
            }
          },
          {
            title: "新客客单价",
            className: 'test-name',
            key: "newCustomerUnitPrice",
            minWidth:110,
            align:'center',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.newCustomerUnitPrice ? (params.row.newCustomerUnitPrice).toFixed(2) : 0 );
            }
          },
          {
            title: "老客客单价",
            className: 'test-name',
            key: "oldCustomerUnitPrice",
            minWidth:110,
            align:'center',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.oldCustomerUnitPrice ? (params.row.oldCustomerUnitPrice).toFixed(2) : 0 );
            }
          },
          {
            title: "新老客占比",
            key: "newOrOldCustomerRate",
            minWidth:110,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.newOrOldCustomerRate );
            }
          },
          {
            title: "贡献",
            key: "rate",
            minWidth:110,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        color:params.index == 0 ? 'red' : params.index == 1 ? '#ff6600' : params.index == 2 ?  'orange':  '#000'
                      } 
                },
                      params.row.rate + '%' );
            }
          },
          
        ],
        data: [],
      },
    };
  },
  methods: {
    // rowClassName (row, index) {
    //     if (index === 0) {
    //         return 'one';
    //     }else if (index === 1) {
    //         return 'two';
    //     }else if (index === 2) {
    //         return 'three';
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
    checkTab(index, value) {
      this.selected = value.name
      // this.platformList[index].isSelected = !this.platformList[index].isSelected;
      this.getData()
    },
    getData(){
        this.getHospitalTransformData()
    },
    // 全国机构运营当日数据
    getHospitalTransformData() {
        const {startDate,endDate} =  this.params
        const data = {
            startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
            endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        }
        api.AmiyaMingSuoOperationBoardMingSuoHospitalTransformData(data).then((res) => {
            if (res.code === 0) {
              const { data } = res.data;
              this.query.data = data;
            }
        });
    },
  },
  created() {
  },
  
};
</script>
<style scoped lang="less" >

/deep/.ivu-table-stripe-even td {
  background-color: #fff;
}

/deep/.ivu-table-stripe-odd td {
  background-color: #f0f8fa;
}
/deep/ .ivu-table .ivu-table-body tr td, .ivu-table .ivu-table-header th {
  border: 1px solid #000 !important;
  color: #000;
}
/deep/.ivu-table th.test-name {
    background: #ffc000;
    color: #000;
    border: 1px solid #000 !important;
}
/deep/.ivu-table th.test-name,.ivu-table-header thead tr th,.thead {
    background: #ffc000;
    color: #000;
}
/deep/.ivu-table th.test-name {
    background: #ffc000;
    border: 1px solid #000 !important;
    color: #000;
}
/deep/.ivu-table-border td:nth-child(1){
    background: #ffc000;
     border: 1px solid #000 !important;
     color: #000;
     font-weight: bold;
}
 /* .ivu-table-border td:nth-child(2){
     background: #ffc000;
      border: 1px solid #000 !important;
      color: #000;
      font-weight: bold;
 } */
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
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
.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 15px 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.tab2 {
  display: flex;
}
.tab_item {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin:0  30px 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.active{
  color: #fff;
  background:#2f8cf0;
  border: 1px solid #2f8cf0;
}
.active2{
  color: red;
  border: 1px solid red;
}
.h3{
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: center;
  color: #000;
}
 /* .ivu-table-border td:nth-child(1){
     background: #ffc000;
     border: 1px solid #000 !important;
 }
 .ivu-table-border td:nth-child(2){
     background: #ffc000;
     border: 1px solid #000 !important;
 } */
</style>