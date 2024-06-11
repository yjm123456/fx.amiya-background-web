<template>
  <div class="item_content" >
    <div v-for="(items,index) in employeeDatas" :key="index" style="display:flex;width:100%">
      <div class="item" :style="{ 'background-image': items.background }" >
        <div class="name">{{items.employeeName}}</div>
        <div class="price">￥{{items.performance}}</div>
        <div>完成率：{{items.completeRate}}%</div>
        <Progress :percent="items.completeRate >100 ? 100 : items.completeRate" hide-info style="width:80%" stroke-color="#ffff92"> </Progress>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    background: String,
    name: String,
    price: String,
    completionRate: String,
    employeeDatas:Array
  },
};
</script>

<style scoped>
.item_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  
}
.item {
  width: 90%;
  border-radius: 10px;
  padding: 10px 0;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  margin: 0 auto;
}
.name{
    font-size: 18px;
}
.price{
    font-size: 16px;
    margin: 1px 0 ;
}
</style>
