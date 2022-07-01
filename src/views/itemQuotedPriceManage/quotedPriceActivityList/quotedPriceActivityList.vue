<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 200px"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 200px; margin-left: 10px"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Input
            v-model="query.activityName"
            placeholder="请输入报价名称查询"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getActivityInfoList()"
          />
          <Select
            v-model="query.status"
            style="width: 160px; margin-left: 10px"
            placeholder="请选择状态"
          >
            <Option
              v-for="item in query.statusList"
              :value="item.value"
              :key="item.value"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.valid"
            style="width: 160px; margin-left: 10px"
            placeholder="请选择状态"
          >
            <Option
              v-for="item in query.validList"
              :value="item.valid"
              :key="item.valid"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getActivityInfoList()"
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

    <!-- 列表 -->
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

    <Modal v-model="controlModal" :title="title" :mask-closable="false">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="报价名称" prop="name">
          <Input v-model="form.name" placeholder="请输入报价名称"></Input>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input
            v-model="form.description"
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="描述"
          />
        </FormItem>
        <FormItem label="开始日期" prop="startDate">
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 100%"
            v-model="form.startDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="结束日期" prop="endDate">
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 100%"
            v-model="form.endDate"
          ></DatePicker>
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

    <selectedItems
      :setItemOffer="setItemOffer"
      :activityId="activityId"
      @handleResetControlModalValueClick="setItemOffer = false"
    ></selectedItems>
  </div>
</template>

<script>
import * as api from "@/api/itemQuotedPriceManage";
import selectedItems from "./components/selectedItems";
export default {
  components: {
    selectedItems,
  },
  data() {
    return {
      // 查询
      query: {
        startDate: "",
        endDate: "",
        activityName: "",
        status: "",
        valid:'true',
        validList:[{
          valid:'true',
          name:'有效'
        },{
          valid:'false',
          name:'无效'
        }],
        statusList: [
          {
            name: "全部状态",
            value: -1,
          },
          {
            name: "已完成",
            value: 0,
          },
          {
            name: "未完成",
            value: 1,
          },
        ],
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            title: "报价名称",
            key: "name",
            minWidth: 150,
          },
          {
            title: "描述",
            key: "description",
            minWidth: 200,
          },
          {
            title: "开始时间",
            key: "startDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.startDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "结束时间",
            key: "endDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.endDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "创建时间",
            key: "createDate",
            minWidth: 200,
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
            title: "创建人姓名",
            key: "createName",
            minWidth: 150,
          },
          {
            title: "修改人姓名",
            key: "updateName",
            minWidth: 150,
          },
          {
            title: "修改时间",
            key: "updateDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                params.row.updateDate
                  ? this.$moment(params.row.updateDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "是否有效",
            key: "valid",
            minWidth: 100,
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
            width: 250,
            fixed: "right",
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
                        this.activityId = id;
                        this.setItemOffer = true;
                      },
                    },
                  },
                  "设置项目报价"
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
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdGetActivityInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            const {
                              id,
                              name,
                              description,
                              startDate,
                              endDate,
                              valid,
                            } = res.data.activity;
                            this.form.id = id;
                            this.form.name = name;
                            this.form.description = description;
                            this.form.startDate = startDate;
                            this.form.endDate = endDate;
                            this.form.valid = valid;
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
                            api.deleteActivityInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getActivityInfoList();
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
      },

      // 控制 modal
      controlModal: false,
      // modal title
      title: "添加",
      // 是否是编辑
      isEdit: false,
      // 医院列表
      hospitalInfo: [],
      form: {
        // 活动名称
        name: "",
        // 描述
        description: "",
        // 开始日期
        startDate: "",
        // 结束日期
        endDate: "",
        id: "",
        // 是否有效
        valid: false,
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
          },
        ],
        startDate: [
          {
            required: true,
            message: "请选择开始日期",
          },
        ],
        endDate: [
          {
            required: true,
            message: "请选择结束日期",
          },
        ],
      },

      setItemOffer: false,

      // 活动编号
      activityId: null,
    };
  },
  methods: {
    // 获取报价活动列表
    getActivityInfoList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        startDate,
        endDate,
        activityName,
        status,
        pageNum,
        pageSize,
        valid
      } = this.query;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : startDate,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : endDate,
        activityName,
        status: status === -1 ? null : status,
        pageNum,
        pageSize,
        valid
      };
      api.getActivityInfoList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activity;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取报价活动列表分页
    handlePageChange(pageNum) {
      const { startDate, endDate, activityName, status, pageSize,valid } = this.query;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : startDate,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : endDate,
        activityName,
        status: status === -1 ? null : status,
        pageNum,
        pageSize,
        valid
      };
      api.getActivityInfoList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activity;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.form.startDate = `${this.$moment(this.form.startDate).format(
              "YYYY-MM-DD"
            )}T00:00:00`;
            this.form.endDate = `${this.$moment(this.form.endDate).format(
              "YYYY-MM-DD"
            )}T00:00:00`;
            // 修改
            api.editActivityInfo(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getActivityInfoList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { id, valid, ...data } = this.form;
            data.startDate = `${this.$moment(data.startDate).format(
              "YYYY-MM-DD"
            )}T00:00:00`;
            data.endDate = `${this.$moment(data.endDate).format(
              "YYYY-MM-DD"
            )}T00:00:00`;
            // 添加
            api.addActivityInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getActivityInfoList();
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

    // 取消提交
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
    },
  },
  created() {
    this.getActivityInfoList();
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
