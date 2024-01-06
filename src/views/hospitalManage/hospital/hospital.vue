<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入医院名称"
            style="width: 200px"
            @keyup.enter.native="getHospitalInfo()"
          />
          <Select v-model="query.cityId" placeholder="请选择城市" filterable style="width: 200px;margin-left:10px">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          <Select
            v-model="query.valid"
            style="width: 140px; margin-left: 10px"
            placeholder="是否有效"
          >
            <Option
              v-for="item in query.isValidList"
              :value="item.valid"
              :key="item.valid"
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
        <!-- columns2 没有 年服务费金额和保证金金额 不是管理员、研发、财务角色看不了年服务费金额和保证金金额 -->
        <Table border :columns="positionId == 1 || positionId == 16 || positionId == 13 ? query.columns : query.columns2" :data="query.data"></Table>
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
      width="70%"
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
            <FormItem label="序号" prop="sort">
              <Input v-model="form.sort" placeholder="请输入序号" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="医院名称" prop="name">
              <Input v-model="form.name" placeholder="请输入医院名称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="医院简称" prop="simpleName">
              <Input v-model="form.simpleName" placeholder="请输入医院简称"></Input>
            </FormItem>
          </Col>
          
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="地址" prop="address">
              <Input v-model="form.address" placeholder="请输入地址"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="医院营业时间" prop="businessHours">
              <Time-picker
                :value="form.businessHours"
                format="HH:mm"
                type="timerange"
                placement="bottom-end"
                placeholder="选择医院营业时间"
                style="width: 100%"
                @on-change="hospitalTime"
                @on-clear="form.businessHours = []"
              ></Time-picker>
            </FormItem>
          </Col>
          
          <Col span="8">
            <FormItem label="医院电话" prop="phone">
              <Input
                v-model="form.phone"
                style="width: 100%"
                placeholder="请输入医院电话"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          
          <Col span="8">
            <FormItem label="医院级别" prop="scaleTagList">
              <Select
                v-model="form.scaleTagList"
                multiple
                placeholder="请选择医院级别"
              >
                <Option
                  v-for="item in scaleTagList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="医院设施" prop="facilityTagList">
              <Select
                v-model="form.facilityTagList"
                multiple
                placeholder="请选择医院设施"
              >
                <Option
                  v-for="item in facilityTagList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="城市选择" prop="cityId">
              <Select v-model="form.cityId" placeholder="请选择城市" filterable>
                <Option v-for="item in citys" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="经度" prop="longitude">
              <InputNumber
                v-model="form.longitude"
                style="width: 100%"
                placeholder="请输入经度"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="纬度" prop="latitude">
              <InputNumber
                v-model="form.latitude"
                style="width: 100%"
                placeholder="请输入纬度"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="到期时间" prop="dueTime">
              <DatePicker
                type="date"
                placeholder="到期时间"
                style="width: 100%;"
                :value="form.dueTime"
                v-model="form.dueTime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="归属公司" prop="belongCompany">
              <Select v-model="form.belongCompany" placeholder="请选择归属公司" filterable>
                <Option v-for="item in nameList" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          
          
          <Col span="8">
            <FormItem label="派单顺序" prop="sendOrder">
              <Select v-model="form.sendOrder" placeholder="请选择派单顺序" filterable>
                <Option v-for="item in sendOrderNameList" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="新诊佣金比例(%)" prop="newCustomerCommissionRatio">
              <Input v-model="form.newCustomerCommissionRatio" placeholder="请输入新诊佣金比例" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="复诊佣金比例(%)" prop="oldCustomerCommissionRatio">
              <Input v-model="form.oldCustomerCommissionRatio" placeholder="请输入复诊佣金比例" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="重单规则" prop="repeatOrderRule">
              <Input v-model="form.repeatOrderRule" placeholder="请输入重单规则"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="年服务费缴纳" prop="yearServiceFee">
              <Select v-model="form.yearServiceFee" placeholder="请选择年服务费缴纳" filterable>
                <Option v-for="item in payStatusNameList" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="保证金缴纳" prop="securityDeposit">
              <Select v-model="form.securityDeposit" placeholder="请选择保证金缴纳" filterable>
                <Option v-for="item in payStatusNameList" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="年服务费金额" prop="yearServiceMoney">
              <Input v-model="form.yearServiceMoney" placeholder="请输入年服务费金额" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="保证金金额" prop="securityDepositMoney">
              <Input v-model="form.securityDepositMoney" placeholder="请输入保证金金额" type="number" number></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="医院logo" prop="thumbPicUrl">
              <upload
                :uploadObj="uploadObj"
                @uploadChange="handleUploadChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否在小程序展示" prop="isShareInMiniProgram" >
              <i-switch v-model="form.isShareInMiniProgram" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
              <i-switch v-model="form.valid" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30" v-if="title == '添加'">
          <Col span="13">
            <FormItem label="上传合同" prop="contractUrl">
              <uploadFile
                :uploadObj="uploadFileObj"
                @uploadChange="handleUploadFileChange"
                ref="uploadFile"
              />
              <div style="color:red;margin-right:5px">
                *注：该文件只支持pdf格式<span
                  style="margin-left:10px;color:#2d8cf0;cursor: pointer;"
                  @click="jumpHtml"
                  >请点击进入在线转换地址</span
                >
              </div>
            </FormItem>
          </Col>
        </Row>
        <Spin fix v-if="flag == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 合同 -->
    <contract :contractModel.sync ="contractModel" :contractParams="contractParams"/>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
