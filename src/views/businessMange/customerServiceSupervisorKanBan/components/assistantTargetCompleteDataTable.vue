<template>
    <div>
        <Card  class="m_b">
            <div class="h3">助理（月度）业绩达成分析</div>
            <Table border :columns="query.columns" :data="query.data" style="margin-top:10px" height="500"></Table>
        </Card>
    </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";

export default {
    props:{
        params:Object,
    },
    data(){
        return{
           query: {
                columns: [
                {
                    title: "排名",
                    key: "sort",
                    minWidth: 80,
                    align: "center",
                    fixed:'left',
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
                             params.row.sort );
                    }
                    
                },
                {
                    title: "助理",
                    key: "name",
                    minWidth: 120,
                    fixed:'left',
                    align: "center",
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
                             params.row.name );
                    }
                    
                },
                {
                    title: '新客业绩',
                    align: 'center',
                    className: 'test-name',
                    children: [
                        {
                            title: '目标',
                            key: 'newCustomerPerformanceTarget',
                            align: 'center',
                            width: 120,
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.newCustomerPerformanceTarget <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.newCustomerPerformanceTarget ? Math.round( params.row.newCustomerPerformanceTarget/10000 *1000 / 10 ) / 100 : 0
                                );
                            },
                        },
                        {
                            title: "本月",
                            key: "currentMonthNewCustomerPerformance",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.currentMonthNewCustomerPerformance <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.currentMonthNewCustomerPerformance ? Math.round( params.row.currentMonthNewCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                                );
                            },
                        },
                        {
                            title: "上月",
                            key: "historyMonthNewCustomerPerformance",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.historyMonthNewCustomerPerformance <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.historyMonthNewCustomerPerformance ? Math.round( params.row.historyMonthNewCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                                );
                            },
                        },
                        {
                            title: "达成率",
                            key: "newCustomerTargetComplete",
                            minWidth: 120,
                            className: 'test-name',
                            align: "center",
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.newCustomerTargetComplete <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.newCustomerTargetComplete + '%'
                                );
                            },
                        },
                        {
                            title: "环比",
                            key: "newCustomerChainRatio",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.newCustomerChainRatio <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.newCustomerChainRatio + '%'
                                );
                            },
                        },
                    ]
                },
                {
                        title: '老客业绩',
                        align: 'center',
                        className: 'test-name',
                        children: [
                            {
                                title: "目标",
                                key: "oldCustomerPerformanceTarget",
                                minWidth: 120,
                                align: "center",
                                className: 'test-name',
                                render: (h, params) => {
                                    return h(
                                        "div",
                                        {
                                            style: {
                                                color: params.row.oldCustomerPerformanceTarget <= 0 ? "red" : "#04B05D",
                                            },
                                        },
                                        params.row.oldCustomerPerformanceTarget ? Math.round( params.row.oldCustomerPerformanceTarget/10000 *1000 / 10 ) / 100 : 0
                                    );
                                },
                            },
                            {
                                title: "本月",
                                key: "currentMonthOldCustomerPerformance",
                                minWidth: 120,
                                align: "center",
                                className: 'test-name',
                                render: (h, params) => {
                                    return h(
                                        "div",
                                        {
                                            style: {
                                                color: params.row.currentMonthOldCustomerPerformance <= 0 ? "red" : "#04B05D",
                                            },
                                        },
                                        params.row.currentMonthOldCustomerPerformance ? Math.round( params.row.currentMonthOldCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                                    );
                                },
                            },
                            {
                                title: "上月",
                                key: "historyMonthOldCustomerPerformance",
                                minWidth: 120,
                                align: "center",
                                className: 'test-name',
                                render: (h, params) => {
                                    return h(
                                        "div",
                                        {
                                            style: {
                                                color: params.row.historyMonthOldCustomerPerformance <= 0 ? "red" : "#04B05D",
                                            },
                                        },
                                        params.row.historyMonthOldCustomerPerformance ? Math.round( params.row.historyMonthOldCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                                    );
                                },
                            },
                            {
                                title: "达成率",
                                key: "oldCustomerTargetComplete",
                                minWidth: 120,
                                align: "center",
                                className: 'test-name',
                                render: (h, params) => {
                                    return h(
                                        "div",
                                        {
                                            style: {
                                                color: params.row.oldCustomerTargetComplete <= 0 ? "red" : "#04B05D",
                                            },
                                        },
                                        params.row.oldCustomerTargetComplete + '%'
                                    );
                                },
                            },
                            {
                                title: "环比",
                                key: "oldCustomerChainRatio",
                                minWidth: 120,
                                align: "center",
                                className: 'test-name',
                                render: (h, params) => {
                                    return h(
                                        "div",
                                        {
                                            style: {
                                                color: params.row.oldCustomerChainRatio <= 0 ? "red" : "#04B05D",
                                            },
                                        },
                                        params.row.oldCustomerChainRatio + '%'
                                    );
                                },
                            },
                        ]
                    },
                    {
                        title: '总业绩',
                        align: 'center',
                        className: 'test-name',
                        children: [
                        {
                            title: "目标",
                            key: "totalCustomerPerformanceTarget",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.totalCustomerPerformanceTarget <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.totalCustomerPerformanceTarget ? Math.round( params.row.totalCustomerPerformanceTarget/10000 *1000 / 10 ) / 100 : 0
                                );
                            },
                        },
                        {
                            title: "本月",
                            key: "currentMonthTotalCustomerPerformance",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.currentMonthTotalCustomerPerformance <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.currentMonthTotalCustomerPerformance ? Math.round( params.row.currentMonthTotalCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                                );
                            },
                        },
                        {
                            title: "上月",
                            key: "historyMonthTotalCustomerPerformance",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.historyMonthTotalCustomerPerformance <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.historyMonthTotalCustomerPerformance ? Math.round( params.row.historyMonthTotalCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                                );
                            },
                        },
                        {
                            title: "达成率",
                            key: "totalCustomerTargetComplete",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.totalCustomerTargetComplete <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.totalCustomerTargetComplete + '%'
                                );
                            },
                        },
                        {
                            title: "环比",
                            key: "totalCustomerChainRatio",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.totalCustomerChainRatio <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.totalCustomerChainRatio + '%'
                                );
                            },
                        },
                    ]
                },
                {
                    title: "业绩贡献",
                    key: "performanceRate",
                    minWidth: 110,
                    align: "center",
                    fixed:'right',
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    // color: params.row.performanceRate <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.performanceRate + '%'
                        );
                    },
                },
                {
                    title: "新老客占比",
                    key: "newAndOldCustomerRate",
                    minWidth: 110,
                    fixed:'right',
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: '#000',
                                },
                            },
                            params.row.newAndOldCustomerRate 
                        );
                    },
                    
                },
                
                ],
                data: [],
            }, 
        }
    },
    methods:{
        // 获取助理业绩目标达成情况
        getassistantTargetCompleteData() {
            const {startDate,endDate} = this.params
            const data = {
                startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
                endDate: this.$moment(endDate).format("YYYY-MM-DD"),
                showTikTok:true,
                showWechatVideo:true,
                showXiaoHongShu:true,
                showPrivateDomain:true,
                baseLiveAnchorId: ''
            };
            api.assistantTargetCompleteData(data).then((res) => {
                if (res.code == 0) {
                    this.query.data = res.data.data
                }
            });
        },
    }
}
</script>
<style scoped lang="less">
.h3{
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: center;
  color: #000;
}
.m_b{
    margin-bottom: 10px;
}
/deep/.ivu-table th.test-name {
    background: #ffc000;
    border: 1px solid #000;
    color: #000;
}
/deep/.ivu-table td{
    color: #000;
    border: 1px solid #000;

}
/deep/.ivu-table-border td:nth-child(1){
    background: #ffc000;
    color: #000;
}
</style>
