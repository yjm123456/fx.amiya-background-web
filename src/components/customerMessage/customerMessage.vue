<template>
  <div>
    <Modal
      v-model="customerMessageModels"
      title="客户信息"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      fullscreen
    >
      <div class="container">
         <Card >
            <div>
                <div class="top_content">
                    <img :src="customerMessageObjs.avatar" alt="" class="img">
                    <div style="margin-right:5px">{{customerMessageObjs.wechatNumber}} </div>
                    <div class="top_right">  {{encryptPhones}}</div>
                    <div  class="top_right">归属客服：{{customerMessageObjs.belongCustomerService}}</div>
                    <div  class="top_right">建档时间：{{customerMessageObjs.createDate  == "0001-01-01T00:00:00" ?  '' : this.$moment(customerMessageObjs.createDate).format("YYYY-MM-DD HH:mm:ss")
                }}</div>
                    <div  class="top_right">性别：{{customerMessageObjs.sex}}</div>
                    <div  class="top_right">消费总计：{{customerMessageObjs.allPrice}}</div>
                    <div class="top_right">会员号：{{customerMessageObjs.memberCardNo}}</div>
                    <div  class="top_right">会员等级：{{customerMessageObjs.memberRankName}}</div>
                    <div  class="icon_content"> 
                        <img :src="form.personalWechat == false ? icon1 : icon2" alt="" class="icon1" @click="icon1Click">
                        <img :src="form.businessWeChat == false ? icon3 : icon4" alt="" class="icon2" @click="icon2Click">
                        <img :src="form.wechatMiniProgram == false ? icon5 : icon6" alt="" class="icon3" @click="icon3Click">
                        <img :src="form.officialAccounts == false ? icon7 : icon8" alt="" class="icon4" @click="icon4Click">
                    </div>
                </div>
            </div>
         </Card>
         <Card style="margin-top:10px">
            <Form
                ref="form"
                :model="form"
                :rules="ruleValidate"
                label-position="left"
                :label-width="130"
            >
                <Row :gutter="30">
                    <Col span="6">
                        <FormItem label="手机号" prop="phone">
                          <div style="display:flex;">
                            <!-- <Input v-model="form.phone" placeholder="请输入手机号" type="number" number disabled style="width:90%" ></Input> -->
                            <div class="top_right" style="border:1px solid #ccc;background:#f3f3f3;color:#ccc;width:90%;
                            padding-left:5px;box-sizing:border-box;border-radius:5px"> {{isIcon == true ? encryptPhones : customerMessageObjs.phone}}</div>
                            <img :src="isIcon == false ? icon10 : icon9" alt="" class="icon9" @click="hiddenClick" >
                            </div>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem label="建档时间" prop="createDate">
                            <Input v-model="form.createDate" placeholder="请输入建档时间" disabled ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="客户昵称" prop="name">
                            <Input v-model="form.name" placeholder="请输入客户昵称"  ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="姓名" prop="realName">
                            <Input v-model="form.realName" placeholder="请输入姓名"  ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="年龄" prop="age">
                            <Input v-model="form.age" placeholder="请输入年龄"  disabled></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="微信备注" prop="wechatNumber">
                            <Input v-model="form.wechatNumber" placeholder="请输入微信备注"  ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="性别" prop="sex">
                            <!-- <Input v-model="form.sex" placeholder="请输入性别"  ></Input> -->
                            <Select
                              v-model="form.sex"
                              placeholder="请选择性别"
                              filterable
                            >
                              <Option
                                v-for="item in sexArr"
                                :value="item.name"
                                :key="item.name"
                                >{{ item.name }}</Option
                              >
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="生日" prop="birthday">
                        <DatePicker
                          type="date"
                          placeholder="选择日期"
                          :value="form.birthday"
                          v-model="form.birthday"
                          style="width:100%"
                        ></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="城市" prop="city">
                            <Input v-model="form.city" placeholder="请输入城市"  ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="职业" prop="occupation">
                            <Input v-model="form.occupation" placeholder="请输入职业"  ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="辅助号码" prop="otherPhone">
                            <Input v-model="form.otherPhone" placeholder="请输入辅助号码"  ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="回访">
                            <CheckboxGroup >
                                <Checkbox label="不发短信" v-model="form.isSendNote"></Checkbox>
                                <Checkbox label="不打电话" v-model="form.isCall"></Checkbox>
                                <Checkbox label="不发微信" v-model="form.isSendWeChat"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="不回访原因" prop="unTrackReason">
                            <Input v-model="form.unTrackReason" placeholder="请输入不回访原因"  ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="消费等级" prop="consumptionLevel">
                            <Input v-model="form.consumptionLevel" placeholder="请输入消费等级"  disabled></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="归属客服" prop="belongCustomerService">
                            <Input v-model="form.belongCustomerService" placeholder="请输入归属客服"  disabled></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="客户需求" prop="customerRequirement">
                            <Input v-model="form.customerRequirement" placeholder="请输入客户需求"  disabled></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="客户状态" prop="customerState">
                            <!-- <Input v-model="form.customerState" placeholder="请输入客户状态"  ></Input> -->
                            <Select
                              v-model="form.customerState"
                              placeholder="请选择客户状态"
                              filterable
                              disabled
                            >
                              <Option
                                v-for="item in customerStateArr"
                                :value="item.id"
                                :key="item.id"
                                >{{ item.name }}</Option
                              >
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="最新消费渠道" prop="newContentPlatForm">
                            <Input v-model="form.newContentPlatForm" placeholder="请输入最新消费渠道" disabled ></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="标签" prop="tagIds">
                          <Select
                            v-model="form.tagIds"
                            multiple
                            placeholder="请选择标签"
                            filterable
                          >
                            <Option
                              v-for="item in customerTagNameList"
                              :value="item.id"
                              :key="item.id"
                              >{{ item.name }}</Option
                            >
                          </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="详细地址" prop="detailAddress">
                            <Input
                                v-model="form.detailAddress"
                                type="textarea"
                                placeholder="请输入详细地址"
                                :rows="4"
                            />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="备注" prop="remark">
                            <Input
                                v-model="form.remark"
                                type="textarea"
                                :rows="4"
                            />
                        </FormItem>
                    </Col> 
                </Row>
            </Form>
         </Card>
         <Card style="margin-top:10px;" >
            <div class="userOtherInfo">
                <Tabs ref="tabs" v-model="tabActive" name="customerInfoCom" v-if="customerInfoComParams2.tabGlag == true">
                  <TabPane label="聊天记录" name="chatRecord" key="chatRecord" tab="customerInfoCom">
                      <chatRecord ref="chatRecord" :avatar="customer.avatar"></chatRecord>
                  </TabPane>
                  <TabPane label="下单订单信息" name="orderInfo" key="orderInfo" tab="customerInfoCom">
                      <orderInfo ref="orderInfo"></orderInfo>
                  </TabPane>
                  <TabPane label="内容平台订单列表" name="contentOrderList" key="contentOrderList" tab="customerInfoCom">
                      <contentOrderList ref="contentOrderList"></contentOrderList>
                  </TabPane>
                  <TabPane label="预约信息" name="appointment" key="appointment" tab="customerInfoCom">
                      <appointment ref="appointment"></appointment>
                  </TabPane>
                  <TabPane label="回访记录" name="returnVisitRecord" key="returnVisitRecord" tab="customerInfoCom">
                      <returnVisitRecord ref="returnVisitRecord"></returnVisitRecord>
                  </TabPane>
                  <TabPane label="已领取礼品" name="alreadyReceiveGift" key="alreadyReceiveGift" tab="customerInfoCom">
                      <alreadyReceiveGift ref="alreadyReceiveGift"></alreadyReceiveGift>
                  </TabPane>
                  <TabPane label="消费追踪" name="consumeTrack" key="consumeTrack" tab="customerInfoCom">
                      <consumeTrack ref="consumeTrack"></consumeTrack>
                  </TabPane>
                </Tabs>
            </div>
         </Card>
      </div>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    
  </div>
