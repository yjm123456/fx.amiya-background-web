<template>
    <div >
        <Row class="expand-row" v-for="(item,index) in row.moduleList" :key="index" row-class-name="rows">
            <Col span="5">
                <Radio v-model="item._checked" @on-change="radioClick(item)">
                    <span class="expand-value"  style="margin-left:20px">{{ item.description  }}</span>
                </Radio>
            </Col>
        </Row>
    </div>
</template>
<script>
    import * as api from "@/api/baseDataMaintenance";
    export default {
        props: {
            row: Object,
            doctorPositionId:Number,
            menuModuleData:Array
        },
        data(){
            return {
                form:{
                    amyPositionId :"",
                    moduleId : ""
                }
            }
        },
        methods:{
            radioClick(value){
                this.menuModuleData.map((item,index)=>{
                    item.moduleList.map((moduleItem,index)=>{
                        if(moduleItem.id==value.id){
                            this.menuModuleData[index]["_highlight"] = true;
                            moduleItem._checked = true
                            this.form = {
                                amyPositionId : this.doctorPositionId,
                                moduleId : moduleItem.id
                            }
                        }
                        else{
                            moduleItem._checked = false
                            this.menuModuleData[index]["_highlight"] = false;
                        }
                    })
                })
                this.$emit('radioFun',this.form)
            }
        },
        created(){
        },
        watch:{
            
        }

    };
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #ccc !important;
        padding-bottom: 15px !important;
    }
    .expand-row:last-child{
        border-bottom: none !important;
        padding-bottom: 0 !important;
    }
    .active{
        color: red;
    }
    .rows{
        
    }

</style>