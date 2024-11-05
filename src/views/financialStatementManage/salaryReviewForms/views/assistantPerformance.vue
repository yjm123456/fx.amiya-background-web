<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
            <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getListWithPageByCustomerCompensation()"
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
            v-model="query.createBy"
            placeholder="请选择上传人"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="(item,index) in params.creteEmpNameList"
              :value="item.id"
              :key="index"
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
            v-model="query.performanceType"
            placeholder="请选择薪资业绩类型"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="(item3,index3) in params.PerformanceTypeList"
              :value="item3.id"
              :key="index3"
              >{{ item3.name }}</Option
            >
          </Select>
           <!-- <Select
            v-model="query.isOldCustoemr"
            placeholder="请选择业绩"
            filterable
            style="width: 140px;margin-left:10px"
          >
            <Option
              v-for="item in params.isOldCustoemrList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select> -->
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getListWithPageByCustomerCompensation()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="batchReviewClick()"
            >批量提取</Button
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
    <!-- 内容平台订单详情 -->
    <detail :detailModel.sync="detailModel" :detailList="detailList"></detail>
   
    <!-- 批量提取 -->
    <batchExtraction :batchExtractionModel.sync="batchExtractionModel" :batchExtractionParams="batchExtractionParams" :params="params"/>
    <!-- 单个订单提取 -->
    <extraction :extractionModel.sync="extractionModel" :extractionParams="extractionParams" :params="params"/>
    
  </div>
</template>
<script>
import * as api from "@/api/reconciliationDocumentsSettle";
import * as orderApi from "@/api/orderManage";
import * as customerManageApi from "@/api/customerManage.js";
import batchExtraction from "../components/batchExtraction.vue"
import extraction from "../components/extraction.vue"
import detail from "@/components/contentDetail/detail.vue";

export default {
  components: {
   batchExtraction,
   extraction,
   detail,
  },
  props: {
    activeName: String,
    params: Object,
  },
  data() {
    return {
      // 查询
      query: {
        keyWord: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        pageNum: 1,
        pageSize: 10,
        createBy:-1,
        belongEmpId:-1,
        performanceType:1,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 80,
            fixed:'left'
          },
          {
            title: "成交情况编号",
            key: "dealId",
            align: "center",
            minWidth: 170,
          },

          {
            title: "订单编号",
            key: "contentPaltformOrderId",
            align: "center",
            minWidth: 170,
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
            title: "业绩类型",
            key: "performanceTypeText",
            minWidth: 100,
            align: "center",
            tooltip: true,
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 100,
            align:'center',
            render: (h, params) => {
              if (params.row.isDeal == true) {
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
            title: "创建时间",
            key: "createDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                    params.row.createDate ? this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss") : ""
              );
            },
          },
          {
            title: "上传人",
            key: "createByName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 140,
            align: "center",
            tooltip: true,
          },
          {
            title: "是否是辅助订单",
            key: "isSupportOrder",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              if (params.row.isSupportOrder == true) {
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
            title: "辅助客服",
            key: "supportEmpName",
            minWidth: 110,
            align: "center",
          },
          
          {
            title: "操作",
            key: "",
            width: 180,
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
                        const {
                          dealId,
                          contentPaltformOrderId,
                          dealPrice,
                          createDate
                        } = params.row;
                        this.extractionModel = true;
                        this.extractionParams.dealId = dealId;
                        this.extractionParams.contentPaltformOrderId = contentPaltformOrderId;
                        this.extractionParams.dealPrice = dealPrice;
                        this.extractionParams.dealCreateDate = createDate
                      },
                    },
                  },
                  "提取"
                ),
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
                        const { contentPaltformOrderId } = params.row;
                        orderApi.byIdContentPlateForm(contentPaltformOrderId).then((res) => {
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
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      // 提取
      extractionModel: false,
      // 批量提取
      batchExtractionModel:false,

      // 批量提取参数
      batchExtractionParams: {
        list:[]
      },
      // 提取参数
      extractionParams:{
        dealId:'',
        orderId:'',
        dealPrice:0
      },
      // 内容平台订单详情model
      detailModel: false,
      // 订单详情参数
      detailList: [],
      // 消费追踪订单详情model
      upgradeOrderDetailModel: false,
      upgradeOrderObj: {},
      // 下单平台订单详情
      orderDetailModel: false,
      detailList: [],

    };
  },
  methods: {
    // 批量提取
    batchReviewClick(){
      let performanceType = this.batchExtractionParams.list.map(item=>{return item.performanceType})
      
      if (this.batchExtractionParams.list.length == 0 || this.batchExtractionParams.list == []) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      //4（助理稽查）  5（财务稽查） 稽查业绩不能批量提取
      if(performanceType.find(item=>item == 4) == 4 || performanceType.find(item=>item == 5) == 5){
        this.$Message.warning('稽查数据不能批量提取，请重新核对后提交！')
        this.batchExtractionParams.list = []
        return
      }
      this.batchExtractionModel = true;
    },
    handleSelect(selection, row) {
      // 批量提取
      // this.checkedParams.idList.add(row.id);
      this.batchExtractionParams.list.push({
        dealInfoId:row.dealId,
        orderId:row.contentPaltformOrderId,
        dealPrice:row.dealPrice,
        performanceType:row.performanceType,
        orderFrom:2,
        dealCreateDate:row.createDate,
        performanceCommision:0,
        performanceCommisionCheck:0

      })
    },

    handleCancels(selection, row) {
      // 批量提取
      const findIndex = this.batchExtractionParams.list.findIndex(item=> item.dealId === row.dealId);
      this.batchExtractionParams.list.splice(findIndex,1)
      // this.checkedParams.idList.delete(row.id);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        // this.checkedParams.idList.clear();
        this.batchExtractionParams.list = []
      } else {
        selection.forEach((item) => {
          // this.checkedParams.idList.add(item.id);
          this.batchExtractionParams.list.push({
            dealInfoId:item.dealId,
            orderId:item.contentPaltformOrderId,
            dealPrice:item.dealPrice,
            performanceType:item.performanceType,
            orderFrom:2,
            dealCreateDate:item.createDate,
            performanceCommision:0,
            performanceCommisionCheck:0
          })
        });
      }
    },
    // 获取薪资审核表
    getListWithPageByCustomerCompensation() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });

      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        createBy,
        belongEmpId,
        performanceType
        
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
        createBy:createBy == -1 ? null :createBy,
        belongEmpId:belongEmpId == -1 ? null :belongEmpId,
        performanceType
        
      };
      api.getAssistantDealInfoList(data).then((res) => {
        if (res.code === 0) {
          const {
            list,
            totalCount,
          } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
          this.batchExtractionParams.list = []
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
        createBy,
        belongEmpId,
        performanceType
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
        createBy:createBy == -1 ? null :createBy,
        belongEmpId:belongEmpId == -1 ? null :belongEmpId,
        performanceType
      };
      api.getAssistantDealInfoList(data).then((res) => {
        if (res.code === 0) {
          const {
            list,
            totalCount,
          } = res.data.data;
          this.query.data = list;
          this.query.totalCount = totalCount;
          this.batchExtractionParams.list = []
        }
      });
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getListWithPageByCustomerCompensation();
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
                this.getListWithPageByCustomerCompensation();
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
                this.getListWithPageByCustomerCompensation();
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
  created() {},
  watch: {
    activeName: {
      handler(value) {
        if (value === "assistantPerformance") {
          this.getListWithPageByCustomerCompensation();
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
  justify-content: flex-start;
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
