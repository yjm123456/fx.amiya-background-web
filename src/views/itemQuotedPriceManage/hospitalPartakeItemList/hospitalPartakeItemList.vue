<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" @on-click="handleTabClick">
      <TabPane label="按项目" name="item">
        <div style="min-height: calc(100vh - 179px)">
          <item :activeName="activeName"></item>
        </div>
      </TabPane>
      <TabPane label="按医院" name="hospital">
        <div style="min-height: calc(100vh - 179px)">
          <hospital :activeName="activeName"></hospital>
        </div>
      </TabPane>
      <TabPane label="按城市" name="city">
        <div style="min-height: calc(100vh - 179px)">
          <city :activeName="activeName"></city>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import item from "./components/item";
import hospital from "./components/hospital";
import city from "./components/city";
export default {
  components: {
    item,
    hospital,
    city,
  },
  data() {
    return {
      activeName: "item",
    };
  },
  methods: {
    handleTabClick(name) {
      this.activeName = name;
    },
  },
};
</script>

