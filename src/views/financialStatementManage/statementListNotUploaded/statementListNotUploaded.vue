<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字 "
            style="width: 200px; "
            @keyup.enter.native="getUnCheckOrders()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px;margin-left: 10px"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.isSubmitReconciliationDocuments"
            placeholder="是否上传对账单"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in isSubmitReconciliationDocumentsList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.orderFrom"
            placeholder="订单来源"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in allplatformList"
              :value="item.status"
              :key="item.status"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 240px;margin-left:10px"
            v-if="employeeType == 'amiyaEmployee'"
            
          >
            <Option
              v-for="item in hospitalAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getUnCheckOrders()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="handleHospital()"
            v-if="employeeType == 'amiyaEmployee'"
            >指派医院</Button
          >
          <Button
            type="error"
            @click="deleteClick"
            style="margin-left: 10px"
            v-if="employeeType == 'amiyaEmployee'"
            >删除</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="addClick"
            v-if="employeeType == 'amiyaEmployee'"
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table
          border
          :columns="
            employeeType == 'amiyaEmployee'
              ? query.columns
              : query.hospitalColumns
          "
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
    <!-- 添加 -->
    <Modal
      v-model="controlModal"
      title="添加"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      fullscreen
    >
      <div class="top">
        <Input
            v-model="query.assemblyKeyword"
            placeholder="请输入关键字 例：手机号、下单平台可筛选医院"
            style="width: 350px; "
          />
        <DatePicker
          type="date"
          placeholder="开始日期"
          style="width: 200px;margin-left: 10px"
          :value="query.assemblyStartDate"
          v-model="query.assemblyStartDate"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="结束日期"
          style="width: 200px; margin-left: 10px"
          :value="query.assemblyEndDate"
          v-model="query.assemblyEndDate"
        ></DatePicker>
        <Select
          v-model="query.status"
          placeholder="请选择平台"
          filterable
          style="width: 200px; margin-left: 10px"
          @on-change="statusChange(query.status)"
        >
          <Option
            v-for="item in platformList"
            :value="item.status"
            :key="item.status"
            >{{ item.name }}</Option
          >
        </Select>
        <Select
            v-model="query.assemblyHospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 240px;margin-left:10px"
            v-if="employeeType == 'amiyaEmployee'"
            :disabled="query.status == 1"
          >
            <Option
              v-for="item in hospitalAllList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="statusChange(query.status)"
          >查询</Button
        >
      </div>
      <div class="tables">
        
        <div v-if="query.status == 1">
          <!-- 下单平台 -->
          <order ref="order" :timeParams="timeParams" />
        </div>
        <div v-else-if="query.status == 2">
          <!-- 内容平台 -->
          <contentOrder ref="contentOrder" :timeParams="timeParams" />
        </div>
        <div v-else>
          <!-- 消费追踪 -->
          <literOrder ref="literOrder" :timeParams="timeParams" />
        </div>
      </div>
      <div slot="footer">
        <!-- <Button @click="cancelSubmit('form')">取消</Button> -->
        信息服务费比例：<Input
          v-model="form.informationServiceFee"
          placeholder="请输入信息服务费比例"
          style="width: 200px; margin-right: 10px"
          number
          type="number"
        />
        系统服务费比例：<Input
          v-model="form.systemServiceFee"
          placeholder="请输入系统服务费比例"
          style="width: 200px; margin-right: 10px"
          number
          type="number"
        />
        <Button @click="handleModalVisibleChange()">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">添加</Button>
      </div>
    </Modal>
    <!-- 编辑 -->
    <edit
      :editModel.sync="editModel"
      ref="edit"
      @getUnCheckOrders="getUnCheckOrders"
    />
    <!-- 指派医院 -->
    <Modal
      v-model="hospitalModel"
      title="指派医院"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="hospitalform"
        :model="hospitalform"
        :rules="hospitalruleValidates"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="医院" prop="hospitalId">
          <Select
            v-model="hospitalform.hospitalId"
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
      </Form>
      <div slot="footer">
        <Button @click="hospitalCancelSubmit('form')">取消</Button>
        <Button type="primary" @click="hospitalHandleSubmit('form')"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/unCheckOrder";
