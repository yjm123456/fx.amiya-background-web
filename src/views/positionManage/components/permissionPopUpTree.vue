<template>
    <div >
        <Row class="expand-row" v-for="(item,index) in row.moduleList" :key="index" row-class-name="rows">
            <Col span="5">
                <Checkbox v-model="item.isPermission" @on-change="handleCheckboxChange(row, item, $event)">
                    <span class="expand-value"  style="margin-left:20px">{{ item.description  }}</span>
                </Checkbox>
            </Col>
        </Row>
    </div>
</template>
<script>
    import * as api from "@/api/baseDataMaintenance";
    export default {
        props: {
            row: Object,
        },
        data(){
            return {
            }
        },
        methods:{
            handleCheckboxChange(row, item, isPermission){
                this.$emit("handleModuleEvent", {
                    row,
                    item,
                    isPermission,
                });
            }
        },
        watch:{
            row:{
                handler(value) {
                    // console.log(value,"watch")
                },
                deep:true,
                immediate:true
            }
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