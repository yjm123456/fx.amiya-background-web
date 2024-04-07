<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Select
            v-model="query.valid"
            placeholder="请选择有效状态"
            style="width: 200px;margin-left: 10px"
          >
            <Option
              v-for="item in validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getTrackToolList()"
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
        :label-width="130"
      >
        <FormItem label="工具名称" prop="name">
          <Input v-model="form.name" placeholder="请输入工具名称"></Input>
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
        valid:'true',
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "工具名称",
            key: "name",
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
                        const { id, name, valid } = params.row;
                        this.title = "修改";
                        this.isEdit = true;
                        this.form.id = id;
                        this.form.name = name;
                        this.form.valid = valid;
                        this.controlModal = true;
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
                            api.deleteTrackTool(id).then((res) => {
                              if (res.code === 0) {
                                this.getTrackToolList();
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
        name: "",
        id: "",
        valid: false,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入工具名称",
          },
        ],
      },
      validList:[{
        type:'true',
        name:'有效'
      },{
        type:'false',
        name:'无效'
      }]
    };
  },
  methods: {
    // 获取回访工具列表
    getTrackToolList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize,valid } = this.query;
      const data = {
        pageNum,
        pageSize,
        valid
      };
      api.getTrackToolList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackTool;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取回访工具列表分页
    handlePageChange(pageNum) {
      const { pageSize ,valid} = this.query;
      const data = {
        pageNum,
        pageSize,
        valid
      };
      api.getTrackToolList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackTool;
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
            api.updateTrackTool(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getTrackToolList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            let { name } = this.form;
            // 添加
            api.addTrackTool({ name }).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getTrackToolList();
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
    this.getTrackToolList();
  },
};
</script>

<style lang="less" scoped>
.container {
  margin-top: 16px;
}

.header_wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  
}
.page_wrap{
  text-align: right;
  margin-top: 10px;
}
</style>
