<template>
  <div class="content">
    <!-- <Card> -->
      <Tabs ref="tabs" v-model="active" v-if="isTab==true" type="card"> 
        <TabPane label="公司看板" name="customerRFMBar" v-if="readDataCenter == 'true'">
          <div>
            <customerRFMBar
              :active="active"
              ref="customerRFMBar"
            />
          </div>
        </TabPane>
        <TabPane label="刀刀组看板" name="daodaocustomerRFMBar" v-if="readDataCenter == 'true'">
          <div>
            <daodaocustomerRFMBar
              :active="active"
              ref="daodaocustomerRFMBar"
              :liveAnchorBaseInfos="liveAnchorBaseInfos"
            />
          </div>
        </TabPane>
        <TabPane label="吉娜组看板" name="jinacustomerRFMBar" v-if="readDataCenter == 'true'">
          <div>
            <jinacustomerRFMBar
              :active="active"
              ref="jinacustomerRFMBar"
              :liveAnchorBaseInfos="liveAnchorBaseInfos"
            />
          </div>
        </TabPane>
        <TabPane label="助理看板" name="zhulicustomerRFMBar" >
          <div>
            <zhulicustomerRFMBar
              :active="active"
              ref="zhulicustomerRFMBar"
              :employee="employee"
            />
          </div>
        </TabPane>
        <TabPane label="RFM等级更新记录" name="gradeList" >
          <div>
            <gradeList
              :active="active"
              ref="gradeList"
              :employee="employee"
            />
          </div>
        </TabPane>
      </Tabs>
    <!-- </Card> -->
  </div>
</template>
<script>
import * as api from "@/api/liveAnchorBaseInfo";

import customerRFMBar from "./customerRFMBar";
import daodaocustomerRFMBar from "./daodaocustomerRFMBar";
import jinacustomerRFMBar from "./jinacustomerRFMBar";
import zhulicustomerRFMBar from "./zhulicustomerRFMBar";
import gradeList from "./gradeList";
export default {
    props:{
        activeName:String,
        employee:Array
    },
  components: {
    customerRFMBar,
    daodaocustomerRFMBar,
    jinacustomerRFMBar,
    zhulicustomerRFMBar,
    gradeList
  },
  data() {
    return {
      hospitalListData: [18203, 23489, 29034, 104970, 131744, 12313],
      active:sessionStorage.getItem('readDataCenter') == 'true' ? 'customerRFMBar' : 'zhulicustomerRFMBar',
      isTab:false,
      //   主播
      liveAnchorBaseInfos:[],
      // 是否查看数据中心
      readDataCenter:sessionStorage.getItem('readDataCenter')
    };
  },
  methods: {
    // 获取有效主播基础信息
    getLiveAnchor(){
        const data = {
            isSelfLiveAnchor:true
        }
        api.getLiveAnchorBaseInfoValid(data).then(res=>{
            if(res.code === 0){
                this.liveAnchorBaseInfos = res.data.liveAnchorBaseInfos
            }
        })
    }
  },
  created(){
    this.getLiveAnchor()
  },
  watch:{
    activeName: {
      handler(value) {
        if(value == 'customerRFM'){
            this.$nextTick(()=>{
                this.isTab = true
            })
        }
        // if (value === "customerRFMBar") {
        //     this.$nextTick(()=>{
        //         this.isTab = true
                
        //     })
        //     console.log(this.$refs.customerRFMBar)
        // }else if(value === "daodaocustomerRFMBar"){
        //     console.log(value)
        //      console.log(this.$refs.customerRFMBar)
        // }else if(value === "jinacustomerRFMBar"){
        //     console.log(value)
        //      console.log(this.$refs.customerRFMBar)
        // }else{
        //     console.log(value)
        //      console.log(this.$refs.customerRFMBar)
        // }
      },
      immediate: true,
    },
  }
};
</script>
<style scoped></style>
