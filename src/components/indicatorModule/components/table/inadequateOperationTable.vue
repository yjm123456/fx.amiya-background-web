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
            render: (h, params) => {
              return h("Input", {
                props: {
                  value: params.row.content,
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
          {
            title: "操作",
            align: "center",
            width: 100,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        const idArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
                        const { sort } = params.row;
                        const findIndex = this.query.data.findIndex(
                          (item) => item.sort === sort
                        );
                        this.query.data.splice(findIndex, 1)
                        this.query.data.forEach((ele, key) => {
                            ele.sort = idArr[key]
                        });
                      },
                    },
                  },
                  "删除"
                ),
              ]);
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
        indicatorId:this.remarkParams.indicatorId,
        hospitalId:this.remarkParams.hospitalId,
        type:this.remarkParams.type
      });
    },
  },
  watch:{
   operationalBenefits:{
    handler(value) {
      if(value.length == 0){
        this.$nextTick(()=>{
          this.query.data = [
          {
            sort: 1,
            content: "",
            indicatorId:this.remarkParams.indicatorId,
            hospitalId:this.remarkParams.hospitalId,
            type:this.remarkParams.type
          },
          {
            sort: 2,
            content: "",
            indicatorId:this.remarkParams.indicatorId,
            hospitalId:this.remarkParams.hospitalId,
            type:this.remarkParams.type
          },
        ] 
        })
         
      }
        this.query.data = value
    
    }
   }
  }
};
</script>
