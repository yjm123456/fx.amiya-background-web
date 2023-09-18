<template>
  <div>
    <Modal
      v-model="control"
      title="审核"
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
        <FormItem label="审核状态" prop="checkState">
          <Select v-model="form.checkState" placeholder="请选择审核状态">
            <Option
              v-for="item in checkStateList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="归属客服" prop="checkBelongEmpId">
          <Select
            v-model="form.checkBelongEmpId"
            placeholder="请选择归属客服"
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

        <FormItem label="审核备注" prop="checkRemark">
          <Input v-model="form.checkRemark" type="textarea" :rows="3"></Input>
        </FormItem>
        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/reconciliationDocumentsSettle";
export default {
  components: {},
  props: {
    examineModel: Boolean,
    params: Object,
    id: String,
  },
  data() {
    return {
      isLoading: false,
      checkStateList: [
        {
          id: 2,
          name: "审核通过",
        },
        {
          id: 1,
          name: "审核不通过",
        },
      ],
      control: false,
      form: {
        // 审核状态
        checkState: null,
        // 归属客服
        checkBelongEmpId: null,
        // 审核备注
        checkRemark: "",
      },
      ruleValidates: {
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkBelongEmpId: [
          {
            required: true,
            message: "请选择归属客服",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            checkState,
            checkBelongEmpId,
            checkRemark,
          } = this.form;
          const data = {
            id: this.id,
            checkState,
            checkBelongEmpId,
            checkRemark,
          };
          this.isLoading = true;
          api.checkReconciliationDocumentsSettle(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$emit("getListWithPageByCustomerCompensation");
              this.$Message.success({
                content: "提交成功",
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
      this.$emit("update:examineModel", false);
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  watch: {
    examineModel(value) {
      this.control = value;
    },
    itemInfo(value) {
      if (value.price) {
        this.form.checkBuyAgainPrice = value.price;
      }
    },
  },
};
</script>
