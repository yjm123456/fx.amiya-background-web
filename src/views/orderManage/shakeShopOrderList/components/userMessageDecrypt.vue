<template>
  <div>
    <Modal
      v-model="control"
      title="用户信息解密"
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
       <FormItem label="主播" prop="belongLiveAnchorId">
         <Select
            v-model="form.belongLiveAnchorId"
            placeholder="请选择主播"
          >
            <Option
              v-for="item in liveAnchorBaseInfoValidList2"
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
import * as api from "@/api/tikTokOrder";
export default {
  props: {
    userMessageModel: Boolean,
    userMessageParams:Object,
    liveAnchorBaseInfoValidList2:Array
  },
  data() {
    return {
     
      control: false,
      form: {
        // 主播
        belongLiveAnchorId:'',
      },
      ruleValidates: {
        belongLiveAnchorId: [
          {
            required: true,
            message: "请选择主播",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {belongLiveAnchorId} = this.form
          const data = {
            orderid:this.userMessageParams.orderid,
            belongLiveAnchorId
          }
          api.decryptUserInfo(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$emit("getTikTokOrder");
              this.$Message.success({
                content: "用户解密成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:userMessageModel", false);
      this.form.belongLiveAnchorId = ''
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
        // this.handleCancel("form");
      }
    },
  },
  watch: {
    userMessageModel(value) {
      this.control = value;
    },
  },
};
</script>