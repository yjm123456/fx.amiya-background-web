<template>
  <div>
    <Modal
      v-model="control"
      title="入库"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="100"
      >
        <FormItem
          label="单价"
          prop="singlePrice"
          :rules="[
            {
              required: true,
              message: '请输入数量(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 0,
            },
          ]"
        >
          <Input
            v-model="form.singlePrice"
            placeholder="请输入单价"
            type="number"
            number
            disabled
          ></Input>
        </FormItem>
        <FormItem
          label="数量"
          prop="amount"
          :rules="[
            {
              required: true,
              message: '请输入数量(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 0,
            },
          ]"
        >
          <Input
            v-model="form.amount"
            placeholder="请输入数量"
            number
            type="number"
            @on-change="amountChange"
          ></Input>
        </FormItem>
        <FormItem
          label="总价"
          prop="totalPrice"
          :rules="[
            {
              required: true,
              message: '请输入总价(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 0,
            },
          ]"
        >
          <Input
            v-model="form.totalPrice"
            placeholder="请输入总价"
            type="number"
            number
            @on-change="totalPriceChange"
          ></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="form.remark" type="textarea" :rows="3"></Input>
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
import * as api from "@/api/AmiyaWareHouseNameManage";
export default {
  props: {
    warehousingModel: Boolean,
    id: String,
  },
  data() {
    return {
      control: false,
      form: {
        id: null,
        // 单价
        singlePrice: null,
        // 数量
        amount: null,
        // 总价
        totalPrice: null,
        // 备注
        remark: "",
      },
      ruleValidates: {
        singlePrice: [
          {
            required: true,
            message: "请输入单价",
          },
        ],
        amount: [
          {
            required: true,
            message: "请输入数量",
          },
        ],
        totalPrice: [
          {
            required: true,
            message: "请输入总价",
          },
        ],
      },
    };
  },
  methods: {
    amountChange() {
      const { totalPrice, amount } = this.form;
      this.form.singlePrice =
        amount == 0 ? 0 : Number((totalPrice / amount).toFixed(2));
    },
    totalPriceChange() {
      const { totalPrice, amount } = this.form;
      this.form.singlePrice =
        amount == 0 ? 0 : Number((totalPrice / amount).toFixed(2));
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { singlePrice, amount, totalPrice, remark } = this.form;
          const data = {
            id: this.id,
            singlePrice,
            totalPrice,
            amount,
            remark,
          };
          api.InWareHouse(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$emit("handleRefreshCustomerList");
              this.form.remark = "";
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
      this.$refs[name].resetFields();
      this.$emit("update:warehousingModel", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$refs["form"].resetFields();
        this.$emit("update:warehousingModel", false);
      }
    },
  },
  watch: {
    warehousingModel(value) {
      this.control = value;
    },
  },
};
</script>
