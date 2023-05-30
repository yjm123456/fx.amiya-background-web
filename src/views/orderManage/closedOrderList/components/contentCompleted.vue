<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <div>
            <DatePicker
              type="date"
              placeholder="成交日期（始）"
              style="width: 180px;"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="成交日期（末）"
              style="width: 180px; margin-left: .625rem"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
            <Input
              v-model="query.keyword"
              placeholder="请输入关键字"
              style="width: 180px; margin-left: 10px"
              @keyup.enter.native="getcontentPlateFormOrderDealLlistWithPage()"
            />
            <Select
              v-model="query.contentPlateFormId"
              placeholder="请选择(订单)下单平台"
              style="width: 180px;margin-left: .625rem"
              filterable
            >
              <Option
                v-for="item in contentPalteForms"
                :value="item.id"
                :key="item.id"
                >{{ item.contentPlatformName }}</Option
              >
            </Select>
            <!-- <Select
              v-model="query.consultationEmpId"
              placeholder="请选择面诊员"
              style="width: 130px; margin-left: 10px"
              filterable
            >
              <Option
                v-for="item in consultationNameListAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select> -->
            <Select
              v-model="query.toHospitalType"
              placeholder="请选择到院类型"
              clearable
              style="width: 200px; margin-left: 10px"
              filterable
            >
              <Option
                v-for="item in toHospitalTypeList"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select>
          </div>
          <div style="margin-top:10px">
            <Select
              v-model="query.checkState"
              placeholder="审核状态"
              style="width: 180px;"
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
              style="width: 180px; margin-left: 10px"
            >
              <Option
                v-for="item in query.ReturnBackPriceStateList"
                :value="item.status"
                :key="item.status"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.contentPlatFormId"
              placeholder="请选择主播平台"
              @on-change="contentPlateChange(query.contentPlatFormId)"
              style="width: 180px; margin-left: 10px"
              filterable
            >
              <Option
                v-for="item in contentPalteForms"
                :value="item.id"
                :key="item.id"
                >{{ item.contentPlatformName }}</Option
              >
            </Select>
            <Select
              v-model="query.liveAnchorId"
              placeholder="请选择主播IP账号"
              style="width: 180px; margin-left: 10px"
              :disabled="query.contentPlatFormId === null"
              filterable
            >
              <Option
                v-for="item in liveAnchors"
                :value="item.id"
                :key="item.id"
                >{{ item.hostAccountName }}</Option
              >
            </Select>
            
            <Select
              v-model="query.hospitalId"
              style="width: 220px; margin-left: 10px"
              placeholder="请选择医院"
              filterable
            >
              <Option
                v-for="item in query.hospitalList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            
          </div>
          
        </div>
        <div class="right">
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getcontentPlateFormOrderDealLlistWithPage()"
            >查询</Button
          >
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
      title="审核"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="审核状态" prop="checkState">
          <Select v-model="form.checkState" placeholder="审核状态">
            <Option
              v-for="item in checkStateArr"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="对账金额" prop="checkPrice">
          <Input
            v-model="form.checkPrice"
            placeholder="请输入对账金额"
            type="number"
            number
          />
        </FormItem>
        <FormItem label="服务费合计" prop="settlePrice">
          <Input
            v-model="form.settlePrice"
            placeholder="请输入服务费合计"
            type="number"
            number
          />
        </FormItem>
        <FormItem label="审核图片" prop="checkPicture" key="checkPicture">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <FormItem label="审核备注" prop="checkRemark">
          <Input v-model="form.checkRemark" type="textarea" :rows="3"></Input>
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
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 查看审核图片 -->
    <viewPic :viewPicModel.sync ="viewPicModel" :viewPicList ="viewPicList"></viewPic>
    <!-- 回款 -->
    <paymentCollection :paymentCollectionModel.sync ="paymentCollectionModel" :paymentCollectionObj="paymentCollectionObj" @hanPaymentChange="getcontentPlateFormOrderDealLlistWithPage"></paymentCollection>
    <!-- 订单详情 -->
    <detail :detailModel.sync ="detailModel" :detailList ="detailList"></detail>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";

import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as OrderCheckPictureApi from "@/api/OrderCheckPicture.js";
import * as empApi from "@/api/employeeManage";
import upload from "@/components/upload/upload";
import viewPic from "@/components/viewPic/viewPic"
import paymentCollection from "@/components/paymentCollection/paymentCollection"
import detail from "@/components/contentDetail/detail.vue"

