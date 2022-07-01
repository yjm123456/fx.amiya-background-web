<template>
  <div>
    <Card>
      <div class="container">
        <div class="radio_wrap">
          <RadioGroup v-model="query.type" vertical>
            <Radio label="待追踪回访客户列表">
              <Icon type="social-apple"></Icon>
              <span>待追踪回访客户列表</span>
            </Radio>
            <Radio label="已追踪回访客户列表">
              <Icon type="social-android"></Icon>
              <span>已追踪回访客户列表</span>
            </Radio>
          </RadioGroup>
        </div>
        <div class="date_wrap">
          <div>
            <span>开始日期</span>
            <span
              ><DatePicker
                type="date"
                placeholder="请选择开始日期"
                style="width: 210px"
                :value="query.startDate"
                @on-change="handleStartDate"
              ></DatePicker
            ></span>
          </div>
          <div>
            <span>结束日期</span>
            <span
              ><DatePicker
                type="date"
                placeholder="请选择结束日期"
                style="width: 210px"
                :value="query.endDate"
                @on-change="handleEndDate"
              ></DatePicker
            ></span>
          </div>
        </div>
        <div class="inp_wrap">
          <div>
            <span>关键字</span>
            <span
              ><Input
                placeholder="请输入手机号、回访主题"
                style="width: 210px"
                v-model.trim="query.keyword"
                @keyup.enter.native="search"
              />
            </span>
          </div>
          <div>
            <span style="width: 200px;margin-right: 19px" v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }">客服</span>
            <span>
              <Select
                v-model="query.employeeId"
                style="width: 210px;"
                v-has="{ role: ['fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE'] }"
                placeholder="请选择客服"
              >
                <Option
                  v-for="item in employee"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </span>
          </div>
        </div>
        <div class="search">
          <div>
            <Button type="primary" ghost @click="search">
              <Icon type="ios-search" size="25" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
export default {
  data() {
    return {
      employee: [{ name: "全部", id: -1 }],
      query: {
        type: "待追踪回访客户列表",
        keyword: "",
        startDate: new Date(),
        endDate: new Date(),
        employeeId: -1
      },
    };
  },
  methods: {
    // 获取客服列表
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = [...this.employee, ...employee];
        }
      });
    },
    handleStartDate(date) {
      this.query.startDate = date;
    },
    handleEndDate(date) {
      this.query.endDate = date;
    }, 
    search() {
      this.$emit("handleSearch", this.query);
    },
    isAuthority() {
      let currentRole = JSON.parse(sessionStorage.getItem("permissions")) ? JSON.parse(sessionStorage.getItem("permissions")) : [];
      if (!currentRole.includes("fx.amiya.permission.LIST_BY_CUSTOMER_SERVICE")) {
        this.query.employeeId = null;
      }
      this.$emit("handleSearch", this.query);
    }
  },
  created() {
    this.getCustomerServiceList();
    this.isAuthority();
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  .radio_wrap {
    margin-right: 10px;
    /deep/ .ivu-radio-wrapper {
      display: block;
      height: 42px;
      line-height: 41px;
    }
  }
  .date_wrap {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    > div {
      > span:first-child {
        margin-right: 5px;
      }
    }
    > div:last-child {
      margin-top: 10px;
    }
  }
  .inp_wrap {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    > div {
      > span:first-child {
        margin-right: 5px;
      }
    }
    > div:last-child {
      margin-top: 20px;
    }
  }
  .search {
    height: 74px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    /deep/ .ivu-btn {
      height: 60px;
      width: 100%;
    }
  }
}
</style>
