<template>
  <div>
    <Card>
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
      @on-visible-change="handleItemInfoModalChange"
    >
      <div>
        <Input
          v-model="itemInfo.keyword"
          style="width: 200px"
          placeholder="请输入项目名称"
          @keyup.enter.native="byActivityIdGetOfferItemList()"
        />
      </div>
      <div style="margin-top: 10px">
        <Table
          border
          :columns="itemInfo.columns"
          :data="itemInfo.data"
          @on-select="handleSelectItem"
          @on-select-cancel="handleCancelSelectItem"
          @on-select-all="handleSelectAllItem"
          @on-select-all-cancel="handleSelectAllIteCancel"
          ref="selection"
        ></Table>
      </div>
      <div class="page_wrap">
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <div style="margin-top:10px;color:red">*注：项目参与报价后修改需提交审核流程，请谨慎填写！</div>
          <span>
            <!-- <Page
              ref="itemListPage"
              :current="itemInfo.pageNum"
              :page-size="itemInfo.pageSize"
              :total="itemInfo.totalCount"
              show-total
              show-elevator
              @on-change="handleItemListPageChange"
            /> -->
            <Page
              ref="itemListPage"
              :current="itemInfo.pageNum"
              :page-size="itemInfo.pageSize"
              :total="itemInfo.totalCount"
              show-total
              show-sizer
              :page-size-opts="[100,200,500]"
              @on-change="handlePageChange"
              @on-page-size-change="handlePageSizeChange"
            />
          </span>
        </div>
      </div>
      <div slot="footer">
        <Button @click="handleCancelClick">取消</Button>
        <Button type="primary" @click="handleSubmitClick">确定</Button>
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
                        this.byActivityIdGetOfferItemList(() => {
                          this.itemInfo.controlModal = true;
                        });
                      },
                    },
                  },
                  "选择项目"
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
        pageSize: 100,
        totalCount: 0,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
          },
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
          // {
          //   title: "日常价",
          //   key: "salePrice",
          // },
          {
            title: "采购价",
            key: "livePrice",
          },
          {
              title: "是否同意采购价",
              align: "center",
              width:200,
              render :(h , params)=> {
                  return h(
                      "i-switch",{
                      props: {
                      value: params.row.isAgreeLivingPrice,
                      size:"default",
                      },
                      on : {
                        "on-change" : (value) => {
                            if(value===true){
                              // 如果是选中状态 取得是直播价livePrice
                                 this.itemInfo.data[params.index].isAgreeLivingPrice = value;
                                 this.itemInfo.data[params.index].hospitalPrice = params.row.livePrice;
                            }else{
                                 this.itemInfo.data[params.index].isAgreeLivingPrice = value;
                                 this.itemInfo.data[params.index].hospitalPrice = this.itemInfo.itemIds[params.index]?this.itemInfo.itemIds[params.index].hospitalPrice:params.row.livePrice
                            }
                            
                        }
                      }
                  },
                  
                )
              }
            },
            {
            title: "医院价格",
            align: "center",
            width: 150,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  // 如果是选中状态 展示根据id获取到的参数 未选中则展示直播价
                    value:  params.row._checked === true ?  params.row.hospitalPrice : params.row.livePrice,
                   disabled:this.itemInfo.data[params.index].isAgreeLivingPrice === true
                },
                style: {
                  width: "100px",
                },
                on: {
                  "on-change": (value) => {
                    this.itemInfo.data[params.index].hospitalPrice = value;
                  },
                },
              });
            },
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
        itemIds: new Set(),
      },
    };
  },
  methods: {
    getValidActivityInfoList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
      };
      api.getValidActivityInfoList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activity;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
      };
      api.getValidActivityInfoList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activity;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    handlePageSizeChange(pageSize){
      this.itemInfo.pageSize = pageSize
      this.byActivityIdGetOfferItemList()
    },

    // 根据活动编号获取报价项目列表（分页）
    byActivityIdGetOfferItemList(callback) {
      this.$nextTick(() => {
        this.$refs["itemListPage"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize, activityId } = this.itemInfo;
      const data = {
        keyword,
        pageNum,
        pageSize,
        activityId,
      };
      api.byActivityIdGetOfferItemList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activityDetail;
          this.theActivityExistenceOfItemList(activityId, (itemIds) => {
            for (let i = 0; i < list.length; i++) {
                  list[i]._checked = false;
                  list[i].hospitalPrice = list[i].livePrice
                  list[i].isAgreeLivingPrice = false
              for (let j = 0; j < itemIds.length; j++) {
                if (list[i].itemId === itemIds[j].id) {
                  list[i]._checked = true;
                  list[i].hospitalPrice = itemIds[j].hospitalPrice
                  list[i].isAgreeLivingPrice = itemIds[j].isAgreeLivingPrice
                  list[i].itemId = itemIds[j].id
                }
              }
            }
            
            this.itemInfo.data = list;
            this.itemInfo.itemIds = itemIds
            this.itemInfo.totalCount = totalCount;
            callback && callback();
          });
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
      api.byActivityIdGetOfferItemList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.activityDetail;
          this.theActivityExistenceOfItemList(activityId, (itemIds) => {
            for (let i = 0; i < list.length; i++) {
                  list[i]._checked = false;
                  list[i].hospitalPrice = list[i].livePrice
                  list[i].isAgreeLivingPrice = false
              for (let j = 0; j < itemIds.length; j++) {
                if (list[i].itemId === itemIds[j].id) {
                  list[i]._checked = true;
                  list[i].hospitalPrice = itemIds[j].hospitalPrice
                  list[i].isAgreeLivingPrice = itemIds[j].isAgreeLivingPrice
                  list[i].itemId = itemIds[j].id
                }
              }
            }
            this.itemInfo.data = list;
            this.itemInfo.itemIds = itemIds
            this.itemInfo.totalCount = totalCount;
          });
        }
      });
    },

    // 该活动存在的项目
    theActivityExistenceOfItemList(activityId, callback) {
      api.theActivityExistenceOfItemList(activityId).then((res) => {
        if (res.code === 0) {
          const { itemIds } = res.data;
          callback && callback(itemIds);
        }
      });
    },

    // 选择项目
    handleSelectItem(selection, row) {
       this.itemInfo.data.map((item,index)=>{
		  if(item.id==row.id){
			  item._checked = !item._checked
		  }
	  })
	 
    },
    // 取消选择项目
    handleCancelSelectItem(selection, row) {
	  this.itemInfo.data.map((item,index)=>{
		  if(item.id==row.id){
			  item._checked = !item._checked
			  item.isAgreeLivingPrice = false
		  }
	  })
    },

    // 选择全部项目
    handleSelectAllItem(selection) {
     this.itemInfo.data.map((item,index)=>{
		 item._checked = true
	 })
    },
	//取消选择全部项目
	handleSelectAllIteCancel(selection) {
		this.itemInfo.data.map((item,index)=>{
			item._checked = false
			item.isAgreeLivingPrice = false
		})
    },
    // 取消提交
    handleCancelClick() {
      // 关闭弹框
      this.itemInfo.controlModal = false;
      // 重置itemIds
      // this.itemInfo.itemIds.clear();
    },

    // 确认提交
    handleSubmitClick() {
	  let sendLists = []
		this.itemInfo.data.map((item)=>{
			if(item._checked){
				let obj = {
					itemId:item.itemId,
					isAgreeLivingPrice:item.isAgreeLivingPrice,
					hospitalPrice:item.hospitalPrice
				}
				sendLists.push(obj)
			}
		})
		if(sendLists.length){
			 const data = {
				activityId: this.itemInfo.activityId,
				itemInfoList: sendLists,
			};
			api.hospitalPartakeItem(data).then((res) => {
				if (res.code === 0) {
					this.getValidActivityInfoList();
					this.handleCancelClick();
          // this.byActivityIdGetOfferItemList()
					this.$Message.success({
					content: "添加成功",
					duration: 3,
					});
				}
			})
		}else{
			this.$Message.warning({
              content: "请选择项目",
              duration: 3,
            });
		}
    },

    // modal显示/关闭
    handleItemInfoModalChange(value) {
      if (value === false) {
        this.itemInfo.keyword = "";
      }
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "validActivity") {
          this.getValidActivityInfoList();
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
  align-items: center;
  
}
</style>
