<template>
  <div class="content">
    <div class="tab_content">
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
      <div class="date_con">
        <DatePicker
          type="month"
          placeholder="请选择年月"
          style="width: 160px;margin:0 10px"
          transfer
          :value="month"
          v-model="month"
        ></DatePicker>
        <Button type="primary" @click="getData">查询</Button>
      </div>
    </div>
    <lines :brokenLine="brokenLine" />
  </div>
</template>
<script>
import lines from "./line.vue";
import * as api from "@/api/newBusinessDashboard";

export default {
  components: {
    lines,
  },
  props: {
    title: String,
    activeName: String,
    params: Object,
  },
  data() {
    return {
      month: this.$moment().format("YYYY-MM"),
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
        {
          icon: "icon-xiaohongshu1",
          name: "小红书",
          id: 3,
          isSelected: false,
        },
      ],
      selectedTabs: [1], // 已选中的标签页索引列表
      // 折线图数据
      brokenLine: {},
    };
  },
  methods: {
    // 获取业绩数据(公司)
    getData() {
      if (!this.month) {
        this.$Message.warning("请选择日期！");
        return;
      }
      const data = {
        year: this.$moment(this.month).format("YYYY"),
        month: this.$moment(this.month).format("MM"),
        baseLiveAnchorId: this.title == "刀刀组" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "刀刀").id : this.title == "吉娜组" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "吉娜").id : '',
        showTikTokData: this.list.find((item) => item.id == 1).isSelected,
        showWechatVideoData: this.list.find((item) => item.id == 2).isSelected,
        showXiaoHongShuData: this.list.find((item) => item.id == 3).isSelected,
      };

      api.getBeforeLivingBrokenLineData(data).then((res) => {
        if (res.code == 0) {
          this.brokenLine = res.data.brokenLine;
        }
      });
    },
    //
    selectTab(index, value) {
      this.list[index].isSelected = !this.list[index].isSelected;
      this.getData();
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
  created() {
    this.getData();
  },
  watch: {
    activeName: {
      handler(value) {
        if (value == "company") {
          this.getBeforeLivingData();
        } else if (value == "daodao") {
          this.getDaoDaoBeforeLivingData();
        } else if (value == "jina") {
          this.getJiNaBeforeLivingData();
        }
      },
      deep: true,
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
}
.tab_item {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin-right: 30px;
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
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
