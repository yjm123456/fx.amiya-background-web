<template>
  <div>
    <Card>
      <div>
        <Input
          v-model="query.keyword"
          placeholder="请输入关键词"
          style="width:200px;"
          @keyup.enter.native="getSendOrderInfo()"
        />
        <DatePicker
          type="date"
          placeholder="开始日期"
          style="width: 180px;margin-left: 10px"
          :value="query.startDate"
          v-model="query.startDate"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="结束日期"
          style="width: 180px; margin-left: 10px"
          :value="query.endDate"
          v-model="query.endDate"
        ></DatePicker>
        <Select
          v-model="query.appType"
          style="width: 180px;margin-left: 10px"
          placeholder="请选择下单平台"
          filterable
        >
          <Option
            v-for="item in query.orderAppTypes"
            :value="item.orderType"
            :key="item.orderType"
            >{{ item.appTypeText }}</Option
          >
        </Select>
        <Select
          v-model="query.employeeId"
          style="width: 180px;margin-left: 10px"
          v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }"
          placeholder="请选择客服"
          filterable
        >
          <Option
            v-for="item in employee"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <Select
          v-model="query.statusCode"
          style="width: 180px;margin-left: 10px"
          placeholder="请选择订单状态"
          filterable
        >
          <Option
            v-for="item in query.statusCodeList"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
        <Select
          v-model="query.hospitalIds"
          style="width: 200px;margin-left: 10px"
          placeholder="请选择医院"
          filterable
        >
          <Option
            v-for="item in hospitallist"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <Button type="primary" @click="getSendOrderInfo()" style="margin-left: 10px">查询</Button>
      </div>
      <div style="margin-top:10px">
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="pages">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handleProjectPageChange"
        />
      </div>
    </Card>

    <Modal v-model="controlModal" title="修改" :mask-closable="false" @on-visible-change="handleModalVisibleChange">
      <Form ref="form" :model="form" :rules="ruleValidate" label-position="left" :label-width="130">
        <FormItem label="打开所有医院" key="打开所有医院">
          <i-switch v-model="openAllHospital" />
        </FormItem>
        <FormItem label="已参与项目医院" :required="!openAllHospital ? true : false" prop="hospitalId" v-if="!openAllHospital" key="已参与项目医院">
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable>
            <Option v-for="item in hospital" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="所有医院" :required="openAllHospital ? true : false" prop="allHospitalId" v-if="openAllHospital" key="所有医院">
          <Select v-model="form.allHospitalId" placeholder="请选择医院" filterable>
            <Option v-for="item in hospitalInfo" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="采购单价" prop="purchaseSinglePrice" key="采购单价">
          <Input v-model="form.purchaseSinglePrice" placeholder="请输入采购单价"  type="number"></Input>
        </FormItem>
        <FormItem label="采购数量" prop="purchaseNum" key="采购数量">
          <Input 
            v-model="form.purchaseNum" 
            placeholder="请输入采购数量" 
            type="number" 
            
          ></Input>
        </FormItem>
        <FormItem label="未确定时间" prop="isUncertainDate" key="未确定时间">
          <i-switch v-model="form.isUncertainDate" />
        </FormItem>
        <FormItem label="预约日期" prop="appointmentDate" v-if="form.isUncertainDate === false"  key="预约日期">
          <DatePicker
            type="date"
            placeholder="预约日期"
            style="width: 100%"
            v-model="form.appointmentDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="时间" prop="timeType" v-if="form.isUncertainDate === false"  key="时间">
          <Select v-model="form.timeType" placeholder="请选择时间">
            <Option
              v-for="item in timeTypeList"
              :value="item.value"
              :key="item.value"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="留言" v-show="form.hospitalId || form.allHospitalId !== form.tempHospitalId">
          <Input
            v-model="form.content"
            placeholder="请输入留言"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="是否为主派医院" key="是否为主派医院">
          <i-switch v-model="form.isMainHospital" disabled/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>

    <!-- 留言板 -->
    <messageBoard @messageBoardChange = "messageBoardChange"  :messageBoardParams = "messageBoardParams"/>
    <!-- 订单详情 -->
    <detail :detailModel.sync ="detailModel" :detailList ="detailList"></detail>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import messageBoard from "@/components/messageBoard/messageBoard.vue"
import detail from "@/components/orderDetail/detail.vue"

