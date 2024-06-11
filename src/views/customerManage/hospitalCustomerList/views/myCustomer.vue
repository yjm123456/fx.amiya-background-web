<!-- 客户列表 -->
<template>
  <div>
    <Card :dis-hover="true">
      <div>
        <Input
          v-model="query.keyword"
          placeholder="请输入电话"
          style="width: 200px; margin-right: 10px"
          @keyup.enter.native="hospitalGetCustomerList()"
        />
        <Button type="primary" @click="hospitalGetCustomerList()">查询</Button>
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

    <Modal
      v-model="controlModal"
      title="编辑客户基础信息"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="姓名" prop="name">
          <Input v-model="form.name" style="width: 100%"></Input>
        </FormItem>
        <!-- <FormItem label="年龄" prop="age">
          <InputNumber
            v-model="form.age"
            style="width: 100%"
            :min="1"
            :max="100"
          ></InputNumber>
        </FormItem> -->
        <FormItem label="客户性别" prop="sex">
          <RadioGroup v-model="form.sex">
            <Radio label="男">
              <Icon class="iconfont icon-nan1"></Icon>
              <span>男</span>
            </Radio>
            <Radio label="女">
              <Icon class="iconfont icon-nv2"></Icon>
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>

    <!-- 详情 -->
    <detail
      :controlModal="controlDetailModal"
      :encryptPhone="encryptPhone"
      :isTable="isTable"
      @handleDetailModalChange="controlDetailModal = false"
    ></detail>

    <!-- 消息追踪 -->
    <consumeTrack
      :controlModal="controlConsumeTrackModal"
      :encryptPhone="encryptPhone"
      :buyAgainTypes="buyAgainTypes"
      @handleConsumeTrackModalChange="controlConsumeTrackModal = false"
    ></consumeTrack>
     <!--客户信息  -->
    <hopitalCustomerMessage :customerMessageModel.sync="customerMessageModel" :customerMessageObj="customerMessageObj" :customerInfoComParams2="customerInfoComParams2"  @hospitalGetCustomerList="hospitalGetCustomerList"></hopitalCustomerMessage>
    <!-- 回访 -->
    <trackReturnVisitHospital @resetControlTrackReturnVisitDisplay="resetControlTrackReturnVisitDisplay"
      :params="trackReturnVisitComParams"/>
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
import detail from "../components/detail.vue";
import consumeTrack from "../components/consumeTrack";
import hopitalCustomerMessage from "@/components/customerMessage/hopitalCustomerMessage"
import trackReturnVisitHospital from "@/components/trackReturnVisitHospital/trackReturnVisit"

