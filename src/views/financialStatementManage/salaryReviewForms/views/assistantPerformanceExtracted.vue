<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
            <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getCustomerServiceCheckPerformanceClick()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 140px;margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 140px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.valid"
            placeholder="请选择上传人"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="item in validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.belongEmpId"
            placeholder="请选择归属客服"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="(item2,index2) in params.employeeAll"
              :value="item2.id"
              :key="index2"
              >{{ item2.name }}</Option
            >
          </Select>
          <Select
            v-model="query.performanceTypeList"
            placeholder="请选择业绩类型"
            filterable
            style="width: 230px;margin-left:10px"
            multiple
          >
            <Option
              v-for="(item2,index2) in params.PerformanceTypeList"
              :value="item2.id"
              :key="index2"
              >{{ item2.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getCustomerServiceCheckPerformanceClick()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="invoiceClick()"
            >生成薪资</Button
          >
          
        </div>
        <div class="right">
            <Button
            type="primary"
            style="margin-left: 10px"
            @click="controlModel = true"
            >添加</Button
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
          :page-size-opts="[10, 20, 50, 100, 200]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
    </Card>
    <!-- 添加/编辑 -->
    <assistantPerformanceExtracted :controlModel.sync="controlModel" :extractPerformanceParams="extractPerformanceParams" :params="params" ref="assistantPerformanceExtracted"/>
    <!-- 生成薪资 -->
    <generateSalary :generateSalaryModel.sync="generateSalaryModel" :generateSalaryParams="generateSalaryParams" :params="params" @getListWithPageByCustomerCompensation="getCustomerServiceCheckPerformanceClick" :startDate="this.$moment(new Date(query.startDate)).format('YYYY-MM-DD')" :endDate="this.$moment(new Date(query.endDate)).format('YYYY-MM-DD')"/>
  </div>
</template>
<script>
import * as api from "@/api/customerServiceCheckPerformance";
import assistantPerformanceExtracted from "../components/extractPerformanceAddEdit.vue"
import generateSalary from "../components/generateSalary.vue";

export default {
  components: {
   assistantPerformanceExtracted,
   generateSalary
  },
  props: {
    activeName: String,
    params: Object,
  },
  data() {
    return {
      // 查询
      query: {
        belongEmpId:-1,
        performanceTypeList:[1,3],
        keyWord: "",
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        pageNum: 1,
        pageSize: 10,
        valid:'true',
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 80,
            fixed:'left'
          },
          {
            title: "成交编号",
            key: "dealInfoId",
            align: "center",
            minWidth: 170,
          },

          {
            title: "订单编号",
            key: "orderId",
            align: "center",
            minWidth: 170,
            tooltip: true,
          },
          {
            title: "订单来源",
            key: "orderFromText",
            align: "center",
            minWidth: 100,
            tooltip: true,
          },
          {
            title: "成交金额",
            key: "dealPrice",
            minWidth: 120,
            align: "center",
            tooltip: true,
          },
          {
            title: "成交单创建时间",
            key: "dealCreateDate",
            minWidth: 140,
            align: "center",
            tooltip:true,
            render: (h, params) => {
              return h(
                "div",
                params.row.dealCreateDate ? this.$moment(params.row.dealCreateDate).format("YYYY-MM-DD") : ''
              );
            },
          },
          {
            title: "业绩类型",
            key: "performanceTypeText",
            minWidth: 100,
            align: "center",
            tooltip: true,
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
            align: "center",
            tooltip: true,
          },
          {
            title: "助理提点",
            key: "point",
            minWidth: 100,
            align: "center",
            tooltip: true,
            renderHeader: (h, { column }) => {
                return h('span', [
                //   column.title,
                    h('span', {
                    style: {
                        color: 'orange',
                    },
                    domProps: {
                        innerHTML: '助理提点'
                    //   + ' *',
                    },
                    }),
                ]);
            },
            render: (h, params) => {
              return h(
                "div",
                params.row.point ? params.row.point + '%' : '0%'
              );
            },
          },
          {
            title: "助理提成",
            key: "performanceCommision",
            minWidth: 140,
            align:'center',
            renderHeader: (h, { column }) => {
                return h('span', [
                //   column.title,
                    h('span', {
                    style: {
                        color: 'orange',
                    },
                    domProps: {
                        innerHTML: '助理提成'
                    //   + ' *',
                    },
                    }),
                ]);
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
            align: "center",
            tooltip: true,
          },
          {
            title: "操作",
            key: "",
            minWidth: 180,
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
                      disabled:params.row.valid == false
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const {
                          id
                         
                        } = params.row;
                        this.extractPerformanceParams.title = "编辑"
                        this.extractPerformanceParams.id = id
                        this.controlModel = true;
                        this.$refs.assistantPerformanceExtracted.getbyIdCustomerServiceCheckPerformance(id)
                      },
                    },
                  },
                  "编辑"
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
                            api.deleteCustomerServiceCheckPerformance(id).then((res) => {
                              if (res.code === 0) {
                                this.getCustomerServiceCheckPerformanceClick();
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
      // 添加/编辑model
      controlModel: false,
      extractPerformanceParams:{
        title:'添加',
        id:'',
        // 用于修改保留在当前页面
        pageNum:1
      },
      validList:[{type:'true',name:'有效'},{type:'false',name:'无效'}],
      // 生成薪资参数
      generateSalaryParams:{
        generateSalaryList: new Set(),
        // 
        returnBackPrice:0
      },
      // 生成薪资model
      generateSalaryModel:false,
    };
  },
  methods: {
    handleSelect(selection, row) {
      // 生成薪资单
      this.generateSalaryParams.generateSalaryList = selection
      // 提成金额合计
      this.commissionPrice+=row.performanceCommision
      // 审核客服业绩合计
      this.checkedPrice += row.customerServiceSettlePrice
    },
    handleCancels(selection, row) {
      // 生成薪资单
      this.generateSalaryParams.generateSalaryList = selection
      // 提成金额合计
      this.commissionPrice = this.commissionPrice - row.performanceCommision;
      // 审核客服业绩合计
      this.checkedPrice = this.checkedPrice - row.customerServiceSettlePrice;
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        // 生成薪资单
        this.generateSalaryParams.generateSalaryList = []
        // 提成金额合计
        this.commissionPrice = 0;
        // 审核客服业绩合计
        this.checkedPrice = 0;

      } else {
        this.generateSalaryParams.generateSalaryList = selection
        selection.forEach((item) => {
          // 提成金额合计
          this.commissionPrice += item.performanceCommision;
          // 审核客服业绩合计
          this.checkedPrice += item.customerServiceSettlePrice;
        });
      }
    },
    // 生成薪资
    invoiceClick() {
      if (!this.generateSalaryParams.generateSalaryList.length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      let belongEmpName = this.generateSalaryParams.generateSalaryList.map(item=>item.belongEmpName)
      let firstValue = belongEmpName[0]
      let isFlag = belongEmpName.every(value => value === firstValue)
      if(isFlag == true){
        this.generateSalaryModel = true
      }else{
        this.$Message.warning('生成薪资存在多名助理数据，请核对后重新选择！')
      }
      
    },
    // 获取助理提取业绩
    getCustomerServiceCheckPerformanceClick() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        valid,
        belongEmpId,
        performanceTypeList
        
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        valid,
        belongEmpId:belongEmpId == -1 ? null : belongEmpId,
        performanceTypeList:performanceTypeList ? String(performanceTypeList) : '',
        
      };
      api.getCustomerServiceCheckPerformance(data).then((res) => {
        if (res.code === 0) {
          const {
            list,
            totalCount,
          } = res.data.customerServiceCheckPerformance;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取录单申请列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        startDate,
        endDate,
        valid,
        belongEmpId,
        performanceTypeList
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        valid,
        belongEmpId:belongEmpId == -1 ? null : belongEmpId,
        performanceTypeList:performanceTypeList ? String(performanceTypeList) : '',
      };
      api.getCustomerServiceCheckPerformance(data).then((res) => {
        if (res.code === 0) {
          const {
            list,
            totalCount,
          } = res.data.customerServiceCheckPerformance;
          this.query.data = list;
          this.query.totalCount = totalCount;
          this.extractPerformanceParams.pageNum = pageNum
        }
      });
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getCustomerServiceCheckPerformanceClick();
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            api.editExpressManage(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getCustomerServiceCheckPerformanceClick();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { expressName, valid, expressCode } = this.form;
            const data = { expressName, valid, expressCode };
            // 添加
            api.addExpressManage(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getCustomerServiceCheckPerformanceClick();
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
      this.controlModel = false;
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
  created() {},
  watch: {
    activeName: {
      handler(value) {
        if (value === "assistantPerformanceExtracted") {
          this.getCustomerServiceCheckPerformanceClick();
        }
      },
      immediate: true,
    },
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
.button{
  width: 120px;
  height: 44px;
  font-size: 12px;
  background: #2D8CF0;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
  box-sizing: border-box;
}
.query{
  width: 100px;
  height: 44px;
  font-size: 12px;
  background: #2D8CF0;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 44px;
  font-size: 16px;
  margin: 0 10px;
}
.right{
  display: flex;

}
</style>
