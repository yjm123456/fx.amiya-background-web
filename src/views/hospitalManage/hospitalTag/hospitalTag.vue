<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Select
            v-model="query.type"
            placeholder="请选择标签类型"
            style="width: 200px"
          >
            <Option
              v-for="item in query.typeList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Input
            v-model="query.name"
            placeholder="请输入标签名称查询"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalInfo()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
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
        <FormItem label="标签名称" prop="name">
          <Input v-model="form.name"></Input>
        </FormItem>
        <FormItem label="标签类型" prop="type">
          <Select v-model="form.type" placeholder="请选择标签类型">
            <Option
              v-for="item in typeList"
              :value="item.type"
              :key="item.type"
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
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
export default {
  data() {
    return {
      // 查询
      query: {
        typeList: [
          {
            name: "医院级别",
            type: 0,
          },
          {
            name: "医院设施",
            type: 1,
          },
          {
            name: "全部",
            type: 2,
          },
        ],
        type: null,
        name: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "标签名称",
            key: "name",
          },
          {
            title: "标签类型名称",
            key: "typeName",
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
                        api.byIdGetTagInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            const {
                              typeName,
                              valid,
                              ...data
                            } = res.data.tagInfo;
                            this.form = data;
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
                            api.deleteTagInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getHospitalInfo();
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
        // 医院名称
        name: "",
        // 类型
        type: "",
        id: "",
        // 是否有效
        valid: false,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入标签名称",
          },
        ],
        type: [
          {
            required: true,
            type: "number",
            message: "请选择标签类型",
          },
        ],
      },

      typeList: [
          {
            name: "医院级别",
            type: 0,
          },
          {
            name: "医院设施",
            type: 1,
          }
        ],
    };
  },
  methods: {
    // 获取所有标签列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { type, name, pageNum, pageSize } = this.query;
      const data = { type, name, pageNum, pageSize };
      api.TagInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.tagInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取所有标签列表分页
    handlePageChange(pageNum) {
      const { type, name, pageSize } = this.query;
      const data = { type, name, pageNum, pageSize };
      api.TagInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.tagInfo;
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
            api.updateTagInfo(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { id, valid, ...data } = this.form;
            const { type } = data;
            data.type = type === 2 ? null : type;
            // 添加
            api.addTagInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalInfo();
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
    this.getHospitalInfo();
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