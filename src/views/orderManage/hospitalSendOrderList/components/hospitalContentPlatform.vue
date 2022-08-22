<template>
  <div>
    <Card>
      <div>
        <DatePicker
          type="date"
          placeholder="开始日期"
          style="width: 200px"
          :value="query.startDate"
          v-model="query.startDate"
          transfer
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="结束日期"
          style="width: 200px; margin-left: 10px"
          :value="query.endDate"
          v-model="query.endDate"
          transfer
        ></DatePicker>
        <Input
          v-model="query.keyword"
          placeholder="请输入关键词"
          style="width: 200px; margin: 0 10px"
          @keyup.enter.native="getHospitalContentList()"
        />
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
          style="width: 140px;margin-left: 10px"
          :value="query.toHospitalStartDate"
          v-model="query.toHospitalStartDate"
          transfer
          :disabled="query.IsToHospital != 'true'"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="到院结束日期"
          style="width: 140px; margin-left: 10px"
          :value="query.toHospitalEndDate"
          v-model="query.toHospitalEndDate"
          transfer
          :disabled="query.IsToHospital != 'true'"
        ></DatePicker>
        <Select
          v-model="query.toHospitalType"
          style="width: 160px;margin-left: 10px"
          placeholder="请选择到院类型"
          :disabled="query.IsToHospital != 'true'"
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
        <Button
          type="primary"
          @click="getHospitalContentList()"
          style="margin-left:10px"
          >查询</Button
        >
        <Button
          type="primary"
          @click="exportOfContentPlatFormHospital()"
          style="margin-left:10px"
          >导出</Button
        >
      </div>
      <div style="margin-top: 10px">
        <Table border :columns="query.columns" :data="query.data"></Table>
        <Spin fix v-if="flag == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
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
    <Modal
      v-model="controlModal"
      title="确认"
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
        <FormItem label="是否到院" prop="isToHospital" key="是否到院">
          <i-switch
            v-model="form.isToHospital"
            :disabled="form.isFinish === true"
            @on-change="isToHospitalChange"
          />
        </FormItem>
        <FormItem
          label="到院医院"
          prop="lastDealHospitalId"
          key="到院医院"
          v-if="form.isToHospital == true"
        >
          <Select
            v-model="form.lastDealHospitalId"
            placeholder="请选择到院医院"
            filterable
            disabled
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
          label="到院类型"
          prop="toHospitalType"
          key="到院类型"
          v-if="form.isToHospital === true"
        >
          <Select
            v-model="form.toHospitalType"
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
        <FormItem
          label="到院时间"
          prop="toHospitalDate"
          key="到院时间"
          v-if="form.isToHospital == true"
        >
          <DatePicker
            type="date"
            placeholder="到院时间"
            :value="form.toHospitalDate"
            v-model="form.toHospitalDate"
            style="width:360px"
            transfer
          ></DatePicker>
          
        </FormItem>
        
        <FormItem label="是否陪诊" prop="isAcompanying" key="是否陪诊" v-if="form.isToHospital == true">
          <i-switch
            v-model="form.isAcompanying"
          />
        </FormItem>
        <FormItem label="是否成交" prop="isFinish" key="是否成交">
          <i-switch v-model="form.isFinish" @on-change="isFinishChange" />
        </FormItem>
        
        <FormItem
          label="未成交原因"
          prop="unDealReason"
          v-if="form.isFinish !== true"
          key="未成交原因"
        >
          <Input
            v-model="form.unDealReason"
            placeholder="请输入未成交原因"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem
          label="未成交截图"
          key="未成交截图"
          v-if="form.isFinish !== true"
        >
          <upload
            :uploadObj="noDealuploadObj"
            @uploadChange="noDealhandleUploadChange"
          />
        </FormItem>
        <FormItem
          label="成交金额"
          v-if="form.isFinish === true"
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
            v-model="form.dealAmount"
            placeholder="请输入成交金额"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem
          label="成交时间"
          prop="DealDate"
          v-if="form.isFinish === true"
          key="成交时间"
        >
          <DatePicker
            type="date"
            placeholder="成交时间"
            style="width: 100%"
            v-model="form.DealDate"
          ></DatePicker>
        </FormItem>
        <FormItem
          label="后期项目铺垫"
          v-if="form.isFinish === true"
          key="后期项目铺垫"
        >
          <Input
            v-model="form.lastProjectStage"
            placeholder="请输入后期项目铺垫"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="成交凭证" key="成交凭证" v-if="form.isFinish === true">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <div style="color:red;font-size:3px" v-if="form.isFinish === true">
          *注：请上传该手机号客户在贵公司系统的成交凭证截图
        </div>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="imgControlModal"
      title="重单退回"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="imgForm"
        :model="imgForm"
        :rules="dealRuleValidate"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="重单截图" key="重单截图" prop="repeatePictureUrl">
          <upload
            :uploadObj="delUploadObj"
            @uploadChange="dealHandleUploadChange"
          />
        </FormItem>
        <div style="color:red;font-size:3px">
          *注：请上传贵公司系统已存在该手机号用户的截图证明
        </div>
      </Form>
      <div slot="footer">
        <Button @click="cancel('imgForm')">取消</Button>
        <Button type="primary" @click="dealSubmit('imgForm')">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="remarkModel"
      title="备注"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="remarkForm"
        :model="remarkForm"
        label-position="left"
        :label-width="80"
        :rules="remarkFlag"
      >
        <FormItem label="备注" prop="hospitalRemark">
          <Input
            v-model="remarkForm.hospitalRemark"
            type="textarea"
            :rows="4"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel('remarkForm')">取消</Button>
        <Button type="primary" @click="remarkHandleSubmit('remarkForm')"
          >确定</Button
        >
      </div>
    </Modal>

    <!-- 成交情况 -->
    <transactionStatus
      @transactionStatusChange="transactionStatusChange"
      :transactionStatusParams="transactionStatusParams"
    />
    <!-- 查看顾客照片 -->
    <viewCustomerPhotos
      :viewCustomerPhotosModel.sync="viewCustomerPhotosModel"
      :contentPlatFormOrderId.sync="contentPlatFormOrderId"
    ></viewCustomerPhotos>
    <!-- 接单 -->
    <orderReceiving
      :orderReceivingModel.sync="orderReceivingModel"
      :receivingObj="receivingObj"
      @handleRefreshList="getHospitalContentList()"
    ></orderReceiving>
    <!-- 生成喜报 -->
    <goodsNews :goodsNewsModel.sync="goodsNewsModel" :id="id"></goodsNews>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import logoMin from "@/assets/images/logo_min.png";
