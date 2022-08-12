<template>
    <div>
        <Card :dis-hover="true">
            <div class="header_wrap">
                <div class="left">
                    <!-- <DatePicker
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
                    <Button
                        type="primary"
                        style="margin-left: 10px"
                        @click="visualKanbanModel=true;$refs.visualKanban.visualKanbanInfo();$refs.visualKanban.getWeather_mini();"
                        >数据监控中心</Button
                    > -->
                </div>
                <!-- 1管理员 14客服主管 16研发-->
                <div class="right" v-if="amiyaPositionId==1 || amiyaPositionId==14 || amiyaPositionId==16">
                    <span style="color:#57A3F3">管理员邮箱通知</span>
                    <i-switch v-model="emailNotice" @on-change="isMailboxChange" style="margin-left:10px"/>
                </div>
            </div>
        </Card>
        <!-- <div class="content">
            <div class="list_item">
                <Card >
                    <orderOperation  ref="orderOperations" ></orderOperation>
                </Card>
            </div>
           
            <div class="list_item">
                <Card>
                    <reservationOperation  ref="reservationOperation"></reservationOperation>
                </Card>
            </div>
        </div> -->
        <!-- <div class="content"> -->
            <Card class="list_item">
                <div class="title">订单报表</div>      
                <div class="list">
                    <div class="item" @click="orderListReportModal=true;$refs.orderListReport.getsendOrderReport();">
                        <i class="iconfont icon-a-74wodedingdan frist_icons" style="font-size:55px"></i>       
                        <div class="item_title">下单平台订单报表</div>
                    </div>
                    <div class="item" @click="paymentOrderReportModal=true;$refs.paymentOrderReport.getpaymentOrderReport();">
                        <i class="iconfont icon-kehufukuan second_icons2_pad"></i>       
                        <div class="item_title">订单付款报表</div>
                    </div>
                    <div class="item" @click="dispatchReportModal=true;$refs.dispatchReport.getsendOrderReport();">
                        <i class="iconfont icon-zidongpaidan thir_icons"></i>       
                        <div class="item_title">订单派单报表</div>
                    </div>
                    <div class="item" @click="orderWriteOffModal=true;$refs.orderWriteOff.getOrderWriteOffReport();">
                        <i class="iconfont icon-xingzhuang1757 four_icons"></i>       
                        <div class="item_title">订单核销报表</div>
                    </div>
                    <div class="item" @click="refundOrderReportModal=true;$refs.refundOrderReport.getrefundOrderReport();">
                        <i class="iconfont icon-dingdan_tuikuandingdan five_icons"></i>       
                        <div class="item_title">订单退款报表</div>
                    </div>
                    <div class="item" @click="smallYellowCarRegistrationModel=true;$refs.smallYellowCarRegistrationReport.getshoppingCartRegistrationReport();">
                        <i class="iconfont icon-dengjibaobiao-01 car_icon"></i>       
                        <div class="item_title">小黄车登记报表</div>
                    </div>
                    <!-- <div class="item" @click="orderDispatchModel=true;$refs.orderDispatch.getsendOrderReport()">
                        <i class="iconfont icon-kehuyuyue thir_icons"></i>       
                        <div class="item_title">订单派单2</div>
                    </div> -->
                </div>
                <!-- <div class="list">
                    <div class="item" @click="customerAppointmentModal=true;$refs.customerAppointmentCom.getsendOrderReport();">
                        <i class="iconfont icon-kehuyuyue frist_icons"></i>       
                        <div class="item_title">客户预约报表</div>
                    </div>
                </div> -->
            </Card>
            <Card class="list_item">
                <div class="title">医院报表</div>      
                <div class="list">
                    <div class="item" @click="hospitalOrderQuantityModel=true;$refs.hospitalOrderQuantity.gethospitalOrderQuantitys();">
                        <i class="iconfont icon-xiugaidingdan frist_icons"></i>       
                        <div class="item_title">医院订单量报表</div>
                    </div>
                    <div class="item" @click="hospitalAppointmentsModel=true;$refs.hospitalAppointments.gethospitalAppointments();">
                        <i class="iconfont icon-ico_yuyueguanli_yuyuebiangeng hos_icons2"></i>       
                        <div class="item_title">医院预约量报表</div>
                    </div>
                </div>
            </Card>
        <!-- </div> -->
        <!-- <div class="content"> -->
            <Card class="list_item">
                <div class="title">财务报表</div>      
                <div class="list">
                    <div class="item" @click="moneyReportModel=true;$refs.customerOrderReceivables.getcustomerOrderReceivableReports();">
                        <i class="iconfont icon-shoukuan frist_icons"></i>       
                        <div class="item_title">客户订单应收款统计</div>
                    </div>
                    <div class="item"  @click="customerUpgradeModel=true;$refs.customerUpgrade.getcustomerUpgrade()">
                            <i class="iconfont icon-kehushendan sd_iconts"></i>       
                            <div class="item_title">客户升单报表</div>
                    </div>
                    <div class="item" @click="anchorIPOperationReportModal=true;$refs.anchorIPOperationReport.getliveAnchorOperatingReport()">
                        <i class="iconfont icon-IPyunying zb_icons"></i>       
                        <div class="item_title">主播IP运营报表</div>
                    </div>
                    <div class="item" @click="contentDealModal=true;$refs.contentPlatformTransactionReport.ContentPlatFormOrderDealReport();">
                        <i class="iconfont icon-kuapingtaiyingyong cj_icons"></i>       
                        <div class="item_title">内容平台成交报表</div>
                    </div>
                    <div class="item" @click="transactionStatementModal=true;$refs.transactionStatement.transactionStatement();">
                        <!-- <i class="iconfont icon-kuapingtaiyingyong cj_icons"></i>        -->
                        <div class="item_img">
                            <img :src="transactionStatus" alt="" srcset="" class="images">
                        </div>
                        <div class="item_title">成交情况报表</div>
                    </div>
                </div>
            </Card>
            <Card class="list_item">
                <div class="title">客服报表</div>      
                <div class="list">
                    <!-- 客服未派单报表 不要状态筛选 -->
                    <!-- <div class="item"  @click="customerServiceUnDispatchModel=true;$refs.customerServiceUnDispatch.getCustomerServiceList()">
                        <i class="iconfont icon-order-incomplete frist_icons"></i>       
                        <div class="item_title">客服未派单报表</div>
                    </div>    
                    <div class="item"  @click="customerServiceOrderModel=true;$refs.customerServiceOrder.getCustomerServiceList()">
                        <i class="iconfont icon-dingdanshenpi hos_icons2"></i>       
                        <div class="item_title">客服已派单报表</div>
                    </div> -->
                    <div class="item"  @click="customerNoDispatchModel=true;$refs.customerNoDispatchReport.getCustomerServiceUnDispatch();$refs.customerNoDispatchReport.getCustomerServiceList()">
                        <i class="iconfont icon-order-incomplete frist_icons"></i>       
                        <div class="item_title">客服未派单报表</div>
                    </div>  
                    <div class="item"  @click="customerServiceDispatchOrderModel=true;$refs.customerServiceDispatchOrderReport.getCustomerServiceDispatchedOrders();$refs.customerServiceDispatchOrderReport.getCustomerServiceList()">
                        <i class="iconfont icon-dingdanshenpi hos_icons2"></i>       
                        <div class="item_title">客服已派单报表</div>
                    </div>
                </div>
            </Card>
        <!-- </div> -->
        <!-- 订单核销报表 -->
        <orderWriteOff :orderWriteOffModal.sync="orderWriteOffModal" ref="orderWriteOff"></orderWriteOff>
        <!-- 订单派单报表 -->
        <dispatchReport :dispatchReportModal.sync="dispatchReportModal" ref="dispatchReport"></dispatchReport>
        <!-- 客户预约报表 -->
        <customerAppointmentCom :customerAppointmentModal.sync="customerAppointmentModal" ref="customerAppointmentCom"></customerAppointmentCom>
        <!-- 客户订单应收款统计 -->
        <customerOrderReceivables :moneyReportModel.sync = "moneyReportModel" ref="customerOrderReceivables" :checkStateListAll="checkStateListAll"></customerOrderReceivables>
        <!-- 医院订单量报表 -->
        <hospitalOrderQuantity :hospitalOrderQuantityModel.sync="hospitalOrderQuantityModel" ref="hospitalOrderQuantity"></hospitalOrderQuantity>
        <!-- 医院预约量报表 -->
        <hospitalAppointments :hospitalAppointmentsModel.sync="hospitalAppointmentsModel" ref="hospitalAppointments"></hospitalAppointments>
        <!-- 客服订单报表 改 客服已派单报表 -->
        <customerServiceOrder :customerServiceOrderModel.sync="customerServiceOrderModel" ref="customerServiceOrder"></customerServiceOrder>
        <!-- 客服未派单报表 -->
        <customerServiceUnDispatch :customerServiceUnDispatchModel.sync = "customerServiceUnDispatchModel" ref="customerServiceUnDispatch"></customerServiceUnDispatch>
        <!-- 可视化看板 -->
        <visualKanban :visualKanbanModel.sync="visualKanbanModel" ref="visualKanban" ></visualKanban>
        <!-- 客户升单报表 -->
        <customerUpgrade :customerUpgradeModel.sync="customerUpgradeModel" ref="customerUpgrade" :hospitalNameList="hospitalNameList"></customerUpgrade>
        <!--  订单派单2 -->
        <orderDispatch :orderDispatchModel.sync="orderDispatchModel" ref="orderDispatch" ></orderDispatch>
        <!-- 付款订单报表 -->
        <paymentOrderReport :paymentOrderReportModal.sync="paymentOrderReportModal" ref="paymentOrderReport" ></paymentOrderReport>
        <!-- 退款订单报表 -->
        <refundOrderReport :refundOrderReportModal.sync="refundOrderReportModal" ref="refundOrderReport" ></refundOrderReport>
        <!-- 主播IP运营报表 -->
        <anchorIPOperationReport :anchorIPOperationReportModal.sync="anchorIPOperationReportModal" ref="anchorIPOperationReport" ></anchorIPOperationReport>
        <!-- 内容平台成交报表 -->
        <contentPlatformTransactionReport :contentDealModal.sync="contentDealModal" ref="contentPlatformTransactionReport" :contentPalteForms.sync = "contentPalteForms" :dealHospitalList="dealHospitalList"></contentPlatformTransactionReport>
        <!-- 下单平台订单报表 -->
        <orderListReport :orderListReportModal.sync="orderListReportModal" ref="orderListReport" ></orderListReport>
        <!-- 客服未派单报表（下单平台、内容平台） -->
        <customerNoDispatchReport :customerNoDispatchModel.sync="customerNoDispatchModel" ref="customerNoDispatchReport" ></customerNoDispatchReport>
        <!-- 客服已派单报表（下单平台、内容平台） -->
        <customerServiceDispatchOrderReport :customerServiceDispatchOrderModel.sync="customerServiceDispatchOrderModel" ref="customerServiceDispatchOrderReport" :dispatchHospital="dispatchHospital"></customerServiceDispatchOrderReport>
        <!-- 小黄车登记报表 -->
        <smallYellowCarRegistrationReport :smallYellowCarRegistrationModel.sync="smallYellowCarRegistrationModel" ref="smallYellowCarRegistrationReport" :contentPalteForms="contentPalteForms" :emergencyLevelListAll="emergencyLevelListAll"></smallYellowCarRegistrationReport>
        <!-- 成交情况报表 -->
        <transactionStatement :transactionStatementModal.sync="transactionStatementModal" ref="transactionStatement" :transactionParams="transactionParams"></transactionStatement>
    </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance"
