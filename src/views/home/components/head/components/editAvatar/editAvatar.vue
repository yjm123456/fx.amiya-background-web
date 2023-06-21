<template>
  <div>
    <Modal v-model="controlModal" title="修改头像" :mask-closable="false" :closable="false">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="头像" prop="avatar">
           <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
       
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')" >取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as user from "@/api/user";
import upload from "@/components/upload/upload";

export default {
  components:{
    upload
  },
  props: {
    editAvatarModel: Boolean,
  },
  data() {
    return {
      controlModal: false,

      employeeId:sessionStorage.getItem("employeeId"),

      employeeType:sessionStorage.getItem("employeeType"),

      form: {
        avatar: "",
      },

      ruleValidate: {
        avatar: [
          {
            required: true,
            message: "请上传头像",
          },
        ],
      },
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
    };
  },
  methods: {
    // 图片
    handleUploadChange(values) {
      this.form.avatar = values[0];
    },
    // 取消
    cancelSubmit(name) {
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
      this.$emit("handleEditAvatarChange")
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            const data = {
                type:this.employeeType == 'amiyaEmployee' ? 1 : 2,
                id:Number(this.employeeId),
                url:this.form.avatar
            }
            user.updateAvatar(data).then((res) => {
              if (res.code === 0) {
                sessionStorage.setItem("avatar",res.data.avatar)
                this.cancelSubmit("form");
                this.$emit("handleEditAvatarChange")
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
        }
      });
    },
  },
  watch: {
    editAvatarModel(value) {
      if (value) {
        this.controlModal = value;
      }
    },
  },
};
</script>
