<template>
  <div>
    <Card>
      <div>
        <div>
          <!-- <Input v-model="query.keyword" search enter-button placeholder="输入客户姓名/手机号/订单号" style="width: 400px;" @keyup.enter.native="getHospitalContentList()"/> -->
        </div>
        <div class="content">
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
          <Button
            type="primary"
            @click="getHospitalContentList()"
            style="margin-left:10px"
            >查询</Button
          >
          <!-- <Button
            type="primary"
            @click="exportOfContentPlatFormHospital()"
            style="margin-left:10px"
            >导出</Button
          > -->
        </div>
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
        <!-- <FormItem
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
        </FormItem> -->
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

        <FormItem
          label="是否陪诊"
          prop="isAcompanying"
          key="是否陪诊"
          v-if="form.isToHospital == true"
        >
          <i-switch v-model="form.isAcompanying" />
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
      :phone="phone"
      :isTabel="isTabel"
      @handleRefreshList="getHospitalContentList()"
    ></orderReceiving>
    <!-- 生成喜报 -->
    <goodsNews :goodsNewsModel.sync="goodsNewsModel" :id="id"></goodsNews>
    <!-- 留言板 -->
    <messageBoard @messageBoardChange = "messageBoardChange"  :messageBoardParams = "messageBoardParams"/>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import logoMin from "@/assets/images/logo_min.png";
import messageBoard from "@/components/contentMessageBoard/contentMessageBoard.vue";
import transactionStatus from "@/components/transactionStatus/transactionStatus";
import upload from "@/components/upload/upload";
import { download } from "@/utils/util";
import viewCustomerPhotos from "@/components/viewCustomerPhotos/viewCustomerPhotos.vue";
import orderReceiving from "./orderReceiving.vue";
import goodsNews from "@/components/goodsNews/goodsNews.vue";

