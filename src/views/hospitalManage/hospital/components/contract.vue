<template>
  <div class="content">
    <Modal
      title="合同"
      footer-hide
      v-model="contractModels"
      width="42%"
      :closable="false"
      @click="handleModalVisibleChange"

    >
    <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="120"
      >
      <FormItem label="修改合同" prop="contractUrl">
              <uploadFile
                :uploadObj="uploadFileObj"
                @uploadChange="handleUploadFileChange"
                ref="uploadFile"
              />
              <div style="color:red;margin-right:5px">
                *注：该文件只支持pdf格式<span
                  style="margin-left:10px;color:#2d8cf0;cursor: pointer;"
                  @click="jumpHtml"
                  >请点击进入在线转换地址</span
                >
              </div>
            </FormItem>
            <Button type="primary" @click="lookContract">查看合同</Button>
      </Form>
      <div class="footer" >
          <Button @click="cancel" style="margin-right: 10px" >取消</Button>
          <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";

import uploadFile from "@/components/upload/uploadFile";

export default {
  components:{
      uploadFile
  },
  props: {
    contractModel: Boolean,
    contractParams:Object
  },
  data() {
    return {
      contractModels:false,
      // 上传文件
      uploadFileObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
        // 文件名称
        uploadListName: [],
      },
      // 接收子组件的文件名称
      uploadFileName: [],
      form:{
        contractUrl:''
      },
      ruleValidate:{
         contractUrl: [
          {
            required: true,
            message: "请上传修改合同",
          },
        ],
      }
    };
  },
  methods: {
    // 查看原合同
    lookContract(){
        api.byIdGetHospitalInfo(this.contractParams.id).then((res) => {
            if (res.code === 0) {
            if (res.data.hospitalInfo.contractUrl) {
                window.open(res.data.hospitalInfo.contractUrl);
            } else {
                this.$Message.error("暂无上传合同");
            }
            }
        });
    },
    // 上传文件
    handleUploadFileChange(values, uploadListName) {
      this.form.contractUrl = values[0];
      this.uploadFileName = uploadListName;
    },
    // PDF转换地址
    jumpHtml() {
      window.open("https://smallpdf.com/cn/word-to-pdf");
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            const data = {
                hospitalId:this.contractParams.id,
                contractUrl:this.form.contractUrl
            }
          // 修改
            api.UpdateContractUrl(data).then((res) => {
              if (res.code === 0) {
                this.cancel();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              } 
            });
        }
      });
    },
    // 取消
    cancel(name) {
      this.$emit("update:contractModel", false);
      this.$refs.uploadFile.uploadListName = [];
      this.$refs.uploadFile.uploadList = [];
      this.uploadFileName = [];
      this.form.contractUrl = ''
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:contractModel", false);
      }
        
    },
  },
  watch: {
    contractModel: {
      handler(contractModel) {
        this.contractModels = contractModel
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
.img,.img_o{
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.no_date{
  text-align: center;
}
.img_cons{
  display: flex;
  flex-wrap: wrap;
}
</style>
