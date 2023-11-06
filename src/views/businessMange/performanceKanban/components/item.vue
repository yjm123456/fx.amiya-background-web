<template>
    <div class="content">
        <div v-for="(item,index) in cooperateLiveAnchorPerformanceDataList" :key="index" class="list_con">
            <div class="title">{{item.liveanchorName}}</div>
            <div class="list" >
                <div class="item">
                    <i class="iconfont icon-huabigongju-tuoyuan circle cl"></i>
                    <span>总业绩</span>
                    <div class="num_con"><span class="num">{{item.performance}}</span><span>元</span></div>
                </div>
                <div class="item">
                    <div class="item_con">
                        <div class="left">
                            <i class="iconfont icon-huabigongju-tuoyuan circle cl2"></i>
                            <span>新客成交业绩</span>
                            <div class="num_con"><span class="num">{{item.newCustomerPerformance}}</span><span>元</span></div>
                        </div>
                        <div class="right">
                            <div>业绩占比</div>
                            <div class="num_con num">{{item.newCustomerPerformanceRatio}}%</div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item_con">
                        <div class="left">
                            <i class="iconfont icon-huabigongju-tuoyuan circle cl3"></i>
                            <span>老客成交业绩</span>
                            <div class="num_con"><span class="num">{{item.oldCustomerPerformance}}</span><span>元</span></div>
                        </div>
                        <div class="right">
                            <div>业绩占比</div>
                            <div class="num_con num">{{item.oldCustomerPerformanceRatio}}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default{
    props:{
        cooperateLiveAnchorPerformanceDataList:Array
    },
    data(){
        return{

        }
    },
    methods:{
        
    },
}
</script>

<style scoped>
.content{
    color: #000;
    display: flex;
    flex-direction: column;
}
.list_con{
    width: 100%;
}
.list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* justify-content: space-between; */
    /* padding: 0 1%; */
}
.item{
    /* flex:1; */
    width: 30%;
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    margin : 0 4% 20px 0;
    border-radius: 5px;
}
.item:last-child{
    margin-right: 0;
}
.circle{
    font-size: 10px;
    font-weight: bold;
    margin-right: 5px;
}
.cl{
    color: orange;
}
.cl2{
    color: #3885FF;
}
.cl3{
    color: #39BBD5;
}
.num_con{
    margin-top: 5px;
}
.num{
    font-size: 20px;
    font-weight: bold;
    margin-right: 5px;
}
.item_con{
    display: flex;
    justify-content: space-between;
}
.title{
    padding-left: .5%;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    
}
.right{
    display: flex;
    flex-direction: column;
}
</style>