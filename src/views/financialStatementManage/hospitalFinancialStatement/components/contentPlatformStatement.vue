<template>
  <div>
    <Card :dis-hover="true">
      <DatePicker
        type="year"
        placeholder="请选择年"
        style="width: 200px"
        v-model="query.year"
      ></DatePicker>
      <Select
        v-model="query.month"
        style="width: 180px; margin-left: 10px"
        placeholder="请选择生日月份"
        filterable
      >
        <Option v-for="item in monthList" :value="item.month" :key="item.month"
          >{{ item.name }}
        </Option>
      </Select>
      <Button
        type="primary"
        @click="generateStatementChange"
        style="margin-left: 10px"
        >生成对账单</Button
      >
      <Button
        type="primary"
        @click="exportOrderChange"
        style="margin-left: 10px"
        >导出</Button
      >
      <Button type="primary" @click="addOderChange" style="margin-left: 10px"
        >添加订单</Button
      >
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="num_con">
        <div class="num_text">订单总条数：<span class="num">0</span></div>
        <div class="num_text">订单价格总额：<span  class="num">0</span></div>
        <div class="num_text">合计数量：<span  class="num">0</span></div>
      </div>
    </Card>
    <!-- 
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
        <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal> -->
  </div>
</template>
<script>
import * as api from "@/api/goodsManage";
export default {
  props: ["activeName"],
  data() {
    return {
      // 商品展示方向
      exchangeTypes: [
        {
          showDirectionType: 1,
          showDirectionTypeText: "商城",
        },
      ],
      query: {
        year: this.$moment(new Date()).format("yyyy"),
        month: Number(this.$moment(new Date()).format("MM")),
        keyword: "",
        categoryId: "",
        valid: null,
        pageNum: 1,
        pageSize: 10,
        showDirection: 1,
        columns: [
          {
            title: "订单号",
            key: "id",
            minWidth: 200,
          },

          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 140,
            render: (h, params) => {
              return h(
                "div",
                params.row.appointmentDate == "未预约时间"
                  ? "未预约时间"
                  : this.$moment(params.row.appointmentDate).format(
                      "YYYY-MM-DD"
                    )
              );
            },
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 160,
          },

          {
            title: "预约医院",
            key: "appointmentHospitalName",
            minWidth: 220,
          },
          {
            title: "项目",
            key: "goodsName",
            minWidth: 160,
          },
          {
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 400,
          },
          {
            title: "下单时间",
            key: "createDate",
            minWidth: 180,
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
            title: "下单平台",
            key: "contentPlatformName",
            minWidth: 100,
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 130,
          },

          {
            title: "订单类型",
            key: "orderTypeText",
            minWidth: 120,
          },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 120,
            render: (h, params) => {
              if (params.row.orderStatusText == "已成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "医院重单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "已派单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "未成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
                    },
                  },
                  params.row.orderStatusText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.orderStatusText
                );
              }
            },
          },

          {
            title: "定金金额",
            key: "depositAmount",
            minWidth: 120,
          },
          {
            title: "成交金额",
            key: "dealAmount",
            minWidth: 120,
          },
          {
            title: "成交时间",
            key: "sendDate",
            minWidth: 180,
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 140,
          },
          {
            title: "未成交原因",
            key: "unDealReason",
            minWidth: 300,
          },
          {
            title: "后期铺垫",
            key: "lateProjectStage",
            minWidth: 300,
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 300,
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 180,
            render: (h, params) => {
              return params.row.checkDate
                ? h(
                    "div",
                    this.$moment(params.row.checkDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 120,
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "审核金额",
            key: "checkPrice",
            minWidth: 120,
          },
          {
            title: "结算金额",
            key: "settlePrice",
            minWidth: 120,
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 300,
          },
          {
            title: "审核人",
            key: "checkByName",
            minWidth: 120,
          },
        ],
        data: [],
        totalCount: 0,
      },
      monthList: [
        {
          month: 1,
          name: "一月",
        },
        {
          month: 2,
          name: "二月",
        },
        {
          month: 3,
          name: "三月",
        },
        {
          month: 4,
          name: "四月",
        },
        {
          month: 5,
          name: "五月",
        },
        {
          month: 6,
          name: "六月",
        },
        {
          month: 7,
          name: "七月",
        },
        {
          month: 8,
          name: "八月",
        },
        {
          month: 9,
          name: "九月",
        },
        {
          month: 10,
          name: "十月",
        },
        {
          month: 11,
          name: "十一月",
        },
        {
          month: 12,
          name: "十二月",
        },
      ],
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
      },

      ruleValidate: {
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
    generateStatementChange() {
      this.$Message.error("生成失败");
    },
    exportOrderChange() {
      this.$Message.error("暂无数据导出");
    },
    addOderChange() {
      this.$Message.error("暂时无法添加订单");
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
          const { name, simpleCode, id, valid, showDirectionType } = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              simpleCode,
              valid,
              showDirectionType,
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
        if (value === "contentPlatformStatement") {
          // this.getHospitalSendOrderList();
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
.num_con{
  display: flex;
  margin-top: 10px;
  font-size: 18px;
}
.num{
  color: red;
}
.num_text{
  margin-right: 20px;
}
</style>
