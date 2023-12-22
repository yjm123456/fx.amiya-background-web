<template>
  <div class="big_con">
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
    <!-- 业绩看板 -->
    <performanceKanban :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams"/>
    <!-- 业绩分析 -->
    <packagesDataKanBan :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams"/>
    <!-- 业绩趋势 -->
    <performanceTrends :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams"/>
    <!-- 品类看板 -->
    <div class="content">
        <div class="titles">品类看板</div>
        <div class="list">
            <div class="item">
                <cake :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单GMV占比分析" />
            </div>
            <div class="item">
                <cake2 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单件数占比分析" />
            </div>
            <div class="item3">
                <cake3 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单件单价分析"/>
            </div>
        </div>
    </div>
    <div class="content2">
        <div class="list2">
            <div class="item">
                <cake4 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="实际GMV占比分析"/>
            </div>
            <div class="item">
                <cake5 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="实际件数占比分析"/>
            </div>
            <div class="item3">
                <cake6 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="实际件单价分析"/>
            </div>
        </div>
    </div>
    <div class="content2">
        <div class="list2">
            <div class="item">
                <cake7 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="退款GMV占比分析"/>
            </div>
            <div class="item">
                <cake8 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="退款件数占比分析"/>
            </div>
            <div class="item3">
                <cake9 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="退款件单价分析"/>
            </div>
        </div>
    </div>
    <!-- 品牌看板 -->
    <div class="brand_con">
        <div class="titles">品牌看板</div>
        <div >
            <tables  :performanceKanbanParams="performanceKanbanParams"/>
        </div>
        <div class="content2">
            <div class="list2">
                <div class="item">
                    <cake10 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单GMV占比分析" types="品牌看板"/>
                </div>
                <div class="item">
                    <cake11 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单件数占比分析" types="品牌看板"/>
                </div>
                <div class="item3">
                    <cake12 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单件单价分析" types="品牌看板"/>
                </div>
            </div>
        </div>
    </div>
    <!-- 品项看板 -->
    <div class="brand_con">
        <div class="titles">品项看板</div>
        <div >
            <tables2  :performanceKanbanParams="performanceKanbanParams"/>
        </div>
        <div class="content2">
            <div class="list2">
                <div class="item">
                    <cake13 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单GMV占比分析" types="品项看板"/>
                </div>
                <div class="item">
                    <cake14 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单件数占比分析" types="品项看板"/>
                </div>
                <div class="item3">
                    <cake15 :performanceKanbanParams="performanceKanbanParams" v-if="performanceKanbanParams" name="下单件单价分析" types="品项看板"/>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/takeGoodsDataBoard";

import performanceKanban from "./performanceKanban.vue";
import packagesDataKanBan from "./packagesDataKanBan.vue";
import performanceTrends from "./performanceTrends.vue"
// 饼图
import cake from "./cake.vue"
import cake2 from "./cake.vue"
import cake4 from "./cake.vue"
import cake5 from "./cake.vue"
import cake7 from "./cake.vue"
import cake8 from "./cake.vue"
import cake10 from "./cake.vue"
import cake11 from "./cake.vue"
import cake13 from "./cake.vue"
import cake14 from "./cake.vue"

// 折线图
import cake3 from "./cake3.vue"
import cake6 from "./cake3.vue"
import cake9 from "./cake3.vue"
import cake12 from "./cake3.vue"
import cake15 from "./cake3.vue"
import tables from "./tables.vue"
import tables2 from "./tables2.vue"

