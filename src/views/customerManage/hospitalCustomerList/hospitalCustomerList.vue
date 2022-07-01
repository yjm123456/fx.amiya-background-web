<!-- 客户列表 -->
<template>
  <div>
    <Card :dis-hover="true">
      <div>
        <Input
          v-model="query.keyword"
          placeholder="请输入客户名称或电话"
          style="width: 200px; margin-right: 10px"
          @keyup.enter.native="hospitalGetCustomerList()"
        />
        <Button type="primary" @click="hospitalGetCustomerList()">查询</Button>
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
      title="编辑客户基础信息"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="姓名" prop="name">
          <Input v-model="form.name" style="width: 100%"></Input>
        </FormItem>
        <!-- <FormItem label="年龄" prop="age">
          <InputNumber
            v-model="form.age"
            style="width: 100%"
            :min="1"
            :max="100"
          ></InputNumber>
        </FormItem> -->
        <FormItem label="客户性别" prop="sex">
          <RadioGroup v-model="form.sex">
            <Radio label="男">
              <Icon class="iconfont icon-nan1"></Icon>
              <span>男</span>
            </Radio>
            <Radio label="女">
              <Icon class="iconfont icon-nv2"></Icon>
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>

    <!-- 详情 -->
    <detail
      :controlModal="controlDetailModal"
      :encryptPhone="encryptPhone"
      @handleDetailModalChange="controlDetailModal = false"
    ></detail>

    <!-- 消息追踪 -->
    <consumeTrack
      :controlModal="controlConsumeTrackModal"
      :encryptPhone="encryptPhone"
      @handleConsumeTrackModalChange="controlConsumeTrackModal = false"
    ></consumeTrack>
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import detail from "./components/detail";
import consumeTrack from "./components/consumeTrack";
export default {
  components: { detail, consumeTrack },
  data() {
    return {
      // 客户列表
      query: {
        columns: [
          {
            title: "头像",
            key: "avatar",
            width: 300,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    options: {
                      toolbar: false,
                      title: false,
                      navbar: false,
                    },
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.avatar,
                    },
                  }),
                  params.row.nickName,
                ]
              );
            },
          },
          {
            title: "创建时间",
            key: "createDate",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "电话",
            key: "phone",
          },
          {
            title: "姓名",
            key: "name",
          },
          // {
          //   title: "年龄",
          //   key: "age",
          // },
          {
            title: "性别",
            key: "sex",
          },
          {
            title: "操作",
            width: 280,
            fixed: "right",
            align: "center",
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
                      marginRight: "10px",
                    },
                    on: {
                      click: () => {
                        const { encryptPhone, name, age, sex } = params.row;
                        this.form = { encryptPhone, name, age, sex };
                        this.controlModal = true;
                      },
                    },
                  },
                  "编辑客户"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: { marginRight: "10px" },
                    on: {
                      click: () => {
                        const { encryptPhone } = params.row;
                        this.encryptPhone = encryptPhone;
                        this.controlDetailModal = true;
                      },
                    },
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {},
                    on: {
                      click: () => {
                        const { encryptPhone } = params.row;
                        this.encryptPhone = encryptPhone;
                        this.controlConsumeTrackModal = true;
                      },
                    },
                  },
                  "消费追踪"
                ),
              ]);
            },
          },
        ],
        data: [],
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyword: "",
      },

      // 控制 modal
      controlModal: false,

      form: {
        // 加密电话文本
        encryptPhone: "",
        // 姓名
        name: null,
        // 年龄
        age: null,
        // 性别
        sex: null,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
          },
        ],
      },

      // 加密手机号
      encryptPhone: "",

      // 详情
      controlDetailModal: false,

      // 消息追踪
      controlConsumeTrackModal: false,
    };
  },
  methods: {
    // 医院获取客户列表
    hospitalGetCustomerList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
      };
      api.hospitalGetCustomerList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customer;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { pageSize, keyword } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
      };
      api.hospitalGetCustomerList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customer;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { encryptPhone, name, age, sex } = this.form;
          api
            .editCustomerBaseInfo({ encryptPhone, name, age, sex })
            .then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.hospitalGetCustomerList();
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
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (value === false) {
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.hospitalGetCustomerList();
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
