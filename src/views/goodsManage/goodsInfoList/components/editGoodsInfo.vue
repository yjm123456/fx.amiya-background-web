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
                  required: form.exchangeType === 0,
                  message: '请输入抵扣积分',
                }"
              >
                <Input
                  v-model="form.integrationQuantity"
                  placeholder="请输入积分抵扣"
                  :disabled="form.exchangeType !== 0"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="商品分类" prop="categoryId">
                <Select v-model="form.categoryId" placeholder="请选择商品分类">
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
                  required: form.exchangeType === 1,
                  message: '请输入最大价格',
                }"
                >
                 <Input 
                  v-model="form.maxShowPrice" 
                  placeholder="请输入最大价格" 
                  :disabled="form.exchangeType !== 1" 
                  number></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem 
                ref="minShowPrice"
                label="最小价格" 
                prop="minShowPrice"
                :rules="{
                  required: form.exchangeType === 1,
                  message: '请输入最小价格',
                }"
                >
                  <Input
                    v-model="form.minShowPrice"
                    placeholder="请输入最小价格"
                    :disabled="form.exchangeType !== 1"
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
                  required: form.exchangeType === 1,
                  message: '请输入销售价格',
                }"
              >
                <Input 
                  v-model="form.salePrice" 
                  placeholder="请输入销售价格" 
                  :disabled="form.exchangeType !== 1"
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
             <Button type="primary" @click="addHispital()" style="margin-left:15%" v-if="form.exchangeType === 1 && form.isMaterial ==false">添加医院</Button>
            </Col>
          </Row>
          
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="是否实物" prop="isMaterial">
                <i-switch v-model="form.isMaterial" />
              </FormItem>
            </Col>
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
      <hospitalModel 
        :addHispitalModel.sync = "addHispitalModel" 
        :hospitalnameList = "hospitalnameList" 
        :goodsInfo.sync = "goodsInfo" 
        @addHospitalPrice = "addHospitalPrice" 
        ref="hospitalModel"
      />
    </Modal>

  </div>
</template>

<script>
import upload from "@/components/upload/upload";
import editor from "@/components/editor/editor";
import hospitalModel from "./addhospital.vue"
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
    hospitalModel
  },
  data() {
    return {
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
        categoryId: "",
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
        updateGoodsHospitalPrice:[]
      },

      ruleValidate: {
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
        
        categoryId: [
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
    };
  },
  methods: {
    // 交易类型
    checkedExchangeType(data){
      if(!data) return
      this.form.exchangeType = data
    },
    // 接受子组件添加医院和价格的参数
    addHospitalPrice(data){
      if(data){
        this.form.addGoodsHospitalPrice = data
        this.form.updateGoodsHospitalPrice = data
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
            categoryId,
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
            updateGoodsHospitalPrice
          } = this.form;
          if (isEdit) {
            // 修改
            const data = {
              name,
              simpleCode,
              standard,
              integrationQuantity:Number(integrationQuantity),
              categoryId,
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
              updateGoodsHospitalPrice:this.form.exchangeType ===1 && this.form.isMaterial == false ? (this.form.goodsHospitalPrice ? this.form.goodsHospitalPrice : []) :[],
              exchangeType
            };
            if(this.form.exchangeType===1 && this.form.isMaterial == false){
              if(!this.form.goodsHospitalPrice.length){
                this.$Message.error('请选择医院')
                return
              }
            }
            api.modifyGoodsInfo(data).then((res) => {
              if (res.code === 0) {
                this.handleCancel("form");
                this.$parent.getGoodsInfoList();
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
              categoryId,
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
              exchangeType
            };
            if(this.form.exchangeType===1 && this.form.isMaterial == false){
              if(!addGoodsHospitalPrice){
                this.$Message.error('请选择医院')
                return
              }
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
      }
      this.control = value;
    },
    "form.exchangeType"(value) {
      if (value !== 0) {
        this.form.integrationQuantity = "";
        this.$refs.integrationQuantity.validateMessage = ""
        this.$refs.integrationQuantity.validateState = ""
        
      }else if(value !== 1){
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
  },
};
</script>
