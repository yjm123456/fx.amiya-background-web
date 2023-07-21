<template>
  <div>
    <Modal
      v-model="control"
      title="出库"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="领用部门" prop="departmentId">
          <Select
            v-model="form.departmentId"
            placeholder="请选择领用部门"
            filterable
            @on-change="departmentChange(form.departmentId)"
          >
            <Option
              v-for="item in outWarehouseObj.department"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="职位" prop="position">
          <Select
            v-model="form.position"
            placeholder="请选择职位"
            filterable
            @on-change="positionChange(form.position)"
          >
            <Option
              v-for="item in positionInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="领用人" prop="employeeId">
          <Select
            v-model="form.employeeId"
            placeholder="请选择领用人"
            filterable
          >
            <Option v-for="item in employee" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="单价"
          prop="singlePrice"
          :rules="[
            {
              required: true,
              message: '请输入数量(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 0,
            },
          ]"
        >
          <Input
            v-model="form.singlePrice"
            placeholder="请输入单价"
            type="number"
            number
            disabled
          ></Input>
        </FormItem>
        <FormItem
          label="数量"
          prop="amount"
          :rules="[
            {
              required: true,
              message: '请输入数量(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 0,
            },
          ]"
        >
          <Input
            v-model="form.amount"
            placeholder="请输入数量"
            number
            type="number"
            @on-change="amountChange"
          ></Input>
        </FormItem>
        <FormItem label="总价" prop="totalPrice">
          <Input
            v-model="form.totalPrice"
            placeholder="请输入总价"
            type="number"
            number
            disabled
          ></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="form.remark" type="textarea" :rows="3"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/AmiyaWareHouseNameManage";
import * as apis from "@/api/liveRequirementManage";
import * as empApi from "@/api/employeeManage";
export default {
  props: {
    outWarehouseModel: Boolean,
    outWarehouseObj: Object,
  },
  data() {
    return {
      control: false,
      form: {
        id: null,
        // 单价
        singlePrice: null,
        // 数量
        amount: null,
        // 总价
        totalPrice: null,
        // 备注
        remark: "",
        // 部门
        departmentId: null,
        // 职位
        position: null,
        // 领用人
        employeeId: null,
      },
      ruleValidates: {
        singlePrice: [
          {
            required: true,
            message: "请输入单价",
          },
        ],
        amount: [
          {
            required: true,
            message: "请输入数量",
          },
        ],
        totalPrice: [
          {
            required: true,
            message: "请输入总价",
          },
        ],
        departmentId: [
          {
            required: true,
            message: "请选择领用部门",
          },
        ],
        position: [
          {
            required: true,
            message: "请选择职位",
          },
        ],
        employeeId: [
          {
            required: true,
            message: "请选择领用人",
          },
        ],
      },
      // 职位
      positionInfo: [],
      // 领用人
      employee: [],
    };
  },
  methods: {
    // 根据部门去获取职位
    departmentChange(value) {
      if (value) {
        apis.byDepartmentId(value).then((res) => {
          if (res.code === 0) {
            this.positionInfo = res.data.positionInfo;
          }
        });
      }
    },
    // 根据职位id去获取领用人
    positionChange(value) {
      const data = {
        positionId: value,
      };
      if (value) {
        empApi.getEmployeeByPositionId(data).then((res) => {
          if (res.code === 0) {
            this.employee = res.data.employee;
          }
        });
      }
    },

    amountChange() {
      const { singlePrice, amount } = this.form;
      this.form.totalPrice = Number((singlePrice * amount).toFixed(2));
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            singlePrice,
            amount,
            totalPrice,
            remark,
            departmentId,
            employeeId,
          } = this.form;
          const data = {
            id: this.outWarehouseObj.outid,
            singlePrice: this.outWarehouseObj.singlePrice,
            totalPrice,
            amount,
            remark,
            departmentId,
            employeeId,
          };
          api.OutWareHouse(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$emit("handleRefreshCustomerList");
              this.form.remark = "";
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    handleCancel(name) {
      this.$refs[name].resetFields();

      this.$emit("update:outWarehouseModel", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$refs["form"].resetFields();
        this.$emit("update:outWarehouseModel", false);
      }
    },
  },
  watch: {
    outWarehouseModel(value) {
      this.control = value;
    },
    outWarehouseObj(value) {
      this.form.singlePrice = value.singlePrice;
    },
  },
};
</script>
