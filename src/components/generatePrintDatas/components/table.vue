<template>
  <div>
    <!-- 运营不足 -->
    <Table border :columns="query.columns" :data="query.data"></Table>
  </div>
</template>
<script>
export default {
  props:{
    remarkParams:Object,
    // 运营优点
    operationalBenefits:Array,
    // 
  },
  data() {
    return {
      addForm: {
        id: null,
        content: "",
      },
      id: null,
      query: {
        columns: [
          {
            title: "序号",
            key: "sort",
            width: 80,
          },
          {
            title: "内容",
            key: "content",
            width:1450
          },
        ],
        data: [],
      },
    };
  },
  methods: {
    addTableS() {
      const { sort, content } = this.addForm;
      var index = this.query.data.length + 1;
      this.query.data.push({
        sort: index++,
        content: content,
        indicatorId:this.remarkParams.indicatorId,
        hospitalId:this.remarkParams.hospitalId,
        type:this.remarkParams.type
      });
    },
  },
  watch:{
   operationalBenefits:{
    handler(value) {
        this.query.data = value
    }
   }
  }
};
</script>