export default {
  props: ["activeName"],
  components: {
    messageBoard,
    detail
  },
  data() {
    return {
      detailModel:false,
      detailList:[],
      employee: [{ name: "全部客服", id: -1 }],
      query: {
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        hospitalId:null,
        // 用于筛选的下拉框
        hospitalIds:0,
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
          }
        ],
        orderAppTypes:[{orderType: -1, appTypeText: "全部平台"}],
        appType:-1,
        employeeId:-1,
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            title: "派单编号",
            key: "id",
            minWidth: 100,
            align:'center',
          },
          {
            title: "订单编号",
            key: "orderId",
            minWidth: 200,
            align:'center',
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 160,
            align:'center',
          },
          {
            title: "是否为主派医院",
            key: "isMainHospital",
            minWidth: 140,
            align:'center',
            render: (h, params) => {
              if (params.row.isMainHospital == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "派单医院",
            key: "hospitalName",
            minWidth: 220,
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 150,
            align:'center',
            render: (h, params) => {
              return h("div",params.row.appointmentDate ? this.$moment(params.row.appointmentDate).format("YYYY-MM-DD") + params.row.time : params.row.time);
            },
          },
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 400,
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
            title: "订单状态",
            key: "statusText",
            minWidth: 200,
            align:'center',
          },
          {
            title: "描述",
            key: "description",
            minWidth: 200,
          },
          {
            title: "规格",
            key: "standard",
            minWidth: 100,
            align:'center',
          },
          {
            title: "采购单价",
            key: "purchaseSinglePrice",
            minWidth: 100,
            align:'center',
          },
          {
            title: "采购数量",
            key: "purchaseNum",
            minWidth: 100,
            align:'center',
          },
          {
            title: "实付款",
            key: "actualPayment",
            minWidth: 100,
            align:'center',
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 200,
            align:'center',
            render:(h,params)=> {
              const {phone, isHospitalCheckPhone} = params.row;
              return h(
                "div",{
                  style: {
                    display: "flex",
                    alignItems:"center"
                  }
                },
                [
                  h("span",{
                    style:{
                      marginRight:"10px"
                    }
                  }, phone),
                  h("span", {
                    style:{
                      color:"#2d8cf0",
                    },
                  },isHospitalCheckPhone ? '已查看' : ''),
                ]
              );
            }
          },
          {
            title: "派单人姓名",
            minWidth: 150,
            key: "sendName",
            align:'center',
          },
          {
            title: "派单时间",
            key: "sendDate",
            minWidth: 200,
            align:'center',
            render: (h, params) => {
              return h("div",this.$moment(params.row.sendDate).format("YYYY-MM-DD HH:mm:ss"));
            },
          },
          {
            title: "操作",
            width: 390,
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
                      // disabled:params.row.statusText != '交易成功'
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const {orderId} = params.row
                        api.byIdGetOrderInfo(orderId).then((res) => {
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
                    },
                    on: {
                      click: () => {
                        const { hospitalId , id} = params.row;
                        this.messageBoardParams.hospitalId = hospitalId
                        this.messageBoardParams.id = id
                        this.messageBoardParams.messageBoard = true
                      },
                    },
                  },
                  "留言板"
                ),
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
                        const { id, orderId, goodsId,isMainHospital } = params.row;
                        this.form.id = id;
                        this.form.orderId = orderId;
                        this.byGoodsIdGetpartakeItemHospitalList(goodsId,() => {
                            api.byIdGetSendOrderInfo(id).then((res) => {
                              if (res.code === 0) {
                                const {
                                  hospitalId,
                                  appointmentDate,
                                  timeType,
                                  content,
                                  isUncertainDate,
                                  purchaseNum,
                                  purchaseSiglePrice
                                } = res.data.sendOrderInfo;
                                this.form.purchaseNum = purchaseNum;
                                this.form.purchaseSinglePrice= purchaseSiglePrice;
                                // 已参与项目医院
                                const ycyxmyy = this.hospital.find(item=> item.id === hospitalId);
                                // 所有医院
                                const syyy = this.hospitalInfo.find(item=> item.id === hospitalId);
                                
                                // 如果已参与项目医院中存在要修改的医院
                                if(ycyxmyy) {
                                  this.form.hospitalId = hospitalId;
                                  this.form.tempHospitalId = hospitalId;
                                  
                                }
                                // 如果所有医院中存在要修改的医院
                                if(syyy) {
                                  this.form.allHospitalId = hospitalId;
                                  this.form.tempHospitalId = hospitalId;
                                  this.openAllHospital = true;
                                }
                                // 如果已参与项目医院中存在 且 所有医院中存在 则 优先显示已参与项目医院
                                if(ycyxmyy && syyy) {
                                  this.openAllHospital = false;
                                }
                                this.form.appointmentDate = appointmentDate;
                                this.form.timeType = timeType;
                                this.form.content = content;
                                this.form.isUncertainDate = isUncertainDate;
                                this.form.isMainHospital = isMainHospital
                                this.controlModal = true;
                              }
                            });
                          }
                        );
                      },
                    },
                  },
                  "修改"
                ),
                ,
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
                        const { userId, encryptPhone } = params.row;
                        this.customerInfoComParams.userId = userId;
                        this.customerInfoComParams.encryptPhone = encryptPhone;
                        this.customerInfoComParams.controlCustomerInfoDisplay = true;
                        this.$emit("handleCustomerInfoComParams",this.customerInfoComParams)
                      },
                    },
                  },
                  "客户详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.statusText !== '咨询订单' &&  params.row.statusText !==  '定金订单'
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "交易完成提示",
                          content: "是否确认交易完成？",
                          onOk: () => {
                            const { orderId } = params.row;
                            
                            api.transactionCompletion(orderId).then((res) => {
                              if (res.code === 0) {
                                this.getSendOrderInfo();
                                this.$Message.success({
                                  content: "已确认成功",
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
                  "交易完成"
                ),
              ]);
            },
          },
        ],
        data: [],
        statusCode:"",
        statusCodeList:[
          {
            name:"全部状态",
            value:"all"
          },
          {
            name: "买家已付款",
            value: "TRADE_BUYER_PAID",
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
          }
        ],
      },

      // 控制 modal
      controlModal: false,
      // 开启所有医院
      openAllHospital:false,
      form: {
        id:"",
        orderId: "",
        hospitalId: "",
        // 临时，用于判断修改留言板显示/隐藏
        tempHospitalId:"",
        // 所有医院中选择
        allHospitalId:"",
        appointmentDate: "",
        timeType: "",
        // 留言
        content:"",
        // 未确定时间
        isUncertainDate:false,
        // 采购数量
        purchaseNum:null,
        // 采购单价
        purchaseSinglePrice:null,
        // 是否为主派单医院
        isMainHospital:false
      },

      // 医院列表
      hospital: [],

      // 所有医院
      hospitalInfo:[],
      hospitallist:[{id:0,name:"全部医院"}],

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
            required: !this.openAllHospital ? true : false,
            message: "请选择医院",
            trigger: 'change',
          },
        ],
        allHospitalId: [
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
            required:  true,
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

      // 客户信息组件参数
      customerInfoComParams:{
        userId:"",
        encryptPhone:"",
        controlCustomerInfoDisplay:false,
      },
      // 客户信息组件参数 留言板
      messageBoardParams: {
        hospitalId: 0,
        id: 0,
        content: "",
        messageBoard:false
      },
    };
  },
  methods: {
    // 获取平台下单列表
    getOrderPlatform(){
      api.getOrderPlatform().then((res) => {
        if(res.code === 0){
          const {orderAppTypes} = res.data
          this.query.orderAppTypes = [...this.query.orderAppTypes,...orderAppTypes]
        }
      })
    },
    // 留言板
    messageBoardChange(){
      this.messageBoardParams.messageBoard = false
    },
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
        }
      });
    },
    
    isAuthority() {
      let currentRole = JSON.parse(sessionStorage.getItem("permissions")) ? JSON.parse(sessionStorage.getItem("permissions")) : [];
      if (currentRole.includes("fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE")) {
        return true;
      } else {
        return false;
      }
    },

    // 获取派单信息列表
    getSendOrderInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { startDate, endDate, keyword, pageNum, pageSize, appType, employeeId,statusCode,hospitalIds } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        pageNum,
        pageSize,
        appType:appType === -1 ? "" : appType,
        employeeId: this.isAuthority() ? employeeId : null,
        statusCode:statusCode === "all" ? null : statusCode,
        hospitalId:hospitalIds
      };
      api.sendOrderInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取派单信息列表分页
    handleProjectPageChange(pageNum) {
      const { startDate, endDate, keyword, pageSize, appType, employeeId, statusCode ,hospitalIds} = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate? this.$moment(endDate).format("YYYY-MM-DD"):null,
        keyword,
        pageNum,
        pageSize,
        appType:appType === -1 ? "" : appType,
        employeeId: this.isAuthority() ? employeeId : null,
        statusCode:statusCode === "all" ? null : statusCode,
        hospitalId:hospitalIds
      };
      api.sendOrderInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
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
          this.hospitallist = [...this.hospitallist , ...res.data.hospitalInfo]
        }
      });
    },

    // 修改
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {id, orderId, hospitalId, allHospitalId, appointmentDate, timeType, content, isUncertainDate ,purchaseNum,purchaseSinglePrice} = this.form;
          const data = {
            id,
            orderId,
            // 提交时，如果所有医院未开启则提交已参与医院中的医院，反则提交所有医院中的医院
            hospitalId:!this.openAllHospital ? hospitalId : allHospitalId,
            appointmentDate:isUncertainDate ? null : (appointmentDate ? this.$moment(appointmentDate).format("YYYY-MM-DD") : appointmentDate),
            timeType:isUncertainDate ? null : (timeType ?  timeType : null),
            content,
            isUncertainDate,
            purchaseNum : Number(purchaseNum),
            purchaseSinglePrice:Number(purchaseSinglePrice)
          }
          api.editSendOrder(data).then((res) => {
            if (res.code === 0) {
              this.cancel("form");
              this.getSendOrderInfo();
              this.$Message.success({
                content: "修改成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    // 取消
    cancel(name) {
      this.controlModal = false;
      this.$refs[name].resetFields();
      this.form.hospitalId = "";
      this.form.allHospitalId = "";
      this.form.tempHospitalId = "";
      this.form.content = "";
      this.openAllHospital = false;
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
      }
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "orderedOrderList") {
          this.getSendOrderInfo();
        }
      },
      immediate: true,
    }
  },
  created(){
    if(this.isAuthority()) {
      this.getCustomerServiceList();
    }
    this.getHospitalInfonameList();
    this.getOrderPlatform()
  }
};
</script>
<style lang="less" scoped>
.pages {
  margin-top: 16px;
  text-align: right;
}
</style>
