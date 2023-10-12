<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px;"
            @keyup.enter.native="getListByPage()"
          />
          <Select
              v-model="query.leave"
              placeholder="请选择等级"
              filterable
              style="width: 200px;margin-left:10px"
          >
          <Option
              v-for="item in rfmtagNameListAll"
              :value="item.id"
              :key="item.id"
              
              >{{ item.name }}</Option
          >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getListByPage()"
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
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="importControlModal = true"
            >导入</Button
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
      width="60%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
      <Row :gutter="30">
            <Col span="8" >
                <FormItem label="手机号" prop="phone">
                    <Input v-model="form.phone" placeholder="请输入手机号" maxlength="20"></Input>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="主播微信号" prop="liveAnchorWechatNoId">
                    <Select
                        v-model="form.liveAnchorWechatNoId"
                        placeholder="请选择主播微信号"
                        filterable
                    >
                    <Option
                        v-for="item in weChatList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.weChatNo }}</Option
                    >
                    </Select>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="客服" prop="customerServiceId">
                    <Select
                        v-model="form.customerServiceId"
                        placeholder="请选择客服"
                        filterable
                    >
                    <Option
                        v-for="item in employee"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                    >
                    </Select>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="医院" prop="hospitalId">
                    <Select
                        v-model="form.hospitalId"
                        placeholder="请选择医院"
                        filterable
                    >
                    <Option
                        v-for="item in hospitallist"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                    >
                    </Select>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="成交金额" prop="dealPrice">
                    <Input v-model="form.dealPrice" placeholder="请输入成交金额" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="总成交金额" prop="totalDealPrice">
                    <Input v-model="form.totalDealPrice" placeholder="请输入总成交金额" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="消费次数" prop="consumptionFrequency">
                    <Input v-model="form.consumptionFrequency" placeholder="请输入消费次数" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="最新成交时间" prop="lastDealDate">
                    <DatePicker
                        type="date"
                        placeholder="选择最新成交时间"
                        :value="form.lastDealDate"
                        v-model="form.lastDealDate"
                    ></DatePicker>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="距上次消费天数" prop="recencyDate">
                    <Input v-model="form.recencyDate" placeholder="请输入距上次消费天数" type="number" number></Input>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="最新消费级别" prop="recency">
                    <Select
                        v-model="form.recency"
                        placeholder="请选择最新消费级别"
                        filterable
                    >
                    <Option
                        v-for="item in rfmvalueNameList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                    >
                    </Select>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="消费频率级别" prop="frequency">
                    <Select
                        v-model="form.frequency"
                        placeholder="请选择消费频率级别"
                        filterable
                    >
                    <Option
                        v-for="item in rfmvalueNameList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                    >
                    </Select>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="消费级别" prop="monetary">
                    <Select
                        v-model="form.monetary"
                        placeholder="请选择消费级别"
                        filterable
                    >
                    <Option
                        v-for="item in rfmvalueNameList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                    >
                    </Select>
                </FormItem>
            </Col>
            <Col span="8" >
                <FormItem label="RFM标签等级" prop="rfmTag">
                    <Select
                        v-model="form.rfmTag"
                        placeholder="请选择RFM标签等级"
                        filterable
                    >
                    <Option
                        v-for="item in rfmtagNameList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                    >
                    </Select>
                </FormItem>
            </Col>
            
        </Row>
        <Spin fix v-if="isFlag == true">
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
    <importFile
      :importControlModal.sync="importControlModal"
      @handleRefreshCustomerTrackList="getListByPage()"
    ></importFile>
  </div>
</template>
<script>
import * as api from "@/api/rFMCustomerInfo";
import * as cusApi from "@/api/customerManage";
import * as hospitalManage from "@/api/hospitalManage";
import * as liveAnchorApi from "@/api/liveAnchorWechatInfo";
import importFile from "./components/importModel.vue";
import * as orderApi from "@/api/orderManage";


