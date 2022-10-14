<template>
<div>
    <div class="content" >
        <div class="left">
            <Card :dis-hover="true">
                <div>
                    <div class="h1">啊美雅批注</div>
                    
                    <div>
                        <div class="h2">提升措施与计划批注：</div>
                        <Input
                            v-model="form.amiyaImprovePlanRemark"
                            style="width: 100%; "
                            type="textarea"
                            :rows="5"
                            disabled
                        />
                        <div class="h2">分享本机构成功案例批注：</div>
                        <Input
                            v-model="form.amiyaShareSuccessCase"
                            style="width: 100%; "
                            type="textarea"
                            :rows="5"
                            disabled
                        />
                        <div class="h2">提升建议批注：</div>
                        <Input
                            v-model="form.amiyaImproveSuggestionRemark"
                            style="width: 100%; "
                            type="textarea"
                            :rows="5"
                            disabled
                        />
                        <div class="h2">提升需求批注：</div>
                        <Input
                            v-model="form.amiyaImproveDemandRemark"
                            style="width: 100%; "
                            type="textarea"
                            :rows="5"
                            disabled
                            
                        />
                    </div>
                </div>
            </Card>
        </div>
        <div class="right">
            <Card >
                <div>
                    <div class="h1">本机构运营提升计划(机构)</div>
                    <div class="h3">本机构</div>
                    <div>
                        <div class="h2">提升措施与计划：</div>
                        <Input
                            v-model="form.hospitalImprovePlan"
                            style="width: 100%; "
                            type="textarea"
                            :rows="5"
                            disabled
                        />
                        <div class="h2">分享本机构成功案例分享：</div>
                        <Input
                            v-model="form.hospitalShareSuccessCase"
                            style="width: 100%; "
                            type="textarea"
                            :rows="5"
                            disabled
                        />
                        <div class="h3">对啊美雅</div>
                        <div class="h2">提升建议：</div>
                        <Input
                            v-model="form.improveSuggestionToAmiya"
                            style="width: 100%; "
                            type="textarea"
                            :rows="5"
                            disabled
                        />
                        <div class="h2">提升需求：</div>
                        <Input
                            v-model="form.improveDemandToAmiya"
                            style="width: 100%; "
                            type="textarea"
                            :rows="5"
                            disabled
                        />
                    </div>
                    
                    
                </div>
                
            </Card>
        </div>
    </div>
</div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
export default {
    props:{
        hospitalId:Number,
        indicatorsId:String,
    },
    components:{
        
    },
    data(){
        return{
            employeeType:sessionStorage.getItem('employeeType'),
            form:{
                // 指标id
                indicatorId:'',
                // 医院id
                hospitalId:null,
                // 机构提升措施与计划
                hospitalImprovePlan:'',
                // 啊美雅对机构提升措施与计划批注
                amiyaImprovePlanRemark:'',
                // 机构分享成功案例
                hospitalShareSuccessCase:'',
                // 啊美雅对机构分享成功案例批注
                amiyaShareSuccessCase:'',
                // 机构对啊美雅的提升建议
                improveSuggestionToAmiya:'',
                // 啊美雅批注机构提升建议
                amiyaImproveSuggestionRemark:'',
                // 机构对啊美雅的提升需求
                improveDemandToAmiya:'',
                // 啊美雅批注机构提升需求
                amiyaImproveDemandRemark:'',
                id:''
            },
            hospitalImprovePlanInfo:{},
            isEdit:true
        }
    },
    methods:{
        handleSubmit(){
            const { indicatorId, hospitalId, hospitalImprovePlan ,amiyaImprovePlanRemark,hospitalShareSuccessCase,amiyaShareSuccessCase,improveSuggestionToAmiya,
            amiyaImproveSuggestionRemark,improveDemandToAmiya,amiyaImproveDemandRemark
            } = this.form;
            const  data ={ 
                indicatorId:sessionStorage.getItem('fillInindicatorId'), 
                hospitalId:this.hospitalId, 
                hospitalImprovePlan ,
                amiyaImprovePlanRemark,
                hospitalShareSuccessCase,
                amiyaShareSuccessCase,
                improveSuggestionToAmiya,
                amiyaImproveSuggestionRemark,
                improveDemandToAmiya,
                amiyaImproveDemandRemark
            }
            // 添加
            api.addHospitalImprovePlan(data).then((res) => {
            if (res.code === 0) {
                this.isEdit = false;
                this.getbyIdHospitalImprovePlan();
                this.$Message.success({
                    content: "提交成功",
                    duration: 3,
                });
            }
            });
        },
        getbyIdHospitalImprovePlan(val1,val2){
            const data = {
                indicatorId:val1,
                hospitalId:val2
            }
            api.byIdHospitalImprovePlan(data).then((res) => {
                if (res.code === 0) {
                    const {hospitalImprovePlanInfo} = res.data
                    //机构
                    this.form.hospitalImprovePlan=hospitalImprovePlanInfo.hospitalImprovePlan
                    this.form.hospitalShareSuccessCase=hospitalImprovePlanInfo.hospitalShareSuccessCase
                    this.form.improveSuggestionToAmiya=hospitalImprovePlanInfo.improveSuggestionToAmiya
                    this.form.improveDemandToAmiya=hospitalImprovePlanInfo.improveDemandToAmiya
                        //阿美雅
                    this.form.amiyaImprovePlanRemark=hospitalImprovePlanInfo.amiyaImprovePlanRemark
                    this.form.amiyaShareSuccessCase=hospitalImprovePlanInfo.amiyaShareSuccessCase
                    this.form.amiyaImproveSuggestionRemark=hospitalImprovePlanInfo.amiyaImproveSuggestionRemark
                    this.form.amiyaImproveDemandRemark=hospitalImprovePlanInfo.amiyaImproveDemandRemark
                }
            });
        }
    },
    
}
</script>
<style scoped >
.content{
    display: flex;
    justify-content: space-between;
}
.left,.right{
    width: 49%;
}
.h1{
    font-size: 22px;
    font-weight: bold;
    color: #000;
}
.h2{
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin: 10px 0;
}
.h3{
    font-size: 18px;
    font-weight: bold;
    color: #000;
    background: #DEC350;
    margin: 10px 0;
    width: 40%;
    padding: 5px;
    box-sizing: border-box;
}
.button{
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
</style>