import * as hospitalApi from "@/api/hospitalManage";
import order from "./components/order.vue";
import contentOrder from "./components/contentOrder.vue";
import literOrder from "./components/literOrder.vue";
import edit from "./components/edit.vue";
export default {
  components: {
    order,
    contentOrder,
    literOrder,
    edit,
  },
  data() {
    return {
      hospitalform: {
        hospitalId: null,
      },
      hospitalruleValidates: {
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
      },
      hospitalInfo: [],
      // 指派医院
      hospitalModel: false,
      // 编辑
      editModel: false,
      employeeType: sessionStorage.getItem("employeeType"),
      hospitalAllList: [{ id: -1, name: "全部医院" }],
      addBaseOrderInfoVoList: [],
      orderModel: false,
      timeParams: {
        startDate: "",
        endDate: "",
        assemblyHospitalId:-1,
        assemblyKeyword:''
      },
      // 查询
      query: {
        // 添加弹窗 组件内的时间
        assemblyStartDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        assemblyEndDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        status: 1,
        assemblyHospitalId:-1,
        assemblyKeyword:'',
        // 未上传对账单列表参数
        keyword: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        isSubmitReconciliationDocuments: "false",
        orderFrom: -1,
        hospitalId: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 60,
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 170,
            align: "center",
          },
          {
            title: "订单来源",
            key: "orderFromText",
            minWidth: 100,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 140,
            align: "center",
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "dealPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "信息服务费比例",
            key: "informationPricePercent",
            minWidth: 150,
            align: "center",
          },
          {
            title: "系统使用费比例",
            key: "systemUpdatePercent",
            minWidth: 150,
            align: "center",
          },
          {
            title: "信息服务费",
            key: "informationPrice",
            minWidth: 120,
            align: "center",
          },

          {
            title: "系统使用费",
            key: "systemUpdatePrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "结算金额",
            key: "returnBackPrice",
            minWidth: 100,
            align: "center",
          },
          {
            title: "是否上传对账单",
            key: "isSubmitReconciliationDocuments",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              if (params.row.isSubmitReconciliationDocuments == true) {
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
            title: "指派医院",
            key: "sendHospitalName",
            minWidth: 220,
            align: "center",
          },
          {
            title: "创建人",
            key: "createByName",
            minWidth: 120,
            align: "center",
          },
          {
            title: "操作",
            key: "",
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
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.editModel = true;
                        this.$refs.edit.getByIdUnCheckOrder(id);
                      },
                    },
                  },
                  "修改"
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "error",
                //       size: "small",
                //     },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "删除提示",
                //           content: "是否确认删除？",
                //           onOk: () => {
                //             const { id } = params.row;
                //             const data = {
                //               id
                //             }
                //             api.deleteUnCheckOrder(data).then((res) => {
                //               if (res.code === 0) {
                //                 this.getUnCheckOrders();
                //                 this.$Message.success({
                //                   content: "删除成功",
                //                   duration: 3,
                //                 });
                //               }
                //             });
                //           },
                //           onCancel: () => {},
                //         });
                //       },
                //     },
                //   },
                //   "删除"
                // ),
              ]);
            },
          },
        ],
        hospitalColumns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 60,
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 170,
            align: "center",
          },
          {
            title: "订单来源",
            key: "orderFromText",
            minWidth: 100,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 140,
            align: "center",
          },
          {
            title: "成交时间",
            key: "dealDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return params.row.dealDate
                ? h(
                    "div",
                    this.$moment(params.row.dealDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "dealPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "信息服务费比例",
            key: "informationPricePercent",
            minWidth: 150,
            align: "center",
          },
          {
            title: "系统使用费比例",
            key: "systemUpdatePercent",
            minWidth: 150,
            align: "center",
          },
          {
            title: "信息服务费",
            key: "informationPrice",
            minWidth: 120,
            align: "center",
          },

          {
            title: "系统使用费",
            key: "systemUpdatePrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "结算金额",
            key: "returnBackPrice",
            minWidth: 100,
            align: "center",
          },
          {
            title: "是否上传对账单",
            key: "isSubmitReconciliationDocuments",
            minWidth: 150,
            align: "center",
            render: (h, params) => {
              if (params.row.isSubmitReconciliationDocuments == true) {
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
            title: "指派医院",
            key: "sendHospitalName",
            minWidth: 220,
            align: "center",
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,
      allplatformList: [
        {
          status: -1,
          name: "全部平台",
        },
        {
          status: 1,
          name: "下单平台",
        },
        {
          status: 2,
          name: "内容平台",
        },
        {
          status: 3,
          name: "消费追踪",
        },
      ],
      platformList: [
        {
          status: 1,
          name: "下单平台",
        },
        {
          status: 2,
          name: "内容平台",
        },
        {
          status: 3,
          name: "消费追踪",
        },
      ],
      isSubmitReconciliationDocumentsList: [
        {
          type: "false",
          name: "未上传",
        },
        {
          type: "true",
          name: "已上传",
        },
      ],
      form: {
        // 信息服务费比例
        informationServiceFee: "",
        // 系统服务费
        systemServiceFee: "",
      },
      // 添加弹窗里面的数组
      dataList: [],
      // 指派医院
      hospitalObj: {
        // 订单号
        idList: new Set(),
        hospitalId: null,
      },
      // 删除集合
      orderId:new Set(),
    };
  },
  methods: {
    // 删除
    deleteClick() {
      if (![...this.orderId].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.$Modal.confirm({
        title: "删除提示",
        content: "是否确认删除？",
        onOk: () => {
          api.deleteUnCheckOrder([...this.orderId]).then((res) => {
            if (res.code === 0) {
              this.getUnCheckOrders();
              this.$Message.success({
                content: "删除成功",
                duration: 3,
              });
              this.orderId.clear();
            }
          });
        },
        onCancel: () => {},
      });
    },
    // 指派医院
    handleHospital() {
      if (![...this.hospitalObj.idList].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      } else {
        this.hospitalModel = true;
      }
    },
    handleSelect(selection, row) {
      // 指派医院
      this.hospitalObj.idList.add(row.id);
      // 删除
      this.orderId.add(row.id);
    },
    handleCancels(selection, row) {
      // 指派医院
      this.hospitalObj.idList.delete(row.id);
      // 删除
      this.orderId.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.hospitalObj.idList.clear();
        // 删除
        this.orderId.clear();
      } else {
        selection.forEach((item) => {
          this.hospitalObj.idList.add(item.id);
          // 删除
          this.orderId.add(item.id);
        });
      }
    },
    // 获取医院名称列表
    getUnCheckOrdersnameList() {
      hospitalApi.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
          this.hospitalAllList = [
            ...this.hospitalAllList,
            ...res.data.hospitalInfo,
          ];
        }
      });
    },
    addClick() {
      this.timeParams.startDate = this.query.assemblyStartDate;
      this.timeParams.endDate = this.query.assemblyEndDate;
      this.controlModal = true;
      this.timeParams.assemblyKeyword = this.query.assemblyKeyword
      this.$refs.order.gettmallOrderFinishLlistWithPage();
    },
    // 切换平台
    statusChange(value) {
      this.timeParams.startDate = this.query.assemblyStartDate;
      this.timeParams.endDate = this.query.assemblyEndDate;
      this.timeParams.assemblyHospitalId = this.query.assemblyHospitalId
      this.timeParams.assemblyKeyword = this.query.assemblyKeyword
      if (value == 1) {
        this.$nextTick(() => {
          this.$refs.order.query.rightData = [];
          this.$refs.order.gettmallOrderFinishLlistWithPage();
        });
      } else if (value == 2) {
        this.$nextTick(() => {
          this.$refs.contentOrder.getContentPlatFormOrderDealInfo();
          this.$refs.contentOrder.query.rightData = [];
        });
      } else {
        this.$nextTick(() => {
          this.$refs.literOrder.getCustomerHospitalConsume();
          this.$refs.literOrder.query.rightData = [];
        });
      }
    },
    // 获取未上传列表
    getUnCheckOrders() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        startDate,
        endDate,
        hospitalId,
        isSubmitReconciliationDocuments,
        orderFrom,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        hospitalId:
          this.employeeType == "amiyaEmployee"
            ? hospitalId == -1
              ? null
              : hospitalId
            : sessionStorage.getItem("hospitalId"),
        isSubmitReconciliationDocuments,
        orderFrom: orderFrom == -1 ? null : orderFrom,
      };
      api.getUnCheckOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.unCheckOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取未上传列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        startDate,
        endDate,
        hospitalId,
        isSubmitReconciliationDocuments,
        orderFrom,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        hospitalId:
          this.employeeType == "amiyaEmployee"
            ? hospitalId
            : sessionStorage.getItem("hospitalId"),
        isSubmitReconciliationDocuments,
        orderFrom: orderFrom == -1 ? null : orderFrom,
      };
      api.getUnCheckOrder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.unCheckOrder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      const { informationServiceFee, systemServiceFee } = this.form;
      if (!informationServiceFee) {
        this.$Message.warning("信息服务费比例不能为空");
        return;
      }
      if (!systemServiceFee) {
        this.$Message.warning("系统服务费比例不能为空");
        return;
      }

      if (this.query.status == 1) {
        if (this.$refs.order.query.rightData.length == 0) {
          this.$Message.warning("请选择订单");
          return;
        }
        this.addBaseOrderInfoVoList = this.$refs.order.query.rightData.map(
          (item) => {
            return {
              orderId: item.id,
              phone: item.encryptPhone,
              dealDate: item.writeOffDate,
              dealPrice: item.actualPayment,
            };
          }
        );
      } else if (this.query.status == 2) {
        if (this.$refs.contentOrder.query.rightData.length == 0) {
          this.$Message.warning("请选择订单");
          return;
        }
        this.addBaseOrderInfoVoList = this.$refs.contentOrder.query.rightData.map(
          (item) => {
            return {
              orderId: item.id,
              phone: item.encryptPhone,
              dealDate: item.dealDate,
              dealPrice: item.price,
            };
          }
        );
      } else {
        if (this.$refs.literOrder.query.rightData.length == 0) {
          this.$Message.warning("请选择订单");
          return;
        }
        this.addBaseOrderInfoVoList = this.$refs.literOrder.query.rightData.map(
          (item) => {
            return {
              orderId: item.consumeId,
              phone: item.encryptPhone,
              dealDate: item.buyAgainTime,
              dealPrice: item.price,
            };
          }
        );
      }
      const data = {
        informationPricePercent: informationServiceFee,
        systemUpdatePercent: systemServiceFee,
        addBaseOrderInfoVoList: this.addBaseOrderInfoVoList,
        orderFrom: this.query.status,
      };
      api.addUnCheckOrder(data).then((res) => {
        if (res.code === 0) {
          this.isEdit = false;
          this.cancelSubmit("form");
          this.getUnCheckOrders();
          this.$Message.success({
            content: "修改成功",
            duration: 3,
          });
        }
      });
    },
    // 指派医院确认
    hospitalHandleSubmit() {
      const data = {
        idList: [...this.hospitalObj.idList],
        hospitalId: this.hospitalform.hospitalId,
      };
      api.sendToHospital(data).then((res) => {
        if (res.code === 0) {
          this.hospitalCancelSubmit();
          this.getUnCheckOrders();
          this.$Message.success({
            content: "指派成功",
            duration: 3,
          });
        }
      });
    },
    hospitalCancelSubmit() {
      this.hospitalform.hospitalId = null;
      this.hospitalModel = false;
      this.hospitalObj.idList.clear();
    },
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      // this.$refs[name].resetFields();
      this.form.informationServiceFee = "";
      this.form.systemServiceFee = "";
      // 关闭弹窗时 重置
      this.query.status = 1;
      this.query.assemblyStartDate = this.$moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      this.query.assemblyEndDate = this.$moment(new Date()).format(
        "YYYY-MM-DD"
      );
      this.query.assemblyHospitalId = -1;
      this.query.assemblyKeyword = '';
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.controlModal = false;
        this.hospitalModel = false;
        // this.$refs["form"].resetFields();
        this.form.informationServiceFee = "";
        this.form.systemServiceFee = "";
        // 关闭弹窗时 重置
        this.query.status = 1;
        this.query.assemblyStartDate = this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD");
        this.query.assemblyEndDate = this.$moment(new Date()).format(
          "YYYY-MM-DD"
        );
        this.query.assemblyHospitalId = -1;
        this.query.assemblyKeyword = '';
      }
    },
  },
  created() {
    this.getUnCheckOrders();
    this.getUnCheckOrdersnameList();
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.top {
  display: flex;
}
.tables {
  margin: 10px 0;
}

</style>
