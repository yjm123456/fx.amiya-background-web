<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 200px"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 200px; margin-left: 10px"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAppointment()"
            >查询</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table
          border
          :columns="
            employeeType == 'amiyaEmployee'
              ? query.columns
              : query.hospitalColumns
          "
          :data="query.data"
        ></Table>
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
      title="修改订单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="60%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="140"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="项目名称" prop="itemName">
              <Select
                v-model="form.itemName"
                placeholder="请选择项目名称"
                filterable
                @on-change="selectGoodsName"
              >
                <Option
                  v-for="item in AmiyaHospitalDepartmentList"
                  :value="item.projectName"
                  :key="item.projectName"
                  >{{ item.projectName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="手机号" prop="phone">
              <Input v-model="form.phone" maxlength="11"></Input>
            </FormItem>
          </Col>
          
          <Col span="8">
            <FormItem label="预约日期" prop="appointmentDate">
              <DatePicker
                type="date"
                placeholder="开始日期"
                style="width: 100%"
                v-model="form.appointmentDate"
                @on-change="getweekday()"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="星期" prop="week">
              <Input v-model="form.week" disabled></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="时间(上午/下午)" prop="time">
              <Select v-model="form.time" placeholder="请选择时间">
                <Option
                  v-for="item in timeSelect"
                  :value="item.time"
                  :key="item.time"
                  >{{ item.time }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="预约医院" prop="hospitalId">
              <Select
                v-model="form.hospitalId"
                placeholder="请选择预约医院"
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
          </Col>
          <Col span="8">
            <FormItem label="预约地区" prop="appointArea">
              <Input
                v-model="form.appointArea"
                placeholder="请输入预约地区"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="叫车地址" prop="address">
              <Input
                v-model="form.address"
                placeholder="请输入叫车地址"
                type="textarea"
                :rows="3"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- <Modal
      v-model="distributeLeafletsModal"
      title="派单"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="distributeLeafletsForm"
        :model="distributeLeafletsForm"
        :rules="distributeLeaflets"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="派单医院" prop="hospitalId">
          <Select
            v-model="distributeLeafletsForm.hospitalId"
            placeholder="请选择派单医院"
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
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('distributeLeafletsForm')">取消</Button>
        <Button
          type="primary"
          @click="distributeLeafletsHandleSubmit('distributeLeafletsForm')"
          >确定</Button
        >
      </div>
    </Modal> -->
    <!-- <Modal
      v-model="remarkModel"
      title="备注"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="remarkForm"
        :model="remarkForm"
        label-position="left"
        :label-width="80"
        :rules="remarkFlag"
      >
        <FormItem label="备注" prop="remark">
          <Input v-model="remarkForm.remark" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('remarkForm')">取消</Button>
        <Button type="primary" @click="remarkHandleSubmit('remarkForm')"
          >确定</Button
        >
      </div>
    </Modal> -->
    <!-- 修改预约状态 -->
    <status
      :statusControlModal.sync="statusControlModal"
      @getAppointment="getAppointment"
      :id="id"
      :statusList="statusList"
    />
  </div>
</template>

<script>
import * as api from "@/api/appointment";
import * as apis from "@/api/goodsManage";
import * as orderapi from "@/api/orderManage";
import status from "./components/status.vue";
import { color } from "echarts";
export default {
  components: {
    status,
  },
  data() {
    return {
      statusList: [],
      id: null,
      statusControlModal: false,
      employeeType: sessionStorage.getItem("employeeType"),
      remarkForm: {
        id: "",
        remark: "",
      },
      // 判断是否是管理员
      amiyaPositionId: "",
      remarkModel: false,
      // 获取商品名称和id
      AmiyaHospitalDepartmentList: [],
      timeSelect: [
        {
          id: 1,
          time: "上午",
        },
        {
          id: 1,
          time: "下午",
        },
      ],
      // 预约编号
      distributeLeafletsid: "",
      // 医院
      hospitalInfo: [],
      // 修改按钮
      controlModal: false,
      // 派单
      distributeLeafletsModal: false,
      distributeLeafletsForm: {
        hospitalId: "",
      },
      form: {
        id: "",
        appointmentDate: "",
        week: "",
        time: "",
        itemName: "",
        phone: "",
        appointArea: "",
        address:'',
        hospitalId:null
      },
      ruleValidate: {
        address: [
          {
            required: true,
            message: "请输入预约叫车地址",
          },
        ],
        hospitalId: [
          {
            required: true,
            message: "请选择预约医院",
          },
        ],
        appointArea: [
          {
            required: true,
            message: "请输入预约地区",
          },
        ],
        appointmentDate: [
          {
            required: true,
            message: "请选择预约日期",
          },
        ],
        week: [
          {
            required: true,
            message: "请输入星期",
          },
        ],
        time: [
          {
            required: true,
            message: "请选择时间",
          },
        ],
        itemName: [
          {
            required: true,
            message: "请选择项目名称",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
      },
      // distributeLeaflets: {
      //   hospitalId: [
      //     {
      //       required: true,
      //       message: "请选择派单医院",
      //     },
      //   ],
      // },
      // remarkFlag: {
      //   remark: [
      //     {
      //       required: true,
      //       message: "请输入备注",
      //     },
      //   ],
      // },
      // 查询
      query: {
        endtimes: null,
        // startDate: this.$moment().startOf('month').format("YYYY-MM-DD"),
        // startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // endDate: this.$moment(new Date()).endOf('month').format('YYYY-MM-DD') + " 23:59:59",
        startDate: "",
        endDate: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "预约地区",
            key: "appointArea",
            width: 200,
            tooltip:true,
          },
          {
            title: "预约日期",
            key: "appointmentDate",
            width: 120,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.appointmentDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "星期",
            key: "week",
            width: 100,
            align:'center',
          },
          {
            title: "上午/下午",
            key: "time",
            width: 100,
            align:'center',
          },
          {
            title: "预约状态",
            key: "statusText",
            width: 120,
            align:'center',
          },
          {
            title: "项目名称",
            key: "itemName",
            width: 150,
            align:'center',
          },
          {
            title: "跟进人员",
            key: "empolyeeName",
            width: 150,
            align:'center',
          },
          {
            title: "预约电话",
            key: "phone",
            width: 120,
            align:'center',
          },
          {
            title: "提交时间",
            key: "submitDate",
            width: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.submitDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "医院名称",
            key: "hospitalName",
            width: 220,
            tooltip:true
          },
          {
            title: "叫车地址",
            key: "address",
            width: 220,
            tooltip:true
          },
          {
            title: "备注",
            key: "remark",
            width: 200,
            tooltip:true
          },
          {
            title: "操作",
            key: "",
            width: 240,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              const { statusText } = params.row;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: statusText == "预约成功",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.isEdit = false;
                        this.controlModal = true;
                        api.byIdAppointment(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              appointmentDate,
                              createDate,
                              itemName,
                              phone,
                              time,
                              week,
                              id,
                              appointArea,
                              address,
                              hospitalId
                            } = res.data.appointment;
                            this.isEdit = true;
                            this.form.appointmentDate = this.$moment(
                              appointmentDate
                            ).format("YYYY-MM-DD");
                            this.form.phone = phone;
                            this.form.itemName = itemName;
                            this.form.time = time;
                            this.form.week = week;
                            this.form.id = id;
                            this.form.appointArea = appointArea;
                            this.form.address = address;
                            this.form.hospitalId = hospitalId;
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
                      disabled: statusText == "预约成功",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.statusControlModal = true;
                        this.id = id;
                      },
                    },
                  },
                  "修改预约状态"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: statusText == "预约成功",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.remarkForm.id = id;
                        this.remarkModel = true;
                      },
                    },
                  },
                  "备注"
                ),
                // this.employeeType == 'amiyaEmployee' ? h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //       disabled: statusText !='待完成',
                //     },
                //     style: {
                //       marginRight: "5px",
                //     },
                //     on: {
                //       click: () => {
                //         const { id } = params.row;
                //         this.isEdit = false;
                //         this.distributeLeafletsModal = true
                //         this.distributeLeafletsid = id
                //         this.getHospital()
                //       },
                //     },
                //   },
                //   "派单"
                // ):"",

                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "primary",
                //       size: "small",
                //       disabled: statusText =='已完成',
                //     },

                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "订单完成提示",
                //           content: "是否确认完成订单？",
                //           onOk: () => {
                //             const { id } = params.row;
                //             const data = {
                //               id
                //             }
                //             api.editconfirmFinish(data).then((res) => {
                //               if (res.code === 0) {
                //                 this.getAppointment();
                //                 this.$Message.success({
                //                   content: "已确认成功",
                //                   duration: 3,
                //                 });
                //               }
                //             });
                //           },
                //           onCancel: () => {},
                //         });
                //       },
                //     },
                //   },
                //   "订单完成"
                // ),
              ]);
            },
          },
        ],
        hospitalColumns: [
          {
            title: "预约地区",
            key: "appointArea",
            width: 200,
          },
          {
            title: "预约日期",
            key: "appointmentDate",
            width: 200,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.appointmentDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "星期",
            key: "week",
            width: 150,
          },
          {
            title: "上午/下午",
            key: "time",
            width: 150,
          },
          {
            title: "预约状态",
            key: "statusText",
            width: 200,
          },
          {
            title: "项目名称",
            key: "itemName",
            width: 200,
          },
          {
            title: "预约电话",
            key: "phone",
            width: 200,
          },
          {
            title: "提交时间",
            key: "submitDate",
            width: 200,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.submitDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "医院名称",
            key: "hospitalName",
            width: 250,
          },
          {
            title: "叫车地址",
            key: "address",
            width: 250,
          },
          {
            title: "备注",
            key: "remark",
            width: 200,
          },
        ],
        data: [],
        totalCount: 0,
      },
    };
  },
  methods: {
    getStatusList() {
      api.getStatusList().then((res) => {
        if (res.code == 0) {
          this.statusList = res.data.statusList;
        }
      });
    },
    // 根据年月日获取星期
    getweekday() {
      const { appointmentDate } = this.form;
      var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
      var week = weekArray[new Date(appointmentDate).getDay()]; //注意此处必须是先new一个Date
      this.form.week = "星期" + week;
      return week;
    },
    // 获取商品名称和id
    getgetAmiyaHospitalDepartmentList() {
      orderapi.getgetAmiyaHospitalDepartmentList().then((res) => {
        if (res.code === 0) {
          const { AmiyaGoodsDemandList } = res.data;
          this.AmiyaHospitalDepartmentList = AmiyaGoodsDemandList;
        }
      });
    },
    //根据商品名称获取id
    selectGoodsName(data) {
      this.AmiyaHospitalDepartmentList.map((item) => {
        if (data === item.id) {
          this.form.goodsNames = item.projectName;
          this.form.goodsId = item.id;
        }
      });
    },
    // 获取医院列表（select）
    getHospital() {
      apis.getHospitalnameList().then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalInfo = hospitalInfo;
        }
      });
    },
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.distributeLeafletsModal = false;
      this.remarkModel = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        // this.$refs["distributeLeafletsForm"].resetFields();
        // this.$refs["remarkForm"].resetFields();
      }
    },
    // 获取预约列表
    getAppointment() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { startDate, endDate, pageNum, pageSize } = this.query;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        pageNum,
        pageSize,
      };
      api.Appointment(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.apponintmentInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 获取预约列表分页
    handlePageChange(pageNum) {
      const { startDate, endDate, pageSize } = this.query;
      const data = {
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        pageNum,
        pageSize,
      };
      api.Appointment(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.apponintmentInfo;
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
            const {
              id,
              appointmentDate,
              week,
              time,
              itemName,
              phone,
              appointArea,
              address,
              hospitalId
            } = this.form;
            const data = {
              id,
              appointmentDate: this.$moment(appointmentDate).format(
                "YYYY-MM-DD"
              ),
              week,
              time,
              itemName,
              phone,
              appointArea,
              address,
              hospitalId
            };
            if (phone) {
              if (!/^1[3456789]\d{9}$/.test(phone)) {
                this.$Message.error("请输入正确的手机号");
                return false;
              }
              api.editAppointment(data).then((res) => {
                if (res.code === 0) {
                  this.isEdit = false;
                  this.cancelSubmit("form");
                  this.getAppointment();
                  this.$Message.success({
                    content: "修改成功",
                    duration: 3,
                  });
                }
              });
            }
          }
        }
      });
    },
    // 派单确认
    distributeLeafletsHandleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const hospitalId = this.distributeLeafletsForm.hospitalId;
          const distributeLeafletsid = this.distributeLeafletsid;
          const data = {
            hospitalId: hospitalId,
            id: distributeLeafletsid,
          };
          // 派单
          api.editsendToHospital(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("distributeLeafletsForm");
              this.getAppointment();
              this.$Message.success({
                content: "派单成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 备注确定
    remarkHandleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const { id, remark } = this.remarkForm;
          const data = {
            id,
            remark,
          };
          api.editRemark(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("remarkForm");
              this.getAppointment();
              this.$Message.success({
                content: "备注成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
  },

  created() {
    this.getHospital()
    this.getStatusList();
    this.getAppointment();
    this.getgetAmiyaHospitalDepartmentList();
    const amiyaPositionId = JSON.parse(
      sessionStorage.getItem("amiyaPositionId")
    );
    this.amiyaPositionId = amiyaPositionId;
  },
};
</script>
<style lang="less" scoped>
.ivu-icon,
.ivu-icon-ios-alert-outline {
  font-size: 24px;
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
