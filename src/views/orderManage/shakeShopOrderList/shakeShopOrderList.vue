<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          
          <DatePicker
            type="date"
            placeholder="下单开始日期"
            style="width: 180px;"
            :value="query.startDate"
            v-model="query.startDate"
        ></DatePicker>
        <DatePicker
            type="date"
            placeholder="下单结束日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
        ></DatePicker>
        <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getTikTokOrder()"
          />
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
        <!-- <Col span="8">
          <FormItem label="下单平台" prop="appType">
            <Select
              v-model="form.appType"
              placeholder="请选择下单平台"
            >
              <Option
                v-for="item in appTypeLists"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.appTypeText }}</Option
              >
            </Select>
           
          </FormItem>
        </Col> -->
        <Col span="8">
          <FormItem label="订单号" prop="id">
            <Input v-model="form.id" placeholder="请输入订单号"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="主播" prop="belongLiveAnchorId">
            <Select
              v-model="form.belongLiveAnchorId"
              placeholder="请选择主播"
              filterable
            >
              <Option
                v-for="item in liveAnchorBaseInfoValidList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <Button type="primary" style="margin-left: .625rem" @click="supplementChange">搜索</Button>
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
      </Row> 
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确认补单</Button>
      </div>
    </Modal>
    <!-- 用户信息解密 -->
    <userMessage :userMessageModel.sync="userMessageModel" :userMessageParams="userMessageParams" @getTikTokOrder="getTikTokOrder"/>
  </div>
</template>
<script>
import * as api from "@/api/tikTokOrder";
import * as orderApi from "@/api/orderManage";
import * as anchorApi from "@/api/liveAnchorBaseInfo";
import userMessage from "./components/userMessageDecrypt.vue"
export default {
  components:{
    userMessage
  },
  data() {
    return {
      // 查询
      query: {
        startDate:'',
        endDate:'',
        keyword: "",
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
            minWidth: 300,
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
            title: "客户昵称",
            key: "nickName",
            minWidth: 140,
            align:'center',
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 150,
            align:'center',
          },
          
          {
            title: "实付款",
            key: "actualPayment",
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
            title: "订单状态",
            key: "statusText",
            minWidth: 180,
            align:'center',
          },

          {
            title: "平台类型",
            key: "appTypeText",
            minWidth: 120,
            align:'center',
          },

          {
            title: "订单类型",
            key: "orderTypeText",
            minWidth: 160,
            align:'center',
          },

          {
            title: "交易类型",
            key: "exchangeTypeText",
            minWidth: 120,
            align:'center',
          },
          {
            title: "描述",
            key: "description",
            minWidth: 180,
          },
        
          
          {
            title: "操作",
            key: "",
            width: 150,
            fixed: "right",
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
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.userMessageParams.orderid=id
                        this.userMessageModel = true
                        // this.$Modal.confirm({
                        //   title: "用户信息解密提示",
                        //   content: "是否确认用户信息解密？",
                        //   onOk: () => {
                        //     const { id } = params.row;
                        //     const data = {
                        //         orderid:id
                        //     }
                        //     api.decryptUserInfo(data).then((res) => {
                        //       if (res.code === 0) {
                        //         this.getTikTokOrder();
                        //         this.$Message.success({
                        //           content: "用户信息解密成功",
                        //           duration: 3,
                        //         });
                        //       }
                        //     });
                        //   },
                        //   onCancel: () => {},
                        // });
                      },
                    },
                  },
                  "用户信息解密"
                ),
              ]);
            },
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
            name: "退款成功后交易自动关闭",
            value: "TRADE_CLOSED",
          },
          {
            name: "付款以前卖家或买家主动关闭交易",
            value: "TRADE_CLOSED_BY_TAOBAO",
          },
          {
            name: "买家已签收,货到付款专用",
            value: "TRADE_BUYER_SIGNED",
          },
          {
            name: "退款",
            value: "REFUNDING",
          }
        ],
      },

      // 控制 modal
      controlModal: false,
      userMessageModel:false,
      // 用户信息解密 传给子组件的值
      userMessageParams:{
        orderid:'',
        belongLiveAnchor:[]
      },
      // modal title
      title: "添加",

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
        belongLiveAnchorId:''

      },

      ruleValidates: {
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
      // 获取有效的医院列表
      hospitalNameList:[],
      // 主播
      liveAnchorBaseInfoValidList:[],
    };
  },
  methods: {
    // 获取主播（下拉框）
    getLiveAnchorBaseInfoValidList(){
      anchorApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const { liveAnchorBaseInfos } = res.data;
          this.liveAnchorBaseInfoValidList = liveAnchorBaseInfos;
          this.userMessageParams.belongLiveAnchor = liveAnchorBaseInfos
        }
      });
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
      const { pageNum, pageSize ,keyword,startDate,endDate} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keyword ,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        };
      api.tikTokOrderLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取抖店列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,startDate,endDate} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyword ,
            startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            };
        api.tikTokOrderLlistWithPage(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.order;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 补单
    supplementChange(){
      const {id,belongLiveAnchorId} = this.form
      const data =  {
        orderId:id,
        belongLiveAnchorId:belongLiveAnchorId
      } 
      api.repairOrder(data).then((res) => {
        if(res.code ===0){
          const {orderData} = res.data
          this.form.goodsName = orderData.goodsName
          this.form.thumbPicUrl= orderData.thumbPicUrl
          this.form.goodsId= orderData.goodsId
          this.form.phone= orderData.phone
          this.form.appointmentHospital= orderData.appointmentHospital
          this.form.statusCode= orderData.statusCode
          this.form.actualPayment= orderData.actualPayment
          this.form.nickName= orderData.nickName
          this.form.isAppointment= orderData.isAppointment
          this.form.orderType= orderData.orderType
          this.form.orderNature= orderData.orderNature
          this.form.quantity= orderData.quantity
          this.form.accountReceivable = orderData.accountReceivable
          this.form.exchangeType= 1
          this.form.cipherName = orderData.cipherName
          this.form.cipherPhone = orderData.cipherPhone
          this.form.updateDate = orderData.updateDate
          this.form.createDate = orderData.createDate


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
              thumbPicUrl,
              goodsId,
              phone,
              appointmentHospital,
              statusCode,
              actualPayment,
              nickName,
              appType,
              isAppointment,
              orderType,
              orderNature,
              quantity,
              exchangeType,
              remark,
              accountReceivable,
              cipherName,
              cipherPhone,
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
              appointmentHospital,
              statusCode,
              actualPayment,
              nickName,
              appType,
              isAppointment,
              orderType,
              orderNature,
              quantity,
              exchangeType,
              remark,
              accountReceivable,
              cipherName,
              cipherPhone,
              updateDate,
              createDate,
              belongLiveAnchorId
            }
            api.AddOrder(data).then((res) => {
              if(res.code ===0 ){
                this.$Message.success('补单成功')
                this.cancelSubmit("form");
                this.getTikTokOrder()
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
    this.getTikTokOrder();
    this.getHospitalList()
    this.getLiveAnchorBaseInfoValidList()
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