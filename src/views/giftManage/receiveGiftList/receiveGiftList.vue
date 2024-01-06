<template>
  <div>
    <Card :dis-hover="true">
      <div>
        <DatePicker
          type="date"
          placeholder="开始日期"
          style="width: 180px;"
          :value="query.startDate"
          v-model="query.startDate"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="结束日期"
          style="width: 180px; margin : 0 .625rem"
          :value="query.endDate"
          v-model="query.endDate"
        ></DatePicker>
        <Input
          v-model="query.keyword"
          placeholder="请输入礼品名称或电话号"
          style="width: 200px"
          @keyup.enter.native="getReceiveGiftList()"
        />
        <Select
          v-model="query.isSendGoods"
          style="width: 200px; margin-left: 10px"
        >
          <Option
            v-for="item in query.isSendGoodsList"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
        <Select
            v-model="query.categoryId"
            style="width: 200px; margin-left: 10px"
            placeholder="请选择礼品分类"
            filterable
          >
            <Option
              v-for="item in giftCategoryNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="getReceiveGiftList()"
          >查询</Button
        >
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="handleExportClick"
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

    <Modal
      v-model="deliverGoodsform.controlModal"
      title="发货"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="deliverGoodsform"
        :model="deliverGoodsform"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="物流公司" prop="expressId">
          <Select
            v-model="deliverGoodsform.expressId"
            placeholder="请选择物流公司"
            filterable
          >
            <Option
              v-for="item in ExpressList"
              :value="item.id"
              :key="item.id"
              >{{ item.expressName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="快递单号" prop="courierNumber">
          <Input
            v-model="deliverGoodsform.courierNumber"
            placeholder="请输入快递单号"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('deliverGoodsform')">取消</Button>
        <Button type="primary" @click="handleSubmit('deliverGoodsform')"
          >确定</Button
        >
      </div>
    </Modal>

    <Modal
      v-model="editAddress.controlModal"
      title="修改收货地址"
      :mask-closable="false"
      @on-visible-change="handleEditAddressModalVisibleChange"
    >
      <Form
        ref="editAddress"
        :model="editAddress"
        :rules="editAddressRuleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="收货地址" prop="address">
          <Input
            v-model="editAddress.address"
            placeholder="请输入收货地址"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmitEditAddress('editAddress')">取消</Button>
        <Button type="primary" @click="handleSubmitEditAddress('editAddress')"
          >确定</Button
        >
      </div>
    </Modal>
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
      <div>
        <Steps :current="20" direction="vertical">
            <Step :title="item.content" :content="item.time" v-for="(item,index) in orderExpressInfoVo.expressDetailList" :key="index"></Step>
        </Steps>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/giftManage";
import * as apis from "@/api/orderManage";
import * as giftCategoryApi from "@/api/giftCategory";
import { download } from "@/utils/util";
export default {
  data() {
    return {
      // 礼品分类
      giftCategoryNameList:[],
      orderExpressInfoVo:{},
      logisticsModel:false,
      // 物流信息
      ExpressList:[],
      // 查询
      query: {
        categoryId:'',
        startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
        endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
        isSendGoodsList: [
          {
            name: "全部发货状态",
            value: "null",
          },
          {
            name: "未发货",
            value: "false",
          },
          {
            name: "已发货",
            value: "true",
          },
        ],
        keyword: "",
        isSendGoods: "null",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "创建人",
            key: "createBy",
            minWidth: 120,
            align:'center',
          },
          {
            title: "缩略图",
            key: "thumbPicUrl",
            align: "center",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.thumbPicUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "礼品名称",
            key: "giftName",
            minWidth: 200,
            align:'center',
          },
          {
            title: "礼品分类",
            key: "categoryName",
            minWidth:150,
            align:'center'
          },
          {
            title: "礼品数量",
            key: "quantity",
            minWidth:150,
            align:'center'
          },
          {
            title: "领取人电话",
            key: "phone",
            minWidth: 130,
            align:'center',
          },
          {
            title: "收货人",
            key: "receiveName",
            minWidth: 120,
            align:'center',
          },
          {
            title: "收货人电话",
            key: "receivePhone",
            minWidth: 130,
            align:'center',
          },
          {
            title: "收货地址",
            key: "address",
            minWidth: 300,
          },

          {
            title: "领取时间",
            key: "date",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.date).format("YYYY-MM-DD HH:mm:ss")
              );
            },
          },
          {
            title: "发放类型",
            key: "sendType",
            minWidth: 120,
            align:'center',
          },
          {
            title: "绑定订单号",
            key: "orderId",
            minWidth: 200,
            align:'center',
          },
          {
            title: "订单实付款",
            key: "actualPayment",
            minWidth: 130,
            align:'center',
          },
          {
            title: "快递单号",
            key: "courierNumber",
            minWidth: 200,
            align:'center',
          },
          {
            title: "物流公司",
            key: "expressName",
            minWidth: 130,
            align:'center',
          },
          {
            title: "发货人",
            key: "sendGoodsName",
            minWidth: 120,
            align:'center',
          },
          {
            title: "发货时间",
            key: "sendGoodsDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.sendGoodsDate
                  ? this.$moment(params.row.sendGoodsDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : params.row.sendGoodsDate
              );
            },
          },
          {
            title: "操作",
            key: "isSendGoods",
            fixed: "right",
            minWidth: 220,
            align: "center",
            render: (h, params) => {
              const isSendGoods = this.query.data[params.index].isSendGoods;
              const currentRole = JSON.parse(sessionStorage.getItem("permissions"));
              const flag = currentRole.some((ele) => {
                return "fx.amiya.permission_SENG_GOODS".includes(ele);
              });
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
                        const { id, address } = params.row;
                        this.editAddress.id = id;
                        this.editAddress.address = address;
                        this.editAddress.controlModal = true;
                      },
                    },
                  },
                  "修改收货地址"
                ),
                isSendGoods !=true
                  ? h("Button", {
                      props: {
                        type: "primary",
                        size: "small",
                        // disabled: isSendGoods ==true,
                      },
                      style: {
                        marginLeft: "5px",
                      },
                      on: {
                         click: () => {
                          const { id } = params.row;
                          this.deliverGoodsform.id = id;
                          this.deliverGoodsform.controlModal = true;
                          this.getLogisticsCompany()
                        },
                      },
                    },'发货')
                  : null,
                isSendGoods ==true 
                  ? h("Button", {
                      props: {
                        type: "primary",
                        size: "small",
                        // disabled: isSendGoods ==true,
                      },
                      style: {
                        marginLeft: "5px",
                      },
                      on: {
                         click: () => {
                          const { courierNumber ,receivePhone , expressId} = params.row;
                          const data = {
                            courierNumber ,
                            receiverPhone:receivePhone,
                            expressId : expressId ? expressId :""                 
                          }
                          if(expressId){
                            apis.giftExpressInfo(data).then((res) => {
                              if (res.code === 0) {
                                this.logisticsModel = true  
                                const { orderExpressInfoVo  } = res.data
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
                    },'查看物流')
                  : null,
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 发货
      deliverGoodsform: {
        id: null,
        courierNumber: "",
        controlModal: false,
        showDirectionType:"",
        expressId:""
      },

      ruleValidate: {
        courierNumber: [
          {
            required: true,
            message: "请输入快递单号",
          },
        ],
        expressId: [
          {
            required: true,
            message: "请选择物流公司",
          },
        ],
      },

      // 修改收货地址
      editAddress: {
        id: null,
        address: "",
        controlModal: false,
      },

      editAddressRuleValidate: {
        address: [
          {
            required: true,
            message: "请输入收货地址",
          },
        ],
      },
    };
  },
  methods: {
    // 获取礼品分类（下拉框）
    getGiftCategoryNameList() {
      giftCategoryApi.getGiftCategoryNameList().then((res) => {
        if (res.code === 0) {
          this.giftCategoryNameList= res.data.nameList;
        }
      });
    },
    handleExportClick(){
      const {keyword ,startDate ,endDate,isSendGoods,categoryId} = this.query
      const data = {
        keyword,
        startDate:startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : '',
        endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : '',
        isSendGoods: JSON.parse(isSendGoods),
        categoryId
      }
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.exportReceiveGiftList(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '已领取礼品列表'
        download(res,name);
      });
    },
    // 获取物流公司的名称的和id
    getLogisticsCompany(){
      api.getLogisticsCompany().then((res) => {
        if(res.code === 0){
          const {ExpressList} = res.data
          this.ExpressList = ExpressList
        }
      })
    },
    // 获取领取礼品列表
    getReceiveGiftList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, isSendGoods, pageNum, pageSize,startDate,endDate ,categoryId} = this.query;
      const data = {
        keyword,
        isSendGoods: JSON.parse(isSendGoods),
        pageNum,
        pageSize,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : '',
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : '',
        categoryId
      };
      api.getReceiveGiftList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.receiveGiftInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取领取礼品列表（分页）
    handlePageChange(pageNum) {
      const { keyword, isSendGoods, pageSize,startDate,endDate ,categoryId} = this.query;
      const data = {
        keyword,
        isSendGoods: JSON.parse(isSendGoods),
        pageNum,
        pageSize,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : '',
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : '',
        categoryId
      };
      api.getReceiveGiftList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.receiveGiftInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, courierNumber ,expressId } = this.deliverGoodsform;
          const data = {
            id,
            courierNumber,
            expressId
          };
          api.giftDelivery(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("deliverGoodsform");
              this.getReceiveGiftList();
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.deliverGoodsform.controlModal = false;
      this.$refs[name].resetFields();
      const index = this.query.data.findIndex(
        (item) => item.id === this.deliverGoodsform.id
      );
      if (index !== -1) {
        this.query.data[index].isSendGoods = false;
      }
    },

    handleModalVisibleChange(value) {
      if (!value) {
        this.cancelSubmit("deliverGoodsform");
      }
    },

    // 修改收货地址
    handleSubmitEditAddress(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, address } = this.editAddress;
          const data = {
            id,
            address,
          };
          api.editAddress(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmitEditAddress("editAddress");
              this.getReceiveGiftList();
              this.$Message.success({
                content: "修改成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    // 取消修改收货地址
    cancelSubmitEditAddress(name) {
      this.editAddress.controlModal = false;
      this.$refs[name].resetFields();
    },

    handleEditAddressModalVisibleChange(value) {
      if (!value) {
        this.cancelSubmit("editAddress");
      }
    },
  },
  created() {
    this.getReceiveGiftList();
    this.getGiftCategoryNameList()
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
