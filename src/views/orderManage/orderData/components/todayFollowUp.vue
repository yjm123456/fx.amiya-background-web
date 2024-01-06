<template>
  <div>
    <Tabs ref="tabs" v-model="activeName" type="card">
      <TabPane label="待回访" name="noFollow">
        <div>
          <noFollow
            :activeName="activeName"
            :queryParams="queryParams"
            ref="noFollow"
            v-if="activeName == 'noFollow'"
          ></noFollow>
        </div>
      </TabPane>
      <TabPane label="已回访" name="followed">
        <div>
          <followed
            :activeName="activeName"
            :queryParams="queryParams"
            ref="noFollow"
            v-if="activeName == 'followed'"
          ></followed>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>

import noFollow from "./noFollow.vue"
import followed from "./noFollow.vue"

export default {
    props:{
        queryParams:Object
    },
  components:{
    noFollow,
    followed,
  },
  data(){
    return {
      activeName: "noFollow",
    }
  },
  methods:{
    // getData(){
    //     this.$nextTick(()=>{
    //         this.$refs.noFollow.gettodayTrackData()
    //     })
    // }
  },
  created(){
    
  }
}
</script>
<style scoped>
.title{
    font-size: 15px;
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
}
</style>
