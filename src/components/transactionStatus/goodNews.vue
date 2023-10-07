<template>
  <div class="content">
    <Modal
      title="稽查喜报"
      footer-hide
      v-model="goodsNewsModels"
      width="30%"
      :closable="true"
      @on-visible-change="handleModalVisibleChange"
    >
      <div class="container">
        <viewer v-if="goodsNewsObjs.hospitalPicture">
          <img
            :src="goodsNewsObjs.hospitalPicture"
            alt=""
            class="img"
            v-if="goodsNewsObjs.hospitalPicture"
          />
        </viewer>
        <div class="name" v-if="goodsNewsObjs.name">
          {{ goodsNewsObjs.name }}
        </div>
        <div class="price" v-if="goodsNewsObjs.price">
          {{ goodsNewsObjs.price }}
          <span style="font-size:58px;margin-left:5px">元</span>
        </div>
        <div class="time" v-if="goodsNewsObjs.createDate">
          {{ this.$moment(goodsNewsObjs.createDate).format("YYYY-MM-DD") }}
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
    goodsNewsObj: Array,
  },
  data() {
    return {
      goodsNewsModels: false,
      goodsNewsObjs:{
        name:'',
        price:0,
        createDate:''

      }
    };
  },
  methods: {
    // 喜报
    getOrderProsperity() {
      api.orderProsperity(this.id).then((res) => {
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
        let num =0 
        if(this.goodsNewsObj){
          this.goodsNewsObj.map(item=>{
            num += Number(item.price);
          })
          this.goodsNewsObjs.price =num;
          this.goodsNewsObjs.name = this.goodsNewsObj[0].createByEmpName
          this.goodsNewsObjs.createDate = this.goodsNewsObj[0].createDate
        }
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
  background: url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/1c7f19ade830413bbef97adeef3443ef.png)
    no-repeat no-repeat;
  background-size: 100% 100%;
  height: 800px;
  padding-top: 10px;
  box-sizing: border-box;
  position: relative;
}
.price {
  text-align: center;
  font-size: 70px;
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
  top: 60%;
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
.pos{
    position: absolute;
    right: 110px;
    bottom: 332px;
    color: #fff;
    font-size: 15px;
}
</style>