export default {
  components:{
    importFile
  },
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        leave:-1,
        columns: [
            {
            title: "手机号",
            key: "phone",
            align:'center',
            tooltip:true,
            minWidth:180,
            render: (h, params) => {
              
              
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
                          const { encryptPhone } = params.row;
                          const data = {
                            encryptPhone
                          }
                          orderApi.decryptoPhonesNew(data).then((res) => {
                            if (res.code === 0) {
                              params.row.phone = res.data.phone;
                              params.row.bool = true;
                            }
                          });
                        },
                      },
                    }),
                  ]
                );
            }
          },
          {
            title: "客服",
            key: "customerServiceName",
            align:'center',
            tooltip:true,
            minWidth:150
          },
          {
            title: "主播微信号",
            key: "liveAnchorWechatNo",
            align:'center',
            tooltip:true,
            minWidth:150
          },
          
          {
            title: "成交时间",
            key: "lastDealDate",
            align:'center',
            tooltip:true,
            minWidth:130,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.lastDealDate).format("YYYY-MM-DD")
              );
            },
          },
          {
            title: "成交金额",
            key: "dealPrice",
            align:'center',
            tooltip:true,
            minWidth:140
          },
          {
            title: "总成交金额",
            key: "totalDealPrice",
            align:'center',
            tooltip:true,
            minWidth:140
          },
          {
            title: "消费次数",
            key: "consumptionFrequency",
            align:'center',
            tooltip:true,
            minWidth:120
          },
          {
            title: "最后消费间隔天数",
            key: "recencyDate",
            align:'center',
            tooltip:true,
            minWidth:160
          },
          {
            title: "间隔消费天数等级",
            key: "recency",
            align:'center',
            tooltip:true,
            minWidth:150
          },
          {
            title: "消费频次等级",
            key: "frequency",
            align:'center',
            tooltip:true,
            minWidth:130
          },
          {
            title: "消费等级",
            key: "monetary",
            align:'center',
            tooltip:true,
            minWidth:120
          },
          {
            title: "RFM标签等级",
            key: "rfmTag",
            align:'center',
            tooltip:true,
            minWidth:140
          },
          {
            title: "RFM等级名称",
            key: "rfmTagText",
            align:'center',
            tooltip:true,
            minWidth:180
          },
          
          {
            title: "操作",
            key: "",
            width: 150,
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
                        this.title = "修改";
                        api.byIdRFMCustomerInfo(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              id,
                              phone,
                              lastDealDate,
                              hospitalId,
                              dealPrice,
                              totalDealPrice,
                              consumptionFrequency,
                              recencyDate,
                              recencyLeave,
                              frequencyLeave,
                              monetaryLeave,
                              rfmTagLeave,
                              liveAnchorWechatNoId,
                              customerServiceId,
                            } = res.data.info;
                            this.form.phone = phone;
                            this.form.customerServiceId = customerServiceId;
                            this.form.lastDealDate = lastDealDate;
                            this.form.hospitalId = hospitalId;
                            this.form.dealPrice = dealPrice;
                            this.form.totalDealPrice = totalDealPrice;
                            this.form.consumptionFrequency = consumptionFrequency;
                            this.form.recencyDate = recencyDate;
                            this.form.recency = recencyLeave;
                            this.form.frequency = frequencyLeave;
                            this.form.monetary = monetaryLeave;
                            this.form.rfmTag = rfmTagLeave;
                            this.form.liveAnchorWechatNoId = liveAnchorWechatNoId;
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
                            const data={
                                id
                            }
                            api.deleteRFMCustomerInfo(data).then((res) => {
                              if (res.code === 0) {
                                this.getListByPage();
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
      // 导入model
      importControlModal:false,
      // 控制 modal
      controlModal: false,
      // 加载中
      isFlag:false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id:"",
        // 手机号
        phone:'',
        // 客服
        customerServiceId:null,
        // 最后一次成交时间
        lastDealDate:'',
        // 医院
        hospitalId:null,
        // 最后一次成交金额
        dealPrice:null,
        // 总成交金额
        totalDealPrice:null,
        // 消费次数
        consumptionFrequency:null,
        // 最近一次成交金额
        recentDealPrice:null,
        // 最近一次消费级别
        recency:null,
        // 消费频率级别
        frequency:null,
        // 消费级别
        monetary:null,
        // RFM标签等级
        rfmTag:null,
        // 主播微信号id
        liveAnchorWechatNoId:null,
        // 距上次消费天数
        recencyDate:null,
        isEdit:false,
      },

      ruleValidate: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
          },
        ],
        customerServiceId: [
          {
            required: true,
            message: "请选择客服",
          },
        ],
        lastDealDate: [
          {
            required: true,
            message: "请选择最新成交时间",
          },
        ],
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],

        dealPrice: [
          {
            required: true,
            message: "请输入成交金额",
          },
        ],
        totalDealPrice: [
          {
            required: true,
            message: "请输入总成交金额",
          },
        ],
        consumptionFrequency: [
          {
            required: true,
            message: "请选择消费次数",
          },
        ],

        recencyDate: [
          {
            required: true,
            message: "请输入距上次消费天数",
          },
        ],
        recency: [
          {
            required: true,
            message: "请选择最新消费级别",
          },
        ],

        frequency: [
          {
            required: true,
            message: "请选择消费频率级别",
          },
        ],
        monetary: [
          {
            required: true,
            message: "请选择消费级别",
          },
        ],
        rfmTag: [
          {
            required: true,
            message: "请选择RFM标签等级",
          },
        ],
        liveAnchorWechatNoId: [
          {
            required: true,
            message: "请选择主播微信号",
          },
        ],
      },
    //   客服
      employee: [],
    //   医院
      hospitallist: [],
    //   消费级别
    rfmvalueNameList:[],
    // 标签
    rfmtagNameList:[],
    rfmtagNameListAll:[{id:-1,name:'全部等级'}],
    // 微信号
    weChatList:[]
    };
  },
  methods: {
     //  根据主播获取主播微信号
    getWeChatList() {
      const data = {
        liveanchorId: '',
      };
      liveAnchorApi.getvalidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchorWechatInfos } = res.data;
          this.weChatList = liveAnchorWechatInfos;
        }
      });
    },
    // 获取rfm值名称列表
    getRfmvalueNameList() {
      api.getRfmvalueNameList().then((res) => {
        if (res.code === 0) {
          this.rfmvalueNameList = res.data.nameList;
        }
      });
    },
    // 获取rfm标签名称列表
    getRfmtagNameList() {
      api.getRfmtagNameList().then((res) => {
        if (res.code === 0) {
          this.rfmtagNameList = res.data.nameList;
          this.rfmtagNameListAll = [...this.rfmtagNameListAll,...res.data.nameList];
        }
      });
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitallist = res.data.hospitalInfo;
        }
      });
    },
    // 获取客服列表
    getCustomerServiceList() {
      cusApi.getCustomerServiceList().then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = employee
        }
      });
    },

    // 获取rfm客户列表
    getListByPage() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,leave} = this.query;
      const data = { pageNum, pageSize ,keyword,leave:leave==-1? null : leave };
      api.getListByPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.list;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取rfm客户列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,leave} = this.query;
        const data = { pageNum, pageSize ,keyword,leave:leave==-1? null : leave };
        api.getListByPage(data).then((res) => {
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
            const {id,phone,customerServiceId,lastDealDate,hospitalId,dealPrice,totalDealPrice,consumptionFrequency,recencyDate,recency,frequency,
            monetary,rfmTag,liveAnchorWechatNoId} = this.form
            const data = {
                id,
                phone,
                customerServiceId,
                lastDealDate:this.$moment(lastDealDate).format("YYYY-MM-DD"),
                hospitalId,
                dealPrice,
                totalDealPrice,
                consumptionFrequency,
                recencyDate,
                recency,
                frequency,
                monetary,
                rfmTag,
                liveAnchorWechatNoId,
            }
          if (this.title == '修改') {
            this.isFlag = true
            // 修改
            api.updateRFMCustomerInfo(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.isFlag = false
                this.cancelSubmit("form");
                this.getListByPage();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }else{
                setTimeout(()=>{
                  this.isFlag = false
                })
              }
            });
          } else {
            this.isFlag = true
            // 添加
            api.addRFMCustomerInfo(data).then((res) => {
              if (res.code === 0) {
                this.isFlag = false
                this.cancelSubmit("form");
                this.getListByPage();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              }else{
                setTimeout(()=>{
                  this.isFlag = false
                })
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
    this.getListByPage();
    this.getCustomerServiceList();
    this.getHospitalInfonameList();
    this.getRfmvalueNameList();
    this.getRfmtagNameList();
    this.getWeChatList()
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