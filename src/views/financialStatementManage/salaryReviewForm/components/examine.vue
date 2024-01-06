<template>
  <div>
    <Modal
      v-model="control"
      title="审核"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="130"
      >
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
        <FormItem label="归属客服" prop="checkBelongEmpId">
          <Select
            v-model="form.checkBelongEmpId"
            placeholder="请选择归属客服"
            filterable
            @on-change="checkBelongEmpIdChange"
          >
            <Option
              v-for="item in params.employeeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否为稽查订单" prop="valid">
          <i-switch v-model="form.valid" @on-change="validChange(form.valid)" :disabled="!form.checkBelongEmpId || form.checkBelongEmpId == null"/>
        </FormItem>
        <FormItem label="业绩类型" prop="type" v-if="form.valid == false && form.checkBelongEmpId">
          <Input v-model="form.type" placeholder="请输入业绩类型" disabled ></Input>
        </FormItem>
        <FormItem label="审核客服业绩" prop="customerServiceSettlePrice" v-if="form.checkBelongEmpId">
          <Input v-model="form.customerServiceSettlePrice" placeholder="请输入审核客服业绩" type="number" number disabled></Input>
        </FormItem>
        <FormItem :label="proportionTitle" prop="performancePercent" v-if="form.checkBelongEmpId">
          <Input v-model="form.performancePercent" placeholder="请输入提成比例" type="number" number disabled ></Input>
        </FormItem>
        <FormItem :label="numTitle" prop="customerServicePerformance" v-if="form.checkBelongEmpId">
          <Input v-model="form.customerServicePerformance" placeholder="请输入提成金额" type="number" number></Input>
        </FormItem>
        <FormItem label="审核备注" prop="checkRemark">
          <Input v-model="form.checkRemark" type="textarea" :rows="3"></Input>
        </FormItem>
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

export default {
  components: {},
  props: {
    examineModel: Boolean,
    params: Object,
    checkedParams: Object,
  },
  data() {
    return {
      // title
      proportionTitle:'提成比例',
      numTitle:'提成金额',
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
        // 归属客服
        checkBelongEmpId: null,
        // 审核备注
        checkRemark: "",
        // 是否为稽查订单
        valid:false,
        // 提成点数
        performancePercent:0,
        // 提成金额
        customerServicePerformance:null,
        // 业绩类型
        type:'',
        // 订单金额
        customerServiceSettlePrice:0
      },
      ruleValidates: {
        type: [
          {
            required: true,
            message: "请选择业绩类型",
          },
        ],
        customerServiceSettlePrice: [
          {
            required: true,
            message: "请输入订单金额",
          },
        ],
        performancePercent: [
          {
            required: true,
            message: "请输入提成比例",
          },
        ],
        customerServicePerformance: [
          {
            required: true,
            message: "请输入提成金额",
          },
        ],
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkBelongEmpId: [
          {
            required: true,
            message: "请选择归属客服",
          },
        ],
      },
    };
  },
  methods: {
    // 切换Switch时title赋值
    validChange(value){
      // if(!this.form.checkBelongEmpId || this.form.checkBelongEmpId == null){
      //   this.$Message.warning('请先选择归属客服')
      //   return
      // }else{
        this.form.valid = value
        if(value == false){
          const {isOldCustomerText} = this.checkedParams
          if(isOldCustomerText == '新客业绩'){
            // title
            this.proportionTitle = '新客提成比例(%)'
            this.numTitle = '新客提成金额'
            // 防止Switch开关时 提成比例不改
            this.checkBelongEmpIdChange()
          }else if(isOldCustomerText == '老客业绩'){
            // title
            this.proportionTitle = '老客提成比例(%)'
            this.numTitle = '老客提成金额'
            this.checkBelongEmpIdChange()
          }
        }else{
          // title
          this.proportionTitle = '稽查提成比例(%)'
          this.numTitle = '稽查提成金额'
          this.checkBelongEmpIdChange()
        }
      // }
      
    },  
    //根据员工id查询提成比例
    checkBelongEmpIdChange(){
      // 弹窗
      if(this.examineModel == true){
        employeeManageApi.byIdGetAmiyaEmployee(this.form.checkBelongEmpId).then(res=>{
          if(res.code === 0){
            const {newCustomerCommission,oldCustomerCommission,inspectionCommission} = res.data.employeeInfo
            const {type,valid} = this.form
            if(valid == true){
              // 提成比例
              this.form.performancePercent = inspectionCommission
              // 计算提成金额
              let customerServiceSettlePrice = this.checkedParams.customerServiceSettlePrice == 0 ? 0 : this.checkedParams.customerServiceSettlePrice * (inspectionCommission / 100)
              this.form.customerServicePerformance =  Math.round( customerServiceSettlePrice * 100) / 100
              
              return
            }else{
              if(type == '新客业绩'){
                // 提成比例
                this.form.performancePercent = newCustomerCommission
                // 计算提成金额
                let customerServiceSettlePrice = this.checkedParams.customerServiceSettlePrice == 0 ? 0 : this.checkedParams.customerServiceSettlePrice * (newCustomerCommission / 100)
                this.form.customerServicePerformance =  Math.round( customerServiceSettlePrice * 100) / 100
                
                return
              }else if(type == '老客业绩'){
                // 提成比例
                this.form.performancePercent = oldCustomerCommission
                // 计算提成金额
                let customerServiceSettlePrice = this.checkedParams.customerServiceSettlePrice == 0 ? 0 : this.checkedParams.customerServiceSettlePrice * (oldCustomerCommission / 100)
                this.form.customerServicePerformance =  Math.round( customerServiceSettlePrice * 100) / 100
                
                return
              }
            }
            
          }
        })  
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            checkState,
            checkBelongEmpId,
            checkRemark,
            performancePercent,
            customerServicePerformance
          } = this.form;
          const data = {
            id: this.checkedParams.id,
            checkState,
            checkBelongEmpId,
            checkRemark,
            performancePercent,
            customerServicePerformance
          };
          this.isLoading = true;
          api.checkReconciliationDocumentsSettle(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$emit("getListWithPageByCustomerCompensation");
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
      this.$emit("update:examineModel", false);
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  watch: {
    examineModel(value) {
      this.control = value;
      const{isOldCustomerText,customerServiceSettlePrice} = this.checkedParams
      this.form.type = isOldCustomerText
      this.form.customerServiceSettlePrice = customerServiceSettlePrice
      if(isOldCustomerText == '新客业绩'){
          // title
          this.proportionTitle = '新客提成比例(%)'
          this.numTitle = '新客提成金额'
        }else if(isOldCustomerText == '老客业绩'){
          // title
          this.proportionTitle = '老客提成比例(%)'
          this.numTitle = '老客提成金额'
        }else if(isOldCustomerText == '稽查业绩'){
          // title
          this.proportionTitle = '稽查提成比例(%)'
          this.numTitle = '稽查提成金额'
        }

    },
    itemInfo(value) {
      if (value.price) {
        this.form.checkBuyAgainPrice = value.price;
      }
    },
  },
};
</script>
