<template>
  <div>
    <!-- 录单申请 -->
    <Modal
      v-model="control"
      title="添加录单申请"
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
        <FormItem label="接收人" prop="acceptBy" >
         <Select
            v-model="form.acceptBy"
            placeholder="接收人"
            filterable
            disabled
          >
            <Option
              v-for="item in editRecordingApplicationParams.employee"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem
          label="归属地"
          prop="belongingPlace"
          :rules="[
            {
              required: true,
              message: '请选择归属地',
            },
          ]"
        >
          <Select
            v-model="form.belongingPlace"
            placeholder="请选择归属地"
            filterable
            
          >
            <Option
              v-for="item in belongingPlaceList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="手机号"  prop="phone">
          <Input v-model="form.phone" placeholder="请输入手机号" maxlength="20"/>
        </FormItem>
        <FormItem label="申请类型" prop="addWorkType">
         <Select
            v-model="form.addWorkType"
            placeholder="请选择申请类型"
            filterable
            @on-change="addWorkTypeChange(form.addWorkType)"
          >
            <Option
              v-for="item in editRecordingApplicationParams.contentPlatformOrderAddWorkTypeList"
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
    addRecordingModel: Boolean,
    hospitalList: Array,
    editRecordingApplicationParams:Object,
  },
  data() {
    return {
      // 归属地
      belongingPlaceList:[
        {
          id:1,
          name:'国内'
        },
        {
          id:2,
          name:'国外'
        },
      ],
      isLoading:false,
      control: false,
      // recipientList:[{id:1,name:'管理员'}],
      recipientList:[{id:104,name:'虞郑韡'}],
      // recipientList:[{id:62,name:'余建明'}],
      // recipientList:[{id:220,name:'张凌玥'}],
      form: {
        // 接收人
        // 线上虞老师
        acceptBy:104,
        // 线上张凌玥
        // acceptBy:220,
        // 测试管理员
        // acceptBy:220,

        // acceptBy:220,
        // 手机号
        phone:'',
        // 医院
        hospitalId:null,
        // 申请理由
        sendRemark:'',
        // 申请类型
        addWorkType:null,
        // 归属地
        belongingPlace:1
      },
      ruleValidates: {
        addWorkType: [
          {
            required: true,
            message: "请选择申请类型",
          },
        ],
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
      },
      employee:[]
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
      this.$emit("update:addRecordingModel", false);
      this.$refs[name].resetFields();

    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            // if (this.form.phone) {
            //     if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
            //       this.$Message.error("请输入正确的手机号");
            //       return false;
            //     }
            // }
            // 归属地 1是国内 2是国外
            if(this.form.belongingPlace == 1){
              // 国内手机号分为00000000000和正常手机号
              if(this.form.phone == '00000000000'){
                this.isLoading = true
                api.addContentPlatFormOrderAddWork(this.form).then((res) => {
                  if (res.code === 0) {
                    this.isLoading =false
                    this.handleCancel("form");
                    this.$emit("getContentPlatFormOrderAddWork");
                    this.$Message.success({
                      content: "添加成功",
                      duration: 3,
                    });
                  }else {
                      setTimeout(() => {
                        this.isLoading = false;
                      }, 3000);
                    }
                });
                return
              }else{
                if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
                  this.$Message.warning("请确认归属地和手机号是否正确！");
                  return false;
                }
                this.isLoading = true
                api.addContentPlatFormOrderAddWork(this.form).then((res) => {
                  if (res.code === 0) {
                    this.isLoading =false
                    this.handleCancel("form");
                    this.$emit("getContentPlatFormOrderAddWork");
                    this.$Message.success({
                      content: "添加成功",
                      duration: 3,
                    });
                  }else {
                      setTimeout(() => {
                        this.isLoading = false;
                      }, 3000);
                    }
                });
              }
            }else{
              this.isLoading = true
              api.addContentPlatFormOrderAddWork(this.form).then((res) => {
                if (res.code === 0) {
                  this.isLoading =false
                  this.handleCancel("form");
                  this.$emit("getContentPlatFormOrderAddWork");
                  this.$Message.success({
                    content: "添加成功",
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
    addRecordingModel(value) {
      this.control = value;
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
