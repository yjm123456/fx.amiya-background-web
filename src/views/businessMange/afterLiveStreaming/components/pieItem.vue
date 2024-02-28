<template>
  <div>
    <div class="item_con">
      <Card class="item"
        ><pies :newAndOldCustomers="newAndOldCustomers"
      /></Card>
      <Card class="item"
        ><pies :newAndOldCustomers="effectivePotential"
      /></Card>
    </div>
    <div class="item_con2">
      <Card class="item"
        ><pies :newAndOldCustomers="newAndOldCustomers2"
      /></Card>
      <Card class="item"
        ><pies :newAndOldCustomers="newAndOldCustomers3"
      /></Card>
    </div>
  </div>
</template>
<script>
import pies from "./pies.vue";
export default {
  props:{
    params: Object
  },
  components: {
    pies,
  },
  data() {
    return {
      // 新老客业绩占比
      newAndOldCustomers: [],
      // 有效潜在业绩占比
      effectivePotential: [],
      // 新客有效新客潜在业绩占比
      newAndOldCustomers2: [],
      // 老客有效老客潜在业绩占比
      newAndOldCustomers3: [],
      
    };
  },
  watch:{
    params: {
      handler(value) {
        this.newAndOldCustomers=[{name:'新客业绩',value:value.afterPerformance.newCustomerPerformanceRate},{name:'老客业绩',value:value.afterPerformance.oldCustomerPerformanceRate}]
        this.effectivePotential=[{name:'有效业绩',value:value.afterPerformance.effectivePerformanceRate},{name:'潜在业绩',value:value.afterPerformance.potentialPerformanceRate}]
        this.newAndOldCustomers2=[{name:'新客有效业绩',value:value.afterPerformance.newCustomerEffectivePerformanceRate},{name:'新客潜在业绩',value:value.afterPerformance.newCustomerPotentialPerformanceRate}]
        this.newAndOldCustomers3=[{name:'老客有效业绩',value:value.afterPerformance.oldCustomerEffectivePerformanceRate},{name:'老客潜在业绩',value:value.afterPerformance.oldCustomerPotentialPerformanceRate}]
      },
      deep: true,
    },
  }
};
</script>
<style scoped>
.item_con ,.item_con2{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.item {
  width: 48.5%;
}
.item_con2{
    margin-top: 10px;
}
.title {
  font-size: 18px;
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
.top{
 text-align: end;
}
</style>
