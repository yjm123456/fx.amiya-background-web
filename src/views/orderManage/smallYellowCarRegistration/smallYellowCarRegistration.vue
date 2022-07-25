<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 180px;"
            @keyup.enter.native="getSmallCar()"
          />
          <DatePicker
            type="date"
            placeholder="开始时间"
            :value="query.startDate"
            v-model="query.startDate"
            style="width: 140px; margin-left: 10px"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            :value="query.endDate"
            v-model="query.endDate"
            style="width: 140px; margin-left: 10px"
          ></DatePicker>
          <Select
            v-model="query.contentPlatFormId"
            placeholder="请选择渠道"
            @on-change="contentPlateChange(query.contentPlatFormId)"
            filterable
            style="width: 160px; margin-left: 10px"
          >
            <Option
              v-for="item in contentPalteForms"
              :value="item.id"
              :key="item.id"
              >{{ item.contentPlatformName }}</Option
            >
          </Select>
          <Select
            v-model="query.liveAnchorId"
            placeholder="请选择主播IP账号"
            :disabled="query.contentPlatFormId === ''"
            filterable
            style="width: 160px; margin-left: 10px"
          >
            <Option
              v-for="item in liveAnchors"
              :value="item.id"
              :key="item.id"
              >{{ item.hostAccountName }}</Option
            >
          </Select>
          <Select
            v-model="query.isAddWechat"
            placeholder="请选择加v状态"
            filterable
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in isAddWeChatList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isWriteOff"
            placeholder="请选择核销状态"
            filterable
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in isWriteOffList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isConsultation"
            placeholder="请选择面诊状态"
            filterable
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in isConsultationList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.isReturnBackPrice"
            placeholder="请选择退款状态"
            filterable
            style="width: 140px; margin-left: 10px"
          >
            <Option
              v-for="item in isReturnBackPriceList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getSmallCar()"
            >查询</Button
          >
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

    <!-- <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="600"></Table>
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
    </Card> -->
    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="600"></Table>
      </div>
      <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-sizer
          :page-size-opts="[10,20,30,50,100]"
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        />
      </div>
    </Card>
    <Modal
      :title="title"
      v-model="controlModal"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="登记时间" prop="recordDate">
              <DatePicker
                type="date"
                placeholder="登记时间"
                :value="form.recordDate"
                v-model="form.recordDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <!-- <Col span="8">
            <FormItem label="时分" prop="time">
              <TimePicker type="time" placeholder="请选择时分" :value="form.time" v-model="form.time"></TimePicker>
            </FormItem>
          </Col> -->
          <Col span="8">
            <FormItem label="渠道" prop="contentPlatFormId">
              <Select
                v-model="form.contentPlatFormId"
                placeholder="请选择渠道"
                @on-change="contentPlateChange(form.contentPlatFormId)"
                filterable
              >
                <Option
                  v-for="item in contentPalteForms"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.contentPlatformName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播IP账号" prop="liveAnchorId">
              <Select
                v-model="form.liveAnchorId"
                placeholder="请选择主播IP账号"
                :disabled="form.contentPlatFormId === ''"
                filterable
              >
                <Option
                  v-for="item in liveAnchors"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.hostAccountName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          
          <Col span="8">
            <FormItem label="主播微信号" prop="liveAnchorWechatNo">
              <Input
                v-model="form.liveAnchorWechatNo"
                placeholder="请输入主播微信号"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="客户昵称" prop="customerNickName">
              <Input
                v-model="form.customerNickName"
                placeholder="请输入客户昵称"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="客户手机号" prop="phone">
              <Input
                v-model="form.phone"
                placeholder="请输入客户手机号"
                maxlength="11"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="下单金额" prop="price">
              <Input
                v-model="form.price"
                placeholder="请输入下单金额"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="面诊方式" prop="consultationType">
              <Select
                v-model="form.consultationType"
                placeholder="请选择面诊方式"
              >
                <Option
                  v-for="item in faceList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否加V" prop="IsAddWeChat">
              <i-switch v-model="form.IsAddWeChat" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          
          <Col span="8">
            <FormItem label="是否核销" prop="isWriteOff">
              <i-switch v-model="form.isWriteOff" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否面诊" prop="isConsultation">
              <i-switch v-model="form.isConsultation" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否退款" prop="isReturnBackPrice">
              <i-switch v-model="form.isReturnBackPrice" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="form.remark"
                type="textarea"
                :rows="5"
                placeholder="请输入备注"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Spin fix v-if="flag == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/shoppingCartRegistration";
