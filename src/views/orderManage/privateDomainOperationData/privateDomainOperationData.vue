<template>
    <div>
        <Card :dis-hover="true">
            <div class="header_wrap">
                <div class="left">
                    <DatePicker
                        type="date"
                        placeholder="开始日期"
                        style="width: 200px"
                        :value="query.startDate"
                        v-model="query.startDate"
                    ></DatePicker>
                    <DatePicker
                        type="date"
                        placeholder="结束日期"
                        style="width: 200px; margin-left: 10px"
                        :value="query.endDate"
                        v-model="query.endDate"
                    ></DatePicker>
                    <Button
                        type="primary"
                        style="margin-left: 10px"
                        @click="getData()"
                        >查询</Button
                    >
                    <Button
                        :type="sevenButtonType"
                        style="margin-left: 30px"
                        @click="sevenDays()"
                        >近7天</Button
                    >
                    <Button
                        :type="thirtyButtonType"
                        style="margin-left: 10px"
                        @click="thirtyDays()"
                        >近30天</Button
                    >
                </div>
            </div>
        </Card>
        <div class="content">
            <div class="list_item">
                <Card >
                    <!-- 老客复购 柱状图 -->
                    <oldRepurchase  ref="oldRepurchase" :oldCustomerBuyInfo="oldCustomerBuyInfo"></oldRepurchase>
                </Card>
            </div>
           
            <div class="list_item">
                <Card>
                    <!-- 医院复购 柱状图 -->
                    <hospitalRepurchase  ref="hospitalRepurchases" :hospitalOrderAndPriceInfoVo="hospitalOrderAndPriceInfoVo"></hospitalRepurchase>
                </Card>
            </div>
        </div>
        <div class="content">
            <div class="list_item">
                <Card style="position:relative;"  class="container">
                    <div style="position:absolute;top:4.5%;left:60%" v-if="privateDomainAchievement.allOldCustomerAchievement">累计老客业绩:<span >{{privateDomainAchievement.allOldCustomerAchievement}}</span></div>
                    <!-- 老客业绩 折线图 -->
                    <regularCustomerConsumption  ref="regularCustomerConsumptions" :privateDomainAchievement="privateDomainAchievement"></regularCustomerConsumption>
                </Card>
            </div>
           
            <div class="list_item">
                <Card class="container">
                    <div>
                        <div class="title_h1">客户消费列表</div>
                        <Table border :columns="query.columns" :data="query.data" height="280"></Table>
                    </div>
                    <div class="page_wrap">
                        <Page
                        ref="pages"
                        :current="query.pageNum"
                        :page-size="query.pageSize"
                        :total="query.totalCount"
                        show-total
                        show-elevator
                        @on-change="handlePageChange"
                    />
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as apis from "@/api/customerManage.js";

import regularCustomerConsumption from "./components/regularCustomerConsumption.vue"
import oldRepurchase from "./components/oldRepurchase.vue"
import hospitalRepurchase from "./components/hospitalRepurchase.vue"



