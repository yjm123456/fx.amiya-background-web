<template>
  <div>
    <Card>
      <div>
        <Select
          v-model="query.customerServiceId"
          placeholder="请选择客服"
          style="width: 200px"
          filterable
        >
          <Option
            v-for="item in query.employee"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <Input
          v-model="query.keyword"
          placeholder="项目名称"
          style="width: 200px; margin-left: 10px"
          @keyup.enter.native="getbindCustomerServieOrderList()"
        />
        <Select
          v-model="query.appType"
          style="width: 200px; margin-left: 10px"
          placeholder="请选择下单平台"
          filterable
        >
          <Option
            v-for="item in query.orderAppTypes"
            :value="item.orderType"
            :key="item.orderType"
            >{{ item.appTypeText }}</Option
          >
        </Select>
        <Button
          type="primary"
          @click="getbindCustomerServieOrderList()"
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
        keyword: "",
        employee: [{ name: "全部", id: "all" }],
        customerServiceId: null,
        appTypeList: [
          {
            name: "全部平台",
            value: -1,
          },
          {
            name: "天猫平台",
            value: 0,
          },
          {
            name: "京东平台",
            value: 1,
          },
        ],
        orderAppTypes:[{orderType: -1, appTypeText: "全部平台"}],
        appType: -1,
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            type: "selection",
            key: "_checked",
            align: "center",
            minWidth: 100,
          },
          {
            title: "订单编号",
            key: "id",
            minWidth: 200,
          },
          {
            title: "下单平台",
            key: "appTypeText",
            minWidth: 200,
          },
          // {
          //   title: "商品编号",
          //   key: "goodsId",
          //   minWidth: 200,
          // },
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 400,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                  style: {
                    display: "flex",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 15px 5px 0",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },
          {
            title: "实付款",
            key: "actualPayment",
            minWidth: 200,
          },
          {
            title: "状态",
            key: "statusText",
            minWidth: 200,
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 200,
          },
          {
            title: "预约门店",
            key: "appointmentHospital",
            minWidth: 200,
          },
          {
            title: "绑定客服",
            key: "customerServiceName",
            minWidth: 200,
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
    // 获取平台下单列表
    getOrderPlatform(){
      api.getOrderPlatform().then((res) => {
        if(res.code === 0){
          const {orderAppTypes} = res.data
          this.query.orderAppTypes = [...this.query.orderAppTypes,...orderAppTypes]
        }
        
      })
    },
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.query.employee = [...this.query.employee, ...employee];
          this.employee = employee;
        }
      });
    },

    // 获取已绑定了客服的订单列表
    getbindCustomerServieOrderList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        keyword,
        customerServiceId,
        pageNum,
        pageSize,
        appType,
      } = this.query;
      const data = {
        keyword,
        customerServiceId:
          customerServiceId === "all" ? null : customerServiceId,
        pageNum,
        pageSize,
        appType: appType === -1 ? "" : appType,
      };
      api.bindCustomerServieOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
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
      const { keyword, customerServiceId, pageSize, appType } = this.query;
      const data = {
        keyword,
        customerServiceId:
          customerServiceId === "all" ? null : customerServiceId,
        pageNum,
        pageSize,
        appType: appType === -1 ? "" : appType,
      };
      api.bindCustomerServieOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
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
          api.OrderListBindCustomerService(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("form");
              this.getbindCustomerServieOrderList();
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
        if (value === "boundCustomerServiceOrder") {
          this.getbindCustomerServieOrderList();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.getCustomerServiceList();
    this.getOrderPlatform()
  },
};
</script>
<style lang="less" scoped>
.pages {
  margin-top: 16px;
  text-align: right;
}
</style>
