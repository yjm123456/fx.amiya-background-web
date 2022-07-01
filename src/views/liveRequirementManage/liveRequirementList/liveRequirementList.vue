<template>
  <div>
    <v-summary
      :headCollectivityData="headCollectivityData"
      @controlStayCompleteDemandModal="controlStayCompleteDemandModal = true"
    ></v-summary>

    <Card :dis-hover="true" style="margin-top:16px">
      <div class="header_warp">
        <div>
          <Input
             v-model="query.keyword"
            style="width:200px;"
            placeholder="请输入关键字"
            @keyup.enter.native="getLiveRequirementInfo()"
          />
          <Input
             v-model="query.fansInfo"
            style="width:200px;margin-left : 10px"
            placeholder="请输入粉丝信息"
            @keyup.enter.native="getLiveRequirementInfo()"
          />
          <Select
            v-model="query.status"
            style="width: 200px;margin-left: 10px"
            placeholder="状态"
          >
            <Option
              v-for="item in query.statusList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.liveTypeId"
            style="width: 200px;margin-left: 10px"
            placeholder="直播间类型"
          >
            <Option
              v-for="item in query.liveType"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getLiveRequirementInfo()"
            >查询</Button
          >
        </div>
        <div>
          <Button
            type="primary"
            @click="controlModal = true;title = '添加';getContentValidList()"
            v-has="{ role: ['fx.amiya.permission.ADD_LIVE_REQUIREMENT'] }"
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
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <FormItem label="直播间类型" prop="liveTypeId">
          <Select v-model="form.liveTypeId" placeholder="请选择直播间类型">
            <Option v-for="item in liveType" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属平台" prop="contentPlateFormId">
          <Select v-model="form.contentPlateFormId" placeholder="请选择所属平台" @on-change="contentPlateChange(form.contentPlateFormId)">
            <Option 
              v-for="item in contentPalteForms" 
              :value="item.id" 
              :key="item.id">
              {{item.contentPlatformName}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="主播" prop="liveAnchorId">
          <Select v-model="form.liveAnchorId" placeholder="请选择主播">
            <Option v-for="item in liveAnchors" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="粉丝信息" prop="fansInfo">
          <Input v-model="form.fansInfo" placeholder="请输入粉丝信息"></Input>
        </FormItem>
        <FormItem label="需求类型" prop="requirementTypeId">
          <Select v-model="form.requirementTypeId" placeholder="请选择需求类型">
            <Option
              v-for="item in requirementType"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="需求描述" prop="description">
          <Input
            v-model="form.description"
            placeholder="请输入需求描述"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="指派部门" prop="departmentId">
          <Select v-model="form.departmentId" placeholder="请选择指派部门">
            <Option
              v-for="item in department"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="优先级" prop="priorityLevel">
          <Select v-model="form.priorityLevel" placeholder="请选择优先级">
            <Option
              v-for="item in priorityLevelList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>

    <!-- 进度 -->
    <Modal
      v-model="scheduleInfo.controlModal"
      title="进度"
      :mask-closable="false"
      width="1000"
      footer-hide
    >
      <div>
        <Row :gutter="16">
          <Col span="6">
              <div>发布人：{{ scheduleInfo.row.createName }}</div>
          </Col>
          <Col span="6">
              <div>响应人：{{ scheduleInfo.row.responseByName }}</div>
          </Col>
          <Col span="6">
              <div>执行人：{{ scheduleInfo.row.executeByName }}</div>
          </Col>
          <Col span="6">
              <div>直播间类型：{{ scheduleInfo.row.liveTypeName }}</div>
          </Col>
        </Row>
        <Row :gutter="16" style="margin-top:15px;">
          <Col span="6">
              <div>需求类型：{{ scheduleInfo.row.requirementTypeName }}</div>
          </Col>
          <Col span="6">
              <div>指派部门：{{ scheduleInfo.row.departmentName }}</div>
          </Col>
          <Col span="6">
              <div>优先级：{{ scheduleInfo.row.priorityLevelText }}</div>
          </Col>
          <Col span="6">
              <div>状态：{{ scheduleInfo.row.statusText }}</div>
          </Col>
        </Row>
        <Row :gutter="16" style="margin-top:15px;">
          <Col span="6">
              <div>粉丝信息：{{ scheduleInfo.row.fansInfo }}</div>
          </Col>
          <Col span="18">
              <div>需求描述：{{ scheduleInfo.row.description }}</div>
          </Col>
        </Row>
        <Row :gutter="16" style="margin-top:15px;">
          <Col span="6" v-show="scheduleInfo.row.responseRemark">
              <div>响应备注：{{ scheduleInfo.row.responseRemark }}</div>
          </Col>
          <Col span="6" v-show="scheduleInfo.row.executeRemark">
              <div>执行备注：{{ scheduleInfo.row.executeRemark }}</div>
          </Col>
          <Col span="6" v-show="scheduleInfo.row.decideRemark">
              <div>评判备注：{{ scheduleInfo.row.decideRemark }}</div>
          </Col>
        </Row>
        <div class="steps">
          <Steps :current="!scheduleInfo.responseDate ? 0 : !scheduleInfo.executeDate ? 1 : 2">
            <Step>
              <div slot="title">
                {{scheduleInfo.createDate ? $moment(scheduleInfo.createDate).format('MM-DD') : ''}} 发布
              </div>
              <div slot="content" class="create_content" v-if="scheduleInfo.responseSeconds && scheduleInfo.responseSeconds > 60">
                响应时长 
                {{Math.floor((scheduleInfo.responseSeconds / 86400))}}天
                {{Math.floor((scheduleInfo.responseSeconds % 86400) / 3600)}}小时
                {{Math.floor(((scheduleInfo.responseSeconds % 86400) % 3600) / 60)}}分钟
              </div>
              <div slot="content" class="create_content" v-if="scheduleInfo.responseSeconds && scheduleInfo.responseSeconds < 60">
                响应时长 一分钟内
              </div>
            </Step>
            <Step>
              <div slot="title">
               {{scheduleInfo.responseDate ? $moment(scheduleInfo.responseDate).format('MM-DD') : ''}} 响应
              </div>
              <div slot="content" class="response_content" v-show="scheduleInfo.executeSeconds">
                需求进度 
                {{Math.floor((scheduleInfo.executeSeconds / 86400))}}天
                {{Math.floor((scheduleInfo.executeSeconds % 86400) / 3600)}}小时
                {{Math.floor(((scheduleInfo.executeSeconds % 86400) % 3600) / 60)}}分钟
              </div>
            </Step>
            <Step>
              <div slot="title">
               {{scheduleInfo.executeDate ? $moment(scheduleInfo.executeDate).format('MM-DD') : ''}} 执行
              </div>
            </Step>
          </Steps>
        </div>
      </div>
    </Modal>

    <StayCompleteDemand
      :controlStayCompleteDemandModal="controlStayCompleteDemandModal"
      @handleStayCompleteDemandVisibleChange="controlStayCompleteDemandModal = false"
    ></StayCompleteDemand>
  </div>
</template>

<script>
import * as api from "@/api/liveRequirementManage";
import * as contentPlatForm from "@/api/baseDataMaintenance"
import vSummary from "./components/summary";
import StayCompleteDemand from "./components/StayCompleteDemand";
export default {
  components: {
    vSummary,
    StayCompleteDemand,
  },
  data() {
    return {
      // 所属平台
      contentPalteForms:[],
      controlStayCompleteDemandModal: false,

      // 进度
      scheduleInfo: {
        createDate: "",
        responseDate: "",
        responseSeconds:"",
        executeDate: "",
        executeSeconds:"",
        controlModal: false,
        row: {},
      },

      // 总览数据
      headCollectivityData: {},

      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        status: "",
        statusList: [
          {
            id: -1,
            name: "全部状态",
          },
          {
            id: 0,
            name: "未接单",
          },
          {
            id: 1,
            name: "部门拒绝",
          },
          {
            id: 2,
            name: "作废",
          },
          {
            id: 3,
            name: "已接单",
          },
          {
            id: 4,
            name: "已处理待确认",
          },
          {
            id: 5,
            name: "已处理完",
          },
        ],
        liveTypeId: "",
        liveType: [
          {
            id: -1,
            name: "全部类型",
          },
        ],
        keyword: "",
        fansInfo:"",
        columns: [
          {
            title: "创建时间",
            key: "createDate",
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
            title: "粉丝信息",
            key: "fansInfo",
          },
          {
            title: "直播间类型",
            key: "liveTypeName",
          },
          {
            title: "需求类型",
            key: "requirementTypeName",
          },
          {
            title: "需求描述",
            key: "description",
            tooltip:true
          },
          {
            title: "指派部门",
            key: "departmentName",
          },
          {
            title: "优先级",
            key: "priorityLevelText",
          },
          {
            title: "状态",
            key: "statusText",
            render:(h, params)=> {
              const statusText = params.row.statusText;
              if(statusText === "已处理") {
                return h("div", {
                  style: {
                    color: "red",
                  }
                }, statusText);
              } else {
                return h("div", statusText);
              }
            }
          },
          {
            title: "操作",
            width: 150,
            align: "center",
            render: (h, params) => {
              const currentRole = JSON.parse(
                sessionStorage.getItem("permissions")
              );
              const flag = currentRole.some((ele) => {
                return "fx.amiya.permission.UPDATE_LIVE_REQUIREMENT_INFO".includes(
                  ele
                );
              });
              return h("div", [
                flag ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.status !== 0 ? true : false,
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const {
                          id,
                          liveTypeId,
                          liveAnchorId,
                          fansInfo,
                          requirementTypeId,
                          description,
                          departmentId,
                          priorityLevel,
                        } = params.row;
                        this.getContentValidList()
                        this.title = "修改";
                        this.isEdit = true;
                        this.form.id = id;
                        this.form.liveTypeId = liveTypeId;
                        this.form.liveAnchorId = liveAnchorId;
                        this.form.fansInfo = fansInfo;
                        this.form.requirementTypeId = requirementTypeId;
                        this.form.description = description;
                        this.form.departmentId = departmentId;
                        this.form.priorityLevel = priorityLevel;
                        this.controlModal = true;
                      },
                    },
                  },
                  "修改"
                ) : "",
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: params.row.status === 2 ? true : false,
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        api.getLiveRequirementProgressBar(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              createDate,
                              responseDate,
                              responseSeconds,
                              executeDate,
                              executeSeconds
                            } = res.data.progressBar;
                            this.scheduleInfo.createDate = createDate;
                            this.scheduleInfo.responseDate = responseDate;
                            this.scheduleInfo.responseSeconds = responseSeconds;
                            this.scheduleInfo.executeDate = executeDate;
                            this.scheduleInfo.executeSeconds = executeSeconds;
                            this.scheduleInfo.controlModal = true;
                            this.scheduleInfo.row = params.row;
                          }
                        });
                      },
                    },
                  },
                  "进度"
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

      // 直播类型
      liveType: [],

      // 主播列表
      liveAnchors:[],

      // 需求类型
      requirementType: [],

      // 部门
      department: [],

      // 优先级
      priorityLevelList: [
        {
          id: 0,
          name: "一般",
        },
        {
          id: 1,
          name: "紧急",
        },
      ],

      form: {
        // 直播间类型
        liveTypeId: "",
        // 主播
        liveAnchorId: "",
        // 粉丝信息，可空
        fansInfo: "",
        // 需求类型
        requirementTypeId: "",
        // 需求描述
        description: "",
        // 指派部门，下拉框
        departmentId: "",
        // 优先级
        priorityLevel: "",
        id: "",
        // 所属平台
        contentPlateFormId:""
      },

      ruleValidate: {
        liveTypeId: [
          {
            required: true,
            message: "请选择直播间类型",
          },
        ],
        contentPlateFormId: [
          {
            required: true,
            message: "请选择所属平台",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择主播",
          },
        ],
        fansInfo: [
          {
            required: true,
            message: "请输入粉丝信息",
          },
        ],
        requirementTypeId: [
          {
            required: true,
            message: "请选择需求类型",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入需求描述",
          },
          {
            min: 20, message: '不能小于20个文字'
          }
        ],
        departmentId: [
          {
            required: true,
            message: "请选择指派部门",
          },
        ],
        priorityLevel: [
          {
            required: true,
            message: "请选择优先级",
          },
        ],
      },
    };
  },
  methods: {
    contentPlateChange(value){
      if(!value){
        return
      }
      this.getLiveAnchorList(value)
    },
    //   获取平台（下拉框）
    getContentValidList(){
        contentPlatForm.getContentPlatFormValidList().then((res) => {
        if(res.code === 0){
          const {contentPalteForms} = res.data
          this.contentPalteForms = contentPalteForms
        }
      })
    },
    // 获取有效的主播列表
    getLiveAnchorList(value) {
      const data={
        contentPlatFormId:value
      }
      api.getLiveAnchorList(data).then(res=>{
        if(res.code === 0) {
          this.liveAnchors = res.data.liveAnchors;
        }
      })
    },
    // 获取有效的直播类型名称列表
    getLiveTypeList() {
      api.getLiveTypeList().then((res) => {
        if (res.code === 0) {
          const { liveType } = res.data;
          this.liveType = liveType;
          this.query.liveType = [...this.query.liveType, ...liveType];
        }
      });
    },

    // 获取有效的直播需求类型名称列表
    getLiveRequirementType() {
      api.getLiveRequirementType().then((res) => {
        if (res.code === 0) {
          this.requirementType = res.data.requirementType;
        }
      });
    },

    // 获取有效的部门名称列表
    getAmiyaDepartment() {
      api.getAmiyaDepartment().then((res) => {
        if (res.code === 0) {
          this.department = res.data.department;
        }
      });
    },

    // 获取总览数据
    getHeadCollectivityData() {
      api.getHeadCollectivityData().then((res) => {
        if (res.code === 0) {
          this.headCollectivityData = res.data.headCollectivityData;
        }
      });
    },

    

    // 获取直播需求信息列表
    getLiveRequirementInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, status, liveTypeId, keyword , fansInfo } = this.query;
      const data = {
        pageNum,
        pageSize,
        status: status === -1 ? null : status,
        liveTypeId: liveTypeId === -1 ? null : liveTypeId,
        keyword,
        fansInfo
      };
      api.getLiveRequirementInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveRequirement;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取直播需求信息列表（分页）
    handlePageChange(pageNum) {
      const { pageSize, status, liveTypeId, keyword , fansInfo } = this.query;
      const data = {
        pageNum,
        pageSize,
        status: status === -1 ? null : status,
        liveTypeId: liveTypeId === -1 ? null : liveTypeId,
        keyword,
        fansInfo
      };
      api.getLiveRequirementInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveRequirement;
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
            // 修改
            api.editLiveRequirement(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getLiveRequirementInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            let {
              liveTypeId,
              liveAnchorId,
              fansInfo,
              requirementTypeId,
              description,
              departmentId,
              priorityLevel,
            } = this.form;
            // 添加
            api
              .addLiveRequirement({
                liveTypeId,
                liveAnchorId,
                fansInfo,
                requirementTypeId,
                description,
                departmentId,
                priorityLevel,
              })
              .then((res) => {
                if (res.code === 0) {
                  this.cancelSubmit("form");
                  this.getLiveRequirementInfo();
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
    this.getLiveTypeList();
    this.getLiveRequirementType();
    this.getAmiyaDepartment();
    this.getHeadCollectivityData();
    this.getLiveRequirementInfo();
    // this.getLiveAnchorList();
  },
};
</script>

<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.header_warp {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.steps{
  padding: 10px 0;
  margin-top: 15px;
  .ivu-steps-item {
    overflow: visible;
  }
  .create_content ,.response_content{
    position: absolute;
    top: -25px;
    left: 150px;
    width: 200px;
  }
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>
