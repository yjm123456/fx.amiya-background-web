<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.name"
            placeholder="请输入礼品名称"
            style="width: 200px"
            @keyup.enter.native="getGiftlist()"
          />
          <Select
            v-model="query.categoryId"
            style="width: 200px; margin-left: 10px"
            placeholder="请选择礼品分类"
            filterable
          >
            <Option
              v-for="item in giftCategoryNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getGiftlist()"
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
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>

    <Modal v-model="controlModal" :title="title" :mask-closable="false">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="礼品分类" prop="categoryId">
          <Select
            v-model="form.categoryId"
            placeholder="请选择礼品分类"
            filterable
          >
            <Option
              v-for="item in giftCategoryNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="缩略图" prop="thumbPicUrl">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <FormItem label="数量" prop="quantity">
          <InputNumber
            :min="1"
            v-model="form.quantity"
            style="width:100%"
            placeholder="请输入数量"
          ></InputNumber>
        </FormItem>
        <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
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
import * as api from "@/api/giftManage";
import * as giftCategoryApi from "@/api/giftCategory";
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
        categoryId:'',
        name: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "名称",
            key: "name",
          },
          {
            title: "礼品分类",
            key: "categoryName",
          },
          {
            title: "缩略图",
            key: "thumbPicUrl",
            align: "center",
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.thumbPicUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "库存",
            key: "quantity",
          },
          {
            title: "是否有效",
            key: "valid",
            render: (h, params) => {
              if (params.row.valid == true) {
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
            title: "创建时间",
            key: "createDate",
            render: (h, params) => {
              return h("div",this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "创建人",
            key: "createName",
          },
          {
            title: "修改时间",
            key: "updateDate",
            render: (h, params) => {
              return h("div",params.row.updateDate ? this.$moment(params.row.updateDate).format("YYYY-MM-DD HH:mm:ss") : '');
            },
          },
          {
            title: "修改人",
            key: "updateName",
            width: 150,
          },
          {
            title: "操作",
            width: 150,
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
                        api.byIdGetGiftInfo(id).then((res) => {
                          if (res.code === 0) {
                            const { ...data } = res.data.giftInfo;
                            this.isEdit = true;
                            this.form = data;
                            this.uploadObj.uploadList = [data.thumbPicUrl];
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
                            api.deleteGift(id).then((res) => {
                              if (res.code === 0) {
                                this.getGiftlist();
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
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id: "",
        // 姓名
        name: "",
        // 缩略图
        thumbPicUrl: "",
        // 数量
        quantity: null,
        // 是否有效
        valid: false,
        // 礼品分类
        categoryId:''
      },

      ruleValidate: {
        categoryId: [
          {
            required: true,
            message: "请选择礼品分类",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        thumbPicUrl: [
          {
            required: true,
            message: "请上传缩略图",
          },
        ],
        quantity: [
          {
            required: true,
            message: "请输入数量",
          },
          {
            message: "只能输入整数",
            trigger: "change",
            pattern: /^\d+$/,
          },
          {
            message: "只能输入整数",
            trigger: "blur",
            pattern: /^\d+$/,
          },
        ],
      },
      // 礼品分类
      giftCategoryNameList:[]
    };
  },
  methods: {
    // 获取礼品分类（下拉框）
    getGiftCategoryNameList() {
      giftCategoryApi.getGiftCategoryNameList().then((res) => {
        if (res.code === 0) {
          this.giftCategoryNameList= res.data.nameList;
        }
      });
    },
    // 获取礼品列表
    getGiftlist() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { name, pageNum, pageSize ,categoryId} = this.query;
      const data = { name, pageNum, pageSize,categoryId };
      api.getGiftlist(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.giftInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取礼品列表（分页）
    handlePageChange(pageNum) {
      const { name, pageSize ,categoryId} = this.query;
      const data = { name, pageNum, pageSize ,categoryId};
      api.getGiftlist(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.giftInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 图片
    handleUploadChange(values) {
      this.form.thumbPicUrl = values[0];
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, name, thumbPicUrl, quantity, valid,categoryId } = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              thumbPicUrl,
              quantity,
              valid,
              categoryId
            };
            api.editGift(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getGiftlist();
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
              thumbPicUrl,
              quantity,
              categoryId
            };
            api.addGift(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getGiftlist();
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
      this.controlModal = false;
      this.isEdit = false;
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },
  },
  created() {
    this.getGiftlist();
    this.getGiftCategoryNameList()
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
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
