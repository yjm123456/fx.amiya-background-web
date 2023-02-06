<template>
  <div class="content">
    <Modal
      title="指派给"
      footer-hide
      v-model="assignModels"
      width="25%"
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
       <FormItem label="指派给" prop="assignBy">
        <Select
            v-model="form.assignBy"
            placeholder="请选择指派给"
            filterable
        >
            <Option
            v-for="item in assignParams.employeeList"
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
import * as api from "@/api/shoppingCartRegistration";
export default {
  components:{
      
  },
  props: {
    assignModel: Boolean,
    assignParams:Object,
  },
  data() {
    return {
      assignModels:false,
      form:{
          assignBy:null,
      },
      ruleValidate: {
        assignBy: [
          {
            required: true,
            message: "请选择指派给",
          },
        ],
      }
    };
  },
  methods: {
      handleSubmit(){
          const data = {
              id:this.assignParams.id,
              assignBy:Number(this.form.assignBy)
          }
          api.ShoppingCartRegistrationAssign(data).then((res) => {
              if(res.code == 0){
                  this.form.assignBy = null 
                  this.$Message.success('指派成功')
                  this.cancel()
                  this.$emit("getSmallCar")
              }
          })
      },
    // 取消
    cancel(name) {
      this.$emit("update:assignModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:assignModel", false);
      }
        
    },
  },
  watch: {
    assignModel: {
      handler(assignModel) {
        this.assignModels = assignModel
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
