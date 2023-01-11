<template>
  <div>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
    </Card>

    <Modal
      v-model="controlModal"
      title="修改"
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
        <FormItem label="内容" prop="message">
          <Input v-model="form.message" placeholder="请输入内容" type="textarea" :rows="4"></Input>
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
import * as api from "@/api/customerService";
export default {
  data() {
    return {
      // 查询
      query: {
        columns: [
          {
            title: "编号",
            key: "id",
          },
          {
            title: "内容",
            key: "message",
          },
          {
            title: "操作",
            key: "",
            width: 100,
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
                        const { id } = params.row;
                        this.controlModal = true
                        this.form.id = id
                      },
                    },
                  },
                  "修改"
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
    
      form: {
        // 内容
        message: "",
      },
      ruleValidate: {
        message: [
          {
            required: true,
            message: "请输入内容",
          },
        ],
      },
    };
  },
  methods: {
    // 获取小程序自动回复列表
    getMiniProgramAutoSendMessages() {
      api.getMiniProgramAutoSendMessage().then((res) => {
        if (res.code === 0) {
          const { list} = res.data.miniProgramAutoSendMessageInfo;
          this.query.data = list;
        }
      });
    },

   
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            // 添加
            api.editMiniProgramAutoSendMessage(this.form).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getMiniProgramAutoSendMessages();
                this.$Message.success({
                  content: "编辑成功",
                  duration: 3,
                });
              }
            });
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
    this.getMiniProgramAutoSendMessages();
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