<template>
  <div>
    <div class="title" >{{title1}}</div>
    <!-- :span-method="handleSpan"  -->
    <Table border :columns="query.columns" :data="query.data1"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
    <div class="title" >{{title2}}</div>
    <Table border :columns="query.columns" :data="query.data2" :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
    <div class="title" >{{title3}}</div>
    <Table border :columns="query.columns" :data="query.data3"  :row-class-name="rowClassName" style="margin-bottom:10px"></Table>
  </div>
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
                            color:params.index == 3 && params.row.januaryPerformance == 0 || params.index == 4 && params.row.januaryPerformance == 0 || params.index == 5 && params.row.januaryPerformance == 0 ? 'red' : params.index == 3 && params.row.januaryPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.januaryPerformance < 100 ? "red" :
                                  params.index == 4  && params.row.januaryPerformance < 0 ? "red" :   params.index == 4  &&  params.row.januaryPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5  && params.row.januaryPerformance < 0 ? "red" :   params.index == 5  &&  params.row.januaryPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color: params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.januaryPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.januaryPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    params.row.januaryPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.januaryPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.januaryPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.januaryPerformance
                    : 0
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
                            color:params.index == 3 && params.row.februaryPerformance == 0 || params.index == 4 && params.row.februaryPerformance == 0 || params.index == 5 && params.row.februaryPerformance == 0 ? 'red' :params.index == 3 && params.row.februaryPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.februaryPerformance < 100 ? "red" :
                                  params.index == 4  && params.row.februaryPerformance < 0 ? "red" :   params.index == 4  &&  params.row.februaryPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5  && params.row.februaryPerformance < 0 ? "red" :   params.index == 5  &&  params.row.februaryPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.februaryPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.februaryPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.februaryPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.februaryPerformance + '%': params.row.februaryPerformance 
                    // : 0
                    params.row.februaryPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.februaryPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.februaryPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.februaryPerformance
                    : 0
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
                            color:params.index == 3 && params.row.marchPerformance == 0 || params.index == 4 && params.row.marchPerformance == 0 || params.index == 5 && params.row.marchPerformance == 0 ? 'red' :params.index == 3 && params.row.marchPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.marchPerformance < 100 ? "red" :
                                  params.index == 4  && params.row.marchPerformance < 0 ? "red" :   params.index == 4  &&  params.row.marchPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5  && params.row.marchPerformance < 0 ? "red" :   params.index == 5  &&  params.row.marchPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.marchPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.marchPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.marchPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.marchPerformance + '%': params.row.marchPerformance 
                    // : 0
                    params.row.marchPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.marchPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.marchPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.marchPerformance
                    : 0
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
                            color:params.index == 3 && params.row.aprilPerformance == 0 || params.index == 4 && params.row.aprilPerformance == 0 || params.index == 5 && params.row.aprilPerformance == 0 ? 'red' :params.index == 3 && params.row.aprilPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.aprilPerformance < 100 ? "red" :
                                  params.index == 4  && params.row.aprilPerformance < 0 ? "red" :   params.index == 4  &&  params.row.aprilPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5  && params.row.aprilPerformance < 0 ? "red" :   params.index == 5  &&  params.row.aprilPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.aprilPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.aprilPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.aprilPerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.aprilPerformance + '%': params.row.aprilPerformance  : 0
                    params.row.aprilPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.aprilPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.aprilPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.aprilPerformance
                    : 0
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
                            color:params.index == 3 && params.row.mayPerformance == 0 || params.index == 4 && params.row.mayPerformance == 0 || params.index == 5 && params.row.mayPerformance == 0 ? 'red' :params.index == 3 && params.row.mayPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.mayPerformance < 100 ? "red" :
                                  params.index == 4 && params.row.mayPerformance < 0 ? "red" :   params.index == 4 &&  params.row.mayPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5 && params.row.mayPerformance < 0 ? "red" :   params.index == 5 &&  params.row.mayPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.mayPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.mayPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.mayPerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.mayPerformance + '%': params.row.mayPerformance  : 0
                    params.row.mayPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.mayPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.mayPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.mayPerformance
                    : 0
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
                            color:params.index == 3 && params.row.junePerformance == 0 || params.index == 4 && params.row.junePerformance == 0 || params.index == 5 && params.row.junePerformance == 0 ? 'red' :params.index == 3 && params.row.junePerformance > 100 ? "#04B05D" : params.index == 3 && params.row.junePerformance < 100 ? "red" :
                                  params.index == 4 && params.row.junePerformance < 0 ? "red" :   params.index == 4 &&  params.row.junePerformance > 0 ?  "#04B05D" : 
                                  params.index == 5 && params.row.junePerformance < 0 ? "red" :   params.index == 5 &&  params.row.junePerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.junePerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.junePerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.junePerformance ?  params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.junePerformance + '%': params.row.junePerformance  : 0
                    params.row.junePerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.junePerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.junePerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.junePerformance
                    : 0
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
                            color:params.index == 3 && params.row.julyPerformance == 0 || params.index == 4 && params.row.julyPerformance == 0 || params.index == 5 && params.row.julyPerformance == 0 ? 'red' :params.index == 3 && params.row.julyPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.julyPerformance < 100 ? "red" :
                                  params.index == 4 && params.row.julyPerformance < 0 ? "red" :   params.index == 4 &&  params.row.julyPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5 && params.row.julyPerformance < 0 ? "red" :   params.index == 5 &&  params.row.julyPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.julyPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.julyPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.julyPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.julyPerformance + '%': params.row.julyPerformance : 0
                    params.row.julyPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.julyPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.julyPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.julyPerformance
                    : 0
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
                            color:params.index == 3 && params.row.augustPerformance == 0 || params.index == 4 && params.row.augustPerformance == 0 || params.index == 5 && params.row.augustPerformance == 0 ? 'red' :params.index == 3 && params.row.augustPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.augustPerformance < 100 ? "red" :
                                  params.index == 4 && params.row.augustPerformance < 0 ? "red" :   params.index == 4 &&  params.row.augustPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5 && params.row.augustPerformance < 0 ? "red" :   params.index == 5 &&  params.row.augustPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.augustPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.augustPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.augustPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.augustPerformance + '%': params.row.augustPerformance : 0
                    params.row.augustPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.augustPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.augustPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.augustPerformance
                    : 0
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
                            color:params.index == 3 && params.row.septemberPerformance == 0 || params.index == 4 && params.row.septemberPerformance == 0 || params.index == 5 && params.row.septemberPerformance == 0 ? 'red' :params.index == 3 && params.row.septemberPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.septemberPerformance < 100 ? "red" :
                                  params.index == 4 && params.row.septemberPerformance < 0 ? "red" :   params.index == 4 &&  params.row.septemberPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5 && params.row.septemberPerformance < 0 ? "red" :   params.index == 5 &&  params.row.septemberPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.septemberPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.septemberPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.septemberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.septemberPerformance + '%': params.row.septemberPerformance : 0
                    params.row.septemberPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.septemberPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.septemberPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.septemberPerformance
                    : 0
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
                            color:params.index == 3 && params.row.octoberPerformance == 0 || params.index == 4 && params.row.octoberPerformance == 0 || params.index == 5 && params.row.octoberPerformance == 0 ? 'red' :params.index == 3 && params.row.octoberPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.octoberPerformance < 100 ? "red" :
                                  params.index == 4 && params.row.octoberPerformance < 0 ? "red" :   params.index == 4 &&  params.row.octoberPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5 && params.row.octoberPerformance < 0 ? "red" :   params.index == 5 &&  params.row.octoberPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.octoberPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.octoberPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.octoberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.octoberPerformance + '%': params.row.octoberPerformance : 0
                    params.row.octoberPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.octoberPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.octoberPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.octoberPerformance
                    : 0
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
                            color:params.index == 3 && params.row.novemberPerformance == 0 || params.index == 4 && params.row.novemberPerformance == 0 || params.index == 5 && params.row.novemberPerformance == 0? 'red' :params.index == 3 && params.row.novemberPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.novemberPerformance < 100 ? "red" :
                                  params.index == 4 && params.row.novemberPerformance < 0 ? "red" :   params.index == 4 &&  params.row.novemberPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5 && params.row.novemberPerformance < 0 ? "red" :   params.index == 5 &&  params.row.novemberPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.novemberPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.novemberPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.novemberPerformance ? params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.novemberPerformance + '%': params.row.novemberPerformance  : 0
                    params.row.novemberPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.novemberPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.novemberPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.novemberPerformance
                    : 0
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
                            color:params.index == 3 && params.row.decemberPerformance == 0 || params.index == 4 && params.row.decemberPerformance == 0  || params.index == 5 && params.row.decemberPerformance == 0 ? 'red'  : 
                            params.index == 3 && params.row.decemberPerformance > 100 ? "#04B05D" : params.index == 3 && params.row.decemberPerformance < 100 ? "red" :
                                  params.index == 4 && params.row.decemberPerformance < 0 ? "red" :   params.index == 4 &&  params.row.decemberPerformance > 0 ?  "#04B05D" : 
                                  params.index == 5 && params.row.decemberPerformance < 0 ? "red" :   params.index == 5 &&  params.row.decemberPerformance > 0 ?  "#04B05D" : 
                                  '#000',
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.decemberPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.decemberPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.decemberPerformance ? 
                    // params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.decemberPerformance + '%': params.row.decemberPerformance 
                    // : 0
                    params.row.decemberPerformance ? 
                    params.index == 3 ||  params.index == 4 || params.index == 5  ?  params.row.decemberPerformance + '%' :
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.decemberPerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.decemberPerformance
                    : 0
                );
            },
          },
          {
            title: "合计",
            key: "sumPerformance",
            align: "center",
            minWidth: 100,
            className: 'test-name',
            render: (h, params) => {
                return h(
                    "div",
                    {
                        style: {
                            color:'#000'
                            // color:  params.index == 3 ||  params.index == 4 || params.index == 5 && params.row.sumPerformance < 0 ? "red" :  params.index == 3 ||  params.index == 4 || params.index == 5 &&  params.row.sumPerformance > 0 ?  "#04B05D" : '#000',
                            // fontWeight:'bold'
                        },
                    },
                    // params.row.sumPerformance  ?  params.index == 3 ?  params.row.sumPerformance + '%': params.row.sumPerformance   : 0
                    params.row.sumPerformance ?  
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.sumPerformance/10000 *1000 / 10 ) / 100 + 'w':  
                    params.index == 3 ? params.row.sumPerformance + '%':  
                    params.row.sumPerformance : 0
                );
            },
          },
          {
            title: "平均",
            key: "averagePerformance",
            align: "center",
            minWidth: 100,
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
                    params.row.averagePerformance ? 
                    params.index == 0 ||  params.index == 1 || params.index == 2 ?   Math.round( params.row.averagePerformance/10000 *1000 / 10 ) / 100 + 'w': params.row.averagePerformance
                    : '/'
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
      const { selected6, startDate } = this.params;
      const data = {
        year: this.$moment(startDate).format("YYYY"),
        isOldCustomer:selected6 == "老客" ? true : selected6 == "新客" ? false : null,
      };
      api.getTotalAchievementByYear(data).then((res) => {
        if (res.code === 0) {
          const { totalPerformanceData , daoDaoPerformanceData ,jiNaPerformanceData} = res.data.data;
          this.query.data1 = totalPerformanceData
          this.query.data2 = daoDaoPerformanceData;
          this.query.data3 = jiNaPerformanceData;
          this.title1 = totalPerformanceData ? totalPerformanceData[0].groupName : '啊美雅（总业绩）'
          this.title2 = daoDaoPerformanceData ? daoDaoPerformanceData[0].groupName : '刀刀（总业绩）'
          this.title3 = jiNaPerformanceData ? jiNaPerformanceData[0].groupName : '吉娜（总业绩）'
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
.first-column-bg td:first-child {
  background-color: #f2f2f2; /* 设置你想要的背景颜色 */
}
/deep/ .ivu-table .demo-table-info-row td{
        background-color: #7edafb;
        color: #000;
        background: skyblue;
}
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
