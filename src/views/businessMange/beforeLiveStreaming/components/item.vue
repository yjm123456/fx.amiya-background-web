<template>
    <div class="container">
        <Card  style="width:100%;color: #000;border-radius: 8px;margin-bottom:20px;border:2px solid #9abef8" class="content">
            <div class="title">{{title}}</div>
            <!--  -->
            <div class="tab_content">
                <div class="tab" >
                    <div class="tab_item" v-for="(item,index) in list" :key="index"   @click="selectTab(index,item)" :class="{ 'active': item.isSelected }">
                        <i class="iconfont  icons" :class="item.icon"></i>
                        <span>{{item.name}}</span>
                    </div>
                    
                </div>
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
            </div>
            <!-- 内容  -->
            <div class="item_content">
                <div class="item">
                    <div class="item_icon_con">
                        <div >
                            <div class="rising_powder">{{beforePerformance.increaseFans}}</div>
                            <div  class="rising_powder_name">涨粉量</div>
                        </div>
                        <div class="icon_back"><i class="iconfont icon-shuliang_mianxing rising_powder_icon icon_one"></i></div>
                    </div>
                    <div class="data_content">
                        <div class="bor">
                            <div>
                                <div class="h5_bold">{{beforePerformance.increaseFansTarget}}</div>
                                <div class="h6">目标</div>
                            </div>
                            <div class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansChainRatio  ? '#636060' : beforePerformance.increaseFansChainRatio > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansChainRatio ? beforePerformance.increaseFansChainRatio : '-'}}</div>
                                <div  class="h6">环比</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansToDateSchedule  ? '#636060' : beforePerformance.increaseFansToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansTargetCompleteRate ? beforePerformance.increaseFansTargetCompleteRate : '-'}}%</div>
                                <div  class="h6">达成率</div>
                            </div>
                            <div  class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansYearOnYear  ? '#636060' : beforePerformance.increaseFansYearOnYear > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansYearOnYear ? beforePerformance.increaseFansYearOnYear : '-'}}%</div>
                                <div  class="h6">同比</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="increase_content">
                        <div class="increase_item">
                            <div class="increase_green"></div>
                            <div class="increase_title">增长</div>
                        </div>
                        <div class="increase_item">
                            <div class="increase_red"></div>
                            <div class="increase_title">下降</div>
                        </div>
                    </div>
                    
                </div>

                <div class="item2">
                    <div class="item_icon_con">
                        <div >
                            <div class="rising_powder">{{beforePerformance.increaseFansFees}}</div>
                            <div  class="rising_powder_name">涨粉付费</div>
                        </div>
                        <div class="icon_back2"><i class="iconfont icon-yufufei8 rising_powder_icon"></i></div>
                    </div>
                    <div class="data_content">
                        <div class="bor">
                            <div>
                                <div class="h5_bold">{{beforePerformance.increaseFansFeesTarget}}</div>
                                <div class="h6">预算</div>
                            </div>
                            <div class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansFeesChainRatio  ? '#636060' : beforePerformance.increaseFansFeesChainRatio > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansFeesChainRatio ? beforePerformance.increaseFansFeesChainRatio : '-'}}</div>
                                <div  class="h6">环比</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansFeesToDateSchedule  ? '#636060' : beforePerformance.increaseFansFeesToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansFeesTargetCompleteRate ? beforePerformance.increaseFansFeesTargetCompleteRate : '-'}}%</div>
                                <div  class="h6"> 消耗</div>
                            </div>
                            <div  class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansFeesYearOnYear  ? '#636060' : beforePerformance.increaseFansFeesYearOnYear > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansFeesYearOnYear ? beforePerformance.increaseFansFeesYearOnYear : '-'}}%</div>
                                <div  class="h6">同比</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="increase_content">
                        <div class="increase_item">
                            <div class="increase_green"></div>
                            <div class="increase_title">增长</div>
                        </div>
                        <div class="increase_item">
                            <div class="increase_red"></div>
                            <div class="increase_title">下降</div>
                        </div>
                    </div>
                    
                </div>

                <div class="item3">
                    <div class="item_icon_con">
                        <div >
                            <div class="rising_powder">{{beforePerformance.increaseFansFeesCost}}</div>
                            <div  class="rising_powder_name">涨粉成本</div>
                        </div>
                        <div class="icon_back3"><i class="iconfont icon-shixishengchengben rising_powder_icon "></i></div>
                    </div>
                    <div class="data_content">
                        <div class="bor">
                            <div>
                                <div class="h5_bold">{{beforePerformance.increaseFansFeesCostTarget}}</div>
                                <div class="h6">目标</div>
                            </div>
                            <div class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansFeesCostChainRatio  ? '#636060' : beforePerformance.increaseFansFeesCostChainRatio > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansFeesCostChainRatio ? beforePerformance.increaseFansFeesCostChainRatio : '-'}}</div>
                                <div  class="h6">环比</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansFeesCostToDateSchedule  ? '#636060' : beforePerformance.increaseFansFeesCostToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansFeesCostTargetCompleteRate ? beforePerformance.increaseFansFeesCostTargetCompleteRate : '-'}}%</div>
                                <div  class="h6">达成率</div>
                            </div>
                            <div  class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.increaseFansFeesCostYearOnYear  ? '#636060' : beforePerformance.increaseFansFeesCostYearOnYear > 0 ?'green' : 'red'}">{{beforePerformance.increaseFansFeesCostYearOnYear ? beforePerformance.increaseFansFeesCostYearOnYear : '-'}}%</div>
                                <div  class="h6">同比</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="increase_content">
                        <div class="increase_item">
                            <div class="increase_green"></div>
                            <div class="increase_title">增长</div>
                        </div>
                        <div class="increase_item">
                            <div class="increase_red"></div>
                            <div class="increase_title">下降</div>
                        </div>
                    </div>
                    
                </div>

                <div class="item4">
                    <div class="item_icon_con">
                        <div >
                            <div class="rising_powder">{{beforePerformance.showcaseIncome}}</div>
                            <div  class="rising_powder_name">橱窗收入</div>
                        </div>
                        <div class="icon_back4"><i class="iconfont icon-income-o rising_powder_icon icon_one"></i></div>
                    </div>
                    <div class="data_content">
                        <div class="bor">
                            <div>
                                <div class="h5_bold">{{beforePerformance.showcaseIncomeTarget}}</div>
                                <div class="h6">目标</div>
                            </div>
                            <div class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.showcaseIncomeChainRatio  ? '#636060' : beforePerformance.showcaseIncomeChainRatio > 0 ?'green' : 'red'}">{{beforePerformance.showcaseIncomeChainRatio ? beforePerformance.showcaseIncomeChainRatio : '-'}}</div>
                                <div  class="h6">环比</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div  class="h5_bold" :style="{color: !beforePerformance.showcaseIncomeToDateSchedule  ? '#636060' : beforePerformance.showcaseIncomeToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.showcaseIncomeTargetCompleteRate ? beforePerformance.showcaseIncomeTargetCompleteRate : '-'}}%</div>
                                <div  class="h6">达成率</div>
                            </div>
                            <div  class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.showcaseIncomeYearOnYear  ? '#636060' : beforePerformance.showcaseIncomeYearOnYear > 0 ?'green' : 'red'}">{{beforePerformance.showcaseIncomeYearOnYear ? beforePerformance.showcaseIncomeYearOnYear : '-'}}%</div>
                                <div  class="h6">同比</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="increase_content">
                        <div class="increase_item">
                            <div class="increase_green"></div>
                            <div class="increase_title">增长</div>
                        </div>
                        <div class="increase_item">
                            <div class="increase_red"></div>
                            <div class="increase_title">下降</div>
                        </div>
                    </div>
                    
                </div>

                <div class="item5">
                    <div class="item_icon_con">
                        <div >
                            <div class="rising_powder">{{beforePerformance.showcaseFee}}</div>
                            <div  class="rising_powder_name">橱窗付费</div>
                        </div>
                        <div class="icon_back5"><i class="iconfont icon-fufeijiaoyi rising_powder_icon icon_one"></i></div>
                    </div>
                    <div class="data_content">
                        <div class="bor">
                            <div>
                                <div class="h5_bold">{{beforePerformance.showcaseFeeTarget}}</div>
                                <div class="h6">目标</div>
                            </div>
                            <div class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.showcaseFeeChainRatio  ? '#636060' : beforePerformance.showcaseFeeChainRatio > 0 ?'green' : 'red'}">{{beforePerformance.showcaseFeeChainRatio ? beforePerformance.showcaseFeeChainRatio : '-'}}</div>
                                <div  class="h6">环比</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div  class="h5_bold" :style="{color: !beforePerformance.showcaseFeeToDateSchedule  ? '#636060' : beforePerformance.showcaseFeeToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.showcaseFeeTargetCompleteRate ? beforePerformance.showcaseFeeTargetCompleteRate : '-'}}%</div>
                                <div  class="h6">消耗</div>
                            </div>
                            <div  class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.showcaseFeeYearOnYear  ? '#636060' : beforePerformance.showcaseFeeYearOnYear > 0 ?'green' : 'red'}">{{beforePerformance.showcaseFeeYearOnYear ? beforePerformance.showcaseFeeYearOnYear : '-'}}%</div>
                                <div  class="h6">同比</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="increase_content">
                        <div class="increase_item">
                            <div class="increase_green"></div>
                            <div class="increase_title">增长</div>
                        </div>
                        <div class="increase_item">
                            <div class="increase_red"></div>
                            <div class="increase_title">下降</div>
                        </div>
                    </div>
                    
                </div>

                <div class="item6">
                    <div class="item_icon_con">
                        <div >
                            <div class="rising_powder">{{beforePerformance.clues}}</div>
                            <div  class="rising_powder_name">线索量</div>
                        </div>
                        <div class="icon_back6"><i class="iconfont icon-xiansuo rising_powder_icon icon_one"></i></div>
                    </div>
                    <div class="data_content">
                        <div class="bor">
                            <div>
                                <div class="h5_bold">{{beforePerformance.cluesTarget}}</div>
                                <div class="h6">目标</div>
                            </div>
                            <div class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.cluesChainRatio  ? '#636060' : beforePerformance.cluesChainRatio > 0 ?'green' : 'red'}">{{beforePerformance.cluesChainRatio ? beforePerformance.cluesChainRatio : '-'}}</div>
                                <div  class="h6">环比</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div  class="h5_bold" :style="{color: !beforePerformance.cluesToDateSchedule  ? '#636060' : beforePerformance.cluesToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.cluesTargetCompleteRate ? beforePerformance.cluesTargetCompleteRate : '-'}}%</div>
                                <div  class="h6">达成率</div>
                            </div>
                            <div  class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.cluesYearOnYear  ? '#636060' : beforePerformance.cluesYearOnYear > 0 ?'green' : 'red'}">{{beforePerformance.cluesYearOnYear ? beforePerformance.cluesYearOnYear : '-'}}%</div>
                                <div  class="h6">同比</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="increase_content">
                        <div class="increase_item">
                            <div class="increase_green"></div>
                            <div class="increase_title">增长</div>
                        </div>
                        <div class="increase_item">
                            <div class="increase_red"></div>
                            <div class="increase_title">下降</div>
                        </div>
                    </div>
                    
                </div>

                <div class="item7">
                    <div class="item_icon_con">
                        <div >
                            <div class="rising_powder">{{beforePerformance.sendNum}}</div>
                            <div  class="rising_powder_name">发布条数</div>
                        </div>
                        <div class="icon_back7"><i class="iconfont icon-tiaoshu rising_powder_icon icon_one"></i></div>
                    </div>
                    <div class="data_content">
                        <div class="bor">
                            <div>
                                <div class="h5_bold">{{beforePerformance.sendNumTarget}}</div>
                                <div class="h6">目标</div>
                            </div>
                            <div class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.sendNumChainRatio  ? '#636060' : beforePerformance.sendNumChainRatio > 0 ?'green' : 'red'}">{{beforePerformance.sendNumChainRatio ? beforePerformance.sendNumChainRatio : '-'}}</div>
                                <div  class="h6">环比</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div  class="h5_bold" :style="{color: !beforePerformance.sendNumToDateSchedule  ? '#636060' : beforePerformance.sendNumToDateSchedule > 0 ?'green' : 'red'}">{{beforePerformance.sendNumTargetCompleteRate ? beforePerformance.sendNumTargetCompleteRate : '-'}}%</div>
                                <div  class="h6">达成率</div>
                            </div>
                            <div  class="date_mr">
                                <div  class="h5_bold" :style="{color: !beforePerformance.sendNumYearOnYear  ? '#636060' : beforePerformance.sendNumYearOnYear > 0 ?'green' : 'red'}">{{beforePerformance.sendNumYearOnYear ? beforePerformance.sendNumYearOnYear : '-'}}%</div>
                                <div  class="h6">同比</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="increase_content">
                        <div class="increase_item">
                            <div class="increase_green"></div>
                            <div class="increase_title">增长</div>
                        </div>
                        <div class="increase_item">
                            <div class="increase_red"></div>
                            <div class="increase_title">下降</div>
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    </div>
</template>
<script>
import * as api from "@/api/newBusinessDashboard";

