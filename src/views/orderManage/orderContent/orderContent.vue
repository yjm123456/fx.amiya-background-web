<!-- 订单 -->
<template>
  <div>
    <Card :dis-hover="true">
      <div class="head">
        <div class="content1">
          <div class="left_top">
            <Input
              v-model="query.keyword"
              style="width:170px;"
              placeholder="请输入订单号或商品名称"
              @keyup.enter.native="getOrderInfo()"
            />
            <DatePicker
              type="date"
              placeholder="下单开始日期"
              style="width: 140px;margin-left: .625rem"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <!-- <span style="margin-left:.625rem;color:#ccc">—</span> -->
            <DatePicker
              type="date"
              placeholder="下单结束日期"
              style="width: 140px; margin-left: .625rem"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
            <Select
              v-model="query.orderStatus"
              placeholder="请选择订单状态"
              style="width: 160px;margin-left: .625rem"
            >
              <Option
                v-for="item in orderStatus"
                :value="item.orderStatus"
                :key="item.orderStatus"
                >{{ item.orderStatusText }}</Option
              >
            </Select>
            <Select
              v-model="query.orderSource"
              placeholder="请选择订单来源"
              filterable
              style="width: 160px;margin-left: .625rem"
            >
              <Option
                v-for="item in orderSourcesListAll"
                :value="item.orderSource"
                :key="item.orderSource"
                >{{ item.orderSourceText }}</Option
              >
            </Select>
            <Select
                v-model="query.getCustomerType"
                style="width: 170px;margin-left: 10px"
                placeholder="请选择获客方式"
                filterable
                transfer
              >
                <Option
                  v-for="item in recordingParams.customerTypeListAll"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
            </Select>
            <!-- <Select
              v-model="query.contentPlateFormId"
              placeholder="请选择(订单)下单平台"
              style="width: 170px;margin-left: .625rem"
              filterable
            >
              <Option
                v-for="item in contentPalteForms"
                :value="item.id"
                :key="item.id"
                >{{ item.contentPlatformName }}</Option
              >
            </Select> -->
            <!-- <Select
              v-model="query.consultationEmpId"
              placeholder="请选择面诊员"
              style="width: 180px;margin-left: 10px"
              filterable
            >
              <Option
                v-for="item in consultationNameListAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select> -->
            
          </div>
          <!-- 一个是订单平台筛选 一个是主播平台筛选 -->
          <div>
            
            <Select
              v-model="query.belongEmpId"
              style="width: 170px;"
              placeholder="请选择归属客服"
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
              v-model="query.contentPlatFormId"
              placeholder="请选择主播平台"
              @on-change="contentPlateChange(query.contentPlatFormId)"
              style="width: 140px; margin-left: 10px"
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
              style="width: 140px; margin-left: 10px"
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
                v-model="query.liveAnchorWechatId"
                placeholder="请选择主播微信号"
                filterable
                style="width: 160px; margin-left: 10px"
              >
                <Option
                  v-for="(item,indexs) in weChatListAll"
                  :value="item.id"
                  :key="indexs"
                  >{{ item.weChatNo }}</Option
                >
              </Select>
            <Select
              v-model="query.consultationType"
              style="width: 160px;margin-left: 10px"
              placeholder="请选择完成情况"
              filterable
            >
              <Option
                v-for="item in consultationTypeListAll"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select>
            <Select
                v-model="query.belongMonth"
                placeholder="请选择归属月份"
                filterable
                style="width:170px;margin-left:10px"
                
              >
                <Option
                  v-for="item in belongMonthList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
          </div>
          <div style="margin-top:10px">
            
            <Select
                v-model="query.baseLiveAnchorId"
                style="width: 170px;"
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
              <Input
                v-model="query.minAddOrderPrice"
                placeholder="最小下单金额"
                style="width: 130px;margin-left: 10px"
                type="number"
                namber
              />
              <span> — </span>
              <Input
                v-model="query.maxAddOrderPrice"
                placeholder="最大下单金额"
                style="width: 140px;"
                type="number"
                namber
              />
              
              <Select
                v-model="query.appointmentHospital"
                style="width: 180px;margin-left: 10px"
                placeholder="请选择医院"
                filterable
                transfer
              >
                <Option
                  v-for="item in hospitallist"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
            </Select>
            
          </div>
        </div>
        <div class="button_con">
          <Button
            type="primary"
            style="margin-left: .625rem"
            @click="getOrderInfo()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: .625rem"
            @click="duplicateModel = true"
            >录单</Button
          >
          <Button
            type="primary"
            style="margin-left: .625rem"
            @click="handleExportClick()"
            v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
            >导出</Button
          >
          <Button
            type="primary"
            @click="adjustCustomerService()"
            style="margin-left: 10px"
            v-has="{ role: ['fx.amiya.permission.CHANGE_BIND_SERVICE'] }"
            >调整绑定客服</Button
          >
          <Button
            type="primary"
            @click="fanMeetingClick()"
            style="margin-left: 10px"
            >生成粉丝见面会名单</Button
          >
        </div>
      </div>
    </Card>
    <Card class="container">
      <div>
        <Table
          border
          :columns="query.columns"
          :data="query.data"
          @on-select="handleSelect"
          @on-select-cancel="handleCancels"
          @on-select-all="handleSelectAll"
          @on-select-all-cancel="handleSelectAll"
        ></Table>
      </div>
      <div class="page_wrap">
        <!-- <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        /> -->
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-sizer
          :page-size-opts="[10, 20, 30, 50, 100]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
    </Card>
    <Modal
      v-model="recordingModal"
      title="最终核销医院"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="recordingForm"
        :model="recordingForm"
        :rules="recordinRuleValidate"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="医院" prop="hospitalId">
          <Select
            v-model="recordingForm.hospitalId"
            placeholder="请选择医院"
            filterable
          >
            <Option
              v-for="item in hospitalNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <!-- <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('recordingForm')">取消</Button>
        <Button type="primary" @click="recordingHandleSubmit('recordingForm')"
          >确定</Button
        >
      </div>
    </Modal>
    <!-- 调整归属客服 -->
    <Modal
      v-model="adjustCustomerServiceModal"
      title="调整归属客服"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="adjustCustomerServiceForm"
        :model="adjustCustomerServiceForm"
        :rules="adjustCustomerServiceRuleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="客服" prop="belongEmpInfo">
          <Select
            v-model="adjustCustomerServiceForm.belongEmpInfo"
            placeholder="请选择客服"
          >
            <Option
              v-for="item in employeeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('adjustCustomerServiceForm')">取消</Button>
        <Button
          type="primary"
          @click="adjustCustomerServiceSubmit('adjustCustomerServiceForm')"
          >确定</Button
        >
      </div>
    </Modal>
    <!-- 查看顾客照片 -->
    <viewCustomerPhotos
      :viewCustomerPhotosModel.sync="viewCustomerPhotosModel"
      :contentPlatFormOrderId.sync="contentPlatFormOrderId"
    ></viewCustomerPhotos>
    <!-- 订单详情 -->
    <detail :detailModel.sync="detailModel" :detailList="detailList"></detail>
    <!-- 待查重  录单-->
    <duplicateCheck :duplicateModel.sync="duplicateModel" :recordingParams="recordingParams" />
    <!-- 编辑录单 -->
    <editRecording :editRecordingModel.sync="editRecordingModel" :recordingParams="recordingParams" />
    <!-- 生成粉丝见面会名单 -->
    <fanMeeting :fanMeetingModel.sync="fanMeetingModel" :fanMeetingParams="fanMeetingParams" @getOrderInfo="getOrderInfo" ref="fanMeeting"/>
    <!-- :orderId="[...adjustCustomerServiceForm.orderId]" -->
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as hospitalManage from "@/api/hospitalManage";
import * as liveAnchorApi from "@/api/liveAnchorWechatInfo";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";
import * as shoppingCartRegistrationApi from "@/api/shoppingCartRegistration";

