<template>
  <div class="content">
    <Modal
      title="添加凭证"
      footer-hide
      v-model="control"
      width="30%"
      :closable="false"
      @click="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
      
            <FormItem label="助理" prop="assistantId">
              <Select
                v-model="form.assistantId"
                placeholder="请选择助理"
                filterable
              >
                <Option
                  v-for="item in editAssistantParams.employeeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
            </Select>
            </FormItem>
      </Form>

      <div class="footer">
        <Button @click="cancel('form')" style="margin-right: 10px">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/customerConsumptionCredentials";


export default {
  components: {  },
  props: {
    editAssistantModal: Boolean,
    editAssistantParams: Object,
  },
  data() {
    return {
      isLoading: false,
      form: {
        assistantId:null
      },
      control:false,
      ruleValidate: {
        assistantId: [
          {
            required: true,
            message: "请选择助理",
          },
        ],
      },
    };
  },
  methods: {
    
    // 取消
    cancel(name) {
      this.$emit("update:editAssistantModal", false);
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            assistantId
          } = this.form;
          // 编辑助理
          const data = {
            id:this.editAssistantParams.id,
            assistantId
          };
         
            this.isLoading = true;
            api.updateAssistant(data).then((res) => {
              if (res.code === 0) {
                this.isLoading = false;
                this.cancel("form");
                this.$emit('getHospitalInfo');
                this.$Message.success({
                  content: "编辑成功",
                  duration: 3,
                });
              } else {
                setTimeout(() => {
                  this.isLoading = false;
                }, 3000);
              }
            });
        }
      });
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form")
      }
    },
  },
  watch: {
    editAssistantModal: {
      handler(editAssistantModal) {
        this.control = editAssistantModal;
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
.img,
.img_o {
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.no_date {
  text-align: center;
}
.img_cons {
  display: flex;
  flex-wrap: wrap;
}
</style>
