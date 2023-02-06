<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
           <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            style="width: 150px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Input
            v-model="query.routeAddress"
            placeholder="请输入请求路由"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalInfo()"
          />
          <Input
            v-model="query.parameters"
            placeholder="请输入请求参数"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalInfo()"
          />
          <Select
            v-model="query.requestType"
            placeholder="请选择访问类型"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in OperationLognameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.requestSource"
            placeholder="请选择操作来源"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in sourceNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.code"
            placeholder="请选择请求结果"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in codeList"
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
import * as api from "@/api/operationLog";
export default {
  data() {
    return {
      // 查询
      query: {
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 请求地址
        routeAddress:'',
        // 请求参数
        parameters:'',
        // 访问类型
        requestType:-1,
        // 请求来源
        requestSource:-1,
        // 请求结果
        code:1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "访问类型",
            key: "requestTypeText",
            minWidth:100,
            align:'center',
            render: (h, params) => {
              if (params.row.requestTypeText == "数据添加") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#49cc90",
                    },
                  },
                  params.row.requestTypeText
                );
              } else if (params.row.requestTypeText == "数据删除") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#f93e3e",
                    },
                  },
                  params.row.requestTypeText
                );
              } else if (params.row.requestTypeText == "数据更改") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#fca130",
                    },
                  },
                  params.row.requestTypeText
                );
              } else if (params.row.requestTypeText == "数据查询") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#61affe",
                    },
                  },
                  params.row.requestTypeText
                );
              } else if (params.row.requestTypeText == "数据导出") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#61affe",
                    },
                  },
                  params.row.requestTypeText
                );
              }  else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.requestTypeText
                );
              }
            },
          },
          {
            title: "请求路由",
            key: "routeAddress",
            minWidth:400,
            align:'center',
            tooltip:true
          },
          {
            title: "请求参数",
            key: "parameters",
            minWidth:300,
            align:'center',
            tooltip:true,

          },
          {
            title: "请求结果",
            key: "code",
            minWidth:100,
            align:'center',
            render: (h, params) => {
              if (params.row.code == 0) {
                return h(
                  "div",
                  {
                    style: {
                      color: "#49cc90",
                    },
                  },
                  '请求成功'
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#f93e3e",
                    },
                  },
                  '请求异常'
                );
              }
            },
          },
          {
            title: "返回说明",
            key: "message",
            minWidth:300,
            align:'center',
            tooltip:true
          },
          {
            title: "操作人",
            key: "operaterName",
            minWidth:120,
            align:'center'
          },
          {
            title: "操作来源",
            key: "requestSourceText",
            minWidth:150,
            align:'center'
          },
          {
            title: "创建时间",
            key: "createDate",
            align:'center',
            minWidth:170,
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate ? this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                ) : ''
              );
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
    //   访问类型
    OperationLognameList:[{id:-1,name:'全部访问类型'}],
    // 请求来源
    sourceNameList:[{id:-1,name:'全部操作来源'}],
    // 请求结果
    codeList:[
        {
            id:1,
            name:'全部请求结果'
        },
        {
            id:0,
            name:'请求成功'
        },
        {
            id:-1,
            name:'请求异常'
        }
    ]
    };
  },
  methods: {
    // 获取请求类型名称列表
    getOperationLognameList() {
      api.OperationLognameList().then((res) => {
        if (res.code === 0) {
            const {nameList} = res.data
          this.OperationLognameList = [...this.OperationLognameList,...nameList]
        }
      });
    },
    // 获取请求来源名称列表
    getsourceNameList() {
      api.sourceNameList().then((res) => {
        if (res.code === 0) {
            const {nameList} = res.data
          this.sourceNameList = [...this.sourceNameList,...nameList]
        }
      });
    },
    // 获取操作日志列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,routeAddress,parameters,requestType,requestSource,code,startDate,endDate} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        startDate:startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
        routeAddress,
        parameters,
        requestType:requestType == -1 ? null : requestType,
        requestSource:requestSource == -1 ? null : requestSource,
        code:code == 1 ? null : code,
      };
      api.getOperationLog(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.log;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取操作日志列表分页
    handlePageChange(pageNum) {
        const {  pageSize , routeAddress,parameters,requestType,requestSource,code,startDate,endDate} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            startDate:startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
            endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
            routeAddress,
            parameters,
            requestType:requestType == -1 ? null : requestType,
            requestSource:requestSource == -1 ? null : requestSource,
            code:code == 1 ? null : code, 
        };
        api.getOperationLog(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.log;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
  },
  created() {
    this.getHospitalInfo();
    this.getOperationLognameList()
    this.getsourceNameList()
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