import upload from "@/components/upload/upload";
import viewCustomerPhotos from "@/components/viewCustomerPhotos/viewCustomerPhotos.vue";
import { download } from "@/utils/util";
import detail from "@/components/contentDetail/detail.vue";
import duplicateCheck from "./components/duplicateCheck.vue"
import fanMeeting from "@/components/fanMeeting/fanMeeting.vue"
import editRecording from "@/components/recording/editRecording"

export default {
  components: {
    upload,
    viewCustomerPhotos,
    detail,
    duplicateCheck,
    editRecording,
    fanMeeting
  },
  data() {
    return {
      // 生成粉丝见面会名单
      fanMeetingModel:false,
      fanMeetingParams:{
        orderId:new Set()
      },
      // 录单(待查重)
      duplicateModel:false,
      //编辑录单参数
      recordingParams:{
        // 客服
        employeeList:[],
        // 平台
        contentPalteForms:[],
        // 科室
        AmiyaHospitalDepartmentListDepartment:[],
        // 内容平台订单类型
        statusCodeArr2:[],
        // 预约门店
        hospitalNameList:[],
        // 内容平台订单来源
        orderSourcesList:[],
        // 面诊类型列表
        consultationTypeList:[],
        // 
        belongMonthList:[],
        // 客户类型
      shoppingCartRegistrationCustomerTypeList:[],
      // 客户来源
      sourceList:[],

        // 录单编辑
        // 获取订单信息
        info:{},
        // 弹窗标题
        title:'录单编辑',
        // 主播微信号
        weChatList:[],
        // 获客方式
        customerTypeList:[],
        customerTypeListAll:[{id:-1,name:'全部获客方式'}],
      },
      // 编辑录单
      editRecordingModel:false,
      positionId: sessionStorage.getItem("positionId"),
      weChatList: [],
      detailList: [],
      weChatListAll:[{id:-1,weChatNo:'全部主播微信号'}],
      detailModel: false,
      hospitallist: [{ id: -1, name: "全部预约医院" }],
      // 面诊人
      consultationNameList: [],
      // 面诊员
      consultationNameListAll: [{ id: -1, name: "全部面诊员" }],
      // 查看图片
      viewCustomerPhotosModel: false,
      contentPlatFormOrderId: "",
      customerUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 5,
        // 文件列表
        uploadList: [],
      },
      orderSourcesList: [],
      orderSourcesListAll: [
        { orderSource: -1, orderSourceText: "全部订单来源" },
      ],
      // 科室
      AmiyaHospitalDepartmentListDepartment: [],
      adjustCustomerServiceModal: false,
      adjustCustomerServiceForm: {
        // 订单号
        orderId: new Set(),
        belongEmpInfo: "",
      },
      adjustCustomerServiceRuleValidate: {
        belongEmpInfo: [
          {
            required: true,
            message: "请选择客服",
          },
        ],
      },
      // 客服（下拉框）
      employeeList: [],
      employee: [{ name: "全部客服", id: -1 }],
      flag: false,
      // ip账号
      liveAnchors: [],
      // 订单状态
      orderStatus: [],
      title: "录单",
      isEdit: false,
      recordingModal: false,
      recordingForm: {
        orderId: "",
        hospitalId: "",
      },
      recordinRuleValidate: {
        orderNature: [
          {
            required: true,
            message: "请选择主播IP账号",
          },
        ],
      },
      // IP账号
      orderNatureList: [],
      // 获取有效的医院列表
      hospitalNameList: [],
      statusCodeArr: [
        {
          orderType: 1,
          name: "咨询",
        },
        {
          orderType: 2,
          name: "定金",
        },
      ],
      statusCodeArr2:[],
      // 获取商品名称和id
      AmiyaHospitalDepartmentList: [],
      //   下单平台
      contentPalteForms: [],
      thumbPicUrlUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      query: {
        // 获客方式
        getCustomerType:-1,
        baseLiveAnchorId:-1,
        liveAnchorWechatId:-1,
        belongMonth:null,
        pageNumEdit: 1,
        appointmentHospital: -1,
        consultationEmpId: -1,
        orderSource: -1,
        contentPlatFormId: null,
        liveAnchorId: null,
        // 归属客服
        belongEmpId: null,
        // 订单状态
        orderStatus: "",
        // 内容平台
        contentPlateFormId: "",
        // 判断是否是管理员
        amiyaPositionId: "",
        // 下单时间
        startDate: "",
        endDate: "",
        // 核销时间
        writeOffStartDate: "",
        writeOffEndDate: "",
        // 面诊类型
        consultationType: -1,
        // 最小金额
        minAddOrderPrice:null,
        // 最大金额
        maxAddOrderPrice:null,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 80,
          },
          {
            title: "订单号",
            key: "id",
            minWidth: 170,
            align: "center",
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 110,
            align: "center",
          },
          {
            title: "辅助客服",
            key: "supportEmpName",
            minWidth: 110,
            align: "center",
          },
          {
            title: "面诊类型",
            key: "consultationType",
            minWidth: 120,
            align: "center",
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 120,
            align: "center",
          },
          {
            title: "城市",
            key: "city",
            minWidth: 120,
            align: "center",
          },
          {
            title: "预约医院",
            key: "appointmentHospitalName",
            minWidth: 220,
            align: "center",
          },

          {
            title: "科室",
            key: "departmentName",
            minWidth: 110,
            align: "center",
          },

          {
            title: "主派咨询内容",
            key: "consultingContent",
            minWidth: 500,
            tooltip:true
          },
          {
            title: "次派咨询内容",
            key: "consultingContent2",
            minWidth: 500,
            tooltip:true
          },
          {
            title: "获客方式",
            key: "getCustomerTypeText",
            minWidth: 150,
            tooltip:true
          },
          {
            title: "下单时间",
            key: "createDate",
            minWidth: 170,
            align: "center",
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
            minWidth: 110,
            align: "center",
          },
          {
            title: "下单金额",
            key: "addOrderPrice",
            minWidth: 100,
            align: "center",
          },
          {
            title: "归属月份",
            key: "belongMonth",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.belongMonth == 0 ? '当月':'历史'
              );
            },
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 130,
            align: "center",
          },
          {
            title: "主播微信号",
            key: "liveAnchorWeChatNo",
            minWidth: 140,
            align: "center",
          },
          {
            title: "是否重单深度",
            key: "isRepeatProfundityOrder",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isRepeatProfundityOrder,
                    size: "default",
                    disabled:
                      params.row.isRepeatProfundityOrder === true ||
                      params.row.isRepeatProfundityOrder === false,
                  },
                },
                h("span", { isRepeatProfundityOrder: "open" }, "开"),
                h("span", { isRepeatProfundityOrder: "close" }, "关")
              );
            },
          },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 130,
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
              } else if (params.row.orderStatusText == "重单-不可深度") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.orderStatusText
                );
              } else if (params.row.orderStatusText == "重单-可深度") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
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
            minWidth: 100,
            align: "center",
          },
          {
            title: "归属部门",
            key: "belongChannelText",
            minWidth: 100,
            align: "center",
          },
          {
            title: "操作",
            align: "center",
            minWidth: 330,
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
                        const { id } = params.row;
                        api.byIdContentPlateForm(id).then((res) => {
                          if (res.code === 0) {
                            this.detailModel = true;
                            const { orderInfo } = res.data;
                            this.detailList = [orderInfo];
                          }
                        });
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
                      disabled:params.row.isRepeatProfundityOrder ==  false,
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "确认重单可深度状态提示",
                          content: "是否要关闭重单可深度状态吗？",
                          onOk: () => {
                            const { id } = params.row;
                            const data = {
                              contentPlateFormId:id
                            }
                            api.colseRepeatProfundityOrder(data).then((res) => {
                              if (res.code === 0) {
                                this.getOrderInfo();
                                this.$Message.success({
                                  content: "关闭成功",
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
                  "关闭重单深度"
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
                //         const {id} = params.row
                //         this.viewCustomerPhotosModel = true
                //         this.contentPlatFormOrderId = id
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
                      // disabled: params.row.checkStateText === "审核通过",
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        api.byIdContentPlateForm(id).then((res) => {
                          if(res.code === 0){
                            this.editRecordingModel = true
                            this.recordingParams.title = '录单编辑'
                            this.recordingParams.info = res.data.orderInfo
                          }
                        })
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteContentPlateFormOrder(id).then((res) => {
                              if (res.code === 0) {
                                this.getOrderInfo();
                                this.$Message.success({
                                  content: "删除成功",
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
                  "删除"
                ),
              ]);
            },
          },
        ],
        data: [],
        keyword: "",
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
        ],
        orderType: null,
        appTypeList: [
          {
            appTypeText: "全部平台",
            orderType: -1,
          },
        ],
        appType: "",
        orderNature: "",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      // 面诊类型(搜索用)
      consultationTypeListAll: [
        { orderType: -1, orderTypeText: "全部面诊类型" },
      ],
      // 面诊类型 录单
      consultationTypeList: [],
      // 归属月份
      belongMonthList:[
        {
          id:0,
          name:'当月'
        },
        {
          id:1,
          name:'历史'
        }
      ],
      // 全部基础主播id
      liveAnchorBaseInfos:[{id:-1,name:'全部基础主播'}]
    };
  },
  methods: {
    
    // 生成粉丝见面会名单
    fanMeetingClick(){
      if (![...this.fanMeetingParams.orderId].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.fanMeetingModel = true
    },
    // 客户来源
    getcustomerSourceList() {
      shoppingCartRegistrationApi.customerSourceList().then((res) => {
        if (res.code === 0) {
          const { sourceList } = res.data;
          this.recordingParams.sourceList = sourceList;
        }
      });
    },
    // 客户类型列表
    getcustomerTypeList() {
      shoppingCartRegistrationApi.customerTypeList().then((res) => {
        if (res.code === 0) {
          const { sourceList } = res.data;
          this.recordingParams.shoppingCartRegistrationCustomerTypeList = sourceList
          
        }
      });
    },
    // 主获客方式列表
    getshoppingCartGetCustomerTypeList(){
      api.shoppingCartGetCustomerTypeList().then((res) => {
        if (res.code === 0) {
          const {typeList} = res.data
          this.recordingParams.customerTypeList = typeList
          this.recordingParams.customerTypeListAll = [...this.recordingParams.customerTypeListAll,...typeList]
        }
      });
    },
    // 主播基础数据列表
    getLiveAnchorBaseInfoValids(){
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const {liveAnchorBaseInfos} = res.data
          this.liveAnchorBaseInfos = [...this.liveAnchorBaseInfos,...liveAnchorBaseInfos]
        }
      });
    },
    //  获取内容平台订单类型
    getcontentPlateFormOrderTypeList() {
      api.getcontentPlateFormOrderTypeList().then((res) => {
        if (res.code === 0) {
          this.statusCodeArr2 = res.data.orderTypes;
          this.recordingParams.statusCodeArr2 = res.data.orderTypes;
        }
      });
    },
    //   获取 面诊类型列表（下拉框）
    getOrderConsultationTypeList() {
      api.getOrderConsultationTypeList().then((res) => {
        if (res.code === 0) {
          const { orderConsultationTypes } = res.data;
          this.consultationTypeListAll = [
            ...this.consultationTypeListAll,
            ...orderConsultationTypes,
          ];
          this.consultationTypeList = orderConsultationTypes;
          this.recordingParams.consultationTypeList = orderConsultationTypes;
        }
      });
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
          this.hospitallist = [...this.hospitallist, ...res.data.hospitalInfo];
        }
      });
    },

    //   获取面诊员
    getconsultationNameList() {
      api.consultationNameList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.consultationNameList = employee;
          this.consultationNameListAll = [
            ...this.consultationNameListAll,
            ...employee,
          ];
        }
      });
    },
    //   获取内容平台订单来源
    getcontentPlateFormOrderSourceList() {
      api.contentPlateFormOrderSourceList().then((res) => {
        if (res.code === 0) {
          const { orderSources } = res.data;
          this.orderSourcesList = orderSources;
          this.recordingParams.orderSourcesList = orderSources;
          this.orderSourcesListAll = [
            ...this.orderSourcesListAll,
            ...orderSources,
          ];
        }
      });
    },
    //   获取科室
    getAmiyaHospitalDepartmentListChange() {
      api.getAmiyaHospitalDepartmentList().then((res) => {
        if (res.code === 0) {
          const { AmiyaHospitalDepartmentList } = res.data;
          this.AmiyaHospitalDepartmentListDepartment = AmiyaHospitalDepartmentList;
          this.recordingParams.AmiyaHospitalDepartmentListDepartment = AmiyaHospitalDepartmentList;
        }
      });
    },
    // 获取商品名称和id
    getgetAmiyaHospitalDepartmentList(value) {
      const data = {
        hospitalDepartmentId: value,
      };
      api.getgetAmiyaHospitalDepartmentList(data).then((res) => {
        if (res.code === 0) {
          const { AmiyaGoodsDemandList } = res.data;
          this.AmiyaHospitalDepartmentList = AmiyaGoodsDemandList;
        }
      });
    },
    // 科室change
    departmentChange(value) {
      if (!value) {
        return;
      }
      this.getgetAmiyaHospitalDepartmentList(value);
    },
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
          this.employeeList = employee;
          this.recordingParams.employeeList = employee;
        }
      });
    },
    handleSelect(selection, row) {
      // 调整归属客服
      this.adjustCustomerServiceForm.orderId.add(row.id);
      this.fanMeetingParams.orderId.add(row.id);
    },

    handleCancels(selection, row) {
      // 调整归属客服
      this.adjustCustomerServiceForm.orderId.delete(row.id);
      this.fanMeetingParams.orderId.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.adjustCustomerServiceForm.orderId.clear();
        this.fanMeetingParams.orderId.clear();
      } else {
        selection.forEach((item) => {
          this.adjustCustomerServiceForm.orderId.add(item.id);
          this.fanMeetingParams.orderId.add(item.id);
        });
      }
    },
    // 提交（调整归属客服）
    adjustCustomerServiceSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { orderId, belongEmpInfo } = this.adjustCustomerServiceForm;
          const data = {
            orderId: [...orderId],
            belongEmpInfo,
          };
          api.BelongEmployeeContentPlatFormOrder(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("adjustCustomerServiceForm");
              this.getOrderInfo();
              this.$Message.success({
                content: "已绑成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 调整归属客服
    adjustCustomerService() {
      if (![...this.adjustCustomerServiceForm.orderId].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.adjustCustomerServiceModal = true;
    },
    // 导出
    handleExportClick() {
      const {
        keyword,
        pageNum,
        pageSize,
        startDate,
        endDate,
        orderStatus,
        contentPlateFormId,
        belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId,
        appointmentHospital,
        consultationType,
        belongMonth,
        minAddOrderPrice,
        maxAddOrderPrice,
        baseLiveAnchorId,
        contentPlatFormId
      } = this.query;
      const data = {
        keyword,
        pageNum,
        pageSize,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        orderStatus,
        contentPlateFormId:contentPlatFormId,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        appointmentHospital:
          appointmentHospital == -1 ? null : appointmentHospital,
        consultationType: consultationType == -1 ? null : consultationType,
        belongMonth,
        minAddOrderPrice,
        maxAddOrderPrice,
        baseLiveAnchorId: baseLiveAnchorId == -1 ? null : baseLiveAnchorId,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.exportContentPlateFormOrderLlistWithPage(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "内容平台订单列表";
        download(res, name);
      });
    },
    //
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      // this.form.liveAnchorWeChatNo = ''
      this.query.liveAnchorId = null
      this.getLiveValidList(value);
    },
    //
    liveAnchorChange(value) {
      if (!value) {
        return;
      }
      // this.getWeChatList(value);
    },
    //  根据主播获取主播微信号
    getWeChatList(value) {
      const data = {
        liveanchorId: '',
      };
      liveAnchorApi.getvalidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorWechatInfos } = res.data;
          this.weChatList = liveAnchorWechatInfos;
          this.weChatListAll = [...this.weChatListAll,...liveAnchorWechatInfos];
          this.recordingParams.weChatList = liveAnchorWechatInfos;
        }
      });
    },
    // 订单状态
    getContentPlateFormOrderStatusList() {
      api.contentPlateFormOrderStatusList().then((res) => {
        if (res.code === 0) {
          const { orderStatus } = res.data;
          this.orderStatus = orderStatus;
        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
          this.recordingParams.contentPalteForms = contentPalteForms;
        }
      });
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
    //获取订单性质
    getorderNatureList(data) {
      api.getorderNatureList().then((res) => {
        if (res.code === 0) {
          const { orderNatureList } = res.data;
          this.orderNatureList = orderNatureList;
        }
      });
    },
    //根据商品名称获取id
    selectGoodsName(data) {
      this.AmiyaHospitalDepartmentList.map((item) => {
        if (data === item.id) {
          this.form.goodsNames = item.projectName;
          this.form.goodsId = item.id;
        }
      });
    },

    // 获取合作过的医院列表
    getHospitalList() {
      api.getHospitalList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalNameList = hospitalInfo;
          this.recordingParams.hospitalNameList = hospitalInfo;
        }
      });
    },

    // 缩略图
    handleThumbPicUrlUploadChange(values) {
      this.form.thumbPicUrl = values[0];
    },
    customerHandleUploadChange(values) {
      this.form.customerPictures = values;
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            const {
              orderType,
              contentPlateFormId,
              phone,
              liveAnchorId,
              customerName,
              appointmentDate,
              appointmentHospitalId,
              depositAmount,
              goodsId,
              consultingContent,
              remark,
              lateProjectStage,
              id,
              hospitalDepartmentId,
              orderSource,
              unSendReason,
              acceptConsulting,
              customerPictures,
              consultationEmpId,
              liveAnchorWeChatNo,
              consultationType,
              addOrderPrice,
              belongMonth,
              sex,
              birthday,
              occupation,
              wechatNumber,
              city
            } = this.form;
            const data = {
              orderType,
              contentPlateFormId,
              phone,
              liveAnchorId,
              customerName,
              appointmentDate: appointmentDate
                ? this.$moment(appointmentDate).format("YYYY-MM-DD")
                : null,
              appointmentHospitalId,
              depositAmount: depositAmount ? depositAmount : 0,
              goodsId,
              consultingContent,
              remark,
              lateProjectStage,
              id,
              hospitalDepartmentId,
              orderSource,
              unSendReason,
              acceptConsulting,
              customerPictures,
              consultationEmpId: consultationEmpId ? consultationEmpId : 0,
              liveAnchorWeChatNo,
              consultationType,
              addOrderPirce:addOrderPrice,
              belongMonth,
              sex , 
              birthday : birthday? this.$moment(birthday).format("YYYY-MM-DD") : null,
              occupation ,
              wechatNumber ,
              city,
            };
            if (phone) {
              if (!/^1[3456789]\d{9}$/.test(phone)) {
                this.$Message.error("请输入正确的手机号");
                return false;
              }
              this.flag = true;
              api.editContentPlateFormOrder(data).then((res) => {
                if (res.code === 0) {
                  this.isEdit = false;
                  this.flag = false;
                  this.handleCancel("form");
                  this.handlePageChange(this.$refs.pages.currentPage);
                  this.$Message.success({
                    content: "修改成功",
                    duration: 3,
                  });
                } else {
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }
              });
            }
          } else {
            const {
              orderType,
              contentPlateFormId,
              phone,
              liveAnchorId,
              customerName,
              appointmentDate,
              appointmentHospitalId,
              depositAmount,
              goodsId,
              consultingContent,
              remark,
              lateProjectStage,
              hospitalDepartmentId,
              orderSource,
              unSendReason,
              acceptConsulting,
              customerPictures,
              belongEmpId,
              consultationEmpId,
              liveAnchorWeChatNo,
              consultationType,
              addOrderPrice,
              belongMonth,
              sex,
              birthday,
              occupation,
              wechatNumber,
              city
            } = this.form;
            const data = {
              orderType,
              contentPlateFormId,
              phone,
              liveAnchorId,
              customerName,
              appointmentDate: appointmentDate
                ? this.$moment(appointmentDate).format("YYYY-MM-DD")
                : null,
              appointmentHospitalId,
              depositAmount: depositAmount ? depositAmount : 0,
              goodsId,
              consultingContent,
              remark,
              lateProjectStage,
              hospitalDepartmentId,
              orderSource,
              unSendReason,
              acceptConsulting,
              customerPictures,
              belongEmpId,
              consultationEmpId: consultationEmpId ? consultationEmpId : 0,
              liveAnchorWeChatNo,
              consultationType,
              addOrderPrice,
              belongMonth,
              sex , 
              birthday : birthday? this.$moment(birthday).format("YYYY-MM-DD") : null,
              occupation ,
              wechatNumber ,
              city,
            };
            if (phone) {
              if (!/^1[3456789]\d{9}$/.test(phone)) {
                this.$Message.error("请输入正确的手机号");
                return false;
              }
              this.flag = true;
              api.AddContentPlateFormAddOrder(data).then((res) => {
                if (res.code === 0) {
                  this.flag = false;
                  this.getOrderInfo();
                  this.handleCancel("form");
                  this.$Message.success({
                    content: "添加成功",
                    duration: 3,
                  });
                } else {
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }
              });
            }
          }
        } else {
        }
      });
    },
    // 取消
    handleCancel(name) {
      this.isEdit = false;
      this.title = "录单";
      this.customerUploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.title = "录单";
        this.customerUploadObj.uploadList = [];
        this.$refs["form"].resetFields();
        this.$refs["recordingForm"].resetFields();
      }
    },
    // 确认
    recordingHandleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { orderId, hospitalId } = this.recordingForm;
          if (this.isEdit) {
            this.isEdit = false;
          } else {
            const data = {
              orderId,
              hospitalId: hospitalId,
            };
            api.UpdateOrderFinalConsumptionHospital(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("recordingForm");
                this.getOrderInfo();
                this.$Message.success({
                  content: "确认成功",
                  duration: 3,
                });
              }
            });
          }
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.title = "录单";
      this.recordingModal = false;
      this.adjustCustomerServiceModal = false;
      this.customerUploadObj.uploadList = [];
      this.adjustCustomerServiceForm.orderId.clear();
      this.$refs[name].resetFields();
    },
    // 获取下单平台列表
    getAppTypeList() {
      api.getAppTypeList().then((res) => {
        if (res.code === 0) {
          this.query.appTypeList = [
            ...this.query.appTypeList,
            ...res.data.orderAppTypes,
          ];
        }
      });
    },

    // 获取天猫订单信息列表
    getOrderInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        keyword,
        pageNum,
        pageSize,
        startDate,
        endDate,
        orderStatus,
        contentPlateFormId,
        belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId,
        appointmentHospital,
        consultationType,
        belongMonth,
        minAddOrderPrice,
        maxAddOrderPrice,
        liveAnchorWechatId,
        baseLiveAnchorId,
        getCustomerType,
        contentPlatFormId
      } = this.query;
      const data = {
        keyword,
        pageNum,
        pageSize,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        orderStatus,
        contentPlateFormId:contentPlatFormId,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        appointmentHospital:
          appointmentHospital == -1 ? null : appointmentHospital,
        consultationType: consultationType == -1 ? null : consultationType,
        belongMonth,
        minAddOrderPrice,
        maxAddOrderPrice,
        liveAnchorWechatId: liveAnchorWechatId == -1 ? null : liveAnchorWechatId,
        baseLiveAnchorId: baseLiveAnchorId == -1 ? null : baseLiveAnchorId,
        getCustomerType: getCustomerType == -1 ? null : getCustomerType,

      };
      api.getContentPlateFormOrderLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取天猫订单信息列表分页
    handlePageChange(pageNum) {
      const {
        keyword,
        pageSize,
        startDate,
        endDate,
        orderStatus,
        contentPlateFormId,
        belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId,
        appointmentHospital,
        consultationType,
        belongMonth,
        minAddOrderPrice,
        maxAddOrderPrice,
        liveAnchorWechatId,
        baseLiveAnchorId,
        getCustomerType,
        contentPlatFormId
      } = this.query;
      const data = {
        keyword,
        pageNum,
        pageSize,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        orderStatus,
        contentPlateFormId:contentPlatFormId,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        appointmentHospital:
          appointmentHospital == -1 ? null : appointmentHospital,
        consultationType: consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        belongMonth,
        liveAnchorWechatId: liveAnchorWechatId == -1 ? null : liveAnchorWechatId,
        baseLiveAnchorId: baseLiveAnchorId == -1 ? null : baseLiveAnchorId,
        getCustomerType: getCustomerType == -1 ? null : getCustomerType,
      };
      api.getContentPlateFormOrderLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
          // 修改时 保留在当前页面
          // sessionStorage.setItem("pageNumEdit", pageNum);
        }
      });
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getOrderInfo();
    },
  },
  created() {
    this.getorderNatureList();
    this.getAppTypeList();
    this.getOrderInfo();
    this.getgetAmiyaHospitalDepartmentList();
    this.getContentValidList();
    this.getContentPlateFormOrderStatusList();
    this.getCustomerServiceList();
    this.getAmiyaHospitalDepartmentListChange();
    this.getcontentPlateFormOrderSourceList();
    this.getconsultationNameList();
    this.getHospitalInfonameList();
    this.getOrderConsultationTypeList();
    this.getcontentPlateFormOrderTypeList()
    this.getHospitalList();
    this.getWeChatList();
    this.getLiveAnchorBaseInfoValids();
    this.getshoppingCartGetCustomerTypeList();
    this.getcustomerTypeList();
    this.getcustomerSourceList()
    

    const amiyaPositionId = JSON.parse(
      sessionStorage.getItem("amiyaPositionId")
    );
    this.amiyaPositionId = amiyaPositionId;
  },
  watch: {
    "form.orderType"(value) {
      if (value == 1 || value == 3) {
        this.form.depositAmount = "";
        this.$refs.depositAmount.validateMessage = "";
        this.$refs.depositAmount.validateState = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
.page_wrap {
  margin-top: 1rem;
  text-align: right;
}
.container {
  margin-top: 1rem;
}
.head {
  width: 100%;
  display: flex;
  align-items: center;
}
.head_left {
  margin-right: 1.25rem;
}
.left_top {
  margin-bottom: 10px;
}
.content1 {
  display: flex;
  flex-direction: column;
}
.h3{
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
}
</style>
