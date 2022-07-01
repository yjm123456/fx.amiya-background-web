<template>
  <div>
    <Modal
      v-model="controlModal"
      :mask-closable="false"
      :closable="false"
      width="1400"
    >
      <div class="content">
        <div class="top_info">
          <viewer v-if="hospitalInfo.thumbPicUrl">
            <img :src="hospitalInfo.thumbPicUrl" class="logo" />
          </viewer>
          <div class="address">{{ hospitalInfo.name }}</div>
        </div>
        <div class="input_content">
          <div class="scale1">
            <span style="width:80px">医院级别：</span>
            <div v-if="tagArr.length == 0">暂未选择标签</div>
            <div style="display:flex;width:90%;margin-right:10px" v-else>
              <div v-for="(item, index) in tagArr" :key="index">
                <span style="flex:1;"
                  >{{ item }}
                  <span v-if="index !== tagArr.length - 1">、</span></span
                >
              </div>
            </div>
          </div>
          <div class="scale2">
            <span style="width:80px">医院荣誉：</span>
            <span style="flex:1">{{
              hospitalInfo.industryHonors
                ? hospitalInfo.industryHonors
                : "暂未填写"
            }}</span>
          </div>
          <div class="scale">
            <span>成立时间：</span>
            <span>{{
              hospitalInfo.hospitalCreateDate
                ? this.$moment(hospitalInfo.hospitalCreateDate).format(
                    "YYYY-MM-DD"
                  )
                : "暂未填写"
            }}</span>
          </div>
        </div>
        <div class="input_content">
          <div class="scale1">
            <span>医院面积：</span>
            <span>{{
              hospitalInfo.area ? hospitalInfo.area + '㎡': "暂未填写"
            }} </span>
          </div>
          <div class="scale2">
            <span style="width:50px">地址：</span>
            <span style="flex:1">{{
              hospitalInfo.address ? hospitalInfo.address : "暂未填写"
            }}</span>
          </div>
          <div class="scale">
            <span>咨询热线：</span>
            <span>{{
              hospitalInfo.phone ? hospitalInfo.phone : "暂未填写"
            }}</span>
          </div>
        </div>
        <div class="remark_content">
          <span class="remark">医院简介：</span>
          <span style="flex:1">{{
            hospitalInfo.description ? hospitalInfo.description : "暂未填写"
          }}</span>
        </div>
        <Button
          type="primary"
          @click="viewContractChange"
          style="margin:20px 0"
          v-if="hospitalInfo.descriptionPicture"
          >查看简介详情</Button
        >
        <div
          class="hospital_environment"
          v-if="hospitalInfo.hospitalEnvironmentInfo"
        >
          <div>医院环境：</div>
          <Tabs :value="activeName" @on-click="handleTabsSwitch">
            <TabPane
              v-for="(item, index) in hospitalInfo.hospitalEnvironmentInfo"
              :key="index"
              :label="item.name"
              :name="item.name"
            >
              <div class="environment_list" v-if="item.pictureUrl">
                <div
                  v-for="(i, ind) in item.pictureUrl"
                  :key="ind"
                  style="width:100px;margin-right:20px;"
                >
                  <viewer v-if="i">
                    <img :src="i" class="hos_environment_img" />
                  </viewer>
                </div>
              </div>
              <div v-if="item.pictureUrl.length == 0" style="text-align:center">
                暂无数据
              </div>
            </TabPane>
          </Tabs>
        </div>
        <div class="env_con" v-if="hospitalInfo.departmentAndDoctors">
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
                    <img :src="i.picUrl" alt="" class="img" v-if="i.picUrl" />
                    <div
                      v-else
                      style="width:150px;height:150px;text-align:center;line-height:150px;border:1px solid #ccc;margin-bottom:10px"
                    >
                      请在医生-详情添加图片
                    </div>
                  </viewer>

                  <div class="detail_con">
                    <div v-if="i.name">姓名：{{ i.name }}</div>
                    <div v-if="i.position">职称：{{ i.position }}</div>
                    <div v-if="i.isMain == true" style="color:red">
                      {{ "主推医生" }}
                    </div>
                    <div
                      v-if="i.isMain == false"
                      style="color:red;margin-top:20px"
                    ></div>
                    <Button
                      type="primary"
                      @click="viewDoctorChange(i.projectPicture)"
                      style="margin-top:10px"
                      >查看医生详情图</Button
                    >
                  </div>
                </div>
              </div>
              <div v-if="item.doctor.length == 0" class="no_data">暂无数据</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel()">关闭页面</Button>
      </div>
    </Modal>
    <Modal v-model="viewDoctor" title="医生详情图" :mask-closable="false">
      <!-- 预览图片 -->
      <viewer v-if="viewDoctorImg">
        <img :src="viewDoctorImg" alt="" class="viewDoctorImg" />
      </viewer>
      <div v-else style="text-align:center">暂无图片</div>
      <div slot="footer">
        <Button @click="cancelDoctorImgSubmit()">关闭页面</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/hospitalManage";
