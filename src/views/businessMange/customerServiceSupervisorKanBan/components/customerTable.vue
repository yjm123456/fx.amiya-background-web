<template>
    <div>
        <Card  class="m_b">
            <div class="h3">助理（月度）业绩转化分析</div>
            <!-- tab切换 -->
            <!-- <div class="tab_content">
                <div class="tab">
                <div
                    class="tab_item"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="selectTab(index, item)"
                    :class="{ active: selected == item }"
                >
                    <span>{{ item }}</span>
                </div>
                </div>
            </div> -->
            <!-- <div v-for="(item,index) in query.data" :key="index">
                <Table border :columns="query.columns" :data="item" style="margin-top:10px"></Table>
            </div> -->
            <Table border :columns="query.columns" :data="query.data" style="margin-top:10px" height="500" :row-class-name="rowClassName"></Table>
        </Card>
    </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";

export default {
    props:{
        params:Object,
        liveAnchorBaseInfos:Array
    },
    data(){
        return{
           selected:'刀刀组',
           list:['刀刀组','吉娜组'],
           query: {
                columns: [
                {
                    title: "组别",
                    key: "groupName",
                    minWidth: 120,
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
                             params.row.groupName );
                    }
                    
                },
                {
                    title: "月份",
                    key: "yearAndMonth",
                    minWidth: 100,
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
                             params.row.yearAndMonth );
                    }
                    
                },
                {
                    title: '新客维度',
                    align: 'center',
                    className: 'test-name',
                    children: [
                        {
                            title: '实际分诊',
                            key: 'distributeConsulationNum',
                            align: 'center',
                            width: 100,
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
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
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
                            title: "派单量",
                            key: "sendOrderCount",
                            minWidth: 100,
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
                            title: "上门量",
                            key: "toHospitalCount",
                            minWidth: 100,
                            className: 'test-name',
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
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
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
                        {
                            title: "成交量",
                            key: "newCustomerDealCount",
                            minWidth: 100,
                            className: 'test-name',
                            align: "center",
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color: params.row.newCustomerDealCount <= 0 ? "red" : "#04B05D",
                                        },
                                    },
                                    params.row.newCustomerDealCount
                                );
                            },
                        },
                        {
                            title: "成交率",
                            key: "dealRate",
                            minWidth: 120,
                            align: "center",
                            className: 'test-name',
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
                            title: "业绩",
                            key: "newCustomerPerformance",
                            minWidth: 120,
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
                                    params.row.newCustomerPerformance ? Math.round( params.row.newCustomerPerformance/10000 *1000 / 10 ) / 100 : 0
                                );
                            },
                        },
                        {
                            title: "客单价",
                            key: "newCustomerUnitPrice",
                            minWidth: 120,
                            className: 'test-name',
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
                    ]
                },
                {
                        title: '老客维度',
                        align: 'center',
                        className: 'test-name',
                        children: [
                            {
                                title: "成交量",
                                key: "oldCustomerDealCount",
                                minWidth: 100,
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
                                title: "业绩",
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
                                title: "客单价",
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
                        ]
                    },
                   {
                        title: "总业绩",
                        key: "totalPerformance",
                        minWidth: 120,
                        align: "center",
                        fixed:'right',
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
                                params.row.totalPerformance ? Math.round( params.row.totalPerformance/10000 *1000 / 10 ) / 100 : 0
                            );
                        }
                        
                    },
                
                ],
                data:[],
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
        selectTab(index, value) {
            this.selected = value
            this.getAmiyaOperationsBoardassistantTransformData()
        },
        // 获取助理月度业绩转化分析
        getAmiyaOperationsBoardassistantTransformData() {
            const {startDate,endDate} = this.params
            const data = {
                startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
                endDate: this.$moment(endDate).format("YYYY-MM-DD"),
                baseLiveAnchorId: ''
            };
            api.AmiyaOperationsBoardassistantTransformData(data).then((res) => {
                if (res.code == 0) {
                    const {data} = res.data
                    this.query.data =data
                }
            });
        },
    }
}
</script>
<style scoped lang="less">
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
.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}


.tab{
    display: flex;
  text-align: start;
  padding-left: 10px;
}
.tab_item {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.active {
  color: #fff;
  border: 1px solid #2f8cf0;
  background: #2f8cf0;
}

</style>
