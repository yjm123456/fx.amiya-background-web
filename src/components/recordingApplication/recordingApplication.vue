<template>
  <div>
    <!-- 录单申请 -->
    <Modal
      v-model="control"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="30%"
    >
    <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="100"
      >
      <!-- 录单申请是根据线上员工id写死的 编辑时根据接口获取的是转移的员工id -->
        <FormItem label="接收人" prop="acceptBy" >
         <Select
            v-model="form.acceptBy"
            placeholder="接收人"
            filterable
            disabled
          >
            <Option
              v-for="item in employee"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="手机号"  prop="phone">
          <Input v-model="form.phone" placeholder="请输入手机号" disabled maxlength="20"/>
        </FormItem>
        <FormItem label="申请类型" prop="addWorkType">
         <Select
            v-model="form.addWorkType"
            placeholder="请选择申请类型"
            filterable
            :disabled="title == '录单申请'"
            @on-change="addWorkTypeChange(form.addWorkType)"
          >
            <Option
              v-for="item in  editRecordingApplicationParams.contentPlatformOrderAddWorkTypeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="医院" prop="hospitalId">
         <Select
            v-model="form.hospitalId"
            placeholder="请选择医院"
            filterable
            :disabled="form.addWorkType == 2"
          >
            <Option
              v-for="item in hospitalList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        
        <FormItem label="申请理由" prop="sendRemark">
          <Input v-model="form.sendRemark" type="textarea" :rows="4"></Input>
        </FormItem>
        <Spin fix v-if="isLoading == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/contentPlatFormOrderAddWork";
export default {
  components: {
  },
  props: {
    recordingApplicationModel: Boolean,
    hospitalList: Array,
    editRecordingApplicationParams:Object,
    title:String,
    recordingNormalParams:Object
  },
  data() {
    return {
      isLoading:false,
      control: false,
      // recipientList:[{id:1,name:'管理员'}],
      // recipientList:[{id:104,name:'虞郑韡'}],
      recipientList:[{id:243,name:'陈飞'}],
      // recipientList:[{id:62,name:'余建明'}],
      // recipientList:[{id:220,name:'张凌玥'}],
      form: {
        // // 接收人
        // acceptBy:104,
        // 记得改watch里面的字段
        acceptBy:243,
        // 手机号
        phone:'',
        // 医院
        hospitalId:null,
        // 申请理由
        sendRemark:'',
        addWorkType: null
      },
      ruleValidates: {
        acceptBy: [
          {
            required: true,
            message: "请选择接收人",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
        addWorkType: [
          {
            required: true,
            message: "请选择申请类型",
          },
        ],
      },
      employee:[],
      contentPlatformOrderAddWorkTypeList:[]
    };
  },
  methods: {
    // 申请类型为改绑申请时 默认医院为测试医院
    addWorkTypeChange(value){
      if(value == 2){
        // 测试医院
        // this.form.hospitalId = 39
        // 线上医院
        this.form.hospitalId = 124
      }else{
        this.form.hospitalId = null
      }
    },
    handleCancel(name) {
      this.$emit("update:recordingApplicationModel", false);
      this.$refs[name].resetFields();

    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.title == '录单申请'){
            this.isLoading = true
            api.addContentPlatFormOrderAddWork(this.form).then((res) => {
              if (res.code === 0) {
                this.isLoading =false
                this.handleCancel("form");
                // this.$emit("handleRefreshCustomerList");
                this.$Message.success({
                  content: "申请成功，请到录单申请列表查看！",
                  duration: 3,
                });
              }else {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 3000);
                }
            });
          }else{
            const {acceptBy,phone,hospitalId,sendRemark,addWorkType} = this.form
            const data ={
              id:this.editRecordingApplicationParams.id,
              acceptBy,
              phone,
              hospitalId,
              sendRemark,
              addWorkType

            }
            this.isLoading = true;
            api.editContentPlatFormOrderAddWork(data).then((res) => {
              if (res.code === 0) {
                this.isLoading = false;
                this.handleCancel("form");
                this.$emit("getContentPlatFormOrderAddWork");
                this.$Message.success({
                  content: "修改成功！",
                  duration: 3,
                });
              }else {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 3000);
                }
            });
          }
          
        }
      });
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  watch: {
    recordingApplicationModel(value) {
      this.control = value;
      if(this.title == '录单申请'){
        // 测试 管理员
        //  this.form.acceptBy = 1
         //  线上虞老师id
        //  this.form.acceptBy = 104
        //  线上陈飞
         this.form.acceptBy = 243
        //  线上张凌玥id
        //  this.form.acceptBy = 220
         this.employee = this.recordingNormalParams.employee
         this.form.phone = this.recordingNormalParams.phone
         this.contentPlatformOrderAddWorkTypeList = this.editRecordingApplicationParams.contentPlatformOrderAddWorkTypeList
         this.form.addWorkType = '1'
         return
      }else{
        if(this.editRecordingApplicationParams.acceptBy){
          this.form.acceptBy = this.editRecordingApplicationParams.acceptBy
          this.employee = this.editRecordingApplicationParams.employee
          this.form.phone = this.editRecordingApplicationParams.phone
        }
      }
      
      
    },
  },
};
</script>
<style scoped>
.content2 {
  text-align: center;
}
.green {
  color: green;
  margin: 20px 0;
}
.red {
  color: red;
  margin: 20px 0;
}
.ts {
  margin-top: 20px;
}
</style>