export default {
  components: {
    performanceKanban,
    packagesDataKanBan,
    performanceTrends,
    cake,
    cake2,
    cake3,
    cake4,
    cake5,
    cake6,
    cake7,
    cake8,
    cake9,
    cake10,
    cake11,
    cake12,
    cake13,
    cake14,
    cake15,
    tables,
    tables2
  },
  props: {
    active: String,
    activeName: String,
    params:Object
  },
  data() {
    return {
        month: this.$moment().format("YYYY-MM"),
        performanceKanbanParams:{
            actives:'jina',
            // GMV数据
            gmvData:{},
            // 件数数据
            packagesData:{},
            // 件单价
            singlePrice:{},
            // 折线图
            brokenLineData:{},
            // 品类
            categoryAnalizeData:{},
            // 品牌
            brandAnalizeData:{},
            // 品项
            itemDetailsAnalizeData:{}
        },
        contentPalteForms:[],
        liveAnchorBaseInfos:[],

       
    };
  },
  methods: {
    
    getData() {
          this.gmvDataWhole()
          this.gmvPackagesDataWhole()
          this.gmvSinglePriceData()
          this.gmvDataBrokenLineData()
          this.getcategoryAnalizeData()
        this.getbrandAnalizeData()
        this.getitemDetailsAnalizeData()
    },
    //  获取CMV看板数据(整体)
    gmvDataWhole(){
        let str = String(this.$moment(this.month).format("MM"));
        let month = str.substr(str.length - 1, 1);
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
            contentPlatformId:this.activeName == 'tiktok' ? this.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id : this.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id,
            liveAnchorId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        }
        api.gmvData(data).then(res=>{
            if(res.code === 0){
                this.performanceKanbanParams.gmvData = res.data.gmvData
            }
        })
    },
    //  获取件数看板数据(整体)
    gmvPackagesDataWhole(){
        let str = String(this.$moment(this.month).format("MM"));
        let month = str.substr(str.length - 1, 1);
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
            contentPlatformId:this.activeName == 'tiktok' ? this.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id : this.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id,
            liveAnchorId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        }
        api.gmvPackagesData(data).then(res=>{
            if(res.code === 0){
                this.performanceKanbanParams.packagesData = res.data.packagesData
            }
        })
    },
    //  获取件单价看板数据(整体)
    gmvSinglePriceData(){
        let str = String(this.$moment(this.month).format("MM"));
        let month = str.substr(str.length - 1, 1);
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
            contentPlatformId:this.activeName == 'tiktok' ? this.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id : this.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id,
            liveAnchorId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        }
        api.gmvSinglePriceData(data).then(res=>{
            if(res.code === 0){
                this.performanceKanbanParams.singlePrice = res.data.singlePrice
            }
        })
    },
    //  获取业绩趋势折线图(整体)
    gmvDataBrokenLineData(){
        let str = String(this.$moment(this.month).format("MM"));
        let month = str.substr(str.length - 1, 1);
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
            contentPlatformId:this.activeName == 'tiktok' ? this.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id : this.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id,
            liveAnchorId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        }
        api.gmvDataBrokenLineData(data).then(res=>{
            if(res.code === 0){
                this.performanceKanbanParams.brokenLineData = res.data.brokenLineData
            }
        })
    },
    //  获取品类看板分析数据
    getcategoryAnalizeData(){
        let str = String(this.$moment(this.month).format("MM"));
        let month = str.substr(str.length - 1, 1);
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
            contentPlatformId:this.activeName == 'tiktok' ? this.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id : this.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id,
            liveAnchorId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        }
        api.categoryAnalizeData(data).then(res=>{
            if(res.code === 0){
                this.performanceKanbanParams.categoryAnalizeData = res.data.categoryAnalizeData
            }
        })
    },
    //  获取品类看板分析数据
    getbrandAnalizeData(){
        let str = String(this.$moment(this.month).format("MM"));
        let month = str.substr(str.length - 1, 1);
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
            contentPlatformId:this.activeName == 'tiktok' ? this.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id : this.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id,
            liveAnchorId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        }
        api.brandAnalizeData(data).then(res=>{
            if(res.code === 0){
                this.performanceKanbanParams.brandAnalizeData = res.data.brandAnalizeData
            }
        })
    },
    //  获取品项看板分析数据
    getitemDetailsAnalizeData(){
        let str = String(this.$moment(this.month).format("MM"));
        let month = str.substr(str.length - 1, 1);
        if (!this.month) {
            this.$Message.warning("请选择日期");
            return;
        }
        const data ={
            year:this.$moment(this.month).format("YYYY")? this.$moment(this.month).format("YYYY") : null,
            month:Number(this.$moment(this.month).format("MM")) >= 10 ? this.$moment(this.month).format("MM") : month,
            contentPlatformId:this.activeName == 'tiktok' ? this.contentPalteForms.find(item=>item.contentPlatformName == '抖音').id : this.contentPalteForms.find(item=>item.contentPlatformName == '视频号').id,
            liveAnchorId:this.liveAnchorBaseInfos.find(item=>item.name == '吉娜').id,
        }
        api.itemDetailsAnalizeData(data).then(res=>{
            if(res.code === 0){
                this.performanceKanbanParams.itemDetailsAnalizeData = res.data.itemDetailsAnalizeData
            }
        })
    },
  },
  watch: {
    active: {
      handler(value) {
        if(value === 'jina'){
          const {contentPalteForms,liveAnchorBaseInfos} = this.params;
            this.contentPalteForms = contentPalteForms
            this.liveAnchorBaseInfos = liveAnchorBaseInfos
            this.performanceKanbanParams.actives= value
            this.getData()
        }
        
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.date_con {
  text-align: end;
  padding-right: 40px;
  box-sizing: border-box;
}
.list,.list2{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding: 0 1%;
    box-sizing: border-box;
}
.item,.item3{
    background: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    
}
.item{
    width: 23%;
}
.item3{
    width:50%
}
.titles {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  padding: 0 1%;
  box-sizing: border-box;
  margin-top: 50px;
}
.content,.content2{
    height: 420px;
    width: 100%;
    display: flex;
    flex-direction: column;
    
}

.content2{
 margin-top: 20px;
}
.big_con{
    color: #000;
}
</style>
