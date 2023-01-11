<!-- 订单 -->
<template>
  <div>
    <Card :dis-hover="true">
      <div class="head">
        <div class="content1">
          <div class="left_top">
            <Input
              v-model="query.keyword"
              style="width:200px;"
              placeholder="请输入订单号或商品名称"
              @keyup.enter.native="getOrderInfo()"
            />
            <DatePicker
              type="date"
              placeholder="下单开始日期"
              style="width: 160px;margin-left: .625rem"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <!-- <span style="margin-left:.625rem;color:#ccc">—</span> -->
            <DatePicker
              type="date"
              placeholder="下单结束日期"
              style="width: 160px; margin-left: .625rem"
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
              v-model="query.contentPlateFormId"
              placeholder="请选择(订单)下单平台"
              style="width: 200px;"
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
              v-model="query.belongEmpId"
              style="width: 160px;margin-left: 10px"
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
              style="width: 160px; margin-left: 10px"
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
              style="width: 160px; margin-left: 10px"
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
              v-model="query.consultationType"
              style="width: 160px;margin-left:10px"
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
            
          </div>
          <div style="margin-top:10px">
            <Select
                v-model="query.belongMonth"
                placeholder="请选择归属月份"
                filterable
                style="width:200px;"
                
              >
                <Option
                  v-for="item in belongMonthList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
              <Input
                v-model="query.minAddOrderPrice"
                placeholder="请输入最小下单金额"
                style="width: 180px;margin-left:10px"
                type="number"
                namber
              />
              <span> — </span>
              <Input
                v-model="query.maxAddOrderPrice"
                placeholder="请输入最大下单金额"
                style="width: 180px;"
                type="number"
                namber
              />
              <Select
              v-model="query.appointmentHospital"
              style="width: 220px;margin-left: 10px"
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
            @click="addgoods()"
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
          <Col span="8" v-if="title === '录单'">
            <FormItem
              label="绑定客服"
              prop="belongEmpId"
              :rules="[
                {
                  required: title === '录单' ? true : false,
                  message: '请选择绑定客服',
                },
              ]"
            >
              <Select
                v-model="form.belongEmpId"
                placeholder="请选择绑定客服"
                filterable
                :disabled="title === '录单编辑'"
              >
                <Option
                  v-for="item in employeeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <!-- 客服和客服管理员不能更改（positionId==2 || positionId==4） :disabled="title=='录单编辑' && (positionId==2 || positionId==4)"-->
          <Col span="8">
            <FormItem label="主播平台" prop="contentPlateFormId">
              <Select
                v-model="form.contentPlateFormId"
                placeholder="请选择主播平台"
                @on-change="contentPlateChange(form.contentPlateFormId)"
                filterable
                :disabled="
                  title == '录单编辑' && (positionId == 2 || positionId == 4)
                "
              >
                <Option
                  v-for="item in contentPalteForms"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.contentPlatformName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播IP账号" prop="liveAnchorId">
              <Select
                v-model="form.liveAnchorId"
                placeholder="请选择主播IP账号"
                :disabled="
                  form.contentPlateFormId === '' ||
                    (title == '录单编辑' &&
                      (positionId == 2 || positionId == 4))
                "
                filterable
                @on-change="liveAnchorChange(form.liveAnchorId)"
              >
                <Option
                  v-for="item in liveAnchors"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.hostAccountName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播微信号" prop="liveAnchorWeChatNo">
              <Select
                v-model="form.liveAnchorWeChatNo"
                placeholder="请选择主播微信号"
                :disabled="
                  form.liveAnchorId === '' ||
                    (title == '录单编辑' &&
                      (positionId == 2 || positionId == 4))
                "
                filterable
              >
                <Option
                  v-for="item in weChatList"
                  :value="item.weChatNo"
                  :key="item.weChatNo"
                  >{{ item.weChatNo }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="科室" prop="hospitalDepartmentId">
              <Select
                v-model="form.hospitalDepartmentId"
                placeholder="请选择科室"
                filterable
                @on-change="departmentChange(form.hospitalDepartmentId)"
              >
                <Option
                  v-for="item in AmiyaHospitalDepartmentListDepartment"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.departmentName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="需求" prop="goodsId">
              <Select
                v-model="form.goodsId"
                placeholder="请选择需求"
                filterable
                :disabled="form.hospitalDepartmentId === ''"
              >
                <Option
                  v-for="item in AmiyaHospitalDepartmentList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.projectName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单类型" prop="orderType">
              <Select v-model="form.orderType" placeholder="请选择订单类型">
                <Option
                  v-for="item in statusCodeArr2"
                  :value="item.orderType"
                  :key="item.orderType"
                  >{{ item.orderTypeText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="定金金额"
              prop="depositAmount"
              ref="depositAmount"
              :rules="{
                required: form.orderType == 2,
                message: '请输入定金金额',
              }"
            >
              <Input
                v-model="form.depositAmount"
                type="number"
                :disabled="form.orderType == 1 || form.orderType == 3"
              ></Input>
            </FormItem>
          </Col>
          
          <Col span="8">
            <FormItem label="预约门店" prop="appointmentHospitalId">
              <Select
                v-model="form.appointmentHospitalId"
                placeholder="请选择预约门店"
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
          </Col>
          <!-- <Col span="8">
            <FormItem label="预约日期" prop="appointmentDate">
              <DatePicker
                type="date"
                placeholder="预约日期"
                :value="form.appointmentDate"
                v-model="form.appointmentDate"
              ></DatePicker>
            </FormItem>
          </Col> -->
          <Col span="8">
            <FormItem label="订单来源" prop="orderSource">
              <Select
                v-model="form.orderSource"
                placeholder="请选择订单来源"
                filterable
                :disabled="
                  title == '录单编辑' && (positionId == 2 || positionId == 4)
                "
              >
                <Option
                  v-for="item in orderSourcesList"
                  :value="item.orderSource"
                  :key="item.orderSource"
                  >{{ item.orderSourceText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="8">
            <FormItem label="面诊员" prop="consultationEmpId">
              <Select
                v-model="form.consultationEmpId"
                placeholder="请选择面诊员"
                filterable
              >
                <Option
                  v-for="item in consultationNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="接诊咨询" prop="acceptConsulting">
              <Input
                v-model="form.acceptConsulting"
                placeholder="请输入接诊咨询"
              ></Input>
            </FormItem>
          </Col> -->
        
          <Col span="8">
            <FormItem label="面诊状态" prop="consultationType">
              <Select
                v-model="form.consultationType"
                placeholder="请选择面诊状态"
                filterable
                :disabled="
                  title == '录单编辑' && (positionId == 2 || positionId == 4)
                "
              >
                <Option
                  v-for="item in consultationTypeList"
                  :value="item.orderType"
                  :key="item.orderType"
                  >{{ item.orderTypeText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="归属月份" prop="belongMonth">
              <Select
                v-model="form.belongMonth"
                placeholder="请选择归属月份"
                filterable
                
              >
                <Option
                  v-for="item in belongMonthList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="下单金额"
              prop="addOrderPrice"
              :rules="{
                required: true,
                message: '请输入下单金额',
              }"
            >
              <Input
                v-model="form.addOrderPrice"
                type="number"
                number
                placeholder="请输入下单金额"
              ></Input>
            </FormItem>
          </Col>
          
        </Row>
        <div class="h3">客户信息</div>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="客户昵称" prop="customerName">
              <Input
                v-model="form.customerName"
                placeholder="请输入客户昵称"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="手机号" prop="phone">
              <Input
                v-model="form.phone"
                maxlength="11"
                placeholder="请输入手机号"
                :disabled="
                  title == '录单编辑' && (positionId == 2 || positionId == 4)
                "
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="性别" prop="sex">
              <div >
                <Radio-group v-model="form.sex">
                    <Radio label="男">男</Radio>
                    <Radio label="女">女</Radio>
                </Radio-group>
              </div>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="生日" prop="birthday">
              <DatePicker
                type="date"
                placeholder="选择日期"
                :value="form.birthday"
                v-model="form.birthday"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="职业" prop="occupation">
              <Input
                  v-model="form.occupation"
                  placeholder="请输入职业"
                />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="微信备注" prop="wechatNumber">
              <Input
                v-model="form.wechatNumber"
                placeholder="请输入微信备注"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="城市" prop="city">
              <Input
                v-model="form.city"
                placeholder="请输入城市"
              />
            </FormItem>
          </Col>
          <Col span="20">
            <FormItem label="顾客照片" prop="imageUrl" key="customerPictures">
              <upload
                :uploadObj="customerUploadObj"
                @uploadChange="customerHandleUploadChange"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="12">
            <FormItem label="咨询内容" prop="consultingContent">
              <Input
                v-model="form.consultingContent"
                type="textarea"
                :rows="5"
                placeholder="请输入咨询内容"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="未派单原因" prop="unSendReason">
              <Input
                v-model="form.unSendReason"
                type="textarea"
                :rows="5"
                placeholder="请输入未派单原因"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="12">
            <FormItem label="后期项目铺垫" prop="lateProjectStage">
              <Input
                v-model="form.lateProjectStage"
                type="textarea"
                :rows="5"
                placeholder="请输入后期项目铺垫"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="form.remark"
                type="textarea"
                :rows="5"
                placeholder="请输入备注"
              ></Input>
            </FormItem>
          </Col>
          <Spin fix v-if="flag == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
        </Row>
      </Form>

      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
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
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as hospitalManage from "@/api/hospitalManage";
import * as liveAnchorApi from "@/api/liveAnchorWechatInfo";
import upload from "@/components/upload/upload";
import viewCustomerPhotos from "@/components/viewCustomerPhotos/viewCustomerPhotos.vue";
import { download } from "@/utils/util";
import detail from "@/components/contentDetail/detail.vue";

export default {
  components: {
    upload,
    viewCustomerPhotos,
    detail,
  },
  data() {
    return {
      positionId: sessionStorage.getItem("positionId"),
      weChatList: [],
      detailList: [],
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
      form: {
        //   订单类型（1：咨询:2：定金）
        orderType: "",
        //   内容平台id（下单平台）
        contentPlateFormId: "",
        // 主播账号id
        liveAnchorId: "",
        // 主播微信号
        liveAnchorWeChatNo: "",
        // 客户昵称
        customerName: "",
        // 手机号
        phone: "",
        // 预约日期
        appointmentDate: "",
        // 预约门店
        appointmentHospitalId: "",
        // 定金金额
        depositAmount: "",
        // 项目id
        goodsId: "",
        // 咨询内容
        consultingContent: "",
        // 备注
        remark: "",
        // 铺垫
        lateProjectStage: "",
        id: "",
        // 科室
        hospitalDepartmentId: "",
        // 订单来源
        orderSource: null,
        // 未派单原因
        unSendReason: "",
        // 接诊咨询
        acceptConsulting: "",
        // 顾客照片（最多上传5张）
        customerPictures: [],
        // 录单人员
        belongEmpId: Number(sessionStorage.getItem("employeeId"))
          ? Number(sessionStorage.getItem("employeeId"))
          : "",
        // 面诊人员
        consultationEmpId: null,
        // 面诊状态
        consultationType: -1,
        // 归属月份
        belongMonth:null,
        // 下单金额
        addOrderPrice:null,
        // 性别
        sex:"",
        // 生日
        birthday:null,
        // 职业
        occupation:"",
        // 微信号
        wechatNumber:"",
        // 城市
        city:""
      },
      controlModal: false,
      ruleValidates: {
        city: [
          {
            required: true,
            message: "请输入城市",
          },
        ],
        belongMonth: [
          {
            required: true,
            message: "请选择归属月份",
          },
        ],
        consultationType: [
          {
            required: true,
            message: "请选择面诊状态",
          },
        ],
        consultationEmpId: [
          {
            required: true,
            message: "请输入面诊人",
          },
        ],
        orderSource: [
          {
            required: true,
            message: "请选择订单来源",
          },
        ],
        hospitalDepartmentId: [
          {
            required: true,
            message: "请选择科室",
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
        liveAnchorWeChatNo: [
          {
            required: true,
            message: "请选择主播微信号",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
        customerName: [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],

        goodsId: [
          {
            required: true,
            message: "请选择需求",
          },
        ],
        // depositAmount: [
        //   {
        //     required: true,
        //     message: "请输入付款金额",
        //   },
        // ],
        orderType: [
          {
            required: true,
            message: "请选择订单状态",
          },
        ],
        appointmentHospitalId: [
          {
            required: true,
            message: "请选择预约门店",
          },
        ],
        buyerNick: [
          {
            required: true,
            message: "请输入客户昵称",
          },
        ],
      },
      query: {
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
        // 面诊状态
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
            title: "面诊状态",
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
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 500,
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
            title: "操作",
            align: "center",
            minWidth: 230,
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
                        this.title = "录单编辑";
                        api.byIdContentPlateForm(id).then((res) => {
                          if (res.code === 0) {
                            // this.getgetAmiyaHospitalDepartmentList();
                            this.getHospitalList();
                            this.controlModal = true;
                            const {
                              appointmentHospitalId,
                              consultingContent,
                              customerName,
                              depositAmount,
                              goodsId,
                              id,
                              lateProjectStage,
                              liveAnchorId,
                              orderType,
                              phone,
                              remark,
                              contentPlateFormId,
                              appointmentDate,
                              hospitalDepartmentId,
                              customerPictures,
                              acceptConsulting,
                              orderSource,
                              unSendReason,
                              consultationEmpId,
                              liveAnchorWeChatNo,
                              consultationType,
                              belongMonth,
                              addOrderPrice,
                              sex,
                              city,
                              occupation,
                              wechatNumber,
                              birthday

                            } = res.data.orderInfo;
                            this.contentPlateChange(contentPlateFormId);
                            this.liveAnchorChange(liveAnchorId);
                            this.isEdit = true;
                            this.form.appointmentHospitalId = appointmentHospitalId;
                            this.form.id = id;
                            this.form.consultingContent = consultingContent;
                            this.form.sex = sex;
                            this.form.city = city;
                            this.form.occupation = occupation;
                            this.form.wechatNumber = wechatNumber;
                            this.form.birthday = birthday;
                            this.form.phone = phone;
                            this.form.customerName = customerName;
                            this.form.depositAmount = depositAmount;
                            this.form.goodsId = goodsId;
                            this.form.lateProjectStage = lateProjectStage;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.remark = remark;
                            this.form.contentPlateFormId = contentPlateFormId;
                            this.form.orderType = orderType;
                            this.form.appointmentDate = appointmentDate;
                            this.form.hospitalDepartmentId = hospitalDepartmentId;
                            this.form.acceptConsulting = acceptConsulting;
                            this.form.orderSource = orderSource;
                            this.form.unSendReason = unSendReason;
                            this.form.customerPictures = customerPictures;
                            this.form.liveAnchorWeChatNo = liveAnchorWeChatNo;
                            this.form.belongMonth = belongMonth;
                            this.form.addOrderPrice = addOrderPrice;
                            this.form.belongEmpId = this.form.belongEmpId
                              ? this.form.belongEmpId
                              : "";
                            this.form.consultationEmpId = consultationEmpId;
                            this.customerUploadObj.uploadList = this.form
                              .customerPictures
                              ? this.form.customerPictures
                              : [];
                            this.form.consultationType = consultationType;
                          }
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
      // 面诊状态(搜索用)
      consultationTypeListAll: [
        { orderType: -1, orderTypeText: "全部面诊状态" },
      ],
      // 面诊状态 录单
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
      ]
    };
  },
  methods: {
    //  获取内容平台订单类型
    getcontentPlateFormOrderTypeList() {
      api.getcontentPlateFormOrderTypeList().then((res) => {
        if (res.code === 0) {
          this.statusCodeArr2 = res.data.orderTypes;
        }
      });
    },
    //   获取 面诊状态列表（下拉框）
    getOrderConsultationTypeList() {
      api.getOrderConsultationTypeList().then((res) => {
        if (res.code === 0) {
          const { orderConsultationTypes } = res.data;
          this.consultationTypeListAll = [
            ...this.consultationTypeListAll,
            ...orderConsultationTypes,
          ];
          this.consultationTypeList = orderConsultationTypes;
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
        }
      });
    },
    handleSelect(selection, row) {
      // 调整归属客服
      this.adjustCustomerServiceForm.orderId.add(row.id);
    },

    handleCancels(selection, row) {
      // 调整归属客服
      this.adjustCustomerServiceForm.orderId.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.adjustCustomerServiceForm.orderId.clear();
      } else {
        selection.forEach((item) => {
          this.adjustCustomerServiceForm.orderId.add(item.id);
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
        maxAddOrderPrice
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
        contentPlateFormId,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        appointmentHospital:
          appointmentHospital == -1 ? null : appointmentHospital,
        consultationType: consultationType == -1 ? null : consultationType,
        belongMonth,
        minAddOrderPrice,
        maxAddOrderPrice
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
      this.getLiveValidList(value);
    },
    //
    liveAnchorChange(value) {
      if (!value) {
        return;
      }
      this.getWeChatList(value);
    },
    //  根据主播获取主播微信号
    getWeChatList(value) {
      const data = {
        liveanchorId: value,
      };
      liveAnchorApi.getvalidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorWechatInfos } = res.data;
          this.weChatList = liveAnchorWechatInfos;
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
    // 添加商品(录单)
    addgoods() {
      this.controlModal = true;
      // this.getgetAmiyaHospitalDepartmentList();
      this.getHospitalList();
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
                  this.handlePageChange(
                    sessionStorage.getItem("pageNumEdit")
                      ? sessionStorage.getItem("pageNumEdit")
                      : 1
                  );
                  this.$Message.success({
                    content: "修改成功",
                    duration: 3,
                  });
                } else if (res.code != -1 || res.code !=0){
                  this.$Message.error('操作失败，请联系管理员')
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }else {
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
                } else if (res.code != -1 || res.code !=0){
                  this.$Message.error('操作失败，请联系管理员')
                  setTimeout(() => {
                    this.flag = false;
                  }, 3000);
                }else {
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
      this.controlModal = false;
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
        maxAddOrderPrice
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
        contentPlateFormId,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        appointmentHospital:
          appointmentHospital == -1 ? null : appointmentHospital,
        consultationType: consultationType == -1 ? null : consultationType,
        belongMonth,
        minAddOrderPrice,
        maxAddOrderPrice
      };
      api.getContentPlateFormOrderLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }else if (res.code != -1 || res.code !=0){
          this.$Message.error('操作失败，请联系管理员')
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
        maxAddOrderPrice
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
        contentPlateFormId,
        belongEmpId: belongEmpId == -1 ? null : belongEmpId,
        liveAnchorId,
        orderSource,
        consultationEmpId: consultationEmpId == -1 ? null : consultationEmpId,
        appointmentHospital:
          appointmentHospital == -1 ? null : appointmentHospital,
        consultationType: consultationType == -1 ? null : consultationType,
        minAddOrderPrice,
        maxAddOrderPrice,
        belongMonth
      };
      api.getContentPlateFormOrderLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
          // 修改时 保留在当前页面
          sessionStorage.setItem("pageNumEdit", pageNum);
        }else if (res.code != -1 || res.code !=0){
          this.$Message.error('操作失败，请联系管理员')
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
