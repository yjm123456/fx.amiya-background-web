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
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('importFileForm')">取消</Button>
        <Button type="primary" @click="handleSubmit('importFileForm')"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/GreatHospitalOperationHealth";
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
      control: false,
      importFileForm: {
        file: "",
      },

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
      this.importFileForm.file = values;
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
            this.$Message.error("请上传文件");
          } else {
            //创建 formData 对象
            let formData = new FormData();
            //多个文件上传
            formData.append("file", file);
            if (this.title == "本机构网咨运营数据分析") {
              api
                .hospitalNetWorkConsulationOperationDataInPort(formData)
                .then((res) => {
                  if (res.code === 0) {
                    this.handleCancel("importFileForm");
                    this.$emit("handleRefreshCustomerTrackList");
                    this.$Message.success({
                      content: "导入成功",
                      duration: 3,
                    });
                  } else {
                    this.$Message.warning({
                      content:
                        "请另外新建一个excel文件 .xlsx 后将填写好的数据复制到新文件中上传，勿采用当前导出文件进行上传！",
                      duration: 5,
                    });
                  }
                });
            }else if (this.title == "本机构咨询师运营数据分析") {
              api
                .hospitalConsulationOperationDataInPort(formData)
                .then((res) => {
                  if (res.code === 0) {
                    this.handleCancel("importFileForm");
                    this.$emit("handleRefreshCustomerTrackList");
                    this.$Message.success({
                      content: "导入成功",
                      duration: 3,
                    });
                  } else {
                    this.$Message.warning({
                      content:
                        "请另外新建一个excel文件 .xlsx 后将填写好的数据复制到新文件中上传，勿采用当前导出文件进行上传！",
                      duration: 5,
                    });
                  }
                });
            }else if (this.title == "本机构医生运营数据分析") {
              api
                .hospitalDoctorOperationDataInPort(formData)
                .then((res) => {
                  if (res.code === 0) {
                    this.handleCancel("importFileForm");
                    this.$emit("handleRefreshCustomerTrackList");
                    this.$Message.success({
                      content: "导入成功",
                      duration: 3,
                    });
                  } else {
                    this.$Message.warning({
                      content:
                        "请另外新建一个excel文件 .xlsx 后将填写好的数据复制到新文件中上传，勿采用当前导出文件进行上传！",
                      duration: 5,
                    });
                  }
                });
            }else if (this.title == "本机构成交品相数据分析") {
              api
                .hospitalDealItemOperationDataInPort(formData)
                .then((res) => {
                  if (res.code === 0) {
                    this.handleCancel("importFileForm");
                    this.$emit("handleRefreshCustomerTrackList");
                    this.$Message.success({
                      content: "导入成功",
                      duration: 3,
                    });
                  } else {
                    this.$Message.warning({
                      content:
                        "请另外新建一个excel文件 .xlsx 后将填写好的数据复制到新文件中上传，勿采用当前导出文件进行上传！",
                      duration: 5,
                    });
                  }
                });
            }
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
