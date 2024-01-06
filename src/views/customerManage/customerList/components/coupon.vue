<template>
  <div>
    <Modal
      v-model="control"
      title="发优惠券"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="优惠券" prop="voucherCode">
          <Select v-model="form.voucherCode" placeholder="请选择优惠券">
            <Option
              v-for="item in consumptionVoucherCodeNames"
              :value="item.voucherCode"
              :key="item.voucherCode"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
export default {
  components: {},
  props: {
    couponModel: Boolean,
    couponId: String,
    consumptionVoucherCodeNames: Array,
  },
  data() {
    return {
      control: false,
      form: {
        voucherCode: "",
      },
      ruleValidate: {
        voucherCode: [
          {
            required: true,
            message: "请选择优惠券",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = {
            customerId: this.couponId,
            voucherCode: this.form.voucherCode,
          };
          api.sendVoucher(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              // this.$emit("getWeChatCustomerList");
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:couponModel", false);
      this.$refs["form"].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    couponModel(value) {
      this.control = value;
    },
  },
};
</script>
