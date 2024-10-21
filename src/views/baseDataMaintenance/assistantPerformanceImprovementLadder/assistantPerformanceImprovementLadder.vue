<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getEmployeePerformanceLadderClick()"
          />
          <Select
            v-model="query.valid"
            placeholder="请选择是否有效"
            style="width: 160px;margin-left: .625rem"
          >
            <Option
              v-for="item in validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getEmployeePerformanceLadderClick()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
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
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <Row :gutter="30">
          
          <Col span="8">
            <FormItem label="业绩阶梯上限" prop="performanceUpperLimit">
              <Input v-model="form.performanceUpperLimit" placeholder="请输入业绩阶梯上限" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="业绩阶梯下限" prop="performanceLowerLimit">
              <Input v-model="form.performanceLowerLimit" placeholder="请输入业绩阶梯下限" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="提成点数(%)" prop="point">
              <Input v-model="form.point" placeholder="请输入提成点数" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="底薪" prop="basePerformance">
              <Input v-model="form.basePerformance" placeholder="请输入底薪" type="number" number></Input>
            </FormItem>
          </Col>
          <!-- <Col span="8">
            <FormItem label="年月" prop="time">
                <DatePicker
                    type="month"
                    placeholder="请选择年月"
                    :value="form.time"
                    v-model="form.time"
                ></DatePicker>
            </FormItem>
          </Col> -->
          <Col span="8">
            <FormItem label="年" prop="year">
              <Input v-model="form.year" placeholder="请输入年" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="月" prop="month">
              <Input v-model="form.month" placeholder="请输入月" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否为私人配置" prop="isPersonalConfig">
              <i-switch v-model="form.isPersonalConfig" />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isPersonalConfig == true">
            <FormItem label="助理" prop="customerServiceId">
              <Select
                v-model="form.customerServiceId"
                placeholder="请选择助理"
              >
                <Option
                  v-for="item in employee"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="备注" prop="remark">
              <Input v-model="form.remark" placeholder="请输入备注" type="textarea" :rows="3"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/employeePerformanceLadder";
import * as orderManageApi from "@/api/orderManage";

export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        valid: "true",
        pageNum: 1,
        pageSize: 10,
        columns: [
          
          {
            title: "业绩阶梯上限",
            key: "performanceUpperLimit",
            minWidth: 120,
            align: "center",
            
          },
          {
            title: "业绩阶梯下限",
            key: "performanceLowerLimit",
            minWidth: 120,
            align: "center",
          },
          {
            title: "提成点数",
            key: "point",
            minWidth: 80,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.point +  ' % '
              );
            },
          },
          {
            title: "底薪",
            key: "basePerformance",
            minWidth: 100,
            align: "center",
          },
          {
            title: "年",
            key: "year",
            minWidth: 80,
            align: "center",
          },
          {
            title: "月",
            key: "month",
            minWidth: 80,
            align: "center",
          },
          {
            title: "是否为私人配置",
            key: "isPersonalConfig",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.isPersonalConfig == true) {
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
            title: "助理",
            key: "customerServiceName",
            minWidth: 120,
            align: "center",
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 220,
            align: "center",
            tooltip: true,
          },

          {
            title: "操作",
            key: "",
            width: 150,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.valid == false
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdEmployeePerformanceLadder(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              isPersonalConfig,
                              customerServiceId,
                              performanceUpperLimit,
                              performanceLowerLimit,
                              point,
                              basePerformance,
                              year,
                              month,
                              remark
                            } = res.data.employeePerformanceLadder;
                            this.isEdit = true;
                            this.form.isPersonalConfig = isPersonalConfig;
                            this.form.customerServiceId = customerServiceId;
                            this.form.performanceUpperLimit = performanceUpperLimit;
                            this.form.performanceLowerLimit = performanceLowerLimit;
                            this.form.point = point;
                            this.form.basePerformance = basePerformance;
                            this.form.year =year;
                            this.form.month =month;
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
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                      disabled:params.row.valid == false
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteEmployeePerformanceLadder(id).then((res) => {
                              if (res.code === 0) {
                                this.getEmployeePerformanceLadderClick();
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
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id: "",
        // 是否为私人配置
        isPersonalConfig: false,
        // 助理
        customerServiceId: null,
        // 业绩阶梯上限
        performanceUpperLimit: null,
        // 业绩阶梯下限
        performanceLowerLimit: null,
        // 提成点数
        point: null,
        // 底薪
        basePerformance: null,
        year: null,
        month:null,
        remark: "",
      },

      ruleValidate: {
        customerServiceId: [
          {
            required: true,
            message: "请选择助理",
          },
        ],
        performanceUpperLimit: [
          {
            required: true,
            message: "请输入业绩阶梯上限",
          },
        ],
        performanceLowerLimit: [
          {
            required: true,
            message: "请输入业绩阶梯下限",
          },
        ],
        point: [
          {
            required: true,
            message: "请输入提成点数",
          },
        ],
        basePerformance: [
          {
            required: true,
            message: "请输入底薪",
          },
        ],
        year: [
          {
            required: true,
            message: "请选择年",
          },
        ],
        month: [
          {
            required: true,
            message: "请选择月",
          },
        ],
      },
      validList: [
        {
          type: "true",
          name: "有效",
        },
        {
          type: "false",
          name: "无效",
        },
      ],
    //   客服
    employee:[]
    };
  },
  methods: {
    // 获取客服列表
    getCustomerServiceList() {
      orderManageApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = employee
         
        }
      });
    },
    // 获取助理业绩提点阶梯列表
    getEmployeePerformanceLadderClick() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, valid } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        valid,
      };
      api.getEmployeePerformanceLadder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.employeePerformanceLadder;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取助理业绩提点阶梯列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, valid } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        valid,
      };
      api.getEmployeePerformanceLadder(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.employeePerformanceLadder;
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
            const { customerServiceId, isPersonalConfig, performanceLowerLimit,performanceUpperLimit,point,basePerformance,remark,year,month,id } = this.form;
            const data = { 
                customerServiceId:isPersonalConfig == true ? customerServiceId : null, 
                isPersonalConfig, 
                performanceLowerLimit,
                performanceUpperLimit,
                point,
                basePerformance,
                year,
                month,
                remark,
                id
            };
            // 修改
            api.updateEmployeePerformanceLadder(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getEmployeePerformanceLadderClick();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { customerServiceId, isPersonalConfig, performanceLowerLimit,performanceUpperLimit,point,basePerformance,remark,year,month } = this.form;
            const data = { 
                customerServiceId:isPersonalConfig == true ? customerServiceId : null, 
                isPersonalConfig, 
                performanceLowerLimit,
                performanceUpperLimit,
                point,
                basePerformance,
                year,
                month,
                remark
            };
            // 添加
            api.addEmployeePerformanceLadder(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getEmployeePerformanceLadderClick();
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
    this.getEmployeePerformanceLadderClick();
    this.getCustomerServiceList()
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
</style>
