<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
          >
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
        <FormItem label="分类名称" prop="name">
          <Input v-model="form.name" placeholder="请输入分类名称"></Input>
        </FormItem>
        <FormItem label="简码" prop="simpleCode">
          <Input v-model="form.simpleCode"  placeholder="请输入简码"></Input>
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
import * as api from "@/api/giftCategory";
export default {
  data() {
    return {
      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "分类名称",
            key: "name",
          },
          {
            title: "简码",
            key: "simpleCode",
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
                        api.byIdGiftCategory(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              name,
                              simpleCode,
                              valid,
                              id
                            } = res.data.info;
                            this.isEdit = true;
                            this.form.valid = valid;
                            this.form.name = name;
                            this.form.simpleCode = simpleCode;
                            this.form.id = id;
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
                            api.deleteGiftCategory(id).then((res) => {
                              if (res.code === 0) {
                                this.getGiftCategory();
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
        // 分类名称
        name: "",
        // 简码
        simpleCode: "",
        // 是否有效
        valid: false,
        id:""
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入分类名称",
          },
        ],
        simpleCode: [
          {
            required: true,
            message: "请输入简码",
          },
        ],
      },
    };
  },
  methods: {
    // 获取礼品分类列表
    getGiftCategory() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = { pageNum, pageSize  };
      api.getGiftCategoryList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.categoryList;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取礼品分类列表分页
    handlePageChange(pageNum) {
        const {  pageSize } = this.query;
        const data = { pageNum, pageSize  };
        api.getGiftCategoryList(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.categoryList;
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
            api.editGiftCategory(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getGiftCategory();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { name,  simpleCode } = this.form;
            const  data = { name ,simpleCode} 
            // 添加
            api.addGiftCategory(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getGiftCategory();
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
    this.getGiftCategory();
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