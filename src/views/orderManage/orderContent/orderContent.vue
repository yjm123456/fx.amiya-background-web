<!-- 订单 -->
<template>
  <div>
    <Card :dis-hover="true">
      <div class="head">
        <div class="content1">
          <div class="left_top">
            <Input
              v-model="query.keyword"
              style="width:11.25rem;"
              placeholder="请输入订单号或商品名称"
              @keyup.enter.native="getOrderInfo()"
            />
            <DatePicker
              type="date"
              placeholder="下单开始日期"
              style="width: 150px;margin-left: .625rem"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <!-- <span style="margin-left:.625rem;color:#ccc">—</span> -->
            <DatePicker
              type="date"
              placeholder="下单结束日期"
              style="width: 150px; margin-left: .625rem"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
            <Select
              v-model="query.orderStatus"
              placeholder="请选择订单状态"
              style="width: 140px;margin-left: .625rem"
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
              style="width: 140px;margin-left: .625rem"
            >
              <Option
                v-for="item in orderSourcesListAll"
                :value="item.orderSource"
                :key="item.orderSource"
                >{{ item.orderSourceText }}</Option
              >
            </Select>
            <Select
              v-model="query.consultationEmpId"
              placeholder="请选择面诊员"
              style="width: 140px;margin-left: 10px"
              filterable
            >
              <Option
                v-for="item in consultationNameListAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </div>
          <!-- 一个是订单平台筛选 一个是主播平台筛选 -->
          <div>
            <Select
              v-model="query.contentPlateFormId"
              placeholder="请选择(订单)下单平台"
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
              v-model="query.appointmentHospital"
              style="width: 260px;margin-left: 10px"
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
            >导出</Button
          >
          <Button
            type="primary"
            @click="adjustCustomerService()"
            style="margin-left: 10px"
            v-if="
              amiyaPositionId == 1 ||
                amiyaPositionId == 14 ||
                amiyaPositionId == 16
            "
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
          show-elevator
          @on-change="handlePageChange"
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
          <Col span="8">
            <FormItem label="主播平台" prop="contentPlateFormId">
              <Select
                v-model="form.contentPlateFormId"
                placeholder="请选择主播平台"
                @on-change="contentPlateChange(form.contentPlateFormId)"
                filterable
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
                :disabled="form.contentPlateFormId === ''"
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
              prop="depositAmount"
              ref="depositAmount"
              :rules="{
                required: form.orderType !== 1,
                message: '请输入定金金额',
              }"
            >
              <Input
                v-model="form.depositAmount"
                type="number"
                :disabled="form.orderType === 1"
              ></Input>
            </FormItem>
          </Col>
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
          <Col span="8">
            <FormItem label="预约日期" prop="appointmentDate">
              <DatePicker
                type="date"
                placeholder="预约日期"
                :value="form.appointmentDate"
                v-model="form.appointmentDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单来源" prop="orderSource">
              <Select
                v-model="form.orderSource"
                placeholder="请选择订单来源"
                filterable
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
          <Col span="8">
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
          </Col>
        </Row>
        <Row :gutter="30">
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
      },
      controlModal: false,
      ruleValidates: {
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
        depositAmount: [
          {
            required: true,
            message: "请输入付款金额",
          },
        ],
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
            minWidth: 180,
            align: "center",
          },

          // {
          //   title: "预约时间",
          //   key: "appointmentDate",
          //   minWidth: 130,
          //   align: "center",
          //   render: (h, params) => {
          //     return h(
          //       "div",
          //       params.row.appointmentDate == "未预约时间"
          //         ? "未预约时间"
          //         : this.$moment(params.row.appointmentDate).format(
          //             "YYYY-MM-DD"
          //           )
          //     );
          //   },
          // },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
            align: "center",
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 200,
            align: "center",
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 150,
            align: "center",
          },
          {
            title: "预约医院",
            key: "appointmentHospitalName",
            minWidth: 220,
            align: "center",
          },
          // {
          //   title: "项目",
          //   key: "thumbPictureUrl",
          //   minWidth: 200,
          //   align: "center",
          //   render: (h, params) => {
          //     return h(
          //       "viewer",
          //       {
          //         props: {
          //           zoomable: false,
          //         },
          //         style: {
          //           display: "flex",
          //         },
          //       },
          //       [
          //         h("img", {
          //           style: {
          //             width: "3.125rem",
          //             height: "3.125rem",
          //             margin: ".3125rem .9375rem .3125rem .3125rem",
          //             verticalAlign: "middle",
          //           },
          //           attrs: {
          //             src: params.row.thumbPictureUrl,
          //           },
          //         }),
          //         h("div", params.row.goodsName),
          //       ]
          //     );
          //   },
          // },
          {
            title: "科室",
            key: "departmentName",
            minWidth: 120,
            align: "center",
          },

          {
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 500,
          },
          {
            title: "下单时间",
            key: "createDate",
            minWidth: 180,
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
            minWidth: 120,
            align: "center",
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 140,
            align: "center",
          },

          // {
          //   title: "订单类型",
          //   key: "orderTypeText",
          //   minWidth: 140,
          //   align: "center",
          // },
          {
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 140,
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
          // {
          //   title: "抖店订单号",
          //   key: "otherContentPlatFormOrderId",
          //   minWidth: 180,
          //   align: "center",
          // },
          {
            title: "订单来源",
            key: "orderSourceText",
            minWidth: 120,
            align: "center",
          },
          // {
          //   title: "派单人",
          //   key: "sender",
          //   minWidth: 120,
          //   align: "center",
          // },
          // {
          //   title: "派单时间",
          //   key: "sendDate",
          //   minWidth: 180,
          //   align: "center",
          //   render: (h, params) => {
          //     return params.row.sendDate
          //       ? h(
          //           "div",
          //           this.$moment(params.row.sendDate).format(
          //             "YYYY-MM-DD HH:mm:ss"
          //           )
          //         )
          //       : "";
          //   },
          // },
          {
            title: "面诊员",
            key: "consultationEmpName",
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
          //   title: "定金金额",
          //   key: "depositAmount",
          //   minWidth: 120,
          //   align: "center",
          // },
          // {
          //   title: "是否到院",
          //   key: "isToHospital",
          //   minWidth: 100,
          //   align: "center",
          //   render: (h, params) => {
          //     if (params.row.isToHospital == true) {
          //       return h("Icon", {
          //         props: {
          //           type: "md-checkmark",
          //         },
          //         style: {
          //           fontSize: "18px",
          //           color: "#559DF9",
          //         },
          //       });
          //     } else {
          //       return h("Icon", {
          //         props: {
          //           type: "md-close",
          //         },
          //         style: {
          //           fontSize: "18px",
          //           color: "red",
          //         },
          //       });
          //     }
          //   },
          // },
          // {
          //   title: "到院时间",
          //   key: "toHospitalDate",
          //   minWidth: 180,
          //   align: "center",
          //   render: (h, params) => {
          //     return params.row.toHospitalDate
          //       ? h(
          //           "div",
          //           this.$moment(params.row.toHospitalDate).format(
          //             "YYYY-MM-DD HH:mm:ss"
          //           )
          //         )
          //       : "";
          //   },
          // },
          // {
          //   title: "最终成交医院",
          //   key: "lastDealHospital",
          //   minWidth: 220,
          //   align: "center",
          // },
          // {
          //   title: "成交金额",
          //   key: "dealAmount",
          //   minWidth: 140,
          //   align: "center",
          // },
          // {
          //   title: "成交时间",
          //   key: "sendDate",
          //   minWidth: 180,
          //   align: "center",
          //   render: (h, params) => {
          //     return params.row.dealDate
          //       ? h(
          //           "div",
          //           this.$moment(params.row.dealDate).format(
          //             "YYYY-MM-DD HH:mm:ss"
          //           )
          //         )
          //       : "";
          //   },
          // },
          // {
          //   title: "未成交原因",
          //   key: "unDealReason",
          //   minWidth: 200,
          // },
          // {
          //   title: "后期铺垫",
          //   key: "lateProjectStage",
          //   minWidth: 400,
          // },
          // {
          //   title: "未派单原因",
          //   key: "unSendReason",
          //   minWidth: 200,
          // },
          // {
          //   title: "备注",
          //   key: "remark",
          //   minWidth: 400,
          // },
          // {
          //   title: "审核状态",
          //   key: "checkStateText",
          //   minWidth: 120,
          //   align: "center",
          // },
          // {
          //   title: "审核金额",
          //   key: "checkPrice",
          //   minWidth: 120,
          //   align: "center",
          // },
          // {
          //   title: "结算金额",
          //   key: "settlePrice",
          //   minWidth: 120,
          //   align: "center",
          // },
          // {
          //   title: "审核日期",
          //   key: "checkDate",
          //   minWidth: 180,
          //   align: "center",
          //   render: (h, params) => {
          //     return params.row.dealDate
          //       ? h(
          //           "div",
          //           params.row.checkDate ? this.$moment(params.row.checkDate).format(
          //             "YYYY-MM-DD HH:mm:ss"
          //           ) : ''
          //         )
          //       : "";
          //   },
          // },
          // {
          //   title: "审核人",
          //   key: "checkByName",
          //   minWidth: 120,
          //   align: "center",
          // },
          // {
          //   title: "审核备注",
          //   key: "checkRemark",
          //   minWidth: 300,
          //   align: "center",
          // },
          // {
          //   title: "是否回款",
          //   key: "isReturnBackPrice",
          //   minWidth: 120,
          //   align:'center',
          //   render: (h, params) => {
          //     if (params.row.isReturnBackPrice == true) {
          //       return h(
          //         "div",
          //         {
          //           style: {
          //             color: "#04B05D",
          //           },
          //         },
          //         params.row.isReturnBackPrice == true ? '已回款':'未回款'
          //       );
          //     } else if (params.row.isReturnBackPrice == false) {
          //       return h(
          //         "div",
          //         {
          //           style: {
          //             color: "red",
          //           },
          //         },
          //         params.row.isReturnBackPrice == true ? '已回款':'未回款'
          //       );
          //     }else {
          //       return h(
          //         "div",
          //         {
          //           style: {
          //             color: "#515a6e",
          //           },
          //         },
          //         params.row.isReturnBackPrice == true ? '已回款':'未回款'
          //       );
          //     }
          //   },
          // },
          // {
          //   title: "回款金额",
          //   key: "returnBackPrice",
          //   minWidth: 120,
          //   align:'center'
          // },
          // {
          //   title: "回款时间",
          //   key: "returnBackDate",
          //   minWidth: 180,
          //   align:'center',
          //   render: (h, params) => {
          //     return params.row.returnBackDate
          //       ? h(
          //           "div",
          //           this.$moment(params.row.returnBackDate).format("YYYY-MM-DD HH:mm:ss")
          //         )
          //       : "";
          //   },
          // },
          {
            title: "操作",
            align: "center",
            minWidth: 300,
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
                      disabled: params.row.checkStateText === "审核通过",
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
                            } = res.data.orderInfo;
                            this.contentPlateChange(contentPlateFormId);
                            this.isEdit = true;
                            this.form.appointmentHospitalId = appointmentHospitalId;
                            this.form.id = id;
                            this.form.consultingContent = consultingContent;
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
                            this.form.belongEmpId = this.form.belongEmpId
                              ? this.form.belongEmpId
                              : "";
                            this.form.consultationEmpId = consultationEmpId;
                            this.customerUploadObj.uploadList = this.form
                              .customerPictures
                              ? this.form.customerPictures
                              : [];
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
    };
  },
  methods: {
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
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
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
              consultationEmpId,
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
                  this.getOrderInfo();
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
              consultationEmpId,
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
                  this.flag = false;
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
      };
      api.getContentPlateFormOrderLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
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

    const amiyaPositionId = JSON.parse(
      sessionStorage.getItem("amiyaPositionId")
    );
    this.amiyaPositionId = amiyaPositionId;
  },
  watch: {
    "form.orderType"(value) {
      if (value === 1) {
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
</style>
