<template>
  <div>
    <div class="header_wrap">
      <div class="left"></div>
      <div class="right">
        <Button
          type="primary"
          @click="
            controlModal = true;
            title = '添加';
          "
          v-if="employeeType == 'hospitalEmployee'"
          >添加</Button
        >
        <Button
          type="primary"
          @click="exportHospitalNetWorkConsulationOperationDataClick"
          v-if="employeeType == 'hospitalEmployee'"
          style="margin-left: 10px"
          >导出模板</Button
        >
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="importControlModal = true"
          v-if="employeeType == 'hospitalEmployee'"
          >导入</Button
        >
      </div>
    </div>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="h1">机构分析</div>
      <Input
        v-model="query.hospitalOnlineConsultRemark"
        :placeholder="
          employeeType != 'hospitalEmployee' ? '' : '请输入机构分析'
        "
        style="width: 100%; "
        type="textarea"
        :rows="3"
        :disabled="employeeType != 'hospitalEmployee'"
      />
      <div class="h1">啊美雅批注</div>
      <Input
        v-model="query.amiyaOnlineConsultRemark"
        :placeholder="
          employeeType == 'hospitalEmployee' ? '' : '请输入啊美雅批注'
        "
        style="width: 100%; "
        type="textarea"
        :rows="3"
        :disabled="employeeType == 'hospitalEmployee'"
      />
      <div class="button">
        <Button type="primary" @click="submitClick">提交</Button>
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
        <FormItem label="咨询师" prop="consulationName">
          <Input
            v-model="form.consulationName"
            placeholder="请输入咨询师"
          ></Input>
        </FormItem>
        <FormItem label="派单数" prop="sendOrderNum">
          <Input
            v-model="form.sendOrderNum"
            placeholder="请输入派单数"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem label="新客上门数" prop="newCustomerVisitNum">
          <Input
            v-model="form.newCustomerVisitNum"
            placeholder="请输入新客上门数"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem label="新客上门率(%)" prop="newCustomerVisitRate">
          <Input
            v-model="form.newCustomerVisitRate"
            placeholder="请输入新客上门率"
            type="number"
            number
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 导入 -->
    <importFile
      :importControlModal.sync="importControlModal"
      @handleRefreshCustomerTrackList="getHospitalInfo()"
      title="本机构网咨运营数据分析"
    ></importFile>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import importFile from "./import/importModel.vue";

