<template>
  <div>
    <Modal
      v-model="control"
      title="生成薪资单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="60%"
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
            <FormItem label="薪资名称" prop="name">
              <Input v-model="form.name" placeholder="请输入薪资名称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="助理" prop="belongEmpId">
              <Select
                v-model="form.belongEmpId"
                placeholder="请选择助理"
                filterable
              >
                <Option
                  v-for="item in params.employeeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="总金额" prop="totalPrice">
              <Input
                v-model="form.totalPrice"
                placeholder="请输入总金额"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="其他金额" prop="otherPrice">
              <Input
                v-model="form.otherPrice"
                placeholder="请输入其他金额"
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
        </Row>
        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/customerServiceCompensation";
export default {
  props: {
    generateSalaryModel: Boolean,
    generateSalaryParams: Object,
    params: Object,
  },
  data() {
    return {
      isLoading: false,
      control: false,
      form: {
        // 薪资名称
        name: "",
        // 助理
        belongEmpId: null,
        // 总金额
        totalPrice: null,
        // 其他金额
        otherPrice: null,
        // 备注
        remark: "",
        // 对账单id集合
        recommandDocumentSettleIdList: [],
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请选择薪资名称",
          },
        ],
        belongEmpId: [
          {
            required: true,
            message: "请选择助理",
          },
        ],
        totalPrice: [
          {
            required: true,
            message: "请输入总金额",
          },
        ],
        otherPrice: [
          {
            required: true,
            message: "请输入其他金额",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          // 生成发票
          api.addCustomerServiceCompensation(this.form).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$Message.success({
                content: "已成功生成助理薪资单",
                duration: 3,
              });
            } else {
              setTimeout(() => {
                this.isLoading = false;
              }, 3000);
            }
          });
        }
      });
    },
    handleCancel(name) {
      this.$emit("update:generateSalaryModel", false);
      this.$emit("getListWithPageByCustomerCompensation");
      this.$refs["form"].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:generateSalaryModel", false);
        this.$emit("getListWithPageByCustomerCompensation");
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {},
  watch: {
    generateSalaryModel(value) {
      let orderId = [];
      this.control = value;
      this.form.totalPrice = Number(this.generateSalaryParams.returnBackPrice);
      this.generateSalaryParams.generateSalaryList.map((item) => {
        orderId.push(item.id);
      });
      this.form.recommandDocumentSettleIdList = orderId;
    },
  },
};
</script>
<style scoped>
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
