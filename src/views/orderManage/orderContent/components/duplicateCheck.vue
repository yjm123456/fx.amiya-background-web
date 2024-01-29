<template>
  <div>
    <Modal
      v-model="control"
      title="查单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChanges"
      width="60%"
    >
      <div class="container">
        <div class="">
          <span>请您填写客户手机号进行查重</span>
          <Input
            v-model="phone"
            style="width:250px;margin-left:10px"
            placeholder="请输入客户手机号"
            maxlength="20"
          />
          <Button
            type="primary"
            style="margin-left: .625rem"
            @click="getDuplicate()"
            >查询</Button
          >
        </div>
        <div class="content2">
          <div>
            <div v-if="checkStateTexts == '没数据'">
              <div v-if="recordingNormalParams.CustomerServiceNameByPhone">
                <div
                  v-if="recordingNormalParams.CustomerServiceNameByPhone == '未绑定' || employeeName == recordingNormalParams.CustomerServiceNameByPhone"
                >
                  <div class="green">该顾客手机号是新顾客或已绑定在您的账号下，可按照正常流程进行操作</div>
                  <div class="ts">温馨提示：查重规则根据该顾客手机号在系统中进行检索，最终反馈结果以系统为准</div>
                  <Button
                    type="primary"
                    style="margin-top: 20px"
                    @click="recordingNormalClick"
                    >录单</Button
                  >
                </div>
                <div v-else>
                  <div class="red">该顾客手机号已绑定了啊美雅客服，若仍需要录单，您可以向主管提交录单申请！</div>
                  <div class="ts">温馨提示：查重规则根据该顾客手机号在系统中进行检索，最终反馈结果以系统为准</div>
                  <Button
                    type="primary"
                    style="margin-top: 20px"
                    @click="recordingApplicationClick"
                    >提交录单申请</Button
                  >
                </div>
              </div>
            </div>
            <div v-else>
              <div class="red" v-if="checkStateTexts == '未审核'">
                该订单已在录单申请列表进行申请，请等待审核通过后录单！
              </div>
              <div class="red" v-else-if="checkStateTexts == '审核通过'">
                该订单已在录单申请列表进行申请(申请通过)，请在录单申请中录单！
              </div>
              <div class="red" v-else-if="checkStateTexts == '审核不通过'">
                该订单已在录单申请列表进行申请，当前审核不通过，请与主管确认数据信息是否正常！
              </div>
              <div class="ts">
                温馨提示：查重规则根据该顾客手机号在系统中进行检索，最终反馈结果以系统为准
              </div>
              
            </div>
           
            <!-- 重单的订单信息 -->
            <orderList ref="orderList" :isOrder="isOrder" :phone="phone"/>
            <!-- 小黄车登记详情 -->
            <ofoDetail :shoppingCartRegistrationInfo="shoppingCartRegistrationInfo" v-if="isShoppingCar == true"/>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="handleCancel">取消</Button>
        <!-- <Button type="primary" @click="handleSubmit('form')">确定</Button> -->
      </div>
    </Modal>

    <!-- 正常情况录单 -->
    <recording
      :recordingNormalModel.sync="recordingNormalModel"
      :recordingNormalParams="recordingNormalParams"
      :recordingParams="recordingParams"
      :shoppingCartRegistrationInfo="shoppingCartRegistrationInfo"
    />
    <!-- 提交录单申请 -->
    <recordingApplication
      :recordingApplicationModel.sync="recordingApplicationModel"
      :hospitalList="recordingParams.hospitalNameList"
      :phone="recordingNormalParams.phone"
      :title="title"
      :recordingNormalParams="recordingNormalParams"
      :editRecordingApplicationParams="editRecordingApplicationParams"
    />
    
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as emApi from "@/api/employeeManage";
import * as contentPlatFormOrderAddWorkApi from "@/api/contentPlatFormOrderAddWork";

