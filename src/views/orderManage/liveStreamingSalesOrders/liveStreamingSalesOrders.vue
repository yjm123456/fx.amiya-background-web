<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getLivingTakeGoodsOrderClick()"
          />
          <DatePicker
            type="date"
            placeholder="开始时间"
            :value="query.startDate"
            v-model="query.startDate"
            style="width: 150px; margin-left: 10px"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            :value="query.endDate"
            v-model="query.endDate"
            style="width: 150px; margin-left: 10px"
          ></DatePicker>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getLivingTakeGoodsOrderClick()"
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
      width="70%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="订单id" prop="id">
              <Input v-model="form.id" placeholder="请输入订单id"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商品id" prop="goodsId">
              <Input v-model="form.goodsId" placeholder="请输入商品id"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商品名称" prop="goodsName">
              <Input
                v-model="form.goodsName"
                placeholder="请输入商品名称"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单状态" prop="orderStatus">
              <Select
                v-model="form.orderStatus"
                placeholder="请选择订单状态"
                filterable
              >
                <Option
                  v-for="item in orderStatusList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播名称" prop="liveanchorName">
              <Input
                v-model="form.liveanchorName"
                placeholder="请输入主播名称"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="成交金额" prop="dealPrice">
              <Input
                v-model="form.dealPrice"
                placeholder="请输入成交金额"
                type="number"
                namber
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商品数量" prop="goodsCount">
              <Input
                v-model="form.goodsCount"
                placeholder="请输入商品数量"
                type="number"
                namber
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/LivingTakeGoodsOrder";
export default {
  data() {
    return {
      // 查询
      query: {
        startDate: "",
        endDate: "",
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "订单id",
            key: "id",
            minWidth: 150,
            align: "center",
          },
          {
            title: "商品",
            key: "goodsName",
            minWidth: 300,
            align: "center",
            tooltip: true,
          },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 100,
            align: "center",
          },

          {
            title: "成交金额",
            key: "dealPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "商品数量",
            key: "goodsCount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "主播",
            key: "liveanchorName",
            minWidth: 150,
            align: "center",
            tooltip: true,
          },
          {
            title: "创建时间",
            key: "createDate",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate ? this.$moment(params.row.createDate).format("YYYY-MM-DD  HH:mm:ss") : ""
              );
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
                        const data = {
                          id,
                        };
                        api.byIdLivingTakeGoodsOrder(data).then((res) => {
                          if (res.code === 0) {
                            this.form = res.data.data;
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
                            const data = {
                              id,
                            };
                            api.deleteLivingTakeGoodsOrder(data).then((res) => {
                              if (res.code === 0) {
                                this.getLivingTakeGoodsOrderClick();
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
        // 订单id
        id: "",
        // 商品id
        goodsId: "",
        // 商品名称
        goodsName: "",
        // 主播名称
        liveanchorName: "",
        // 成交金额
        dealPrice: null,
        // 商品数量
        goodsCount: null,
        // 订单状态
        orderStatus: null,
      },

      ruleValidate: {
        id: [
          {
            required: true,
            message: "请输入订单id",
          },
        ],
        goodsId: [
          {
            required: true,
            message: "请输入商品id",
          },
        ],
        goodsName: [
          {
            required: true,
            message: "请输入商品名称",
          },
        ],
        liveanchorName: [
          {
            required: true,
            message: "请输入主播名称",
          },
        ],
        dealPrice: [
          {
            required: true,
            message: "请输入成交金额",
          },
        ],
        goodsCount: [
          {
            required: true,
            message: "请输入商品数量",
          },
        ],
        orderStatus: [
          {
            required: true,
            message: "请选择订单状态",
          },
        ],
      },
      orderStatusList: [],
    };
  },
  methods: {
    // 获取订单状态
    getorderStatusList() {
      api.orderStatusList().then((res) => {
        if (res.code === 0) {
          this.orderStatusList = res.data.statusList;
        }
      });
    },
    // 获取直播中带货列表
    getLivingTakeGoodsOrderClick() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyWord, startDate, endDate } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.getLivingTakeGoodsOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取直播中带货列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyWord, startDate, endDate } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.getLivingTakeGoodsOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.title == "修改") {
            // 修改
            api.updateLivingTakeGoodsOrder(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getLivingTakeGoodsOrderClick();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            // 添加
            api.addLivingTakeGoodsOrder(this.form).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getLivingTakeGoodsOrderClick();
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
    this.getLivingTakeGoodsOrderClick();
    this.getorderStatusList();
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
