<template>
  <div>
    <div
      class="demo-upload-list"
      v-for="(item, index) in uploadList"
      :key="index"
    >
      <video :src="item" style="width:58px;height:58px"></video>
      <div class="demo-upload-list-cover">
        <Icon
          type="ios-trash-outline"
          @click.native="handleRemove(item, index)"
        ></Icon>
      </div>
    </div>
    <Upload
      :headers="headers"
      ref="upload"
      name="uploadfile"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['mp4','avi']"
      :max-size="10000"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :on-progress="handleProgress"
      :multiple="uploadObj.multiple"
      :disabled="showProgress"
      type="drag"
      :action="uploadUrl + '/fxopenoss/aliyunoss/uploadone'"
      style="display: inline-block; width: 58px"
    >
      <div style="width: 58px; height: 58px; line-height: 58px">
        <Icon
          type="ios-camera"
          size="20"
          v-show="showProgress === false"
        ></Icon>
        <span v-show="showProgress === true" class="uploading">上传中</span>
      </div>
    </Upload>
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
          // 回显图片
          uploadList: [],
        };
      },
    },
  },
  data() {
    return {
      uploadList: [],

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
      this.$emit("uploadChange", this.uploadList);
    },
    handleSuccess(res, file) {
      this.showProgress = false;
      this.uploadList.push(res.data.url);
      this.$emit("uploadChange", this.uploadList);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "视频格式不正确",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "只能上传10M以内的视频",
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < this.uploadObj.length;
      if (!check) {
        this.$Notice.warning({
          title: `只能上传1个视频`,
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
      this.uploadList = val;
    },
  },
};
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 58px;
  height: 58px;
  text-align: center;
  line-height: 58px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.uploading {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
