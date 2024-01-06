<template>
  <div>
    <Modal
      v-model="control"
      title="商品信息"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000"
    >
    
      <div>
        
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidate"
          label-position="right"
          :label-width="110"
        >
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="商品名称" prop="name">
                <Input v-model="form.name" placeholder="请输入商品名称"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="商品简码" prop="simpleCode">
                <Input
                  v-model="form.simpleCode"
                  placeholder="请输入商品简码"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="规格" prop="standard">
                <Input v-model="form.standard" placeholder="请输入规格"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="交易类型" prop="exchangeType">
                <Select
                  v-model="form.exchangeType"
                  placeholder="请选择交易类型"
                  @on-change="checkedExchangeType"
                >
                  <Option
                    :value="item.exchangeType"
                    v-for="item in exchangeTypes"
                    :key="item.exchangeType"
                    >{{ item.exchangeTypeText }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                ref="integrationQuantity"
                label="抵扣积分"
                prop="integrationQuantity"
                :rules="{
                  required: form.exchangeType === 0 || form.exchangeType === 7,
                  message: '请输入抵扣积分',
                }"
              >
                <Input
                  v-model="form.integrationQuantity"
                  placeholder="请输入积分抵扣"
                  :disabled="form.exchangeType == 1 || form.exchangeType == 2|| form.exchangeType == 3|| form.exchangeType == 4|| form.exchangeType == 5|| form.exchangeType == 6"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="商品分类" prop="categoryIds">
                <Select v-model="form.categoryIds" placeholder="请选择商品分类" multiple>
                  <Option
                    :value="item.id"
                    v-for="item in goodsCategorys"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="8">
              <FormItem 
                ref="maxShowPrice"
                label="最大价格" 
                prop="maxShowPrice" 
                :rules="{
                  required: form.exchangeType === 1 || form.exchangeType === 7,
                  message: '请输入最大价格',
                }"
                >
                 <Input 
                  v-model="form.maxShowPrice" 
                  placeholder="请输入最大价格" 
                  :disabled="form.exchangeType == 0 || form.exchangeType == 2|| form.exchangeType == 3|| form.exchangeType == 4|| form.exchangeType == 5|| form.exchangeType == 6" 
                  number></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem 
                ref="minShowPrice"
                label="最小价格" 
                prop="minShowPrice"
                :rules="{
                  required: form.exchangeType === 1 || form.exchangeType === 7,
                  message: '请输入最小价格',
                }"
                >
                  <Input
                    v-model="form.minShowPrice"
                    placeholder="请输入最小价格"
                    :disabled="form.exchangeType == 0 || form.exchangeType == 2|| form.exchangeType == 3|| form.exchangeType == 4|| form.exchangeType == 5|| form.exchangeType == 6"
                    number
                  ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem 
                ref="salePrice"
                label="销售价格" 
                prop="salePrice"
                :rules="{
                  required: form.exchangeType === 1|| form.exchangeType === 7,
                  message: '请输入销售价格',
                }"
              >
                <Input 
                  v-model="form.salePrice" 
                  placeholder="请输入销售价格" 
                  :disabled="form.exchangeType == 0 || form.exchangeType == 2|| form.exchangeType == 3|| form.exchangeType == 4|| form.exchangeType == 5|| form.exchangeType == 6"
                  number
                  ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="库存" prop="inventoryQuantity">
                <Input
                  v-model="form.inventoryQuantity"
                  placeholder="请输入库存"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="浏览量" prop="visitCount">
                <Input v-model="form.visitCount" placeholder="请输入浏览量"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="销量" prop="showSaleCount">
                <Input
                  v-model="form.showSaleCount"
                  placeholder="请输入销量"
                ></Input>
              </FormItem>
            </Col>
            
          </Row>
          <!--  -->
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="序号" prop="sort">
                <Input v-model="form.sort" placeholder="请输入序号"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="标签"  >
                <Select
                  v-model="form.addGoodsTag"
                  placeholder="请选择标签"
                  multiple
                >
                  <Option
                    :value="item.id"
                    :key="item.id"
                    v-for="item in tags"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="归属小程序"  >
                <Select
                  v-model="form.appId"
                  placeholder="请选择归属小程序"
                  
                >
                  <Option
                    :value="item.id"
                    :key="item.id"
                    v-for="item in miniprogramName"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="缩略图" prop="thumbPicUrl">
                <upload
                  :uploadObj="thumbPicUrlUploadObj"
                  @uploadChange="handleThumbPicUrlUploadChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="轮播图" prop="carouselImageUrls">
                <upload
                  :uploadObj="carouselImageUploadObj"
                  @uploadChange="handleCarouselUploadChange"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="是否是热卖分类" prop="isHot">
                <i-switch v-model="form.isHot" />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="是否实物" prop="isMaterial">
                <i-switch v-model="form.isMaterial" />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="是否限购" prop="isLimitBuy">
                <i-switch v-model="form.isLimitBuy" />
              </FormItem>
            </Col>
            <Col span="8" >
              <FormItem 
                label="限购数量" 
                prop="limitBuyQuantity"
                :rules="{
                  required: form.isLimitBuy === true,
                  message: '请输入限购数量',
                }"
                
                >
                <Input
                  v-model="form.limitBuyQuantity"
                  placeholder="请输入限购数量"
                  type="number"
                  number
                  :disabled="form.isLimitBuy == false"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
             <Button type="primary" @click="addSpecificationsModel=true;exchangeType=form.exchangeType" style="margin-left:15%;margin-bottom:20px" >添加规格</Button>
            </Col>
            <Col span="8">
             <Button type="primary" @click="addMember()" style="margin-left:15%;margin-bottom:20px" v-if="form.exchangeType != 0">添加会员价格</Button>
            </Col>
            <Col span="8">
             <Button type="primary" @click="addVoucher()" style="margin-left:15%;margin-bottom:20px" v-if="form.exchangeType != 0">添加抵用券</Button>
            </Col>
            <Col span="8">
             <Button type="primary" @click="addHispital()" style="margin-left:15%;margin-bottom:20px" v-if="(form.exchangeType == 1 || form.exchangeType == 0) && form.isMaterial ==false">添加医院</Button>
            </Col>
            
          </Row>
          <Row :gutter="30">
            
            
            <Col span="8" v-show="form.isEdit">
              <FormItem label="是否有效" prop="valid">
                <i-switch v-model="form.valid" />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="24">
              <FormItem label="描述说明">
                <Input
                  v-model="form.description"
                  type="textarea"
                  placeholder="请输入描述说明"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="24">
              <FormItem label="备注">
                <Input
                  v-model="form.detailsDescription"
                  type="textarea"
                  placeholder="请输入备注"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="30">
            <Col span="24">
              <FormItem label="商品详情" prop="goodsDetailHtml">
                <editor v-model="form.goodsDetailHtml"></editor>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
      <!-- 添加规格 -->
      <specifications 
        :addSpecificationsModel.sync = "addSpecificationsModel" 
        :goodsInfo.sync = "goodsInfo" 
        @goodsStandardsPrice = "goodsStandardsPrice" 
        ref="specifications"
        :exchangeType="exchangeType"
      />
      <!-- 添加医院 -->
      <hospitalModel 
        :addHispitalModel.sync = "addHispitalModel" 
        :hospitalnameList = "hospitalnameList" 
        :goodsInfo.sync = "goodsInfo" 
        @addHospitalPrice = "addHospitalPrice" 
        ref="hospitalModel"
      />
      <!-- 添加会员卡 -->
      <member 
        :memberModel.sync="memberModel"
        :memberRankNames ="memberRankNames"
        :goodsInfo.sync = "goodsInfo" 
        @addmemberPrice = "addmemberPrice" 
        ref="memberModel"
      />
      <!-- 添加抵用券 -->
      <voucher 
        :voucherModel.sync="voucherModel"
        :consumptionVoucherNames ="consumptionVoucherNames"
        :goodsInfo.sync = "goodsInfo" 
        @addVoucherPrice = "addVoucherPrice" 
        ref="voucherModel"
      />
    </Modal>

  </div>
