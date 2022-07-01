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
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/positionManage";
export default {
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
                        api.byIdGetHospitalPositionInfo(id).then((res) => {
                          if (res.code === 0) {
                            const { id, name } = res.data.positionInfo;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.name = name;
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
                            api.deleteHospitalPositionInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getHospitalPositionInfo();
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

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 姓名
        name: "",
        id: "",
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入职称名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 获取医院职称列表
    getHospitalPositionInfo() {
      api.HospitalPositionInfo().then((res) => {
        if (res.code === 0) {
          const { positionInfo } = res.data;
          this.query.data = positionInfo;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { name, id } = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
            };
            api.updateHospitalPositionInfo(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHospitalPositionInfo();
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
            };
            api.addHospitalPositionInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalPositionInfo();
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
    this.getHospitalPositionInfo();
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
</style>
