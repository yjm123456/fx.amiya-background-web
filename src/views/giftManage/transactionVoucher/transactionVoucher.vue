<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; "
            @keyup.enter.native="getHospitalInfo()"
          />
          <Select
            v-model="query.valid"
            style="width: 140px;margin-left: .625rem"
            placeholder="请选择是否有效"
            >
            <Option
                v-for="item in query.validList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.checkState"
            placeholder="审核状态"
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in checkStateListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="addTransactionVoucherModal = true"
            >添加凭证</Button
          >
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

    <Modal
      v-model="controlModal"
      title="审核"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="审核状态" prop="checkState">
          <Select
            v-model="form.checkState"
            placeholder="请选择审核状态"
          >
            <Option
              v-for="item in checkStateList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="审核备注" prop="checkRemark">
          <Input v-model="form.checkRemark" type="textarea" :rows="4" placeholder="请输入审核备注"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 查看图片 -->
    <checkImg :checkImgControlModal.sync="checkImgControlModal" :checkImgParams="checkImgParams"/>
    <!-- 添加凭证 -->
    <addTransactionVoucher :addTransactionVoucherModal.sync="addTransactionVoucherModal" :addTransactionVoucherParams="addTransactionVoucherParams" @getHospitalInfo="getHospitalInfo"/>
    <!-- 编辑助理 -->
    <editAssistant :editAssistantModal.sync="editAssistantModal" :editAssistantParams="editAssistantParams" @getHospitalInfo="getHospitalInfo"/>
  </div>
</template>
<script>
import * as api from "@/api/customerConsumptionCredentials";
import * as orderApi from "@/api/customerManage.js";
import * as orderManage from "@/api/orderManage.js";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";

import checkImg from "./components/checkImg.vue"
import addTransactionVoucher from "./components/addTransactionVoucher.vue"
import editAssistant from "./components/editAssistant.vue"

export default {
  components:{
    checkImg,
    addTransactionVoucher,
    editAssistant
  },
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        valid:'true',
        checkState:-1,
        columns: [
          {
            title: "客户姓名",
            key: "customerName",
            minWidth: 150,
            align:'center',
          },
          {
            title: "留院电话",
            key: "toHospitalPhone",
            minWidth: 130,
            align:'center',
          },
          {
            title: "归属主播",
            key: "liveAnchor",
            minWidth: 150,
            align:'center',
          },
          {
            title: "助理",
            key: "assistantName",
            minWidth: 150,
            align:'center',
          },
          {
            title: "消费日期",
            key: "consumeDate",
            align:'center',
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                params.row.consumeDate ? this.$moment(params.row.consumeDate).format("YYYY-MM-DD") : ''
              );
            },
          },
          {
            title: "审核状态",
            key: "checkState",
            minWidth: 120,
            align:'center',
            // render: (h, params) => {
            //   return h(
            //     "div",
            //     params.row.checkState == 0 ? '未审核' : params.row.checkState == 1 ?  '审核不通过' : params.row.checkState == 2 ? '审核通过' : params.row.checkState == 3 ? '审核中' : ''
            //   );
            // },
            render: (h, params) => {
              if (params.row.checkState == 2) {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  '审核通过'
                );
              } else if (params.row.checkState == 0) {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  '未审核'
                );
              } else if (params.row.checkState == 1) {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  '审核不通过'
                );
              } else if (params.row.checkState == 3) {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  '审核中'
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkState
                );
              }
            },
          },
          {
            title: "审核人",
            key: "checkByEmpname",
            minWidth: 130,
            align:'center',
          },
          {
            title: "审核日期",
            key: "checkDate",
            minWidth: 170,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate ? this.$moment(params.row.checkDate).format("YYYY-MM-DD HH:mm:ss") : ''
              );
            },
          },
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 200,
            tooltip:true
          },
          {
            title: "操作",
            key: "",
            minWidth: 320,
            align:'center',
            fixed:'right',
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
                        const { toHospitalPhone } = params.row;
                        const data = {
                          phone:toHospitalPhone
                        }
                            orderManage.getCustomerServiceNameByPhone(data).then((res) => {
                              if(res.code===0){
                                const {CustomerServiceNameByPhone} = res.data
                                if(CustomerServiceNameByPhone  == '未绑定'){
                                  this.$Message.warning('暂未绑定助理')
                                  return
                                }else{
                                  this.$Message.success('绑定助理：' + CustomerServiceNameByPhone)
                                }
                                
                              }
                            })
                      },
                    },
                  },
                  "查询助理"
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
                            const { id } = params.row;
                            this.editAssistantModal = true
                            this.editAssistantParams.id = id
                      },
                    },
                  },
                  "编辑助理"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.checkState == 2
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                            this.form.id = id;
                            this.controlModal = true;
                      },
                    },
                  },
                  "审核"
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
                            this.checkImgParams =  params.row;
                            this.checkImgControlModal = true;
                      },
                    },
                  },
                  "查看图片"
                ),
              ]);
            },
          },
        ],
        validList:[{
            type:'true',
            name:'有效'
        },{
            type:'false',
            name:'无效'
        }],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 审核状态
        checkState: null,
        // 审核备注
        checkRemark: "",
        id:""
      },

      ruleValidate: {
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
      },
      checkStateListAll: [{ id: -1, name: "全部审核状态" }],
      checkStateList:[
        {
          id:2,
          name:'审核通过'
        },
        {
          id:1,
          name:'审核不通过'
        },
        
      ],
      // 查看图片
      checkImgControlModal:false,
      checkImgParams:{},
      // 添加凭证
      addTransactionVoucherModal:false,
      addTransactionVoucherParams:{
        // 基础主播
        liveAnchorBaseInfos:[],
        // 助理
        employeeList:[]
      },

      
      // 编辑助理model
      editAssistantModal:false,
      editAssistantParams:{
        // 客服
        employeeList:[],
        id:''
      }
    };
  },
  methods: {
    // 主播基础数据列表
    getLiveAnchorBaseInfoValids(){
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const {liveAnchorBaseInfos} = res.data
          this.addTransactionVoucherParams.liveAnchorBaseInfos = liveAnchorBaseInfos
        }
      });
    },
    // 获取客服列表
    getCustomerServiceList() {
      orderManage.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const {employee} = res.data
          this.editAssistantParams.employeeList = employee
          this.addTransactionVoucherParams.employeeList = employee
        }
      });
    },
    // 获取审核情况（下拉框）
    getCheckStateList() {
      orderApi.getCheckStateList().then((res) => {
        if (res.code === 0) {
          const { checkStateList } = res.data;
          this.checkStateListAll = [
            ...this.checkStateListAll,
            ...checkStateList,
          ];
        }
      });
    },
    // 获取客户消费凭证信息列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,checkState,valid} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keyword,
        checkState:checkState == -1 ? null : checkState,
        valid
      };
      api.getCustomerConsumptionCredentials(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerConsumptionCredentialsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取客户消费凭证信息列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,checkState,valid} = this.query;
        const data = { 
          pageNum, 
          pageSize ,
          keyword ,
          checkState:checkState == -1 ? null : checkState,
          valid
        };
        api.getCustomerConsumptionCredentials(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.customerConsumptionCredentialsInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
            api.customerConsumptionCredentials(this.form).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              }
            });
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getHospitalInfo();
    this.getCheckStateList();
    this.getCustomerServiceList()
    this.getLiveAnchorBaseInfoValids()
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>