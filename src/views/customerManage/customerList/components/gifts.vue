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
            :disabled="form.addressId"
          ></Input>
        </FormItem>
        <FormItem label="收件人号码" prop="receivePhone">
          <Input
            v-model="form.receivePhone"
            placeholder="请输入收件人号码"
            :disabled="form.addressId"
          ></Input>
        </FormItem>
        <FormItem label="收件人地址" prop="address">
          <Input v-model="form.address" placeholder="请输入收件人地址" type="textarea" :rows="4" :disabled="form.addressId"></Input>
        </FormItem>
        <FormItem label="打开更多地址" prop="isAddress" >
          <i-switch v-model="form.isAddress" @on-change="isAddressChange"/>
        </FormItem>
        <FormItem label="地址" prop="addressId" v-show="form.isAddress == true">
          <Select
            v-model="form.addressId"
            placeholder="请选择地址"
            @on-change="addressChange(form.addressId)"
            
          >
            <Option
              v-for="item in addressList"
              :value="item.id"
              :key="item.id"
              >{{ item.receiveName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="礼品分类" prop="giftClassification">
          <Select
            v-model="form.giftClassification"
            placeholder="请选择礼品分类"
            @on-change="getGiftClassification(form.giftClassification)"
          >
            <Option
              v-for="item in giftCategoryNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="礼品" prop="giftId">
          <Select v-model="form.giftId" placeholder="请选择礼品">
            <Option
              v-for="item in giftNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="订单号" prop="orderId">
          <Input
            v-model="form.orderId"
            placeholder="请输入订单号"
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
import * as api from "@/api/customerManage";
import * as giftCategoryApi from "@/api/giftCategory";

export default {
  components: {},
  props: {
    giftModel: Boolean,
    giftParams: Object,
  },
  data() {
    return {
      control: false,
      form: {
        customerId: "",
        // 订单号
        orderId: "",
        // 礼品id
        giftId: null,
        // 收货地址id
        addressId: null,
        // 收件人号码
        receivePhone: "",
        // 收件人姓名
        receiveName: "",
        // 详细地址
        address: "",
        //礼品分类
        giftClassification: "",
        // 打开更多地址
        isAddress:false
      },
      ruleValidate: {
        receiveName: [
          {
            required: true,
            message: "请输入收件人姓名",
          },
        ],
        receivePhone: [
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
        addressId: [
          {
            required: true,
            message: "请选择地址",
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
          this.form.receivePhone = baseInfo.receivePhone;
          this.form.address = baseInfo.address;
        }
      });
    },

    // 获取礼品分类（下拉框）
    getGiftCategoryNameList() {
      giftCategoryApi.getGiftCategoryNameList().then((res) => {
        if (res.code === 0) {
          this.giftCategoryNameList = res.data.nameList;
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

    // 打开更多地址为false时，清空下拉框的值
    isAddressChange(){
        if(this.form.isAddress == false) {
            this.form.addressId = null
        }
    },

    // 选择地址之后赋值收件人姓名、号码和地址
    addressChange(value){
        this.addressList.map(item=>{
            if(item.id == value){
                this.form.address = item.address
                this.form.receivePhone = item.receivePhone
                this.form.receiveName = item.receiveName
            }
        })
    },

    // 获取地址（下拉框）
    getAddressLists(value){
        const data = {
            customerId:value
        }
        api.getAddressList(data).then((res) => {
            if (res.code === 0) {
                this.addressList = res.data.addressList;
            }
        });
    },
    
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
          const {customerId,orderId,giftId,addressId,receivePhone,receiveName,address} = this.form
          const data = {
            customerId:this.giftParams.id,
            orderId,
            giftId:Number(giftId),
            addressId,
            receivePhone,
            receiveName,
            address
          }
          api.SendGift(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$emit("getWeChatCustomerList");
              this.$Message.success({
                content: "发放成功",
                duration: 3,
              });
            }
          });
      });
    },

    handleCancel(name) {
      this.$emit("update:giftModel", false);
      this.$refs["form"].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  created() {
    this.getGiftCategoryNameList();
  },
  watch: {
    giftModel(value) {
      this.control = value;
    },
  },
};
</script>
