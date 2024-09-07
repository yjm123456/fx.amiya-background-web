<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getThirdPartContentplatformInfo()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 140px;margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <!-- <span style="margin-left:.625rem;color:#ccc">—</span> -->
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 140px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.valid"
            placeholder="请选择是否有效"
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
            @click="getThirdPartContentplatformInfo()"
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
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="api地址" prop="apiUrl">
          <Input v-model="form.apiUrl" placeholder="请输入api地址"></Input>
        </FormItem>
        <FormItem label="签名" prop="sign">
          <Input v-model="form.sign" placeholder="请输入签名"></Input>
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
import * as api from "@/api/thirdPartContentplatformInfo";
export default {
  data() {
    return {
      // 查询
      query: {
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        valid: "true",
        startDate: "",
        endDate: "",
        columns: [
          {
            title: "名称",
            key: "name",
          },
          {
            title: "api地址",
            key: "apiUrl",
          },
          {
            title: "签名",
            key: "sign",
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
                        api.byIdThirdPartContentplatformInfo(id).then((res) => {
                          if (res.code === 0) {
                            const { name, id,apiUrl,sign } = res.data.thirdPartContentplatformInfo;
                            this.isEdit = true;
                            this.form.name = name;
                            this.form.apiUrl = apiUrl;
                            this.form.sign = sign;
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
                            api.deleteThirdPartContentplatformInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getThirdPartContentplatformInfo();
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
        // 名称
        name: "",
        id: "",
        // api地址
        apiUrl:'',
        // 签名
        sign:''
      },

      ruleValidate: {
        apiUrl: [
          {
            required: true,
            message: "请输入api地址",
          },
        ],
        sign: [
          {
            required: true,
            message: "请输入签名",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入名称",
          },
        ],
      },
      validList: [
        { type: "true", name: "有效" },
        { type: "false", name: "无效" },
      ],
    };
  },
  methods: {
    // 获取三方平台信息列表
    getThirdPartContentplatformInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        valid,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        valid,
      };
      api.thirdPartContentplatformInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.thirdPartContentplatformInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取三方平台信息列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyWord, startDate, endDate, valid } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        valid,
      };
      api.thirdPartContentplatformInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.thirdPartContentplatformInfo;
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
            api.editThirdPartContentplatformInfo(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getThirdPartContentplatformInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { name, apiUrl, sign } = this.form;
            const data = { name, apiUrl, sign };
            // 添加
            api.addThirdPartContentplatformInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getThirdPartContentplatformInfo();
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
    this.getThirdPartContentplatformInfo();
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
