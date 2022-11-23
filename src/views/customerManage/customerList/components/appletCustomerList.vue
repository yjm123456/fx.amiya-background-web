<!-- 客户列表 -->
<template>
  <div>
    <Card :dis-hover="true">
      <div class="content">
        <div class="conter">
          <div>
            <Input
              v-model="query.keyword"
              placeholder="请输入客户名称和手机尾号"
              style="width: 220px; margin-right: 10px"
              @keyup.enter.native="getWeChatCustomerList()"
            />
            <Select
              v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }"
              v-model="query.employeeId"
              style="width: 180px; margin-right: 10px"
              placeholder="请选择客服"
            >
              <Option
                v-for="item in query.employee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.memberRankId"
              style="width: 180px; margin-right: 10px"
              placeholder="请选择会员卡级别"
            >
              <Option
                v-for="item in query.memberRankNames"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.BirthMonth"
              style="width: 170px; margin-right: 10px"
              placeholder="请选择生日月份"
              filterable
            >
              <Option
                v-for="item in monthList"
                :value="item.BirthMonth"
                :key="item.BirthMonth"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="开始日期"
              style="width: 180px;margin-right: 10px"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="结束日期"
              style="width: 180px;;margin-right: 10px"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
          </div>
          <div class="price_content">
            <div @change="amountTypeFlag(query.amountType)" style="margin-right:30px">
              <Radio-group v-model="query.amountType" vertical>
                  <Radio label="0">下单金额</Radio>
                  <Radio label="1">核销金额</Radio>
              </Radio-group>
            </div>
            <Input
              v-model="query.minAmount"
              placeholder="最小金额"
              style="width: 200px; margin:0  5px;"
              @keyup.enter.native="getWeChatCustomerList()"
            />
            —
            <Input
              v-model="query.maxAmount"
              placeholder="最大金额"
              style="width: 200px; margin:0  5px; "
              @keyup.enter.native="getWeChatCustomerList()"
            />
            <div @change="isUnTrackCheckbox(query.isUnTrack)">
              <Checkbox v-model="query.isUnTrack" :disabled="query.disabled" style="margin-left:100px">
                  <span v-if="query.isUnTrack">未回访客户</span>
                  <span v-else>未回访客户</span>
              </Checkbox>
              <DatePicker
                type="date"
                placeholder="开始日期"
                style="width: 200px;margin-right: 10px"
                :value="query.unTrackStartDate"
                v-model="query.unTrackStartDate"
                :disabled="query.isUnTrack==false"
              ></DatePicker>
              <DatePicker
                type="date"
                placeholder="结束日期"
                style="width: 200px;;margin-right: 10px"
                :value="query.unTrackEndDate"
                v-model="query.unTrackEndDate"
                :disabled="query.isUnTrack==false"
              ></DatePicker>
            </div>
          </div>
        </div>
        <div>
          <Button type="primary" @click="getWeChatCustomerList()" style="margin-left:20px">查询</Button>
          <Button type="primary" @click="expiredCustomerIntergration" style="margin-left:20px" v-if="amiyaPositionId==1  || amiyaPositionId==16">积分过期</Button>
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div>
    </Card>

    <!-- 客户详情 -->
    <customerInfo
      @resetControlCustomerInfoDisplay="resetControlCustomerInfoDisplay"
      :customerInfoComParams="customerInfoComParams"
    />

    <!-- 追踪回访 -->
    <trackReturnVisit
      @resetControlTrackReturnVisitDisplay="resetControlTrackReturnVisitDisplay"
      :params="trackReturnVisitComParams"
    />
    <!--客户信息  -->
    <customerMessage :customerMessageModel.sync="customerMessageModel" 
    :customerMessageObj="customerMessageObj" :customerInfoComParams2="customerInfoComParams2" ></customerMessage>
    <!-- 发送会员卡 -->
    <Modal
      v-model="sendMemberCardForm.controlModal"
      title="发送会员卡"
      :mask-closable="false"
      :closable="false"
    >
      <Form
        ref="form"
        :model="sendMemberCardForm"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="会员卡" prop="memberRankId">
          <Select
            @on-change="handleSelectMemberCard"
            v-model="sendMemberCardForm.memberRankId"
            placeholder="请选择会员卡"
            :label-in-value="true"
          >
            <Option
              v-for="item in sendMemberCardForm.memberRankInfos"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <template v-if="sendMemberCardForm.memberRankName === '黑卡会员'">
          <FormItem label="会员卡号" prop="memberCardNum" >
            <Input v-model="sendMemberCardForm.memberCardNum" placeholder="请输入会员卡号"></Input>
          </FormItem>
        </template>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 编辑客户信息 -->

    <Modal
      v-model="editCustomerForm.editCustomerModel"
      title="编辑客户信息"
      :mask-closable="false"
      :closable="false"
    >
      <Form
        ref="form"
        :model="editCustomerForm"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="姓名" prop="name">
            <Input
              v-model="editCustomerForm.name"
              placeholder="请输入姓名"
              style="width: 380px; margin-right: 10px"
            />
        </FormItem>
        <FormItem label="性别" prop="sex">
          <div >
            <Radio-group v-model="editCustomerForm.sex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
            </Radio-group>
          </div>
        </FormItem>
        <FormItem label="生日" prop="birthday">
          <DatePicker
            type="date"
            placeholder="选择日期"
            style="width: 380px;margin-right: 10px"
            :value="editCustomerForm.birthday"
            v-model="editCustomerForm.birthday"
          ></DatePicker>
        </FormItem>
        <FormItem label="职业" prop="occupation">
          <Input
              v-model="editCustomerForm.occupation"
              placeholder="请输入职业"
              style="width: 380px; margin-right: 10px"
            />
        </FormItem>
        <FormItem label="微信号" prop="wechatNumber">
          <Input
            v-model="editCustomerForm.wechatNumber"
            placeholder="请输入微信号"
            style="width: 380px; margin-right: 10px"
          />
        </FormItem>
        <FormItem label="城市" prop="city">
          <Input
            v-model="editCustomerForm.city"
            placeholder="请输入城市"
            style="width: 380px; margin-right: 10px"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleEditSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import customerInfo from "@/components/customerInfo/customerInfo";
