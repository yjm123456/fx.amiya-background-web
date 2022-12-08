<template>
  <div>
    <div class="header_wrap">
      <div class="left">
        <span>总派单数：</span>
        <Input
          v-model="indicatorOrderForm.allSendorderCount"
          placeholder="请输入总派单数"
          style="width:160px;margin-right:10px"
          type="number"
          number
          :disabled="employeeType == 'amiyaEmployee'"
        ></Input>
        <span>本地派单：</span>
        <Input
          v-model="indicatorOrderForm.localSendorderCount"
          placeholder="请输入本地派单"
          style="width:160px;margin-right:10px"
          type="number"
          number
          :disabled="employeeType == 'amiyaEmployee'"
        ></Input>
        <span>外地派单：</span>
        <Input
          v-model="indicatorOrderForm.otherPlaceSendorderCount"
          placeholder="请输入外地派单"
          style="width:160px;margin-right:10px"
          type="number"
          number
          :disabled="employeeType == 'amiyaEmployee'"
        ></Input>
        <span>无效派单：</span>
        <Input
          v-model="indicatorOrderForm.invalidSendorderCount"
          placeholder="请输入无效派单"
          style="width:160px;margin-right:10px"
          type="number"
          number
          :disabled="employeeType == 'amiyaEmployee'"
        ></Input>
        <span>疫情影响：</span>
        <Input
          v-model="indicatorOrderForm.epidemicCount"
          placeholder="请输入疫情影响"
          style="width:160px;margin-right:10px"
          type="number"
          number
          :disabled="employeeType == 'amiyaEmployee'"
        ></Input>
        <span>其他问题：</span>
        <Input
          v-model="indicatorOrderForm.otherQuestion"
          placeholder="请输入其他问题"
          style="width:160px;margin-right:10px"
          :disabled="employeeType == 'amiyaEmployee'"
        ></Input>
        <Button type="primary" @click="messageSubmite" v-if="employeeType == 'hospitalEmployee'">提交</Button>
        <div class="button_con">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            v-if="employeeType == 'hospitalEmployee'"
            >添加</Button
          >
          <Button
            type="primary"
            @click="exportHospitalConsulationOperationDataClick"
            v-if="employeeType == 'hospitalEmployee'"
            style="margin-left: 10px"
            >导出模板</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="importControlModal = true"
            v-if="employeeType == 'hospitalEmployee'"
            >导入</Button
          >
        </div>
      </div>
      <div class="right"></div>
    </div>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
        <div class="price_con">
          <div class="num">新客业绩总额：<span>{{query.newCustomerDealPriceNum}}</span></div>    
          <div class="num">新客客单价总额：<span>{{query.newCustomerUnitPriceNum}}</span></div>
          <div class="num">老客业绩总额：<span>{{query.oldCustomerDealPriceNum}}</span></div>
          <div class="num">老客客单价总额：<span>{{query.oldCustomerUnitPriceNum}}</span></div>
          <div class="num">总业绩总额：<span>{{query.lasttMonthTotalAchievementNum}}</span></div>
          <div class="num">总条数：<span>{{query.totalNum}}</span></div>
        </div>
        <div class="bottom">
            <div class="company">本表单位为：千元（K）</div>
          </div>
      </div>
    </Card>

    <Modal
      v-model="controlModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="咨询师" prop="consulationName">
              <Input
                v-model="form.consulationName"
                placeholder="请输入咨询师"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="科室" prop="sectionOffice">
              <Select
                v-model="form.sectionOffice"
                placeholder="请选择科室"
                filterable
              >
                <Option
                  v-for="item in AmiyaHospitalDepartmentListDepartment"
                  :value="item.departmentName"
                  :key="item.departmentName"
                  >{{ item.departmentName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="派单数" prop="sendOrderNum">
              <Input
                v-model="form.sendOrderNum"
                placeholder="请输入派单数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客上门数" prop="newCustomerVisitNum">
              <Input
                v-model="form.newCustomerVisitNum"
                placeholder="请输入新客上门数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客上门率(%)" prop="newCustomerVisitRate">
              <Input
                v-model="form.newCustomerVisitRate"
                placeholder="请输入新客上门率"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客成交数" prop="newCustomerDealNum">
              <Input
                v-model="form.newCustomerDealNum"
                placeholder="请输入新客成交数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客成交率(%)" prop="newCustomerDealRate">
              <Input
                v-model="form.newCustomerDealRate"
                placeholder="请输入新客成交率"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客业绩（k）" prop="newCustomerDealPrice">
              <Input
                v-model="form.newCustomerDealPrice"
                placeholder="请输入新客业绩（k）"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新客客单价（k）" prop="newCustomerUnitPrice">
              <Input
                v-model="form.newCustomerUnitPrice"
                placeholder="请输入新客客单价（k）"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客上门数" prop="oldCustomerVisitNum">
              <Input
                v-model="form.oldCustomerVisitNum"
                placeholder="请输入老客上门数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客成交数" prop="oldCustomerDealNum">
              <Input
                v-model="form.oldCustomerDealNum"
                placeholder="请输入老客成交数"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="老客成交率(%)" prop="oldCustomerDealRate">
              <Input
                v-model="form.oldCustomerDealRate"
                placeholder="请输入老客成交率"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客业绩（k）" prop="oldCustomerDealPrice">
              <Input
                v-model="form.oldCustomerDealPrice"
                placeholder="请输入老客业绩（k）"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="老客客单价（k）" prop="oldCustomerUnitPrice">
              <Input
                v-model="form.oldCustomerUnitPrice"
                placeholder="请输入老客客单价（k）"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="总业绩（k）" prop="lasttMonthTotalAchievement">
              <Input
                v-model="form.lasttMonthTotalAchievement"
                placeholder="请输入总业绩（k）"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="老客业绩占比(%)" prop="oldCustomerAchievementRate">
              <Input
                v-model="form.oldCustomerAchievementRate"
                placeholder="请输入老客业绩占比"
                type="number"
                number
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
    <!-- 导入 -->
    <importFile
      :importControlModal.sync="importControlModal"
      @handleRefreshCustomerTrackList="getHospitalInfo()"
      title="本机构咨询师运营数据分析"
    ></importFile>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import * as orderApi from "@/api/orderManage";

import { download } from "@/utils/util";
import importFile from "./import/importModel.vue";

export default {
  props: {
    active: String,
    hospitalId: Number,
    indicatorsId: String,
  },
  components: {
    importFile,
  },
  data() {
    return {
      indicatorOrderForm:{
        // 指标id
        indicatorId:'',
        // 医院id
        hospitalId:null,
        // 总派单数
        allSendorderCount:null,
        // 本地派单数
        localSendorderCount:null,
        // 外地派单数
        otherPlaceSendorderCount:null,
        // 无效派单数
        invalidSendorderCount:null,
        // 疫情影响
        epidemicCount:null,
        // 其他问题
        otherQuestion:'',
        // 判断是否填写基本信息
        isFlag:false
      },
      // 科室
      AmiyaHospitalDepartmentListDepartment: [],
      // 导入 model
      importControlModal: false,
      // 查询
      query: {
        keyword: "",
        indicatorsId: "",
        hospitalId: null,
        columns: [
          {
            title: "科室",
            key: "sectionOffice",
            width: 150,
          },
          {
            title: "咨询师",
            key: "consulationName",
            width: 150,
          },
          
          {
            title: "派单数",
            key: "sendOrderNum",
            width: 100,
          },
          {
            title: "新客上门数",
            key: "newCustomerVisitNum",
            width: 120,
          },
          {
            title: "新客上门率",
            key: "newCustomerVisitRate",
            width: 140,
            render: (h, params) => {
              return h("div", params.row.newCustomerVisitRate + "%");
            },
          },
          {
            title: "新客成交数",
            key: "newCustomerDealNum",
            width: 120,
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            width: 120,
            render: (h, params) => {
              return h("div", params.row.newCustomerDealRate + "%");
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerDealPrice",
            width: 140,
          },
          {
            title: "新客客单价",
            key: "newCustomerUnitPrice",
            width: 120,
          },
          {
            title: "老客上门数",
            key: "oldCustomerVisitNum",
            width: 120,
          },
          {
            title: "老客成交数",
            key: "oldCustomerDealNum",
            width: 120,
          },
          {
            title: "老客成交率",
            key: "oldCustomerDealRate",
            width: 140,
            render: (h, params) => {
              return h("div", params.row.oldCustomerDealRate + "%");
            },
          },

          {
            title: "老客业绩",
            key: "oldCustomerDealPrice",
            width: 150,
          },
          {
            title: "老客客单价",
            key: "oldCustomerUnitPrice",
            width: 120,
          },
          {
            title: "总业绩",
            key: "lasttMonthTotalAchievement",
            width: 150,
          },
          {
            title: "老客业绩占比",
            key: "oldCustomerAchievementRate",
            width: 150,
            render: (h, params) => {
              return h("div", params.row.oldCustomerAchievementRate + "%");
            },
          },
          {
            title: "操作",
            key: "",
            fixed: "right",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:
                        sessionStorage.getItem("employeeType") ==
                        "amiyaEmployee",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api
                          .byIdHospitalConsulationOperationData(id)
                          .then((res) => {
                            if (res.code === 0) {
                              const {
                                id,
                                indicatorId,
                                hospitalId,
                                consulationName,
                                sendOrderNum,
                                newCustomerVisitNum,
                                newCustomerVisitRate,

                                newCustomerDealNum,
                                newCustomerDealRate,
                                newCustomerDealPrice,
                                newCustomerUnitPrice,
                                oldCustomerVisitNum,
                                oldCustomerDealNum,
                                oldCustomerDealRate,
                                oldCustomerDealPrice,
                                oldCustomerUnitPrice,
                                oldCustomerAchievementRate,
                                lasttMonthTotalAchievement,
                                sectionOffice
                              } = res.data.hospitalOperationDataInfo;
                              this.isEdit = true;
                              this.form.indicatorId = indicatorId;
                              this.form.hospitalId = hospitalId;
                              this.form.consulationName = consulationName;
                              this.form.sendOrderNum = sendOrderNum;
                              this.form.newCustomerVisitNum = newCustomerVisitNum;
                              this.form.newCustomerDealNum = newCustomerDealNum;
                              this.form.newCustomerDealRate = newCustomerDealRate;
                              this.form.newCustomerDealPrice = newCustomerDealPrice;
                              this.form.newCustomerUnitPrice = newCustomerUnitPrice;
                              this.form.oldCustomerDealNum = oldCustomerDealNum;
                              this.form.oldCustomerVisitNum = oldCustomerVisitNum;
                              this.form.oldCustomerDealRate = oldCustomerDealRate;
                              this.form.oldCustomerDealPrice = oldCustomerDealPrice;
                              this.form.oldCustomerUnitPrice = oldCustomerUnitPrice;
                              this.form.oldCustomerAchievementRate = oldCustomerAchievementRate;
                              this.form.lasttMonthTotalAchievement = lasttMonthTotalAchievement;
                              this.form.newCustomerVisitRate = newCustomerVisitRate;
                              this.form.sectionOffice = sectionOffice;
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
                      disabled:
                        sessionStorage.getItem("employeeType") ==
                        "amiyaEmployee",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api
                              .deleteHospitalConsulationOperationData(id)
                              .then((res) => {
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
        newCustomerDealPriceNum:0, 
        newCustomerUnitPriceNum:0, 
        oldCustomerDealPriceNum:0, 
        oldCustomerUnitPriceNum:0, 
        lasttMonthTotalAchievementNum:0,
        totalNum:0
      },
      employeeType: sessionStorage.getItem("employeeType"),
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id: "",
        indicatorId: "",
        hospitalId: null,
        // 咨询师
        consulationName: "",
        // 派单数
        sendOrderNum: null,
        // 新客上门数
        newCustomerVisitNum: null,
        // 新客上门率
        newCustomerVisitRate: null,
        // 新客成交数
        newCustomerDealNum: null,
        // 新客成交率
        newCustomerDealRate: null,
        // 新客业绩
        newCustomerDealPrice: null,
        // 新客客单价
        newCustomerUnitPrice: null,
        // 老客上门数
        oldCustomerVisitNum: null,
        // 老客成交数
        oldCustomerDealNum: null,
        // 老客成交率
        oldCustomerDealRate: null,
        // 老客业绩
        oldCustomerDealPrice: null,
        // 老客客单价
        oldCustomerUnitPrice: null,
        // 老客业绩占比
        oldCustomerAchievementRate: null,
        // 总业绩
        lasttMonthTotalAchievement: null,
        // 科室
        sectionOffice: "",
      },

      ruleValidate: {
        sectionOffice: [
          {
            required: true,
            message: "请选择科室",
          },
        ],
        consulationName: [
          {
            required: true,
            message: "请输入咨询师",
          },
        ],
        sendOrderNum: [
          {
            required: true,
            message: "请输入派单数",
          },
        ],
        newCustomerVisitNum: [
          {
            required: true,
            message: "请输入新客上门数",
          },
        ],
        newCustomerVisitRate: [
          {
            required: true,
            message: "请输入新客上门率",
          },
        ],
        newCustomerDealNum: [
          {
            required: true,
            message: "请输入新客成交数",
          },
        ],
        newCustomerDealRate: [
          {
            required: true,
            message: "请输入新客成交率",
          },
        ],
        newCustomerDealPrice: [
          {
            required: true,
            message: "请输入新客业绩",
          },
        ],
        newCustomerUnitPrice: [
          {
            required: true,
            message: "请输入新客客单价",
          },
        ],
        oldCustomerVisitNum: [
          {
            required: true,
            message: "请输入老客上门数",
          },
        ],
        oldCustomerDealNum: [
          {
            required: true,
            message: "请输入老客成交数",
          },
        ],

        oldCustomerDealRate: [
          {
            required: true,
            message: "请输入老客成交率",
          },
        ],

        oldCustomerDealPrice: [
          {
            required: true,
            message: "请输入老客业绩",
          },
        ],

        oldCustomerUnitPrice: [
          {
            required: true,
            message: "请输入老客客单价",
          },
        ],
        oldCustomerAchievementRate: [
          {
            required: true,
            message: "请输入老客业绩占比",
          },
        ],
        lasttMonthTotalAchievement: [
          {
            required: true,
            message: "请输入总业绩",
          },
        ],
      },
    };
  },
  methods: {
    
    // 基本信息提交
    messageSubmite() {
      const {indicatorId,hospitalId,allSendorderCount,localSendorderCount,otherPlaceSendorderCount,
      invalidSendorderCount,epidemicCount,otherQuestion} = this.indicatorOrderForm
      const data = {
        indicatorId:this.indicatorsId,
        hospitalId:this.hospitalId,
        allSendorderCount,
        localSendorderCount,
        otherPlaceSendorderCount,
        invalidSendorderCount,
        epidemicCount,
        otherQuestion,
      }
      if(!allSendorderCount){
        this.$Message.warning('请输入总派单数')
        return
      }
      if(!localSendorderCount){
        this.$Message.warning('请输入本地派单数')
        return
      }
      if(!otherPlaceSendorderCount){
        this.$Message.warning('请输入外地派单数')
        return
      }
      if(!invalidSendorderCount){
        this.$Message.warning('请输入无效派单数')
        return
      }
      if(!epidemicCount){
        this.$Message.warning('请输入疫情影响')
        return
      }
      api.addIndicatorOrderData(data).then((res) => {
        if(res.code === 0){
          this.$Message.success('提交成功')
          this.getIdMessage()
        }
      })
    },
    // 获取基本信息
    getIdMessage(){
      const data = {
        indicatorId: this.indicatorsId,
        hospitaiId: this.hospitalId,
      };
      api.getIndicatorOrderData(data).then((res) => {
        if (res.code === 0) {
          const { sendOrderData } = res.data;
          if(sendOrderData.indicatorId){
            this.indicatorOrderForm.isFlag = false
          }else { 
            this.indicatorOrderForm.isFlag = true
          }
          this.indicatorOrderForm.allSendorderCount = sendOrderData.allSendorderCount
          this.indicatorOrderForm.localSendorderCount = sendOrderData.localSendorderCount
          this.indicatorOrderForm.otherPlaceSendorderCount = sendOrderData.otherPlaceSendorderCount
          this.indicatorOrderForm.invalidSendorderCount = sendOrderData.invalidSendorderCount
          this.indicatorOrderForm.epidemicCount = sendOrderData.epidemicCount
          this.indicatorOrderForm.otherQuestion = sendOrderData.otherQuestion
          this.indicatorOrderForm.otherQuestion = sendOrderData.otherQuestion
        }
      });
    },
    //   获取科室
    getAmiyaHospitalDepartmentListChange() {
      orderApi.getAmiyaHospitalDepartmentList().then((res) => {
        if (res.code === 0) {
          const { AmiyaHospitalDepartmentList } = res.data;
          this.AmiyaHospitalDepartmentListDepartment = AmiyaHospitalDepartmentList;
        }
      });
    },
    exportHospitalConsulationOperationDataClick() {
      api.exportHospitalConsulationOperationData().then((res) => {
        let name = "机构咨询师运营数据分析模板";
        download(res, name);
      });
    },
    // 获取本机构网咨运营数据列表
    getHospitalInfo() {
      const { indicatorsId, hospitalId, keyword } = this.query;
      const data = {
        indicatorsId: this.indicatorsId,
        hospitalId: this.hospitalId,
        keyword,
      };
      api.getHospitalConsulationOperationData(data).then((res) => {
        if (res.code === 0) {
          const { hospitalOperationDataInfo } = res.data;
          this.query.data = hospitalOperationDataInfo;
          this.query.totalNum = this.query.data.length
          let newCustomerDealPriceNums = 0 
          let newCustomerUnitPriceNums = 0 
          let oldCustomerDealPriceNums = 0 
          let oldCustomerUnitPriceNums = 0 
          let lasttMonthTotalAchievementNums = 0 
          this.query.data.map(item=>{
            newCustomerDealPriceNums +=Number(item.newCustomerDealPrice)
            newCustomerUnitPriceNums +=Number(item.newCustomerUnitPrice)
            oldCustomerDealPriceNums +=Number(item.oldCustomerDealPrice)
            oldCustomerUnitPriceNums +=Number(item.oldCustomerUnitPrice)
            lasttMonthTotalAchievementNums +=Number(item.lasttMonthTotalAchievement)
          })
          this.query.newCustomerDealPriceNum  =   Math.floor(newCustomerDealPriceNums * 100) / 100;
          this.query.newCustomerUnitPriceNum  =   Math.floor(newCustomerUnitPriceNums * 100) / 100;
          this.query.oldCustomerDealPriceNum  =   Math.floor(oldCustomerDealPriceNums * 100) / 100;
          this.query.oldCustomerUnitPriceNum  =   Math.floor(oldCustomerUnitPriceNums * 100) / 100;
          this.query.lasttMonthTotalAchievementNum  =   Math.floor(lasttMonthTotalAchievementNums * 100) / 100;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            let indicatorsId = this.indicatorsId;
            const {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
              id,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerDealPrice,
              newCustomerUnitPrice,
              oldCustomerVisitNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerDealPrice,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate,
              lasttMonthTotalAchievement,
              sectionOffice
            } = this.form;
            const data = {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
              id,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerDealPrice,
              newCustomerUnitPrice,
              oldCustomerVisitNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerDealPrice,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate,
              lasttMonthTotalAchievement,
              sectionOffice
            };
            // 修改
            api.editHospitalConsulationOperationData(data).then((res) => {
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
            let indicatorsId = this.indicatorsId;
            const {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,

              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerDealPrice,
              newCustomerUnitPrice,
              oldCustomerVisitNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerDealPrice,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate,
              lasttMonthTotalAchievement,
              sectionOffice
            } = this.form;
            const data = {
              consulationName,
              sendOrderNum,
              newCustomerVisitNum,
              newCustomerVisitRate,
              indicatorId: indicatorsId,
              hospitalId: this.hospitalId,
              newCustomerDealNum,
              newCustomerDealRate,
              newCustomerDealPrice,
              newCustomerUnitPrice,
              oldCustomerVisitNum,
              oldCustomerDealNum,
              oldCustomerDealRate,
              oldCustomerDealPrice,
              oldCustomerUnitPrice,
              oldCustomerAchievementRate,
              lasttMonthTotalAchievement,
              sectionOffice
            };
            // 添加
            api.addHospitalConsulationOperationData(data).then((res) => {
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
  },
  watch: {
    active: {
      handler(value) {
        if (value === "consultantOperations") {
          this.getHospitalInfo();
          this.getIdMessage()
          this.getAmiyaHospitalDepartmentListChange();
        }
      },
      immediate: true,
    },
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
.h1 {
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 5px 0;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.left {
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  margin: 10px 0;
}
.button_con {
  display: flex;
  position: absolute;
  right: 10px;
}
.price_con{
  display: flex;
  margin-top: 20px;
}
.num{
  font-size: 16px;
  margin-right: 20px;
}
.num span{
  color: red;
}
.bottom{
  text-align: end;
  display: block;
  color: red;
  margin-top: 10px;
}
.company{
  font-size: 14px;
  font-weight: bold;
  margin-top:5px
}
</style>
