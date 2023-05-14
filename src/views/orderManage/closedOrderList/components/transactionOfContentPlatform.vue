<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <div>
            <Input
              v-model="query.keyword"
              placeholder="请输入关键字"
              style="width: 180px; "
              @keyup.enter.native="getContentPlatFormOrderDealInfo()"
            />
            <DatePicker
              type="date"
              placeholder="登记开始日期"
              style="width: 140px;margin-left: 10px"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="登记结束日期"
              style="width: 140px; margin-left: .625rem"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="派单开始日期"
              style="width: 140px;margin-left: 10px"
              :value="query.sendStartDate"
              v-model="query.sendStartDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="派单结束日期"
              style="width: 140px; margin-left: .625rem"
              :value="query.sendEndDate"
              v-model="query.sendEndDate"
            ></DatePicker>
            <!-- <Select
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
            <Select
              v-model="query.consultationEmpId"
              placeholder="请选择面诊员"
              style="width: 180px; margin-left: 10px"
              filterable
            >
              <Option
                v-for="item in consultationNameListAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select> -->
            <!-- <Select
              v-model="query.toHospitalType"
              placeholder="请选择到院类型"
              clearable
              style="width: 180px; margin-left: 10px"
              filterable
            >
              <Option
                v-for="item in toHospitalTypeList"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select> -->
            
            <Select
              v-model="query.isToHospital"
              style="width: 170px; margin-left: 10px"
              placeholder="请选择到院状态"
            >
              <Option
                v-for="item in query.toTheHospitalList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="到院开始日期"
              style="width: 140px;margin-left: 10px"
              :value="query.tohospitalStartDate"
              v-model="query.tohospitalStartDate"
              transfer
              :disabled="query.isToHospital!='true'"
              
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="到院结束日期"
              style="width: 140px; margin-left: 10px"
              :value="query.toHospitalEndDate"
              v-model="query.toHospitalEndDate"
              transfer
              :disabled="query.isToHospital!='true'"
            ></DatePicker>
            <Select
              v-model="query.toHospitalType"
              style="width: 140px;margin-left: 10px"
              placeholder="请选择到院类型"
              :disabled="query.isToHospital!='true'"
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
            
            
            <!-- <Select
              v-model="query.ReturnBackPriceState"
              placeholder="回款状态"
              style="width: 140px;margin-left:10px"
            >
              <Option
                v-for="item in query.ReturnBackPriceStateList"
                :value="item.status"
                :key="item.status"
                >{{ item.name }}</Option
              >
            </Select> -->
            
          </div>
          <div style="margin:10px 0">
            
            <Select
              v-model="query.isDeal"
              style="width: 180px;"
              placeholder="请选择成交状态"
            >
              <Option
                v-for="item in query.dealList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="成交开始日期"
              style="width: 140px;margin-left: 10px"
              :value="query.dealStartDate"
              v-model="query.dealStartDate"
              :disabled="query.isDeal!='true'"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="成交结束日期"
              style="width: 140px; margin-left: .625rem"
              :value="query.dealEndDate"
              v-model="query.dealEndDate"
              :disabled="query.isDeal!='true'"
            ></DatePicker>
            <Select
              v-model="query.checkState"
              placeholder="审核状态"
              style="width: 140px;margin-left: 10px"
            >
              <Option
                v-for="item in checkStateListAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
                v-model="query.isCreateBill"
                style="width: 140px;margin-left: .625rem"
                placeholder="是否开票"
              >
                <Option
                  v-for="item in isCreateBillList"
                  :value="item.type"
                  :key="item.type"
                  >{{ item.name }}</Option
                >
              </Select>
              <Select
                v-model="query.belongCompanyId"
                style="width: 170px;margin-left: .625rem"
                placeholder="请选择开票公司"
              >
                <Option
                  v-for="item in companyNameAllList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
              <Select
              v-model="query.isReturnBakcPrice"
              style="width: 140px;margin-left:10px"
              placeholder="是否回款"
            >
              <Option
                v-for="item in query.isReturnBakcPriceList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="回款开始时间"
              style="width: 140px;margin-left:10px"
              :value="query.returnBackPriceStartDate"
              v-model="query.returnBackPriceStartDate"
              :disabled="query.isReturnBakcPrice!='true'"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="回款结束时间"
              style="width: 140px; margin-left: .625rem"
              :value="query.returnBackPriceEndDate"
              v-model="query.returnBackPriceEndDate"
              :disabled="query.isReturnBakcPrice!='true'"
            ></DatePicker>
           
            <!-- <Select
              v-model="query.hospitalId"
              style="width: 180px; margin-left: 10px"
              placeholder="请选择医院"
              filterable
            >
              <Option
                v-for="item in query.hospitalList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select> -->
            
          </div>
          <!-- <div>
            <Select
              v-model="query.contentPlatFormId"
              placeholder="请选择主播平台"
              @on-change="contentPlateChange(query.contentPlatFormId)"
              style="width: 180px;"
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
          </div> -->
          <div>
            <Select
              v-model="query.lastDealHospitalId"
              style="width: 180px;"
              placeholder="请选择到院医院"
              filterable
            >
              <Option
                v-for="item in query.lastDealHospitalList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
             <Select
              v-model="query.isAccompanying"
              style="width: 140px; margin-left: 10px"
              placeholder="是否陪诊"
            >
              <Option
                v-for="item in query.isAccompanyingList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.consultationType"
              style="width: 140px;margin-left:10px"
              placeholder="请选择完成情况"
              filterable
            >
              <Option
                v-for="item in consultationTypeList"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.orderTypeText }}</Option
              >
            </Select>
            <Select
              v-model="query.isOldCustomer"
              style="width: 140px; margin-left: 10px"
              placeholder="新老客业绩"
            >
              <Option
                v-for="item in query.isOldCustomerList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.customerServiceId"
              style="width: 140px;margin-left:10px"
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
              v-model="query.consumptionType"
              style="width: 140px;margin-left:10px"
              placeholder="请选择消费类型"
              filterable
            >
              <Option
                v-for="item in typeList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Input
                v-model="query.minAddOrderPrice"
                placeholder="请输入最小下单金额"
                style="width: 170px;margin-left:10px"
                type="number"
                namber
              />
              <span> — </span>
              <Input
                v-model="query.maxAddOrderPrice"
                placeholder="请输入最大下单金额"
                style="width: 170px;"
                type="number"
                namber
              />
          </div>
        </div>
        <div class="right">
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getContentPlatFormOrderDealInfo()"
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
    
    <!-- 回款 -->
    <paymentCollection :paymentCollectionModel.sync ="paymentCollectionModel" :paymentCollectionObj="paymentCollectionObj" @hanPaymentChange="getContentPlatFormOrderDealInfo"></paymentCollection>
    <!-- 订单详情 -->
    <detail :detailModel.sync ="detailModel" :detailList ="detailList"></detail>
     <!-- 明细 -->
    <viewImg :viewCustomerPhotosModel.sync="viewCustomerPhotosModel" :viewImgParams="viewImgParams"></viewImg>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as dealApi from "@/api/contentPlatFormOrderDealInfo";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as empApi from "@/api/employeeManage";