</template>
<script>
import * as api from "@/api/customerManage";
import * as customerTagInfoApi from "@/api/customerTagInfo";

// 客户信息
import baseInfo from "./components/baseInfo";
// 客户聊天记录
import chatRecord from "./components/chatRecord";
// 客户订单信息
import orderInfo from "./components/orderInfo";
// 内容平台订单列表
import contentOrderList from "./components/contentOrderList";
// 客户预约信息
import appointment from "./components/appointment";
// 回访记录
import returnVisitRecord from "./components/returnVisitRecord";
// 已领取礼品
import alreadyReceiveGift from "./components/alreadyReceiveGift";
// 消费追踪
import consumeTrack from  "./components/consumeTrack";
import * as common from "@/api/common";
import icon1 from "@/assets/images/icon/icon1.png"
import icon2 from "@/assets/images/icon/icon2.png"
import icon3 from "@/assets/images/icon/icon3.png"
import icon4 from "@/assets/images/icon/icon4.png"
import icon5 from "@/assets/images/icon/icon5.png"
import icon6 from "@/assets/images/icon/icon6.png"
import icon7 from "@/assets/images/icon/icon7.png"
import icon8 from "@/assets/images/icon/icon8.png"
import icon9 from "@/assets/images/xianshi.png"
import icon10 from "@/assets/images/yincang.png"

