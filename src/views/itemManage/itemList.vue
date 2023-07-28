<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入项目名称"
            style="width: 200px"
            @keyup.enter.native="getItemInfo()"
          />
          <Select
            v-model="query.valid"
            style="width: 160px; margin-left: 10px"
            placeholder="请选择状态"
          >
            <Option
              v-for="item in validList"
              :value="item.valid"
              :key="item.valid"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getItemInfo()"
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
      width="1000"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <Row :gutter="30">
          
          <Col span="8">
            <FormItem label="渠道" prop="appType">
              <Select
                v-model="form.appType"
                placeholder="请选择渠道"
                filterable
                multiple
              >
                <Option
                  v-for="item in orderAppTypes"
                  :value="item.orderType"
                  :key="item.orderType"
                  >{{ item.appTypeText }}</Option
                >
              </Select>
            </FormItem>
          </Col>
         <Col span="8">
            <FormItem label="品牌" prop="brandId">
              <Select
                v-model="form.brandId"
                placeholder="请选择品牌"
                @on-change="contentPlateChange(form.brandId)"
                filterable
              >
                <Option
                  v-for="item in supplierBrandList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
           <Col span="8">
            <FormItem label="品类" prop="categoryId">
              <Select
                v-model="form.categoryId"
                placeholder="请选择品类"
                :disabled="form.brandId === '' "
                filterable
              >
                <Option
                  v-for="(item,index) in supplierCategoryList"
                  :value="item.id"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="科室" prop="hospitalDepartmentId">
              <Select
                v-model="form.hospitalDepartmentId"
                placeholder="请选择科室"
                filterable
              >
                <Option
                  v-for="item in AmiyaHospitalDepartmentList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.departmentName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          
          <Col span="8">
            <FormItem label="商品名称" prop="name" key="name">
              <Input v-model="form.name" placeholder="请输入商品名称"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="规格" prop="standard" key="standard">
              <Input
                v-model="form.standard"
                placeholder="请输入规格"
              ></Input>
            </FormItem>
          </Col>
          
          <Col span="8">
            <FormItem label="缩略图" prop="thumbPicUrl" key="thumbPicUrl">
              <upload
                :uploadObj="uploadObj"
                @uploadChange="handleUploadChange"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="售价" prop="salePrice" key="salePrice">
              <InputNumber
                :min="1"
                v-model="form.salePrice"
                style="width: 100%"
                placeholder="请输入项目售价"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="直播价" prop="livePrice" key="livePrice">
              <InputNumber
                :min="1"
                v-model="form.livePrice"
                style="width: 100%"
                placeholder="请输入直播价"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否限购" prop="isLimitBuy" key="isLimitBuy">
              <i-switch v-model="form.isLimitBuy" />
            </FormItem>
          </Col>
          <Col span="8" v-if="form.isLimitBuy">
            <FormItem
              label="限购数量"
              prop="limitBuyQuantity"
              key="limitBuyQuantity"
            >
              <InputNumber
                :min="1"
                v-model="form.limitBuyQuantity"
                style="width: 100%"
                placeholder="请输入限购数量"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="项目简介" prop="description" key="description">
              <Input
                type="textarea"
                :autosize="true"
                v-model="form.description"
                placeholder="请输入项目简介"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="商品编号"
              prop="otherAppItemId"
              key="otherAppItemId"
            >
              <Input
                v-model="form.otherAppItemId"
                style="width: 100%"
                placeholder="请输入商品编号"
              ></Input>
            </FormItem>
          </Col>
          
          <Col span="8">
            <!-- <FormItem label="治疗部位" prop="parts" key="parts">
          <Input v-model="form.parts" placeholder="请输入治疗部位"></Input>
        </FormItem> -->
            <FormItem label="承诺" prop="commitment" key="commitment">
              <Input v-model="form.commitment" placeholder="请输入承诺"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="预约须知"
              prop="appointmentNotice"
              key="appointmentNotice"
            >
              <Input
                v-model="form.appointmentNotice"
                placeholder="请输入预约须知"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="是否有效"
              prop="valid"
              v-show="isEdit === true"
              key="valid"
            >
              <i-switch v-model="form.valid" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/itemManage";
