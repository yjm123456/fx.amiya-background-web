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
      <Select
        v-model="query.hospitalId"
        style="width: 210px; margin-left: 10px"
        placeholder="医院"
        filterable
      >
        <Option
          v-for="item in hospitalList"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Button type="primary" @click="getOrderChange" style="margin-left: 10px"
        >查询</Button
      >
      <Button type="primary" @click="confirmChange" style="margin-left: 10px"
        >确认对账</Button
      >
    </Card>

    <Card class="container">
      <div class="table_content">
        <div class="tables">
          <Table border :columns="query.columns" :data="query.data"></Table>
            <div class="num_con">
                <div class="num_text">订单总条数：<span class="num">0</span></div>
                <div class="num_text">订单价格总额：<span class="num">0</span></div>
                <div class="num_text">合计数量：<span class="num">0</span></div>
            </div>
        </div>
        <div class="tables">
          <Table border :columns="query.columns" :data="query.data"></Table>
            <div class="num_con">
                <div class="num_text">订单总条数：<span class="num">0</span></div>
                <div class="num_text">订单价格总额：<span class="num">0</span></div>
                <div class="num_text">合计数量：<span class="num">0</span></div>
            </div>
        </div>
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
import * as api from "@/api/orderManage";
export default {
  props:{
    hospitalList:Array,
    activeName:String
  },
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
        hospitalId: -1,
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
            title: "登记日期",
            tooltip: true,
            minWidth: 180,
            key: "time",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
            align: "center",
          },
          {
            title: "升单渠道",
            key: "channel",
            minWidth: 140,
            align: "center",
          },
          {
            title: "归属主播",
            key: "liveAnchorName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "客户昵称",
            key: "nickName",
            minWidth: 180,
            tooltip: true,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 140,
            tooltip: true,
            align: "center",
          },
          {
            title: "是否携带订单",
            key: "isAddedOrder",
            minWidth: 140,
            tooltip: true,
            align: "center",
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 200,
            align: "center",
          },
          {
            title: "核销日期",
            tooltip: true,
            minWidth: 180,
            key: "time",
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.writeOffDate
                  ? this.$moment(params.row.writeOffDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "消费类型",
            key: "consumeTypeText",
            minWidth: 140,
            align: "center",
          },
          {
            title: "项目",
            key: "itemName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "是否为面诊卡",
            key: "isCconsultationCard",
            minWidth: 140,
            align: "center",
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth: 220,
            align: "center",
          },

          {
            title: "升单类型",
            key: "buyAgainTypeText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "金额",
            key: "price",
            minWidth: 120,
            align: "center",
          },
          {
            title: "是否为外播",
            key: "isSelfLiving",
            minWidth: 140,
            align: "center",
          },
          {
            title: "升单日期",
            tooltip: true,
            minWidth: 180,
            key: "time",
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.buyAgainTime).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "是否有升单证明",
            key: "hasBuyagainEvidence",
            minWidth: 140,
            align: "center",
          },
          {
            title: "是否与医院核实",
            key: "isCheckToHospital",
            minWidth: 140,
            align: "center",
          },
          {
            title: "跟进人员",
            key: "employeeName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "人次",
            key: "personTime",
            minWidth: 80,
            align: "center",
          },
          {
            title: "是否领取加购礼",
            key: "isReceiveAdditionalPurchase",
            minWidth: 140,
            align: "center",
          },
          {
            title: "审核时间",
            tooltip: true,
            minWidth: 180,
            key: "time",
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate
                  ? this.$moment(params.row.checkDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "审核状态",
            key: "checkState",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              if (params.row.checkState == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkState
                );
              } else if (params.row.checkState == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkState
                );
              } else if (params.row.checkState == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkState
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkState
                );
              }
            },
          },
          {
            title: "审核升单金额",
            key: "checkBuyAgainPrice",
            minWidth: 140,
            align: "center",
          },
          {
            title: "审核结算金额",
            key: "checkSettlePrice",
            minWidth: 140,
            align: "center",
          },

          {
            title: "审核人员",
            key: "checkByEmpName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 300,
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 300,
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
      this.$Message.error("医院端暂未生成对账单，无法生成");
    },
    getOrderChange() {
      this.$Message.error("暂未查到数据");
    },
    confirmChange() {
      this.$Message.error("暂时无法对账");
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
        if (value === "contentPlatform") {
          //   this.getHospitalSendOrderList();
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
.num_con {
  display: flex;
  margin-top: 10px;
  font-size: 18px;
}
.num {
  color: red;
}
.num_text {
  margin-right: 20px;
}
.table_content {
  width: 100%;
  display: flex;
}
.tables {
  width: 50%;
}
.tables:first-child {
  margin-right: 10px;
}
</style>
