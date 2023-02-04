<template>
  <div>
    <Modal
      v-model="control"
      title="编辑"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="成交金额" prop="dealPrice">
          <Input
            v-model="form.dealPrice"
            placeholder="请输入成交金额"
            type="number"
            number
            disabled
          />
        </FormItem>
        <FormItem label="信息服务费比例" prop="informationPricePercent">
          <Input
            v-model="form.informationPricePercent"
            placeholder="请输入信息服务费比例"
            type="number"
            number
            @on-change="informationPricePercentChange"
          />
        </FormItem>
        <FormItem label="信息服务费" prop="informationPrice">
          <Input
            v-model="form.informationPrice"
            placeholder="请输入信息服务费"
            type="number"
            number
            disabled
          />
        </FormItem>
        <FormItem label="系统使用费比例" prop="systemUpdatePercent">
          <Input
            v-model="form.systemUpdatePercent"
            placeholder="请输入系统使用费比例"
            type="number"
            number
            @on-change="informationPricePercentChange"
          />
        </FormItem>
        
        <FormItem label="系统服务费" prop="systemUpdatePrice">
          <Input
            v-model="form.systemUpdatePrice"
            placeholder="请输入系统服务费"
            type="number"
            number
            disabled
          />
        </FormItem>
        <FormItem label="结算金额" prop="returnBackPrice">
          <Input
            v-model="form.returnBackPrice"
            placeholder="请输入系统使用费比例"
            type="number"
            number
            disabled
          />
        </FormItem>
        <FormItem label="是否上传对账单" prop="isSubmitReconciliationDocuments">
          <i-switch v-model="form.isSubmitReconciliationDocuments" />
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
import * as api from "@/api/unCheckOrder";
export default {
  components: {},
  props: {
    editModel: Boolean,
  },
  data() {
    return {
      control: false,
      form: {
        id: null,
        // 信息服务费比例
        informationPricePercent: null,
        // 系统服务费比例
        systemUpdatePercent: null,
        // 信息服务费
        informationPrice: null,
        // 系统服务费
        systemUpdatePrice: null,
        // 结算金额
        returnBackPrice: null,
        // 成交金额
        dealPrice: null,
        // 是否上传对账单
        isSubmitReconciliationDocuments: false,
      },
      ruleValidates: {
        informationPricePercent: [
          {
            required: true,
            message: "请输入信息服务费比例",
          },
        ],
        systemUpdatePercent: [
          {
            required: true,
            message: "请输入系统使用费比例",
          },
        ],
      },
    };
  },
  methods: {
    informationPricePercentChange(){
      this.form.informationPrice = Number(
            ((this.form.dealPrice * this.form.informationPricePercent) / 100).toFixed(2)
          );
          this.form.systemUpdatePrice = Number(
            ((this.form.dealPrice * this.form.systemUpdatePercent) / 100).toFixed(2)
          );
          this.form.returnBackPrice =
            this.form.informationPrice + this.form.systemUpdatePrice;
    },
    getByIdUnCheckOrder(value) {
      const data = {
        id: value,
      };
      api.byIdUnCheckOrder(data).then((res) => {
        if (res.code === 0) {
          const {
            id,
            informationPricePercent,
            systemUpdatePercent,
            informationPrice,
            systemUpdatePrice,
            returnBackPrice,
            isSubmitReconciliationDocuments,
            dealPrice,
          } = res.data.unCheckOrderVo;
          this.form.informationPricePercent = informationPricePercent;
          this.form.systemUpdatePercent = systemUpdatePercent;
          this.form.informationPrice = informationPrice;
          this.form.systemUpdatePrice = systemUpdatePrice;
          this.form.returnBackPrice = returnBackPrice;
          this.form.isSubmitReconciliationDocuments = isSubmitReconciliationDocuments;
          this.form.dealPrice = dealPrice;
          this.form.id = id;
        }
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            informationPricePercent,
            systemUpdatePercent,
            informationPrice,
            systemUpdatePrice,
            returnBackPrice,
            isSubmitReconciliationDocuments,
            dealPrice,
          } = this.form;
          // this.form.informationPrice = Number(
          //   ((dealPrice * informationPricePercent) / 100).toFixed(2)
          // );
          // this.form.systemUpdatePrice = Number(
          //   ((dealPrice * systemUpdatePercent) / 100).toFixed(2)
          // );
          // this.form.returnBackPrice =
          //   this.form.informationPrice + this.form.systemUpdatePrice;
          const data = {
            id,
            informationPricePercent,
            systemUpdatePercent,
            informationPrice,
            systemUpdatePrice,
            returnBackPrice,
            isSubmitReconciliationDocuments,
          };
          console.log(data);
          api.updateUnCheckOrder(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$emit("getUnCheckOrders");
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
      this.$emit("update:editModel", false);
      // this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
        // this.handleCancel("form");
      }
    },
  },
  watch: {
    editModel(value) {
      this.control = value;
    },
  },
};
</script>
