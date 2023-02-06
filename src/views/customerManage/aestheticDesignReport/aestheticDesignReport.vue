<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px;"
            @keyup.enter.native="getAestheticsDesignReport()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            style="width: 150px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.status"
            placeholder="美学设计报告状态"
            style="width: 150px; margin-left: .625rem"
          >
            <Option
              v-for="item in statuList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAestheticsDesignReport()"
            >查询</Button
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

    <!-- 添加/编辑设计 -->
    <addDesign :controlModal.sync="controlModal" :addDesignParams="addDesignParams" @getAestheticsDesignReport="getAestheticsDesignReport"/>
  </div>
</template>
<script>
import * as api from "@/api/aestheticsDesignReport";
import addDesign from './components/addDesign.vue';
export default {
    components:{
        addDesign
    },
  data() {
    return {
      // 查询
      query: {
        startDate: this.$moment().startOf("month").format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        status:-1,
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
            {
            title: "编号",
            key: "id",
            align: "center",
            minWidth: 150,
          },
          {
            title: "创建时间",
            key: "createDate",
            minWidth: 220,
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
            title: "姓名",
            key: "name",
            align: "center",
            minWidth: 100,
          },
          {
            title: "生日",
            key: "birthDay",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate ? this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD"
                ) : ''
              );
            },
          },
          {
            title: "手机号",
            key: "phone",
            align: "center",
            minWidth: 130,
          },
          {
            title: "所在城市",
            key: "city",
            align: "center",
            minWidth: 200,
          },
          {
            title: "是否有医美经历",
            key: "hasAestheticMedicineHistory",
            align: "center",
            minWidth: 140,
            render: (h, params) => {
              if (params.row.hasAestheticMedicineHistory == true) {
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
            title: "是否接受手术",
            key: "whetherAcceptOperation",
            align: "center",
            minWidth: 130,
            render: (h, params) => {
              if (params.row.whetherAcceptOperation == true) {
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
            title: "是否有过过敏史或其他疾病",
            key: "whetherAllergyOrOtherDisease",
            align: "center",
            minWidth: 220,
            render: (h, params) => {
              if (params.row.whetherAllergyOrOtherDisease == true) {
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
            title: "预算",
            key: "budget",
            align: "center",
            minWidth: 100,
          },
          {
            title: "正面照片",
            key: "frontPicture",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.frontPicture,
                  },
                }),
              ]);
            },
          },
          {
            title: "侧面照片",
            key: "sidePicture",
            align: "center",
            minWidth: 100,
            render: (h, params) => {
              return h("viewer", {}, [
                h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.sidePicture,
                  },
                }),
              ]);
            },
          },
          {
            title: "美学设计报告状态",
            key: "statusText",
            align: "center",
            minWidth: 150,
          },
          {
            title: "操作",
            key: "",
            align: "center",
            minWidth: 150,
            fixed:'right',
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
                        const { id } = params.row;
                        this.addDesignParams.title = params.row.statusText == '已提交' ?  "添加设计" : "编辑设计";
                        const data = {
                            reportId:id
                        }
                        api.getDesignByReportId(data).then((res) => {
                          if (res.code === 0) {
                             this.controlModal = true
                             this.addDesignParams.info = res.data.info
                          }
                        });
                      },
                    },
                  },
                  params.row.statusText == '已提交' ?  "添加设计" : "编辑设计"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
    //   状态
    statuList:[{id:-1,name:'全部状态'}],
    controlModal:false,
    // 子组件参数
    addDesignParams:{
        //详情数据 
        info:{},
        // 标题
        title:'',
        // 医院简称
        simpleNameList:[]
    }
    };
  },
  methods: {
    // 获取医院简称
    getsimpleNameList() {
      api.simpleNameList().then((res) => {
        if (res.code === 0) {
          this.addDesignParams.simpleNameList = res.data.simpleNameList;
        }
      });
    },
    // 获取美学设计报告状态
    getstatuList() {
      api.statuList().then((res) => {
        if (res.code === 0) {
          this.statuList = [...this.statuList,...res.data.statuList]
        }
      });
    },
    // 获取美学设计报告列表
    getAestheticsDesignReport() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyWord,status,startDate,endDate} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keyWord, 
        status:status == -1 ? null : status,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
     };
      api.AestheticsDesignReport(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.list;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取美学设计报告列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyWord,status,startDate,endDate} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyWord ,
            status:status == -1 ? null : status,
            startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        };
        api.AestheticsDesignReport(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.list;
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
            // 修改
            api.editExpressManage(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getAestheticsDesignReport();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { expressName, valid, expressCode } = this.form;
            const  data = { expressName ,valid,expressCode} 
            // 添加
            api.addExpressManage(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getAestheticsDesignReport();
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
    this.getAestheticsDesignReport();
    this.getstatuList()
    this.getsimpleNameList()
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