<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入名称查询"
            style="width: 200px"
            @keyup.enter.native="getAmiyaEmployeeList()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAmiyaEmployeeList()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
          >
        </div>
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
        :label-width="110"
      >
        <FormItem label="缩略图" prop="picUrl">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <FormItem label="显示位置" prop="displayIndex" v-if="isEdit === true">
          <Input v-model="form.displayIndex" placeholder="请输入职称"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/carouselManage";
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
            title: "轮播图",
            key: "picUrl",
            align: "center",
            render: (h, params) => {
              return h("viewer", {
                props:{
                  zoomable: false,
                }
              }, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.picUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "创建日期",
            key: "createDate",
            render: (h, params) => {
              params.row.createDate = params.row.createDate
                ? params.row.createDate.substr(0, 10)
                : "";
              return h(
                "div",
                {
                  props: {},
                },
                params.row.createDate
              );
            },
          },
          {
            title: "操作",
            key: "",
            width: 150,
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
                        api.byIdGetCarouselImage(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            const {
                              createDate,
                              ...data
                            } = res.data.carouselImageInfo;
                            this.form = data;
                            this.uploadObj.uploadList = [data.picUrl];
                            this.controlModal = true;
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
                            api.deleteCarouselImage(id).then((res) => {
                              if (res.code === 0) {
                                this.getCarouselImage();
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

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 缩略图
        picUrl: "",
        id: "",
        displayIndex: "",
      },

      ruleValidate: {
        picUrl: [
          {
            required: true,
            message: "请上传缩略图",
          },
        ],
        displayIndex: [
          {
            required: true,
            message: "请输入显示位置",
          },
        ],
      },
    };
  },
  methods: {
    // 获取轮播图列表
    getCarouselImage() {
      api.CarouselImage().then((res) => {
        if (res.code === 0) {
          const { carouselImageList } = res.data;
          this.query.data = carouselImageList;
        }
      });
    },

    // 图片
    handleUploadChange(values) {
      this.form.picUrl = values[0];
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            api.updateCarouselImage(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getCarouselImage();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            // 添加
            const { id, displayIndex, ...data } = this.form;
            this.$refs[name].validate((valid) => {
              if (valid) {
                api.addCarouselImage(data).then((res) => {
                  if (res.code === 0) {
                    this.cancelSubmit("form");
                    this.getCarouselImage();
                    this.$Message.success({
                      content: "添加成功",
                      duration: 3,
                    });
                  }
                });
              }
            });
          }
        }
      });
    },

    // 取消
    cancelSubmit(name) {
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
    this.getCarouselImage();
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
</style>
