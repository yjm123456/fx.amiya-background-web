<template>
  <div class="content">
    <Modal
      title="详情"
      v-model="detailModels"
      width="100%"
      fullscreen
      @on-visible-change="handleModalVisibleChange"
    >
      <div class="top" >
        <div style="display:flex;align-items:center" v-if="employeeType == 'amiyaEmployee'">
          <div>
            <div style="margin-bottom:10px">
              <Input
                v-model="query.keyWord"
                style="width:180px;"
                placeholder="请输入手机号"
                @keyup.enter.native="getFansMeetingDetailsInfo()"
              />
              <DatePicker
                type="date"
                placeholder="预约开始日期"
                style="width: 180px;margin-left: 10px"
                :value="query.startDate"
                v-model="query.startDate"
                transfer
              ></DatePicker>
              <DatePicker
                type="date"
                placeholder="预约结束日期"
                style="width: 180px; margin-left: 10px"
                :value="query.endDate"
                v-model="query.endDate"
                transfer
              ></DatePicker>
              <Select
                v-model="query.isToHospital"
                placeholder="请选择到院状态"
                filterable
                style="width:180px;margin-left:10px"
              >
                <Option
                  v-for="item in isHospitalList"
                  :value="item.type"
                  :key="item.type"
                  >{{ item.name }}</Option
                >
              </Select>
              <Select
                v-model="query.isDeal"
                placeholder="请选择成交状态"
                filterable
                style="width:180px;margin-left:10px"
              >
                <Option
                  v-for="item in isDealList"
                  :value="item.type"
                  :key="item.type"
                  >{{ item.name }}</Option
                >
              </Select>
            </div>
            <div>
              <Select
                v-model="query.amiyaEmployeeId"
                placeholder="请选择啊美雅助理"
                filterable
                style="width:180px;"
              >
                <Option
                  v-for="(item,index) in employeeListAll"
                  :value="item.id"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
              <Select
                v-model="query.customerQuantity"
                placeholder="请选择客户质量状态"
                filterable
                style="width:180px;margin-left:10px"
              >
                <Option
                  v-for="(item,index) in customerQuantityListAll"
                  :value="item.type"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
              <Select
                v-model="query.isOdCustomer"
                placeholder="请选择新老客"
                filterable
                style="width:180px;margin-left:10px"
              >
                <Option
                  v-for="(item,index) in isCustomerLisAll"
                  :value="item.type"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
              <Input
                v-model="query.startDealPrice"
                style="width:180px;margin-left:10px"
                placeholder="最小消费金额"
                type="number"
                number
              />
              <Input
                v-model="query.endDealPrice"
                style="width:180px;margin-left:10px"
                placeholder="最大消费金额"
                type="number"
                number
              />
            </div>
          </div>
          <div>
            <Button
              type="primary"
              style="margin-left: .625rem"
              @click="getFansMeetingDetailsInfo()"
              >查询</Button
            >
          </div>
        </div>
        <div v-else></div>
        <div>
          <Button type="primary" @click="fansMeetingDetailModel = true" style="text-align:end">添加</Button
          >
        </div>
      </div>
      <div>
        <Table border :columns="employeeType == 'amiyaEmployee' ? query.columns : query.columns2" :data="query.data" ></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-sizer
          :page-size-opts="[10, 50, 100, 500]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
      <Modal
        :title="title"
        footer-hide
        v-model="fansMeetingDetailModel"
        width="55%"
        :closable="false"
      >
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidate"
          label-position="left"
          :label-width="110"
        >
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="粉丝见面会" prop="fansMeetingId">
                <Select
                  v-model="form.fansMeetingId"
                  placeholder="请选择粉丝见面会"
                  filterable
                  :disabled="title == '添加' ||  employeeType == 'hospitalEmployee'"
                >
                  <Option
                    v-for="item in fansMeetingList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="预约时间" prop="appointmentDate">
                <!-- <DatePicker type="datetime" placeholder="请选择日期和时间" format="yyyy-MM-dd HH:mm" v-model="form.appointmentDate" style="width:100%"></DatePicker> -->
                <DatePicker
                  type="date"
                  placeholder="预约时间"
                  :value="form.appointmentDate"
                  v-model="form.appointmentDate"
                  style="width:100%"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="详细时间" prop="appointmentDetailsDate">
                <!-- <DatePicker type="datetime" placeholder="请选择日期和时间" format="yyyy-MM-dd HH:mm" v-model="form.appointmentDate" style="width:100%"></DatePicker> -->
                <Time-picker
                  :value="form.appointmentDetailsDate"
                  format="HH:mm"
                  type="timerange"
                  placement="bottom-end"
                  placeholder="选择医院营业时间"
                  style="width: 100%"
                  @on-change="appointmentDetailsDateTime"
                  @on-clear="form.appointmentDetailsDate = []"
                ></Time-picker>
              </FormItem>
            </Col>
            <!--  -->
            <Col span="8">
              <FormItem label="客户名称" prop="customerName">
                <Input
                  v-model="form.customerName"
                  placeholder="请输入客户名称"
                  :disabled="title == '编辑' && employeeType == 'hospitalEmployee'"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="手机号" prop="phone">
                <Input v-model="form.phone" placeholder="请输入手机号" :disabled="title == '编辑' && employeeType == 'hospitalEmployee'"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="客户质量" prop="customerQuantity">
                <Select
                  v-model="form.customerQuantity"
                  placeholder="请选择客户质量"
                  filterable
                >
                  <Option
                    v-for="item in customerQuantityList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="新老客" prop="isOldCustomer">
                <Select
                  v-model="form.isOldCustomer"
                  placeholder="请选择新老客"
                  filterable
                  :disabled="title == '编辑' && employeeType == 'hospitalEmployee'"
                >
                  <Option
                    v-for="item in isOldCustomerList"
                    :value="item.type"
                    :key="item.type"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="啊美雅助理" prop="amiyaConsulationId">
                <Select
                  v-model="form.amiyaConsulationId"
                  placeholder="请选择啊美雅助理"
                  filterable
                  :disabled="isDirector == 'false' || employeeType == 'hospitalEmployee'"
                >
                  <Option
                    v-for="item in employeeType == 'amiyaEmployee' ? employeeList : employeeListHospital"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="医院现场咨询" prop="hospitalConsulationName">
                <Input
                  v-model="form.hospitalConsulationName"
                  placeholder="请输入医院现场咨询"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="城市" prop="city">
                <Input v-model="form.city" placeholder="请输入城市"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="行程信息" prop="travelInformation">
                <Input
                  v-model="form.travelInformation"
                  placeholder="请输入行程信息"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="是否接车" prop="isNeedDriver">
                <Select
                  v-model="form.isNeedDriver"
                  placeholder="请选择是否接车"
                  filterable
                >
                  <Option
                    v-for="item in isNeedDriverList"
                    :value="item.type"
                    :key="item.type"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="酒店安排" prop="hotelPlan">
                <Input
                  v-model="form.hotelPlan"
                  placeholder="请输入酒店安排"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="预估消费(w)" prop="planConsumption">
                <Input
                  v-model="form.planConsumption"
                  placeholder="请输入预估消费(w)"
                  type="number"
                  number
                ></Input>
              </FormItem>
            </Col>
            <Col span="8" v-if="this.title == '编辑'">
              <FormItem label="实际消费" prop="cumulativeDealPrice">
                <Input
                  v-model="form.cumulativeDealPrice"
                  placeholder="请输入实际消费"
                  type="number"
                  number
                  :disabled="title == '编辑' && employeeType == 'hospitalEmployee'"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8" v-if="this.title == '编辑'">
              <FormItem label="是否到院" prop="isToHospital">
                <Select
                  v-model="form.isToHospital"
                  placeholder="请选择是否到院"
                  filterable
                  :disabled="title == '编辑' && employeeType == 'hospitalEmployee'"
                >
                  <Option
                    v-for="item in isHospitalList2"
                    :value="item.type"
                    :key="item.type"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8" v-if="this.title == '编辑'">
              <FormItem label="是否成交" prop="isDeal">
                <Select
                  v-model="form.isDeal"
                  placeholder="请选择是否成交"
                  filterable
                  :disabled="title == '编辑' && employeeType == 'hospitalEmployee'"
                >
                  <Option
                    v-for="item in isDealList2"
                    :value="item.type"
                    :key="item.type"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            
            <Col span="8">
              <FormItem label="顾客照片" prop="imageUrl" key="imageUrl">
                <upload
                  :uploadObj="uploadObj"
                  @uploadChange="handleUploadChange"
                />
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label="备注" prop="remark">
                <Input
                  v-model="form.remark"
                  placeholder="请输入备注"
                  type="textarea"
                  :rows="2"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div class="footer">
          <Button @click="cancel2('form')" style="margin-right: 10px"
            >取消</Button
          >
          <Button type="primary" @click="handleSubmit('form')">确定</Button>
        </div>
      </Modal>
      <div slot="footer" class="footer">
        <Button @click="cancel" style="margin-right: 10px">取消</Button>
      </div>
      <!-- 查看图片 -->
      <viewImg :viewPicModel.sync="viewPicModel" :customerPictureUrl="customerPictureUrl"/>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/fansMeetingDetails";
