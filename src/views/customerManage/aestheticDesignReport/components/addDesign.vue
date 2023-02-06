<template>
  <div>
    <Modal
      v-model="control"
      :title="addDesignParams.title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="50%"
    >
      <div class="order_message">
        <div class="message_title"><span class="line"></span>基本信息</div>
        <div class="order_content">
          <div class="item_list">
            <div class="items">
              <span class="title_bold">姓名：</span>
              <span>{{ addDesignParams.info.name }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">生日：</span>
              <span
                >{{
                  addDesignParams.info.birthDay
                    ? this.$moment(addDesignParams.info.birthDay).format(
                        "YYYY-MM-DD"
                      )
                    : ""
                }}
              </span>
            </div>
          </div>
          <div class="item_list">
            <div class="mr_top items">
              <span class="title_bold">联系方式：</span>
              <span>{{ addDesignParams.info.phone }} </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">城市：</span>
              <span>{{ addDesignParams.info.city }} </span>
            </div>
          </div>
        </div>
      </div>

      <div class="order_message">
        <div class="message_title"><span class="line"></span>历史医美项目</div>
        <div class="order_content">
          <div class="item_list">
            <div class="items">
              <span class="title_bold">是否有医美经历：</span>
              <span
                >{{
                  addDesignParams.info.hasAestheticMedicineHistory == true
                    ? "是"
                    : "否"
                }}
              </span>
            </div>
          </div>
          <div class="item_list">
            <div class="items mr_top">
              <span class="title_bold">微创调整的部位以及所用材料：</span>
              <span>{{ addDesignParams.info.historyDescribe1 }} </span>
            </div>
          </div>
          <div class="item_list">
            <div class="items mr_top">
              <span class="title_bold">整形调整的部位：</span>
              <span>{{ addDesignParams.info.historyDescribe2 }} </span>
            </div>
          </div>
          <div class="item_list">
            <div class="items mr_top">
              <span class="title_bold">皮肤做过的仪器或项目：</span>
              <span>{{ addDesignParams.info.historyDescribe3 }} </span>
            </div>
          </div>
          <div class="item_list">
             <div class="mr_top items">
              <span class="title_bold">是否有过过敏史或其他疾病：</span>
              <span
                >{{
                  addDesignParams.info.whetherAllergyOrOtherDisease == true
                    ? "是"
                    : "否"
                }}
              </span>
            </div>
            <div class="mr_top items">
              <span class="title_bold">是否接收手术：</span>
              <span
                >{{
                  addDesignParams.info.whetherAcceptOperation == true
                    ? "是"
                    : "否"
                }}
              </span>
            </div>
           
          </div>
          <div class="item_list">
            <div class="items mr_top">
              <span class="title_bold">过敏或疾病描述：</span>
              <span
                >{{ addDesignParams.info.allergyOrOtherDiseaseDescribe }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="order_message">
        <div class="message_title"><span class="line"></span>变美需求</div>
        <div class="order_content">
          <div class="item_list">
            <div class="items">
              <span class="title_bold">变美需求描述：</span>
              <span>{{ addDesignParams.info.beautyDemand }} </span>
            </div>
          </div>
          <div class="item_list">
            <div class="items mr_top">
              <span class="title_bold">预算：</span>
              <span>{{ addDesignParams.info.budget }} </span>
            </div>
          </div>
          <div class="title_bold2">用户图片：</div>
          <div class="sj_con">
            <viewer
              v-if="addDesignParams.info.frontPicture"
              baseLayerPicker="true"
            >
              <img
                :src="addDesignParams.info.frontPicture"
                alt=""
                class="sj_img"
              />
            </viewer>
            <viewer
              v-if="addDesignParams.info.sidePicture"
              baseLayerPicker="true"
            >
              <img
                :src="addDesignParams.info.sidePicture"
                alt=""
                class="sj_img"
              />
            </viewer>
          </div>
        </div>
      </div>

      <div class="order_message">
        <div class="message_title"><span class="line"></span>美学设计</div>
        <div class="order_content">
          <div class="title_bold2">美学设计：</div>
          <div class="sj_con">
            <div class="view_img">
              <viewer baseLayerPicker="true">
                <img
                  src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/075e9d14fdfd49508b1e6bd03ace74a1.png"
                  alt=""
                  class="sj_img"
                />
              </viewer>
              <Select
                v-model="form.pictireTags"
                placeholder="请选择面部标签"
                style="width: 350px; margin-top: 10px"
                multiple
                filterable
              >
                <Option
                  v-for="item in faceTagNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </div>
            <div class="upload_con">
              <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
              <div class="upload_title">正面图片</div>
            </div>
            <div class="upload_con">
              <upload :uploadObj="uploadObj2" @uploadChange="handleUploadChange2" />
              <div class="upload_title">侧面图片</div>
            </div>
            <!-- <div class="view_img view_right">
              <viewer
                v-if="addDesignParams.info.frontPicture"
                baseLayerPicker="true"
              >
                <img
                  :src="addDesignParams.info.frontPicture"
                  alt=""
                  class="sj_img"
                />
              </viewer>
              <Select
                v-model="form.frontPictureTags"
                placeholder="请选择正面图片标签"
                style="width: 150%; margin-top: 10px"
                multiple
                filterable
              >
                <Option
                  v-for="item in faceTagNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </div>
            <div  class="view_img">
              <viewer
                v-if="addDesignParams.info.sidePicture"
                baseLayerPicker="true"
              >
                <img
                  :src="addDesignParams.info.sidePicture"
                  alt=""
                  class="sj_img"
                />
              </viewer>
              <Select
                v-model="form.sidePictureTags"
                placeholder="请选择侧面图片标签"
                style="width: 150%; margin-top: 10px"
                multiple
                filterable
              >
                <Option
                  v-for="item in faceTagNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </div> -->
          </div>
          <div class="mr_top">
            <span class="title_bold2">设计方案：</span>
            <Input
              v-model="form.design"
              placeholder="请输入设计方案"
              style="width:90%;"
              type="textarea"
              :rows="4"
            />
          </div>
          <div class="item_list mr_top">
            <div class="items  mr_top">
              <span class="title_bold">推荐医院：</span>
              <Select
                v-model="form.hospitalId"
                placeholder="请选择推荐医院"
                style="width: 80%;"
                filterable
              >
                <Option
                  v-for="item in addDesignParams.simpleNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </div>
            <div class="mr_top items">
              <span class="title_bold">推荐医生：</span>
              <Input
              v-model="form.recommendDoctor"
              placeholder="请输入设计方案"
               style="width: 80%;"
            />
            </div>
          </div>
        </div>
      </div>

      <div slot="footer">
        <Button @click="handleCancel()">取消</Button>
        <Button type="primary" @click="handleSubmit()">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/aestheticsDesignReport";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  props: {
    controlModal: Boolean,
    addDesignParams: Object,
  },
  data() {
    return {
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length:1,
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
      control: false,
      form: {
        // 设计内容
        design: "",
        // 医院
        hospitalId: null,
        // 推荐医生
        recommendDoctor: "",
        // 标签
        pictireTags:[],
        // 正面图片
        frontPicture:'',
        // 侧面图片
        sidePicture:'',
        id:''
      },
      ruleValidates: {
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkBuyAgainPrice: [
          {
            required: true,
            message: "请输入升单金额",
          },
        ],
        checkSettlePrice: [
          {
            required: true,
            message: "请输入服务费合计",
          },
        ],
      },
      //
      faceTagNameList: [],
    };
  },
  methods: {
    // 图片
    handleUploadChange(values) {
      this.form.frontPicture = values[0];
    },
    // 图片
    handleUploadChange2(values) {
      this.form.sidePicture = values[0];
    },
    // 获取面部标签
    getfaceTagNameList() {
      api.faceTagNameList().then((res) => {
        if (res.code === 0) {
          this.faceTagNameList = res.data.faceTagNameList;
        }
      });
    },
    handleSubmit() {
      const {design,hospitalId,recommendDoctor,pictireTags,frontPicture,sidePicture,id} = this.form
      if(!pictireTags){
        this.$Message.warning('请选择面部标签！')
        return
      }
      if(!frontPicture){
        this.$Message.warning('请上传正脸图片！')
        return
      }
      if(!sidePicture){
        this.$Message.warning('请上传侧面图片！')
        return
      }
      if(!design){
        this.$Message.warning('请输入设计方案！')
        return
      }
      if(!hospitalId){
        this.$Message.warning('请选择推荐医院！')
        return
      }
      if(!recommendDoctor){
        this.$Message.warning('请输入推荐医生！')
        return
      }
      if(this.addDesignParams.title == '添加设计'){
        const data = {
        aestheticsDesignReportId:id,
        design,
        hospitalId,
        recommendDoctor,
        pictireTags,
        frontPicture,
        sidePicture
      }
        api.addAestheticsDesign(data).then((res) => {
          if (res.code === 0) {
            this.handleCancel();
            this.$emit('getAestheticsDesignReport');
            this.$Message.success({
              content: "添加成功",
              duration: 3,
            });
          }
        });
      }else{
        const data2 = {
        id:id,
        design,
        hospitalId,
        recommendDoctor,
        pictureTags:pictireTags,
        frontPicture,
        sidePicture
      }
        api.updateDesign(data2).then((res) => {
          if (res.code === 0) {
            this.handleCancel();
            this.$emit('getAestheticsDesignReport');
            this.$Message.success({
              content: "编辑成功",
              duration: 3,
            });
          }
        });
      }
      
    },

    handleCancel(name) {
      this.$emit("update:controlModal", false);
      // this.$refs[name].resetFields();
      this.form = {}
      this.uploadObj.uploadList = []
      this.uploadObj2.uploadList = []
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  created() {
    this.getfaceTagNameList();
  },
  watch: {
    controlModal(value) {
      this.control = value;
      if(this.addDesignParams.info.aestheticsDesign){
        this.form.design = this.addDesignParams.info.aestheticsDesign.design
        this.form.hospitalId = this.addDesignParams.info.aestheticsDesign.hospitalId
        this.form.recommendDoctor = this.addDesignParams.info.aestheticsDesign.recommendDoctor
        this.form.pictireTags = this.addDesignParams.info.aestheticsDesign.pictureTags
        this.form.frontPicture = this.addDesignParams.info.aestheticsDesign.frontPicture
        this.form.sidePicture = this.addDesignParams.info.aestheticsDesign.sidePicture
        this.form.id = this.addDesignParams.info.id
        this.uploadObj.uploadList = [this.form.frontPicture];
        this.uploadObj2.uploadList = [this.form.sidePicture];
      }else{
        this.form = {}
        this.uploadObj.uploadList = []
        this.uploadObj2.uploadList = []
        this.form.id = this.addDesignParams.info.id
      }
      
    },
  },
};
</script>
<style scoped>
.order_message {
  color: #000;
}

.line {
  width: 1px;
  height: 20px;
  border: 2px solid #4381e6;
  background: #4381e6;
  margin-right: 5px;
  margin-left: 0;
}
.message_title {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.order_content,
.order_content2 {
  margin-top: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  border: 1px solid #dad0d0;
  margin-bottom: 20px;
}
.order_content2 {
  display: flex;
}
.title_bold {
  font-weight: bold;
}
.title_bold2 {
  font-weight: bold;
  margin: 10px 0;
}
.order_type {
  display: flex;
}
.order_time {
  margin-left: 100px;
}
.mr_top {
  margin-top: 10px;
}
.mr {
  margin: 20px 0 10px;
}
.fl_end,
.fl_end2 {
  display: flex;
  justify-content: space-between;
}
.img {
  width: 100%;
  height: auto;
}
.order_id {
  color: red;
}
.unImg {
  width: 40px;
  height: 40px;
}
.item_list {
  display: flex;
  /* justify-content: space-between; */
}
.items {
  width: 50%;
}
.fl_item {
  display: flex;
}
.items2 {
  width: 360px;
}
.sj_con {
  display: flex;
}
.sj_img {
  width: 80px;
  height: 80px;
  margin-right:20px
}
.view_img{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin:0 40px;
}
.view_right{
  margin: 0 100px;
}
.upload_con{
  margin-left: 80px;
  
}
.upload_title{
font-weight: bold;
margin-top: 5px;
}
</style>
