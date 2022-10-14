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
            v-if="employeeType=='hospitalEmployee'"
            >添加</Button
          >
        </div>
      </div>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="h1">机构分析</div>
      <Input
        v-model="query.hospitalConsultRemark"
        :placeholder="employeeType != 'hospitalEmployee' ? '' :'请输入机构分析'"
        style="width: 100%; "
        type="textarea"
        :rows="3"
        :disabled="employeeType != 'hospitalEmployee'"
      />
      <div class="h1">啊美雅批注</div>
      <Input
        v-model="query.amiyaConsultRemark"
        :placeholder="employeeType == 'hospitalEmployee' ? '' :'请输入啊美雅批注'"
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
      width="1000"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="咨询师" prop="consulationName">
              <Input
                v-model="form.consulationName"
                placeholder="请输入咨询师"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="派单数" prop="sendOrderNum">
              <Input
                v-model="form.sendOrderNum"
                placeholder="请输入派单数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客上门数" prop="newCustomerVisitNum">
              <Input
                v-model="form.newCustomerVisitNum"
                placeholder="请输入新客上门数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客上门率(%)" prop="newCustomerVisitRate">
              <Input
                v-model="form.newCustomerVisitRate"
                placeholder="请输入新客上门率"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客成交数" prop="newCustomerDealNum">
              <Input
                v-model="form.newCustomerDealNum"
                placeholder="请输入新客成交数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客成交率(%)" prop="newCustomerDealRate">
              <Input
                v-model="form.newCustomerDealRate"
                placeholder="请输入新客成交率"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客业绩" prop="newCustomerDealPrice">
              <Input
                v-model="form.newCustomerDealPrice"
                placeholder="请输入新客业绩"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客客单价" prop="newCustomerUnitPrice">
              <Input
                v-model="form.newCustomerUnitPrice"
                placeholder="请输入新客客单价"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客上门数" prop="oldCustomerVisitNum">
              <Input
                v-model="form.oldCustomerVisitNum"
                placeholder="请输入老客上门数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客成交数" prop="oldCustomerDealNum">
              <Input
                v-model="form.oldCustomerDealNum"
                placeholder="请输入老客成交数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="老客成交率(%)" prop="oldCustomerDealRate">
              <Input
                v-model="form.oldCustomerDealRate"
                placeholder="请输入老客成交率"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客业绩" prop="oldCustomerDealPrice">
              <Input
                v-model="form.oldCustomerDealPrice"
                placeholder="请输入老客业绩"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="老客客单价" prop="oldCustomerUnitPrice">
              <Input
                v-model="form.oldCustomerUnitPrice"
                placeholder="请输入老客客单价"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="老客业绩占比(%)" prop="oldCustomerAchievementRate">
              <Input
                v-model="form.oldCustomerAchievementRate"
                placeholder="请输入老客业绩占比"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="总业绩" prop="lasttMonthTotalAchievement">
              <Input
                v-model="form.lasttMonthTotalAchievement"
                placeholder="请输入总业绩"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
