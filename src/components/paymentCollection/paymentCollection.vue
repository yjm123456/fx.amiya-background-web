<template>
  <div class="content">
    <Modal
      title="回款"
      footer-hide
      v-model="paymentCollectionModels"
      width="20%"
      :closable="false"
      @click="handleModalVisibleChange"

    >
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidate"
          label-position="left"
          :label-width="80"
        >
          <FormItem label="回款时间" prop="returnBackDate">
            <DatePicker
              type="date"
              placeholder="开始日期"
              style="width: 270px;"
              :value="form.returnBackDate"
              v-model="form.returnBackDate"
              transfer
            ></DatePicker>
          </FormItem>
          <FormItem label="回款金额" prop="returnBackPrice">
            <Input
              v-model="form.returnBackPrice"
              type="number"
              number
            ></Input>
          </FormItem>
        </Form>
        <div class="footer">
          <Button @click="cancel('form')" style="margin-right: 10px"
            >取消</Button
          >
          <Button type="primary" @click="submit('form')">确定</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as customerApi from "@/api/customerManage";
export default {
  components:{
      
  },
  props: {
    paymentCollectionModel: Boolean,
    paymentCollectionObj:Object
  },
  data() {
    return {
      paymentCollectionModels:false,
      customerPhotos:[],
      form:{
          orderId:'',
          returnBackPrice:null,
          type:'',
          returnBackDate: this.$moment(new Date()).format("YYYY-MM-DD"),
          orderDealId:''
      },
      ruleValidate: {
        returnBackPrice: [
          {
            required: true,
            message: "请输入回款金额",
          },
        ],
        returnBackDate: [
          {
            required: true,
            message: "请选择回款时间",
          },
        ],
      }
    };
  },
  methods: {
    // 提交 回款
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            const {orderId,returnBackPrice,type,returnBackDate,orderDealId} = this.form
            const data = {
                orderId,
                returnBackPrice,
                type,
                returnBackDate:this.$moment(new Date(returnBackDate)).format("YYYY-MM-DD"),
                orderDealId
            }
            if(type=='content'){
                // 内容平台回款
                api.returnBackOrder(data).then((res) => {
                    if (res.code === 0) {
                        this.$emit('hanPaymentChange')
                        this.cancel("form");
                        this.$Message.success({
                            content: "回款成功",
                            duration: 3,
                        });
                    } else if (res.code != -1 || res.code !=0){
                      this.$Message.error('操作失败，请联系管理员')
                    }
                });
            }else if(type=='ascendingOrder'){
              // 客户消费追踪回款
              customerApi.customerReturnBackOrder(data).then((res) => {
                  if (res.code === 0) {
                      this.$emit('hanPaymentChange')
                      this.cancel("form");
                      this.$Message.success({
                          content: "回款成功",
                          duration: 3,
                      });
                  } else if (res.code != -1 || res.code !=0){
                    this.$Message.error('操作失败，请联系管理员')
                  }
              });
            }else{
              // 下单平台回款
              api.orderReturnBackOrder(data).then((res) => {
                  if (res.code === 0) {
                      this.$emit('hanPaymentChange')
                      this.cancel("form");
                      this.$Message.success({
                          content: "回款成功",
                          duration: 3,
                      });
                  } else if (res.code != -1 || res.code !=0){
                    this.$Message.error('操作失败，请联系管理员')
                  }
              });
            }
            
        }
      })
    },
    // 取消
    cancel(name) {
      this.$emit("update:paymentCollectionModel", false);
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:paymentCollectionModel", false);
      }
        
    },
  },
  watch: {
    paymentCollectionModel: {
      handler(paymentCollectionModel) {
        this.paymentCollectionModels = paymentCollectionModel
      },
      deep: true,
    },
    paymentCollectionObj: {
      handler(val) {
        this.form.returnBackPrice = val.returnBackPrice
        this.form.orderId = val.orderId
        this.form.type = val.type
        this.form.orderDealId = val.orderDealId
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.footer{
    display: block;
    text-align: end;
}
</style>
