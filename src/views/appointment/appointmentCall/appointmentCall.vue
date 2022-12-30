<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px"
            @keyup.enter.native="getHospitalInfo()"
          />
          <Select
            v-model="query.status"
            placeholder="请选择状态"
            filterable
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in query.appointmentCarTypeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
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
    <!-- 修改 -->
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
        <FormItem label="姓名" prop="name">
          <Input v-model="form.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input
            v-model="form.phone"
            maxlength="11"
            placeholder="请输入手机号"
          ></Input>
        </FormItem>
        <FormItem label="预约日期" prop="appointmentDate">
          <DatePicker
            type="date"
            placeholder="预约日期"
            style="width: 100%"
            :value="form.appointmentDate"
            v-model="form.appointmentDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="预约时间" prop="time">
          <TimePicker
            type="time"
            placeholder="请选择预约时间"
            :value="form.time"
            v-model="form.time"
            style="width: 100%"
          ></TimePicker>
        </FormItem>
        <FormItem label="预约地点" prop="address">
          <Input v-model="form.address"></Input>
        </FormItem>
        <FormItem label="医院" prop="hospital">
          <Select v-model="form.hospital" placeholder="请选择医院" filterable>
            <Option
              v-for="item in hospitalInfo"
              :value="item.name"
              :key="item.name"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 修改叫车状态 -->
    <status :statusControlModal.sync="statusControlModal" :appointmentCarTypeList="appointmentCarTypeList" :id="id" @getHospitalInfo="getHospitalInfo"/>
  </div>
</template>
<script>
import * as api from "@/api/appointmentCar";
import * as hospitalManage from "@/api/hospitalManage";
import status from "./components/status.vue"
export default {
  components:{
      status
  },
  data() {
    return {
     id:null,
      // 查询
      query: {
        status: -1,
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "姓名",
            key: "name",
          },
          {
            title: "手机号",
            key: "phone",
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            width: 200,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.appointmentDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "预约地点",
            key: "address",
          },
          {
            title: "预约医院",
            key: "hospital",
          },
          {
            title: "预约车型",
            key: "carTypeText",
          },
          {
            title: "抵扣类型",
            key: "exchageTypeText",
          },

          {
            title: "状态",
            key: "statusText",
          },
          {
            title: "操作",
            key: "",
            width: 210,
            align:'center',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.statusText == '已取消'||params.row.statusText == '已完成'
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdAppointmentCar(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              name,
                              phone,
                              appointmentDate,
                              address,
                              hospital,
                            } = res.data.info;
                            this.form.name = name;
                            this.form.phone = phone;
                            this.form.appointmentDate =
                              this.$moment(appointmentDate).format(
                                "YYYY-MM-DD"
                              );
                            this.form.address = address;
                            this.form.hospital = hospital;
                            this.form.time =
                              this.$moment(appointmentDate).format("HH:mm:ss");
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
                      type: "primary",
                      size: "small",
                      disabled:params.row.statusText == '已取消'||params.row.statusText == '已完成'
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                            this.statusControlModal = true;
                            this.id = id
                        
                      },
                    },
                  },
                  "修改叫车状态"
                ),
                
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
        // 预约叫车状态
        appointmentCarTypeList: [
          {
            id: -1,
            name: "全部状态",
          },
        ],
      },

      // 控制 modal
      controlModal: false,
      statusControlModal:false,
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id: "",
        // 名字
        name: "",
        // 手机号
        phone: "",
        // 预约日期
        appointmentDate: "",
        // 时分
        time: "",
        // 预约地址
        address: "",
        // 医院
        hospital: "",
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入名字",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
        appointmentDate: [
          {
            required: true,
            message: "请选择预约日期",
          },
        ],
        time: [
          {
            required: true,
            message: "请选择预约时间",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
          },
        ],
        hospital: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
      },
      // 预约叫车状态
      appointmentCarTypeList: [],
      //  医院
      hospitalInfo: [],
    };
  },
  methods: {
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
        }
      });
    },
    // 预约叫车状态
    getappointmentCarTypeList() {
      api.appointmentCarTypeList().then((res) => {
        if (res.code === 0) {
          const { appointmentCarTypeList } = res.data;
          this.query.appointmentCarTypeList = [
            ...this.query.appointmentCarTypeList,
            ...appointmentCarTypeList,
          ];
          this.appointmentCarTypeList = appointmentCarTypeList;
        }
      });
    },
    // 获取预约叫车列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, status } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        status: status == -1 ? null : status,
      };
      api.getAppointmentCar(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.appointment;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取预约叫车列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, status } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        status: status == -1 ? null : status,
      };
      api.getAppointmentCar(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.appointment;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, name, phone, appointmentDate, time, address, hospital } =
            this.form;
          const data = {
            id,
            name,
            phone,
            appointmentDate:
              this.$moment(appointmentDate).format("YYYY-MM-DDT") + time,
            address,
            hospital,
          };
          if (phone) {
            if (!/^1[3456789]\d{9}$/.test(phone)) {
              this.$Message.error("请输入正确的手机号");
              return false;
            }
            // 修改
            api.editAppointmentCar(data).then((res) => {
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
    this.getappointmentCarTypeList();
    this.getHospitalInfonameList();
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