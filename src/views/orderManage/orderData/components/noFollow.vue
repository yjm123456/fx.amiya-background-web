<template>
  <div>
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="295" ></Table>
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
    activeName: String,
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
      customerMessageModel:false,
      // 查询
      query: {
        pageNum: 1,
        pageSize: 5,
        columns: [
          {
            title: "电话",
            key: "phone",
            minWidth: 150,
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
            title: "回访人",
            key: "trackAssistantName",
            minWidth: 100,
            align: "center",
            tooltip: true,
          },
          {
            title: "回访目的",
            key: "trackPurpose",
            minWidth: 180,
            align: "center",
            tooltip: true,
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
            width: 100,
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
    // 获取今日回访列表
    gettodayTrackData() {
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
        type: this.activeName == "noFollow" ? 1 : 2,
      };
      api.todayTrackData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.todayTrackData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取今日回访列表分页
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
        type: this.activeName == "noFollow" ? 1 : 2,
      };
      api.todayTrackData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.todayTrackData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  created() {
    // this.gettodayTrackData();
    // this.getLogisticsCompanyList()
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "noFollow") {
          this.gettodayTrackData();
          return;
        } else if (value === "followed") {
          this.gettodayTrackData();
          return;
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
