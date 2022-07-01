<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键词"
            style="width: 200px"
            @keyup.enter.native="getHospitalEmployeeList()"
          />
          <Select
            v-model="query.hospitalId"
            style="width: 220px; margin-left: 10px"
            placeholder="请选择医院"
            filterable
          >
            <Option
              v-for="item in query.hospitalList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.valid"
            style="width: 140px; margin-left: 10px"
            placeholder="是否有效"
          >
            <Option
              v-for="item in query.isValidList"
              :value="item.valid"
              :key="item.valid"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalEmployeeList()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            v-has="{ role: ['fx.amiya.permission.ADD_HOSPITAL_EMPLOYEE'] }"
            type="primary"
            @click="controlModal=true;title = '添加';"
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" ref="table"></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>

    <Modal v-model="controlModal" :title="title" :mask-closable="false">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="姓名" prop="name">
          <Input v-model="form.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="用户名" prop="userName">
          <Input v-model="form.userName" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="用户密码" prop="password" v-if="isEdit === false">
          <Input v-model="form.password" placeholder="请输入用户密码"></Input>
        </FormItem>
        <FormItem label="医院" prop="hospitalId" v-if="employeeType === 'amiyaEmployee'">
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable>
            <Option v-for="item in hospitalInfo" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="职位" prop="hospitalPositionId" v-if="employeeType === 'amiyaEmployee'">
          <Select v-model="form.hospitalPositionId" placeholder="请选择职位">
            <Option v-for="item in positionInfo" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="职位" prop="hospitalPositionId" v-else>
          <Select v-model="form.hospitalPositionId" placeholder="请选择职位">
            <Option v-for="item in hospitalPositionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="创建子账户" prop="isCreateSubAccount" v-if="employeeType === 'amiyaEmployee'">
          <i-switch v-model="form.isCreateSubAccount"/>
        </FormItem>
        <FormItem label="是否客服" prop="isCustomerService">
          <i-switch v-model="form.isCustomerService" />
        </FormItem>
        <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>

    <!-- 修改密码 -->
    <Modal
      v-model="updateHospitalEmployeePasswordformModal"
      title="修改密码"
      :mask-closable="false"
      @on-visible-change="handleUpdateHospitalEmployeePasswordModalVisibleChange"
    >
      <Form
        ref="updateHospitalEmployeeForm"
        :model="updateHospitalEmployeePasswordform"
        :rules="updateHospitalEmployeePasswordformRuleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="用户密码" prop="password">
          <Input v-model="updateHospitalEmployeePasswordform.password" placeholder="请输入用户密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancleUpdatePasswordSubmit('updateHospitalEmployeeForm')">取消</Button>
        <Button type="primary" @click="handleUpdatePasswordSubmit('updateHospitalEmployeeForm')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/employeeManage";
