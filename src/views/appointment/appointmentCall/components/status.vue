<template>
  <div class="content">
    <Modal
      title="修改叫车状态"
      footer-hide
      v-model="statusControlModals"
      width="40%"
      :closable="false"
      @click="handleModalVisibleChange"

    >
    <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
       <FormItem label="叫车状态" prop="status">
        <Select
            v-model="form.status"
            placeholder="请选择叫车状态"
            filterable
        >
            <Option
            v-for="item in appointmentCarTypeList"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
            >
        </Select>
     </FormItem>
    </Form>
      <div class="footer" >
          <Button @click="cancel" style="margin-right: 10px" >取消</Button>
          <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/appointmentCar";
export default {
  components:{
      
  },
  props: {
    statusControlModal: Boolean,
    appointmentCarTypeList:Array,
    id:String
  },
  data() {
    return {
      statusControlModals:false,
      form:{
          status:null,
      },
      ruleValidate: {
        status: [
          {
            required: true,
            message: "请选择叫车状态",
          },
        ],
      }
    };
  },
  methods: {
      handleSubmit(){
          const data = {
              id:this.id,
              status:this.form.status
          }
          api.updateStaus(data).then((res) => {
              if(res.code == 0){
                  this.form.status = null 
                  this.$Message.success('修改成功')
                  this.cancel()
                  this.$emit("getHospitalInfo")
              }
          })
      },
    // 取消
    cancel(name) {
      this.$emit("update:statusControlModal", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:statusControlModal", false);
      }
        
    },
  },
  watch: {
    statusControlModal: {
      handler(statusControlModal) {
        this.statusControlModals = statusControlModal
      },
      deep: true,
    },
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
  margin-bottom: 10px;
}
.no_date{
  text-align: center;
}
.img_cons{
  display: flex;
  flex-wrap: wrap;
}
</style>
