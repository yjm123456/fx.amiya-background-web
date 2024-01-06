<template>
  <div>
    <Modal
      v-model="controlModel"
      title="订单详情"
      :mask-closable="false"
      width="1000"
      @on-visible-change="handleModalVisibleChange"
    >
      <div class="order_con">
        <!-- <span class="title_bold">订单编号：</span><span class="order_id">{{detailObj.id}}</span><span  v-clipboard:success="copyChange(detailObj.id)">复制</span> -->
        <span class="title_bold">订单编号：</span>
        <input
          type="text"
          v-model="detailObj.id"
          style="border:none;color:red;width:140px"
          disabled
        />
        <button
          type="button"
          v-clipboard:copy="detailObj.id"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          style="border:none;padding:1px 4px;box-sizing:border-box;background:#ccc;border-radius:5px;font-size:10px"
        >
          复制
        </button>
      </div>
      <div class="mr">
        <Steps :current="time == 0 ? 0 : time == 1 ? 1 : 2">
          <Step
            title="录单"
            :content="
              detailObj.createDate
                ? this.$moment(detailObj.createDate).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )
                : ''
            "
          ></Step>
          <Step
            title="派单"
            :content="
              detailObj.sendDate
                ? this.$moment(detailObj.sendDate).format('YYYY-MM-DD HH:mm:ss')
                : ''
            "
          ></Step>
          <!-- <Step title="接单" :content="detailObj.updateDate ? this.$moment(detailObj.updateDate).format('YYYY-MM-DD HH:mm:ss') : ''"></Step> -->
          <Step title="订单状态" :content="detailObj.orderStatusText"></Step>
        </Steps>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>客户信息</div>
        <div class="order_content">
          <div  class="item_list">
            <div class="items">
              <span class="title_bold">客户昵称：</span>
              <span>{{ detailObj.customerName }} </span>
            </div>
            <div class="items">
                <span class="title_bold">手机号：</span>
                <span>{{ detailObj.phone }} </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
                <span class="title_bold">性别：</span>
                <span>{{ detailObj.sex }} </span>
            </div>
            <div class="mr_top items">
                <span class="title_bold">生日：</span>
                <span
                >{{
                  detailObj.birthday
                    ? this.$moment(detailObj.birthday).format(
                        "YYYY-MM-DD"
                      )
                    : ""
                }}
              </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
                <span class="title_bold">职业：</span>
                <span>{{ detailObj.occupation }} </span>
            </div>
            <div class="mr_top items">
                <span class="title_bold">微信号：</span>
                <span>{{ detailObj.wechatNumber }} </span>
            </div>
          </div>
          <div  class="item_list">
          <div class="mr_top items">
              <span class="title_bold">城市：</span>
              <span>{{ detailObj.city }} </span>
          </div>
          
          <div class="mr_top items">
            <span class="title_bold">新老客业绩：</span>
            <span>{{ detailObj.isOldCustomer == true ? '老客业绩' : '新客业绩'  }} </span>
          </div>
          </div>
          <div  class="item_list">
          <div class="mr_top items">
              <span class="title_bold">获客方式：</span>
              <span>{{ detailObj.getCustomerTypeText }} </span>
          </div>
          
          <div class="mr_top items">
            <span class="title_bold">客户类型：</span>
            <span>{{ detailObj.customerTypeText }} </span>
          </div>
          </div>
          <div class="fl_end">
            <div class="mr_top">
              <span class="title_bold">客户来源：</span>
              <span>{{ detailObj.customerSourceText }} </span>
            </div>
            <div style="display:flex;align-items:flex-end">
              <Button type="primary" @click="customerClick(detailObj)"
                style="margin-right:10px">顾客信息</Button
              >
              <Button type="primary" @click="lookImg(detailObj.id)"
                >查看顾客照片</Button
              >
            </div>
          </div>
        </div>
        
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>门店信息</div>
        <div class="order_content">
          <!-- <div>
            <span class="title_bold">预约时间：</span>
            <span
              >{{
                detailObj.appointmentDate
                  ? this.$moment(detailObj.appointmentDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "未预约时间"
              }}
            </span>
          </div> -->
          <div  class="item_list">
            <div class="items">
              <span class="title_bold">预约门店：</span>
              <span>{{ detailObj.appointmentHospitalName }} </span>
            </div>
            <div class="items">
              <span class="title_bold">派单时间：</span>
              <span
                >{{
                  detailObj.sendDate
                    ? this.$moment(detailObj.sendDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : "未预约时间"
                }}
              </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <!-- <span class="title_bold">派单医院：</span>
              <span>{{ detailObj.sendHospitalName }} </span> -->
              <span class="title_bold">是否到院：</span>
              <i-switch v-model="detailObj.isToHospital" disabled />
            </div>
            <div class="mr_top">
              <span class="title_bold">到院类型：</span>
              <span>{{ detailObj.toHospitalTypeText }} </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">到院时间：</span>
              <span
                >{{
                  detailObj.toHospitalDate
                    ? this.$moment(detailObj.toHospitalDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : ""
                }}
              </span>
            </div>
            <div class="mr_top">
              <span class="title_bold">到院医院：</span>
              <span>{{ detailObj.lastDealHospitalName }} </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">成交时间：</span>
              <span
                >{{
                  detailObj.dealDate
                    ? this.$moment(detailObj.dealDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : ""
                }}
              </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">医院网咨人员：</span>
              <span
                >{{
                  detailObj.netWorkConsulationName
                }}
              </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">医院现场咨询人员：</span>
              <span>{{ detailObj.sceneConsulationName }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">是否生成过预约日程：</span>
              <i-switch v-model="customerAppointmentScheduleInfo.isCustomerAppointmentSchedule" disabled />
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">预约日期：</span>
              <span>{{ customerAppointmentScheduleInfo.appointmentDate }} </span>
            </div>
            <div class="mr_top items">
              
            </div>
          </div>
          <div class="appoint"  style="display:flex;justify-content:flex-end;margin-top:10px;margin-right:-5px">
            <Button type="primary" @click="dispatchClick(detailObj.id)" style="margin-right:10px">派单情况</Button>
            <Button type="primary" @click="appointmentScheduleClick(detailObj.id)" style="margin-right:10px">生成预约日程</Button>
            <Button type="primary" @click="messageClick" style="margin-right:10px" v-if="detailObj.orderStatusText != '未派单'">留言板</Button>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>主播客服信息</div>
        <div class="order_content">
          <div  class="item_list">
            <div class="items">
              <span class="title_bold">主播平台：</span>
              <span>{{ detailObj.contentPlateFormName }} </span>
            </div>
            <div  class="items">
              <span class="title_bold">主播账号：</span>
              <span>{{ detailObj.liveAnchorName }} </span>
            </div>
          </div>
          <div  class="item_list">
            <div  class="mr_top items">
              <span class="title_bold">主播微信号：</span>
              <span>{{ detailObj.liveAnchorWeChatNo }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">归属客服：</span>
              <span>{{ detailObj.belongEmpName }}</span>
            </div>
          </div>
          <!-- <div class="mr_top">
            <span class="title_bold">面诊员：</span>
            <span>{{ detailObj.consultationEmpName }}</span>
          </div> -->
          <!-- <div class="mr_top">
            <span class="title_bold">院方接诊人员：</span>
            <span>{{ detailObj.acceptConsulting }}</span>
          </div> -->
          
          <div  class="item_list">
            <div class="mr_top items">
            <span class="title_bold">派单人：</span>
            <span>{{ detailObj.sendByName }}</span>
          </div>
            <div class="mr_top items">
              <span class="title_bold">辅助客服：</span>
              <span>{{ detailObj.supportEmpName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>交易信息</div>
        <div class="order_content">
          <div  class="item_list">
            <div class="items">
              <span class="title_bold">归属月份：</span>
              <span>{{ detailObj.belongMonth == 1 ? '历史' : '当月' }} </span>
            </div>
            <div  class="items">
              <span class="title_bold">订单类型：</span>
              <span>{{ detailObj.orderTypeText }} </span>
            </div>
          </div>
           <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">订单来源：</span>
              <span>{{ detailObj.orderSourceText }} </span>
            </div>

            <div class="mr_top items">
              <span class="title_bold">下单平台：</span>
              <span>{{ detailObj.contentPlateFormName }} </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">科室：</span>
              <span>{{ detailObj.hospitalDepartmentName }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">成交金额：</span>
              <span>{{ detailObj.dealAmount }}</span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">是否重单深度：</span>
              <i-switch v-model="detailObj.isRepeatProfundityOrder" disabled />
            </div>
            <div class="mr_top items">
              <span class="title_bold">面诊类型：</span>
              <span>{{ detailObj.consultationTypeText }}</span>
            </div>
          </div>
           <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">业绩类型：</span>
            <span>{{ detailObj.dealPerformanceTypeText }}</span>
            </div>
            <!-- <div class="mr_top items">
              <span class="title_bold">获客方式：</span>
              <span>{{ detailObj.getCustomerTypeText }}</span>
            </div> -->
          </div>
         
          <div class="mr_top">
            <span class="title_bold">三方单号：</span>
            <span>{{ detailObj.otherContentPlatFormOrderId }}</span>
          </div>
          
          <div class="mr_top">
            <span class="title_bold">咨询内容：</span>
            <span>{{ detailObj.consultingContent }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">备注：</span>
            <span>{{ detailObj.remark }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">后期项目铺垫：</span>
            <span>{{ detailObj.lateProjectStage }} </span>
          </div>
          <div class="mr_top">
              <span class="title_bold">未派单原因：</span>
              <span>{{ detailObj.unSendReason }} </span>
            </div>
          <div class="fl_end">
            <div class="mr_top">
              <span class="title_bold">未成交原因：</span>
              <span>{{ detailObj.unDealReason }} </span>
            </div>
            <div style="display:flex;align-items:flex-end">
              <Button
                type="primary"
                @click="transactionStatus(detailObj.id,detailObj.consultationType)"
                style="margin-right:10px;"
                >成交情况</Button
              >
              <Button
                type="primary"
                @click="lookDoubleImg(detailObj.id)"
                style="margin-right:10px;"
                >查看重单截图</Button
              >
              <Button type="primary" @click="goodsNewsChange(detailObj)"
                >生成喜报</Button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>图片信息</div>
        <div class="order_content2">
          <div style="display:flex;align-items:center;width:50%">
            <span class="title_bold">成交凭证：</span>
            <viewer v-if="detailObj.dealPictureUrl"  baseLayerPicker ="true">
              <img :src="detailObj.dealPictureUrl" alt="" class="unImg">
            </viewer>
          </div>
          <div style="display:flex;align-items:center;margin-top:10px;width:50%">
            <span class="title_bold">未成交截图：</span>
            <viewer v-if="detailObj.unDealPictureUrl"  baseLayerPicker ="true" >
              <img :src="detailObj.unDealPictureUrl" alt="" class="unImg">
            </viewer>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>财务信息</div>
        <div class="order_content">
          <div  class="item_list">
            <div class="items">
              <span class="title_bold">审核时间：</span>
              <span
                >{{
                  detailObj.checkDate
                    ? this.$moment(detailObj.checkDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : ""
                }}
              </span>
            </div>
            <div class="items">
              <span class="title_bold">审核人：</span>
              <span>{{ detailObj.checkByName }} </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">审核状态：</span>
              <span>{{ detailObj.checkStateText }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">对账金额：</span>
              <span>{{ detailObj.checkPrice }} </span>
            </div>
          </div>
          <div  class="item_list">
            
            <div class="mr_top items">
              <span class="title_bold">是否开票：</span>
              <i-switch v-model="detailObj.isCreateBill" disabled />
            </div>
             <div class="mr_top items">
              <span class="title_bold">开票公司：</span>
              <span>{{ detailObj.createBillCompany }} </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items">
              <span class="title_bold">是否回款：</span>
              <i-switch v-model="detailObj.isReturnBackPrice" disabled />
            </div>
            <div class="mr_top items">
              <span class="title_bold">回款时间：</span>
              <span
                >{{
                  detailObj.returnBackDate
                    ? this.$moment(detailObj.returnBackDate).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    : ""
                }}
              </span>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items" v-if="isShow">
              <span class="title_bold">服务费合计：</span>
              <span>{{ detailObj.settlePrice }} </span>
            </div>
            <div class="fl_item" v-if="isShow">
              <div class="mr_top items2">
                <span class="title_bold">回款金额：</span>
                <span> {{ detailObj.returnBackPrice }}</span>
                <!--  -->
              </div>
            </div>
          </div>
          <div  class="item_list">
            <div class="mr_top items" >
              <span class="title_bold">助理服务费合计：</span>
              <span>{{ detailObj.customerServiceSettlePrice }} </span>
            </div>
            <div class="fl_item" >
              <div class="mr_top items2">
               
              </div>
              <Button type="primary" @click="lookCheckImg(detailObj.id)"
                >查看审核图片</Button
              >
            </div>
          </div>
        </div>
      </div>
      <Table
        border
        :columns="query.columns"
        :data="query.data"
        height="102"
        style="margin-top:10px"
      ></Table>
      <div slot="footer">
        <Button @click="handleCancelClick()">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="query.doubleOrderModel"
      title="重单截图"
      :mask-closable="false"
      @on-visible-change="handleVisibleChange"
    >
      <!-- 预览图片 -->
      <viewer v-if="query.repeateOrderPictureUrl">
        <img :src="query.repeateOrderPictureUrl" alt="" class="img" />
      </viewer>
      <div v-else style="text-align:center">暂无图片</div>
      <div slot="footer">
        <Button @click="handleVisibleChange()">关闭页面</Button>
      </div>
    </Modal>
    <!-- 查看顾客照片 -->
    <viewCustomerPhotos
      :viewCustomerPhotosModel.sync="viewCustomerPhotosModel"
      :contentPlatFormOrderId.sync="contentPlatFormOrderId"
    ></viewCustomerPhotos>
    <!-- 查看审核图片 -->
    <viewPic
      :viewPicModel.sync="viewPicModel"
      :viewPicList="viewPicList"
    ></viewPic>
    <!-- 成交情况 -->
    <transactionStatus
      @transactionStatusChange="transactionStatusChange"
      :transactionStatusParams="transactionStatusParams"
    />
    <!-- 生成喜报 -->
    <goodsNews :goodsNewsModel.sync="goodsNewsModel" :id="id"></goodsNews>
    <!--客户信息  -->
    <customerMessage :customerMessageModel.sync="customerMessageModel" 
    :customerMessageObj="customerMessageObj" :customerInfoComParams2="customerInfoComParams2" ></customerMessage>
    <!-- 生成预约日程 -->
    <appointmentSchedule :appointmentScheduleModel.sync="appointmentScheduleModel" :appointmentParams="appointmentParams" :detailObj="detailObj" ref="appointmentSchedule"/>
    <!-- 留言板 -->
    <messageBoard @messageBoardChange = "messageBoardChange"  :messageBoardParams = "messageBoardParams"/>
    <!-- 派单情况 -->
    <dispatch :dispatchModel.sync="dispatchModel" ref="dispatch" :id="id"/>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as OrderCheckPictureApi from "@/api/OrderCheckPicture.js";
import * as customerManageApi from "@/api/customerManage";
import * as customerApi from "@/api/customerAppointmentSchedule";
import * as shoppingCartRegistrationApi from "@/api/shoppingCartRegistration";
import dispatch from "./dispatch.vue"
import { time } from "echarts";
import viewCustomerPhotos from "@/components/viewCustomerPhotos/viewCustomerPhotos.vue";
import viewPic from "@/components/viewPic/viewPic";
import transactionStatus from "@/components/transactionStatus/contentTransactionStatus";
import goodsNews from "@/components/goodsNews/goodsNews.vue";
import customerMessage from "@/components/customerMessage/customerMessage"
import appointmentSchedule from "./appointmentSchedule.vue"
import messageBoard from "@/components/contentMessageBoard/contentMessageBoard.vue";

export default {
  props: {
    detailModel: Boolean,
    detailList: Array,
  },
  components: {
    viewCustomerPhotos,
    viewPic,
    transactionStatus,
    goodsNews,
    customerMessage,
    appointmentSchedule,
    messageBoard,
    dispatch
  },
  data() {
    return {
      // 派单情况model
      dispatchModel:false,
      isShow:false,
      // 是否生成预约日程
      customerAppointmentScheduleInfo:{
        isCustomerAppointmentSchedule:false,
        appointmentDate:''
      },
       //  留言板
      messageBoardParams: {
        hospitalId: null,
        id: null,
        content: "",
        messageBoard: false,
      },
      customerMessageModel:false,
      // 客户信息组件参数
      customerInfoComParams2: {
        userId: "",
        encryptPhone: "",
        tabGlag:false
      },
      customerMessageObj:{},
      // 生成喜报
      goodsNewsModel: false,
      id: "",
      // 成交情况传参
      transactionStatusParams: {
        contentPlatFormOrderId: "",
        transactionStatusModel: false,
        consultationTypeText:''
      },
      // 查看审核图片
      viewPicList: [],
      viewPicModel: false,
      // 查看图片
      viewCustomerPhotosModel: false,
      contentPlatFormOrderId: "",
      time: null,
      detailObj: {},
      controlModel: false,

      // 生成预约日程
      appointmentParams:{
        // 预约类型
        appointmentTypeList:[],
        // 紧急程度
        emergencyLevelsList:[],
        orderId:''
      },
      // 生成预约日程model
      appointmentScheduleModel:false,
      query: {
        doubleOrderModel: false,
        columns: [
          {
            title: "科室",
            key: "hospitalDepartmentName",
            minWidth: 120,
            align: "center",
          },
          {
            title: "项目",
            key: "thumbPicture",
            minWidth: 200,
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
                      src: params.row.thumbPicture,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },

          {
            title: "定金金额",
            key: "depositAmount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "下单金额",
            key: "addOrderPrice",
            minWidth: 120,
            align: "center",
          },
          // {
          //   title: "成交金额",
          //   key: "dealAmount",
          //   minWidth: 120,
          //   align: "center",
          // },
        ],
        data: [],
      },
    };
  },

  methods: {
    // 派单情况
    dispatchClick(id){
      this.dispatchModel = true
      this.id = id
    },
    // 生成预约日程
    appointmentScheduleClick(orderId){
      this.appointmentScheduleModel =true
      this.appointmentParams.orderId = orderId
    },
    // 留言板
    messageBoardChange() {
      this.messageBoardParams.messageBoard = false;
    },
    // 留言板
    messageClick(){
      this.messageBoardParams.id = this.detailObj.id
      this.messageBoardParams.messageBoard = true
    },
    
    // 预约类型
    getAppointmentTypeList() {
      customerApi.getAppointmentTypeList().then((res) => {
        if (res.code === 0) {
          const { appointmentTypeList } = res.data;
          this.appointmentParams.appointmentTypeList = appointmentTypeList;
        }
      });
    },
    
    // 紧急程度（下拉框）
    getEmergencyLevels() {
      shoppingCartRegistrationApi.emergencyLevels().then((res) => {
        if (res.code === 0) {
          const { emergencyLevels } = res.data;
          this.appointmentParams.emergencyLevelsList = emergencyLevels;
          
        }
      });
    },
    customerClick(value){
      const {userId,encryptPhone} = value
      let data = {
            encryptPhone:encryptPhone
          }
      customerManageApi.getBaseAndBindCustomerInfoByEncryptPhone(data).then((res) => {
        if(res.code === 0){
          this.customerInfoComParams2.userId = userId;
          this.customerInfoComParams2.encryptPhone = encryptPhone;
          this.customerInfoComParams2.tabGlag = true;
          this.customerMessageModel = true
          this.customerMessageObj = res.data.customer
        }
      })
    },
    transactionStatus(id,consultationType) {
      this.transactionStatusParams.contentPlatFormOrderId = id;
      this.transactionStatusParams.transactionStatusModel = true;
      this.transactionStatusParams.consultationTypeText = consultationType == 0 ? '其他' : consultationType == 1 ? '独立跟进' :consultationType == 2 ? '协作完成' : '' 
    },
    // 成交情况
    transactionStatusChange() {
      this.transactionStatusParams.transactionStatusModel = false;
    },
    onCopy: function(e) {
      this.$Message.success("你已复制成功！");
    },
    onError: function(e) {
      this.$Message.error("无法复制文本！");
    },
    // 查看审核图片
    lookCheckImg(id) {
      const data = {
        OrderId: id,
        OrderFrom: 2,
        pageNum: 1,
        pageSize: 10,
      };
      OrderCheckPictureApi.OrderCheckPicture(data).then((res) => {
        if (res.code === 0) {
          const { list } = res.data.orderCheckPictureInfo;
          this.viewPicList = list;
          if (this.viewPicList.length > 0) {
            this.viewPicModel = true;
          } else {
            this.$Message.warning("暂无审核图片");
          }
        }
      });
    },
    // 查看顾客照片
    lookImg(id) {
      this.viewCustomerPhotosModel = true;
      this.contentPlatFormOrderId = id;
    },
    // 查看重单截图
    lookDoubleImg(id) {
      const data = {
        id: id,
      };
      api.byselectRepeateOrderPic(data).then((res) => {
        if (res.code === 0) {
          const { repeateOrderPictureUrl } = res.data;
          if (repeateOrderPictureUrl) {
            this.query.repeateOrderPictureUrl = repeateOrderPictureUrl;
            this.query.doubleOrderModel = true;
          } else {
            this.$Message.warning("暂无重单截图");
          }
        }
      });
    },
    // 生成喜报
    goodsNewsChange(value) {
      if (value.orderStatusText == "已成交") {
        this.goodsNewsModel = true;
        this.id = value.id;
      } else {
        this.$Message.warning("该订单暂未成交，无法生成喜报");
      }
    },
    // modal 显示状态发生变化时触发
    handleVisibleChange(value) {
      if (!value) {
        this.query.doubleOrderModel = false;
      }
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancelClick();
        this.$emit("update:detailModel", false);
        this.customerAppointmentScheduleInfo.isCustomerAppointmentSchedule = false
      this.customerAppointmentScheduleInfo.appointmentDate = ''
      }
    },
    // 取消
    handleCancelClick(name) {
      this.$emit("update:detailModel", false);
      this.customerAppointmentScheduleInfo.isCustomerAppointmentSchedule = false
      this.customerAppointmentScheduleInfo.appointmentDate = ''
    },
  },
  created(){
    this.getAppointmentTypeList()
    this.getEmergencyLevels()
  },
  watch: {
    detailModel(value) {
      this.controlModel = value;
       const currentRole = JSON.parse(
          sessionStorage.getItem("permissions")
        );
        // 服务费按钮权限
        this.isShow = currentRole.some((ele) => {
          return "fx.amiya.permission.SELECT_RETURN_BACK_PRICE".includes(
            ele
          );
        });
    },
    detailList(value) {
      this.query.data = value;
      this.detailObj = value[0];
      this.time =value[0].orderStatusText == "未派单"? 0: value[0].orderStatusText == "已派单" ? 1: 2;
      // 根据加密手机号获取是否生成过预约日程信息
      const data = {
        encryptPhone:value[0].encryptPhone
      }
       api.byCustomerAppointmentScheduleEncryptPhone(data).then(res=>{
          if(res.code == 0){
            const {id,appointmentDate} = res.data.customerAppointmentScheduleInfo
            if(!id){
              this.isCustomerAppointmentSchedule = false
              
            }else{
              this.customerAppointmentScheduleInfo.isCustomerAppointmentSchedule = true
              this.customerAppointmentScheduleInfo.appointmentDate = appointmentDate ?  this.$moment(appointmentDate).format(
                    'YYYY-MM-DD HH:mm:ss'
                  ) 
                  : ''
            }
            
          }
        })
    },
  },
};
</script>
<style scoped>
.order_con {
  background: #fcfcfc;
  border: 1px solid #dad0d0;
  padding: 10px 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: #000;
}
.order_message {
  margin-top: 20px;
  color: #000;
}

.line {
  width: 1px;
  height: 20px;
  border: 2px solid #4381e6;
  background: #4381e6;
  margin-right: 5px;
  margin-left: 0;
}
.message_title {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.order_content ,.order_content2{
  margin-top: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  border: 1px solid #dad0d0;
  margin-bottom: 20px;
}
.order_content2{
  display: flex;
}
.title_bold {
  font-weight: bold;
}
.order_type {
  display: flex;
}
.order_time {
  margin-left: 100px;
}
.mr_top {
  margin-top: 10px;
}
.mr {
  margin: 20px 0 10px;
}
.fl_end,.fl_end2 {
  display: flex;
  justify-content: space-between;
}
.img {
  width: 100%;
  height: auto;
}
.order_id {
  color: red;
}
.unImg{
  width: 40px;
  height: 40px;
  
}
.item_list{
  display: flex;
  /* justify-content: space-between; */
}
.items{
  width: 50%;
}
.fl_item{
  display: flex;
}
.items2{
  width: 360px;
}
.appoint{
  display:flex;
  justify-content:flex-end;
  margin-top:10px;
  margin-right:-5px
}
</style>
