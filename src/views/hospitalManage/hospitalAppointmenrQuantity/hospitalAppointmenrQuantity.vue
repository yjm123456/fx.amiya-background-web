<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.hospitalName"
            placeholder="请输入医院名称查询"
            style="width: 200px"
            @keyup.enter.native="getHospitalAppointmentQuantity()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalAppointmentQuantity()"
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
        :label-width="130"
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
        <FormItem label="上午可预约人数" prop="forenoonCanAppointmentNumer">
          <InputNumber
            v-model="form.forenoonCanAppointmentNumer"
            style="width: 100%"
          ></InputNumber>
        </FormItem>
        <FormItem label="下午可预约人数" prop="afternoonCanAppointmentNumer">
          <InputNumber
            v-model="form.afternoonCanAppointmentNumer"
            style="width: 100%"
          ></InputNumber>
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
        hospitalName: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "医院名称",
            key: "hospitalName",
          },
          {
            title: "上午可预约人数",
            key: "forenoonCanAppointmentNumer",
          },
          {
            title: "下午可预约人数",
            key: "afternoonCanAppointmentNumer",
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
                        api
                          .byIdGetHospitalAppointmentQuantity(id)
                          .then((res) => {
                            if (res.code === 0) {
                              this.isEdit = true;
                              const {
                                hospitalName,
                                ...data
                              } = res.data.appointmentQuantityInfo;
                              this.form = data;
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
                            api
                              .deleteHospitalAppointmentQuantity(id)
                              .then((res) => {
                                if (res.code === 0) {
                                  this.getHospitalAppointmentQuantity();
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
        // 上午可预约人数
        forenoonCanAppointmentNumer: null,
        // 下午可预约人数
        afternoonCanAppointmentNumer: null,
        id: "",
      },

      ruleValidate: {
        hospitalId: [
          {
            required: true,
            message: "请输入医院名称",
          },
        ],
        forenoonCanAppointmentNumer: [
          {
            required: true,
            message: "请输入上午可预约人数",
          },
        ],
        afternoonCanAppointmentNumer: [
          {
            required: true,
            message: "请输入下午可预约人数",
          },
        ],
      },
    };
  },
  methods: {
    // 获取医院可预约人数列表
    getHospitalAppointmentQuantity() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { hospitalName, pageNum, pageSize } = this.query;
      const data = {
        hospitalName,
        pageNum,
        pageSize,
      };
      api.HospitalAppointmentQuantity(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.appointmentQuantityInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院可预约人数列表分页
    handlePageChange(pageNum) {
      const { hospitalName, pageSize } = this.query;
      const data = {
        hospitalName,
        pageNum,
        pageSize,
      };
      api.HospitalAppointmentQuantity(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.appointmentQuantityInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院名称列表
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
            // 修改
            api.updateHospitalAppointmentQuantity(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHospitalAppointmentQuantity();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            let { id, ...data } = this.form;
            // 添加
            api.addHospitalAppointmentQuantity(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalAppointmentQuantity();
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
    this.getHospitalAppointmentQuantity();
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
