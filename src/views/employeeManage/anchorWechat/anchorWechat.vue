<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入主播微信号"
            style="width: 200px; "
            @keyup.enter.native="getLiveAnchorWechat()"
          />
          <Select
            v-model="query.contentPlateFormId"
            placeholder="请选择主播平台"
            @on-change="contentPlateChange(query.contentPlateFormId)"
            filterable
            style="width: 200px; margin-left:10px"
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
            :disabled="query.contentPlateFormId === ''"
            filterable
            style="width: 200px; margin-left:10px"
          >
            <Option
              v-for="item in liveAnchors"
              :value="item.id"
              :key="item.id"
              >{{ item.hostAccountName }}</Option
            >
          </Select>
          <Select
            v-model="query.valid"
            placeholder="是否有效"
            filterable
            style="width: 200px; margin-left:10px"
          >
            <Option
              v-for="item in query.validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getLiveAnchorWechat()"
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
            :disabled="form.contentPlateFormId === ''"
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
        <FormItem label="主播微信号" prop="weChatNo">
            <Input v-model="form.weChatNo" placeholder="请输入主播微信号"></Input>
          </FormItem>
          <FormItem label="主播昵称" prop="nickName">
            <Input v-model="form.nickName" placeholder="请输入主播昵称"></Input>
          </FormItem>
        <FormItem label="备注" prop="remark">
          <Input
            v-model="form.remark"
            type="textarea"
            :rows="5"
            placeholder="请输入备注"
          ></Input>
        </FormItem>
        <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/liveAnchorWechatInfo";
import * as orderApi from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";

export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        contentPlateFormId:'',
        liveAnchorId:null,
        valid:'true',
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "主播平台",
            key: "contentPlatFormName",
          },
          {
            title: "主播",
            key: "liveAnchorName",
          },
          {
            title: "微信号",
            key: "weChatNo",
          },
          {
            title: "昵称",
            key: "nickName",
          },
          {
            title: "备注",
            key: "remark",
          },
          {
            title: "是否有效",
            key: "valid",
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
                        api.byIdGetLiveAnchorWechatInfoInfo(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              liveAnchorId,
                              weChatNo,
                              nickName,
                              remark,
                              valid,
                              id,
                              contentPlatFormId
                            } = res.data.liveAnchorWechatInfo;
                            this.contentPlateChange(contentPlatFormId);
                            this.isEdit = true;
                            this.form.valid = valid;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.weChatNo = weChatNo;
                            this.form.nickName = nickName;
                            this.form.remark = remark;
                            this.form.contentPlateFormId = contentPlatFormId;
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
                            api.deleteLiveAnchorWechatInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getLiveAnchorWechat();
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
        validList:[
          {
            type:'true',
            name:'有效'
          },
          {
            type:'false',
            name:'无效'
          }
        ]
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        contentPlateFormId:'',
        // 主播ID
        liveAnchorId: null,
        // 主播微信号
        weChatNo: "",
        // 昵称
        nickName: "",
        // 备注
        remark:'',
        // 是否有效
        valid:false,
        id: "",
      },

      ruleValidate: {
        contentPlateFormId: [
          {
            required: true,
            message: "请选择主播平台",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择主播",
          },
        ],
        weChatNo: [
          {
            required: true,
            message: "请输入主播微信号",
          },
        ],
        nickName: [
          {
            required: true,
            message: "请输入主播昵称",
          },
        ],
      },
      // 主播平台
      contentPalteForms: [],
      // 主播
      liveAnchors: [],
    };
  },
  methods: {
    //   获取主播平台（下拉框）
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
    // 获取主播微信号列表
    getLiveAnchorWechat() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword,liveAnchorId,valid } = this.query;
      const data = { pageNum, pageSize, keyword,liveAnchorId,valid };
      api.getLiveAnchorWechatInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchorWechatInfos;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取主播微信号列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword,liveAnchorId,valid } = this.query;
      const data = { pageNum, pageSize, keyword,liveAnchorId,valid };
      api.getLiveAnchorWechatInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.liveAnchorWechatInfos;
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
            const { liveAnchorId,weChatNo,nickName, remark,id,valid} = this.form;
            const data = { liveAnchorId,weChatNo,nickName, remark ,id,valid};
            // 修改
            api.editLiveAnchorWechatInfo(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getLiveAnchorWechat();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { liveAnchorId,weChatNo,nickName, remark} = this.form;
            const data = { liveAnchorId,weChatNo,nickName, remark };
            // 添加
            api.addLiveAnchorWechatInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getLiveAnchorWechat();
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
    this.getLiveAnchorWechat();
    this.getContentValidList();
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