import * as apis from "@/api/customerManage.js";
import * as shopApi from "@/api/shoppingCartRegistration";

import transactionStatus from "@/assets/images/report/transactionStatus.png"

import orderDispatch from "./components/orderDispatchs.vue"
import orderOperation from "./components/orderOperation.vue"
import reservationOperation from "./components/reservationOperation.vue"
import orderWriteOff from "./components/orderWriteOff.vue"
import dispatchReport from "./components/dispatchReport.vue"
import customerAppointmentCom from "./components/customerAppointment.vue"
import customerOrderReceivables from "./components/customerOrderReceivables.vue"
import hospitalOrderQuantity from "./components/hospitalOrderQuantity.vue"
import hospitalAppointments from "./components/hospitalAppointments.vue"
import customerServiceOrder from "./components/customerServiceOrder.vue"
import customerServiceUnDispatch from "./components/customerServiceUnDispatch.vue"
import visualKanban from "./components/visualKanban.vue"
import customerUpgrade from "./components/customerUpgrade.vue"
import paymentOrderReport from "./components/paymentOrderReport.vue"
import refundOrderReport from "./components/refundOrderReport.vue"
import anchorIPOperationReport from "./components/anchorIPOperationReport.vue"
import contentPlatformTransactionReport from "./components/contentPlatformTransactionReport.vue"
import orderListReport from "./components/orderListReport/orderList.vue"
import customerNoDispatchReport from "./components/customerNoDispatchReport/customerNoDispatchReport.vue"
import customerServiceDispatchOrderReport from "./components/customerServiceDispatchOrderReport/customerServiceDispatchOrderReport.vue"
import smallYellowCarRegistrationReport from "./components/smallYellowCarRegistrationReport/smallYellowCarRegistrationReport.vue"
import transactionStatement from "./components/transactionStatement.vue"
export default {
    components:{
        orderDispatch,
        orderOperation,
        reservationOperation,
        orderWriteOff,
        dispatchReport,
        customerAppointmentCom,
        customerOrderReceivables,
        hospitalOrderQuantity,
        hospitalAppointments,
        customerServiceOrder,
        customerServiceUnDispatch,
        visualKanban,
        customerUpgrade,
        paymentOrderReport,
        refundOrderReport,
        anchorIPOperationReport,
        contentPlatformTransactionReport,
        orderListReport,
        customerNoDispatchReport,
        customerServiceDispatchOrderReport,
        smallYellowCarRegistrationReport,
        transactionStatement
    },
    data(){
        return {
            // 成交报表图片
            transactionStatus,
            amiyaPositionId:sessionStorage.getItem('amiyaPositionId'),
            // 是否开启邮箱
            emailNotice:false,
            orderDispatchModel:false,
            visualKanbanModel:false,
            orderWriteOffModal:false,
            dispatchReportModal:false,
            customerAppointmentModal:false,
            moneyReportModel:false,
            hospitalOrderQuantityModel:false,
            hospitalAppointmentsModel:false,
            customerServiceOrderModel:false,
            customerServiceUnDispatchModel:false,
            customerUpgradeModel:false,
            paymentOrderReportModal:false,
            refundOrderReportModal:false,
            anchorIPOperationReportModal:false,
            contentDealModal:false,
            orderListReportModal:false,
            customerNoDispatchModel:false,
            customerServiceDispatchOrderModel:false,
            smallYellowCarRegistrationModel:false,
            transactionStatementModal:false,

            sevenButtonType:'primary',
            thirtyButtonType:'default',
            isEcharts:true,
            isEchartsReser:false,
            query:{
                startDate:this.$moment().subtract(6, "days").format('YYYY-MM-DD'),
                endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
                
            },
            // 主播平台
            contentPalteForms:[],
            // 医院列表
            hospitalNameList: [{ name: "全部升单医院", id: -1 }],
            dealHospitalList:[{ name: "全部最终成交医院", id: -1 }],
            checkStateListAll: [{ id: -1, name: "全部审核状态" }],
            dispatchHospital:[{ name: "全部派单医院", id: -1 }],
            // 成交情况报表参数
            transactionParams:{
                employee:[{ id: -1, name: "全部绑定客服" }],
                dealHospitalList:[{ name: "全部最终到院医院", id: -1 }],
                 // 到院类型
                toHospitalTypeList:[{orderType:-1,orderTypeText:'全部到院类型'}],
            },
            // 重要程度
           emergencyLevelListAll:[{emergencyLevel:-1,emergencyLevelText:'全部重要程度'}]
            
        }
    },
    methods:{
        // 紧急程度（下拉框）
        getEmergencyLevels(){
            shopApi.emergencyLevels().then((res) => {
                if (res.code === 0) {
                const { emergencyLevels } = res.data;
                    this.emergencyLevelListAll = [...this.emergencyLevelListAll,...emergencyLevels]
                }
            });
        },
        //   获取订单到院类型
        getcontentPlateFormOrderToHospitalTypeList() {
            api.contentPlateFormOrderToHospitalTypeList().then((res) => {
                if (res.code === 0) {
                const { orderTypes } = res.data;
                this.transactionParams.toHospitalTypeList = [...this.transactionParams.toHospitalTypeList,...orderTypes]
                }
            });
        },
        // 获取客服列表
        getCustomerServiceList() {
            api.getCustomerServiceList().then((res) => {
                if (res.code === 0) {
                const { employee } = res.data;
                this.transactionParams.employee = [...this.transactionParams.employee, ...employee];
                }
            });
        },
        // 获取审核情况（下拉框）
        getCheckStateList() {
            apis.getCheckStateList().then((res) => {
                if (res.code === 0) {
                const { checkStateList } = res.data;
                this.checkStateList = checkStateList;
                this.checkStateListAll = [
                    ...this.checkStateListAll,
                    ...checkStateList,
                ];
                }
            });
        },
        // 获取合作过的医院列表
        getHospitalList(){
            api.getHospitalList().then((res) => {
                if(res.code === 0){
                const { hospitalInfo} = res.data
                this.hospitalNameList = [...this.hospitalNameList,...hospitalInfo];
                this.dealHospitalList = [...this.dealHospitalList,...hospitalInfo];
                this.transactionParams.dealHospitalList = [...this.transactionParams.dealHospitalList,...hospitalInfo];
                this.dispatchHospital = [...this.dispatchHospital,...hospitalInfo];
                }
            })
        },
        //   获取平台（下拉框）
        getContentValidList(){
            contentPlatForm.getContentPlatFormValidList().then((res) => {
                if(res.code === 0){
                const {contentPalteForms} = res.data
                this.contentPalteForms = contentPalteForms
                }
            })
        },
        // 获取当前邮箱通知状态
        getEmailNoticeControll(){
            api.getEmailNoticeControll().then((res) => {
                if(res.code ===0){
                    const {emailNotice} = res.data
                    this.emailNotice = emailNotice
                }
            })
        },
        // 是否开启邮箱
        isMailboxChange(status){
            console.log(status,"status")
            const data = {
                emailNotice:status
            }
            api.updateEmailNoticeControll(data).then((res) => {
                if(res.code === 0 ){
                    this.getEmailNoticeControll()
                }
            })
        },
        tabEcharts(){
            this.isEchartsReser = !this.isEchartsReser
            this.isEcharts = !this.isEcharts
            console.log(this.isEcharts,this.isEchartsReser)
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
            // this.$refs.orderOperations.getOrderOperationCondition(data);
            // this.$refs.reservationOperation.getAppointmentOperationCondition(data);
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
            // this.$refs.orderOperations.getOrderOperationCondition(data);
            // this.$refs.reservationOperation.getAppointmentOperationCondition(data);
        },
        getData(){
            // 当天日期 转换开始时间
            let dates = new Date(this.query.startDate)
            let ys = dates.getFullYear()
            let ms = dates.getMonth() + 1
            ms = ms < 10 ? ('0' + ms) : ms
            let ds = dates.getDate()
            ds = ds < 10 ? ('0' + ds) : ds
            const times =  ys + '-' + ms + '-' + ds;
            // 当天日期 转换结束时间
            let date = new Date(this.query.endDate)
            let y = date.getFullYear()
            let m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            const time =  y + '-' + m + '-' + d;
            const data = {
                startDate:this.query.startDate ? times : null,
                endDate : this.query.endDate ? time : null
            }
            // this.$refs.orderOperations.getOrderOperationCondition(data);
            // this.$refs.reservationOperation.getAppointmentOperationCondition(data);
        },

    },
    created(){
        this.getEmailNoticeControll()
        this.getContentValidList()
        this.getHospitalList()
        this.getCheckStateList()
        this.getCustomerServiceList()
        this.getcontentPlateFormOrderToHospitalTypeList()
        this.getEmergencyLevels()
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
  margin-top: 20px;
}
.header_wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
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
//   width: 49.5%;
  width: 100%;
  margin-top: 10px;
}
list_items{
    width: 33%;
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
.frist_icons,.second_icons2,.thir_icons,.hos_icons2,.four_icons,.second_icons2_pad,.five_icons,.zb_icons,.cj_icons,.car_icon{
  border-radius: 5px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.sd_iconts{
  border-radius: 5px;
  width: 60px;
  height: 60px;
  color: #13227A;
  border: 1px solid #13227A;
  font-size: 36px;
  text-align: center;
  padding: 2px 0px 0 11px;
  box-sizing: border-box;
  margin-bottom: 10px;

}
.zb_icons{
  border-radius: 5px;
  width: 60px;
  height: 60px;
  color: #D4237A;
  border: 1px solid #D4237A;
  font-size: 36px;
  text-align: center;
  padding: 2px 0px 0 22px;
  box-sizing: border-box;
  margin-bottom: 10px;

}
.frist_icons{
  color: #D81E06;
  border: 1px solid #D81E06;
  font-size: 40px;

}
.second_icons2_pad{
    color: #13227A;
    border: 1px solid #13227A;
    font-size: 40px;
    text-align: center;
    padding-left:25px ;
    box-sizing: border-box;

}
.second_icons2{
  color: #13227A;
  border: 1px solid #13227A;
  font-size: 36px;

}
.thir_icons{
  color: #D4237A;
  border: 1px solid #D4237A;
  font-size: 40px;
}
.hos_icons2{
   color: #13227A;
  border: 1px solid #13227A;
  font-size: 40px;
}
.four_icons{
    color: #ea8c4e;
    border: 1px solid #ea8c4e;
    font-size: 40px;
}
.cj_icons{
    color: #ea8c4e;
    border: 1px solid #ea8c4e;
    font-size: 40px;
    padding-left: 27px;
    box-sizing: border-box;
}
.five_icons{
    color: #1296db;
    border: 1px solid #1296db;
    font-size: 40px;
}
.car_icon{
    color: #D81E06;
    border: 1px solid #D81E06;
    font-size: 60px;
}
.images{
    width: 40px;
    height: 40px;
    display: inline-block;
}
.item_img{
    padding:9px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border: 1px solid #1296db;
    display: flex;
    align-items:center;
    justify-content: center;
    border-radius: 5px;
}
</style>
