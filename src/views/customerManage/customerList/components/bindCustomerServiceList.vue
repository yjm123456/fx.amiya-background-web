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
              @keyup.enter.native="getBindCustomerServerList()"
            />
            <Select
              v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }"
              v-model="query.employeeId"
              style="width: 200px; margin-right: 10px"
              placeholder="请选择客服"
            >
              <Option
                v-for="item in query.employee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select v-model="query.type" style="width: 200px; margin-right: 10px">
              <Option
                v-for="item in query.typeList"
                :value="item.value"
                :key="item.value"
                >{{ item.name }}</Option
              >
            </Select>
            <DatePicker
              type="date"
              placeholder="开始日期"
              style="width: 200px;margin-right: 10px"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <DatePicker
              type="date"
              placeholder="结束日期"
              style="width: 200px;;margin-right: 10px"
              :value="query.endDate"
              v-model="query.endDate"
            ></DatePicker>
            
          </div>
          <div class="price_content">
            <div @change="amountTypeFlag(query.amountType)">
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
              <Checkbox v-model="query.isUnTrack" :disabled="query.disabled" style="margin-left:20px">
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
          <Button type="primary" @click="getBindCustomerServerList()" style="margin-left:20px">查询</Button>
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
    <!--编辑客户信息  -->
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
    <!--客户信息  -->
    <customerMessage :customerMessageModel.sync="customerMessageModel" :customerMessageObj="customerMessageObj" :customerInfoComParams2="customerInfoComParams2" ></customerMessage>
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
      phone:"",
      // 客户列表
      query: {
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
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "电话",
            key: "phone",
          },
          {
            title: "客户昵称",
            key: "nickName",
          },
          {
            title: "绑定客服",
            key: "customerServiceName",
          },
          {
            title: "用户状态",
            key: "userId",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.userId ? '已注册小程序' : '未注册小程序'
              );
            },
          },
          {
            title: "操作",
            width: 220,
            fixed: "right",
            align: "center",
            render: (h, params) => {
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
        typeList: [
          {
            name: "全部客户",
            value: 0,
          },
          {
            name: "已注册小程序",
            value: 1,
          },
          {
            name: "未注册小程序",
            value: 2,
          },
        ],
        type: 0,
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
    };
  },
  methods: {
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
          this.cancelSubmit('form');
          this.getBindCustomerServerList();
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
    // 取消
    cancelSubmit(name){
      this.editCustomerForm.editCustomerModel = false
      this.$refs[name].resetFields();
    },
    isAuthority() {
      let currentRole = JSON.parse(sessionStorage.getItem("permissions")) ? JSON.parse(sessionStorage.getItem("permissions")) : [];
      if (!currentRole.includes("fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE")) {
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

    // 获取绑定客服的客户列表
    getBindCustomerServerList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, employeeId, type , startDate , endDate , amountType ,isUnTrack , minAmount ,maxAmount ,unTrackStartDate ,unTrackEndDate} = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        employeeId: !this.isAuthority() ? null : employeeId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        type,
        amountType,
        isUnTrack,
        minAmount,
        maxAmount,
        unTrackStartDate : unTrackStartDate ? this.$moment(unTrackStartDate).format("YYYY-MM-DD") : null,
        unTrackEndDate : unTrackEndDate ? this.$moment(unTrackEndDate).format("YYYY-MM-DD") : null 
      };
      api.getBindCustomerServerList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customer;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取绑定客服的客户列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, employeeId, type , startDate , endDate , amountType ,isUnTrack , minAmount ,maxAmount ,unTrackStartDate ,unTrackEndDate} = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        employeeId: !this.isAuthority() ? null : employeeId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        type,
        amountType,
        isUnTrack,
        minAmount,
        maxAmount,
        unTrackStartDate : unTrackStartDate ? this.$moment(unTrackStartDate).format("YYYY-MM-DD") : null,
        unTrackEndDate : unTrackEndDate ? this.$moment(unTrackEndDate).format("YYYY-MM-DD") : null 
      };
      api.getBindCustomerServerList(data).then((res) => {
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
  },
  computed: {
    device() {
      return this.$store.state.callCenter.callableInfo.SelectedCallableID;
    },
  },
  created() {
    this.getCustomerServiceList();
  },
  watch: {
    activeName: {
      handler(activeName) {
        if (activeName === "bindCustomerServiceList") {
          this.getBindCustomerServerList();
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
