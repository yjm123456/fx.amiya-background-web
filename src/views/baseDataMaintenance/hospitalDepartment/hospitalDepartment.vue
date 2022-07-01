<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入医院科室"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getAmiyaHospitalDepartmentList()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAmiyaHospitalDepartmentList()"
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
        :label-width="110"
      >
        <FormItem label="科室名称" prop="departmentName">
          <Input v-model="form.departmentName"></Input>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="form.description"></Input>
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
  </div>
</template>
<script>
import * as api from "@/api/baseDataMaintenance";
export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "科室名称",
            key: "departmentName",
          },
          {
            title: "描述",
            key: "description",
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
            title: "移动方向",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "i",
                  {
                    class:"iconfont icon-zhiding fs",
                    style: {
                      marginRight: "15px",
                      cursor:"pointer",
                      fontSize:"14px!important",
                      color: "#515a6e"
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
                  "i",
                  {
                    class:"iconfont icon-xiangxiazhidi",
                    style: {
                      marginRight: "15px",
                      cursor:"pointer",
                      fontSize:"14px!important",
                      color: "#515a6e"
                      
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
                  "i",
                  {
                    class:"iconfont icon-xiangshang",
                    style: {
                      marginRight: "10px",
                      cursor:"pointer",
                      fontSize:"14px!important",
                      color: "#515a6e"
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
                  "i",
                  {
                    class:"iconfont icon-xiangxia",
                    style: {
                      marginRight: "10px",
                      cursor:"pointer",
                      fontSize:"14px!important",
                      color: "#515a6e"
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
            width: 150,
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
                        api.byIdAmiyaHospitalDepartment(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            const {
                              valid,
                              // 科室名称
                              departmentName,
                              // 描述
                              description,
                              id
                            } = res.data.amiyaHospitalDepartmentInfo;
                            // this.form = data;
                            this.form.departmentName = departmentName;
                            this.form.description = description;
                            this.form.id = id;
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
                            api.deleteAmiyaHospitalDepartment(id).then((res) => {
                              if (res.code === 0) {
                                this.getAmiyaHospitalDepartmentList();
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
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 科室名称
        departmentName: "",
        // 描述
        description: "",
        // 是否有效
        valid: false,
      },

      ruleValidate: {
        departmentName: [
          {
            required: true,
            message: "请输入科室名称",
          },
        ],
        
      },
    };
  },
  methods: {
    //   置顶/置底
    topToBottomClass(id,moveState){
        const data = {
            id : id,
            moveState : moveState
        }
        api.topToBottomClass(data).then((res) => {
            if(res.code === 0 ){
                if(moveState == true){
                    this.$Message.success('置顶成功')
                }else{
                    this.$Message.success('置底成功')
                }
                this.getAmiyaHospitalDepartmentList()
            }
        })
    },
    // 向上/向下
    moveUpAndDown(id,moveState){
        const data = {
            id : id,
            moveState : moveState
        }
        api.moveUpAndDown(data).then((res) => {
            if(res.code === 0 ){
                if(moveState == true){
                    this.$Message.success('向上移动成功')
                }else{
                    this.$Message.success('向下移动成功')
                }
                this.getAmiyaHospitalDepartmentList()
            }
        })
    },
    // 获取物流公司列表
    getAmiyaHospitalDepartmentList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword} = this.query;
      const data = { pageNum, pageSize ,keyword };
      api.getAmiyaHospitalDepartmentList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.amiyaHospitalDepartmentInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取物流公司列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword} = this.query;
        const data = { pageNum, pageSize ,keyword };
        api.getAmiyaHospitalDepartmentList(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.amiyaHospitalDepartmentInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            api.editAmiyaHospitalDepartment(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getAmiyaHospitalDepartmentList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { departmentName, valid, description } = this.form;
            const  data = { departmentName ,valid,description} 
            // 添加
            api.AddAmiyaHospitalDepartment(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getAmiyaHospitalDepartmentList();
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

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getAmiyaHospitalDepartmentList();
    // this.getLogisticsCompanyList()
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