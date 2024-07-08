<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <!-- <Input
            v-model="query.keyWord"
            placeholder="请输入关键词"
            style="width: 180px; "
            @keyup.enter.native="getHospitalInfo()"
          /> -->
          <DatePicker
                type="date"
                placeholder="开始时间"
                :value="query.startDate"
                v-model="query.startDate"
                style="width: 150px;"
              ></DatePicker>
              <DatePicker
                type="date"
                placeholder="结束时间"
                :value="query.endDate"
                v-model="query.endDate"
                style="width: 150px; margin-left: 10px"
              ></DatePicker>
          <Select
                v-model="query.employeeId"
                placeholder="请选择助理"
                filterable
                style="width: 160px; margin-left: 10px"
                :disabled="isButton == false"
            >
                <Option
                v-for="item in employeeAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
                >
            </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
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
      width="54%"
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
                <FormItem label="年份选择" prop="belongYear">
                    <DatePicker
                        type="year"
                        placeholder="请选择年"
                        v-model="form.belongYear"
                    ></DatePicker>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="月份选择" prop="belongMonth">
                <Select
                    v-model="form.belongMonth"
                    placeholder="请选择月份"
                    filterable
                >
                    <Option
                    v-for="item in monthList"
                    :value="item.month"
                    :key="item.month"
                    >{{ item.name }}
                    </Option>
                </Select>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="助理" prop="employeeId">
                    <Select
                        v-model="form.employeeId"
                        placeholder="请选择助理"
                        filterable
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
                <FormItem label="有效分诊" prop="effectiveConsulationCardTarget">
                    <Input v-model="form.effectiveConsulationCardTarget" placeholder="请输入有效分诊" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="潜在分诊" prop="potentialConsulationCardTarget">
                    <Input v-model="form.potentialConsulationCardTarget" placeholder="请输入潜在分诊" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="有效加V" prop="effectiveAddWechatTarget">
                    <Input v-model="form.effectiveAddWechatTarget" placeholder="请输入有效加V" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="潜在加V" prop="potentialAddWechatTarget">
                    <Input v-model="form.potentialAddWechatTarget" placeholder="请输入潜在加V" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="派单目标" prop="sendOrderTarget">
                    <Input v-model="form.sendOrderTarget" placeholder="请输入派单目标" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="新客到院目标" prop="newCustomerVisitTarget">
                    <Input v-model="form.newCustomerVisitTarget" placeholder="请输入新客到院目标" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="老客到院目标" prop="oldCustomerVisitTarget">
                    <Input v-model="form.oldCustomerVisitTarget" placeholder="请输入老客到院目标" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="新客成交目标" prop="newCustomerDealTarget">
                    <Input v-model="form.newCustomerDealTarget" placeholder="请输入新客成交目标" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="老客成交目标" prop="oldCustomerDealTarget">
                    <Input v-model="form.oldCustomerDealTarget" placeholder="请输入老客成交目标" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="新客业绩目标" prop="newCustomerPerformanceTarget">
                    <Input v-model="form.newCustomerPerformanceTarget" placeholder="请输入新客业绩目标" type="number" number @on-change="performanceTargetAll"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="老客业绩目标" prop="oldCustomerPerformanceTarget">
                    <Input v-model="form.oldCustomerPerformanceTarget" placeholder="请输入老客业绩目标" type="number" number @on-change="performanceTargetAll"></Input>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="总业绩目标" prop="performanceTarget">
                    <Input v-model="form.performanceTarget" placeholder="请输入总业绩目标" type="number" number disabled></Input>
                </FormItem>
            </Col>
           
            <Spin fix v-if="isflag == true">
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
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/employeePerformanceTarget";
import * as orderApi from "@/api/orderManage";

