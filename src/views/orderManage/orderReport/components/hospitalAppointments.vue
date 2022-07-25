<template>
  <div>
    <Modal
      v-model="hospitalAppointmentsModels"
      title="医院预约量报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
       <Input
          v-model="query.hospitalName"
          placeholder="请输入医院名称"
          style="width: 200px;"
          @keyup.enter.native="gethospitalAppointments()"
        />
      <DatePicker
        type="date"
        placeholder="下单开始日期"
        style="width: 160px; margin-left: 10px"
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
      <Button type="primary" style="margin:0 10px" @click="gethospitalAppointments">查询</Button>
      <Button type="primary" @click="exportsendOrder"  v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" :span-method="handleSpan" height="700"></Table>
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
    hospitalAppointmentsModel: {
        type: Boolean,
    },
  },
  data() {
    return{
        hospitalAppointmentsModels:false,
        query:{
          hospitalName:"",
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          columns: [
            {
              title: "医院名称",
              key: "hospitalName",
              minWidth: 220,
            },
            {
              title: "预约日期",
              tooltip:true,
              minWidth: 200,
              key: "appointmentDate",
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
              title: "客户电话",
              key: "phone",
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
              title: "备注",
              key: "remark",
              minWidth: 150,
            },
          ],
          data: [],
        }
    }
  },
  methods:{
    // 获取医院预约量报表
    gethospitalAppointments() {
      const { startDate,endDate ,hospitalName} = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            hospitalName,
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.gethospitalAppointmentReport(data).then((res) => {
        if (res.code === 0) {
          const { hospitalAppointmentReport} = res.data;
          this.query.data = hospitalAppointmentReport;
          this.integratedData(this.query.data)
        }
      });
    },
    // 导出
    exportsendOrder(){
      const { startDate,endDate ,hospitalName} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        hospitalName
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.gethospitalAppointmentReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '医院预约量报表'
          download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.query.hospitalName = ""
          this.$emit("update:hospitalAppointmentsModel", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD") 
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.query.hospitalName = ""
      this.$emit("update:hospitalAppointmentsModel", false);
    },
    // 被整理的数组中相同hospitalName的元素需放在一块，否则还要再整理数据（暂未处理）
    integratedData(data) {
        let that = this;
        // 获取所有的不同年龄值
        let arrId = [];
        data.forEach(i => {
            !arrId.includes(i.hospitalName) ? arrId.push(i.hospitalName) : arrId;
        });
        // 提前为每个年龄值设置跨行数为0
        let arrObj = [];
        arrId.forEach(j => {
            arrObj.push({
                id: j,
                num: 0
            })
        })
        // 计算每个年龄的可跨行数
        data.forEach(k => {
            arrObj.forEach(l => {
                k.hospitalName === l.id ? l.num ++ : l.num;
            })
        })
        data.forEach(m => {
            arrObj.forEach((n,index) => {
                if(m.hospitalName === n.id){
                    if(arrId.includes(m.hospitalName)){
                        m.mergeCol = n.num;
                        arrId.splice(arrId.indexOf(m.hospitalName),1);
                    }else{
                        m.mergeCol = 0;
                    }
                }
            })
        })
        return data;
    },
    // 只针对相同hospitalName字段合并列，hospitalName位于第一列，columnIndex为0
    handleSpan ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
            return {
                rowspan: row.mergeCol === 0 ? 0:row.mergeCol,
                colspan: row.mergeCol === 0 ? 0:1
            };
        }
    }
  },
  created(){
  },
  watch: {
    hospitalAppointmentsModel(value){
        this.hospitalAppointmentsModels = value;
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
  font-size: 18px;
  display: flex;
}
</style>
