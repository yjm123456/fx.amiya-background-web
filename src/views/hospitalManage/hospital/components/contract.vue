<template>
  <div class="content">
    <Modal
      title="合同"
      footer-hide
      v-model="contractModels"
      width="70%"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Button type="primary" @click="controlModels = true">添加</Button>
      <Table
        border
        :columns="query.columns"
        :data="query.data"
        style="margin:10px 0"
      ></Table>
      <div class="footer">
        <Button @click="cancel" style="margin-right: 10px">取消</Button>
        <!-- <Button type="primary" @click="submit('form')">确定</Button> -->
      </div>
    </Modal>
    <!-- 添加编辑 -->
    <Modal
      :title="title"
      footer-hide
      v-model="controlModels"
      width="29%"
      :mask-closable="false"
      @on-visible-change="handleModal"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="120"
      >
        <FormItem label="合同名称" prop="name">
          <Input v-model="form.name" placeholder="请输入合同名称" />
        </FormItem>
        <FormItem label="上传合同" prop="contractUrl">
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
        <FormItem label="合同生效时间" prop="startDate">
          <DatePicker
            type="date"
            placeholder="选择合同生效时间"
            :value="form.startDate"
            v-model="form.startDate"
            style="width:100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="合同过期时间" prop="expireDate">
          <DatePicker
            type="date"
            placeholder="选择合同过期时间"
            :value="form.expireDate"
            v-model="form.expireDate"
            style="width:100%"
          ></DatePicker>
        </FormItem>
        <Spin fix v-if="flag == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>

      <div class="footer">
        <Button @click="handleCancel('form')" style="margin-right: 10px"
          >取消</Button
        >
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
import uploadFile from "@/components/upload/uploadFile";