import upload from "@/components/upload/upload";
import paymentCollection from "@/components/paymentCollection/paymentCollection"
import detail from "@/components/contentDetail/detail.vue"
import viewImg from "@/components/transactionStatus/viewImg";
export default {
  components: {
    upload,
    paymentCollection,
    detail,
    viewImg
  },
  props:{
    activeName:String,
    checkStateListAll:Array,
    employee:Array,
    companyNameAllList:Array
  },
  data() {
    return {
      isCreateBillList:[
            {
              type:-1,
              name:'全部开票状态'
            },
            {
              type:'true',
              name:'已开票'
            },
            {
              type:'false',
              name:'未开票'
            },
          ],
      viewCustomerPhotosModel:false,
      viewImgParams:{
        contentPlatFormOrderId:'',
        orderDealId:'',
        contentPlatFormOrderDealDetails:[]
      },
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
        // 是否开票
        isCreateBill:-1,
        // 开票公司
        belongCompanyId:-1,
        // 最小金额
        minAddOrderPrice:null,
        // 最大金额
        maxAddOrderPrice:null,
        //是否到院
        isToHospital:-1,
        // 到院开始时间
        tohospitalStartDate:'',
        // 到院结束时间
        toHospitalEndDate:'',
        // 是否成交
        isDeal:-1,
        // 成交开始时间
        dealStartDate:'',
        // 成交结束时间
        dealEndDate:'',
        // 到院医院
        lastDealHospitalId:-1,
        // 是否陪诊
        isAccompanying:-1,
        // 新老客业绩
        isOldCustomer:-1,
        // 是否回款
        isReturnBakcPrice:-1,
        // 回款开始时间
        returnBackPriceStartDate:'',
        // 回款结束时间
        returnBackPriceEndDate:'',
        // 跟进人员
        customerServiceId:-1,
        // 消费类型
        consumptionType:-1,
        // 派单开始时间
        sendStartDate:'',
        // 派单结束时间
        sendEndDate:'',
        // 面诊类型
        consultationType:-1,
        toHospitalType:-1,
        ReturnBackPriceState:'-1',
        consultationEmpId:-1,
        contentPlatFormId: null,
        liveAnchorId: null,
        hospitalId: "",
        hospitalList: [{ id: -1, name: "全部医院" }],
        lastDealHospitalList: [{ id: -1, name: "全部到院医院" }],
        startDate: "",
        endDate: "",
        contentPlateFormId: "",
        keyword: "",
        checkState: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "编号",
            key: "id",
            minWidth: 170,
            align:'center'
          },
          {
            title: "订单号",
            key: "contentPlatFormOrderId",
            minWidth: 170,
            align:'center'
          },
          {
            title: "登记时间",
            key: "createDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return params.row.createDate
                ? h(
                    "div",
                    this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                : "";
            },
          },
          {
            title: "下单金额",
            key: "addOrderPrice",
            minWidth: 120,
            align:'center'
          },
          {
            title: "面诊类型",
            key: "consultationTypeText",
            minWidth: 120,
            align:'center'
          },
          
          {
            title: "手机号",
            key: "phone",
            minWidth: 140,
            align:'center'
          },
          {
            title: "派单时间",
            key: "sendDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return params.row.sendDate
                ? h(
                    "div",
                    this.$moment(params.row.sendDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                : "";
            },
          },
          
          
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isToHospital,
                    size: "default",
                    disabled:
                      params.row.isToHospital === true || params.row.isToHospital === false,
                  },
                },
                h("span", { isToHospital: "open" }, "开"),
                h("span", { isToHospital: "close" }, "关")
              );
            },
          },
          {
            title: "到院类型",
            key: "toHospitalTypeText",
            minWidth: 120,
            align:'center'
          },
          
          {
            title: "到院时间",
            key: "tohospitalDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return params.row.tohospitalDate
                ? h(
                    "div",
                    this.$moment(params.row.tohospitalDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          
          {
            title: "到院医院",
            key: "dealHospital",
            minWidth: 200,
            align:'center'
          },
          {
            title: "截图",
            key: "dealPicture",
            minWidth: 140,
            render: (h, params) => {
              return params.row.dealPicture
                ? h(
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
                          src: params.row.dealPicture,
                        },
                      }),
                      //   h("div", params.row.goodsName,)
                    ]
                  )
                : "";
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
            align:'center'
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
            title: "是否成交",
            key: "isDeal",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isDeal,
                    size: "default",
                    disabled:
                      params.row.isDeal === true || params.row.isDeal === false,
                  },
                },
                h("span", { isDeal: "open" }, "开"),
                h("span", { isDeal: "close" }, "关")
              );
            },
          },
          
          {
            title: "成交时间",
            key: "dealDate",
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
            title: "成交金额",
            key: "price",
            minWidth: 120,
            align:'center'
          },
          {
            title: "三方订单号",
            key: "otherOrderId",
            minWidth: 180,
            align:'center'
          },
          {
            title: "消费类型",
            key: "consumptionTypeText",
            minWidth: 120,
            align:'center'
          },
          {
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 130,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.isOldCustomer == true ? '老客业绩' : '新客业绩'
                  )
            },
          },
          {
            title: "业绩类型",
            key: "dealPerformanceTypeText",
            minWidth: 120,
          },
          {
            title: "是否陪诊",
            key: "isAcompanying",
            minWidth: 120,
            align: "center",
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
            title: "对账金额",
            key: "checkPrice",
            minWidth: 120,
            align:'center'
          },
          {
            title: "信息服务费",
            key: "informationPrice",
            minWidth: 140,
            align:'center'
          },
          {
            title: "系统使用费",
            key: "systemUpdatePrice",
            minWidth: 140,
            align:'center'
          },
          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 120,
            align:'center'
          },
          {
            title: "对账时间",
            key: "checkDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return params.row.checkDate
                ? h(
                    "div",
                    this.$moment(params.row.checkDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                : "";
            },
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
          {
            title: "对账人",
            key: "checkByEmpName",
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
            title: "是否开票",
            key: "isCreateBill",
            minWidth: 100,
            align:'center',
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isCreateBill,
                    size: "default",
                    disabled:
                      params.row.isCreateBill === true || params.row.isCreateBill === false,
                  },
                },
                h("span", { isCreateBill: "open" }, "开"),
                h("span", { isCreateBill: "close" }, "关")
              );
            },
          },
           {
            title: "开票公司",
            key: "creatBillCompany",
            minWidth: 220,
            align:'center'
          },
          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 120,
            align:'center'
          },
          
          {
            title: "归属客服",
            key: "createByEmpName",
            minWidth: 120,
            align:'center'
          },
          
          {
            title: "操作",
            align: "center",
            minWidth: 200,
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
            //     h(
            //       "Button",
            //       {
            //         props: {
            //           type: "primary",
            //           size: "small",
            //           // disabled:params.row.statusText != '交易成功'
            //         },
            //         style: {
            //           marginRight: ".3125rem",
            //         },
            //         on: {
            //           click: () => {
            //             const {id} = params.row
            //             api.byIdContentPlateForm(id).then((res) => {
            //               if (res.code === 0) {
            //                 this.detailModel = true
            //                 const {orderInfo} = res.data;
            //                 this.detailList= [orderInfo]
            //               }
            //             })
            //           },
            //         },
            //       },
            //       "订单详情"
            //   ),
                isFlag ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.isDeal == false || params.row.checkStateText == "审核通过",
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const { id,contentPlatFormOrderId } = params.row;
                        this.controlModal = true;
                        this.form.id = contentPlatFormOrderId;
                        this.form.orderDealInfoId = id
                      },
                    },
                  },
                  "审核"
                ): null,
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
                //         const { id } = params.row;
                //         const data = {
                //           OrderId:id,
                //           OrderFrom:2,
                //           pageNum:1,
                //           pageSize:10
                //         }
                //         OrderCheckPictureApi.OrderCheckPicture(data).then((res) => {
                //           if (res.code === 0) {
                //             const { list } = res.data.orderCheckPictureInfo;
                //             this.viewPicList = list;
                //             if(this.viewPicList.length>0){
                //               this.viewPicModel = true
                //             }else{
                //               this.$Message.warning('暂无审核图片')
                //             }
                //           }
                //         });
                //       },
                //     },
                //   },
                //   "查看审核图片"
                // ),
                isPayment ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.checkStateText !=='审核通过' || params.row.isReturnBackPrice == true,
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const { id,settlePrice,contentPlatFormOrderId} = params.row;
                        this.paymentCollectionModel = true
                        this.paymentCollectionObj = {
                          orderId:contentPlatFormOrderId,
                          returnBackPrice:settlePrice,
                          type:'content',
                          orderDealId:id

                        }
                      },
                    },
                  },
                  "回款"
                ):null,
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id,contentPlatFormOrderId } = params.row;
                        this.viewCustomerPhotosModel = true
                        this.viewImgParams.contentPlatFormOrderId = contentPlatFormOrderId
                        this.viewImgParams.orderDealId = id
                        const data = {
                          contentPlatFormOrderId:contentPlatFormOrderId,
                          contentPlatFormOrderDealId:id,
                          startDate:'',
                          endDate:'',
                          keyWord:'',
                          pageNum:1,
                          pageSize:999
                        }
                        api.getContentPlatFormOrderDealDetails(data).then(res=>{
                          if(res.code == 0){
                            const {list} = res.data.contentPlatFormOrderDealDetails
                            this.viewImgParams.contentPlatFormOrderDealDetails=list
                          }
                        })
                       }
                    },
                  },
                  "明细"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
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
        // 是否到院
        toTheHospitalList:[
            {
                type:-1,
                name:'全部到院状态'
            },
            {
                type:'true',
                name:'已到院'
            },
            {
                type:'false',
                name:'未到院'
            }
        ],
        // 成交列表
        dealList:[
            {
                type:-1,
                name:'全部成交状态'
            },
            {
                type:'true',
                name:'已成交'
            },
            {
                type:'false',
                name:'未成交'
            }
        ],
        // 陪诊列表
        isAccompanyingList:[
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
        // 新老客列表
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
        // 回款列表
        isReturnBakcPriceList:[
            {
                type:-1,
                name:'全部回款状态'
            },
            {
                type:'true',
                name:'已回款'
            },
            {
                type:'false',
                name:'未回款'
            }
        ],
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
        checkPicture:[],
        // 成交情况id
        orderDealInfoId:'',
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
      // 面诊类型
      consultationTypeList:[{orderType:-1,orderTypeText:'全部面诊类型'}],
      // 消费类型
      typeList:[{id:-1,name:'全部消费类型'}]
    };
  },
  methods: {
     // 消费类型列表
    getContentPlatFormOrderDealInfotypeList() {
      api.ContentPlatFormOrderDealInfotypeList().then((res) => {
        if (res.code === 0) {
          const { typeList } = res.data;
          this.typeList = [...this.typeList,...typeList]
        }
      });
    },
    //   获取完成情况列表（下拉框）
    getOrderConsultationTypeList() {
      api.getOrderConsultationTypeList().then((res) => {
        if (res.code === 0) {
          const { orderConsultationTypes } = res.data;
          this.consultationTypeList = [...this.consultationTypeList,...orderConsultationTypes]
        }
      });
    },
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
          this.query.lastDealHospitalList = [
            ...this.query.lastDealHospitalList,
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
    getContentPlatFormOrderDealInfo() {
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
        toHospitalType,
        isToHospital,
        tohospitalStartDate,
        toHospitalEndDate,
        isDeal,
        lastDealHospitalId,
        isAccompanying,
        isOldCustomer,
        isReturnBakcPrice,
        returnBackPriceStartDate,
        returnBackPriceEndDate,
        customerServiceId,
        sendStartDate,
        sendEndDate,
        consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        dealStartDate,
        dealEndDate,
        isCreateBill,
        belongCompanyId,
        consumptionType
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
        toHospitalType:toHospitalType== -1 ? null : toHospitalType,
        isToHospital : isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate : isToHospital =='true' ? (tohospitalStartDate ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD") : null)  : null ,
        toHospitalEndDate: isToHospital =='true' ? (toHospitalEndDate ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD") : null) : null ,
        isDeal : isDeal == -1 ? null : isDeal,
        lastDealHospitalId: lastDealHospitalId == -1 ? null : lastDealHospitalId,
        isAccompanying:isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer:isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice : isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate: isReturnBakcPrice =='true' ?  (returnBackPriceStartDate ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD") : null) : null ,
        returnBackPriceEndDate: isReturnBakcPrice =='true' ? (returnBackPriceEndDate ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD") : null) : null ,
        customerServiceId: customerServiceId == -1 ?  null : customerServiceId,
        sendStartDate: sendStartDate
          ? this.$moment(sendStartDate).format("YYYY-MM-DD")
          : "",
        sendEndDate: sendEndDate ? this.$moment(sendEndDate).format("YYYY-MM-DD") : "",
        consultationType:consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        dealStartDate:isDeal =='true' ?  (dealStartDate ? this.$moment(dealStartDate).format("YYYY-MM-DD") : null) : null,
        dealEndDate:isDeal =='true' ?  (dealEndDate ? this.$moment(dealEndDate).format("YYYY-MM-DD") : null) : null,
        isCreateBill: isCreateBill == -1 ? null : isCreateBill,
          belongCompanyId: belongCompanyId == -1 ? null : belongCompanyId,
          consumptionType: consumptionType == -1 ? null : consumptionType,

      };
      dealApi.getContentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
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
        toHospitalType,

        isToHospital,
        tohospitalStartDate,
        toHospitalEndDate,
        isDeal,
        lastDealHospitalId,
        isAccompanying,
        isOldCustomer,
        isReturnBakcPrice,
        returnBackPriceStartDate,
        returnBackPriceEndDate,
        customerServiceId,
        sendStartDate,
        sendEndDate,
        consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        dealStartDate,
        dealEndDate,
        isCreateBill,
        belongCompanyId,
        consumptionType
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
        toHospitalType:toHospitalType== -1 ? null : toHospitalType,
        isToHospital : isToHospital == -1 ? null : isToHospital,
        tohospitalStartDate : isToHospital =='true' ? (tohospitalStartDate ? this.$moment(tohospitalStartDate).format("YYYY-MM-DD") : null)  : null ,
        toHospitalEndDate: isToHospital =='true' ? (toHospitalEndDate ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD") : null) : null ,
        isDeal : isDeal == -1 ? null : isDeal,
        lastDealHospitalId: lastDealHospitalId ==-1 ?  null :  lastDealHospitalId ,
        isAccompanying:isAccompanying == -1 ? null : isAccompanying,
        isOldCustomer:isOldCustomer == -1 ? null : isOldCustomer,
        isReturnBakcPrice : isReturnBakcPrice == -1 ? null : isReturnBakcPrice,
        returnBackPriceStartDate: isReturnBakcPrice =='true' ?  (returnBackPriceStartDate ? this.$moment(returnBackPriceStartDate).format("YYYY-MM-DD") : null) : null ,
        returnBackPriceEndDate: isReturnBakcPrice =='true' ? (returnBackPriceEndDate ? this.$moment(returnBackPriceEndDate).format("YYYY-MM-DD") : null) : null ,
        customerServiceId: customerServiceId == -1 ?  null : customerServiceId,
        sendStartDate: sendStartDate
          ? this.$moment(sendStartDate).format("YYYY-MM-DD")
          : "",
        sendEndDate: sendEndDate ? this.$moment(sendEndDate).format("YYYY-MM-DD") : "",
        consultationType:consultationType == -1 ? null :consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        dealStartDate:isDeal =='true' ?  (dealStartDate ? this.$moment(dealStartDate).format("YYYY-MM-DD") : null) : null,
        dealEndDate:isDeal =='true' ?  (dealEndDate ? this.$moment(dealEndDate).format("YYYY-MM-DD") : null) : null,
        isCreateBill: isCreateBill == -1 ? null : isCreateBill,
          belongCompanyId: belongCompanyId == -1 ? null : belongCompanyId,
          consumptionType: consumptionType == -1 ? null : consumptionType,
      };
      dealApi.getContentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
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
            checkPicture,
            orderDealInfoId
          } = this.form;
          const data = {
            id,
            checkState,
            settlePrice,
            checkPrice,
            checkRemark,
            checkPicture,
            orderDealInfoId,
            informationPrice:0,
            systemUpdatePrice:0,
            reconciliationDocumentsId:''
          };
          this.flag = true
          api.checkContentPlateFormOrder(data).then((res) => {
            if (res.code === 0) {
              this.flag = false
              this.controlModal = false;
              this.cancelSubmit("form");
              this.getContentPlatFormOrderDealInfo();
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
    this.getOrderConsultationTypeList()
    this.getContentPlatFormOrderDealInfotypeList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "transactionOfContentPlatform") {
          this.getContentPlatFormOrderDealInfo();
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
