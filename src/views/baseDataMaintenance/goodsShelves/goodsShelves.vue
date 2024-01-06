<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalInfo()"
          />
          <DatePicker
            type="date"
            placeholder="开始日期"
            style="width: 180px; margin-left: .625rem"
            :value="query.startDate"
            v-model="query.startDate"
          ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            style="width: 180px;margin-left: .625rem;"
            :value="query.endDate"
            v-model="query.endDate"
          ></DatePicker>
          <Select
              v-model="query.warehouseId"
              placeholder="请选择归属仓库"
              style="width: 180px; margin-left: .625rem"
            >
              <Option
                v-for="item in amiyaWareHouseNameManageInfoAll"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
            <Select
              v-model="query.valid"
              placeholder="是否有效"
              style="width: 180px; margin-left: .625rem"
            >
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
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="归属仓库" prop="wareHouseId">
          <Select
              v-model="form.wareHouseId"
              placeholder="请选择归属仓库"
            >
              <Option
                v-for="item in amiyaWareHouseNameManageInfo"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
        </FormItem>
        <FormItem label="货架名称" prop="name">
          <Input v-model="form.name" placeholder="请输入货架名称"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/AmiyaWareHouseStorageRacks";
import * as AmiyaApi from "@/api/AmiyaWareHouseNameManage";
export default {
  data() {
    return {
      // 查询
      query: {
        valid:-1,
        warehouseId:-1,
        startDate:null,
        endDate:null,
        valid:'true',
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
            {
            title: "创建人",
            key: "createByEmpName",
          },
          {
            title: "归属仓库",
            key: "wareHouseName",
          },
          {
            title: "货架名称",
            key: "name",
          },
          {
            title: "是否有效",
            key: "valid",
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
            key: "",
            width: 150,
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
                        api.byIdAmiyaWareHouseStorageRacks(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              wareHouseId,
                              name,
                              id
                            } = res.data.amiyaWareHouseStorageRacksInfo;
                            this.isEdit = true;
                            this.form.wareHouseId = wareHouseId;
                            this.form.name = name;
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
                            api.deleteAmiyaWareHouseStorageRacks(id).then((res) => {
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
        // 归属仓库
        wareHouseId: "",
        // 货架名称
        name: "",
        id:""
      },

      ruleValidate: {
        wareHouseId: [
          {
            required: true,
            message: "请输入归属仓库",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入货架",
          },
        ],
      },
    //   仓库
    amiyaWareHouseNameManageInfo:[],
    amiyaWareHouseNameManageInfoAll:[{id:-1,name:'全部仓库'}],
    validList:[
        {
            type:'true',
            name:'有效'
        },
        {
            type:'false',
            name:'无效'
        },
    ]
    };
  },
  methods: {
    // 仓库
    getIdAndName(){
        
        AmiyaApi.getIdAndName().then((res) => {
        if (res.code === 0) {
            const { amiyaWareHouseNameManageInfo } = res.data
            this.amiyaWareHouseNameManageInfo = amiyaWareHouseNameManageInfo
            this.amiyaWareHouseNameManageInfoAll = [...this.amiyaWareHouseNameManageInfoAll,...amiyaWareHouseNameManageInfo]
        }
      });
    },
    // 获取货架列表
    getHospitalInfo() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyWord,valid,startDate,endDate,warehouseId} = this.query;
      const data = { 
        pageNum, 
        pageSize ,
        keyWord,
        valid,
        startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        warehouseId:warehouseId == -1 ? null : warehouseId
         };
      api.AmiyaWareHouseStorageRacks(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.amiyaWareHouseStorageRacksInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取货架列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyWord,valid,startDate,endDate,warehouseId} = this.query;
        const data = { 
            pageNum, 
            pageSize ,
            keyWord,
            valid,
            startDate: startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
            warehouseId:warehouseId == -1 ? null : warehouseId 
            };
        api.AmiyaWareHouseStorageRacks(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.amiyaWareHouseStorageRacksInfo;
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
            api.editAmiyaWareHouseStorageRacks(this.form).then((res) => {
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
            const { wareHouseId, name} = this.form;
            const  data = { wareHouseId ,name} 
            // 添加
            api.addAmiyaWareHouseStorageRacks(data).then((res) => {
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
    this.getIdAndName()
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