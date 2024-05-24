<template>
  <div>
    <Modal
      v-model="control"
      title="批量审核"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="60%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="130"
      >
          <Row :gutter="30">
            <Col span="8">
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
            </Col>
            <Col span="8">
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
            </Col>
            <Col span="8">
              <FormItem label="审核类型" prop="checkType">
                <Select
                  v-model="form.checkType"
                  placeholder="请选择审核类型"
                  disabled
                >
                  <Option
                    v-for="item in params.reconciliationtCheckType"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label="审核备注" prop="checkRemark">
                <Input
                  v-model="form.checkRemark"
                  type="textarea"
                  :rows="2"
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
    batchReviewModel: Boolean,
    params: Object,
    checkedParams: Object,
  },
  data() {
    return {
      checkTitle: "审核客服业绩",
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
        // 审核类型
        checkType: '1',
       
      },
      ruleValidates: {
        checkType: [
          {
            required: true,
            message: "请选择审核类型",
          },
        ],
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
      // 审核类型
      checkTypeList: [
        {
          type: 0,
          name: "其他",
        },
        {
          type: 1,
          name: "自播达人",
        },
        {
          type: 2,
          name: "供应链达人",
        },
        {
          type: 3,
          name: "天猫升单",
        },
      ],
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
            checkType,
          } = this.form;
          const data = {
            idList: [...this.checkedParams.idList],
            checkState,
            checkBelongEmpId,
            checkRemark,
            checkType,
          };
          this.isLoading = true;
          api.batchCheckReconciliationDocumentsSettle(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
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
      this.$emit("update:batchReviewModel", false);
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
        this.$emit("getListWithPageByCustomerCompensation");
        this.$parent.checkedParams.idList.clear()

      }
    },
  },
  watch: {
    batchReviewModel(value) {
      this.control = value;
    },
  },
};
</script>
<style scoped>
.bor {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 10px 0px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.title {
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
</style>
