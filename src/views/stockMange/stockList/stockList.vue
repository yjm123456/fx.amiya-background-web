<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getAmiyaWareHouse()"
          />
          <Select
            v-model="query.wareHouseInfoId"
            placeholder="请选择归属仓库"
            filterable
            style="width: 200px; margin-left: 10px"
            @on-change="wareHouseInfoIdChange(query.wareHouseInfoId)"
          >
            <Option
              :value="item.id"
              v-for="item in getIdAndNameListAll"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.warehouseStorageRacksId"
            placeholder="请选择归属货架"
            filterable
            :disabled="query.wareHouseInfoId ==-1 || query.wareHouseInfoId == ''"
            style="width: 200px; margin-left: 10px"
          >
            <Option
              :value="item.id"
              v-for="item in amiyawareHouseStorageRacks"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getAmiyaWareHouse()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: .625rem"
            @click="handleExportClick()"
            v-has="{ role: ['fx.amiya.permission.EXPORT'] }"
            >导出</Button
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
        <FormItem label="归属仓库" prop="goodsSourceId">
          <Select
            v-model="form.goodsSourceId"
            placeholder="请选择归属仓库"
            filterable
            @on-change="goodsSourceIdChange(form.goodsSourceId)"
          >
            <Option
              :value="item.id"
              v-for="item in getIdAndNameList"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="归属货架" prop="storageRacksId">
          <Select
            v-model="form.storageRacksId"
            placeholder="请选择归属货架"
            filterable
            :disabled="form.goodsSourceId ==''"
          >
            <Option
              :value="item.id"
              v-for="item in amiyawareHouseStorageRacks"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="物料名称" prop="goodsName">
          <Input v-model="form.goodsName" placeholder="请输入物料名称"></Input>
        </FormItem>
        <FormItem label="单位" prop="unit">
          <Input v-model="form.unit" placeholder="请输入单位"></Input>
        </FormItem>
        <FormItem
          label="单价"
          prop="singlePrice"
          :rules="[
            {
              required: true,
              message: '请输入数量(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 0,
            },
          ]"
          v-if="title != '修改'"
        >
          <Input
            v-model="form.singlePrice"
            placeholder="请输入单价"
            type="number"
            number
            disabled
          ></Input>
        </FormItem>
        <FormItem
          label="期初数量"
          prop="amount"
          :rules="[
            {
              required: true,
              message: '请输入期初数量(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 0,
            },
          ]"
          v-if="title != '修改'"
        >
          <Input
            v-model="form.amount"
            placeholder="请输入期初数量"
            number
            type="number"
            @on-change="amountChange"
          ></Input>
        </FormItem>
        <FormItem
          label="总价"
          prop="totalPrice"
          :rules="[
            {
              required: true,
              message: '请输入总价(最小是1)',
              trigger: 'change',
              type: 'number',
              min: 0,
            },
          ]"
          v-if="title != '修改'"
        >
          <Input
            v-model="form.totalPrice"
            placeholder="请输入总价"
            type="number"
            number
            @on-change="totalPriceChange"
          ></Input>
        </FormItem>
        <FormItem label="到期时间" prop="expireDate">
          <DatePicker
            type="date"
            placeholder="到期时间"
            style="width: 100%;"
            :value="form.expireDate"
            v-model="form.expireDate"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <!-- 入库 -->
    <warehousing
      :warehousingModel.sync="warehousingModel"
      :id="id"
      @handleRefreshCustomerList="getAmiyaWareHouse"
    ></warehousing>
    <!-- 出库 -->
    <outWarehouse
      :outWarehouseModel.sync="outWarehouseModel"
      :outWarehouseObj="outWarehouseObj"
      @handleRefreshCustomerList="getAmiyaWareHouse"
    ></outWarehouse>
    <!-- 盘库 -->
    <inventory
      :inventoryModel.sync="inventoryModel"
      :id="id"
      @handleRefreshCustomerList="getAmiyaWareHouse"
    ></inventory>
  </div>
