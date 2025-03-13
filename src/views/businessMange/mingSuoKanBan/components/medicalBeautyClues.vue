<template>
  <div>
    <div class="title" >{{title2}}</div>
    <Table border :columns="query.columns" :data="query.data2" :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
import * as shoppingCartRegistrationApi from "@/api/shoppingCartRegistration";

export default {
  props: {
    params: Object,
  },
  data() {
    return {
      // 部门
      belongChannelList:[],
      title2:'',
      query: {
        columns: [
        //   {
        //     title: "组别",
        //     key: "groupName",
        //     align: "center",
        //     minWidth: 150,
        //     className: 'test-name',
            
        //   },
          {
            title: "分类",
            key: "sortName",
            align: "center",
            minWidth: 160,
            className: 'test-name',
          },
          {
            title: "1月",
            key: "januaryPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                          color:params.index == 2 && params.row.januaryPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.januaryPerformance < 100  ? 'red' : 
                                params.index == 4 && params.row.januaryPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.januaryPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.januaryPerformance < 90  ? 'red' : 
                                '#000'
                            
                        },
                    },
                    params.row.januaryPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.januaryPerformance + '%' :
                    params.row.januaryPerformance :
                    0
                );
            },
          },
          {
            title: "2月",
            key: "februaryPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.februaryPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.februaryPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.februaryPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.februaryPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.februaryPerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.februaryPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.februaryPerformance + '%': params.row.februaryPerformance 
                    // : 0
                    params.row.februaryPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.februaryPerformance + '%' :
                    params.row.februaryPerformance :
                    0
                );
            },
          },
          {
            title: "3月",
            key: "marchPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.marchPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.marchPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.marchPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.marchPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.marchPerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.marchPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.marchPerformance + '%': params.row.marchPerformance 
                    // : 0
                    params.row.marchPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.marchPerformance + '%' :
                    params.row.marchPerformance :
                    0
                );
            },
          },
          {
            title: "4月",
            key: "aprilPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.aprilPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.aprilPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.aprilPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.aprilPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.aprilPerformance < 90   ? 'red' : 
                                '#000'
                            
                        },
                    },
                    // params.row.aprilPerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.aprilPerformance + '%': params.row.aprilPerformance  : 0
                    params.row.aprilPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.aprilPerformance + '%' :
                    params.row.aprilPerformance :
                    0
                );
            },
          },
          {
            title: "5月",
            key: "mayPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.mayPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.mayPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.mayPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.mayPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.mayPerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.mayPerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.mayPerformance + '%': params.row.mayPerformance  : 0
                    params.row.mayPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.mayPerformance + '%' :
                    params.row.mayPerformance :
                    0
                );
            },
          },
          {
            title: "6月",
            key: "junePerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.junePerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.junePerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.junePerformance == 0 ? '#000' :
                                params.index == 4 && params.row.junePerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.junePerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.junePerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.junePerformance + '%': params.row.junePerformance  : 0
                    params.row.junePerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.junePerformance + '%' :
                    params.row.junePerformance :
                    0
                );
            },
          },
          {
            title: "7月",
            key: "julyPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.julyPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.julyPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.julyPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.julyPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.julyPerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.julyPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.julyPerformance + '%': params.row.julyPerformance : 0
                    params.row.julyPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.julyPerformance + '%' :
                    params.row.julyPerformance :
                    0
                );
            },
          },
          {
            title: "8月",
            key: "augustPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.augustPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.augustPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.augustPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.augustPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.augustPerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.augustPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.augustPerformance + '%': params.row.augustPerformance : 0
                    params.row.augustPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.augustPerformance + '%' :
                    params.row.augustPerformance :
                    0
                );
            },
          },
          {
            title: "9月",
            key: "septemberPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.septemberPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.septemberPerformance < 100  ? 'red' : 
                                params.index == 4 && params.row.septemberPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.septemberPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.septemberPerformance < 90  ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.septemberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.septemberPerformance + '%': params.row.septemberPerformance : 0
                    params.row.septemberPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.septemberPerformance + '%' :
                    params.row.septemberPerformance :
                    0
                );
            },
          },
          {
            title: "10月",
            key: "octoberPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.octoberPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.octoberPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.octoberPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.octoberPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.octoberPerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.octoberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.octoberPerformance + '%': params.row.octoberPerformance : 0
                    params.row.octoberPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.octoberPerformance + '%' :
                    params.row.octoberPerformance :
                    0
                );
            },
          },
          {
            title: "11月",
            key: "novemberPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.novemberPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.novemberPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.novemberPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.novemberPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.novemberPerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.novemberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.novemberPerformance + '%': params.row.novemberPerformance  : 0
                    params.row.novemberPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.novemberPerformance + '%' :
                    params.row.novemberPerformance :
                    0
                );
            },
          },
          {
            title: "12月",
            key: "decemberPerformance",
            align: "center",
            minWidth: 90,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:
                                params.index == 2 && params.row.decemberPerformance > 100 ? '#04B05D' : 
                                params.index == 2 && params.row.decemberPerformance < 100   ? 'red' : 
                                params.index == 4 && params.row.decemberPerformance == 0 ? '#000' :
                                params.index == 4 && params.row.decemberPerformance > 90 ? '#04B05D' : 
                                params.index == 4 && params.row.decemberPerformance < 90   ? 'red' : 
                                '#000'
                        },
                    },
                    // params.row.decemberPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.decemberPerformance + '%': params.row.decemberPerformance 
                    // : 0
                    params.row.decemberPerformance ?  
                    params.index == 2 ||  params.index == 4   ?  params.row.decemberPerformance + '%' :
                    params.row.decemberPerformance :
                    0
                );
            },
          
          },
        ],
        data2: [],
      },
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
   
    handleSpan({ row, column, rowIndex, columnIndex }) {
        // 合并第一列
        // if(columnIndex == 0){
        //     if(rowIndex === 0){
        //         return [7,1]
        //     }else if(rowIndex  >= 1){
        //         return [0,0]
        //     }
        // }
    },
    // // 获取归属部门
    // getshoppingCartGetBelongChannelList() {
    //   shoppingCartRegistrationApi.shoppingCartGetBelongChannelList().then((res) => {
    //     if (res.code === 0) {
    //       const {belongChannelList} = res.data
    //       this.belongChannelList =belongChannelList
    //     }
    //   });
    // },
    // 医美业绩趋势
    getTotalCluesByYearClick() {
      const { selected7, startDate,assistantId } = this.params;
      const data = {
        year: this.$moment(startDate).format("YYYY"),
        // isOldCustomer:selected7 == "老客" ? true : selected7 == "新客" ? false : null,
        belongChannel:selected7 == "直播前" ? 1 : selected7 == "直播中" ? 2  : selected7 == "直播后" ? 3 : '',
        liveAnchorBaseIdId:assistantId == -1 ? null : assistantId
      };
      api.getMingSuoTotalCluesByYear(data).then((res) => {
        if (res.code === 0) {
          const {  totalPerformanceData} = res.data.data;
          this.query.data2 = totalPerformanceData ? totalPerformanceData : []
          this.title2 = totalPerformanceData ? totalPerformanceData[0].groupName : '名索（线索）'
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
 /deep/.ivu-table .ivu-table-body tr td, 
.ivu-table .ivu-table-header th {
  border: 1px solid #000 !important;
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
/* .ivu-table .demo-table-info-row td{
       background-color: #7edafb;
       color: #000;
       background: skyblue;
 }
 .ivu-table-border td:nth-child(2){
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
