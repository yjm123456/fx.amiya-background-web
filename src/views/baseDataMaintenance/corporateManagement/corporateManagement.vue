<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px;"
            @keyup.enter.native="getCompanyBaseInfo()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getCompanyBaseInfo()"
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
        <FormItem label="公司名称" prop="name">
          <Input v-model="form.name" placeholder="请输入公司名称"></Input>
        </FormItem>
        <FormItem label="公司法人" prop="corporation">
          <Input v-model="form.corporation" placeholder="请输入公司法人"></Input>
        </FormItem>
        <FormItem label="注册时间" prop="registerDate">
          <DatePicker
            type="date"
            placeholder="注册时间"
            style="width: 100%"
            :value="form.registerDate"
            v-model="form.registerDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="注册地址" prop="registerAddress">
          <Input v-model="form.registerAddress" placeholder="请输入注册地址" type="textarea" :rows="3"></Input>
        </FormItem>
        <FormItem label="联系邮箱" prop="contactEmail">
          <Input v-model="form.contactEmail"  placeholder="请输入联系邮箱"></Input>
        </FormItem>
        <FormItem label="公司代码" prop="companyCode">
          <Input v-model="form.companyCode" placeholder="请输入公司代码"></Input>
        </FormItem>
        <FormItem label="经营范围" prop="businessScope">
          <Input v-model="form.businessScope" placeholder="请输入经营范围" type="textarea" :rows="3"></Input>
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
import * as api from "@/api/corporateManagement";
export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "公司名称",
            key: "name",
          },
          {
            title: "注册时间",
            key: "registerDate",
            width: 120,
            render: (h, params) => {
              return h(
                "div",
                params.row.registerDate ? this.$moment(params.row.registerDate).format("YYYY-MM-DD"):''
              );
            },
          },
          {
            title: "注册地址",
            key: "registerAddress",
          },
          {
            title: "公司代码",
            key: "companyCode",
          },
          {
            title: "公司法人",
            key: "corporation",
            width: 120,
          },
          {
            title: "经营范围",
            key: "businessScope",
            tooltip:true
          },
          {
            title: "联系邮箱",
            key: "contactEmail",
          },
          {
            title: "是否有效",
            key: "valid",
            width:100,
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
                        api.byIdCompanyBaseInfo(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              valid,
                              id,
                              businessScope,
                              companyCode,
                              contactEmail,
                              corporation,
                              name,
                              registerDate,
                              registerAddress,
                            } = res.data.companyInfo;
                            this.isEdit = true;
                            this.form.valid = valid;
                            this.form.businessScope = businessScope;
                            this.form.companyCode = companyCode;
                            this.form.contactEmail = contactEmail;
                            this.form.corporation = corporation;
                            this.form.name = name;
                            this.form.registerDate = this.$moment(registerDate).format("YYYY-MM-DD");
                            this.form.registerAddress = registerAddress;
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
                            api.deleteCompanyBaseInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getCompanyBaseInfo();
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
        // 是否有效
        valid: false,
        id:"",
        // 公司名称
        name:'',
        // 注册时间
        registerDate:'',
        // 注册地址
        registerAddress:'',
        // 公司代码
        companyCode:'',
        // 公司法人
        corporation:'',
        // 经营范围
        businessScope:'',
        // 联系邮箱
        contactEmail:''
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入公司名称",
          },
        ],
        registerDate: [
          {
            required: true,
            message: "请选择注册时间",
          },
        ],
        registerAddress: [
          {
            required: true,
            message: "请输入注册地址",
          },
        ],
        companyCode: [
          {
            required: true,
            message: "请输入公司代码",
          },
        ],
        corporation: [
          {
            required: true,
            message: "请输入公司法人",
          },
        ],
        businessScope: [
          {
            required: true,
            message: "请输入经营范围",
          },
        ],
        contactEmail: [
          {
            required: true,
            message: "请输入联系邮箱",
          },
        ],

      },
    };
  },
  methods: {
    // 获取公司信息列表
    getCompanyBaseInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword} = this.query;
      const data = { pageNum, pageSize ,keyword };
      api.getCompanyBaseInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.list;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取公司信息列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword} = this.query;
        const data = { pageNum, pageSize ,keyword };
        api.getCompanyBaseInfo(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.list;
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
            const { name,registerDate,registerAddress,companyCode,corporation,businessScope,contactEmail,id,valid } = this.form;
            const  data = { 
                name,
                registerDate:this.$moment(registerDate).format("YYYY-MM-DD"),
                registerAddress,
                companyCode,
                corporation,
                businessScope,
                contactEmail,
                id,
                valid
            } 
            // 修改
            api.updateCompanyBaseInfo(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getCompanyBaseInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { name,registerDate,registerAddress,companyCode,corporation,businessScope,contactEmail } = this.form;
            const  data = { 
                name,
                registerDate:this.$moment(registerDate).format("YYYY-MM-DD"),
                registerAddress,
                companyCode,
                corporation,
                businessScope,
                contactEmail
            } 
            if(contactEmail){
              if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(contactEmail))){
                this.$Message.error({
                  content: "请输入正确的邮箱",
                  duration: 3,
                })
                return false;
              }
            }
            // 添加
            api.addCompanyBaseInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getCompanyBaseInfo();
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
    this.getCompanyBaseInfo();
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