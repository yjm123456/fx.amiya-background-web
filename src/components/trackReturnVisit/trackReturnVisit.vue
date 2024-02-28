<template>
  <div>
    <Modal
      v-model="controlModal"
      title="追踪回访"
      :closable="false"
      :mask-closable="false"
      width="1000"
    >
      <div>
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidate"
          label-position="left"
          :label-width="110"
        >
          <div  class="phone" v-if="params.phone">{{params.phone}} <i class="iconfont  yanjing" :class="eyeFlag == false ? 'icon-yanjing-biyan' :''" @click="eyeClick" ></i></div>
          <div class="tool">
            <Button type="primary" @click="controlTrackRetrunVisitRecordModal = true" ghost>追踪回访记录</Button>
            <Button style="margin-left:10px" type="primary" @click="controlOrderInfoModal = true" ghost>下单订单信息</Button>
            <Button style="margin-left:10px" type="primary" @click="controlContentOrderInfoModal = true" ghost>内容平台订单信息</Button>
            <Button style="margin-left:10px" type="primary" @click="controlAppointmentModal = true" ghost>预约信息</Button>
            <Button style="margin-left:10px" type="primary" @click="controlAlreadyReceiveGiftModal = true" ghost>已领取礼品</Button>
          </div>
          <Divider/>
          <!-- <div class="top"> -->
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="回访工具" prop="trackToolId">
                  <div class="template">
                    <Select v-model="form.trackToolId" placeholder="请选择回访工具" :disabled="callSuccessMsg && !!callSuccessMsg.CallRecordID">
                      <Option :value="item.id" v-for="item in trackTool" :key="item.id">{{item.name}}</Option>
                    </Select>
                    <Button class="btn" v-show="trackReturnVisitToolName === '电话'" :type="callSuccessMsg && callSuccessMsg.CallRecordID ? 'success' : 'primary'" @click="call">
                      <span class="iconfont icon-dianhua1"></span>
                    </Button>
                  </div>
                </FormItem>
                <FormItem label="回访类型" prop="trackTypeId">
                  <Select v-model="form.trackTypeId" placeholder="请选择回访类型" @on-change="trackTypeChange()">
                    <Option :value="item.id" v-for="item in trackType" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="回访主题" prop="trackThemeId" v-show="trackThemeList.length">
                  <Select v-model="form.trackThemeId" placeholder="请选择回访主题">
                    <Option :value="item.id" v-for="item in trackThemeList" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="回访计划" prop="trackPlan">
                  <Input
                    v-model="form.trackPlan"
                    placeholder="请输入回访计划"
                  />
                </FormItem>
                <FormItem label="是否有效" prop="valid">
                  <i-switch v-model="form.valid"  />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="回访内容" prop="trackContent">
                  <Input
                    v-model="form.trackContent"
                    show-word-limit
                    type="textarea"
                    placeholder="请输入回访内容"
                    class="trackContent"
                  />
                </FormItem>
              </Col>
            </Row>
          <!-- </div> -->
          <Divider/>
          <!-- <div class="bottom"> -->
            <Row :gutter="30">
              <Col span="12">
                <FormItem label="设置下次回访">
                  <i-switch v-model="controlNextReturnVisit" @on-change="switchClick"/>
                  <span class="text" >【注】：若不需要下次回访，可关闭此按钮</span>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="30">
              <Col span="8">
                <FormItem label="下次回访日期" prop="addWaitTrackCustomerObj.planTrackDate" v-if="controlNextReturnVisit">
                  <DatePicker
                    type="date"
                    placeholder="请选择下次回访日期"
                    style="width: 100%"
                    :value="form.addWaitTrackCustomerObj.planTrackDate"
                    @on-change="handlePlanTrackDateChange"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="回访类型" prop="addWaitTrackCustomerObj.trackTypeId" v-if="controlNextReturnVisit">
                  <Select v-model="form.addWaitTrackCustomerObj.trackTypeId" placeholder="请选择下次回访类型" @on-change="handleNextTimeTrackTypeChange">
                    <Option :value="item.id" v-for="item in trackType" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="回访主题" prop="addWaitTrackCustomerObj.trackThemeId" v-if="controlNextReturnVisit">
                  <Select v-model="form.addWaitTrackCustomerObj.trackThemeId" placeholder="请选择下次回访主题">
                    <Option :value="item.id" v-for="item in nextTimeTrackThemeList" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="30">
              <Col span="8">
                <FormItem label="其他客服回访" v-if="controlNextReturnVisit">
                  <Select v-model="form.addWaitTrackCustomerObj.otherTrackEmployeeId" placeholder="请选择其他客服回访">
                    <Option :value="item.id" v-for="item in employee" :key="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="回访计划" prop="addWaitTrackCustomerObj.trackPlan" v-if="controlNextReturnVisit">
                  <Input
                    v-model="form.addWaitTrackCustomerObj.trackPlan"
                    placeholder="请输入回访计划"
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <Button type="primary" @click="addTemplateChange"  v-if="controlNextReturnVisit">添加</Button>
              </Col>
            </Row>
          <!-- </div> -->
          <div class="list"  v-if="controlNextReturnVisit">
            <Table border :columns="query.columns" :data="form.addWaitTrackCustomer"   height="300"></Table>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleClose('form')">关闭</Button>
        <Button type="primary" @click="handleSubmit('form')">保存</Button>
      </div>
    </Modal>

    <!-- 追踪回访记录 -->
    <trackRetrunVisitRecord 
      :encryptPhone="params.encryptPhone"
      :controlTrackRetrunVisitRecordModal="controlTrackRetrunVisitRecordModal"
      @handleTrackRetrunVisitRecordModalChange="controlTrackRetrunVisitRecordModal = false;"
    />

    <!-- 下单订单信息 -->
    <orderInfo
      :encryptPhone="params.encryptPhone"
      :controlOrderInfoModal="controlOrderInfoModal"
      @handleOrderInfoModalChange="controlOrderInfoModal = false;"
    />

    <!-- 内容平台订单信息 -->
    <contentOrderInfo
      :encryptPhone="params.encryptPhone"
      :controlContentOrderInfoModal="controlContentOrderInfoModal"
      @handleContentOrderInfoModalChange="controlContentOrderInfoModal = false;"
    />

    <!-- 预约信息 -->
    <appointment
      :encryptPhone="params.encryptPhone"
      :controlAppointmentModal="controlAppointmentModal"
      @handleAppointmentModalChange="controlAppointmentModal = false;"
    />

    <!-- 已领取礼品 -->
    <alreadyReceiveGift
      :encryptPhone="params.encryptPhone"
      :controlAlreadyReceiveGiftModal="controlAlreadyReceiveGiftModal"
      @handleAlreadyReceiveGiftModalChange="controlAlreadyReceiveGiftModal = false;"
    />
  </div>
