<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getIntegrationGenerateRecord()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 130px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            style="width: 130px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getIntegrationGenerateRecord()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="exportRecordListClick"
            v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
            >导出</Button
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
      title="修改"
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
        <FormItem label="扣除积分数量" prop="quantity">
          <Input v-model="form.quantity" placeholder="请输入扣除积分数量" type="number" number></Input>
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
import * as api from "@/api/customerManage";
import { download } from "@/utils/util";

export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "订单号",
            key: "orderId",
            align:'center',
            minWidth:180
          },
          {
            title: "发放时间",
            key: "createDate",
            align:'center',
            minWidth:180,
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate ? this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                ) : ''
              );
            },
          },
          {
            title: "手机号",
            key: "phone",
            align:'center',
            minWidth:150
          },
          {
            title: "积分类型",
            key: "typeText",
            align:'center',
            minWidth:150
          },
          {
            title: "发放数量",
            key: "quantity",
            align:'center',
            minWidth:120
          },
          
          {
            title: "消费金额",
            key: "consumptionAmount",
            align:'center',
            minWidth:120
          },
          {
            title: "生成比例",
            key: "percent",
            align:'center',
            minWidth:120
          },
          {
            title: "该记录剩余的积分",
            key: "stockQuantity",
            align:'center',
            minWidth:160
          },
          {
            title: "用户积分余额",
            key: "accountBalance",
            align:'center',
            minWidth:160
          },
          {
            title: "发放人",
            key: "handleBy",
            align:'center',
            minWidth:150
          },
          {
            title: "操作",
            key: "",
            width: 100,
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
                        const { customerId } = params.row;
                        this.form.customerId = customerId
                        this.controlModal = true
                      },
                    },
                  },
                  "修改"
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
        customerId:"",
        quantity:null
      },

      ruleValidate: {
        quantity: [
          {
            required: true,
            message: "请输入扣除积分数量",
          },
        ],
        
      },
    };
  },
  methods: {
    // 导出积分发放
    exportRecordListClick(){
      const {
        keyword,
        startDate,
        endDate,
      } = this.query;
      const data = {
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
       
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.exportRecordList(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '积分发放记录'
        download(res,name);
      });
    },
    // 获取发放积分列表
    getIntegrationGenerateRecord() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,startDate,endDate} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keyword ,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.IntegrationGenerateRecord(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.recordList;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取发放积分列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,startDate,endDate} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyword ,
            startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        };
        api.IntegrationGenerateRecord(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.recordList;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            console.log(this.form)
            // 修改
            api.editIntegrationGenerateRecord(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getIntegrationGenerateRecord();
                this.$Message.success({
                  content: "修改成功",
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
    this.getIntegrationGenerateRecord();
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