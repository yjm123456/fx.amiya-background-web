<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键词"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getPointRefundInfo()"
          />
          <Select
            v-model="query.checkState"
            placeholder="审核状态"
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in query.checkStateListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getPointRefundInfo()"
            >查询</Button
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
      title="审核"
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
        <FormItem label="审核状态" prop="checkState">
          <Select
            v-model="form.checkState"
            placeholder="审核状态"
          >
            <Option
              v-for="item in checkStateList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="审核备注">
          <Input
            v-model="form.checkReason"
            placeholder="请输入审核备注"
            type="textarea"
          ></Input>
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
import * as api from "@/api/orderManage";
import * as customerApi from "@/api/customerManage";

export default {
  data() {
    return {
      // 查询
      query: {
        checkState:'',
        checkStateListAll:[{id:-1,name:'全部审核状态'}],
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "创建日期",
            key: "createDate",
            width:200,
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate ? this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "订单号",
            key: "orderId",
            width:200,
          },
          {
            title: "退款原因",
            key: "refundReasong",
            width:220,
          },
          {
            title: "审核日期",
            key: "checkDate",
            width:200,
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate ? this.$moment(params.row.checkDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "审核状态",
            key: "checkStateText",
            width:160,
            render: (h, params) => {
              if(params.row.checkStateText == '审核通过'){
                return h('div',{
                  'style': {
                    'color': '#04B05D'
                  }
                },params.row.checkStateText)
              }else if(params.row.checkStateText == '未审核'){
                return h('div',{
                  'style': {
                    'color': 'red'
                  }
                },params.row.checkStateText)
              }else{
                return h('div',{
                  'style': {
                    'color': '#515a6e'
                  }
                },params.row.checkStateText)
              }
            },
          },
          
          {
            title: "审核人",
            key: "checkByEmpName",
            width:160,
          },
          {
            title: "审核原因",
            key: "checkReason",
            width:300,
          },
          
          {
            title: "操作",
            key: "",
            align:'center',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.checkStateText =='审核通过'
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id} = params.row;
                        this.form.id = id
                        this.controlModal = true
                      },
                    },
                  },
                  "审核"
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
                //             api.detelCustomerIntegralOrderRefund(id).then((res) => {
                //               if (res.code === 0) {
                //                 this.getPointRefundInfo();
                //                 this.$Message.success({
                //                   content: "删除成功",
                //                   duration: 3,
                //                 });
                //               }
                //             });
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
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",
      isEdit:false,
      form: {
        // 审核备注
        checkReason: '',
        // 审核状态
        checkState: '',
        id:"",
      },
      // 审核状态
      checkStateList:[
        {
          id:1,
          name:'审核不通过'
        },
        {
          id:2,
          name:'审核通过'
        }
      ],
      ruleValidate: {
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
      },
    };
  },
  methods: {
      // 获取审核情况（下拉框）
    getCheckStateList(){
      customerApi.getCheckStateList().then((res) => {
        if(res.code === 0){
          const {checkStateList} = res.data
          this.query.checkStateListAll = [...this.query.checkStateListAll,...checkStateList]
        }
      })
    },
    // 获取小程序积分退款列表
    getPointRefundInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,checkState} = this.query;
      const data = { pageNum, pageSize ,keyword ,checkState:checkState == -1 ? '' : checkState};
      api.getCustomerIntegralOrderRefund(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerIntegralOrderRefundInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取小程序积分退款列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,checkState} = this.query;
        const data = { pageNum, pageSize ,keyword , checkState:checkState == -1 ? '' : checkState};
        api.getCustomerIntegralOrderRefund(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.customerIntegralOrderRefundInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {checkState,checkReason,id} = this.form
          const data = {
            id,
            checkState,
            checkReason
          }
          api.CustomerIntegralOrderRefundOrderId(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("form");
              this.getPointRefundInfo();
              this.$Message.success({
                content: "审核成功",
                duration: 3,
              });
            }
          });
        }
      });
      
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
      this.form.checkReason = ''
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.form.checkReason = ''
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getPointRefundInfo();
    this.getCheckStateList()
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