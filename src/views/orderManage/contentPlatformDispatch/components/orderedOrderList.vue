<template>
  <div>
    <Card>
      <div class="content">
        <div>
          <div class="top">
            <Input
              v-model="query.keyword"
              placeholder="请输入关键词"
              style="width:200px;"
              @keyup.enter.native="getSendOrderInfo()"
            />
            <Input
              v-model="query.commissionRatio"
              placeholder="请输入佣金比例(%)"
              type="number"
              number
              style="width:160px;margin-left: 10px"
              @keyup.enter.native="getSendOrderInfo()"
            />
            <DatePicker
              type="date"
              placeholder="派单开始日期"
              style="width: 160px;margin-left: 10px"
              :value="query.startDate"
              v-model="query.startDate"
              transfer
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="派单结束日期"
              style="width: 160px; margin-left: 10px"
              :value="query.endDate"
              v-model="query.endDate"
              transfer
            ></DatePicker>
            <Select
              v-model="query.IsToHospital"
              style="width: 160px;margin-left: 10px"
              placeholder="请选择到院状态"
            >
              <Option
                v-for="item in query.toTheHospitalList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="到院开始日期"
              style="width: 150px;margin-left: 10px"
              :value="query.toHospitalStartDate"
              v-model="query.toHospitalStartDate"
              transfer
              :disabled="query.IsToHospital!='true'"
              
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="到院结束日期"
              style="width: 150px; margin-left: 10px"
              :value="query.toHospitalEndDate"
              v-model="query.toHospitalEndDate"
              transfer
              :disabled="query.IsToHospital!='true'"
            ></DatePicker>
            <Select
              v-model="query.toHospitalType"
              style="width: 160px;margin-left: 10px"
              placeholder="请选择到院类型"
              :disabled="query.IsToHospital!='true'"
              clearable
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
          <div>
            <Select
              v-model="query.contentPlatFormId"
              style="width: 200px;"
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
              style="width: 160px;margin-left: 10px"
              placeholder="请选择订单状态"
              filterable
            >
              <Option
                v-for="item in query.statusCodeList"
                :value="item.orderStatus"
                :key="item.orderStatus"
                >{{ item.orderStatusText }}</Option
              >
            </Select>
            <Select
              v-model="query.orderSource"
              style="width: 160px;margin-left: 10px"
            >
              <Option
                v-for="item in orderSourcesListAll"
                :value="item.orderSource"
                :key="item.orderSource"
                >{{ item.orderSourceText }}</Option
              >
            </Select>
            <Select
              v-model="query.liveAnchorPlatform"
              placeholder="请选择主播平台"
              @on-change="contentPlateChange(query.liveAnchorPlatform)"
              style="width: 160px; margin-left: 10px"
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
              :disabled="query.liveAnchorPlatform === null"
              filterable
            >
              <Option
                v-for="item in liveAnchors"
                :value="item.id"
                :key="item.id"
                >{{ item.hostAccountName }}</Option
              >
            </Select>
            
            <!-- <Select
              v-model="query.consultationEmpId"
              placeholder="请选择面诊员"
              style="width: 150px;margin-left: 10px"
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
              v-model="query.isAcompanying"
              style="width:150px;margin-left:10px"
              placeholder="请选择陪诊状态"
            >
              <Option
                v-for="item in query.isAcompanyingList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            
            <Select
              v-model="query.employeeId"
              style="width: 150px;margin-left: 10px"
              v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }"
              placeholder="请选择归属客服"
              filterable
              transfer
            >
              <Option
                v-for="item in employee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.sendBy"
              style="width: 160px;margin-left: 10px"
              placeholder="请选择派单客服"
              filterable
              transfer
            >
              <Option
                v-for="item in dispatchEmployee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </div>
          <div style="margin-top:10px">
            
            <Select
              v-model="query.isOldCustomer"
              style="width: 200px;"
              placeholder="请选择新老客业绩状态"
            >
              <Option
                v-for="item in query.isOldCustomerList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.hospitalIds"
              style="width: 240px;margin-left: 10px"
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
        <Button
          type="primary"
          @click="getSendOrderInfo()"
          style="margin-left: 10px"
          >查询</Button
        >
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
    <!-- 编辑 -->
    <Modal
      v-model="controlModal"
      title="修改"
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
          :required="!openAllHospital ? true : false"
          prop="hospitalId"
          v-if="!openAllHospital"
          key="已参与项目医院"
        >
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable>
            <Option v-for="item in hospital" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="所有医院"
          :required="openAllHospital ? true : false"
          prop="allHospitalId"
          v-if="openAllHospital"
          key="所有医院"
        >
          <Select
            v-model="form.allHospitalId"
            placeholder="请选择医院"
            filterable
          >
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
        </FormItem>
        <FormItem
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

        <FormItem
          label="留言"
          v-show="form.hospitalId || form.allHospitalId !== form.tempHospitalId"
        >
          <Input
            v-model="form.content"
            placeholder="请输入留言"
            type="textarea"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 确认 -->
    <Modal
      v-model="contentConfirmOrderModel"
      title="确认"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="confirmForm"
        :model="confirmForm"
        :rules="confirmRuleValidate"
        label-position="left"
        :label-width="130"
      >
        
        <FormItem label="是否到院" prop="isToHospital" key="是否到院">
          <i-switch
            v-model="confirmForm.isToHospital"
            :disabled="confirmForm.isFinish === true"
            @on-change="isToHospitalChange"
          />
        </FormItem>
        <FormItem label="到院类型" prop="toHospitalType" key="到院类型" v-if="confirmForm.isToHospital === true">
          <Select
              v-model="confirmForm.toHospitalType"
              placeholder="请选择到院类型"
              clearable
              filterable
            >
              <Option
                v-for="item in toHospitalTypeList"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select>
        </FormItem>
        <FormItem label="到院时间" prop="toHospitalDate" key="到院时间" v-if="confirmForm.isToHospital === true">
          <DatePicker
            type="date"
            placeholder="到院时间"
            :value="confirmForm.toHospitalDate"
            v-model="confirmForm.toHospitalDate"
            style="width:360px"
            transfer
          ></DatePicker>
        </FormItem>
        <FormItem label="是否陪诊" prop="isAcompanying" key="是否陪诊" v-if="confirmForm.isToHospital === true">
          <i-switch
            v-model="confirmForm.isAcompanying"
          />
        </FormItem>
        <FormItem label="是否成交" prop="isFinish" key="是否成交">
          <i-switch v-model="confirmForm.isFinish" @on-change="switchChange" />
        </FormItem>
        <FormItem label="成交医院" prop="lastDealHospitalId" key="成交医院"  v-if="confirmForm.isFinish === true">
          <Select
            v-model="confirmForm.lastDealHospitalId"
            placeholder="请选择成交医院"
            filterable
          >
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem
          label="未成交原因"
          prop="unDealReason"
          v-if="confirmForm.isFinish !== true"
          key="未成交原因"
        >
          <Input
            v-model="confirmForm.unDealReason"
            placeholder="请输入未成交原因"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem
          label="未成交截图"
          key="未成交截图"
          v-if="confirmForm.isFinish !== true"
        >
          <upload
            :uploadObj="noDealuploadObj"
            @uploadChange="noDealhandleUploadChange"
          />
        </FormItem>
        <FormItem
          label="成交金额"
          v-if="confirmForm.isFinish === true"
          prop="dealAmount"
          key="成交金额"
          :rules="[
            {
              required: true,
              message: '请输入成交金额(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 1,
            },
          ]"
        >
          <Input
            v-model="confirmForm.dealAmount"
            placeholder="请输入成交金额"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem
          label="成交时间"
          prop="DealDate"
          v-if="confirmForm.isFinish === true"
          key="成交时间"
        >
          <DatePicker
            type="date"
            placeholder="成交时间"
            style="width: 100%"
            v-model="confirmForm.DealDate"
          ></DatePicker>
        </FormItem>
        <FormItem
          label="佣金比例(%)"
          prop="commissionRatio"
          key="佣金比例(%)"
          v-if="confirmForm.isFinish === true"
          :rules="[
            {
              required: true,
              message: '佣金比例(%)最小为1，最为为100',
              trigger: 'change',
              type: 'number',
              max: 100,
              min:1
            },
          ]"
        >
          <Input
            v-model="confirmForm.commissionRatio"
            placeholder="请输入佣金比例(%)"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem
          label="抖店订单号"
          prop="otherContentPlatFormOrderId"
          key="抖店订单号"
        >
          <Input
            v-model="confirmForm.otherContentPlatFormOrderId"
            placeholder="请输入抖店订单号"
          ></Input>
        </FormItem>
        <FormItem
          label="后期项目铺垫"
          v-if="confirmForm.isFinish === true"
          key="后期项目铺垫"
        >
          <Input
            v-model="confirmForm.lastProjectStage"
            placeholder="请输入后期项目铺垫"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem
          label="面诊状态"
          prop="consultatioType"
          key="面诊状态"
        >
          <Input
            v-model="confirmForm.consultatioType"
            placeholder="请输入面诊状态"
            disabled
          ></Input>
        </FormItem>
        <FormItem
          label="成交凭证"
          key="成交凭证"
          v-if="confirmForm.isFinish === true"
        >
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <FormItem
          label="邀约凭证"
          key="邀约凭证"
        >
          <upload :uploadObj="invitationDocumentsUploadObj" @uploadChange="invitationDocumentsHandleUploadChange" />
        </FormItem>
        <!-- <div style="color:red;font-size:3px" v-if="confirmForm.isFinish === true">*注：请上传该手机号客户在贵公司系统的成交凭证截图</div> -->
      </Form>
      <div slot="footer">
        <Button @click="cancel('confirmForm')">取消</Button>
        <Button type="primary" @click="confirmSubmit('confirmForm')"
          >确定</Button
        >
      </div>
    </Modal>
    <!-- 成交情况 -->
    <transactionStatus
      @transactionStatusChange="transactionStatusChange"
      :transactionStatusParams="transactionStatusParams"
    />

    <!-- 留言板 -->
    <messageBoard
      @messageBoardChange="messageBoardChange"
      :messageBoardParams="messageBoardParams"
    />
     <!-- 查看顾客照片 -->
    <viewCustomerPhotos :viewCustomerPhotosModel.sync ="viewCustomerPhotosModel" :contentPlatFormOrderId.sync ="contentPlatFormOrderId"></viewCustomerPhotos>
    <!-- 订单详情 -->
    <detail :detailModel.sync ="detailModel" :detailList ="detailList"></detail>
    <!-- 重单截图 -->
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
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import messageBoard from "@/components/messageBoard/messageBoard.vue";
import transactionStatus from "@/components/transactionStatus/transactionStatus";
import upload from "@/components/upload/upload";
import trackReturnVisitVue from "../../../../components/trackReturnVisit/trackReturnVisit.vue";
import viewCustomerPhotos from "@/components/viewCustomerPhotos/viewCustomerPhotos.vue"
import detail from "@/components/contentDetail/detail.vue"

