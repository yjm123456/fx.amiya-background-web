<template>
  <div>
    <Upload
      action="//jsonplaceholder.typicode.com/posts/"
      :headers="headers"
      :before-upload="handleUpload"
    >
      <Button icon="ios-cloud-upload-outline" style="width:380px">上传文件</Button>
    </Upload>
    <div v-if="file !== null">{{ file.name }}</div>
  </div>
</template>
<script>
import { baseUrl } from "../../http/baseUrl";
export default {
  data() {
    return {
      file: null,
      loadingStatus: false,
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      url: `${baseUrl}/amiyabg/CustomerHospitalConsume/customerManageInPort`
    };
  },
  methods: {
    handleUpload(file) {
      this.file = file;
      this.$emit("handleUploadFileChange", this.file);
      return false;
    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success("Success");
      }, 1500);
    },
  },
  watch: {},
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
  padding: 0 10px;
  box-sizing: border-box;
}
.uploading {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
