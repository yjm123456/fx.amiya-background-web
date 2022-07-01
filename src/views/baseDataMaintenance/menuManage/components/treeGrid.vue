<template>
    <div >
        <Row class="expand-row" v-for="(item,index) in row.moduleList" :key="index" row-class-name="rows">
            <Col span="5">
                <span class="expand-value"  style="margin-left:20px" >{{ item.description  }}</span>
            </Col>
            <Col span="5" style="text-align:center">
                <span :class="item.valid == true ? 'expand-value' : 'active'" >{{ item.valid == true ? '有效'  : '无效' }}</span>
            </Col>
            <Col span="6" style="text-align:center">
                <Button  size="small"  style="margin-left:10px" @click.stop="topping(item)">置顶</Button>
                <Button  size="small"  style="margin-left:10px" @click="bottomSetting(item)">置底</Button>
                <Button  size="small"  style="margin-left:10px" @click="up(item)">向上</Button>
                <Button  size="small"  style="margin-left:10px" @click="down(item)">向下</Button>
            </Col>
            <Col span="6" style="text-align:center">
                <!-- <Button type="primary" size="small"  style="margin-left:10px" @click="addMenu()">添加菜单</Button> -->
                <Button type="primary" size="small"  style="margin-left:10px" @click="edit(item,row)">修改</Button>
                <Button type="error" size="small"  style="margin-left:10px" @click="del(item,row)">删除</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
    import * as api from "@/api/baseDataMaintenance";
    export default {
        props: {
            row: Object
        },
        data(){
            return {
                
            }
        },
        methods:{
            // 置顶置底api
            toppingBottomMethods(id,moveState,moduleCategoryId ){
                const data = {
                    id,
                    moveState,
                    moduleCategoryId
                }
                api.secondMovetopordownModuleCategory(data).then((res) => {
                    if(res.code === 0 ){
                        if(moveState == true){
                            this.$Message.success('二级菜单置顶成功')
                        }else{
                            this.$Message.success('二级菜单置底成功')
                        }
                         this.$emit("handleResetList")
                    }
                })
            },
            // 向上想下移动api
            upDownMethods(id,moveState,moduleCategoryId){
                const data = {
                    id,
                    moveState,
                    moduleCategoryId
                }
                api.secondMoveModuleCategory(data).then((res) => {
                    if(res.code === 0 ){
                        if(moveState == true){
                            this.$Message.success('二级菜单向上移动成功')
                        }else{
                            this.$Message.success('二级菜单向下移动成功')
                        }
                         this.$emit("handleResetList")
                    }
                })
            },
            // 置顶
            topping(item){
                const {id,moduleCategoryId} = item
                this.toppingBottomMethods(id,true,moduleCategoryId)
            },
            // 置底
            bottomSetting(item){
                const {id,moduleCategoryId} = item
                this.toppingBottomMethods(id,false,moduleCategoryId)
            },
            // 向上
            up(item){
                const {id,moduleCategoryId} = item
                this.upDownMethods(id,true,moduleCategoryId)
            },
            // 向下
            down(item){
                const {id,moduleCategoryId} = item
                this.upDownMethods(id,false,moduleCategoryId)
            },
            // 添加菜单
            addMenu(item){
                this.$emit("addMenuModel")
            },
            // 编辑
            edit(item,firstDate){
                this.$emit("editMenuModel",item,firstDate)
            },
            // 删除
            del(item,firstDate){
                // this.$emit("delMenuModel",item)
                const {id} = item
                const {valid} = firstDate
                if(valid===false){
                    this.$Message.error('请开启一级菜单')
                    return
                }
                this.$Modal.confirm({
                    title: "删除提示",
                    content: "是否确认删除？",
                    onOk: () => {
                        api.deleteSecondModuleCategory(id).then((res) => {
                            if (res.code === 0) {
                                this.$emit("handleResetList")
                                this.$Message.success({
                                    content: "删除成功",
                                    duration: 3,
                                });
                            }
                        });
                    },
                });
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