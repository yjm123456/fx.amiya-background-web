<template>
  <div>
    <Modal
      v-model="control"
      title="赠送积分"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form ref="form" :model="form" label-position="left" :label-width="100">
        <FormItem label="订单号" prop="orderId">
          <Input v-model="form.orderId" placeholder="请输入订单号" />
        </FormItem>
        <FormItem
          label="消费金额"
          prop="actualPayment"
          :rules="[
            {
              required: true,
              message: '请输入消费金额(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 1,
            },
          ]"
        >
          <Input
            v-model="form.actualPayment"
            placeholder="请输入消费金额"
            type="number"
            number
          />
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
    bonusPointsControlModal: Boolean,
    bonusPointsParams: Object,
  },
  data() {
    return {
      control: false,
      form: {
        //
        orderId: null,
        // 消费金额
        actualPayment: null,
      },
      ruleValidates: {},
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = {
            encryptPhone: this.bonusPointsParams.encryptPhone,
            orderId: this.form.orderId,
            actualPayment: this.form.actualPayment,
          };
          api.addCustomerIntergration(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$emit("getWeChatCustomerList");
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
      this.$emit("update:bonusPointsControlModal", false);
      this.$refs['form'].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    bonusPointsControlModal(value) {
      this.control = value;
    },
  },
};
</script>
