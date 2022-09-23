<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px;"
            @keyup.enter.native="getShootingAndClip()"
          />
          <Select
            v-model="query.contentPlateFormId"
            placeholder="请选择主播平台"
            @on-change="contentPlateChange(query.contentPlateFormId)"
            filterable
            style="width: 200px; margin-left: 10px"
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
            filterable
            style="width: 200px; margin-left: 10px"
            :disabled="query.contentPlateFormId == null"
          >
            <Option
              v-for="item in liveAnchors"
              :value="item.id"
              :key="item.id"
              >{{ item.hostAccountName }}</Option
            >
          </Select>
          <Select
            v-model="query.shootingEmpId"
            placeholder="请选择拍摄人员"
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in employeeAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.clipEmpId"
            placeholder="请选择剪辑人员"
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in employee2All"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getShootingAndClip()"
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
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="登记日期" prop="recordDate">
          <DatePicker
            type="date"
            placeholder="请选择登记日期"
            :value="form.recordDate"
            v-model="form.recordDate"
            style="width:100%"
          ></DatePicker>
        </FormItem>
        <FormItem label="主播平台" prop="contentPlateFormId">
          <Select
            v-model="form.contentPlateFormId"
            placeholder="请选择主播平台"
            @on-change="contentPlateChange(form.contentPlateFormId)"
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
        <FormItem label="主播IP账号" prop="liveAnchorId">
          <Select
            v-model="form.liveAnchorId"
            placeholder="请选择主播IP账号"
            filterable
            :disabled="form.contentPlateFormId == ''"
          >
            <Option
              v-for="item in liveAnchors"
              :value="item.id"
              :key="item.id"
              >{{ item.hostAccountName }}</Option
            >
          </Select>
        </FormItem>
        <!-- <FormItem label="视频类型" prop="videoType">
          <Select v-model="form.videoType" placeholder="请选择视频类型">
            <Option v-for="item in videoTypeList" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem> -->
        <!-- <FormItem label="视频类型" prop="videoType">
          <Select
            v-model="form.videoType"
            placeholder="请选择视频类型"
            filterable
          >
            <Option
              v-for="item in videoTypeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem> -->
        <FormItem label="视频类型" prop="videoType">
          <Select
            v-model="form.videoType"
            placeholder="请选择视频类型"
          >
            <Option
              v-for="item in videoTypeList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="视频标题" prop="title">
          <Input v-model="form.title" placeholder="请输入视频标题"></Input>
        </FormItem>
        <FormItem label="拍摄人员" prop="shootingEmpId">
          <Select v-model="form.shootingEmpId" placeholder="请选择拍摄人员">
            <Option v-for="item in employee" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="剪辑人员" prop="clipEmpId">
          <Select v-model="form.clipEmpId" placeholder="请选择剪辑人员">
            <Option v-for="item in employee2" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>

        <!-- <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as orderApi from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as api from "@/api/shootingAndClip";
