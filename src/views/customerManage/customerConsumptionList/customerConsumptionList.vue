<!-- 客户列表 -->
<template>
  <div>
    <Card :dis-hover="true">
      <div class="content">
        <div class="conter">
          <div>
            <Input
              v-model="query.orderId"
              placeholder="请输入订单号"
              style="width: 180px; margin-right: 10px"
              @keyup.enter.native="bindCustomerConsumptionServerList()"
            />
            <Input
              v-model="query.keyword"
              placeholder="请输入客户名称和手机尾号"
              style="width: 200px; margin-right: 10px"
              @keyup.enter.native="bindCustomerConsumptionServerList()"
              :disabled="query.orderId !== ''"
            />
            <DatePicker
              type="date"
              placeholder="开始日期"
              style="width: 140px;margin-right: 10px"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="结束日期"
              style="width: 140px;;margin-right: 10px"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
            <Select v-model="query.channel" style="width: 140px; margin-right: 10px"  placeholder="请选择下单渠道">
              <Option
                v-for="item in query.channelList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <!-- v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }" -->
            <!-- :disabled ="query.positionName == '客服'" -->
            <Select
              
              v-model="query.employeeId"
              style="width: 140px; margin-right: 10px"
              placeholder="请选择客服"
              filterable
              :disabled ="query.positionName == '客服'" 
            >
              <Option
                v-for="item in query.employee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select v-model="query.cconsumptionLevelId" style="width: 160px; margin-right: 10px"  placeholder="请选择消费等级" >
              <Option
                v-for="item in query.consumptionLevelList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </div>
        </div>
        <div>
          <Button type="primary" @click="bindCustomerConsumptionServerList()" style="margin-left:20px">查询</Button>
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

  
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import * as baseApi from "@/api/baseDataMaintenance";
import customerInfo from "@/components/customerInfo/customerInfo";
import trackReturnVisit from "@/components/trackReturnVisit/trackReturnVisit";

