<template>
  <div>
    <Modal
      v-model="control"
      :title="sendGoodstitle"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="sendGoods"
        :rules="sendGoodsRuleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="物流公司" prop="id">
          <Select
            v-model="sendGoods.id"
            placeholder="请选择物流公司"
            filterable
          >
            <Option
              v-for="item in ExpressList"
              :value="item.id"
              :key="item.id"
              >{{ item.expressName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="快递单号" prop="courierNumber">
          <Input
            v-model="sendGoods.courierNumber"
            placeholder="请输入快递单号"
          ></Input>
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
import * as api from "@/api/orderManage";
export default {
  props: {
    controlModal: Boolean,
    tradeId: String,
    ExpressList:Array,
    sendGoodstitle:String,
    sendInfo:Object,
    orderId:String
  },
  data() {
    return {
      title:'',
      control: false,
      sendGoods: {
        courierNumber: null,
        id:""
      },

      sendGoodsRuleValidate: {
        courierNumber: [
          {
            required: true,
            message: "请输入快递单号",
          },
        ],
        id: [
          {
            required: true,
            message: "请选择物流公司",
          },
        ],
        
      },
    };
  },
  methods: {
    
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { courierNumber ,id } = this.sendGoods;
          const data = {
            courierNumber,
            tradeId: this.tradeId,
            expressId:id,
            orderId:this.orderId
          };
          if(this.sendGoodstitle == '发货'){
            api.sendGoods(data).then((res) => {
              if (res.code === 0) {
                this.handleCancel("form");
                this.$emit("handleRefreshOrderList");
                this.$Message.success({
                  content: "提交成功",
                  duration: 3,
                });
              }
            });
          }else{
            api.updateSendGoodsInfo(data).then((res) => {
              if (res.code === 0) {
                this.handleCancel("form");
                this.$emit("handleRefreshOrderList");
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          }
          
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:controlModal", false);
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
    controlModal(value) {
      this.control = value;
     
    },
    sendInfo(value){
      const {expressId,courierNumber} = value
      this.sendGoods.id = expressId
      this.sendGoods.courierNumber = courierNumber
    }
   
  },
};
</script>