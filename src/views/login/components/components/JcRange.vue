<template>
  <div class="jc-component__range">
    <div class="jc-range" :class="rangeStatus ? 'success' : ''">
      <i
        @mousedown="rangeMove"
        :class="rangeStatus ? successIcon : startIcon"
      ></i>
      {{ rangeStatus ? successText : startText }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 成功之后的函数
    successFun: {
      type: Function,
    },
    //成功图标
    successIcon: {
      type: String,
      default: "iconfont icon-success_no_circle",
    },
    //成功文字
    successText: {
      type: String,
      default: "验证成功",
    },
    //开始的图标
    startIcon: {
      type: String,
      default: "iconfont icon-arrow_right2",
    },
    //开始的文字
    startText: {
      type: String,
      default: "拖动滑块到最右边",
    },
    //失败之后的函数
    errorFun: {
      type: Function,
    },
    //或者用值来进行监听
    status: {
      type: String,
    },
  },
  name: "Silder",
  data() {
    return {
      rangeStatus: "",
    };
  },
  methods: {
    rangeMove(e) {
      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      if (this.rangeStatus) {
        //不运行
        return false;
      }
      document.onmousemove = (e) => {
        let endX = e.clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX - eleWidth / 2) {
          //减去滑块的宽度,体验效果更好
          this.disX = MaxX;
        }
        ele.style.transition = "0s all";
        ele.style.transform = "translateX(" + this.disX + "px)";
        e.preventDefault();
      };
      document.onmouseup = () => {
        if (this.disX !== MaxX) {
          ele.style.transition = ".5s all";
          ele.style.transform = "translateX(0)";
          //执行成功的函数
          this.errorFun && this.errorFun();
        } else {
          this.rangeStatus = true;
          if (this.status) {
            this.$parent[this.status] = true;
          }
          //执行成功的函数
          this.successFun && this.successFun();
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>
<style scoped>
.jc-range {
  background-color: #E8F0FE;
  position: relative;
  transition: 1s all;
  user-select: none;
  color: #c3c3c3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 32px; /*no*/
}
.jc-range i {
  position: absolute;
  left: 0;
  width: 40px; /*no*/
  height: 100%;
  color: #919191;
  background-color: #fff;
  border: 1px solid #dcdee2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
.jc-range.success {
  background-color: #7ac23c;
  color: #fff;
}
.jc-range.success i {
  color: #7ac23c;
}
</style>
