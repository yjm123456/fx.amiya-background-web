<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
            <DatePicker
              type="date"
              placeholder="核销日期（始）"
              style="width: 10rem;margin-left: .625rem"
              :value="query.writeOffStartDate"
              v-model="query.writeOffStartDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="核销日期（末）"
              style="width: 10rem; margin-left: .625rem"
              :value="query.writeOffEndDate"
              v-model="query.writeOffEndDate"
            ></DatePicker>
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="gettmallOrderFinishLlistWithPage()"
          />
          <Select
            v-model="query.appType"
            style="width: 200px;margin-left: 10px"
            placeholder="请选择下单平台"
          >
            <Option
              v-for="item in query.orderAppTypes"
              :value="item.orderType"
              :key="item.orderType"
              >{{ item.appTypeText }}</Option
            >
          </Select>
            <Select
              v-model="query.orderNature"
              placeholder="请选择订单性质"
              style="width: 10rem;margin-left: .625rem"
            >
              <Option
                v-for="item in orderNatureList"
                :value="item.orderNature"
                :key="item.orderNature"
                >{{ item.orderNatureText }}</Option
              >
            </Select>
            <Select
              v-model="query.checkState"
              placeholder="审核状态"
              style="width: 140px; margin-left: 10px"
            >
              <Option
                v-for="item in checkStateListAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.ReturnBackPriceState"
              placeholder="回款状态"
              style="width: 140px; margin-left: 10px"
            >
              <Option
                v-for="item in query.ReturnBackPriceStateList"
                :value="item.status"
                :key="item.status"
                >{{ item.name }}</Option
              >
            </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="gettmallOrderFinishLlistWithPage()"
            >查询</Button
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
    <Modal v-model="controlModal" title="分配医院" :mask-closable="false" @on-visible-change="handleModalVisibleChange">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="打开所有医院" key="打开所有医院">
          <i-switch v-model="openAllHospital" />
        </FormItem>
        <FormItem label="已参与项目医院" prop="hospitalId" v-if="openAllHospital === false" key="已参与项目医院">
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable>
            <Option v-for="item in hospital" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="所有医院" prop="hospitalId" v-if="openAllHospital === true" key="所有医院">
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable>
            <Option v-for="item in hospitalInfo" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="采购单价" prop="purchaseSinglePrice">
          <Input v-model="form.purchaseSinglePrice" placeholder="请输入采购单价"  type="number"></Input>
        </FormItem>
        <FormItem label="采购数量" prop="purchaseNum">
          <Input 
            v-model="form.purchaseNum" 
            placeholder="请输入采购数量" 
            type="number" 
            
          ></Input>
        </FormItem>
        <FormItem label="未确定时间" prop="isUncertainDate" key="未确定时间">
          <i-switch v-model="form.isUncertainDate" @on-change="unTime"/>
        </FormItem>
        <FormItem label="预约日期" prop="appointmentDate" v-if="form.isUncertainDate === false">
          <DatePicker
            type="date"
            placeholder="预约日期"
            style="width: 100%"
            v-model="form.appointmentDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="时间" prop="timeType" v-if="form.isUncertainDate === false">
          <Select v-model="form.timeType" placeholder="请选择时间">
            <Option
              v-for="item in timeTypeList"
              :value="item.value"
              :key="item.value"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="留言">
          <Input
            v-model="form.content"
            placeholder="请输入留言"
            type="textarea"
          ></Input>
        </FormItem>
        <Spin fix v-if="flag == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 审核 -->
    <toExamine :toExamineModel.sync="toExamineModel" @handleRefreshPageChange="gettmallOrderFinishLlistWithPage" :itemInfo="itemInfo"></toExamine>
    <!-- 查看审核图片 -->
    <viewPic :viewPicModel.sync ="viewPicModel" :viewPicList ="viewPicList"></viewPic>
    <!-- 回款 -->
    <paymentCollection :paymentCollectionModel.sync ="paymentCollectionModel" :paymentCollectionObj="paymentCollectionObj" @hanPaymentChange="gettmallOrderFinishLlistWithPage"></paymentCollection>
    <!-- 订单详情 -->
    <detail :detailModel.sync ="detailModel" :detailList ="detailList"></detail>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import * as OrderCheckPictureApi from "@/api/OrderCheckPicture.js";
