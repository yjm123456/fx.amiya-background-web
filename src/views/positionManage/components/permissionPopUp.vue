<template>
    <Modal
      v-model="controlModals"
      :title="'分配权限 ' + ' (' + this.positionNames+')'"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      fullscreen
    >
      <Table :columns="permissionPopUpcolumns" :data="menuModule" ref="tableExpand" :row-class-name="getRowClassName" 
        @on-select="handleSelect"
        @on-select-cancel="handleCancel"
        @on-select-all="handleSelectAll"
        @on-select-all-cancel="handleSelectAll"
        @on-expand="expand"
        ></Table>
      <div slot="footer">
        <Button @click="cancelSubmit()">取消</Button>
        <Button type="primary" @click="handleSubmit()">确定</Button>
      </div>
    </Modal>
</template>
<script>
import * as api from "@/api/positionManage";
import permissionPopUpTree from "./permissionPopUpTree.vue"

export default {
    components:{
        permissionPopUpTree
    },
   props:{
        permissionPopUpModal: {
            type: Boolean,
        },
        positionId:{
            type:Number
        },
        positionName:{
            type:String
        }
   },
   data(){
       return{
           positionNames:"",
           controlModals:false,
           permissionPopUpcolumns: [
                {
                    type: 'selection', 
                    width: 35,
                },
                {
                    type: 'expand', 
                    width: 50,
                    render: (h, params) => {
                        if(!params.row.moduleList.length) return 
                        return h(permissionPopUpTree, {
                            props: {
                                row: params.row,
                            },
                            on:{
                                handleModuleEvent: ({ row, item, isPermission }) => {
                                // 拿到源数据的索引
                                let findIndex = this.menuModule.findIndex(selItem=> selItem.id === row.id);

                                if (isPermission) {
                                    // 通过索引找到当前菜单分类设置源数据的isPermission 这一步比较关键
                                    this.menuModule[findIndex].moduleList.forEach(moduleItem=> {
                                        if(moduleItem.id === item.id) {
                                            moduleItem.isPermission = true;
                                        }
                                    })

                                    // 组合数据
                                    let data = {
                                        amyPositionId: this.positionId,
                                        moduleCategoryId: row.id,
                                        moduleId: item.id,
                                    };
                                    
                                    // 添加
                                    this.selectedList.push(data)

                                    // some=true 说明 selectedList 存在此菜单分类的数据 这个时候设置_checked为true 
                                    let some = this.selectedList.some(selItem=> selItem.moduleCategoryId === row.id);
                                    if(some === true) {
                                        // 通过索引找到当前菜单分类设置_checked
                                        this.menuModule[findIndex]._checked = true;
                                    }
                                    // console.log(this.selectedList,"添加")
                                } else {
                                    // 通过索引找到当前菜单分类设置源数据的isPermission 这一步比较关键
                                    this.menuModule[findIndex].moduleList.forEach(moduleItem=> {
                                        if(moduleItem.id === item.id) {
                                            moduleItem.isPermission = false;
                                        }
                                    })
                                    
                                    // 删除
                                    this.selectedList = this.selectedList.filter(selItem=> selItem.moduleId !== item.id);

                                    // some=false 说明 selectedList 已经不存在此菜单分类的数据 这个时候重置_checked为false 
                                    let some = this.selectedList.some(selItem=> selItem.moduleCategoryId === row.id);
                                    if(some === false) {
                                        // 通过索引找到当前菜单分类重置_checked
                                        this.menuModule[findIndex]._checked = false;
                                    }
                                    
                                    // console.log(this.selectedList,"删除")
                                }   
                                }                            
                            }
                        }) 
                    }
                },
                {
                    title: '菜单',
                    key: 'description',
                },
                
           ],
           menuModule: [],
           selectedList:[]
       }
   },
   methods:{
       handleSelect(selection, row) {
        // 选中
        let findIndex = this.menuModule.findIndex((item) => item.id === row.id);
        this.menuModule[findIndex]._checked = true;
        this.menuModule[findIndex].moduleList.forEach(
            (item) => (item.isPermission = true)
        );

        let selectedList = row.moduleList.map((moduleItem) => {
            return {
                amyPositionId: this.positionId,
                moduleCategoryId: row.id,
                moduleId: moduleItem.id,
            };
        });
        
        this.selectedList.push(...selectedList);
        // console.log(this.selectedList, "选中");
        },

        handleCancel(selection, row) {
        // 取消选中
        let findIndex = this.menuModule.findIndex((item) => item.id === row.id);
        this.menuModule[findIndex]._checked = false;
        this.menuModule[findIndex].moduleList.forEach(
            (item) => (item.isPermission = false)
        );  
        
        this.selectedList = this.selectedList.filter(
            (item) => item.moduleCategoryId !== row.id
        );
        // console.log(this.selectedList, "取消选中");
        },

        handleSelectAll(selection) {
            // 取消全选
        if (selection && selection.length === 0) {
            this.menuModule.forEach(item=> {
                item._checked = false;
                item.moduleList.forEach(moduleItem=> {
                    moduleItem.isPermission = false;
                })
            })
            this.selectedList = [];
            // console.log(this.selectedList, "取消全选");
        } else {
            // 全选
            this.menuModule.forEach(item=> {
                if (item.moduleList.length===0){
                     item._disabled = true;
                }else{
                    // 一级的
                    item._checked = true;
                }
            
            item.moduleList.forEach(moduleItem=> {
                // 二级的
                moduleItem.isPermission = true;
            })
            })
            this.selectedList = selection
            .map((item) => {
                return item.moduleList.map((moduleItem) => {
                return {
                    amyPositionId: this.positionId,
                    moduleCategoryId: item.id,
                    moduleId: moduleItem.id,
                };
                });
            })
            .flat();
            // console.log(this.selectedList, "全选");
        }
        },

        expand(row,status){
            let findIndex = this.menuModule.findIndex((item) => item.id === row.id);
            this.menuModule[findIndex]._expanded = status;
        },
        
        // 根据职称获取菜单
       getPermissionMenu(){
            api.getPermissionMenu(this.positionId).then((res) => {
                if (res.code === 0) {
                    const {menuModule} = res.data;
                    this.menuModule = menuModule.map(item=> {
                        return {
                            ...item,
                            _checked:false,
                            _expanded:false,
                        }
                    })
                    this.selectedList = this.menuModule
                    .map((item) => {
                        if (item.moduleList.length===0) item._disabled = true;
                    return item.moduleList
                        .filter((moduleItem) => {
                        if (moduleItem.isPermission) item._checked = true;
                        
                        return moduleItem.isPermission;
                        })
                        .map((moduleItem) => {
                        return {
                            amyPositionId: this.positionId,
                            moduleCategoryId: item.id,
                            moduleId: moduleItem.id,
                        };
                        });
                    })
                    .flat();
                    // console.log(this.selectedList, "init",menuModule);
                }
            });
       },
        //提交    
       handleSubmit(){
             api.updateAmyPositionAuth(this.selectedList).then((res) => {
                 if(res.code===0){
                     this.getPermissionMenu()
                     this.$emit("update:permissionPopUpModal", false);
                     this.$Message.success({
                        content: "权限已分配成功",
                        duration: 3,
                    });
                 }
             })
        },
        getRowClassName(row) {
            if(!row.moduleList.length) {
                return 'test'
            }
        },
        handleModalVisibleChange(value){
            if (!value) {
                this.$emit("update:permissionPopUpModal", false);
                this.getPermissionMenu()
            }
        },
         // 取消
        cancelSubmit(name) {
            this.isEdit = false;
            this.$emit("update:permissionPopUpModal", false);
            this.getPermissionMenu()
        },
   },
   created(){
   },
   watch:{
       permissionPopUpModal(value){
           this.controlModals = value
       },
       positionId:{
           handler(newValue) {
               this.getPermissionMenu();
           },
           immediate:true
       },
       positionName(value){
           this.positionNames = value
       }

   }

}
</script>
<style lang="less" scoped>
.head{
    margin-bottom: 16px;
}
/deep/ .test .ivu-icon{
    visibility: hidden;
}
</style>