import messageBoard from "@/components/messageBoard/messageBoard.vue";
import transactionStatus from "@/components/transactionStatus/transactionStatus";
import upload from "@/components/upload/upload";
import { download } from "@/utils/util";
import viewCustomerPhotos from "@/components/viewCustomerPhotos/viewCustomerPhotos.vue";
import orderReceiving from "./orderReceiving.vue";
import goodsNews from "@/components/goodsNews/goodsNews.vue";

export default {
  props: ["activeName"],
  components: {
    messageBoard,
    transactionStatus,
    upload,
    viewCustomerPhotos,
    orderReceiving,
    goodsNews,
  },
  data() {
    return {
      // 到院状态
      toHospitalTypeList: [],
      flag: false,
      // 生成喜报
      goodsNewsModel: false,
      id: "",
      // 传给接单子组件的值
      receivingObj: {},
      orderReceivingModel: false,
      hospitalInfo: [],
      // 查看图片
      viewCustomerPhotosModel: false,
      contentPlatFormOrderId: "",
      remarkModel: false,
      remarkForm: {
        sendOrderId: null,
        hospitalRemark: "",
      },
      remarkFlag: {
        hospitalRemark: [
          {
            required: true,
            message: "请输入备注",
          },
        ],
      },
      logoMin,
      controlModal: false,
      imgControlModal: false,
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
      form: {
        id: null,
        // 是否成交
        isFinish: false,
        // 是否到院
        isToHospital: false,
        // 成交金额
        dealAmount: null,
        //后期铺垫
        lastProjectStage: "",
        // 成交凭证
        dealPictureUrl: "",
        // 未成交原因
        unDealReason: "",
        // 未成交截图
        unDealPictureUrl: "",
        // 成交时间
        DealDate: null,
        lastDealHospitalId: null,
        toHospitalDate: "",
        toHospitalType: null,
        // 是否陪诊
        isAcompanying:false
      },
      imgForm: {
        id: "",
        orderId: "",
        repeatePictureUrl: "",
      },
      query: {
        IsToHospital: -1,
        toHospitalStartDate: "",
        toHospitalEndDate: "",
        toHospitalType: null,
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            title: "订单编号",
            key: "orderId",
            minWidth: 200,
          },
          {
            title: "派单时间",
            key: "sendDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                params.row.sendDate
                  ? this.$moment(params.row.sendDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 180,
            render: (h, params) => {
              const employeeType = window.sessionStorage.getItem(
                "employeeType"
              );
              if (employeeType === "hospitalEmployee") {
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
                      params.row.phone
                    ),
                    h("span", {
                      style: {
                        color: "#2d8cf0",
                        fontSize: "20px",
                      },
                      class: !params.row.bool
                        ? "iconfont icon-biyan"
                        : "iconfont icon-see",
                      on: {
                        click: () => {
                          // if(params.row.orderStatus=='医院重单'){
                          //   this.$Message.warning('该订单已重单，无法查看')
                          //   return
                          // }
                          // if(params.row.orderStatus=='已派单'){
                          //   this.$Message.warning('该订单暂未接单，无法查看')
                          //   return
                          // }
                          if (params.row.bool) {
                            return;
                          }
                          const { orderId } = params.row;
                          const data = {
                            orderId,
                          };
                          this.flag = true;
                          api.contentPlatformPhone(data).then((res) => {
                            if (res.code === 0) {
                              params.row.phone = res.data.phone;
                              params.row.bool = true;
                              this.flag = false;
                            } else {
                              setTimeout(() => {
                                this.flag = false;
                              }, 2000);
                            }
                          });
                        },
                      },
                    }),
                  ]
                );
              }
            },
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 200,
          },
          {
            title: "项目",
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
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
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
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 400,
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                params.row.appointmentDate === "未确定时间"
                  ? "未确定时间"
                  : this.$moment(params.row.appointmentDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
              );
            },
          },
          {
            title: "订单状态",
            key: "orderStatus",
            minWidth: 200,
            render: (h, params) => {
              if (params.row.orderStatus == "已成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "医院重单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "已派单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "未成交") {
                return h(
                  "div",
                  {
                    style: {
                      color: "brown",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "已接单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
                    },
                  },
                  params.row.orderStatus
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.orderStatus
                );
              }
            },
          },
          {
            title: "订单来源",
            key: "orderSourceText",
            minWidth: 120,
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 120,
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
            title: "到院时间",
            key: "toHospitalDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                params.row.toHospitalDate? 
                  this.$moment(params.row.toHospitalDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ):''
              );
            },
          },
          {
            title: "到院类型",
            key: "toHospitalTypeText",
            minWidth: 120,
            
          },
          {
            title: "是否陪诊",
            key: "isAcompanying",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isAcompanying,
                    size: "default",
                    disabled:
                      params.row.isAcompanying === true ||
                      params.row.isAcompanying === false,
                  },
                },
                h("span", { isAcompanying: "open" }, "开"),
                h("span", { isAcompanying: "close" }, "关")
              );
            },
          },
          {
            title: "主播IP",
            key: "liveAnchor",
            minWidth: 150,
          },
          {
            title: "接诊咨询",
            key: "acceptConsulting",
            minWidth: 150,
          },
          {
            title: "定金金额",
            key: "depositAmount",
            minWidth: 200,
          },
          
          // {
          //   title: "成交时间",
          //   key: "dealDate",
          //   minWidth: 200,
          //   render: (h, params) => {
          //     return params.row.dealDate ? h("div",this.$moment(params.row.dealDate).format("YYYY-MM-DD")) : '';
          //   },
          // },
          {
            title: "成交金额",
            key: "dealAmount",
            minWidth: 200,
          },
          {
            title: "成交凭证",
            key: "dealPictureUrl",
            minWidth: 200,
            render: (h, params) => {
              return params.row.dealPictureUrl
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
                          src: params.row.dealPictureUrl,
                        },
                      }),
                    ]
                  )
                : "";
            },
          },

          {
            title: "未成交原因",
            key: "unDealReason",
            minWidth: 200,
          },
          {
            title: "未成交截图",
            key: "unDealPictureUrl",
            minWidth: 200,
            render: (h, params) => {
              return params.row.unDealPictureUrl
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
                          src: params.row.unDealPictureUrl,
                        },
                      }),
                    ]
                  )
                : "";
            },
          },
          {
            title: "后期项目铺垫",
            key: "lateProjectStage",
            minWidth: 400,
          },
          {
            title: "订单备注",
            key: "orderRemark",
            minWidth: 400,
          },
          {
            title: "派单留言",
            key: "sendOrderRemark",
            minWidth: 400,
          },
          {
            title: "医院备注",
            key: "hospitalRemark",
            minWidth: 400,
          },
          {
            title: "操作",
            width: 460,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small",
                      disabled: params.row.orderStatus != "已派单",
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { id, orderId } = params.row;
                        this.orderReceivingModel = true;
                        this.receivingObj = params.row;
                      },
                    },
                  },
                  "接单"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:
                        params.row.orderStatus == "医院重单" ||
                        params.row.orderStatus == "已派单",
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { orderId } = params.row;
                        this.viewCustomerPhotosModel = true;
                        this.contentPlatFormOrderId = orderId;
                      },
                    },
                  },
                  "查看顾客照片"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:
                        params.row.orderStatus == "医院重单" ||
                        params.row.orderStatus == "已派单",
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { id, orderId } = params.row;
                        this.transactionStatusParams.contentPlatFormOrderId = orderId;
                        this.transactionStatusParams.transactionStatusModel = true;
                      },
                    },
                  },
                  "成交情况"
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
                        const { id, orderId } = params.row;
                        this.remarkModel = true;
                        this.remarkForm.sendOrderId = id;
                      },
                    },
                  },
                  "备注"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // 审核状态是2 审核通过的情况下不能在点确认了
                      disabled:
                        params.row.checkState == 2 ||
                        params.row.orderStatus == "医院重单" ||
                        params.row.orderStatus == "已派单",
                      // disabled: params.row.orderStatus =='未成交' || params.row.orderStatus =='已成交',
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { id, orderId } = params.row;
                        this.controlModal = true;
                        this.form.id = orderId;
                        this.getHospitalList();
                      },
                    },
                  },
                  "确认"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.orderStatus != "已成交",
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const { orderId } = params.row;
                        this.goodsNewsModel = true;
                        this.id = orderId;
                      },
                    },
                  },
                  "生成喜报"
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //       disabled: params.row.orderStatus =='未成交' || params.row.orderStatus =='已成交'||params.row.orderStatus =='医院重单',
                //     },
                //     style: {
                //       marginLeft: "5px",
                //     },
                //     on: {
                //       click: () => {
                //         const {id,orderId} = params.row;
                //         this.imgForm.id = id
                //         this.imgForm.orderId = orderId
                //         this.imgControlModal = true
                //       },
                //     },
                //   },
                //   "重单退回"
                // ),
              ]);
            },
          },
        ],
        data: [],
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
      },

      // 控制 modal 弹窗
      controlModal: false,

      ruleValidate: {
        toHospitalType: [
          {
            required: true,
            message: "请选择到院类型",
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
            message: "请选择到院医院",
            trigger: "blur",
            type: "number",
          },
        ],
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
        DealDate: [
          {
            required: true,
            message: "请选择时间",
          },
        ],
      },
      dealRuleValidate: {
        repeatePictureUrl: [
          {
            required: true,
            message: "请上传重单截图",
          },
        ],
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
        isHospital: 2,
      },
    };
  },
  methods: {
    //   获取订单到院类型
    getcontentPlateFormOrderToHospitalTypeList() {
      api.contentPlateFormOrderToHospitalTypeList().then((res) => {
        if (res.code === 0) {
          const { orderTypes } = res.data;
          this.toHospitalTypeList = orderTypes;
        }
      });
    },
    // 获取医院列表
    getHospitalList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalInfo = hospitalInfo;
        }
      });
    },
    // 是否到院
    isToHospitalChange() {
      if (this.form.isToHospital == false) {
        this.form.toHospitalDate = null;
        this.form.toHospitalType = null;
        this.form.isAcompanying = false
      }else{
        this.form.lastDealHospitalId = Number(
          sessionStorage.getItem("hospitalId")
        );
      }
    },
    isFinishChange() {
      if (this.form.isFinish === true) {
        this.form.isToHospital = true;
        this.form.dealAmount = "";
        this.form.lastProjectStage = "";
        this.uploadObj.uploadList = [];
        this.form.DealDate = null;
        
      } else {
        this.form.isToHospital = false;
        this.form.unDealReason = "";
        this.noDealuploadObj.uploadList = [];
        this.form.toHospitalDate = null;
        this.form.toHospitalType = null;
        this.form.isAcompanying =false
      }
    },
    // 内容平台派单 导出
    exportOfContentPlatFormHospital() {
      const { keyword, startDate, endDate,IsToHospital,toHospitalStartDate,toHospitalEndDate,toHospitalType, } = this.query;
      const data = {
        keyword,
        startDate: this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date(endDate)).format("YYYY-MM-DD"),
        
        IsToHospital:IsToHospital == -1 ? null : IsToHospital,
        toHospitalStartDate:IsToHospital != 'true'? null: toHospitalStartDate ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD") : null,
        toHospitalEndDate:IsToHospital != 'true'? null: toHospitalEndDate? this.$moment(toHospitalEndDate).format("YYYY-MM-DD"): null,
        toHospitalType:IsToHospital != 'true'? null: toHospitalType == false ? null: toHospitalType,
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.exportOfContentPlatFormHospital(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "内容平台派单";
        download(res, name);
      });
    },
    // 成交情况
    transactionStatusChange() {
      this.transactionStatusParams.transactionStatusModel = false;
    },
    // 未成交截图
    noDealhandleUploadChange(values) {
      this.form.unDealPictureUrl = values[0];
    },
    // 图片
    handleUploadChange(values) {
      this.form.dealPictureUrl = values[0];
    },
    // 图片
    dealHandleUploadChange(values) {
      this.imgForm.repeatePictureUrl = values[0];
    },
    // 医院获取派单信息
    getHospitalContentList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        startDate,
        endDate,
        keyword,
        pageNum,
        pageSize,
        IsToHospital,
        toHospitalStartDate,
        toHospitalEndDate,
        toHospitalType,
      } = this.query;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        pageNum,
        pageSize,
        IsToHospital:IsToHospital == -1 ? null : IsToHospital,
        toHospitalStartDate:IsToHospital != 'true'? null: toHospitalStartDate ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD") : null,
        toHospitalEndDate:IsToHospital != 'true'? null: toHospitalEndDate? this.$moment(toHospitalEndDate).format("YYYY-MM-DD"): null,
        toHospitalType:IsToHospital != 'true'? null: toHospitalType == false ? null: toHospitalType,
      };
      api.getHospitalContentPlateFormOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 医院获取派单信息分页
    handleProjectPageChange(pageNum) {
      const {
        startDate,
        endDate,
        keyword,
        pageSize,
        IsToHospital,
        toHospitalStartDate,
        toHospitalEndDate,
        toHospitalType,
      } = this.query;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        pageNum,
        pageSize,
        IsToHospital:IsToHospital == -1 ? null : IsToHospital,
        toHospitalStartDate:IsToHospital != 'true'? null: toHospitalStartDate ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD") : null,
        toHospitalEndDate:IsToHospital != 'true'? null: toHospitalEndDate? this.$moment(toHospitalEndDate).format("YYYY-MM-DD"): null,
        toHospitalType:IsToHospital != 'true'? null: toHospitalType == false ? null: toHospitalType,
      };
      api.getHospitalContentPlateFormOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 备注
    remarkHandleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { sendOrderId, hospitalRemark } = this.remarkForm;
          const data = {
            sendOrderId,
            hospitalRemark,
          };
          api.contentPlateFormOrderRemark(data).then((res) => {
            if (res.code === 0) {
              this.cancel("remarkForm");
              this.getHospitalContentList();
              this.$Message.success({
                content: "备注成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 确认
    submit(name) {
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
            toHospitalType,
            isAcompanying
          } = this.form;
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
            lastDealHospitalId: isToHospital == true ? lastDealHospitalId : null,
            toHospitalDate: toHospitalDate
              ? this.$moment(toHospitalDate).format("YYYY-MM-DD")
              : null,
            toHospitalType: isToHospital == false ? 0 : toHospitalType,
            isAcompanying
          };
          api.finishContentPlateFormOrder(data).then((res) => {
            if (res.code === 0) {
              this.cancel("form");
              this.getHospitalContentList();
              this.$Message.success({
                content: "确认成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 重单退回
    dealSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, repeatePictureUrl, orderId } = this.imgForm;
          const data = {
            id,
            orderId,
            repeatePictureUrl,
          };
          api.contentPlateFormOrderRepeate(data).then((res) => {
            if (res.code === 0) {
              this.cancel("imgForm");
              this.getHospitalContentList();
              this.$Message.success({
                content: "确认成功",
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
      this.imgControlModal = false;
      this.remarkModel = false;
      this.uploadObj.uploadList = [];
      this.delUploadObj.uploadList = [];
      this.noDealuploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
        this.cancel("imgForm");
        this.cancel("remarkForm");
      }
    },
  },
  created() {
    this.getcontentPlateFormOrderToHospitalTypeList();
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "hospitalContentPlatform") {
          this.getHospitalContentList();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.pages {
  margin-top: 16px;
  text-align: right;
}
.con {
  margin-bottom: 30px;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 24px;
    }
    .name {
      margin-right: 50px;
    }
  }
  .item-message {
    margin-left: 9%;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
}
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
</style>
