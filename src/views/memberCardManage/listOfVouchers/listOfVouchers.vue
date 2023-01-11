<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
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
      width="1200"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="120"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="抵用券名称" prop="name">
              <Input v-model="form.name" placeholder="请输入抵用券名称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抵扣量" prop="deductMoney">
              <Input
                v-model="form.deductMoney"
                type="number"
                number
                placeholder="请输入抵扣量"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抵用券类型" prop="type">
              <Select v-model="form.type" placeholder="请选择抵用券类型">
                <Option
                  v-for="item in consumptionVoucherTypeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="抵用券编码" prop="consumptionVoucherCode">
              <Input
                v-model="form.consumptionVoucherCode"
                placeholder="请输入抵用券编码"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否会员抵用券" prop="isMemberVoucher">
              <i-switch v-model="form.isMemberVoucher" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="会员卡编码"
              prop="memberRankCode"
              :rules="{
                required: form.isMemberVoucher == true,
                message: '请输入最小限制金额',
              }"
            >
              <Select
                v-model="form.memberRankCode"
                placeholder="请选择会员卡编码"
                :disabled="form.isMemberVoucher == false"
              >
                <Option
                  v-for="item in memberRankNames"
                  :value="item.memberRankCode"
                  :key="item.memberRankCode"
                  >{{ item.memberRankCodeName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否有最小金额" prop="isNeedMinPrice">
              <i-switch v-model="form.isNeedMinPrice" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="最小限制金额"
              prop="minPrice"
              :rules="{
                required: form.isNeedMinPrice == true,
                message: '请输入最小限制金额',
              }"
            >
              <Input
                v-model="form.minPrice"
                placeholder="请输入最小限制金额"
                :disabled="form.isNeedMinPrice == false"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="有效天数"
              prop="effectiveTime"
              :rules="{
                required: true,
                message: '请输入有效天数',
              }"
            >
              <Input
                v-model="form.effectiveTime"
                placeholder="请输入有效天数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="3"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否为指定商品" prop="isSpecifyProduct">
              <i-switch v-model="form.isSpecifyProduct" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否可累加使用" prop="isAccumulate">
              <i-switch v-model="form.isAccumulate" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否可分享" prop="isShare">
              <i-switch v-model="form.isShare" />
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否有效" prop="isValid" v-show="isEdit === true">
              <i-switch v-model="form.isValid" />
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
import * as api from "@/api/consumptionVoucher";
export default {
  data() {
    return {
      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "抵用券名称",
            key: "name",
            width: 180,
            align: "center",
          },
          {
            title: "抵用券类型",
            key: "typeText",
            width: 150,
            align: "center",
          },
          {
            title: "抵扣量",
            key: "deductMoney",
            width: 120,
            align: "center",
          },
          {
            title: "会员卡编码",
            key: "memberRankCode",
            width: 150,
            align: "center",
          },
          {
            title: "是否用于指定商品",
            key: "isSpecifyProduct",
            width: 150,
            align: "center",
            render: (h, params) => {
              if (params.row.isSpecifyProduct == true) {
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
            title: "是否可累加使用",
            width: 140,
            align: "center",
            key: "isAccumulate",
            render: (h, params) => {
              if (params.row.isAccumulate == true) {
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
            title: "是否可分享",
            key: "isShare",
            width: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.isShare == true) {
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
            title: "是否会员抵用券",
            key: "isMemberVoucher",
            width: 140,
            align: "center",
            render: (h, params) => {
              if (params.row.isMemberVoucher == true) {
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
            title: "是否有效",
            key: "isValid",
            width: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.isValid == true) {
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
            title: "抵用券编码",
            key: "consumptionVoucherCode",
            align: "center",
            width: 180,
          },
          {
            title: "是否有最小支付金额限制",
            key: "isNeedMinPrice",
            width: 200,
            align: "center",
            render: (h, params) => {
              if (params.row.isNeedMinPrice == true) {
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
            title: "最小限制金额",
            key: "minPrice",
            width: 140,
            align: "center",
          },
          {
            title: "有效期时长",
            key: "effectiveTime",
            width: 140,
            align: "center",
          },
          {
            title: "备注",
            key: "remark",
            width: 300,
          },
          {
            title: "操作",
            key: "",
            width: 100,
            align: "center",
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
                        this.title = "修改";
                        api.byIdConsumptionVoucher(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              name,
                              deductMoney,
                              isSpecifyProduct,
                              isAccumulate,
                              isShare,
                              type,
                              isValid,
                              consumptionVoucherCode,
                              isNeedMinPrice,
                              minPrice,
                              remark,
                              effectiveTime,
                              isMemberVoucher,
                              memberRankCode,
                            } = res.data.consumptionVoucherInfo;
                            console.log(type);
                            this.isEdit = true;
                            this.form.deductMoney = deductMoney;
                            this.form.name = name;
                            this.form.isSpecifyProduct = isSpecifyProduct;
                            this.form.isAccumulate = isAccumulate;
                            this.form.isShare = isShare;
                            this.form.type = String(type);
                            this.form.isValid = isValid;
                            this.form.consumptionVoucherCode = consumptionVoucherCode;
                            this.form.isNeedMinPrice = isNeedMinPrice;
                            this.form.minPrice = minPrice;
                            this.form.remark = remark;
                            this.form.effectiveTime = effectiveTime;
                            this.form.isMemberVoucher = isMemberVoucher;
                            this.form.memberRankCode = memberRankCode;
                            this.form.id = id;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      // 抵用券类型
      consumptionVoucherTypeList: [],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id: "",
        // 抵用券名称
        name: "",
        // 抵扣量
        deductMoney: null,
        // 是否只能用于指定商品
        isSpecifyProduct: false,
        // 是否可累加使用
        isAccumulate: false,
        // 是否可分享
        isShare: false,
        // 抵用券类型
        type: null,
        // 是否只能用于指定商品
        isValid: false,
        // 抵用券编码
        consumptionVoucherCode: "",
        // 是否有最小支付金额限制
        isNeedMinPrice: false,
        // 最小金额
        minPrice: null,
        // 有效天数
        effectiveTime: null,
        // 备注
        remark: "",
        // 是否会员抵用券
        isMemberVoucher: false,
        // 会员卡编码
        memberRankCode: "",
      },

      ruleValidate: {
        memberRankCode: [
          {
            required: true,
            message: "请选择会员卡编码",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入抵用券名称",
          },
        ],
        deductMoney: [
          {
            required: true,
            message: "请输入抵扣量",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择抵用券类型",
          },
        ],
        consumptionVoucherCode: [
          {
            required: true,
            message: "请输入抵用券编码",
          },
        ],
      },
      // 会员卡名称
      memberRankNames: [],
    };
  },
  methods: {
    // 获取会员卡编码名称列表
    getMemberRankInfo() {
      api.getMemberRankInfo().then((res) => {
        if (res.code === 0) {
          this.memberRankNames = res.data.memberRankNames;
        }
      });
    },
    // 获取抵用券类型列表
    getConsumptionVoucherTypeList() {
      api.getConsumptionVoucherTypeList().then((res) => {
        if (res.code === 0) {
          this.consumptionVoucherTypeList = res.data.consumptionVoucherTypeList;
        }
      });
    },
    // 获取物流公司列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = { pageNum, pageSize };
      api.getConsumptionVoucher(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.consumptionVoucherInfoList;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取物流公司列表分页
    handlePageChange(pageNum) {
      const { pageSize } = this.query;
      const data = { pageNum, pageSize };
      api.getConsumptionVoucher(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.consumptionVoucherInfoList;
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
            const {
              id,
              deductMoney,
              isSpecifyProduct,
              isAccumulate,
              isShare,
              type,
              isValid,
              consumptionVoucherCode,
              isNeedMinPrice,
              minPrice,
              remark,
              effectiveTime,
              isMemberVoucher,
              memberRankCode,
            } = this.form;
            const data = {
              id,
              name: this.form.name,
              deductMoney,
              isSpecifyProduct,
              isAccumulate,
              isShare,
              type: Number(type),
              isValid,
              consumptionVoucherCode,
              isNeedMinPrice,
              minPrice: isNeedMinPrice == false ? 0 : minPrice,
              remark,
              effectiveTime,
              isMemberVoucher,
              memberRankCode: isMemberVoucher == false ? "" : memberRankCode,
            };
            // 修改
            api.EditConsumptionVoucher(data).then((res) => {
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
            const {
              name,
              deductMoney,
              isSpecifyProduct,
              isAccumulate,
              isShare,
              type,
              isValid,
              consumptionVoucherCode,
              isNeedMinPrice,
              minPrice,
              remark,
              effectiveTime,
              isMemberVoucher,
              memberRankCode,
            } = this.form;
            const data = {
              name,
              deductMoney,
              isSpecifyProduct,
              isAccumulate,
              isShare,
              type: Number(type),
              isValid,
              consumptionVoucherCode,
              isNeedMinPrice,
              minPrice: isNeedMinPrice == false ? 0 : minPrice,
              remark,
              effectiveTime,
              isMemberVoucher,
              memberRankCode: isMemberVoucher == false ? "" : memberRankCode,
            };
            // 添加
            api.AddConsumptionVoucher(data).then((res) => {
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
    this.getHospitalInfo();
    this.getConsumptionVoucherTypeList();
    this.getMemberRankInfo();
  },
  watch: {
    // "form.isNeedMinPrice"(value) {
    //   if (value == false) {
    //     this.form.minPrice = "";
    //     this.$refs.minPrice.validateMessage = "";
    //     this.$refs.minPrice.validateState = "";
    //   }
    // },
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