import trackReturnVisit from "@/components/trackReturnVisit/trackReturnVisit";
import customerMessage from "@/components/customerMessage/customerMessage"

export default {
  props: {
    activeName: String,
  },
  components: {
    customerInfo,
    trackReturnVisit,
    customerMessage
  },
  data() {
    return {
      customerMessageModel:false,
      // 客户信息组件参数
      customerInfoComParams2: {
        userId: "",
        encryptPhone: "",
        tabGlag:false
      },
      customerMessageObj:{},
      amiyaPositionId:sessionStorage.getItem("amiyaPositionId"),
      monthList:[
        {
          BirthMonth:0,
          name:'全部'
        },
        {
          BirthMonth:1,
          name:'一月'
        },
        {
          BirthMonth:2,
          name:'二月'
        },
        {
          BirthMonth:3,
          name:'三月'
        },
        {
          BirthMonth:4,
          name:'四月'
        },
        {
          BirthMonth:5,
          name:'五月'
        },
        {
          BirthMonth:6,
          name:'六月'
        },
        {
          BirthMonth:7,
          name:'七月'
        },
        {
          BirthMonth:8,
          name:'八月'
        },{
          BirthMonth:9,
          name:'九月'
        }
        ,{
          BirthMonth:10,
          name:'十月'
        }
        ,{
          BirthMonth:11,
          name:'十一月'
        }
        ,{
          BirthMonth:12,
          name:'十二月'
        }
      ],
      phone:"",
      // 客户列表
      query: {
        BirthMonth:Number(this.$moment(new Date()).format("MM")),
        // 未回访
        isUnTrack:false,
        // 最小金额
        minPrice:"",
        maxPrice:"",
        //  amountType下单总额=0，核销总额=1
        amountType:"0",
        disabled:false,
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        unTrackStartDate:  null,
        unTrackEndDate: null ,
        columns: [
          {
            title: "头像",
            key: "avatar",
            width: 300,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 5px",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.avatar,
                    },
                  }),
                  params.row.nickName,
                ]
              );
            },
          },
          {
            title: "创建时间",
            key: "createDate",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD"
                )
              );
            },
          },
          {
            title: "电话",
            key: "phone",
          },
          {
            title: "省份",
            key: "province",
          },
          {
            title: "城市",
            key: "city",
          },
          {
            title: "积分余额",
            key: "integrationBalance",
          },
          {
            title: "会员级别",
            key: "memberRank",
          },
          {
            title: "会员卡号",
            key: "memberCardNum",
          },
          {
            title: "操作",
            width: 400,
            fixed: "right",
            align: "center",
            render: (h, params) => {
              const currentRole = JSON.parse(
                sessionStorage.getItem("permissions")
              );
              const flag = currentRole.some((ele) => {
                return "fx.amiya.permission.SEND_MEMBER_CARD".includes(
                  ele
                );
              });
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { encryptPhone,userId } = params.row;
                        // 
                        let data = {
                          encryptPhone:encryptPhone
                        }
                        
                        api.getBaseAndBindCustomerInfoByEncryptPhone(data).then((res) => {
                          if(res.code === 0){
                            this.customerInfoComParams2.userId = userId;
                            this.customerInfoComParams2.encryptPhone = encryptPhone;
                            this.customerInfoComParams2.tabGlag = true;
                            this.customerMessageModel = true
                            this.customerMessageObj = res.data.customer
                          }
                        })
                      },
                    },
                  },
                  "客户信息"
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //     },
                //     style: {
                //       marginRight: "5px",
                //     },
                //     on: {
                //       click: () => {
                //         const { userId, encryptPhone } = params.row;
                //         this.customerInfoComParams.userId = userId;
                //         this.customerInfoComParams.encryptPhone = encryptPhone;
                //         this.customerInfoComParams.controlCustomerInfoDisplay = true;
                //       },
                //     },
                //   },
                //   "客户详情"
                // ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { encryptPhone } = params.row;
                        this.trackReturnVisitComParams.encryptPhone = encryptPhone;
                        this.trackReturnVisitComParams.controlTrackReturnVisitDisplay = true;
                      },
                    },
                  },
                  "追踪回访"
                ), flag ?
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.sendMemberCardForm.customerId = id;
                        this.sendMemberCardForm.controlModal = true;
                      },
                    },
                  },
                  "发会员卡"
                )
                : null,
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //     },
                //     style: {
                //       marginRight: "5px",
                //     },
                //     on: {
                //       click: () => {
                //         const { encryptPhone } = params.row;
                //         this.editCustomerForm.encryptPhone = encryptPhone;
                //         this.phone = encryptPhone
                //         this.editCustomerForm.editCustomerModel = true
                //         this.getBaseInfoByEncryptPhone(encryptPhone)
                //       },
                //     },
                //   },
                //   "编辑信息"
                // ),
              ]);
            },
          },
        ],
        data: [],
        pageNum: 1,
        pageSize: 10,
        keyword: "",
        employee: [{ name: "全部客服", id: -1 }],
        employeeId: -1,
        memberRankNames:[{ name: "全部客户", id: -2 },{ name: "普通客户", id: -1 }],
        memberRankId:"",
        totalCount: 0,
      },

      // 追踪回访组件参数
      trackReturnVisitComParams: {
        device: "",
        encryptPhone: "",
        controlTrackReturnVisitDisplay: false,
      },

      // 客户信息组件参数
      customerInfoComParams: {
        userId: "",
        encryptPhone: "",
        controlCustomerInfoDisplay: false,
      },

      // 发送会员卡
      sendMemberCardForm: {
        controlModal: false,
        customerId: "",
        memberRankInfos: [],
        memberRankId: "",
        memberRankName:"",
        // 会员卡号
        memberCardNum:""
      },
      // 编辑客户信息
      editCustomerForm:{
        editCustomerModel:false,
        name:"",
        sex:"",
        encryptPhone:"",
        birthday:null,
        occupation:"",
        wechatNumber:"",
        city:""
      },
      ruleValidate: {
        memberRankId: [
          {
            required: true,
            message: "请选择会员卡",
          },
        ],
      },
    };
  },
  methods: {
    // 积分过期
    expiredCustomerIntergration(){
      this.$Modal.confirm({
          title: '是否确认清除所有用户积分？',
          content: '<p>该操作将会清空小程序客户的账户中所有积分，点击后无法恢复，请确认无误后操作！</p>',
          onOk: () => {
              api.expiredCustomerIntergration().then((res) => {
                if(res.code === 0){
                  this.$Message.success('操作成功')
                }
              })
          },
          onCancel: () => {
            
          }
      });
    },
    // 根据加密电话号获取客户基础信息
    getBaseInfoByEncryptPhone(even){
      const { encryptPhone } = this.editCustomerForm
      const data = {
        encryptPhone
      }
      api.getBaseInfoByEncryptPhone(data).then((res) => {
        if(res.code === 0){
          const { customerBaseInfo } = res.data;
          this.editCustomerForm = customerBaseInfo;
          this.editCustomerForm.editCustomerModel = true
        }
      })
    },
    // 编辑客户信息 确定
    handleEditSubmit(){
      const {name ,sex  ,birthday ,occupation ,wechatNumber ,city} = this.editCustomerForm
      const data = {
        name ,
        sex , 
        encryptPhone :this.phone,
        birthday : birthday? this.$moment(birthday).format("YYYY-MM-DD") : null,
        occupation ,
        wechatNumber ,
        city,
      }
      api.editCustomerBaseInfo(data).then((res) => {
        if (res.code === 0) {
          this.cancelSubmit("form");
          this.getWeChatCustomerList();
          this.$Message.success({
            content: "编辑成功",
            duration: 3,
          });
        }
      })

    },
    // 切换下单或者是核销清空输入框的值
    amountTypeFlag(data){
      if(data===0 ){
        this.query.minAmount = ""
        this.query.maxAmount = ""
      }else{
        this.query.minAmount = ""
        this.query.maxAmount = ""
      }
    },
    // 未回访的时候清空日期
    isUnTrackCheckbox(data){
      if(data==false){
        this.query.unTrackStartDate  = null
        this.query.unTrackEndDate  = null
      }
    },
    isAuthority() {
      let currentRole = JSON.parse(sessionStorage.getItem("permissions"))
        ? JSON.parse(sessionStorage.getItem("permissions"))
        : [];
      if (
        !currentRole.includes("fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE")
      ) {
        return false;
      }
      return true;
    },

    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.query.employee = [...this.query.employee, ...employee];
        }
      });
    },

    // 获取会员卡级别名称列表
    getMemberRankLevelList() {
      api.getMemberRankLevelList().then(res=>{
        if(res.code === 0) {
          this.query.memberRankNames = [...this.query.memberRankNames,...res.data.memberRankNames];
        }
      })
    },

    // 获取微信客户列表
    getWeChatCustomerList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, employeeId, memberRankId , startDate , endDate , amountType ,isUnTrack , minAmount ,maxAmount ,unTrackStartDate ,unTrackEndDate ,BirthMonth} = this.query;

      const data = {
        pageNum,
        pageSize,
        keyword,
        employeeId: !this.isAuthority() ? null : employeeId,
        memberRankId: memberRankId === -2 ? null : memberRankId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null ,
        amountType,
        isUnTrack,
        minAmount,
        maxAmount,
        unTrackStartDate : unTrackStartDate ? this.$moment(unTrackStartDate).format("YYYY-MM-DD") : null,
        unTrackEndDate : unTrackEndDate ? this.$moment(unTrackEndDate).format("YYYY-MM-DD") : null ,
        BirthMonth:BirthMonth == 0 ? "" : Number(BirthMonth)
      };
      api.getWeChatCustomerList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customer;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取微信客户列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, employeeId, memberRankId , startDate , endDate , amountType ,isUnTrack , minAmount ,maxAmount , unTrackStartDate,unTrackEndDate} = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        employeeId: !this.isAuthority() ? null : employeeId,
        memberRankId: memberRankId === -2 ? null : memberRankId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null ,
        amountType,
        isUnTrack,
        minAmount ,
        maxAmount,
        unTrackStartDate : unTrackStartDate ? this.$moment(unTrackStartDate).format("YYYY-MM-DD") : null,
        unTrackEndDate : unTrackEndDate ? this.$moment(unTrackEndDate).format("YYYY-MM-DD") : null 
      };
      api.getWeChatCustomerList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customer;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    resetControlCustomerInfoDisplay() {
      this.customerInfoComParams.controlCustomerInfoDisplay = false;
    },

    resetControlTrackReturnVisitDisplay() {
      this.trackReturnVisitComParams.controlTrackReturnVisitDisplay = false;
    },

    // 获取有效的会员等级列表
    getMemberRankInfoList() {
      api.getMemberRankInfoList().then((res) => {
        if (res.code === 0) {
          this.sendMemberCardForm.memberRankInfos = res.data.memberRankInfos;
        }
      });
    },

    // 选择会员卡
    handleSelectMemberCard(e) {
      if(!e) return;
      const { value, label } = e;
      this.sendMemberCardForm.memberRankId = value;
      this.sendMemberCardForm.memberRankName = label;
    },
  
    // 取消
    cancelSubmit(name) {
      this.sendMemberCardForm.controlModal = false;
      this.editCustomerForm.editCustomerModel = false
      this.$refs[name].resetFields();
      this.sendMemberCardForm.memberRankName = '';
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { customerId, memberRankId, memberCardNum } = this.sendMemberCardForm;
          const data = {
            customerId,
            memberRankId,
            memberCardNum
          };
          api.sendMemberCard(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("form");
              this.getWeChatCustomerList();
              this.$Message.success({
                content: "发送成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
  },
  computed: {
    device() {
      return this.$store.state.callCenter.callableInfo.SelectedCallableID;
    },
  },
  created() {
    this.getMemberRankInfoList();
    this.getMemberRankLevelList();
    this.getCustomerServiceList();

  },
  watch: {
    activeName: {
      handler(activeName) {
        if (activeName === "appletCustomerList") {
          this.getWeChatCustomerList();
        }
      },
      immediate: true,
    },
    device: {
      handler(device) {
        this.trackReturnVisitComParams.device = device;
      },
      immediate: true,
    },
    // 监听会员卡名称
    'sendMemberCardForm.memberRankName':{
      handler(memberRankName) {
        if(memberRankName !== '黑卡会员') {
          this.sendMemberCardForm.memberCardNum = '';
        }
      },
    }
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.content{
  display: flex;
  align-items: center;
}
.conter{
  display: flex;
  flex-direction: column;
}
.price_content{
  margin-top: 30px;
  display: flex;
  align-items: center;
}
</style>
