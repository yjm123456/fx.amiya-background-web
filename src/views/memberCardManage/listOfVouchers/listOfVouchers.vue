<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          
          
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
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
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="抵用券名称" prop="name">
          <Input v-model="form.name" placeholder="请输入抵用券名称"></Input>
        </FormItem>
        <FormItem label="抵扣量" prop="deductMoney">
          <Input v-model="form.deductMoney" type="number" number placeholder="请输入抵扣量"></Input>
        </FormItem> 
        <FormItem label="是否用于指定商品" prop="isSpecifyProduct" >
          <i-switch v-model="form.isSpecifyProduct" />
        </FormItem>
        <FormItem label="是否可累加使用" prop="isAccumulate" >
          <i-switch v-model="form.isAccumulate" />
        </FormItem>
        <FormItem label="是否可分享" prop="isShare" >
          <i-switch v-model="form.isShare" />
        </FormItem>
        <FormItem label="抵用券类型" prop="type" >
          <Select
            v-model="form.type"
            placeholder="请选择抵用券类型"
          >
            <Option
              v-for="item in consumptionVoucherTypeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="抵用券编码" prop="consumptionVoucherCode">
          <Input v-model="form.consumptionVoucherCode" placeholder="请输入抵用券编码"></Input>
        </FormItem>
        <FormItem label="是否有效" prop="isValid" v-show="isEdit === true">
          <i-switch v-model="form.isValid" />
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
import * as api from "@/api/consumptionVoucher";
export default {
  data() {
    return {
      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "抵用券名称",
            key: "name",
          },
          {
            title: "抵用券类型",
            key: "typeText",
            width:150
          },
          {
            title: "抵扣量",
            key: "deductMoney",
            width:120
          },
          {
            title: "是否用于指定商品",
            key: "isSpecifyProduct",
            width:150,
            render: (h, params) => {
              if (params.row.isSpecifyProduct == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "是否可累加使用",
            width:140,
            key: "isAccumulate",
            render: (h, params) => {
              if (params.row.isAccumulate == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "是否可分享",
            key: "isShare",
            width:120,
            render: (h, params) => {
              if (params.row.isShare == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "是否有效",
            key: "isValid",
            width:120,
            render: (h, params) => {
              if (params.row.isValid == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
            },
          },
          {
            title: "抵用券编码",
            key: "consumptionVoucherCode",
          },
          {
            title: "操作",
            key: "",
            width: 150,
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
                        const { id} = params.row;
                        this.title = "修改";
                        api.byIdConsumptionVoucher(id ).then((res) => {
                          if (res.code === 0) {
                             const {
                             id ,name ,deductMoney,isSpecifyProduct,isAccumulate,isShare,type,isValid,consumptionVoucherCode
                            } = res.data.consumptionVoucherInfo;
                            console.log(type)
                            this.isEdit = true;
                            this.form.deductMoney = deductMoney;
                            this.form.name = name;
                            this.form.isSpecifyProduct = isSpecifyProduct;
                            this.form.isAccumulate = isAccumulate;
                            this.form.isShare = isShare;
                            this.form.type =String(type);
                            this.form.isValid = isValid;
                            this.form.consumptionVoucherCode = consumptionVoucherCode;
                            this.form.id = id;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteExpressManage(id).then((res) => {
                              if (res.code === 0) {
                                this.getHospitalInfo();
                                this.$Message.success({
                                  content: "删除成功",
                                  duration: 3,
                                });
                              }
                            });
                          },
                          onCancel: () => {},
                        });
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      // 抵用券类型
      consumptionVoucherTypeList:[],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id:"",
        // 抵用券名称
        name:'',
        // 抵扣量
        deductMoney:null,
        // 是否只能用于指定商品
        isSpecifyProduct:false,
        // 是否可累加使用
        isAccumulate:false,
        // 是否可分享
        isShare:false,
        // 抵用券类型
        type:null,
        // 是否只能用于指定商品
        isValid:false,
        // 抵用券编码
        consumptionVoucherCode:''
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入抵用券名称",
          },
        ],
        deductMoney: [
          {
            required: true,
            message: "请输入抵扣量",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择抵用券类型",
          },
        ],
        consumptionVoucherCode: [
          {
            required: true,
            message: "请输入抵用券编码",
          },
        ],
      },
    };
  },
  methods: {
    // 获取抵用券类型列表
    getConsumptionVoucherTypeList() {
      api.getConsumptionVoucherTypeList().then((res) => {
        if (res.code === 0) {
          this.consumptionVoucherTypeList = res.data.consumptionVoucherTypeList;
        }
      });
    },
    // 获取物流公司列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize} = this.query;
      const data = { pageNum, pageSize };
      api.getConsumptionVoucher(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.consumptionVoucherInfoList;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取物流公司列表分页
    handlePageChange(pageNum) {
        const {  pageSize} = this.query;
        const data = { pageNum, pageSize  };
        api.getConsumptionVoucher(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.consumptionVoucherInfoList;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const { id,deductMoney, isSpecifyProduct,isAccumulate ,isShare,type,isValid,consumptionVoucherCode} = this.form;
            const  data = { id,name :this.form.name,deductMoney,isSpecifyProduct,isAccumulate ,isShare,type:Number(type),isValid,consumptionVoucherCode} 
            // 修改
            api.EditConsumptionVoucher(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { name, deductMoney, isSpecifyProduct,isAccumulate ,isShare,type,isValid,consumptionVoucherCode} = this.form;
            const  data = { name ,deductMoney,isSpecifyProduct,isAccumulate ,isShare,type:Number(type),isValid,consumptionVoucherCode} 
            // 添加
            api.AddConsumptionVoucher(data).then((res) => {
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
    this.getConsumptionVoucherTypeList()
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