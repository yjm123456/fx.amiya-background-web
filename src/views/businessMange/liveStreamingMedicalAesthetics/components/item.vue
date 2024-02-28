<template>
  <div>
    <div class="title">{{title}}</div>
    <div class="tab">
      <div
        class="tab_item"
        v-for="(item, index) in list"
        :key="index"
        @click="selectTab(index, item)"
        :class="{ active: item.isSelected }"
      >
        <i class="iconfont  icons" :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div>
        <contents :liveStreamingPerformance="liveStreamingPerformance"/>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/newBusinessDashboard";

import contents from  "./content.vue"
export default {
  components:{
    contents
  },
  props: {
    title: String,
    params:Object 
  },
  data() {
    return {
      list: [
        {
          icon: "icon-douyin-",
          name: "抖音",
          id: 1,
          isSelected: true,
        },
        {
          icon: "icon-shipinhao",
          name: "视频号",
          id: 2,
          isSelected: false,
        },
        // {
        //   icon: "icon-xiaohongshu1",
        //   name: "小红书",
        //   id: 3,
        //   isSelected: false,
        // },
        // {
        //   icon: "icon-xiaochengxu2",
        //   name: "小程序",
        //   id: 4,
        //   isSelected: false,
        // },
        // {
        //   icon: "icon-siyuzhibo",
        //   name: "私域直播",
        //   id: 5,
        //   isSelected: false,
        // },
        
      ],
      selectedTabs: [1], // 已选中的标签页索引列表
      // 接口数据
      liveStreamingPerformance:{}
    };
  },
  methods: {
    // 获取业绩数据(公司)
    getData() {
      if (!this.params.month) {
        this.$Message.warning("请选择日期！");
        return;
      }
      const data = {
        year: this.$moment(this.params.month).format("YYYY"),
        month: this.$moment(this.params.month).format("MM"),
        baseLiveAnchorId: this.title == "刀刀组" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "刀刀").id : this.title == "吉娜组" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "吉娜").id : '',
        showTikTokData: this.list.find((item) => item.id == 1).isSelected,
        showWechatVideoData: this.list.find((item) => item.id == 2).isSelected,
        // showXiaoHongShuData: this.list.find((item) => item.id == 3).isSelected,
      };

      api.getLivingAestheticMedicineBusinessData(data).then((res) => {
        if (res.code == 0) {
          this.liveStreamingPerformance = res.data.data;
        }
      });
    },
    selectTab(index, value) {
      this.list[index].isSelected = !this.list[index].isSelected;
      this.getData()
      // if (this.list[index].isSelected == true) {
      //   //添加
      //   this.selectedTabs.push(this.list[index].id);
      //   console.log(this.selectedTabs, "添加");
      // } else {
      //   // 删除
      //   const findIndex = this.selectedTabs.findIndex(
      //     (item) => item == value.id
      //   );
      //   this.selectedTabs.splice(findIndex, 1);
      //   console.log(this.selectedTabs, "删除");
      // }
    },
  },
};
</script>
<style scoped>
.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.tab {
  display: flex;
  margin-top: 30px;
}
.tab_item {
  background: #f0f0f0;
  padding: 1px 10px;
  box-sizing: border-box;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.icons {
  font-size: 14px;
  margin-right: 2px;
}
.active {
  color: red;
  border: 1px solid red;
}
.title{
    font-size: 18px;
    width: 100px;
    height: 32px;
    background: #478bfc;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 6px;
}
</style>
