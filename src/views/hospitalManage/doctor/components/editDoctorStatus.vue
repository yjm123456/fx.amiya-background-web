<template>
  <div class="content">
    <Modal
      title="修改在职状态"
      v-model="editDoctorTypeModels"
      width="30%"
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
        <FormItem
          label="在职状态"
          prop="isLeaveOffice"
        >
          <!-- :disabled = "!employeeType == 'hospitalEmployee'" -->
          <Select
            v-model="form.isLeaveOffice"
            placeholder="请选择在职状态"
            filterable
            key="在职状态"
          >
            <Option
              v-for="item in doctorType"
              :value="item.isLeaveOffice"
              :key="item.isLeaveOffice"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div class="footer" slot="footer">
          <Button @click="cancel" style="margin-right: 10px" >取消</Button>
          <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
export default {
  components:{
      
  },
  props: {
    editDoctorTypeModel: Boolean,
    id:Number
  },
  data() {
    return {
      editDoctorTypeModels:false,
      doctorType:[
        {
            isLeaveOffice:0,
            name:'离职'
        },
        {
            isLeaveOffice:1,
            name:'在职'
        }
      ],
      form:{
        isLeaveOffice:null
      },
      ruleValidate: {
        isLeaveOffice: [
          {
            required: true,
            message: "请选择在职状态",
          },
        ],
      }
    };
  },
  methods: {
    handleSubmit(){
        const data = {
            id:this.id,
            isLeaveOffice:this.form.isLeaveOffice
        }
         api.updateDoctorStatus(data).then((res) => {
            if(res.code === 0){
                this.$emit("update:editDoctorTypeModel", false);
                this.$emit("getDoctor");
                this.form.isLeaveOffice = null
            }
         })
    },
    // 取消
    cancel(name) {
      this.$emit("update:editDoctorTypeModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
      }
        
    },
  },
  watch: {
    editDoctorTypeModel: {
      handler(editDoctorTypeModel) {
        this.editDoctorTypeModels = editDoctorTypeModel
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
