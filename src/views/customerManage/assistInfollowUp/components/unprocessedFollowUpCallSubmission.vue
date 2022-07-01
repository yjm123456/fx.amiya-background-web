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
          <Col span="12">
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
            
            <FormItem label="回访工具" prop="addTrackRecord.trackToolId" v-if="form.isTrackedResult=='true'" key="回访工具">
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
            <FormItem label="回访类型" prop="addTrackRecord.trackTypeId" v-if="form.isTrackedResult=='true'" key="回访类型">
              <Select v-model="form.addTrackRecord.trackTypeId" placeholder="请选择回访类型">
                <Option
                  :value="item.id"
                  v-for="item in trackType"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
            <FormItem
              label="回访主题"
              v-show="trackThemeList.length"
              prop="addTrackRecord.trackThemeId"
              v-if="form.isTrackedResult=='true'" key="回访主题"
            >
              <Select v-model="form.addTrackRecord.trackThemeId" placeholder="请选择回访主题">
                <Option
                  :value="item.id"
                  v-for="item in trackThemeList"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
            <FormItem label="回访计划" prop="addTrackRecord.trackPlan" v-if="form.isTrackedResult=='true'" key="回访计划">
              <Input v-model="form.addTrackRecord.trackPlan" placeholder="请输入回访计划" />
            </FormItem>
            <FormItem label="是否有效" prop="addTrackRecord.valid" v-if="form.isTrackedResult=='true'" key="是否有效">
              <i-switch v-model="form.addTrackRecord.valid" />
            </FormItem>
            
          </Col>
          <Col span="12" v-if="form.isTrackedResult=='false'">
            <FormItem label="跟进备注" prop="hospitalContent"  key="跟进备注">
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
          <Col span="12" v-if="form.isTrackedResult=='true'">
            <FormItem label="回访内容" prop="addTrackRecord.trackContent"  key="回访内容">
              <Input
                v-model="form.addTrackRecord.trackContent"
                show-word-limit
                type="textarea"
                placeholder="请输入回访内容"
                class="trackContent"
                :rows="7"
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
export default {
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
                        this.form.addTrackRecord.encryptPhone = encryptPhone
                        this.form.id = id
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
        addTrackRecord:{
            // 加密手机号
            encryptPhone: "",
            // 回访工具编号
            trackToolId: "",
            // 回访类型编号
            trackTypeId: "",
            // 回访主题
            trackThemeId: "",
            // 回访计划
            trackPlan: "",
            // 回访内容
            trackContent: "",
            // 通话记录编号，如果回访工具是电话 该字段必传
            callRecordId: null,
            // 是否有效
            valid: true,
        },
        
        // 跟进情况
        isTrackedResult:null,
        // 医院跟进备注
        hospitalContent:''
      },
      ruleValidate: {
        hospitalContent:[
          {
            required: true,
            message: "请输入跟进备注",
          },
        ],
        isTrackedResult:[
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
            message: "请选择回访类型",
          },
        ],
        "addTrackRecord.trackThemeId": [
          {
            required: true,
            message: "请选择回访主题",
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
            message: "请输入回访计划",
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

      // 回访类型列表
      trackType: [],

      // 回访主题列表
      trackThemeList: [],

      // 下次回访主题列表
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
    };
  },
 

  methods: {
    trackedResultChange(){
        if(this.form.isTrackedResult == 'true'){
            this.form.hospitalContent = ''
        }else{
            this.form.addTrackRecord = {}
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

    // 获取有效的回访类型列表
    getTrackReturnVisitTypeList() {
      apis.getTrackReturnVisitTypeList().then((res) => {
        this.trackType = res.data.trackType;
      });
    },

    // 通过下次回访类型编号获取下次回访主题列表
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
          } = this.form;
          const datas = {
            id,
            isTrackedResult : isTrackedResult == 'true' ? true : false,
            hospitalContent:isTrackedResult == 'true' ? '' : hospitalContent,
            addTrackRecord : isTrackedResult == 'true' ?  {
                encryptPhone:addTrackRecord.encryptPhone,
                trackContent:addTrackRecord.trackContent,
                trackToolId:addTrackRecord.trackToolId,
                trackTypeId:addTrackRecord.trackTypeId,
                trackThemeId:addTrackRecord.trackThemeId,
                trackPlan:addTrackRecord.trackPlan,
                valid:addTrackRecord.valid,
            } : {}
          };
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
    this.getTrackReturnVisitToolList();
    this.getTrackReturnVisitTypeList();
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
    // 通过回访类型编号获取回访主题列表
    'form.addTrackRecord.trackTypeId':{
      handler(trackTypeId) {
        if(!trackTypeId) return;
        apis.byTrackTypeIdGetTrackThemeList(trackTypeId).then(res=>{
          if(res.code === 0) {
            this.trackThemeList = res.data.trackTheme;
          }
        })
      }
    }
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