import * as apis from "@/api/baseDataMaintenance";
import * as orderApi from "@/api/orderManage";
export default {
  data() {
    return {
      // 查询
      query: {
        isAddWechat:-1,
        isWriteOff:-1,
        isConsultation:-1,
        isReturnBackPrice:-1,
        keyword: "",
        startDate:this.$moment().format("YYYY-MM-DD"),
        endDate:this.$moment().format("YYYY-MM-DD"),
        LiveAnchorId:null,
        contentPlatFormId:'',
        pageNum: 1,
        pageSize: 10,
        columns: [
          // {
          //   title: "序号",
          //   key: "id",
          //   minWidth: 200,
          //   align: "center",
          // },
          {
            title: "登记日期",
            key: "recordDate",
            minWidth: 110,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.recordDate
                  ? this.$moment(params.row.recordDate).format(
                      "YYYY-MM-DD"
                    )
                  : ""
              );
            },
          },
          {
            title: "渠道",
            key: "contentPlatFormName",
            minWidth: 110,
            align: "center",
          },
          {
            title: "主播IP",
            key: "liveAnchorName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "主播微信号",
            key: "liveAnchorWechatNo",
            minWidth: 150,
            align: "center",
          },
          {
            title: "昵称",
            key: "customerNickName",
            minWidth: 150,
            align: "center",
          },
          {
            title: "联系方式",
            key: "phone",
            minWidth: 130,
            align: "center",
          },
          {
            title: "下单金额",
            key: "price",
            minWidth: 130,
            align: "center",
          },
          {
            title: "面诊方式",
            key: "consultationType",
            minWidth: 110,
            align: "center",
            // render:(h,params)=>{
            //   return h(
            //       "div",
            //       params.row.consultationType == 1 ? '视频':'图片'
            //     );
            // }
            render: (h, params) => {
              if (params.row.consultationType == 1) {
                return h(
                  "div",
                  '视频'
                );
              } else if (params.row.consultationType == 2) {
                return h(
                  "div",
                 
                  '图片'
                );
              } else if (params.row.consultationType == 3) {
                return h(
                  "div",
                  
                  '私信'
                );
              } else if (params.row.consultationType == 4) {
                return h(
                  "div",
                  
                  '其他'
                );
              }else if (params.row.consultationType == 5) {
                return h(
                  "div",
                  
                  '粉丝群'
                );
              }else if (params.row.consultationType == 6) {
                return h(
                  "div",
                  
                  '短视频'
                );
              }
            },
          },
          {
            title: "是否加V",
            key: "isAddWeChat",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isAddWeChat == true) {
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
            title: "是否核销",
            key: "isWriteOff",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isWriteOff == true) {
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
            title: "是否面诊",
            key: "isConsultation",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isConsultation == true) {
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
            title: "是否退款",
            key: "isReturnBackPrice",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              if (params.row.isReturnBackPrice == true) {
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
            title: "备注",
            key: "remark",
            minWidth: 200,
            align: "center",
          },
          {
            title: "创建人",
            key: "createBy",
            minWidth: 120,
            align: "center",
          },
          {
            title: "创建日期",
            key: "createDate",
            minWidth: 170,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              );
            },
          },
          {
            title: "操作",
            key: "",
            width: 150,
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
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdShoppingCartRegistration(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              recordDate,
                              contentPlatFormId,
                              // 主播id
                              liveAnchorId,
                              // 主播微信号
                              liveAnchorWechatNo,
                              // 客户昵称(不必选)
                              customerNickName,
                              // 客户手机号
                              phone,
                              // 下单金额
                              price,
                              // 面诊方式
                              consultationType,
                              // 是否核销
                              isWriteOff,
                              // 是否面诊
                              isConsultation,
                              // 是否退款
                              isReturnBackPrice,
                              // 备注
                              remark,
                              isAddWeChat
                            } = res.data.shoppingCartRegistrationInfo;
                            this.contentPlateChange(contentPlatFormId);
                            this.isEdit = true;
                            this.form.recordDate = recordDate;
                            this.form.contentPlatFormId = contentPlatFormId;
                            this.form.contentPlateFormId = contentPlatFormId;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.liveAnchorWechatNo = liveAnchorWechatNo;
                            this.form.customerNickName = customerNickName;
                            this.form.phone = phone;
                            this.form.price = price;
                            this.form.consultationType = consultationType;
                            this.form.isWriteOff = isWriteOff;
                            this.form.IsAddWeChat = isAddWeChat;
                            this.form.isConsultation = isConsultation;
                            this.form.isReturnBackPrice = isReturnBackPrice;
                            this.form.remark = remark;
                            this.form.id = id;
                            this.controlModal = true;
                            
                            let index = recordDate.indexOf("T");
                            let result = recordDate.substr(index + 1,recordDate.length); 
                            this.form.time = result
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
                            api
                              .detelShoppingCartRegistration(id)
                              .then((res) => {
                                if (res.code === 0) {
                                  this.getSmallCar();
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
      flag: false,
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 登记时间
        recordDate: "",
        // 渠道id
        contentPlatFormId: "",
        // 主播id
        liveAnchorId: null,
        // 主播微信号
        liveAnchorWechatNo: "",
        // 客户昵称(不必选)
        customerNickName: "",
        // 客户手机号
        phone: "",
        // 下单金额
        price: null,
        // 面诊方式
        consultationType: null,
        // 是否加V
        IsAddWeChat:false,
        // 是否核销
        isWriteOff: false,
        // 是否面诊
        isConsultation: false,
        // 是否退款
        isReturnBackPrice: false,
        // 备注
        remark: "",
        // 是否有效
        valid: false,
        // 主播平台
        contentPlateFormId:'',
        id: "",
        time:''
      },

      ruleValidate: {
        recordDate: [
          {
            required: true,
            message: "请选择登记时间",
          },
        ],
        contentPlatFormId: [
          {
            required: true,
            message: "请选择渠道",
          },
        ],
        contentPlateFormId: [
          {
            required: true,
            message: "请选择主播平台",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择主播ID",
          },
        ],
        liveAnchorWechatNo: [
          {
            required: true,
            message: "请输入主播微信号",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入客户手机号",
          },
        ],
        price: [
          {
            required: true,
            message: "请选择下单金额",
          },
        ],
        consultationType: [
          {
            required: true,
            message: "请选择面诊方式",
          },
        ],
      },
      // 平台
      contentPalteForms: [],
      // ip账号
      liveAnchors: [],
      //   下单金额
      priceList:[
          {
              id:1,
              price:199
          },
          {
              id:2,
              price:99
          }
        ],
        // 面诊方式
        faceList:[
            {
                id:1,
                name:'视频'
            },
            {
                id:2,
                name:'照片'
            },
            {
              id:3,
              name:'私信'
            },{
              id:5,
              name:'粉丝群'
            },
            {
              id:6,
              name:'短视频'
            },
            {
              id:4,
              name:'其他'
            }
        ],
        // 是否加v
        isAddWeChatList:[{
          type:-1,
          name:'全部加V状态'
        },{
          type:'true',
          name:'是'
        },{
          type:'false',
          name:'否'
        }],
        isWriteOffList:[{
          type:-1,
          name:'全部核销状态'
        },{
          type:'true',
          name:'是'
        },{
          type:'false',
          name:'否'
        }],
        isConsultationList:[{
          type:-1,
          name:'全部面诊状态'
        },{
          type:'true',
          name:'是'
        },{
          type:'false',
          name:'否'
        }],
        isReturnBackPriceList:[{
          type:-1,
          name:'全部退款状态'
        },{
          type:'true',
          name:'是'
        },{
          type:'false',
          name:'否'
        }],

    };
  },
  methods: {
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      orderApi.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
    // 获取平台列表（下拉框）
    getProvince() {
      apis.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
        }
      });
    },
    // 获取小黄车登记列表
    getSmallCar() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword , startDate,endDate,liveAnchorId,contentPlatFormId,isAddWechat,isWriteOff,isConsultation,isReturnBackPrice} = this.query;
      const data = { 
        pageNum, 
        pageSize, 
        keyword , 
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null ,
        liveAnchorId,
        contentPlatFormId,
        isAddWechat:isAddWechat == -1 ? null : isAddWechat,
        isWriteOff:isWriteOff == -1 ? null : isWriteOff,
        isConsultation:isConsultation == -1 ? null : isConsultation,
        isReturnBackPrice:isReturnBackPrice == -1 ? null : isReturnBackPrice
      };
      if(!startDate || !endDate){
        this.$Message.warning('请选择日期')
        return
      }
      api.shoppingCartRegistrationList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.shoppingCartRegistrationInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取小黄车登记列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, startDate,endDate,liveAnchorId,contentPlatFormId,isAddWechat,isWriteOff,isConsultation,isReturnBackPrice } = this.query;
      const data = { 
        pageNum, 
        pageSize, 
        keyword ,
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null ,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null ,
        liveAnchorId,
        contentPlatFormId,
        isAddWechat:isAddWechat == -1 ? null : isAddWechat,
        isWriteOff:isWriteOff == -1 ? null : isWriteOff,
        isConsultation:isConsultation == -1 ? null : isConsultation,
        isReturnBackPrice:isReturnBackPrice == -1 ? null : isReturnBackPrice
      };
      if(!startDate || !endDate){
        this.$Message.warning('请选择日期')
        return
      }
      api.shoppingCartRegistrationList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.shoppingCartRegistrationInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    handlePageSizeChange(pageSize){
      this.query.pageSize = pageSize
      this.getSmallCar()
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            if (this.form.phone) {
                if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
                  this.$Message.error("请输入正确的手机号");
                  return false;
                }else{
                  const {id,recordDate,contentPlatFormId,liveAnchorId,liveAnchorWechatNo,customerNickName,phone,price,consultationType,isWriteOff,isConsultation,isReturnBackPrice,remark,IsAddWeChat ,time } = this.form;
                  const data = { 
                    recordDate:time ? this.$moment(recordDate).format("YYYY-MM-DD")+'T' + time : this.$moment(recordDate).format("YYYY-MM-DD") + 'T' + '00:00:00',
                    contentPlatFormId,
                    liveAnchorId,
                    liveAnchorWechatNo,
                    customerNickName,
                    phone,
                    price,
                    consultationType,
                    isWriteOff,
                    isConsultation,
                    isReturnBackPrice,
                    remark ,
                    IsAddWeChat,
                    id
                    };
                  // 修改
                  api.editShoppingCartRegistration(data).then((res) => {
                    if (res.code === 0) {
                      this.isEdit = false;
                      this.cancelSubmit("form");
                      this.getSmallCar();
                      this.$Message.success({
                        content: "修改成功",
                        duration: 3,
                      });
                    }
                  });
                }
              }
          } else {
            const {recordDate,contentPlatFormId,liveAnchorId,liveAnchorWechatNo,customerNickName,phone,price,consultationType,isWriteOff,isConsultation,isReturnBackPrice,remark,IsAddWeChat,time  } = this.form;
            const data = { 
              recordDate:time ? this.$moment(recordDate).format("YYYY-MM-DD")+'T' + time : this.$moment(recordDate).format("YYYY-MM-DD") + 'T' + '00:00:00',
              contentPlatFormId,
              liveAnchorId,
              liveAnchorWechatNo,
              customerNickName,
              phone,
              price,
              consultationType,
              isWriteOff,
              isConsultation,
              isReturnBackPrice,
              remark ,
              IsAddWeChat
              };
              if (phone) {
                if (!/^1[3456789]\d{9}$/.test(phone)) {
                  this.$Message.error("请输入正确的手机号");
                  return false;
                }else{
                  // 添加
                  api.addShoppingCartRegistration(data).then((res) => {
                    if (res.code === 0) {
                      this.cancelSubmit("form");
                      this.getSmallCar();
                      this.$Message.success({
                        content: "添加成功",
                        duration: 3,
                      });
                    }
                  });
                }
              }
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
    this.getSmallCar();
    this.getProvince();
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
