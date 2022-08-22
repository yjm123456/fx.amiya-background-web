<template>
    <Card class="containers">
        <div class="contents">
            <div class="list2">
            <ul class="uls">
                <li v-for="(item, index) in title_list" :key="index" class="lis">
                <span
                    ref="spans"
                    :style="{ color: activeStep === index ? '#1987e1' : 'skyblue' }"
                    @click="jump(index)"
                >
                    <div
                    class="cirle"
                    :style="{
                        border:
                        activeStep === index
                            ? '2px solid #1987e1'
                            : '1px solid skyblue',
                    }"
                    ></div>
                    {{ item.title }}
                </span>
                <div class="line"></div>
                </li>
            </ul>
            </div>
            <div class="results" @scroll="onScroll">
                <div class="scroll-item2">
                    asdasdas
                </div>
                <div class="scroll-item2">
                    asdasdasd
                </div>
                <div class="scroll-item2">
                    dffd
                </div>
                <div class="scroll-item2">
                    dffd
                </div>
            </div>
        </div>
    </Card>
</template>
<script>
export default {
  props: ["active"],
  data() {
    return {
      activeStep: 0,
      title_list: [
        { title: "总业绩" },
        { title: "当月成交" },
        { title: "面诊业绩" },
        { title: "独立业绩" },
      ],
      month:''
    };
  },
  methods: {
    getAchievementClick(){
      console.log(this.$moment(this.month).format("YYYY-MM"))
    },
    jump(index) {
      var items = document.querySelectorAll(".scroll-item2");
      for (var i = 0; i < items.length; i++) {
        if (index === i) {
          items[i].scrollIntoView({
            block: "start", //默认跳转到顶部
            behavior: "smooth", //滚动的速度
          });
        }
      }
    },
    onScroll(e) {
      let scrollItems = document.querySelectorAll(".scroll-item2");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        if (judge) {
          this.activeStep = i;
          break;
        }
      }
    },
  },
  created() {
    
  },
  watch:{
    active: {
      handler(value) {
        if (value === "performanceBoard") {
        }
      },
      immediate: true,
    },
  }
};
</script>
<style lang="less" scoped>
.containers {
  // margin-top: 16px;

}
.top_con{
    display: flex;
    justify-s: space-between;
    margin-bottom: 10px;
    padding: 0 1.5%;
    box-sizing: border-box;
}
.titles{
    font-size: 18px;
    font-weight: bold;
}

.list2 {
  width: 8%;
  /* height: 40px;
  margin-bottom: 20px;
  background: pink; */
  overflow-y: hidden;
  background: #fff;
  border-radius: 2%;
}
.uls {
  height: 40px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.lis {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.li > span {
  cursor: pointer;
}
.results {
  width: 90%;
  height: 630px;
  overflow-y: scroll;
  margin-left: 10px;
  color: #000;
}
.scroll-item2 {
  width: 100%;
  height: 630px;
  margin-top: 20px;
  background: #fff;
  border-radius: 2%;
  padding: 3% 8%;
  box-sizing: border-box;
}
.scroll-item2 > span {
  font-size: 40px;
}
.scroll-item2:first-child {
  margin-top: 0;
}
.scroll-item2:last-child {
  height: 630px;
}
.contents {
  width: 100%;
  display: flex;
}
.line {
  height: 100px;
  width: 1px;
  /* color: skyblue; */
  display: block;
  border: 1px solid skyblue;
  margin-left: 7%;
}
.lis:nth-child(2) {
  margin-left: 12px;
}
.lis:nth-child(3) {
  margin-left: 12px;
}
.lis:nth-child(4) {
  margin-left: 12px;
}
.lis:last-child .line {
  border: none;
}
.cirle {
  width: 15px;
  height: 15px;
  border: 1px solid skyblue;
  display: inline-block;
  border-radius: 50%;
  font-weight: bold;
}
</style>
