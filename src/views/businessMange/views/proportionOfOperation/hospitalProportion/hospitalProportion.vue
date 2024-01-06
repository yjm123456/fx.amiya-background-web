<template>
    <div>
        <div class="content">
            <Card class="item">
                <div >
                    <totalPerformance :totalPerformnaceRatio="hospitalPerformanceData.totalPerformnaceRatio"></totalPerformance>
                </div>
            </Card>
            <Card class="item">
                <div >
                    <newCustomerPer :newCustomerPerformanceRatio="hospitalPerformanceData.newCustomerPerformanceRatio"></newCustomerPer>
                </div>
            </Card>
            <Card class="item">
                <div>
                    <oldCustomerPer :oldCustomerPerformanceRatio="hospitalPerformanceData.oldCustomerPerformanceRatio"></oldCustomerPer>
                </div>
            </Card>
        </div>
        <div class="content2">
            <Card class="item">
                <div >
                    <dispatch :sendOrderPerformanceRatio="hospitalPerformanceData.sendOrderPerformanceRatio"></dispatch>
                </div>
            </Card>
            <Card class="item">
                <div >
                    <newCustomerToHospitalPerformanceRatio :newCustomerToHospitalPerformanceRatio="hospitalPerformanceData.newCustomerToHospitalPerformanceRatio"></newCustomerToHospitalPerformanceRatio>
                </div>
            </Card>
            <Card class="item">
                <div>
                    <newCustomerDealCountRatio :newCustomerDealCountRatio="hospitalPerformanceData.newCustomerDealCountRatio"></newCustomerDealCountRatio>
                </div>
            </Card>
        </div>
        
    </div>
</template>
<script>
import * as api from "@/api/hospitalAchievement";
import totalPerformance from "./components/totalPerformance.vue"
import newCustomerPer from "./components/newCustomerPer.vue"
import oldCustomerPer from "./components/oldCustomerPer.vue"
import dispatch from "./components/dispatch.vue"
import newCustomerToHospitalPerformanceRatio from "./components/newCustomerToHospitalPerformanceRatio.vue"
import newCustomerDealCountRatio from "./components/newCustomerDealCountRatio.vue"
export default {
    props: ["active"],
    components:{
        totalPerformance,
        newCustomerPer,
        oldCustomerPer,
        dispatch,
        newCustomerToHospitalPerformanceRatio,
        newCustomerDealCountRatio
    },
    data(){
        return{
            hospitalPerformanceData:{}
        }
    },
    methods:{
        // 全国top10机构
        topTenHospitalPerformanceData() {
            api.topTenHospitalPerformanceData().then((res) => {
                if (res.code === 0) {
                const { hospitalPerformanceData } = res.data;
                this.hospitalPerformanceData = hospitalPerformanceData;
                }
            });
        },
    },
    watch:{
        active: {
        handler(value) {
            if (value === "hospitalProportion") {
                this.topTenHospitalPerformanceData()
            }
        },
        immediate: true,
        },
    }
}
</script>

<style scoped>
.content,.content2{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
}
.content2{
    margin-top: 10px;
}
.item{
    width: 33%;
}
</style>