export default {
   props:{
    activeName:String,
    consultationNameList:Array
  },
  components: {
    messageBoard,
    transactionStatus,
    upload,
    viewCustomerPhotos,
    detail
  },
  data() {
    return {
      detailList:[],
      detailModel:false,
      consultationEmpId:-1,
      // 查看图片 
      viewCustomerPhotosModel:false,
      contentPlatFormOrderId:'',
      orderSourcesListAll: [
        { orderSource: -1, orderSourceText: "全部订单来源" },
      ],
      // 主播IP
      liveAnchors: [],
      // 邀约凭证
      invitationDocumentsUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 5,
        // 文件列表
        uploadList: [],
      },
      noDealuploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      delUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      contentConfirmOrderModel: false,
      confirmForm: {
        id: null,
        // 是否成交
        isFinish: false,
        // 成交金额
        dealAmount: null,
        //后期铺垫
        lastProjectStage: "",
        // 成交凭证
        dealPictureUrl: "",
        // 未成交原因
        unDealReason: "",
        // 是否到院
        isToHospital: false,
        // 未成交截图
        unDealPictureUrl: "",
        // 成交时间
        DealDate: null,
        lastDealHospitalId:null,
        toHospitalDate:'',
        // 抖店订单号
        otherContentPlatFormOrderId:'',
        // 到院类型
        toHospitalType:null,
        // 是否陪诊
        isAcompanying:false,
        // 佣金比例
        commissionRatio:null,
        // 面诊状态
        consultatioType:'',
        // 邀约凭证
        invitationDocuments:[]
      },
      confirmRuleValidate: {
        unDealReason: [
          {
            required: true,
            message: "请输入未成交原因",
            trigger: "blur",
          },
        ],
        dealAmount: [
          {
            required: true,
            message: "请输入成交金额",
            trigger: "blur",
          },
        ],
        commissionRatio: [
          {
            required: true,
            message: "请输入佣金比例(%)",
          },
        ],
        DealDate: [
          {
            required: true,
            message: "请选择成交时间",
          },
        ],
        toHospitalDate: [
          {
            required: true,
            message: "请选择到院时间",
          },
        ],
        lastDealHospitalId: [
          {
            required: true,
            message: "请选择成交医院",
          },
        ],
        toHospitalType: [
          {
            required: true,
            message: "请选择到院类型",
          },
        ],
      },
      employee: [{ name: "全部归属客服", id: -1 }],
      dispatchEmployee:[{ name: "全部派单客服", id: -1 }],
      query: {
        // 陪诊
        isAcompanying:-1,
        // 新老客业绩
        isOldCustomer:-1,
        // 佣金比例
        commissionRatio:null,
        toHospitalType:-1,
        toHospitalStartDate:"",
        toHospitalEndDate:"",
        sendBy:-1,
        consultationEmpId:-1,
        orderSource: -1,
        // 重单截图
        repeateOrderPictureUrl: "",
        doubleOrderModel: false,
        // 是否到院数组
        toTheHospitalList: [
          {
            id: -1,
            name: "全部到院状态",
          },
          {
            id: 'true',
            name: "已到院",
          },
          {
            id: 'false',
            name: "未到院",
          },
        ],
        // 是否陪诊
        isAcompanyingList:[
          {
            type:-1,
            name:'全部陪诊状态'
          },
          {
            type:'true',
            name:'是'
          },
          {
            type:'false',
            name:'否'
          }
        ],
        // 是否为老客
        isOldCustomerList:[
          {
            type:-1,
            name:'全部客户业绩'
          },
          {
            type:'true',
            name:'老客'
          },
          {
            type:'false',
            name:'新客'
          }
        ],
        IsToHospital: -1,
        // 用于筛选的下拉框
        hospitalIds: 0,
        contentPlatFormId: "",
        orderStatus: null,
        // 订单状态
        statusCodeList: [],
        // 下单平台
        contentPalteForms: [],
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        liveAnchorPlatform: null,
        liveAnchorId: null,
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
        employeeId: -1,
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            title: "订单编号",
            key: "orderId",
            minWidth: 180,
            align: "center",
          },

          // {
          //   title: "预约时间",
          //   key: "appointmentDate",
          //   minWidth: 120,
          //   align: "center",
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //       params.row.appointmentDate == "未确认时间"
          //         ? "未确认时间"
          //         : this.$moment(params.row.appointmentDate).format(
          //             "YYYY-MM-DD"
          //           )
          //     );
          //   },
          // },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 180,
            align: "center",
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 180,
            align: "center",
            render: (h, params) => {
              const { phone, isHospitalCheckPhone } = params.row;
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
                    phone
                  ),
                  h(
                    "span",
                    {
                      style: {
                        color: "#2d8cf0",
                      },
                    },
                    isHospitalCheckPhone ? "已查看" : ""
                  ),
                ]
              );
            },
          },
          {
            title: "派单医院",
            key: "sendHospital",
            minWidth: 220,
            align: "center",
          },
          {
            title: "项目",
            key: "thumbPictureUrl",
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
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
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
          // {
          //   title: "面诊员",
          //   minWidth: 120,
          //   key: "consultationEmpName",
          //   align:'center'
          // },
          {
            title: "咨询内容",
            minWidth: 400,
            key: "consultingContent",
          },
          {
            title: "面诊状态",
            key: "consultatioType",
            minWidth: 120,
            align: "center",
          },
          {
            title: "所属平台",
            key: "contentPlatFormName",
            minWidth: 120,
            align: "center",
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 160,
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
              }else {
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
          // {
          //   title: "抖店订单号",
          //   key: "otherContentPlatFormOrderId",
          //   minWidth: 180,
          //   align: "center",
          // },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isToHospital,
                    size: "default",
                    disabled:
                      params.row.isToHospital === true ||
                      params.row.isToHospital === false,
                  },
                },
                h("span", { isToHospital: "open" }, "开"),
                h("span", { isToHospital: "close" }, "关")
              );
            },
          },
          {
            title: "到院类型",
            minWidth: 120,
            key: "toHospitalTypeText",
            align:'center',
          },
          {
            title: "到院时间",
            key: "toHospitalDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.toHospitalDate
                ? h(
                    "div",
                    this.$moment(params.row.toHospitalDate).format("YYYY-MM-DD")
                  )
                : "";
            },
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
          {
            title: "新老客业绩",
            minWidth: 120,
            key: "isOldCustomer",
            align:'center',
          },
          {
            title: "佣金比例(%)",
            minWidth: 120,
            key: "commissionRatio",
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.commissionRatio!=0  ? params.row.commissionRatio + '%' : '0%'
                  )
                ;
            }
          },
          // {
          //   title: "成交凭证",
          //   key: "dealPictureUrl",
          //   minWidth: 120,
          //   align: "center",
          //   render: (h, params) => {
          //     return params.row.dealPictureUrl
          //       ? h(
          //           "viewer",
          //           {
          //             props: {
          //               zoomable: false,
          //             },
          //             style: {
          //               display: "flex",
          //             },
          //           },
          //           [
          //             h("img", {
          //               style: {
          //                 width: "50px",
          //                 height: "50px",
          //                 margin: "5px 15px 5px 5px",
          //                 verticalAlign: "middle",
          //               },
          //               attrs: {
          //                 src: params.row.dealPictureUrl,
          //               },
          //             }),
          //           ]
          //         )
          //       : "";
          //   },
          // },
          {
            title: "未成交原因",
            key: "unDealReason",
            minWidth: 200,
          },
          // {
          //   title: "未成交截图",
          //   key: "unDealPictureUrl",
          //   minWidth: 120,
          //   align: "center",
          //   render: (h, params) => {
          //     return params.row.unDealPictureUrl
          //       ? h(
          //           "viewer",
          //           {
          //             props: {
          //               zoomable: false,
          //             },
          //             style: {
          //               display: "flex",
          //             },
          //           },
          //           [
          //             h("img", {
          //               style: {
          //                 width: "50px",
          //                 height: "50px",
          //                 margin: "5px 15px 5px 5px",
          //                 verticalAlign: "middle",
          //               },
          //               attrs: {
          //                 src: params.row.unDealPictureUrl,
          //               },
          //             }),
          //           ]
          //         )
          //       : "";
          //   },
          // },
          // {
          //   title: "订单类型",
          //   key: "orderTypeText",
          //   minWidth: 120,
          //   align: "center",
          // },

          // {
          //   title: "定金金额",
          //   key: "depositAmount",
          //   minWidth: 120,
          //   align: "center",
          // },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 180,
            align: "center",
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
            title: "成交金额",
            key: "dealAmount",
            minWidth: 140,
            align: "center",
          },
          {
            title: "派单时间",
            key: "sendDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.sendDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "派单人",
            key: "senderName",
            minWidth: 140,
            align: "center",
          },
          
          // {
          //   title: "派单留言",
          //   minWidth: 400,
          //   key: "sendOrderRemark",
          // },
          {
            title: "订单来源",
            key: "orderSourceText",
            minWidth: 120,
            align: "center",
          },
          // {
          //   title: "接诊咨询",
          //   key: "acceptConsulting",
          //   minWidth: 200,
          //   align: "center",
          // },
          // {
          //   title: "后期铺垫",
          //   minWidth: 400,
          //   key: "lateProjectStage",
          // },
          {
            title: "订单备注",
            minWidth: 400,
            key: "orderRemark",
          },
          {
            title: "医院备注",
            minWidth: 400,
            key: "hospitalRemark",
          },
          {
            title: "操作",
            width: 350,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //     },
                //     on: {
                //       click: () => {
                //         const { hospitalId , id} = params.row;
                //         this.messageBoardParams.hospitalId = hospitalId
                //         this.messageBoardParams.id = id
                //         this.messageBoardParams.messageBoard = true
                //       },
                //     },
                //   },
                //   "留言板"
                // ),
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
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //     },
                //     style: {
                //       marginLeft: "5px",
                //     },
                //     on: {
                //       click: () => {
                //         const { id, orderId } = params.row;
                //         this.transactionStatusParams.contentPlatFormOrderId = orderId;
                //         this.transactionStatusParams.transactionStatusModel = true;
                //       },
                //     },
                //   },
                //   "成交情况"
                // ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.checkState == 2
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { id, orderId, goodsId } = params.row;
                        this.form.id = id;
                        this.form.orderId = orderId;
                        // this.byGoodsIdGetpartakeItemHospitalList(goodsId,() => {
                        api.simpleById(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              hospitalId,
                              appointmentDate,
                              timeType,
                              content,
                              isUncertainDate,
                            } = res.data.sendOrderInfo;
                            // 已参与项目医院
                            const ycyxmyy = this.hospital.find(
                              (item) => item.id === hospitalId
                            );
                            // 所有医院
                            const syyy = this.hospitalInfo.find(
                              (item) => item.id === hospitalId
                            );
                            // 如果已参与项目医院中存在要修改的医院
                            if (ycyxmyy) {
                              this.form.hospitalId = hospitalId;
                              this.form.tempHospitalId = hospitalId;
                            }
                            // 如果所有医院中存在要修改的医院
                            if (syyy) {
                              this.form.allHospitalId = hospitalId;
                              this.form.tempHospitalId = hospitalId;
                              this.openAllHospital = true;
                            }
                            // 如果已参与项目医院中存在 且 所有医院中存在 则 优先显示已参与项目医院
                            if (ycyxmyy && syyy) {
                              this.openAllHospital = false;
                            }
                            this.form.appointmentDate = appointmentDate;
                            this.form.timeType = timeType;
                            this.form.content = content;
                            this.form.isUncertainDate = isUncertainDate;
                            this.controlModal = true;
                          }
                          // });
                        });
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      
                      // disabled: params.row.orderStatusText =='未成交' || params.row.orderStatusText =='已成交',
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { id, orderId,consultatioType } = params.row;
                        this.contentConfirmOrderModel = true;
                        this.confirmForm.id = orderId;
                        this.confirmForm.consultatioType = consultatioType
                      },
                    },
                  },
                  "确认"
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
                        this.$emit(
                          "handleCustomerInfoComParams",
                          this.customerInfoComParams
                        );
                      },
                    },
                  },
                  "客户详情"
                ),
                // params.row.orderStatusText === "医院重单"
                //   ? h(
                //       "Button",
                //       {
                //         props: {
                //           type: "primary",
                //           size: "small",
                //           // disabled:params.row.orderStatusText !== '医院重单'
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
                //                 } else {
                //                   this.$Message.error("暂无重单截图");
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
        statusCode: "",
      },
      // 到院状态
      toHospitalTypeList:[],
      // 控制 modal
      controlModal: false,
      // 开启所有医院
      openAllHospital: false,
      form: {
        id: "",
        orderId: "",
        hospitalId: "",
        // 临时，用于判断修改留言板显示/隐藏
        tempHospitalId: "",
        // 所有医院中选择
        allHospitalId: "",
        appointmentDate: "",
        timeType: "",
        // 留言
        content: "",
        // 未确定时间
        isUncertainDate: false,
      },

      // 医院列表
      hospital: [],

      // 所有医院
      hospitalInfo: [],
      hospitallist: [{ id: 0, name: "全部医院" }],

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
            type: "number",
            required: !this.openAllHospital ? true : false,
            message: "请选择医院",
            trigger: "change",
          },
        ],
        allHospitalId: [
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
      // 客户信息组件参数 留言板
      messageBoardParams: {
        hospitalId: 0,
        id: 0,
        content: "",
        messageBoard: false,
      },
      // 成交情况传参
      transactionStatusParams: {
        contentPlatFormOrderId: "",
        transactionStatusModel: false,
      },
    };
  },
  methods: {
    //   获取订单到院类型
    getcontentPlateFormOrderToHospitalTypeList() {
      api.contentPlateFormOrderToHospitalTypeList().then((res) => {
        if (res.code === 0) {
          const { orderTypes } = res.data;
          this.toHospitalTypeList = orderTypes
        }
      });
    },
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
    // 未成交截图
    noDealhandleUploadChange(values) {
      this.confirmForm.unDealPictureUrl = values[0];
    },
    // 是否到院
    isToHospitalChange(){
      if(this.confirmForm.isToHospital == false){
        this.confirmForm.toHospitalDate = null
        this.confirmForm.toHospitalType = null
        this.confirmForm.isAcompanying = false
      }
    },
    switchChange() {
      if (this.confirmForm.isFinish === true) {
        this.confirmForm.unDealReason = "";
        this.confirmForm.isToHospital = true;
        this.confirmForm.dealAmount = "";
        this.confirmForm.lastProjectStage = "";
        this.uploadObj.uploadList = [];
        this.confirmForm.DealDate = null;
        this.confirmForm.lastDealHospitalId = null
      } else {
        this.confirmForm.dealAmount = null;
        this.confirmForm.lastProjectStage = "";
        this.confirmForm.isToHospital = false;
        this.confirmForm.unDealReason = "";
        this.noDealuploadObj.uploadList = [];
        this.confirmForm.toHospitalDate = null
        this.confirmForm.toHospitalType = null
        this.confirmForm.commissionRatio = ''
        this.confirmForm.isAcompanying = false
      }
    },
    // 图片
    handleUploadChange(values) {
      this.confirmForm.dealPictureUrl = values[0];
    },
    // 邀约凭证
     invitationDocumentsHandleUploadChange(values) {
      this.confirmForm.invitationDocuments = values;
    },
    // 确认
    confirmSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            isFinish,
            dealAmount,
            lastProjectStage,
            dealPictureUrl,
            unDealReason,
            isToHospital,
            unDealPictureUrl,
            DealDate,
            lastDealHospitalId,
            toHospitalDate,
            otherContentPlatFormOrderId,
            toHospitalType,
            isAcompanying,
            commissionRatio,
            invitationDocuments
          } = this.confirmForm;
          const data = {
            id,
            isFinish,
            dealAmount: isFinish == true ? dealAmount : 0,
            lastProjectStage: isFinish == true ? lastProjectStage : "",
            dealPictureUrl: isFinish == true ? dealPictureUrl : "",
            unDealReason: isFinish == true ? "" : unDealReason,
            isToHospital: isFinish === true ? true : isToHospital,
            unDealPictureUrl:
              isFinish === true ? "" : unDealPictureUrl ? unDealPictureUrl : "",
            DealDate: DealDate
              ? this.$moment(DealDate).format("YYYY-MM-DD")
              : null,
            lastDealHospitalId,
            toHospitalDate: toHospitalDate
              ? this.$moment(toHospitalDate).format("YYYY-MM-DD")
              : null,
              otherContentPlatFormOrderId,
            toHospitalType:isToHospital == false ? 0 : toHospitalType,
            isAcompanying,
            commissionRatio:isFinish == false ? 0 : commissionRatio,
            invitationDocuments
          };
          api.finishContentPlateFormOrderByEmployee(data).then((res) => {
            if (res.code === 0) {
              this.cancel("confirmForm");
              this.getSendOrderInfo();
              this.$Message.success({
                content: "确认成功",
                duration: 3,
              });
            }
          });
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
    // 获取平台下单列表
    getOrderPlatform() {
      api.getOrderPlatform().then((res) => {
        if (res.code === 0) {
          const { orderAppTypes } = res.data;
          this.query.orderAppTypes = [
            ...this.query.orderAppTypes,
            ...orderAppTypes,
          ];
        }
      });
    },
    // 成交情况
    transactionStatusChange() {
      this.transactionStatusParams.transactionStatusModel = false;
    },
    // 留言板
    messageBoardChange() {
      this.messageBoardParams.messageBoard = false;
    },
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
          this.dispatchEmployee = [...this.dispatchEmployee,...employee]
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

    // 获取派单信息列表
    getSendOrderInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        startDate,
        endDate,
        keyword,
        pageNum,
        pageSize,
        employeeId,
        orderStatus,
        contentPlatFormId,
        hospitalIds,
        IsToHospital,
        liveAnchorId,
        orderSource,
        consultationEmpId,
        sendBy,
        toHospitalStartDate,
        toHospitalEndDate,
        toHospitalType,
        isAcompanying,
        isOldCustomer,
        commissionRatio

      } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        // toHospitalStartDate: toHospitalStartDate ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD"): null,
        // toHospitalEndDate: toHospitalEndDate ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD") : null,
        // IsToHospital != 1的时候是未到院和全部到院状态  传null  等于1的时候是已到院穿时间和状态
        toHospitalStartDate:IsToHospital != 'true' ? null : (toHospitalStartDate ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD"): null),
        toHospitalEndDate:IsToHospital != 'true' ? null : (toHospitalEndDate ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD") : null),
        keyword,
        pageNum,
        pageSize,
        employeeId: this.isAuthority() ? employeeId : null,
        orderStatus,
        contentPlatFormId,
        hospitalId: hospitalIds,
        IsToHospital:IsToHospital == -1 ? null : IsToHospital,
        liveAnchorId,
        orderSource,
        consultationEmpId:consultationEmpId==-1?null:consultationEmpId,
        sendBy:sendBy==-1?null : sendBy,
        toHospitalType:IsToHospital != 'true' ? null : (toHospitalType == -1 ? null : toHospitalType),
        isAcompanying:isAcompanying == -1 ? null : isAcompanying,
        isOldCustomer:isOldCustomer == -1 ? null : isOldCustomer,
        commissionRatio
      };
      api.getContentPlateFormSendOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrders;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取派单信息列表分页
    handleProjectPageChange(pageNum) {
      const {
        startDate,
        endDate,
        keyword,
        pageSize,
        employeeId,
        orderStatus,
        contentPlatFormId,
        hospitalIds,
        IsToHospital,
        liveAnchorId,
        orderSource,
        consultationEmpId,
        sendBy,
        toHospitalStartDate,
        toHospitalEndDate,
        toHospitalType,
        isAcompanying,
        isOldCustomer,
        commissionRatio

      } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        // IsToHospital != TRUE的时候是未到院和全部到院状态  传null  等于TRUE的时候是已到院穿时间和状态
        toHospitalStartDate:IsToHospital != 'true' ? null : (toHospitalStartDate ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD"): null),
        toHospitalEndDate:IsToHospital != 'true' ? null : (toHospitalEndDate ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD") : null),
        keyword,
        pageNum,
        pageSize,
        employeeId: this.isAuthority() ? employeeId : null,
        orderStatus,
        contentPlatFormId,
        hospitalId: hospitalIds,
        IsToHospital:IsToHospital == -1 ? null : IsToHospital,
        liveAnchorId,
        orderSource,
        consultationEmpId:consultationEmpId==-1?null:consultationEmpId,
        sendBy:sendBy==-1?null : sendBy,
        toHospitalType:IsToHospital != 'true' ? null : (toHospitalType == -1 ? null : toHospitalType),
        isAcompanying:isAcompanying == -1 ? null : isAcompanying,
        isOldCustomer:isOldCustomer == -1 ? null : isOldCustomer,
        commissionRatio
      };
      api.getContentPlateFormSendOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrders;
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
          this.hospitallist = [...this.hospitallist, ...res.data.hospitalInfo];
        }
      });
    },

    // 修改
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            orderId,
            hospitalId,
            allHospitalId,
            appointmentDate,
            timeType,
            content,
            isUncertainDate,
          } = this.form;
          const data = {
            id,
            orderId,
            // 提交时，如果所有医院未开启则提交已参与医院中的医院，反则提交所有医院中的医院
            hospitalId: !this.openAllHospital ? hospitalId : allHospitalId,
            appointmentDate: isUncertainDate
              ? null
              : appointmentDate
              ? this.$moment(appointmentDate).format("YYYY-MM-DD")
              : appointmentDate,
            timeType: isUncertainDate ? null : timeType ? timeType : null,
            content,
            isUncertainDate,
          };
          api.editContentPlateFormSendOrder(data).then((res) => {
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
      this.contentConfirmOrderModel = false;
      this.$refs[name].resetFields();
      this.form.hospitalId = "";
      this.form.allHospitalId = "";
      this.form.tempHospitalId = "";
      this.form.content = "";
      this.openAllHospital = false;
      this.uploadObj.uploadList = [];
      this.delUploadObj.uploadList = [];
      this.noDealuploadObj.uploadList = [];
      this.invitationDocumentsUploadObj.uploadList = []
      this.confirmForm.lastProjectStage = "";
      this.confirmForm.dealAmount = null;
      this.confirmForm.DealDate = null;
      this.query.doubleOrderModel = false;
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
        this.cancel("confirmForm");
        this.query.doubleOrderModel = false;
      }
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "orderedOrderList") {
          this.getSendOrderInfo();
          this.getContentValidList();
          this.getContentPlateFormOrderStatusList();
        }
      },
      immediate: true,
    },
  },
  created() {
    // if (this.isAuthority()) {
    //   this.getCustomerServiceList();
    // }
    this.getCustomerServiceList();
    this.getHospitalInfonameList();
    // this.getOrderPlatform()
    this.getcontentPlateFormOrderSourceList();
    this.getcontentPlateFormOrderToHospitalTypeList()
  },
};
</script>
<style lang="less" scoped>
.pages {
  margin-top: 16px;
  text-align: right;
}
.img {
  width: 100%;
  height: auto;
}
.content {
  display: flex;
  align-items: center;
}
.top {
  margin-bottom: 10px;
}
</style>
