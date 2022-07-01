<template>
  <div>
    <Card :dis-hover="true">
      <Button
        type="primary"
        @click="
          controlModal = true;
          title = '添加';
        "
        >添加</Button
      >
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
    </Card>
    <!-- 添加/编辑 -->
    <Modal
      v-model="controlModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="职称名称" prop="name">
          <Input v-model="form.name"></Input>
        </FormItem>
        <FormItem label="部门" prop="departmentId">
          <Select
            v-model="form.departmentId"
            placeholder="请选择部门"
          >
            <Option
              v-for="item in department"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否是管理员" prop="isDirector" key="是否是管理员">
          <i-switch v-model="form.isDirector" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 按钮权限 -->
    <Modal
      v-model="buttonControlModal"
      title="按钮权限"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="buttonForm"
        :model="buttonForm"
        :rules="buttonRuleValidate"
        label-position="left"
        :label-width="100"
      >
      
        <FormItem label="按钮权限" prop="permissionIds">
          <Select
            v-model="buttonForm.permissionIds"
            placeholder="请选择按钮权限"
            multiple
          >
            <Option
              v-for="item in permissionSimpleInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.description }}</Option
            >
          </Select>
        </FormItem>
      
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('buttonForm')">取消</Button>
        <Button type="primary" @click="buttonHandleSubmit('buttonForm')">确定</Button>
      </div>
    </Modal>
    <!-- 权限分配 -->
    <permissionPopUp :permissionPopUpModal.sync = "permissionPopUpModal" :positionId = "positionId" :positionName = "positionName" ref="permissionPopUp"></permissionPopUp>
    <!-- 首页置换 -->
    <doctorPosition :doctorPositionModal.sync = "doctorPositionModal" :doctorPositionId = "doctorPositionId" :doctorPositionName = "doctorPositionName" ref="doctorPosition"></doctorPosition>
  </div>
</template>
<script>
import * as api from "@/api/positionManage";
import permissionPopUp from "./components/permissionPopUp.vue"
import doctorPosition from "./components/doctorPosition.vue"
export default {
  components:{
    permissionPopUp,
    doctorPosition
  },
  data() {
    return {
      // 查询
      query: {
        columns: [
          {
            title: "职称名称",
            key: "name",
          },
          {
            title: "所属部门",
            key: "departmentName",
          },
          {
            title: "创建日期",
            key: "createDate",
            render: (h, params) => {
              params.row.createDate = params.row.createDate
                ? params.row.createDate.substr(0, 10)
                : "";
              return h(
                "div",
                {
                  props: {},
                },
                params.row.createDate
              );
            },
          },
          {
            title: "更新日期",
            key: "updateDate",
            render: (h, params) => {
              params.row.updateDate = params.row.updateDate
                ? params.row.updateDate.substr(0, 10)
                : "";
              return h(
                "div",
                {
                  props: {},
                },
                params.row.updateDate
              );
            },
          },
          {
            title: "更新人",
            key: "updateName",
          },
          {
            title: "是否是管理员",
            key: "isDirector",
            render: (h, params) => {
              if (params.row.isDirector == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "操作",
            key: "",
            width: 400,
            align:"center",
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
                        api.byIdGetAmiyaPositionInfo(id).then((res) => {
                          if (res.code === 0) {
                            const { id, name, departmentId ,isDirector } = res.data.positionInfo;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.name = name;
                            this.form.isDirector = isDirector;
                            this.form.departmentId = departmentId;
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
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id ,name} = params.row;
                        this.permissionPopUpModal = true
                        this.positionId = id
                        this.positionName = name
                      },
                    },
                  },
                  "菜单权限"
                ),
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
                        const { id ,name} = params.row;
                        this.buttonControlModal = true
                        this.buttonForm.positionId = id
                        api.getPermissionsById(id).then((res) => {
                          if(res.code === 0){
                            const {permissionIds} = res.data
                            this.buttonForm.permissionIds = permissionIds
                          }
                        })
                      },
                    },
                  },
                  "按钮权限"
                ),
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
                        const { id , name } = params.row;
                        console.log(id,name)
                        this.doctorPositionModal = true
                        this.doctorPositionId = id
                        this.doctorPositionName = name
                      },
                    },
                  },
                  "首页置换"
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
                            api.deleteAmiyaPositionInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getAmiyaPositionInfo();
                                this.$Message.success({
                                  content: "删除成功",
                                  duration: 3,
                                });
                              }
                            });
                          },
                          onCancel: () => {},
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
        data: [],
      },
      
      permissionSimpleInfo:[],
      buttonControlModal:false,
      buttonForm:{
        permissionIds:[],
        positionId:""
      },
      // 控制 modal
      controlModal: false,
      // 控制权限弹窗
      permissionPopUpModal:false,
      // 控制首页置换弹窗
      doctorPositionModal:false,
      // 职称id
      positionId:0,
      positionName:"",
      doctorPositionId:0,
      doctorPositionName:"",
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      department:[],

      form: {
        // 姓名
        name: "",
        id: "",
        departmentId: "",
        isDirector:false,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入职称名称",
            trigger: "blur",
          },
        ],
        departmentId: [
          {
            required: true,
            message: "请选择部门",
          },
        ],
        
      },
      buttonRuleValidate: {
        // permissionIds: [
        //   {
        //     required: true,
        //     message: "请选择",
        //   },
        // ],
      }
    };
  },
  methods: {
    // 获取有效的按钮权限列表（下拉框）
    getSimplePermissionList(){
      api.getSimplePermissionList().then((res) => {
        if (res.code === 0) {
          const { permissionSimpleInfo } = res.data;
          this.permissionSimpleInfo = permissionSimpleInfo;
        }
      });
    },
    // 获取职称列表
    getAmiyaPositionInfo() {
      api.AmiyaPositionInfo().then((res) => {
        if (res.code === 0) {
          const { positionInfo } = res.data;
          this.query.data = positionInfo;
        }
      });
    },

    // 获取有效的部门名称列表
    getAmiyaDepartment() {
      api.getAmiyaDepartment().then((res) => {
        if (res.code === 0) {
          this.department = res.data.department;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { name, id,departmentId ,isDirector} = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              departmentId,
              isDirector
            };
            api.updateAmiyaPositionInfo(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getAmiyaPositionInfo();
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
              departmentId,
              isDirector
            };
            api.addAmiyaPositionInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getAmiyaPositionInfo();
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
    // 权限确认
    buttonHandleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            const {permissionIds,positionId} = this.buttonForm
            if(permissionIds.length !=0){
              let permissionArr = permissionIds.map(item=>{
                return {
                  positionId:positionId,
                  permissionId:item
                }
              })
              api.updatePermissions(permissionArr).then((res) => {
                this.cancelSubmit("buttonForm");
                  this.getAmiyaPositionInfo();
                  this.$Message.success({
                    content: "添加成功",
                    duration: 3,
                  });
              })
            }else{
              // 按钮权限不选 permissionId传0
              api.updatePermissions([{positionId:positionId,permissionId:0}]).then((res) => {
                this.cancelSubmit("buttonForm");
                  this.getAmiyaPositionInfo();
                  this.$Message.success({
                    content: "添加成功",
                    duration: 3,
                  });
              })
            }
            
          }
        })
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.buttonControlModal = false
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        this.$refs["buttonForm"].resetFields();
      }
    },
  },
  created() {
     
    this.getAmiyaPositionInfo();
    this.getAmiyaDepartment();
    this.getSimplePermissionList()
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
</style>
