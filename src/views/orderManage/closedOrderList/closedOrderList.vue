<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="下单平台已完成订单" name="singlePlatformCompleted">
        <div>
          <singlePlatformCompleted
            :activeName="activeName"
            :checkStateListAll="checkStateListAll"
          ></singlePlatformCompleted>
        </div>
      </TabPane>
      <TabPane label="内容平台已完成订单" name="contentCompleted">
        <div>
          <contentCompleted
            :activeName="activeName"
            :checkStateListAll="checkStateListAll"
          ></contentCompleted>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import singlePlatformCompleted from "./components/singlePlatformCompleted.vue"
import contentCompleted from "./components/contentCompleted.vue"
import * as api from "@/api/customerManage.js";

export default {
  components:{
    singlePlatformCompleted,
    contentCompleted
  },
  data(){
    return {
      activeName: "singlePlatformCompleted",
      checkStateListAll: [{ id: -1, name: "全部审核状态" }],
    }
  },
  methods:{
    // 获取审核情况（下拉框）
    getCheckStateList() {
      api.getCheckStateList().then((res) => {
        if (res.code === 0) {
          const { checkStateList } = res.data;
          this.checkStateList = checkStateList;
          this.checkStateListAll = [
            ...this.checkStateListAll,
            ...checkStateList,
          ];
        }
      });
    },
  },
  created(){
    this.getCheckStateList()
  }
}
</script>
