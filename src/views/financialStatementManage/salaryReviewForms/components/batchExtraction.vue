<template>
  <div>
    <Modal
      v-model="control"
      title="批量提取"
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
            <FormItem label="总成交金额" prop="orderAmount">
              <Input
                v-model="form.orderAmount"
                placeholder="请输入总成交金额"
                type="number"
                number
                disabled
              ></Input>
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
            <FormItem label="业绩提点" prop="remind">
              <Input
                v-model="form.remind"
                placeholder="请输入业绩提点"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="16">
            <FormItem label="提取备注" prop="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入提取备注"
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
    batchExtractionModel: Boolean,
    batchExtractionParams: Object,
    params:Object
  },
  data() {
    return {
      isLoading:false,
      control: false,
      form: {
        // 总成交金额
        orderAmount: null,
        // 归属客服
        checkBelongEmpId: null,
        // 提取备注
        remark: "",
        // 业绩提点
        remind: 0,
      },
      ruleValidates: {
        orderAmount: [
          {
            required: true,
            message: "请选择总成交金额",
          },
        ],
        checkBelongEmpId: [
          {
            required: true,
            message: "请选择归属客服",
          },
        ],
        remind: [
          {
            required: true,
            message: "请输入业绩提点",
          },
        ],
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            orderAmount,
            checkBelongEmpId,
            remark,
            remind
          } = this.form;
          const data = {
            orderAmount,
            checkBelongEmpId,
            remark,
            remind,
            list:this.batchExtractionParams.list
          };
          console.log(data)
          // this.isLoading = true;
          // api.checkReconciliationDocumentsSettle(data).then((res) => {
          //   if (res.code === 0) {
          //     this.isLoading = false;
          //     this.handleCancel("form");
          //     this.$emit("getListWithPageByCustomerCompensation");
          //     this.$Message.success({
          //       content: "提交成功",
          //       duration: 3,
          //     });
          //   } else {
          //     setTimeout(() => {
          //       this.isLoading = false;
          //     }, 3000);
          //   }
          // });
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:batchExtractionModel", false);
      this.$refs[name].resetFields();
      this.$parent.getListWithPageByCustomerCompensation()
      this.$parent.batchExtractionParams.list = []
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  watch: {
    batchExtractionModel(value) {
      this.control = value;
      let price = 0
      this.batchExtractionParams.list.map(item=>{
        price += item.dealPrice
      })
      this.form.orderAmount = Math.round( price *1000 / 10 ) / 100
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
.form_text{
  font-size: 14px;
  color: red;
  font-weight: bold;
}
</style>