import * as corApi from "@/api/corporateManagement";
import upload from "@/components/upload/upload";
import uploadFile from "@/components/upload/uploadFile";
import { download } from "@/utils/util";
import contract from "./components/contract.vue"
export default {
  components: {
    upload,
    uploadFile,
    contract
  },
  data() {
    return {
      // 合同model
      contractModel:false,
      contractParams:{
        id:''
      },
      // 归属公司
      nameList:[],
      flag: false,
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 上传文件
      uploadFileObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
        // 文件名称
        uploadListName: [],
      },
      // 接收子组件的文件名称
      uploadFileName: [],

      // 查询
      query: {
        hospitalpageNumEdit: 1,
        isValidList: [
          {
            valid: "true",
            name: "有效",
          },
          {
            valid: "false",
            name: "无效",
          },
        ],
        valid: "true",
        cityId:-1,
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "序号",
            key: "sort",
            minWidth: 100,
            align:'center'
          },
          {
            title: "医院logo",
            key: "thumbPicUrl",
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
                    src: params.row.thumbPicUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "医院名称",
            key: "name",
            minWidth: 220,
            align:'center',
            tooltip:true
          },
          {
            title: "医院简称",
            key: "simpleName",
            minWidth: 220,
            align:'center',
            tooltip:true
          },
          
          {
            title: "地址",
            key: "address",
            minWidth: 240,
            tooltip:true
          },
          {
            title: "经度",
            key: "longitude",
            minWidth: 140,
            align:'center'
          },
          {
            title: "纬度",
            key: "latitude",
            minWidth: 140,
            align:'center'
          },
          {
            title: "医院电话",
            key: "phone",
            minWidth: 160,
            align:'center'
          },
          {
            title: "城市",
            key: "city",
            minWidth: 100,
            align:'center'
          },
          {
            title: "可用时间",
            key: "dueTime",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return h("span", {
                domProps: {
                  innerHTML: params.row.hasUsedTime,
                },
              });
            },
          },
          {
            title: "到期日期",
            key: "dueTime",
            align:'center',
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                params.row.dueTime
                  ? this.$moment(params.row.dueTime).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "派单顺序",
            key: "sendOrderText",
            minWidth: 160,
            align:'center'
          },
          {
            title: "新诊佣金比例(%)",
            key: "newCustomerCommissionRatio",
            minWidth: 150,
            align:'center'
          },
          {
            title: "复诊佣金比例(%)",
            key: "oldCustomerCommissionRatio",
            minWidth: 150,
            align:'center'
          },
          {
            title: "重单规则",
            key: "repeatOrderRule",
            minWidth: 200,
            align:'center',
            tooltip:true
          },
          {
            title: "年服务费缴纳状态",
            key: "yearServiceFeeText",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              if (params.row.yearServiceFeeText == '已缴纳') {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.yearServiceFeeText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.yearServiceFeeText
                );
              }
            },
          },
          {
            title: "保证金缴纳状态",
            key: "securityDepositText",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              if (params.row.securityDepositText == '已缴纳') {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.securityDepositText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.securityDepositText
                );
              }
            },
          },
           {
            title: "年服务费金额",
            key: "yearServiceMoney",
            minWidth: 140,
            align:'center',
          },
          {
            title: "保证金金额",
            key: "securityDepositMoney",
            minWidth: 120,
            align:'center'
          },
          {
            title: "是否有效",
            key: "valid",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if (params.row.valid == true) {
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
            title: "是否在小程序展示",
            key: "isShareInMiniProgram",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              if (params.row.isShareInMiniProgram == true) {
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
            title: "操作",
            key: "",
            minWidth: 200,
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
                        const { id } = params.row;
                        // api.byIdGetHospitalInfo(id).then((res) => {
                        //   if (res.code === 0) {
                        //     if (res.data.hospitalInfo.contractUrl) {
                        //       window.open(res.data.hospitalInfo.contractUrl);
                        //     } else {
                        //       this.$Message.error("暂无上传合同");
                        //     }
                        //   }
                        // });
                        this.contractModel = true
                        this.contractParams.id = id
                      },
                    },
                  },
                  "合同"
                ),
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
                        api.byIdGetHospitalInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            this.form = {
                              ...res.data.hospitalInfo,
                              tagIds: [],
                            };

                            this.uploadObj.uploadList = [this.form.thumbPicUrl];
                            this.controlModal = true;
                            this.form.businessHours = this.form.businessHours.split(
                              "-"
                            );
                            this.form.contractUrl = '';
                            // this.form.dueTime = this.$moment(new Date(res.data.hospitalInfo.dueTime)).format("YYYY-MM-DD")
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
                            api.deleteHospitalInfo(id).then((res) => {
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
        // columns2 没有 年服务费金额和保证金金额 不是管理员、研发、财务角色看不了 年服务费金额和保证金金额
        columns2: [
          {
            title: "序号",
            key: "sort",
            minWidth: 70,
            align:'center'
          },
          {
            title: "医院logo",
            key: "thumbPicUrl",
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
                    src: params.row.thumbPicUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "医院名称",
            key: "name",
            minWidth: 220,
            align:'center',
            tooltip:true
          },
          {
            title: "医院简称",
            key: "simpleName",
            minWidth: 220,
            align:'center',
            tooltip:true
          },
          
          {
            title: "地址",
            key: "address",
            minWidth: 240,
            tooltip:true
          },
          {
            title: "经度",
            key: "longitude",
            minWidth: 140,
            align:'center'
          },
          {
            title: "纬度",
            key: "latitude",
            minWidth: 140,
            align:'center'
          },
          {
            title: "医院电话",
            key: "phone",
            minWidth: 160,
            align:'center'
          },
          {
            title: "城市",
            key: "city",
            minWidth: 100,
            align:'center'
          },
          {
            title: "可用时间",
            key: "dueTime",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              return h("span", {
                domProps: {
                  innerHTML: params.row.hasUsedTime,
                },
              });
            },
          },
          {
            title: "到期日期",
            key: "dueTime",
            align:'center',
            minWidth: 120,
            render: (h, params) => {
              return h(
                "div",
                params.row.dueTime
                  ? this.$moment(params.row.dueTime).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "派单顺序",
            key: "sendOrderText",
            minWidth: 160,
            align:'center'
          },
          {
            title: "新诊佣金比例(%)",
            key: "newCustomerCommissionRatio",
            minWidth: 150,
            align:'center'
          },
          {
            title: "复诊佣金比例(%)",
            key: "oldCustomerCommissionRatio",
            minWidth: 150,
            align:'center'
          },
          {
            title: "重单规则",
            key: "repeatOrderRule",
            minWidth: 200,
            align:'center',
            tooltip:true
          },
          {
            title: "年服务费缴纳状态",
            key: "yearServiceFeeText",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              if (params.row.yearServiceFeeText == '已缴纳') {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.yearServiceFeeText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.yearServiceFeeText
                );
              }
            },
          },
          {
            title: "保证金缴纳状态",
            key: "securityDepositText",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              if (params.row.securityDepositText == '已缴纳') {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.securityDepositText
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.securityDepositText
                );
              }
            },
          },
          {
            title: "是否有效",
            key: "valid",
            minWidth: 120,
            align:'center',
            render: (h, params) => {
              if (params.row.valid == true) {
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
            title: "是否在小程序展示",
            key: "isShareInMiniProgram",
            minWidth: 160,
            align:'center',
            render: (h, params) => {
              if (params.row.isShareInMiniProgram == true) {
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
            title: "操作",
            key: "",
            minWidth: 200,
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
                        const { id } = params.row;
                        // api.byIdGetHospitalInfo(id).then((res) => {
                        //   if (res.code === 0) {
                        //     if (res.data.hospitalInfo.contractUrl) {
                        //       window.open(res.data.hospitalInfo.contractUrl);
                        //     } else {
                        //       this.$Message.error("暂无上传合同");
                        //     }
                        //   }
                        // });
                        this.contractModel = true
                        this.contractParams.id = id
                      },
                    },
                  },
                  "合同"
                ),
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
                        api.byIdGetHospitalInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            this.form = {
                              ...res.data.hospitalInfo,
                              tagIds: [],
                            };

                            this.uploadObj.uploadList = [this.form.thumbPicUrl];
                            this.controlModal = true;
                            this.form.businessHours = this.form.businessHours.split(
                              "-"
                            );
                            this.form.contractUrl = "";
                            // this.form.dueTime = this.$moment(new Date(res.data.hospitalInfo.dueTime)).format("YYYY-MM-DD")
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
                            api.deleteHospitalInfo(id).then((res) => {
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
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      // 标签列表 医院级别
      scaleTagList: [],

      // 标签列表 医院设施
      facilityTagList: [],

      // 城市列表
      citys: [],
      cityList:[{id:-1,name:'全部城市'}],

      form: {
        // 医院名称
        name: "",
        // 缩略图
        thumbPicUrl: "",
        // 地址
        address: "",
        // 经度
        longitude: null,
        // 纬度
        latitude: null,
        // 医院电话
        phone: null,
        // 标签编号数组
        tagIds: [],
        scaleTagList: [],
        facilityTagList: [],
        id: "",
        // 是否有效
        valid: false,
        // 城市ID
        cityId: "",
        // 营业时间
        businessHours: [],
        // 上传文件
        contractUrl: "",
        // 到期时间
        dueTime: null,
        // 归属公司
        belongCompany:'',
        // 是否在小程序里展示
        isShareInMiniProgram:false,
        // 医院简称
        simpleName:'',
        // 序号
        sort:null,
        // 派单顺序
        sendOrder:null,
        // 新诊佣金比例
        newCustomerCommissionRatio:null,
        // 复诊佣金比例
        oldCustomerCommissionRatio:null,
        // 重单规则
        repeatOrderRule:'',
        // 年服务费缴纳状态
        yearServiceFee:null,
        // 保证金缴纳状态
        securityDeposit:null,
        // 年服务费金额
        yearServiceMoney:null,
        // 保证金金额
        securityDepositMoney:null
      },

      ruleValidate: {
        simpleName: [
          {
            required: true,
            message: "请输入医院简称",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入序号",
          },
        ],
        sendOrder: [
          {
            required: true,
            message: "请选择派单顺序",
          },
        ],
        newCustomerCommissionRatio: [
          {
            required: true,
            message: "请输入新诊佣金比例",
          },
        ],
        oldCustomerCommissionRatio: [
          {
            required: true,
            message: "请输入复诊佣金比例",
          },
        ],
        repeatOrderRule: [
          {
            required: true,
            message: "请输入输入重单规则",
          },
        ],
        yearServiceFee: [
          {
            required: true,
            message: "请选择年服务费缴纳状态",
          },
        ],
        securityDeposit: [
          {
            required: true,
            message: "请选择保证金缴纳状态",
          },
        ],
        yearServiceMoney: [
          {
            required: true,
            message: "请输入年服务费金额",
          },
        ],
        securityDepositMoney: [
          {
            required: true,
            message: "请输入保证金金额",
          },
        ],
        belongCompany: [
          {
            required: true,
            message: "请选择归属公司",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入医院名称",
          },
        ],
        thumbPicUrl: [
          {
            required: true,
            message: "请上传缩略图",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
          },
        ],
        longitude: [
          {
            required: true,
            type: "number",
            message: "请输入经度",
          },
        ],
        latitude: [
          {
            required: true,
            type: "number",
            message: "请输入纬度",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入医院电话",
          },
        ],
        scaleTagList: [
          {
            required: true,
            message: "请选择医院级别",
          },
        ],
        facilityTagList: [
          {
            required: true,
            message: "请选择医院设施",
          },
        ],
        cityId: [
          {
            required: true,
            message: "请选择城市",
          },
        ],
        businessHours: [
          {
            required: true,
            message: "请选择营业时间",
          },
          {
            validator: (rule, value, callback) => {
              if (!value.length) {
                callback(new Error("请选择营业时间"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
        dueTime: [
          {
            required: true,
            message: "请选择到期时间",
          },
        ],
      },
      // 派单顺序
      sendOrderNameList:[],
      // 年费或保证金缴纳状态列表
      payStatusNameList:[],
      // 获取角色
      positionId:sessionStorage.getItem('positionId')
    };
  },
  methods: {
    // 获取派单顺序名称列表
    getsendOrderList() {
      api.sendOrderList().then((res) => {
        if (res.code === 0) {
          this.sendOrderNameList = res.data.nameList
        }
      });
    },
    // 获取年费或保证金缴纳状态列表
    getpayStatusList() {
      api.payStatusList().then((res) => {
        if (res.code === 0) {
          this.payStatusNameList = res.data.nameList
        }
      });
    },
    // 获取公司列表
    getCompanyBaseInfoNameList() {
      corApi.getCompanyBaseInfoNameList().then((res) => {
        if (res.code === 0) {
          const { nameList} = res.data;
          this.nameList= nameList;
        }
      });
    },
    // PDF转换地址
    jumpHtml() {
      window.open("https://smallpdf.com/cn/word-to-pdf");
    },
    // 城市选择
    getCityList() {
      api.cityListy().then((res) => {
        if (res.code === 0) {
          const { citys } = res.data;
          this.citys = citys;
          this.cityList = [...this.cityList,...citys];
        }
      });
    },
    // 营业时间
    hospitalTime(data) {
      if (!data) return;
      this.form.businessHours = data;
    },
    // 获取医院列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize, valid ,cityId} = this.query;
      const data = { keyword, pageNum, pageSize, valid ,cityId : cityId == -1 ? null : cityId};
      api.HospitalInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize, valid ,cityId} = this.query;
      const data = { keyword, pageNum, pageSize, valid,cityId:cityId == -1 ? null : cityId };
      api.HospitalInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
          // 修改时 保留在当前页面
          // sessionStorage.setItem("hospitalpageNumEdit", pageNum);
        }
      });
    },

    // 获取标签列表 医院级别
    getScaleTagList() {
      const data = {
        type: 0,
      };
      api.TagInfonameList(data).then((res) => {
        if (res.code === 0) {
          this.scaleTagList = res.data.tagInfo;
        }
      });
    },

    // 获取标签列表 医院设施
    getFacilityTagList() {
      const data = {
        type: 1,
      };
      api.TagInfonameList(data).then((res) => {
        if (res.code === 0) {
          this.facilityTagList = res.data.tagInfo;
        }
      });
    },

    // 图片
    handleUploadChange(values) {
      this.form.thumbPicUrl = values[0];
    },
    // 上传文件
    handleUploadFileChange(values, uploadListName) {
      this.form.contractUrl = values[0];
      this.uploadFileName = uploadListName;
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            let { scaleTagList, facilityTagList, ...data } = this.form;
            data.tagIds = [...scaleTagList, ...facilityTagList];
            data.businessHours = this.form.businessHours.join("-");
            // data.contractUrl = this.form.contractUrl ? this.form.contractUrl : ""
            data.dueTime = this.$moment(new Date(this.form.dueTime)).format(
              "YYYY-MM-DD"
            );
            this.flag = true;
            // 修改
            api.updateHospitalInfo(data).then((res) => {
              if (res.code === 0) {
                this.flag = false;
                this.isEdit = false;
                this.cancelSubmit();
                this.handlePageChange(this.$refs.pages.currentPage);;
                // window.location.reload()
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              } else {
                setTimeout(() => {
                  this.flag = false;
                }, 3000);
              }
            });
          } else {
            let {
              id,
              valid,
              scaleTagList,
              facilityTagList,
              ...data
            } = this.form;
            data.tagIds = [...scaleTagList, ...facilityTagList];
            data.businessHours = this.form.businessHours.join("-");
            data.dueTime = this.$moment(new Date(this.form.dueTime)).format(
              "YYYY-MM-DD"
            );
            // data.contractUrl = this.form.contractUrl ? this.form.contractUrl : ""
            this.flag = true;
            // 添加
            api.addHospitalInfo(data).then((res) => {
              if (res.code === 0) {
                this.flag = false;
                this.cancelSubmit();
                this.getHospitalInfo();
                // window.location.reload()
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              } else {
                setTimeout(() => {
                  this.flag = false;
                }, 3000);
              }
            });
          }
        }
      });
    },

    // 取消
    cancelSubmit() {
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      
      if(this.title == '添加'){
        this.uploadFileObj.uploadList = [];
        this.$refs.uploadFile.uploadListName = [];
        this.$refs.uploadFile.uploadList = [];
        this.uploadFileName = [];
      }
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.uploadObj.uploadList = [];
        // this.uploadFileObj.uploadList = [];
        // this.$refs.uploadFile.uploadList = [];
        // this.$refs.uploadFile.uploadListName = [];
        // this.uploadFileName = [];
        if(this.title == '添加'){
          this.uploadFileObj.uploadList = [];
        this.$refs.uploadFile.uploadListName = [];
        this.$refs.uploadFile.uploadList = [];
        this.uploadFileName = [];
      }
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getHospitalInfo();
    this.getScaleTagList();
    this.getFacilityTagList();
    this.getCityList();
    this.getCompanyBaseInfoNameList();
    this.getsendOrderList();
    this.getpayStatusList()
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
