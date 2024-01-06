<template>
  <div>
    <Card>
      <div>
        <DatePicker
          type="date"
          placeholder="下单开始日期"
          style="width: 180px;"
          :value="query.startDate"
          v-model="query.startDate"
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="下单结束日期"
          style="width: 180px; margin-left: .625rem"
          :value="query.endDate"
          v-model="query.endDate"
        ></DatePicker>
        <Input
          v-model="query.keyWord"
          placeholder="请输入手机号进行查询"
          style="width: 220px; margin-left: 10px"
          @keyup.enter.native="getgetPublicPoolPhone()"
        />
        <Button
          type="primary"
          @click="getgetPublicPoolPhone()"
          style="margin-left: 10px"
          >查询</Button
        >
        <Button
          type="primary"
          @click="handleModifyBindCustomerService()"
          style="margin-left: 10px"
          >修改绑定客服</Button
        >
      </div>
    </Card>

    <Card style="margin-top: 10px">
      <div>
        <Table
          border
          :columns="query.columns"
          :data="query.data"
          @on-select="handleSelect"
          @on-select-cancel="handleCancel"
          @on-select-all="handleSelectAll"
          @on-select-all-cancel="handleSelectAll"
        ></Table>
      </div>
      <div class="pages">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handleProjectPageChange"
        />
      </div>
    </Card>

    <Modal v-model="controlModal" title="修改绑定客服" :mask-closable="false">
      <Form ref="form" :model="form" label-position="left" :label-width="60">
        <FormItem label="客服" prop="hospitalId">
          <Select v-model="form.customerServiceId" placeholder="请选择客服" filterable>
            <Option v-for="item in employee" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
export default {
  props: ["activeName"],
  data() {
    return {
      query: {
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate:this.$moment().format("YYYY-MM-DD"),
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 70,
          },
          {
            title: "建档时间",
            key: "createDate",
            minWidth: 240,
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
            title: "绑定客服",
            key: "customerServiceName",
            minWidth: 200,
            align:'center',
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 200,
            align:'center',
          },
          {
            title: "首次项目需求",
            key: "firstProjectDemand",
            minWidth: 600,
          },
          {
            title: "最新消费平台",
            key: "newContentPlatForm",
            minWidth: 200,
            align:'center',
          },
        ],
        data: [],
      },

      // 控制 modal
      controlModal: false,

      employee: [],
      form: {
        encryptPhoneList: new Set(),
        customerServiceId: "",
      },
    };
  },
  methods: {
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = employee;
        }
      });
    },

    // 获取已绑定了客服的订单列表
    getgetPublicPoolPhone() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        keyWord,
        pageNum,
        pageSize,
        startDate,
        endDate
      } = this.query;
      if(!startDate){
        this.$Message.error('请选择开始时间')
        return
      }
      if(!endDate){
        this.$Message.error('请选择结束时间')
        return
      }
      const data = {
        keyWord,
        pageNum,
        pageSize,
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null
      };
      api.getPublicPoolPhone(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.getPublicPoolPhone;
          this.query.data = list.map((item) => {
            return {
              ...item,
              _checked: false,
            };
          });
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取已绑定了客服的订单列表 分页
    handleProjectPageChange(pageNum) {
      const { keyWord, pageSize, startDate,endDate} = this.query;
      const data = {
        keyWord,
        pageNum,
        pageSize,
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null
      };
      api.getPublicPoolPhone(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.getPublicPoolPhone;
          this.query.data = list.map((item) => {
            return {
              ...item,
              _checked: false,
            };
          });
          this.query.totalCount = totalCount;
          // 切换分页回显选中
          for (let index in this.query.data) {
            if (this.form.encryptPhoneList.has(this.query.data[index].encryptPhone)) {
              this.query.data[index]._checked = true
            }
          }
        }
      });
    },

    handleSelect(selection, row) {
      this.form.encryptPhoneList.add(row.encryptPhone);
    },

    handleCancel(selection, row) {
      this.form.encryptPhoneList.delete(row.encryptPhone);
    },

    handleSelectAll(selection) {
      if (selection && selection.length === 0) {
        const data = this.$refs.selection.data;
        data.forEach((item) => {
          if (this.form.encryptPhoneList.has(item.encryptPhone)) {
            this.form.encryptPhoneList.delete(item.encryptPhone);
          }
        });
      } else {
        selection.forEach((item) => {
          this.form.encryptPhoneList.add(item.encryptPhone);
        });
      }
    },

    // 修改绑定客服
    handleModifyBindCustomerService() {
      if (![...this.form.encryptPhoneList].length) {
        this.$Message.warning({
          content: "请选择订单",
          duration: 3,
        });
        return;
      }
      this.controlModal = true;
    },

    // 修改
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { encryptPhoneList, customerServiceId } = this.form;
          const data = {
            encryptPhoneList: [...encryptPhoneList],
            customerServiceId,
          };
          api.updatePublicPoolPhone(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("form");
              this.getgetPublicPoolPhone();
              this.$Message.success({
                content: "修改成功",
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
      this.form.encryptPhoneList.clear();
      this.$refs[name].resetFields();
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "customerPool") {
          this.getgetPublicPoolPhone();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.getCustomerServiceList();
  },
};
</script>
<style lang="less" scoped>
.pages {
  margin-top: 16px;
  text-align: right;
}
</style>