import toExamine from "./components/toExamine.vue"
import viewPic from "@/components/viewPic/viewPic"
import detail from "@/components/orderDetail/detail.vue"
import paymentCollection from "@/components/paymentCollection/paymentCollection"

export default {
  components:{
    toExamine,
    viewPic,
    paymentCollection,
    detail
  },
  props: {
    activeName:String,
    checkStateListAll:Array,
  },
  data() {
    return {
      detailModel:false,
      detailList:[],
      // 回款 传给子组件的值
      paymentCollectionObj:{
        orderId	:'',
        returnBackPrice:null
      },
      paymentCollectionModel:false,
      viewPicList:[],
      viewPicModel:false,
      itemInfo:{},
      toExamineModel:false,
      flag:false,
      query: {
        checkState:-1,
        ReturnBackPriceState:'-1',
        ReturnBackPriceStateList:[
            {
              status:'-1',
              name:'全部回款状态'
            },
            {
              status:'true',
              name:'已回款'
            },
            {
              status:'false',
              name:'未回款'
            }
          ],
        orderAppTypes:[{orderType: -1, appTypeText: "全部平台"}],
        writeOffStartDate:'',
        writeOffEndDate:'',
        keyword: "",
        appType:null,
        orderNature:null,
        pageNum: 1,
        pageSize: 10,
        showDirection:1,
        columns: [
          {
            title: "订单号",
            key: "id",
            minWidth: 190,
            align:'center'
          },
          {
            title: "核销时间",
            key: "writeOffDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return params.row.writeOffDate ? h("div",this.$moment(params.row.writeOffDate).format("YYYY-MM-DD HH:mm:ss")) : '';
            },
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 100,
            align:'center'
          },
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 300,
            align:'center',
            render: (h, params) => {
              return h("viewer",{
                  props: {
                    zoomable: false,
                  },
                  style:{
                    display:'flex'
                  }
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
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
            minWidth: 100,
            align:'center'
          },
          {
            title: "订单状态",
            key: "statusText",
            minWidth: 100,
            align:'center'
          },
          {
            title: "订单性质",
            key: "orderNatureText",
            minWidth: 100,
            align:'center'
          },
          {
            title: "派单门店",
            key: "sendOrderHospital",
            minWidth: 220,
            align:'center'
          },
          {
            title: "联系电话",
            key: "phone",
            minWidth: 120,
            align:'center'
          },
          {
            title: "订单状态",
            key: "statusText",
            minWidth: 100,
            align:'center'
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return params.row.checkDate ? h("div",this.$moment(params.row.checkDate).format("YYYY-MM-DD HH:mm:ss")) : '';
            },
          },
          {
            title: "审核状态",
            key: "checkState",
            minWidth: 120,
            align:'center',
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
            title: "对账金额",
            key: "checkPrice",
            minWidth: 100,
            align:'center'
          },
          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 120,
            align:'center'
          },
          {
            title: "审核人",
            key: "checkByEmpName",
            minWidth: 100,
            align:'center'
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 200,
            align:'center'
          },
          
          {
            title: "是否回款",
            key: "isReturnBackPrice",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if (params.row.isReturnBackPrice == true) {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              } else if (params.row.isReturnBackPrice == false) {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              }else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              }
            },
          },
          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 100,
            align:'center'
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 110,
            align:'center',
            render: (h, params) => {
              return params.row.returnBackDate ? h("div",this.$moment(params.row.returnBackDate).format("YYYY-MM-DD ")) : '';
            },
          },
          {
            title: "操作",
            width: 400,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              const currentRole = JSON.parse(
                sessionStorage.getItem("permissions")
              );
              // 审核按钮权限
              const isFlag = currentRole.some((ele) => {
                return "fx.amiya.permission.CHECK_ORDER_INFO".includes(
                  ele
                );
              });
              // 回款按钮权限
              const isPayment = currentRole.some((ele) => {
                return "fx.amiya.permission.RETURN_BACK_PRICE".includes(
                  ele
                );
              });
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // disabled:params.row.statusText != '交易成功'
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const {id} = params.row
                        api.byIdGetOrderInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.detailModel = true
                            const {order} = res.data;
                            this.detailList= [order]
                          }
                        })
                      },
                    },
                  },
                  "订单详情"
              ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.sendOrderHospital != null
                      
                    },
                    on: {
                      click: () => {
                        const { id, goodsId } = params.row;
                        this.form.orderId = id;
                        this.byGoodsIdGetpartakeItemHospitalList(
                          goodsId,
                          () => {
                            this.controlModal = true;
                          }
                        );
                      },
                    },
                  },
                  "分配医院"
                ),
                isFlag ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // 1管理员 16研发 13财务
                      disabled: params.row.checkState =='审核通过' || params.row.sendOrderHospital == null,
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const {id} = params.row
                        this.toExamineModel = true
                        this.itemInfo = params.row
                      },
                    },
                  },
                  "审核"
                ): null,
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
                        const data = {
                          OrderId:id,
                          OrderFrom:1,
                          pageNum:1,
                          pageSize:10
                        }
                        OrderCheckPictureApi.OrderCheckPicture(data).then((res) => {
                          if (res.code === 0) {
                            const { list } = res.data.orderCheckPictureInfo;
                            this.viewPicList = list;
                            if(this.viewPicList.length>0){
                              this.viewPicModel = true
                            }else{
                              this.$Message.warning('暂无审核图片')
                            }
                          }
                        });
                      },
                    },
                  },
                  "查看审核图片"
                ),
                isPayment ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.checkState !=='审核通过' || params.row.isReturnBackPrice == true,
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { id,settlePrice } = params.row;
                        this.paymentCollectionModel = true
                        this.paymentCollectionObj = {
                          orderId:id,
                          returnBackPrice:settlePrice,
                          type:'order'
                        }
                      },
                    },
                  },
                  "回款"
                ):null,
              ]);
            },
          },
          
        ],
        data: [],
        totalCount: 0,
      },
      // 开启所有医院
      openAllHospital:false,
      // 订单性质
      orderNatureList:[],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        orderId: "",
        hospitalId: "",
        appointmentDate: "",
        timeType: "",
        // 留言
        content:"",
        // 未确定时间
        isUncertainDate:false,
        // 采购数量
        purchaseNum:null,
        // 采购单价
        purchaseSinglePrice:null
      },

      // 医院列表
      hospital: [],

      // 所有医院
      hospitalInfo:[],

      // 时间类型
      timeTypeList: [
        {
          name: "上午",
          value: 1,
        },
        {
          name: "下午",
          value: 2,
        },
      ],

      ruleValidate: {
        hospitalId: [
          {
            type: 'number',
            required: true,
            message: "请选择医院",
            trigger: 'change',
          },
        ],
        appointmentDate: [
          {
            type: 'date',
            required: true,
            message: "请选择预约日期",
            trigger: 'change',
          },
        ],
        timeType: [
          {
            type: 'number',
            required: true,
            message: "请选择时间",
            trigger: 'change',
          },
        ],
        purchaseSinglePrice : [
          {
            required: true,
            message: '请输入采购单价', 
          },
          {
            required: true,
            pattern:/^\+?((0|([1-9]+\d*))|((0\.\d+)|([1-9]+\d*\.\d+)))$/,
            message: "采购单价不能为负数",
          },
          {
            required: true,
            pattern:/^(([0-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
            message: "采购单价小数点后只能输入两位数字",
          },
        ],
        purchaseNum : [
          {
            required: true,
            message: '请输入采购数量',
          },
          {
            required: true,
            pattern:/^\+?((0|([1-9]+\d*))|((0\.\d+)|([1-9]+\d*\.\d+)))$/,
            message: "采购数量不能为负数",
          },
          { 
            message: '采购数量只能是整数', 
            pattern:/^[0-9]\d*$/,
            required: true,
          },
        ]
      },
    };
  },
  methods: {
    unTime(){
      if(this.form.isUncertainDate === true){
        this.form.appointmentDate = ''
        this.form.timeType = null
      }
    },
    // 根据商品编号获取参与项目的医院名称列表
    byGoodsIdGetpartakeItemHospitalList(goodsId, callback) {
      api.byGoodsIdGetpartakeItemHospitalList(goodsId).then((res) => {
        if (res.code === 0) {
          const { hospital } = res.data;
          this.hospital = hospital;
          callback && callback();
        }
      });
    },

    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
        }
      });
    },
    // 获取平台下单列表
    getOrderPlatform(){
      api.getOrderPlatform().then((res) => {
        if(res.code === 0){
          const {orderAppTypes} = res.data
          this.query.orderAppTypes = [...this.query.orderAppTypes,...orderAppTypes]
        }
        
      })
    },
    //获取订单性质
    getorderNatureList(data){
      api.getorderNatureList().then((res) => {
        if(res.code === 0){
          const { orderNatureList} = res.data
          this.orderNatureList = orderNatureList
        }
      })
    },

   // 获取内容平台已成交列表
    gettmallOrderFinishLlistWithPage() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,writeOffStartDate,writeOffEndDate,appType,orderNature,checkState,ReturnBackPriceState} = this.query;
      const data = { 
          pageNum, 
          pageSize ,
          keyword ,
          writeOffStartDate: writeOffStartDate ? this.$moment(writeOffStartDate).format("YYYY-MM-DD") : "",
          writeOffEndDate: writeOffEndDate ? this.$moment(writeOffEndDate).format("YYYY-MM-DD") : "",
          appType,
          orderNature,
          checkState: checkState == -1 ? null : checkState,
          ReturnBackPriceState:ReturnBackPriceState=='-1' ? null : ReturnBackPriceState
        };
      api.tmallOrderFinishLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取内容平台已成交列表分页
    handlePageChange(pageNum) {
      const { pageSize ,keyword,writeOffStartDate,writeOffEndDate,appType,orderNature,checkState,ReturnBackPriceState} = this.query;
      const data = { 
          pageNum, 
          pageSize ,
          keyword ,
          writeOffStartDate: writeOffStartDate ? this.$moment(writeOffStartDate).format("YYYY-MM-DD") : "",
          writeOffEndDate: writeOffEndDate ? this.$moment(writeOffEndDate).format("YYYY-MM-DD") : "",
          appType,
          orderNature,
          checkState: checkState == -1 ? null : checkState,
          ReturnBackPriceState:ReturnBackPriceState=='-1' ? null : ReturnBackPriceState
        };
        api.tmallOrderFinishLlistWithPage(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.order;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },

    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {orderId, hospitalId, appointmentDate, timeType, content, isUncertainDate ,purchaseNum ,purchaseSinglePrice} = this.form;
          const data = {
            orderId,
            hospitalId,
            appointmentDate:isUncertainDate ? null : (appointmentDate ? this.$moment(appointmentDate).format("YYYY-MM-DD") : null),
            timeType:isUncertainDate ? null : (timeType ? timeType : null),
            content,
            isUncertainDate,
            purchaseNum :Number(purchaseNum),
            purchaseSinglePrice : Number(purchaseSinglePrice)
          }
          this.flag = true
          api.DistributeToHospital(data).then((res) => {
            if (res.code === 0) {
              this.flag = false
              this.controlModal =false;
              this.gettmallOrderFinishLlistWithPage();
              this.cancelSubmit("form");
              this.$Message.success({
                content: "派单成功",
                duration: 3,
              });
            }else{
               setTimeout(() => {
                this.flag = false;
              }, 3000);
            }
          });
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.openAllHospital = false;
      this.controlModal =false;
      this.$refs[name].resetFields();
      this.form.content = "";
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
    this.getorderNatureList()
    this.getOrderPlatform()
    this.getHospitalInfonameList()
  },
  watch:{
    activeName: {
      handler(value) {
        if (value == "singlePlatformCompleted") {
          this.gettmallOrderFinishLlistWithPage();
          
        }
      },
      immediate: true,
    },
  }
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
</style>
