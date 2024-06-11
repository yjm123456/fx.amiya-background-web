<template>
  <div class="content">
    <Modal
      title="查看图片"
      footer-hide
      v-model="viewPicModels"
      width="40%"
      :closable="false"
      @click="handleModalVisibleChange"

    >
      <div class="img_cons">
        <viewer  v-if="customerPictureUrl" style="margin:0 auto">
            <img :src="customerPictureUrl" alt="" class="img_o" />
          </viewer>
      </div>
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
    customerPictureUrl:String
  },
  data() {
    return {
      viewPicModels:false,
    };
  },
  methods: {
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
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.img_o {
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img,.img_o{
  width: 300px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.no_date{
  text-align: center;
}
.img_cons{
  display: flex;
  flex-wrap: wrap;
}
</style>
