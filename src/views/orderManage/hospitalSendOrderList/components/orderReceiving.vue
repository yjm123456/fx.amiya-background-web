<template>
  <div>
    <Modal
      v-model="control"
      title="待查重"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000px"
      :footer-hide="true"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="100"
      >
       <!-- <FormItem label="确认订单" prop="checkState">
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
        </FormItem> -->
        <div>请您填写客户 <span class="phone">{{phone}}</span> 的重单情况</div>
        <Tabs ref="tabs" v-model="active" v-if="isTabel">
          <TabPane label="未重单" name="unDuplicateOrder">
            <div>
                <div class="title">温馨提示：判断未重单，客户信息将全部展示并进入客户管理列表。</div>
                <Button type="primary" @click="unDuplicateOrderHandleSubmit" style="display:block;margin:30px auto">确认不重单</Button>
            </div>
          </TabPane>
          <TabPane label="重单" name="duplicateOrder" >
            <div>
              <div class="ishos_con">
                  <span class="isHos">是否到院:</span><i-switch v-model="form.isToHospital" disabled/>
              </div>
              <div  class="ishos_con">
                <span  class="isHos">最后到院:</span>
                <DatePicker
                    type="date"
                    placeholder="最后到院"
                    style="width: 32%"
                    v-model="form.toHospitalDate"
                    :transfer="true"
                  ></DatePicker>
              </div>
              <div  class="ishos_con2">
                <span  class="isHos">重单截图：</span><div class="upload_con"><upload :uploadObj="delUploadObj" @uploadChange="dealHandleUploadChange" /></div>
              </div>
               
                <Button type="primary" @click="duplicateOrderHandleSubmit" style="display:block;margin:30px auto">上传重单信息</Button>
            </div>
          </TabPane>
        </Tabs>
      </Form>
      
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
    receivingObj:Object,
    phone:String,
    isTabel:Boolean
  },
  data() {
    return {
      active:'unDuplicateOrder',
      flag:false,
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
    // 不重单
    unDuplicateOrderHandleSubmit(){
      const receivingData ={
          orderId:this.receivingObj.orderId
      }
      api.contentPlateFormOrderConfirm(receivingData).then((res) => {
          if (res.code === 0) {
              this.handleCancel;
              this.$emit("update:orderReceivingModel", false);
              this.$emit("handleRefreshList");
              this.$Message.success({
                  content: "确认成功",
                  duration: 3,
              });
          }
      });
    },
    // 重单
    duplicateOrderHandleSubmit(){
      const {repeatePictureUrl,isToHospital,toHospitalDate} = this.form
      if(!toHospitalDate){
        this.$Message.warning('请选择最后到院时间')
        return
      }
      if(!repeatePictureUrl){
        this.$Message.warning('请上传图片')
        return
      }
      const data = {
          id:this.receivingObj.id,
          orderId:this.receivingObj.orderId,
          repeatePictureUrl,
          isToHospital,
          toHospitalDate:toHospitalDate ? this.$moment(toHospitalDate).format("YYYY-MM-DD") : null,
      }
      api.contentPlateFormOrderRepeates(data).then((res) => {
          if (res.code === 0) {
              this.handleCancel;
              this.$emit("update:orderReceivingModel", false);
              this.$emit("handleRefreshList");
              this.$Message.success({
                  content: "上传成功",
                  duration: 3,
              });
          }
      });
    },
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
      this.form.toHospitalDate = ''
      this.delUploadObj.uploadList = [];
      this.$refs["form"].resetFields();      
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
<style scoped>
.phone{
  font-size: 16px;
  font-weight: bold;
  color: red;
  margin: 0 5px;
}
.title{
  text-align: center;
  margin: 60px 0;
}
.isHos{
  margin: 0 20px ;
}
.ishos_con{
  margin-top: 30px;
}
.ishos_con2{
  display: flex;
  margin: 40px 0 20px 0;
}
.upload_con{
  width: 300px;
  height: 150px;
  border: 1px dashed #ccc;
  padding: 10px;
}
</style>