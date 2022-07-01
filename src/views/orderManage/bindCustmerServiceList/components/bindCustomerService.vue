<template>
  <div>
    <Card>
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
      v-model="unBindCustomerServiceOrderInfo.controlModal"
      title="未绑定客服的订单列表"
      :mask-closable="false"
      width="80%"
      @on-visible-change="unBindCustomerModalVisibleChange"
    >
      <div>
        <Input
          v-model="unBindCustomerServiceOrderInfo.keyword"
          style="width:200px;"
          placeholder="请输入订单号或商品名称"
          @keyup.enter.native="getUnBindCustomerServiceOrder()"
        />
        <Select
          v-model="unBindCustomerServiceOrderInfo.statusCode"
          style="width: 200px;margin-left: 10px"
          placeholder="请选择订单状态"
        >
          <Option
            v-for="item in unBindCustomerServiceOrderInfo.statusCodeList"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
        <InputNumber
          :min="1"
          v-model="unBindCustomerServiceOrderInfo.minPayment"
          style="width:200px;margin-left: 10px"
          placeholder="请输入最小付款金额"
        ></InputNumber>
        <InputNumber
          :min="1"
          v-model="unBindCustomerServiceOrderInfo.maxPayment"
          style="width:200px;margin-left: 10px"
          placeholder="请输入最大付款金额"
        ></InputNumber>
        <Select
          v-model="unBindCustomerServiceOrderInfo.appType"
          style="width: 200px;margin-left: 10px"
          placeholder="请选择下单平台"
        >
          <Option
            v-for="item in unBindCustomerServiceOrderInfo.orderAppTypes"
            :value="item.orderType"
            :key="item.orderType"
            >{{ item.appTypeText }}</Option
          >
        </Select>
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="getUnBindCustomerServiceOrder()"
          >查询</Button
        >
      </div>
      <div style="margin-top:10px">
        <Table
          border
          :columns="unBindCustomerServiceOrderInfo.columns"
          :data="unBindCustomerServiceOrderInfo.data"
          @on-select="handleSelect"
          @on-select-cancel="handleCancel"
          @on-select-all="handleSelectAll"
          @on-select-all-cancel="handleSelectAll"
          ref="selection"
        ></Table>
      </div>
      <div class="page_wrap">
        <span>
          <Page
            ref="unBindCustomerServiceOrderPage"
            :current="unBindCustomerServiceOrderInfo.pageNum"
            :page-size="unBindCustomerServiceOrderInfo.pageSize"
            :total="unBindCustomerServiceOrderInfo.totalCount"
            show-total
            show-elevator
            @on-change="handleUnBindCustomerServiceOrderPageChange"
          />
        </span>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="submit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