</template>

<script>
import * as customerManage from "@/api/customerManage";
import * as api from "@/api/common";
import * as baseApi from "@/api/baseDataMaintenance";
import * as orderApi from "@/api/orderManage";

import trackRetrunVisitRecord from "@/components/trackRetrunVisitRecord/trackRetrunVisitRecord";
import orderInfo from "@/components/orderInfo/orderInfo";
import contentOrderInfo from "@/components/contentOrderInfo/contentOrderInfo";
import appointment from "@/components/appointment/appointment";
import alreadyReceiveGift from "@/components/alreadyReceiveGift/alreadyReceiveGift";
export default {
  components:{
    trackRetrunVisitRecord,
    orderInfo,
    contentOrderInfo,
    appointment,
    alreadyReceiveGift
  },
  props:{
    /**
     * 回访
     * controlTrackReturnVisitDisplay
     * 当前设备
     * device
     * 加密电话
     * encryptPhone
     */
    /**
     * 待回访
     * controlTrackReturnVisitDisplay
     * 当前设备
     * device
     * 加密电话
     * encryptPhone
     * 待回访编号
     * waitTrackId
     * 回访类型编号
     * trackTypeId
     * 回访主题编号
     * trackThemeId
     */
    params:{
      type:Object,
    }
  },
  data() {
    return {
      indexs:0,
      index:0,
      ind:0,
      // 内容平台订单 弹窗
      controlContentOrderInfoModal:false,
      // 控制弹框
      controlModal: false,

      // 下次回访情况
      controlNextReturnVisit: true,

      form: {
        // 加密手机号
        encryptPhone: "",
        // 回访工具编号
        trackToolId: "",
        // 回访类型编号
        trackTypeId: "",
        // 回访主题
        trackThemeId: "",
        // 回访计划
        trackPlan:'',
        // 回访内容
        trackContent: "",
        // 通话记录编号，如果回访工具是电话 该字段必传
        callRecordId: null,
        // 如果没有勾选下次回访，该字段为null
        addWaitTrackCustomerObj: {
          // 下次回访日期
          planTrackDate: "",
          // 下次回访类型
          trackTypeId:"",
          // 下次回访主题
          trackThemeId: "",
          // 其他客服回访
          otherTrackEmployeeId:null,
          // 回访计划
          trackPlan:'',
        },
        // 是否有效
        valid: true,
        addWaitTrackCustomer:[]
      },
      
      employee: [],

      ruleValidate: {
        trackToolId: [
          {
            required: true,
            message: "请选择回访工具",
          },
        ],
        trackTypeId: [
          {
            required: true,
            message: "请选择回访类型",
          },
        ],
        trackThemeId: [
          {
            required: true,
            message: "请选择回访主题",
          },
        ],
        trackContent: [
          {
            required: true,
            message: "请输入回访内容",
          },
        ],
        trackPlan: [
          {
            required: true,
            message: "请输入回访计划",
          },
        ],
        valid: [
          {
            required: true,
            message: "请选择是否有效",
          },
        ],
      },
      query:{
        columns:[
          {
            title: "下次回访日期",
            key: "planTrackDate",
            width: 140,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.planTrackDate).format(
                  "YYYY-MM-DD"
                )
              );
            },
          },
          {
            title: "回访类型",
            key: "trackTypeName",
            width: 120,
          },
          {
            title: "回访主题",
            key: "trackThemeName",
            width: 120,
          },
          {
                title: '回访计划',
                key: 'notes',
                render:(h,params)=>{
                    return h('Input',{
                        props:{
                            placeholder:"请输入回访计划",
                            value:params.row.trackPlan
                        },
                        on:{
                            'on-blur': (event) => {
                                this.form.addWaitTrackCustomer[params.index].trackPlan = event.target._value;
                            }
                        }
                    })
                },
            },
            {
            title: "其他客服回访",
            key: "otherTrackEmployeeName",
            width: 150,
          },
            {
            title: "操作",
            align: "center",
            width: 120,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        const {id} = params.row;
                        const findIndex = this.form.addWaitTrackCustomer.findIndex(item=> item.id === params.index);
                        this.form.addWaitTrackCustomer.splice(findIndex,1)
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
        ],
        data:[]
      },

      // 回访工具列表
      trackTool:[],

      // 回访类型列表
      trackType:[],

      // 回访主题列表
      trackThemeList:[],

      // 下次回访主题列表
      nextTimeTrackThemeList:[],

      controlTrackRetrunVisitRecordModal:false,

      controlOrderInfoModal:false,

      controlAppointmentModal:false,

      controlAlreadyReceiveGiftModal:false,
      // 控制眼睛展示
      eyeFlag:false
    };
  },
  methods: {
    switchClick(){
      if(this.controlNextReturnVisit == false){
        this.form.addWaitTrackCustomer = []
        return
      }
    },
    eyeClick(){
      const data = {
        encryptPhone:this.params.encryptPhone
      }
      orderApi.decryptoPhonesNew(data).then((res) => {
        if (res.code === 0) {
          this.params.phone = res.data.phone;
          this.eyeFlag = true
        }
      });
    },
    // 添加模板
    addTemplateChange(){
      const {planTrackDate ,trackTypeId,trackThemeId, trackPlan,otherTrackEmployeeId} = this.form.addWaitTrackCustomerObj
      if(!planTrackDate){
        this.$Message.error('请选择下次回访日期')
        return
      }
      if(!trackTypeId){
        this.$Message.error('请选择下次回访类型')
        return
      }
      if(!trackThemeId){
        this.$Message.error('请选择下次回访主题')
        return
      }
      if(!trackPlan){
        this.$Message.error('请输入下次回访计划')
        return
      }
      if(planTrackDate <= this.$moment().format("YYYY-MM-DD")){
        this.$Message.error('下次回访时间必须大于今日')
        return
      }
      // 回访类型 名称 根据id查找name 列表用该name字段
      let trackTypeName = this.trackType.find(item=>item.id == trackTypeId).name
      // 回访主题
      let trackThemeName = this.nextTimeTrackThemeList.find(item=>item.id == trackThemeId).name
      if(otherTrackEmployeeId){
        // 其他客服回访
        this.otherTrackEmployeeName = this.employee.find(item=>item.id == otherTrackEmployeeId).name
      }
      let max =Math.max.apply(Math,this.form.addWaitTrackCustomer.map(item=>{return item.id}))
      
      this.form.addWaitTrackCustomer.push({
        planTrackDate,
        trackTypeId,
        trackTypeName,
        trackThemeId,
        trackThemeName,
        otherTrackEmployeeId,
        otherTrackEmployeeName:otherTrackEmployeeId ? this.otherTrackEmployeeName : null,
        trackPlan,
        id :max ? ++max : this.ind++
      })
      this.form.addWaitTrackCustomerObj = {
        // 下次回访日期
        planTrackDate: "",
        // 下次回访类型
        trackTypeId:"",
        // 下次回访主题
        trackThemeId: "",
        // 其他客服回访
        otherTrackEmployeeId:null,
        // 回访计划
        trackPlan:'',
        id:0
      }
    },
    // 获取有效的回访工具列表
    getTrackReturnVisitToolList() {
      api.getTrackReturnVisitToolList().then(res=>{
        if(res.code === 0) {
          this.trackTool = res.data.trackTool;
        }
      })
    },

    // 获取有效的回访类型列表
    getTrackReturnVisitTypeList() {
      api.getTrackReturnVisitTypeList().then(res=>{
        this.trackType = res.data.trackType;
      })
    },
    
    // 通过下次回访类型编号获取下次回访主题列表
    handleNextTimeTrackTypeChange(trackTypeId) {
      if(!trackTypeId) return;
      api.byTrackTypeIdGetTrackThemeList(trackTypeId).then(res=>{
        if(res.code === 0) {
          this.nextTimeTrackThemeList = res.data.trackTheme;
        }
      })
      baseApi.byIdTrack(trackTypeId).then((res) => {
        if(res.code === 0 ){
          const {hasModel,trackTypeThemeModel} = res.data.giftInfo
          this.trackReturnVisitComParams.hasModel = hasModel
          this.trackReturnVisitComParams.trackTypeThemeModel = trackTypeThemeModel
        }
      })
    },
   

    // 下次回访日期
    handlePlanTrackDateChange(value) {
      // if(value <= this.$moment().format("YYYY-MM-DD")){
      //   this.$Message.error('下次回访时间必须大于今日')
      // }else{
      //   this.form.addWaitTrackCustomerObj.planTrackDate = value;
      // }
      this.form.addWaitTrackCustomerObj.planTrackDate = value;
    },

    // 获取客服列表
    getCustomerServiceList() {
      customerManage.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = employee;
        }
      });
    },

    handleClose(name) {
      this.$Modal.confirm({
        title: "关闭提示",
        content: "关闭将会丢失数据",
        onOk: () => {
          this.close(name);
        },
      });
      this.eyeFlag = false
    },

    close(name) {
      this.controlModal = false;
      this.$refs[name].resetFields();
      this.form.addWaitTrackCustomerObj = {
        // 下次回访日期
        planTrackDate: "",
        // 下次回访类型
        trackTypeId:"",
        // 下次回访主题
        trackThemeId: "",
      },
      this.controlNextReturnVisit = true;
      this.$store.commit("callCenter/resetCallSuccessMsg")
      this.$emit("resetControlTrackReturnVisitDisplay")
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {addWaitTrackCustomer,encryptPhone,trackToolId,trackTypeId,trackThemeId,trackPlan,trackContent,callRecordId,valid,} = this.form;
          const datas = {
            addWaitTrackCustomer: addWaitTrackCustomer ? addWaitTrackCustomer : [],
            encryptPhone,
            trackToolId,
            trackTypeId,
            trackThemeId,
            trackPlan,
            trackContent,
            callRecordId,
            valid,
            waitTrackId:this.params.waitTrackId ? this.params.waitTrackId : null
          }
          if(this.controlNextReturnVisit == true && addWaitTrackCustomer.length==0){
            this.$Message.warning('请添加下次回访数据！')
            return
          }
          // 如果设置了下次回访则直接提交form 否则提交除addWaitTrackCustomer其他字段
          // const params = this.controlNextReturnVisit ? this.form : data;
          // 工具名称
          const toolName = this.trackTool.find(item=> item.id === datas.trackToolId).name;
          // 如果选择工具是电话，则必须呼叫
          if(toolName === "电话" && !this.callSuccessMsg) {
            this.$Message.info({
              content: "请拨打电话",
              duration: 3,
            });
            return;
          }
          // 如果选择工具是电话，则需把录音记录编号传给后台
          if(toolName === "电话") {
            datas.callRecordId = this.callSuccessMsg.CallRecordID
          }
          if(this.controlNextReturnVisit == true ){
            if(addWaitTrackCustomer.length == 0){
              this.$Message.error('请先添加模板')
            }
          }
          api.addTrackRecord(datas).then(res=>{
            if(res.code === 0) {
              this.$Message.success({
                content: "添加成功",
                duration: 3,
              });
              // 刷新父组件列表
              this.$emit("refreshParentComList")
              this.close(name);
            }
          }) 
        }
      });
    },

    // 呼叫
    call(){
      const { device, encryptPhone } = this.params;
      const data = {
        CallableID:device,
        CallOutPhoneNumber:encryptPhone,
        InLineCode: null,
        IsRedirectCall: false,
      }
      this.$store.dispatch("callCenter/callOut", data);
    },
    //获取n天前或n天后的日期
    getTime(AddDayCount) {
        let  dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        let y = dd.getFullYear();
        let m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
        let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        return `${y}-${m}-${d}`;
    },
    trackTypeChange(){
      
    }
},
  computed: {
    callSuccessMsg() {
      return this.$store.state.callCenter.callSuccessMsg;
    },
    trackReturnVisitToolName() {
      return this.form.trackToolId && this.trackTool.find(item=> item.id === this.form.trackToolId).name;
    }
  },
  created() {
    this.getTrackReturnVisitToolList()
    this.getTrackReturnVisitTypeList()
    this.getCustomerServiceList();
  },
  watch:{
    params:{
      handler(params){
        const {controlTrackReturnVisitDisplay, encryptPhone,hasModel,trackTypeThemeModel} = params;
        if(controlTrackReturnVisitDisplay) {
          this.controlModal  = controlTrackReturnVisitDisplay;
          this.form.encryptPhone = encryptPhone;
          // 待回访编号
          if(params.waitTrackId) {
            this.form.waitTrackId = params.waitTrackId;
          }
          // 回访类型
          if(params.trackTypeId) {
            this.form.trackTypeId = params.trackTypeId;
          }
          // 回访主题
          if(params.trackThemeId) {
            this.form.trackThemeId = params.trackThemeId;
          }

        }
        // 判断基础数据模块添加的模板 如果 hasModel（是否开启模板）为true 
        if(hasModel == true){
          // 设置下次回访自动开启
          this.controlNextReturnVisit = true
          this.form.addWaitTrackCustomer = trackTypeThemeModel.map((item,index)=>{
            return{
              planTrackDate:this.getTime(Number(item.daysLater)),
              trackTypeId:item.trackTypeId,
              trackThemeId:item.trackThemeId,
              otherTrackEmployeeId:null,
              trackPlan:item.trackPlan,
              id:index++,
              trackThemeName:item.trackThemeName,
              trackTypeName:item.trackTypeName
            }
          })
        }
      },
      deep:true
    },
    // 通过回访类型编号获取回访主题列表
    'form.trackTypeId':{
      handler(trackTypeId) {
        if(!trackTypeId) return;
        api.byTrackTypeIdGetTrackThemeList(trackTypeId).then(res=>{
          if(res.code === 0) {
            this.trackThemeList = res.data.trackTheme;
            
          }
        })
        baseApi.byIdTrack(trackTypeId).then((res) => {
          if(res.code === 0 ){
            const {hasModel,trackTypeThemeModel} = res.data.giftInfo
            // 判断基础数据模块添加的模板 如果 hasModel（是否开启模板）为true 
            if(hasModel == true){
              // 设置下次回访自动开启
              this.controlNextReturnVisit = true
              this.form.addWaitTrackCustomer = trackTypeThemeModel.map((item,index)=>{
                return{
                  planTrackDate:this.getTime(Number(item.daysLater)),
                  trackTypeId:item.trackTypeId,
                  trackThemeId:item.trackThemeId,
                  otherTrackEmployeeId:null,
                  trackPlan:item.trackPlan,
                  id:index++,
                  trackThemeName:item.trackThemeName,
                  trackTypeName:item.trackTypeName
                }
              })
            }
          }
      })
        // this.$emit('getTtrak',trackTypeId)
      }
    }
  }
};
</script>
<style lang="less" scoped>
.top{
  /deep/ .ivu-form-item-label{
    width: 90px!important;
  }
  /deep/ .ivu-form-item-content{
    margin-left: 90px!important;
  }
  .template{
    display: flex;
    align-items: center;
    .btn{
      margin-left:10px;
      width:30px;
      height:30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  /deep/ .trackContent{
    .ivu-input{
      min-height: 150px;
    }
  }
  
}
.text{
    color:red;margin-left:10px
  }
.phone{
  font-size:14px;
  font-weight:bold;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.yanjing{
  font-size: 24px;
  margin-left: 5px;

}
</style>
