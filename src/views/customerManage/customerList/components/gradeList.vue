<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getCustomerRFMTypeUpdateData()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.customerServiceId"
            style="width: 200px; margin-left: 10px"
            placeholder="请选择客服"
            :disabled="isDirector == 'false'"
            >
            <Option
                v-for="item in employee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
            >
            </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getCustomerRFMTypeUpdateData()"
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
  </div>
</template>
<script>
import * as api from "@/api/rFMCustomerInfo";
import * as orderApi from "@/api/orderManage";

export default {
    props:{
        employee:Array,
        active:String
    },
  data() {
    return {
      // 查询
      query: {
        startDate:this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
        customerServiceId:sessionStorage.getItem('isDirector') == 'false' ? Number(sessionStorage.getItem('employeeId')) : -1,
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "更新时间",
            key: "createDate",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "客服",
            key: "customerServiceName",
          },
          {
            title: "手机号",
            key: "phone",
            render: (h, params) => {
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
                          alignItems: "center",
                        },
                      },
                      params.row.phone
                    ),
                    h("span", {
                      style: {
                        color: "#2d8cf0",
                        fontSize: "20px",
                      },
                      class: !params.row.bool
                        ? "iconfont icon-biyan"
                        : "iconfont icon-see",
                      on: {
                        click: () => {
                          if (params.row.bool) return;
                          const { encryptPhone } = params.row;
                          const data = {
                            encryptPhone
                          }
                          orderApi.decryptoPhonesNew(data).then((res) => {
                            if (res.code === 0) {
                              params.row.phone = res.data.phone;
                              params.row.bool = true;
                            }
                          });
                        },
                      },
                    }),
                  ]
                );
            }
          },
          {
            title: "原等级",
            key: "from",
          },
          {
            title: "现等级",
            key: "to",
          },
        ],
        data: [],
        totalCount: 0,
      },
      isDirector :sessionStorage.getItem('isDirector'),

    };
  },
  methods: {
    // 获取列表
    getCustomerRFMTypeUpdateData() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {pageNum,pageSize,startDate,endDate,keyWord,customerServiceId} = this.query
      if(sessionStorage.getItem('isDirector') == 'true'){
        const data = {
            pageNum,
            pageSize,
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            customerServiceId:customerServiceId == -1 ? null : customerServiceId,
            keyWord
        }
        api.getCustomerRFMTypeUpdateData(data).then(res=>{
          if(res.code === 0){
            const { list, totalCount } = res.data.getCustomerRFMTypeUpdateData;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        })
      }else{
        const data = {
            pageNum,
            pageSize,
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            customerServiceId:Number(sessionStorage.getItem('employeeId')),
            keyWord
        }
        api.getCustomerRFMTypeUpdateData(data).then(res=>{
          if(res.code === 0){
            const { list, totalCount } = res.data.getCustomerRFMTypeUpdateData;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        })
      }
    },

    // 获取列表分页
    handlePageChange(pageNum) {
       const {pageSize,startDate,endDate,keyWord,customerServiceId} = this.query
        if(sessionStorage.getItem('isDirector') == 'true'){
        const data = {
            pageNum,
            pageSize,
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            customerServiceId:customerServiceId == -1 ? null : customerServiceId,
            keyWord
        }
        api.getCustomerRFMTypeUpdateData(data).then(res=>{
          if(res.code === 0){
            const { list, totalCount } = res.data.getCustomerRFMTypeUpdateData;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        })
      }else{
        const data = {
            pageNum,
            pageSize,
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            customerServiceId:Number(sessionStorage.getItem('employeeId')),
            keyWord
        }
        api.getCustomerRFMTypeUpdateData(data).then(res=>{
          if(res.code === 0){
            const { list, totalCount } = res.data.getCustomerRFMTypeUpdateData;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        })
      }
    },
  },
  watch: {
    active: {
      handler(value) {
        if (value === "gradeList") {
            this.isTab = true
             this.getCustomerRFMTypeUpdateData()
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
</style>