export default {
  props:{
    activeName:String,
    buyAgainType:Array
  },
  components: { detail, consumeTrack ,hopitalCustomerMessage,trackReturnVisitHospital},
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
      // 客户列表
      query: {
        columns: [
          {
            title: "标记为我来跟进",
            key: "orderId",
            width:150,
            align:'center',
            render: (h, params) => {
              return h("div", [
               
                h("Icon", {
                  props: {
                    type: "md-person",
                  },
                  style: {
                    cursor: "pointer",
                    marginRight: "5px",
                    fontSize: "18px",
                    marginTop: "6px",
                    color:params.row.isMyFollow == true ? 'orange' :''
                  },
                  on: {
                    click: () => {},
                  },
                }),

              ]);
            },
          },
          {
            title: "客户昵称",
            key: "customerName",
          },
          {
            title: "联系电话",
            key: "customerPhone",
            width:130,
            align:'center',
          },
          {
            title: "所在地区",
            key: "city",
            width:100,
            align:'center',
          },
          {
            title: "整形项目",
            key: "goodsDemand",
            align:'center',
            width:140
          },
          {
            title: "首次派单时间",
            key: "firstSendDate",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.firstSendDate).format("YYYY-MM-DD") == '0001-01-01' ? '' : params.row.firstSendDate ? this.$moment(params.row.firstSendDate).format("YYYY-MM-DD  HH:mm:ss") : null
              );
            },
          },
          {
            title: "查重操作时间",
            key: "confirmOrderDate",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.confirmOrderDate).format("YYYY-MM-DD") == '0001-01-01' ? ''  : params.row.confirmOrderDate ? this.$moment(params.row.confirmOrderDate).format("YYYY-MM-DD  HH:mm:ss") : null
              );
            },
          },
          {
            title: "上次派单时间",
            key: "newSendDate",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.newSendDate).format("YYYY-MM-DD") == '0001-01-01' ? '' : params.row.newSendDate ? this.$moment(params.row.newSendDate).format("YYYY-MM-DD  HH:mm:ss") : null
              );
            },
          },
          {
            title: "操作",
            width: 240,
            fixed: "right",
            align: "center",
            render: (h, params) => {
              return h("div", [
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //     },
                //     style: {
                //       marginRight: "10px",
                //     },
                //     on: {
                //       click: () => {
                //         const { encryptPhone, name, age, sex } = params.row;
                //         this.form = { encryptPhone, name, age, sex };
                //         this.controlModal = true;
                //       },
                //     },
                //   },
                //   "编辑客户"
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
                        const { encryptCustomerPhone,userId,isMyFollow } = params.row;
                        // 
                        let data = {
                          encryptPhone:encryptCustomerPhone
                        }
                        if(isMyFollow == false){
                          this.$Message.warning('您未接单该顾客，无法编辑客户信息！')
                          return
                        }
                        api.getBaseAndBindCustomerInfoByEncryptPhone(data).then((res) => {
                          if(res.code === 0){
                            this.customerInfoComParams2.userId = userId;
                            this.customerInfoComParams2.encryptPhone = encryptCustomerPhone;
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
                //     style: { marginRight: "10px" },
                //     on: {
                //       click: () => {
                //         const { encryptPhone } = params.row;
                //         this.encryptPhone = encryptPhone;
                //         this.controlDetailModal = true;
                //         this.isTable = true
                //       },
                //     },
                //   },
                //   "详情"
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
                        this.encryptPhone = encryptPhone;
                        this.controlConsumeTrackModal = true;
                      },
                    },
                  },
                  "消费追踪"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.isMyFollow == false
                    },
                    style: {},
                    on: {
                      click: () => {
                        const { encryptCustomerPhone,customerPhone } = params.row;
                        this.trackReturnVisitComParams.encryptPhone = encryptCustomerPhone;
                        this.trackReturnVisitComParams.controlTrackReturnVisitDisplay = true;
                        this.trackReturnVisitComParams.phone = customerPhone;
                        
                      },
                    },
                  },
                  "回访"
                ),
              ]);
            },
          },
        ],
        data: [],
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyword: "",
      },

      // 控制 modal
      controlModal: false,

      form: {
        // 加密电话文本
        encryptPhone: "",
        // 姓名
        name: null,
        // 年龄
        age: null,
        // 性别
        sex: null,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
          },
        ],
      },

      // 加密手机号
      encryptPhone: "",

      // 详情
      controlDetailModal: false,

      // 消息追踪
      controlConsumeTrackModal: false,
      isTable:false,
      buyAgainTypes:[],
      // 回访组件参数
      trackReturnVisitComParams: {
        device: "",
        encryptPhone: "",
        controlTrackReturnVisitDisplay: false,
        phone:''
      },
    };
  },
  methods: {
    resetControlTrackReturnVisitDisplay() {
      this.trackReturnVisitComParams.controlTrackReturnVisitDisplay = false;
    },
    resetControlCustomerInfoDisplay() {
      this.customerInfoComParams.controlCustomerInfoDisplay = false;
    },
    // 医院获取客户列表
    hospitalGetCustomerList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
      };
      api.myFollowListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalCustomerInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    handlePageChange(pageNum) {
      const { pageSize, keyword } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
      };
      api.myFollowListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalCustomerInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { encryptPhone, name, age, sex } = this.form;
          api
            .editCustomerBaseInfo({ encryptPhone, name, age, sex })
            .then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.hospitalGetCustomerList();
                this.$Message.success({
                  content: "编辑成功",
                  duration: 3,
                });
              }
            });
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (value === false) {
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "myCustomer") {
          this.hospitalGetCustomerList();
        }
      },
      immediate: true,
    },
    buyAgainType(value){
      this.buyAgainTypes=value
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
</style>
