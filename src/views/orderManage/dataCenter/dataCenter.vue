<template>
    <div>
        <Card :dis-hover="true">
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
        </Card>
        <div class="content">
            <div class="list_item">
                <Card class="card">
                    <dispatchEchart ref="dispatchEchart" :orderDataInfo="orderDataInfo" ></dispatchEchart>
                    <div class="echart_text" v-if="flag">
                        <div >累计已派单：{{orderDataInfo.allSendOrder}}</div>
                        <div  class="text" >累计未派单：{{orderDataInfo.allUnSendOrder}}</div>
                    </div>
                </Card>
            </div>
            <div class="list_item">
                <Card >
                    <achievement ref="achievement" :achievementInfo="achievementInfo" ></achievement>
                    <div class="echart_text1"  v-if="flag">
                        <div>累计新客业绩：{{achievementInfo.allNewCustomerAchievement}}</div>
                        <div class="text1">累计老客业绩：{{achievementInfo.allOldCustomerAchievement}}</div>
                        <div  class="text1">总业绩：{{achievementInfo.allAchievement}}</div>
                    </div>
                </Card>
            </div>
        </div>
        <div class="content">
            <div class="list_item">
                <Card >
                    <numberOfVisits ref="numberOfVisits" :orderVisitInfo="orderVisitInfo" ></numberOfVisits>
                    <div class="echart_text2"  v-if="flag">
                        <div>累计新诊上门：{{orderVisitInfo.allNewCustomerVisit}}</div>
                        <div class="text">累计复诊上门：{{orderVisitInfo.allOldCustomerVisit}}</div>
                        <div class="text">总上门：{{orderVisitInfo.allNewCustomerVisit + orderVisitInfo.allOldCustomerVisit}}</div>
                    </div>
                </Card>
            </div>
            <div class="list_item">
                <Card class="card">
                    <faceToCard ref="faceToCard" :consultationCardInfo="consultationCardInfo" ></faceToCard>
                    <div class="echart_text3"  v-if="flag">
                        <div>累计面诊卡下单量：{{consultationCardInfo.allConsultationCardInfoBuy}}</div>
                        <div class="text">累计面诊卡消耗量：{{consultationCardInfo.allConsultationCardInfoUsed}}</div>
                    </div>
                </Card>
            </div>
        </div>

        <div class="tab">
            <Tabs ref="tabs" v-model="activeName">
                <TabPane label="医院业绩" name="医院业绩">
                    <hospitalPerformance :activeName="activeName" :hospitalOrderAndPriceInfoVo="hospitalOrderAndPriceInfoVo"></hospitalPerformance>
                </TabPane>
                <TabPane label="成交量" name="成交量">
                    <numberOfTransactions :activeName="activeName" :times="query" ref="numberOfTransactions"></numberOfTransactions>
                </TabPane>
                <TabPane label="对账业绩" name="对账业绩">
                    <reconciliationPerformance :activeName="activeName" :times="query" ref="reconciliationPerformance"></reconciliationPerformance>
                </TabPane>
                <TabPane label="咨询达人业绩" name="咨询达人业绩">
                    <consultantPerformance :activeName="activeName" :times="query" ref="consultantPerformance"></consultantPerformance>
                </TabPane>
                <TabPane label="达人助理业绩" name="达人助理业绩">
                    <performanceOftalentAssistant :activeName="activeName" :times="query" ref="performanceOftalentAssistant"></performanceOftalentAssistant>
                </TabPane>
                <TabPane label="行政客服业绩" name="行政客服业绩">
                    <administrativeCustomer  :activeName="activeName" :times="query" ref="administrativeCustomer "></administrativeCustomer >
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import * as api from "@/api/orderManage";
import dispatchEchart from "./components/dispatchEcharts.vue"
import achievement from "./components/achievement.vue"
import numberOfVisits from "./components/numberOfVisits.vue"
import faceToCard from "./components/faceToCard.vue"
import hospitalPerformance from "./components/hospitalPerformance.vue"
import numberOfTransactions from "./components/numberOfTransactions.vue"
import reconciliationPerformance from "./components/reconciliationPerformance.vue"
import consultantPerformance from "./components/consultantPerformance.vue"
import performanceOftalentAssistant from "./components/performanceOftalentAssistant.vue"
import administrativeCustomer from "./components/administrativeCustomer.vue"