import * as orderApi from "@/api/orderManage";
import * as fansMeetingApi from "@/api/fansMeeting";

import upload from "@/components/upload/upload";
import viewImg from "../viewImg/viewImg.vue"
export default {
  components: { upload ,viewImg},
  props: {
    detailModel: Boolean,
    detailParams: Object,
  },
  data() {
    return {
      // 查看图片model
      viewPicModel:false,
      // 查看图片
      customerPictureUrl:'',
      // 是否到院 筛选
      isHospitalList: [
        { type: -1, name: "全部到院状态" },
        { type: "true", name: "已到院" },
        { type: "false", name: "未到院" },
      ],
      // 是否到院 添加/编辑
      isHospitalList2: [
        { type: "true", name: "已到院" },
        { type: "false", name: "未到院" },
      ],
      // 是否成交 筛选
      isDealList: [
        { type: -1, name: "全部成交状态" },
        { type: "true", name: "已成交" },
        { type: "false", name: "未成交" },
      ],
      // 是否成交 添加/编辑
      isDealList2: [
        { type: "true", name: "已成交" },
        { type: "false", name: "未成交" },
      ],
      //客户质量
      customerQuantityListAll: [
        { type: -1, name: "全部客户质量状态" },
        { type: 0, name: "一般" },
        { type: 1, name: "优质" },
      ],
      //全部新老客
      isCustomerLisAll: [
        { type: -1, name: "全部客户状态" },
        { type: "true", name: "老客" },
        { type: "false", name: "新客" },
      ],

      // 是否为 管理员
      isDirector: sessionStorage.getItem("isDirector"),
      employeeType: sessionStorage.getItem("employeeType"),
      detailModels: false,
      //   客户质量
      customerQuantityList: [
        { id: 0, name: "一般" },
        { id: 1, name: "优质" },
      ],
      //   新老客
      isOldCustomerList: [
        { type: "false", name: "新客" },
        { type: "true", name: "老客" },
      ],
      // 是否接车
      isNeedDriverList: [
        { type: "false", name: "不需要接车" },
        { type: "true", name: "需要接车" },
      ],
      //   助理
      employeeList: [],
      //   助理
      employeeListAll: [{ id: -1, name: "全部助理" }],
      //   粉丝见面会数据
      fansMeetingList: [],
      
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      form: {
        // 粉丝见面会id
        fansMeetingId: "",
        // 订单号
        orderIdList: [],
        // 预约时间
        appointmentDate: null,
        // 详情时间
        appointmentDetailsDate: [],
        // 客户名称
        customerName: "",
        // 客户手机号
        phone: "",
        // 客户质量
        customerQuantity: null,
        // 新老客
        isOldCustomer: "",
        // 啊美雅助理
        amiyaConsulationId:
          sessionStorage.getItem("isDirector") == "false"
            ? Number(sessionStorage.getItem("employeeId"))
            : null,
        // 医院现场咨询
        hospitalConsulationName: "",
        // 客户所在城市
        city: "",
        // 行程信息
        travelInformation: "",
        // 是否接车
        isNeedDriver: "",
        // 酒店安排
        hotelPlan: "",
        // 预估消费
        planConsumption: null,
        // 备注
        remark: "",
        // 顾客图片
        customerPictureUrl: "",
        id: "",
        // 实际消费
        cumulativeDealPrice:null,
        // 是否到院
        isToHospital:'',
        // 是否成交
        isDeal:'',
      },
      //添加model
      fansMeetingDetailModel: false,
      //   title
      title: "添加",
      ruleValidate: {
        cumulativeDealPrice: [
          {
            required: true,
            message: "请输入实际消费",
          },
        ],
        isToHospital: [
          {
            required: true,
            message: "请选择是否到院",
          },
        ],
        isDeal: [
          {
            required: true,
            message: "请选择是否成交",
          },
        ],
        fansMeetingId: [
          {
            required: true,
            message: "请选择粉丝见面会",
          },
        ],

        customerName: [
          {
            required: true,
            message: "请输入客户名称",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入客户手机号",
          },
        ],
        customerQuantity: [
          {
            required: true,
            message: "请选择客户质量",
          },
        ],
        amiyaConsulationId: [
          {
            required: true,
            message: "请选择啊美雅助理",
          },
        ],
        isOldCustomer: [
          {
            required: true,
            message: "请选择新老客",
          },
        ],
        isNeedDriver: [
          {
            required: true,
            message: "请选择是否接车",
          },
        ],
        planConsumption: [
          {
            required: true,
            message: "请输入预估消费",
          },
        ],
      },

      // 查询
      query: {
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        isToHospital: -1,
        isDeal: -1,
        amiyaEmployeeId:  -1,
        customerQuantity: -1,
        isOdCustomer: -1,
        startDealPrice: null,
        endDealPrice: null,
        startDate: null,
        endDate: null,
        columns: [
          {
            title: "粉丝见面会名称",
            key: "fansMeetingName",
            minWidth: 160,
            align: "center",
          },
          
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "客户手机号",
            key: "phone",
            minWidth: 160,
            align: "center",
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                // params.row.appointmentDate ? this.$moment(params.row.appointmentDate).format("YYYY-MM-DD") +" " + params.row.appointmentDetailsDate : ""
                !params.row.appointmentDate ? params.row.appointmentDetailsDate : this.$moment(params.row.appointmentDate).format("YYYY-MM-DD") + " " + params.row.appointmentDetailsDate
              );
            },
          },
          {
            title: "预估消费",
            key: "planConsumption",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                // params.row.appointmentDate ? this.$moment(params.row.appointmentDate).format("YYYY-MM-DD") +" " + params.row.appointmentDetailsDate : ""
                params.row.planConsumption + 'w'
              );
            },
          },
          {
            title: "顾客图片",
            key: "customerPictureUrl",
            align: "center",
            minWidth: 120,
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
                    src: params.row.customerPictureUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
            align: "center",
            tooltip: true,
          },
          {
            title: "客户质量",
            key: "customerQuantityText",
            minWidth: 160,
            align: "center",
          },

          {
            title: "新/老客",
            key: "isOldCustomer	",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isOldCustomer == true ? "老客" : "新客"
              );
            },
          },
          {
            title: "啊美雅助理",
            key: "amiyaConsulationName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "医院现场咨询",
            key: "hospitalConsulationName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "客户所在城市",
            key: "city",
            minWidth: 160,
            align: "center",
          },
          {
            title: "行程信息",
            key: "travelInformation",
            minWidth: 160,
            align: "center",
          },
          {
            title: "是否接车",
            key: "isNeedDriver",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isNeedDriver == true ? "需要接车" : "不需要接车"
              );
            },
          },
          {
            title: "酒店安排",
            key: "hotelPlan",
            minWidth: 160,
            align: "center",
          },
          {
            title: "实际消费",
            key: "cumulativeDealPrice",
            minWidth: 160,
            align: "center",
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isToHospital == true ? "已到院" : "未到院"
              );
            },
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isDeal == true ? "已成交" : "未成交"
              );
            },
          },
          

          {
            title: "操作",
            key: "",
            width: 230,
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
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { customerPictureUrl } = params.row;
                        if(!customerPictureUrl){
                          this.$Message.warning('暂无图片！')
                          return
                        }
                        this.customerPictureUrl = customerPictureUrl
                        this.viewPicModel = true
                      },
                    },
                  },
                  "查看图片"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:sessionStorage.getItem('employeeType') == 'amiyaEmployee' && params.row.amiyaConsulationId != Number(sessionStorage.getItem('employeeId'))
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id,amiyaConsulationName } = params.row;
                        if(amiyaConsulationName == '医院账户'){
                          this.$Message.warning({
                            content:"当前顾客是医院添加，如需修改请联系医院！",
                            duration: 3,
                          });
                          return
                        }
                        this.title = "编辑";
                        api.byIdFansMeetingDetails(id).then((res) => {
                          if (res.code === 0) {
                            this.fansMeetingDetailModel = true;
                            const {
                              id,
                              fansMeetingId,
                              appointmentDate,
                              appointmentDetailsDate,
                              customerName,
                              phone,
                              customerQuantity,
                              isOldCustomer,
                              amiyaConsulationId,
                              hospitalConsulationName,
                              city,
                              travelInformation,
                              isNeedDriver,
                              hotelPlan,
                              planConsumption,
                              remark,
                              customerPictureUrl,
                              isToHospital,
                              isDeal,
                              cumulativeDealPrice
                            } = res.data.fansMeetingDetails;
                            this.form.id = id;
                            this.form.fansMeetingId = fansMeetingId;
                            this.form.appointmentDate = appointmentDate
                              ? this.$moment(appointmentDate).format(
                                  "YYYY-MM-DD"
                                )
                              : null;
                            this.form.appointmentDetailsDate = appointmentDetailsDate.split(
                              "-"
                            );
                            this.form.isToHospital = isToHospital == true ? 'true' : 'false';
                            this.form.isDeal = isDeal == true ? 'true' : 'false';
                            this.form.cumulativeDealPrice = cumulativeDealPrice;
                            this.form.customerName = customerName;
                            this.form.phone = phone;
                            this.form.customerQuantity = customerQuantity;
                            this.form.isOldCustomer = String(isOldCustomer);
                            this.form.amiyaConsulationId = amiyaConsulationId;
                            this.form.hospitalConsulationName = hospitalConsulationName;
                            this.form.city = city;
                            this.form.travelInformation = travelInformation;
                            this.form.isNeedDriver = String(isNeedDriver);
                            this.form.hotelPlan = hotelPlan;
                            this.form.planConsumption = planConsumption;
                            this.form.remark = remark;
                            this.form.customerPictureUrl = customerPictureUrl;
                            this.uploadObj.uploadList = customerPictureUrl
                              ? [this.form.customerPictureUrl]
                              : [];
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
                            api.deleteFansMeetingDetails(id).then((res) => {
                              if (res.code === 0) {
                                this.getFansMeetingDetailsInfo();
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
        columns2: [
          {
            title: "粉丝见面会名称",
            key: "fansMeetingName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "客户昵称",
            key: "customerName",
            minWidth: 140,
            align: "center",
          },
          {
            title: "客户手机号",
            key: "phone",
            minWidth: 160,
            align: "center",
          },
          {
            title: "预约时间",
            key: "appointmentDate",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.appointmentDate
                  ? this.$moment(params.row.appointmentDate).format(
                      "YYYY-MM-DD"
                    ) +
                      " " +
                      params.row.appointmentDetailsDate
                  : ""
              );
            },
          },
          {
            title: "预估消费",
            key: "planConsumption",
            minWidth: 200,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                // params.row.appointmentDate ? this.$moment(params.row.appointmentDate).format("YYYY-MM-DD") +" " + params.row.appointmentDetailsDate : ""
                params.row.planConsumption + 'w'
              );
            },
          },
          {
            title: "顾客图片",
            key: "customerPictureUrl",
            align: "center",
            minWidth: 120,
            render: (h, params) => {
              return h("viewer", {}, [
                params.row.customerPictureUrl
                  ? h("img", {
                      style: {
                        width: "50px",
                        height: "50px",
                        margin: "5px 0",
                        verticalAlign: "middle",
                      },
                      attrs: {
                        src: params.row.customerPictureUrl,
                      },
                    })
                  : "",
              ]);
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
            align: "center",
          },
          {
            title: "客户质量",
            key: "customerQuantityText",
            minWidth: 160,
            align: "center",
          },

          {
            title: "新/老客",
            key: "isOldCustomer	",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isOldCustomer == true ? "老客" : "新客"
              );
            },
          },
          {
            title: "啊美雅助理",
            key: "amiyaConsulationName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "医院现场咨询",
            key: "hospitalConsulationName",
            minWidth: 160,
            align: "center",
          },
          {
            title: "客户所在城市",
            key: "city",
            minWidth: 160,
            align: "center",
          },
          {
            title: "行程信息",
            key: "travelInformation",
            minWidth: 160,
            align: "center",
          },
          {
            title: "是否接车",
            key: "isNeedDriver",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.isOldCustomer == true ? "需要接车" : "不需要接车"
              );
            },
          },
          {
            title: "酒店安排",
            key: "hotelPlan",
            minWidth: 160,
            align: "center",
          },
          
          
          
          {
            title: "操作",
            key: "",
            width: 100,
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
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id ,amiyaConsulationName } = params.row;
                        if(amiyaConsulationName != '医院账户'){
                          this.$Message.warning({
                            content:"当前顾客不是该医院添加，如需修改请联系啊美雅！",
                            duration: 3,
                          });
                          return
                        }
                        this.title = "编辑";
                        api.byIdFansMeetingDetails(id).then((res) => {
                          if (res.code === 0) {
                            this.fansMeetingDetailModel = true;
                            const {
                              id,
                              fansMeetingId,
                              appointmentDate,
                              appointmentDetailsDate,
                              customerName,
                              phone,
                              customerQuantity,
                              isOldCustomer,
                              amiyaConsulationId,
                              hospitalConsulationName,
                              city,
                              travelInformation,
                              isNeedDriver,
                              hotelPlan,
                              planConsumption,
                              remark,
                              customerPictureUrl,
                              isToHospital,
                              isDeal,
                              cumulativeDealPrice
                            } = res.data.fansMeetingDetails;
                            this.form.id = id;
                            this.form.fansMeetingId = fansMeetingId;
                            this.form.appointmentDate = appointmentDate
                              ? this.$moment(appointmentDate).format(
                                  "YYYY-MM-DD"
                                )
                              : null;
                            this.form.appointmentDetailsDate = appointmentDetailsDate.split(
                              "-"
                            );
                            this.form.isToHospital = isToHospital == true ? 'true' : 'false';
                            this.form.isDeal = isDeal == true ? 'true' : 'false';
                            this.form.cumulativeDealPrice = cumulativeDealPrice;
                            this.form.customerName = customerName;
                            this.form.phone = phone;
                            this.form.customerQuantity = customerQuantity;
                            this.form.isOldCustomer = String(isOldCustomer);
                            this.form.amiyaConsulationId = amiyaConsulationId;
                            this.form.hospitalConsulationName = hospitalConsulationName;
                            this.form.city = city;
                            this.form.travelInformation = travelInformation;
                            this.form.isNeedDriver = String(isNeedDriver);
                            this.form.hotelPlan = hotelPlan;
                            this.form.planConsumption = planConsumption;
                            this.form.remark = remark;
                            this.form.customerPictureUrl = customerPictureUrl;
                            this.uploadObj.uploadList = customerPictureUrl
                              ? [this.form.customerPictureUrl]
                              : [];
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
      employeeListHospital:[{id:266,name:'医院'}]
    };
  },
  methods: {
    // 详细时间
    appointmentDetailsDateTime(data) {
      if (!data) return;
      this.form.appointmentDetailsDate = data;
    },
    // 图片
    handleUploadChange(values) {
      this.form.customerPictureUrl = values[0];
    },
    // 获取客服列表
    getCustomerServiceLists() {
      orderApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeList = employee;
          this.employeeListAll = [...this.employeeListAll, ...employee];
        }
      });
    },
    // 获取有效的粉丝见面会信息 下拉框
    getValidKeyAndValues() {
      fansMeetingApi.getValidKeyAndValue().then((res) => {
        if (res.code === 0) {
          const { fansMeeting } = res.data;
          this.fansMeetingList = fansMeeting;
        }
      });
    },
    // 获取粉丝见面会详情列表
    getFansMeetingDetailsInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyWord ,isToHospital,isDeal,amiyaEmployeeId,customerQuantity,isOdCustomer,startDealPrice,endDealPrice,startDate,endDate} = this.query;
      const data = {
        pageNum,
        pageSize,
        fansMeetingId: this.detailParams.id,
        keyWord,
        isToHospital:isToHospital == -1 ? null : isToHospital,
        isDeal:isDeal == -1 ? null : isDeal,
        amiyaEmployeeId:amiyaEmployeeId == -1 ? null : amiyaEmployeeId,
        customerQuantity:customerQuantity == -1 ? null : customerQuantity,
        isOdCustomer:isOdCustomer == -1 ? null : isOdCustomer,
        startDealPrice,
        endDealPrice,
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      // 啊美雅系统展示
      if(sessionStorage.getItem('employeeType') == 'amiyaEmployee'){
        api.getFansMeetingDetails(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.fansMeetingDetails;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
      }else{
        // 医院端展示列表
        api.getFansMeetingDetailsHospital(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.fansMeetingDetails;
            this.query.data = list;
            this.query.totalCount= totalCount;
          }
        });
      }
      
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getFansMeetingDetailsInfo();
    },
    // 获取粉丝见面会详情列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyWord  ,isToHospital,isDeal,amiyaEmployeeId,customerQuantity,isOdCustomer,startDealPrice,endDealPrice,startDate,endDate} = this.query;
      const data = {
        pageNum,
        pageSize,
        fansMeetingId: this.detailParams.id,
        keyWord,
        isToHospital:isToHospital == -1 ? null : isToHospital,
        isDeal:isDeal == -1 ? null : isDeal,
        amiyaEmployeeId:amiyaEmployeeId == -1 ? null : amiyaEmployeeId,
        customerQuantity:customerQuantity == -1 ? null : customerQuantity,
        isOdCustomer:isOdCustomer == -1 ? null : isOdCustomer,
        startDealPrice,
        endDealPrice,
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      // 啊美雅端展示列表数据
      if(sessionStorage.getItem('employeeType') == 'amiyaEmployee'){
        api.getFansMeetingDetails(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.fansMeetingDetails;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
      }else{
        // 医院端展示列表
        api.getFansMeetingDetailsHospital(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.fansMeetingDetails;
            this.query.data = list;
            this.query.totalCount = totalCount;
          }
        });
      }
      
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.title == "编辑") {
            const {
              fansMeetingId,
              orderIdList,
              appointmentDate,
              customerName,
              phone,
              customerQuantity,
              isOldCustomer,
              amiyaConsulationId,
              hospitalConsulationName,
              city,
              travelInformation,
              isNeedDriver,
              hotelPlan,
              planConsumption,
              remark,
              customerPictureUrl,
              id,
              appointmentDetailsDate,
              isDeal,
              isToHospital,
              cumulativeDealPrice
            } = this.form;
            const data = {
              fansMeetingId,
              orderIdList,
              appointmentDate: appointmentDate
                ? this.$moment(appointmentDate).format("YYYY-MM-DD")
                : null,
              appointmentDetailsDate:
                appointmentDetailsDate == "" || appointmentDetailsDate == []
                  ? ""
                  : appointmentDetailsDate.join("-"),
              customerName,
              phone,
              customerQuantity,
              isOldCustomer: isOldCustomer == "true" ? true : false,
              amiyaConsulationId,
              hospitalConsulationName,
              city,
              travelInformation,
              isNeedDriver: isNeedDriver == "true" ? true : false,
              hotelPlan,
              planConsumption,
              remark,
              customerPictureUrl,
              id,
              isDeal:isDeal == 'true' ? true : false,
              isToHospital:isToHospital == 'true' ? true : false,
              cumulativeDealPrice
            };
            api.editFansMeetingDetails(data).then((res) => {
              if (res.code == 0) {
                this.$Message.success("编辑成功");
                this.cancel2("form");
                this.getFansMeetingDetailsInfo();
              }
            });
          } else {
            const {
              fansMeetingId,
              orderIdList,
              appointmentDate,
              customerName,
              phone,
              customerQuantity,
              isOldCustomer,
              amiyaConsulationId,
              hospitalConsulationName,
              city,
              travelInformation,
              isNeedDriver,
              hotelPlan,
              planConsumption,
              remark,
              customerPictureUrl,
              appointmentDetailsDate,
            } = this.form;
            const data = {
              fansMeetingId,
              orderIdList,
              appointmentDate: appointmentDate
                ? this.$moment(appointmentDate).format("YYYY-MM-DD")
                : null,
              appointmentDetailsDate:
                appointmentDetailsDate == "" || appointmentDetailsDate == []
                  ? ""
                  : appointmentDetailsDate.join("-"),
              customerName,
              phone,
              customerQuantity,
              isOldCustomer: isOldCustomer == "true" ? true : false,
              amiyaConsulationId,
              hospitalConsulationName,
              city,
              travelInformation,
              isNeedDriver: isNeedDriver == "true" ? true : false,
              hotelPlan,
              planConsumption,
              remark,
              customerPictureUrl,
            };
            api.addFansMeetingDetails(data).then((res) => {
              if (res.code == 0) {
                this.$Message.success("添加成功");
                this.cancel2("form");
                this.getFansMeetingDetailsInfo();
              }
            });
          }
        }
      });
    },
    // 取消
    cancel(name) {
      this.$emit("update:detailModel", false);
    },
    cancel2(name) {
      this.fansMeetingDetailModel = false;
      this.$refs[name].resetFields();
      this.uploadObj.uploadList = [];
      this.title = "添加";
      if (this.title == "添加") {
        this.form.fansMeetingId = this.detailParams.id;
      }
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
        this.cancel2("form");
        this.$emit("update:detailModel", false);
      }
    },
  },
  watch: {
    detailModel: {
      handler(detailModel) {
        this.detailModels = detailModel;
        if (detailModel == true) {
          this.getFansMeetingDetailsInfo();
          if(sessionStorage.getItem('employeeType') == 'amiyaEmployee'){
            this.getCustomerServiceLists();
          }
          this.getValidKeyAndValues();
          
        }
        if (this.title == "添加") {
          this.form.fansMeetingId = this.detailParams.id;
        }
        if(sessionStorage.getItem("employeeType") == 'hospitalEmployee'){
          this.form.amiyaConsulationId = 266
        }
        
      },
      immediate: true,
    },
  },
};
</script>
<style scoped lang="less">
.page_wrap,
.footer {
  text-align: end;
  margin-top: 10px;
}
.top {
  margin-bottom: 10px;
  // text-align: end;
  display: flex;
  justify-content: space-between;
}
</style>