export default {
  props: {
    active: String,
    hospitalId: Number,
    indicatorsId: String,
  },
  data() {
    return {
      // 查询
      query: {
        amiyaConsultRemark: "",
        hospitalConsultRemark: "",
        keyword: "",
        indicatorsId: "",
        hospitalId: null,
        columns: [
          {
            title: "咨询师",
            key: "consulationName",
            width:150
          },
          {
            title: "派单数",
            key: "sendOrderNum",
            width:100
          },
          {
            title: "新客上门数",
            key: "newCustomerVisitNum",
            width:120
          },
          {
            title: "新客上门率",
            key: "newCustomerVisitRate",
            width:140,
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitRate + "%");
            },
          },
          {
            title: "新客成交数",
            key: "newCustomerDealNum",
            width:120
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            width:120,
            render: (h, params) => {
              return h("div", params.row.newCustomerDealRate + "%");
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerDealPrice",
            width:140
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width:120
          },
          {
            title: "老客上门数",
            key: "oldCustomerVisitNum",
            width:120
          },
          {
            title: "老客成交数",
            key: "oldCustomerDealNum",
            width:120
          },
          {
            title: "老客成交率",
            key: "oldCustomerDealRate",
            width:140,
            render: (h, params) => {
              return h("div", params.row.oldCustomerDealRate + "%");
            },
          },

          {
            title: "老客业绩",
            key: "oldCustomerDealPrice",
            width:150
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width:120
          },
          {
            title: "老客业绩占比",
            key: "oldCustomerAchievementRate",
            width:150,
            render: (h, params) => {
              return h("div", params.row.oldCustomerAchievementRate + "%");
            },
          },

          {
            title: "总业绩",
            key: "lasttMonthTotalAchievement",
            width:150
          },
          {
            title: "操作",
            key: "",
            fixed:'right',
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
                      disabled: sessionStorage.getItem('employeeType') == 'amiyaEmployee',
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api
                          .byIdHospitalConsulationOperationData(id)
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

                                newCustomerDealNum,
                                newCustomerDealRate,
                                newCustomerDealPrice,
                                newCustomerUnitPrice,
                                oldCustomerVisitNum,
                                oldCustomerDealNum,
                                oldCustomerDealRate,
                                oldCustomerDealPrice,
                                oldCustomerUnitPrice,
                                oldCustomerAchievementRate,
                                lasttMonthTotalAchievement
                              } = res.data.hospitalOperationDataInfo;
                              this.isEdit = true;
                              this.form.indicatorId = indicatorId;
                              this.form.hospitalId = hospitalId;
                              this.form.consulationName = consulationName;
                              this.form.sendOrderNum = sendOrderNum;
                              this.form.newCustomerVisitNum = newCustomerVisitNum;
                              this.form.newCustomerDealNum = newCustomerDealNum;
                              this.form.newCustomerDealRate = newCustomerDealRate;
                              this.form.newCustomerDealPrice = newCustomerDealPrice;
                              this.form.newCustomerUnitPrice = newCustomerUnitPrice;
                              this.form.oldCustomerDealNum = oldCustomerDealNum;
                              this.form.oldCustomerVisitNum = oldCustomerVisitNum;
                              this.form.oldCustomerDealRate = oldCustomerDealRate;
                              this.form.oldCustomerDealPrice = oldCustomerDealPrice;
                              this.form.oldCustomerUnitPrice = oldCustomerUnitPrice;
                              this.form.oldCustomerAchievementRate = oldCustomerAchievementRate;
                              this.form.lasttMonthTotalAchievement = lasttMonthTotalAchievement;
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
                      disabled: sessionStorage.getItem('employeeType') == 'amiyaEmployee',
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api
                              .deleteHospitalConsulationOperationData(id)
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
        // 新客成交数
        newCustomerDealNum: null,
        // 新客成交率
        newCustomerDealRate: null,
        // 新客业绩
        newCustomerDealPrice: null,
        // 新客客单价
        newCustomerUnitPrice: null,
        // 老客上门数
        oldCustomerVisitNum: null,
        // 老客成交数
        oldCustomerDealNum: null,
        // 老客成交率
        oldCustomerDealRate: null,
        // 老客业绩
        oldCustomerDealPrice: null,
        // 老客客单价
        oldCustomerUnitPrice: null,
        // 老客业绩占比
        oldCustomerAchievementRate: null,
        // 总业绩
        lasttMonthTotalAchievement: null,
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
        newCustomerDealNum: [
          {
            required: true,
            message: "请输入新客成交数",
          },
        ],
        newCustomerDealRate: [
          {
            required: true,
            message: "请输入新客成交率",
          },
        ],
        newCustomerDealPrice: [
          {
            required: true,
            message: "请输入新客业绩",
          },
        ],
        newCustomerUnitPrice: [
          {
            required: true,
            message: "请输入新客客单价",
          },
        ],
        oldCustomerVisitNum: [
          {
            required: true,
            message: "请输入老客上门数",
          },
        ],
        oldCustomerDealNum: [
          {
            required: true,
            message: "请输入老客成交数",
          },
        ],

        oldCustomerDealRate: [
          {
            required: true,
            message: "请输入老客成交率",
          },
        ],

        oldCustomerDealPrice: [
          {
            required: true,
            message: "请输入老客业绩",
          },
        ],

        oldCustomerUnitPrice: [
          {
            required: true,
            message: "请输入老客客单价",
          },
        ],
        oldCustomerAchievementRate: [
          {
            required: true,
            message: "请输入老客业绩占比",
          },
        ],
        lasttMonthTotalAchievement: [
          {
            required: true,
            message: "请输入总业绩",
          },
        ],

      },
    };
  },
  methods: {
    getHospitalConsultRemark() {
      const data = {
        indicatorId: this.indicatorsId,
        hospitalId: this.hospitalId,
      };
      api.getHospitalConsultRemark(data).then((res) => {
        if (res.code === 0) {
          const { hospitalConsultRemark } = res.data;
          this.query.amiyaConsultRemark =
            hospitalConsultRemark.amiyaConsultRemark;
          this.query.hospitalConsultRemark =
            hospitalConsultRemark.hospitalConsultRemark;
        }
      });
    },
    submitClick() {
      const { amiyaConsultRemark, hospitalConsultRemark } = this.query;
      const data = {
        indicatorId: this.indicatorsId,
        hospitalId: this.hospitalId,
        hospitalConsultRemark,
        amiyaConsultRemark,
      };
      api.addHospitalConsultRemark(data).then((res) => {
        if (res.code === 0) {
          this.$Message.success("已提交");
          this.getHospitalConsultRemark();
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
      api.getHospitalConsulationOperationData(data).then((res) => {
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
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerDealPrice,
              newCustomerUnitPrice,
              oldCustomerVisitNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerDealPrice,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate,
              lasttMonthTotalAchievement
            } = this.form;
            const data = {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
              id,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerDealPrice,
              newCustomerUnitPrice,
              oldCustomerVisitNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerDealPrice,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate,
              lasttMonthTotalAchievement
            };
            // 修改
            api.editHospitalConsulationOperationData(data).then((res) => {
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

              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerDealPrice,
              newCustomerUnitPrice,
              oldCustomerVisitNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerDealPrice,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate,
              lasttMonthTotalAchievement
            } = this.form;
            const data = {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerDealPrice,
              newCustomerUnitPrice,
              oldCustomerVisitNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerDealPrice,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate,
              lasttMonthTotalAchievement
            };
            // 添加
            api.addHospitalConsulationOperationData(data).then((res) => {
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
        if (value === "consultantOperations") {
          this.getHospitalInfo();
          this.getHospitalConsultRemark();
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
