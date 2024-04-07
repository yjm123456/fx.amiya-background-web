<template>
  <div>
    <Card :dis-hover="true">
      <Input
        v-model="query.keyword"
        placeholder="请输入手机号或提报内容"
        style="width: 200px;"
        @keyup.enter.native="getUnprocessedFollowUpCallSubmission()"
      />
      <DatePicker
        type="date"
        placeholder="开始日期"
        style="width: 180px; margin-left: 10px"
        :value="query.startDate"
        v-model="query.startDate"
        transfer
      ></DatePicker>
      <DatePicker
        type="date"
        placeholder="结束日期"
        style="width: 180px; margin-left: .625rem"
        :value="query.endDate"
        v-model="query.endDate"
        transfer
      ></DatePicker>
      <Button
        type="primary"
        style="margin-left: 10px"
        @click="getUnprocessedFollowUpCallSubmission()"
        >查询</Button
      >
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
      title="确认"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="120"
      >
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="跟进情况" prop="isTrackedResult">
              <Select
                v-model="form.isTrackedResult"
                placeholder="请选择跟进情况"
                @on-change="trackedResultChange"
              >
                <Option
                  :value="item.type"
                  v-for="item in trackedResult"
                  :key="item.type"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>

          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem label="加v状态" prop="isAddWechat">
              <RadioGroup v-model="form.isAddWechat">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem
              label="未加V原因"
              prop="unAddWechatReasonId"
              ref="unAddWechatReasonId"
            >
              <Select
                v-model="form.unAddWechatReasonId"
                placeholder="请选择未加V原因"
                :disabled="form.isAddWechat == '是' || !form.isAddWechat"
              >
                <Option
                  :value="item.id"
                  v-for="item in unAddList"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem
              label="回访工具"
              prop="addTrackRecord.trackToolId"
              key="回访工具"
            >
              <div class="template">
                <Select
                  v-model="form.addTrackRecord.trackToolId"
                  placeholder="请选择回访工具"
                >
                  <Option
                    :value="item.id"
                    v-for="item in trackTool"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
                <!-- <Button class="btn" v-show="trackReturnVisitToolName === '电话'" :type="callSuccessMsg && callSuccessMsg.CallRecordID ? 'success' : 'primary'" @click="call">
                    <span class="iconfont icon-dianhua1"></span>
                </Button> -->
              </div>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem label="新老客" prop="isOldCustomerTrack">
              <RadioGroup v-model="form.isOldCustomerTrack">
                <Radio label="新客"></Radio>
                <Radio label="老客"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem
              label="回访目的"
              prop="addTrackRecord.trackTypeId"
              key="回访目的"
            >
              <Select
                v-model="form.addTrackRecord.trackTypeId"
                placeholder="请选择回访目的"
                :disabled="!form.isOldCustomerTrack"
              >
                <Option
                  :value="item.id"
                  v-for="item in trackType"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'" key="客户类型">
            <FormItem
              label="客户类型"
              prop="addTrackRecord.trackThemeId"
              :rules="{
                required:
                  trackThemeList.length == 0 || trackThemeList == []
                    ? false
                    : true,
                message: '请选择客户类型',
              }"
              ref="trackThemeId"
            >
              <Select
                v-model="form.addTrackRecord.trackThemeId"
                placeholder="请选择客户类型"
                :disabled="trackThemeList.length == 0 || trackThemeList == []"
              >
                <Option
                  :value="item.id"
                  v-for="item in trackThemeList"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem
              label="回访主题"
              prop="addTrackRecord.trackPlan"
              key="回访主题"
            >
              <Input
                v-model="form.addTrackRecord.trackPlan"
                placeholder="请输入回访主题"
              />
            </FormItem>
          </Col>
          <!-- <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem
              label="是否有效"
              prop="addTrackRecord.valid"
              key="是否有效"
            >
              <i-switch v-model="form.addTrackRecord.valid" />
            </FormItem>
          </Col> -->
          <Col span="8" v-if="form.isTrackedResult == 'false'">
            <FormItem label="跟进备注" prop="hospitalContent" key="跟进备注">
              <Input
                v-model="form.hospitalContent"
                show-word-limit
                type="textarea"
                placeholder="请输入跟进备注"
                class="hospitalContent"
                :rows="7"
              />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem
              label="回访内容"
              prop="addTrackRecord.trackContent"
              key="回访内容"
            >
              <Input
                v-model="form.addTrackRecord.trackContent"
                show-word-limit
                type="textarea"
                placeholder="请输入回访内容"
                class="trackContent"
                :rows="3"
              />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem label="回访截图1" prop="trackPicture1">
              <upload
                :uploadObj="uploadObj1"
                @uploadChange="handleUploadChange1"
              />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem label="回访截图2" prop="trackPicture2">
              <upload
                :uploadObj="uploadObj2"
                @uploadChange="handleUploadChange2"
              />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isTrackedResult == 'true'">
            <FormItem label="回访截图3" prop="trackPicture3">
              <upload
                :uploadObj="uploadObj3"
                @uploadChange="handleUploadChange3"
              />
            </FormItem>
          </Col>
        </Row>
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
import * as apis from "@/api/common";
import upload from "@/components/upload/upload";

