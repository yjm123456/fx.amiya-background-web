<template>
  <div>
    <Modal
      v-model="control"
      title="接单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="100"
      >
       <FormItem label="确认订单" prop="checkState">
         <Select
            v-model="form.checkState"
            placeholder="确认订单"
          >
            <Option
              v-for="item in checkStateList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否到院"  prop="isToHospital" v-if="form.checkState==2" key="是否到院">
          <i-switch v-model="form.isToHospital" disabled/>
        </FormItem>
        <FormItem
          label="最后到院"
          prop="toHospitalDate"
          v-if="form.checkState==2" key="最后到院"
        >
          <DatePicker
            type="date"
            placeholder="最后到院"
            style="width: 100%"
            v-model="form.toHospitalDate"
            v-if="form.checkState==2" key="最后到院"
          ></DatePicker>
        </FormItem>
        <FormItem label="重单截图"  prop="repeatePictureUrl" v-if="form.checkState==2" key="重单截图">
          <upload :uploadObj="delUploadObj" @uploadChange="dealHandleUploadChange" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  props: {
    orderReceivingModel: Boolean,
    receivingObj:Object
  },
  data() {
    return {
       delUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      checkStateList:[
        {
          id:1,
          name:'订单确认'
        },
        {
          id:2,
          name:'重单退回'
        }
      ],
      control: false,
      form: {
        id:null,
        orderId:'',
        checkState:'',
        isToHospital:true,
        toHospitalDate:'',
         repeatePictureUrl:''
      },
      ruleValidates: {
          repeatePictureUrl: [
          {
            required: true,
            message: "请上传重单截图",
          },
        ],
        checkState: [
          {
            required: true,
            message: "请选择确认状态",
          },
        ],
        toHospitalDate: [
          {
            required: true,
            message: "请输入最后到院",
          },
        ],
      },
    };
  },
  methods: {
      // 图片
    dealHandleUploadChange(values) {
      this.form.repeatePictureUrl = values[0];
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
        
            const {repeatePictureUrl,isToHospital,toHospitalDate,checkState} = this.form
            const data = {
                id:this.receivingObj.id,
                orderId:this.receivingObj.orderId,
                repeatePictureUrl,
                isToHospital,
                toHospitalDate:toHospitalDate ? this.$moment(toHospitalDate).format("YYYY-MM-DD") : null,
                checkState
            }
            const receivingData ={
                orderId:this.receivingObj.orderId
            }
            if(checkState==1){
               api.contentPlateFormOrderConfirm(receivingData).then((res) => {
                    if (res.code === 0) {
                        this.handleCancel("form");
                        this.$emit("handleRefreshList");
                        this.$Message.success({
                            content: "提交成功",
                            duration: 3,
                        });
                    }
                });
            }else{
                api.contentPlateFormOrderRepeates(data).then((res) => {
                    if (res.code === 0) {
                        this.handleCancel("form");
                        this.$emit("handleRefreshList");
                        this.$Message.success({
                            content: "提交成功",
                            duration: 3,
                        });
                    }
                });
            }
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:orderReceivingModel", false);
      this.delUploadObj.uploadList = [];
      this.$refs[name].resetFields();      
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    orderReceivingModel(value) {
      this.control = value;
    },
  },
};
</script>