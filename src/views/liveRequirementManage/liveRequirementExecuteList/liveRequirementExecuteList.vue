<template>
  <div>
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
        <FormItem label="发布人" >{{form.row.createName}}</FormItem>
        <FormItem label="创建时间" >{{$moment(form.row.createDate).format("YYYY-MM-DD HH:mm:ss")}}</FormItem>
        <FormItem label="直播间类型" >{{form.row.liveTypeName}}</FormItem>
        <FormItem label="需求类型" >{{form.row.requirementTypeName}}</FormItem>
        <FormItem label="优先级" >{{form.row.priorityLevelText}}</FormItem>
        <FormItem label="指派部门" >{{form.row.departmentName}}</FormItem>
        <FormItem label="响应时间" >{{$moment(form.row.responseDate).format("YYYY-MM-DD HH:mm:ss")}}</FormItem>
        <FormItem label="响应人" >{{form.row.responseByName}}</FormItem>
        <FormItem label="响应备注" >{{form.row.responseRemark}}</FormItem>
        <FormItem label="评判时间" v-show="form.row.decideDate">{{$moment(form.row.decideDate).format("YYYY-MM-DD HH:mm:ss")}}</FormItem>
        <FormItem label="评判备注" v-show="form.row.decideRemark">{{form.row.decideRemark}}</FormItem>
        <FormItem label="需求描述" >{{form.row.description}}</FormItem>
        <FormItem label="粉丝信息" >{{form.row.fansInfo}}</FormItem>
        <FormItem label="备注说明" prop="executeRemark">
          <Input
            v-model="form.executeRemark"
            placeholder="请输入执行情况描述"
            type="textarea"
          ></Input>
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
import * as api from "@/api/liveRequirementManage";
export default {
  data() {
    return {
      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
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
            title: "粉丝信息",
            key: "fansInfo",
          },
          {
            title: "直播间类型",
            key: "liveTypeName",
          },
          {
            title: "需求类型",
            key: "requirementTypeName",
          },
          {
            title: "需求描述",
            key: "description",
            tooltip:true
          },
          {
            title: "指派部门",
            key: "departmentName",
          },
          {
            title: "优先级",
            key: "priorityLevelText",
          },
          {
            title: "状态",
            key: "statusText",
          },
          {
            title: "操作",
            align: "center",
            width: 150,
            render: (h, params) => {
              const currentRole = JSON.parse(
                sessionStorage.getItem("permissions")
              );
              const flag = currentRole.some((ele) => {
                return "fx.amiya.permission.EXECUTE_LIVE_REQUIREMENT".includes(
                  ele
                );
              });
              if (flag) {
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
                          this.title = "执行";
                          this.form.id = id;
                          this.form.row = params.row;
                          this.controlModal = true;
                        },
                      },
                    },
                    "执行"
                  ),
                ]);
              }
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "",

      form: {
        id: "",
        executeRemark: "",
        row:{}
      },

      ruleValidate: {
        executeRemark: [
          {
            required: true,
            message: "请输入执行情况描述",
          },
          {
            min: 20, message: '不能小于20个文字'
          }
        ],
      },
    };
  },
  methods: {
    // 获取未处理的需求列表
    getUnTreatedList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
      };
      api.getUnTreatedList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveRequirement;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取未处理的需求列表（分页）
    handlePageChange(pageNum) {
      const { pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
      };
      api.getUnTreatedList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveRequirement;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, executeRemark } = this.form;
          api
            .executeLiveRequirementInfo({ id, executeRemark })
            .then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getUnTreatedList();
                this.$Message.success({
                  content: "提交成功",
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
      if (!value) {
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getUnTreatedList();
  },
};
</script>

<style lang="less" scoped>
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.ivu-form-item{
  margin-bottom: 5px;
}
</style>
