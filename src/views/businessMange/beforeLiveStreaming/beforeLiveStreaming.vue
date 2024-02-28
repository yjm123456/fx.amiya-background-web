<template>
    <div class="container">
        <item title="公司" ref="company"/>
        <item title="刀刀组" :params="params" ref="daodao"/>
        <item title="吉娜组" :params="params" ref="jina"/>
        <beforeLiveStreamingLine :params="params"/>
    </div>
</template>
<script>
import item from "./components/item.vue"
import beforeLiveStreamingLine from "./components/beforeLiveStreamingLine.vue"
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";

export default{
    components:{
        item,
        beforeLiveStreamingLine
    },
    data(){
        return{
            params:{
                // 获取基础主播数据
                liveAnchorBaseInfos:[],
            },
           
        }
    },
    methods:{
        // 获取基础主播
        getLiveAnchorBaseInfoValid() {
            liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
                if (res.code === 0) {
                    const {liveAnchorBaseInfos} = res.data
                    this.params.liveAnchorBaseInfos = liveAnchorBaseInfos;
                    this.$nextTick(()=>{
                        this.$refs.company.getData()
                        this.$refs.daodao.getData()
                        this.$refs.jina.getData()
                    })
                }
            });
        },
        
    },
    created(){
        this.getLiveAnchorBaseInfoValid()
    }
}
</script>
<style scoped>
.container{
    width: 100% !important;
}

</style>
