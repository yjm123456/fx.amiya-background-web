<template>
  <div class="content">
    <Modal
      title="添加凭证"
      footer-hide
      v-model="addTransactionVoucherModals"
      width="55%"
      :closable="false"
      @click="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="绑定手机号" prop="bindPhone">
              <Input
                v-model="form.bindPhone"
                placeholder="请输入绑定手机号"
                maxlength="11"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="客户姓名" prop="customerName">
              <Input
                v-model="form.customerName"
                placeholder="请输入客户姓名"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="留院电话" prop="toHospitalPhone">
              <Input
                v-model="form.toHospitalPhone"
                placeholder="请输入留院电话"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="消费时间" prop="consumeDate">
              <DatePicker
                type="date"
                placeholder="消费时间"
                :value="form.consumeDate"
                v-model="form.consumeDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="消费凭证1"
              prop="payVoucherPicture1"
              key="payVoucherPicture1"
            >
              <upload
                :uploadObj="uploadObj"
                @uploadChange="handleUploadChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="消费凭证2"
              prop="payVoucherPicture2"
              key="payVoucherPicture2"
            >
              <upload
                :uploadObj="uploadObj2"
                @uploadChange="handleUploadChange2"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="消费凭证3"
              prop="payVoucherPicture3"
              key="payVoucherPicture3"
            >
              <upload
                :uploadObj="uploadObj3"
                @uploadChange="handleUploadChange3"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="消费凭证4"
              prop="payVoucherPicture4"
              key="payVoucherPicture4"
            >
              <upload
                :uploadObj="uploadObj4"
                @uploadChange="handleUploadChange4"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="消费凭证5"
              prop="payVoucherPicture5"
              key="payVoucherPicture5"
            >
              <upload
                :uploadObj="uploadObj5"
                @uploadChange="handleUploadChange5"
              />
            </FormItem>
          </Col>
          <Spin fix v-if="isLoading == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
        </Row>
      </Form>

      <div class="footer">
        <Button @click="cancel('form')" style="margin-right: 10px">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/customerConsumptionCredentials";

import upload from "@/components/upload/upload";

export default {
  components: { upload },
  props: {
    addTransactionVoucherModal: Boolean,
    addTransactionVoucherParams: Object,
  },
  data() {
    return {
      isLoading: false,
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj2: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj3: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj4: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj5: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      addTransactionVoucherModals: false,
      form: {
        // 手机号
        bindPhone: "",
        // 客户姓名
        customerName: "",
        // 留院电话
        toHospitalPhone: "",
        //消费时间
        consumeDate: "",
        // 消费凭证截图1
        payVoucherPicture1: "",
        // 消费凭证截图2
        payVoucherPicture2: "",
        // 消费凭证截图3
        payVoucherPicture3: "",
        // 消费凭证截图4
        payVoucherPicture4: "",
        // 消费凭证截图5
        payVoucherPicture5: "",
      },

      ruleValidate: {
        bindPhone: [
          {
            required: true,
            message: "请输入小程序绑定手机号",
          },
        ],
        customerName: [
          {
            required: true,
            message: "请输入客户姓名",
          },
        ],
        toHospitalPhone: [
          {
            required: true,
            message: "请输入留院电话",
          },
        ],
        consumeDate: [
          {
            required: true,
            message: "请选择消费时间",
          },
        ],

        payVoucherPicture1: [
          {
            required: true,
            message: "请上传消费凭证1",
          },
        ],
      },
    };
  },
  methods: {
    // 图片1
    handleUploadChange(values) {
      this.form.payVoucherPicture1 = values[0];
    },
    // 图片2
    handleUploadChange2(values) {
      this.form.payVoucherPicture2 = values[0];
    },
    // 图片3
    handleUploadChange3(values) {
      this.form.payVoucherPicture3 = values[0];
    },
    // 图片4
    handleUploadChange4(values) {
      this.form.payVoucherPicture4 = values[0];
    },
    // 图片5
    handleUploadChange5(values) {
      this.form.payVoucherPicture5 = values[0];
    },
    // 取消
    cancel(name) {
      this.$emit("update:addTransactionVoucherModal", false);
      this.$refs[name].resetFields();
      this.uploadObj.uploadList = [];
      this.uploadObj2.uploadList = [];
      this.uploadObj3.uploadList = [];
      this.uploadObj4.uploadList = [];
      this.uploadObj5.uploadList = [];
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            bindPhone,
            customerName,
            toHospitalPhone,
            consumeDate,
            payVoucherPicture1,
            payVoucherPicture2,
            payVoucherPicture3,
            payVoucherPicture4,
            payVoucherPicture5,
          } = this.form;
          // 添加
          const data = {
            bindPhone,
            customerName,
            toHospitalPhone,
            consumeDate: this.$moment(consumeDate).format("YYYY-MM-DD"),
            payVoucherPicture1,
            payVoucherPicture2,
            payVoucherPicture3,
            payVoucherPicture4,
            payVoucherPicture5,
          };
          if (bindPhone) {
            if (!/^1[3456789]\d{9}$/.test(bindPhone)) {
              this.$Message.warning("请输入正确的手机号");
              return false;
            }
            this.isLoading = true;
            api.addCustomerConsumptionCredentials(data).then((res) => {
              if (res.code === 0) {
                this.isLoading = false;
                this.cancel("form");
                this.$emit('getHospitalInfo');
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              } else {
                setTimeout(() => {
                  this.isLoading = false;
                }, 3000);
              }
            });
          }
        }
      });
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form")
      }
    },
  },
  watch: {
    addTransactionVoucherModal: {
      handler(addTransactionVoucherModal) {
        this.addTransactionVoucherModals = addTransactionVoucherModal;
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.img_o {
  width: 100%;
  height: auto;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img,
.img_o {
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.no_date {
  text-align: center;
}
.img_cons {
  display: flex;
  flex-wrap: wrap;
}
</style>
