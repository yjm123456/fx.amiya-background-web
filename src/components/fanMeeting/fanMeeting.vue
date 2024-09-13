<template>
  <div class="content">
    <Modal
      title="生成粉丝见面会名单"
      footer-hide
      v-model="fanMeetingModels"
      width="25%"
      :closable="false"
      @click="handleModalVisibleChange"
      :mask-closable="false"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="粉丝见面会" prop="fansMeetingId">
          <Select
            v-model="form.fansMeetingId"
            placeholder="请选择粉丝见面会"
            filterable
          >
            <Option
              v-for="item in fansMeetingList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="医院现场咨询" prop="hospitalConsulationName">
          <Input
            v-model="form.hospitalConsulationName"
            placeholder="请输入医院现场咨询"
          ></Input>
        </FormItem>
        <FormItem label="预约时间" prop="appointmentDate">
          <!-- <DatePicker type="datetime" placeholder="请选择日期和时间" format="yyyy-MM-dd HH:mm" v-model="form.appointmentDate" style="width:100%"></DatePicker> -->
          <DatePicker
            type="date"
            placeholder="预约时间"
            :value="form.appointmentDate"
            v-model="form.appointmentDate"
            style="width:100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="详细时间" prop="appointmentDetailsDate">
          <Time-picker
            :value="form.appointmentDetailsDate"
            format="HH:mm"
            type="timerange"
            placement="bottom-end"
            placeholder="选择医院营业时间"
            style="width: 100%"
            @on-change="appointmentDetailsDateTime"
            @on-clear="form.appointmentDetailsDate = []"
          ></Time-picker>
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
import * as api from "@/api/fansMeetingDetails";
import * as fansMeetingApi from "@/api/fansMeeting";

export default {
  components: {},
  props: {
    fanMeetingModel: Boolean,
    fanMeetingParams: Object,
  },
  data() {
    return {
      fanMeetingModels: false,
      form: {
        // 粉丝见面会
        fansMeetingId: "",
        // 医院现场咨询
        hospitalConsulationName: "",
        // 预约时间
        appointmentDate: "",
        // 详细时间
        appointmentDetailsDate:[],
      },
      ruleValidate: {
        fansMeetingId: [
          {
            required: true,
            message: "请选择粉丝见面会",
          },
        ],
      },
      //   粉丝见面会
      fansMeetingList: [],
    };
  },
  methods: {
    // 获取有效的粉丝见面会信息 下拉框
    getValidKeyAndValues() {
      fansMeetingApi.getValidKeyAndValue().then((res) => {
        if (res.code === 0) {
          const { fansMeeting } = res.data;
          this.fansMeetingList = fansMeeting;
        }
      });
    },
    // 详细时间
    appointmentDetailsDateTime(data) {
      if (!data) return;
      this.form.appointmentDetailsDate = data;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            fansMeetingId,
            hospitalConsulationName,
            appointmentDate,
            appointmentDetailsDate,
          } = this.form;
          const { orderId } = this.fanMeetingParams;
          const data = {
            fansMeetingId,
            orderIdList: [...orderId],
            appointmentDate: appointmentDate ?  this.$moment(appointmentDate).format("YYYY-MM-DD") : null,
            appointmentDetailsDate:
              appointmentDetailsDate == "" || appointmentDetailsDate == [] 
                ? ""
                : appointmentDetailsDate.join("-"),
            hospitalConsulationName,
          };
          
          api.addFansMeetingDetails(data).then((res) => {
            if (res.code == 0) {
              this.form.assignBy = null;
              this.$Message.success("生成成功，请到粉丝见面会详情查看！");
              this.cancel("form");
              this.$emit("getOrderInfo");
              
            }
          });
        }
      });
    },
    // 取消
    cancel(name) {
      this.$emit("update:fanMeetingModel", false);
      this.$emit("getOrderInfo");
      this.$refs[name].resetFields();
      this.$parent.fanMeetingParams.orderId.clear()
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
        this.$emit("update:fanMeetingModel", false);
        this.$refs["form"].resetFields();
        this.$parent.fanMeetingParams.orderId.clear()
      }
    },
  },
  watch: {
    fanMeetingModel: {
      handler(fanMeetingModel) {
        this.fanMeetingModels = fanMeetingModel;
        if (fanMeetingModel == true) {
          this.getValidKeyAndValues();
        }
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
