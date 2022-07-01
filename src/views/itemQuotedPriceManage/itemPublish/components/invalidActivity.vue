<template>
  <div>
    <Card :dis-hover="true">
      <div>
        <Input
          v-model="query.keyword"
          placeholder="请输入客户名称"
          style="width: 200px; margin-right: 10px"
          @keyup.enter.native="getHospitalPartakeActivityList()"
        />
        <Button type="primary" @click="getHospitalPartakeActivityList()"
          >查询</Button
        >
      </div>
    </Card>
    <Card style="margin-top: 10px">
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

    <Modal
      v-model="itemInfo.controlModal"
      title="项目列表"
      :mask-closable="false"
      width="80%"
      footer-hide
    >
      <div>
        <Input
          v-model="itemInfo.keyword"
          style="width: 200px"
          placeholder="请输入项目名称"
          @keyup.enter.native="byActivityIDgETHospitalPartakeItem()"
        />
      </div>
      <div style="margin-top: 10px">
        <Table border :columns="itemInfo.columns" :data="itemInfo.data"></Table>
      </div>
      <div class="page_wrap">
        <span>
          <Page
            ref="itemListPage"
            :current="itemInfo.pageNum"
            :page-size="itemInfo.pageSize"
            :total="itemInfo.totalCount"
            show-total
            show-elevator
            @on-change="handleItemListPageChange"
          />
        </span>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/itemQuotedPriceManage";
export default {
  props: ["activeName"],
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "报价名称",
            key: "name",
          },
          {
            title: "描述",
            key: "description",
          },
          {
            title: "开始时间",
            key: "startDate",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.startDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "结束时间",
            key: "endDate",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.endDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "操作",
            key: "",
            width: 150,
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
                        const { id } = params.row;
                        this.itemInfo.activityId = id;
                        this.byActivityIDgETHospitalPartakeItem(() => {
                          this.itemInfo.controlModal = true;
                        });
                      },
                    },
                  },
                  "查看已参与项目"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 项目信息
      itemInfo: {
        controlModal: false,
        keyword: "",
        activityId: "",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            title: "项目",
            key: "thumbPicUrl",
            width: 400,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                  style: {
                    display: "flex",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 0",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                  h("div", params.row.name),
                ]
              );
            },
          },
          {
            title: "简介",
            key: "description",
          },
          {
            title: "规格",
            key: "standard",
          },
          {
            title: "日常价",
            key: "salePrice",
          },
          {
            title: "直播价",
            key: "livePrice",
          },
          {
            title: "是否同意直播价",
            key: "isAgreeLivingPrice",
            align:'center',
            render :(h , params)=> {
                return h(
                    "i-switch",{
                    props: {
                    value: params.row.isAgreeLivingPrice,
                    size:"default",
                    disabled:params.row.isAgreeLivingPrice===true || params.row.isAgreeLivingPrice===false
                    },
                    
                },
                h("span", {isAgreeLivingPrice: "open"},"开"),
                h("span", {isAgreeLivingPrice: "close"},"关")
              )
            }
          },
          {
            title: "医院提报价格",
            key: "hospitalPrice",
          },
          {
            title: "是否限购",
            key: "isLimitBuy",
            render: (h, params) => {
              if (params.row.isLimitBuy == true) {
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
            title: "限购数量",
            key: "limitBuyQuantity",
          },
        ],
        data: [],
      },
    };
  },
  methods: {
    getHospitalPartakeActivityList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
      };
      api.getHospitalPartakeActivityList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activity;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { pageSize, keyword } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
      };
      api.getHospitalPartakeActivityList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activity;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    byActivityIDgETHospitalPartakeItem(callback) {
      const { keyword, pageNum, pageSize, activityId } = this.itemInfo;
      const data = {
        keyword,
        pageNum,
        pageSize,
        activityId,
      };
      api.byActivityIDgETHospitalPartakeItem(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalPartakeItem;
          this.itemInfo.data = list;
          this.itemInfo.totalCount = totalCount;
          callback && callback();
        }
      });
    },

    handleItemListPageChange(pageNum) {
      const { keyword, pageSize, activityId } = this.itemInfo;
      const data = {
        keyword,
        pageNum,
        pageSize,
        activityId,
      };
      api.byActivityIDgETHospitalPartakeItem(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalPartakeItem;
          this.itemInfo.data = list;
          this.itemInfo.totalCount = totalCount;
        }
      });
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "invalidActivity") {
          this.getHospitalPartakeActivityList();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
