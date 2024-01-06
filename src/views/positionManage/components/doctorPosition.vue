<template>
    <Modal
      v-model="controlModals"
      :title="'首页置换 ' + ' (' + this.doctorPositionNames+')'"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      fullscreen
    >
      <Table :columns="permissionPopUpcolumns" :data="menuModuleData" ref="tableExpand" :row-class-name="getRowClassName"   @on-row-click="toggleTableExpand" ></Table>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
</template>
<script>
import * as api from "@/api/positionManage";
import doctorPositionTree from "./doctorPositionTree.vue"

export default {
    components:{
        doctorPositionTree
    },
   props:{
        doctorPositionModal: {
            type: Boolean,
        },
        doctorPositionId:{
            type:Number
        },
        doctorPositionName:{
            type:String
        }
   },
   data(){
       return{
           doctorPositionNames:"",
           controlModals:false,
           permissionPopUpcolumns: [
                // {
                //     type: 'selection', 
                //     width: 35,
                // },
                {
                    type: 'expand', 
                    width: 50,
                    render: (h, params) => {
                        if(!params.row.moduleList.length) return 
                        return h(doctorPositionTree, {
                            props: {
                                row: params.row,
                                doctorPositionId:this.doctorPositionId,
                                menuModuleData:this.menuModuleData
                            },
                            on:{
                                radioFun:(val)=>{
                                    this.form.amyPositionId = val.amyPositionId
                                    this.form.moduleId = val.moduleId
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
           menuModuleData: [],
           selectedList:[],
           defaultRoute:"",
           form:{
               amyPositionId :"",
               moduleId : ""
           },
           obj:{

           }
       }
   },
   methods:{
        handleSubmit(value){
            const {amyPositionId,moduleId} = this.form
            const data = {
                amyPositionId,
                moduleId
            }
            api.updateAmyPositionIndex(data).then((res) => {
                if(res.code === 0){
                    this.$emit("update:doctorPositionModal", false);
                    this.getDefaultRoutefun(()=>{
                        this.getDoctorPositionMenu()
                    })
                    this.$Message.success({
                        content: "首页置换成功",
                        duration: 3,
                    });
                }
            })
        },
        // 根据职称获取菜单
        getDoctorPositionMenu(){
            api.getPermissionMenu(this.doctorPositionId).then((res) => {
                if (res.code === 0) {
                    const {menuModule} = res.data;
                    // this.menuModuleData = menuModule.map((item)=> {
                    //     item.moduleList = item.moduleList.map(moduleItem=> {
                    //         return {
                    //             ...moduleItem,
                    //             _checked:false
                    //         }
                    //     })

                    //     return  {
                    //         ...item,
                    //         _highlight:false,
                    //     }
                    // }).map(item=> {
                    //     item.moduleList.forEach(moduleItem=> {
                    //         if(this.defaultRoute === moduleItem.path) {
                    //             moduleItem._checked = true;
                    //             item._highlight = true;
                    //         }
                    //     })
                    //     return item;
                    // })
                    
                    let menulist = menuModule.map((item,index)=>{
                        let moduleList = item.moduleList.map(moudelItem=>{
                            if(this.defaultRoute == moudelItem.path){
                                //根据判断默认path和二级页面的path是否相等 如果相等 默认选中那一行
                                menuModule[index]["_highlight"] = true;
                                this.form.amyPositionId = this.doctorPositionId
                                this.form.moduleId = moudelItem.id
                                let obj ={
                                    ...moudelItem,
                                    _checked:true
                                }
                                return obj
                            }else{
                                return {
                                    ...moudelItem,
                                    _checked:false
                                }
                            }
                        })
                        return {
                            ...item,
                            moduleList
                        }
                    })
                    this.menuModuleData = menulist
                }
            });
       },
        // 根据职称获取默认首页
        getDefaultRoutefun(callback){
            const data = {
                amyPositionId : this.doctorPositionId
            }
            api.getDefaultRoute(data).then((res) => {
                if(res.code === 0){
                    const {data} = res.data
                    this.defaultRoute = data;
                    callback && callback();
                }
            })
        },
        getRowClassName(row) {
            if(!row.moduleList.length) {
                return 'test'
            }
          
        },
        toggleTableExpand(row, index) {
            if(!row.moduleList.length) return
    　  },
        handleModalVisibleChange(value){
            if (!value) {
                this.$emit("update:doctorPositionModal", false);
                this.getDefaultRoutefun(()=>{
                    this.getDoctorPositionMenu()
                })
            }
        },
         // 取消
        cancelSubmit(name) {
            this.isEdit = false;
            this.$emit("update:doctorPositionModal", false);
            this.getDefaultRoutefun(()=>{
                this.getDoctorPositionMenu()
            })
        },
   },
   created(){

   },
   watch:{
       doctorPositionModal(value){
           this.controlModals = value
       },
       doctorPositionId(newValue){
           if(newValue) {
               this.getDefaultRoutefun(()=>{
                    this.getDoctorPositionMenu()
                })
           }
       },
       doctorPositionName(value){
           this.doctorPositionNames = value
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