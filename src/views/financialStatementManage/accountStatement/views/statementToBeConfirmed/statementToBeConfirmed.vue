<template>
  <div>
    <Card :dis-hover="true">
      <div class="content">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getHospitalInfo()"
          />
          <DatePicker
            type="date"
            placeholder="创建开始日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="创建结束时间"
            style="width: 180px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="成交开始日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.startDealDate"
            v-model="query.startDealDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="成交结束时间"
            style="width: 180px;margin-left: .625rem;"
            :value="query.endDealDate"
            v-model="query.endDealDate"
          ></DatePicker>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
          <Button
            type="primary"
            @click="markStatement()"
            style="margin-left: 10px"
            v-if="employeeType == 'hospitalEmployee'"
            >标记对账单状态</Button
          >
          <Button
            type="error"
            @click="deleteClick"
            style="margin-left: 10px"
            v-if="employeeType == 'hospitalEmployee'"
            >删除</Button
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
      width="50%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="140"
      >
        <FormItem label="客户姓名" prop="customerName">
          <Input
            v-model="form.customerName"
            placeholder="请输入客户姓名"
          ></Input>
        </FormItem>
        <FormItem label="客户电话" prop="customerPhone">
          <Input
            v-model="form.customerPhone"
            placeholder="请输入客户电话"
          ></Input>
        </FormItem>
        <FormItem label="成交项目" prop="dealGoods">
          <Input v-model="form.dealGoods" placeholder="请输入成交项目"></Input>
        </FormItem>
        <FormItem label="成交时间" prop="customerPhone">
          <DatePicker
            type="date"
            placeholder="成交时间"
            style="width: 100%"
            :value="form.dealDate"
            v-model="form.dealDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="总成交金额" prop="totalDealPrice">
          <Input
            v-model="form.totalDealPrice"
            placeholder="请输入总成交金额"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem label="信息服务费比例(%)" prop="returnBackPricePercent">
          <Input
            v-model="form.returnBackPricePercent"
            placeholder="请输入信息服务费比例"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem label="系统维护费比例(%)" prop="systemUpdatePricePercent">
          <Input
            v-model="form.systemUpdatePricePercent"
            placeholder="请输入系统维护费比例"
            type="number"
            number
          ></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input
            v-model="form.remark"
            placeholder="请输入备注"
            type="textarea"
            :rows="4"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 标记对账单 -->
    <Modal
      v-model="markStatementModel"
      title="标记对账单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="30%"
    >
      <Form
        ref="markStatementform"
        :model="markStatementform"
        :rules="markStatementruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="对账单状态" prop="reconciliationState">
          <Select
            v-model="markStatementform.reconciliationState"
            placeholder="请选择对账单状态"
            :disabled="employeeType == 'hospitalEmployee'"
            @on-change="reconciliationStateChange"
          >
            <Option
              v-for="item in employeeType == 'hospitalEmployee'
                ? markStatementList
                : markStatementList2"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem
          label="问题原因"
          prop="questionReason"
          v-if="markStatementform.reconciliationState == 2"
        >
          <Input
            v-model="markStatementform.questionReason"
            placeholder="请输入问题原因"
            type="textarea"
            :rows="4"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="markStatementhandSubmit('markStatementform')"
          >取消</Button
        >
        <Button
          type="primary"
          @click="markStatementhandleSubmit('markStatementform')"
          >确定</Button
        >
      </div>
    </Modal>
    <!-- 导入 -->
    <importFile
      :importControlModal.sync="importControlModal"
      @handleRefreshCustomerTrackList="getHospitalInfo()"
    ></importFile>
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocuments";
import { download } from "@/utils/util";
import importFile from "../../components/import/importModel.vue";

