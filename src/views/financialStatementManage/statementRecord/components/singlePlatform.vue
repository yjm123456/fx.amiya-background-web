<template>
  <div>
    <Card :dis-hover="true">
      <DatePicker
        type="year"
        placeholder="请选择年"
        style="width: 200px"
        v-model="query.year"
      ></DatePicker>
      <Select
        v-model="query.month"
        style="width: 180px; margin-left: 10px"
        placeholder="请选择生日月份"
        filterable
      >
        <Option v-for="item in monthList" :value="item.month" :key="item.month"
          >{{ item.name }}
        </Option>
      </Select>
      <Select
        v-model="query.hospitalId"
        style="width: 210px; margin-left: 10px"
        placeholder="医院"
        filterable
      >
        <Option
          v-for="item in hospitalList"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Select
        v-model="query.reconciliation"
        style="width: 210px; margin-left: 10px"
        placeholder="最终对账情况"
        filterable
      >
        <Option
          v-for="item in reconciliationList"
          :value="item.id"
          :key="item.id"
          >{{ item.name }}</Option
        >
      </Select>
      <Button type="primary" @click="getOrderChange" style="margin-left: 10px"
        >查询</Button
      >
    </Card>

    <Card class="container">
        <Table border :columns="query.columns" :data="query.data"></Table>
    </Card>
    <!-- 
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
        :label-width="120"
      >
        <FormItem label="分类名称" prop="name">
          <Input v-model="form.name" placeholder="请输入分类名称"></Input>
        </FormItem>
        <FormItem label="商品展示方向" prop="showDirectionType">
          <Select
            v-model="form.showDirectionType"
            placeholder="请选择商品展示方向"
          >
            <Option
              v-for="item in exchangeTypes"
              :value="item.showDirectionType"
              :key="item.showDirectionType"
              >{{ item.showDirectionTypeText }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="简码" prop="simpleCode">
          <Input v-model="form.simpleCode" placeholder="请输入简码"></Input>
        </FormItem>
        <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal> -->
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
export default {
  // props: ["activeName"],
  props:{
    hospitalList:Array,
    activeName:String
  },
  data() {
    return {
      reconciliationList:[{
        id:1,
        name:'对平'
      },{
        id:2,
        name:'订单存在差异'
      }],
      query: {
        hospitalId: -1,
        
        year: this.$moment(new Date()).format("yyyy"),
        month: Number(this.$moment(new Date()).format("MM")),
        keyword: "",
        categoryId: "",
        valid: null,
        pageNum: 1,
        pageSize: 10,
        showDirection: 1,
        columns: [
          {
            title: "医院名称",
            key: "nickName",
            minWidth: 160,
          },
          {
            title: "年份",
            key: "encryptPhone",
            minWidth: 140,
          },
          {
            title: "月份",
            key: "id",
            minWidth: 200,
          },
          {
            title: "最终对账情况",
            key: "appTypeText",
            minWidth: 100,
          },
          {
            title: "应收总额",
            key: "goodsName",
            minWidth: 300,
          },
          {
            title: "价差总额",
            tooltip: true,
            minWidth: 180,
            key: "createDate",
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
            title: "更新时间",
            tooltip: true,
            minWidth: 180,
            key: "writeOffDate",
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.writeOffDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
         
        ],
        data: [],
        totalCount: 0,
      },
      monthList: [
        {
          month: 1,
          name: "一月",
        },
        {
          month: 2,
          name: "二月",
        },
        {
          month: 3,
          name: "三月",
        },
        {
          month: 4,
          name: "四月",
        },
        {
          month: 5,
          name: "五月",
        },
        {
          month: 6,
          name: "六月",
        },
        {
          month: 7,
          name: "七月",
        },
        {
          month: 8,
          name: "八月",
        },
        {
          month: 9,
          name: "九月",
        },
        {
          month: 10,
          name: "十月",
        },
        {
          month: 11,
          name: "十一月",
        },
        {
          month: 12,
          name: "十二月",
        },
      ],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 姓名
        name: "",
        // 简码
        simpleCode: "",
        // 展示方向
        showDirectionType: "",
        id: "",
        // 是否有效
        valid: false,
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入分类名称",
          },
        ],
        simpleCode: [
          {
            required: true,
            message: "请输入简码",
          },
        ],
        showDirectionType: [
          {
            required: true,
            message: "请选择商品展示方向",
          },
        ],
      },
    };
  },
  methods: {
  
    getOrderChange() {
      this.$Message.error("暂未查到数据");
    },
    
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { name, simpleCode, id, valid, showDirectionType } = this.form;
          if (this.isEdit) {
            // 修改
            const data = {
              id,
              name,
              simpleCode,
              valid,
              showDirectionType,
            };
            api.modifyGoodsCategory(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getGoodsCategoryList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            // 添加
            const data = {
              name,
              simpleCode,
              showDirectionType,
            };
            api.addGoodsCategory(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getGoodsCategoryList();
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
 
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "singlePlatform") {
          //   this.getHospitalSendOrderList();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}

</style>
