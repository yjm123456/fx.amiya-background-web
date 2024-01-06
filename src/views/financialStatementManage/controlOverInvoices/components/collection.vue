<template>
  <div>
    <Modal
      v-model="control"
      title="回款"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="120"
      >
        
        <FormItem label="发票金额" prop="billPrice">
          <Input
            v-model="form.billPrice"
            placeholder="请输入发票金额"
            type="number"
            number
            disabled
          ></Input>
        </FormItem>
        <FormItem label="其他费用" prop="otherPrice">
          <Input
            v-model="form.otherPrice"
            placeholder="请输入其他费用"
            type="number"
            number
            disabled
          ></Input>
        </FormItem>
        <FormItem label="已回款金额" prop="returnBackPriceMo">
          <Input
            v-model="form.returnBackPriceMo"
            placeholder="请输入已回款金额"
            type="number"
            number
            disabled
          ></Input>
        </FormItem>
        <FormItem label="回款时间" prop="returnBackDate">
          <DatePicker
            type="date"
            placeholder="回款时间"
            style="width: 100%;"
            :value="form.returnBackDate"
            v-model="form.returnBackDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="回款金额" prop="returnBackPrice">
          <Input
            v-model="form.returnBackPrice"
            placeholder="请输入回款金额"
            type="number"
            number
            
          ></Input>
        </FormItem>
        <FormItem label="回款备注" prop="remark">
          <Input
            v-model="form.remark"
            placeholder="请输入回款备注"
            type="textarea"
            :rows="4"
          ></Input>
        </FormItem>
        <Spin fix v-if="isLoading == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
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
import * as api from "@/api/bill";
export default {
  components: {},
  props: {
    collectionModel: Boolean,
    collectionParams: Object,
  },
  data() {
    return {
      isLoading:false,
      control: false,
      form: {
        // 回款时间
        returnBackDate: "",
        // 回款金额
        returnBackPrice: null,
        // 回款备注
        remark: "",
        //发票金额
        billPrice:null,
        // 其他费用
        otherPrice:null,
        // 已回款金额
        returnBackPriceMo:null
      },

      ruleValidate: {
        returnBackDate: [
          {
            required: true,
            message: "请选择回款时间",
          },
        ],
        returnBackPrice: [
          {
            required: true,
            message: "请输入回款金额",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { returnBackDate, returnBackPrice, remark ,billPrice,otherPrice,returnBackPriceMo} = this.form;
          const data = {
            id: this.collectionParams.id,
            returnBackPrice,
            remark,
            returnBackDate: this.$moment(returnBackDate).format("YYYY-MM-DD"),
          };
          // 合计发票金额和其他费用
          let total = (Number(billPrice + otherPrice)).toFixed(2)
          //  已回款金额和回款金额合计
          let total2 = (Number(Number(returnBackPriceMo) + returnBackPrice)).toFixed(2)
          if(Number(total2) > Number(total)){
            this.$Message.warning({
              content:"当前回款金额与已回款金额累计（" + Number(total2)  + "元）不能大于发票金额与其他费用的总和（" + Number(total) +"元）",
              duration: 4,
            });
            return
          }
          this.isLoading = true
          // 回款
          api.returnBakcPriceAsync(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false
              this.$parent.getBillList()
              this.handleCancel("form");
              this.$Message.success({
                content: "已回款",
                duration: 3,
              });
            }else{
               setTimeout(()=>{
                  this.isLoading = false
                },3000)
            }
          });
        }
      });
    },
    handleCancel(name) {
      this.$emit("update:collectionModel", false);
      this.$refs["form"].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:collectionModel", false);
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {},
  watch: {
    collectionModel(value) {
      let num = 0.00
      this.control = value;
      this.form.billPrice = this.collectionParams.billPrice
      this.form.otherPrice = this.collectionParams.otherPrice
      this.form.returnBackPriceMo = this.collectionParams.returnBackPrice == null || this.collectionParams.returnBackPrice == 0 ? num.toFixed(2) : this.collectionParams.returnBackPrice
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
