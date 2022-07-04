<template>
  <div class="content">
    <Modal
      title="编辑"
      footer-hide
      v-model="controlModel"
      width="80%"
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
            
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="140"
      >
        <!-- <FormItem label="预约日期" prop="appointmentDate">
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 100%"
            v-model="form.appointmentDate"
            @on-change="getweekday()"
          ></DatePicker>
        </FormItem>
        <FormItem label="星期" prop="week">
          <Input v-model="form.week" disabled></Input>
        </FormItem>
        <FormItem label="时间(上午/下午)" prop="time">
          <Select
            v-model="form.time"
            placeholder="请选择时间"
          >
            <Option
              v-for="item in timeSelect"
              :value="item.time"
              :key="item.time"
              >{{ item.time }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="项目名称" prop="itemName">
          <Select v-model="form.itemName" placeholder="请选择项目名称" filterable  @on-change="selectGoodsName">
            <Option
              v-for="item in AmiyaHospitalDepartmentList"
              :value="item.projectName"
              :key="item.projectName"
              >{{ item.projectName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="form.phone" maxlength="11"></Input>
        </FormItem> -->
      </Form>
        <div slot="footer">
            <Button @click="handleCancelClick('form')">取消</Button>
            <Button @click="submiteChange('form')">确定</Button>
        </div>
      </div>
    </Modal>
   
  </div>
</template>
<script>

export default{
    props:{
        editModel:Boolean
    },
    data(){
        return {
            controlModel:false,
            form:{
                id:'',
                // 派单编号
                contentPlatFormOrderId	:'',
                // 是否到院
                isToHospital:false,
                // 到院时间
                tohospitalDate:'',
                // 是否成交
                isDeal:false,
                // 最终成交医院
                lastDealHospitalId:null,
                // 截图
                dealPicture:'',
                // 备注
                remark:'',
                // 价格
                price:null,

            },
             ruleValidate: {
                appointmentDate: [
                    {
                        required: true,
                        message: "请选择预约日期",
                    },
                ],
            }   
        }
    },
    methods:{
        handleModalVisibleChange(value) {
            if (!value) {
                this.isEdit = false;
                this.$emit("update:editModel", false);
                this.$refs["form"].resetFields();
            }
        },
        // 取消
        handleCancelClick(name) {
            this.isEdit = false;
            this.$emit("update:editModel", false);
            this.$refs[name].resetFields();
        },
    },
    watch:{
        editModel(value){
            this.controlModel = value
        }
    }
}
</script>
