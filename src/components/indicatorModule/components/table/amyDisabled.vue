<template>
  <div>
    <!-- 运营不足 -->
    <Table border :columns="query.columns" :data="query.data"></Table>
  </div>
</template>
<script>
export default {
  props:{
    amyremarkParams:Object,
    // 运营优点
    amyoperationalBenefits:Array,
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
            render: (h, params) => {
              return h("Input", {
                props: {
                  value: params.row.content,
                  disabled:sessionStorage.getItem("employeeType") =="hospitalEmployee",
                },
                style: {
                  width: "100%",
                },
                on: {
                  input: (val) => {
                    this.query.data[params.index].content = val;
                  },
                },
              });
            },
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
        indicatorId:this.amyremarkParams.indicatorId,
        hospitalId:this.amyremarkParams.hospitalId,
        type:this.amyremarkParams.type
      });
    },
  },
  watch:{
   amyoperationalBenefits:{
    handler(value) {
        this.query.data = value
    
    }
   }
  }
};
</script>