export default {
  props:{
    activeName:String,
    toHospitalTypeList:Array
  },
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
      isTabel:false,
      phone:'',
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
        isAcompanying: false,
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
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            title: "客户",
            key: "orderId",
            minWidth: 170,
            render: (h, params) => {
              return h("div", [
                h(
                  "div",
                  {
                    style: {
                      marginTop: "6px",
                      fontSize: "13px",
                    },
                  },
                  "订单号：" + params.row.orderId
                ),
                h("Icon", {
                  props: {
                    type: "md-person",
                  },
                  style: {
                    cursor: "pointer",
                    marginRight: "5px",
                    fontSize: "18px",
                    marginTop: "6px",
                  },
                  on: {
                    click: () => {},
                  },
                }),

                h(
                  "span",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  params.row.customerName
                ),
                h("div", {
                  style: {
                    marginBotton: "6px",
                  },
                }),
                h("Icon", {
                  props: {
                    type: "ios-call",
                  },
                  style: {
                    cursor: "pointer",
                    marginRight: "5px",
                    fontSize: "18px",
                  },
                  on: {
                    click: () => {},
                  },
                }),
                h(
                  "span",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  params.row.phone
                ),
                h("span", {
                  style: {
                    color: "#2d8cf0",
                    fontSize: "20px",
                    marginLeft: "10px",
                  },
                  class: !params.row.bool
                    ? "iconfont icon-see"
                    : "iconfont icon-see",
                  on: {
                    click: () => {
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
                h("div", {
                  style: {
                    marginBottom: "6px",
                  },
                }),
                h("Icon", {
                  props: {
                    type: "ios-chatbubbles",
                  },
                  style: {
                    cursor: "pointer",
                    marginRight: "5px",
                    fontSize: "18px",
                    marginBottom: "6px",
                  },
                  on: {
                    click: () => {},
                  },
                }),
                h(
                  "span",
                  {
                    style: {
                      marginTop: "5px",
                      marginBottom: "10px",
                    },
                  },
                  params.row.weChatNo
                ),
              ]);
            },
          },
          {
            title: "地区",
            key: "city",
            minWidth: 40,
          },
          {
            title: "项目",
            key: "orderId",
            minWidth: 120,
            render: (h, params) => {
              return h("div", [
                h(
                  "div",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  "主播：" + params.row.liveAnchor
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  "项目名称：" + params.row.goodsName
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  params.row.isToHospital == true
                    ? "是否到院：已到院"
                    : "是否到院：未到院"
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  params.row.isAcompanying == true
                    ? "是否陪诊：陪诊"
                    : "是否陪诊：未陪诊"
                ),
              ]);
            },
          },
          {
            title: "跟进",
            key: "orderId",
            minWidth: 180,
            render: (h, params) => {
              return h("div", [
                h(
                  "div",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  "派单人：" + params.row.sendBy
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  "派单时间：" +
                    this.$moment(params.row.sendDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "6px",
                    },
                  },
                  "最新消息：" + (params.row.firstlyRemark == null ? '' :  params.row.firstlyRemark)
                ),
              ]);
            },
          },
          {
            title: "咨询内容",
            key: "consultingContent",
            minWidth: 400,
            tooltip:true
          },
          {
            title: "订单状态",
            key: "orderStatus",
            minWidth: 90,
            align: "center",
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
              } else if (params.row.orderStatus == "重单-不可深度") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.orderStatus
                );
              } else if (params.row.orderStatus == "重单-可深度") {
                return h(
                  "div",
                  {
                    style: {
                      color: "orange",
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
            title: "是否重单深度",
            key: "isRepeatProfundityOrder",
            minWidth: 70,
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
            title: "操作",
            width: 200,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              // let message = h(
              //   "Button",
              //   {
              //     props: {
              //       type: "text",
              //       size: "small",
              //     },
              //     style: {
              //       fontSize: "14px",
              //       color: "#fff",
              //       background: "#007fff",
              //       padding: 0,
              //       marginRight: "15px",
              //       cursor: "pointer",
              //       width: "70px",
              //       height: "27px",
              //     },
              //     on: {
              //       click: () => {
              //         this.$Message.warning("正在开发中");
              //       },
              //     },
              //   },
              //   "聊天联系"
              // );

              let check = h(
                "Button",
                {
                  props: {
                    type: "text",
                    // icon: "md-eye",
                    size: "small",
                  },
                  style: {
                    fontSize: "14px",
                    color: "#fff",
                    background: "#007fff",
                    marginRight: "14px",
                    cursor: "pointer",
                    width: "60px",
                    height: "27px",
                  },
                  on: {
                    click: () => {
                      // 备注
                         const { hospitalId , id,orderId} = params.row;
                        this.messageBoardParams.hospitalId = hospitalId
                        this.messageBoardParams.id = orderId
                        this.messageBoardParams.messageBoard = true
                      
                    },
                  },
                },
                "留言板"
              );
              let send_order = h(
                "Dropdown",
                {
                  props: {
                    placement: "bottom",
                    transfer: true,
                  },
                  on: {
                    "on-click": (name) => {
                      if (name == "lookCustomerImg") {
                        // 查看顾客照片
                        const { orderId } = params.row;
                        this.viewCustomerPhotosModel = true;
                        this.contentPlatFormOrderId = orderId;
                      } else if (name == "deal") {
                        // 成交情况
                        const { id, orderId } = params.row;
                        this.transactionStatusParams.contentPlatFormOrderId = orderId;
                        this.transactionStatusParams.transactionStatusModel = true;
                      }  else if (name == "confirm") {
                        //确认
                        const { id, orderId } = params.row;
                        this.controlModal = true;
                        this.form.id = orderId;
                        this.getHospitalList();
                      } else if (name == "goodNews") {
                        //生成喜报
                        const { orderId } = params.row;
                        this.goodsNewsModel = true;
                        this.id = orderId;
                      }
                    },
                  },
                },
                [
                  h(
                    "a",
                    {
                      style: {
                        color: "#007fff",
                      },
                    },
                    [
                      "更多",
                      h("Icon", {
                        props: {
                          type: "ios-arrow-down",
                        },
                        style: {
                          marginLeft: "5px",
                          color: "#3A64FF",
                        },
                      }),
                    ]
                  ),
                  h(
                    "DropdownMenu",
                    {
                      slot: "list",
                      props: {
                        trigger: "hover",
                      },
                    },
                    [
                      h(
                        "DropdownItem",
                        {
                          props: {
                            name: "lookCustomerImg",
                            disabled:
                              params.row.orderStatus == "重单-不可深度" ||
                              params.row.orderStatus == "已派单",
                          },
                        },
                        "查看顾客照片"
                      ),

                      h(
                        "DropdownItem",
                        {
                          props: {
                            name: "deal",
                            disabled:
                              params.row.orderStatus == "重单-不可深度" ||
                              params.row.orderStatus == "已派单",
                          },
                        },
                        "成交情况"
                      ),

                      h(
                        "DropdownItem",
                        {
                          props: {
                            name: "confirm",
                            disabled:
                              params.row.checkState == 2 ||
                              params.row.orderStatus == "重单-不可深度" ||
                              params.row.orderStatus == "已派单",
                          },
                        },
                        "确认"
                      ),

                      h(
                        "DropdownItem",
                        {
                          props: {
                            name: "goodNews",
                            disabled: params.row.orderStatus != "已成交",
                          },
                        },
                        "生成喜报"
                      ),
                    ]
                  ),
                ]
              );
              let option = [];
              // option.push(message);
              option.push(check);
              option.push(send_order);
              return h("div", option);
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
            id: "true",
            name: "已到院",
          },
          {
            id: "false",
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
    // 留言板
    messageBoardChange() {
      this.messageBoardParams.messageBoard = false;
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
        this.form.isAcompanying = false;
      } else {
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
        this.form.isAcompanying = false;
      }
    },
    // 内容平台派单 导出
    exportOfContentPlatFormHospital() {
      const {
        keyword,
        startDate,
        endDate,
        IsToHospital,
        toHospitalStartDate,
        toHospitalEndDate,
        toHospitalType,
      } = this.query;
      const data = {
        keyword,
        startDate: this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date(endDate)).format("YYYY-MM-DD"),

        IsToHospital: IsToHospital == -1 ? null : IsToHospital,
        toHospitalStartDate:
          IsToHospital != "true"
            ? null
            : toHospitalStartDate
            ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD")
            : null,
        toHospitalEndDate:
          IsToHospital != "true"
            ? null
            : toHospitalEndDate
            ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
            : null,
        toHospitalType:
          IsToHospital != "true"
            ? null
            : toHospitalType == false
            ? null
            : toHospitalType,
        orderStatus: 5,
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
        IsToHospital: IsToHospital == -1 ? null : IsToHospital,
        toHospitalStartDate:
          IsToHospital != "true"
            ? null
            : toHospitalStartDate
            ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD")
            : null,
        toHospitalEndDate:
          IsToHospital != "true"
            ? null
            : toHospitalEndDate
            ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
            : null,
        toHospitalType:
          IsToHospital != "true"
            ? null
            : toHospitalType == false
            ? null
            : toHospitalType,
        orderStatus: 5,
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
        IsToHospital: IsToHospital == -1 ? null : IsToHospital,
        toHospitalStartDate:
          IsToHospital != "true"
            ? null
            : toHospitalStartDate
            ? this.$moment(toHospitalStartDate).format("YYYY-MM-DD")
            : null,
        toHospitalEndDate:
          IsToHospital != "true"
            ? null
            : toHospitalEndDate
            ? this.$moment(toHospitalEndDate).format("YYYY-MM-DD")
            : null,
        toHospitalType:
          IsToHospital != "true"
            ? null
            : toHospitalType == false
            ? null
            : toHospitalType,
        orderStatus: 5,
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
            isAcompanying,
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
            lastDealHospitalId:
              isToHospital == true ? Number(sessionStorage.getItem('hospitalId')) : null,
            toHospitalDate: toHospitalDate
              ? this.$moment(toHospitalDate).format("YYYY-MM-DD")
              : null,
            toHospitalType: isToHospital == false ? 0 : toHospitalType,
            isAcompanying,
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
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "duplicateOrder") {
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
