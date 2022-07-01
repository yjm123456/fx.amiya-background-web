<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalCheckWithPage()"
          />
          <Select
            v-model="query.submitState"
            placeholder="资料提交状态"
            style="width: 160px; margin-left: 10px"
          >
            <Option
              v-for="item in query.submitStateList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.CheckState"
            placeholder="审核状态"
            style="width: 160px; margin-left: 10px"
          >
            <Option
              v-for="item in query.checkStateListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalCheckWithPage()"
            >查询</Button
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
      title="审核"
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
        <FormItem label="审核状态" prop="checkState">
          <Select v-model="form.checkState" placeholder="审核状态">
            <Option
              v-for="item in checkStateList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="审核备注">
          <Input v-model="form.remark" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 查看医院详情 -->
    <hospitalDetal
      :hospitalDetailModel.sync="hospitalDetailModel"
      :hospitalInfo="hospitalInfo"
    ></hospitalDetal>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
import * as customerApi from "@/api/customerManage.js";
import hospitalDetal from "./components/hospitalDetail.vue";
export default {
  components: {
    hospitalDetal,
  },
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        CheckState: -1,
        submitState: -1,
        checkStateListAll: [{ id: -1, name: "全部审核状态" }],
        submitStateList: [
          {
            id: -1,
            name: "全部提交状态",
          },
          {
            id: 0,
            name: "未提交",
          },
          {
            id: 1,
            name: "已提交",
          },
        ],
        columns: [
          {
            title: "医院",
            key: "name",
            width: 280,
            align: "center",
          },
          {
            title: "logo",
            key: "thumbPicUrl",
            align: "center",
            width: 140,
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.thumbPicUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "提交状态",
            key: "submitStateText",
            width: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.submitStateText == "已提交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.submitStateText
                );
              } else if (params.row.submitStateText == "未提交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.submitStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.submitStateText
                );
              }
            },
          },
          {
            title: "审核状态",
            key: "checkStateText",
            width: 150,
            align: "center",
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "审核人",
            key: "checkEmpName",
            width: 140,
            align: "center",
          },
          {
            title: "审核时间",
            key: "checkDate",
            width: 200,
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate
                  ? this.$moment(params.row.checkDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "审核备注",
            key: "checkRemark",
            align: "center",
          },

          {
            title: "操作",
            key: "",
            width: 200,
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
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        api.byIdHospitalInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.hospitalDetailModel = true;
                            const { hospitalInfo } = res.data;
                            this.hospitalInfo = hospitalInfo;
                          }
                        });
                      },
                    },
                  },
                  "查看医院详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:
                        params.row.checkStateText !== "未审核" &&
                        params.row.checkStateText !== "审核不通过",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.form.id = id;
                        if (params.row.submitStateText == "未提交") {
                          this.$Message.warning({
                            content: "医院暂未提交",
                            duration: 3,
                          });
                        } else {
                          this.controlModal = true;
                        }
                      },
                    },
                  },
                  "审核"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      hospitalInfo: {},
      hospitalDetailModel: false,
      checkStateList: [
        {
          id: 1,
          name: "审核不通过",
        },
        {
          id: 2,
          name: "审核通过",
        },
      ],
      // 控制 modal
      controlModal: false,

      // 是否是编辑
      isEdit: false,
      hospitalDetailModel: false,
      form: {
        checkState: null,
        remark: "",
        // 是否有效
        valid: false,
        id: "",
      },

      ruleValidate: {
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
      },
    };
  },
  methods: {
    // 获取审核情况（下拉框）
    getCheckStateList() {
      customerApi.getCheckStateList().then((res) => {
        if (res.code === 0) {
          const { checkStateList } = res.data;
          this.query.checkStateListAll = [
            ...this.query.checkStateListAll,
            ...checkStateList,
          ];
        }
      });
    },
    // 获取医院资料审核列表
    getHospitalCheckWithPage() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        CheckState,
        submitState,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        CheckState,
        submitState,
      };
      api.hospitalCheckWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院资料审核列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, CheckState, submitState } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        CheckState,
        submitState,
      };
      api.hospitalCheckWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalInfo;
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
          } else {
            const { remark, id, checkState } = this.form;
            const data = { remark, id, checkState };
            // 添加
            api.hospitalInfoCheck(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalCheckWithPage();
                this.$Message.success({
                  content: "审核成功",
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
    this.getHospitalCheckWithPage();
    this.getCheckStateList();
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
