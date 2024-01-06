<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 150px;"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束日期"
            style="width: 150px; margin-left: .625rem"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getAmiyaInWarehouseList()"
          />
          <Select
            v-model="query.wareHouseInfoId"
            placeholder="请选择归属仓库"
            filterable
            style="width: 180px; margin-left: 10px"
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
            style="width: 180px; margin-left: 10px"
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
            @click="getAmiyaInWarehouseList()"
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
  </div>
</template>
<script>
import * as api from "@/api/AmiyaWareHouseNameManage";
import * as AmiyaApi from "@/api/AmiyaWareHouseStorageRacks";
import { download } from "@/utils/util";

export default {
  data() {
    return {
      // 查询
      query: {
        warehouseStorageRacksId:-1,
        keyword: "",
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
        wareHouseInfoId: -1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "仓库",
            key: "wareHouseName",
          },
          {
            title: "归属货架",
            key: "storageRacksName",
          },
          {
            title: "物料名称",
            key: "goodsName",
            width: 240,
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
            title: "入库数量",
            key: "num",
          },
          {
            title: "总价",
            key: "allPrice",
          },
          {
            title: "备注",
            key: "remark",
          },
          {
            title: "入库日期",
            key: "createDate",
            width: 200,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            },
          },
          {
            title: "操作人员",
            key: "createByEmpName",
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,
      getIdAndNameListAll: [{ id: -1, name: "全部仓库" }],
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,
      // 仓库
      amiyawareHouseStorageRacks:[]
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
    // 获取入库列表
    getAmiyaInWarehouseList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        pageNum,
        pageSize,
        keyword,
        startDate,
        endDate,
        wareHouseInfoId,
        warehouseStorageRacksId
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        wareHouseInfoId: wareHouseInfoId == -1 ? null : wareHouseInfoId,
        warehouseStorageRacksId
      };
      api.AmiyaInWarehouseList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.amiyaInWarehouseInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },
    // 导出
    handleExportClick() {
      const { keyword, wareHouseInfoId, startDate, endDate,warehouseStorageRacksId } = this.query;
      const data = {
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        wareHouseInfoId: wareHouseInfoId == -1 ? null : wareHouseInfoId,
        warehouseStorageRacksId
      };
      if (!startDate || !endDate) {
        this.$Message.error("请选择日期");
        return;
      }
      if (this.query.data.length == 0) {
        this.$Message.error("没有数据时不支持导出");
        return;
      }
      api.AmiyaInWareHouseExport(data).then((res) => {
        let name =
          this.$moment(new Date(startDate)).format("YYYY-MM-DD") +
          "-" +
          this.$moment(new Date(endDate)).format("YYYY-MM-DD") +
          "入库报表";
        download(res, name);
      });
    },
    // 获取入库列表分页
    handlePageChange(pageNum) {
      const {
        pageSize,
        keyword,
        startDate,
        endDate,
        wareHouseInfoId,
        warehouseStorageRacksId
      } = this.query;
      const data = {
        pageNum,
        pageSize,
        keyword,
        startDate: startDate
          ? this.$moment(startDate).format("YYYY-MM-DD")
          : "",
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        wareHouseInfoId: wareHouseInfoId == -1 ? null : wareHouseInfoId,
        warehouseStorageRacksId
      };
      api.AmiyaInWarehouseList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.amiyaInWarehouseInfo;
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
            api.editExpressManage(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getAmiyaInWarehouseList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { expressName, valid, expressCode } = this.form;
            const data = { expressName, valid, expressCode };
            // 添加
            api.addExpressManage(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getAmiyaInWarehouseList();
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
  },
  created() {
    this.getAmiyaInWarehouseList();
    this.getIdAndName();
    this.getAmiyawareHouseStorageRacks()
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