</template>
<script>
import * as api from "@/api/AmiyaWareHouseNameManage";
import * as AmiyaApi from "@/api/AmiyaWareHouseStorageRacks";
import * as apis from "@/api/liveRequirementManage";
import warehousing from "../components/warehousing.vue";
import outWarehouse from "../components/outWarehouse.vue";
import inventory from "../components/Inventory.vue";
import { download } from "@/utils/util";

export default {
  components: {
    warehousing,
    outWarehouse,
    inventory,
  },
  data() {
    return {
      // 查询
      query: {
        warehouseStorageRacksId:'',
        keyword: "",
        wareHouseInfoId: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "仓库",
            key: "goodsSourceName",
          },
          {
            title: "归属货架",
            key: "storageRacks",
          },
          {
            title: "物料名称",
            key: "goodsName",
          },
          {
            title: "单位",
            key: "unit",
          },
          
          {
            title: "单价",
            key: "singlePrice",
          },
          {
            title: "数量",
            key: "amount",
          },
          {
            title: "总价",
            key: "totalPrice",
          },
          {
            title: "可用时间",
            key: "hasUsedTime",
            align:'center',
            render: (h, params) => {
              return h("span", {
                domProps: {
                  innerHTML: params.row.hasUsedTime,
                },
              });
            },
          },
          {
            title: "到期日期",
            key: "expireDate",
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.expireDate
                  ? this.$moment(params.row.expireDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "操作",
            key: "",
            width: 300,
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
                        this.warehousingModel = true;
                        this.id = id;
                      },
                    },
                  },
                  "入库"
                ),
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
                        const { id, singlePrice } = params.row;
                        this.outWarehouseObj = {
                          outid: id,
                          singlePrice: singlePrice,
                          department: this.outWarehouseObj.department,
                        };
                        this.outWarehouseModel = true;
                      },
                    },
                  },
                  "出库"
                ),
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
                        this.inventoryModel = true;
                        this.id = id;
                      },
                    },
                  },
                  "盘库"
                ),

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

                        api.byIdAmiyaWareHouse(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              amount,
                              goodsName,
                              goodsSourceId,
                              singlePrice,
                              totalPrice,
                              unit,
                              storageRacksId,
                              expireDate
                            } = res.data.amiyaWareHouseInfo;
                            this.goodsSourceIdChange(goodsSourceId)
                            this.isEdit = true;
                            this.form.amount = amount;
                            this.form.goodsName = goodsName;
                            this.form.goodsSourceId = goodsSourceId;
                            this.form.storageRacksId = storageRacksId;
                            this.form.singlePrice = singlePrice;
                            this.form.totalPrice = totalPrice;
                            this.form.expireDate = expireDate;
                            this.form.unit = unit;
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
                            api.deleteAmiyaWareHouse(id).then((res) => {
                              if (res.code === 0) {
                                this.getAmiyaWareHouse();
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
      // 入库
      warehousingModel: false,
      // 出库
      outWarehouseModel: false,
      id: "",
      // 出库传给子组件的值
      outWarehouseObj: {
        outid: "",
        singlePrice: null,
        // 部门
        department: [],
      },
      // 盘库
      inventoryModel: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        // 物料名称
        goodsName: "",
        // 归属仓库
        goodsSourceId: "",
        // 归属货架
        storageRacksId: "",
        // 单价
        singlePrice: "",
        // 数量
        amount: "",
        // 总价
        totalPrice: "",
        // 单位
        unit: "",
        // 是否有效
        valid: false,
        id: "",
        // 到期时间
        expireDate:''
      },
      getIdAndNameList: [],
      getIdAndNameListAll: [{ id: -1, name: "全部仓库" }],
      ruleValidate: {
        expireDate: [
          {
            required: true,
            message: "请选择到期时间",
          },
        ],
        storageRacksId: [
          {
            required: true,
            message: "请选择归属货架",
          },
        ],
        goodsName: [
          {
            required: true,
            message: "请输入物料名称",
          },
        ],
        goodsSourceId: [
          {
            required: true,
            message: "请选择归属仓库",
          },
        ],
        unit: [
          {
            required: true,
            message: "请输入单位",
          },
        ],
      },
      // 货架
      amiyawareHouseStorageRacks:[],
      amiyawareHouseStorageRacksAll:[]
    };
  },
  methods: {
    // 查询
    wareHouseInfoIdChange(value){
       if (!value) {
        return;
      }
      this.query.warehouseStorageRacksId = ''
      this.getAmiyawareHouseStorageRacks(value)
    },
    // 添加/编辑时 根据仓库id获取货架
    goodsSourceIdChange(value){
      if (!value) {
        return;
      }
      this.form.storageRacksId = ''
      this.getAmiyawareHouseStorageRacks(value)
      
    },
    // 根据仓库id获取货架信息
    getAmiyawareHouseStorageRacks(value){
      const data = {
        wareHouseId:value
      }
      AmiyaApi.getAmiyawareHouseStorageRacks(data).then(res=>{
        if(res.code===0){
          const {amiyawareHouseStorageRacks} = res.data
          this.amiyawareHouseStorageRacks = amiyawareHouseStorageRacks
        }
      })
    },
    // 获取有效的部门名称列表
    getAmiyaDepartment() {
      apis.getAmiyaDepartment().then((res) => {
        if (res.code === 0) {
          this.outWarehouseObj.department = res.data.department;
        }
      });
    },
    amountChange() {
      const { totalPrice, amount } = this.form;
      this.form.singlePrice =
        amount == 0 ? 0 : Number((totalPrice / amount).toFixed(2));
    },
    totalPriceChange() {
      const { totalPrice, amount } = this.form;
      this.form.singlePrice =
        amount == 0 ? 0 : Number((totalPrice / amount).toFixed(2));
    },
    // 获取仓库名称（下拉框）
    getIdAndName() {
      api.getIdAndName().then((res) => {
        if (res.code === 0) {
          const { amiyaWareHouseNameManageInfo } = res.data;
          this.getIdAndNameList = amiyaWareHouseNameManageInfo;
          this.getIdAndNameListAll = [
            ...this.getIdAndNameListAll,
            ...amiyaWareHouseNameManageInfo,
          ];
        }
      });
    },
    // 获取仓库列表
    getAmiyaWareHouse() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyword, wareHouseInfoId,warehouseStorageRacksId } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        wareHouseInfoId: wareHouseInfoId == -1 ? null : wareHouseInfoId,
        warehouseStorageRacksId
      };
      api.AmiyaWareHouse(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.amiyaWareHouseInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取仓库列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyword, wareHouseInfoId,warehouseStorageRacksId } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        wareHouseInfoId: wareHouseInfoId == -1 ? null : wareHouseInfoId,
        warehouseStorageRacksId
      };
      api.AmiyaWareHouse(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.amiyaWareHouseInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 导出
    handleExportClick() {
      const { keyword, wareHouseInfoId ,warehouseStorageRacksId} = this.query;
      const data = {
        keyword,
        wareHouseInfoId: wareHouseInfoId == -1 ? null : wareHouseInfoId,
        warehouseStorageRacksId
      };
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.AmiyaWareHouseExport(data).then((res) => {
        let name = "库存列表";
        download(res, name);
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const { id, unit, goodsName, goodsSourceId,storageRacksId ,expireDate} = this.form;
            const data = {
              id,
              unit,
              goodsName,
              goodsSourceId,
              storageRacksId,
              expireDate:this.$moment(expireDate).format("YYYY-MM-DD")
              // singlePrice:0,
              // amount:0,
              // totalPrice:0
            };
            // 修改
            api.editAmiyaWareHouse(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getAmiyaWareHouse();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const {
              unit,
              goodsName,
              goodsSourceId,
              singlePrice,
              amount,
              totalPrice,
              storageRacksId,
              expireDate
            } = this.form;
            const data = {
              unit,
              goodsName,
              goodsSourceId,
              singlePrice,
              amount,
              totalPrice,
              storageRacksId,
              expireDate:this.$moment(expireDate).format("YYYY-MM-DD")
            };
            // 添加
            api.addAmiyaWareHouse(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getAmiyaWareHouse();
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
      this.form.singlePrice = null
      this.form.amount = null
      this.form.totalPrice = null
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        this.form.singlePrice = null
        this.form.amount = null
        this.form.totalPrice = null
      }
    },
  },
  created() {
    this.getAmiyaWareHouse();
    this.getIdAndName();
    this.getAmiyaDepartment();
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
