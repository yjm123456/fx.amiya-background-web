<template>
    <div>
        <Card  class="m_b">
            <div class="h3">主播（月度）业绩转化分析</div>
            <Table border :columns="query.columns" :data="query.data" style="margin-top:10px" :row-class-name="rowClassName"></Table>
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
                    title: "分组",
                    key: "groupName",
                    minWidth: 80,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h('div', { 
                            style: { 
                                // padding:'10px',backgroundColor: '#fff9e6',
                                color:'#000',
                                fontSize:'14px',
                                fontWeight:'bold',
                             } 
                        },
                             params.row.groupName );
                    }
                },
                {
                    title: "年度月份",
                    key: "yearAndMonth",
                    minWidth: 100,
                    align: "center",
                    className: 'test-name',
                },
                {
                    title: "分诊量",
                    key: "distributeConsulationNum",
                    minWidth: 100,
                    align: "center",
                    className: 'test-name',
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
                    title: "加v量",
                    key: "addWechatCount",
                    minWidth: 100,
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
                    minWidth: 100,
                    className: 'test-name',
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: this.params.FlowTransformAddWeChatRate == params.row.addWechatRate ? '#000' : params.row.addWechatRate   < this.params.FlowTransformAddWeChatRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.addWechatRate + '%'
                        );
                    },
                },
                
                {
                    title: "派单量",
                    key: "sendOrderCount",
                    minWidth: 100,
                    align: "center",
                    className: 'test-name',
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
                    minWidth: 100,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: this.params.FlowTransformSendOrderRate == params.row.sendOrderRate ? '#000' : params.row.sendOrderRate   < this.params.FlowTransformSendOrderRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.sendOrderRate + '%'
                        );
                    },
                },
                {
                    title: "上门量",
                    key: "toHospitalCount",
                    minWidth: 100,
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
                    minWidth: 100,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: this.params.FlowTransformToHospitalRate == params.row.toHospitalRate ? '#000' : params.row.toHospitalRate   < this.params.FlowTransformToHospitalRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.toHospitalRate + '%'
                        );
                    },
                },
                {
                    title: "成交量",
                    key: "dealCount",
                    minWidth: 100,
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
                    minWidth: 100,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: this.params.FlowTransformToHospitalRate == params.row.dealRate ? '#000' : params.row.dealRate   < this.params.FlowTransformToHospitalRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.dealRate + '%'
                        );
                    },
                },
                {
                    title: "新客业绩",
                    key: "newCustomerPerformance",
                    minWidth: 100,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.newCustomerPerformance <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.newCustomerPerformance ? Math.round( params.row.newCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                        );
                    },
                },
                {
                    title: "新客客单价",
                    key: "newCustomerUnitPrice",
                    minWidth: 120,
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
                    title: "老客成交量",
                    key: "oldCustomerDealCount",
                    minWidth: 120,
                    align: "center",
                    className: 'test-name',
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
                    minWidth: 120,
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
                            params.row.oldCustomerPerformance ? Math.round( params.row.oldCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                        );
                    },
                },
                {
                    title: "老客客单价",
                    key: "oldCustomerUnitPrice",
                    minWidth: 120,
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
                    title: "复购率",
                    key: "oldCustomerBuyRate",
                    minWidth: 120,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: this.params.FlowTransformToHospitalRate == params.row.oldCustomerBuyRate ? '#000' : params.row.oldCustomerBuyRate   < this.params.FlowTransformToHospitalRate ? "red" : "#04B05D",
                                },
                            },
                            params.row.oldCustomerBuyRate + '%'
                        );
                    },
                },
                {
                    title: "总业绩",
                    key: "totalPerformance",
                    minWidth: 120,
                    align: "center",
                    className: 'test-name',
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.totalPerformance <= 0 ? "red" : "#04B05D",
                                },
                            },
                            params.row.totalPerformance ? Math.round( params.row.totalPerformance/10000 *1000 / 10 ) / 100 : 0
                        );
                    },
                },
                {
                    title: "新客占比",
                    key: "newAndOldCustomerRate",
                    minWidth: 120,
                    align: "center",
                    className: 'test-name',
                },
                ],
                data: [],
            }, 
           
        }
    },
    methods:{
        rowClassName: function (row, index) {
            if (index % 2 === 0) {
                return 'ivu-table-stripe-even';
            } else {
                return 'ivu-table-stripe-odd';
            }
        },
        // 根据条件获取新老客业绩占比（助理与机构）
        getCompanyTransformData() {
            const {startDate,endDate} = this.params
            const data = {
                startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
                endDate: this.$moment(endDate).format("YYYY-MM-DD"),
                showTikTok:true,
                showWechatVideo:true,
                showXiaoHongShu:true,
                showPrivateDomain:true,
                baseLiveAnchorId:''
            };
            api.companyTransformNewData(data).then((res) => {
                if (res.code == 0) {
                    const {data} = res.data
                    // this.query.data = data ? [data[0],data[0],data[1],data[1]] : []
                    this.query.data = data 
                }
            });
        },
    }
}
</script>
<style lang="less" scoped>

/deep/.ivu-table-stripe-even td {
  background-color: #fff;
}

/deep/.ivu-table-stripe-odd td {
  background-color: #f0f8fa;
}
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
/deep/.ivu-table td{
    color: #000;
    border: 1px solid #000;

}
/deep/.ivu-table th.test-name {
    background: #ffc000;
    border: 1px solid #000;
    color: #000;
}
/deep/.ivu-table-border td:nth-child(1){
    background: #ffc000;
}

</style>
