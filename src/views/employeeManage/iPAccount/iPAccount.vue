<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.name"
            placeholder="请输入主播名字"
            style="width: 200px"
            @keyup.enter.native="getIpAccount()"
          />
          <Select
              v-model="query.contentPlatformId"
              placeholder="请选择主播平台"
              style="width: 160px; margin-left: 10px"
            >
              <Option
                v-for="item in contentPalteForms"
                :value="item.id"
                :key="item.id"
                >{{ item.contentPlatformName }}</Option
              >
            </Select>
          <Select
            v-model="query.valid"
            style="width: 160px; margin-left: 10px"
            placeholder="是否有效"
          >
            <Option
              v-for="item in isValidList"
              :value="item.valid"
              :key="item.valid"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getIpAccount()"
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

    <Modal v-model="controlModal" :title="title" :mask-closable="false" @on-visible-change="handleModalVisibleChange">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="主播名字" prop="name">
          <Input v-model="form.name" placeholder="请输入主播名字"></Input>
        </FormItem>
        <FormItem label="主播账号" prop="hostAccountName">
          <Input v-model="form.hostAccountName" placeholder="请输入主播账号"></Input>
        </FormItem>
        <FormItem label="所属平台" prop="contentPlateFormId">
          <Select
            v-model="form.contentPlateFormId"
            placeholder="请选择所属平台"
            filterable
          >
            <Option
              v-for="item in contentPalteForms"
              :value="item.id"
              :key="item.id"
              >{{ item.contentPlatformName }}</Option
            >
          </Select>
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
import * as api from "@/api/employeeManage";
import * as apis from "@/api/baseDataMaintenance";
export default {
  data() {
    return {
      // 查询
      query: {
        columns: [
          
          {
            title: "主播名称",
            key: "name",
          },
          {
            title: "主播账号",
            key: "hostAccountName",
          },
          {
            title: "所属平台",
            key: "contentPlateFormName",
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
            align:'center',
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
                        
                        api.byIdLiveAnchor(id).then((res)=>{
                          if(res.code===0){
                            const {contentPlateFormId,contentPlateFormName,hostAccountName,id,name,valid} = res.data.liveAnchor
                            this.form.id = id;
                            this.form.contentPlateFormId = contentPlateFormId;
                            this.form.contentPlateFormName = contentPlateFormName
                            this.form.hostAccountName = hostAccountName
                            this.form.name = name
                            this.form.valid = valid;
                            this.isEdit = true;
                            this.controlModal = true;
                          }
                        })
                      },
                    },
                  },
                  "修改"
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "error",
                //       size: "small",
                //     },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "删除提示",
                //           content: "是否确认删除？",
                //           onOk: () => {
                //             const { id } = params.row;
                //             api.deleteLiveAnchor(id).then((res)=>{
                //               if(res.code === 0){
                //                 this.getIpAccount();
                //                 this.$Message.success({
                //                   content: "删除成功",
                //                   duration: 3,
                //                 });
                //               }
                //             })
                //           },
                //           onCancel: () => {},
                //         });
                //       },
                //     },
                //   },
                //   "删除"
                // ),
              ]);
            },
          },
        ],
        data: [],
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        name:"",
        valid:'true',
        contentPlatformId:''
      },
      isValidList:[
        {
          valid:'true',
          name:'有效'
        },
        {
          valid:'false',
          name:'无效'
        }
       ],
      // 平台
        contentPalteForms:[],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 主播名称
        name: "",
        // 所属平台
        contentPlateFormId:"",
        // 主播平台账号
        hostAccountName:"",
        id: "",
        // 是否有效
        valid: true,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入主播名称",
          },
        ],
        contentPlateFormId: [
          {
            required: true,
            message: "请选择所属平台",
          },
        ],
        hostAccountName: [
          {
            required: true,
            message: "请输入主播平台账号",
          },
        ],
      },
    };
  },
  methods: {
    // 获取平台列表（下拉框）
    getProvince(){
      apis.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
        }
      });
    },
    // 获取IP账户列表
    getIpAccount() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize,name,valid,contentPlatformId } = this.query;
      const data = {
        pageNum,
        pageSize,
        name,
        valid,
        contentPlatformId
      };
      api.getLiveAnchor(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchors;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取IP账户列表（分页）
    handlePageChange(pageNum) {
      const { pageSize,name,valid,contentPlatformId } = this.query;
      const data = {
        pageNum,
        pageSize,
        name,
        valid,
        contentPlatformId
      };
      api.getLiveAnchor(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchors;
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
          const { id, name, valid , hostAccountName , contentPlateFormId} = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              valid,
              hostAccountName , 
              contentPlateFormId
            };
            api.editLiveAnchor(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getIpAccount();
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
              contentPlateFormId , 
              hostAccountName,
              valid
            };
            api.AddLiveAnchor(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getIpAccount();
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
    this.getIpAccount();
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
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
