<template>
    <div>
        <Card  class="m_b">
            <div class="h3">流量转化情况-助理</div>
            <Table border :columns="query.columns" :data="query.data" style="margin-top:10px"></Table>
        </Card>
        <Card class="m_b">
            <div class="h3">客户转化情况-助理</div>
            <Table border :columns="query2.columns" :data="query2.data" style="margin-top:10px"></Table>
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
                    title: "助理",
                    key: "groupName",
                    minWidth: 160,
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
                             params.row.groupName );
                    }
                    
                },
                {
                    title: "分诊量",
                    key: "distributeConsulationNum",
                    minWidth: 140,
                    className: 'test-name',
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.distributeConsulationNum <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.distributeConsulationNum 
                        );
                    },
                },
                {
                    title: "加v",
                    key: "addWechatCount",
                    minWidth: 140,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.addWechatCount <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.addWechatCount 
                        );
                    },
                },
                {
                    title: "加v率",
                    key: "addWechatRate",
                    minWidth: 180,
                    className: 'test-name',
                    align: "center",
                    renderHeader: (h, { column }) => {
                        return h('span', [
                        //   column.title,
                            h('span', {
                            style: {
                                // color: 'red',
                            },
                            domProps: {
                                innerHTML: '加v率' +'（' +this.params.AssistantFlowTransformAddWechatRate + '%）'
                            //   + ' *',
                            },
                            }),
                        ]);
                    },
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: this.params.AssistantFlowTransformAddWechatRate == params.row.addWechatRate ? '#000' : params.row.addWechatRate   < this.params.AssistantFlowTransformAddWechatRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.addWechatRate + '%'
                        );
                    },
                },
                {
                    title: "派单数",
                    key: "sendOrderCount",
                    minWidth: 160,
                    className: 'test-name',
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.sendOrderCount <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.sendOrderCount
                        );
                    },
                },
                {
                    title: "派单率",
                    key: "sendOrderRate",
                    minWidth: 120,
                    align: "center",
                    className: 'test-name',
                    renderHeader: (h, { column }) => {
                        return h('span', [
                        //   column.title,
                            h('span', {
                            style: {
                                // color: 'red',
                            },
                            domProps: {
                                innerHTML: '派单率' +'（' +this.params.AssistantFlowTransformSendOrderRate + '%）'
                            //   + ' *',
                            },
                            }),
                        ]);
                    },
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: this.params.AssistantFlowTransformSendOrderRate == params.row.sendOrderRate ? '#000' : params.row.sendOrderRate   < this.params.AssistantFlowTransformSendOrderRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.sendOrderRate + '%'
                        );
                    },
                },
                {
                    title: "上门数",
                    key: "toHospitalCount",
                    minWidth: 130,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.toHospitalCount <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.toHospitalCount 
                        );
                    },
                },
                {
                    title: "上门率",
                    key: "toHospitalRate",
                    minWidth: 150,
                    className: 'test-name',
                    align: "center",
                    renderHeader: (h, { column }) => {
                        return h('span', [
                        //   column.title,
                            h('span', {
                            style: {
                                // color: 'red',
                            },
                            domProps: {
                                innerHTML: '上门率' +'（' +this.params.AssistantFlowTransformToHospitalRate + '%）'
                            //   + ' *',
                            },
                            }),
                        ]);
                    },
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color:  this.params.AssistantFlowTransformToHospitalRate == params.row.toHospitalRate ? '#000' : params.row.toHospitalRate   < this.params.AssistantFlowTransformToHospitalRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.toHospitalRate + '%'
                        );
                    },
                },
                ],
                data: [],
            }, 
            query2: {
                columns: [
                {
                    title: "助理",
                    key: "groupName",
                    minWidth: 160,
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
                             params.row.groupName );
                    }
                },
                {
                    title: "上门人数",
                    key: "toHospitalCount",
                    minWidth: 130,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.toHospitalCount <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.toHospitalCount
                        );
                    },
                },
                {
                    title: "成交人数",
                    key: "dealCount",
                    minWidth: 120,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.dealCount <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.dealCount 
                        );
                    },
                },
                {
                    title: "成交率",
                    key: "dealRate",
                    minWidth: 150,
                    align: "center",
                    className: 'test-name',
                    renderHeader: (h, { column }) => {
                        return h('span', [
                        //   column.title,
                            h('span', {
                            style: {
                                // color: 'red',
                            },
                            domProps: {
                                innerHTML: '成交率' +'（' +this.params.AssistantCustomerFlowTransformDealRate + '%）'
                            //   + ' *',
                            },
                            }),
                        ]);
                    },
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: this.params.AssistantCustomerFlowTransformDealRate == params.row.dealRate ? '#000' : params.row.dealRate   < this.params.AssistantCustomerFlowTransformDealRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.dealRate + '%'
                        );
                    },
                },
                {
                    title: "新客业绩",
                    key: "newCustomerPerformance",
                    minWidth: 150,
                    className: 'test-name',
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.newCustomerPerformance <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.newCustomerPerformance
                        );
                    },
                },
                {
                    title: "老客成交量",
                    key: "oldCustomerDealCount",
                    minWidth: 150,
                    className: 'test-name',
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.oldCustomerDealCount <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.oldCustomerDealCount
                        );
                    },
                },
                {
                    title: "老客业绩",
                    key: "oldCustomerPerformance",
                    minWidth: 150,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.oldCustomerPerformance <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.oldCustomerPerformance 
                        );
                    },
                },
                {
                    title: "新客客单价",
                    key: "newCustomerUnitPrice",
                    minWidth: 150,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.newCustomerUnitPrice <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.newCustomerUnitPrice 
                        );
                    },
                },
                {
                    title: "老客客单价",
                    key: "oldCustomerUnitPrice",
                    minWidth: 150,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.oldCustomerUnitPrice <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.oldCustomerUnitPrice 
                        );
                    },
                },
                {
                    title: "客单价",
                    key: "customerUnitPrice",
                    minWidth: 150,
                    className: 'test-name',
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.customerUnitPrice <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.customerUnitPrice
                        );
                    },
                },
                {
                    title: "新老客占比",
                    key: "newAndOldCustomerRate",
                    minWidth: 150,
                    align: "center",
                    className: 'test-name',
                },
                {
                    title: "贡献",
                    key: "rate",
                    minWidth: 150,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.rate <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.rate + '%'
                        );
                    },
                },
                ],
                data: [],
            },
        }
    },
    methods:{
        // 根据条件获取新老客业绩占比（助理与机构）
        getAssistantTransformData() {
            const {startDate,endDate} = this.params
            const data = {
                startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
                endDate: this.$moment(endDate).format("YYYY-MM-DD"),
                showTikTok:this.platformList.find((item) => item.id == 1).isSelected,
                showWechatVideo:this.platformList.find((item) => item.id == 2).isSelected,
                showXiaoHongShu:this.platformList.find((item) => item.id == 3).isSelected,
                showPrivateDomain:this.platformList.find((item) => item.id == 4).isSelected,
            };
            api.assistantTransformData(data).then((res) => {
                if (res.code == 0) {
                    this.query.data = res.data.data
                    this.query2.data = res.data.data
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
}

/deep/.ivu-table-border td:nth-child(1){
    background: #fff9e6;
}
</style>
