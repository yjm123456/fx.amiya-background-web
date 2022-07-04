<template>
  <div class="content">
    <!-- 医院端成交情况 -->
    <Modal
      title="成交情况"
      footer-hide
      v-model="transactionStatusParams.transactionStatusModel"
      width="80%"
    >
      <div>
            <Table border :columns="query.columns" :data="transactionStatusPage.data"></Table>
            <div class="page">
              <div>
                <!-- <Button type="primary" @click="lookImgChange">查看重单截图</Button> -->
              </div>
                <Page
                    ref="pages"
                    :current="transactionStatusPage.pageNum"
                    :page-size="transactionStatusPage.pageSize"
                    :total="transactionStatusPage.totalCount"
                    show-total
                    show-elevator
                    @on-change="handlePageChange"
                />
            </div>
            <div class="footer">
                <Button @click="cancel" style="margin-right: 10px">关闭页面</Button>
            </div>
      </div>
    </Modal>
    <Modal
      v-model="doubleOrderModel"
      title="重单截图"
      :mask-closable="false"
      @on-visible-change="handleModalChange"
    >
      <!-- 预览图片 -->
      <viewer v-if="query.repeateOrderPictureUrl">
        <img :src="query.repeateOrderPictureUrl" alt="" class="img" />
      </viewer>
      <div v-else style="text-align:center">暂无图片</div>
      <div slot="footer">
        <Button @click="handleModalChange()">关闭页面</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  components:{
      
  },
  props: {
    transactionStatusParams: {
      type: Object,
    },
  },
  data() {
    return {
      doubleOrderModel:false,
      transactionStatusPage: {
        pageNum: 1,
        pageSize: 10,
        data: [],
        totalCount: 0,
      },
      query:{
        repeateOrderPictureUrl:"",
        columns: [
            {
            title: "登记日期",
            key: "createDate",
            minWidth: 150,
            render: (h, params) => {
              return h("div",this.$moment(params.row.createDate).format("YYYY-MM-DD  HH:mm:ss"));
            },
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 140,
            align:'center',
            render :(h , params)=> {
                return h(
                    "i-switch",{
                    props: {
                    value: params.row.isToHospital,
                    size:"default",
                    disabled:params.row.isToHospital===true || params.row.isToHospital===false
                    },
                    
                },
                h("span", {isToHospital: "open"},"开"),
                h("span", {isToHospital: "close"},"关")
              )
            }
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 140,
            align:'center',
            render :(h , params)=> {
                return h(
                    "i-switch",{
                    props: {
                    value: params.row.isDeal,
                    size:"default",
                    disabled:params.row.isDeal===true || params.row.isDeal===false
                    },
                    
                },
                h("span", {isDeal: "open"},"开"),
                h("span", {isDeal: "close"},"关")
              )
            }
          },
          {
            title: "价格",
            key: "price",
            minWidth: 140,
          },
          
          {
            title: "成交截图",
            key: "dealPicture",
            minWidth: 200,
            render: (h, params) => {
              return params.row.dealPicture ? h("viewer",{
                  props: {
                    zoomable: false,
                  },
                  style:{
                    display:'flex'
                  }
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
                      verticalAlign: "middle"
                    },
                    attrs: {
                      src: params.row.dealPicture,
                    },
                  }),
                //   h("div", params.row.goodsName,)
                ]
              ):"";
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
          },
        ]
      }
    };
  },
  methods: {
    lookImgChange(){
      const data = {
        id:this.transactionStatusParams.contentPlatFormOrderId
      }
      api.byselectRepeateOrderPic(data).then((res) => {
        if (res.code === 0) {
          const { repeateOrderPictureUrl } = res.data;
          if (repeateOrderPictureUrl) {
            this.query.repeateOrderPictureUrl = repeateOrderPictureUrl;
            this.doubleOrderModel = true
          } else {
            this.$Message.error("暂无重单截图");
          }
        }
      });
    },
   
    // 获取成交情况列表
    geTransactionStatus() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { contentPlatFormOrderId ,isHospital} = this.transactionStatusParams;
      const { pageNum, pageSize } = this.transactionStatusPage;
      const data = {
        pageNum,
        pageSize,
        contentPlatFormOrderId,
      };
      //   等于2是医院端成交情况接口
      if(isHospital==2){
        api.hospitalContentPlatFormOrderDealInfo(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.transactionStatusPage.data = list;
            this.transactionStatusPage.totalCount = totalCount;
            }
        });
      }else{
        api.contentPlatFormOrderDealInfo(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.transactionStatusPage.data = list;
            this.transactionStatusPage.totalCount = totalCount;
            }
        });
      }
      
    },

    // 获取列表分页
    handlePageChange(pageNum) {
      const { contentPlatFormOrderId } = this.transactionStatusParams;
      const { pageSize } = this.transactionStatusPage;
      const data = {
        pageNum,
        pageSize,
        contentPlatFormOrderId,
      };
      api.contentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.transactionStatusPage.data = list;
          this.transactionStatusPage.totalCount = totalCount;
        }
      });
    },
    // 取消
    cancel(name) {
      this.transactionStatusParams.transactionStatusModel = false
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
      }
    },
    handleModalChange(value) {
      if (!value) {
        this.doubleOrderModel = false;
      }
    },
  },
  watch: {
    transactionStatusParams: {
      handler(transactionStatusParams) {
          
        this.geTransactionStatus();
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.page{
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img {
  width: 100%;
  height: auto;
}
</style>
