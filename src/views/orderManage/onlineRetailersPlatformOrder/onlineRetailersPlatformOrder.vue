<template>
  <div>
    <Card>
      <div>
        <DatePicker
          type="date"
          placeholder="开始日期"
          style="width: 200px"
          :value="query.startDate"
          v-model="query.startDate"
          transfer
        ></DatePicker>
        <DatePicker
          type="date"
          placeholder="结束日期"
          style="width: 200px; margin-left: 10px"
          :value="query.endDate"
          v-model="query.endDate"
          transfer
        ></DatePicker>
        <Input
          v-model="query.keyword"
          placeholder="请输入商品名称或订单号"
          style="width: 200px; margin: 0 10px"
          @keyup.enter.native="getHospitalSendOrderList()"
        />
        <Button type="primary" @click="getHospitalSendOrderList()">查询</Button>
        <Button type="primary" @click="exportOfHospital()" style="margin-left:10px" v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
      </div>
      <div style="margin-top: 10px">
        <Table border :columns="query.columns" :data="query.data"></Table>
        <Spin fix v-if="flag==true">
          <Icon type="ios-loading" size=18 class="demo-spin-icon-load" ></Icon>
          <div>Loading</div>
      </Spin>
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

    
    <!-- 留言板 -->
    <messageBoard @messageBoardChange = "messageBoardChange"  :messageBoardParams = "messageBoardParams"/>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import logoMin from "@/assets/images/logo_min.png"
import messageBoard from "@/components/messageBoard/messageBoard.vue"
import { download } from "@/utils/util";

export default {
  props: ["activeName"],
  components: {
    messageBoard
  },
  data() {
    return {
      logoMin,
      query: {
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        columns: [
          {
            title: "订单编号",
            key: "orderId",
            minWidth: 200,
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 150,
            render: (h, params) => {
              return h(
                "div",
                params.row.appointmentDate ? this.$moment(params.row.sendDate).format("YYYY-MM-DD") + params.row.time : params.row.time
              );
            },
          },
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
                      margin: "5px 15px 5px 5px",
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
            title: "简介",
            key: "description",
            minWidth: 200,
          },
          {
            title: "规格",
            key: "standard",
            minWidth: 100,
          },
          {
            title: "采购价格",
            key: "purchaseSinglePrice",
            minWidth: 100,
          },
          {
            title: "采购数量",
            key: "purchaseNum",
            minWidth: 100,
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 180,
            render: (h, params) => {
              const employeeType = window.sessionStorage.getItem(
                "employeeType"
              );
              if (employeeType === "hospitalEmployee") {
                return h(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                    },
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          marginRight: "10px",
                        },
                      },
                      params.row.phone
                    ),
                    h("span", {
                      style: {
                        color: "#2d8cf0",
                        fontSize: "20px",
                      },
                      class: !params.row.bool
                        ? "iconfont icon-biyan"
                        : "iconfont icon-see",
                      on: {
                        click: () => {
                          if (params.row.bool) return;
                          const { orderId } = params.row;
                          const data = {
                            orderId,
                          };
                          this.flag = true
                          api.hospitalSeePhone(data).then((res) => {
                            if (res.code === 0) {
                              params.row.phone = res.data.phone;
                              params.row.bool = true;
                              this.flag = false
                            }else{
                              setTimeout(()=>{
                                this.flag  = false
                              },2000)
                            }
                          });
                        },
                      },
                    }),
                  ]
                );
              }
            },
          },
          {
            title: "派单时间",
            key: "sendDate",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.sendDate).format("YYYY-MM-DD HH:mm:ss")
              );
            },
          },
        
          {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        const { hospitalId , id} = params.row;
                        this.messageBoardParams.hospitalId = hospitalId
                        this.messageBoardParams.id = id
                        this.messageBoardParams.messageBoard = true
                      },
                    },
                  },
                  "留言板"
                ),
              ]);
            },
          },
        ],
        data: [],
      },
      flag:false,
      // 控制 modal
      controlModal: false,

      form: {
        id: "",
        // 反馈内容
        feedback: "",
      },

      ruleValidate: {
        feedback: [
          {
            required: true,
            message: "请输入反馈内容",
          },
        ],
      },
      // 客户信息组件参数 留言板
      messageBoardParams: {
        hospitalId: 0,
        id: 0,
        content: "",
        messageBoard:false
      },
    };
  },
  methods: {
    // 下单平台派单 导出
    exportOfHospital(){
      const {keyword ,startDate ,endDate} = this.query
      const data = {
        keyword,
        startDate:this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate:this.$moment(new Date(endDate)).format("YYYY-MM-DD")
      }
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.exportOfHospital(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '下单平台派单'
        download(res,name);
      });
    },
    // 医院获取派单信息
    getHospitalSendOrderList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { startDate, endDate, keyword, pageNum, pageSize } = this.query;
      const data = {
        startDate: startDate  ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        pageNum,
        pageSize,
      };
      api.hospitalSendOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 医院获取派单信息分页
    handleProjectPageChange(pageNum) {
      const { startDate, endDate, keyword, pageSize } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        pageNum,
        pageSize,
      };
      api.hospitalSendOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.sendOrderInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 修改
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, feedback } = this.form;
          const data = {
            id,
            feedback,
          };
          api.feedback(data).then((res) => {
            if (res.code === 0) {
              this.cancel("form");
              this.getHospitalSendOrderList();
              this.$Message.success({
                content: "添加成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    // 取消
    cancel(name) {
      this.controlModal = false;
      this.$refs[name].resetFields();
    },
     // 留言板
    messageBoardChange(){
      this.messageBoardParams.messageBoard = false
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
      }
    },
  },
  created() {
    this.getHospitalSendOrderList();
  },
  watch:{
    activeName: {
      handler(value) {
        if (value === "hospitalDispatch") {
            this.getHospitalSendOrderList();
        }
      },
      immediate: true,
    },
  }
};
</script>
<style lang="less" scoped>
.pages {
  margin-top: 16px;
  text-align: right;
}
.con {
  margin-bottom: 30px;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 24px;
    }
    .name {
      margin-right: 50px;
    }
  }
  .item-message {
    margin-left: 9%;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