export default {
    components:{
        dispatchEchart,
        achievement,
        hospitalPerformance,
        numberOfTransactions,
        numberOfVisits,
        faceToCard,
        reconciliationPerformance,
        consultantPerformance,
        performanceOftalentAssistant,
        administrativeCustomer
    },
    data(){
        return {
            activeName:'医院业绩',
            sevenButtonType:'primary',
            thirtyButtonType:'default',
            query:{
                startDate:this.$moment().subtract(6, "days").format('YYYY-MM-DD'),
                endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
                
            },
            // 派单情况
            orderDataInfo:{},
            // 业绩情况
            achievementInfo:{},
            // 上门数情况
            orderVisitInfo:{},
            // 面诊卡情况
            consultationCardInfo:{},
            // 医院订单量/医院业绩
            hospitalOrderAndPriceInfoVo:[],
            // 
            flag:false
            
        }
    },
    methods:{
        // 近7天
        sevenDays(){
            this.query.startDate = this.$moment().subtract(6, "days").format('YYYY-MM-DD')
            this.query.endDate =  this.$moment().format('YYYY-MM-DD')
            this.sevenButtonType = 'primary'
            this.thirtyButtonType = 'default'
            const data = {
                startDate: this.query.startDate,
                endDate : this.query.endDate
            }
            this.getData(data)
            if(this.activeName == "成交量"){    
                this.$refs.numberOfTransactions.getOrderOperationCondition(data);
            }
            if(this.activeName == "对账业绩"){
                this.$refs.reconciliationPerformance.getOrderOperationCondition(data);
            }
            if(this.activeName == "咨询达人业绩"){
                this.$refs.consultantPerformance.getOrderOperationCondition(data);
            }
            if(this.activeName == "达人助理业绩"){
                this.$refs.performanceOftalentAssistant.getOrderOperationCondition(data);
            }
            if(this.activeName == "行政客服业绩"){
                this.$refs.administrativeCustomer.getOrderOperationCondition(data);
            }
        },
        // 近30天
        thirtyDays(){
            this.query.startDate = this.$moment().subtract(29, "days").format('YYYY-MM-DD')
            this.query.endDate =  this.$moment().format('YYYY-MM-DD')
            this.thirtyButtonType = 'primary'
            this.sevenButtonType = 'default'
            const data = {
                startDate: this.query.startDate ,
                endDate : this.query.endDate 
            }
            this.getData(data)
            if(this.activeName == "成交量"){    
                this.$refs.numberOfTransactions.getOrderOperationCondition(data);
            }
            if(this.activeName == "对账业绩"){
                this.$refs.reconciliationPerformance.getOrderOperationCondition(data);
            }
            if(this.activeName == "咨询达人业绩"){
                this.$refs.consultantPerformance.getOrderOperationCondition(data);
            }
            if(this.activeName == "达人助理业绩"){
                this.$refs.performanceOftalentAssistant.getOrderOperationCondition(data);
            }
            if(this.activeName == "行政客服业绩"){
                this.$refs.administrativeCustomer.getOrderOperationCondition(data);
            }
        },
        getData(){
            const {startDate,endDate} = this.query
            const data = {
                startDate:startDate ? this.$moment(startDate).format('YYYY-MM-DD') : null,
                endDate : endDate ? this.$moment(endDate).format('YYYY-MM-DD') : null
            }
            if(data.startDate != null  && data.endDate != null){
                api.OrderCenter(data).then((res) => {
                if (res.code === 0) {
                    const { sendOrderInfo,achievement ,orderVisitInfo,consultationCardInfo,hospitalOrderAndPriceInfoVo} = res.data.orderData;
                    this.orderDataInfo = sendOrderInfo
                    this.achievementInfo = achievement
                    this.orderVisitInfo = orderVisitInfo
                    this.consultationCardInfo = consultationCardInfo
                    this.hospitalOrderAndPriceInfoVo = hospitalOrderAndPriceInfoVo
                    this.flag = true
                }
                });
            }else{
                this.$Message.error('请选择时间')
            }
        },

    },
    created() {
        this.getData();
    },
}
</script>
<style scoped>
.content{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  overflow: hidden;
}
.list_item{
  width: 49.5%;
}
.tab{
    margin-top: 10px;
}
.card{
    position: relative;
}
 .echart_text{
    /* display: flex;
    justify-content: flex-end;
    margin-top: 10px; */
    position: absolute;
    top: 15px;
    left: 34%;
    display: flex;
}
.echart_text1{
    position: absolute;
    top: 16px;
    left: 40%;
    display: flex;
}
.echart_text2{
    position: absolute;
    top: 16px;
    left: 38%;
    display: flex;
}
.echart_text3{
    position: absolute;
    top: 16px;
    left: 43%;
    display: flex;
}
.text{
    margin-left: 15px;
}
.text1{
    margin-left: 10px;
}
</style>
