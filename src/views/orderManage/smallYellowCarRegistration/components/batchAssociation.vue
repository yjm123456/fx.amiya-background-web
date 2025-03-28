<template>
  <div class="content">
    <Modal
      title="批量关联"
      footer-hide
      v-model="batchAssociationModels"
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
       <FormItem label="关联人" prop="assignBy">
        <Select
            v-model="form.assignBy"
            placeholder="请选择关联人"
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
    batchAssociationModel: Boolean,
    associationParams:Object,
  },
  data() {
    return {
      batchAssociationModels:false,
      form:{
          assignBy:null,
      },
      ruleValidate: {
        assignBy: [
          {
            required: true,
            message: "请选择关联人",
          },
        ],
      }
    };
  },
  methods: {
      handleSubmit(){
          const data = {
              assignBy:Number(this.form.assignBy),
              idList:[...this.associationParams.idList]
          }
          if(!data.assignBy){
            this.$Message.warning('请选择关联人员')
            return
          }
          api.affiliatedList(data).then((res) => {
              if(res.code == 0){
                  this.form.assignBy = null 
                  this.$Message.success('批量关联成功')
                  this.cancel()
                  // this.$emit("getSmallCar")
              }
          })
      },
    // 取消
    cancel(name) {
      this.$emit("update:batchAssociationModel", false);
      this.$parent.associationParams.idList.clear()
      this.$emit("getSmallCar")
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:batchAssociationModel", false);
      }
        
    },
  },
  watch: {
    batchAssociationModel: {
      handler(batchAssociationModel) {
        this.batchAssociationModels = batchAssociationModel
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
