<template>
  <div class="content">
    <Modal
      title="提交图片"
      footer-hide
      v-model="checkImgControlModals"
      width="44%"
      :closable="false"
      @click="handleModalVisibleChange"

    >
      <div class="img_cons">
          <viewer v-if="checkImgParams.payVoucherPicture1">
            <img :src="checkImgParams.payVoucherPicture1" alt="" class="img_o" />
          </viewer>
          <viewer v-if="checkImgParams.payVoucherPicture2">
            <img :src="checkImgParams.payVoucherPicture2" alt="" class="img_o" />
          </viewer>
          <viewer v-if="checkImgParams.payVoucherPicture3">
            <img :src="checkImgParams.payVoucherPicture3" alt="" class="img_o" />
          </viewer>
          <viewer v-if="checkImgParams.payVoucherPicture4">
            <img :src="checkImgParams.payVoucherPicture4" alt="" class="img_o" />
          </viewer>
          <viewer v-if="checkImgParams.payVoucherPicture5">
            <img :src="checkImgParams.payVoucherPicture5" alt="" class="img_o" />
          </viewer>
      </div>
      <div v-if="!checkImgParams.payVoucherPicture1 && !checkImgParams.payVoucherPicture1" class="no_date">暂无数据</div>
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
    checkImgControlModal: Boolean,
    checkImgParams:Object
  },
  data() {
    return {
      checkImgControlModals:false,
    };
  },
  methods: {
    // 取消
    cancel(name) {
      this.$emit("update:checkImgControlModal", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:checkImgControlModal", false);
      }
        
    },
  },
  watch: {
    checkImgControlModal: {
      handler(checkImgControlModal) {
        this.checkImgControlModals = checkImgControlModal
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
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img,.img_o{
  width: 150px;
  height: 150px;
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
