<template>
  <div class="content">
    <Modal
      :title="fansMeetingParams.title"
      footer-hide
      v-model="fansMeetingModels"
      width="25%"
      @click="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="粉丝见面会名称" prop="name">
          <Input v-model="form.name" placeholder="请输入粉丝见面会名称"></Input>
        </FormItem>
        <FormItem label="见面会开始时间" prop="startDate">
          <DatePicker
            type="date"
            placeholder="见面会开始时间"
            :value="form.startDate"
            v-model="form.startDate"
            style="width:100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="见面会结束时间" prop="endDate">
          <DatePicker
            type="date"
            placeholder="见面会结束时间"
            :value="form.endDate"
            v-model="form.endDate"
            style="width:100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="医院" prop="hospitalId">
          <Select
            v-model="form.hospitalId"
            style="width:100%"
            placeholder="请选择医院"
            filterable
            transfer
          >
            <Option
              v-for="item in fansMeetingParams.hospitalInfo"
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
import * as api from "@/api/fansMeeting";

export default {
  components: {},
  props: {
    fansMeetingModel: Boolean,
    fansMeetingParams: Object,
  },
  data() {
    return {
      fansMeetingModels: false,
      form: {
        // 见面会名称
        name: "",
        // 开始时间
        startDate: null,
        // 结束时间
        endDate: null,
        // 医院
        hospitalId: null,
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入粉丝见面会名称",
          },
        ],
        startDate: [
          {
            required: true,
            message: "请选择见面会开始时间",
          },
        ],
        endDate: [
          {
            required: true,
            message: "请选择见面会结束时间",
          },
        ],
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
      },
      // 医院
      hospitalInfo: [],
    };
  },
  methods: {
    // 根据id获取订单信息
    getbyIdFansMeeting(){

    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.fansMeetingParams.title == "编辑") {
            const {name,startDate,endDate,hospitalId,id} = this.form
            const data = {
              name,
              startDate:this.$moment(startDate).format("YYYY-MM-DD"),
              endDate:this.$moment(endDate).format("YYYY-MM-DD"),
              hospitalId,
              id
            }
            api.editFansMeeting(data).then((res) => {
                if(res.code == 0){
                    this.$Message.success('编辑成功')
                    this.cancel("form")
                    this.$emit("getFansMeetingInfo")
                }
            })
            
          } else {
            const {name,startDate,endDate,hospitalId} = this.form
            const data = {
              name,
              startDate:this.$moment(startDate).format("YYYY-MM-DD"),
              endDate:this.$moment(endDate).format("YYYY-MM-DD"),
              hospitalId
            }
            api.addFansMeeting(data).then((res) => {
                if(res.code == 0){
                    this.$Message.success('添加成功')
                    this.cancel("form")
                    this.$emit("getFansMeetingInfo")
                }
            })
          }
        }
      })
    },
    // 取消
    cancel(name) {
      this.$refs[name].resetFields();
      this.$emit("update:fansMeetingModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.$emit("update:fansMeetingModel", false);
      }
    },
  },
  watch: {
    fansMeetingModel: {
      handler(fansMeetingModel) {
        this.fansMeetingModels = fansMeetingModel;
        if(this.fansMeetingParams.title == '编辑'){
          const {name,startDate,endDate,hospitalId,id}  = this.fansMeetingParams.byIdParams
          this.form.name = name
          this.form.startDate = this.$moment(startDate).format("YYYY-MM-DD")
          this.form.endDate = this.$moment(endDate).format("YYYY-MM-DD")
          this.form.hospitalId = hospitalId
          this.form.id = id
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
