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
        <FormItem label="手机号"  prop="phone">
          <Input v-model="form.phone" placeholder="请输入手机号" maxlength="11"/>
        </FormItem>
        <FormItem label="医院" prop="hospitalId">
         <Select
            v-model="form.hospitalId"
            placeholder="请选择医院"
            filterable
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
      isLoading:false,
      control: false,
      // recipientList:[{id:1,name:'管理员'}],
      // recipientList:[{id:104,name:'虞郑韡'}],
      // recipientList:[{id:62,name:'余建明'}],
      recipientList:[{id:220,name:'张凌玥'}],
      form: {
        // 接收人
        // 线上虞老师
        // acceptBy:104,
        // 测试管理员
        acceptBy:220,
        // 手机号
        phone:'',
        // 医院
        hospitalId:null,
        // 申请理由
        sendRemark:'',
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
      },
      employee:[]
    };
  },
  methods: {
    handleCancel(name) {
      this.$emit("update:addRecordingModel", false);
      this.$refs[name].resetFields();

    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            if (this.form.phone) {
                if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
                  this.$Message.error("请输入正确的手机号");
                  return false;
                }
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
