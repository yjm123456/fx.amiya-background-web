<!-- 订单 -->
<template>
  <div>
    <Card :dis-hover="true">
      <div class="head">
        <div class="head_left">
            <div class="head_top">
              <Input
                v-model="query.keyword"
                style="width:11.25rem;"
                placeholder="请输入订单号或商品名称"
                @keyup.enter.native="getOrderInfo()"
              />
              <Select
                v-model="query.statusCode"
                style="width: 12.5rem;margin-left: .625rem"
                placeholder="请选择订单状态"
              >
                <Option
                  v-for="item in query.statusCodeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.name }}</Option
                >
              </Select>
              <Select
                v-model="query.appType"
                style="width: 140px;margin-left: .625rem"
                placeholder="请选择下单平台"
              >
                <Option
                  v-for="item in query.appTypeList"
                  :value="item.orderType"
                  :key="item.orderType"
                  >{{ item.appTypeText }}</Option
                >
              </Select>
              <Select
                  v-model="query.orderNature"
                  placeholder="请选择订单性质"
                  style="width: 140px;margin-left: .625rem"
                >
                  <Option
                    v-for="item in orderNatureList"
                    :value="item.orderNature"
                    :key="item.orderNature"
                    >{{ item.orderNatureText }}</Option
                  >
                </Select>
                <Select
                  v-model="query.belongEmpId"
                  style="width: 140px;margin-left: 10px"
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
            </div>
            <div class="head_bottom">
              <DatePicker
                  type="date"
                  placeholder="下单开始日期"
                  style="width: 180px;"
                  :value="query.startDate"
                  v-model="query.startDate"
                ></DatePicker>
                <span style="margin-left:.625rem;color:#ccc">—</span>
                <DatePicker
                  type="date"
                  placeholder="下单结束日期"
                  style="width: 180px; margin-left: .625rem"
                  :value="query.endDate"
                  v-model="query.endDate"
                ></DatePicker>
                <DatePicker
                  type="date"
                  placeholder="核销开始时间"
                  style="width: 180px;margin-left: .625rem;margin-top:1.25rem"
                  :value="query.writeOffStartDate"
                  v-model="query.writeOffStartDate"
                ></DatePicker>
                <span style="margin-left:.625rem;color:#ccc">—</span>
                <DatePicker
                  type="date"
                  placeholder="核销结束时间"
                  style="width: 180px; margin-left: .625rem;margin-top:1.25rem"
                  :value="query.writeOffEndDate"
                  v-model="query.writeOffEndDate"
                ></DatePicker>
            </div>
        </div>
        <div class="head_right">
          <Button type="primary" style="margin-left: .625rem" @click="getOrderInfo()">查询</Button>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="importControlModal = true"
            >导入</Button
          >
          <!-- 导出 
            v-if="amiyaPositionId==1"-->
          <span
          ><Button
            type="primary"
            style="margin-left: .625rem"
            @click="handleExportClick()"
            v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
            >导出</Button
          ></span>
          <Button type="primary" style="margin-left: .625rem" @click="recordingChange()">录单</Button>
          <Button type="primary" style="margin-left: .625rem" @click="addgoods()">补单</Button>
          <Button
            type="primary"
            @click="handleAnchor()"
            style="margin-left: 10px"
            >归属主播</Button
          >
          <Button
            type="primary"
            @click="adjustCustomerService()"
            style="margin-left: 10px"
            v-has="{ role: ['fx.amiya.permission.CHANGE_BIND_SERVICE'] }"
            >调整绑定客服</Button
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
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-sizer
          :page-size-opts="[10,20,30,50,100]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
        <!-- <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        /> -->
      </div>
    </Card>
    <!-- 归属主播  -->
    <Modal
      v-model="anchorModal"
      title="归属主播"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="anchorForm"
        :model="anchorForm"
        :rules="anchorRuleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="主播平台" prop="plateFormId" >
          <Select
            v-model="anchorForm.plateFormId"
            placeholder="请选择主播平台"
            @on-change="plateChange(anchorForm.plateFormId)"
            
          >
            <Option
              v-for="item in contentPalteForms"
              :value="item.id"
              :key="item.id"
              >{{ item.contentPlatformName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="主播IP账号" prop="liveAnchorId" >
            <Select
              v-model="anchorForm.liveAnchorId"
              placeholder="请选择主播IP账号"
              filterable
            >
              <Option
                v-for="item in liveAnchors"
                :value="item.id"
                :key="item.id"
                >{{ item.hostAccountName }}</Option
              >
            </Select>
          </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('anchorForm')">取消</Button>
        <Button type="primary" @click="anchorHandleSubmit('anchorForm')">确定</Button>
      </div>
    </Modal>
    <!-- 补单 -->
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
        :label-width="110"
      >
      <Row :gutter="30">
        <Col span="8">
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
        </Col>
        <Col span="8">
          <FormItem label="订单号" prop="orderId">
            <Input v-model="form.orderId" placeholder="请输入订单号"></Input>
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
          <FormItem label="客户昵称" prop="buyerNick">
            <Input v-model="form.buyerNick"  disabled></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="手机号" prop="phone"> 
            <Input v-model="form.phone"  maxlength="11"  disabled></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="预约门店" prop="appointmentHospital" >
            <Select
              v-model="form.appointmentHospital"
              filterable
              disabled
            >
              <Option
                v-for="item in hospitalNameList"
                :value="item.name"
                :key="item.name"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        
      </Row> 
      <Row :gutter="30">
        <Col span="8">
          <FormItem label="商品图片" prop="thumbPictureUrl" key="thumbPictureUrl" style="margin-top:10px">
            <div class="img_con">
              <img :src="form.thumbPictureUrl" style="width:60px;height:60px;margin-top:10px" v-if="form.thumbPictureUrl" @click="imageChange(1)">
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
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确认补单</Button>
      </div>
    </Modal>
    <!-- 最终核销医院 -->
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
        <FormItem label="医院" prop="hospitalId" >
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
        <Button type="primary" @click="recordingHandleSubmit('recordingForm')">确定</Button>
      </div>
    </Modal>
    <!-- 录单 -->
    <Modal
      v-model="recordingModals"
      :title="addtitle"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000"
    >
    <Form
        ref="recordingforms"
        :model="recordingforms"
        :rules="recodingruleValidates"
        label-position="left"
        :label-width="110"
      >
      <Row :gutter="30">
        <Col span="8">
          <FormItem label="下单平台" prop="appType">
            <Select v-model="recordingforms.appType" placeholder="请选择下单平台" disabled  >
              <Option
                v-for="item in appTypeArr"
                :value="item.id"
                :key="item.name"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="商品" prop="goodsId">
            <Select v-model="recordingforms.goodsId" placeholder="请选择商品" filterable  >
              <Option
                v-for="item in AmiyaHospitalDepartmentList"
                :value="item.id"
                :key="item.projectName"
                >{{ item.projectName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="商品数量" prop="quantity">
            <Input v-model="recordingforms.quantity" placeholder="请输入商品数量" type="number" ></Input>
          </FormItem>
        </Col>
        
        
      </Row> 
      <Row :gutter="30">
        <Col span="8">
          <FormItem label="订单性质" prop="orderNature" key="订单性质">
            <Select
                  v-model="recordingforms.orderNature"
                  placeholder="请选择订单性质"
                >
                  <Option
                    v-for="item in orderNatureList"
                    :value="item.orderNature"
                    :key="item.orderNature"
                    >{{ item.orderNatureText }}</Option
                  >
                </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="订单状态" prop="statusCode" key="订单状态">
            <Select v-model="recordingforms.statusCode" placeholder="请选择订单状态" >
              <Option
                v-for="item in statusCodeArr"
                :value="item.orderType"
                :key="item.orderType"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem 
            label="定金金额" 
            prop="actualPayment"
            ref="actualPayment"
            :rules="{
              required: recordingforms.statusCode !== 'SEEK_ADVICE',
              message: '请输入定金金额',
            }"
          >
            <Input 
              v-model="recordingforms.actualPayment" 
              type="number" 
              :disabled="recordingforms.statusCode === 'SEEK_ADVICE'" 
              ></Input>
          </FormItem>
        </Col>
      </Row> 
      <Row :gutter="30">
        <Col span="8">
          <FormItem label="客户昵称" prop="buyerNick">
            <Input v-model="recordingforms.buyerNick" placeholder="请输入客户昵称"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="手机号" prop="phone"> 
            <Input v-model="recordingforms.phone"  maxlength="11" placeholder="请输入手机号"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem 
            label="预约门店" 
            prop="appointmentHospital" 
            key="预约门店"
          >
            <Select
              v-model="recordingforms.appointmentHospital"
              filterable
            >
              <Option
                v-for="item in hospitalNameList"
                :value="item.name"
                :key="item.name"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
            <FormItem label="描述" prop="remark">
              <Input
                v-model="recordingforms.remark"
                type="textarea"
                :rows="5"
                placeholder="请输入描述"
              ></Input>
            </FormItem>
          </Col>
        <Spin fix v-if="flag==true">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
      </Row> 
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('recordingforms')">取消</Button>
        <Button type="primary" @click="EntryOrderSubmits('recordingforms')">确定</Button>
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
        <FormItem label="客服" prop="belongEmpInfo" >
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
        <Button type="primary" @click="adjustCustomerServiceSubmit('adjustCustomerServiceForm')">确定</Button>
      </div>
    </Modal>
    <!-- 订单详情 -->
    <detail :detailModel.sync ="detailModel" :detailList ="detailList"></detail>
    <!-- 导入 -->
    <importFile
      :importControlModal.sync="importControlModal"
      @handleRefreshCustomerTrackList="getOrderInfo()"
    ></importFile>
  </div>
</template>

<script>

import * as api from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance"
import detail from "@/components/orderDetail/detail.vue"
import upload from "@/components/upload/upload";
import { download } from "@/utils/util";
import importFile from "./components/importModel.vue";

export default {
  components: {
    upload,
    detail,
    importFile
  },
  data() {
    
    return {
      importControlModal: false,
      addtitle:'录单',
      detailList:[],
      detailModel:false,
      adjustCustomerServiceModal:false,
      adjustCustomerServiceForm:{
        // 订单号
        orderId:new Set(),
        belongEmpInfo:''
      },
      adjustCustomerServiceRuleValidate:{
        belongEmpInfo: [
          {
            required: true,
            message: "请选择客服",
          },
        ],
      },
      // 客服（下拉框）
      employeeList:[],
      employee: [{ name: "全部客服", id: -1 }],
      isAppointmentList:[{
        isAppointment:'true',
        name:'是'
      },{
        isAppointment:'false',
        name:'否'
      }],
      appTypeArr:[{id:0,name:"天猫"}],
      recordingModals:false,
      recordingforms:{
        orderId:"",
        //   订单类型（1：咨询:2：定金金额）
          statusCode:'',
        // 客户昵称
        buyerNick:"",
        // 手机号
        phone:"",
        // 预约日期
        appointmentDate:"",
        // 预约门店
        appointmentHospital:"",
        // 实付金额
        actualPayment:null,
        // 项目id
        goodsId:"",
        // 商品名称
        goodsName:"",
        // 备注
        remark:"",
        id:"",
        // 下单平台
        appType:0,
        // 交易类型
        exchangeType:1,
        // 虚拟订单
        orderType:0,
        thumbPictureUrl:"",
        isAppointment:"false",
        quantity:null,
        accountReceivable:0,
        // 订单性质
        orderNature:''

      },
      recodingruleValidates: {
        appType: [
          {
            required: true,
          },
        ],
        orderNature: [
          {
            required: true,
            message: "请选择订单性质",
          },
        ],
        isAppointment: [
          {
            required: true,
            message: "请选择预约状态",
          },
        ],
        quantity: [
          {
            required: true,
            message: "请输入商品数量",
          },
        ],
        contentPlateFormId: [
          {
            required: true,
            message: "请选择主播平台",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择IP账号",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
        buyerNick: [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],
        
        goodsId : [
          {
            required: true,
            message: "请选择商品",
          },
        ],
        actualPayment : [
          {
            required: true,
            message: "请输入付款金额",
          },
        ],
        statusCode : [
          {
            required: true,
            message: "请选择订单状态",
          },
        ],
        // appointmentHospital : [
        //   {
        //     required: true,
        //     message: "请选择预约门店",
        //   },
        // ],
        buyerNick : [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],
       
      },
      flag:false,
      // 归属主播 弹窗
      anchorModal:false,
      // 归属主播form
      anchorForm:{
        // 订单号
        orderId:new Set(),
        // 主播id
        liveAnchorId:'',
        // 下单平台id
        plateFormId:'',
      },
      // 主播
      liveAnchors:[],
      // 下单平台
      contentPalteForms:[],
      anchorRuleValidate:{
        plateFormId: [
          {
            required: true,
            message: "请选择主播平台",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择主播IP账号",
          },
        ],
      },
      title:"补单",
      isEdit:false,
      recordingModal:false,
      recordingForm:{
        orderId:"",
        hospitalId :""
      },
      recordinRuleValidate:{
        orderNature: [
          {
            required: true,
            message: "请选择订单性质",
          },
        ],
      },
      // 订单性质
      orderNatureList:[],
      // 订单类型
      orderTypeList:[
        {
          orderType:0,
          name:"虚拟订单"
        },
        {
          orderType:1,
          name:"实物订单"
        }
      ],

      // 交易类型
      exchangeTypes:[],
      // 获取有效的医院列表
      hospitalNameList:[],
      // 获取下单平台
      appTypeLists:[
        {
          appTypeText: "天猫",
          orderType: 0
        }
      ],
      statusCodeArr:[
        {
          orderType:'SEEK_ADVICE',
          name:"咨询"
        },
        {
          orderType:'BARGAIN_MONEY',
          name:"定金"
        }
      ],
      // 获取商品名称和id
      AmiyaHospitalDepartmentList:[],
      form:{
        // 订单号
        orderId:'',
        // 商品名称
        goodsName:'',
        // 商品图片
        thumbPictureUrl:'',
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
        buyerNick:'',
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
        // 下单时间
        createDate:null
        

      },
      controlModal:false,
      ruleValidates: {
        appType: [
          {
            required: true,
            message: "请选择下单平台",
          },
        ],
        orderId: [
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
        buyerNick : [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
        // appointmentHospital : [
        //   {
        //     required: true,
        //     message: "请选择预约门店",
        //   },
        // ],
        statusCode: [
          {
            required: true,
            message: "请选择订单状态",
          },
        ],
        thumbPictureUrl: [
          {
            required: false,
            message: "请上传缩略图",
          },
        ],
       
      },
      query: {
        belongEmpId:'',
        // 判断是否是管理员
        amiyaPositionId:'',
        // 下单时间
        startDate: "",
        endDate: "",
        // 核销时间
        writeOffStartDate:"",
        writeOffEndDate:"",
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 60,
            
          },
          {
            title: "订单编号",
            key: "id",
            minWidth: 200,
            align:'center',
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 130,
            align:'center',
            tooltip:true
          },
          
          {
            title: "下单时间",
            key: "createDate",
            minWidth: 170,
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
            title: "核销时间",
            key: "writeOffDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.writeOffDate ? this.$moment(params.row.writeOffDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          // {
          //   title: "订单性质",
          //   key: "orderNatureText",
          //   minWidth: 140,
          //   align:'center',
          // },
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 300,
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
            title: "规格",
            key: "standard",
            minWidth: 200,
            align:'center',
            tooltip:true
          },
          // {
          //   title: "描述",
          //   key: "description",
          //   minWidth: 200,
          // },
          {
            title: "支付类型",
            key: "exchangeTypeText",
            minWidth: 120,
            align:'center',
          },
          {
            title: "实付款",
            key: "actualPayment",
            minWidth: 120,
            align:'center',
          },
          // {
          //   title: "实付积分",
          //   key: "integrationQuantity",
          //   minWidth: 120,
          //   align:'center',
          // },
          {
            title: "购买数量",
            key: "quantity",
            minWidth: 100,
            align:'center',
          },
          {
            title: "状态",
            key: "statusText",
            minWidth: 160,
            align:'center',
          },
          {
            title: "主播平台",
            key: "liveAnchorPlatForm",
            minWidth: 120,
            align:'center',
          },
          {
            title: "归属主播",
            key: "liveAnchor",
            minWidth: 120,
            align:'center',
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
            align:'center',
          },
          {
            title: "客户昵称",
            key: "nickName",
            minWidth: 160,
            align:'center',
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 120,
            align:'center',
          },
          {
            title: "是否发货",
            key: "isSendOrder",
            minWidth: 100,
            align:'center',
            render: (h, params) => {
              if (params.row.isSendOrder == true) {
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
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.appointmentDate ? this.$moment(params.row.appointmentDate).format("YYYY-MM-DD") : ''
              );
            },
          },
          {
            title: "预约城市",
            key: "appointmentCity",
            minWidth: 120,
            align:'center',
          },
          {
            title: "预约门店",
            key: "appointmentHospital",
            minWidth: 220,
            align:'center',
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 300,
            align:'center',
            tooltip:true
          },
          {
            title: "操作",
            align: "center",
            minWidth: 420,
            align:'center',
            fixed:"right",
            // filters: [
            //     {
            //         label: 'Joe',
            //         value: 1
            //     },
            //     {
            //         label: 'John',
            //         value: 2
            //     }
            // ],
            // filterMultiple: false,
            // filterMethod (value, row) {
            //     if (value === 1) {
            //         return row.name === 'Joe';
            //     } else if (value === 2) {
            //         return row.name === 'John Brown';
            //     }
            // },
            // renderHeader:(h,params)=>{
            //   return h('div',[
            //     h('strong','操作'),
            //     h('Icon',{
            //       props:{
            //         type:'md-settings'
            //       },
            //       on:{
            //         click:()=>{
                      
            //         }
            //       }
            //     }),
            //   ])
            // },
            render: (h, params) => {
              return h("div", [
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
              //         const { id ,appType} = params.row;
              //         // 下拉框（先选平台、再选主播）
              //         this.anchorModal = true
              //         this.anchorForm.orderId = id
              //       }
              //     }
              //   },
              //   "归属主播"
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
                    disabled:params.row.statusText !== '咨询订单' &&  params.row.statusText !==  '定金订单'
                  },
                  style: {
                    marginRight: ".3125rem",
                  },
                  on: {
                    click: () => {
                      const { id} = params.row;
                      this.recordingModals =true
                      
                      api.byIdGetOrderInfo(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              actualPayment,
                              appType,
                              appTypeText,
                              id,
                              appointmentHospital,
                              createDate,
                              exchangeType,
                              goodsId,
                              goodsName,
                              isAppointment,
                              nickName,
                              orderNature,
                              phone,
                              quantity,
                              statusCode,
                              statusText,
                              orderId,
                              description
                            } = res.data.order;
                            this.getHospitalList()
                            this.isEdit = true;
                            this.recordingModals =true
                            this.recordingforms.actualPayment = actualPayment;
                            this.recordingforms.appType = appType;
                            this.recordingforms.appTypeText = appTypeText;
                            this.recordingforms.orderId = id;
                            this.recordingforms.appointmentHospital = appointmentHospital;
                            this.recordingforms.createDate = createDate;
                            this.recordingforms.exchangeType = exchangeType;
                            this.recordingforms.goodsId = goodsId;
                            this.recordingforms.goodsName = goodsName;
                            this.recordingforms.isAppointment = String(isAppointment);
                            this.recordingforms.buyerNick = nickName;
                            this.recordingforms.orderNature = orderNature;
                            this.recordingforms.phone = phone;
                            this.recordingforms.quantity = quantity;
                            this.recordingforms.statusCode = statusCode;
                            this.recordingforms.statusText = statusText;
                            this.recordingforms.remark = description;
                            this.addtitle = '编辑'
                          }
                        });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled:params.row.statusText === '咨询订单' ||  params.row.statusText ==='定金订单'
                  },
                  style: {
                    marginRight: ".3125rem",
                  },
                  on: {
                    click: () => {
                      const { id ,appType} = params.row;
                      const data = {
                        orderAppType : appType,
                        orderId : id
                      }
                      api.OrderProofreading(data).then((res) => {
                        if(res.code === 0 ){
                          this.$Message.success('校对成功')
                          this.getOrderInfo()
                        }
                      })
                    }
                  }
                },
                "校对订单"
              ),
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
                        this.recordingModal = true
                        this.recordingForm.orderId = id
                        this.getHospitalList()
                      },
                    },
                  },
                  "确认最终核销医院"
                ),
                
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                      disabled:params.row.statusText !== '咨询订单' &&  params.row.statusText !==  '定金订单'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteOrder(id).then((res) => {
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
            name: "买家已付款",
            value: "TRADE_BUYER_PAID",
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
        statusCode: null,
        appTypeList:[
          {
            appTypeText: "全部平台",
            orderType: -1,
          }
        ],
        appType:"",
        orderNature:"",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
    };
  },
  methods: {
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
          this.employeeList = employee;

        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList(){
        contentPlatForm.getContentPlatFormValidList().then((res) => {
        if(res.code === 0){
          const {contentPalteForms} = res.data
          this.contentPalteForms = contentPalteForms
        }
      })
    },
    plateChange(value){
      if(!value){
        return
      }
      this.getLiveValidList(value)
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value){
      const data={
        contentPlatFormId:value
      }
      api.getLiveValidList(data).then((res) => {
        if(res.code === 0){
          const {liveAnchors} = res.data
          this.liveAnchors = liveAnchors
        }
      })
    },
    // 提交（归属主播）
    anchorHandleSubmit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {orderId,liveAnchorId} = this.anchorForm
          const data = {
            orderId:[...orderId],
            liveAnchorId
          }
          api.LiveAnchorOrder(data).then((res) => {
            if(res.code===0){
                this.cancelSubmit("anchorForm");
                this.getOrderInfo();
                this.$Message.success({
                  content: "已绑成功",
                  duration: 3,
                });
            }
          })
        }
      })
      
    },
    // 提交（调整归属客服）
    adjustCustomerServiceSubmit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {orderId,belongEmpInfo} = this.adjustCustomerServiceForm
          const data = {
            orderId:[...orderId],
            belongEmpInfo
          }
          api.BelongEmployeeOrder(data).then((res) => {
            if(res.code===0){
                this.cancelSubmit("adjustCustomerServiceForm");
                this.getOrderInfo();
                this.$Message.success({
                  content: "已绑成功",
                  duration: 3,
                });
            }
          })
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
    //根据商品名称获取id
    selectGoodsName(data){
      this.AmiyaHospitalDepartmentList.map((item)=>{
        if(data===item.id){
          this.form.goodsNames = item.projectName
          this.form.goodsId = item.id
        }
      })
    },
    // 获取交易类型
    getExchanType(){
      api.getExchanType().then((res) => {
        if(res.code === 0){
          const { exchangeTypes} = res.data
          this.exchangeTypes = exchangeTypes
        }
      })
    },
    // 获取合作过的医院列表
    getHospitalList(){
      api.getHospitalList().then((res) => {
        if(res.code === 0){
          const { hospitalInfo} = res.data
          this.hospitalNameList = hospitalInfo
        }
      })
    },
    // 获取商品名称和id
    getgetAmiyaHospitalDepartmentList(){
      api.getgetAmiyaHospitalDepartmentList().then((res) => {
        if(res.code === 0){
          const {AmiyaGoodsDemandList} = res.data
          this.AmiyaHospitalDepartmentList = AmiyaGoodsDemandList
        }
      })
    },
    // 图片
    handleUploadChange(values) {
      this.$Message.error('不能更改图片')
    },
    // 添加商品
    addgoods(){
      this.controlModal = true
      this.getgetAmiyaHospitalDepartmentList()
      this.getHospitalList()
      this.getExchanType()
       
    },
    //补单不能修改图片 
    imageChange(value){
      if(value==1){
        this.$Message.error('不能修改商品图片')
      }else{
        this.$Message.error('只能根据搜索订单号获取商品图片')
      }
    },
    // 补单
    supplementChange(){
      const {appType,orderId} = this.form
      const data =  {appType,orderId} 
      api.repairOrder(data).then((res) => {
        if(res.code ===0){
          const {orderData} = res.data
          this.form.goodsName = orderData.goodsName
          this.form.thumbPictureUrl= orderData.thumbPicUrl
          this.form.goodsId= orderData.goodsId
          this.form.phone= orderData.phone
          this.form.appointmentHospital= orderData.appointmentHospital
          this.form.statusCode= orderData.statusCode
          this.form.actualPayment= orderData.actualPayment
          this.form.buyerNick= orderData.nickName
          this.form.isAppointment= orderData.isAppointment
          this.form.orderType= orderData.orderType
          this.form.orderNature= orderData.orderNature
          this.form.quantity= orderData.quantity
          this.form.accountReceivable = orderData.accountReceivable
          this.form.exchangeType= 1
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
              orderId,
              goodsName,
              thumbPictureUrl,
              goodsId,
              phone,
              appointmentHospital,
              statusCode,
              actualPayment,
              buyerNick,
              appType,
              isAppointment,
              orderType,
              orderNature,
              quantity,
              exchangeType,
              remark,
              accountReceivable,
              createDate
            } = this.form
            const data = {
              orderId,
              goodsName,
              thumbPictureUrl,
              goodsId,
              phone,
              appointmentHospital:appointmentHospital ? appointmentHospital : null,
              statusCode,
              actualPayment,
              buyerNick,
              appType,
              isAppointment,
              orderType,
              orderNature,
              quantity,
              exchangeType,
              remark,
              accountReceivable,
              createDate:createDate ? createDate : null
            }
            api.supplement(data).then((res) => {
              if(res.code ===0 ){
                this.handleCancel("form");
                this.getOrderInfo()
              }
            })
          }
        }
      })
      
    },
    // 录单按钮
    recordingChange(){
      this.recordingModals = true
      this.getHospitalList()
    },
    // 录单提交
    EntryOrderSubmits(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            const {
              orderType , 
              // contentPlateFormId , 
              phone , 
              // liveAnchorId , 
              buyerNick , 
              appointmentDate , 
              appointmentHospital , 
              depositAmount , 
              goodsId, 
              // consultingContent , 
              remark , 
              // lateProjectStage,
              id,
              thumbPictureUrl,
              exchangeType,
              actualPayment,
              isAppointment,
              statusCode,
              appType,
              quantity,
              orderId,
              orderNature
            } = this.recordingforms
            this.AmiyaHospitalDepartmentList.map(item=>{
              if(item.id===goodsId){
                this.goodsName = item.projectName
              }
            })
            const data = {
                orderType , 
                // contentPlateFormId , 
                phone , 
                // liveAnchorId , 
                buyerNick , 
                appointmentDate : appointmentDate ? this.$moment(appointmentDate).format("YYYY-MM-DD") : null, 
                appointmentHospital , 
                depositAmount:depositAmount ? depositAmount :0 , 
                goodsId, 
                goodsName:this.goodsName,
                // consultingContent , 
                remark , 
                // lateProjectStage,
                id,
                thumbPictureUrl,
                exchangeType,
                actualPayment:Number(actualPayment) ? Number(actualPayment) : 0,
                isAppointment:isAppointment == "true" ? true : false,
                statusCode,
                appType,
                quantity:Number(quantity) ? Number(quantity) : 0,
                orderId,
                orderNature
            }
            if(phone){
              if (!(/^1[3456789]\d{9}$/.test(phone))) {
                this.$Message.error('请输入正确的手机号')
                return false;
              }
              this.flag = true
              api.UpdateOrder(data).then((res) => {
                if (res.code === 0) {
                  this.isEdit = false;
                  this.flag = false
                  this.recordingModals = false
                  this.handleCancel("recordingforms");
                  this.getOrderInfo()
                  this.$Message.success({
                    content: "修改成功",
                    duration: 3,
                  });
                }else{
                  setTimeout(()=>{
                    this.flag = false
                  },3000)
                }
              });
            }
              
          }else{
            const {
              orderType , 
              // contentPlateFormId , 
              phone , 
              // liveAnchorId , 
              buyerNick , 
              appointmentDate , 
              appointmentHospital , 
              depositAmount , 
              goodsId, 
              // consultingContent , 
              remark , 
              // lateProjectStage,
              thumbPictureUrl,
              exchangeType,
              actualPayment,
              isAppointment,
              statusCode,
              appType,
              quantity,
              orderId,
              orderNature
            } = this.recordingforms
            this.AmiyaHospitalDepartmentList.map(item=>{
              if(item.id===goodsId){
                this.goodsName = item.projectName
              }
            })
            const data = {
                orderType , 
                // contentPlateFormId , 
                phone , 
                // liveAnchorId , 
                buyerNick , 
                appointmentDate : appointmentDate ? this.$moment(appointmentDate).format("YYYY-MM-DD") : null, 
                appointmentHospital , 
                depositAmount:depositAmount ? depositAmount :0  , 
                goodsId, 
                // consultingContent , 
                remark , 
                // lateProjectStage,
                goodsName:this.goodsName,
                thumbPictureUrl,
                exchangeType,
                actualPayment:Number(actualPayment) ? Number(actualPayment) : 0,
                isAppointment:isAppointment == "true" ? true : false,
                statusCode,
                appType,
                quantity:Number(quantity) ? Number(quantity) : 0,
                orderId,
                orderNature
            }
            if(phone){
                if (!(/^1[3456789]\d{9}$/.test(phone))) {
                  this.$Message.error('请输入正确的手机号')
                  return false;
                }
                this.flag = true
                api.EntryOrder(data).then((res) => {
                  if (res.code === 0) {
                    this.isEdit = false;
                    this.flag =false
                    this.recordingModals = false
                    this.handleCancel("recordingforms");
                    this.getOrderInfo()
                    this.$Message.success({
                      content: "添加成功",
                      duration: 3,
                    });
                  }else{
                    this.flag = false
                  }
                });
              }
          }
        }else{

        }
      })
      
    },
     // 取消
    handleCancel(name) {
      this.controlModal = false
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.addtitle = '录单'
        this.$refs["form"].resetFields();
        this.$refs["anchorForm"].resetFields();
        this.$refs["recordingForm"].resetFields();
        this.$refs["recordingforms"].resetFields();
      }
    },
    // 确认
    recordingHandleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { orderId ,hospitalId } = this.recordingForm;
          if (this.isEdit) {
            
          } else {
            const data = {
              orderId,
              hospitalId:hospitalId
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
      this.recordingModal = false;
      this.anchorModal = false
      this.recordingModals = false;
      this.adjustCustomerServiceModal =false
      this.addtitle = '录单'
      this.anchorForm.orderId.clear();
      this.adjustCustomerServiceForm.orderId.clear();
      this.$refs[name].resetFields();
      
    },
    // 导出
    handleExportClick() {
      const { keyword,statusCode, appType ,startDate, endDate, writeOffStartDate  , writeOffEndDate,orderNature} = this.query;
      const data = { 
        keyword, 
        statusCode, 
        appType:appType === -1 ? "" : appType ,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        writeOffStartDate: writeOffStartDate ? this.$moment(writeOffStartDate).format("YYYY-MM-DD") : "",
        writeOffEndDate: writeOffEndDate ? this.$moment(writeOffEndDate).format("YYYY-MM-DD") : "",
        orderNature
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择下单日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.exportTmallOrderLlist(data).then((res) => {
        download(res);
      });
    },
    // 获取下单平台列表
    getAppTypeList() {
      api.getAppTypeList().then(res=>{
        if(res.code === 0) {
          this.query.appTypeList = [...this.query.appTypeList,...res.data.orderAppTypes]
        }
      })
    },
   
    // 获取天猫订单信息列表
    getOrderInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize, statusCode, appType ,startDate, endDate, writeOffStartDate  , writeOffEndDate , orderNature,belongEmpId} = this.query;
      const data = { 
        keyword, 
        pageNum, 
        pageSize, 
        statusCode, 
        appType:appType === -1 ? "" : appType ,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        writeOffStartDate: writeOffStartDate ? this.$moment(writeOffStartDate).format("YYYY-MM-DD") : "",
        writeOffEndDate: writeOffEndDate ? this.$moment(writeOffEndDate).format("YYYY-MM-DD") : "",
        orderNature : orderNature ? Number(orderNature) :"",
        belongEmpId:belongEmpId == -1 ? '' : belongEmpId
        };
      api.orderInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          // this.query.data = list;
          this.query.data = list.map((item) => {
            return {
              ...item,
              _checked: false,
            };
          });
          this.query.totalCount = totalCount;
          this.keyword = keyword
          this.statusCode = statusCode
          this.appType = appType
          this.startDate = startDate
          this.endDate = endDate
          this.writeOffStartDate = writeOffStartDate
          this.writeOffEndDate = writeOffEndDate
        }
      });
    },
    handlePageSizeChange(pageSize){
      this.query.pageSize = pageSize
      this.getOrderInfo()
    },
    // 获取天猫订单信息列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize, statusCode, appType , startDate, endDate, writeOffStartDate  , writeOffEndDate , orderNature,belongEmpId} = this.query;
      const data = { 
        keyword, 
        pageNum, 
        pageSize, 
        statusCode, 
        appType:appType === -1 ? "" : appType ,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        writeOffStartDate: writeOffStartDate ? this.$moment(writeOffStartDate).format("YYYY-MM-DD") : "",
        writeOffEndDate: writeOffEndDate ? this.$moment(writeOffEndDate).format("YYYY-MM-DD") : "",
        orderNature : orderNature ? Number(orderNature) : "",
        belongEmpId:belongEmpId == -1 ? '' : belongEmpId
      };
      api.orderInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          // this.query.data = list;
          this.query.data = list.map((item) => {
            return {
              ...item,
              _checked: false,
            };
          });
          this.query.totalCount = totalCount;
          this.keyword = keyword
          this.statusCode = statusCode
          this.appType = appType
          this.startDate = startDate
          this.endDate = endDate
          this.writeOffStartDate = writeOffStartDate
          this.writeOffEndDate = writeOffEndDate
          // 切换分页回显选中
          for (let index in this.query.data) {
            if (this.anchorForm.orderId.has(this.query.data[index].id)) {
              this.query.data[index]._checked = true
            }
          }
        }
      });
    },
     handleSelect(selection, row) {
       // 归属主播
      this.anchorForm.orderId.add(row.id);
      // 调整归属客服
      this.adjustCustomerServiceForm.orderId.add(row.id);

    },

    handleCancels(selection, row) {
      // 归属主播
      this.anchorForm.orderId.delete(row.id);
      // 调整归属客服
      this.adjustCustomerServiceForm.orderId.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        // const data = this.$refs.selection.data;
        // data.forEach((item) => {
        //   console.log(item)
        //   if (this.anchorForm.orderId.has(item.id)) {
        //     this.anchorForm.orderId.delete(item.id);
        //   }
        // });
        this.anchorForm.orderId.clear();
        this.adjustCustomerServiceForm.orderId.clear();
      } else {
        selection.forEach((item) => {
          this.anchorForm.orderId.add(item.id);
          this.adjustCustomerServiceForm.orderId.add(item.id);
        });
      }
    },
    // 归属主播
    handleAnchor() {
      if (![...this.anchorForm.orderId].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.anchorModal = true;
    },
    // 调整归属客服
    adjustCustomerService(){
      if (![...this.adjustCustomerServiceForm.orderId].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.adjustCustomerServiceModal = true;
    }
  },
  created() {
    this.getorderNatureList();
    this.getAppTypeList();
    this.getOrderInfo();
    this.getContentValidList()
    this.getgetAmiyaHospitalDepartmentList()
    this.getCustomerServiceList()
     const amiyaPositionId = JSON.parse(
      sessionStorage.getItem("amiyaPositionId")
    );
    this.amiyaPositionId = amiyaPositionId
  },
  watch: {
    "form.statusCode"(value) {
      if (value === 'SEEK_ADVICE') {
        this.form.actualPayment = "";
        this.$refs.actualPayment.validateMessage = ""
        this.$refs.actualPayment.validateState = ""
      }
    },
    "recordingforms.statusCode"(value) {
      if (value === 'SEEK_ADVICE') {
        this.recordingforms.actualPayment = "";
        this.$refs.actualPayment.validateMessage = ""
        this.$refs.actualPayment.validateState = ""
        
      }
    },
    "recordingforms.isAppointment"(value) {
      if (value === 'false') {
        this.recordingforms.appointmentHospital = "";
        this.$refs.appointmentHospital.validateMessage = ""
        this.$refs.appointmentHospital.validateState = ""
        
      }
    },
  },
};
</script>
<style lang="less" scoped>
.page_wrap {
  margin-top: 1rem;
  text-align: right;
}
.container {
  margin-top: 1rem;
}
.head{
  display: flex;
  align-items: center;
}
.head_left{
  margin-right: 1.25rem;
}
.no_img{
  width:65px;
  height: 65px;
  border: 1px dashed  #ccc;
  color: #666;
  line-height: 65px;
  text-align: center;
  font-size: 10px;
  margin-top: -10px;
  border-radius: 4px;
}
</style>
