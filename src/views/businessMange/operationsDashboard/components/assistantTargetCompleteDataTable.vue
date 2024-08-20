<template>
    <div>
        <Card  class="m_b">
            <div class="h3">助理业绩目标达成情况</div>
            <Table border :columns="query.columns" :data="query.data" style="margin-top:10px" height="500"></Table>
        </Card>
    </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";

export default {
    props:{
        params:Object,
        platformList:Array,
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
                    minWidth: 160,
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
                            width: 140,
                            className: 'test-name',
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.newCustomerPerformanceTarget <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.newCustomerPerformanceTarget 
                                );
                            },
                        },
                        {
                            title: "本月",
                            key: "currentMonthNewCustomerPerformance",
                            minWidth: 140,
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
                                    params.row.currentMonthNewCustomerPerformance 
                                );
                            },
                        },
                        {
                            title: "上月",
                            key: "historyMonthNewCustomerPerformance",
                            minWidth: 140,
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
                                    params.row.historyMonthNewCustomerPerformance 
                                );
                            },
                        },
                        {
                            title: "达成率",
                            key: "newCustomerTargetComplete",
                            minWidth: 140,
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
                            minWidth: 140,
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
                                minWidth: 140,
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
                                        params.row.oldCustomerPerformanceTarget 
                                    );
                                },
                            },
                            {
                                title: "本月",
                                key: "currentMonthOldCustomerPerformance",
                                minWidth: 140,
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
                                        params.row.currentMonthOldCustomerPerformance 
                                    );
                                },
                            },
                            {
                                title: "上月",
                                key: "historyMonthOldCustomerPerformance",
                                minWidth: 140,
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
                                        params.row.historyMonthOldCustomerPerformance 
                                    );
                                },
                            },
                            {
                                title: "达成率",
                                key: "oldCustomerTargetComplete",
                                minWidth: 140,
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
                                minWidth: 140,
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
                            minWidth: 140,
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
                                    params.row.totalCustomerPerformanceTarget 
                                );
                            },
                        },
                        {
                            title: "本月",
                            key: "currentMonthTotalCustomerPerformance",
                            minWidth: 140,
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
                                    params.row.currentMonthTotalCustomerPerformance 
                                );
                            },
                        },
                        {
                            title: "上月",
                            key: "historyMonthTotalCustomerPerformance",
                            minWidth: 140,
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
                                    params.row.historyMonthTotalCustomerPerformance 
                                );
                            },
                        },
                        {
                            title: "达成率",
                            key: "totalCustomerTargetComplete",
                            minWidth: 140,
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
                            minWidth: 140,
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
                    minWidth: 130,
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
                    minWidth: 130,
                    fixed:'right',
                    align: "center",
                    className: 'test-name',
                    
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
                showTikTok:this.platformList.find((item) => item.id == 1).isSelected,
                showWechatVideo:this.platformList.find((item) => item.id == 2).isSelected,
                showXiaoHongShu:this.platformList.find((item) => item.id == 3).isSelected,
                showPrivateDomain:this.platformList.find((item) => item.id == 4).isSelected,
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
}
.m_b{
    margin-bottom: 10px;
}
/deep/.ivu-table th.test-name {
    background: #f7e8b1;
    border: 1px solid rgb(221, 220, 220);
}

/deep/.ivu-table-border td:nth-child(1){
    background: #fff9e6;
}
</style>
