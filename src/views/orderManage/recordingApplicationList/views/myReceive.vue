<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getContentPlatFormOrderAddWork()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px;margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 200px;margin-left:10px"
          >
            <Option
              v-for="item in params.hospitallist"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.checkState"
            placeholder="请选择审核状态"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in params.checkStateListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>

          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getContentPlatFormOrderAddWork()"
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

    <!-- 审核 -->
    <examine
      :examineModel.sync="examineModel"
      :params="params"
      :id="id"
      @getContentPlatFormOrderAddWork="getContentPlatFormOrderAddWork"
    />
  </div>
</template>

<script>
import * as api from "@/api/contentPlatFormOrderAddWork";
import * as orderApi from "@/api/orderManage";
import examine from "../components/examine.vue";
export default {
  components: {
    examine,
  },
  props: {
    activeName: String,
    params: Object,
  },
  data() {
    return {
      // 查询
      query: {
        keyWord: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        hospitalId: -1,
        checkState: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "提交人",
            key: "createByEmpName",
            align: "center",
            minWidth: 100,
          },
          {
            title: "手机号",
            key: "encryptPhone",
            minWidth: 100,
            align: "center",
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth: 200,
          },
          {
            title: "申请理由",
            key: "sendRemark",
            minWidth: 150,
          },
          {
            title: "归属客服",
            key: "belongCustomerServiceName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 100,
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
            title: "申请类型",
            key: "addWorkTypeText",
            minWidth: 100,
            align: "center",
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 150,
            align: "center",
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate
                  ? this.$moment(params.row.checkDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "操作",
            key: "",
            width: 220,
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
                        this.examineModel = true;
                        this.id = id;
                      },
                    },
                  },
                  "审核"
                ),
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
                        const { id, phone } = params.row;
                        // this.lookCustomerModel =true
                        const data = {
                          phone,
                        };
                        orderApi
                          .getCustomerServiceNameByPhone(data)
                          .then((res) => {
                            if (res.code === 0) {
                              const { CustomerServiceNameByPhone } = res.data;
                              if (CustomerServiceNameByPhone != "未绑定") {
                                this.$Message.warning({
                                  content:
                                    "该手机号 " + `<span style="color:red"> ${phone}</span>` + " ,归属客服是 " +
                                    `<span style="color:red"> ${CustomerServiceNameByPhone}</span>`,
                                  duration: 10,
                                });
                              } else {
                                this.$Message.warning(
                                  "该手机号未绑定归属客服！"
                                );
                              }
                            }
                          });
                      },
                    },
                  },
                  "检索"
                ),
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
                       this.$router.push('/bindCustmerServiceList')
                      },
                    },
                  },
                  "改绑客服"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      id: "",
      // 接收人
      acceptByList: [
        {
          id: -1,
          name: "全部接收人",
        },
        // {
        //   id: 104,
        //   name: "虞郑韡",
        // },
        {
          id: 243,
          name: "陈飞",
        },
      ],
      // 审核
      examineModel: false,
    };
  },
  methods: {
    // 获取录单申请列表
    getContentPlatFormOrderAddWork() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        hospitalId,
        checkState,
        createBy,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        acceptBy: sessionStorage.getItem("employeeId"),
        hospitalId: hospitalId == -1 ? null : hospitalId,
        checkState: checkState == -1 ? null : checkState,
        createBy: createBy == -1 ? null : createBy,
      };
      api.ContentPlatFormOrderAddWork(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderAddWork;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取录单申请列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        startDate,
        endDate,
        hospitalId,
        checkState,
        createBy,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        acceptBy: sessionStorage.getItem("employeeId"),
        hospitalId: hospitalId == -1 ? null : hospitalId,
        checkState: checkState == -1 ? null : checkState,
        createBy: createBy == -1 ? null : createBy,
      };
      api.ContentPlatFormOrderAddWork(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderAddWork;
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
            api.editExpressManage(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getContentPlatFormOrderAddWork();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { expressName, valid, expressCode } = this.form;
            const data = { expressName, valid, expressCode };
            // 添加
            api.addExpressManage(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getContentPlatFormOrderAddWork();
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
    // this.getContentPlatFormOrderAddWork();
    // this.getLogisticsCompanyList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "myReceive") {
          this.getContentPlatFormOrderAddWork();
        }
      },
      immediate: true,
    },
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
