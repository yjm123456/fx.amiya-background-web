<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入手机号或提报内容"
            style="width: 200px;"
            @keyup.enter.native="getTrackReported()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 180px; margin-left: 10px"
            :value="query.startDate"
            v-model="query.startDate"
        ></DatePicker>
        <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
        ></DatePicker>
        <Select
            v-model="query.sendStatus"
            placeholder="请选择提报状态"
            filterable
            style="width: 180px; margin-left: .625rem"
        >
            <Option
            v-for="item in query.sendStatusList"
            :value="item.orderType"
            :key="item.orderType"
            >{{ item.appTypeText }}</Option
            >
        </Select>
        <Select
            v-model="query.sendHospitalId"
            placeholder="请选择医院"
            filterable
            style="width: 220px; margin-left: .625rem"
        >
            <Option
            v-for="item in hospitalList"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
            >
        </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getTrackReported()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
              $refs.dropDown.selectToggle()
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
        :label-width="110"
      >
        <FormItem label="客户电话">
          <dropDown
            :itemlist="itemInfo.list"
            @prevePage="handleActivityPrevePage"
            @nextPage="handleActivityNextPage"
            @searchChange="handleActivitySearchChange"
            @selectChange="handleActivitySelectChange"
            :isNeedSearch="true"
            :isNeedPage="true"
            :pageNum="itemInfo.pageNum"
            :pageCount="itemInfo.pageCount"
            placeholder="请选择客户电话"
            searchPlaceholder="请输入客户电话"
            style="width:380px"
            ref="dropDown"
          ></dropDown>
        </FormItem>
        <FormItem label="提报内容" prop="sendContent">
          <Input v-model="form.sendContent" type="textarea" :rows="4"></Input>
        </FormItem>
        <FormItem label="提报医院" prop="sendHospitalId">
            <Select
                v-model="form.sendHospitalId"
                placeholder="请选择医院"
                filterable
            >
                <Option
                v-for="item in hospitalInfo"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
                >
          </Select>
        </FormItem>
        <!-- <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/trackReported";
import * as hospitalApi from "@/api/employeeManage";
import dropDown from "@/components/select/dropDown";

