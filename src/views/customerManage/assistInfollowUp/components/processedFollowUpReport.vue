<template>
  <div>
    <Card :dis-hover="true">
      <Input
        v-model="query.keyword"
        placeholder="请输入手机号或提报内容"
        style="width: 200px;"
        @keyup.enter.native="gethospitalDealedListWithPage()"
      />
      <DatePicker
        type="date"
        placeholder="开始日期"
        style="width: 180px; margin-left: 10px"
        :value="query.startDate"
        v-model="query.startDate"
        transfer
      ></DatePicker>
      <DatePicker
        type="date"
        placeholder="结束日期"
        style="width: 180px; margin-left: .625rem"
        :value="query.endDate"
        v-model="query.endDate"
        transfer
      ></DatePicker>
      <Select
        v-model="query.isSendStatusFinished"
        placeholder="请选择跟进情况"
        style="width: 180px; margin-left: .625rem"
      >
        <Option
          :value="item.type"
          v-for="item in query.SendStatusFinishedList"
          :key="item.type"
          >{{ item.name }}</Option
        >
      </Select>
      <Button
        type="primary"
        style="margin-left: 10px"
        @click="gethospitalDealedListWithPage()"
        >查询</Button
      >
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
import * as api from "@/api/trackReported";
export default {
  props: ["activeName"],
  data() {
    return {
      query: {
        keyword: "",
        categoryId: "",
        valid: null,
        pageNum: 1,
        pageSize: 10,
        showDirection:0,
        columns: [
          {
            title: "编号",
            key: "id",
            width: 200,
          },
          {
            title: "客户电话",
            key: "phone",
            width: 130,
          },
          {
            title: "提报状态",
            key: "sendStatusText",
            width: 100,
            render: (h, params) => {
              if (params.row.sendStatusText == "跟进完成") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.sendStatusText
                );
              } else if (params.row.sendStatusText == "跟进失败") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.sendStatusText
                );
              } else if (params.row.sendStatusText == "已提报") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.sendStatusText
                );
              }  else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.sendStatusText
                );
              }
            },
          },
          {
            title: "提报内容",
            key: "sendContent",
          },
          {
            title: "提报医院",
            key: "sendHospital",
            width: 220,
          },
          {
            title: "医院回访内容",
            key: "hospitalContent",
          },
          {
            title: "提报日期",
            key: "sendDate",
            width: 180,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.sendDate).format("YYYY-MM-DD HH:mm:ss")
              );
            },
          },
          // {
          //   title: "填报人",
          //   key: "sendByName",
          //   width: 120,
          // },
        ],
        data: [],
        totalCount: 0,
        // 处理状态
        SendStatusFinishedList:[
          {
            type:'true',
            name:'跟进完成'
          },
          {
            type:'false',
            name:'跟进失败'
          }
        ]
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 姓名
        name: "",
        // 简码
        simpleCode: "",
        // 展示方向
        showDirectionType:"",
        id: "",
        // 是否有效
        valid: false,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入分类名称",
          },
        ],
        simpleCode: [
          {
            required: true,
            message: "请输入简码",
          },
        ],
        showDirectionType: [
          {
            required: true,
            message: "请选择商品展示方向",
          },
        ],
      },
    };
  },
  methods: {
    
    // 获取提报列表
    gethospitalDealedListWithPage() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, startDate, endDate, isSendStatusFinished} = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        isSendStatusFinished
      };
      api.hospitalDealedListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackReportedInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取提报列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, startDate, endDate,isSendStatusFinished } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
        isSendStatusFinished
      };
      api.hospitalDealedListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackReportedInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
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
    // this.getGoodsCategoryList();
    // this.getExchangeTypeList()
  },
  watch:{
    activeName: {
      handler(value) {
        if (value === "processedFollowUpReport") {
          this.gethospitalDealedListWithPage();
        }
      },
      immediate: true,
    },
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}


</style>
