<template>
  <div>
    <Modal
      v-model="customerAppointmentModals"
      title="客户预约报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
       <Select
          v-model="query.status"
          placeholder="请选择预约状态"
          style="width:250px;margin-right:10px"
        >
          <Option
            v-for="item in query.reservationStatus"
            :value="item.status"
            :key="item.status"
            >{{ item.statusText }}</Option
          >
        </Select>
      <DatePicker
        type="date"
        placeholder="下单开始日期"
        style="width: 160px;"
        :value="query.startDate"
        v-model="query.startDate"
      ></DatePicker>
      <DatePicker
        type="date"
        placeholder="下单结束日期"
        style="width: 160px; margin-left: 10px"
        :value="query.endDate"
        v-model="query.endDate"
      ></DatePicker>
      <Button type="primary" style="margin:0 10px" @click="getsendOrderReport">查询</Button>
      <Button type="primary" @click="exportsendOrder" v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <Button @click="cancelSubmits()">关闭页面</Button>
          <!-- <Button type="primary" @click="handleSubmit()">确定</Button> -->
        </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import { download } from "@/utils/util";
export default {
  props: {
    customerAppointmentModal: {
        type: Boolean,
    },
  },
  data() {
    return{
        customerAppointmentModals:false,
        query:{
          reservationStatus:[
            {
              statusText:'待完成',
              status:1
            },
            {
              statusText:'已完成',
              status:2
            },
            {
              statusText:'已取消',
              status:3
            },
            {
              statusText:'已派单至医院',
              status:4
            }
          ],
          status:null,
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            {
              title: "预约电话",
              key: "phone",
              minWidth: 180,
              tooltip:true
            },
            {
              title: "预约时间",
              tooltip:true,
              minWidth: 200,
              key: "time",
              render: (h, params) => {
                return h(
                  "div",
                  this.$moment(params.row.appointmentDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                );
              },
            },
            {
              title: "星期",
              key: "week",
              minWidth: 150,
            },
             {
              title: "上午/下午",
              key: "time",
              minWidth: 150,
              
            },
            {
              title: "项目名称",
              key: "itemName",
              minWidth: 180,
            },
            {
              title: "预约状态",
              key: "statusText",
              minWidth: 150,
            },
            {
              title: "医院名称",
              key: "hospitalName",
              minWidth: 220,
            },
            {
              title: "提交时间",
              tooltip:true,
              minWidth: 200,
              key: "time",
              render: (h, params) => {
                return h(
                  "div",
                  this.$moment(params.row.submitDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                );
              },
            },
            {
              title: "备注",
              key: "remark",
              minWidth: 180,
            }
            
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取客户预约报表
    getsendOrderReport() {
      const { startDate,endDate  ,status} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            status:status
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.getcustomerAppointmentReport(data).then((res) => {
        if (res.code === 0) {
          const { customerAppointmentReport} = res.data;
          this.query.data = customerAppointmentReport;
        }
      });
    },
    // 导出
    exportsendOrder(){
      const { startDate,endDate  ,status} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        status:status
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.getcustomerAppointmentReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '客户预约报表'
          download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.query.status = null
          this.$emit("update:customerAppointmentModal", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.query.status = null
      this.$emit("update:customerAppointmentModal", false);
    },
  },
  created(){
    // this.getsendOrderReport()
  },
  watch: {
    customerAppointmentModal(value){
        this.customerAppointmentModals = value;
    },
    
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.foot{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.num{
  margin-right: 20px ;
}
</style>