export default {
  data() {
    return {
      // 查询
      query: {
        shootingEmpId: -1,
        clipEmpId: -1,
        contentPlateFormId: null,
        liveAnchorId: null,
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "创建日期",
            key: "createDate",
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "登记日期",
            key: "recordDate",
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.recordDate
                  ? this.$moment(params.row.recordDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "主播",
            key: "liveAnchorName",
          },
          {
            title: "视频类型",
            key: "videoTypeText",
          },
          {
            title: "视频标题",
            key: "title",
          },
          {
            title: "拍摄人员",
            key: "shootingEmpName",
          },
          {
            title: "剪辑人员",
            key: "clipEmpName",
          },

          {
            title: "操作",
            key: "",
            width: 150,
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
                        api.byIdShootingAndClip(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              shootingEmpId,
                              clipEmpId,
                              liveAnchorId,
                              recordDate,
                              title,
                              contentPlatFormId,
                              videoType
                            } = res.data.shootingAndClipInfo;
                            this.contentPlateChange(contentPlatFormId);
                            this.isEdit = true;
                            this.form.shootingEmpId = shootingEmpId;
                            this.form.clipEmpId = clipEmpId;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.recordDate = recordDate;
                            this.form.contentPlateFormId = contentPlatFormId;
                            this.form.videoType = String(videoType);
                            this.form.title = title;
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
                            api.deleteShootingAndClip(id).then((res) => {
                              if (res.code === 0) {
                                this.getShootingAndClip();
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

      form: {
        id: "",
        // 拍摄人员
        shootingEmpId: null,
        // 剪辑人员
        clipEmpId: null,
        // 登记日期
        recordDate: "",
        // 视频标题
        title: "",
        // 主播平台
        contentPlateFormId: "",
        liveAnchorId: "",
        // 视频类型
        videoType:null,
      },

      ruleValidate: {
        shootingEmpId: [
          {
            required: true,
            message: "请选择拍摄人员",
          },
        ],
        clipEmpId: [
          {
            required: true,
            message: "请选择剪辑人员",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择主播",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入视频标题",
          },
        ],
        contentPlateFormId: [
          {
            required: true,
            message: "请选择主播平台",
          },
        ],
        recordDate: [
          {
            required: true,
            message: "请选择登记日期",
          },
        ],
        videoType: [
          {
            required: true,
            message: "请选择视频类型",
          },
        ],
      },
      //   主播平台
      contentPalteForms: [],
      //   主播
      liveAnchors: [],
      //   拍摄
      employee: [],
      employeeAll: [{ id: -1, name: "全部拍摄人员" }],
      // 剪辑
      employee2: [],
      employee2All: [{ id: -1, name: "全部剪辑人员" }],
      // 视频类型
      videoTypeList:[],
    };
  },
  methods: {
    // 获取视频类型
    getVideoType() {
      api.getVideoType().then((res) => {
        if (res.code === 0) {
          const {videoType} = res.data
          this.videoTypeList = videoType
        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
        }
      });
    },
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
    // 获取拍摄人员（此id是线上职位id）
    getEmployeeByPositionId(value) {
      const data = {
        positionId: 27,
      };
      api.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee = employee;
          this.employeeAll = [...this.employeeAll, ...employee];
        }
      });
    },
    // 获取剪辑人员
    getEmployeeByPositionId2(value) {
      const data = {
        positionId: 28,
      };
      api.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee2 = employee;
          this.employee2All = [...this.employee2All, ...employee];
        }
      });
    },
    // 获取拍剪组数据列表
    getShootingAndClip() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        shootingEmpId,
        clipEmpId,
        liveAnchorId,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        shootingEmpId: shootingEmpId == -1 ? null : shootingEmpId,
        clipEmpId: clipEmpId == -1 ? null : clipEmpId,
        liveAnchorId,
      };
      api.getShootingAndClip(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.shootingAndClipInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取拍剪组数据列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        shootingEmpId,
        clipEmpId,
        liveAnchorId,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        shootingEmpId: shootingEmpId == -1 ? null : shootingEmpId,
        clipEmpId: clipEmpId == -1 ? null : clipEmpId,
        liveAnchorId,
      };
      api.getShootingAndClip(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.shootingAndClipInfo;
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
            const {
              shootingEmpId,
              clipEmpId,
              liveAnchorId,
              recordDate,
              title,
              id,
              videoType
            } = this.form;
            const data = {
              shootingEmpId,
              clipEmpId,
              liveAnchorId,
              recordDate: recordDate
                ? this.$moment(new Date(recordDate)).format("YYYY-MM-DD")
                : null,
              title,
              id,
              videoType:Number(videoType)
            };
            // 修改
            api.editShootingAndClip(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getShootingAndClip();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const {
              shootingEmpId,
              clipEmpId,
              liveAnchorId,
              recordDate,
              title,
              videoType
            } = this.form;
            const data = {
              shootingEmpId,
              clipEmpId,
              liveAnchorId,
              recordDate: recordDate
                ? this.$moment(new Date(recordDate)).format("YYYY-MM-DD")
                : null,
              title,
              videoType:Number(videoType)
            };
            // 添加
            api.addShootingAndClip(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getShootingAndClip();
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
    this.getShootingAndClip();
    this.getContentValidList();
    this.getEmployeeByPositionId();
    this.getEmployeeByPositionId2();
    this.getVideoType()
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
