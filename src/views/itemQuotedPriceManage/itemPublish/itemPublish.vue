<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="有效的报价" name="validActivity">
        <validActivity :activeName="activeName"></validActivity>
      </TabPane>
      <TabPane label="已参与的报价" name="invalidActivity">
        <invalidActivity :activeName="activeName"></invalidActivity>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import validActivity from "./components/validActivity";
import invalidActivity from "./components/invalidActivity";
export default {
  components: { validActivity, invalidActivity },
  data() {
    return {
      activeName: "validActivity",
    };
  },
};
</script>