export default {
  components: {
    upload,
    viewPic,
    paymentCollection,
    detail
  },
  props:{
    activeName:String,
    checkStateListAll:Array,
  },
  data() {
    return {
      // 到院状态
      toHospitalTypeList:[{orderType:-1,orderTypeText:'全部到院类型'}],
      detailList:[],
      detailModel:false,
      // 回款 传给子组件的值
      paymentCollectionObj:{
        orderId	:'',
        returnBackPrice:null
      },
      paymentCollectionModel:false,
      viewPicList:[],
      viewPicModel:false,
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 2,
        // 文件列表
        uploadList: [],
      },
      // 面诊员
      consultationNameListAll:[{id:-1,name:'全部面诊员'}],
      flag:false,
      // 审核状态 审核成功/审核失败
      checkStateArr: [
        { id: 2, name: "审核通过" },
        { id: 1, name: "审核不通过" },
      ],
      //   下单平台
      contentPalteForms: [],
      //   审核状态
      checkStateList: [],
      query: {
        toHospitalType:-1,
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
        consultationEmpId:-1,
        contentPlatFormId: null,
        liveAnchorId: null,
        hospitalId: "",
        hospitalList: [{ id: -1, name: "全部医院" }],
        
        startDate: "",
        endDate: "",
        contentPlateFormId: "",
        keyword: "",
        checkState: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "订单号",
            key: "id",
            minWidth: 180,
            align:'center'
          },
          
          {
            title: "定金金额",
            key: "depositAmount",
            minWidth: 120,
            align:'center'
          },
          {
            title: "成交金额",
            key: "dealAmount",
            minWidth: 120,
            align:'center'
          },
          {
            title: "成交时间",
            key: "sendDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return params.row.checkDate
                ? h(
                    "div",
                    this.$moment(params.row.checkDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "对账金额",
            key: "checkPrice",
            minWidth: 120,
            align:'center'
          },

          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 120,
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
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //       params.row.isReturnBackPrice == true ? '已回款':'未回款'
          //     );
          //   },
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
            minWidth: 120,
            align:'center'
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 110,
            align:'center',
            render: (h, params) => {
              return params.row.returnBackDate
                ? h(
                    "div",
                    this.$moment(params.row.returnBackDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          //   {
          //     title: "预约时间",
          //     key: "appointmentDate",
          //     minWidth: 140,
          //     render: (h, params) => {
          //       return h("div",params.row.appointmentDate == '未预约时间' ? '未预约时间':this.$moment(params.row.appointmentDate).format("YYYY-MM-DD"));
          //     },
          //   },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 160,
            align:'center'
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 140,
            align:'center'
          },
          {
            title: "预约医院",
            key: "appointmentHospitalName",
            minWidth: 220,
            align:'center'
          },
          // {
          //   title: "面诊员",
          //   key: "consultationEmpName",
          //   minWidth: 120,
          //   align:'center'
          // },
          {
            title: "项目",
            key: "thumbPictureUrl",
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
                      src: params.row.thumbPictureUrl,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },
          {
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 300,
            tooltip: true
          },
          {
            title: "面诊类型",
            key: "consultationTypeText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "下单时间",
            key: "createDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "下单平台",
            key: "contentPlatformName",
            minWidth: 100,
            align:'center'
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 130,
            align:'center'
          },
          {
            title: "主播微信号",
            key: "liveAnchorWeChatNo",
            minWidth: 160,
            align:'center'
          },
          {
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 120,
            align:'center'
          },
          {
            title: "是否陪诊",
            minWidth: 100,
            key: "isAcompanying",
            align:'center',
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isAcompanying,
                    size: "default",
                    disabled:
                      params.row.isAcompanying === true || params.row.isAcompanying === false,
                  },
                },
                h("span", { isAcompanying: "open" }, "开"),
                h("span", { isAcompanying: "close" }, "关")
              );
            },
          },
          // {
          //   title: "佣金比例(%)",
          //   minWidth: 120,
          //   key: "commissionRatio",
          //   align:'center',
          //   render: (h, params) => {
          //     return h(
          //           "div",
          //           params.row.commissionRatio!=0  ? params.row.commissionRatio + '%' : '0%'
          //         )
          //       ;
          //   }
          // },
          {
            title: "订单类型",
            key: "orderTypeText",
            minWidth: 120,
            align:'center'
          },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 120,
            align:'center',
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
            title: "三方单号",
            key: "otherContentPlatFormOrderId",
            minWidth: 180,
            align: "center",
          },
          
          {
            title: "未成交原因",
            key: "unDealReason",
            minWidth: 300,
            tooltip: true
          },
          {
            title: "后期铺垫",
            key: "lateProjectStage",
            minWidth: 300,
            tooltip: true
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 300,
            tooltip: true
          },
          {
            title: "操作",
            align: "center",
            minWidth: 140,
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
                        api.byIdContentPlateForm(id).then((res) => {
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
                // isFlag ? h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //       disabled: params.row.checkStateText == "审核通过",
                //     },
                //     style: {
                //       marginRight: ".3125rem",
                //     },
                //     on: {
                //       click: () => {
                //         const { id } = params.row;
                //         this.controlModal = true;
                //         this.form.id = id;
                //       },
                //     },
                //   },
                //   "审核"
                // ): null,
                // isPayment ? h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //       disabled: params.row.checkStateText !=='审核通过' || params.row.isReturnBackPrice == true,
                //     },
                //     style: {
                //       marginRight: ".3125rem",
                //     },
                //     on: {
                //       click: () => {
                //         const { id,settlePrice } = params.row;
                //         this.paymentCollectionModel = true
                //         this.paymentCollectionObj = {
                //           orderId:id,
                //           returnBackPrice:settlePrice,
                //           type:'content'
                //         }
                //       },
                //     },
                //   },
                //   "回款"
                // ):null,
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // 是否是编辑
      isEdit: false,
      liveAnchors: [],
      form: {
        id: null,
        // 审核状态
        checkState: "",
        // 对账金额
        checkPrice: null,
        // 服务费合计
        settlePrice: null,
        // 审核备注
        checkRemark: "",
        // 审核图片
        checkPicture:[]
      },

      ruleValidates: {
        
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkPrice: [
          {
            required: true,
            message: "请输入对账金额",
          },
        ],
        settlePrice: [
          {
            required: true,
            message: "请输入服务费合计",
          },
        ],
      },
    };
  },
  methods: {
    //   获取订单到院类型
    getcontentPlateFormOrderToHospitalTypeList() {
      api.contentPlateFormOrderToHospitalTypeList().then((res) => {
        if (res.code === 0) {
          const { orderTypes } = res.data;
          this.toHospitalTypeList = [...this.toHospitalTypeList,...orderTypes]
        }
      });
    },
    // 图片
    handleUploadChange(values) {
      this.form.checkPicture = values;
    },
    //   获取面诊员
    getconsultationNameList() {
      api.consultationNameList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.consultationNameListAll =  [...this.consultationNameListAll,...employee]
        }
      });
    },
    // 获取医院列表
    getHospitalList() {
      empApi.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.query.hospitalList = [
            ...this.query.hospitalList,
            ...hospitalInfo,
          ];
        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
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
    
    // 获取内容平台已成交列表
    getcontentPlateFormOrderDealLlistWithPage() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        checkState,
        contentPlateFormId,
        startDate,
        endDate,
        hospitalId,
        liveAnchorId,
        consultationEmpId,
        ReturnBackPriceState,
        toHospitalType
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        checkState: checkState == -1 ? null : checkState,
        contentPlateFormId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        hospitalId: hospitalId == -1 ? null : hospitalId,
        liveAnchorId,
        consultationEmpId:consultationEmpId==-1?null:consultationEmpId,
        ReturnBackPriceState:ReturnBackPriceState=='-1' ? null : ReturnBackPriceState,
        toHospitalType:toHospitalType== -1 ? null : toHospitalType
      };
      api.contentPlateFormOrderDealLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        } else if (res.code != -1 || res.code !=0){
          this.$Message.error('操作失败，请联系管理员')
        }
      });
    },

    // 获取内容平台已成交列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        checkState,
        contentPlateFormId,
        startDate,
        endDate,
        hospitalId,
        liveAnchorId,
        consultationEmpId,
        ReturnBackPriceState,
        toHospitalType
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        checkState: checkState == -1 ? null : checkState,
        contentPlateFormId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        hospitalId: hospitalId == -1 ? null : hospitalId,
        liveAnchorId,
        consultationEmpId:consultationEmpId==-1?null:consultationEmpId,
        ReturnBackPriceState:ReturnBackPriceState=='-1' ? null : ReturnBackPriceState,
        toHospitalType:toHospitalType== -1 ? null : toHospitalType
      };
      api.contentPlateFormOrderDealLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        } else if (res.code != -1 || res.code !=0){
          this.$Message.error('操作失败，请联系管理员')
        }
      });
    },
    // 审核
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            checkState,
            checkPrice,
            settlePrice,
            checkRemark,
            checkPicture
          } = this.form;
          const data = {
            id,
            checkState,
            settlePrice,
            checkPrice,
            checkRemark,
            checkPicture
          };
          this.flag = true
          api.checkContentPlateFormOrder(data).then((res) => {
            if (res.code === 0) {
              this.flag = false
              this.controlModal = false;
              this.cancelSubmit("form");
              this.getcontentPlateFormOrderDealLlistWithPage();
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
            } else if (res.code != -1 || res.code !=0){
              this.$Message.error('操作失败，请联系管理员')
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
      this.isEdit = false;
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.controlModal = false;
        this.uploadObj.uploadList = [];
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getContentValidList();
    this.getHospitalList();
    this.getconsultationNameList()
    this.getcontentPlateFormOrderToHospitalTypeList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "contentCompleted") {
          this.getcontentPlateFormOrderDealLlistWithPage();
        }
      },
      immediate: true,
    },
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
.header_wrap {
  display: flex;
  align-items: center;
}
.container {
  margin-top: 16px;
}
</style>
