<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入商品名称"
            style="width: 200px"
            @keyup.enter.native="getGoodsInfoList()"
          />
          <Select v-model="query.valid" style="margin-left: 10px; width: 200px">
            <Option
              :value="item.value"
              v-for="item in validList"
              :key="item.value"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.categoryId"
            style="margin-left: 10px; width: 200px"
          >
            <Option
              :value="item.id"
              v-for="item in goodsCategorys"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.exchangeType"
            style="margin-left: 10px; width: 200px"
          >
            <Option
              :value="item.exchangeType"
              v-for="item in exchangeTypes"
              :key="item.exchangeType"
              >{{ item.exchangeTypeText }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getGoodsInfoList()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button type="primary" @click="getcityList()">添加</Button>
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
    <editGoodsInfo
      :controlModal.sync="controlModal"
      :goodsInfo.sync="goodsInfo"
      :cityLists = "cityLists"
      :hospitalnameList = "hospitalnameList"
      @childCity = "childCity"
    ></editGoodsInfo>
  </div>
</template>
<script>
import * as api from "@/api/goodsManage";
import editGoodsInfo from "./components/editGoodsInfo";
export default {
  components: {
    editGoodsInfo,
  },
  data() {
    return {
      // 是否有效列表
      validList: [
        {
          name: "全部",
          value: -1,
        },
        {
          name: "有效",
          value: 1,
        },
        {
          name: "无效",
          value: 0,
        },
      ],
      // 商品分类
      goodsCategorys: [
        {
          name: "全部分类",
          id: -1,
        },
      ],
      // 支付类型
      exchangeTypes: [
        {
          exchangeTypeText: "全部",
          exchangeType: "",
        },
      ],
      query: {
        exchangeType:"",
        keyword: "",
        categoryId: -1,
        valid: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "商品名称",
            key: "name",
            minWidth: 300,
          },
          {
            title: "缩略图",
            key: "thumbPicUrl",
            align: "center",
            minWidth: 150,
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
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 0",
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
            title: "规格",
            key: "standard",
            minWidth: 150,
            tooltip:true,
          },
          {
            title: "支付类型",
            key: "exchangeTypeText",
            minWidth: 150,
          },
          {
            title: "抵扣积分",
            key: "integrationQuantity",
            minWidth: 150,
          },
          {
            title: "描述",
            key: "description",
            minWidth: 150,
            tooltip:true,
          },
          {
            title: "分类",
            key: "categoryName",
            minWidth: 150,
            tooltip:true,
          },
          {
            title: "是否有效",
            key: "valid",
            minWidth: 120,
            render: (h, params) => {
              if (params.row.valid == true) {
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
            title: "库存",
            key: "inventoryQuantity",
            minWidth: 150,
          },
          {
            title: "最大价格",
            key: "maxShowPrice",
            minWidth: 150,
          },
          {
            title: "最小价格",
            key: "minShowPrice",
            minWidth: 150,
          },
          {
            title: "销售价格",
            key: "salePrice",
            minWidth: 150,
          },
          {
            title: "浏览量",
            key: "visitCount",
            minWidth: 150,
          },
          {
            title: "销量",
            key: "showSaleCount",
            minWidth: 150,
          },
          
          {
            title: "操作",
            align: "center",
            minWidth: 150,
            fixed:"right",
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
                        api.byIdGetGoodsInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.goodsInfo = res.data.goodsInfo;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "error",
                //       size: "small",
                //     },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "删除提示",
                //           content: "是否确认删除？",
                //           onOk: () => {
                //             const { id } = params.row;
                //             api.deleteAmiyaEmployee(id).then((res) => {
                //               if (res.code === 0) {
                //                 this.getGoodsInfoList();
                //                 this.$Message.success({
                //                   content: "删除成功",
                //                   duration: 3,
                //                 });
                //               }
                //             });
                //           },
                //           onCancel: () => {},
                //         });
                //       },
                //     },
                //   },
                //   "删除"
                // ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
        // 选中的城市
        checkedCityValue:""
      },

      // 控制 modal
      controlModal: false,
      goodsInfo: null,
      // 城市选择
      cityLists:[],
      // 选择医院、门店
      hospitalnameList:[]
    };
  },
  methods: {
    // 获取支付类型列表
    getExchangeTypeList() {
      api.getExchangeTypeList().then((res) => {
        if (res.code === 0) {
          this.exchangeTypes = [
            ...this.exchangeTypes,
            ...res.data.exchangeTypes,
          ];
        }
      });
    },
    // 接收子组件传过来选中的城市
    childCity(val){
      this.checkedCityValue =  val
    },
    // 城市选择
    getcityList(data){
      // 传给选择医院的弹窗做医院列表回显
      this.controlModal = true
      api.getcityList().then((res)=>{
        if(res.code === 0){
          this.cityLists = res.data.citys
        }
      })
    },
    // 获取所有的分类名称列表
    getAllGoodsCategory() {
      api.getAllGoodsCategory().then((res) => {
        if (res.code === 0) {
          this.goodsCategorys = [
            ...this.goodsCategorys,
            ...res.data.goodsCategorys,
          ];
        }
      });
    },

    // 获取所有商品列表
    getGoodsInfoList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, categoryId, valid, pageNum, pageSize ,exchangeType } = this.query;
      const data = {
        keyword,
        // -1=全部
        categoryId: categoryId === -1 ? null : categoryId,
        // -1=全部 0=无效 1=有效
        valid: valid === -1 ? null : valid === 0 ? false : true,
        pageNum,
        pageSize,
        exchangeType
      };
      api.getGoodsInfoList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.goodsInfos;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { keyword, categoryId, valid, pageSize ,exchangeType } = this.query;
      const data = {
        keyword,
        // -1=全部
        categoryId: categoryId === -1 ? null : categoryId,
        // -1=全部 0=无效 1=有效
        valid: valid === -1 ? null : valid === 0 ? false : true,
        pageNum,
        pageSize,
        exchangeType
      };
      api.getGoodsInfoList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.goodsInfos;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
  },
  created() {
    this.getAllGoodsCategory();
    this.getGoodsInfoList();
    this.getExchangeTypeList()
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
  }
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
