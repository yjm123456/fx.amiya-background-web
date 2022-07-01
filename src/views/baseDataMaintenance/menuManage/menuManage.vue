<template>
    <div>
        <Card class="head">
            <div >
                <Button
                    type="primary"
                    @click="
                        controlModals = true;
                        title = '添加';
                    "
                    style="margin"
                >添加一级菜单</Button>
                <Button
                    type="primary"
                    @click="
                        memuModals = true;
                        title = '添加';
                    "
                    style="margin-left:10px"
                >添加二级菜单</Button>
            </div>
        </Card>
        <Card>
            <Table :columns="columns" :data="data" ref="tableExpand" :row-class-name="getRowClassName" @on-row-click="toggleTableExpand">
            </Table>
        </Card>
        <Modal
            v-model="controlModals"
            :title="title"
            :mask-closable="false"
            width="600"
            @on-visible-change="handleModalVisibleChange"
        >
            <Form
                ref="form"
                :model="form"
                :rules="ruleValidate"
                label-position="left"
                :label-width="110"
            >   
                <FormItem label="一级菜单描述" prop="description" >
                    <Input v-model="form.description" placeholder="请输入一级菜单描述 例子：轮播图管理"></Input>
                </FormItem>
                <FormItem label="一级菜单名称" prop="name" >
                    <Input v-model="form.name" placeholder="请输入一级菜单name 例子：carouselManage"></Input>
                </FormItem>
                <FormItem label="一级菜单路径" prop="path" >
                    <Input v-model="form.path" placeholder="请输入一级路径 例子：/carouselManage"></Input>
                </FormItem>
                <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
                    <i-switch v-model="form.valid" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancelSubmit('form')">取消</Button>
                <Button type="primary" @click="handleSubmit('form')">确定</Button>
            </div>
        </Modal>
        <Modal
            v-model="memuModals"
            :title="title"
            :mask-closable="false"
            width="600"
            @on-visible-change="handleModalVisibleChange"
        >
            <Form
                ref="secondForms"
                :model="secondForms"
                :rules="menuValidate"
                label-position="left"
                :label-width="110"
            >   
                <FormItem label="选择一级菜单" prop="moduleCategoryId">
                    <Select
                        v-model="secondForms.moduleCategoryId"
                        placeholder="请选择对应的一级菜单"
                        filterable
                    >
                        <Option
                        v-for="item in moduleCreate"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.description }}</Option
                        >
                    </Select>
                </FormItem>
                <FormItem label="二级菜单描述" prop="description" >
                    <Input v-model="secondForms.description" placeholder="请输入二级菜单描述 例子：轮播图"></Input>
                </FormItem>
                <FormItem label="二级菜单名称" prop="name" >
                    <Input v-model="secondForms.name" placeholder="请输入二级菜单name 例子：carouselManage"></Input>
                </FormItem>
                <FormItem label="二级菜单路径" prop="path" >
                    <Input v-model="secondForms.path" placeholder="请输入二级路径 例子：/carouselManage"></Input>
                </FormItem>
                <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
                    <i-switch v-model="secondForms.valid" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="secondCancelSubmit('secondForms')">取消</Button>
                <Button type="primary" @click="secondHandleSubmit('secondForms')">确定</Button>
            </div>
        </Modal>
        
    </div>