export default {
  components: {
    uploadFile,
  },
  props: {
    contractModel: Boolean,
    contractParams: Object,
  },
  data() {
    return {
      // 接收model值
      contractModels: false,
      query: {
        columns: [
          {
            title: "名称",
            key: "name",
            minWidth: 200,
            align: "center",
            tooltip: true,
          },
          {
            title: "合同地址",
            key: "contractUrl",
            align: "center",
            minWidth: 350,
            render: (h, params) => {
              return h("div", [
                h(
                  "div",
                  {
                    props: {
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                      cursor: "pointer",
                    },
                    on: {
                      click: () => {
                        window.open(params.row.contractUrl);
                      },
                    },
                  },
                  params.row.contractUrl
                ),
              ]);
            },
          },
          {
            title: "新诊佣金比例(%)",
            key: "newCustomerCommissionRatio",
            minWidth: 150,
            align:'center'
          },
          {
            title: "复诊佣金比例(%)",
            key: "oldCustomerCommissionRatio",
            minWidth: 150,
            align:'center'
          },
          {
            title: "合同生效时间",
            key: "startDate",
            minWidth: 120,
            align: "center",
            tooltip: true,
            render: (h, params) => {
              return h(
                "div",
                params.row.startDate
                  ? this.$moment(params.row.startDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "合同过期时间",
            key: "expireDate",
            minWidth: 120,
            align: "center",
            tooltip: true,
            render: (h, params) => {
              return h(
                "div",
                params.row.expireDate
                  ? this.$moment(params.row.expireDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          
          
          {
            title: "操作",
            key: "",
            minWidth: 150,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        const data = {
                          contractId: id,
                        };
                        api.getInfoByContractId(data).then((res) => {
                          if (res.code === 0) {
                            this.controlModels = true;
                            const {
                              contractUrl,
                              expireDate,
                              id,
                              name,
                              startDate,
                            } = res.data.contractInfo;
                            this.form.id = id;
                            this.form.name = name;
                            this.isEdit = true;
                            // this.uploadFileName = this.form.contractUrl;
                            // this.uploadFileObj.uploadList = [this.form.contractUrl];
                            this.form.contractUrl = contractUrl;
                            this.uploadFileName = contractUrl;
                            this.uploadFileObj.uploadList = [
                              this.form.contractUrl,
                            ];
                            this.form.expireDate = this.$moment(
                              new Date(expireDate)
                            ).format("YYYY-MM-DD");
                            this.form.startDate = this.$moment(
                              new Date(startDate)
                            ).format("YYYY-MM-DD");
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            const data = {
                              id,
                            };
                            api.deleteById(data).then((res) => {
                              if (res.code === 0) {
                                this.getContractList();
                                this.$Message.success({
                                  content: "删除成功",
                                  duration: 3,
                                });
                              }
                            });
                          },
                          onCancel: () => {},
                        });
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
        ],
        data: [],
      },
      // 添加/编辑弹窗
      controlModels: false,
      // 加载中
      flag: false,
      title: "添加",
      form: {
        // 合同名称
        name: "",
        // 合同地址
        contractUrl: "",
        // 合同生效时间
        startDate: "",
        // 合同过期时间
        expireDate: "",
        id: "",
      },
      isEdit: false,
      ruleValidates: {
        name: [
          {
            required: true,
            message: "请输入合同名称",
          },
        ],
        contractUrl: [
          {
            required: true,
            message: "请输入合同地址",
          },
        ],
        startDate: [
          {
            required: true,
            message: "请输入合同生效时间",
          },
        ],
        expireDate: [
          {
            required: true,
            message: "请输入合同过期时间",
          },
        ],
      },
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
    };
  },
  methods: {
    // PDF转换地址
    jumpHtml() {
      window.open("https://smallpdf.com/cn/word-to-pdf");
    },
    // 上传文件
    handleUploadFileChange(values, uploadListName) {
      this.form.contractUrl = values[0];
      this.uploadFileName = uploadListName;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.title == '修改') {
            const { name, contractUrl, startDate, expireDate, id } = this.form;
            const data = {
              hospitalId: this.contractParams.id,
              name,
              contractUrl: contractUrl,
              startDate: this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
              expireDate: this.$moment(new Date(expireDate)).format(
                "YYYY-MM-DD"
              ),
              id,
            };
            this.flag = true
            // 修改
            api.UpdateContract(data).then((res) => {
              if (res.code == 0) {
                this.flag = false
                this.controlModels = false;
                this.handleCancel("form");
                this.getContractList();
              }else {
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }
            });
          } else {
            const { name, contractUrl, startDate, expireDate } = this.form;
            const data = {
              hospitalId: this.contractParams.id,
              name,
              contractUrl: contractUrl,
              startDate: this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
              expireDate: this.$moment(new Date(expireDate)).format(
                "YYYY-MM-DD"
              ),
            };
            this.flag = true
            // 添加
            api.addContract(data).then((res) => {
              if (res.code == 0) {
                this.flag = false
                this.handleCancel("form");
                this.getContractList();
              }else {
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }
            });
          }
        }
      });
    },
    // 取消
    handleCancel(name) {
      this.controlModels = false;
      this.$refs[name].resetFields();
      this.uploadFileObj.uploadList = [];
      this.$refs.uploadFile.uploadListName = [];
      this.$refs.uploadFile.uploadList = [];
      this.uploadFileName = [];
      this.title = '添加'
    },
    handleModal(value) {
      if (!value) {
        this.controlModels = false;
        this.$refs["form"].resetFields();
        this.uploadFileObj.uploadList = [];
        this.$refs.uploadFile.uploadListName = [];
        this.$refs.uploadFile.uploadList = [];
        this.uploadFileName = [];
        this.title = '添加'
      }
    },
    // 取消
    cancel(name) {
      this.$emit("update:contractModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:contractModel", false);
      }
    },

    // 获取合同列表
    getContractList() {
      const data = {
        hospitalId: this.contractParams.id,
      };
      api.getContractList(data).then((res) => {
        if (res.code === 0) {
          this.query.data = res.data.contractList.map(item=>{
            return {
              newCustomerCommissionRatio:this.contractParams.newCustomerCommissionRatio,
              oldCustomerCommissionRatio:this.contractParams.oldCustomerCommissionRatio,
              ...item,

            }
          })
        }
      });
    },
  },
  watch: {
    contractModel: {
      handler(contractModel) {
        this.contractModels = contractModel;
        if (contractModel == true) {
          this.getContractList();
        }
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
.img,
.img_o {
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.no_date {
  text-align: center;
}
.img_cons {
  display: flex;
  flex-wrap: wrap;
}
</style>
