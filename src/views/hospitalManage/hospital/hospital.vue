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
      width="1000"
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
            <FormItem label="医院名称" prop="name">
              <Input v-model="form.name" placeholder="请输入医院名称"></Input>
            </FormItem>
          </Col>
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
                style="width: 190px"
                @on-change="hospitalTime"
                @on-clear="form.businessHours = []"
              ></Time-picker>
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
            <FormItem label="到期时间" prop="dueTime">
              <DatePicker
                type="date"
                placeholder="到期时间"
                style="width: 160px; margin-left: 10px"
                :value="form.dueTime"
                v-model="form.dueTime"
              ></DatePicker>
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
            <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
              <i-switch v-model="form.valid" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
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
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
import upload from "@/components/upload/upload";
import uploadFile from "@/components/upload/uploadFile";
import { download } from "@/utils/util";

export default {
  components: {
    upload,
    uploadFile,
  },
  data() {
    return {
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
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "医院名称",
            key: "name",
            minWidth: 220,
          },
          {
            title: "logo",
            key: "thumbPicUrl",
            align: "center",
            minWidth: 140,
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
            title: "地址",
            key: "address",
            minWidth: 240,
          },
          {
            title: "经度",
            key: "longitude",
            minWidth: 140,
          },
          {
            title: "纬度",
            key: "latitude",
            minWidth: 140,
          },
          {
            title: "医院电话",
            key: "phone",
            minWidth: 170,
          },
          {
            title: "城市",
            key: "city",
            minWidth: 120,
          },
          {
            title: "可用时间",
            key: "dueTime",
            minWidth: 160,
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
            minWidth: 160,
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
            title: "是否有效",
            key: "valid",
            minWidth: 120,
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
            title: "操作",
            key: "",
            minWidth: 240,
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
                        api.byIdGetHospitalInfo(id).then((res) => {
                          if (res.code === 0) {
                            if (res.data.hospitalInfo.contractUrl) {
                              window.open(res.data.hospitalInfo.contractUrl);
                            } else {
                              this.$Message.error("暂无上传合同");
                            }
                          }
                        });
                      },
                    },
                  },
                  "预览合同"
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
      },

      ruleValidate: {
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
    };
  },
  methods: {
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
      const { keyword, pageNum, pageSize, valid } = this.query;
      const data = { keyword, pageNum, pageSize, valid };
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
      const { keyword, pageSize, valid } = this.query;
      const data = { keyword, pageNum, pageSize, valid };
      api.HospitalInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
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
                this.getHospitalInfo();
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
      this.uploadFileObj.uploadList = [];
      this.$refs.uploadFile.uploadListName = [];
      this.uploadFileName = [];
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.uploadObj.uploadList = [];
        this.uploadFileObj.uploadList = [];
        this.$refs.uploadFile.uploadListName = [];
        this.uploadFileName = [];
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getHospitalInfo();
    this.getScaleTagList();
    this.getFacilityTagList();
    this.getCityList();
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
