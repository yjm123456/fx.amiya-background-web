<template>
    <div>
    <Modal
      v-model="control"
      title="查看订单"
       :mask-closable="false"
      :closable="false"
      width="50%"
    >
      <div>
        <Table
          border
          :columns="query.columns"
          :data="query.data"
        ></Table>
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          @on-change="handlePageChange"
          style="text-align:end;margin-top:10px"
        />
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
        viewOrderModel:Boolean
    },
    data(){
        return{
            control:false,
            query:{
                columns: [
                    {
                        title: "订单号",
                        key: "id",
                        minWidth: 170,
                        align: "center",
                    },
                    {
                        title: "归属客服",
                        key: "belongEmpName",
                        minWidth: 110,
                        align: "center",
                    },
                    {
                        title: "辅助客服",
                        key: "supportEmpName",
                        minWidth: 110,
                        align: "center",
                    },
                    {
                        title: "咨询内容",
                        key: "consultingContent",
                        minWidth: 500,
                        tooltip:true
                    },
                ],
                pageNum: 1,
                pageSize: 5,
                totalCount: 0,
                data:[],
                hospitalId:null,
                customerPhone:''
            }
        }
    },
    methods:{
        // 获取内容平台列表
        getContentPlateFormOrderLlistWithPage(hospitalId,customerPhone){
            this.query.hospitalId = hospitalId
            this.query.customerPhone = customerPhone
            const {pageNum,pageSize} = this.query
            const data = {
                keyword:customerPhone,
                pageNum,
                pageSize,
                orderSource:-1,
                appointmentHospital: hospitalId
            }
            api.getContentPlateFormOrderLlistWithPage(data).then(res=>{
                const { list, totalCount } = res.data.contentPlatFormOrder;
                this.query.data = list;
                this.query.totalCount = totalCount;
            })
        },
        // 获取内容平台列表分页
        handlePageChange(pageNum){
            const data = {
                keyword:this.query.customerPhone,
                pageNum:pageNum,
                pageSize:10,
                orderSource:-1,
                appointmentHospital: this.query.hospitalId
            }
            api.getContentPlateFormOrderLlistWithPage(data).then(res=>{
                const { list, totalCount } = res.data.contentPlatFormOrder;
                this.query.data = list;
                this.query.totalCount = totalCount;
            })
        },
        
        handleCancel(name) {
            this.$emit("update:viewOrderModel", false);
            this.query.customerPhone = ''
            this.query.hospitalId = null
        },
        
    },
    watch: {
    viewOrderModel(value) {
      this.control = value;
    },
  },
}
</script>
