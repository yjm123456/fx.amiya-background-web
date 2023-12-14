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
              @keyup.enter.native="CustomerTrackServerList()"
            />
            <Select v-model="query.isUnTrack" style="width: 200px; margin-right: 10px" placeholder="请选择回访状态">
              <Option
                v-for="item in query.isUnTrackList"
                :value="item.id"
                :key="item.id"
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
            <!-- v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }" -->
            <Select
              v-model="query.employeeId"
              style="width: 200px; margin-right: 10px"
              placeholder="请选择客服"
              filterable
              :disabled="isDirector == 'false' && isCustomerService == 'true'"
            >
              <Option
                v-for="item in query.employee"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select v-model="query.type" style="width: 200px; margin-right: 10px" placeholder="请选择是否注册小程序">
              <Option
                v-for="item in query.typeList"
                :value="item.value"
                :key="item.value"
                >{{ item.name }}</Option
              >
            </Select>
            
            
            <Button type="primary" @click="CustomerTrackServerList()" style="margin-left:20px">查询</Button>
          </div>
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
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import customerInfo from "@/components/customerInfo/customerInfo";
import trackReturnVisit from "@/components/trackReturnVisit/trackReturnVisit";
export default {
  props: {
    activeName: String,
  },
  components: {
    customerInfo,
    trackReturnVisit,
  },
  data() {
    return {
      // 是否为客服
      isCustomerService:sessionStorage.getItem('isCustomerService'),
      // 是否为管理员
      isDirector:sessionStorage.getItem('isDirector'),
      phone:"",
      // 客户列表
      query: {

        positionName : sessionStorage.getItem("positionName"),
        // employeeId : sessionStorage.getItem("employeeId"),
        isUnTrackList:[
            {
                id:1,
                name:'已回访过'
            },
            {
                id:2,
                name:'未回访过'
            }
        ],
        columns: [
          {
            title: "最近回访时间",
            key: "latestTrackTime",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.latestTrackTime ? this.$moment(params.row.latestTrackTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ) : ''
              );
            },
          },
          
          
          {
            title: "电话",
            key: "phone",
            align:'center',
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
            title: "是否回访",
            key: "isTrack",
            align:'center',
          },
          {
            title: "创建时间",
            key: "createDate",
            align:'center',
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
            title: "操作",
            width: 300,
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
                        const { userId, encryptPhone } = params.row;
                        this.customerInfoComParams.userId = userId;
                        this.customerInfoComParams.encryptPhone = encryptPhone;
                        this.customerInfoComParams.controlCustomerInfoDisplay = true;
                      },
                    },
                  },
                  "客户详情"
                ),
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
                        this.editCustomerForm.encryptPhone = encryptPhone;
                        this.phone = encryptPhone
                        this.editCustomerForm.editCustomerModel = true
                        this.getBaseInfoByEncryptPhone(encryptPhone)
                      },
                    },
                  },
                  "编辑信息"
                ),
              ]);
            },
          },
        ],
        data: [],
        pageNum: 1,
        pageSize: 10,
        keyword: "",
        isUnTrack:1,
        disabled:false,
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        employee: [],
        // 97是线上客服主管id 如登录的是客服、客服管理员、客服主管除外 默认展示是客服主管id 为解决数据量大的问题
        // employeeId: sessionStorage.getItem("positionName") == '客服' || sessionStorage.getItem("positionName") == '客服管理员' || sessionStorage.getItem("positionName") == '客服主管' ? sessionStorage.getItem("employeeId") : 97,
        employeeId: sessionStorage.getItem('isDirector') == 'false' && sessionStorage.getItem('isCustomerService') == 'true' ? Number(sessionStorage.getItem('employeeId')): -1,
        typeList: [
          {
            name: "已注册小程序",
            value: 1,
          },
          {
            name: "未注册小程序",
            value: 2,
          },
        ],
        type: 2,
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
          this.CustomerTrackServerList();
          this.$Message.success({
            content: "编辑成功",
            duration: 3,
          });
        }
      })

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
          this.query.employee = employee;
          this.query.employee.map((item) => {
            if (this.query.positionName == "客服") {
              if (item.id == sessionStorage.getItem("employeeId")) {
                this.query.employeeId = item.id;
              }
            }
          });
        }
      });
    },

    // 获取绑定客服的客户列表
    CustomerTrackServerList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, employeeId, type , startDate , endDate , amountType ,isUnTrack} = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        // employeeId: sessionStorage.getItem("positionName") == '客服' ? sessionStorage.getItem("employeeId") : employeeId,
        employeeId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        type,
        amountType,
        isUnTrack,
      };
      api.CustomerTrackServerList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customer;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取绑定客服的客户列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, employeeId, type , startDate , endDate , amountType ,isUnTrack } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        // employeeId: !this.isAuthority() ? null : employeeId,
        // employeeId: sessionStorage.getItem("positionName") == '客服' ? sessionStorage.getItem("employeeId") : employeeId,
        employeeId,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        type,
        amountType,
        isUnTrack,
      };
      api.CustomerTrackServerList(data).then((res) => {
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
    this.CustomerTrackServerList()
  },
  watch: {
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
