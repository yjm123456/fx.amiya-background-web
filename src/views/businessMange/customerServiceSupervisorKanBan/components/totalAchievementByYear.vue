<template>
  <Card style="margin-bottom:10px">
    <div class="title" >刀刀组助理（年度）总业绩趋势</div>
    <!-- :span-method="handleSpan"  -->
    <Table border :columns="query.columns" :data="query.data1"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
    <div class="title" >吉娜组助理（年度）总业绩趋势</div>
    <Table border :columns="query.columns" :data="query.data2" :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
  </Card>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";

export default {
  props: {
    params: Object,
  },
  data() {
    return {
      title1:'',
      title2:'',
      title3:'',
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
            title: "助理",
            key: "sortName",
            align: "center",
            minWidth: 100,
            className: 'test-name',
          },
          {
            title: "1月",
            key: "januaryPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.januaryPerformance == 0 || params.index == 4 && params.row.januaryPerformance == 0 || params.index == 5 && params.row.januaryPerformance == 0 ? 'red' : params.index == 3 && params.row.januaryPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.januaryPerformance < 100 ? "red" :
                            //       params.index == 4  && params.row.januaryPerformance < 0 ? "red" :   params.index == 4  &&  params.row.januaryPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5  && params.row.januaryPerformance < 0 ? "red" :   params.index == 5  &&  params.row.januaryPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                           
                        },
                    },
                    params.row.januaryPerformance ? Math.round( params.row.januaryPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "2月",
            key: "februaryPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.februaryPerformance == 0 || params.index == 4 && params.row.februaryPerformance == 0 || params.index == 5 && params.row.februaryPerformance == 0 ? 'red' :params.index == 3 && params.row.februaryPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.februaryPerformance < 100 ? "red" :
                            //       params.index == 4  && params.row.februaryPerformance < 0 ? "red" :   params.index == 4  &&  params.row.februaryPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5  && params.row.februaryPerformance < 0 ? "red" :   params.index == 5  &&  params.row.februaryPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                        },
                    },
                    // params.row.februaryPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.februaryPerformance + '%': params.row.februaryPerformance 
                    // : 0
                    params.row.februaryPerformance ? Math.round( params.row.februaryPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "3月",
            key: "marchPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.marchPerformance == 0 || params.index == 4 && params.row.marchPerformance == 0 || params.index == 5 && params.row.marchPerformance == 0 ? 'red' :params.index == 3 && params.row.marchPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.marchPerformance < 100 ? "red" :
                            //       params.index == 4  && params.row.marchPerformance < 0 ? "red" :   params.index == 4  &&  params.row.marchPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5  && params.row.marchPerformance < 0 ? "red" :   params.index == 5  &&  params.row.marchPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.marchPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.marchPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.marchPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.marchPerformance + '%': params.row.marchPerformance 
                    // : 0
                    params.row.marchPerformance ? Math.round( params.row.marchPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "4月",
            key: "aprilPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.aprilPerformance == 0 || params.index == 4 && params.row.aprilPerformance == 0 || params.index == 5 && params.row.aprilPerformance == 0 ? 'red' :params.index == 3 && params.row.aprilPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.aprilPerformance < 100 ? "red" :
                            //       params.index == 4  && params.row.aprilPerformance < 0 ? "red" :   params.index == 4  &&  params.row.aprilPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5  && params.row.aprilPerformance < 0 ? "red" :   params.index == 5  &&  params.row.aprilPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.aprilPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.aprilPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.aprilPerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.aprilPerformance + '%': params.row.aprilPerformance  : 0
                    params.row.aprilPerformance ? Math.round( params.row.aprilPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "5月",
            key: "mayPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.mayPerformance == 0 || params.index == 4 && params.row.mayPerformance == 0 || params.index == 5 && params.row.mayPerformance == 0 ? 'red' :params.index == 3 && params.row.mayPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.mayPerformance < 100 ? "red" :
                            //       params.index == 4 && params.row.mayPerformance < 0 ? "red" :   params.index == 4 &&  params.row.mayPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5 && params.row.mayPerformance < 0 ? "red" :   params.index == 5 &&  params.row.mayPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.mayPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.mayPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.mayPerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.mayPerformance + '%': params.row.mayPerformance  : 0
                    params.row.mayPerformance ? Math.round( params.row.mayPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "6月",
            key: "junePerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.junePerformance == 0 || params.index == 4 && params.row.junePerformance == 0 || params.index == 5 && params.row.junePerformance == 0 ? 'red' :params.index == 3 && params.row.junePerformance > 100 ? "#04B05D" : params.index == 3 && params.row.junePerformance < 100 ? "red" :
                            //       params.index == 4 && params.row.junePerformance < 0 ? "red" :   params.index == 4 &&  params.row.junePerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5 && params.row.junePerformance < 0 ? "red" :   params.index == 5 &&  params.row.junePerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.junePerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.junePerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.junePerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.junePerformance + '%': params.row.junePerformance  : 0
                    params.row.junePerformance ? Math.round( params.row.junePerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "7月",
            key: "julyPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.julyPerformance == 0 || params.index == 4 && params.row.julyPerformance == 0 || params.index == 5 && params.row.julyPerformance == 0 ? 'red' :params.index == 3 && params.row.julyPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.julyPerformance < 100 ? "red" :
                            //       params.index == 4 && params.row.julyPerformance < 0 ? "red" :   params.index == 4 &&  params.row.julyPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5 && params.row.julyPerformance < 0 ? "red" :   params.index == 5 &&  params.row.julyPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.julyPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.julyPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.julyPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.julyPerformance + '%': params.row.julyPerformance : 0
                    params.row.julyPerformance ? Math.round( params.row.julyPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "8月",
            key: "augustPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.augustPerformance == 0 || params.index == 4 && params.row.augustPerformance == 0 || params.index == 5 && params.row.augustPerformance == 0 ? 'red' :params.index == 3 && params.row.augustPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.augustPerformance < 100 ? "red" :
                            //       params.index == 4 && params.row.augustPerformance < 0 ? "red" :   params.index == 4 &&  params.row.augustPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5 && params.row.augustPerformance < 0 ? "red" :   params.index == 5 &&  params.row.augustPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.augustPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.augustPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.augustPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.augustPerformance + '%': params.row.augustPerformance : 0
                    params.row.augustPerformance ? Math.round( params.row.augustPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "9月",
            key: "septemberPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.septemberPerformance == 0 || params.index == 4 && params.row.septemberPerformance == 0 || params.index == 5 && params.row.septemberPerformance == 0 ? 'red' :params.index == 3 && params.row.septemberPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.septemberPerformance < 100 ? "red" :
                            //       params.index == 4 && params.row.septemberPerformance < 0 ? "red" :   params.index == 4 &&  params.row.septemberPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5 && params.row.septemberPerformance < 0 ? "red" :   params.index == 5 &&  params.row.septemberPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.septemberPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.septemberPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.septemberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.septemberPerformance + '%': params.row.septemberPerformance : 0
                    params.row.septemberPerformance ? Math.round( params.row.septemberPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "10月",
            key: "octoberPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.octoberPerformance == 0 || params.index == 4 && params.row.octoberPerformance == 0 || params.index == 5 && params.row.octoberPerformance == 0 ? 'red' :params.index == 3 && params.row.octoberPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.octoberPerformance < 100 ? "red" :
                            //       params.index == 4 && params.row.octoberPerformance < 0 ? "red" :   params.index == 4 &&  params.row.octoberPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5 && params.row.octoberPerformance < 0 ? "red" :   params.index == 5 &&  params.row.octoberPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.octoberPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.octoberPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.octoberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.octoberPerformance + '%': params.row.octoberPerformance : 0
                    params.row.octoberPerformance ? Math.round( params.row.octoberPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "11月",
            key: "novemberPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.novemberPerformance == 0 || params.index == 4 && params.row.novemberPerformance == 0 || params.index == 5 && params.row.novemberPerformance == 0? 'red' :params.index == 3 && params.row.novemberPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.novemberPerformance < 100 ? "red" :
                            //       params.index == 4 && params.row.novemberPerformance < 0 ? "red" :   params.index == 4 &&  params.row.novemberPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5 && params.row.novemberPerformance < 0 ? "red" :   params.index == 5 &&  params.row.novemberPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.novemberPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.novemberPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.novemberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.novemberPerformance + '%': params.row.novemberPerformance  : 0
                    params.row.novemberPerformance ? Math.round( params.row.novemberPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "12月",
            key: "decemberPerformance",
            align: "center",
            minWidth: 110,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:params.index == 3 && params.row.decemberPerformance == 0 || params.index == 4 && params.row.decemberPerformance == 0  || params.index == 5 && params.row.decemberPerformance == 0 ? 'red'  : 
                            // params.index == 3 && params.row.decemberPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.decemberPerformance < 100 ? "red" :
                            //       params.index == 4 && params.row.decemberPerformance < 0 ? "red" :   params.index == 4 &&  params.row.decemberPerformance > 0 ?  "#04B05D" : 
                            //       params.index == 5 && params.row.decemberPerformance < 0 ? "red" :   params.index == 5 &&  params.row.decemberPerformance > 0 ?  "#04B05D" : 
                            //       '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.decemberPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.decemberPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.decemberPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.decemberPerformance + '%': params.row.decemberPerformance 
                    // : 0
                    params.row.decemberPerformance ? Math.round( params.row.decemberPerformance/10000 *1000 / 10 ) / 100 : 0
                );
            },
          },
          {
            title: "合计",
            key: "sumPerformance",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                            return h('div', { 
                                style: { 
                                    // padding:'10px',backgroundColor: '#fff9e6',
                                    color:'#000',
                                    fontSize:'15px',
                                    fontWeight:'bold',
                                } 
                            },
                                 params.row.sumPerformance ? Math.round( params.row.sumPerformance/10000 *1000 / 10 ) / 100 : 0);
                        }
          },
          {
            title: "平均",
            key: "averagePerformance",
            align: "center",
            minWidth: 120,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.averagePerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.averagePerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.averagePerformance 
                    params.row.averagePerformance ? Math.round( params.row.averagePerformance/10000 *1000 / 10 ) / 100 : 0
                    // ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.averagePerformance + '%': params.row.averagePerformance 
                    // : 0
                );
            },
          },
        ],
        data1: [],
        data2: [],
        data3: [],
      },
    };
  },
  methods: {
    rowClassName(row, index) {
        // 根据条件设置特定行的类名，例如这里根据key值设置背景色
        if (index === 0) {
            return 'bg-color-row';
        }
        if (index === 1) {
            return 'demo-table-info-row';
        } 
        return '';
       
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
    // 医美业绩趋势
    getTotalAchievementByYearClick() {
      const { startDate } = this.params;
      const data = {
        year: this.$moment(startDate).format("YYYY"),
      };
      api.getTotalAssistantAchievementByYear(data).then((res) => {
        if (res.code === 0) {
          const { daoDaoPerformanceData ,jiNaPerformanceData} = res.data.data;
          this.query.data1 = daoDaoPerformanceData
          this.query.data2 = jiNaPerformanceData;
          this.title1 = daoDaoPerformanceData ? daoDaoPerformanceData[0].groupName : '刀刀组'
          this.title2 = jiNaPerformanceData ? jiNaPerformanceData[0].groupName : '吉娜组'
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
// /deep/ .ivu-table-wrapper-with-border{
//     border: none;
// }
/* 确保没有全局样式覆盖 */
// /deep/ .ivu-table {
//   border-collapse: separate;
//   border-spacing: 0;
//   border-right: 1px solid #000;
//   border-bottom: 1px solid #000;
// }
 
// /deep/ .ivu-table-wrapper {
//   overflow: auto; 
// }
/deep/ .ivu-table .ivu-table-body tr td, 
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
    // font-weight: bold;
}
/deep/.ivu-table-border td:nth-child(14){
    background: #ffc000;
}
.first-column-bg td:first-child {
  background-color: #f2f2f2; /* 设置你想要的背景颜色 */
}
// /deep/ .ivu-table .demo-table-info-row td{
//         background-color: #7edafb;
//         color: #000;
//         background: skyblue;
// }
// /deep/.ivu-table-border td:nth-child(2){
//     background: #ffc000;
//     color: #000;
//     font-weight: bold;
// }
.title{
    font-size: 18px;
    font-weight: bold;
    color: #000; 
    text-align: center;
    margin-bottom: 10px;
}
</style>
