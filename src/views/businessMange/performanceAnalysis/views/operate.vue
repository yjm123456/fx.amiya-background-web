<template>
        <div style="margin-top:10px;width:100%">
            <!-- <echartsBar :echartsDate="echartsDate"/> -->
              <Tabs type="card" v-model="active"  style="width:100%">
                  <TabPane label="整体" name="whole">
                    <div>
                      <whole
                        :active="active"
                        ref="whole"
                        :contentPalteForms="contentPalteForms"
                      ></whole>
                    </div>
                  </TabPane>
                  <TabPane label="抖音" name="tiktok">
                    <div>
                      <tiktok
                        :active="active"
                        ref="tiktok"
                        :contentPalteForms="contentPalteForms"
                      ></tiktok>
                    </div>
                  </TabPane>
                  <TabPane label="视频号" name="vedio">
                    <div>
                      <vedio
                        :active="active"
                        ref="vedio"
                        :contentPalteForms="contentPalteForms"
                      ></vedio>
                    </div>
                  </TabPane>
              </Tabs>
    </div>
</template>
<script>
import * as api from "@/api/baseDataMaintenance";

import echartsBar from "../components/echarts2.vue"
import whole from "../operationsKanban/whole.vue"
import tiktok from "../operationsKanban/tiktok.vue"
import vedio from "../operationsKanban/vedio.vue"
export default {
    props:{
        activeName:String
    },
    components:{
        echartsBar,
        whole,
        tiktok,
        vedio,
    },
    data(){
        return{
            active:'whole',
            echartsDate:{
                a:'3%',
                b:'4%',
                c:'5%',
                d:'6%',
                e:'7%',
                f:'8%',
                g:'9%',
                h:'10%',
                i:'11%',
                list:[
                    {
                        value:5,
                        name:'下卡量',
                        rate:'6%',
                        rateName:'目标达成率',
                        qoq:'8%',
                        qoqName:'环比',
                        yoy:'8%',
                        yoyName:'同比',
                    },
                    {
                        value:15,
                        name:'退卡量',
                        rate:'6%',
                        rateName:'目标达成率',
                        qoq:'8%',
                        qoqName:'环比',
                        yoy:'8%',
                        yoyName:'同比',
                    },
                    {
                        value:25,
                        name:'分诊量',
                        rate:'6%',
                        rateName:'目标达成率',
                        qoq:'8%',
                        qoqName:'环比',
                        yoy:'8%',
                        yoyName:'同比',
                    },
                    {
                        value:35,
                        name:'加v量',
                        rate:'6%',
                        rateName:'目标达成率',
                        qoq:'8%',
                        qoqName:'环比',
                        yoy:'8%',
                        yoyName:'同比',
                    },
                    {
                        value:45,
                        name:'派单量',
                        rate:'6%',
                        rateName:'目标达成率',
                        qoq:'8%',
                        qoqName:'环比',
                        yoy:'8%',
                        yoyName:'同比',
                    },
                    {
                        value:55,
                        name:'上门量',
                        rate:'6%',
                        rateName:'目标达成率',
                        qoq:'8%',
                        qoqName:'环比',
                        yoy:'8%',
                        yoyName:'同比',
                    },
                    {
                        value:55,
                        name:'成交量',
                        rate:'6%',
                        rateName:'目标达成率',
                        qoq:'8%',
                        qoqName:'环比',
                        yoy:'8%',
                        yoyName:'同比',
                    },

                ]
            },
            // 平台
            contentPalteForms:[]
        }
    },
    methods:{
      getContentPlatFormValidList(){
        api.getContentPlatFormValidList().then(res=>{
          if(res.code == 0){
            this.contentPalteForms = res.data.contentPalteForms
          }
        })
      }
    },
    created(){
      this.getContentPlatFormValidList()
    },
  // watch: {
  //   activeName: {
  //     handler(value) {
  //       if (value === "operate") {
  //         this.active = 'whole'
  //       }
  //     },
  //     immediate: true,
  //   },
  // }
}
</script>
<style scoped>
.ivu-card-body {
  width: 100% !important;
}
</style>

