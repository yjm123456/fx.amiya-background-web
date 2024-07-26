<template>
  <div>
    <Card>
      <div class="container">
        <div class="content1">
          <div class="">
            <DatePicker
              type="date"
              placeholder="开始日期"
              style="width: 150px;"
              :value="query.startDate"
              v-model="query.startDate"
              transfer
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="结束日期"
              style="width: 160px; margin-left: 10px"
              :value="query.endDate"
              v-model="query.endDate"
              transfer
            ></DatePicker>
            <Input
              v-model="query.keyword"
              placeholder="请输入关键词"
              style="width:200px;margin-left: 10px"
              @keyup.enter.native="getUnSendOrderList()"
            />
            <Select
              v-model="query.contentPlateFormId"
              style="width: 180px;margin-left: 10px"
              placeholder="请选择(订单)下单平台"
              filterable
            >
              <Option
                v-for="item in query.contentPalteForms"
                :value="item.id"
                :key="item.id"
                >{{ item.contentPlatformName }}</Option
              >
            </Select>
            <Select
              v-model="query.orderStatus"
              style="width: 150px;margin-left: 10px"
              placeholder="请选择订单状态"
            >
              <Option
                v-for="item in query.statusCodeList"
                :value="item.orderStatus"
                :key="item.orderStatus"
                >{{ item.orderStatusText }}</Option
              >
            </Select>
          </div>
          <div class="bot">
            <Select
            v-model="query.contentPlatFormId"
            placeholder="请选择主播平台"
            @on-change="contentPlateChange(query.contentPlatFormId)"
            style="width: 150px;"
            filterable
          >
            <Option
              v-for="item in query.contentPalteForms"
              :value="item.id"
              :key="item.id"
              >{{ item.contentPlatformName }}</Option
            >
          </Select>
          <Select
            v-model="query.liveAnchorId"
            placeholder="请选择主播IP账号"
            style="width: 160px; margin-left: 10px"
            :disabled="query.contentPlatFormId === null"
            filterable
          >
            <Option v-for="item in liveAnchors" :value="item.id" :key="item.id">{{
              item.hostAccountName
            }}</Option>
          </Select>
            <!-- v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }" -->
          <Select
            v-model="query.employeeId"
            style="width: 200px;margin-left: 10px"
            placeholder="请选择客服"
            filterable
            :disabled="isDirector == 'false' && isCustomerService == 'true'"
          >
            <Option v-for="item in employee" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
          <!-- <Select
            v-model="query.consultationEmpId"
            placeholder="请选择面诊员"
            style="width: 180px;margin-left: 10px"
            filterable
          >
            <Option
              v-for="item in consultationNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select> -->
          <Select
            v-model="query.orderSource"
            style="width: 180px;margin-left: 10px"
            placeholder="请选择订单状态"
          >
            <Option
              v-for="item in orderSourcesListAll"
              :value="item.orderSource"
              :key="item.orderSource"
              >{{ item.orderSourceText }}</Option
            >
          </Select>
          <Select
              v-model="query.baseLiveAnchorId"
              style="width: 150px;margin-left: 10px"
              placeholder="请选择基础主播"
              filterable
              transfer
            >
              <Option
                v-for="item in liveAnchorBaseInfos"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
          </Select>
          </div>
        </div>
        <div>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getUnSendOrderList()"
            >查询</Button
          >
        </div>
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

    <Modal
      v-model="controlModal"
      title="派单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
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
        <FormItem
          label="已参与项目医院"
          prop="hospitalId"
          v-if="openAllHospital === false"
          key="已参与项目医院"
        >
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable>
            <Option v-for="item in hospital" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="主派医院"
          prop="hospitalId"
          v-if="openAllHospital === true"
          key="主派医院"
          
        >
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable>
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem
          label="次派医院"
          prop="otherHospitalId"
          key="次派医院"
          
        >
          <Select v-model="form.otherHospitalId" placeholder="请选择次派医院" filterable multiple>
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <!-- <FormItem label="未确定时间" prop="isUncertainDate" key="未确定时间">
          <i-switch v-model="form.isUncertainDate" />
        </FormItem> -->
        <FormItem label="派单人员" prop="sendBy" key="派单人员">
          <Select
            v-model="form.sendBy"
            placeholder="请选择派单人员"
            filterable
          >
            <Option v-for="item in employeeList" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="接诊咨询">
          <Input
            v-model="form.acceptConsulting"
            :placeholder="
              form.acceptConsulting ? form.acceptConsulting : '暂无咨询'
            "
            disabled
          ></Input>
          <div style="color:red">
            如需修改接诊咨询，请在内容平台订单列表修改
          </div>
        </FormItem> -->
        <!-- <FormItem
          label="预约日期"
          prop="appointmentDate"
          v-if="form.isUncertainDate === false"
        >
          <DatePicker
            type="date"
            placeholder="预约日期"
            style="width: 100%"
            v-model="form.appointmentDate"
          ></DatePicker>
        </FormItem> -->
        <FormItem label="派单留言">
          <Input
            v-model="form.remark"
            placeholder="请输入派单留言"
            type="textarea"
            :rows="5"
          ></Input>
        </FormItem>
        <Spin fix v-if="flag == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="query.doubleOrderModel"
      title="重单截图"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <!-- 预览图片 -->
      <viewer v-if="query.repeateOrderPictureUrl">
        <img :src="query.repeateOrderPictureUrl" alt="" class="img" />
      </viewer>
      <div v-else style="text-align:center">暂无图片</div>
      <div slot="footer">
        <Button @click="handleModalVisibleChange()">关闭页面</Button>
      </div>
    </Modal>
    <!-- 查看顾客照片 -->
    <viewCustomerPhotos :viewCustomerPhotosModel.sync ="viewCustomerPhotosModel" :contentPlatFormOrderId.sync ="contentPlatFormOrderId"></viewCustomerPhotos>
    <!-- 订单详情 -->
    <detail :detailModel.sync ="detailModel" :detailList ="detailList"></detail>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import viewCustomerPhotos from "@/components/viewCustomerPhotos/viewCustomerPhotos.vue"
