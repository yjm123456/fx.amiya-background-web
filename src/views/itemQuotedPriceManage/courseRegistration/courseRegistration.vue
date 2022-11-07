<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getAmiyaLessonApply()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAmiyaLessonApply()"
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
import * as api from "@/api/itemQuotedPriceManage";
export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "名字",
            key: "name",
          },
          {
            title: "手机号",
            key: "phone",
          },
          {
            title: "职位",
            key: "position",
          },
          {
            title: "城市",
            key: "city",
          },
        ],
        data: [],
        totalCount: 0,
      },


    };
  },
  methods: {
    // 获取课程报名列表
    getAmiyaLessonApply() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword} = this.query;
      const data = { pageNum, pageSize ,keyword };
      api.AmiyaLessonApply(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.amiyaLessonApplyInfos;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取课程报名列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword} = this.query;
        const data = { pageNum, pageSize ,keyword };
        api.AmiyaLessonApply(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.amiyaLessonApplyInfos;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    

 
  },
  created() {
    this.getAmiyaLessonApply();
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
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>