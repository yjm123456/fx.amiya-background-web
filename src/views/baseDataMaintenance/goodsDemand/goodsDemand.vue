<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入项目名称"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getAmiyaGoodsDemandList()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAmiyaGoodsDemandList()"
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
        :label-width="110"
      >
        <FormItem label="科室" prop="hospitalDepartmentId">
          <Select v-model="form.hospitalDepartmentId" placeholder="请选择科室">
            <Option
              v-for="item in AmiyaHospitalDepartmentList"
              :value="item.id"
              :key="item.id"
              >{{ item.departmentName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="项目名称" prop="projectNname">
          <Input v-model="form.projectNname" placeholder="请输入项目名称"></Input>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="form.description" placeholder="请输入描述"></Input>
        </FormItem>
        <FormItem label="缩略图" prop="thumbPictureUrl" key="thumbPictureUrl">
          <upload :uploadObj="thumbPicUrlUploadObj" @uploadChange="handleThumbPicUrlUploadChange" />
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
import * as api from "@/api/baseDataMaintenance";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  data() {
    return {
      thumbPicUrlUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 获取科室列表（下拉框）
      AmiyaHospitalDepartmentList:[],
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "项目名称",
            key: "projectNname",
          },
          {
            title: "科室",
            key: "hospitalDepartmentName",
          },
          {
            title: "图片",
            key: "thumbPictureUrl",
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
                      src: params.row.thumbPictureUrl,
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
                        api.byIdAmiyaGoodsDemand(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            const {
                              valid,
                              hospitalDepartmentId,
                              // 商品需求名称
                              projectNname,
                              // 描述
                              description,
                              // 缩略图
                              thumbPictureUrl,
                              id
                            } = res.data.amiyaGoodsDemandInfo;
                            this.form.hospitalDepartmentId = hospitalDepartmentId;
                            this.form.projectNname = projectNname;
                            this.form.description = description;
                            this.form.thumbPictureUrl = thumbPictureUrl;
                            this.form.id = id;
                            this.form.valid = valid;
                            this.thumbPicUrlUploadObj.uploadList = [this.form.thumbPictureUrl];
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
                            api.deleteAmiyaGoodsDemand(id).then((res) => {
                              if (res.code === 0) {
                                this.getAmiyaGoodsDemandList();
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
        // 科室
        hospitalDepartmentId:"",
        // 商品需求名称
        projectNname: "",
        // 描述
        description: "",
        // 是否有效
        valid: false,
        // 缩略图
        thumbPictureUrl:""
      },

      ruleValidate: {
        projectNname: [
          {
            required: true,
            message: "请输入项目名称",
          },
        ],
        hospitalDepartmentId: [
          {
            required: true,
            message: "请选择科室",
          },
        ],
        thumbPictureUrl: [
          {
            required: true,
            message: "请上传图片",
          },
        ]
        
      },
    };
  },
  methods: {
    // 缩略图
    handleThumbPicUrlUploadChange(values) {
      this.form.thumbPictureUrl = values[0];
    },
    // 获取医院科室
    getgetAmiyaHospitalDepartmentList(){
      const {hospitalDepartmentId } = this.form
      const data = {
        hospitalDepartmentId
      }
      api.getgetAmiyaHospitalDepartmentList(data).then((res) => {
        if(res.code === 0){
          const {AmiyaHospitalDepartmentList} = res.data
          this.AmiyaHospitalDepartmentList = AmiyaHospitalDepartmentList
        }
      })
    },
    // 获取商品需求列表
    getAmiyaGoodsDemandList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword} = this.query;
      const data = { pageNum, pageSize ,keyword };
      api.getAmiyaGoodsDemandList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.amiyaGoodsDemandInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取商品需求列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword} = this.query;
        const data = { pageNum, pageSize ,keyword };
        api.getAmiyaGoodsDemandList(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.amiyaGoodsDemandInfo;
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
            api.editAmiyaGoodsDemand(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getAmiyaGoodsDemandList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { projectNname, valid, hospitalDepartmentId , description , thumbPictureUrl} = this.form;
            const  data = { 
              projectName : projectNname ,
              valid,
              hospitalDepartmentId , 
              description,
              thumbPictureUrl
              } 
            // 添加
            api.AddAmiyaGoodsDemand(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getAmiyaGoodsDemandList();
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
      this.thumbPicUrlUploadObj.uploadList = [];
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
    this.getAmiyaGoodsDemandList();
    this.getgetAmiyaHospitalDepartmentList()
    // this.getLogisticsCompanyList()
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