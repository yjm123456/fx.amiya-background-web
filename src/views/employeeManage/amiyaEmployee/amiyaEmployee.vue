<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入啊美雅员工名称"
            style="width: 200px"
            @keyup.enter.native="getAmiyaEmployeeList()"
          />
          <Select v-model="query.positionId" placeholder="请选择职位" style="width: 160px; margin-left: 10px" filterable>
            <Option
              v-for="item in positionInfo"
              :value="item.id"
              :key="item.id"
              
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.valid"
            style="width: 160px; margin-left: 10px"
            placeholder="请选择状态"
          >
            <Option
              v-for="item in query.validList"
              :value="item.valid"
              :key="item.valid"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAmiyaEmployeeList()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
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
        <FormItem label="姓名" prop="name">
          <Input v-model="form.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="用户名" prop="userName">
          <Input v-model="form.userName" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="用户密码" prop="password" v-if="isEdit === false">
          <Input v-model="form.password" placeholder="请输入用户密码"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="form.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="职位" prop="positionId">
          <Select v-model="form.positionId" placeholder="请选择职位">
            <Option
              v-for="item in positionInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否客服" prop="isCustomerService">
          <i-switch v-model="form.isCustomerService" />
        </FormItem>
        <!-- 客服所属主播 (form.positionId === 2 && form.isCustomerService === true) || (form.positionId === 19 && form.isCustomerService === true)-->
        <FormItem label="主播" prop="liveAnchorIds" v-if="(title == '修改' && (form.positionId === 2 && form.isCustomerService === true)) || (title == '修改' && form.positionId === 19)" key="主播">
          <Select v-model="form.liveAnchorIds" multiple filterable placeholder="请选择主播">
            <Option
              v-for="item in liveAnchors"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
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


    <!-- 修改密码 -->
    <Modal
      v-model="updateAmiyaEmployeePasswordformModal"
      title="修改密码"
      :mask-closable="false"
      @on-visible-change="handleUpdateAmiyaEmployeePasswordModalVisibleChange"
    >
      <Form
        ref="updateAmiyaEmployeeForm"
        :model="updateAmiyaEmployeePasswordform"
        :rules="updateAmiyaEmployeePasswordformRuleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="用户密码" prop="password">
          <Input v-model="updateAmiyaEmployeePasswordform.password" placeholder="请输入用户密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancleUpdatePasswordSubmit('updateAmiyaEmployeeForm')">取消</Button>
        <Button type="primary" @click="handleUpdatePasswordSubmit('updateAmiyaEmployeeForm')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/employeeManage";
export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        valid:'true',
        positionId:'',
        pageNum: 1,
        pageSize: 10,
        validList:[{
          valid:'true',
          name:'有效'
        },{
          valid:'false',
          name:'无效'
        }],
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
            title: "邮箱",
            key: "email",
          },
          {
            title: "职位名称",
            key: "positionName",
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
            title: "操作",
            key: "",
            width: 210,
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
                       this.updateAmiyaEmployeePasswordformModal = true;
                       this.updateAmiyaEmployeePasswordform.id = params.row.id;
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
                        api.byIdGetAmiyaEmployee(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              name,
                              userName,
                              positionId,
                              isCustomerService,
                              valid,
                              email,
                              liveAnchorIds
                            } = res.data.employeeInfo;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.name = name;
                            this.form.userName = userName;
                            this.form.email = email;
                            this.form.positionId = positionId;
                            this.form.isCustomerService = isCustomerService;
                            this.form.liveAnchorIds = liveAnchorIds;
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
                //             api.deleteAmiyaEmployee(id).then((res) => {
                //               if (res.code === 0) {
                //                 this.getAmiyaEmployeeList();
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
      // 主播平台
      liveAnchors:[],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      // 职位列表
      positionInfo: [],

      form: {
        // 姓名
        name: "",
        // 用户名
        userName: "",
        // 密码
        password: "",
        // 邮箱
        email:"",
        // 职位编号
        positionId: "",
        id: "",
        // 是否客服
        isCustomerService: false,
        // 是否有效
        valid: false,
        // 主播id
        liveAnchorIds:[]
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
            message: "请输入手机号",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入用户密码",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
          },
        ],
        positionId: [
          {
            required: true,
            message: "请选择职位",
          },
        ],
        liveAnchorIds: [
          {
            required: true,
            message: "请选择主播",
          },
        ],
      },

      updateAmiyaEmployeePasswordformModal:false,

      updateAmiyaEmployeePasswordform:{
        // 密码
        password: "",
        id:""
      },

      updateAmiyaEmployeePasswordformRuleValidate:{
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
    // 获取有效的主播列表
    getLiveAnchorValid(){
      api.liveAnchorValid().then((res) => {
        if(res.code === 0){
          const {liveAnchors} = res.data
          this.liveAnchors = liveAnchors
        }
      })
    },
    // 获取阿美雅员工列表
    getAmiyaEmployeeList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize,valid,positionId } = this.query;
      const data = { keyword, pageNum, pageSize ,valid,positionId: positionId ? positionId : null};
      api.AmiyaEmployee(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.employeeInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 阿美雅员工列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize,valid,positionId } = this.query;
      const data = { keyword, pageNum, pageSize ,valid,positionId: positionId ? positionId : null};
      api.AmiyaEmployee(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.employeeInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取职位列表
    getAmiyaPositionInfo() {
      api.AmiyaPositionInfo().then((res) => {
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
          const { name, userName, password, positionId, isCustomerService, id, valid , email,liveAnchorIds} = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              userName,
              positionId,
              isCustomerService,
              valid,
              email,
              // liveAnchorIds:(positionId === 2 || positionId === 19) && isCustomerService === true ? liveAnchorIds : []
              liveAnchorIds:(positionId === 2 && isCustomerService === true ) || positionId === 19  ? liveAnchorIds : []
            };
            api.updateAmiyaEmployee(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getAmiyaEmployeeList();
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
              positionId,
              isCustomerService,
              email
            };
            if(email){
              if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email))){
                this.$Message.error({
                  content: "请输入正确的邮箱",
                  duration: 3,
                })
                return false;
              }
              api.addAmiyaEmployee(data).then((res) => {
                if (res.code === 0) {
                  this.cancelSubmit("form");
                  this.getAmiyaEmployeeList();
                  this.$Message.success({
                    content: "添加成功",
                    duration: 3,
                  });
                }
              });
            }
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

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  
    // 提交修改密码
    handleUpdatePasswordSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { password, id } = this.updateAmiyaEmployeePasswordform;
          const data = {
            password,
            id,
          };
          api.updateAmiyaEmployeePassword(data).then((res) => {
            if (res.code === 0) {
              this.isEdit = false;
              this.cancleUpdatePasswordSubmit("updateAmiyaEmployeeForm");
              this.getAmiyaEmployeeList();
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
      this.updateAmiyaEmployeePasswordformModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleUpdateAmiyaEmployeePasswordModalVisibleChange(value) {
      if (!value) {
        this.$refs["updateAmiyaEmployeeForm"].resetFields();
      }
    }
  },
  created() {
    this.getAmiyaEmployeeList();
    this.getAmiyaPositionInfo();
    this.getLiveAnchorValid();
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
