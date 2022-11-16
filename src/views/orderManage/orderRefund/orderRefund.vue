<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keywords"
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
          <Select
            v-model="query.refundState"
            placeholder="退款状态"
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in query.refundStateListAll"
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
            v-model="form.unCheckReason"
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
import * as api from "@/api/orderRefund";
export default {
  data() {
    return {
      // 查询
      query: {
        refundState:-1,
        checkState:-1,
        checkStateListAll:[{id:-1,name:'全部审核状态'}],
        refundStateListAll:[{id:-1,name:'全部退款状态'}],
        keywords: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
            {
            title: "订单号",
            key: "orderId",
            align:'center',
            width:180,
          },
          {
            title: "创建日期",
            key: "createDate",
            width:180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate ? this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "商品名称",
            key: "goodsName",
            width:200,
            align:'center',
          },
          {
            title: "支付方式",
            key: "exchageTypeText",
            width:100,
            align:'center',
          },
          {
            title: "付款时间",
            key: "payDate",
            width:180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.payDate ? this.$moment(params.row.payDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "实际支付",
            key: "actualPayAmount",
            width:120,
            align:'center',
          },
          {
            title: "审核日期",
            key: "checkDate",
            width:180,
            align:'center',
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
            width:130,
            align:'center',
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
              }else if(params.row.checkStateText == '待审核'){
                return h('div',{
                  'style': {
                    'color': 'orange'
                  }
                },params.row.checkStateText)
              }else if(params.row.checkStateText == '审核未通过'){
                return h('div',{
                  'style': {
                    'color': 'blue'
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
            key: "checkByName",
            width:140,
            align:'center',
          },
          {
            title: "审核失败原因",
            key: "uncheckReason",
            width:220,
            align:'center',
          },
          {
            title: "退款时间",
            key: "refundStartDate",
            width:180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.refundStartDate ? this.$moment(params.row.refundStartDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "退款状态",
            key: "refundStateText",
            width:120,
            align:'center',
            render: (h, params) => {
              if(params.row.refundStateText == '退款成功'){
                return h('div',{
                  'style': {
                    'color': '#04B05D'
                  }
                },params.row.refundStateText)
              }else if(params.row.refundStateText == '退款失败'){
                return h('div',{
                  'style': {
                    'color': 'red'
                  }
                },params.row.refundStateText)
              }else if(params.row.refundStateText == '待退款'){
                return h('div',{
                  'style': {
                    'color': 'orange'
                  }
                },params.row.refundStateText)
              }else if(params.row.refundStateText == '退款中'){
                return h('div',{
                  'style': {
                    'color': 'blue'
                  }
                },params.row.refundStateText)
              }else{
                return h('div',{
                  'style': {
                    'color': '#515a6e'
                  }
                },params.row.refundStateText)
              }
            },
          },
          {
            title: "退款金额",
            key: "refundAmount",
            width:120,
            align:'center',
          },
          
          {
            title: "退款原因",
            key: "remark",
            width:220,
            align:'center',
          },
          {
            title: "退款失败原因",
            key: "refundFailReason",
            width:220,
            align:'center',
          },
          {
            title: "是否是订单部分退款",
            key: "isPartial",
            width: 180,
            align: "center",
            render: (h, params) => {
              if (params.row.isPartial == true) {
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
            align:'center',
            fixed:'right',
            width:160,
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
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.checkStateText !== '审核通过' || params.row.refundStateText == '退款成功'
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "退款提示",
                          content: "是否确认退款？",
                          onOk: () => {
                            const { id } = params.row;
                            
                            api.WechatPay(id).then((res) => {
                              if (res.code === 0) {
                                this.getPointRefundInfo();
                                this.$Message.success({
                                  content: "已确认成功",
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
                  "退款"
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
      isEdit:false,
      form: {
        // 审核备注
        unCheckReason: '',
        // 审核状态
        checkState: '',
        id:"",
      },
      // 审核状态
      checkStateList:[
        
        {
          id:1,
          name:'审核通过'
        },
        {
          id:2,
          name:'审核不通过'
        },
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
    // 获取退款状态（下拉框）
    getRefundStateList(){
      api.getRefundStateList().then((res) => {
        if(res.code === 0){
          const {refundStateList} = res.data
          this.query.refundStateListAll = [...this.query.refundStateListAll,...refundStateList]
        }
      })
    },
      // 获取审核情况（下拉框）
    getCheckStateList(){
      api.getCheckStateList().then((res) => {
        if(res.code === 0){
          const {checkStateList} = res.data
          this.query.checkStateListAll = [...this.query.checkStateListAll,...checkStateList]
        }
      })
    },
    // 获取订单退款列表
    getPointRefundInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keywords,checkState,refundState } = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keywords ,
        checkState:checkState == -1 ? '' : checkState,
        refundState:refundState == -1 ? '' : refundState,
        };
      api.getOrderRefund(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.list;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取订单退款列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keywords,checkState,refundState } = this.query;
        const data = { pageNum, pageSize ,keywords , checkState:checkState == -1 ? '' : checkState,refundState:refundState == -1 ? '' : refundState,};
        api.getOrderRefund(data).then((res) => {
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
          const {checkState,unCheckReason,id} = this.form
          const data = {
            id,
            checkState,
            unCheckReason
          }
          api.OrderRefundCheck(data).then((res) => {
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
      this.form.unCheckReason = ''
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.form.unCheckReason = ''
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getPointRefundInfo();
    this.getCheckStateList()
    this.getRefundStateList()
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