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
                    title: "分组",
                    key: "groupName",
                    minWidth: 160,
                    align: "center",
                    
                },
                {
                    title: "加v",
                    key: "addWechatCount",
                    minWidth: 140,
                    align: "center",
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
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.addWechatRate <= 0 ? "red" : "#04B05D",
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
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.sendOrderRate <= 0 ? "red" : "#04B05D",
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
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.toHospitalRate <= 0 ? "red" : "#04B05D",
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
                    title: "分组",
                    key: "groupName",
                    minWidth: 160,
                    align: "center",
                },
                {
                    title: "上门人数",
                    key: "toHospitalCount",
                    minWidth: 130,
                    align: "center",
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
                    render: (h, params) => {
                        return h(
                            "div",
                            {
                                style: {
                                    color: params.row.dealRate <= 0 ? "red" : "#04B05D",
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
                    title: "老客业绩",
                    key: "oldCustomerPerformance",
                    minWidth: 150,
                    align: "center",
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
                },
                {
                    title: "贡献",
                    key: "rate",
                    minWidth: 150,
                    align: "center",
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
            if (!startDate || !endDate) {
                this.$Message.warning("请选择日期！");
                return;
            }
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
<style scoped>
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
</style>
