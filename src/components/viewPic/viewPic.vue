<template>
  <div class="content">
    <Modal
      title="审核图片"
      footer-hide
      v-model="viewPicModels"
      width="40%"
      :closable="false"
      @click="handleModalVisibleChange"

    >
      <div class="img_cons">
        <!-- <img  :src="item.customerPicture" alt="" class="viewDoctorImg"> -->
        <div class="img" v-for="(item,index) in viewPicList" :key="index">
          <viewer>
            <img :src="item.pictureUrl" alt="" class="img_o" />
          </viewer>
        </div>
      </div>
      <div v-if="customerPhotos.length == 0" class="no_date">暂无数据</div>
      <div class="footer" >
          <Button @click="cancel" style="margin-right: 10px" >取消</Button>
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
    viewPicModel: Boolean,
    viewPicList:Array
  },
  data() {
    return {
      viewPicModels:false,
      customerPhotos:[],
    };
  },
  methods: {
    // 获取客户照片
    getCustomerPicture() {
      const data = {
        pageNum:1,
        pageSize:5,
        contentPlatFormOrderId :this.contentPlatFormOrderId
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
      this.$emit("update:viewPicModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:viewPicModel", false);
      }
        
    },
  },
  watch: {
    viewPicModel: {
      handler(viewPicModel) {
        this.viewPicModels = viewPicModel
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
</style>