export default {
  data() {
    return {
      employeeType: sessionStorage.getItem("employeeType"),
      // 查询
      query: {
        hospitalId:'',
        hospitalList:[{id:-1,name:'全部医院'}],
        valid:'true',
        isValidList:[
        {
          valid:'true',
          name:'有效'
        },
        {
          valid:'false',
          name:'无效'
        }
       ],
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "员工编号",
            key: "id",
          },
          {
            title: "姓名",
            key: "name",
          },
          {
            title: "用户名",
            key: "userName",
          },
          {
            title: "医院名称",
            key: "hospitalName",
          },
          {
            title: "是否有效",
            key: "valid",
            render: (h, params) => {
              if (params.row.valid == true) {
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
            title: "创建子账户",
            key: "isCreateSubAccount",
            render: (h, params) => {
              if (params.row.isCreateSubAccount == true) {
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
            align:'center',
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
                       this.updateHospitalEmployeePasswordformModal = true;
                       this.updateHospitalEmployeePasswordform.id = params.row.id;
                      },
                    },
                  },
                  "修改密码"
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
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdGetHospitalEmployee(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              name,
                              userName,
                              hospitalId,
                              hospitalPositionId,
                              isCreateSubAccount,
                              isCustomerService,
                              valid,
                            } = res.data.employeeInfo;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.name = name;
                            this.form.userName = userName;
                            this.form.hospitalId = hospitalId;
                            this.form.hospitalPositionId = hospitalPositionId;
                            this.form.isCreateSubAccount = isCreateSubAccount;
                            this.form.isCustomerService = isCustomerService;
                            this.form.valid = valid;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "error",
                //       size: "small",
                //     },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "删除提示",
                //           content: "是否确认删除？",
                //           onOk: () => {
                //             const { id } = params.row;
                //             api.deleteHospitalEmployee(id).then((res) => {
                //               if (res.code === 0) {
                //                 this.getHospitalEmployeeList();
                //                 this.$Message.success({
                //                   content: "删除成功",
                //                   duration: 3,
                //                 });
                //               }
                //             });
                //           },
                //           onCancel: () => {},
                //         });
                //       },
                //     },
                //   },
                //   "删除"
                // ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      // 医院列表
      hospitalInfo: [],

      // 职位列表（新加的）
      hospitalPositionList:[],

      // 职位列表
      positionInfo: [],

      form: {
        // 姓名
        name: "",
        // 用户名
        userName: "",
        // 密码
        password: "",
        // 医院编号
        hospitalId: "",
        // 创建子账户
        isCreateSubAccount: false,
        // 职位
        hospitalPositionId: "",
        // 是否客服
        isCustomerService: false,
        id: "",
        // 是否有效
        valid: false,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入用户密码",
          },
        ],
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
        hospitalPositionId: [
          {
            required: true,
            message: "请选择职位",
          },
        ],
      },

      updateHospitalEmployeePasswordformModal:false,

      updateHospitalEmployeePasswordform:{
        // 密码
        password: "",
        id:""
      },

      updateHospitalEmployeePasswordformRuleValidate:{
        password: [
          {
            required: true,
            message: "请输入用户密码",
          },
        ],
      }
    };
  },
  methods: {
    // 获取医院员工列表
    getHospitalEmployeeList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize ,valid,hospitalId} = this.query;
      const data = { keyword, pageNum, pageSize ,valid,hospitalId: hospitalId==-1 ? null : hospitalId};
      api.HospitalEmployee(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.employeeInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 医院员工列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize,valid,hospitalId } = this.query;
      const data = { keyword, pageNum, pageSize ,valid,hospitalId: hospitalId==-1 ? null : hospitalId};
      api.HospitalEmployee(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.employeeInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院列表
    getHospitalList() {
      api.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalInfo = hospitalInfo;
          this.query.hospitalList = [...this.query.hospitalList,...hospitalInfo]
        }
      });
    },
    // 获取医院职位列表
    getbyIdAndName() {
      api.getbyIdAndName().then((res) => {
        if (res.code === 0) {
          const { positionInfo } = res.data;
          this.hospitalPositionList= positionInfo;
        }
      });
    },

    // 获取医院职位列表
    getHospitalPositionInfo() {
      api.getHospitalPositionInfo().then((res) => {
        if (res.code === 0) {
          const { positionInfo } = res.data;
          this.positionInfo = positionInfo;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            name,
            userName,
            password,
            hospitalId,
            hospitalPositionId,
            isCreateSubAccount,
            isCustomerService,
            id,
            valid,
          } = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              userName,
              valid,
              hospitalId:this.employeeType === "amiyaEmployee" ? hospitalId : 0,
              hospitalPositionId,
              isCreateSubAccount,
              isCustomerService
            };
            api.updateHospitalEmployee(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalEmployeeList();
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
              userName,
              password,
              hospitalId:this.employeeType === "amiyaEmployee" ? hospitalId : 0,
              hospitalPositionId,
              isCreateSubAccount,
              isCustomerService
            };
            api.addHospitalEmployee(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalEmployeeList();
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
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // 提交修改密码
    handleUpdatePasswordSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { password, id } = this.updateHospitalEmployeePasswordform;
          const data = {
            password,
            id,
          };
          api.updateHospitalEmployeePassword(data).then((res) => {
            if (res.code === 0) {
              this.isEdit = false;
              this.cancleUpdatePasswordSubmit("updateHospitalEmployeeForm");
              this.getHospitalEmployeeList();
              this.$Message.success({
                content: "修改成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    // 取消修改密码
    cancleUpdatePasswordSubmit(name) {
      this.updateHospitalEmployeePasswordformModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleUpdateHospitalEmployeePasswordModalVisibleChange(value) {
      if (!value) {
        this.$refs["updateHospitalEmployeeForm"].resetFields();
      }
    }
  },
  created() {
    this.getHospitalEmployeeList();
    this.getHospitalList();
    this.getHospitalPositionInfo();
    this.getbyIdAndName()
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
