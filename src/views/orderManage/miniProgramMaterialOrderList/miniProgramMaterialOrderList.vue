<template>
  <div>
    <Card :dis-hover="true">
      <div>
        <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 200px"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 200px; margin-left: 10px"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
        <Input
          v-model="query.keyword"
          placeholder="请输入关键字"
          style="width: 200px; margin-left: 10px"
          @keyup.enter.native="getMiniProgramMaterialOrderTradeList()"
        />
        <Select
          v-model="query.isSendGoods"
          placeholder="请选择回访类型"
          style="width: 200px; margin-left: 10px"
        >
          <Option
            :value="item.value"
            v-for="item in query.goodsState"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="getMiniProgramMaterialOrderTradeList()"
          >查询</Button
        >
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="exportMinProgramOrderList()"
           v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
          >导出</Button
        >
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

    <orderList :controlModal.sync="controlModal" :tradeId="tradeId" :ExpressList="ExpressList"></orderList>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import orderList from "./components/orderList";
import { download } from "@/utils/util";
export default {
  components: {
    orderList,
  },
  data() {
    return {
      // 物流公司
      ExpressList:[],
      query: {
        startDate: this.$moment().startOf('month').format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        goodsState: [
          {
            name: "全部",
            value: -1,
          },
          {
            name: "已发货",
            value: 1,
          },
          {
            name: "未发货",
            value: 0,
          },
        ],
        isSendGoods: -1,
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          // {
          //   title: "交易编号",
          //   key: "tradeId",
          //   minWidth: 200,
          // },
          {
            title: "下单电话",
            key: "phone",
            minWidth: 140,
            align:'center'
          },
          {
            title: "创建时间",
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
            align:'center'
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
            align:'center'
          },
          {
            title: "状态",
            key: "statusText",
            minWidth: 200,
            align:'center'
          },
          {
            title: "地址",
            key: "address",
            minWidth: 200,
            align:'center'
          },
          {
            title: "收货人",
            key: "receiveName",
            minWidth: 100,
            align:'center'
          },
          {
            title: "收货人电话",
            key: "receivePhone",
            minWidth: 130,
            align:'center'
          },
          {
            title: "绑定订单号",
            key: "bindOrderIds",
            minWidth: 200,
            align:'center'
          },
          {
            title: "商品",
            key: "goods",
            minWidth: 200,
            align:'center'
          },
          {
            title: "购买总量",
            key: "quantities",
            minWidth: 100,
            align:'center'
          },
          {
            title: "实付总积分",
            key: "intergrationAccounts",
            minWidth: 120,
            align:'center'
          },
          {
            title: "实付金额",
            key: "totalAmount",
            minWidth: 120,
            align:'center'
          },
          {
            title: "快递单号",
            key: "courierNumber",
            minWidth: 200,
            align:'center'
          },
          {
            title: "物流公司",
            key: "expressName",
            minWidth: 130,
            align:'center'
          },
          {
            title: "发货人",
            key: "sendGoodsName",
            minWidth: 130,
            align:'center'
          },
          {
            title: "发货时间",
            key: "sendGoodsDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.sendGoodsDate ? this.$moment(params.row.sendGoodsDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                ) : ''
              );
            },
          },
          {
            title: "操作",
            width: 140,
            fixed: "right",
            align: "center",
            render: (h, params) => {
              const { statusCode } = params.row;
              const currentRole = JSON.parse(
                sessionStorage.getItem("permissions")
              );
              const flag = currentRole.some((ele) =>
                "fx.amiya.permission_SENG_GOODS".includes(ele)
              );
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
                        const { tradeId } = params.row;
                        this.tradeId = tradeId;
                        this.controlModal = true;
                      },
                    },
                  },
                  "订单详情"
                ),
                 ,
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      controlModal: false,
      controlSendGoodslModal: false,
      tradeId: "",
    };
  },
  methods: {
    // 导出
    exportMinProgramOrderList() {
      const { isSendGoods, keyword,startDate,endDate } = this.query;
      const data = {
        isSendGoods:
          isSendGoods === -1 ? null : isSendGoods === 1 ? true : false,
        keyword,
        startDate:this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate:this.$moment(new Date(endDate)).format("YYYY-MM-DD")
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length ==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.exportMiniProgramOrderLlist(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD")+ '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD")  + '小程序订单交易列表'
        download(res,name);
      });
    },
    //获取物流公司名称和id
    getLogisticsCompany(){
      api.getLogisticsCompany().then((res) => {
        if(res.code === 0){
          const {ExpressList} = res.data
          this.ExpressList = ExpressList
        }
      })
    },
    // 获取小程序订单交易列表
    getMiniProgramMaterialOrderTradeList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { isSendGoods, keyword, pageNum, pageSize,startDate,endDate } = this.query;
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      const data = {
        isSendGoods:
          isSendGoods === -1 ? null : isSendGoods === 1 ? true : false,
        keyword,
        pageNum,
        pageSize,
        startDate:startDate  ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null
      };
      api.getMiniProgramMaterialOrderTradeList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.orderTrades;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { isSendGoods, keyword, pageSize ,startDate,endDate} = this.query;
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      const data = {
        isSendGoods:
          isSendGoods === -1 ? null : isSendGoods === 1 ? true : false,
        keyword,
        pageNum,
        pageSize,
        startDate:startDate  ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null
      };
      api.getMiniProgramMaterialOrderTradeList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.orderTrades;
          this.query.data = list;
          this.query.totalCount = totalCount;
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
    this.getMiniProgramMaterialOrderTradeList();
    this.getLogisticsCompany()
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
.company_con{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.circle{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2d8cf0;
  margin-right: 5px;
}
.orderId{
  margin-bottom: 30px;
}
.status{
  display: flex;
  align-items: center;
}
</style>
