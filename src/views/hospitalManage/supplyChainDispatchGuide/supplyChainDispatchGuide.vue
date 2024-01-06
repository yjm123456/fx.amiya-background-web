<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.hospitalName"
            placeholder="请输入医院名称"
            style="width: 200px"
            @keyup.enter.native="getAmiyaTotalSendHospitalInstructions()"
          />
          <Select
            v-model="query.cityId"
            placeholder="请选择城市"
            filterable
            style="width: 200px;margin-left:10px"
          >
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAmiyaTotalSendHospitalInstructions()"
            >查询</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <!-- columns2 没有 年服务费金额和保证金金额 不是管理员、研发、财务角色看不了年服务费金额和保证金金额 -->
        <Table
          border
          :columns="
            positionId == 1 || positionId == 16 || positionId == 13
              ? query.columns
              : query.columns2
          "
          :data="query.data"
          :span-method="handleSpan"
          :row-class-name="rowClassName"
          height="680"
        ></Table>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";

export default {
  components: {},
  data() {
    return {
      // 查询
      query: {
        cityId: -1,
        hospitalName: "",
        columns: [
          {
            title: "省份",
            key: "province",
            minWidth: 110,
            align: "center",
            className: 'demo-table-info-column'
          },
          {
            title: "城市",
            key: "city",
            minWidth: 100,
            align: "center",
          },
          {
            title: "派单顺序",
            key: "sendOrderText",
            minWidth: 140,
            align: "center",
            tooltip: true,
          },
          {
            title: "医院",
            key: "name",
            minWidth: 300,
            tooltip: true,
          },
          {
            title: "新诊佣金比例(%)",
            key: "newCustomerCommissionRatio",
            minWidth: 100,
            align: "center",
          },
          {
            title: "复诊佣金比例(%)",
            key: "oldCustomerCommissionRatio",
            minWidth: 100,
            align: "center",
          },
          {
            title: "重单规则",
            key: "repeatOrderRule",
            minWidth: 150,
            align: "center",
            tooltip: true,
          },
          {
            title: "年服务费缴纳状态",
            key: "yearServiceFeeText",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.yearServiceFeeText == "已缴纳") {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.yearServiceFeeText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.yearServiceFeeText
                );
              }
            },
          },
          {
            title: "保证金缴纳状态",
            key: "securityDepositText",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.securityDepositText == "已缴纳") {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.securityDepositText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.securityDepositText
                );
              }
            },
          },
          {
            title: "年服务费金额",
            key: "yearServiceMoney",
            minWidth: 90,
            align: "center",
          },
          {
            title: "保证金金额",
            key: "securityDepositMoney",
            minWidth: 80,
            align: "center",
          },
          {
            title: "可用时间",
            key: "dueTime",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h("span", {
                domProps: {
                  innerHTML: params.row.hasUsedTime,
                },
              });
            },
          },
          {
            title: "到期日期",
            key: "dueTime",
            align: "center",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                params.row.dueTime
                  ? this.$moment(params.row.dueTime).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
        ],
        // columns2 没有 年服务费金额和保证金金额 不是管理员、研发、财务角色看不了 年服务费金额和保证金金额
        columns2: [
          {
            title: "省份",
            key: "province",
            minWidth: 100,
            align: "center",
            className: 'demo-table-info-column'
          },
          {
            title: "城市",
            key: "city",
            minWidth: 100,
            align: "center",
          },
          {
            title: "派单顺序",
            key: "sendOrderText",
            minWidth: 160,
            align: "center",
          },
          {
            title: "医院",
            key: "name",
            minWidth: 220,
            align: "center",
            tooltip: true,
          },
          {
            title: "新诊佣金比例(%)",
            key: "newCustomerCommissionRatio",
            minWidth: 150,
            align: "center",
          },
          {
            title: "复诊佣金比例(%)",
            key: "oldCustomerCommissionRatio",
            minWidth: 150,
            align: "center",
          },
          {
            title: "重单规则",
            key: "repeatOrderRule",
            minWidth: 120,
            align: "center",
          },
          {
            title: "年服务费缴纳状态",
            key: "yearServiceFeeText",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              if (params.row.yearServiceFeeText == "已缴纳") {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.yearServiceFeeText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.yearServiceFeeText
                );
              }
            },
          },
          {
            title: "保证金缴纳状态",
            key: "securityDepositText",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              if (params.row.securityDepositText == "已缴纳") {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.securityDepositText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.securityDepositText
                );
              }
            },
          },
          {
            title: "可用时间",
            key: "dueTime",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return h("span", {
                domProps: {
                  innerHTML: params.row.hasUsedTime,
                },
              });
            },
          },
          {
            title: "到期日期",
            key: "dueTime",
            align: "center",
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                params.row.dueTime
                  ? this.$moment(params.row.dueTime).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      cityList: [{ id: -1, name: "全部城市" }],
      positionId: sessionStorage.getItem("positionId"),
    };
  },
  methods: {
    // 根据状态判断行显示颜色
    rowClassName (row,index) {
        if (row.sendOrderText == '首派' || row.sendOrderText == '首派(微整)' || row.sendOrderText == '首派(整外)'|| row.sendOrderText == '首派(新合作整外)' ) {
            return 'demo-table-info-row';
        } else if (row.sendOrderText == '次派' || row.sendOrderText == '次派(微整)' ) {
            return 'demo-table-warning-row';
        }else if (row.sendOrderText == '查重单') {
            return 'demo-table-error-row';
        }
        return '';
    },
    // 被整理的数组中相同province的元素需放在一块，否则还要再整理数据（暂未处理）
    integratedData(data) {
      let that = this;
      // 获取所有的不同年龄值
      let arrId = [];
      data.forEach((i) => {
        // 判断数组是否有 没有push
        !arrId.includes(i.province) ? arrId.push(i.province) : arrId;
      });
      // 提前为每个字段设置跨行数为0
      let arrObj = [];
      arrId.forEach((j) => {
        arrObj.push({
          id: j,
          num: 0,
        });
      });

      // 计算每个年龄的可跨行数
      data.forEach((k) => {
        arrObj.forEach((l) => {
          k.province === l.id ? l.num++ : l.num;
        });
      });

      data.forEach((m) => {
        arrObj.forEach((n, index) => {
          if (m.province === n.id) {
            if (arrId.includes(m.province)) {
              m.mergeCol = n.num;
              arrId.splice(arrId.indexOf(m.province), 1);
            } else {
              m.mergeCol = 0;
            }
          }
        });
      });
      return data;
    },
    // 只针对相同province字段合并列，province位于第一列，columnIndex为0
    handleSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.mergeCol === 0 ? 0 : row.mergeCol,
          colspan: row.mergeCol === 0 ? 0 : 1,
        };
      }
    },
    // 城市选择
    getCityList() {
      api.cityListy().then((res) => {
        if (res.code === 0) {
          const { citys } = res.data;
          this.cityList = [...this.cityList, ...citys];
        }
      });
    },
    // 营业时间
    hospitalTime(data) {
      if (!data) return;
      this.form.businessHours = data;
    },
    // 获取医院列表
    getAmiyaTotalSendHospitalInstructions() {
      const { hospitalName, cityId } = this.query;
      const data = { hospitalName, cityId: cityId == -1 ? null : cityId };
      api.getAmiyaTotalSendHospitalInstructions(data).then((res) => {
        if (res.code === 0) {
          this.integratedData(res.data.hospitalInfo);
          this.query.data = res.data.hospitalInfo;
        }
      });
    },
  },
  created() {
    this.getAmiyaTotalSendHospitalInstructions();
    this.getCityList();
  },
};
</script>
<style lang="less" scoped>
/deep/.ivu-table .demo-table-info-row td{
        background-color: #cee7b4;
        color: #000;
    }
/deep/ .ivu-table .demo-table-warning-row td{
    background-color: #f8f88b;
    color: #000;
}
/deep/ .ivu-table .demo-table-error-row td{
    background-color: #f89999;
    color: #000;
}
/deep/.ivu-table td.demo-table-info-column{
        background-color: transparent;
        color: #000;
    }
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
