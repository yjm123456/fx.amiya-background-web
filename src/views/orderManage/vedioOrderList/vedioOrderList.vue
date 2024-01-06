<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          
          <DatePicker
            type="date"
            placeholder="下单开始日期"
            style="width: 150px;"
            :value="query.startDate"
            v-model="query.startDate"
        ></DatePicker>
        <DatePicker
            type="date"
            placeholder="下单结束日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
        ></DatePicker>
        <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getTikTokOrder()"
          />
            <Select
              v-model="query.status"
              placeholder="请选择订单状态"
              filterable
              style="width:150px;margin-left:10px"
            >
              <Option
                v-for="item in statusCodeList"
                :value="item.code"
                :key="item.code"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.orderType"
              placeholder="请选择订单类型"
              filterable
              style="width:150px;margin-left:10px"
            >
              <Option
                v-for="item in orderTypeList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
            v-model="query.belongLiveAnchorId"
            placeholder="请选择主播"
            filterable
            style="width:200px;margin-left:10px"
          >
            <Option
              v-for="item in anchorListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getTikTokOrder()"
            >查询</Button
          >
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            style="margin-left:10px"
            >补单</Button
          >
        </div>
        <div class="right">
          
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
       width="1000"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="80"
      >
      <Row :gutter="30">
        <Col span="8">
          <FormItem label="订单号" prop="id">
            <Input v-model="form.id" placeholder="请输入订单号"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="主播" prop="anchor">
            <Select
              v-model="form.anchor"
              placeholder="请选择主播"
              filterable
              style="width:200px;"
            >
              <Option
                v-for="item in anchorList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <Button type="primary" style="margin-left: 10px" @click="supplementChange">搜索</Button>
        </Col>
      </Row> 
      <Row :gutter="30">
        
        <Col span="16">
          <FormItem label="商品名称" prop="goodsName">
            <Input v-model="form.goodsName"  disabled></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="实付款" prop="actualPayment">
            <Input v-model="form.actualPayment" type="number" disabled></Input>
          </FormItem>
        </Col>
        
      </Row>
      <Row :gutter="30">
        <Col span="8">
          <FormItem label="应收款" prop="accountReceivable">
            <Input v-model="form.accountReceivable" type="number" disabled></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="购买数量" prop="quantity">
            <Input v-model="form.quantity" type="number"  disabled></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="订单状态" prop="statusCode" >
            <Select
              v-model="form.statusCode"
              disabled
            >
              <Option
                v-for="item in query.statusCodeList"
                :value="item.value"
                :key="item.value"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        
        
      </Row>
      <Row :gutter="30">
        <Col span="8">
          <FormItem label="商品图片" prop="thumbPicUrl" key="thumbPicUrl" style="margin-top:10px">
            <div class="img_con">
              <img :src="form.thumbPicUrl" style="width:60px;height:60px;margin-top:10px" v-if="form.thumbPicUrl" @click="imageChange(1)">
              <div class="no_img" v-else @click="imageChange(2)">暂无图片</div>
            </div>
          </FormItem>
        </Col>
        <Col span="16">
          <FormItem label="备注" >
            <Input
              v-model="form.remark"
              placeholder="请输入备注"
              type="textarea"
              :rows="4"
            ></Input>
          </FormItem>
        </Col>
        <Spin fix v-if="flag == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
      </Row> 
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确认补单</Button>
      </div>
    </Modal>
 
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as anchorApi from "@/api/liveAnchorBaseInfo";
export default {
  components:{
  },
  data() {
    return {
      // 查询
      query: {
        belongLiveAnchorId:-1,
        orderType:-1,
        status:-1,
        startDate:'',
        endDate:'',
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "订单号",
            key: "id",
            minWidth: 190,
            align:'center',
          },
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 340,
            align:'center',
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                  style: {
                    display: "flex",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "3.125rem",
                      height: "3.125rem",
                      margin: ".3125rem .9375rem .3125rem .3125rem",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },
          {
            title: "用户昵称",
            key: "buyerNick",
            minWidth: 150,
            align:'center',
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
                return h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                    },
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          marginRight: "10px",
                        },
                      },
                      params.row.phone
                    ),
                    h("span", {
                      style: {
                        color: "#2d8cf0",
                        fontSize: "20px",
                      },
                      class: !params.row.bool
                        ? "iconfont icon-biyan"
                        : "iconfont icon-see",
                      on: {
                        click: () => {
                          if (params.row.bool) return;
                          const { encryptPhone } = params.row;
                          const data = {
                            encryptPhone
                          }
                          api.decryptoPhonesNew(data).then((res) => {
                            if (res.code === 0) {
                              params.row.phone = res.data.phone;
                              params.row.bool = true;
                            }
                          });
                        },
                      },
                    }),
                  ]
                );
            }
          },
          {
            title: "应收款",
            key: "accountReceivable",
            minWidth: 120,
            align:'center',
          },
          {
            title: "实付款",
            key: "actualPayment",
            minWidth: 120,
            align:'center',
          },
          {
            title: "数量",
            key: "quantity",
            minWidth: 120,
            align:'center',
          },
          
          {
            title: "下单时间",
            key: "createDate",
            minWidth: 170,
            align:'center',
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate ? this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "更新时间",
            key: "updateDate",
            minWidth: 170,
            align:'center',
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.updateDate ? this.$moment(params.row.updateDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "订单状态",
            key: "statusCodeText",
            minWidth: 180,
            align:'center',
          },

          {
            title: "订单类型",
            key: "orderTypeText",
            minWidth: 160,
            align:'center',
          },

          {
            title: "归属主播",
            key: "belongLiveAnchorName",
            minWidth: 180,
            align:'center',
            tooltip:true
          },
        ],
        data: [],
        totalCount: 0,
        statusCodeList: [
          {
            name: "等待买家付款",
            value: "WAIT_BUYER_PAY",
          },
          {
            name: "等待卖家发货",
            value: "WAIT_SELLER_SEND_GOODS",
          },
          {
            name: "等待买家确认收货",
            value: "WAIT_BUYER_CONFIRM_GOODS",
          },
          {
            name: "交易成功",
            value: "TRADE_FINISHED",
          },
          {
            name: "退款成功交易关闭",
            value: "TRADE_CLOSED",
          },
          {
            name: "付款前交易关闭",
            value: "TRADE_CLOSED_BY_TAOBAO",
          },
        ],
      },

      // 控制 modal
      controlModal: false,
      // modal title
      title: "添加",
      flag:false,

      // 是否是编辑
      isEdit: false,
      // 获取下单平台
      appTypeLists:[
        {
          appTypeText: "天猫",
          orderType: 0
        }
      ],
      form:{
        // 订单号
        id:'',
        // 商品名称
        goodsName:'',
        // 商品图片
        thumbPicUrl:'',
        // 商品id
        goodsId:'',
        // 手机号
        phone:'',
        // 预约门店
        appointmentHospital:'',
        // 订单状态
        statusCode:'',
        // 实付金额
        actualPayment:null,
        // 应收款
        accountReceivable:null,
        // 买家昵称
        nickName:'',
        // 下单平台
        appType:'',
        // 是否预约
        isAppointment:false,
        // 订单类型
        orderType:null,
        // 订单性质
        orderNature:null,
        // 商品数量
        quantity:null,
        // 交易类型
        exchangeType:1,
        remark:'',
        // 加密昵称
        cipherName:'',
        //  加密手机号
        cipherPhone:'',
        // 更新时间
        updateDate:'',
        // 创建时间
        createDate:'',
        // 主播
        belongLiveAnchorId:'',
        // 主播筛选
        anchor:''

      },

      ruleValidates: {
        anchor: [
          {
            required: true,
            message: "请选择主播",
          },
        ],
        belongLiveAnchorId: [
          {
            required: true,
            message: "请选择主播",
          },
        ],
        appType: [
          {
            required: true,
            message: "请选择下单平台",
          },
        ],
        id: [
          {
            required: true,
            message: "请输入订单号",
          },
        ],
        goodsName : [
          {
            required: true,
            message: "请输入商品名称",
          },
        ],
        actualPayment : [
          {
            required: true,
            message: "请输入付款金额",
          },
        ],
        accountReceivable : [
          {
            required: true,
            message: "请输入应收款",
          },
        ],
        quantity : [
          {
            required: true,
            message: "请输入购买数量",
          },
        ],
        appointmentHospital : [
          {
            required: true,
            message: "请选择预约门店",
          },
        ],
        statusCode: [
          {
            required: true,
            message: "请选择订单状态",
          },
        ],
       
      },
      // 订单状态
      statusCodeList:[
        {
          code:-1,
          name:'全部订单状态'
        },
        {
            name: "等待买家付款",
            code: "WAIT_BUYER_PAY",
          },
          {
            name: "等待卖家发货",
            code: "WAIT_SELLER_SEND_GOODS",
          },
          {
            name: "等待买家确认收货",
            code: "WAIT_BUYER_CONFIRM_GOODS",
          },
          {
            name: "交易成功",
            code: "TRADE_FINISHED",
          },
          {
            name: "退款成功交易关闭",
            code: "TRADE_CLOSED",
          },
          {
            name: "付款前交易关闭",
            code: "TRADE_CLOSED_BY_TAOBAO",
          },
      ],
      // 订单类型
      orderTypeList:[
        {
          id:-1,
          name:'全部订单类型'
        },
        {
          id:1,
          name:'虚拟订单'
        },
        {
          id:0,
          name:'实物订单'
        },
      ],
      // 主播IP
      anchorList:[],
      anchorListAll:[{id:-1,name:'全部主播'}],
      

    };
  },
  methods: {
    // 主播IP
    getWechatVideoOrderLiveAnchorId(){
      api.wechatVideoOrderLiveAnchorId().then(res=>{
        if(res.code === 0){
          const {nameList} = res.data
          this.anchorList = nameList
          this.anchorListAll = [...this.anchorListAll,...nameList]
        }
      })
    },
    //补单不能修改图片 
    imageChange(value){
      if(value==1){
        this.$Message.error('不能修改商品图片')
      }else{
        this.$Message.error('只能根据搜索订单号获取商品图片')
      }
    },
    // 获取合作过的医院列表
    getHospitalList(){
      orderApi.getHospitalList().then((res) => {
        if(res.code === 0){
          const { hospitalInfo} = res.data
          this.hospitalNameList = hospitalInfo
        }
      })
    },
    // 获取抖店列表
    getTikTokOrder() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyWord,startDate,endDate,belongLiveAnchorId,status,orderType,} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keyWord ,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        belongLiveAnchorId:belongLiveAnchorId==-1 ? null : belongLiveAnchorId,
        status:status == -1 ? null : status,
        orderType:orderType == -1 ? null : orderType,
        };
      api.WeChatVideoOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.list;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取抖店列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyWord,startDate,endDate,belongLiveAnchorId,status,orderType} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyWord ,
            startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            belongLiveAnchorId:belongLiveAnchorId==-1 ? null : belongLiveAnchorId,
            status:status == -1 ? null : status,
            orderType:orderType == -1 ? null : orderType,
            };
        api.WeChatVideoOrder(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.list;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 补单
    supplementChange(){
      const {id} = this.form
      const data =  {
        orderId:id,
        belongLiveAnchorId:this.form.anchor,
      } 
      if(!id){
        this.$Message.warning('请输入订单号')
        return
      }
      if(!this.form.anchor){
        this.$Message.warning('请选择主播')
        return
      }
      api.getByIdWeChatVideoOrder(data).then((res) => {
        if(res.code ===0){
          const {orderInfo} = res.data
          this.form.goodsName = orderInfo.goodsName
          this.form.goodsId= orderInfo.goodsId
          this.form.phone= orderInfo.phone
          this.form.statusCode= orderInfo.statusCode
          this.form.actualPayment= orderInfo.actualPayment
          this.form.accountReceivable= orderInfo.accountReceivable
          this.form.createDate= orderInfo.createDate ?  orderInfo.createDate : null
          this.form.updateDate= orderInfo.updateDate ?  orderInfo.updateDate : null
          this.form.thumbPicUrl= orderInfo.thumbPicUrl
          this.form.nickName= orderInfo.buyerNick
          this.form.orderType= orderInfo.orderType
          this.form.quantity= orderInfo.quantity
          this.form.belongLiveAnchorId= orderInfo.belongLiveAnchorId
        }
      })
    },
    // 提交
    handleSubmit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
          }else{
            const {
              id,
              goodsName,
              goodsId,
              phone,
              thumbPicUrl,
              statusCode,
              actualPayment,
              nickName,
              orderType,
              quantity,
              accountReceivable,
              updateDate,
              createDate,
              belongLiveAnchorId
            } = this.form
            const data = {
              id,
              goodsName,
              thumbPicUrl,
              goodsId,
              phone,
              statusCode,
              actualPayment,
              buyerNick:nickName,
              orderType,
              quantity,
              accountReceivable,
              updateDate,
              createDate,
              belongLiveAnchorId
            }
            this.flag = true
            api.addWeChatVideoOrder(data).then((res) => {
              if(res.code ===0 ){
                this.flag = false
                this.$Message.success('补单成功')
                this.cancelSubmit("form");
                this.getTikTokOrder()
              }else {
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }
            })
          }
        }
      })
      
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
      this.form.anchor = ''
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        this.form.anchor = ''
      }
    },
  },
  created() {
    this.getTikTokOrder();
    this.getWechatVideoOrderLiveAnchorId()
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