</template>

<script>
import upload from "@/components/upload/upload";
import editor from "@/components/editor/editor";
import hospitalModel from "./addhospital.vue"
import specifications from "./addSpecifications.vue"
import voucher from "./voucher.vue"
import member from "./member.vue"
import * as api from "@/api/goodsManage";
export default {
  props: {
    controlModal: Boolean,
    goodsInfo: Object,
    cityLists:Array
  },
  components: {
    editor,
    upload,
    hospitalModel,
    member,
    voucher,
    specifications
  },
  data() {
    return {
      exchangeType:null,
      goodsInfoObj:{},
      // 添加规格弹窗
      addSpecificationsModel:false,
      // 抵用券弹窗
      voucherModel:false,
      // 抵用券
      consumptionVoucherNames:[],
      //添加会员价格
      memberModel:false,
      // 会员等级列表
      memberRankNames:[],
      // 添加医院弹窗
      addHispitalModel:false,
      // 医院名字列表
      hospitalnameList:[],
      control: false,
      thumbPicUrlUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      carouselImageUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 10,
        // 文件列表
        uploadList: [],
      },
      // 商品分类列表
      goodsCategorys: [],
      // 交易类型列表
      exchangeTypes: [],
      form: {
        // 商品名称
        name: "",
        // 商品简码
        simpleCode: "",
        // 规格
        standard: "",
        // 交易类型（不需要提交到后台）
        exchangeType: "",
        // 抵扣积分
        integrationQuantity: null,
        // 商品分类
        categoryIds: [],
        // 库存
        inventoryQuantity: null,
        // 缩略图
        thumbPicUrl: "",
        // 轮播图
        carouselImageUrls: [],
        // 是否实物
        isMaterial: true,
        // 是否有效
        valid: false,
        // 描述
        description: "",
        // 商品详情
        goodsDetailHtml: "",
        // 是否修改
        isEdit: false,
        id: "",
        // 门店价格
        // storePrice:"",
        // 选择门店
        selectStore:"",
        // 最大价格
        maxShowPrice:"",
        // 最小价格
        minShowPrice:"",
        // 销售价格
        salePrice:"",
        // 浏览量
        visitCount:"",
        // 销量
        showSaleCount:"",
        // 备注
        detailsDescription:"",
        // 接受医院和价格
        addHispitalPrice:[],
        // 修改医院和价格
        updateGoodsHospitalPrice:[],
        // 接受会员等级和价格
        addmemberPrice:[],
        // 接受规格和价格
        goodsStandardsPrice:[],
        // 修改规格和价格
        updateGoodsStandardsPrice:[],
        // 是否限购
        isLimitBuy:false,
        // 限购数量
        limitBuyQuantity:null,
        // 排序
        sort:null,
        // 商品标签
        addGoodsTag:[],
        // 归属小程序
        appId:'',
        // 是否是热门商品
        isHot:false
      },
      ruleValidate: {
        addGoodsTag: [
          {
            required: true,
            message: "请选择标签",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入序号",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入商品名称",
          },
        ],
        simpleCode: [
          {
            required: true,
            message: "请输入商品简码",
          },
        ],
        standard: [
          {
            required: true,
            message: "请输入商品规格",
          },
        ],
        exchangeType: [
          {
            required: true,
            message: "请选择交易类型",
          },
        ],
        
        categoryIds: [
          {
            required: true,
            message: "请选择商品分类",
          },
        ],
        inventoryQuantity: [
          {
            required: true,
            message: "请输入库存",
          },
        ],
        thumbPicUrl: [
          {
            required: true,
            message: "请上传缩略图",
          },
        ],
        carouselImageUrls: [
          {
            required: true,
            message: "请上传轮播图",
          },
          {
            validator: (rule, value, callback) => {
              if (!value.length) {
                callback(new Error("请上传轮播图"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        visitCount: [
          {
            required: true,
            message: "请输入浏览量",
          },
        ],
        showSaleCount: [
          {
            required: true,
            message: "请输入销量",
          },
        ],
        
      },
      tags:[],
      // 归属小程序
      miniprogramName:[]
    };
  },
  methods: {
    // 获取小程序名称列表
    getminiprogramNameList() {
      api.miniprogramNameList().then((res) => {
        if (res.code === 0) {
          const { nameList } = res.data;
          this.miniprogramName = nameList;
        }
      });
    },
    // 添加会员价格
    addMember(){
       this.memberModel = true
      // 会员等级
      api.MemberRankInfo().then((res) => {
        if(res.code === 0){
          this.memberRankNames = res.data.memberRankNames
        }
      })
    },
     
    // 添加抵用券
    addVoucher(){
      this.voucherModel = true
      // 抵用券
      api.ConsumptionVoucher().then((res) => {
        if(res.code === 0){
          this.consumptionVoucherNames = res.data.consumptionVoucherNames
        }
      })
    },
    // 交易类型
    checkedExchangeType(data){
      if(!data) return
      this.form.exchangeType = data
    },
    // 医院 接受子组件添加医院和价格的参数
    addHospitalPrice(data){
      if(data){
        this.form.addGoodsHospitalPrice = data
        this.form.updateGoodsHospitalPrice = data
      }
    },
    // 规格 接受子组件添加规格和价格的参数
    goodsStandardsPrice(data){
      if(data){
        this.form.goodsStandardsPrice = data
        this.form.updateGoodsStandardsPrice = data
      }
    },
    // 接受子组件添加会员等级和价格的参数
    addmemberPrice(data){
      if(data){
        this.form.addGoodsMemberRankPrice = data
        this.form.updateGoodsMemberRankPrice = data
      }
    },
    // 接受子组件添加抵用券
    addVoucherPrice(data){
      if(data){
        this.form.addGoodsConsumptionVoucher = data
        this.form.updateGoodsConsumptionVoucher = data
      }
    },
    // 添加医院弹出框
    addHispital(data){
      this.addHispitalModel = true
      // 选择门店、医院
      api.getHospitalnameList().then((res) => {
        if(res.code === 0){
          this.hospitalnameList = res.data.hospitalInfo
        }
      })
    },
  
    // 获取有效的分类名称列表
    getValidGoodsCategory() {
      api.getValidGoodsCategory().then((res) => {
        if (res.code === 0) {
          this.goodsCategorys = res.data.goodsCategorys;
        }
      });
    },

    // 获取交易类型列表
    getExchangeTypeList() {
      api.getExchangeTypeList().then((res) => {
        if (res.code === 0) {
          this.exchangeTypes = res.data.exchangeTypes;
        }
      });
    },
    // 获取商品标签
    gettagList() {
      api.tagList().then((res) => {
        if (res.code === 0) {
          this.tags = res.data.tags;
        }
      });
    },

    // 缩略图
    handleThumbPicUrlUploadChange(values) {
      this.form.thumbPicUrl = values[0];
    },

    // 轮播图
    handleCarouselUploadChange(values) {
      this.form.carouselImageUrls = values;
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let {
            // 商品名称
            name,
            // 商品简码
            simpleCode,
            // 规格
            standard,
            // 抵扣积分
            integrationQuantity,
            // 商品分类
            categoryIds,
            // 库存
            inventoryQuantity,
            // 缩略图
            thumbPicUrl,
            // 轮播图
            carouselImageUrls,
            // 是否实物
            isMaterial,
            // 是否有效
            valid,
            // 描述
            description,
            // 商品详情
            goodsDetailHtml,
            // 是否修改
            isEdit,
            id,
            // 最大价格
            maxShowPrice,
            // 最小价格
            minShowPrice,
            // 销售价格
            salePrice,
            // 浏览量
            visitCount,
            // 销量
            showSaleCount,
            // 备注
            detailsDescription,
            // 接受医院和价格
            addGoodsHospitalPrice,
            // 交易类型
            exchangeType,
            // 编辑 接受医院和价格
            updateGoodsHospitalPrice,
            // 会员等级和价格
            addGoodsMemberRankPrice,
            // 抵用券
            addGoodsConsumptionVoucher,
            // 添加规格和价格
            goodsStandardsPrice,
            // 修改规格和价格
            updateGoodsStandardsPrice,
            // 是否限购
            isLimitBuy,
            limitBuyQuantity,
            sort,
            addGoodsTag,
            appId,
            isHot

          } = this.form;
          if(this.form.addGoodsTag == [] || this.form.addGoodsTag.length==0){
            this.$Message.warning('请选择标签')
            return
          }
          if (isEdit) {
            // 修改
            const data = {
              name,
              simpleCode,
              standard,
              integrationQuantity:Number(integrationQuantity),
              categoryIds,
              inventoryQuantity:parseInt(inventoryQuantity),
              thumbPicUrl,
              carouselImageUrls: carouselImageUrls.map((url, index) => {
                return {
                  // 图片地址
                  picUrl: url,
                  // 图片顺序索引
                  displayIndex: index,
                };
              }),
              isMaterial,
              valid,
              description,
              goodsDetailHtml,
              id,
              maxShowPrice:maxShowPrice?Number(maxShowPrice) : 0,
              minShowPrice:minShowPrice?Number(minShowPrice) : 0,
              salePrice:salePrice ? Number(salePrice) : 0,
              visitCount:parseInt(visitCount),
              showSaleCount:parseInt(showSaleCount),
              detailsDescription,
              updateGoodsHospitalPrice:(this.form.exchangeType ===1 || this.form.exchangeType===0) && this.form.isMaterial == false ? (this.form.goodsHospitalPrice ? this.form.goodsHospitalPrice : []) :[],
              exchangeType,
              updateGoodsMemberRankPrice: this.form.goodsMemberRankPrices ? this.form.goodsMemberRankPrices : [],
              updateGoodsConsumptionVoucher: this.form.goodsConsumptionVoucher ? this.form.goodsConsumptionVoucher : [],
              updateGoodsStandardsPrice:this.goodsInfoObj.goodsStandardPrice,
              isLimitBuy,
              limitBuyQuantity:isLimitBuy == false ? 0 : limitBuyQuantity,
              sort,
              updateGoodTag:addGoodsTag,
              appId,
              isHot
            };
            if((this.form.exchangeType===1 || this.form.exchangeType===0)&& this.form.isMaterial == false){
              if(!this.form.goodsHospitalPrice.length){
                this.$Message.error('请选择医院')
                return
              }
            }
            if(!this.goodsInfoObj.goodsStandardPrice || this.goodsInfoObj.goodsStandardPrice == [] ||this.goodsInfoObj.goodsStandardPrice.length==0){
              this.$Message.error('请添加规格')
                return
            }
            api.modifyGoodsInfo(data).then((res) => {
              if (res.code === 0) {
                this.handleCancel("form");
                this.$parent.handlePageChange(
                        sessionStorage.getItem("goodsInfopageNumEdit")
                          ? sessionStorage.getItem("goodsInfopageNumEdit")
                          : 1
                      );
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
           
            // 添加
            const data = {
              name,
              simpleCode,
              standard,
              integrationQuantity:Number(integrationQuantity),
              categoryIds,
              inventoryQuantity : parseInt(inventoryQuantity),
              thumbPicUrl,
              carouselImageUrls: carouselImageUrls.map((url, index) => {
                return {
                  // 图片地址
                  picUrl: url,
                  // 图片顺序索引
                  displayIndex: index,
                };
              }),
              isMaterial,
              valid,
              description,
              goodsDetailHtml,
              maxShowPrice: maxShowPrice ? Number(maxShowPrice) : 0,
              minShowPrice: minShowPrice ? Number(minShowPrice) : 0,
              salePrice:salePrice ? Number(salePrice) : 0,
              visitCount:parseInt(visitCount),
              showSaleCount:parseInt(showSaleCount),
              detailsDescription,
              addGoodsHospitalPrice: addGoodsHospitalPrice ? addGoodsHospitalPrice : [],
              exchangeType,
              addGoodsMemberRankPrice: addGoodsMemberRankPrice ? addGoodsMemberRankPrice : [],
              addGoodsConsumptionVoucher: addGoodsConsumptionVoucher ? addGoodsConsumptionVoucher : [],
              goodsStandardsPrice,
              isLimitBuy,
              limitBuyQuantity:isLimitBuy == false ? 0 : limitBuyQuantity,
              sort,
              addGoodsTag:addGoodsTag,
              appId,
              isHot
            };
            if((this.form.exchangeType===1 || this.form.exchangeType===0) && this.form.isMaterial == false){
              if(!addGoodsHospitalPrice){
                this.$Message.error('请选择医院')
                return
              }
            }
            if(!goodsStandardsPrice || goodsStandardsPrice == [] || goodsStandardsPrice.length==0){
              this.$Message.error('请添加规格')
                return
            }
            api.addGoodsInfo(data).then((res) => {
              if (res.code === 0) {
                this.handleCancel("form");
                this.$parent.getGoodsInfoList();
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
    handleCancel(name) {
      this.form.isEdit = false;
      this.$emit("update:goodsInfo", null);
      this.$emit("update:controlModal", false);
      this.thumbPicUrlUploadObj.uploadList = [];
      this.carouselImageUploadObj.uploadList = [];
      this.$refs[name].resetFields();
      this.$refs.hospitalModel.query.data = []
      this.$refs.specifications.query.data = []
      this.form.description = ""
      this.form.detailsDescription = ""
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  created() {
    this.getValidGoodsCategory();
    this.getExchangeTypeList();
    this.gettagList()
    this.getminiprogramNameList()
  },
  watch: {
    controlModal(value) {
      if (this.goodsInfo) {
        const goodsInfo = this.goodsInfo;
        // 修改状态
        goodsInfo.isEdit = true;
        // 改变轮播图结构 => [str,str]
        goodsInfo.carouselImageUrls = goodsInfo.carouselImageUrls.map(
          (item) => item.picUrl
        );
        // 回显缩略图
        this.thumbPicUrlUploadObj.uploadList = [goodsInfo.thumbPicUrl];
        // 回显轮播图
        this.carouselImageUploadObj.uploadList = goodsInfo.carouselImageUrls;
        // 回显
        this.form = goodsInfo;
        this.form.addGoodsTag = goodsInfo.goodsTags
        this.goodsInfoObj = goodsInfo;
      }
      this.control = value;
    },
    "form.exchangeType"(value) {
      if (value ==1 ||value ==2 ||value ==3 ||value ==4 ||value ==5 ||value ==6 ) {
        this.form.integrationQuantity = "";
        this.$refs.integrationQuantity.validateMessage = ""
        this.$refs.integrationQuantity.validateState = ""
      }else if(value ==0 ||value ==2 ||value ==3 ||value ==4 ||value ==5 ||value ==6 ){
        this.form.maxShowPrice = "";
        this.$refs.maxShowPrice.validateMessage = ""
        this.$refs.maxShowPrice.validateState = ""
        this.form.minShowPrice = "";
        this.$refs.minShowPrice.validateMessage = ""
        this.$refs.minShowPrice.validateState = ""
        this.form.salePrice = "";
        this.$refs.salePrice.validateMessage = ""
        this.$refs.salePrice.validateState = ""
      }
    },
    // "form.exchangeType"(value) {
    //   if (value == false) {
    //     this.form.limitBuyQuantity = null;
    //     this.$refs.integrationQuantity.validateMessage = ""
    //     this.$refs.integrationQuantity.validateState = ""
    //   }
    // }
  },
};
</script>
