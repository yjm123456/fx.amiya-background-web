<template>
  <div>
    <div class="title">今日到院</div>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="300"></Table>
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
      <!--客户信息  -->
      <customerMessage
        :customerMessageModel.sync="customerMessageModel"
        :customerMessageObj="customerMessageObj"
        :customerInfoComParams2="customerInfoComParams2"
      ></customerMessage>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/assistantHomePage";
import * as customerManageApi from "@/api/customerManage";

import customerMessage from "@/components/customerMessage/customerMessage";
export default {
  props: {
    queryParams: Object,
  },
  components: {
    customerMessage,
  },
  data() {
    return {
      // 客户信息组件参数
      customerInfoComParams2: {
        userId: "",
        encryptPhone: "",
        tabGlag: false,
      },
      // 客户信息
      customerMessageObj: {},
      customerMessageModel: false,
      // 查询
      query: {
        pageNum: 1,
        pageSize: 5,
        columns: [
          {
            title: "客户姓名",
            key: "name",
            minWidth: 100,
            align: "center",
            tooltip: true,
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 150,
            align: "center",
            tooltip: true,
          },
          {
            title: "助理",
            key: "assistantName",
            minWidth: 100,
            align: "center",
            tooltip: true,
          },
          {
            title: "派单机构",
            key: "sendHospital",
            minWidth: 180,
            align: "center",
            tooltip: true,
          },
          {
            title: "状态",
            key: "status",
            minWidth: 100,
            align: "center",
            tooltip: true,
          },
          {
            title: "下单金额",
            key: "addOrderPrice",
            minWidth: 120,
            align: "center",
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
            title: "新老客业绩",
            key: "isOldCustomer",
            minWidth: 150,
            align: "center",
            tooltip: true,
          },
          {
            title: "操作",
            key: "",
            width: 100,
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
                        const { userId, encryptPhone } = params.row;
                        let data = {
                          encryptPhone: encryptPhone,
                        };
                        customerManageApi
                          .getBaseAndBindCustomerInfoByEncryptPhone(data)
                          .then((res) => {
                            if (res.code === 0) {
                              this.customerInfoComParams2.userId = userId;
                              this.customerInfoComParams2.encryptPhone = encryptPhone;
                              this.customerInfoComParams2.tabGlag = true;
                              this.customerMessageModel = true;
                              this.customerMessageObj = res.data.customer;
                            }
                          });
                      },
                    },
                  },
                  "详情"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
    };
  },
  methods: {
    // 获取今日到院列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        date,
        baseLiveAnchorId,
        contentPlatformId,
        liveAnchorId,
        wechatNoId,
        source,
        assistantId,
      } = this.queryParams;
      const data = {
        date: this.$moment(date).format("YYYY-MM-DD"),
        baseLiveAnchorId: baseLiveAnchorId == -1 ? null : baseLiveAnchorId,
        contentPlatformId: contentPlatformId == -1 ? null : contentPlatformId,
        liveAnchorId,
        wechatNoId: wechatNoId == -1 ? null : wechatNoId,
        source: source == -1 ? null : source,
        assistantId: assistantId == -1 ? null : assistantId,
        pageNum: this.query.pageNum,
        pageSize: this.query.pageSize,
      };
      api.todayToHospitalData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.todayToHospitalData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取今日到院列表分页
    handlePageChange(pageNum) {
      const {
        date,
        baseLiveAnchorId,
        contentPlatformId,
        liveAnchorId,
        wechatNoId,
        source,
        assistantId,
      } = this.queryParams;
      const data = {
        date: this.$moment(date).format("YYYY-MM-DD"),
        baseLiveAnchorId: baseLiveAnchorId == -1 ? null : baseLiveAnchorId,
        contentPlatformId: contentPlatformId == -1 ? null : contentPlatformId,
        liveAnchorId,
        wechatNoId: wechatNoId == -1 ? null : wechatNoId,
        source: source == -1 ? null : source,
        assistantId: assistantId == -1 ? null : assistantId,
        pageNum: pageNum,
        pageSize: this.query.pageSize,
      };
      api.todayToHospitalData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.todayToHospitalData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  created() {
    // this.getHospitalInfo();
    // this.getLogisticsCompanyList()
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
  margin-top: 10px;
}
.page_wrap {
  margin-top: 10px;
  text-align: right;
}
.title {
  font-size: 15px;
  font-weight: bold;
  color: #000;
}
</style>
