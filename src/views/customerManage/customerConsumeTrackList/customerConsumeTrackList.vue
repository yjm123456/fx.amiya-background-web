<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <div class="left_l">
            <div>
              <Input
                  v-model="query.keyword"
                  placeholder="请输入关键字"
                  style="width: 180px;"
                  @keyup.enter.native="getCustomerHospitalConsume()"
                />
                <DatePicker
                  type="date"
                  placeholder="开始日期"
                  style="width: 160px; margin-left: 10px"
                  :value="query.startDate"
                  v-model="query.startDate"
                ></DatePicker>
                <DatePicker
                  type="date"
                  placeholder="结束日期"
                  style="width: 160px; margin-left: 10px"
                  :value="query.endDate"
                  v-model="query.endDate"
                ></DatePicker>
                
                <Select
                  v-model="query.isConfirmOrder"
                  style="width: 160px; margin-left: 10px"
                  placeholder="确认升单状态"
                >
                  <Option
                    v-for="item in isConfirmOrderList"
                    :value="item.status"
                    :key="item.status"
                    >{{ item.name }}</Option
                  >
                </Select>
                <DatePicker
                  type="date"
                  placeholder="升单开始日期"
                  style="width: 160px; margin-left: 10px"
                  :value="query.consumeStartDate"
                  v-model="query.consumeStartDate"
                  :disabled="query.isConfirmOrder!='true'"
                ></DatePicker>
                <DatePicker
                  type="date"
                  placeholder="升单结束日期"
                  style="width: 160px; margin-left: 10px"
                  :value="query.consumeEndDate"
                  v-model="query.consumeEndDate"
                  :disabled="query.isConfirmOrder!='true'"
                ></DatePicker>
                <Select
                  v-model="query.checkState"
                  placeholder="审核状态"
                  style="width: 160px; margin-left: 10px"
                >
                  <Option
                    v-for="item in query.checkStateListAll"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
            </div>
            <div style="margin-top:10px">
              
                <Select
                  v-model="query.consumeType"
                  style="width: 160px;"
                  placeholder="消费类型"
                >
                  <Option
                    v-for="item in query.consumeTypeList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.name }}</Option
                  >
                </Select>
              <Select
                v-model="query.buyAgainType"
                style="width: 180px; margin-left: 10px"
                placeholder="升单类型"
                filterable
              >
                <Option
                  v-for="item in buyAgainType"
                  :value="item.type"
                  :key="item.type"
                  >{{ item.typeText }}</Option
                >
              </Select>
              <Select
                v-model="query.channel"
                style="width: 160px; margin-left: 10px"
                placeholder="升单渠道"
                filterable
              >
                <Option
                  v-for="item in channelType"
                  :value="item.type"
                  :key="item.type"
                  >{{ item.typeText }}</Option
                >
              </Select>
              <Select
                v-model="query.addedBy"
                style="width: 160px; margin-left: 10px"
                placeholder="跟进人员"
                filterable
              >
                <Option
                  v-for="item in query.employee"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
              <Select
                v-model="query.liveAnchorId"
                placeholder="请选择主播IP账号"
                style="width: 160px; margin-left: 10px"
                filterable
                >
                <Option
                    v-for="item in liveAnchors"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                >
              </Select>
              <Select
                v-model="query.hospitalId"
                style="width: 250px; margin-left: 10px"
                placeholder="医院"
                filterable
              >
                <Option
                  v-for="item in query.hospitalInfo"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </div>
          </div>
          <div class="right_button">
              <Button
                  type="primary"
                  style="margin-left: 10px"
                  @click="getCustomerHospitalConsume()"
                  >查询</Button
                >
                <Button
                  type="primary"
                  style="margin-left: 10px"
                  @click="
                  importControlModal = true;
                  "
                  v-if="positionId == 1 || positionId == 13 || positionId == 16"
                  >导入</Button
                >
          </div>
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
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
      width = "1100"
      @on-visible-change="handleModalVisibleChange"
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
            <FormItem label="升单渠道" prop="channel" >
                <Select
                  v-model="form.channel"
                  placeholder="请选择升单渠道"
                >
                  <Option
                    v-for="item in channelType"
                    :value="item.type"
                    :key="item.type"
                    >{{ item.typeText }}</Option
                  >
                </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播IP账号" prop="liveAnchorId" >
                <Select
                  v-model="form.liveAnchorId"
                  placeholder="请选择主播IP账号"
                  filterable
                  >
                  <Option
                      v-for="item in liveAnchors"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.name }}</Option
                  >
                </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="抖店订单号" prop="otherContentPlatFormOrderId">
              <Input v-model="form.otherContentPlatFormOrderId" placeholder="请输入抖店订单号"></Input>
            </FormItem>
          </Col>
          
          
          
        </Row> 
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="医院" prop="hospitalId" >
              <Select
                v-model="form.hospitalId"
                placeholder="请选择医院"
                filterable
              >
                <Option
                  v-for="item in hospitalNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="项目" prop="itemName">
              <Input v-model="form.itemName" placeholder="请输入项目"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="金额" prop="price">
            <Input v-model="form.price" placeholder="请输入金额" type="number"></Input>
          </FormItem>
          </Col>
          
          
          
        </Row> 
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="消费类型" prop="consumeType">
              <Select
                v-model="form.consumeType"
                placeholder="请选择消费类型"
                filterable
              >
                <Option
                  v-for="item in consumptionType"
                  :value="item.consumeType"
                  :key="item.consumeType"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="客户昵称" prop="nickName"  >
              <Input v-model="form.nickName" placeholder="请输入客户昵称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="手机号" prop="encryptPhone"  >
              <Input v-model="form.encryptPhone" placeholder="请输入手机号" maxlength="11"></Input>
            </FormItem>
          </Col>
          
        </Row> 
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="升单类型" prop="buyAgainType" >
              <Select
                v-model="form.buyAgainType"
                placeholder="请选择升单类型"
                filterable
              >
                <Option
                  v-for="item in buyAgainType"
                  :value="item.type"
                  :key="item.type"
                  >{{ item.typeText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="升单日期" prop="buyAgainTime"  >
              <DatePicker
                type="date"
                placeholder="升单日期"
                style="width: 200px"
                :value="form.buyAgainTime"
                v-model="form.buyAgainTime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="人次" prop="personTime">
              <Input v-model="form.personTime" placeholder="请输入人次"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否携带订单号" prop="isAddedOrder">
              <i-switch v-model="form.isAddedOrder" />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isAddedOrder === true" key="订单号">
            <FormItem label="订单号" prop="orderId" >
              <Input v-model="form.orderId" placeholder="多个订单号请用逗号隔开"></Input>
            </FormItem>
          </Col>
          <Col span="8"  v-if="form.isAddedOrder === true" key="核销日期">
            <FormItem label="核销日期" prop="writeOffDate">
              <DatePicker
                type="date"
                placeholder="核销日期"
                style="width: 200px"
                :value="form.writeOffDate"
                v-model="form.writeOffDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否面诊卡" prop="isCconsultationCard" >
              <i-switch v-model="form.isCconsultationCard" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否为外播" prop="isSelfLiving" >
              <i-switch v-model="form.isSelfLiving" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否已领取加购礼" prop="isReceiveAdditionalPurchase" >
              <i-switch v-model="form.isReceiveAdditionalPurchase" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否和医院核实" prop="isCheckToHospital" >
              <i-switch v-model="form.isCheckToHospital" />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isCheckToHospital === true">
            <FormItem label="医院核实截图" prop="checkToHospitalPic" key="checkToHospitalPic">
              <upload :uploadObj="uploadObjHospital" @uploadChange="handleUploadHospitalChange" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否有升单证明" prop="hasBuyagainEvidence" >
              <i-switch v-model="form.hasBuyagainEvidence" />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.hasBuyagainEvidence === true">
            <FormItem label="升单证明" prop="buyagainEvidencePic" key="buyagainEvidencePic">
              <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
            </FormItem>
          </Col>
          <Col span="12">
              <FormItem label="备注" prop="remark" >
                  <Input v-model="form.remark" type="textarea" :rows="5" placeholder="请输入备注"></Input>
              </FormItem>
          </Col>
        </Row> 
        <Spin fix v-if="flag == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 导入 -->
    <importFile :importControlModal.sync="importControlModal" @handleRefreshCustomerTrackList="getCustomerHospitalConsume()"></importFile>
    <!-- 审核 -->
    <toExamine :toExamineModal.sync="toExamineModal" :checkStateList="checkStateList" :itemInfo="itemInfo" @handleRefreshCustomerList="getCustomerHospitalConsume()"></toExamine>
    <!-- 查看审核图片 -->
    <viewPic :viewPicModel.sync ="viewPicModel" :viewPicList ="viewPicList"></viewPic>
    <!-- 回款 -->
    <paymentCollection :paymentCollectionModel.sync ="paymentCollectionModel" :paymentCollectionObj="paymentCollectionObj" @hanPaymentChange="getCustomerHospitalConsume"></paymentCollection>
    <!-- 订单详情 -->
    <upgradeOrderDetail :upgradeOrderDetailModel.sync ="upgradeOrderDetailModel" :upgradeOrderObj="upgradeOrderObj"></upgradeOrderDetail>
  </div>
</template>

<script>
import * as api from "@/api/customerManage.js";
import * as apis from "@/api/orderManage";
import * as OrderCheckPictureApi from "@/api/OrderCheckPicture.js";
import upload from "@/components/upload/upload";
import importFile from "./components/import.vue"
import toExamine from "./components/toExamine.vue"
import viewPic from "@/components/viewPic/viewPic"
import paymentCollection from "@/components/paymentCollection/paymentCollection"
import upgradeOrderDetail from "@/components/upgradeOrderDetail/upgradeOrderDetail"

export default {
  components: {
    upload,
    importFile,
    toExamine,
    viewPic,
    paymentCollection,
    upgradeOrderDetail
  },
  data() {
    return {
      upgradeOrderDetailModel:false,
      upgradeOrderObj:null,
      isConfirmOrderList:[
        {
          status:-1,
          name:'全部确认状态'
        },
        {
          status:'true',
          name:'是'
        },
        {
          status:'false',
          name:'否'
        }
      ],
      // 回款 传给子组件的值
      paymentCollectionObj:{
        orderId	:'',
        returnBackPrice:null
      },
      paymentCollectionModel:false,
      viewPicList:[],
      viewPicModel:false,
      flag:false,
      // 获取主播
      liveAnchors:[],
      // 获取升单渠道
      channelType:[],
      // 传给子组件参数
      itemInfo:{},
      // 审核状态
      checkStateList:[],
      // 审核 model
      toExamineModal:false,
      positionId: sessionStorage.getItem("positionId"),
      // 导入 model
      importControlModal:false,
      // 升单类型
      buyAgainType: [] ,
      uploadObjHospital: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 控制 modal
        controlModal: false,
        // 是否是编辑
        isEdit: false,
        title: "添加",
        consumptionType:[
          {
            consumeType:0,
            name:"当天其他消费"
          },
          {
            consumeType:1,
            name:"再消费"
          }
        ],
        form: {
          // 医院id
          hospitalId: "",
          // 手机号
          encryptPhone: "",
          // 项目名称
          itemName:"",
          price:"",
          // 消费类型
          consumeType:"",
          // 是否有效
          valid: false,
          id:"",
          employeeId:"",
          // 客户昵称
          nickName:"",
          // 是否携带订单号
          isAddedOrder:false,
          // 订单号
          orderId:"",
          // 核销日期
          writeOffDate:"",
          // 是否面诊
          isCconsultationCard:false,
          // 归属主播
          isSelfLiving:false,
          // 升单类型 
          buyAgainType:"",
          // 升单日期
          buyAgainTime:"",
          // 是否有升单证明
          hasBuyagainEvidence:false,
          // 升单截图
          buyagainEvidencePic:"",
          // 是否和医院核实
          isCheckToHospital:false,
          // 医院核实截图
          checkToHospitalPic:"",
          // 人次
          personTime:"",
          // 是否领取加购礼
          isReceiveAdditionalPurchase:false,
          remark:"",
          // 升单渠道
          channel:'',
          // 主播IP
          liveAnchorId:'',
          // 抖店订单号
          otherContentPlatFormOrderId:''
        },
        // 获取有效的医院列表
        hospitalNameList:[],
        ruleValidate: {
          liveAnchorId: [
            {
              required: true,
              message: "请选择主播IP",
            },
          ],
          channel: [
            {
              required: true,
              message: "请选择升单渠道",
            },
          ],
          nickName: [
            {
              required: true,
              message: "请输入客户昵称",
            },
          ],
          orderId: [
            {
              required: true,
              message: "请输入订单号(多个订单号请用逗号隔开)",
            },
          ],
          writeOffDate: [
            {
              required: true,
              message: "请选择核销日期",
            },
          ],
          buyAgainType: [
            {
              required: true,
              message: "请选择升单类型",
            },
          ],
          homeAnchor: [
            {
              required: true,
              message: "请选择归属主播",
            },
          ],
          buyAgainTime: [
            {
              required: true,
              message: "请选择升单日期",
            },
          ],
          personTime: [
            {
              required: true,
              message: "请输入人次",
            },
          ],
          hospitalId: [
            {
              required: true,
              message: "请选择医院",
            },
          ],
          encryptPhone: [
            {
              required: true,
              message: "请输入手机号",
            },
          ],
          itemName: [
            {
              required: true,
              message: "请输入项目",
            },
          ],
          price: [
            {
              required: true,
              message: "请输入金额",
            },
          ],
          consumeType: [
            {
              required: true,
              message: "请选择消费类型",
            },
          ],
          
        },
      // 查询
      query: {
        // 升单开始时间
        consumeStartDate:'',
        // 升单结束时间
        consumeEndDate:'',
        // 是否确认升单
        isConfirmOrder:-1,
        liveAnchorId:null,
        // 升单渠道
        channel:null,
        checkStateListAll:[{id:-1,name:'全部审核状态'}],
        // 审核状态
        checkState:-1,
        // 跟进人员
        addedBy:-1,
        employee: [{ name: "全部客服", id: -1 },{ name: "医院添加", id: 0 }],
        // 升单类型
        buyAgainType:'',
        // modal title
        startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        // 关键字
        keyword: "",
        // 医院编号
        hospitalId: -1,
        // 医院列表
        hospitalInfo: [{ name: "全部医院", id: -1 }],
        // 消费类型
        consumeType: "",
        // 消费类型列表
        consumeTypeList: [
          {
            name: "全部消费",
            value: -1,
          },
          {
            name: "当天其他消费",
            value: 0,
          },
          {
            name: "再消费",
            value: 1,
          },
        ],
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "升单订单号",
            key: "consumeId",
            minWidth: 200,
            align:'center'
          },
          {
            title: "登记日期",
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
            title: "是否确认升单",
            key: "isConfirmOrder",
            minWidth: 140,
            align:'center',
            render: (h, params) => {
              if (params.row.isConfirmOrder == true) {
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
            title: "升单渠道",
            key: "channel",
            minWidth: 120,
            align:'center'
          },
          {
            title: "主播IP账号",
            key: "liveAnchorName",
            minWidth: 120,
            align:'center'
          },
          {
            title: "抖店订单号",
            key: "otherContentPlatFormOrderId",
            minWidth: 180,
            align:'center'
          },
          {
            title: "医院",
            key: "hospitalName",
            minWidth: 260,
            align:'center'
          },
          {
            title: "项目",
            key: "itemName",
            minWidth: 200,
            align:'center'
          },
          {
            title: "金额",
            key: "price",
            minWidth: 120,
            align:'center'
          },
          {
            title: "电话",
            key: "phone",
            minWidth: 130,
            align:'center'
          },
          {
            title: "客户昵称",
            key: "nickName",
            minWidth: 200,
            align:'center'
          },
          {
            title: "姓名",
            key: "name",
            minWidth: 130,
            align:'center'
          },
          {
            title: "性别",
            key: "sex",
            minWidth: 100,
            align:'center'
          },
          {
            title: "人次",
            key: "personTime",
            minWidth: 100,
            align:'center'
          },
          
          {
            title: "是否携带订单",
            key: "isAddedOrder",
            minWidth: 140,
            align:'center',
            render: (h, params) => {
              if (params.row.isAddedOrder == '是') {
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
            title: "订单号",
            key: "orderId",
            minWidth: 220,
            align:'center'
          },
          {
            title: "核销时间",
            key: "writeOffDate",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.writeOffDate  ? this.$moment(params.row.writeOffDate).format(
                  "YYYY-MM-DD"
                ) : ""
              );
            },
          },
          {
            title: "是否为面诊卡",
            key: "isCconsultationCard",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              if (params.row.isCconsultationCard == '是') {
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
            title: "是否为外播(自播/外播)",
            key: "isSelfLiving",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              if (params.row.isSelfLiving == '是') {
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
            title: "消费类型",
            key: "consumeTypeText",
            minWidth: 140,
            align:'center'
          },
          {
            title: "升单日期",
            key: "buyAgainTime",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.buyAgainTime ? this.$moment(params.row.buyAgainTime).format(
                  "YYYY-MM-DD"
                ):""
              );
            },
          },
          {
            title: "升单类型名称",
            key: "buyAgainTypeText",
            minWidth: 200,
            align:'center'
          },
          {
            title: "是否有升单证明",
            key: "hasBuyagainEvidence",
            minWidth: 140,
            align:'center',
            render: (h, params) => {
              if (params.row.hasBuyagainEvidence == '是') {
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
            title: "升单证明",
            key: "buyagainEvidencePic",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h("viewer", {
                props:{
                  zoomable: false,
                }
              }, [
                params.row.buyagainEvidencePic ? h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.buyagainEvidencePic,
                  },
                }) : "",
              ]);
            },
          },
          {
            title: "是否与医院确认",
            key: "isCheckToHospital",
            minWidth: 140,
            align:'center',
            render: (h, params) => {
              if (params.row.isCheckToHospital == '是') {
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
            title: "医院确认截图",
            key: "checkToHospitalPic",
            minWidth: 160,
            align: "center",
            render: (h, params) => {
              return h("viewer", {
                props:{
                  zoomable: false,
                }
              }, [
                params.row.checkToHospitalPic ? h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.checkToHospitalPic,
                  },
                }) : "",
              ]);
            },
          },
          {
            title: "跟进人员",
            key: "employeeName",
            minWidth: 120,
            align:'center'
          },
          {
            title: "是否领取加购礼",
            key: "isReceiveAdditionalPurchase",
            minWidth: 140,
            align:'center',
            render: (h, params) => {
              if (params.row.isReceiveAdditionalPurchase == '是') {
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
            title: "审核时间",
            key: "checkDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.checkDate ? this.$moment(params.row.checkDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                ):""
              );
            },
          },
          {
            title: "审核状态",
            key: "checkState",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if(params.row.checkState == '审核通过'){
                return h('div',{
                  'style': {
                    'color': '#04B05D'
                  }
                },params.row.checkState)
              }else if(params.row.checkState == '未审核'){
                return h('div',{
                  'style': {
                    'color': 'red'
                  }
                },params.row.checkState)
              }else if(params.row.checkState == '审核不通过'){
                return h('div',{
                  'style': {
                    'color': 'blue'
                  }
                },params.row.checkState)
              } else{
                return h('div',{
                  'style': {
                    'color': '#515a6e'
                  }
                },params.row.checkState)
              }
            },
          },
          {
            title: "审核升单金额",
            key: "checkBuyAgainPrice",
            minWidth: 140,
            align:'center'

          },
          {
            title: "服务费合计",
            key: "checkSettlePrice",
            minWidth: 140,
            align:'center'
          },
          
          {
            title: "审核备注",
            key: "checkRemark",
            minWidth: 300,
          },
          {
            title: "是否回款",
            key: "isReturnBackPrice",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if (params.row.isReturnBackPrice == true) {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              } else if (params.row.isReturnBackPrice == false) {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              }else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.isReturnBackPrice == true ? '已回款':'未回款'
                );
              }
            },
          },
          {
            title: "回款金额",
            key: "returnBackPrice",
            minWidth: 120,
            align:'center'
          },
          {
            title: "回款时间",
            key: "returnBackDate",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return params.row.returnBackDate
                ? h(
                    "div",
                    this.$moment(params.row.returnBackDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                : "";
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 300,
          },
          {
            title: "操作",
            key: "",
            minWidth: 500,
            align:"center",
            fixed: "right",
            render: (h, params) => {
              const currentRole = JSON.parse(
                sessionStorage.getItem("permissions")
              );
              // 审核按钮权限
              const isFlag = currentRole.some((ele) => {
                return "fx.amiya.permission.CHECK_ORDER_INFO".includes(
                  ele
                );
              });
              // 回款按钮权限
              const isPayment = currentRole.some((ele) => {
                return "fx.amiya.permission.RETURN_BACK_PRICE".includes(
                  ele
                );
              });
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.upgradeOrderDetailModel = true
                        api.byCustomerHospitalConsume(id).then((res) => {
                          if (res.code === 0) {
                            this.upgradeOrderObj= res.data.CustomerManageUpdateconsume
                          }
                        })
                      },
                    },
                  },
                  "订单详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:params.row.isConfirmOrder == true,
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "确认升单提示",
                          content: "是否确认升单？",
                          onOk: () => {
                            const { id } = params.row;
                            const data = {
                              id:id
                            }
                            api.customerServiceCheck(data).then((res) => {
                              if (res.code === 0) {
                                this.getCustomerHospitalConsume();
                                this.$Message.success({
                                  content: "确认成功",
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
                  "确认升单"
                ),
                //  sessionStorage.getItem('positionId') == 1 || sessionStorage.getItem('positionId') == 16 ||  sessionStorage.getItem('positionId') == 13
                isFlag ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      // 1管理员 16研发 13财务
                      disabled: params.row.checkState =='审核通过' || params.row.isConfirmOrder == false,
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const {id} = params.row
                        this.toExamineModal = true
                        this.itemInfo = params.row
                      },
                    },
                  },
                  "审核"
                ): null,
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const { consumeId } = params.row;
                        const data = {
                          OrderId:consumeId,
                          OrderFrom:3,
                          pageNum:1,
                          pageSize:10
                        }
                        OrderCheckPictureApi.OrderCheckPicture(data).then((res) => {
                          if (res.code === 0) {
                            const { list } = res.data.orderCheckPictureInfo;
                            this.viewPicList = list;
                            if(this.viewPicList.length>0){
                              this.viewPicModel = true
                            }else{
                              this.$Message.warning('暂无审核图片')
                            }
                          }
                        });
                      },
                    },
                  },
                  "查看审核图片"
                ),
                isPayment ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.checkState !=='审核通过' || params.row.isReturnBackPrice == true ,
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const { consumeId,checkSettlePrice } = params.row;
                        this.paymentCollectionModel = true
                        this.paymentCollectionObj = {
                          orderId:consumeId,
                          returnBackPrice:checkSettlePrice,
                          type:'ascendingOrder'
                        }
                      },
                    },
                  },
                  "回款"
                ) : null,
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.checkState =='审核通过'
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api.byCustomerHospitalConsume(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              id,
                              hospitalId,
                              phone,
                              itemName,
                              price,
                              consumeType,
                              nickName,
                              isAddedOrder,
                              orderId,
                              writeOffDate,
                              isCconsultationCard,
                              buyAgainType,
                              isSelfLiving,
                              buyAgainTime,
                              hasBuyagainEvidence,
                              buyagainEvidencePic,
                              isCheckToHospital,
                              checkToHospitalPic,
                              personTime,
                              isReceiveAdditionalPurchase,
                              remark,
                              channel,
                              liveAnchorId,
                              otherContentPlatFormOrderId
                            } = res.data.CustomerManageUpdateconsume;
                            this.controlModal = true;
                            this.isEdit = true;
                            this.form.hospitalId = hospitalId;
                            this.form.encryptPhone = phone;
                            this.form.itemName = itemName;
                            this.form.price = price;
                            this.form.consumeType = consumeType
                            this.form.nickName = nickName;
                            this.form.isAddedOrder = isAddedOrder;
                            this.form.orderId = orderId;
                            this.form.writeOffDate = writeOffDate;
                            this.form.isCconsultationCard = isCconsultationCard;
                            this.form.buyAgainType = buyAgainType;
                            this.form.isSelfLiving = isSelfLiving;
                            this.form.buyAgainTime = buyAgainTime;
                            this.form.hasBuyagainEvidence = hasBuyagainEvidence;
                            this.form.personTime = personTime;
                            this.form.isReceiveAdditionalPurchase = isReceiveAdditionalPurchase;
                            this.form.isCheckToHospital = isCheckToHospital;
                            this.form.remark = remark;
                            this.form.channel = channel;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.otherContentPlatFormOrderId = otherContentPlatFormOrderId;

                            this.form.id = id;
                            this.form.buyagainEvidencePic = buyagainEvidencePic;
                            this.uploadObj.uploadList = this.form.buyagainEvidencePic ? [this.form.buyagainEvidencePic]: [];
                            this.form.checkToHospitalPic = checkToHospitalPic;
                            this.uploadObjHospital.uploadList = this.form.checkToHospitalPic ? [this.form.checkToHospitalPic] : [];
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
                      disabled: params.row.checkState =='审核通过'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            const data = {
                              id:id
                            }
                            api.deleteCustomerHospitalConsume(data).then((res) => {
                              if (res.code === 0) {
                                this.getCustomerHospitalConsume();
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
      },
    };
  },
  methods: {
    //   获取主播
    getContentValidList(){
        api.LiveAnchorValid().then((res) => {
        if(res.code === 0){
          const {liveAnchors} = res.data
          this.liveAnchors = liveAnchors
        }
      })
    },
    
    // 获取升单渠道
    getAppChannelList(){
      api.appChannelList().then((res) => {
        if(res.code === 0){
          const {channelType} = res.data
          this.channelType = channelType
        }
      })
    },
    // 获取审核情况（下拉框）
    getCheckStateList(){
      api.getCheckStateList().then((res) => {
        if(res.code === 0){
          const {checkStateList} = res.data
          this.checkStateList = checkStateList
          this.query.checkStateListAll = [...this.query.checkStateListAll,...checkStateList]
        }
      })
    },
    // 获取客服列表（跟进人员）
    getCustomerServiceList() {
      api.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.query.employee = [...this.query.employee, ...employee];
        }
      });
    },
    // 获取升单类型
    getAppTypeList(){
      api.appTypeList().then((res) => {
        if(res.code === 0){
          const {buyAgainType} = res.data
          this.buyAgainType = buyAgainType
        }
      })
    },
    // 医院核实截图
    handleUploadHospitalChange(values) {
      this.form.checkToHospitalPic = values[0];
    },
    // 图片
    handleUploadChange(values) {
      this.form.buyagainEvidencePic = values[0];
    },
    // 获取合作过的医院列表
    getHospitalList(){
      apis.getHospitalList().then((res) => {
        if(res.code === 0){
          const { hospitalInfo} = res.data
          this.hospitalNameList = hospitalInfo
        }
      })
    },
    // 获取医院推荐列表
    getCustomerHospitalConsume() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        startDate,
        endDate,
        keyword,
        hospitalId,
        consumeType,
        pageNum,
        pageSize,
        addedBy,
        buyAgainType,
        checkState,
        channel,
        liveAnchorId,
        isConfirmOrder,
        consumeStartDate,
        consumeEndDate
      } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        hospitalId: hospitalId === -1 ? null : hospitalId,
        consumeType: consumeType === -1 ? null : consumeType,
        pageNum,
        pageSize,
        addedBy,
        buyAgainType,
        checkState,
        channel,
        liveAnchorId,
        isConfirmOrder:isConfirmOrder==-1 ? null : isConfirmOrder,
        consumeStartDate:isConfirmOrder =='true' ?  (consumeStartDate ? this.$moment(consumeStartDate).format("YYYY-MM-DD") : null) : null,
        consumeEndDate:isConfirmOrder =='true' ?  (consumeEndDate ? this.$moment(consumeEndDate).format("YYYY-MM-DD") : null) : null
      };
      api.getCustomerHospitalConsume(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerHospitalConsumes;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院推荐列表分页
    handlePageChange(pageNum) {
      const {
        startDate,
        endDate,
        keyword,
        hospitalId,
        consumeType,
        pageSize,
        addedBy,
        buyAgainType,
        checkState,
        channel,
        liveAnchorId,
        isConfirmOrder,
        consumeStartDate,
        consumeEndDate
      } = this.query;
      const data = {
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        keyword,
        hospitalId: hospitalId === -1 ? null : hospitalId,
        consumeType: consumeType === -1 ? null : consumeType,
        pageNum,
        pageSize,
        addedBy,
        buyAgainType,
        checkState,
        channel,
        liveAnchorId,
        isConfirmOrder:isConfirmOrder==-1 ? null : isConfirmOrder,
        consumeStartDate:isConfirmOrder =='true' ?  (consumeStartDate ? this.$moment(consumeStartDate).format("YYYY-MM-DD") : null) : null,
        consumeEndDate:isConfirmOrder =='true' ?  (consumeEndDate ? this.$moment(consumeEndDate).format("YYYY-MM-DD") : null) : null
      };
      api.getCustomerHospitalConsume(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.customerHospitalConsumes;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院列表
    getAllHospitalList() {
      api.getAllHospitalList().then((res) => {
        if (res.code === 0) {
          this.query.hospitalInfo = [
            ...this.query.hospitalInfo,
            ...res.data.hospitalInfo,
          ];
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const { hospitalId,encryptPhone,itemName,price,consumeType ,id,employeeId,nickName,isAddedOrder,orderId,writeOffDate,isCconsultationCard,buyAgainType,isSelfLiving,buyAgainTime,hasBuyagainEvidence,
            buyagainEvidencePic,isCheckToHospital,checkToHospitalPic,personTime,isReceiveAdditionalPurchase,remark,channel,liveAnchorId,otherContentPlatFormOrderId} = this.form;
            const  data = { 
                hospitalId,
                phone:encryptPhone,
                itemName,
                price,
                consumeType,
                id,
                // employeeId,
                nickName,
                isAddedOrder,
                orderId: isAddedOrder === true ? orderId : "",
                writeOffDate: isAddedOrder === true ?  this.$moment(writeOffDate).format("YYYY-MM-DD"): null,
                isCconsultationCard,
                buyAgainType,
                isSelfLiving,
                buyAgainTime: buyAgainTime ?  this.$moment(buyAgainTime).format("YYYY-MM-DD"): null ,
                hasBuyagainEvidence,
                buyagainEvidencePic : hasBuyagainEvidence === true ? buyagainEvidencePic : "",
                isCheckToHospital,
                checkToHospitalPic : isCheckToHospital === true ? checkToHospitalPic : "",
                personTime ,
                isReceiveAdditionalPurchase,
                remark,
                channel,
                liveAnchorId,
                otherContentPlatFormOrderId
              } 
              if(encryptPhone){
                if (!(/^1[3456789]\d{9}$/.test(encryptPhone))) {
                  this.$Message.error('请输入正确的手机号')
                  return false;
                }
                this.flag = true
                // 修改
                api.editCustomerManageUpdate(data).then((res) => {
                  if (res.code === 0) {
                    this.flag = false
                    this.isEdit = false;
                    this.cancelSubmit("form");
                    this.getCustomerHospitalConsume();
                    this.$Message.success({
                      content: "修改成功",
                      duration: 3,
                    });
                  }else{
                    setTimeout(() => {
                      this.flag = false;
                    }, 3000);
                  }
                });
              }
            
          } else {
            // const { hospitalId,encryptPhone,itemName,price,consumeType,employeeId } = this.form;
            // const  data = { hospitalId,encryptPhone,itemName,price,consumeType,employeeId} 
            const { hospitalId,encryptPhone,itemName,price,consumeType ,employeeId,nickName,isAddedOrder,orderId,writeOffDate,isCconsultationCard,
            buyAgainType,isSelfLiving,buyAgainTime,hasBuyagainEvidence,buyagainEvidencePic,isCheckToHospital,checkToHospitalPic,personTime,
            isReceiveAdditionalPurchase,remark,channel,liveAnchorId,otherContentPlatFormOrderId} = this.form;
            const  data = { 
                hospitalId,
                phone:encryptPhone,
                itemName,
                price,
                consumeType,
                // employeeId,
                nickName,
                isAddedOrder,
                orderId: isAddedOrder === true ? orderId : "",
                writeOffDate: isAddedOrder === true ?  this.$moment(writeOffDate).format("YYYY-MM-DD"): null,
                isCconsultationCard,
                buyAgainType,
                isSelfLiving,
                buyAgainTime: buyAgainTime ?  this.$moment(buyAgainTime).format("YYYY-MM-DD"): null ,
                hasBuyagainEvidence,
                buyagainEvidencePic : hasBuyagainEvidence === true ? buyagainEvidencePic : "",
                isCheckToHospital,
                checkToHospitalPic : isCheckToHospital === true ? checkToHospitalPic : "",
                personTime,
                isReceiveAdditionalPurchase,
                remark,
                channel,
                liveAnchorId,
                otherContentPlatFormOrderId
              } 
            if(encryptPhone){
                if (!(/^1[3456789]\d{9}$/.test(encryptPhone))) {
                  this.$Message.error('请输入正确的手机号')
                  return false;
                }
                this.flag = true
                // // 添加
                api.customerManageAdd(data).then((res) => {
                  if (res.code === 0) {
                    this.flag = false
                    this.cancelSubmit("form");
                    this.getCustomerHospitalConsume();
                    this.$Message.success({
                      content: "添加成功",
                      duration: 3,
                    });
                  }else{
                    setTimeout(() => {
                      this.flag = false;
                    }, 3000);
                  }
                });
              }
            
          }
        }
      });
    },
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.uploadObjHospital.uploadList = [];
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
    this.getCustomerHospitalConsume();
    this.getAllHospitalList();
    this.getHospitalList()
    this.getAppTypeList()
    this.getCustomerServiceList()
    this.getCheckStateList()
    this.getAppChannelList()
    this.getContentValidList()
    const employeeId = JSON.parse(
      sessionStorage.getItem("employeeId")
    );
    this.form.employeeId = employeeId
    
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
.left{
  display: flex;
  align-items: center;
}
</style>
