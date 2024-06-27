<template>
  <div class="content">
    <Modal
      v-model="control"
      title="批量审核"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="60%"
    >
      <div class="model_title">  -（财务稽查数据）</div>
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="110"
      >
          <Row :gutter="30">
            <Col span="7">
              <FormItem label="审核状态" prop="checkState">
                <Select v-model="form.checkState" placeholder="请选择审核状态">
                  <Option
                    v-for="item in checkStateList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="财务稽查人员" prop="checkBelongEmpId">
                <Select
                  v-model="form.checkBelongEmpId"
                  placeholder="请选择财务稽查人员"
                  filterable
                >
                  <Option
                    v-for="item in employeeList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="审核备注" prop="checkRemark">
                <Input
                  v-model="form.checkRemark"
                  type="textarea"
                  :rows="2"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/reconciliationDocumentsSettle";
import * as employeeManageApi from "@/api/employeeManage";
import {processEnv} from "@/http/baseUrl";

export default {
  components: {},
  props: {
    financialAuditModel: Boolean,
    params: Object,
    checkedParams: Object,
  },
  data() {
    return {
      processEnv,
      checkTitle: "审核客服业绩",
      isLoading: false,
      checkStateList: [
        {
          id: 2,
          name: "审核通过",
        },
        {
          id: 1,
          name: "审核不通过",
        },
      ],
      control: false,
      form: {
        // 审核状态
        checkState: null,
        // 财务稽查人员
        checkBelongEmpId: null,
        // 审核备注
        checkRemark: "",
       
      },
      ruleValidates: {
        
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkBelongEmpId: [
          {
            required: true,
            message: "请选择财务稽查人员",
          },
        ],
      },
      // 审核类型
      checkTypeList: [
        {
          type: 0,
          name: "其他",
        },
        {
          type: 1,
          name: "自播达人",
        },
        {
          type: 2,
          name: "供应链达人",
        },
        {
          type: 3,
          name: "天猫升单",
        },
      ],
      // 财务稽查人员
      employeeList:[]
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            checkState,
            checkBelongEmpId,
            checkRemark,
          } = this.form;
          const data = {
            idList: [...this.checkedParams.idList],
            checkState,
            financeId:checkBelongEmpId,
            checkRemark,
          };
          this.isLoading = true;
          api.batchCheckFinanceReconciliationDocumentsSettle(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
            } else {
              setTimeout(() => {
                this.isLoading = false;
              }, 3000);
            }
          });
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:financialAuditModel", false);
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
        this.$emit("getListWithPageByCustomerCompensation");
        this.$parent.checkedParams.idList.clear()

      }
    },
    // 根据职位id获取员工
    getEmployeeByPositionIdAdmin(){
      const data = {
        // （客服管理员)线上id 4 测试5
        positionId:processEnv.VUE_APP_BASE_URL == 'https://app.ameiyes.com' ? 13 : 26
        
      }
      employeeManageApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const {employee} =res.data
          this.employeeList = employee 
        }
      });
    },
  },
  watch: {
    financialAuditModel(value) {
      this.control = value;
      if(value == true){
        this.getEmployeeByPositionIdAdmin()
      }
    },
  },
};
</script>
<style scoped>
.bor {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px 10px 0px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.title {
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.content{
  position: relative;
}
.model_title{
  position: absolute;
  top: 13px;
  left: 86px;
  font-size: 15px;
  color: red;
  font-weight: bold;
}
</style>
