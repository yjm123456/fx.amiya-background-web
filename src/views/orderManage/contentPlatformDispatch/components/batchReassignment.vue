<template>
  <div>
    <Modal
      v-model="batchReassignmentModel"
      title="批量改派"
      :mask-closable="false"
      :closable="false"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="医院" prop="hospitalId" key="医院">
          <Select
            v-model="form.hospitalId"
            placeholder="请选择医院"
            filterable
            @on-change="
              isSpecifyHospitalEmployeeChange(
                form.isSpecifyHospitalEmployee,
                form.hospitalId
              )
            "
          >
            <Option
              v-for="item in batchReassignmentParams.hospitalList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否指定医生账号" key="是否指定医生账号">
          <i-switch
            v-model="form.isSpecifyHospitalEmployee"
            @on-change="
              isSpecifyHospitalEmployeeChange(
                form.isSpecifyHospitalEmployee,
                form.hospitalId
              )
            "
          />
        </FormItem>
        <FormItem
          label="医生账号"
          prop="hospitalEmployeeId"
          key="医生账号"
          v-if="form.isSpecifyHospitalEmployee == true"
        >
          <Select
            v-model="form.hospitalEmployeeId"
            placeholder="请选择医生账号"
            filterable
          >
            <Option
              v-for="item in hospitalIdList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>

        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as hospitalManage from "@/api/hospitalManage";
import * as api from "@/api/orderManage";

export default {
  props: {
    batchReassignmentModel: Boolean,
    batchReassignmentParams: Object,
  },
  data() {
    return {
      isLoading: false,
      form: {
        hospitalId: null,
        // 是否指定医生账号
        isSpecifyHospitalEmployee: false,
        // 医生账号
        hospitalEmployeeId: null,
      },
      ruleValidate: {
        hospitalId: [
          {
            type: "number",
            required: true,
            message: "请选择医院",
            trigger: "change",
          },
        ],
      },
      //   医生指定账户
      hospitalIdList: [],
    };
  },
  methods: {
    // 特定账户Switch isSpecifyHospitalEmployee
    isSpecifyHospitalEmployeeChange(value, value2) {
      if (value == true) {
        this.getByHospitalIdList(value2);
      } else {
        this.form.hospitalEmployeeId = null;
        this.form.isSpecifyHospitalEmployee == false;
      }
    },
    // 根据医院查询医院账户
    getByHospitalIdList(value) {
      const data = {
        hospitalId: value,
      };
      hospitalManage.getByHospitalIdList(data).then((res) => {
        if (res.code == 0) {
          const { employee } = res.data;
          this.hospitalIdList = !employee || employee == [] ? [] : employee;
        }
      });
    },
    // 取消
    cancel(name) {
      // console.log(this.batchReassignmentParams.pageNum)
      this.$parent.handlePageChange(
        this.$parent.batchReassignmentParams.pageNum
      );
      this.$emit("update:batchReassignmentModel", false);
      this.hospitalIdList = [];
      this.form.isSpecifyHospitalEmployee = false;
      this.form.hospitalId = null;
      this.form.hospitalEmployeeId = null;
      this.$parent.batchReassignmentParams.sendInfoIdList.clear();
    },
    // 提交
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            hospitalId,
            hospitalEmployeeId,
            isSpecifyHospitalEmployee,
          } = this.form;
          const data = {
            hospitalId,
            sendInfoIdList: [...this.batchReassignmentParams.sendInfoIdList],
            hospitalEmployeeId:
              isSpecifyHospitalEmployee == true ? hospitalEmployeeId : 0,
            isSpecifyHospitalEmployee,
          };
          if (isSpecifyHospitalEmployee == true && hospitalEmployeeId < 1) {
            this.$Message.warning("请选择医生账户");
            return;
          }
          this.isLoading = true;
          api.batchEditSendInfo(data).then((res) => {
            if (res.code == 0) {
              this.isLoading = false;
              this.$Message.success("改派成功！");
              this.cancel();
            } else {
              setTimeout(() => {
                this.isLoading = false;
              }, 3000);
            }
          });
        }
      });
    },
  },
};
</script>
