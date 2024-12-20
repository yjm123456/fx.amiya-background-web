<template>
  <div class="content">
    <Modal
      title="编辑截图"
      footer-hide
      v-model="editImgModels"
      width="30%"
      :closable="false"
      @click="handleModalVisibleChange"

    >
    <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="截图" prop="dealPicture" key="dealPicture">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
    </Form>
      <div class="footer" >
          <Button @click="cancel('form')" style="margin-right: 10px" >取消</Button>
          <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as orderApi from "@/api/orderManage";
import upload from "@/components/upload/upload";

export default {
  components:{
      upload
  },
  props: {
    editImgModel: Boolean,
    editImgParams:Object,
  },
  data() {
    return {
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      editImgModels:false,
      form:{
          dealPicture:'',
      },
      ruleValidate: {
        dealPicture: [
          {
            required: true,
            message: "请上传截图",
          },
        ],
      },
     
    };
  },
  methods: {
    // 图片
    handleUploadChange(values) {
      this.form.dealPicture = values[0];
    },
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
            if(valid){
              const {dealPicture} = this.form
              const data = {
                id:this.editImgParams.dealId,
                dealPicture
              }
              orderApi.updateDealPicture(data).then((res) => {
                  if(res.code == 0){
                      this.$Message.success('编辑成功')
                      this.cancel('form')
                    //   this.$emit('getContentPlatFormOrderDealInfo')
                    this.$parent.handlePageChange(this.$parent.$refs.pages.currentPage)
                  }
              })
            }
        })
       
      },
    // 取消
    cancel(name) {
      this.$refs[name].resetFields();
      this.uploadObj.uploadList = [];
      this.$emit("update:editImgModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel('form');
        this.$emit("update:editImgModel", false);
      }
        
    },
  },
  watch: {
    editImgModel: {
      handler(editImgModel) {
        this.editImgModels = editImgModel
        this.form.dealId = this.editImgParams.dealId
        this.form.dealPrice = this.editImgParams.dealPrice
        
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
.h3{
  font-weight: bold;
  color: #000;
}
</style>
