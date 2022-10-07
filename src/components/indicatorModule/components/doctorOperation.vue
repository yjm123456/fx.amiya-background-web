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
        placeholder="请输入机构分析"
        style="width: 100%; "
        type="textarea"
        :rows="3"
        :disabled="employeeType != 'hospitalEmployee'"
      />
      <div class="h1">阿美雅批注</div>
      <Input
        v-model="query.amiyaConsultRemark"
        placeholder="请输入阿美雅批注"
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
            <FormItem label="医生" prop="doctorName">
              <Input
                v-model="form.doctorName"
                placeholder="请输入医生"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客接诊人数" prop="newCustomerAcceptNum">
              <Input
                v-model="form.newCustomerAcceptNum"
                placeholder="请输入新客接诊人数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客成交人数" prop="newCustomerDealNum">
              <Input
                v-model="form.newCustomerDealNum"
                placeholder="请输入新客成交人数"
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
            <FormItem label="新客业绩" prop="newCustomerAchievement">
              <Input
                v-model="form.newCustomerAchievement"
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
            <FormItem label="新客业绩占比(%)" prop="newCustomerAchievementRate">
              <Input
                v-model="form.newCustomerAchievementRate"
                placeholder="请输入新客业绩占比"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客接诊人数" prop="oldCustomerAcceptNum">
              <Input
                v-model="form.oldCustomerAcceptNum"
                placeholder="请输入老客接诊人数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客成交人数" prop="oldCustomerDealNum">
              <Input
                v-model="form.oldCustomerDealNum"
                placeholder="请输入老客成交人数"
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
            <FormItem label="老客业绩" prop="oldCustomerAchievement">
              <Input
                v-model="form.oldCustomerAchievement"
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
            title: "医生",
            key: "doctorName",
            width:150
          },
          {
            title: "新客接诊人数",
            key: "newCustomerAcceptNum",
            width:140
          },
          {
            title: "新客成交人数",
            key: "newCustomerDealNum",
            width:140
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            width:140,
            render: (h, params) => {
              return h("div", params.row.newCustomerDealRate + "%");
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerAchievement",
            width:120
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width:130
          },
          {
            title: "新客业绩占比",
            key: "newCustomerAchievementRate",
            width:140,
            render: (h, params) => {
              return h("div", params.row.newCustomerAchievementRate + "%");
            },
          },
          {
            title: "老客接诊人数",
            key: "oldCustomerAcceptNum",
            width:140
          },
          {
            title: "老客成交人数",
            key: "oldCustomerDealNum",
            width:140
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
            key: "oldCustomerAchievement",
            width:150
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width:130
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
                          .byIdHospitalDoctorOperation(id)
                          .then((res) => {
                            if (res.code === 0) {
                              const {
                                id,
                                indicatorId,
                                hospitalId,
                                doctorName,
                                newCustomerAcceptNum,
                                newCustomerDealNum,
                                newCustomerDealRate,
                                newCustomerAchievement,
                                newCustomerUnitPrice,
                                newCustomerAchievementRate,
                                oldCustomerAcceptNum,
                                oldCustomerDealNum,
                                oldCustomerDealRate,
                                oldCustomerAchievement,
                                oldCustomerUnitPrice,
                                oldCustomerAchievementRate
                              } = res.data.hospitalDoctorOperationInfo;
                              this.isEdit = true;
                              this.form.indicatorId = indicatorId;
                              this.form.hospitalId = hospitalId;
                              this.form.doctorName = doctorName;
                              this.form.newCustomerAcceptNum = newCustomerAcceptNum;
                              this.form.newCustomerDealNum = newCustomerDealNum;
                              this.form.newCustomerAchievement = newCustomerAchievement;
                              this.form.newCustomerDealRate = newCustomerDealRate;
                              this.form.newCustomerAchievementRate = newCustomerAchievementRate;
                              this.form.newCustomerUnitPrice = newCustomerUnitPrice;
                              this.form.oldCustomerDealNum = oldCustomerDealNum;
                              this.form.oldCustomerAcceptNum = oldCustomerAcceptNum;
                              this.form.oldCustomerDealRate = oldCustomerDealRate;
                              this.form.oldCustomerAchievement = oldCustomerAchievement;
                              this.form.oldCustomerUnitPrice = oldCustomerUnitPrice;
                              this.form.oldCustomerAchievementRate = oldCustomerAchievementRate;
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
                              .deleteHospitalDoctorOperation(id)
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
        // 医生
        doctorName: "",
        // 新客接诊人数
        newCustomerAcceptNum: null,
        // 新客成交人数
        newCustomerDealNum: null,
        // 新客成交率
        newCustomerDealRate: null,
        // 新客业绩
        newCustomerAchievement: null,
        // 新客客单价
        newCustomerUnitPrice: null,
        // 新客业绩占比
        newCustomerAchievementRate: null,
        // 老客接诊人数
        oldCustomerAcceptNum: null,
        // 老客成交人数
        oldCustomerDealNum: null,
        // 老客成交率
        oldCustomerDealRate: null,
        // 老客业绩
        oldCustomerAchievement: null,
        // 老客客单价
        oldCustomerUnitPrice: null,
        // 老客业绩占比
        oldCustomerAchievementRate: null,
      },

      ruleValidate: {
        doctorName: [
          {
            required: true,
            message: "请输入医生",
          },
        ],
        newCustomerAcceptNum: [
          {
            required: true,
            message: "请输入新客接诊人数",
          },
        ],
        newCustomerDealNum: [
          {
            required: true,
            message: "请输入新客成交人数",
          },
        ],
        newCustomerDealRate: [
          {
            required: true,
            message: "请输入新客成交率",
          },
        ],
        newCustomerAchievement: [
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
        newCustomerAchievementRate: [
          {
            required: true,
            message: "请输入新客业绩占比",
          },
        ],
        oldCustomerAcceptNum: [
          {
            required: true,
            message: "请输入老客接诊人数",
          },
        ],
        oldCustomerDealNum: [
          {
            required: true,
            message: "请输入老客成交人数",
          },
        ],
        oldCustomerDealRate: [
          {
            required: true,
            message: "请输入老客成交率",
          },
        ],

        oldCustomerAchievement: [
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
       

      },
    };
  },
  methods: {
    getHospitalConsultRemark() {
      const data = {
        indicatorId: this.indicatorsId,
        hospitalId: this.hospitalId,
      };
      api.getHospitalDoctorRemark(data).then((res) => {
        if (res.code === 0) {
          const { hospitalDoctorRemark } = res.data;
          this.query.amiyaConsultRemark =
            hospitalDoctorRemark.amiyaDoctorRemark;
          this.query.hospitalConsultRemark =
            hospitalDoctorRemark.hospitalDoctorRemark;
        }
      });
    },
    submitClick() {
      const { amiyaConsultRemark, hospitalConsultRemark } = this.query;
      const data = {
        indicatorId: this.indicatorsId,
        hospitalId: this.hospitalId,
        hospitalDoctorRemark:hospitalConsultRemark,
        amiyaDoctorRemark:amiyaConsultRemark,
      };
      api.addHospitalDoctorRemark(data).then((res) => {
        if (res.code === 0) {
          this.$Message.success("已提交");
          this.getHospitalConsultRemark();
        }
      });
    },
    // 获取本机构医生运营数据列表
    getHospitalInfo() {
      const { indicatorsId, hospitalId, keyword } = this.query;
      const data = {
        indicatorsId: this.indicatorsId,
        hospitalId: this.hospitalId,
        keyword,
      };
      api.getHospitalDoctorOperation(data).then((res) => {
        if (res.code === 0) {
          const { hospitalDoctorOperationData } = res.data;
          this.query.data = hospitalDoctorOperationData;
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
              id,
              doctorName,
              newCustomerAcceptNum,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerAchievement,
              newCustomerUnitPrice,
              newCustomerAchievementRate,
              oldCustomerAcceptNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerAchievement,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate
            } = this.form;
            const data = {
              id,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
              doctorName,
              newCustomerAcceptNum,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerAchievement,
              newCustomerUnitPrice,
              newCustomerAchievementRate,
              oldCustomerAcceptNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerAchievement,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate
            };
            // 修改
            api.editHospitalDoctorOperation(data).then((res) => {
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
              doctorName,
              newCustomerAcceptNum,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerAchievement,
              newCustomerUnitPrice,
              newCustomerAchievementRate,
              oldCustomerAcceptNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerAchievement,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate
            } = this.form;
            const data = {
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
              doctorName,
              newCustomerAcceptNum,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerAchievement,
              newCustomerUnitPrice,
              newCustomerAchievementRate,
              oldCustomerAcceptNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerAchievement,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate
            };
            // 添加
            api.addHospitalDoctorOperation(data).then((res) => {
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
        if (value === "doctorOperation") {
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
