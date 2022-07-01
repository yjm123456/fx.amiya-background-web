<template>
  <div>
    <Modal
      v-model="controlModal"
      :mask-closable="false"
      :closable="false"
      width="1300"
    >
      <Form
        ref="hospitalInfo"
        :model="hospitalInfo"
        :rules="ruleValidate"
        label-position="left"
        :label-width="90"
      >
        <div class="hospital_information">
          <div style="border-radius:50%">
            <logoUpload
              :uploadObj="thumbPicUrlUploadObj"
              @uploadChange="handleThumbPicUrlUploadChange"
            />
          </div>
          <div class="name">
            <input
              type="text"
              v-model="hospitalInfo.name"
              style="padding:5px 10px;border:1px solid #f5f5f5;color:#515a6e;width:260px;outline-color:#57a3f3;outline-width : 0px;"
            />
          </div>
        </div>
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="医院级别" prop="scaleTagList">
              <Select
                v-model="hospitalInfo.scaleTagList"
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
            <FormItem label="医院荣誉" prop="industryHonors">
              <Input
                v-model="hospitalInfo.industryHonors"
                placeholder="政府荣誉、协会荣誉、专利技术、协会等"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="成立时间" prop="hospitalCreateDate">
              <DatePicker
                type="date"
                placeholder="成立时间"
                style="width:100%"
                :value="hospitalInfo.hospitalCreateDate"
                v-model="hospitalInfo.hospitalCreateDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="医院面积" prop="area">
              <!-- <Input
              v-model="hospitalInfo.area"
              placeholder="请输入医院面积"
            ></Input> -->
              <Input v-model="hospitalInfo.area" type="number" number>
                <span slot="append">㎡</span>
              </Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="地址" prop="address">
              <Input
                v-model="hospitalInfo.address"
                placeholder="请输入地址"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="咨询热线" prop="phone">
              <Input
                v-model="hospitalInfo.phone"
                placeholder="请输入咨询热线"
              ></Input>
            </FormItem>
          </Col>
          <!-- <Col span="5">
            <FormItem label="当地知名度" prop="profileRank">
              <Input
                v-model="hospitalInfo.profileRank"
                placeholder="请输入当地知名度"
              ></Input>
            </FormItem>
          </Col> -->
        </Row>
        <Row :gutter="30">
          <Col span="24">
            <FormItem label="医院简介" prop="description">
              <Input
                v-model="hospitalInfo.description"
                placeholder="请输入医院简介"
                type="textarea"
                :rows="4"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="10">
            <FormItem label="简介详情" prop="descriptionPicture" style="width:490px">
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
          <Col span="8">
            <Button type="primary" @click="viewContractChange">查看简介详情</Button>
          </Col>
          
        </Row>
        <div>
          <div class="environment">医院环境</div>
          <Tabs :value="activeName" @on-click="handleTabsSwitch">
            <TabPane
              v-for="(item, index) in hospitalInfo.hospitalEnvironmentInfo"
              :key="index"
              :label="item.name"
              :name="item.name"
            >
              <upload :uploadObj="environmentUploadObj" />
            </TabPane>
          </Tabs>
        </div>
        <div class="env_con">
          <div class="environment">科室与医生介绍</div>
          <Tabs
            :value="activeDepartmentName"
            @on-click="DepartmenthandleTabsSwitch"
          >
            <TabPane
              v-for="(item, index) in hospitalInfo.departmentAndDoctors"
              :key="index"
              :label="item.departmentName"
              :name="item.departmentName"
            >
              <div
                class="department_con"
                v-if="item.doctor"
                :style="{
                  'overflow-x': item.doctor.length == 0 ? 'hidden' : 'scroll',
                }"
              >
                <div
                  v-for="(i, d) in item.doctor"
                  :key="d"
                  style="width:150px;margin:0 20px 20px 0;"
                >
                  <viewer>
                    <img :src="i.picUrl" alt="" class="img" v-if="i.picUrl"/>
                    <div v-else style="width:150px;height:150px;text-align:center;line-height:150px;border:1px solid #ccc;margin-bottom:10px">请在医生-详情添加图片</div>
                  </viewer>

                  <div class="detail_con">
                    <div v-if="i.name">姓名：{{ i.name }}</div>
                    <div v-if="i.position">职称：{{ i.position }}</div>
                    <div v-if="i.isMain == true" style="color:red">{{ '主推医生'}}</div>
                    <div v-if="i.isMain == false" style="color:red;margin-top:20px"></div>
                    <Button type="primary" @click="viewDoctorChange(i.projectPicture)" style="margin-top:10px">查看医生详情图</Button>
                    <!-- <viewer v-if="viewDoctor == true">
                       <img :src="i.projectPicture" alt="" class="img"/>
                    </viewer> -->
                    <!-- <div v-if="i.position">职称：{{ i.position }}</div>
                    <div v-if="i.obtainEmploymentYear">
                      从业年份：{{ i.obtainEmploymentYear }}年
                    </div>
                    <Tooltip
                      max-width="230"
                      transfer
                      :content="i.description"
                      v-if="i.description"
                    >
                      <div class="remark">简介：{{ i.description }}</div>
                    </Tooltip> -->
                  </div>
                </div>
              </div>
              <div v-if="item.doctor.length == 0" class="no_data">暂无数据</div>
            </TabPane>
          </Tabs>
        </div>
      </Form>
      <div slot="footer">
        <div class="footer_con">
          <div class="z_t">
            <div class="text" v-if="hospitalInfo.submitStateText" >提交状态： <div :style="{'color': (hospitalInfo.submitStateText == '已提交') ?'#04B05D' : 'orange'}">{{hospitalInfo.submitStateText}}</div> </div>
            <div class="text"  v-if="hospitalInfo.checkStateText">审核状态：<div :style="{'color': (hospitalInfo.checkStateText == '审核通过') ? '#04B05D': 'orange'}">{{hospitalInfo.checkStateText}}</div></div>
            <div class="text1" v-if="hospitalInfo.checkRemark" style="display:flex;text-align:start;width:650px">审核备注：<div style="flex:1;">{{hospitalInfo.checkRemark}}</div></div>
          </div>
          <div style="width:200px">
          <Button @click="cancelSubmit('hospitalInfo')">关闭</Button>
          <Button type="primary" @click="handleSubmit('hospitalInfo')"
            >确定</Button
          >
          </div>
        </div>
      </div>
    </Modal>
    <Modal v-model="viewDoctor" title="医生详情图" :mask-closable="false" >
      <!-- 预览图片 -->
      <viewer v-if="viewDoctorImg">
        <img :src="viewDoctorImg" alt="" class="viewDoctorImg">
      </viewer>
      <div v-else style="text-align:center">暂无图片</div>
      <div slot="footer">
        <Button @click="cancelDoctorImgSubmit()">关闭页面</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as user from "@/api/user";
