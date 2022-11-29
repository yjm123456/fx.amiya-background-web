<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键词"
            style="width: 200px; "
            @keyup.enter.native="getHospitalOperationIndicator()"
          />
          <Select
            v-model="query.valid"
            placeholder="请选择是否有效"
            style="width: 200px; margin-left: 10px"
          >
            <Option
              v-for="item in validList"
              :value="item.type"
              :key="item.type"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalOperationIndicator()"
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
        <FormItem label="指标名称" prop="name">
          <Input v-model="form.name" placeholder="请输入指标名称"></Input>
        </FormItem>
        <FormItem label="描述" prop="describe">
          <Input v-model="form.describe" placeholder="请输入描述"></Input>
        </FormItem>
        <FormItem label="开始日期" prop="startDate">
          <DatePicker
              type="date"
              placeholder="开始日期"
              style="width: 100%"
              :value="form.startDate"
              v-model="form.startDate"
            ></DatePicker>
        </FormItem>
        <FormItem label="结束日期" prop="endDate">
          <DatePicker
              type="date"
              placeholder="结束日期"
              style="width: 100%"
              :value="form.endDate"
              v-model="form.endDate"
            ></DatePicker>
        </FormItem>
        <FormItem label="优秀机构" prop="excellentHospital">
          <Input v-model="form.excellentHospital" placeholder="请输入优秀机构" disabled></Input>
        </FormItem>
        <FormItem label="指派医院" prop="indicatorIds">
          <Select
            v-model="form.indicatorIds"
            placeholder="请选择指派医院"
            multiple
            filterable
          >
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <!-- <FormItem label="批注状态" prop="remarkStatus">
          <i-switch v-model="form.remarkStatus" />
        </FormItem> -->
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
import * as api from "@/api/GreatHospitalOperationHealth";
import * as hospitalManage from "@/api/hospitalManage";

export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        valid:'true',
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "指标名称",
            key: "name",
            width:220

          },
          {
            title: "描述",
            key: "describe",
            width:300
          },
          {
            title: "开始时间",
            key: "startDate",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.startDate).format(
                  "YYYY-MM-DD"
                )
              );
            },
          },
          {
            title: "结束时间",
            key: "endDate",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.endDate).format(
                  "YYYY-MM-DD"
                )
              );
            },
          },
          {
            title: "优秀机构",
            key: "excellentHospital",
            width:280
          },
          {
            title: "提报状态",
            key: "submitStatus",
            width: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.submitStatus == true) {
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
            title: "批注状态",
            key: "remarkStatus",
            width: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.remarkStatus == true) {
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
            title: "是否有效",
            key: "valid",
            width: 120,
            align: "center",
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
                        api.byIdHospitalOperationIndicator(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              id,
                              name,
                              describe,
                              startDate,
                              endDate,
                              excellentHospital,
                              valid,
                              sendHospital
                            } = res.data.hospitalOperationIndicatorInfo;
                            let sendHospitalList = []
                            sendHospital.map(item=>{
                              sendHospitalList.push(item.hospitalId)
                            })
                            this.isEdit = true;
                            this.form.valid = valid;
                            this.form.name = name;
                            this.form.describe = describe;
                            this.form.startDate = startDate;
                            this.form.endDate = endDate;
                            this.form.excellentHospital = excellentHospital;
                            this.form.indicatorIds = sendHospitalList;
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
                            api.deleteHospitalOperationIndicator(id).then((res) => {
                              if (res.code === 0) {
                                this.getHospitalOperationIndicator();
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
        id:"",
        // 名称
        name:'',
        // 描述
        describe:'',
        // 开始时间
        startDate:null,
        // 结束时间
        endDateLnull:null,
        // 优秀机构
        excellentHospital:'健康参考值',
        // 提报状态
        submitStatus:false,
        // 批注状态
        remarkStatus:false,
        // 是否有效
        valid:false,
        // 指派医院
        indicatorIds:[]
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入名称",
          },
        ],
        describe: [
          {
            required: true,
            message: "请输入描述",
          },
        ],
        startDate: [
          {
            required: true,
            message: "请选择开始时间",
          },
        ],
        endDate: [
          {
            required: true,
            message: "请选择结束时间",
          },
        ],
        excellentHospital: [
          {
            required: true,
            message: "请输入优秀机构",
          },
        ],
        indicatorIds: [
          {
            required: true,
            message: "请选择指派医院",
          },
        ],
      },
      hospitalInfo:[],
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
    };
  },
  methods: {
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
        }
      });
    },
    // 获取优秀机构指标列表
    getHospitalOperationIndicator() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,valid} = this.query;
      const data = { pageNum, pageSize ,keyword,valid };
      api.getHospitalOperationIndicator(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalOperationIndicatorListInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取优秀机构指标列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword,valid} = this.query;
        const data = { pageNum, pageSize ,keyword ,valid};
        api.getHospitalOperationIndicator(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.hospitalOperationIndicatorListInfo;
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
            const { name, valid, describe,startDate,endDate,excellentHospital,indicatorIds,id } = this.form;
            const  data = { 
                id,
                name ,
                valid,
                describe,
                startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
                endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
                excellentHospital,
                indicatorIds
            } 
            // 修改
            api.editHospitalOperationIndicator(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHospitalOperationIndicator();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { name, valid, describe,startDate,endDate,excellentHospital,indicatorIds } = this.form;
            const  data = { 
                name ,
                valid:true,
                describe,
                startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
                endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
                excellentHospital,
                indicatorIds
            } 
            // 添加
            api.addHospitalOperationIndicator(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalOperationIndicator();
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
    this.getHospitalOperationIndicator();
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