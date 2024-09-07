<template>
  <div>
    <Modal
      v-model="verificationFormModels"
      title="验单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="三方平台" prop="thirdPartContentplatformInfoId">
          <Select
            v-model="form.thirdPartContentplatformInfoId"
            placeholder="三方平台"
          >
            <Option
              v-for="item in thirdPartContentplatformInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <Spin fix v-if="flag == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/thirdPartContentplatformInfo";
export default {
  components: {},
  props: {
    verificationFormModel: Boolean,
    verificationFormParams: Object,
  },
  data() {
    return {
      flag: false,
      // 三方平台
      thirdPartContentplatformInfo: [],
      verificationFormModels: false,
      form: {
        thirdPartContentplatformInfoId: "",
      },
      ruleValidate: {
        thirdPartContentplatformInfoId: [
          {
            required: true,
            message: "请选择三方平台",
          },
        ],
      },
    };
  },
  methods: {
    getValidKeyAndValue() {
      api.ValidKeyAndValue().then((res) => {
        if (res.code == 0) {
          const {thirdPartContentplatformInfo} = res.data
          this.thirdPartContentplatformInfo = thirdPartContentplatformInfo;
          this.form.thirdPartContentplatformInfoId = thirdPartContentplatformInfo ? thirdPartContentplatformInfo[0].id : ''
        }
      });
    },
    handleSubmit() {
      const data = {
        thirdPartContentplatformInfoId: this.form
          .thirdPartContentplatformInfoId,
        hospitalId: this.verificationFormParams.sendHospitalId,
        orderId: this.verificationFormParams.orderId,
        sendOrderId: this.verificationFormParams.id,
      };
      if (!this.form.thirdPartContentplatformInfoId) {
        this.$Message.warning("请选择三方平台");
        return;
      }
      this.flag = true;
      api.getIsRepeateByHospitalIdAndThirdPartIdToLangZi(data).then((res) => {
        if (res.code == 0) {
          this.flag = false;
          this.cancel("form");
          this.$Message.success({
            content: res.data.hospitalContentplatformCode.remsg,
            duration: 3,
          });
        } else {
          setTimeout(() => {
            this.flag = false;
          }, 3000);
        }
      });
    },
    // 取消
    cancel(name) {
      this.$emit("update:verificationFormModel", false);
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
        this.$emit("update:verificationFormModel", false);
      }
    },
  },
  watch: {
    verificationFormModel: {
      handler(verificationFormModel) {
        this.verificationFormModels = verificationFormModel;
        if (verificationFormModel == true) {
          this.getValidKeyAndValue();
        }
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
