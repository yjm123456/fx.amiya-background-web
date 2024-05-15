<template>
  <div>
    <Modal
      v-model="control"
      title="导入"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="importFileForm"
        :model="importFileForm"
        :rules="importFileRuleValidates"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="上传文件">
          <importFiles
            @handleUploadFileChange="handleUploadFileChange"
            ref="importFiles"
          />
        </FormItem>
        <div v-if="loading == true" style="color:red;text-align:center">数据正在上传中，请耐心等待......</div>
        <Spin fix v-if="flag == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('importFileForm')">取消</Button>
        <Button type="primary" @click="handleSubmit('importFileForm')" v-if="loading == true" :loading="loading == true">Loading...</Button>
        <Button type="primary" @click="handleSubmit('importFileForm')" v-else >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/shoppingCartRegistration";
import importFiles from "@/components/upload/importFiles.vue";
export default {
  components: {
    importFiles,
  },
  props: {
    importControlModal: Boolean,
    title: String,
  },
  data() {
    return {
      flag:false,
      control: false,
      importFileForm: {
        file: "",
      },
      loading:false,

      importFileRuleValidates: {
        file: [
          {
            required: true,
            message: "请上传文件",
          },
        ],
      },
    };
  },
  methods: {
    // 上传文件
    handleUploadFileChange(values, uploadListName) {
      this.loading = true
      this.importFileForm.file = values;
      setTimeout(()=>{
        this.loading = false
      },10000)
    },
    //
    submite(value) {
      this.importFile = value.name;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { file } = this.importFileForm;
          if (!file) {
            this.$Message.warning("请上传文件");
          } else {
            //创建 formData 对象
            let formData = new FormData();
            //多个文件上传
            formData.append("file", file);
            this.flag=true
            api.importTikTokAndVideoToShoppingCartRegistionData(formData).then((res) => {
              if (res.code === 0) {
                this.flag = false
                this.handleCancel("importFileForm");
                  this.$emit("handleRefreshCustomerTrackList");
                  this.$Message.success({
                    content: "导入成功",
                    duration: 3,
                  });
                  this.importFileForm.file = "";
                // setTimeout(()=>{
                //   this.handleCancel("importFileForm");
                //   this.$emit("handleRefreshCustomerTrackList");
                //   this.$Message.success({
                //     content: "导入成功",
                //     duration: 3,
                //   });
                //   this.importFileForm.file = "";
                  
                // },15000)
              } else{
                setTimeout(()=>{
                  this.flag = false
                },3000)
              }
            });
          }
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:importControlModal", false);
      this.$refs[name].resetFields();
      this.$refs.importFiles.file = {};
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("importFileForm");
        this.$refs.importFiles.file = {};
      }
    },
  },
  watch: {
    importControlModal(value) {
      this.control = value;
    },
  },
};
</script>
<style scoped>
.loading_color{
  color: red;
  text-align: center;
}
</style>