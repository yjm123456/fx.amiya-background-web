<template>
  <div class="content">
    <Modal
      title="喜报"
      footer-hide
      v-model="goodsNewsModels"
      width="30%"
      :closable="true"
      @on-visible-change="handleModalVisibleChange"
    >
      <div class="container">
        <viewer v-if="goodsNewsObj.hospitalPicture">
          <img
            :src="goodsNewsObj.hospitalPicture"
            alt=""
            class="img"
            v-if="goodsNewsObj.hospitalPicture"
          />
        </viewer>
        <div class="name" v-if="goodsNewsObj.liveAnchorName">
          主播：{{ goodsNewsObj.liveAnchorName }}
        </div>
        <div class="assistant" >
          主播助理：{{ detailObj.isSupportOrder==true ? detailObj.supportEmpName : detailObj.belongEmpName}}
        </div>
        <div class="price" v-if="goodsNewsObj.price">
          {{ goodsNewsObj.price }}
          <span style="font-size:58px;margin-left:5px">元</span>
        </div>
        <div class="time" v-if="goodsNewsObj.dealDate">
          {{ this.$moment(goodsNewsObj.dealDate).format("YYYY-MM-DD") }}
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  components: {},
  props: {
    goodsNewsModel: Boolean,
    detailObj:Object
  },
  data() {
    return {
      goodsNewsModels: false,
      goodsNewsObj: {},
    };
  },
  methods: {
    // 喜报
    getOrderProsperity() {
      let orderId =  sessionStorage.getItem('employeeType') == 'amiyaEmployee'  ? this.detailObj.id : this.detailObj.orderId
      api.orderProsperity(orderId).then((res) => {
        if (res.code === 0) {
          this.goodsNewsObj = res.data.orderInfo;
        }
      });
    },
    // 取消
    cancel(name) {
      this.$emit("update:goodsNewsModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:goodsNewsModel", false);
      }
    },
  },
  watch: {
    goodsNewsModel: {
      handler(goodsNewsModel) {
        this.goodsNewsModels = goodsNewsModel;
        this.getOrderProsperity();
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  box-shadow: 4px 4px 15px -3px #666;
}
.container {
  background: url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/75d780bcea4245f38493b9e27121a5a5.jpg)
    no-repeat no-repeat;
  background-size: 100% 100%;
  height: 800px;
  padding-top: 10px;
  box-sizing: border-box;
  position: relative;
}
.price {
  text-align: center;
  font-size: 60px;
  color: red;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: -webkit-linear-gradient(left, #a30b18, red, #a30b18);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  // margin-top: 15%;
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translate(-50%);
}
.assistant{
  text-align: center;
  font-size: 18px;
  color: red;
  font-weight: bold;
  position: absolute;
  top: 60.5%;
  left: 50%;
  transform: translate(-50%);
}
.name {
  // margin-top: 46%;
  width: 100%;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  background-image: -webkit-linear-gradient(left, #a30b18, red, #a30b18);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  top: 45.5%;
  left: 50%;
  // margin-left: -16%;
  transform: translate(-50%);
}
.time {
  text-align: end;
  margin: 0 20px 0 0;
  color: #fff;
  font-size: 22px;
  position: absolute;
  bottom: 15px;
  right: 10px;
}
</style>