import upload from "@/components/upload/upload";
import recording from "@/components/recording/recording";
import recordingApplication from "../../../../components/recordingApplication/recordingApplication.vue";
import ofoDetail from "./ofo.vue"
import orderList from './orderList.vue';
export default {
  components: {
    upload,
    recording,
    recordingApplication,
    ofoDetail,
    orderList
  },
  props: {
    duplicateModel: Boolean,
    recordingParams: Object,
    
  },
  data() {
    return {
      // 判断是否显示
      isShoppingCar:false,
      isOrder:false,
      control: false,
      //
      phone: "",
      employeeName: sessionStorage.getItem("employeeName"),
      // 录单弹窗
      recordingNormalModel: false,
      // 提交录单申请
      recordingApplicationModel: false,
      // 录单申请title
      title: "",
      // 录单参数
      recordingNormalParams: {
        title: "录单",
        phone: "",
        // 接口返回字段
        CustomerServiceNameByPhone: "",
        belongEmpId: null,
        // 是否为辅助客服
        isCustomer: "",
        employee: [],
      },
      // 通过审核状态判断展示文字
      checkStateTexts: "",
      // 录单申请
      editRecordingApplicationParams: {
        id: "",
        phone: "",
        acceptBy: null,
        employee: [],
        // 申请类型
        contentPlatformOrderAddWorkTypeList:[]
      },
      // 小黄车详情
      shoppingCartRegistrationInfo:{},
      // 重单订单列表
      orderParams:[]
      
    };
  },
  created() {
    this.getEmployeeByPositionId();
    this.getContentPlatformOrderAddWorkTypeList()
  },
  methods: {
    // 查询手机号是否绑定客服
    getIsCustomer(){
      this.recordingNormalParams.phone = this.phone;
      const data = {
        phone: this.phone,
      };
      api.getCustomerServiceNameByPhone(data).then((res) => {
        if (res.code === 0) {
          const { CustomerServiceNameByPhone } = res.data;
          let employeeName = sessionStorage.getItem("employeeName");
          let employeeId = sessionStorage.getItem("employeeId");
          // 如果接口返回是未绑定或者是登录账号和接口返回账号一致可直接录单
          if(CustomerServiceNameByPhone == "未绑定" || employeeName == CustomerServiceNameByPhone){
            this.recordingNormalParams.CustomerServiceNameByPhone = CustomerServiceNameByPhone == "未绑定" ? employeeName : CustomerServiceNameByPhone;
            // 如果是未绑定或者是登录账号和接口返回账号一致 获取登录时employeeId
            this.recordingNormalParams.belongEmpId = employeeId;
            // 该如果是未绑定过或者是绑定在自己账号里没有辅助客服（isCustomer = "否"）  如果是绑定在别人账号下就有辅助客服 （isCustomer = "是"）
            this.recordingNormalParams.isCustomer = "否";
            this.checkStateTexts = "没数据";
          }else{
            api.byPhoneContentPlatFormOrderAddWork(this.phone).then((res) => {
              if (res.code === 0) {
                const {id,phone,checkStateText,} = res.data.contentPlatFormOrderAddWork;
                if(!id){
                  this.checkStateTexts = "没数据";
                  // 绑定客服与登录id不一致
                  this.recordingNormalParams.CustomerServiceNameByPhone = '绑定在别人名下'
                } else {
                  if (checkStateText == "未审核") {
                    this.checkStateTexts = checkStateText;
                    return;
                  } else if (checkStateText == "审核通过") {
                    this.checkStateTexts = checkStateText;
                    return;
                  }
                  else if (checkStateText == "审核不通过") {
                    this.checkStateTexts = checkStateText;
                    return;
                  }
                }
              }
            })
          }
          
        }
      })
    },
     // 获取申请类型
    getContentPlatformOrderAddWorkTypeList(){
      contentPlatFormOrderAddWorkApi.getContentPlatformOrderAddWorkTypeList().then(res=>{
        if(res.code===0){
          const {contentPlatformOrderAddWorkTypeList} = res.data
          this.editRecordingApplicationParams.contentPlatformOrderAddWorkTypeList = contentPlatformOrderAddWorkTypeList
        }
      })
    },
    // 根据加密手机号获取小黄车数据
    getbyEncryptPhone(){
      api.byEncryptPhone(this.phone).then(res=>{
        if(res.code ===0){
          this.shoppingCartRegistrationInfo = res.data.shoppingCartRegistrationInfo
          this.isShoppingCar = true
        }
      })
    },
   
    // 获取所有员工
    getEmployeeByPositionId() {
      const data = {
        positionId: null,
      };
      emApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          this.recordingNormalParams.employee = res.data.employee;
        }
      });
    },
    // 正常情况录单
    recordingNormalClick() {
      this.recordingNormalModel = true;
      this.handleCancel();
    },
    // 提交申请录单
    recordingApplicationClick() {
      this.recordingApplicationModel = true;
      this.title = "录单申请";
      this.handleCancel();
    },
    // 根据客户手机号查询
    getDuplicate() {
      if (!this.phone) {
        this.$Message.warning("请输入客户手机号");
        return;
      }
      this.isOrder = true
      this.getIsCustomer()
      this.getbyEncryptPhone()
      this.$refs.orderList.getContentPlateFormOrderSimpleInfos(this.phone)
    },

    handleCancel() {
      this.$emit("update:duplicateModel", false);
      this.phone = "";
      this.recordingNormalParams.CustomerServiceNameByPhone = "";
      this.checkStateTexts = "";
      this.isShoppingCar = false
      this.isOrder = false
      this.$refs.orderList.query.data = []
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChanges(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    duplicateModel(value) {
      this.control = value;
    },
  },
};
</script>
<style scoped>
.content2 {
  text-align: center;
  /* padding-bottom: 140px; */
  box-sizing: border-box;
  padding-top: 30px;
}
.content3 {
  text-align: center;
  padding-top: 30px;
  /* padding-bottom: 100px; */
  box-sizing: border-box;
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
  margin-top: 15px;
}
</style>