export default {
  data() {
    return {
        isflag:false,
      // 查询
      query: {
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        // 开始时间
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        //   结束时间
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        employeeId:-1,
        columns: [
          {
            title: "年份",
            key: "belongYear",
            minWidth: 90,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.belongYear + "年");
            },
          },
          {
            title: "月份",
            key: "belongMonth",
            minWidth: 80,
            align: "center",
            render: (h, params) => {
              return h("div", params.row.belongMonth + "月");
            },
          },
          {
            title: "助理",
            key: "employeeName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "有效分诊",
            key: "effectiveConsulationCardTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "潜在分诊",
            key: "potentialConsulationCardTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "有效加V",
            key: "effectiveAddWechatTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "潜在加V",
            key: "potentialAddWechatTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "派单目标",
            key: "sendOrderTarget",
            minWidth: 120,
            align: "center",
          },
          {
            title: "新客到院目标",
            key: "newCustomerVisitTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "老客到院目标",
            key: "oldCustomerVisitTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "新客成交目标",
            key: "newCustomerDealTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "老客成交目标",
            key: "oldCustomerDealTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "新客业绩目标",
            key: "newCustomerPerformanceTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "老客业绩目标",
            key: "oldCustomerPerformanceTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "总业绩目标",
            key: "performanceTarget",
            minWidth: 140,
            align: "center",
          },
          {
            title: "操作",
            key: "",
            minWidth: 150,
            align: "center",
            fixed:'right',
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
                        this.title = "修改";
                        api.byIdEmployeePerformanceTarget(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              belongYear,
                              belongMonth,
                              employeeId,
                              effectiveConsulationCardTarget,
                              potentialConsulationCardTarget,
                              sendOrderTarget,
                              newCustomerDealTarget,
                              oldCustomerDealTarget,
                              newCustomerPerformanceTarget,
                              oldCustomerPerformanceTarget,
                              performanceTarget,
                              effectiveAddWechatTarget,
                              potentialAddWechatTarget,
                              newCustomerVisitTarget,
                              oldCustomerVisitTarget
                            } = res.data.employeePerformanceTarget;
                            this.isEdit = true;
                            this.form.belongYear = String(belongYear);
                            this.form.belongMonth = belongMonth;
                            this.form.employeeId = employeeId;
                            this.form.effectiveConsulationCardTarget = effectiveConsulationCardTarget;
                            this.form.potentialConsulationCardTarget = potentialConsulationCardTarget;
                            this.form.effectiveAddWechatTarget = effectiveAddWechatTarget;
                            this.form.potentialAddWechatTarget = potentialAddWechatTarget;
                            this.form.sendOrderTarget = sendOrderTarget;
                            this.form.newCustomerVisitTarget = newCustomerVisitTarget;
                            this.form.oldCustomerVisitTarget = oldCustomerVisitTarget;
                            this.form.newCustomerDealTarget = newCustomerDealTarget;
                            this.form.oldCustomerDealTarget = oldCustomerDealTarget;
                            this.form.newCustomerPerformanceTarget = newCustomerPerformanceTarget;
                            this.form.oldCustomerPerformanceTarget = oldCustomerPerformanceTarget;
                            this.form.performanceTarget = performanceTarget;
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
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteEmployeePerformanceTarget(id).then((res) => {
                              if (res.code === 0) {
                                this.getHospitalInfo();
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
        // 归属年份
        belongYear: null,
        // 归属月份
        belongMonth: null,
        // 助理
        employeeId: null,
        // 有效分诊
        effectiveConsulationCardTarget: null,
        // 潜在分诊
        potentialConsulationCardTarget: null,
        // 派单目标
        sendOrderTarget: null,
        // 新客到院目标
        newCustomerVisitTarget: null,
        // 老客到院目标
        oldCustomerVisitTarget: null,
        // 新客成交目标
        newCustomerDealTarget: null,
        // 老客成交目标
        oldCustomerDealTarget: null,
        // 新客业绩目标
        newCustomerPerformanceTarget: null,
        // 老客业绩目标
        oldCustomerPerformanceTarget: null,
        // 总业绩目标
        performanceTarget: null,
        // 有效加v
        effectiveAddWechatTarget: null,
        // 潜在加V
        potentialAddWechatTarget: null,
      },

      ruleValidate: {
        belongYear: [
          {
            required: true,
            message: "请选择年份",
          },
        ],
        belongMonth: [
          {
            required: true,
            message: "请选择月份",
          },
        ],
        employeeId: [
          {
            required: true,
            message: "请选择助理",
          },
        ],
        effectiveConsulationCardTarget: [
          {
            required: true,
            message: "请输入有效分诊",
          },
        ],
        potentialConsulationCardTarget: [
          {
            required: true,
            message: "请输入潜在分诊",
          },
        ],
        effectiveAddWechatTarget: [
          {
            required: true,
            message: "请输入有效加V",
          },
        ],
        potentialAddWechatTarget: [
          {
            required: true,
            message: "请输入潜在加V",
          },
        ],
        sendOrderTarget: [
          {
            required: true,
            message: "请输入派单目标",
          },
        ],
        newCustomerVisitTarget: [
          {
            required: true,
            message: "请输入新客到院目标",
          },
        ],
        oldCustomerVisitTarget: [
          {
            required: true,
            message: "请输入老客到院目标",
          },
        ],
        newCustomerDealTarget: [
          {
            required: true,
            message: "请输入新客成交目标",
          },
        ],
        oldCustomerDealTarget: [
          {
            required: true,
            message: "请输入老客成交目标",
          },
        ],
        newCustomerPerformanceTarget: [
          {
            required: true,
            message: "请输入新客业绩目标",
          },
        ],
        oldCustomerPerformanceTarget: [
          {
            required: true,
            message: "请输入老客业绩目标",
          },
        ],
        performanceTarget: [
          {
            required: true,
            message: "请输入总业绩目标",
          },
        ],
      },
      monthList: [
        {
          month: 1,
          name: "一月",
        },
        {
          month: 2,
          name: "二月",
        },
        {
          month: 3,
          name: "三月",
        },
        {
          month: 4,
          name: "四月",
        },
        {
          month: 5,
          name: "五月",
        },
        {
          month: 6,
          name: "六月",
        },
        {
          month: 7,
          name: "七月",
        },
        {
          month: 8,
          name: "八月",
        },
        {
          month: 9,
          name: "九月",
        },
        {
          month: 10,
          name: "十月",
        },
        {
          month: 11,
          name: "十一月",
        },
        {
          month: 12,
          name: "十二月",
        },
      ],
      employeeAll: [{ name: "全部助理", id: -1 }],
      employee: [],
      // 控制助理权限
      isButton:false
    };
    
  },
  methods: {
    // 助理权限
    isAuthority() {
      let currentRole = JSON.parse(sessionStorage.getItem("permissions")) ? JSON.parse(sessionStorage.getItem("permissions")) : [];
      if (currentRole.includes("fx.amiya.permission.SELECT_ALL_PERFORMANCE") == false) {
        this.query.employeeId = Number(sessionStorage.getItem('employeeId'))
        this.isButton = false
        return
      }else{
        this.isButton = true
        this.query.employeeId = -1
      }
    },
    // 计算总业绩目标
    performanceTargetAll(){
        this.form.performanceTarget = this.form.newCustomerPerformanceTarget +  this.form.oldCustomerPerformanceTarget
    },
    // 获取客服列表
    getCustomerServiceLists() {
      orderApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeAll = [...this.employeeAll, ...employee];
          this.employee = employee;
        }
      });
    },
    // 获取助理业绩目标列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyWord ,startDate,endDate,employeeId} = this.query;
      const data = { 
        pageNum, 
        pageSize, 
        keyWord ,
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        employeeId:this.isButton == false ? Number(sessionStorage.getItem('employeeId')) : employeeId == -1 ? null : employeeId,
        };
      api.getEmployeePerformanceTarget(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.employeePerformanceTarget;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取助理业绩目标列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyWord ,startDate,endDate,employeeId} = this.query;
      const data = { 
        pageNum, 
        pageSize, 
        keyWord,
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        employeeId:this.isButton == false ? Number(sessionStorage.getItem('employeeId')) : employeeId == -1 ? null : employeeId,
        };
      api.getEmployeePerformanceTarget(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.employeePerformanceTarget;
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
            this.isflag = true
            const {belongYear,belongMonth,employeeId,effectiveConsulationCardTarget,potentialConsulationCardTarget,sendOrderTarget,newCustomerDealTarget,oldCustomerDealTarget,newCustomerPerformanceTarget,oldCustomerPerformanceTarget,performanceTarget,id,effectiveAddWechatTarget,potentialAddWechatTarget,newCustomerVisitTarget,oldCustomerVisitTarget} = this.form
            const data ={
                belongYear:this.$moment(new Date(belongYear)).format("YYYY"),
                belongMonth,
                employeeId,
                effectiveConsulationCardTarget,
                potentialConsulationCardTarget,
                sendOrderTarget,
                newCustomerDealTarget,
                oldCustomerDealTarget,
                newCustomerPerformanceTarget,
                oldCustomerPerformanceTarget,
                performanceTarget,
                id,
                effectiveAddWechatTarget,
                potentialAddWechatTarget,
                newCustomerVisitTarget,
                oldCustomerVisitTarget
            }
            // 修改
            api.editEmployeePerformanceTarget(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.isflag = false
                this.cancelSubmit("form");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }else{
                setTimeout(()=>{
                    this.isflag = false
                },3000)
              }
            });
          } else {
            this.isflag = true
            const {belongYear,belongMonth,employeeId,effectiveConsulationCardTarget,potentialConsulationCardTarget,sendOrderTarget,newCustomerDealTarget,oldCustomerDealTarget,newCustomerPerformanceTarget,oldCustomerPerformanceTarget,performanceTarget,effectiveAddWechatTarget,potentialAddWechatTarget,newCustomerVisitTarget,oldCustomerVisitTarget} = this.form
            const data ={
                belongYear:this.$moment(new Date(belongYear)).format("YYYY"),
                belongMonth,
                employeeId,
                effectiveConsulationCardTarget,
                potentialConsulationCardTarget,
                sendOrderTarget,
                newCustomerDealTarget,
                oldCustomerDealTarget,
                newCustomerPerformanceTarget,
                oldCustomerPerformanceTarget,
                performanceTarget,
                effectiveAddWechatTarget,
                potentialAddWechatTarget,
                newCustomerVisitTarget,
                oldCustomerVisitTarget
            }
            // 添加
            api.addEmployeePerformanceTarget(data).then((res) => {
              if (res.code === 0) {
                this.isflag = false
                this.cancelSubmit("form");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              }else{
                setTimeout(()=>{
                    this.isflag = false
                },3000)
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
    this.isAuthority();
    this.getHospitalInfo();
    this.getCustomerServiceLists();
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
