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
          v-model="query.keyword"
          placeholder="请输入姓名/订单号/手机号"
          style="width: 220px; margin-left: 10px"
          @keyup.enter.native="getbindCustomerServieOrderList()"
        />
        <Select
          v-model="query.customerServiceId"
          placeholder="请选择客服"
          style="width: 200px; margin-left: 10px"
          filterable
        >
          <Option
            v-for="item in query.employee"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <Select
          v-model="query.contentPlatFormId"
          placeholder="请选择主播平台"
          @on-change="contentPlateChange(query.contentPlatFormId)"
          style="width: 200px; margin-left: 10px"
          filterable
        >
          <Option
            v-for="item in contentPalteForms"
            :value="item.id"
            :key="item.id"
            >{{ item.contentPlatformName }}</Option
          >
        </Select>
        <Select
          v-model="query.liveAnchorId"
          placeholder="请选择主播IP账号"
          style="width: 200px; margin-left: 10px"
          :disabled="query.contentPlatFormId === null"
          filterable
        >
          <Option
            v-for="item in liveAnchors"
            :value="item.id"
            :key="item.id"
            >{{ item.hostAccountName }}</Option
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
          <Select v-model="form.customerServiceId" placeholder="请选择客服">
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
import * as contentPlatForm from "@/api/baseDataMaintenance";
export default {
  props: ["activeName"],
  data() {
    return {
      query: {
        startDate:this.$moment().format("YYYY-MM-DD"),
        endDate:this.$moment().format("YYYY-MM-DD"),
        contentPlatFormId: null,
        liveAnchorId: null,
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
            title: "录单时间",
            key: "createDate",
            minWidth: 180,
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
            title: "订单号",
            key: "id",
            minWidth: 200,
          },
          {
            title: "绑定客服",
            key: "customerServiceName",
            minWidth: 120,
          },
          {
            title: "项目",
            key: "thumbPictureUrl",
            minWidth: 220,
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
                      src: params.row.thumbPictureUrl,
                    },
                  }),
                  h("div", params.row.goodsName),
                ]
              );
            },
          },
          {
            title: "下单平台",
            key: "contentPlatformName",
            minWidth: 120,
          },
          {
            title: "IP账号",
            key: "liveAnchorName",
            minWidth: 120,
          },
          {
            title: "姓名",
            key: "customerName",
            minWidth: 150,
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 140,
          },
          {
            title: "预约门店",
            key: "appointmentHospitalName",
            minWidth: 220,
          },
          
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
          },
        ],
        data: [],
      },

      // 控制 modal
      controlModal: false,

      employee: [],
      //   下单平台
      contentPalteForms: [],
      // ip账号
      liveAnchors: [],
      form: {
        encryptPhoneList: new Set(),
        customerServiceId: "",
      },
    };
  },
  methods: {
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
        }
      });
    },
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
    },

    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      api.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
    // 获取平台下单列表
    // getOrderPlatform(){
    //   api.getOrderPlatform().then((res) => {
    //     if(res.code === 0){
    //       const {orderAppTypes} = res.data
    //       this.query.orderAppTypes = [...this.query.orderAppTypes,...orderAppTypes]
    //     }
        
    //   })
    // },
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
        liveAnchorId,
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
        keyword,
        customerServiceId:
          customerServiceId === "all" ? null : customerServiceId,
        pageNum,
        pageSize,
        liveAnchorId,
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null
      };
      api.getbindCustomerServieOrders(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.orders;
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
      const { keyword, customerServiceId, pageSize,liveAnchorId } = this.query;
      const data = {
        keyword,
        customerServiceId:
          customerServiceId === "all" ? null : customerServiceId,
        pageNum,
        pageSize,
        liveAnchorId
      };
      api.getbindCustomerServieOrders(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.orders;
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
          api.ContentPlatFormOrderListBindCustomerService(data).then((res) => {
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
        if (value === "customerServiceContentPlatformBound") {
          this.getbindCustomerServieOrderList();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.getCustomerServiceList();
    // this.getOrderPlatform()
    this.getContentValidList()
  },
};
</script>
<style lang="less" scoped>
.pages {
  margin-top: 16px;
  text-align: right;
}
</style>