import * as orderApi from "@/api/orderManage";
import * as supplierCategoryApi from "@/api/supplierCategory";
import * as supplierBrandApi from "@/api/supplierBrand";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  data() {
    return {
      // 渠道
      orderAppTypes:[],
      // 获取科室列表（下拉框）
      AmiyaHospitalDepartmentList: [],
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      validList: [
        {
          valid: "true",
          name: "有效",
        },
        {
          valid: "false",
          name: "无效",
        },
      ],
      // 查询
      query: {
        valid: "true",
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "渠道",
            key: "appTypeText",
            minWidth: 160,
            align:'center',
            tooltip:true
          },
          {
            title: "商品编号",
            key: "otherAppItemId",
            minWidth: 150,
          },
          {
            title: "品牌",
            key: "brandName",
            minWidth: 150,
            align:'center'
          },
          {
            title: "品类",
            key: "categoryName",
            minWidth: 150,
            align:'center'
          },
          {
            title: "商品",
            key: "thumbPicUrl",
            minWidth: 300,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    zoomable: false,
                  },
                  style: {
                    display: "flex",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "3.125rem",
                      height: "3.125rem",
                      margin: ".3125rem .9375rem .3125rem .3125rem",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.thumbPicUrl,
                    },
                  }),
                  h("div", params.row.name),
                ]
              );
            },
          },
          // {
          //   title: "商品名称",
          //   key: "name",
          //   minWidth: 250,
            
          // },
          
          // {
          //   title: "缩略图",
          //   key: "thumbPicUrl",
          //   align: "center",
          //   minWidth: 100,
          //   render: (h, params) => {
          //     return h("viewer", {}, [
          //       h("img", {
          //         style: {
          //           width: "50px",
          //           height: "50px",
          //           margin: "5px 0",
          //           verticalAlign: "middle",
          //         },
          //         attrs: {
          //           src: params.row.thumbPicUrl,
          //         },
          //       }),
          //     ]);
          //   },
          // },
          
          {
            title: "规格",
            key: "standard",
            minWidth: 100,
            align:'center'
          },
          
          
          {
            title: "简介",
            key: "description",
            minWidth: 200,
          },
          {
            title: "售价",
            key: "salePrice",
            minWidth: 100,
            align:'center'
          },
          {
            title: "直播价",
            key: "livePrice",
            minWidth: 100,
            align:'center'
          },
          {
            title: "科室",
            key: "departmentName",
            minWidth: 100,
            align:'center'
          },
          
          // {
          //   title: "部位",
          //   key: "parts",
          //   minWidth: 100,
          // },
          {
            title: "是否限购",
            key: "isLimitBuy",
            minWidth: 100,
            align:'center',
            render: (h, params) => {
              if (params.row.isLimitBuy == true) {
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
            title: "限购数量",
            key: "limitBuyQuantity",
            minWidth: 100,
            align:'center'
          },
          {
            title: "承诺",
            key: "commitment",
            minWidth: 200,
          },
          {
            title: "保障",
            key: "guarantee",
            minWidth: 200,
          },
          {
            title: "预约须知",
            key: "appointmentNotice",
            minWidth: 200,
          },
          {
            title: "创建时间",
            key: "createDate",
            minWidth: 110,
            align:'center',
            render: (h, params) => {
              params.row.createDate = params.row.createDate
                ? params.row.createDate.substr(0, 10)
                : "";
              return h("div", {}, params.row.createDate);
            },
          },
          {
            title: "创建人",
            key: "createName",
            minWidth: 100,
            align:'center'
          },
          {
            title: "修改时间",
            key: "updateDate",
            minWidth: 110,
            align:'center',
            render: (h, params) => {
              params.row.updateDate = params.row.updateDate
                ? params.row.updateDate.substr(0, 10)
                : "";
              return h("div", {}, params.row.updateDate);
            },
          },
          {
            title: "修改人",
            key: "updateName",
            minWidth: 100,
            align:'center'
          },
          {
            title: "是否有效",
            key: "valid",
            minWidth: 100,
            align:'center',
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
            width: 150,
            align: "center",
            fixed: "right",
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
                        api.byIdGetItemInfo(id).then((res) => {
                          if (res.code === 0) {
                            this.isEdit = true;
                            this.form = res.data.itemInfo;
                            // this.form.appType = res.data.itemInfo.appType.split(",")
                            let appType = res.data.itemInfo.appType.split(",")
                            this.form.appType = appType.map(item=>{
                              return Number(item)
                            })
                            this.getLiveValidList(this.form.brandId);
                            this.uploadObj.uploadList = [this.form.thumbPicUrl];
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
                            api.deleteItemInfo(id).then((res) => {
                              if (res.code === 0) {
                                this.getItemInfo();
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
        // 对应天猫的商品编号
        otherAppItemId: null,
        // 商品名称
        name: "",
        // 科室
        hospitalDepartmentId: '',
        // 缩略图
        thumbPicUrl: "",
        // 售价
        salePrice: null,
        // 直播价
        livePrice: null,
        // 是否限购
        isLimitBuy: false,
        // 限购数量
        limitBuyQuantity: null,
        // 项目简介
        description: "",
        // 规格
        standard: "",
        // 治疗部位
        parts: "",
        // 承诺
        commitment: "",
        // 保障
        guarantee: "",
        // 预约须知
        appointmentNotice: "",
        id: "",
        // 是否有效
        valid: false,
        // 渠道
        appType:[],
        // 品牌
        brandId:'',
        // 品类
        categoryId:''
      },

      ruleValidate: {
        appType: [
          {
            required: true,
            message: "请选择渠道",
          },
        ],
        brandId: [
          {
            required: true,
            message: "请选择品牌",
          },
        ],
        categoryId: [
          {
            required: true,
            message: "请选择品类",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入商品名称",
          },
        ],
        thumbPicUrl: [
          {
            required: true,
            message: "请上传缩略图",
          },
        ],
        salePrice: [
          {
            required: true,
            message: "请输入售价",
          },
        ],
        limitBuyQuantity: [
          {
            required: true,
            message: "请输入限购数量",
          },
        ],
        // description: [
        //   {
        //     required: true,
        //     message: "请输入项目简介",
        //   },
        // ],
        standard: [
          {
            required: true,
            message: "请输入规格",
          },
        ],
        // parts: [
        //   {
        //     required: true,
        //     message: "请输入治疗部位",
        //   },
        // ],
        hospitalDepartmentId: [
          {
            required: true,
            message: "请选择科室",
          },
        ],
      },
      // 品牌
      supplierBrandList:[],
      // 品类
      supplierCategoryList:[]
    };
  },
 
  methods: {
    // 获取品牌
    getSupplierBrand(){
      supplierBrandApi.getSupplierBrandList().then(res=>{
        if(res.code === 0){
          const {supplierBrandList} = res.data
          this.supplierBrandList = supplierBrandList
        }
      })
    },
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.form.categoryId = ''
      this.getLiveValidList(value);
    },
    // 根据品牌获取品类
    getLiveValidList(value) {
      const data = {
        brandId: value,
      };
      supplierCategoryApi.getSupplierCategoryListByBrandId(data).then((res) => {
        if (res.code === 0) {
          const { supplierCategoryList } = res.data;
          this.supplierCategoryList = supplierCategoryList;
        }
      });
    },
    
    // 渠道（下拉框）
    getAppType(){
      orderApi.getAppTypeList().then(res=>{
        if(res.code === 0){
          this.orderAppTypes = res.data.orderAppTypes
        }
      })
    },
    // 获取医院科室
    getDepartmentList() {
      api.getDepartment().then((res) => {
        if (res.code === 0) {
          const { AmiyaHospitalDepartmentList } = res.data;
          this.AmiyaHospitalDepartmentList = AmiyaHospitalDepartmentList;
          this.form.hospitalDepartmentId = this.AmiyaHospitalDepartmentList.find(item=>item.departmentName == '其它' || item.departmentName == '其他').id
        }
      });
    },
    // 获取项目列表
    getItemInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { keyword, pageNum, pageSize, valid } = this.query;
      const data = { keyword, pageNum, pageSize, valid };
      api.ItemInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.itemInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取项目列表分页
    handlePageChange(pageNum) {
      const { keyword, pageSize, valid } = this.query;
      const data = { keyword, pageNum, pageSize, valid };
      api.ItemInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.itemInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 图片
    handleUploadChange(values) {
      this.form.thumbPicUrl = values[0];
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const {otherAppItemId,name,hospitalDepartmentId,thumbPicUrl,salePrice,livePrice,isLimitBuy,limitBuyQuantity,description,standard,parts,commitment,guarantee,appointmentNotice,id,valid,appType,brandId,categoryId} = this.form
            const data = {
              appType:appType.toString(),
              otherAppItemId,name,hospitalDepartmentId,thumbPicUrl,salePrice,livePrice,isLimitBuy,limitBuyQuantity,description,standard,parts,commitment,guarantee,appointmentNotice,id,valid,brandId,categoryId
            }
            // 修改
            api.updateItemInfo(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getItemInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
   
            // 添加
            // const { id, valid, ...data } = this.form;
            const {otherAppItemId,name,hospitalDepartmentId,thumbPicUrl,salePrice,livePrice,isLimitBuy,limitBuyQuantity,description,standard,parts,commitment,guarantee,appointmentNotice,id,valid,appType,brandId,categoryId} = this.form
            const data = {
              appType:appType.toString(),
              otherAppItemId,name,hospitalDepartmentId,thumbPicUrl,salePrice,livePrice,isLimitBuy,limitBuyQuantity,description,standard,parts,commitment,guarantee,appointmentNotice,id,valid,brandId,categoryId
            }
            api.addItemInfo(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getItemInfo();
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
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
      this.form.hospitalDepartmentId = this.AmiyaHospitalDepartmentList.find(item=>item.departmentName == '其它' || item.departmentName == '其他').id
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        this.form.hospitalDepartmentId = this.AmiyaHospitalDepartmentList.find(item=>item.departmentName == '其它' || item.departmentName == '其他').id
      }
    },
  },
  created() {
    this.getItemInfo();
    this.getDepartmentList();
    this.getAppType();
    this.getSupplierBrand();
  },
  watch: {
    "form.isLimitBuy"(newVal) {
      if (!newVal) {
        this.$nextTick(() => {
          this.form.limitBuyQuantity = null;
        });
      }
    },
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