export default {
  props: {
    hospitalDetailModel: Boolean,
    hospitalInfo: Object,
  },

  data() {
    return {
      controlModal: false,
      activeName: "",
      activeDepartmentName: "",
      scaleTagList: [],
      tagArr: [],
      // 查看详情图
      viewDoctorImg: "",
      viewDoctor: false,
    };
  },
  methods: {
    // 获取标签列表 医院级别
    getScaleTagList(tagList) {
      const data = { type: 0 };
      api.TagInfonameList(data).then((res) => {
        if (res.code === 0) {
          this.scaleTagList = res.data.tagInfo;
          tagList.map((val) => {
            this.scaleTagList.map((item) => {
              if (item.id == val) {
                return this.tagArr.push(item.name);
              }
            });
          });
        }
      });
    },
    cancel() {
      this.$emit("update:hospitalDetailModel", false);
      this.controlModal = false;
    },
    cancelDoctorImgSubmit() {
      this.viewDoctor = false;
    },
    // 查看合同
    viewContractChange() {
      if (this.hospitalInfo.descriptionPicture) {
        window.open(this.hospitalInfo.descriptionPicture);
      } else {
        this.$Message.error("暂无上传简介详情");
      }
    },
    // 科室切换
    DepartmenthandleTabsSwitch(name) {
      this.activeDepartmentName = name;
    },
    // 查看医生详情图
    viewDoctorChange(img) {
      this.viewDoctor = true;
      this.viewDoctorImg = img;
    },
    // 环境切换
    handleTabsSwitch(name) {
      this.activeName = name;
    },
  },
  created() {},
  watch: {
    hospitalDetailModel(value) {
      if (value) {
        this.controlModal = value;
      }
    },
    hospitalInfo(value) {
      this.hospitalInfos = value;
      this.getScaleTagList(value.scaleTagList);
      this.tagArr = [];
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.content {
  width: 90%;
  margin: 0 auto;
}
.no_data {
  text-align: center;
}
.top_info {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.input_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.scale,
.scale1,
.scale2,
.remark_content {
  display: flex;
  align-items: center;
}
.remark_content {
  margin-top: 20px;
}
.scale1 {
  width: 45%;
  display: flex;
}
.scale2 {
  width: 40%;
  display: flex;
}
.scale {
  width: 15%;
  margin-left: 2%;
}
.remark {
  width: 70px;
}
.hos_environment_img {
  width: 100px;
  height: 100px;
}
.environment_list {
  width: 100px;
  display: flex;
  margin-right: 20px;
}
.hospital_environment {
  margin-top: 20px;
}
.department_con {
  display: flex;
  flex-shrink: 1;
  width: 100%;
}
.img {
  width: 150px;
  height: 150px;
  display: block;
  margin-bottom: 10px;
}
.no_data {
  width: 100%;
  text-align: center;
}
.viewDoctorImg {
  width: 100%;
  height: auto;
}
.env_con {
  margin-top: 20px;
}
</style>