export default {
  components: {
    importFile,
  },
  props: {
    activeName: String,
    hospitalInfo:Array
  },
  data() {
    return {
      orderId: new Set(),
      // 查询
      query: {
        hospitalId:null,
        keyword: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        startDealDate: null,
        endDealDate: null,
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
            title: "对账单编号",
            key: "id",
            width: 170,
            align:'center'
          },
          {
            title: "医院",
            key: "hospitalName",
            width: 220,
          },
          {
            title: "客户姓名",
            key: "customerName",
            width: 160,
          },
          {
            title: "客户电话",
            key: "customerPhone",
            width: 160,
            align: "center",
          },
          {
            title: "成交项目",
            key: "dealGoods",
            width: 160,
            align: "center",
            tooltip:true
          },
          {
            title: "成交时间",
            key: "dealDate",
            width: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.dealDate
                  ? this.$moment(params.row.dealDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "总成交金额",
            key: "totalDealPrice",
            width: 140,
            align: "center",
          },
          {
            title: "对账状态",
            key: "reconciliationStateText",
            width: 140,
            align: "center",
          },
          {
            title: "信息服务费比例（%）",
            key: "returnBackPricePercent",
            width: 180,
            align: "center",
          },
          {
            title: "信息服务费金额",
            key: "returnBackPrice",
            width: 150,
            align: "center",
          },

          {
            title: "系统维护费比例（%）",
            key: "systemUpdatePricePercent",
            width: 200,
            align: "center",
          },
          {
            title: "系统维护金额",
            key: "systemUpdatePrice",
            width: 140,
            align: "center",
          },
          {
            title: "服务费合计",
            key: "returnBackTotalPrice",
            width: 140,
            align: "center",
          },
          {
            title: "问题原因",
            key: "questionReason",
            width: 220,
          },
          {
            title: "备注",
            key: "remark",
            width: 220,
          },
          {
            title: "创建时间",
            key: "createDate",
            width: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              );
            },
          },
          {
            title: "创建人",
            key: "createByName",
            width: 140,
          },
          {
            title: "操作",
            key: "",
            fixed: "right",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: this.employeeType == "amiyaEmployee",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdReconciliationDocuments(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              customerName,
                              customerPhone,
                              dealGoods,
                              dealDate,
                              totalDealPrice,
                              returnBackPricePercent,
                              systemUpdatePricePercent,
                              remark,
                            } = res.data.reconciliationDocumentsInfo;
                            this.isEdit = true;
                            this.form.customerName = customerName;
                            this.form.customerPhone = customerPhone;
                            this.form.dealGoods = dealGoods;
                            this.form.dealDate = dealDate;
                            this.form.totalDealPrice = totalDealPrice;
                            this.form.returnBackPricePercent = returnBackPricePercent;
                            this.form.systemUpdatePricePercent = systemUpdatePricePercent;
                            this.form.remark = remark;
                            this.form.id = id;
                            this.controlModal = true;
                          }
                        });
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
                //       disabled:this.employeeType== 'amiyaEmployee'
                //     },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "删除提示",
                //           content: "是否确认删除？",
                //           onOk: () => {
                //             const { id } = params.row;
                //             api.deleteReconciliationDocuments(id).then((res) => {
                //               if (res.code === 0) {
                //                 this.getHospitalInfo();
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
        data: [],
        totalCount: 0,
      },
      importControlModal: false,
      markStatementList: [
        {
          id: 0,
          name: "已提交",
        },
      ],
      markStatementList2: [
        {
          id: 2,
          name: "问题账单",
        },
        // {
        //   id:3,
        //   name:'对账完成'
        // },
      ],
      // 控制 modal
      controlModal: false,
      // 标记对账单弹窗
      markStatementModel: false,
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id: "",
        // 客户姓名
        customerName: "",
        // 客户手机号
        customerPhone: "",
        // 成交项目
        dealGoods: "",
        // 成交时间
        dealDate: "",
        // 总成交金额
        totalDealPrice: null,
        // 信息服务费比例
        returnBackPricePercent: null,
        // 系统维护费比例
        systemUpdatePricePercent: null,
        // 备注
        remark: "",
      },
      // 标记对账单
      markStatementform: {
        // 订单号
        orderId: new Set(),
        // 对账单状态
        reconciliationState: null,
        // 问题原因
        questionReason: "",
      },
      markStatementruleValidate: {
        reconciliationState: [
          {
            required: true,
            message: "请选择对账单状态",
          },
        ],
        questionReason: [
          {
            required: true,
            message: "请输入问题原因",
          },
        ],
      },
      ruleValidate: {
        customerName: [
          {
            required: true,
            message: "请输入客户姓名",
          },
        ],
        customerPhone: [
          {
            required: true,
            message: "请输入客户手机号",
          },
        ],
        dealGoods: [
          {
            required: true,
            message: "请输入成交项目",
          },
        ],
        dealDate: [
          {
            required: true,
            message: "请选择成交时间",
          },
        ],
        totalDealPrice: [
          {
            required: true,
            message: "请输入总成交金额",
          },
        ],
        returnBackPricePercent: [
          {
            required: true,
            message: "请输入信息服务费比例",
          },
        ],
        systemUpdatePricePercent: [
          {
            required: true,
            message: "请输入系统维护费比例",
          },
        ],
      },
      employeeType: sessionStorage.getItem("employeeType"),
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
          const data = {
            idList: [...this.orderId],
          };
          api.deleteReconciliationDocuments(data).then((res) => {
            if (res.code === 0) {
              this.getHospitalInfo();
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
    reconciliationStateChange() {
      if (this.markStatementform.reconciliationState != 2) {
        this.markStatementform.questionReason = "";
      }
    },
    // 标记对账单确认
    markStatementhandleSubmit() {
      const {
        orderId,
        reconciliationState,
        questionReason,
      } = this.markStatementform;
      const data = {
        idList: [...orderId],
        reconciliationState,
        questionReason,
      };
      api.tagReconciliationState(data).then((res) => {
        if (res.code === 0) {
          this.markStatementhandSubmit();
          this.$Message.success("已成功");
          this.getHospitalInfo();
          this.markStatementform.orderId.clear();
          
        }
      });
    },
    
    // 标记对账单
    markStatement() {
      if (![...this.markStatementform.orderId].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.markStatementModel = true;
      this.markStatementform.reconciliationState =
        this.employeeType == "hospitalEmployee" ? 0 : 2;
    },
    handleSelect(selection, row) {
      // 标记对账单
      this.markStatementform.orderId.add(row.id);
      this.orderId.add(row.id);
    },
    handleCancels(selection, row) {
      // 标记对账单
      this.markStatementform.orderId.delete(row.id);
      this.orderId.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        this.markStatementform.orderId.clear();
        this.orderId.clear();
      } else {
        selection.forEach((item) => {
          this.markStatementform.orderId.add(item.id);
          this.orderId.add(item.id);
        });
      }
    },
    // 获取对账单列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        startDealDate,
        endDealDate,
        startDate,
        endDate,
        hospitalId
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        reconciliationState: 1,
        hospitalId:this.employeeType == 'amiyaEmployee' ? hospitalId : sessionStorage.getItem('hospitalId')
      };
      api.getReconciliationDocuments(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取对账单列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        startDealDate,
        endDealDate,
        startDate,
        endDate,
        hospitalId
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDealDate: startDealDate
          ? this.$moment(startDealDate).format("YYYY-MM-DD")
          : null,
        endDealDate: endDealDate
          ? this.$moment(endDealDate).format("YYYY-MM-DD")
          : null,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        reconciliationState: 1,
        hospitalId:this.employeeType == 'amiyaEmployee' ? hospitalId : sessionStorage.getItem('hospitalId')
      };
      api.getReconciliationDocuments(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.reconciliationDocumentsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const {
              id,
              customerName,
              customerPhone,
              dealGoods,
              dealDate,
              totalDealPrice,
              returnBackPricePercent,
              systemUpdatePricePercent,
              remark,
            } = this.form;
            const data = {
              id,
              customerName,
              customerPhone,
              dealGoods,
              dealDate: this.$moment(dealDate).format("YYYY-MM-DD"),
              totalDealPrice,
              returnBackPricePercent,
              systemUpdatePricePercent,
              remark,
            };
            // 修改
            api.editReconciliationDocuments(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const {
              customerName,
              customerPhone,
              dealGoods,
              dealDate,
              totalDealPrice,
              returnBackPricePercent,
              systemUpdatePricePercent,
              remark,
            } = this.form;
            const data = {
              customerName,
              customerPhone,
              dealGoods,
              dealDate: this.$moment(dealDate).format("YYYY-MM-DD"),
              totalDealPrice,
              returnBackPricePercent,
              systemUpdatePricePercent,
              remark,
            };
            // 添加
            api.addReconciliationDocuments(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              }
            });
          }
        }
      });
    },
    markStatementhandSubmit() {
      this.markStatementModel = false;
      this.markStatementform.reconciliationState = null;
      this.markStatementform.questionReason = "";
    },
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    // this.getLogisticsCompanyList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "statementToBeConfirmed") {
          this.getHospitalInfo();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
</style>
