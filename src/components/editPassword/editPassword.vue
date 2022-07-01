<template>
  <div>
    <Modal v-model="controlModal" title="修改密码" :mask-closable="false" :closable="false">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="老密码" prop="oldPassword">
          <Input v-model="form.oldPassword" placeholder="请输入老密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
          <Input v-model="form.newPassword" placeholder="密码必须是数字加英文且不少于8位数"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')" v-show="isColse">关闭</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as user from "@/api/user";
export default {
  props: {
    isColse:{
      type:Boolean,
      default: true
    },
    controlEditPasswordModal: Boolean,
  },
  data() {
    return {
      controlModal: false,

      employeeType:sessionStorage.getItem("employeeType"),

      form: {
        oldPassword: "",
        newPassword: "",
      },

      ruleValidate: {
        oldPassword: [
          {
            required: true,
            message: "请输入老密码",
          },
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
          },
          {
            type: "string",
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/,
            message: "密码必须是数字加英文且不少于8位数",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 取消修改密码
    cancelSubmit(name) {
      this.controlModal = false;
      this.$refs[name].resetFields();
      this.$emit("handleEditPasswordModalChange")
    },

    // 确认修改密码
    handleSubmit(name) {
      const { newPassword, oldPassword } = this.form;
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.employeeType === "amiyaEmployee") {
            // 修改阿美雅员工密码
            const data = {
              oldPassword,
              newPassword,
            };
            user.editAmiyaEmployeePassword(data).then((res) => {
              if (res.code === 0) {
                sessionStorage.setItem("pd",newPassword)
                this.cancelSubmit("form");
                this.$emit("handleEditPasswordModalChange")
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            // 修改医院员工密码
            const data = {
              newPassword,
              oldPassword,
            };
            user.editHospitalEmployeePassword(data).then((res) => {
              if (res.code === 0) {
                sessionStorage.setItem("pd",newPassword)
                this.cancelSubmit("form");
                this.$emit("handleEditPasswordModalChange")
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
  },
  watch: {
    controlEditPasswordModal(value) {
      if (value) {
        this.controlModal = value;
      }
    },
  },
};
</script>
