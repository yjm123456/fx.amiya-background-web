<template>
  <div>
    <Card :dis-hover="true">
      <div class="content">
        <div class="left">
      <Select
          v-model="query.provinceId"
          placeholder="请选择省份"
          filterable
          style="width:200px;margin-right:10px"
        >
          <Option
            v-for="item in provincesList"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <Button
        type="primary"
       @click="getCooperativeHospitalCity()"
        style="margin-right:10px"
        >查询</Button
      >
      </div>

      <!-- <Button
        type="primary"
        @click="
          controlModal = true;
          title = '添加';
        "
        >添加</Button
      > -->
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

    <Modal v-model="controlModal" :title="title" :mask-closable="false" @on-visible-change="handleModalVisibleChange">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      > 
      <FormItem label="序号" prop="sort">
          <Input v-model="form.sort" placeholder="请输入序号" type="number" number disabled></Input>
        </FormItem>
        <FormItem label="城市名称" prop="name">
          <Input v-model="form.name" placeholder="请输入城市名称"></Input>
        </FormItem>
        <FormItem label="省份" prop="provinceId">
          <Select
            v-model="form.provinceId"
            placeholder="请选择省份"
            filterable
          >
            <Option
              v-for="item in provinces"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否热门" prop="isHot">
          <i-switch v-model="form.isHot" />
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
import * as api from "@/api/hospitalManage";
import * as apis from "@/api/baseDataMaintenance";
export default {
  data() {
    return {
      // 查询
      query: {
        provinceId:-1,
        columns: [
          {
            title: "序号",
            key: "sort",
          },
          {
            title: "省份名称",
            key: "provinceName",
          },
          {
            title: "城市名称",
            key: "name",
          },
          {
            title: "是否热门",
            key: "isHot",
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
                        api.byIdCooperativeHospitalCity(id).then((res) => {
                          if (res.code === 0) {
                            const { id, name, valid , provinceId , isHot,provinceName,sort} = res.data.city;
                            this.isEdit = true;
                            this.form.id = id;
                            this.form.name = name;
                            this.form.provinceId = provinceId
                            this.form.provinceName = provinceName
                            this.form.sort = sort
                            this.form.isHot = isHot
                            this.form.valid = valid;
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
                            api
                              .deleteCooperativeHospitalCity(id)
                              .then((res) => {
                                if (res.code === 0) {
                                  this.getCooperativeHospitalCity();
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
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        
      },
      // 省份
        provinces:[],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 城市名称
        name: "",
        // 省份id
        provinceId:"",
        // 是否热门
        isHot:true,
        id: "",
        // 是否有效
        valid: false,
        // 序号
        sort:null
      },

      ruleValidate: {
        sort: [
          {
            required: true,
            message: "请输入序号",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入城市名称",
            trigger: "blur",
          },
        ],
        provinceId: [
          {
            required: true,
            message: "请选择省份",
          },
        ],
      },
    provincesList:[{id:-1,name:'全部省份'}]
    };
  },
  methods: {
    // 获取省份列表（下拉框）
    getProvince(){
      apis.getProvinceSelect().then((res) => {
        if (res.code === 0) {
          const { provinces } = res.data;
          this.provinces = provinces;
          this.provincesList = [...this.provincesList,...provinces];
        }
      });
    },
    // 获取合作医院城市列表
    getCooperativeHospitalCity() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize,provinceId } = this.query;
      const data = {
        pageNum,
        pageSize,
        provinceId:provinceId == -1 ? null :provinceId
      };
      api.getCooperativeHospitalCity(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.city;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取合作医院城市列表（分页）
    handlePageChange(pageNum) {
      const { pageSize,provinceId } = this.query;
      const data = {
        pageNum,
        pageSize,
        provinceId:provinceId == -1 ? null :provinceId
      };
      api.getCooperativeHospitalCity(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.city;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, name, valid , provinceId , isHot,sort} = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              valid,
              provinceId , 
              isHot,
              sort
            };
            api.updateCooperativeHospitalCity(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getCooperativeHospitalCity();
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
              provinceId , 
              isHot,
              sort
            };
            api.addCooperativeHospitalCity(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getCooperativeHospitalCity();
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
  },
  created() {
    this.getCooperativeHospitalCity();
    this.getProvince()
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
.content{
  display: flex;
  justify-content: space-between;
}
</style>
