<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 180px; "
            @keyup.enter.native="getHospitalInfo()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            style="width: 150px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
            v-model="query.brandId"
            placeholder="请选择品牌"
            @on-change="queryBrandIdChange(query.brandId)"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="item in supplierBrandListAll"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.categoryId"
            placeholder="请选择品类"
            :disabled="query.brandId == -1 || query.brandId == ''"
            filterable
            style="width: 150px; margin-left: 10px"
          >
            <Option
              v-for="(item, index) in supplierCategoryList"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.createBy"
            style="width: 150px; margin-left: 10px"
          >
            <Option v-for="item in employee" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
          <Select v-model="query.valid" style="width: 150px; margin-left: 10px">
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
            @click="getHospitalInfo()"
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
        :label-width="80"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="主播平台" prop="contentPlatFormId">
              <Select
                v-model="form.contentPlatFormId"
                placeholder="请选择主播平台"
                @on-change="contentPlateChange(form.contentPlatFormId)"
                filterable
              >
                <Option
                  v-for="(item, ind) in contentPalteForms"
                  :value="item.id"
                  :key="ind"
                  >{{ item.contentPlatformName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播IP" prop="liveAnchorId">
              <Select
                v-model="form.liveAnchorId"
                placeholder="请选择主播IP"
                :disabled="form.contentPlatFormId === ''"
                filterable
              >
                <Option
                  v-for="(item, inds) in liveAnchors"
                  :value="item.id"
                  :key="inds"
                  >{{ item.hostAccountName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="品牌" prop="brandId">
              <Select
                v-model="form.brandId"
                placeholder="请选择品牌"
                @on-change="brandIdChange(form.brandId)"
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
                :disabled="form.brandId === ''"
                filterable
                @on-change="categoryIdChange(form.categoryId)"
              >
                <Option
                  v-for="(item, index) in supplierCategoryList"
                  :value="item.id"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="商品" prop="itemId">
              <Select
                v-model="form.itemId"
                placeholder="请选择商品"
                :disabled="form.categoryId === ''"
                filterable
              >
                <Option
                  v-for="(item, indexs) in goodItem"
                  :value="item.id"
                  :key="indexs"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="带货类型" prop="takeGoodsType">
              <Select
                v-model="form.takeGoodsType"
                placeholder="请选择带货类型"
                filterable
              >
                <Option
                  v-for="(item, inds) in takeGoodsTypeList"
                  :value="item.id"
                  :key="inds"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="单价" prop="singlePrice" key="singlePrice">
              <Input
                v-model="form.singlePrice"
                placeholder="请输入单价"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="数量"
              prop="takeGoodsQuantity"
              key="takeGoodsQuantity"
            >
              <Input
                v-model="form.takeGoodsQuantity"
                placeholder="请输入数量"
                type="number"
                number
                @on-change="singlePriceChange"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="总价" prop="totalPrice" key="totalPrice">
              <Input
                v-model="form.totalPrice"
                placeholder="请输入总价"
                type="number"
                number
                @on-change="singlePriceChange"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="备注" prop="remark" key="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="4"
              ></Input>
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
import * as api from "@/api/livingDailyTakeGoods";
import * as supplierCategoryApi from "@/api/supplierCategory";
import * as supplierBrandApi from "@/api/supplierBrand";
import * as orderApi from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as emApi from "@/api/employeeManage";

export default {
  data() {
    return {
      // 查询
      query: {
        createBy: -1,
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        valid: "true",
        brandId: -1,
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "创建时间",
            key: "createDate",
            width: 180,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row.createDate
                  ? this.$moment(params.row.createDate).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              );
            },
          },
          {
            title: "主播平台",
            key: "contentPlatFormName",
            align: "center",
            minWidth: 140,
            tooltip: true,
          },
          {
            title: "主播IP",
            key: "liveAnchorName",
            align: "center",
            minWidth: 140,
            tooltip: true,
          },
          {
            title: "品牌",
            key: "brandName",
            align: "center",
            minWidth: 140,
            tooltip: true,
          },
          {
            title: "品类",
            key: "categoryName",
            align: "center",
            minWidth: 140,
            tooltip: true,
          },
          {
            title: "商品",
            key: "itemName",
            align: "center",
            minWidth: 200,
            tooltip: true,
          },
          {
            title: "带货类型",
            key: "takeGoodsTypeText",
            align: "center",
            minWidth: 150,
            tooltip: true,
            render: (h, params) => {
              if (params.row.takeGoodsTypeText == "下单") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#f5540c",
                    },
                  },
                  params.row.takeGoodsTypeText
                );
              } else if (params.row.takeGoodsTypeText == "退款") {
                return h(
                  "div",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  params.row.takeGoodsTypeText
                );
              } 
            },
          },

          {
            title: "单价",
            key: "singlePrice",
            align: "center",
            minWidth: 140,
            tooltip: true,
          },
          {
            title: "数量",
            key: "takeGoodsQuantity",
            align: "center",
            minWidth: 140,
            tooltip: true,
          },
          {
            title: "总价",
            key: "totalPrice",
            align: "center",
            minWidth: 140,
            tooltip: true,
          },

          {
            title: "备注",
            key: "remark",
            minWidth: 300,
            tooltip: true,
          },
          {
            title: "是否有效",
            key: "valid",
            align: "center",
            minWidth: 100,

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
            title: "创建人",
            key: "createByEmpName",
            align: "center",
            minWidth: 140,
            tooltip: true,
          },
          {
            title: "操作",
            key: "",
            width: 150,
            fixed: "right",
            align: "center",
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
                        api.byIdLivingDailyTakeGoods(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              contentPlatFormId,
                              liveAnchorId,
                              brandId,
                              categoryId,
                              itemId,
                              singlePrice,
                              takeGoodsQuantity,
                              totalPrice,
                              remark,
                              takeGoodsType,
                            } = res.data.LivingDailyTakeGoodsInfo;
                            this.form.brandId = brandId;
                            this.contentPlateChange(contentPlatFormId);
                            this.brandIdChange(brandId);
                            this.categoryIdChange(categoryId);
                            this.isEdit = true;
                            this.form.contentPlatFormId = contentPlatFormId;
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.categoryId = categoryId;
                            this.form.itemId = String(itemId);
                            this.form.singlePrice = singlePrice;
                            this.form.takeGoodsQuantity = takeGoodsQuantity;
                            this.form.totalPrice = totalPrice;
                            this.form.takeGoodsType = takeGoodsType;
                            this.form.remark = remark;
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
                            api.deleteLivingDailyTakeGoods(id).then((res) => {
                              if (res.code === 0) {
                                this.getHospitalInfo();
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
        id: "",
        // 品牌
        brandId: "",
        // 品类
        categoryId: "",
        // 主播平台
        contentPlatFormId: "",
        // 主播IP
        liveAnchorId: null,
        // 商品id
        itemId: null,
        // 单价
        singlePrice: null,
        // 数量
        takeGoodsQuantity: null,
        // 总价
        totalPrice: null,
        // 带货类型
        takeGoodsType: null,
        // 备注
        remark: "",
      },

      ruleValidate: {
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
        itemId: [
          {
            required: true,
            message: "请选择商品",
          },
        ],
        contentPlatFormId: [
          {
            required: true,
            message: "请选择主播平台",
          },
        ],

        liveAnchorId: [
          {
            required: true,
            message: "请选择主播IP",
          },
        ],
        singlePrice: [
          {
            required: true,
            message: "请输入单价",
          },
        ],
        takeGoodsQuantity: [
          {
            required: true,
            message: "请输入数量",
          },
        ],
        totalPrice: [
          {
            required: true,
            message: "请输入总价",
          },
        ],
        takeGoodsType: [
          {
            required: true,
            message: "请选择带货类型",
          },
        ],
      },
      // 品牌
      supplierBrandList: [],
      supplierBrandListAll: [{ id: -1, name: "全部品牌" }],
      // 品类
      supplierCategoryList: [],
      //   商品
      goodItem: [],
      // 平台
      contentPalteForms: [],
      // 主播IP
      liveAnchors: [],
      // 根据职位获取
      employee: [{ id: -1, name: "全部员工" }],

      // 商品类型
      takeGoodsTypeList: [
        {
          id: 0,
          name: "下单",
        },
        {
          id: 1,
          name: "退款",
        },
      ],
      validList: [
        { type: "true", name: "有效" },
        { type: "false", name: "无效" },
      ],
    };
  },
  methods: {
    // 获取所有员工
    getEmployeeByPositionId() {
      const data = {
        // 测试和线上都是9
        positionId: 9,
      };
      emApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          this.employee = [...this.employee, ...res.data.employee];
        }
      });
    },
    // 计算单价
    singlePriceChange() {
      this.form.singlePrice = (
        this.form.totalPrice / this.form.takeGoodsQuantity
      ).toFixed(2);
    },
    // 筛选
    queryBrandIdChange(value) {
      if (!value) {
        return;
      }
      this.query.categoryId = "";
      this.getcategoryId(value);
    },
    // 获取品牌
    getSupplierBrand() {
      supplierBrandApi.getSupplierBrandList().then((res) => {
        if (res.code === 0) {
          const { supplierBrandList } = res.data;
          this.supplierBrandList = supplierBrandList;
          this.supplierBrandListAll = [
            ...this.supplierBrandListAll,
            ...supplierBrandList,
          ];
        }
      });
    },
    brandIdChange(value) {
      if (!value) {
        return;
      }
      this.form.categoryId = "";
      this.form.itemId = "";
      this.getcategoryId(value);
    },

    // 根据品牌获取品类
    getcategoryId(value) {
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
    categoryIdChange(value) {
      if (!value) {
        return;
      }
      this.form.itemId = "";
      this.getItem(value);
    },
    // 根据品类获取商品
    getItem(value) {
      const data = {
        brandId: this.form.brandId,
        categoryId: value,
      };
      api.getItemNameByBrandIdAndCategoryId(data).then((res) => {
        if (res.code === 0) {
          this.goodItem = res.data.items;
        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.contentPalteForms = contentPalteForms;
        }
      });
    },
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.form.liveAnchorId = null;
      this.getLiveValidList(value);
    },
    // 根据平台id去获取IP
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      orderApi.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },

    // 获取直播带货数据记录列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyWord,
        createBy,
        valid,
        brandId,
        categoryId,
        startDate,
        endDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        createBy:createBy == -1 ? null : createBy,
        valid,
        brandId: brandId == -1 ? "" : brandId,
        categoryId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.getLivingDailyTakeGoods(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.LivingDailyTakeGoodsInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取直播带货数据记录列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyWord,
        createBy,
        valid,
        brandId,
        categoryId,
        startDate,
        endDate,
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyWord,
        createBy:createBy == -1 ? null : createBy,
        valid,
        brandId: brandId == -1 ? "" : brandId,
        categoryId,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
      };
      api.getLivingDailyTakeGoods(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.LivingDailyTakeGoodsInfo;
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
            // 修改
            api.updateLivingDailyTakeGoods(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            // 添加
            api.addLivingDailyTakeGoods(this.form).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalInfo();
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
    this.getHospitalInfo();
    this.getSupplierBrand();
    this.getContentValidList();
    this.getEmployeeByPositionId();
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