export default {
    components:{
        regularCustomerConsumption,
        oldRepurchase,
        hospitalRepurchase,
    },
    data(){
        return {
            sevenButtonType:'primary',
            thirtyButtonType:'default',
            amiyaPositionId:sessionStorage.getItem('amiyaPositionId'),
            customerServiceDispatchOrderModel:false,
            smallYellowCarRegistrationModel:false,
            isEcharts:true,
            isEchartsReser:false,
            hospitalOrderAndPriceInfoVo:[],
            oldCustomerBuyInfo:[],
            privateDomainAchievement:{},
            query:{
                startDate:this.$moment().subtract(6, "days").format('YYYY-MM-DD'),
                endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
                columns: [
          
                    {
                        title: "电话",
                        key: "phone",
                        align:'center',
                        width:120
                    },
                   
                    {
                        title: "最新消费时间",
                        key: "newConsumptionTime",
                        align:'center',
                        width:170,
                        render: (h, params) => {
                        return h(
                            "div",
                            params.row.newConsumptionPlatFormId == 0 ?  '' : this.$moment(params.row.newConsumptionTime).format(
                                "YYYY-MM-DD HH:mm:ss"
                            ) 
                        );
                        },
                    },
                    {
                        title: "最新消费平台",
                        key: "newConsumptionPlatForm",
                        align:'center',
                        width:130
                    },
                    {
                        title: "最新消费渠道",
                        key: "newConsumptionPlatFormAppTypeText",
                        align:'center',
                        width:130
                    },
                    
                    {
                        title: "累计消费",
                        key: "allConsumptionPrice",
                        align:'center',
                        width:120
                    },
                    {
                        title: "总单数",
                        key: "createdOrderNum",
                        align:'center',
                    },
                        
                ],
                data: [],
                pageNum: 1,
                pageSize: 5,
            },
        }
    },
    methods:{
        tabEcharts(){
            this.isEchartsReser = !this.isEchartsReser
            this.isEcharts = !this.isEcharts
        },
        // 近7天
        sevenDays(){
            let startDate = this.$moment().subtract(6, "days").format('YYYY-MM-DD')
            let endDate =  this.$moment().format('YYYY-MM-DD')
            this.query.startDate = startDate
            this.query.endDate = endDate
            this.sevenButtonType = 'primary'
            this.thirtyButtonType = 'default'
            const data = {
                startDate: this.query.startDate,
                endDate : this.query.endDate
            }
            this.bindCustomerConsumptionServerList()
            this.getData();
        },
        // 近30天
        thirtyDays(){
            let startDate = this.$moment().subtract(29, "days").format('YYYY-MM-DD')
            let endDate =  this.$moment().format('YYYY-MM-DD')
            this.query.startDate = startDate
            this.query.endDate = endDate
            this.thirtyButtonType = 'primary'
            this.sevenButtonType = 'default'
            const data = {
                startDate: this.query.startDate ,
                endDate : this.query.endDate 
            }
            this.bindCustomerConsumptionServerList()
            this.getData();
        },
        getData(){
            const {startDate,endDate} = this.query
            const data = {
                startDate:startDate ? this.$moment(startDate).format('YYYY-MM-DD') : null,
                endDate : endDate ? this.$moment(endDate).format('YYYY-MM-DD') : null
            }
            if(data.startDate != null  && data.endDate != null){
                api.GetPrivateDomainOrderDetailsInfo(data).then((res) => {
                if (res.code === 0) {
                    const { hospitalOrderAndPriceInfoVo,oldCustomerBuyInfo,privateDomainAchievement} = res.data.orderData;
                    this.oldCustomerBuyInfo = oldCustomerBuyInfo
                    this.privateDomainAchievement = privateDomainAchievement
                    this.hospitalOrderAndPriceInfoVo = hospitalOrderAndPriceInfoVo
                }
                });
            }else{
                this.$Message.error('请选择时间')
            }
        },
        // 获取绑定客服的客户列表
        bindCustomerConsumptionServerList() {
            this.$nextTick(() => {
                this.$refs["pages"].currentPage = 1;
            });
            const { pageNum, pageSize , startDate , endDate} = this.query;
            const data = {
                pageNum,
                pageSize,
                keyword:'',
                employeeId:-1,
                startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
                endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
                CconsumptionLevelId:null,
                channel:0,
                orderId:'',
            };
            apis.bindCustomerConsumptionServerList(data).then((res) => {
                if (res.code === 0) {
                const { list, totalCount } = res.data.customer;
                this.query.data = list;
                this.query.totalCount = totalCount;
                }
            });
        },

        // 获取绑定客服的客户列表分页
        handlePageChange(pageNum) {
            const {pageSize, startDate , endDate } = this.query;
            const data = {
                pageNum,
                pageSize,
                keyword:'',
                employeeId:-1,
                startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
                endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
                CconsumptionLevelId:null,
                channel:0,
                orderId:'',
            };
            apis.bindCustomerConsumptionServerList(data).then((res) => {
                if (res.code === 0) {
                const { list, totalCount } = res.data.customer;
                this.query.data = list;
                this.query.totalCount = totalCount;
                }
            });
        },

    },
    created(){
        this.bindCustomerConsumptionServerList()
    },
    mounted() {
        this.getData();
    },
    
}
</script>
<style lang="less" scoped>
.content{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.header_wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
}
.title{
  font-weight: bold;
  font-size: 17px;
  color: #000;
}
.item_title{
  color: #000;
}
.list_item{
  width: 49.8%;
  height: 300px;
  margin-top: 10px;
}

.list{
  display: flex;
  align-items: center;
}
.item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 30px 0;
}

.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.container{
    margin-top: 20px;
}
.title_h1{
    font-size: 18px;
    font-weight: bold;
    color: #516b91;
    text-align: center;margin-bottom: 6px;
}
</style>
