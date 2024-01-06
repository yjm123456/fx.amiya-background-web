<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHealthValueList()"
          />
          <Select
              v-model="query.valid"
              placeholder="是否有效"
              filterable
              style="width: 160px;margin-left: .625rem"
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
            @click="getHealthValueList()"
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
        <FormItem label="健康值名称" prop="name">
          <Input v-model="form.name" placeholder="请输入健康值名称"></Input>
        </FormItem>
        <FormItem label="健康值" prop="value">
          <Input v-model="form.value" placeholder="请输入健康值" type="number" number></Input>
        </FormItem>
        <FormItem label="编号" prop="code">
          <Input v-model="form.code" placeholder="请输入编号"></Input>
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
import * as api from "@/api/healthValue";
export default {
  data() {
    return {
      // 查询
      query: {
        keyWord: "",
        valid:'true',
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "健康值名称",
            key: "name",
          },
          {
            title: "健康值",
            key: "value",
          },
          {
            title: "编码",
            key: "code",
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
                        api.byIdTrack(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              name,
                              value,
                              valid,
                              code,
                              id
                            } = res.data.info;
                            this.isEdit = true;
                            this.form.valid = valid;
                            this.form.name = name;
                            this.form.value = value;
                            this.form.code = code;
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
                            const data = {
                                id
                            }
                            api.deleteHealthValue(data).then((res) => {
                              if (res.code === 0) {
                                this.getHealthValueList();
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
        // 健康值名称
        name: "",
        // 健康值编码
        code: "",
        // 是否有效
        valid: false,
        id:"",
        // 值
        value:''
      },
      validList:[
        {
            type:'true',
            name:'有效'
        },
        {
            type:'false',
            name:'无效'
        },
      ],

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入健康值名称",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入编码",
          },
        ],
        value: [
          {
            required: true,
            message: "请输入健康值",
          },
        ],
      },
    };
  },
  methods: {
    // 获取健康值列表
    getHealthValueList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyWord,valid} = this.query;
      const data = { pageNum, pageSize ,keyWord ,valid};
      api.getHealthValueList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.list;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取健康值列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyWord,valid} = this.query;
        const data = { pageNum, pageSize ,keyWord,valid };
        api.getHealthValueList(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.list;
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
            api.updateHealthValue(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHealthValueList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { name, valid, code,value } = this.form;
            const  data = { name ,valid,code,value} 
            // 添加
            api.addHealthValue(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHealthValueList();
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
    this.getHealthValueList();
    // this.getHealthValueList()
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