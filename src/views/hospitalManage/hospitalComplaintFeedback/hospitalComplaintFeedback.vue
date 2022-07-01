<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="gethospitalFeedBack()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 200px; margin-left: 10px"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 200px; margin-left: 10px"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.hospitalId"
            style="width: 260px;margin-left: 10px"
            placeholder="请选择医院"
            filterable
            transfer
        >
            <Option
            v-for="item in hospitallist"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
            >
        </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="gethospitalFeedBack()"
            >查询</Button
          >
        </div>
        <!-- <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
          >
        </div> -->
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
        <FormItem label="标题" prop="title">
          <Input v-model="form.title"></Input>
        </FormItem>
        <FormItem label="内容" prop="content">
          <Input v-model="form.content" type="textarea" :rows="4"></Input>
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
import * as api from "@/api/hospitalFeedBack";
import * as hospitalManage from "@/api/hospitalManage";

export default {
  data() {
    return {
      // 查询
      query: {
        hospitalId:-1,
        startDate:'',
        endDate:'',
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "标题",
            key: "title",
            width: 300,
          },
          {
            title: "内容",
            key: "content",
          },
          {
            title: "医院",
            key: "hospital",
            width: 300,
          },
          {
            title: "创建时间",
            key: "createDate",
            width: 200,
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
                        api.byIdHospitalFeedBack(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              content,
                              title,
                              id,
                              createHospital
                            } = res.data.hospitalFeedBackInfo;
                            this.isEdit = true;
                            this.form.content = content;
                            this.form.title = title;
                            this.form.id = id;
                            this.form.hospitalId = createHospital
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
                            api.deleteHospitalFeedBack(id).then((res) => {
                              if (res.code === 0) {
                                this.gethospitalFeedBack();
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
      hospitallist: [{ id: -1, name: "全部医院" }],
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        content: "",
        title: "",
        valid: false,
        id:"",
        hospitalId:''
        
      },

      ruleValidate: {
        content: [
          {
            required: true,
            message: "请输入内容",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
          },
        ],
      },
    };
  },
  methods: {
      // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
          this.hospitallist = [...this.hospitallist, ...res.data.hospitalInfo];
        }
      });
    },
    // 获取医院投诉与反馈信息
    gethospitalFeedBack() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,startDate,endDate,hospitalId} = this.query;
      const data = { 
          pageNum, 
          pageSize ,
          keyword,
          startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD"):null,
          endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD"):null,
          hospitalId:hospitalId == -1 ? null : hospitalId
      };
      api.HospitalFeedBack(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalFeedBackInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院投诉与反馈信息分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyword ,
            startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD"):null,
            endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD"):null,
            hospitalId:hospitalId == -1 ? null : hospitalId
        };
        api.HospitalFeedBack(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.hospitalFeedBackInfo;
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
            console.log(this.form)
            // 修改
            api.editHospitalFeedBack(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.gethospitalFeedBack();
                this.$Message.success({
                  content: "修改成功",
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
    this.gethospitalFeedBack();
    this.getHospitalInfonameList()
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