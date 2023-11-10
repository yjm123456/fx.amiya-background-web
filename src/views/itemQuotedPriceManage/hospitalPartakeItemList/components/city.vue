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
        <!-- 项目 -->
        <dropDown
          style="margin-left: 10px;width:300px"
          :itemlist="itemInfo.list"
          @prevePage="handleItemPrevePage"
          @nextPage="handleItemNextPage"
          @searchChange="handleItemSearchChange"
          @selectChange="handleItemSelectChange"
          :isNeedSearch="true"
          :isNeedPage="true"
          :pageNum="itemInfo.pageNum"
          :pageCount="itemInfo.pageCount"
          placeholder="请选择项目"
          searchPlaceholder="请输入项目名称"
        ></dropDown>
        <!-- 城市 -->
        <dropDown
          style="margin-left: 10px;width:300px"
          :itemlist="cityList"
          @selectChange="handleCitySelectChange"
          @searchChange="handleCitySearchChange"
          placeholder="请选择城市"
          isNeedSearch
          searchPlaceholder="请输入城市名称"
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
            v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
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

      // 项目信息
      itemInfo: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        list: [],
        totalCount: 0,
        pageCount: 0,
      },

      // 城市信息
      searchCityKeyword:"",
      cityList: [],

      hospitalInfo: {
        activityId: null,
        itemId: null,
        cityId: null,
        pageNum: 1,
        pageSize: 10,
        list: [],
        columns: [
          {
            title: "logo",
            key: "thumbPicUrl",
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
                      margin: "5px 15px 5px 5px",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                ]
              );
            },
          },
          {
            title: "医院",
            key: "name",
          },
          {
            title: "地址",
            key: "address",
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
            key: "livingPrice",
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
          // const allObj = { name: "全部活动", id: -1 };
          // this.activityInfo.list = [allObj, ...list];
          this.activityInfo.list = list;
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
     * 项目
     */
    // 项目列表
    getAllItemList() {
      const { keyword, pageNum, pageSize } = this.itemInfo;
      api.getAllItemList({ keyword, pageNum, pageSize }).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.items;
          this.itemInfo.list = list;
          this.itemInfo.totalCount = totalCount;
          this.itemInfo.pageCount = Math.ceil(totalCount / 10);
        }
      });
    },
    // 上一页
    handleItemPrevePage() {
      if (this.itemInfo.pageNum === 1) return;
      --this.itemInfo.pageNum;
      if (this.itemInfo.pageNum < 1) {
        this.itemInfo.pageNum = 1;
      }
      this.getAllItemList();
    },
    // 下一页
    handleItemNextPage() {
      if (this.itemInfo.pageNum < this.itemInfo.pageCount) {
        ++this.itemInfo.pageNum;
        this.getAllItemList();
      }
    },
    // 搜索
    handleItemSearchChange(query) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.itemInfo.keyword = query;
        this.getAllItemList();
      }, 300);
    },
    // 选择
    handleItemSelectChange(selectd) {
      const { id } = selectd;
      this.hospitalInfo.itemId = id;
    },

    /**
     * 城市
     */
    // 城市列表
    getAllCooperativeHospitalCity() {
      const data = {
        name:this.searchCityKeyword
      }
      api.getAllCooperativeHospitalCity(data).then((res) => {
        if (res.code === 0) {
          this.cityList = res.data.citys;
        }
      });
    },

    // 选择
    handleCitySelectChange(selectd) {
      const { id } = selectd;
      this.hospitalInfo.cityId = id;
    },

    // 搜索
    handleCitySearchChange(query) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.searchCityKeyword = query;
        this.getAllCooperativeHospitalCity();
      }, 300);
    },

    // 查询
    handleSearchClick() {
      const { itemId, cityId , activityId } = this.hospitalInfo;
      if (!activityId) {
        this.$Message.warning({
          content: "请选择报价",
          duration: 5,
          closable: true,
        });
        return;
      }
      // if (!itemId) {
      //   this.$Message.warning({
      //     content: "请选择项目",
      //     duration: 5,
      //     closable: true,
      //   });
      //   return;
      // }
      // if (!cityId) {
      //   this.$Message.warning({
      //     content: "请选择城市",
      //     duration: 5,
      //     closable: true,
      //   });
      //   return;
      // }
      this.byCityIdAndItemIdGetPartakeHospitalList();
    },

    // 导出
    handleExportClick() {
      const { activityId, itemId, cityId } = this.hospitalInfo;
      if (!activityId) {
        this.$Message.warning({
          content: "请选择报价名称",
          duration: 5,
          closable: true,
        });
        return;
      }
      // if (!cityId) {
      //   this.$Message.warning({
      //     content: "请选择城市",
      //     duration: 5,
      //     closable: true,
      //   });
      //   return;
      // }
      const data = {
        activityId: activityId === -1 ? null : activityId,
        itemId,
        cityId,
      };
      api.byCityAndItemExportPartakeHospital(data).then((res) => {
        download(res);
      });
    },

    // 根据城市和项目获取参与的医院列表
    byCityIdAndItemIdGetPartakeHospitalList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        activityId,
        itemId,
        cityId,
        pageNum,
        pageSize,
      } = this.hospitalInfo;
      const data = {
        activityId: activityId === -1 ? null : activityId,
        cityId,
        itemId,
        pageNum,
        pageSize,
      };
      api.byCityIdAndItemIdGetPartakeHospitalList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.partakeHospitals;
          this.hospitalInfo.list = list;
          this.hospitalInfo.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { activityId, itemId, cityId, pageSize } = this.hospitalInfo;
      const data = {
        activityId: activityId === -1 ? null : activityId,
        cityId,
        itemId,
        pageNum,
        pageSize,
      };
      api.byCityIdAndItemIdGetPartakeHospitalList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.partakeHospitals;
          this.hospitalInfo.list = list;
          this.hospitalInfo.totalCount = totalCount;
        }
      });
    },
    handlePageSizeChange(pageSize){
      this.hospitalInfo.pageSize = pageSize
      const {
          activityId,
          itemId,
          cityId,
        } = this.hospitalInfo;
        if(!activityId){
           this.$Message.warning({
            content: "请先进行条件筛选",
            duration: 2,
            closable: true,
          });
          return;
        }else{
           this.handleSearchClick()
        }
    }
  },
  watch: {
    activeName: {
      immediate: true,
      handler(name) {
        if (name === "city") {
          this.getAllActivityList();
          this.getAllItemList();
          this.getAllCooperativeHospitalCity();
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