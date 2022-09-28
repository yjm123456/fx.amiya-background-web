<template>
  <div class="content">
    <Modal
      title="修改"
      footer-hide
      v-model="editcontrolModals"
      width="40%"
      :closable="false"
      @click="handleModalVisibleChange"

    >
     <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
      <FormItem label="运营维度" prop="operationName">
            <Input v-model="form.operationName" placeholder="请输入运营维度" ></Input>
       </FormItem>
       <FormItem label="前月数据" prop="beforeMonthData">
            <Input v-model="form.beforeMonthData" placeholder="请输入前月数据" type="number" number @on-change="beforeMonthDataChange"></Input>
       </FormItem>
       <FormItem label="上月数据" prop="lastMonthData">
            <Input v-model="form.lastMonthData" placeholder="请输入上月数据" type="number" number @on-change="lastMonthDataChange"></Input>
       </FormItem>
       <FormItem label="环比(%)" prop="chainRatio">
            <Input v-model="form.chainRatio" placeholder="请输入环比" type="number" number disabled></Input>
       </FormItem>
       </Form>
      <div class="footer" >
          <Button @click="cancelSubmit('form')" style="margin-right: 10px" >取消</Button>
          <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
export default {
  components:{
      
  },
  props: {
    editcontrolModal: Boolean,
    hospitalOperationDataInfo:Object
  },
  data() {
    return {
      editcontrolModals:false,
      form:{
        id:'',
        hospitalId:null,
        indicatorsId:'',
        operationName:'',
        lastMonthData:null,
        beforeMonthData:null,
        chainRatio:null,
      },
      ruleValidate: {
        operationName: [
          {
            required: true,
            message: "请输入运营维度",
          },
        ],
        beforeMonthData: [
          {
            required: true,
            message: "请输入前月数据",
          },
        ],
        lastMonthData: [
          {
            required: true,
            message: "请输入上月数据",
          },
        ],
        chainRatio: [
          {
            required: true,
            message: "请输入环比",
          },
        ],

      }
    };
  },
  methods: {
    beforeMonthDataChange(){
        const {lastMonthData,beforeMonthData} = this.form
        this.form.chainRatio = (((lastMonthData-beforeMonthData) / beforeMonthData ) * 100).toFixed(2)
    },
    lastMonthDataChange(){
        const {lastMonthData,beforeMonthData} = this.form
        this.form.chainRatio = (((lastMonthData-beforeMonthData) / beforeMonthData ) * 100).toFixed(2)
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            const {id,hospitalId,indicatorsId,operationName,lastMonthData,beforeMonthData,chainRatio} = this.form
            const data = {
                id,
                hospitalId,
                indicatorsId,
                operationName,
                lastMonthData,
                beforeMonthData,
                chainRatio:Number(chainRatio),
            }
            // 修改
            api.editHospitalOperationData(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.$emit('getHospitalOperationData');
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
        }
      });
    },
   
    // 取消
    cancelSubmit(name) {
        this.$refs[name].resetFields();
      this.$emit("update:editcontrolModal", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {

      if (!value) {
        this.cancelSubmit();
        this.$refs["form"].resetFields();
        this.$emit("update:editcontrolModal", false);
      }
        
    },
  },
  watch: {
    editcontrolModal: {
      handler(editcontrolModal) {
        this.editcontrolModals = editcontrolModal
      },
      deep: true,
    },
    hospitalOperationDataInfo(value){
           this.form.id = value.id
           this.form.hospitalId = value.hospitalId
           this.form.indicatorsId = value.indicatorsId
           this.form.operationName = value.operationName
           this.form.lastMonthData = value.lastMonthData
           this.form.beforeMonthData = value.beforeMonthData
           this.form.chainRatio = value.chainRatio
           this.form.greatHospital = value.greatHospital
       }
    
  },
};
</script>
<style scoped lang="less">
.img_o {
  width: 100%;
  height: auto;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img,.img_o{
  width: 150px;
  height: 150px;
  margin-right: 10px;
}
.no_date{
  text-align: center;
}
.img_cons{
  display: flex;
}
</style>