export default {
  props: {
    activeName: String,
  },
  components: {
    customerInfo,
    trackReturnVisit,
  },
  data() {
    return {
      phone:"",
      // 客户列表
      query: {
        amountType:"0",
        positionName : sessionStorage.getItem("positionName"),
        // employeeId : sessionStorage.getItem("employeeId"),
        disabled:false,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        columns: [
          
          {
            title: "电话",
            key: "phone",
            align:'center',
            minWidth:130
          },
          {
            title: "创建时间",
            key: "createDate",
            align:'center',
            minWidth:170,
            render: (h, params) => {
              return h(
                "div",
                
                params.row.createDate  ? this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                ) : ''
              );
            },
          },
         {
            title: "绑定客服",
            key: "customerServiceName",
            align:'center',
            minWidth:140
          },
          {
            title: "首次项目需求",
            key: "firstOrderInfo",
            align:'center',
            minWidth:160
          },
          {
            title: "首次消费时间",
            key: "firstOrderCreateDate",
            align:'center',
            minWidth:170,
            render: (h, params) => {
              return h(
                "div",
                  params.row.newConsumptionPlatFormId == 0 ?  '' : this.$moment(params.row.firstOrderCreateDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ) 
              );
            },
          },
          {
            title: "最新消费时间",
            key: "newConsumptionTime",
            align:'center',
            minWidth:170,
            render: (h, params) => {
              return h(
                "div",
                  params.row.newConsumptionPlatFormId == 0 ?  '' : this.$moment(params.row.newConsumptionTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ) 
              );
            },
          },
          {
            title: "最新消费平台",
            key: "newConsumptionPlatForm",
            align:'center',
            minWidth:130
          },
          {
            title: "最新消费所属主播",
            key: "newLiveAnchorName",
            align:'center',
            minWidth:150
          },
          {
            title: "最新消费所属微信",
            key: "newWechatNo",
            align:'center',
            minWidth:150
          },
          {
            title: "最新消费渠道",
            key: "newConsumptionPlatFormAppTypeText",
            align:'center',
            minWidth:130
          },
          
          {
            title: "累计消费",
            key: "allConsumptionPrice",
            align:'center',
            minWidth:140
          },
          {
            title: "总单数",
            key: "createdOrderNum",
            align:'center',
            minWidth:120
          },
          
        ],
        data: [],
        pageNum: 1,
        pageSize: 10,
        keyword: "",
        orderId:'',
        employee: [{id:-1,name:'全部客服'}],
        employeeId:-1,
        // employeeId: sessionStorage.getItem("positionName") == '客服' || sessionStorage.getItem("positionName") == '客服管理员' || sessionStorage.getItem("positionName") == '客服主管' ? sessionStorage.getItem("employeeId") : 97,
        cconsumptionLevelId:-1,
        channel:-1,
        // 消费等级
        consumptionLevelList:[{id:-1,name:'全部消费等级'}],
        channelList:[
            {
                id:-1,
                name:'全部消费平台'
            },
            {
                id:1,
                name:'下单平台'
            },
            {
                id:2,
                name:'内容平台'
            },
            {
                id:3,
                name:'客户升单'
            }
        ],
        typeList: [
          {
            name: "已注册小程序",
            value: 1,
          },
          {
            name: "未注册小程序",
            value: 2,
          },
        ],
        
        type: 2,
        totalCount: 0,
      },
    };
  },
  methods: {
      // 获取消费等级id和名称
    getConsumptionLevelList(){
      baseApi.getConsumptionLevelList().then((res) => {
        if(res.code === 0){
          const { ConsumptionLevelList } = res.data;
          this.query.consumptionLevelList = [...this.query.consumptionLevelList,...ConsumptionLevelList];
        }
      })
    },
   
    // 取消
    cancelSubmit(name){
      this.editCustomerForm.editCustomerModel = false
      this.$refs[name].resetFields();
    },
    isAuthority() {
      let currentRole = JSON.parse(sessionStorage.getItem("permissions")) ? JSON.parse(sessionStorage.getItem("permissions")) : [];
      if (!currentRole.includes("fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE")) {
        return false;
      }
      return true;
    },

    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.query.employee = [...this.query.employee,...employee];
          this.query.employee.map((item) => {
            if (this.query.positionName == "客服") {
              if (item.id == sessionStorage.getItem("employeeId")) {
                this.query.employeeId = item.id;
              }
            }
          });
        }
      });
    },

    // 获取绑定客服的客户列表
    bindCustomerConsumptionServerList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, employeeId , startDate , endDate , cconsumptionLevelId,channel,orderId} = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        // employeeId: !this.isAuthority() ? null : employeeId,
        // employeeId: sessionStorage.getItem("positionName") == '客服' ? sessionStorage.getItem("employeeId") : employeeId,
        employeeId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        CconsumptionLevelId: cconsumptionLevelId==-1?null:cconsumptionLevelId,
        channel:channel == -1 ? 0 : channel,
        orderId,
      };
      api.bindCustomerConsumptionServerList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customer;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取绑定客服的客户列表分页
    handlePageChange(pageNum) {
      const {pageSize, keyword, employeeId, startDate , endDate , cconsumptionLevelId,channel,orderId} = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        //  employeeId: sessionStorage.getItem("positionName") == '客服' ? sessionStorage.getItem("employeeId") : employeeId,
        employeeId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        CconsumptionLevelId: cconsumptionLevelId==-1?null:cconsumptionLevelId,
        channel:channel == -1 ? 0 : channel,
        orderId
      };
      api.bindCustomerConsumptionServerList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customer;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  created() {
    this.getCustomerServiceList();
    this.bindCustomerConsumptionServerList();
    this.getConsumptionLevelList()
  },
 
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.content{
  display: flex;
  align-items: center;
}
.conter{
  display: flex;
  flex-direction: column;
}
.price_content{
  margin-top: 30px;
  display: flex;
  align-items: center;
}
</style>
