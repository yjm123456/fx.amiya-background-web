<template>
  <div>
    <div>
      <query @handleSearch="handleSearch"></query>
    </div>
    <div class="stayReturnVisit_wrap" v-if="params.type === '待追踪回访客户列表'">
      <stayReturnVisit :params="params" ref="stayReturnVisit"></stayReturnVisit>
    </div>
    <div class="alreadyReturnVisit_wrap" v-if="params.type === '已追踪回访客户列表'">
      <alreadyReturnVisit :params="params" ref="alreadyReturnVisit"></alreadyReturnVisit>
    </div>
  </div>
</template>

<script>
import query from "./components/query";
import stayReturnVisit from "./components/stayReturnVisit";
import alreadyReturnVisit from "./components/alreadyReturnVisit";
export default {
  components: { query, stayReturnVisit, alreadyReturnVisit },
  data() {
    return {
      params: {},
    };
  },
  methods: {
    handleSearch(params) {
      this.params = params;
      if(params.type === '待追踪回访客户列表'){
        this.$nextTick(()=>{
          this.$refs.stayReturnVisit.getstayReturnVisitList()
        })
      }
      if(params.type === '已追踪回访客户列表'){
        this.$nextTick(()=>{
          this.$refs.alreadyReturnVisit.getAlreadyReturnVisitList()
        })
      }
    },
  },
};
</script>
<style lang="less" scoped>
.stayReturnVisit_wrap,
.alreadyReturnVisit_wrap {
  margin-top: 10px;
}
</style>
