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
        <FormItem label="拒绝人" >{{form.row.responseByName}}</FormItem>
        <FormItem label="拒绝时间" >{{$moment(form.row.responseDate).format("YYYY-MM-DD HH:mm:ss")}}</FormItem>
        <FormItem label="拒绝说明" >{{form.row.responseRemark}}</FormItem>
        <FormItem label="需求描述" >{{form.row.description}}</FormItem>
        <FormItem label="粉丝信息" >{{form.row.fansInfo}}</FormItem>
        <FormItem label="是否同意该响应">
          <RadioGroup v-model="form.isAcceptResponse">
            <Radio label="同意拒绝">
              <Icon class="iconfont icon-nan1"></Icon>
              <span>同意拒绝</span>
            </Radio>
            <Radio label="重新指派">
              <Icon class="iconfont icon-nv2"></Icon>
              <span>重新指派</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="部门" prop="departmentId" v-if="form.isAcceptResponse === '重新指派'">
          <Select v-model="form.departmentId" placeholder="请选择部门">
            <Option
              v-for="item in department"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="备注说明" prop="decideRemark">
          <Input
            v-model="form.decideRemark"
            placeholder="请输入备注说明"
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
            title: "部门",
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
                        const {
                          id,
                          departmentId,
                        } = params.row;
                        this.form.id = id;
                        this.form.departmentId = departmentId;
                        this.form.row = params.row;
                        this.controlModal = true;
                      },
                    },
                  },
                  "评判"
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
      title: "评判",

      department: [],

      form: {
        id: "",
        isAcceptResponse: "是",
        departmentId: null,
        decideRemark:"",
        row:{}
      },

      ruleValidate: {
        departmentId: [
          {
            required: true,
            message: "请选择指派部门",
          },
        ],
      },
    };
  },
  methods: {
    // 获取部门已拒绝的需求
    getRejectedDemandList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
      };
      api.getRejectedDemandList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveRequirement;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取部门已拒绝的需求（分页）
    handlePageChange(pageNum) {
      const { pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
      };
      api.getRejectedDemandList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveRequirement;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取有效的部门名称列表
    getAmiyaDepartment() {
      api.getAmiyaDepartment().then((res) => {
        if (res.code === 0) {
          this.department = res.data.department;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, departmentId, isAcceptResponse, decideRemark } = this.form;
          api.decideDepartmentrejectLiveRequirement({
            id,
            departmentId:departmentId ? departmentId : null,
            isAcceptResponse:isAcceptResponse === "同意拒绝" ? true : false,
            decideRemark
          }).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("form");
              this.getRejectedDemandList();
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
    this.getRejectedDemandList();
    this.getAmiyaDepartment();
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
