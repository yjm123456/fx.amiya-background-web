<template>
  <div>
    <Upload
      :headers="headers"
      ref="upload"
      name="uploadfile"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['pdf']"
      :max-size="10000"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :on-progress="handleProgress"
      :multiple="uploadObj.multiple"
      :disabled="showProgress"
      type="drag"
      :action="uploadUrl + '/fxopenoss/aliyunoss/uploadone'"
    >
        <Button icon="ios-cloud-upload-outline" style="width:100%" v-show="showProgress === false">上传文件</Button>
        <span v-show="showProgress === true" class="uploading">上传中</span>
    </Upload>
    <div
      class="demo-upload-list"
      v-for="(item, index) in uploadListName"
      :key="index"
    >
      <div>{{item}}</div>
      <div class="demo-upload-list-cover">
        <Icon
          type="ios-close"
          @click.native="handleRemove(item, index)"
        ></Icon>
      </div>
    </div>
  </div>
</template>
<script>
import {uploadUrl} from "./../../http/baseUrl";
export default {
  props: {
    uploadObj: {
      type: Object,
      default: function () {
        return {
          // 是否开启多图
          multiple: false,
          // 图片个数
          length: 1,
          // 文件地址
          uploadList: [],
          // 文件名称
          uploadListName:[]
        };
      },
    },
  },
  data() {
    return {
      uploadList: [],
      uploadListName:[],
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },

      // 上传中
      showProgress: false,

      uploadUrl
    };
  },
  methods: {
    handleRemove(file, index) {
      this.uploadList.splice(index, 1);
      this.uploadListName.splice(index, 1);
      this.$emit("uploadChange", this.uploadList,this.uploadListName);
    },
    handleSuccess(res, file) {
      this.showProgress = false;
      this.uploadList.push(res.data.url);
      this.uploadListName.push(file.name)
      this.$emit("uploadChange", this.uploadList,this.uploadListName);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式只能上传pdf格式",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "只能上传10M以内的文件",
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < this.uploadObj.length;
      if (!check) {
        this.$Notice.warning({
          title: `只能上传1个文件`,
        });
      }
      return check;
    },
    // 正在上传
    handleProgress() {
      this.showProgress = true;
    },
  },
  watch: {
    "uploadObj.uploadList"(val) {
      this.uploadListName = val;
    },
  },
};
</script>
<style scoped>
.ivu-upload-drag {
  border: navajowhite !important;
}
.demo-upload-list {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); */
  margin-top: 4px;
  padding-left: 10px;
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
/* .demo-upload-list div{
      overflow: hidden;
      white-space: normal;
      word-break: break-all;
} */
/* .demo-upload-list img {
  width: 100%;
  height: 100%;
} */
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 27px;
  cursor: pointer;
  margin: 0 350px;
  padding:0 10px;
  box-sizing: border-box;
}
.uploading {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
