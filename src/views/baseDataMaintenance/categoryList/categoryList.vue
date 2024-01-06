<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getSupplierCategory()"
          />
          <!-- <Select v-model="query.brandId" style="width: 200px; margin-left: 10px">
            <Option
              v-for="item in supplierBrandListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select> -->
          <Select v-model="query.valid" style="width: 200px; margin-left: 10px">
            <Option
              v-for="item in validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getSupplierCategory()"
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
        :label-width="80"
      >
        <!-- <FormItem label="品牌" prop="brandId">
          <Select v-model="form.brandId" placeholder="请选择品牌">
            <Option
              v-for="item in supplierBrandList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem> -->
        <FormItem label="品类" prop="categoryName">
          <Input v-model="form.categoryName" placeholder="请输入品类名称"></Input>
        </FormItem>
        <!-- <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/supplierCategory";
import * as supplierBrandApi from "@/api/supplierBrand";
export default {
  data() {
    return {
      // 查询
      query: {
        // brandId:-1,
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        valid: "true",
        columns: [
          {
            title: "品类",
            key: "categoryName",
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
                        api.byIdSupplierCategory(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              // brandId,
                              categoryName,
                              id,
                            } = res.data.supplierCategoryInfo;
                            this.isEdit = true;
                            // this.form.brandId = brandId;
                            this.form.categoryName = categoryName;
                            this.form.id = id;
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
                            api.deleteSupplierCategory(id).then((res) => {
                              if (res.code === 0) {
                                this.getSupplierCategory();
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
        // 品牌
        // brandId: "",
        // 品类
        categoryName:'',
        id: "",
      },

      ruleValidate: {
        // brandId: [
        //   {
        //     required: true,
        //     message: "请选择品牌",
        //   },
        // ],
        categoryName: [
          {
            required: true,
            message: "请输入品类",
          },
        ],
      },
      validList: [
        { type: "true", name: "有效" },
        { type: "false", name: "无效" },
      ],
    //   品牌
    supplierBrandList:[],
    supplierBrandListAll:[{id:-1,name:'全部品牌'}]
    };
  },
  methods: {
    // 获取品牌（下拉框）
    getsupplierBrand(){
        supplierBrandApi.getSupplierBrandList().then(res=>{
            if(res.code === 0){
                const {supplierBrandList} = res.data
                this.supplierBrandList = supplierBrandList
                this.supplierBrandListAll = [...this.supplierBrandListAll,...supplierBrandList]
            }
        })
    },
    // 获取供应商品牌品类列表
    getSupplierCategory() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyWord, valid } = this.query;
      const data = { pageNum, pageSize, keyWord, valid };
      api.getSupplierCategory(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.supplierCategoryInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取供应商品牌品类列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyWord, valid } = this.query;
      const data = { pageNum, pageSize, keyWord, valid  };
      api.getSupplierCategory(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.supplierCategoryInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            api.updateSupplierCategory(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getSupplierCategory();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { categoryName  } = this.form;
            const data = { categoryName  };
            // 添加
            api.addSupplierCategory(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getSupplierCategory();
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
    this.getSupplierCategory();
    this.getsupplierBrand()
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