</template>
<script>
    import expandRow from './components/treeGrid.vue';
    import * as api from "@/api/baseDataMaintenance";
    export default {
        components: { 
            expandRow 
        },
        data () {
            return {
                moduleCreate:[],
                memuModals:false,
                // 是否是编辑
                isEdit: false,
                title:'添加',
                controlModals:false,
                form:{
                    name:"",
                    description:"",
                    path:"",
                    valid:false,
                    id:""
                },
                secondForms:{
                    description:"",
                    path:"",
                    moduleCategoryId:"",
                    name:"",
                    valid:false
                },
                ruleValidate: {
                    name: [
                        {
                            required: true,
                            message: "请输入一级菜单name",
                        },
                    ],
                    path: [
                        {
                            required: true,
                            message: "请输入一级菜单路径",
                        },
                    ],
                    description: [
                        {
                            required: true,
                            message: "请输入一级描述",
                        },
                    ],
                   
                },
                menuValidate: {
                    moduleCategoryId: [
                        {
                            required: true,
                            message: "请选择对应的一级菜单",
                        },
                    ],
                    name: [
                        {
                            required: true,
                            message: "请输入二级菜单name",
                        },
                    ],
                    path: [
                        {
                            required: true,
                            message: "请输入二级菜单路径",
                        },
                    ],
                    description: [
                        {
                            required: true,
                            message: "请输入二级描述",
                        },
                    ],
                   
                },
                columns: [
                    {
                        type: 'expand', 
                        width: 50,
                        render: (h, params) => {
                            if(!params.row.moduleList.length) return 
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                },
                                on:{
                                    handleResetList:()=>{ 
                                        this.getMenuList()
                                    },
                                    addMenuModel:()=>{
                                        this.memuModals = true
                                    },
                                    editMenuModel:(item,fisrtDate)=>{
                                        const {id } = item
                                        const {valid} = fisrtDate
                                        if(valid===false){
                                            this.$Message.error('请开启一级菜单')
                                            return
                                        }
                                        this.memuModals = true
                                        this.title = '编辑'
                                        this.getFirstMenu()
                                        api.bySecondModuleCategory(id).then((res) => {
                                            if (res.code === 0) {
                                                const {
                                                id,
                                                name,
                                                description,
                                                path,
                                                valid,
                                                moduleCategoryId
                                                } = res.data.moduleCategory;
                                                this.isEdit = true;
                                                this.secondForms.id = id;
                                                this.secondForms.name = name;
                                                this.secondForms.description = description;
                                                this.secondForms.moduleCategoryId = moduleCategoryId;
                                                this.secondForms.path = path;
                                                this.secondForms.valid = valid;
                                            }
                                        });
                                        
                                    },
                                    
                                }
                            }) 
                        }
                    },
                    {
                        title: '菜单描述',
                        key: 'description',
                        width:295
                    },
                    {
                        title: '状态',
                        key: 'valid',
                        align: "center",
                        render: (h, params) => {
                            if(params.row.valid == false){
                                return h('div',{
                                    'style': {
                                        'color': 'red'
                                    },
                                    
                                },params.row.valid == false ? '无效' : '有效')
                            } else {
                                return h('div',{
                                    'style': {
                                        'color': '#515a6e'
                                    }
                                },params.row.valid == false ? '无效' : '有效')
                            }
                        },

                    },
                    {
                        title: "移动方向",
                        key: "",
                        align: "center",
                        width: 400,
                        render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            const { id } = params.row;
                                            let moveState = true
                                            this.topToBottomClass(id,moveState)
                                        },
                                    },
                                },
                                "置顶"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            const { id } = params.row;
                                            let moveState = false
                                            this.topToBottomClass(id,moveState)
                                        },
                                    },
                                },
                                "置底"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            const { id } = params.row;
                                           let moveState = true
                                           this.moveUpAndDown(id,moveState)
                                        },
                                    },
                                },
                                "向上"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            const { id } = params.row;
                                           let moveState = false
                                           this.moveUpAndDown(id,moveState)
                                        },
                                    },
                                },
                                "向下"
                            ),
                        ]);
                    },
                    },
                    {
                        title: "操作",
                        key: "",
                        align: "center",
                        render: (h, params) => {
                        return h("div", [
                            
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            const { id } = params.row;
                                            this.title = "修改";
                                            this.controlModals = true
                                            api.byFirstModuleCategory(id).then((res) => {
                                                if (res.code === 0) {
                                                    const {
                                                    id,
                                                    name,
                                                    description,
                                                    path,
                                                    valid
                                                    } = res.data.moduleCategory;
                                                    this.isEdit = true;
                                                    this.form.id = id;
                                                    this.form.name = name;
                                                    this.form.description = description;
                                                    this.form.path = path;
                                                    this.form.valid = valid;
                                                    this.controlModal = true;
                                                }
                                            });
                                            
                                        },
                                    },
                                },
                            "修改"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small",
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                              title: "删除提示",
                                              content: "是否确认删除？",
                                              onOk: () => {
                                                const { id } = params.row;
                                                api.deleteModuleCategory(id).then((res) => {
                                                  if (res.code === 0) {
                                                    this.getMenuList();
                                                    this.$Message.success({
                                                      content: "删除成功",
                                                      duration: 3,
                                                    });
                                                  }
                                                });
                                              },
                                            });
                                        },
                                    },
                                },
                                "删除"
                            ),
                        ]);
                    },
                    },
                ],
                data: []
            }
        },
        methods: {
            // 获取一级菜单（下拉框）
            getFirstMenu(){
                api.getFirstMenu().then((res) => {
                    if (res.code === 0) {
                        const { moduleCreate } = res.data;
                        this.moduleCreate = moduleCreate;
                    }
                });
            },
            // 获取菜单列表
            getMenuList(){
                api.menuModuleList().then((res) => {
                    if (res.code === 0) {
                        const { menuModule } = res.data;
                        this.data = menuModule;
                    }
                });
            },
            getRowClassName(row) {
                if(!row.moduleList.length) {
                    return 'test'
                }
            },
            toggleTableExpand(row, index) {
                if(!row.moduleList.length) return
        // 　　  　　this.$refs.tableExpand.toggleExpand(index);
        　  　},
            //   置顶/置底一级菜单
            topToBottomClass(id,moveState){
                const data = {
                    id : id,
                    moveState : moveState
                }
                api.firstMovetopordownModuleCategory(data).then((res) => {
                    if(res.code === 0 ){
                        if(moveState == true){
                            this.$Message.success('一级菜单置顶成功')
                        }else{
                            this.$Message.success('一级菜单置底成功')
                        }
                        this.getMenuList()
                    }
                })
            },
            // 向上/向下一级菜单
            moveUpAndDown(id,moveState){
                const data = {
                    id : id,
                    moveState : moveState
                }
                api.firstMoveModuleCategory(data).then((res) => {
                    if(res.code === 0 ){
                        if(moveState == true){
                            this.$Message.success('一级菜单向上移动成功')
                        }else{
                            this.$Message.success('一级菜单向下移动成功')
                        }
                        this.getMenuList()
                    }
                })
            },
            
            secondHandleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const { name, description, path , id , valid , moduleCategoryId} = this.secondForms;
                        if (this.isEdit) {
                            // 修改
                            const data = {
                                id,
                                name,
                                description,
                                path,
                                valid,
                                moduleCategoryId
                            };
                            api.editSecondModuleCategroy(data).then((res) => {
                                if (res.code === 0) {
                                    this.isEdit = false;
                                    this.secondCancelSubmit("secondForms");
                                    this.getMenuList();
                                    this.$Message.success({
                                        content: "修改成功",
                                        duration: 3,
                                    });
                                }
                            });
                        } else {
                            // 添加
                            const data = {
                                name,
                                description,
                                path,
                                moduleCategoryId
                            };
                            api.AddSecondModuleCategory(data).then((res) => {
                                if (res.code === 0) {
                                    this.secondCancelSubmit("secondForms");
                                    this.getMenuList();
                                    this.$Message.success({
                                        content: "添加成功",
                                        duration: 3,
                                    });
                                }
                            });
                        }
                    }
                });
            },
            // 确认
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const { name, description, path , id , valid} = this.form;
                        if (this.isEdit) {
                            // 修改
                            const data = {
                                id,
                                name,
                                description,
                                path,
                                valid
                            };
                            api.editModuleCategroy(data).then((res) => {
                                if (res.code === 0) {
                                    this.isEdit = false;
                                    this.cancelSubmit("form");
                                    this.getMenuList();
                                    this.$Message.success({
                                        content: "修改成功",
                                        duration: 3,
                                    });
                                }
                            });
                        } else {
                            // 添加
                            const data = {
                                name,
                                description,
                                path
                            };
                            api.AddModuleCategory(data).then((res) => {
                                if (res.code === 0) {
                                    this.cancelSubmit("form");
                                    this.getMenuList();
                                    this.getFirstMenu()
                                    this.$Message.success({
                                        content: "添加成功",
                                        duration: 3,
                                    });
                                }
                            });
                        }
                    }
                });
            },
            // 取消
            cancelSubmit(name) {
                this.isEdit = false;
                this.controlModals = false;
                this.$refs[name].resetFields();
            },
            // 取消
            secondCancelSubmit(name) {
                this.isEdit = false;
                this.memuModals = false;
                this.$refs[name].resetFields();
            },
            handleModalVisibleChange(value){
                if (!value) {
                    this.isEdit = false;
                    this.$refs["form"].resetFields();
                    this.$refs["secondForms"].resetFields();
                }
            },
            
        },
        created(){
            this.getMenuList()
            this.getFirstMenu()
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