<template>
  <div>
    <Modal
      v-model="control"
      title="发放礼品"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="40%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="收件人姓名" prop="receiveName">
          <Input
            v-model="form.receiveName"
            placeholder="请输入收件人姓名"
          ></Input>
        </FormItem>
        <FormItem label="收件人号码" prop="phone">
          <Input
            v-model="form.phone"
            placeholder="请输入收件人号码"
          ></Input>
        </FormItem>
        <FormItem label="收件人地址" prop="address">
          <Input v-model="form.address" placeholder="请输入收件人地址" type="textarea" :rows="4" ></Input>
        </FormItem>
        <FormItem label="礼品数量" prop="quantity">
          <Input
            v-model="form.quantity"
            placeholder="请输入礼品数量"
          ></Input>
        </FormItem>
        <FormItem label="礼品分类" prop="giftClassification">
          <Select
            v-model="form.giftClassification"
            placeholder="请选择礼品分类"
            @on-change="getGiftClassification(form.giftClassification)"
          >
            <Option
              v-for="item in params.giftCategoryNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="礼品" prop="giftId">
          <Select v-model="form.giftId" placeholder="请选择礼品" :disabled="form.giftClassification == ''">
            <Option
              v-for="item in giftNameList"
              :value="item.id"
              :key="item.id"
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
    giftModel: Boolean,
    params: Object,
  },
  data() {
    return {
      control: false,
      form: {
        customerId: "",
        // 数量
        quantity: "",
        // 礼品id
        giftId: null,
        // 收件人号码
        phone: "",
        // 收件人姓名
        receiveName: "",
        // 详细地址
        address: "",
        //礼品分类
        giftClassification: "",
      },
      ruleValidate: {
        quantity: [
          {
            required: true,
            message: "请输入礼品数量",
          },
        ],
        receiveName: [
          {
            required: true,
            message: "请输入收件人姓名",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入收件人手机号",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入收件人地址",
          },
        ],
        giftClassification: [
          {
            required: true,
            message: "请选择礼品分类",
          },
        ],
        giftId: [
          {
            required: true,
            message: "请选择礼品",
          },
        ],
      },
      //   礼品分类
      giftCategoryNameList: [],
      // 礼品
      giftNameList: [],
      //   地址
      addressList:[],
    //   接收父组件传过来的值
    giftInfo:{}
    };
  },
  methods: {
    // 根据加密手机号或者发放礼品的初始数据
    getSendGiftBaseInfos(value) {
      const data = {
        encryptPhone: value,
      };
      api.getSendGiftBaseInfo(data).then((res) => {
        if (res.code === 0) {
          const { baseInfo } = res.data;
          this.form.receiveName = baseInfo.receiveName;
          this.form.phone = baseInfo.phone;
          this.form.address = baseInfo.address;
        }
      });
    },

    

    //根据礼品分类或者礼品
    getGiftClassification(value) {
      const data = {
        categoryId: value,
      };
      api.giftNameList(data).then((res) => {
        if (res.code === 0) {
          this.giftNameList = res.data.giftNameList;
        }
      });
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
          const {quantity,giftId,phone,receiveName,address} = this.form
          const data = {
            id:this.params.id,
            quantity,
            giftId:Number(giftId),
            phone,
            receiveName,
            address
          }
          api.customerServiceSendGift(data).then((res) => {
            if (res.code === 0) {
              this.$emit("handleRefreshCustomerList")
              this.handleCancel("form");
              this.$Message.success({
                content: "发放成功",
                duration: 3,
              });
            }
          });
      });
    },

    handleCancel(name) {
        this.$refs[name].resetFields();
      this.$emit("update:giftModel", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:giftModel", false);
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    
  },
  watch: {
    giftModel(value) {
      this.control = value;
      this.form.phone=this.params.phone
    },
  },
};
</script>
