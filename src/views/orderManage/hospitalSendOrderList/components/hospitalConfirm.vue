<template>
  <div>
    <Modal
      v-model="controlModals"
      title="确认"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="60%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="是否到院" prop="isToHospital" key="是否到院">
              <i-switch
                v-model="form.isToHospital"
                :disabled="form.isFinish === true"
                @on-change="isToHospitalChange"
              />
            </FormItem>
          </Col>

          <Col span="8" v-if="form.isToHospital === true">
            <FormItem label="到院类型" prop="toHospitalType" key="到院类型">
              <Select
                v-model="form.toHospitalType"
                placeholder="请选择到院类型"
                clearable
                filterable
                @on-change="toHospitalTypeListChange"
              >
                <Option
                  v-for="item in this.toHospitalTypeList"
                  :value="item.orderType"
                  :key="item.orderType"
                  >{{ item.orderTypeText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isToHospital == true">
            <FormItem label="到院时间" prop="toHospitalDate" key="到院时间">
              <DatePicker
                type="date"
                placeholder="到院时间"
                :value="form.toHospitalDate"
                v-model="form.toHospitalDate"
                style="width:100%"
                transfer
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isToHospital == true">
            <FormItem label="是否陪诊" prop="isAcompanying" key="是否陪诊">
              <i-switch v-model="form.isAcompanying" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否成交" prop="isFinish" key="是否成交">
              <i-switch v-model="form.isFinish" @on-change="isFinishChange" />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isFinish !== true">
            <FormItem label="未成交原因" prop="unDealReason" key="未成交原因">
              <Input
                v-model="form.unDealReason"
                placeholder="请输入未成交原因"
                type="textarea"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isFinish !== true">
            <FormItem label="未成交截图" key="未成交截图">
              <upload
                :uploadObj="noDealuploadObj"
                @uploadChange="noDealhandleUploadChange"
              />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isFinish === true">
            <FormItem
              label="成交金额"
              prop="dealAmount"
              key="成交金额"
              :rules="[
                {
                  required: true,
                  message: '请输入成交金额(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.dealAmount"
                placeholder="请输入成交金额"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isFinish === true">
            <FormItem label="成交时间" prop="DealDate" key="成交时间">
              <DatePicker
                type="date"
                placeholder="成交时间"
                style="width: 100%"
                v-model="form.DealDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isFinish === true">
            <FormItem label="消费类型" prop="consumptionType" key="消费类型">
              <Select
                v-model="form.consumptionType"
                placeholder="请选择消费类型"
                clearable
                filterable
                :disabled="form.toHospitalType == 4"
              >
                <Option
                  v-for="item in typeList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isFinish === true">
            <FormItem label="后期项目铺垫" key="后期项目铺垫">
              <Input
                v-model="form.lastProjectStage"
                placeholder="请输入后期项目铺垫"
                type="textarea"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isFinish === true">
            <FormItem label="成交凭证" key="成交凭证">
              <upload
                :uploadObj="uploadObj"
                @uploadChange="handleUploadChange"
              />
            </FormItem>
          </Col>
        </Row>
        <div
          style="color:red;font-size:3px;margin-top:-20px"
          v-if="form.isFinish === true"
        >
          *注：请上传该手机号客户在贵公司系统的成交凭证截图
        </div>

        <Divider style="" />
        <!-- 成交明细 -->
        <detailTable
          @handle="handle"
          :id="this.id"
          v-if="form.isFinish === true"
        />
        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <Button type="primary" @click="submit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import upload from "@/components/upload/upload";
import * as api from "@/api/orderManage";
import detailTable from "./detailTable";
export default {
  components: {
    upload,
    detailTable,
  },
  props: {
    id: String,
    controlModal: Boolean,
    typeList: Array,
    toHospitalTypeList: Array,
  },
  data() {
    return {
      isLoading:false,
      controlModals: false,
      form: {
        id: null,
        // 是否成交
        isFinish: false,
        // 是否到院
        isToHospital: false,
        // 成交金额
        dealAmount: null,
        //后期铺垫
        lastProjectStage: "",
        // 成交凭证
        dealPictureUrl: "",
        // 未成交原因
        unDealReason: "",
        // 未成交截图
        unDealPictureUrl: "",
        // 成交时间
        DealDate: null,
        lastDealHospitalId: null,
        toHospitalDate: "",
        toHospitalType: null,
        // 是否陪诊
        isAcompanying: false,
        // 消费类型
        consumptionType: null,
        // 明细
        addContentPlatFormOrderDealDetailsVoList: [],
      },
      ruleValidate: {
        consumptionType: [
          {
            required: true,
            message: "请选消费类型",
          },
        ],
        toHospitalType: [
          {
            required: true,
            message: "请选择到院类型",
          },
        ],
        toHospitalDate: [
          {
            required: true,
            message: "请选择到院时间",
          },
        ],
        lastDealHospitalId: [
          {
            required: true,
            message: "请选择到院医院",
            trigger: "blur",
            type: "number",
          },
        ],
        unDealReason: [
          {
            required: true,
            message: "请输入未成交原因",
            trigger: "blur",
          },
        ],
        dealAmount: [
          {
            required: true,
            message: "请输入成交金额",
            trigger: "blur",
          },
        ],
        DealDate: [
          {
            required: true,
            message: "请选择时间",
          },
        ],
      },
      dealRuleValidate: {
        repeatePictureUrl: [
          {
            required: true,
            message: "请上传重单截图",
          },
        ],
      },
      noDealuploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      delUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
    };
  },
  methods: {
    // 判断到院类型为退款(4)的情况 消费类型只能选择退款消费
    toHospitalTypeListChange(value){
      const {isToHospital,isFinish,toHospitalType} = this.form
      // if((isToHospital == true && isFinish == true) || isToHospital == true){
        if(toHospitalType == 4){
          this.form.toHospitalType = value
          this.form.consumptionType = 2
          return
        }
        // else{
        //   this.form.consumptionType = ''
        // }
      // }else{
      //   this.form.consumptionType = 3
      // }
    },
    handle(value) {
      this.form.addContentPlatFormOrderDealDetailsVoList = value;
    },
    // 未成交截图
    noDealhandleUploadChange(values) {
      this.form.unDealPictureUrl = values[0];
    },
    // 图片
    handleUploadChange(values) {
      this.form.dealPictureUrl = values[0];
    },
    // 图片
    dealHandleUploadChange(values) {
      this.imgForm.repeatePictureUrl = values[0];
    },
    // 确认
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            isFinish,
            dealAmount,
            lastProjectStage,
            dealPictureUrl,
            unDealReason,
            isToHospital,
            unDealPictureUrl,
            DealDate,
            lastDealHospitalId,
            toHospitalDate,
            toHospitalType,
            isAcompanying,
            consumptionType,
            addContentPlatFormOrderDealDetailsVoList,
          } = this.form;
          const data = {
            id:this.id,
            isFinish,
            dealAmount: isFinish == true ? dealAmount : 0,
            lastProjectStage: isFinish == true ? lastProjectStage : "",
            dealPictureUrl: isFinish == true ? dealPictureUrl : "",
            unDealReason: isFinish == true ? "" : unDealReason,
            isToHospital: isFinish === true ? true : isToHospital,
            unDealPictureUrl:
              isFinish === true ? "" : unDealPictureUrl ? unDealPictureUrl : "",
            DealDate: DealDate
              ? this.$moment(DealDate).format("YYYY-MM-DD")
              : null,
            lastDealHospitalId:
              isToHospital == true
                ? Number(sessionStorage.getItem("hospitalId"))
                : null,
            toHospitalDate: toHospitalDate
              ? this.$moment(toHospitalDate).format("YYYY-MM-DD")
              : null,
            toHospitalType: isToHospital == false ? 0 : toHospitalType,
            isAcompanying,
            consumptionType,
            // addContentPlatFormOrderDealDetailsVoList: isFinish == false ? [] : addContentPlatFormOrderDealDetailsVoList,
            addContentPlatFormOrderDealDetailsVoList:isFinish == false  || dealAmount == 0 ? [] : addContentPlatFormOrderDealDetailsVoList
          };
          
          if(isFinish == true){
            if(dealAmount == 0){
              this.isLoading = true
              api.finishContentPlateFormOrder(data).then((res) => {
                  if (res.code === 0) {
                    this.isLoading = false
                    this.cancel("form");
                  //   this.getHospitalContentList();
                  this.$emit("getHospitalContentList")
                    this.$Message.success({
                      content: "确认成功",
                      duration: 3,
                    });
                  }else {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 3000);
                }
                });
              return
            }else{
                let price = 0
                if(addContentPlatFormOrderDealDetailsVoList.length == 0 || addContentPlatFormOrderDealDetailsVoList == []){
                  this.$Message.warning('请填写成交明细！')
                  return
                }
                addContentPlatFormOrderDealDetailsVoList.map(item=>{
                  price += Number(item.price)
                  return
                })
                if(price*100 != dealAmount*100){
                  this.$Message.warning('成交明细合计与成金金额不一致，请认真核对！')
                  return
                }
                this.isLoading = true
                api.finishContentPlateFormOrder(data).then((res) => {
                  if (res.code === 0) {
                    this.isLoading = false
                    this.cancel("form");
                  //   this.getHospitalContentList();
                  this.$emit("getHospitalContentList")
                    this.$Message.success({
                      content: "确认成功",
                      duration: 3,
                    });
                  }else {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 3000);
                }
                });
              return
            }
          }else{
            this.isLoading = true
            api.finishContentPlateFormOrder(data).then((res) => {
              if (res.code === 0) {
                this.isLoading = false
                this.cancel("form");
              //   this.getHospitalContentList();
              this.$emit("getHospitalContentList")
                this.$Message.success({
                  content: "确认成功",
                  duration: 3,
                });
              }else {
                  setTimeout(() => {
                    this.isLoading = false;
                  }, 3000);
                }
            });
          }
          
        }
      });
    },
    // 取消
    cancel(name) {
      this.uploadObj.uploadList = [];
      this.delUploadObj.uploadList = [];
      this.noDealuploadObj.uploadList = [];
      this.$refs[name].resetFields();
      this.form.isFinish = false
      this.form.isToHospital = false
      this.form.addContentPlatFormOrderDealDetailsVoList = []
      this.$emit("update:controlModal", false);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel("form");
        this.$emit("update:controlModal", false);
      }
    },
    // 是否到院
    isToHospitalChange() {
      if (this.form.isToHospital == false) {
        this.form.toHospitalDate = null;
        this.form.toHospitalType = null;
        this.form.isAcompanying = false;
      } else {
        this.form.lastDealHospitalId = Number(
          sessionStorage.getItem("hospitalId")
        );
      }
    },
    isFinishChange() {
      if (this.form.isFinish === true) {
        this.form.isToHospital = true;
        this.form.dealAmount = "";
        this.form.lastProjectStage = "";
        this.uploadObj.uploadList = [];
        this.form.DealDate = null;
        // this.form.consumptionType = null;
      } else {
        this.form.isToHospital = false;
        this.form.unDealReason = "";
        this.noDealuploadObj.uploadList = [];
        this.form.toHospitalDate = null;
        this.form.toHospitalType = null;
        this.form.isAcompanying = false;
      }
    },
  },
  watch: {
    controlModal(value) {
      this.controlModals = value;
    },
  },
};
</script>