export default {
  components: {
    upload,
  },
  props: ["activeName"],
  data() {
    return {
      query: {
        keyword: "",
        startDate: "",
        endDate: "",
        valid: null,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "编号",
            key: "id",
            width: 200,
          },
          {
            title: "客户电话",
            key: "phone",
            width: 130,
          },
          {
            title: "提报状态",
            key: "sendStatusText",
            width: 100,
          },
          {
            title: "提报内容",
            key: "sendContent",
          },
          {
            title: "提报医院",
            key: "sendHospital",
            width: 220,
          },
          {
            title: "医院回访内容",
            key: "hospitalContent",
          },
          {
            title: "提报日期",
            key: "sendDate",
            width: 180,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.sendDate).format("YYYY-MM-DD HH:mm:ss")
              );
            },
          },
          // {
          //   title: "填报人",
          //   key: "sendByName",
          //   width: 120,
          // },
          {
            title: "操作",
            align: "center",
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
                        const { id, encryptPhone } = params.row;
                        this.controlModal = true;
                        this.form.addTrackRecord.encryptPhone = encryptPhone;
                        this.form.id = id;
                      },
                    },
                  },
                  "确认"
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

      form: {
        addTrackRecord: {
          // 加密手机号
          encryptPhone: "",
          // 回访工具编号
          trackToolId: "",
          // 回访目的编号
          trackTypeId: "",
          // 客户类型
          trackThemeId: "",
          // 回访主题
          trackPlan: "",
          // 回访内容
          trackContent: "",
          // 通话记录编号，如果回访工具是电话 该字段必传
          callRecordId: null,
          // 是否有效
          valid: true,
        },

        // 跟进情况
        isTrackedResult: null,
        // 医院跟进备注
        hospitalContent: "",
        trackPicture1: "",
        trackPicture2: "",
        trackPicture3: "",
        // 加v状态
        isAddWechat: "",
        // 未加v原因
        unAddWechatReasonId: null,
        // 新老客
        isOldCustomerTrack: "",
      },
      ruleValidate: {
        isAddWechat: [
          {
            required: true,
            message: "请选择加v状态",
            trigger: "change",
          },
        ],

        isOldCustomerTrack: [
          {
            required: true,
            message: "请选择新老客",
            trigger: "change",
          },
        ],
        hospitalContent: [
          {
            required: true,
            message: "请输入跟进备注",
          },
        ],
        isTrackedResult: [
          {
            required: true,
            message: "请选择跟进情况",
          },
        ],
        "addTrackRecord.trackToolId": [
          {
            required: true,
            message: "请选择回访工具",
          },
        ],
        "addTrackRecord.trackTypeId": [
          {
            required: true,
            message: "请选择回访目的",
          },
        ],
        "addTrackRecord.trackThemeId": [
          {
            required: true,
            message: "请选择客户类型",
          },
        ],
        "addTrackRecord.trackContent": [
          {
            required: true,
            message: "请输入回访内容",
          },
        ],
        "addTrackRecord.trackPlan": [
          {
            required: true,
            message: "请输入回访主题",
          },
        ],
        "addTrackRecord.valid": [
          {
            required: true,
            message: "请选择是否有效",
          },
        ],
        "addTrackRecord.trackContent": [
          {
            required: true,
            message: "请输入回访内容",
          },
        ],
      },
      // 回访工具列表
      trackTool: [],

      // 回访目的列表
      trackType: [],

      // 客户类型列表
      trackThemeList: [],

      // 下次客户类型列表
      nextTimeTrackThemeList: [],
      //跟进情况
      trackedResult: [
        {
          type: "true",
          name: "确认跟进",
        },
        {
          type: "false",
          name: "取消跟进",
        },
      ],
      uploadObj1: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj2: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj3: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 未加v原因
      unAddList: [],
    };
  },

  methods: {
    // 获取未加v原因
    getunAddWechatReasonNameList() {
      apis.unAddWechatReasonNameList().then((res) => {
        this.unAddList = res.data.nameList;
      });
    },
    // 图片
    handleUploadChange1(values) {
      this.form.trackPicture1 = values[0];
    },
    // 图片
    handleUploadChange2(values) {
      this.form.trackPicture2 = values[0];
    },
    // 图片
    handleUploadChange3(values) {
      this.form.trackPicture3 = values[0];
    },
    trackedResultChange() {
      if (this.form.isTrackedResult == "true") {
        this.form.hospitalContent = "";
      } else {
        this.form.addTrackRecord = {};
        this.form.trackPicture1 = "";
        this.form.trackPicture2 = "";
        this.form.trackPicture3 = "";
        this.form.isAddWechat = "";
        this.form.unAddWechatReasonId = null;
        this.form.isOldCustomerTrack = "";
        this.trackThemeList = [];
      }
    },
    // 获取有效的回访工具列表
    getTrackReturnVisitToolList() {
      apis.getTrackReturnVisitToolList().then((res) => {
        if (res.code === 0) {
          this.trackTool = res.data.trackTool;
        }
      });
    },

    // 获取有效的回访目的列表
    getTrackReturnVisitTypeList() {
      const data = {
        isOldCustomer: this.form.isOldCustomerTrack == "新客" ? false : true,
      };
      apis.getTrackReturnVisitTypeList(data).then((res) => {
        this.trackType = res.data.trackType;
      });
    },

    // 通过下次回访目的编号获取下次客户类型列表
    handleNextTimeTrackTypeChange(trackTypeId) {
      if (!trackTypeId) return;
      apis.byTrackTypeIdGetTrackThemeList(trackTypeId).then((res) => {
        if (res.code === 0) {
          this.nextTimeTrackThemeList = res.data.trackTheme;
        }
      });
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            isTrackedResult,
            addTrackRecord,
            hospitalContent,
            trackPicture1,
            trackPicture2,
            trackPicture3,
            isAddWechat,
            unAddWechatReasonId,
            isOldCustomerTrack,
          } = this.form;
          const datas = {
            id,
            isTrackedResult: isTrackedResult == "true" ? true : false,
            hospitalContent: isTrackedResult == "true" ? "" : hospitalContent,
            addTrackRecord:
              isTrackedResult == "true"
                ? {
                    encryptPhone: addTrackRecord.encryptPhone,
                    trackContent: addTrackRecord.trackContent,
                    trackToolId: addTrackRecord.trackToolId,
                    trackTypeId: addTrackRecord.trackTypeId,
                    trackThemeId: addTrackRecord.trackThemeId,
                    trackPlan: addTrackRecord.trackPlan,
                    valid: addTrackRecord.valid,
                    trackPicture1: trackPicture1 ? trackPicture1 : "",
                    trackPicture2: trackPicture2 ? trackPicture2 : "",
                    trackPicture3: trackPicture3 ? trackPicture3 : "",
                  }
                : {},
            
            isAddWechat: isAddWechat == "是" ? true : false,
            unAddWechatReasonId: isAddWechat == "是" ? 0 : unAddWechatReasonId,
            isOldCustomerTrack: isOldCustomerTrack == "老客" ? true : false,
          };
          if (
            (isAddWechat == "否" && datas.unAddWechatReasonId < 0) ||
            datas.unAddWechatReasonId == null
          ) {
            this.$Message.warning("请选择未加v原因！");
            return;
          }
          api.hospitalConfirTrackRecord(datas).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("form");
              this.getUnprocessedFollowUpCallSubmission();
              this.$Message.success({
                content: "确认成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 获取提报列表
    getUnprocessedFollowUpCallSubmission() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, startDate, endDate } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
      };
      api.hospitalSendedListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackReportedInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取提报列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, startDate, endDate } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(new Date(startDate)).format("YYYY-MM-DD")
          : null,
        endDate: endDate
          ? this.$moment(new Date(endDate)).format("YYYY-MM-DD")
          : null,
      };
      api.hospitalSendedListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackReportedInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
      this.uploadObj1.uploadList = [];
      this.uploadObj2.uploadList = [];
      this.uploadObj3.uploadList = [];
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        this.uploadObj1.uploadList = [];
        this.uploadObj2.uploadList = [];
        this.uploadObj3.uploadList = [];
      }
    },
  },
  created() {
    this.getTrackReturnVisitToolList();
    // this.getTrackReturnVisitTypeList();
    this.getunAddWechatReasonNameList();
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "unprocessedFollowUpCallSubmission") {
          this.getUnprocessedFollowUpCallSubmission();
        }
      },
      immediate: true,
    },
    // 通过回访目的编号获取客户类型列表
    "form.addTrackRecord.trackTypeId": {
      handler(trackTypeId) {
        if (!trackTypeId) return;
        apis.byTrackTypeIdGetTrackThemeList(trackTypeId).then((res) => {
          if (res.code === 0) {
            this.trackThemeList = res.data.trackTheme;
          }
        });
      },
    },
    "form.isAddWechat"(value) {
      if (value == "是") {
        this.form.unAddWechatReasonId = null;
        // this.$refs.unAddWechatReasonId.validateMessage = "";
        // this.$refs.unAddWechatReasonId.validateState = "";
      }
    },
    "form.isOldCustomerTrack"(value) {
      if (value) {
        this.getTrackReturnVisitTypeList();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
