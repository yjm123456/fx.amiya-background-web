<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="抖音" name="tiktok">
        <div
          v-if="
            params.liveAnchorBaseInfos.length && params.contentPalteForms.length
          "
        >
          <tiktok :activeName="activeName" :params="params"></tiktok>
        </div>
      </TabPane>
      <TabPane label="视频号" name="vedio">
        <div
          v-if="
            params.liveAnchorBaseInfos.length && params.contentPalteForms.length
          "
        >
          <vedio :activeName="activeName" :params="params" ref="vedio"></vedio>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import tiktok from "./views/tiktok.vue";
import vedio from "./views/vedio.vue";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";
import * as baseDataMaintenanceApi from "@/api/baseDataMaintenance";
export default {
  components: {
    tiktok,
    vedio,
  },
  data() {
    return {
      activeName: "tiktok",
      params: {
        // 主播
        liveAnchorBaseInfos: [],
        // 平台
        contentPalteForms: [],
      },
    };
  },
  created() {
    this.getLiveAnchorBaseInfoValid();
    this.getContentPlatFormValidList();
  },
  methods: {
    // 获取基础主播
    getLiveAnchorBaseInfoValid() {
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          this.params.liveAnchorBaseInfos = res.data.liveAnchorBaseInfos;
        }
      });
    },
    // 获取平台
    getContentPlatFormValidList() {
      baseDataMaintenanceApi.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          this.params.contentPalteForms = res.data.contentPalteForms;
          // sessionStorage.setItem('contentPalteForms',JSON.stringify(res.data.contentPalteForms))
          // console.log(1111111111)
        }
      });
    },
  },
};
</script>
