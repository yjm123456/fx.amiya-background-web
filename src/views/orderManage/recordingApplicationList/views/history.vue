<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="gethistoryData()"
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
            v-model="query.hospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 200px;margin-left:10px"
          >
            <Option
              v-for="item in params.hospitallist"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.checkState"
            placeholder="请选择审核状态"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in params.checkStateListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.createBy"
            placeholder="请选择创建人"
            filterable
            style="width: 150px;margin-left:10px"
          >
            <Option
              v-for="item in params.employeeAll3"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.valid"
            placeholder="是否有效"
            filterable
            style="width: 150px;margin-left:10px"
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
            @click="gethistoryData()"
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
    <!-- 查看图片 -->
    <viewImg :viewPicModel.sync="viewPicModel" :customerPictureUrl="customerPictureUrl"/>
   
  </div>
</template>

<script>
import * as api from "@/api/contentPlatFormOrderAddWork";
import viewImg from "../components/viewImg.vue"

export default {
  components: {
    viewImg
  },
  props: {
    activeName: String,
    params: Object,
  },
  data() {
    return {
      // 查看截图
      viewPicModel:false,
      customerPictureUrl:"",
      // 查询
      query: {
        keyWord: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        hospitalId: -1,
        checkState: -1,
        valid:'true',
        createBy:-1,
        pageNum: 1,
        pageSize: 10,
        columns: [
            {
            title: "创建人",
            key: "createByEmpName",
            align: "center",
            minWidth: 100,
            tooltip:true
          },
          {
            title: "接收人",
            key: "acceptByEmpName",
            align: "center",
            minWidth: 100,
            tooltip:true
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 100,
            align: "center",
            tooltip:true
          },
          
          {
            title: "医院",
            key: "hospitalName",
            minWidth: 200,
            tooltip:true
          },
          {
            title: "申请类型",
            key: "addWorkTypeText",
            minWidth: 120,
          },
          {
            title: "申请理由",
            key: "sendRemark",
            minWidth: 150,
            tooltip:true
          },
          {
            title: "截图",
            key: "picture",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.picture,
                  },
                }),
              ]);
            },
          },
          {
            title: "归属客服",
            key: "belongCustomerServiceName",
            minWidth: 100,
            align: "center",
            tooltip:true
          },
          {
            title: "审核状态",
            key: "checkStateText",
            minWidth: 100,
            align: "center",
            tooltip:true,
            render: (h, params) => {
              if (params.row.checkStateText == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkStateText
                );
              } else if (params.row.checkStateText == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkStateText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkStateText
                );
              }
            },
          },
          {
            title: "申请类型",
            key: "addWorkTypeText",
            minWidth: 100,
            align: "center",
            tooltip:true
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 150,
            align: "center",
            tooltip:true
          },
          {
            title: "审核时间",
            key: "checkDate",
            minWidth: 120,
            tooltip:true,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate
                  ? this.$moment(params.row.checkDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "操作",
            key: "",
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
                      disabled: !params.row.picture,
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { picture } = params.row;
                        this.viewPicModel = true;
                        this.customerPictureUrl = picture;
                      },
                    },
                  },
                  "查看截图"
                ),
              ]);
            },
          },
         
        ],
        data: [],
        totalCount: 0,
      },
      validList:[
        {
            type:'true',
            name:'有效'
        },
        {
            type:'false',
            name:'无效'
        },
      ]
    };
  },
  methods: {
    // 获取录单申请列表
    gethistoryData() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        startDate,
        endDate,
        hospitalId,
        checkState,
        createBy,
        valid
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
        hospitalId: hospitalId == -1 ? null : hospitalId,
        checkState: checkState == -1 ? null : checkState,
        createBy: createBy == -1 ? null : createBy,
        valid
      };
      api.historyData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.historyData
;
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
        hospitalId,
        checkState,
        createBy,
        valid
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
        hospitalId: hospitalId == -1 ? null : hospitalId,
        checkState: checkState == -1 ? null : checkState,
        createBy: createBy == -1 ? null : createBy,
        valid
      };
      api.historyData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.historyData
;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "history") {
          this.gethistoryData();
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
