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
          @click="exportHospitalDealItemOperationDataClick"
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
        v-model="query.hospitalDealRemark"
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
        v-model="query.amiyaDealRemark"
        :placeholder="
          employeeType == 'hospitalEmployee' ? '' : '请输入阿美雅批注'
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
        <FormItem label="成交品项名称" prop="dealItemName">
          <Input
            v-model="form.dealItemName"
            placeholder="请输入成交品项名称"
          ></Input>
        </FormItem>
        <FormItem label="成交数量" prop="dealCount">
          <Input
            v-model="form.dealCount"
            placeholder="请输入成交数量"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem label="成交金额" prop="dealPrice">
          <Input
            v-model="form.dealPrice"
            placeholder="请输入成交金额"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem label="业绩占比(%)" prop="performanceRatio">
          <Input
            v-model="form.performanceRatio"
            placeholder="请输入业绩占比"
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
      title="本机构成交品相数据分析"
    ></importFile>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import { download } from "@/utils/util";
import importFile from "./import/importModel.vue";

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
        amiyaDealRemark: "",
        hospitalDealRemark: "",
        keyword: "",
        indicatorsId: "",
        hospitalId: null,
        columns: [
          {
            title: "成交品项",
            key: "dealItemName",
          },
          {
            title: "成交数量",
            key: "dealCount",
          },
          {
            title: "成交金额",
            key: "dealPrice",
          },
          {
            title: "业绩占比",
            key: "performanceRatio",
            render: (h, params) => {
              return h("div", params.row.performanceRatio + "%");
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
                        api.byIdHospitalDealItemOperation(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              indicatorId,
                              hospitalId,
                              dealItemName,
                              dealCount,
                              dealPrice,
                              performanceRatio,
                            } = res.data.hospitalDealItemOperationInfo;
                            this.isEdit = true;
                            this.form.indicatorId = indicatorId;
                            this.form.hospitalId = hospitalId;
                            this.form.dealItemName = dealItemName;
                            this.form.dealCount = dealCount;
                            this.form.dealPrice = dealPrice;
                            this.form.performanceRatio = performanceRatio;
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
                              .deleteHospitalDealItemOperation(id)
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
        // 成交品项名称
        dealItemName: "",
        // 成交数量
        dealCount: null,
        // 成交金额
        dealPrice: null,
        // 业绩占比
        performanceRatio: null,
      },

      ruleValidate: {
        dealItemName: [
          {
            required: true,
            message: "请输入成交品项名称",
          },
        ],
        dealCount: [
          {
            required: true,
            message: "请输入成交数量",
          },
        ],
        dealPrice: [
          {
            required: true,
            message: "请输入成交金额",
          },
        ],
        performanceRatio: [
          {
            required: true,
            message: "请输入业绩占比",
          },
        ],
      },
    };
  },
  methods: {
    exportHospitalDealItemOperationDataClick() {
      api.exportHospitalDealItemOperationData().then((res) => {
        let name = "机构成交品相运营数据分析模板";
        download(res, name);
      });
    },
    //批注
    gethospitalDealRemark() {
      const data = {
        indicatorId: this.indicatorsId,
        hospitalId: this.hospitalId,
      };
      api.getHospitalDealRemark(data).then((res) => {
        if (res.code === 0) {
          const { hospitalDealRemark } = res.data;
          this.query.amiyaDealRemark = hospitalDealRemark.amiyaDealRemark;
          this.query.hospitalDealRemark = hospitalDealRemark.hospitalDealRemark;
        }
      });
    },
    submitClick() {
      const { amiyaDealRemark, hospitalDealRemark } = this.query;
      const data = {
        indicatorId: this.indicatorsId,
        hospitalId: this.hospitalId,
        hospitalDealRemark,
        amiyaDealRemark,
      };
      api.addHospitalDealRemark(data).then((res) => {
        if (res.code === 0) {
          this.$Message.success("已提交");
          this.gethospitalDealRemark();
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
      api.getHospitalDealItemOperation(data).then((res) => {
        if (res.code === 0) {
          const { hospitalDealItemData } = res.data;
          this.query.data = hospitalDealItemData;
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
              dealItemName,
              dealCount,
              dealPrice,
              performanceRatio,
              id,
            } = this.form;
            const data = {
              dealItemName,
              dealCount,
              dealPrice,
              performanceRatio,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
              id,
            };
            // 修改
            api.editHospitalDealItemOperation(data).then((res) => {
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
              dealItemName,
              dealCount,
              dealPrice,
              performanceRatio,
            } = this.form;
            const data = {
              dealItemName,
              dealCount,
              dealPrice,
              performanceRatio,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
            };
            // 添加
            api.addHospitalDealItemOperation(data).then((res) => {
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
        if (value === "finishedProductAppearance") {
          this.getHospitalInfo();
          this.gethospitalDealRemark();
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