export default {
    props:{
        title:String,
        params:Object
    },
    data(){
        return{
            month: this.$moment().format("YYYY-MM"),
            list:[
                {
                    icon:'icon-douyin-',
                    name:'抖音',
                    id:1,
                    isSelected: true
                },
                {
                    icon:'icon-shipinhao',
                    name:'视频号',
                    id:2,
                    isSelected: false
                },
                {
                    icon:'icon-xiaohongshu1',
                    name:'小红书',
                    id:3,
                    isSelected: false
                },
            ],
            selectedTabs: [1] ,// 已选中的标签页索引列表
            // 公司业绩
            beforePerformance:{},
            // 刀刀业绩
            daodaoBeforePerformance:{},
            // 吉娜业绩
            jinaBeforePerformance:{},
            
        }
    },
    methods:{
        // 获取业绩数据
        getData(){
            if(!this.month){
                this.$Message.warning('请选择日期！')
                return
            }
            const data = {
                year:this.$moment(this.month).format("YYYY"),
                month:this.$moment(this.month).format("MM"),
                baseLiveAnchorId: this.title == "刀刀组" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "刀刀").id : this.title == "吉娜组" ? this.params.liveAnchorBaseInfos.find((item) => item.name == "吉娜").id : '',
                showTikTokData:this.list.find(item=>item.id==1).isSelected,
                showWechatVideoData:this.list.find(item=>item.id==2).isSelected,
                showXiaoHongShuData:this.list.find(item=>item.id==3).isSelected,
            }
            
            api.getBeforeLivingData(data).then(res=>{
                if(res.code == 0){
                    this.beforePerformance = res.data.data
                }
            })  
        },
        selectTab(index,value) {
            this.list[index].isSelected = !this.list[index].isSelected;
            this.getData()
            // if(this.list[index].isSelected ==true ){
            //     //添加
            //     this.selectedTabs.push(this.list[index].id)
            //     console.log(this.selectedTabs,'添加')
            // }else{
            //     // 删除
            //     const findIndex = this.selectedTabs.findIndex(item=> item==value.id)
            //     this.selectedTabs.splice(findIndex,1)
            //     console.log(this.selectedTabs,'删除')
            // }
        },

    },
    mounted(){
        
    },
    created(){
    }
}
</script>
<style scoped lang="less">
/deep/ .ivu-card-body{
    width: 100% !important;
}
.content{
    position: relative;
}
.container{
    width: 100%;
}
.title{
    font-size: 18px;
    /* font-weight: bold; */
    width: 100px;
    height: 32px;
    background: #478bfc;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 6px;
}
.tab_content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:  30px 0 15px 0;
    width: 100%;
}
.tab{
    display: flex;
}
.tab_item{
    background: #F0F0F0;
    padding: 1px 15px;
    box-sizing: border-box;
    margin-right: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
}
.icons{
    font-size: 14px;
    margin-right: 2px;
}
.active{
  color: red;  
  border: 1px solid red;
}
.item,.item2,.item3,.item4,.item5,.item6,.item7{
    /* width: 140px; */
    width: 11%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
}
.item{
    background-image: linear-gradient(to bottom, #E8EFFF, #fff);
}
.item2{
    background-image: linear-gradient(to bottom, #E9FFFE, #fff);
}
.item3{
    background-image: linear-gradient(to bottom, #EDFFF3, #fff);
}
.item4{
    background-image: linear-gradient(to bottom, #FFF4FC, #fff);
}
.item5{
    background-image: linear-gradient(to bottom, #FFF1F3, #fff);
}
.item6{
    background-image: linear-gradient(to bottom, #FFFAE6, #fff);
}
.item7{
    background-image: linear-gradient(to bottom, #EEF9FF, #fff);
}

.item_icon_con{
    display: flex;
    justify-content: space-between;
}
.rising_powder{
    font-size: 22px;
    font-weight: bold;
}
.rising_powder_name{
    font-size: 13px;
    color: #979797;
}
.icon_back,.icon_back2,.icon_back3,.icon_back4,.icon_back5,.icon_back6,.icon_back7{
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    box-sizing: border-box;
    border-radius: 50%;
    opacity: .8;
    color: #8DB1E0;
}
.icon_back{
    background: #DBEAFD;
}
.icon_back2{
    background: #D1FBF9;
}
.icon_back3{
    background: #DAFFE7;
}
.icon_back4{
    background: #FFEAF8;
}
.icon_back5{
    background: #FFE3E8;
}
.icon_back6{
    background: #FFF6D0;
}
.icon_back7{
    background: #DCF2FF;
}

.rising_powder_icon{
    font-size: 22px;
}
.icon_one{
    font-size: 18px !important
}
.data_content{
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
}
.bor{
    width: 50%;
    border-right: 1px solid #D9D9D9;
}
.h5_bold{
    font-size: 14px;
    font-weight: bold;
    color: #636060;
}
.h6{
    font-size: 10px;
}
.date_mr{
    margin-top: 5px;
}
.increase_green,.increase_red{
    width: 6px;
    height: 6px;
    
    border-radius: 50%;
}
.increase_green{
    background: #008000;
}
.increase_red{
    background: #FF0000;
}
.increase_title{
    font-size: 10px;
    color: #979797;
}
.increase_item{
    display: flex;
    align-items: center;
    margin-right: 10px;
    
}
.increase_content{
    display: flex;
    margin-top: 10px;
}
.item_content{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>
