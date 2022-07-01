<template>
  <div>
    <Card :dis-hover="true">
      <div class="search_wrap">
        <!-- 活动 -->
        <dropDown
          :itemlist="activityInfo.list"
          @prevePage="handleActivityPrevePage"
          @nextPage="handleActivityNextPage"
          @searchChange="handleActivitySearchChange"
          @selectChange="handleActivitySelectChange"
          :isNeedSearch="true"
          :isNeedPage="true"
          :pageNum="activityInfo.pageNum"
          :pageCount="activityInfo.pageCount"
          placeholder="请选择报价名称"
          searchPlaceholder="请输入报价名称"
          style="width:300px"
        ></dropDown>
        <!-- 医院 -->
        <dropDown
          style="margin-left: 10px;width:300px"
          :itemlist="hospitalList"
          @selectChange="handleHospitalSelectChange"
          @searchChange="handleHospitalSearchChange"
          placeholder="请选择医院"
          isNeedSearch
          searchPlaceholder="请输入医院名称"
        ></dropDown>
        <!-- 查询 -->
        <span
          ><Button
            type="primary"
            style="margin-left: 10px"
            @click="handleSearchClick"
            >查询</Button
          ></span
        >
        <!-- 导出 -->
        <span
          ><Button
            type="primary"
            style="margin-left: 10px"
            @click="handleExportClick"
            >导出</Button
          ></span
        >
      </div>
    </Card>
    <Card style="margin-top: 10px">
      <div>
        <Table
          border
          :columns="hospitalInfo.columns"
          :data="hospitalInfo.list"
        ></Table>
      </div>
      <div class="page_wrap">
        <!-- <Page
          ref="pages"
          :current="hospitalInfo.pageNum"
          :page-size="hospitalInfo.pageSize"
          :total="hospitalInfo.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        /> -->
        <Page
          ref="pages"
          :current="hospitalInfo.pageNum"
          :page-size="hospitalInfo.pageSize"
          :total="hospitalInfo.totalCount"
          show-total
          show-sizer
          :page-size-opts="[10,30,50,100,300]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/itemQuotedPriceManage";
import dropDown from "@/components/dropDown/dropDown";
import { download } from "@/utils/util";
export default {
  props: {
    activeName: String,
  },
  components: {
    dropDown,
  },
  data() {
    return {
      // 活动信息
      activityInfo: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        list: [],
        totalCount: 0,
        pageCount: 0,
      },

      // 医院信息
      searchHospitalKeyword:"",
      hospitalList: [],

      hospitalInfo: {
        activityId: null,
        hospitalId: null,
        pageNum: 1,
        pageSize: 10,
        list: [],
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
            width: 300,
          },
          {
            title: "规格",
            key: "standard",
            align:'center',
          },
          // {
          //   title: "日常价",
          //   key: "salePrice",
          // },
          {
            title: "是否限购",
            key: "isLimitBuy",
            align:'center',
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
            align:'center',
          },
           {
            title: "是否同意直播价",
            key: "isAgreeLivingPrice",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.isAgreeLivingPrice === false ? '否' : '是'
              );
            },
          },
          {
            title: "直播价",
            key: "livePrice",
            align:'center',
          },
          {
            title: "医院提报价格",
            key: "hospitalPrice",
            align:'center',
          },
          
        ],
        totalCount: 0,
      },
    };
  },
  methods: {
    /**
     * 活动
     */
    // 活动列表
    getAllActivityList() {
      const { keyword, pageNum, pageSize } = this.activityInfo;
      api.getAllActivityList({ keyword, pageNum, pageSize }).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activitys;
          const allObj = { name: "全部报价", id: -1 };
          this.activityInfo.list = [allObj, ...list];
          this.activityInfo.totalCount = totalCount;
          this.activityInfo.pageCount = Math.ceil(totalCount / 10);
        }
      });
    },
    // 上一页
    handleActivityPrevePage() {
      if (this.activityInfo.pageNum === 1) return;
      --this.activityInfo.pageNum;
      if (this.activityInfo.pageNum < 1) {
        this.activityInfo.pageNum = 1;
      }
      this.getAllActivityList();
    },
    // 下一页
    handleActivityNextPage() {
      if (this.activityInfo.pageNum < this.activityInfo.pageCount) {
        ++this.activityInfo.pageNum;
        this.getAllActivityList();
      }
    },
    // 搜索
    handleActivitySearchChange(query) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.activityInfo.keyword = query;
        this.getAllActivityList();
      }, 300);
    },
    // 选择
    handleActivitySelectChange(selectd) {
      const { id } = selectd;
      this.hospitalInfo.activityId = id;
    },

    /**
     * 医院
     */
    // 医院列表
    getAllHospitalList() {
      const data = {
        name:this.searchHospitalKeyword
      }
      api.getAllHospitalList(data).then((res) => {
        if (res.code === 0) {
          this.hospitalList = res.data.hospitalInfo;
        }
      });
    },

    // 选择
    handleHospitalSelectChange(selectd) {
      const { id } = selectd;
      this.hospitalInfo.hospitalId = id;
    },

    // 搜索
    handleHospitalSearchChange(query) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.searchHospitalKeyword = query;
        this.getAllHospitalList();
      }, 300);
    },

    // 查询
    handleSearchClick() {
      const { hospitalId } = this.hospitalInfo;
      if (!hospitalId) {
        this.$Message.warning({
          content: "请选择医院",
          duration: 5,
          closable: true,
        });
        return;
      }
      this.byHospitalIdGetPartakeItemList();
    },

    // 导出
    handleExportClick() {
      const { activityId, hospitalId } = this.hospitalInfo;
      if (!hospitalId) {
        this.$Message.warning({
          content: "请选择医院",
          duration: 5,
          closable: true,
        });
        return;
      }
      const data = {
        activityId: activityId === -1 ? null : activityId,
        hospitalId,
      };
      api.byHospitalIdExportPartakeItem(data).then((res) => {
        download(res);
      });
    },

    // 根据医院编号获取参与的项目列表
    byHospitalIdGetPartakeItemList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { activityId, hospitalId, pageNum, pageSize } = this.hospitalInfo;
      const data = {
        activityId: activityId === -1 ? null : activityId,
        hospitalId,
        pageNum,
        pageSize,
      };
      api.byHospitalIdGetPartakeItemList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.partakeItems;
          this.hospitalInfo.list = list;
          this.hospitalInfo.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { activityId, hospitalId, pageSize } = this.hospitalInfo;
      const data = {
        activityId: activityId === -1 ? null : activityId,
        hospitalId,
        pageNum,
        pageSize,
      };
      api.byHospitalIdGetPartakeItemList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.partakeItems;
          this.hospitalInfo.list = list;
          this.hospitalInfo.totalCount = totalCount;
        }
      });
    },
    handlePageSizeChange(pageSize){
      this.hospitalInfo.pageSize = pageSize
      this.byHospitalIdGetPartakeItemList()
    }
  },
  watch: {
    activeName: {
      immediate: true,
      handler(name) {
        if (name === "hospital") {
          this.getAllActivityList();
          this.getAllHospitalList();
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.search_wrap {
  display: flex;
  align-items: center;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>