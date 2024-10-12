<template>
  <div>
    <Card>
      <div class="content">
        <Input
          v-model="query.keyWord"
          placeholder="请输入关键词"
          style="width:200px;"
          @keyup.enter.native="getOnlyMainHospitalOrderClick()"
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
          v-model="query.orderStatus"
          style="width: 160px;margin-left: 10px"
          placeholder="请选择订单状态"
          filterable
        >
          <Option
            v-for="(item,index) in statusCodeList"
            :value="item.orderStatus"
            :key="index"
            >{{ item.orderStatusText }}</Option
          >
        </Select>
        <Select
          v-model="query.hospitalId"
          style="width: 240px;margin-left: 10px"
          placeholder="请选择医院"
          filterable
          transfer
        >
          <Option
            v-for="(item2,index2) in hospitallist"
            :value="item2.id"
            :key="index2"
            >{{ item2.name }}</Option
          >
        </Select>
        <Button
          type="primary"
          @click="getOnlyMainHospitalOrderClick()"
          style="margin-left: 10px"
          >查询</Button
        >
        <Button
            type="primary"
            @click="batchReassignmentClick()"
            style="margin-left: 10px"
            >批量改派</Button
          >
      </div>

      <div style="margin-top:10px">
        <Table 
          border 
          :columns="query.columns" 
          :data="query.data"
          @on-select="handleSelect"
          @on-select-cancel="handleCancels"
          @on-select-all="handleSelectAll"
          @on-select-all-cancel="handleSelectAll"></Table>
      </div>
      <div class="pages">
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
    <!-- 改派 -->
    <Modal
      v-model="controlModal"
      title="改派"
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
            <Option v-for="item in hospital" :value="item.id" :key="item.id">{{item.name}}</Option>
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
            :disabled="form.isMainHospital == true ? form.hasDealInfo == true : form.hasDealInfo == false"
          >
            <!-- hasDealInfo为true的话有成交信息主派医院不能修改 -->
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否为主派医院" key="是否为主派医院">
          <i-switch v-model="form.isMainHospital" disabled />
        </FormItem>
        <FormItem
          label="次派医院"
          prop="otherHospitalId"
          v-if="form.isMainHospital == true"
          key="次派医院"
        >
          <Select
            v-model="form.otherHospitalId"
            placeholder="请选择次派医院"
            filterable
            multiple
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
          label="留言"
          v-show="form.hospitalId || form.allHospitalId !== form.tempHospitalId"
        >
          <Input
            v-model="form.content"
            placeholder="请输入留言"
            type="textarea"
          ></Input>
        </FormItem>
        <Spin fix v-if="editLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 批量改派 -->
    <batchReassignment :batchReassignmentModel.sync ="batchReassignmentModel" :batchReassignmentParams="batchReassignmentParams"/>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/hospitalManage";
