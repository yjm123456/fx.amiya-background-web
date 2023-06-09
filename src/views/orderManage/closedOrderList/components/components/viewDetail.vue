<template>
    <div>
    <Modal
      v-model="control"
      title="查看详情"
       :mask-closable="false"
      :closable="false"
      width="50%"
    >
      <div>
        <Table
          border
          :columns="query.columns"
          :data="viewDetailList"
          height="400"
        ></Table>
      </div>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";

export default{
    props:{
        viewDetailModel:Boolean,
        viewDetailList:Array
    },
    data(){
        return{
            control:false,
            query:{
                columns: [
                    
                    {
                        title: "项目",
                        key: "itemName",
                        minWidth: 180,
                        align: "center",
                    },
                    {
                        title: "项目规格",
                        key: "itemStandard",
                        minWidth: 120,
                        align: "center",
                    },
                    {
                        title: "数量",
                        key: "quantity",
                        minWidth: 120,
                        tooltip:true
                    },
                    {
                        title: "金额",
                        key: "cashAmount",
                        minWidth: 120,
                        align: "center",
                    },
                ],
                pageNum: 1,
                pageSize: 999,
                totalCount: 0,
                data:[],
            }
        }
    },
    methods:{
        handleCancel(name) {
            this.$emit("update:viewDetailModel", false);
        },
        
    },
    watch: {
    viewDetailModel(value) {
      this.control = value;
    },
  },
}
</script>
