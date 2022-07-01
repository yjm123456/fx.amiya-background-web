<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入医生名称"
            style="width: 200px"
            @keyup.enter.native="getDoctor()"
          />
          <Select v-model="query.hospitalId" placeholder="请选择医院" filterable  :disabled = "employeeType == 'hospitalEmployee'" style="width: 240px;margin-left:10px">
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button type="primary" style="margin-left: 10px" @click="getDoctor()"
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
        <FormItem label="医生名称" prop="name">
          <Input v-model="form.name" placeholder="请输入医生名称"></Input>
        </FormItem>
        <FormItem label="缩略图" prop="picUrl">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        
        <FormItem label="从业年份" prop="obtainEmploymentYear">
          <DatePicker
            v-model="form.obtainEmploymentYear"
            format="yyyy"
            type="year"
            style="width: 100%"
            placeholder="请选择从业年份"
          ></DatePicker>
        </FormItem>
        <FormItem label="科室" prop="departmentId">
          <Select v-model="form.departmentId" placeholder="请选择科室" filterable>
            <Option
              v-for="item in AmiyaHospitalDepartmentListDepartment"
              :value="item.id"
              :key="item.id"
              >{{ item.departmentName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="职称" prop="position">
          <Input v-model="form.position" placeholder="请输入职称"></Input>
        </FormItem>
        <!-- 如果是医院端不选择医院 直接传递id -->
        <FormItem label="医院" prop="hospitalId" v-if="employeeType == 'amiyaEmployee'">
          <!-- :disabled = "!employeeType == 'hospitalEmployee'" -->
          <Select v-model="form.hospitalId" placeholder="请选择医院" filterable   key="医院">
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="简介" prop="description">
          <Input v-model="form.description" placeholder="请输入简介" type="textarea"></Input>
        </FormItem>
        <FormItem label="是否主推" prop="isMain">
          <i-switch v-model="form.isMain" />
        </FormItem>
        <FormItem label="医生详情图" prop="projectPicture">
          <upload :uploadObj="mainUploadObj" @uploadChange="mainHandleUploadChange" />
        </FormItem>
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
import * as orderApi from "@/api/orderManage";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  data() {
    return {
      flag:false,
      employeeType:sessionStorage.getItem("employeeType"),
      hospitalId:sessionStorage.getItem("hospitalId"),
      // 缩略图
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 项目主推图
      mainUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 科室
      AmiyaHospitalDepartmentListDepartment:[],

      // 查询
      query: {
        hospitalId:null,
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "医生姓名",
            key: "name",
            width:'140',
            align:'center'
          },
          {
            title: "缩略图",
            key: "picUrl",
            align: "center",
            width:'120',
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
                    src: params.row.picUrl,
                  },
                }),
              ]);
            },
          },
          {
            title: "医生详情图",
            key: "projectPicture",
            align: "center",
            width:'120',
            render: (h, params) => {
              return h("viewer", {}, [
                params.row.projectPicture ? h("img", {
                  style: {
                    width: "50px",
                    height: "50px",
                    margin: "5px 0",
                    verticalAlign: "middle",
                  },
                  attrs: {
                    src: params.row.projectPicture,
                  },
                }): '',
              ]);
            },
          },
          {
            title: "科室",
            key: "departmentName",
            width:'120',
            align:'center'
          },
          {
            title: "职称",
            key: "position",
            width:'150',
            align:'center'
          },
          {
            title: "从业年份",
            key: "obtainEmploymentYear",
            width:'100',
            align:'center'
          },
          {
            title: "医院名称",
            key: "hosptalName",
            align:'center'
          },
          {
            title: "简介",
            key: "description",
            align:'center',
            tooltip:true
          },
          {
            title: "是否主推",
            key: "isMain",
            width:'100',
            align:'center',
            render: (h, params) => {
              if (params.row.isMain == 1) {
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
            align:'center',
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
                        api.byIdGetDoctor(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            const {
                              hosptalName,
                              obtainEmploymentYear,
                              hospitalId,
                              isMain,
                              ...data
                            } = res.data.doctorInfo;
                            data.obtainEmploymentYear = String(
                              obtainEmploymentYear
                            );
                            this.form = data;
                            // this.hospitalInfo.map((item=>{
                              if(this.employeeType == 'hospitalEmployee'){
                                if(hospitalId == this.hospitalId){
                                    this.form.hospitalId = hospitalId
                                }
                              }else{
                                this.form.hospitalId = hospitalId
                              }
                            // }))
                            if(isMain ==1 ){
                              this.form.isMain = true
                            }else{
                              this.form.isMain = false
                            }
                            this.uploadObj.uploadList = this.form.picUrl ? [this.form.picUrl] : '';
                            this.mainUploadObj.uploadList = this.form.projectPicture ? [this.form.projectPicture] : '';
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
                            api.deleteDoctor(id).then((res) => {
                              if (res.code === 0) {
                                this.getDoctor();
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

      // 医院列表
      hospitalInfo: [],

      form: {
        // 医生名称
        name: "",
        // 缩略图
        picUrl: "",
        // 职称
        position: "",
        // 从业年份
        obtainEmploymentYear: "",
        // 医院
        hospitalId: "",
        id: "",
        // 科室
        departmentId:'',
        // 简介
        description:'',
        // 是否主推
        isMain:false,
        // 主推项目图
        projectPicture:'',
      },

      ruleValidate: {
        projectPicture: [
          {
            required: true,
            message: "请上传医生详情图",
          },
        ],
        departmentId: [
          {
            required: true,
            message: "请选择科室",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入医生名称",
          },
        ],
        picUrl: [
          {
            required: true,
            message: "请上传缩略图",
          },
        ],
        position: [
          {
            required: true,
            message: "请输入职称",
          },
        ],
        obtainEmploymentYear: [
          {
            required: true,
            message: "请选择从业年份",
          },
        ],
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
      },
    };
  },
  methods: {
    //   获取科室
    getAmiyaHospitalDepartmentListChange() {
      orderApi.getAmiyaHospitalDepartmentList().then((res) => {
        if (res.code === 0) {
          const { AmiyaHospitalDepartmentList } = res.data;
          this.AmiyaHospitalDepartmentListDepartment = AmiyaHospitalDepartmentList;
        }
      });
    },
    // 获取医生信息列表
    getDoctor() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize ,hospitalId} = this.query;
      const data = { 
        keyword, 
        pageNum, 
        pageSize ,
        hospitalId: sessionStorage.getItem("hospitalId") ? sessionStorage.getItem("hospitalId") : hospitalId
      };
      api.Doctor(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.doctorInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 医生信息列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize ,hospitalId} = this.query;
      const data = { 
        keyword, 
        pageNum, 
        pageSize ,
        hospitalId: sessionStorage.getItem("hospitalId") ? sessionStorage.getItem("hospitalId") : hospitalId
        };
      api.Doctor(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.doctorInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院名称列表
    getHospitalInfonameList() {
      api.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
          this.hospitalInfo.map((item=>{
            if(this.employeeType == 'hospitalEmployee'){
              if(item.id == this.hospitalId){
                  this.query.hospitalId = item.id
                  this.form.hospitalId = item.id
              }
            }
          }))
        }
      });
    },

    // 图片
    handleUploadChange(values) {
      this.form.picUrl = values[0];
    },
    // 项目主推案例图
    mainHandleUploadChange(values){
      this.form.projectPicture = values[0];
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const { obtainEmploymentYear, isMain,hospitalId, ...data } = this.form;
            const params = {
              obtainEmploymentYear: Number(
                this.$moment(obtainEmploymentYear).format("YYYY")
              ),
              isMain : isMain == true ? 1 : 0,
              hospitalId:sessionStorage.getItem("employeeType") == 'amiyaEmployee' ? hospitalId : Number(sessionStorage.getItem("hospitalId")),
              ...data,
            };
            this.flag = true
            // 修改
            api.updateDoctor(params).then((res) => {
              if (res.code === 0) {
                this.flag = false
                this.isEdit = false;
                this.cancelSubmit();
                this.getDoctor();
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
            let { id, obtainEmploymentYear,isMain,hospitalId, ...data } = this.form;
            const params = {
              ...data,
              obtainEmploymentYear: Number(
                this.$moment(obtainEmploymentYear).format("YYYY")
              ),
              isMain : isMain == true ? 1 : 0,
              hospitalId:sessionStorage.getItem("employeeType") == 'amiyaEmployee' ? hospitalId : Number(sessionStorage.getItem("hospitalId"))
            };
            this.flag = true
            // 添加
            api.addDoctor(params).then((res) => {
              if (res.code === 0) {
                this.flag = false
                this.cancelSubmit();
                this.getDoctor();
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
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.uploadObj.uploadList = [];
        this.mainUploadObj.uploadList = [];
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getDoctor();
    this.getHospitalInfonameList();
    this.getAmiyaHospitalDepartmentListChange()
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
