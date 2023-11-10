<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getshortVideoData()"
          />
          <Select
            v-model="query.liveAnchorId"
            placeholder="请选择主播IP账号"
            filterable
            style="width: 180px; margin-left: 10px"
          >
            <Option
              v-for="item in liveAnchors"
              :value="item.id"
              :key="item.id"
              >{{ item.hostAccountName }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getshortVideoData()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="refreshClick()"
            >刷新</Button
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
          show-sizer
          :page-size-opts="[10,50, 100, 200, 400]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/feishuMultidimensionalTable";
import * as apis from "@/api/baseDataMaintenance";
import * as orderApi from "@/api/orderManage";
export default {
  data() {
    return {
      // 查询
      query: {
        keyWord: "",
        liveAnchorId:null,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "归属主播",
            key: "liveAnchorName",
            minWidth: 100,
            align: "center",
          },
          {
            title: "视频标题",
            key: "title",
            minWidth: 600,
            tooltip: true,
          },
          {
            title: "播放次数",
            key: "playNum",
            minWidth: 100,
            align: "center",
          },
          {
            title: "点赞数",
            key: "like",
            minWidth: 100,
            align: "center",
          },
          {
            title: "评论数",
            key: "comments",
            minWidth: 100,
            align: "center",
          },
        ],
        data: [],
        totalCount: 0,
      },
      //   主播
      liveAnchors: [],
    };
  },
  methods: {
    // 刷新
    refreshClick(){
      api.refreshData().then((res) => {})
    },
    // 获取抖音短视频列表
    getshortVideoData() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyWord,liveAnchorId } = this.query;
      const data = { pageNum, pageSize, keyWord,liveAnchorId };
      api.shortVideoData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.videoData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取抖音短视频列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyWord,liveAnchorId } = this.query;
      const data = { pageNum, pageSize, keyWord ,liveAnchorId};
      api.shortVideoData(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.videoData;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getshortVideoData();
    },
    // 获取平台列表（下拉框）
    getProvince() {
      apis.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.getLiveValidList(
            contentPalteForms.find((item) => item.contentPlatformName == "抖音")
              .id
          );
        }
      });
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      orderApi.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
  },
  created() {
    this.getshortVideoData();
    this.getProvince();
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
