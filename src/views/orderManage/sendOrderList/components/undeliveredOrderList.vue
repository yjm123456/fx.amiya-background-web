<template>
  <div>
    <Card>
      <div>
        <Input
          v-model="query.keyword"
          placeholder="请输入关键词"
          style="width:200px;"
          @keyup.enter.native="getUnSendOrderList()"
        />
        <Select
          v-model="query.appType"
          style="width: 200px;margin-left: 10px"
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
          style="width: 200px;margin-left: 10px"
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
          style="width: 200px;margin-left: 10px"
          placeholder="请选择订单状态"
        >
          <Option
            v-for="item in query.statusCodeList"
            :value="item.value"
            :key="item.value"
            >{{ item.name }}</Option
          >
        </Select>
        <Button type="primary" style="margin-left: 10px" @click="getUnSendOrderList()">查询</Button>
      </div>
      <div style="margin-top:10px">
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

    <Modal v-model="controlModal" title="派单" :mask-closable="false" @on-visible-change="handleModalVisibleChange">
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
          <i-switch v-model="form.isUncertainDate" />
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
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
     <!-- 订单详情 -->
    <detail :detailModel.sync ="detailModel" :detailList ="detailList"></detail>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import detail from "@/components/orderDetail/detail.vue"

export default {
  props: ["activeName"],
  components: {
    detail
  },
  data() {
    return {
      detailList:[],
      detailModel:false,
      flag:false,
      employee: [{ name: "全部客服", id: -1 }],
      query: {
        columns: [
          {
            title: "订单号",
            key: "orderId",
            minWidth: 200,
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 160,
          },
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 400,
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
            minWidth: 200,
          },
          {
            title: "订单状态",
            key: "statusText",
            minWidth: 200,
          },
          {
            title: "预约门店",
            key: "appointmentHospital",
            minWidth: 220,
          },
          {
            title: "描述",
            key: "description",
            minWidth: 200,
          },
          {
            title: "联系电话",
            key: "phone",
            minWidth: 200,
          },
          {
            title: "操作",
            width: 250,
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
                        const { orderId, goodsId } = params.row;
                        this.form.orderId = orderId;
                        this.byGoodsIdGetpartakeItemHospitalList(
                          goodsId,
                          () => {
                            this.controlModal = true;
                          }
                        );
                      },
                    },
                  },
                  "派单"
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
                        const { userId, encryptPhone } = params.row;
                        this.customerInfoComParams.userId = userId;
                        this.customerInfoComParams.encryptPhone = encryptPhone;
                        this.customerInfoComParams.controlCustomerInfoDisplay = true;
                        this.$emit("handleCustomerInfoComParams",this.customerInfoComParams)
                      },
                    },
                  },
                  "客户详情"
                )
              ]);
            },
          }
        ],
        data: [],
        keyword: "",
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
        statusCode:"",
        statusCodeList:[
          {
            name:"全部状态",
            value:"all"
          },
          {
            name:"等待卖家发货",
            value:"WAIT_SELLER_SEND_GOODS"
          },
          {
            name:"等待买家确认收货",
            value:"WAIT_BUYER_CONFIRM_GOODS"
          }
        ],
      },

      // 控制 modal
      controlModal: false,
      // 开启所有医院
      openAllHospital:false,
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

      // 客户信息组件参数
      customerInfoComParams:{
        userId:"",
        encryptPhone:"",
        controlCustomerInfoDisplay:false,
      }
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

    // 获取未派单订单列表
    getUnSendOrderList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize,appType,employeeId,statusCode } = this.query;
      const data = { keyword, pageNum, pageSize ,appType:appType === -1 ? "" : appType,employeeId: this.isAuthority() ? employeeId : null, statusCode:statusCode === "all" ? null : statusCode};
      api.unSendOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.unSendOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取未派单订单列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize,appType,employeeId,statusCode } = this.query;
      const data = { keyword, pageNum, pageSize, appType:appType === -1 ? "" : appType,employeeId: this.isAuthority() ? employeeId : null, statusCode:statusCode === "all" ? null : statusCode};
      api.unSendOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.unSendOrder;
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
        }
      });
    },

    cancel(name) {
      this.controlModal = false;
      this.openAllHospital = false;
      this.$refs[name].resetFields();
      this.form.content = "";
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
          api.sendOrder(data).then((res) => {
            if (res.code === 0) {
              this.flag = false
              this.cancel("form");
              this.getUnSendOrderList();
              this.$Message.success({
                content: "派单成功",
                duration: 3,
              });
            } else {
              setTimeout(() => {
                this.flag = false;
              }, 3000);
            }
          });
        }
      });
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
        if (value === "undeliveredOrderList") {
          this.getUnSendOrderList();
        }
      },
      immediate: true,
    },
    // 监听关闭所有医院清空已选择
    openAllHospital(value) {
      if(!value) {
        this.form.hospitalId = ""
      }
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
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