import { download } from "@/utils/util";
export default {
  props: {
    active: String,
    hospitalId: Number,
    indicatorsId: String,
  },
  components: {
    importFile,
  },
  data() {
    return {
      // 导入 model
      importControlModal: false,
      // 查询
      query: {
        amiyaOnlineConsultRemark: "",
        hospitalOnlineConsultRemark: "",
        keyword: "",
        indicatorsId: "",
        hospitalId: null,
        columns: [
          {
            title: "咨询师",
            key: "consulationName",
          },
          {
            title: "派单数",
            key: "sendOrderNum",
          },
          {
            title: "新客上门数",
            key: "newCustomerVisitNum",
          },
          {
            title: "新客上门率",
            key: "newCustomerVisitRate",
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitRate + "%");
            },
          },

          {
            title: "操作",
            key: "",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:
                        sessionStorage.getItem("employeeType") ==
                        "amiyaEmployee",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api
                          .byIdHospitalNetWorkConsulationOperationDatas(id)
                          .then((res) => {
                            if (res.code === 0) {
                              const {
                                id,
                                indicatorId,
                                hospitalId,
                                consulationName,
                                sendOrderNum,
                                newCustomerVisitNum,
                                newCustomerVisitRate,
                              } = res.data.hospitalOperationDataInfo;
                              this.isEdit = true;
                              this.form.indicatorId = indicatorId;
                              this.form.hospitalId = hospitalId;
                              this.form.consulationName = consulationName;
                              this.form.sendOrderNum = sendOrderNum;
                              this.form.newCustomerVisitNum = newCustomerVisitNum;
                              this.form.newCustomerVisitRate = newCustomerVisitRate;
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
                      disabled:
                        sessionStorage.getItem("employeeType") ==
                        "amiyaEmployee",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api
                              .deleteHospitalNetWorkConsulationOperationDatas(
                                id
                              )
                              .then((res) => {
                                if (res.code === 0) {
                                  this.getHospitalInfo();
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
      employeeType: sessionStorage.getItem("employeeType"),
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 是否有效
        valid: false,
        id: "",
        indicatorId: "",
        hospitalId: null,
        // 咨询师
        consulationName: "",
        // 派单数
        sendOrderNum: null,
        // 新客上门数
        newCustomerVisitNum: null,
        // 新客上门率
        newCustomerVisitRate: null,
      },

      ruleValidate: {
        consulationName: [
          {
            required: true,
            message: "请输入咨询师",
          },
        ],
        sendOrderNum: [
          {
            required: true,
            message: "请输入派单数",
          },
        ],
        newCustomerVisitNum: [
          {
            required: true,
            message: "请输入新客上门数",
          },
        ],
        newCustomerVisitRate: [
          {
            required: true,
            message: "请输入新客上门率",
          },
        ],
      },
    };
  },
  methods: {
    exportHospitalNetWorkConsulationOperationDataClick() {
      api.exportHospitalNetWorkConsulationOperationData().then((res) => {
        let name = "机构网咨运营数据分析模板";
        download(res, name);
      });
    },
    getHospitalOnlineConsultRemark() {
      const data = {
        indicatorId: this.indicatorsId,
        hospitalId: this.hospitalId,
      };
      api.getHospitalOnlineConsultRemark(data).then((res) => {
        if (res.code === 0) {
          const { hospitalOnlineConsultRemark } = res.data;
          this.query.amiyaOnlineConsultRemark =
            hospitalOnlineConsultRemark.amiyaOnlineConsultRemark;
          this.query.hospitalOnlineConsultRemark =
            hospitalOnlineConsultRemark.hospitalOnlineConsultRemark;
        }
      });
    },
    submitClick() {
      const {
        amiyaOnlineConsultRemark,
        hospitalOnlineConsultRemark,
      } = this.query;
      const data = {
        indicatorId: this.indicatorsId,
        hospitalId: this.hospitalId,
        hospitalOnlineConsultRemark,
        amiyaOnlineConsultRemark,
      };
      api.addHospitalOnlineConsultRemark(data).then((res) => {
        if (res.code === 0) {
          this.$Message.success("已提交");
          this.getHospitalOnlineConsultRemark();
        }
      });
    },
    // 获取本机构网咨运营数据列表
    getHospitalInfo() {
      const { indicatorsId, hospitalId, keyword } = this.query;
      const data = {
        indicatorsId: this.indicatorsId,
        hospitalId: this.hospitalId,
        keyword,
      };
      api.getHospitalNetWorkConsulationOperationData(data).then((res) => {
        if (res.code === 0) {
          const { hospitalOperationDataInfo } = res.data;
          this.query.data = hospitalOperationDataInfo;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            let indicatorsId = this.indicatorsId;
            const {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
              id,
            } = this.form;
            const data = {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
              id,
            };
            // 修改
            api
              .editHospitalNetWorkConsulationOperationDatas(data)
              .then((res) => {
                if (res.code === 0) {
                  this.isEdit = false;
                  this.cancelSubmit("form");
                  this.getHospitalInfo();
                  this.$Message.success({
                    content: "修改成功",
                    duration: 3,
                  });
                }
              });
          } else {
            let indicatorsId = this.indicatorsId;
            const {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
            } = this.form;
            const data = {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
            };
            // 添加
            api
              .addHospitalNetWorkConsulationOperationDatas(data)
              .then((res) => {
                if (res.code === 0) {
                  this.cancelSubmit("form");
                  this.getHospitalInfo();
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
    // this.getLogisticsCompanyList()
  },
  watch: {
    active: {
      handler(value) {
        if (value === "networkConsultingOperation") {
          this.getHospitalInfo();
          this.getHospitalOnlineConsultRemark();
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
.h1 {
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 5px 0;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
