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
            v-model="query.hospitalName"
            placeholder="请输入医院名称查询"
            style="width: 200px;margin-left: 10px"
            @keyup.enter.native="getRecommendHospital()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getRecommendHospital()"
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
        <FormItem label="医院" prop="hospitalId">
          <Select v-model="form.hospitalId">
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="排列序号" prop="recommendIndex">
          <InputNumber
            v-model="form.recommendIndex"
            style="width: 100%"
          ></InputNumber>
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
            style="width: 100%;"
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
  </div>
</template>

<script>
import * as api from "@/api/hospitalManage";
export default {
  data() {
    return {
      // 查询
      query: {
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        hospitalName: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "医院名称",
            key: "hospitalName",
          },
          {
            title: "排列序号",
            key: "recommendIndex",
          },
          {
            title: "开始时间",
            key: "startDate",
            render: (h, params) => {
              return h("div",this.$moment(params.row.startDate).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "结束时间",
            key: "endDate",
            render: (h, params) => {
              return h("div",this.$moment(params.row.endDate).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "创建时间",
            key: "createDate",
            render: (h, params) => {
              return h("div",this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "创建人姓名",
            key: "createName",
          },
          {
            title: "修改人姓名",
            key: "updateName",
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
                        api.byIdGetRecommendHospital(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            const {
                              id,
                              hospitalId,
                              recommendIndex,
                              startDate,
                              endDate,
                              valid,
                            } = res.data.recommendHospitalInfo;
                            this.form.id = id;
                            this.form.hospitalId = hospitalId;
                            this.form.recommendIndex = recommendIndex;
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
                            api.deleteRecommendHospital(id).then((res) => {
                              if (res.code === 0) {
                                this.getRecommendHospital();
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

      // 医院列表
      hospitalInfo: [],

      form: {
        // 医院
        hospitalId: "",
        // 排列序号
        recommendIndex: null,
        // 开始日期
        startDate: "",
        // 结束日期
        endDate: "",
        id: "",
        // 是否有效
        valid: false,
      },

      ruleValidate: {
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
        recommendIndex: [
          {
            required: true,
            message: "请输入排列序号",
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
    };
  },
  methods: {
    // 获取医院推荐列表
    getRecommendHospital() {
      const {
        startDate,
        endDate,
        hospitalName,
        pageNum,
        pageSize,
      } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        hospitalName,
        pageNum,
        pageSize,
      };
      if (!startDate) {
        this.$Message.warning({
          content: "请选择开始日期",
          duration: 2,
        });
        return;
      }
      if (!endDate) {
        this.$Message.warning({
          content: "请选择结束日期",
          duration: 2,
        });
        return;
      }
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      api.RecommendHospital(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.recommendHospitalInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院推荐列表分页
    handlePageChange(pageNum) {
      const { startDate, endDate, hospitalName, pageSize } = this.query;
      const data = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
        hospitalName,
        pageNum,
        pageSize,
      };
      api.RecommendHospital(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.recommendHospitalInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院列表
    getHospitalInfonameList() {
      api.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.form.startDate = this.$moment(this.form.startDate).format("YYYY-MM-DD");
            this.form.endDate = this.$moment(this.form.endDate).format("YYYY-MM-DD");
            // 修改
            api.updateRecommendHospital(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getRecommendHospital();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { id, valid, ...data } = this.form;
            data.startDate = this.$moment(data.startDate).format("YYYY-MM-DD");
            data.endDate = this.$moment(data.endDate).format("YYYY-MM-DD");
            // 添加
            api.addRecommendHospital(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getRecommendHospital();
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
    this.getRecommendHospital();
    this.getHospitalInfonameList();
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