export default {
  props: ["activeName"],
  data() {
    return {
      query: {
        columns: [
          {
            title: "姓名",
            key: "name",
          },
          {
            title: "用户名",
            key: "userName",
          },
          {
            title: "绑定客户人数",
            key: "bindCustomerQuantity",
          },
          {
            title: "操作",
            width: 100,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.getUnBindCustomerServiceOrder(() => {
                          this.unBindCustomerServiceOrderInfo.customerServiceId = params.row.id;
                          this.unBindCustomerServiceOrderInfo.controlModal = true;
                        });
                      },
                    },
                  },
                  "绑定客服"
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
      
      // 未绑定客服的订单列表
      unBindCustomerServiceOrderInfo: {
        controlModal: false,
        keyword: "",
        statusCodeList:[
          {
            name:"等待买家付款",
            value:"WAIT_BUYER_PAY"
          },
          {
            name:"等待卖家发货",
            value:"WAIT_SELLER_SEND_GOODS"
          },
          {
            name:"等待买家确认收货",
            value:"WAIT_BUYER_CONFIRM_GOODS"
          },
          {
            name:"交易成功",
            value:"TRADE_FINISHED"
          },
          {
            name:"退款成功后交易自动关闭",
            value:"TRADE_CLOSED"
          },
          {
            name:"付款以前卖家或买家主动关闭交易",
            value:"TRADE_CLOSED_BY_TAOBAO"
          },
          {
            name:"买家已签收,货到付款专用",
            value:"TRADE_BUYER_SIGNED"
          }
        ],
        statusCode:null,
        minPayment:null,
        maxPayment:null,
        appTypeList:[
          {
            name: "全部平台",
            value: -1,
          },
          {
            name: "天猫平台",
            value: 0,
          },
          {
            name: "京东平台",
            value: 1,
          },
          {
            name: "小程序",
            value: 2,
          },
          {
            name: "公众号",
            value: 3,
          }
        ],
        orderAppTypes:[{orderType: -1, appTypeText: "全部平台"}],
        appType:-1,
        pageNum: 1,
        pageSize: 5,
        totalCount: 0,
        columns: [
          {
            type: 'selection',
            key: "_checked",
            align: "center",
          },
          {
            title: "订单号",
            key: "id",
          },
          {
            title: "下单平台",
            key: "appTypeText",
          },
          {
            title: "商品",
            key: "thumbPicUrl",
            width: 400,
            render: (h, params) => {
              return h("viewer",{
                  props: {
                    zoomable: false,
                  },
                  style:{
                    display:'flex',
                  }
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 0",
                      verticalAlign: "middle"
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                  h("div", params.row.goodsName,)
                ]
              );
            },
          },
          {
            title: "实付款",
            key: "actualPayment",
          },
          {
            title: "状态",
            key: "statusText",
          },
          {
            title: "手机号",
            key: "phone",
          },
        ],
        data: [],
        customerServiceId: "",
        orderIdList: new Set(),
      },
    };
  },
  created(){
    this.getOrderPlatform()
  },
  methods: {
    // 获取平台下单列表
    getOrderPlatform(){
      api.getOrderPlatform().then((res) => {
        if(res.code === 0){
          const {orderAppTypes} = res.data
          this.unBindCustomerServiceOrderInfo.orderAppTypes = [...this.unBindCustomerServiceOrderInfo.orderAppTypes,...orderAppTypes]
        }
        
      })
    },
    // 获取客服列表
    getCustomerServiceList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = { pageNum, pageSize };
      api.customerServiceList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerService;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取客服列表分页
    handlePageChange(pageNum) {
      const { pageSize, appType } = this.query;
      const data = { pageNum, pageSize };
      api.customerServiceList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerService;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取未绑定客服的订单列表
    getUnBindCustomerServiceOrder(callback) {
      this.$nextTick(() => {
        this.$refs["unBindCustomerServiceOrderPage"].currentPage = 1;
      });
      const {
        keyword,
        pageNum,
        pageSize,
        statusCode,
        minPayment,
        maxPayment,
        appType
      } = this.unBindCustomerServiceOrderInfo;
      const data = { keyword, pageNum, pageSize, statusCode, minPayment, maxPayment, appType:appType === -1 ? "" : appType };
      api.getUnBindCustomerServiceOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.unBindCustomerServiceOrderInfo.data = list.map((item) => {
            return {
              ...item,
              _checked: false,
            };
          });
          this.unBindCustomerServiceOrderInfo.totalCount = totalCount;
          callback && callback();
        }
      });
    },

    // 未绑定客服的订单列表分页
    handleUnBindCustomerServiceOrderPageChange(pageNum) {
      const { keyword, pageSize, statusCode, minPayment, maxPayment,appType } = this.unBindCustomerServiceOrderInfo;
      const data = { keyword, pageNum, pageSize, statusCode, minPayment, maxPayment, appType:appType === -1 ? "" : appType};
      api.getUnBindCustomerServiceOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.unBindCustomerServiceOrderInfo.data = list.map((item) => {
            return {
              ...item,
              _checked: false,
            };
          });
          this.unBindCustomerServiceOrderInfo.totalCount = totalCount;
          // 切换分页回显选中
          for (let index in this.unBindCustomerServiceOrderInfo.data) {
            if (this.unBindCustomerServiceOrderInfo.orderIdList.has(this.unBindCustomerServiceOrderInfo.data[index].id)) {
              this.unBindCustomerServiceOrderInfo.data[index]._checked = true
            }
          }
        }
      });
    },

    handleSelect(selection,row) {
      this.unBindCustomerServiceOrderInfo.orderIdList.add(row.id);
    },

    handleCancel(selection,row) {
      this.unBindCustomerServiceOrderInfo.orderIdList.delete(row.id);
    },
    
    handleSelectAll(selection) {
      if(selection && selection.length === 0){
        const data = this.$refs.selection.data;
        data.forEach((item)=>{
          if(this.unBindCustomerServiceOrderInfo.orderIdList.has(item.id)){
            this.unBindCustomerServiceOrderInfo.orderIdList.delete(item.id);
          }
        })
      }else{
        selection.forEach((item)=>{
          this.unBindCustomerServiceOrderInfo.orderIdList.add(item.id);
        })
      }
    },

    unBindCustomerModalVisibleChange(value) {
      if(value === false) {
        this.unBindCustomerServiceOrderInfo.keyword = "";
        this.unBindCustomerServiceOrderInfo.statusCode = null;
        this.unBindCustomerServiceOrderInfo.minPayment = null;
        this.unBindCustomerServiceOrderInfo.maxPayment = null;
      }
    },

    cancel() {
      // 关闭弹框
      this.unBindCustomerServiceOrderInfo.controlModal = false;
      // 重置orderIdList
      this.unBindCustomerServiceOrderInfo.orderIdList.clear();
    },

    submit() {
      if ([...this.unBindCustomerServiceOrderInfo.orderIdList].length) {
        const data = {
          customerServiceId: this.unBindCustomerServiceOrderInfo.customerServiceId,
          orderIdList: [...this.unBindCustomerServiceOrderInfo.orderIdList]
        };
        api.bindCustomerService(data).then((res) => {
          if (res.code === 0) {
            this.getCustomerServiceList();
            this.cancel();
            this.$Message.success({
              content: "添加成功",
              duration: 3,
            });
          }
        });
      }
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "bindCustomerService") {
          this.getCustomerServiceList();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>