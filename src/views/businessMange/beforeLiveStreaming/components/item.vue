<template>
    <Card  class="content">
        <div class="title">公司</div>
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
        <!--  -->
        <div class="item_content">
            <div class="item">
                <div class="item_icon_con">
                    <div >
                        <div class="rising_powder">5000</div>
                        <div  class="rising_powder_name">涨粉量</div>
                    </div>
                    <div class="icon_back"><i class="iconfont icon-toufangzhangfen rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">50000</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold">50000</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold">100%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold">100%</div>
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
                        <div class="rising_powder">5000</div>
                        <div  class="rising_powder_name">涨粉量</div>
                    </div>
                    <div class="icon_back2"><i class="iconfont icon-toufangzhangfen rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">50000</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold">50000</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold">100%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold">100%</div>
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
                        <div class="rising_powder">5000</div>
                        <div  class="rising_powder_name">涨粉量</div>
                    </div>
                    <div class="icon_back3"><i class="iconfont icon-toufangzhangfen rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">50000</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold">50000</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold">100%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold">100%</div>
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
                        <div class="rising_powder">5000</div>
                        <div  class="rising_powder_name">涨粉量</div>
                    </div>
                    <div class="icon_back4"><i class="iconfont icon-toufangzhangfen rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">50000</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold">50000</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold">100%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold">100%</div>
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
                        <div class="rising_powder">5000</div>
                        <div  class="rising_powder_name">涨粉量</div>
                    </div>
                    <div class="icon_back5"><i class="iconfont icon-toufangzhangfen rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">50000</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold">50000</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold">100%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold">100%</div>
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
                        <div class="rising_powder">5000</div>
                        <div  class="rising_powder_name">涨粉量</div>
                    </div>
                    <div class="icon_back6"><i class="iconfont icon-toufangzhangfen rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">50000</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold">50000</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold">100%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold">100%</div>
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
                        <div class="rising_powder">5000</div>
                        <div  class="rising_powder_name">涨粉量</div>
                    </div>
                    <div class="icon_back7"><i class="iconfont icon-toufangzhangfen rising_powder_icon"></i></div>
                </div>
                <div class="data_content">
                    <div class="bor">
                        <div>
                            <div class="h5_bold">50000</div>
                            <div class="h6">目标</div>
                        </div>
                        <div class="date_mr">
                            <div  class="h5_bold">50000</div>
                            <div  class="h6">环比</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  class="h5_bold">100%</div>
                            <div  class="h6">达成率</div>
                        </div>
                        <div  class="date_mr">
                            <div  class="h5_bold">100%</div>
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
</template>
<script>
export default{
    data(){
        return{
            month: this.$moment().format("YYYY-MM"),
            list:[
                {
                    icon:'icon-douyin-',
                    name:'抖音',
                    id:1,
                    isSelected: false
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
            selectedTabs: [] // 已选中的标签页索引列表
        }
    },
    methods:{
        getData(){
            console.log(23123)
        },
        selectTab(index,value) {
            this.list[index].isSelected = !this.list[index].isSelected;
            if(this.list[index].isSelected ==true ){
                //添加
                this.selectedTabs.push(this.list[index].id)
            }else{
                // 删除
                const findIndex = this.selectedTabs.findIndex(item=> item==value.id)
                this.selectedTabs.splice(findIndex,1)
            }
        },

    }
}
</script>
<style scoped>
.content{
    color: #000;
    border-radius: 15px;
}
.title{
    font-size: 18px;
    font-weight: bold;
}
.tab_content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:  15px 0;
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
}
</style>