export default {
  props: {
    customerMessageModel:Boolean,
    customerMessageObj: Object,
    customerInfoComParams2:Object
  },
  components: {
    baseInfo,
    chatRecord,
    orderInfo,
    contentOrderList,
    appointment,
    returnVisitRecord,
    alreadyReceiveGift,
    consumeTrack,
  },
  data() {
    return {
      tabGlag:false,
      encryptPhones:'',
      isIcon:false,
      sexArr:[
        {
          id:1,
          name:'男'
        },
        {
          id:2,
          name:'女'
        }
      ],
      customerStateArr:[
        {
          id:1,
          name:'已成交'
        },
        {
          id:0,
          name:'未成交'
        }
      ],
        // 客户信息
      customer: {},

      // 客户详细信息
      customerDetailInfo: {},
    tabActive:'chatRecord',
    customerMessageModels: false,
    customerMessageObjs:{},
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    icon6,
    icon7,
    icon8,
    icon9,
    icon10,
     form:{
        id:null,
        // 手机号
        phone:'',
        // 建档时间
        createDate:'',
        // 姓名
        realName:'',
        // 客户昵称
        name:'',
        // 年龄
        age:null,
        // 微信昵称
        wechatNumber:'',
        // 性别
        sex:'',
        // 生日
        birthday:'',
        // 城市
        city:'',
        // 职业
        occupation:'',
        // 辅助号码
        otherPhone:'',
        // 详细地址
        detailAddress:'',
        // 回访
        isSendNote:false,
        // 不回访原因
        unTrackReason:'',
        // 消费等级
        consumptionLevel:'',
        // 归属客服
        belongCustomerService:'',
        // 客户需求
        customerRequirement:'',
        // 客户状态
        customerState:null,
        // 首次消费渠道
        newContentPlatForm:'',
        // 备注
        remark:'',
        // 是否为微信来源
        personalWechat:false,
        // 是否为企业微信来源
        businessWeChat:false,
        // 是否为小程序来源
        wechatMiniProgram:false,
        // 是否为公众号来源
        officialAccounts:false,
        // 是否发短信
        isSendNote:false,
        // 是否打电话
        isCall:false,
        // 是否发微信
        isSendWeChat:false,
        // 标签
        tagIds:[]

     },
     ruleValidate: {
        a: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
     },
     customerTagNameList:[]
    };
  },
  methods: {
    hiddenClick(){
      if(!this.customerMessageObjs.phone){
          this.$Message.warning('暂无手机号')
          return
      }else{
        if(this.isIcon == false){
          this.isIcon = true
          this.encryptPhones=  this.customerMessageObjs.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
        }else if(this.isIcon == true){
          this.isIcon = false
          this.customerMessageObjs.phone=this.customerMessageObjs.phone
        }
      }
    },
    //根据用户编号获取客户详情
    byUserIdGetCustomerDetail(userId) {
      common.byUserIdGetCustomerDetail(userId).then(res => {
        if (res.code === 0) {
          this.customer = res.data.customer;
        }
      });
    },

    // 根据加密电话获取客户详细信息
    byEncryptPhoneGetCustomerInfo(encryptPhone) {
      const data = {
        encryptPhone
      }
      common.byEncryptPhoneGetCustomerInfo(data).then(res=>{
        if (res.code === 0) {
          this.customerDetailInfo = res.data.customerDetailInfo;
        }
      })
    },
    icon1Click(){
        this.form.personalWechat = !this.form.personalWechat
    },
    icon2Click(){
        this.form.businessWeChat = !this.form.businessWeChat
    },
    icon3Click(){
        this.form.wechatMiniProgram = !this.form.wechatMiniProgram
    },
    icon4Click(){
        this.form.officialAccounts = !this.form.officialAccounts
    },
   
    // 确认
    handleSubmit(name) {
      const {id,personalWechat,businessWeChat,wechatMiniProgram,officialAccounts,realName,wechatNumber,
      sex,birthday,city,occupation,otherPhone,detailAddress,isSendNote,isCall,isSendWeChat,unTrackReason,remark,phone,tagIds
      } = this.form
      const data = {
        id,
        personalWechat,
        businessWeChat,
        wechatMiniProgram,
        officialAccounts,
        realName,
        wechatNumber,
        sex,
        birthday:birthday ? this.$moment(birthday).format("YYYY-MM-DD") : null ,
        city,
        occupation,
        otherPhone,
        detailAddress,
        isSendNote,
        isCall,
        isSendNote,
        isSendWeChat,
        unTrackReason,
        remark,
        phone:this.customerMessageObjs.phone,
        name:this.form.name,
        tagIds
      }
      if(!this.customerMessageObjs.phone){
        this.$Message.warning('无法提交')
        return
      }
      api.updateById(data).then((res) => {
        if (res.code === 0) {
            this.$Message.success({
                content: "修改成功",
                duration: 3,
            });
            this.$emit("update:customerMessageModel", false);
            
        }
      })
    },
    
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      // this.$refs[name].resetFields();
    this.$emit("update:customerMessageModel", false);
    
    },
    getTag(){
      customerTagInfoApi.customerTagNameList().then((res) => {
        if (res.code === 0) {
          const { customerTagNameList } = res.data;
          this.customerTagNameList = customerTagNameList;
        }
      });
  },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        this.$emit("update:customerMessageModel", false);
      }
    },
  },
  
  created() {
    this.getTag()
  },
  watch: {
    customerMessageModel(value){
        this.customerMessageModels=value
    },
    customerMessageObj(value){
        this.isIcon = true
        this.form.id = value.id
        this.form.phone = value.phone
        if(value.phone){
         this.encryptPhones = value.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
        }else{
          this.encryptPhones = ''
        }
        this.form.createDate = value.createDate == "0001-01-01T00:00:00" ? '' : this.$moment(value.createDate).format("YYYY-MM-DD HH:mm:ss")
        this.form.realName = value.realName
        this.form.name = value.name
        this.form.age = value.age
        this.form.wechatNumber = value.wechatNumber
        this.form.sex = value.sex
        this.form.occupation = value.occupation
        this.form.birthday = value.birthday
        this.form.city = value.city
        this.form.otherPhone = value.otherPhone
        this.form.detailAddress = value.detailAddress
        this.form.isSendNote = value.isSendNote
        this.form.unTrackReason = value.unTrackReason
        this.form.consumptionLevel = value.consumptionLevel
        this.form.belongCustomerService = value.belongCustomerService
        this.form.customerRequirement = value.firstProjectDemand
        this.form.customerState = value.customerState
        this.form.newContentPlatForm = value.newContentPlatForm
        this.form.remark = value.remark ? value.remark : '渠道客服备注：\n1）咨询项目：\n2）顾客情况：\n3）设计方案：\n4）专家及报价：\n5）顾客反馈：\n6）顾客预算：\n7）备注：\n接诊备注：\n开单备注'
        this.form.personalWechat = value.personalWechat
        this.form.businessWeChat = value.businessWeChat
        this.form.wechatMiniProgram = value.wechatMiniProgram
        this.form.officialAccounts = value.officialAccounts
        let tagList = []
        value.tagList.map(item=>{
          tagList.push(item.id)
        })
        this.form.tagIds = tagList
        this.customerMessageObjs=value
    },
    customerInfoComParams2: {
      handler(customerInfoComParams2) {
        const { userId, encryptPhone} = customerInfoComParams2;
        if (this.customerMessageModel==true) {
          if (userId) {
            this.$nextTick(()=>{
              // 根据用户编号获取客户详情
              this.byUserIdGetCustomerDetail(userId);
              // 根据加密电话获取客户详细信息
              this.byEncryptPhoneGetCustomerInfo(encryptPhone);
              // 根据用户编号获取聊天记录
              this.$refs.chatRecord.pageNum = 1;
              this.$refs.chatRecord.chatRecordList = [];
              this.$refs.chatRecord.getChatRecordList(userId);
              // 根据加密电话文本获取订单列表
              this.$refs.orderInfo.byCustomerIdGetOrderList(encryptPhone);
              // 根据加密电话文本获取内容平台订单列表
              this.$refs.contentOrderList.byCustomerIdGetOrderList(encryptPhone);
              // 根据加密电话文本获取预约列表
              this.$refs.appointment.byUserIdGetAppointmentList(encryptPhone);
              // 根据加密电话文本获取回访记录列表
              this.$refs.returnVisitRecord.byEncryptPhoneGetReturnVisitList(encryptPhone)
              // 根据加密电话文本获取已领取礼品列表
              this.$refs.alreadyReceiveGift.byEncryptPhoneGetUserAlreadyReceiveGift(encryptPhone)
              // 消费追踪
              this.$refs.consumeTrack.byEncryptPhoneGetCustomerConsumptionTrackList(encryptPhone)
            })
            
          } else {
            this.$nextTick(()=>{
            // 根据加密电话获取客户详细信息
            this.byEncryptPhoneGetCustomerInfo(encryptPhone);
            // 需清空聊天记录参数
            this.$refs.chatRecord.pageNum = 1;
            this.$refs.chatRecord.chatRecordList = [];
            // 根据加密电话文本获取订单列表
            this.$refs.orderInfo.byCustomerIdGetOrderList(encryptPhone);
            // 根据加密电话文本获取内容平台订单列表
            this.$refs.contentOrderList.byCustomerIdGetOrderList(encryptPhone);
            // 根据加密电话文本获取预约列表
            this.$refs.appointment.byUserIdGetAppointmentList(encryptPhone);
            // 根据加密电话文本获取回访记录列表
            this.$refs.returnVisitRecord.byEncryptPhoneGetReturnVisitList(encryptPhone)
            // 根据加密电话文本获取已领取礼品列表
            this.$refs.alreadyReceiveGift.byEncryptPhoneGetUserAlreadyReceiveGift(encryptPhone)
            // 消费追踪
            this.$refs.consumeTrack.byEncryptPhoneGetCustomerConsumptionTrackList(encryptPhone)
            })
          }
        }
      },
      deep:true,
    },
  },
};
</script>
<style lang="less" scoped>

.container{
    background: #f5f5f5;
}
.top_content{
    display: flex;
    align-items: center;
}
.top_right{
    margin-right: 50px;
}
.img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
}
.icon1{
    width: 28px;
    margin-right: 10px;
}
.icon9{
    width: 28px;
    margin-left: -30px;
}
.icon2{
    width: 22px;
    margin-right: 10px;
}
.icon3{
    width: 18px;
    margin-right: 10px;
}
.icon4{
    width: 20px;
    margin-right: 10px;
}
.icon_content{
    display: flex;
    align-items: center;
    margin-right: 20px;
}
.trank{
  display: flex;
}
.trank_con{
  display: flex;
}
</style>
