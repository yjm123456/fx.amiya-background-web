<template>
  <div class="content">
    <Modal
      title="关联"
      footer-hide
      v-model="associationModels"
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
       <FormItem label="关联" prop="assignBy">
        <Select
            v-model="form.assignBy"
            placeholder="请选择关联"
            filterable
        >
            <Option
            v-for="item in associationParams.employeeList"
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
    associationModel: Boolean,
    associationParams:Object,
  },
  data() {
    return {
      associationModels:false,
      form:{
          assignBy:null,
      },
      ruleValidate: {
        assignBy: [
          {
            required: true,
            message: "请选择关联",
          },
        ],
      }
    };
  },
  methods: {
      handleSubmit(){
          const data = {
              id:this.associationParams.id,
              assignBy:Number(this.form.assignBy)
          }
          if(!data.assignBy){
            this.$Message.warning('请选择关联人员')
            return
          }
          api.affiliated(data).then((res) => {
              if(res.code == 0){
                  this.form.assignBy = null 
                  this.$Message.success('关联成功')
                  this.cancel()
                  // this.$emit("getSmallCar")
                  this.$parent.handlePageChange(this.$parent.$refs.pages.currentPage)
              }
          })
      },
    // 取消
    cancel(name) {
      this.$emit("update:associationModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:associationModel", false);
      }
        
    },
  },
  watch: {
    associationModel: {
      handler(associationModel) {
        this.associationModels = associationModel
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
