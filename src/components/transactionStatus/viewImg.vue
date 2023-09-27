<template>
  <div class="content">
    <Modal
      title="明细"
      footer-hide
      v-model="viewCustomerPhotosModels"
      width="50%"
      :closable="false"
      @click="handleModalVisibleChange"

    >

      <div class="title">邀约凭证</div>
      <div class="img_cons">
        <!-- <img  :src="item.customerPicture" alt="" class="viewDoctorImg"> -->
        <div class="img" v-for="(item,index) in customerPhotos" :key="index">
          <viewer>
            <img :src="item.customerPicture" alt="" class="img_o" />
          </viewer>
        </div>
      </div>
      <div v-if="customerPhotos.length == 0" class="no_date">暂无图片</div>

      <div class="title mr" >喜报栏</div>
      <Button type="primary" @click="goodsNewsModel =true">生成喜报</Button>

      <div class="title2">成交明细</div>
      <Table
        border
        :columns="query.columns"
        :data="viewImgParams.contentPlatFormOrderDealDetails"
        style="margin:10px 0"
      ></Table>
      <div class="footer" >
          <Button @click="cancel" style="margin-right: 10px" >取消</Button>
      </div>
    </Modal>
    <!-- 生成喜报 -->
    <goodNews :goodsNewsModel.sync="goodsNewsModel" :goodsNewsObj="viewImgParams.contentPlatFormOrderDealDetails"/>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import goodNews from "./goodNews.vue"
export default {
  components:{
      goodNews
  },
  props: {
    viewCustomerPhotosModel: Boolean,
    viewImgParams:Object
  },
  data() {
    return {
      goodsNewsModel:false,
      viewCustomerPhotosModels:false,
      customerPhotos:[],
      query:{
        columns:[
          {
            title: "项目名称",
            key: "goodsName",
            align: "center",
            minWidth:100
          },
          {
            title: "项目规格",
            key: "goodsSpec",
            align: "center",
            minWidth:100
          },
          {
            title: "数量",
            key: "quantity",
            align: "center",
            minWidth:100
          },
          {
            title: "金额",
            key: "price",
            align: "center",
            minWidth:100
          },
          {
            title: "创建人",
            key: "createByEmpName",
            align: "center",
            minWidth:100
          },
        ]
      },
    };
  },
  methods: {
    // 获取客户照片
    getCustomerPicture() {
      const data = {
        pageNum:1,
        pageSize:5,
        contentPlatFormOrderId :this.viewImgParams.contentPlatFormOrderId,
        orderDealId:this.viewImgParams.orderDealId,
        description:'邀约凭证'
      };
      api.ContentPlatFormCustomerPicture(data).then((res) => {
        if (res.code === 0) {
          const { list } = res.data.contentPlatFormCustomerPictureInfo;
          this.customerPhotos = list;
        }
      });
    },

   
    // 取消
    cancel(name) {
      this.$emit("update:viewCustomerPhotosModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:viewCustomerPhotosModel", false);
      }
        
    },
  },
  watch: {
    viewCustomerPhotosModel: {
      handler(viewCustomerPhotosModel) {
        this.viewCustomerPhotosModels = viewCustomerPhotosModel
        this.getCustomerPicture()
      },
      deep: true,
    },
    // contentPlatFormOrderId: {
    //   handler(contentPlatFormOrderId) {
    //     this.contentPlatFormOrderIds = contentPlatFormOrderId
    //   },
    //   deep: true,
    // },
  },
};
</script>
<style scoped lang="less">
.img_o {
  width: 100%;
  height: auto;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img,.img_o{
  width: 150px;
  height: 150px;
  margin-right: 10px;
}
.no_date{
  text-align: center;
}
.img_cons{
  display: flex;
}
.title,.title2{
  color: #000;
  font-size: 16px;
  font-weight: bold;
}
.title2{
 margin-top: 30px;
}
.mr{
  margin-top: 20px;
}
</style>
