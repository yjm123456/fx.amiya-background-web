<template>
    <div class="container">
        <div class="h2">业绩趋势</div>
        <monthLineVue :brokenLineData="performanceKanbanParams.brokenLineData"/>

    </div>
</template>
<script>
import monthLineVue from './monthLine.vue'
export default{
    components:{
        monthLineVue
    },
    props:{
        performanceKanbanParams:Object
    }
}
</script>

<style scoped>
.container{
    padding: 1%;
  box-sizing: border-box;
  margin-top: 45px;
  height: 420px;
}
.h2{
    font-size: 18px;
    font-weight: bold;
    color: #000;
}
</style>