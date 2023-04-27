<template>
    <div class="list_content">
        <div class="item">
            <div class="num"  @click="moreClick">{{dataParams.NotRepeatedSendOrder}}</div>
            <div class="title">未处理派单</div>
        </div>
        <div class="item">
            <div class="num">0</div>
            <div class="title">未读聊天</div>
        </div>
        <div class="item">
            <div class="num">0</div>
            <div class="title">未读通知</div>
        </div>
    </div>
</template>
<script>

export default {
    props:{
        dataParams:Object
    },
    methods:{
        moreClick(){
            this.$router.push("/hospitalSendOrderList");
        },
    }
}
</script>

<style scoped>
.list_content{
    display: flex;
}
.item{
    margin: 0 40px;
    text-align: center;
}
.num{
    color: #2263b2;
    font-weight: bold;
    font-size: 26px;
    cursor: pointer;
}
.title{
    font-size: 16px;
}
</style>