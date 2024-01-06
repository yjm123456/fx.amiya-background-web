<template>
  <div>
    <Card :dis-hover="true">
      <Button
        type="primary"
        @click="
          controlModal = true;
          title = '添加';
        "
        >添加</Button
      >
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
        :label-width="120"
      >
        <FormItem label="归属小程序" prop="appId">
          <Select v-model="form.appId" placeholder="请选择归属小程序">
            <Option
              v-for="item in params.miniprogramName"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="分类名称" prop="name">
          <Input v-model="form.name" placeholder="请输入分类名称"></Input>
        </FormItem>
        <FormItem label="商品展示方向" prop="showDirectionType">
          <Select
            v-model="form.showDirectionType"
            placeholder="请选择商品展示方向"
          >
            <Option
              v-for="item in exchangeTypes"
              :value="item.showDirectionType"
              :key="item.showDirectionType"
              >{{ item.showDirectionTypeText }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="简码" prop="simpleCode">
          <Input v-model="form.simpleCode" placeholder="请输入简码"></Input>
        </FormItem>
        <FormItem label="类别图片" prop="categoryImg" key="categoryImg">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <FormItem label="是否是热卖分类" prop="isHot">
          <i-switch v-model="form.isHot" />
        </FormItem>
        <FormItem label="是否是品牌分类" prop="isBrand">
          <i-switch v-model="form.isBrand" />
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
import * as api from "@/api/goodsManage";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  props: {
    activeName: String,
    params: Object,
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
      // 商品展示方向
      exchangeTypes: [
        {
          showDirectionType: 2,
          showDirectionTypeText: "加钱购",
        },
      ],
      query: {
        keyword: "",
        categoryId: "",
        valid: null,
        pageNum: 1,
        pageSize: 10,
        showDirection: 2,
        columns: [
          {
            title: "分类名称",
            key: "name",
            tooltip: true,
            minWidth: 150,
            fixed: "left",
            align:'center',
          },
          {
            title: "类别图片",
            key: "categoryImg",
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
                  params.row.categoryImg
                    ? h("img", {
                        style: {
                          width: "50px",
                          height: "50px",
                          margin: "5px 0",
                          verticalAlign: "middle",
                        },
                        attrs: {
                          src: params.row.categoryImg,
                        },
                      })
                    : "",
                ]
              );
            },
          },
          {
            title: "简码",
            key: "simpleCode",
            tooltip: true,
            minWidth: 150,
            align:'center',
          },
          {
            title: "展示方向",
            key: "showDirectionTypeName",
            minWidth: 150,
            align:'center',
          },
          {
            title: "归属小程序",
            key: "miniprogramName",
            tooltip: true,
            minWidth: 150,
            align: "center",
          },
          {
            title: "是否有效",
            key: "valid",
            align:'center',
            minWidth: 150,
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
            title: "是否是热卖分类",
            key: "isHot",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              if (params.row.isHot == true) {
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
            title: "是否是品牌分类",
            key: "isBrand",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              if (params.row.isBrand == true) {
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
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "创建人",
            key: "createName",
            minWidth: 150,
          },
          {
            title: "修改时间",
            key: "updateDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.updateDate
                  ? this.$moment(params.row.updateDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "修改人",
            key: "updateName",
            minWidth: 150,
            align:'center',
          },
          {
            title: "移动方向",
            align: "center",
            width: 260,
            align:'center',
            render: (h, params) => {
              return h("div", [
                h(
                  "i",
                  {
                    class: "iconfont icon-zhiding fs",
                    style: {
                      marginRight: "15px",
                      cursor: "pointer",
                      fontSize: "14px!important",
                      color: "#515a6e",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        let moveState = true;
                        this.topToBottomClass(id, moveState);
                      },
                    },
                  },
                  "置顶"
                ),
                h(
                  "i",
                  {
                    class: "iconfont icon-xiangxiazhidi",
                    style: {
                      marginRight: "15px",
                      cursor: "pointer",
                      fontSize: "14px!important",
                      color: "#515a6e",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        let moveState = false;
                        this.topToBottomClass(id, moveState);
                      },
                    },
                  },
                  "置底"
                ),
                h(
                  "i",
                  {
                    class: "iconfont icon-xiangshang",
                    style: {
                      marginRight: "10px",
                      cursor: "pointer",
                      fontSize: "14px!important",
                      color: "#515a6e",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        let moveState = true;
                        this.moveUpAndDown(id, moveState);
                      },
                    },
                  },
                  "向上"
                ),
                h(
                  "i",
                  {
                    class: "iconfont icon-xiangxia",
                    style: {
                      marginRight: "10px",
                      cursor: "pointer",
                      fontSize: "14px!important",
                      color: "#515a6e",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        let moveState = false;
                        this.moveUpAndDown(id, moveState);
                      },
                    },
                  },
                  "向下"
                ),
              ]);
            },
          },
          {
            title: "操作",
            align: "center",
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
                        api.byIdGetGoodsCategory(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              name,
                              simpleCode,
                              valid,
                              showDirectionType,
                              categoryImg,
                              appId,
                              isBrand,
                              isHot,
                            } = res.data.goodsCategory;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.name = name;
                            this.form.simpleCode = simpleCode;
                            this.form.valid = valid;
                            this.form.appId = appId;
                            this.form.isBrand = isBrand;
                            this.form.isHot = isHot;
                            this.form.showDirectionType = showDirectionType;
                            this.form.categoryImg = categoryImg;
                            this.uploadObj.uploadList = [this.form.categoryImg];
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
                            api.deleteGoodsCategory(id).then((res) => {
                              if (res.code === 0) {
                                this.getGoodsCategoryList();
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
        // 姓名
        name: "",
        // 简码
        simpleCode: "",
        // 展示方向
        showDirectionType: "",
        id: "",
        // 是否有效
        valid: false,
        categoryImg: "",
        // 小程序
        appId: "",
        // 是否为热卖
        isHot: false,
        // 是否是品牌分类
        isBrand: false,
      },

      ruleValidate: {
        categoryImg: [
          {
            required: true,
            message: "请上传类别图片",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入分类名称",
          },
        ],
        simpleCode: [
          {
            required: true,
            message: "请输入简码",
          },
        ],
        showDirectionType: [
          {
            required: true,
            message: "请选择商品展示方向",
          },
        ],
      },
    };
  },
  methods: {
    // 图片
    handleUploadChange(values) {
      this.form.categoryImg = values[0];
    },
    //   置顶/置底
    topToBottomClass(id, moveState) {
      const data = {
        id: id,
        moveState: moveState,
      };
      api.topToBottomClass(data).then((res) => {
        if (res.code === 0) {
          if (moveState == true) {
            this.$Message.success("置顶成功");
          } else {
            this.$Message.success("置底成功");
          }
          this.getGoodsCategoryList();
        }
      });
    },
    // 向上/向下
    moveUpAndDown(id, moveState) {
      const data = {
        id: id,
        moveState: moveState,
      };
      api.moveUpAndDown(data).then((res) => {
        if (res.code === 0) {
          if (moveState == true) {
            this.$Message.success("向上移动成功");
          } else {
            this.$Message.success("向下移动成功");
          }
          this.getGoodsCategoryList();
        }
      });
    },
    // 获取商品展示方向
    getExchangeTypeList() {
      api.getexchangeTypeList().then((res) => {
        if (res.code === 0) {
          const { exchangeTypes } = res.data;
          this.exchangeTypes = exchangeTypes;
        }
      });
    },
    // 获取商品分类列表
    getGoodsCategoryList() {
      const {
        keyword,
        categoryId,
        valid,
        pageNum,
        pageSize,
        showDirection,
      } = this.query;
      const data = {
        keyword,
        categoryId,
        valid,
        pageNum,
        pageSize,
        showDirection,
      };
      api.getGoodsCategoryList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.goodsCategorys;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            name,
            simpleCode,
            id,
            valid,
            showDirectionType,
            categoryImg,
            appId,
            isBrand,
            isHot,
          } = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              simpleCode,
              valid,
              showDirectionType,
              categoryImg,
              appId,
              isBrand,
              isHot,
            };
            api.modifyGoodsCategory(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getGoodsCategoryList();
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
              simpleCode,
              showDirectionType,
              categoryImg,
              appId,
              isBrand,
              isHot,
            };
            api.addGoodsCategory(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getGoodsCategoryList();
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
    // this.getGoodsCategoryList();
    // this.getExchangeTypeList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "overValueExchange") {
          this.getGoodsCategoryList();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