import * as api from "@/api/hospitalManage";
import logoUpload from "@/components/upload/logoUpload";
import upload from "@/components/upload/upload";
import uploadFile from "@/components/upload/uploadFile";

export default {
  props: {
    controlHospitalInformationModel: Boolean,
  },
  components: {
    logoUpload,
    upload,
    uploadFile,
  },
  data() {
    return {
      // 查看详情图
      viewDoctorImg:'',
      viewDoctor:false,
      activeName: "",
      activeDepartmentName: "",
      //环境模块
      environmentUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 3,
        // 文件列表
        uploadList: [],
      },
      // logo
      thumbPicUrlUploadObj: {
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
      controlModal: false,
      // 标签列表 医院级别
      scaleTagList: [],

      employeeType: sessionStorage.getItem("employeeType"),

      hospitalInfo: {
        // 医院名字
        name: "",
        // 医院logo
        thumbPicUrl: "",
        // 医院地址
        address: "",
        // 医院成立时间
        hospitalCreateDate: "",
        // 医院级别
        tagIds: [],
        // 医院荣誉
        industryHonors: "",
        // 当地知名度
        profileRank: "",
        // 医院简介
        description: "",
        // 医院环境图片
        hospitalEnvironmentPicture: [],
        // 科室医生
        departmentAndDoctors: [],
        // 医院环境
        hospitalEnvironmentInfo: [],
        // 简介资料
        descriptionPicture: "",
        // 面积
        area:null,
        // 咨询热线
        phone:''
      },

      ruleValidate: {
        address: [
          {
            required: true,
            message: "请输入地址",
          },
        ],
        // hospitalCreateDate: [
        //   {
        //     required: true,
        //     message: "请选择成立时间",
        //   },
        // ],
        // industryHonors: [
        //   {
        //     required: true,
        //     message: "请输入医院荣誉",
        //   },
        // ],
        area: [
          {
            required: true,
            message: "请输入医院面积",
          },
        ],
      },
    };
  },

  methods: {
    // 查看医生详情图
    viewDoctorChange(img){
      this.viewDoctor = true
      this.viewDoctorImg = img
    },
    // 查看合同
    viewContractChange(){
      if(this.hospitalInfo.descriptionPicture){
        window.open(this.hospitalInfo.descriptionPicture);
      }else{
        this.$Message.error('暂无上传简介详情')
      }
    },
    // PDF转换地址
    jumpHtml() {
      window.open("https://smallpdf.com/cn/word-to-pdf");
    },
    // 上传文件
    handleUploadFileChange(values, uploadListName) {
      this.hospitalInfo.descriptionPicture = values[0];
      this.uploadFileName = uploadListName;
    },
    // 环境切换
    handleTabsSwitch(name) {
      this.activeName = name;
      let nowArr = this.hospitalInfo.hospitalEnvironmentInfo.filter((val) => {
        return val.name == name;
      });
      this.environmentUploadObj.uploadList = nowArr[0].pictureUrl;
    },
    // 科室切换
    DepartmenthandleTabsSwitch(name) {
      this.activeDepartmentName = name;
    },
    // 获取医院资料
    getByIdHospitalInfoChange() {
      api.byIdHospitalInfo(sessionStorage.getItem("hospitalId")).then((res) => {
        if (res.code === 0) {
          const { hospitalInfo } = res.data;
          this.hospitalInfo = hospitalInfo;
          // 回显医院logo
          this.thumbPicUrlUploadObj.uploadList = [hospitalInfo.thumbPicUrl];
          // 回显简介详情
          this.uploadFileObj.uploadList = this.hospitalInfo.descriptionPicture ? [this.hospitalInfo.descriptionPicture] : [];
          // 回显医院环境图片
          this.environmentUploadObj.uploadList =
            hospitalInfo.hospitalEnvironmentInfo[0].pictureUrl;
          //医院默认选中第一个tab
          this.activeName = this.hospitalInfo.hospitalEnvironmentInfo[0].name;
        }
      });
    },
    // 提交 修改医院资料
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            name,
            thumbPicUrl,
            address,
            hospitalCreateDate,
            industryHonors,
            profileRank,
            description,
            hospitalEnvironmentInfo,
            area,
            phone,
            descriptionPicture
          } = this.hospitalInfo;
          let hospitalEnvironmentInfos = hospitalEnvironmentInfo.map((item) => {
            let data = {
              hospitalId: Number(sessionStorage.getItem("hospitalId")),
              hospitalEnvironmentId: item.id,
              pictureUrl: item.pictureUrl,
            };
            return data;
          });
          const data = {
            name,
            thumbPicUrl,
            address,
            hospitalCreateDate: hospitalCreateDate
              ? this.$moment(hospitalCreateDate).format("YYYY-MM-DD")
              : null,
            tagIds: this.hospitalInfo.scaleTagList,
            industryHonors,
            profileRank,
            description,
            hospitalEnvironmentPicture: hospitalEnvironmentInfos,
            area,
            phone,
            descriptionPicture
          };
          api.UpdateHospitalInfo(data).then((res) => {
            if (res.code === 0) {
              this.cancelSubmit("hospitalInfo");
              this.$emit("handleEditHospitalInfoModalChange");
              this.$Message.success({
                content: "修改成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 获取标签列表 医院级别
    getScaleTagList() {
      const data = { type: 0 };
      api.TagInfonameList(data).then((res) => {
        if (res.code === 0) {
          this.scaleTagList = res.data.tagInfo;
        }
      });
    },
    // logo图
    handleThumbPicUrlUploadChange(values) {
      this.hospitalInfo.thumbPicUrl = values[0];
    },
    cancelDoctorImgSubmit(){
      this.viewDoctor = false
    },
    // 取消
    cancelSubmit(name) {
      this.controlModal = false;
      this.viewDoctor = false
      this.$refs[name].resetFields();
      this.thumbPicUrlUploadObj.uploadList = [];
      this.environmentUploadObj.uploadList = [];
      this.uploadFileName = [];
      this.$emit("handleEditHospitalInfoModalChange");
    },
  },
  created() {
    this.getScaleTagList();
  },
  watch: {
    controlHospitalInformationModel(value) {
      if (value) {
        this.controlModal = value;
        
        this.getByIdHospitalInfoChange();
      }
    },
  },
};
</script>
<style scoped lang="less">
// /deep/ .ivu-input,
// .ivu-input-default {
//   border: 1px solid #f5f5f5 !important;
// }
.hospital_information {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0 20px;
}
.name {
  margin-left: 20px;
}
.department_con {
  // width: 200px;
  display: flex;
  flex-shrink: 1;
  width: 100%;
  // overflow-x: scroll;
}
.img {
  width: 150px;
  height: 150px;
  display: block;
  margin-bottom: 10px;
}
.remark {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
}
.no_data {
  width: 100%;
  text-align: center;
}

.env_con {
  margin-top: 20px;
}
.viewDoctorImg{
  width: 100%;
  height: auto;
}
.footer_con{
  display: flex;
  justify-content: space-between
}
.z_t{
  flex: 1;
  display: flex;
}
.text{
  margin-right: 30px;
  display: flex;
  width: 150px;
}

.z_t{
  flex: 1;
  display: flex;
  margin-right: 20px;
}
</style>
