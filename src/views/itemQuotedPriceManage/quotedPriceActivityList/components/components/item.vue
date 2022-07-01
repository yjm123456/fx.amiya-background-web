<template>
  <div>
    <!-- 搜索 -->
    <div>
      <Input
        v-model="keyword"
        placeholder="项目名称"
        style="width: 200px"
        @keyup.enter.native="getItemInfo()"
      />
      <Button type="primary" style="margin-left: 10px" @click="getItemInfo()"
        >查询</Button
      >
      <Button type="primary" style="margin-left: 10px" @click="submit()"
        >添加</Button
      >
    </div>
    <!-- 列表 -->
    <div style="margin-top: 10px">
      <Table
        border
        :columns="columns"
        :data="data"
        height="671"
        @on-select="handleSelectItem"
        @on-select-cancel="handleCancelSelectItem"
        @on-select-all="handleSelectAllItem"
        @on-select-all-cancel="handleSelectAllItem"
        ref="selection"
      ></Table>
    </div>
    <div class="page">
      <span>
        <Page
          ref="page"
          :current="pageNum"
          :page-size="pageSize"
          :total="totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </span>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/itemQuotedPriceManage";
export default {
  props: {
    // 已选中项目
    selectedItemList: Array,
    // 当前删除的项目编号
    itemId: Number,
  },
  data() {
    return {
      keyword: "",
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      columns: [
        {
          type: "selection",
          key: "_checked",
          align: "center",
          minWidth: 100,
        },
        {
          title: "商品",
          key: "thumbPicUrl",
          minWidth: 300,
          render: (h, params) => {
            return h(
              "viewer",
              {
                props: {
                  options: {
                    toolbar: false,
                    title: false,
                    navbar: false,
                  },
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
                h("div", params.row.name),
              ]
            );
          },
        },
        {
          title: "简介",
          key: "description",
          minWidth: 200,
        },
        {
          title: "规格",
          key: "standard",
          minWidth: 100,
        },
        {
          title: "日常价",
          key: "salePrice",
          minWidth: 100,
        },
        {
          title: "直播价",
          key: "livePrice",
          minWidth: 100,
        },
        {
          title: "是否限购",
          key: "isLimitBuy",
          minWidth: 100,
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
          minWidth: 100,
        },
      ],
      data: [],

      items: [],
    };
  },
  methods: {
    // 获取简单有效的项目列表
    getItemInfo() {
      this.$nextTick(() => {
        this.$refs["page"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize } = this;
      const data = {
        keyword,
        pageNum,
        pageSize,
      };
      api.getItemInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.item;
          this.data = list.map((item) => {
            item._checked = false;
            this.items.forEach((item2) => {
              if (item.id === item2.id) {
                item._checked = true;
              }
            });
            return item;
          });
          this.totalCount = totalCount;
        }
      });
    },

    // 获取简单有效的项目列表（分页）
    handlePageChange(pageNum) {
      const { keyword, pageSize } = this;
      const data = {
        keyword,
        pageNum,
        pageSize,
      };
      api.getItemInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.item;
          this.data = list.map((item) => {
            item._checked = false;
            this.items.forEach((item2) => {
              if (item.id === item2.id) {
                item._checked = true;
              }
            });
            return item;
          });
          this.totalCount = totalCount;
        }
      });
    },

    // 选择项目
    handleSelectItem(selection, row) {
      // 找到对应_checked设置为true
      const findIndex = this.data.findIndex((item) => item.id === row.id);
      if (findIndex > -1) {
        this.data[findIndex]._checked = true;
      }

      // 添加
      this.items = [...this.items, row];
    },

    // 取消选择项目
    handleCancelSelectItem(selection, row) {
      // 找到对应_checked设置为false
      const findIndex = this.data.findIndex((item) => item.id === row.id);
      if (findIndex > -1) {
        this.data[findIndex]._checked = false;
      }

      // 删除
      const deleteIndex = this.items.findIndex((item) => item.id === row.id);
      if (deleteIndex > -1) {
        this.items.splice(deleteIndex, 1);
      }
    },

    // 选择全部项目/取消选择全部项目
    handleSelectAllItem(selection) {
      if (selection && selection.length === 0) {
        // 设置_checked
        this.$refs.selection.data.forEach((item) => {
          item._checked = false;
        });
        // 全部删除
        for (let i = this.items.length - 1; i > -1; i--) {
          for (let j = this.$refs.selection.data.length - 1; j > -1; j--) {
            if (this.items[i] && this.$refs.selection.data[j]) {
              if (this.items[i].id === this.$refs.selection.data[j].id) {
                this.items.splice(i, 1);
              }
            }
          }
        }
      } else {
        // 设置_checked
        this.$refs.selection.data.forEach((item) => {
          item._checked = true;
        });

        // 全部添加
        this.items = [...this.items, ...selection];
        this.removeRepeat();
      }
    },

    // 去重
    removeRepeat() {
      const result = [];
      const obj = {};
      for (let i = 0; i < this.items.length; i++) {
        if (!obj[this.items[i].id]) {
          result.push(this.items[i]);
          obj[this.items[i].id] = true;
        }
      }
      this.items = result;
    },

    // 提交
    submit() {
      if (!this.items.length) {
        this.$Message.error({
          content: "请选择项目",
          duration: 5,
        });
        return;
      }
      const items = this.items.map((item) => {
        return {
          ...item,
          itemId: item.id,
        };
      });
      this.$emit("handleSelectItem", items);
    },
  },
  watch: {
    selectedItemList() {
      this.items = JSON.parse(JSON.stringify(this.selectedItemList)).map(
        (item) => {
          return {
            ...item,
            id: item.itemId,
          };
        }
      );
      this.getItemInfo();
    },

    itemId(itemId) {
      // _checked重置为false
      const findIndex = this.data.findIndex((item) => item.id === itemId);
      if (findIndex !== -1) {
        this.data[findIndex]._checked = false;
      }

      // 删除对应选中的项目
      const deleteIndex = this.items.findIndex((item) => item.id === itemId);
      if (deleteIndex !== -1) {
        this.items.splice(deleteIndex, 1);
      }
    },
  },
};
</script>
<style lang='less' scoped>
.page {
  margin-top: 10px;
  text-align: right;
}
</style>