import detail from "@/components/contentDetail/detail.vue"

export default {
  // props: ["activeName"],
  props:{
    activeName:String,
    consultationNameList:Array,
    liveAnchorBaseInfos:Array,
  },
  components: {
    viewCustomerPhotos,
    detail
  },
  data() {
    return {
      employeeId:sessionStorage.getItem('employeeId'),
      // 是否为客服
      isCustomerService:sessionStorage.getItem('isCustomerService'),
      // 是否为管理员
      isDirector:sessionStorage.getItem('isDirector'),
      detailList:[],
      detailModel:false,
      // 查看图片 
      viewCustomerPhotosModel:false,
      contentPlatFormOrderId:'',
      orderSourcesListAll: [
        { orderSource: -1, orderSourceText: "全部订单来源" },
      ],
      flag: false,
      employee: [{ name: "全部归属客服", id: -1 }],
      employeeList:[],
      query: {
        baseLiveAnchorId:-1,
        consultationEmpId:-1,
        orderSource: -1,
        columns: [
          {
            title: "订单号",
            key: "orderId",
            minWidth: 180,
            align: "center",
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 160,
            align: "center",
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "预约门店",
            key: "appointmentHospital",
            minWidth: 220,
            align: "center",
          },
          {
            title: "项目",
            key: "thumbPictureUrl",
            minWidth: 180,
            align: "center",
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
                      src: params.row.thumbPictureUrl,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },
          {
            title: "主派咨询内容",
            key: "consultingContent",
            minWidth: 400,
            tooltip:true
          },
          {
            title: "次派咨询内容",
            key: "consultingContent2",
            minWidth: 400,
            tooltip:true
          },
          {
            title: "面诊类型",
            key: "consultationTypeText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "所属平台",
            key: "contentPlatFormName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.orderStatusText == "已成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "医院重单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "已派单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "未成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "brown",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "已接单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
                    },
                  },
                  params.row.orderStatusText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.orderStatusText
                );
              }
            },
          },
          {
            title: "订单来源",
            key: "orderSourceText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "未派单原因",
            key: "unSendReason",
            minWidth: 400,
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 400,
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
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const {orderId} = params.row
                        api.byIdContentPlateForm(orderId).then((res) => {
                          if (res.code === 0) {
                            this.detailModel = true
                            const {orderInfo} = res.data;
                            this.detailList= [orderInfo]
                          }
                        })
                      },
                    },
                  },
                  "订单详情"
              ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //     },
                //     style: {
                //       marginRight: ".3125rem",
                //     },
                //     on: {
                //       click: () => {
                //         const {orderId} = params.row
                //         this.viewCustomerPhotosModel = true
                //         this.contentPlatFormOrderId = orderId
                //       },
                //     },
                //   },
                //   "查看顾客照片"
                // ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        const {
                          orderId,
                          goodsId,
                          acceptConsulting,
                        } = params.row;
                        this.form.acceptConsulting = acceptConsulting;
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
                        this.$emit(
                          "handleCustomerInfoComParams",
                          this.customerInfoComParams
                        );
                      },
                    },
                  },
                  "客户详情"
                ),
                // params.row.orderStatusText == "医院重单"
                //   ? h(
                //       "Button",
                //       {
                //         props: {
                //           type: "primary",
                //           size: "small",
                //         },
                //         style: {
                //           marginLeft: "5px",
                //         },
                //         on: {
                //           click: () => {
                //             const { orderId } = params.row;
                //             const data = {
                //               id: orderId,
                //             };
                //             api.byselectRepeateOrderPic(data).then((res) => {
                //               if (res.code === 0) {
                //                 const { repeateOrderPictureUrl } = res.data;
                //                 if (repeateOrderPictureUrl) {
                //                   this.query.repeateOrderPictureUrl = repeateOrderPictureUrl;
                //                   this.query.doubleOrderModel = true;
                //                 }
                //               }
                //             });
                //           },
                //         },
                //       },
                //       "查看重单截图"
                //     )
                //   : "",
              ]);
            },
          },
        ],
        data: [],
        keyword: "",
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        appTypeList: [
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
        ],
        orderAppTypes: [{ orderType: -1, appTypeText: "全部平台" }],
        
        appType: -1,
        contentPlateFormId: "",
        employeeId: sessionStorage.getItem('isDirector') == 'false' && sessionStorage.getItem('isCustomerService') == 'true' ? Number(sessionStorage.getItem('employeeId')): -1,
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        statusCode: "",
        orderStatus: null,
        // 订单状态
        statusCodeList: [],
        // 下单平台
        contentPalteForms: [],
        // 主播
        liveAnchors: [],
        doubleOrderModel: false,
        contentPlatFormId: null,
        liveAnchorId: null,
      },
      //   下单平台
      contentPalteForms: [],
      // ip账号
      liveAnchors: [],
      // 控制 modal
      controlModal: false,
      // 开启所有医院
      openAllHospital: false,
      form: {
        orderId: "",
        hospitalId: "",
        // 次派医院
        otherHospitalId:[],
        appointmentDate: "",
        timeType: "",
        // 备注
        remark: "",
        // 未确定时间
        isUncertainDate: false,
        acceptConsulting: "",
        // 派单人员
        sendBy:Number(sessionStorage.getItem("employeeId"))? Number(sessionStorage.getItem("employeeId")) : null
      },

      // 医院列表
      hospital: [],

      // 所有医院
      hospitalInfo: [],

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
        sendBy: [
          {
            required: true,
            message: "请选择派单人员",
          },
        ],
        hospitalId: [
          {
            type: "number",
            required: true,
            message: "请选择医院",
            trigger: "change",
          },
        ],
        appointmentDate: [
          {
            type: "date",
            required: true,
            message: "请选择预约日期",
            trigger: "change",
          },
        ],
        timeType: [
          {
            type: "number",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },

      // 客户信息组件参数
      customerInfoComParams: {
        userId: "",
        encryptPhone: "",
        controlCustomerInfoDisplay: false,
      },
    };
  },
  methods: {
    //   获取内容平台订单来源
    getcontentPlateFormOrderSourceList() {
      api.contentPlateFormOrderSourceList().then((res) => {
        if (res.code === 0) {
          const { orderSources } = res.data;
          this.orderSourcesListAll = [
            ...this.orderSourcesListAll,
            ...orderSources,
          ];
        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.query.contentPalteForms = contentPalteForms;
        }
      });
    },
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      api.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
    // 订单状态
    getContentPlateFormOrderStatusList() {
      api.contentPlateFormOrderStatusList().then((res) => {
        if (res.code === 0) {
          const { orderStatus } = res.data;
          this.query.statusCodeList = orderStatus;
        }
      });
    },
    // // 获取平台下单列表
    // getOrderPlatform(){
    //   api.getOrderPlatform().then((res) => {
    //     if(res.code === 0){
    //       const {orderAppTypes} = res.data
    //       this.query.orderAppTypes = [...this.query.orderAppTypes,...orderAppTypes]
    //     }

    //   })
    // },
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
          this.employeeList = employee
        }
      });
    },

    isAuthority() {
      let currentRole = JSON.parse(sessionStorage.getItem("permissions"))
        ? JSON.parse(sessionStorage.getItem("permissions"))
        : [];
      if (
        currentRole.includes("fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE")
      ) {
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
      const {
        keyword,
        pageNum,
        pageSize,
        appType,
        employeeId,
        orderStatus,
        contentPlateFormId,
        startDate,
        endDate,
        liveAnchorId,
        orderSource,
        consultationEmpId,
        baseLiveAnchorId
      } = this.query;
      const data = {
        keyword,
        pageNum,
        pageSize,
        contentPlateFormId,
        employeeId: this.isAuthority() ? employeeId : null,
        orderStatus,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        liveAnchorId,
        orderSource,
        consultationEmpId:consultationEmpId == -1 ? null :consultationEmpId,
        baseLiveAnchorId:baseLiveAnchorId == -1 ? '' :baseLiveAnchorId,
      };
      api.getUnContentPlatFormSendOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.unSendOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取未派单订单列表分页
    handlePageChange(pageNum) {
      const {
        keyword,
        pageSize,
        appType,
        employeeId,
        orderStatus,
        contentPlateFormId,
        startDate,
        endDate,
        liveAnchorId,
        orderSource,
        consultationEmpId,
        baseLiveAnchorId
      } = this.query;
      const data = {
        keyword,
        pageNum,
        pageSize,
        contentPlateFormId,
        employeeId: this.isAuthority() ? employeeId : null,
        orderStatus,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        liveAnchorId,
        orderSource,
        consultationEmpId:consultationEmpId == -1 ? null :consultationEmpId,
        baseLiveAnchorId:baseLiveAnchorId == -1 ? '' :baseLiveAnchorId,
      };
      api.getUnContentPlatFormSendOrderList(data).then((res) => {
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
      this.form.remark = "";
    },

    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            orderId,
            hospitalId,
            appointmentDate,
            timeType,
            remark,
            isUncertainDate,
            sendBy,
            otherHospitalId
          } = this.form;
          const data = {
            orderId,
            hospitalId,
            appointmentDate: isUncertainDate
              ? null
              : appointmentDate
              ? this.$moment(appointmentDate).format("YYYY-MM-DD")
              : null,
            // timeType:isUncertainDate ? null : (timeType ? timeType : null),
            remark,
            isUncertainDate,
            sendBy,
            otherHospitalId
          };
          
          if(otherHospitalId == [] || otherHospitalId.length == 0){
              this.flag = true;
              api.AddContentPlateFormSendOrder(data).then((res) => {
                if (res.code === 0) {
                  this.flag = false;
                  this.cancel("form");
                  this.getUnSendOrderList();
                  this.$Message.success({
                    content: "派单成功",
                    duration: 3,
                  });
                }else {
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }
              });
              return
            }else{
                for(var i = 0;i<otherHospitalId.length;i++){
                  console.log(otherHospitalId[i])
                  if(otherHospitalId[i] == hospitalId){
                    let hostpital = this.hospitalInfo.find(item=>item.id == hospitalId).name
                    this.$Message.warning( hostpital+ '已存在于主派医院中，请勿重复选择')
                   break
                  }else{
                    this.flag = true;
                    api.AddContentPlateFormSendOrder(data).then((res) => {
                      if (res.code === 0) {
                        this.flag = false;
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
                    return
                  }
                }
            }
        }
      });
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
        this.query.doubleOrderModel = false;
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
      if (!value) {
        this.form.hospitalId = "";
      }
    },
  },
  created() {
    // if (this.isAuthority()) {
    //   this.getCustomerServiceList();
    // }
    this.getHospitalInfonameList();
    // this.getOrderPlatform()
    this.getContentPlateFormOrderStatusList();
    this.getContentValidList();
    this.getcontentPlateFormOrderSourceList();
    this.getCustomerServiceList();
  },
};
</script>
<style lang="less" scoped>
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.img {
  width: 100%;
  height: auto;
}
.bot{
  margin-top: 10px;
}
.container{
  display: flex;
  align-items: center;
}
.content1{
  display: flex;
  flex-direction: column;
}
</style>
