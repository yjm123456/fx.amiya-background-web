<template>
  <div>
    <Modal
      v-model="control"
      title="订单列表"
      :mask-closable="false"
      width="80%"
      footer-hide
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
        <Table border :columns="columns" :data="orders"></Table>
      </div>
    </Modal>
    <sendGoods
      :controlModal.sync="controlSendGoodslModal"
      :tradeId="tradeId"
      :ExpressList ="ExpressList"
      :sendGoodstitle ="sendGoodstitle"
      @handleRefreshOrderList="byTradeIdGetOrderList()"
      :sendInfo="sendInfo"
      :orderId ="orderId"
    ></sendGoods>
    <!-- 查看物流 -->
    <Modal
      v-model="logisticsModel"
      title="物流信息"
      :mask-closable="false"
    >
      <div class="top_content">
        <div class="company_con">
          <div class="company" v-if="orderExpressInfoVo.expressName">物流公司：{{orderExpressInfoVo.expressName}}</div>
          <div class="status" v-if="orderExpressInfoVo.state"><div class="circle"></div>{{orderExpressInfoVo.state}}</div>
        </div>
        <div class="orderId" v-if="orderExpressInfoVo.expressNo">快递单号：{{orderExpressInfoVo.expressNo}}</div>
      </div>
      <Steps :current="20" direction="vertical">
          <Step v-for="(item,index) in orderExpressInfoVo.expressDetailList" :key="index" :title="item.content" :content="item.time" ></Step>
      </Steps>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import sendGoods from "./sendGoods.vue"
export default {
  components:{
    sendGoods
  },
  props: {
    controlModal: Boolean,
    tradeId: String,
    ExpressList:Array
  },
  data() {
    return {

      // 查看物流
      logisticsModel:false,
      orderExpressInfoVo:{},
      // 物流弹窗
      controlSendGoodslModal: false,
      // 物流title
      sendGoodstitle:'',
      // 物流信息
      sendInfo:{},
      control: false,
      orderId:'',

      orders: [],

      columns: [
        {
          title: "订单编号",
          key: "id",
          align:'center',
          minWidth:180
        },
        {
          title: "商品分类",
          key: "categoryName",
          align:'center',
          minWidth:120
        },
        {
          title: "商品",
          key: "thumbPicUrl",
          minWidth:220,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  padding: "3px 0",
                },
              },
              [
                h(
                  "viewer",
                  {
                    props: {
                      options: {
                        toolbar: false,
                        title: false,
                        navbar: false,
                      },
                    },
                  },
                  [
                    h("img", {
                      style: {
                        width: "50px",
                        height: "50px",
                        margin: "5px 15px 5px 5px",
                        verticalAlign: "top",
                        fontSize: 0,
                      },
                      attrs: { src: params.row.thumbPicUrl },
                    }),
                  ]
                ),
                h("div", params.row.goodsName),
              ]
            );
          },
        },
        {
            title: "规格",
            key: "standard",
            align:'center',
            tooltip:true,
            minWidth:120
          },
        {
          title: "订单类型",
          key: "orderTypeText",
          align:'center',
          minWidth:120
        },
        {
          title: "购买数量",
          key: "quantity",
          align:'center',
          minWidth:120
        },
        {
          title: "实付积分",
          key: "integrationQuantity",
          align:'center',
          minWidth:120
        },
        {
          title: "交易类型",
          key: "exchangeTypeText",
          align:'center',
          minWidth:120
        },
        {
            title: "操作",
            width: 270,
            fixed: "right",
            align: "center",
            render: (h, params) => {
              const { statusCode ,courierNumber} = params.row;
              const currentRole = JSON.parse(
                sessionStorage.getItem("permissions")
              );
              const flag = currentRole.some((ele) =>
                "fx.amiya.permission_SENG_GOODS".includes(ele)
              );
              return h("div", [
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //     },
                //     style: {
                //       marginRight: "5px",
                //     },
                //     on: {
                //       click: () => {
                //         const { tradeId } = params.row;
                //         this.tradeId = tradeId;
                //         this.controlModal = true;
                //       },
                //     },
                //   },
                //   "订单详情"
                // ),
                
                   h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small",
                          disabled: statusCode !== "WAIT_SELLER_SEND_GOODS"  && statusCode !== 'TRADE_BUYER_PAID',
                        },
                        style: {
                          marginRight: "5px",
                        },
                        on: {
                          click: () => {
                            const { tradeId ,id} = params.row;
                            this.tradeId = tradeId;
                            this.controlSendGoodslModal = true;
                            this.sendGoodstitle = '发货'
                            this.orderId = id
                            // this.getLogisticsCompany()
                          },
                        },
                      },
                      "发货"
                    )
                 ,
                  
                  h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small",
                          disabled: courierNumber == null || courierNumber == "",
                        },
                        style: {
                          marginRight: "5px",
                        },
                        on: {
                          click: () => {
                            const { tradeId ,id} = params.row;
                            this.tradeId = tradeId;
                            this.controlSendGoodslModal = true;
                            this.sendGoodstitle = '修改物流信息'
                            this.orderId = id
                            // this.getLogisticsCompany()
                            api.getSendGoodsInfo(tradeId,id).then(res=>{
                              if(res.code === 0){
                                this.sendInfo = res.data.sendInfo
                              }
                            })
                          },
                        },
                      },
                      "修改物流信息"
                    )
                  ,
                  //  disabled: statusCode !== "WAIT_BUYER_CONFIRM_GOODS" ,
                  h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small",
                          disabled: courierNumber == null || courierNumber == "",
                        },
                        on: {
                          click: () => {
                            const { courierNumber ,receivePhone , expressId} = params.row;
                            const data = {
                              courierNumber,
                              receiverPhone:receivePhone,
                              expressId : expressId ? expressId :""               
                            }
                            if(expressId){
                              api.giftExpressInfo(data).then((res) => {
                                if (res.code === 0) {
                                  this.logisticsModel = true
                                  const { orderExpressInfoVo } = res.data
                                  this.orderExpressInfoVo = orderExpressInfoVo
                                  this.orderExpressInfoVo.expressDetailList.map((item,index)=>{
                                    this.orderExpressInfoVo.expressDetailList[index].time = this.$moment(new Date(item.time)).format("YYYY-MM-DD HH:mm:ss")
                                  })
                                }
                              });
                            }else{
                              this.$Message.error("暂无物流信息")
                            }
                          },
                        },
                      },
                      "查看物流"
                    )
                 ,
              ]);
            },
          },
      ],
    };
  },
  methods: {
    byTradeIdGetOrderList() {
      api.byTradeIdGetOrderList(this.tradeId).then((res) => {
        if (res.code === 0) {
          this.orders = res.data.orders;
        }
      });
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:controlModal", false);
      }
    },
  },
  watch: {
    controlModal(value) {
      this.byTradeIdGetOrderList();
      this.control = value;
    },
  },
};
</script>