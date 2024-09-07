<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getThirdHospitalContentplatformCode()"
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
            v-model="query.thirdPartContentplatformInfoId"
            placeholder="请选择三方平台"
            style="width: 160px;margin-left: .625rem"
          >
            <Option
              v-for="item in params.thirdPartContentplatformInfoAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            style="width: 200px;margin-left: .625rem"
          >
            <Option
              v-for="item in params.hospitalInfoAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getThirdHospitalContentplatformCode()"
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
        <FormItem label="三方平台" prop="thirdPartContentplatformInfoId">
          <Select
            v-model="form.thirdPartContentplatformInfoId"
            placeholder="请选择三方平台"
            filterable
          >
            <Option
              v-for="item in params.thirdPartContentplatformInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="医院" prop="hospitalId">
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable>
            <Option
              v-for="item in params.hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="编码" prop="code">
          <Input v-model="form.code" placeholder="请输入编码"></Input>
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
import * as api from "@/api/hospitalContentplatformCode";
import * as thirdPartContentplatformInfoApi from "@/api/thirdPartContentplatformInfo";
import * as hospitalManage from "@/api/hospitalManage";

export default {
  data() {
    return {
      // 查询
      query: {
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        startDate: "",
        endDate: "",
        thirdPartContentplatformInfoId: -1,
        hospitalId: -1,
        columns: [
          {
            title: "三方平台",
            key: "thirdPartContentplatformInfoName",
          },
          {
            title: "医院",
            key: "hospitalName",
          },
          {
            title: "编码",
            key: "code",
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
                        api
                          .byIdThirdHospitalContentplatformCode(id)
                          .then((res) => {
                            if (res.code === 0) {
                              const {
                                thirdPartContentplatformInfoId,
                                id,
                                hospitalId,
                                code,
                              } = res.data.hospitalContentplatformCode;
                              this.isEdit = true;
                              this.form.thirdPartContentplatformInfoId = thirdPartContentplatformInfoId;
                              this.form.hospitalId = hospitalId;
                              this.form.code = code;
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
                            api
                              .deleteThirdHospitalContentplatformCode(id)
                              .then((res) => {
                                if (res.code === 0) {
                                  this.getThirdHospitalContentplatformCode();
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
        // 三方平台
        thirdPartContentplatformInfoId: "",
        // 医院
        hospitalId: null,
        // 编码
        code: "",
      },

      ruleValidate: {
        thirdPartContentplatformInfoId: [
          {
            required: true,
            message: "请选择三方平台",
          },
        ],
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入编码",
          },
        ],
      },
      params: {
        //   三方平台
        thirdPartContentplatformInfo: [],
        thirdPartContentplatformInfoAll: [{ id: -1, name: "全部平台" }],
        // 医院
        hospitalInfo: [],
        hospitalInfoAll: [{ id: -1, name: "全部医院" }],
      },
    };
  },
  methods: {
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.params.hospitalInfo = hospitalInfo;
          this.params.hospitalInfoAll = [
            ...this.params.hospitalInfoAll,
            ...hospitalInfo,
          ];
        }
      });
    },
    // 获取三方平台
    getValidKeyAndValue() {
      thirdPartContentplatformInfoApi.ValidKeyAndValue().then((res) => {
        if (res.code == 0) {
          const { thirdPartContentplatformInfo } = res.data;
          this.params.thirdPartContentplatformInfo = thirdPartContentplatformInfo;
          this.params.thirdPartContentplatformInfoAll = [
            ...this.params.thirdPartContentplatformInfoAll,
            ...thirdPartContentplatformInfo,
          ];
        }
      });
    },
    // 获取机构平台编码列表
    getThirdHospitalContentplatformCode() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        thirdPartContentplatformInfoId,
        hospitalId,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        thirdPartContentplatformInfoId:
          thirdPartContentplatformInfoId == -1
            ? ""
            : thirdPartContentplatformInfoId,
        hospitalId: hospitalId == -1 ? null : hospitalId,
      };
      api.thirdHospitalContentplatformCode(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalContentplatformCode;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取机构平台编码列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        startDate,
        endDate,
        thirdPartContentplatformInfoId,
        hospitalId,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        thirdPartContentplatformInfoId:
          thirdPartContentplatformInfoId == -1
            ? ""
            : thirdPartContentplatformInfoId,
        hospitalId: hospitalId == -1 ? null : hospitalId,
      };
      api.thirdHospitalContentplatformCode(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalContentplatformCode;
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
            api.editThirdHospitalContentplatformCode(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getThirdHospitalContentplatformCode();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const {
              thirdPartContentplatformInfoId,
              hospitalId,
              code,
            } = this.form;
            const data = { thirdPartContentplatformInfoId, hospitalId, code };
            // 添加
            api.addThirdHospitalContentplatformCode(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getThirdHospitalContentplatformCode();
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
    this.getThirdHospitalContentplatformCode();
    this.getValidKeyAndValue();
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