import batchReassignment from "./batchReassignment.vue"
export default {
  components:{
    batchReassignment
  },
  props: {
    activeName: String,
  },
  data() {
    return {
      // 开启所有医院
      openAllHospital: false,
      editLoading: false,
      query: {
        orderStatus:-1,
        hospitalId:0,
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 80,
          },
          {
            title: "派单编号",
            key: "id",
            minWidth: 100,
            align: "center",
            tooltip: true,
          },
          {
            title: "订单编号",
            key: "orderId",
            minWidth: 170,
            align: "center",
            tooltip: true,
          },
          {
            title: "归属部门",
            key: "belongChannelText",
            minWidth: 100,
            align: "center",
            tooltip: true,
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 150,
            align: "center",
            tooltip: true,
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
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "是否为主派医院",
            key: "isMainHospital",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              if (params.row.isMainHospital == true) {
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
            title: "派单医院",
            key: "sendHospital",
            minWidth: 200,
            align: "center",
            tooltip: true,
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
            title: "订单状态",
            key: "orderStatusText",
            minWidth: 140,
            align: "center",
            tooltip: true,
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
            title: "消费金额",
            key: "dealAmount",
            minWidth: 120,
            align: "center",
          },
          {
            title: "派单人",
            key: "senderName",
            minWidth: 140,
            align: "center",
            tooltip: true,
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
          {
            title: "主派咨询内容",
            minWidth: 400,
            key: "consultingContent",
            tooltip: true,
          },
          {
            title: "次派咨询内容",
            minWidth: 400,
            key: "consultingContent2",
            tooltip: true,
          },
          {
            title: "面诊类型",
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
            minWidth: 190,
            align: "center",
            tooltip: true,
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
            title: "订单来源",
            key: "orderSourceText",
            minWidth: 120,
            align: "center",
          },
          {
            title: "是否指定医生账号",
            key: "isSpecifyHospitalEmployee",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              if (params.row.isSpecifyHospitalEmployee == true) {
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
            title: "医生账号",
            key: "hospitalEmployeeName",
            minWidth: 150,
            align: "center",
            tooltip: true,
          },
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
            width: 100,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // disabled: params.row.checkState == 2,
                    },
                    style: {
                      marginLeft: "5px",
                    },
                    on: {
                      click: () => {
                        const {
                          id,
                          orderId,
                          goodsId,
                          isMainHospital,
                        } = params.row;
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
                              otherHospitalId,
                              hasDealInfo,
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
                            this.form.isMainHospital = isMainHospital;
                            this.form.otherHospitalId = otherHospitalId;
                            this.form.hasDealInfo = hasDealInfo;
                            this.controlModal = true;
                          }
                          // });
                        });
                      },
                    },
                  },
                  "改派"
                ),
              ]);
            },
          },
        ],
        data: [],
        statusCode: "",
      },
      // 控制 modal
      controlModal: false,
      form: {
        id: "",
        orderId: "",
        hospitalId: "",
        // 临时，用于判断修改留言板显示/隐藏
        tempHospitalId: "",
        // 所有医院中选择
        allHospitalId: "",
        // 次派医院
        otherHospitalId: [],
        appointmentDate: "",
        timeType: "",
        // 留言
        content: "",
        // 未确定时间
        isUncertainDate: false,
        // 为true的话有成交信息主派医院不能修改
        hasDealInfo: false,
      },

      // 医院列表
      hospital: [],

      // 所有医院
      hospitalInfo: [],
      hospitallist: [{ id: 0, name: "全部医院" }],

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
      // 订单状态
      statusCodeList:[{ orderStatus: -1, orderStatusText: "全部订单状态" }],
      // 改派
      batchReassignmentParams:{
        // 派单id
        sendInfoIdList:new Set(),
        // 医院
        hospitalList:[],
        // 用于保留当前页面
        pageNum:1,
      },
      // 改派model
      batchReassignmentModel:false,
    };
  },
  methods: {
    // 批量改派
   batchReassignmentClick(){
      if (![...this.batchReassignmentParams.sendInfoIdList].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.batchReassignmentModel = true
    }, 
   handleSelect(selection, row) {
      // 批量改派
      this.batchReassignmentParams.sendInfoIdList.add(row.id);
    },

    handleCancels(selection, row) {
      // 批量改派
      this.batchReassignmentParams.sendInfoIdList.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.batchReassignmentParams.sendInfoIdList.clear();
      } else {
        selection.forEach((item) => {
          this.batchReassignmentParams.sendInfoIdList.add(item.id);
        });
      }
    },
    // 订单状态
    getContentPlateFormOrderStatusList() {
      api.contentPlateFormOrderStatusList().then((res) => {
        if (res.code === 0) {
          const { orderStatus } = res.data;
          this.statusCodeList = [...this.statusCodeList, ...orderStatus];
        }
      });
    },
    // 获取派单信息列表
    getOnlyMainHospitalOrderClick() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { startDate, endDate, keyWord, pageNum, pageSize ,orderStatus,hospitalId} = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyWord,
        pageNum,
        pageSize,
        orderStatus:orderStatus == -1 ? null :orderStatus,
        hospitalId:hospitalId == 0 ? null :hospitalId,
      };
      api.getOnlyMainHospitalOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取派单信息列表分页
    handlePageChange(pageNum) {
      const { startDate, endDate, keyWord, pageSize,orderStatus,hospitalId } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyWord,
        pageNum,
        pageSize,
        orderStatus:orderStatus == -1 ? null :orderStatus,
        hospitalId:hospitalId == 0 ? null :hospitalId,
      };
      api.getOnlyMainHospitalOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
          this.batchReassignmentParams.pageNum = pageNum
        }
      });
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
          this.hospitallist = [...this.hospitallist, ...res.data.hospitalInfo];
          this.batchReassignmentParams.hospitalList = res.data.hospitalInfo
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
            otherHospitalId,
            isMainHospital,
          } = this.form;
          const data = {
            id,
            orderId,
            // 提交时，如果所有医院未开启则提交已参与医院中的医院，反则提交所有医院中的医院
            hospitalId: !this.openAllHospital ? hospitalId : allHospitalId,
            appointmentDate: isUncertainDate ? null : appointmentDate ? this.$moment(appointmentDate).format("YYYY-MM-DD") : appointmentDate,
            timeType: isUncertainDate ? null : timeType ? timeType : null,
            content,
            isUncertainDate,
            otherHospitalId: isMainHospital == false ? [] : otherHospitalId,
          };
          this.editLoading = true;
          api.editContentPlateFormSendOrder(data).then((res) => {
            if (res.code === 0) {
              this.editLoading = false;
              this.cancel("form");
              // this.getOnlyMainHospitalOrderClick();
              this.handlePageChange(this.$refs.pages.currentPage);
              this.$Message.success({
                content: "修改成功",
                duration: 3,
              });
            } else {
              setTimeout(() => {
                this.editLoading = false;
              }, 3000);
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
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
      }
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "listOfUnassignedOrders") {
          this.getOnlyMainHospitalOrderClick();
          this.getContentPlateFormOrderStatusList()
        }
      },
      immediate: true,
    },
  },
  created() {
    this.getHospitalInfonameList();
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
.detailed {
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
</style>
