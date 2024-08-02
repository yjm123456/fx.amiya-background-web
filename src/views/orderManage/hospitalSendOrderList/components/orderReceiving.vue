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
        <div>请您填写客户 <span class="phone">{{phone}}</span> 的重单情况</div>
        <Tabs ref="tabs" v-model="active" v-if="isTabel">
          <TabPane label="未重单" name="unDuplicateOrder">
            <div>
                <div class="title">温馨提示：判断未重单，客户信息将全部展示并进入客户管理列表。</div>
                <div class="input_con">
                  <div  class="input_content">
                    <span>医院网咨人员：</span>
                    <Input
                      v-model="netWorkConsulationName"
                      placeholder="请输入医院网咨人员"
                      style="width: 220px; margin: 0 38px"
                    />
                  </div>
                  <div class="input_content">
                    <span>医院现场咨询人员：</span>
                    <Input
                      v-model="sceneConsulationName"
                      placeholder="请输入医院现场咨询人员"
                      style="width: 220px; margin: 0 10px"
                    />
                  </div>
                </div>
                <Button type="primary" @click="unDuplicateOrderHandleSubmit" style="display:block;margin:30px auto">确认不重单</Button>
            </div>
          </TabPane>
          <TabPane label="重单" name="duplicateOrder" >
            <div>
              <div class="ishos_con">
                  <span class="isHos">是否可深度:</span><i-switch v-model="form.isProfundity" @on-change="isProfundityChange"/>
              </div>
              <div v-if="form.isProfundity == true">
                <div   class="ishos_con input_c">
                  <span>医院网咨人员：</span>
                  <Input
                    v-model="form.netWorkConsulationName"
                    placeholder="请输入医院网咨人员"
                    style="width: 220px; margin: 0 38px"
                  />
                </div>
                <div  class="ishos_con input_c">
                  <span>医院现场咨询人员：</span>
                  <Input
                    v-model="form.sceneConsulationName"
                    placeholder="请输入医院现场咨询人员"
                    style="width: 220px; margin: 0 10px"
                  />
                </div>
              </div>
              <div class="ishos_con">
                  <span class="isHos">是否到院:</span><i-switch v-model="form.isToHospital" disabled style="margin-left:16px"/>
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
    isTabel:Boolean,
    sendOrderId:Number,
  },
  data() {
    return {
      // 医院网咨人员
      netWorkConsulationName:'',
      // 医院现场咨询人员
      sceneConsulationName:'',
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
         repeatePictureUrl:'',
         isProfundity:false,
         netWorkConsulationName:'',
         sceneConsulationName:''
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
   
    isProfundityChange(){
      this.form.netWorkConsulationName = ''
      this.form.sceneConsulationName = ''
    },
    // 不重单
    unDuplicateOrderHandleSubmit(){
      if(!this.netWorkConsulationName.replace(/\s+/g,'')){
        this.$Message.warning('请输入医院网咨人员')
        return
      }
      if(!this.sceneConsulationName.replace(/\s+/g,'')){
        this.$Message.warning('请输入医院现场咨询人员')
        return
      }
      const receivingData ={
          orderId:this.receivingObj.orderId,
          netWorkConsulationName:this.netWorkConsulationName,
          sceneConsulationName:this.sceneConsulationName,
          sendOrderId:this.sendOrderId
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
      const {repeatePictureUrl,isToHospital,toHospitalDate,isProfundity,netWorkConsulationName,sceneConsulationName} = this.form
      if(isProfundity == true && !netWorkConsulationName.replace(/\s+/g,'')){
        this.$Message.warning('请输入医院网咨人员')
        return
      }
      if(isProfundity == true && !sceneConsulationName.replace(/\s+/g,'')){
        this.$Message.warning('请输入医院现场咨询人员')
        return
      }
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
          isProfundity,
          netWorkConsulationName,
          sceneConsulationName
      }
      api.contentPlateFormOrderRepeates(data).then((res) => {
          if (res.code === 0) {
              this.handleCancel("form");
              this.active = 'duplicateOrder'
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
      this.active = 'duplicateOrder'
      this.netWorkConsulationName = ''
      this.sceneConsulationName = ''
      this.form.netWorkConsulationName = ''
      this.form.sceneConsulationName = ''     
      this.form.isProfundity = false  
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
  /* text-align: center; */
  margin: 60px 0 30px 30%;
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
.input_con{
  margin-left: 30%;
}
.input_content{
  margin-top: 10px;
}
.input_c{
  margin-left: 19px;
}
</style>