export default {
   components: {
    dropDown,
  },
  data() {
    return {
      hospitalInfo:[],
      hospitalList:[{id:-1,name:'全部医院'}],
      // 项目信息
      itemInfo: {
        phone: "",
        pageNum: 1,
        pageSize: 10,
        list: [],
        totalCount: 0,
        pageCount: 0,
      },
      // 查询
      query: {
        sendHospitalId:-1,
        sendStatus:-1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "编号",
            key: "id",
            width:170,
            align:'center'
          },
          {
            title: "客户电话",
            key: "phone",
            align:'center',
            width:130,
          },
          {
            title: "提报状态",
            key: "sendStatusText",
            align:'center',
            width:120,
            render: (h, params) => {
              if (params.row.sendStatusText == "跟进完成") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.sendStatusText
                );
              } else if (params.row.sendStatusText == "跟进失败") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.sendStatusText
                );
              } else if (params.row.sendStatusText == "已提报") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.sendStatusText
                );
              }  else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.sendStatusText
                );
              }
            },
          },
          
          {
            title: "提报内容",
            key: "sendContent",
            align:'center'
          },
          {
            title: "提报医院",
            key: "sendHospital",
            align:'center',
            width:190
          },
          {
            title: "医院回访内容",
            key: "hospitalContent",
            align:'center'
          },
          {
            title: "提报日期",
            key: "sendDate",
            align:'center',
            width:170,
            render: (h, params) => {
              return h(
                "div",
                params.row.sendDate ? this.$moment(params.row.sendDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                ) : ''
              );
            },
          },
          {
            title: "提报人",
            key: "sendByName",
            align:'center',
            width:120
          },
        //   {
        //     title: "追踪回访id",
        //     key: "trackRecordId",
        //   },
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
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdtrackReported(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              id,
                              phone,
                              sendContent,
                              sendHospitalId
                            } = res.data.trackReportedInfo;
                            this.$refs.dropDown.selectToggle(phone)
                            this.isEdit = true;
                            this.form.phone = phone;
                            this.form.sendContent = sendContent;
                            this.form.sendHospitalId = sendHospitalId;
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
                            api.deleteTrackReported(id).then((res) => {
                              if (res.code === 0) {
                                this.getTrackReported();
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
        sendStatusList:[{orderType:-1,appTypeText:'全部提报状态'}]
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        phone: "",
        sendContent: "",
        sendHospitalId:null,
        valid: false,
        id:""
      },

      ruleValidate: {
        phone: [
          {
            required: true,
            message: "请选择客户手机号",
          },
        ],
        sendContent: [
          {
            required: true,
            message: "请输入提报内容",
          },
        ],
        sendHospitalId: [
          {
            required: true,
            message: "请选择提报医院",
          },
        ],
      },
    };
  },
  methods: {
  // 获取提报状态列表
    getsendStatusText() {
      api.sendStatusText().then((res) => {
        if (res.code === 0) {
          const { sendStatus } = res.data;
          this.query.sendStatusList = [...this.query.sendStatusList,...sendStatus]
        }
      });
    },
    // 获取医院列表
    getHospitalList() {
      hospitalApi.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalInfo = hospitalInfo;
          this.hospitalList = [...this.hospitalList,...hospitalInfo]
        }
      });
    },
    // 模糊搜素
    bindCustomerService() {
      const { phone, pageNum, pageSize } = this.itemInfo;
      api.bindCustomerService({ phone, pageNum, pageSize }).then((res) => {
        this.itemInfo.list = res;
    //     if (res.code === 0) {
    //       const { list, totalCount } = res.data.activitys;
    //       // const allObj = { name: "全部活动", id: -1 };
    //       // this.itemInfo.list = [allObj, ...list];
    //       this.itemInfo.list = list;
    //       this.itemInfo.totalCount = totalCount;
    //       this.itemInfo.pageCount = Math.ceil(totalCount / 10);
    //     }
      });
    },
    // 上一页
    handleActivityPrevePage() {
      if (this.itemInfo.pageNum === 1) return;
      --this.itemInfo.pageNum;
      if (this.itemInfo.pageNum < 1) {
        this.itemInfo.pageNum = 1;
      }
      this.bindCustomerService();
    },
    // 下一页
    handleActivityNextPage() {
      if (this.itemInfo.pageNum < this.itemInfo.pageCount) {
        ++this.itemInfo.pageNum;
        this.bindCustomerService();
      }
    },
    // 搜索
    handleActivitySearchChange(query) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.itemInfo.phone = query;
        this.bindCustomerService();
      }, 300);
    },
    // 选择
    handleActivitySelectChange(selectd) {
      this.form.phone = selectd;
    },
    // 获取提报列表
    getTrackReported() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,startDate,endDate,sendHospitalId,sendStatus} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keyword ,
        startDate:startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
        sendHospitalId : sendHospitalId == -1 ? null : sendHospitalId,
        sendStatus : sendStatus == -1 ? null : sendStatus
        };
      api.trackReported(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackReportedInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取提报列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,startDate,endDate,sendHospitalId,sendStatus} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyword ,
            startDate:startDate ? this.$moment(new Date(startDate)).format("YYYY-MM-DD") : null,
            endDate:endDate ? this.$moment(new Date(endDate)).format("YYYY-MM-DD") : null,
            sendHospitalId : sendHospitalId == -1 ? null : sendHospitalId,
            sendStatus : sendStatus == -1 ? null : sendStatus
            };
        api.trackReported(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.trackReportedInfo;
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
            const { phone, sendContent, sendHospitalId,id } = this.form;
            const  data = { phone ,sendContent,sendHospitalId,id} 
            if(!phone){
                this.$Message.warning('请选择客户手机号')
                return
            }
            // 修改
            api.editTrackReported(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getTrackReported();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { phone, sendContent, sendHospitalId } = this.form;
            const  data = { phone ,sendContent,sendHospitalId} 
            if(!phone){
                this.$Message.warning('请选择客户手机号')
                return
            }
            // 添加
            api.addTrackReported(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getTrackReported();
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
    this.getTrackReported();
    this.getHospitalList();
    this.getsendStatusText()
    // this.getLogisticsCompanyList()
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