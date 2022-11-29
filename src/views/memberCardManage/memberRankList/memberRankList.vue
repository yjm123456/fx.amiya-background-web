<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <Button
          type="primary"
          @click="
            controlModal = true;
            title = '添加';
          "
          >添加</Button
        >
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
    </Card>

    <Modal
      v-model="controlModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="本人产生积分比例" prop="generateIntegrationPercent">
          <InputNumber v-model="form.generateIntegrationPercent" style="width:100%;" placeholder="请输入本人产生积分比例"></InputNumber>
        </FormItem>
        <FormItem label="级别代码" prop="rankCode">
          <Input
            v-model="form.rankCode"
            placeholder="请输入级别代码"
            style="width: 100%"
            :disabled="title == '修改'"
          ></Input>
        </FormItem>
        <FormItem label="缩略图" prop="imageUrl" key="imageUrl">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input
            v-model="form.description"
            placeholder="请输入描述"
            type="textarea"
            :autosize="{ minRows: 2 }"
          ></Input>
        </FormItem>
        <FormItem label="是否默认" prop="isDefault">
          <i-switch v-model="form.isDefault" />
        </FormItem>
        <FormItem label="是否有效" prop="valid" v-if="isEdit">
          <i-switch v-model="form.valid" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button
          type="primary"
          @click="handleSubmit('form')"
          :loading="btnLoading"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/memberCardManage";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
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

      // 查询
      query: {
        columns: [
          {
            title: "名称",
            key: "name",
          },
          {
            title: "级别代码",
            key: "rankCode",
          },
          {
            title: "本人产生积分比例",
            key: "generateIntegrationPercent",
          },
          {
            title: "图片",
            key: "imageUrl",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    options: {
                      toolbar: false,
                      title: false,
                      navbar: false,
                    },
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 0",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.imageUrl,
                    },
                  }),
                ]
              );
            },
          },
          {
            title: "描述",
            key: "description",
          },
          {
            title: "是否默认",
            key: "default",
            render: (h, params) => {
              if (params.row.default == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
            {
            title: "是否有效",
            key: "valid",
            width: 200,
            render: (h, params) => {
              if (params.row.valid === true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "操作",
            align: "center",
            width: 100,
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
                        api.getSingleMemberRankInfo(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              name,
                              generateIntegrationPercent,
                              rankCode,
                              imageUrl,
                              description,
                              valid
                            } = res.data.memberRankInfo;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.name = name;
                            this.form.generateIntegrationPercent = generateIntegrationPercent;
                            this.form.rankCode = rankCode;
                            this.form.imageUrl = imageUrl;
                            this.uploadObj.uploadList = [this.form.imageUrl];
                            this.form.description = description;
                            this.form.isDefault = res.data.memberRankInfo.default;
                            this.form.valid = valid;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      btnLoading: false,

      form: {
        // 名称
        name: "",
        // 本人产生积分比例
        generateIntegrationPercent:null,
        // 级别代码
        rankCode: null,
        // 图片url
        imageUrl: "",
        // 描述
        description: "",
        // 是否默认
        isDefault: false,
        // 是否有效
        valid:false,
        id: "",
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入名称",
          },
        ],
        generateIntegrationPercent: [
          {
            required: true,
            message: "请输入本人产生积分比例",
          },
        ],
        rankCode: [
          {
            required: true,
            message: "请输入级别代码",
          },
        ],
        imageUrl: [
          {
            required: true,
            message: "请上传缩略图",
          },
        ],
      },
    };
  },
  methods: {
    // 获取所有会员等级
    getMemberRankInfo() {
      api.getMemberRankInfo().then((res) => {
        if (res.code === 0) {
          this.query.data = res.data.memberRankInfos;
        }
      });
    },
    
    // 图片
    handleUploadChange(values) {
      this.form.imageUrl = values[0];
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          const {
            name,
            generateIntegrationPercent,
            rankCode,
            imageUrl,
            description,
            isDefault,
            valid,
            id,
          } = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              name,
              generateIntegrationPercent,
              rankCode,
              imageUrl,
              description,
              default: isDefault,
              valid,
              id,
            };
            api.updateMemberRankInfo(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.btnLoading = false;
                this.cancelSubmit("form");
                this.getMemberRankInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            // 添加
            const data = {
              name,
              generateIntegrationPercent,
              rankCode,
              imageUrl,
              description,
              default: isDefault,
              valid
            };
            api.addMemberRankInfo(data).then((res) => {
              if (res.code === 0) {
                this.btnLoading = false;
                this.cancelSubmit("form");
                this.getMemberRankInfo();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              }
            });
          }
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getMemberRankInfo();
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
}
.container {
  margin-top: 16px;
}
</style>
