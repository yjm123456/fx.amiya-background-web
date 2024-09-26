<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px;"
            @keyup.enter.native="getContractListClick()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px;margin-left: .625rem"
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
            v-model="query.belongEmpId"
            placeholder="请选择助理"
            filterable
            style="width: 180px;margin-left:10px"
            :disabled="isButton == false"
          >
            <Option
              v-for="item in employeeAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <!-- <Select
            v-model="query.valid"
            placeholder="请选择是否有效"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select> -->
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getContractListClick()"
            >查询</Button
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
    <!-- 编辑 -->
    <generateSalary :controlModal.sync="controlModal" :params="params" @getContractListClick="getContractListClick" ref="generateSalaryRef"/>
    <!-- 详情 -->
    <detail :detailModal.sync="detailModal" :detailParams="detailParams" ref="detail" />

  </div>
</template>
<script>
import * as api from "@/api/customerServiceCompensation";
import * as orderApi from "@/api/orderManage";
import generateSalary from "./components/generateSalary.vue"
import detail from "./components/detail.vue"
export default {
  components:{
    generateSalary,
    detail
  },
  data() {
    return {
      // 是否为客服
      isCustomerService:sessionStorage.getItem('isCustomerService'),
      // 是否为管理员
      isDirector:sessionStorage.getItem('isDirector'),
      // 查询
      query: {
        // 归属客服
        belongEmpId:null,
        // 是否有效
        valid: "true",
        // 开始时间
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        //   结束时间
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 关键字
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "创建人",
            key: "createByEmpName",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "名称",
            key: "name",
            minWidth:180,
            tooltip:true
          },
          {
            title: "助理",
            key: "belongEmpName",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "底薪",
            key: "salary",
            align:'center',
            minWidth:120,
            tooltip:true
          },
          {
            title: "提成金额",
            key: "customerServicePerformance",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "上门率",
            key: "toHospitalRate",
            align:'center',
            minWidth:120,
            tooltip:true,
            render: (h, params) => {
              return h(
                "div",
                 params.row.toHospitalRate ? params.row.toHospitalRate + '%' : 0
                  
              );
            },
          },
          {
            title: "上门率奖励",
            key: "toHospitalRateReword",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "复购率",
            key: "repeatPurchasesRate",
            align:'center',
            minWidth:120,
            tooltip:true,
            render: (h, params) => {
              return h(
                "div",
                 params.row.repeatPurchasesRate ? params.row.repeatPurchasesRate + '%' : 0
                  
              );
            },
          },
          {
            title: "复购率奖励",
            key: "repeatPurchasesRateReword",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "新客上门奖励",
            key: "newCustomerToHospitalReword",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "老客上门奖励",
            key: "oldCustomerToHospitalReword",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "目标达成奖励",
            key: "targetFinishReword",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "老带新提成",
            key: "oldTakeNewCustomerPrice",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "其他奖励",
            key: "otherPrice",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "上门奖励金额",
            key: "specialHospitalVisitPrice",
            align:'center',
            minWidth:170,
            tooltip:true
          },
          {
            title: "其他扣款",
            key: "otherChargebacks",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "加v达成业绩",
            key: "addWechatCompletePrice",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "线索登记业绩",
            key: "addClueCompletePrice",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "医美客资加V业绩",
            key: "beautyAddWechatPrice",
            align:'center',
            minWidth:180,
            tooltip:true
          },
          {
            title: "带货客资加V业绩",
            key: "takeGoodsAddWechatPrice",
            align:'center',
            minWidth:180,
            tooltip:true
          },
          {
            title: "引导面诊卡下单金额",
            key: "consulationCardPrice",
            align:'center',
            minWidth:180,
            tooltip:true
          },
          {
            title: "引导面诊卡下单加v金额",
            key: "consulationCardAddWechatPrice",
            align:'center',
            minWidth:200,
            tooltip:true
          },
          {
            title: "供应链达人派单提成金额",
            key: "cooperationLiveAnchorSendOrderPrice",
            align:'center',
            minWidth:200,
            tooltip:true
          },
          {
            title: "供应链达人上门提成金额",
            key: "cooperationLiveAnchorToHospitalPrice",
            align:'center',
            minWidth:200,
            tooltip:true
          },
          
          {
            title: "合计",
            key: "totalPrice",
            align:'center',
            minWidth:150,
            tooltip:true
          },
          {
            title: "费用备注",
            key: "remark",
            minWidth:300,
            tooltip:true
          },
          {
            title: "是否有效",
            key: "valid",
            align:'center',
            minWidth:120,
            render: (h, params) => {
              if (params.row.valid == true) {
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
            title: "操作",
            key: "",
            width: 240,
            align:'center',
            fixed:"right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // disabled:params.row.valid == false
                      disabled:this.isButton == false
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id} = params.row;
                        const data = {
                          id:id
                        }
                        api.copyCompensation(data).then(res=>{
                          if(res.code == 0){
                            this.$Message.warning('复制成功！')
                            this.getContractListClick()
                          }
                        })
                      },
                    },
                  },
                  "复制"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // disabled:params.row.valid == false
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id,belongEmpId } = params.row;
                        this.detailParams.id=id
                        this.detailParams.belongEmpId=belongEmpId
                        this.detailModal = true
                      },
                    },
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // disabled:this.isDirector == 'false' && this.isCustomerService == 'true'
                      disabled:this.isButton == false
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id,toHospitalRateReword } = params.row;
                        this.title = "修改";
                        this.params.id = id
                        this.controlModal = true;
                        // api.byIdCustomerServiceCompensation(id).then((res) => {
                        //   if (res.code === 0) {
                        //     this.controlModal = true;
                        //     this.params.detailObj = res.data.customerServiceCompensation
                        //     this.$nextTick(()=>{
                        //       this.$refs.generateSalaryRef.checkBelongEmpIdChange()
                        //     })
                        //   }
                        // });
                         this.$nextTick(()=>{
                          // let toHospitalRateReword2 = toHospitalRateReword > 0 ? '普通客服' : '行政客服'
                            this.$refs.generateSalaryRef.getDetail()
                        })
                        
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
                      // disabled:params.row.valid == false || this.isDirector == 'false' && this.isCustomerService == 'true'
                      disabled:this.isButton == false
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteCustomerServiceCompensation(id).then((res) => {
                              if (res.code === 0) {
                                this.getContractListClick();
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
      //   全部归属客服
      employeeAll: [{ id: -1, name: "全部助理" }],
      // 传给子组件的参数
      params:{
        // 归属客服
        employeeList:[],
        // 根据id获取详情
        detailObj:{},
        id:""
      },
      id:"",
      // 详情
      detailModal:false,
      
      detailParams:{
        id:'',
        belongEmpId:null
      },
      isButton:false,
    };
  },
  methods: {
    isAuthority() {
      let currentRole = JSON.parse(sessionStorage.getItem("permissions")) ? JSON.parse(sessionStorage.getItem("permissions")) : [];
      if (currentRole.includes("fx.amiya.permission.SELECT_ALL_PERFORMANCE") == false) {
        this.query.belongEmpId = Number(sessionStorage.getItem('employeeId'))
        this.isButton = false
        return
      }else{
        this.isButton = true
        this.query.belongEmpId = null
      }
    },
    // 获取客服列表
    getCustomerServiceList() {
      orderApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeAll = [...this.employeeAll, ...employee];
          this.params.employeeList = employee
        }
      });
    },
    // 获取助理薪资单列表
    getContractListClick() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        belongEmpId,
        valid,
        startDate,
        endDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        belongEmpId,
        valid,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
      };
      api.getCustomerServiceCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerServiceCompensation;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取助理薪资单列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        belongEmpId,
        valid,
        startDate,
        endDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        belongEmpId,
        valid,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
      };
      api.getCustomerServiceCompensation(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerServiceCompensation;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  mounted(){
    
  },
  created() {
    this.isAuthority()
    setTimeout(()=>{
      this.getContractListClick();
    },1000)
    this.getCustomerServiceList();
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
