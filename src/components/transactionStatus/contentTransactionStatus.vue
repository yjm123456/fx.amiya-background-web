<template>
  <div class="content">
    <!-- 管理员端成交情况 -->
    <Modal
      title="成交情况"
      footer-hide
      v-model="transactionStatusParams.transactionStatusModel"
      width="80%"
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
        <Table
          border
          :columns="query.columns"
          :data="transactionStatusPage.data"
        ></Table>
        <div class="page">
          <Page
            ref="pages"
            :current="transactionStatusPage.pageNum"
            :page-size="transactionStatusPage.pageSize"
            :total="transactionStatusPage.totalCount"
            show-total
            show-elevator
            @on-change="handlePageChange"
          />
        </div>
        <div class="footer">
          <Button @click="cancel" style="margin-right: 10px">关闭页面</Button>
        </div>
      </div>
    </Modal>
    <Modal
      title="编辑成交情况"
      footer-hide
      v-model="editModel"
      width="30%"
      @on-visible-change="handleModalChange"
    >
      <div>
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidate"
          label-position="left"
          :label-width="140"
        >
          <FormItem label="是否到院" prop="isToHospital">
            <i-switch v-model="form.isToHospital" />
          </FormItem>
          <FormItem
            label="到院时间"
            prop="tohospitalDate"
            key="到院时间"
            v-if="form.isToHospital == true"
          >
            <DatePicker
              type="date"
              placeholder="到院时间"
              style="width: 100%"
              v-model="form.tohospitalDate"
            ></DatePicker>
          </FormItem>
          <FormItem label="是否成交" prop="isDeal">
            <i-switch v-model="form.isDeal" />
          </FormItem>

          <FormItem
            label="最终成交医院"
            prop="lastDealHospitalId"
            key="最终成交医院"
            v-if="form.isDeal == true"
          >
            <Select
              v-model="form.lastDealHospitalId"
              placeholder="请选择成交医院"
            >
              <Option
                v-for="item in hospitalInfo"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem
            label="成交金额"
            prop="price"
            key="成交金额"
            v-if="form.isDeal == true"
          >
            <Input v-model="form.price" type="number" number></Input>
          </FormItem>
          <FormItem
            label="成交截图"
            prop="dealPicture"
            key="成交截图"
            v-if="form.isDeal == true"
          >
            <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model="form.remark" :rows="3" type="textarea"></Input>
          </FormItem>
        </Form>
        <div slot="footer" class="footer">
          <Button @click="handleCancelClick('form')">取消</Button>
          <Button
            @click="submiteChange('form')"
            type="primary"
            style="margin-left:10px"
            >确定</Button
          >
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as hospitalManage from "@/api/employeeManage";
import upload from "@/components/upload/upload";

export default {
  components: {
    upload,
  },
  props: {
    transactionStatusParams: {
      type: Object,
    },
  },
  data() {
    return {
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      // 医院
      hospitalInfo: [],
      editModel: false,
      transactionStatusPage: {
        pageNum: 1,
        pageSize: 10,
        data: [],
        totalCount: 0,
      },
      form: {
        id: "",
        // 派单编号
        contentPlatFormOrderId: "",
        // 是否到院
        isToHospital: false,
        // 到院时间
        tohospitalDate: "",
        // 是否成交
        isDeal: false,
        // 最终成交医院
        lastDealHospitalId: null,
        // 截图
        dealPicture: "",
        // 备注
        remark: "",
        // 成交金额
        price: null,
      },
      ruleValidate: {
        tohospitalDate: [
          {
            required: true,
            message: "请选择到院时间",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入成交金额",
          },
        ],
        lastDealHospitalId: [
          {
            required: true,
            message: "请选择最终成交医院",
          },
        ],
        dealPicture: [
          {
            required: true,
            message: "请上传成交截图",
          },
        ],
      },
      query: {
        repeateOrderPictureUrl: "",
        columns: [
          {
            title: "登记日期",
            key: "createDate",
            minWidth: 150,
            render: (h, params) => {
              return h(
                "div",
                this.$moment(params.row.createDate).format(
                  "YYYY-MM-DD  HH:mm:ss"
                )
              );
            },
          },
          {
            title: "是否到院",
            key: "isToHospital",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isToHospital,
                    size: "default",
                    disabled:
                      params.row.isToHospital === true ||
                      params.row.isToHospital === false,
                  },
                },
                h("span", { isToHospital: "open" }, "开"),
                h("span", { isToHospital: "close" }, "关")
              );
            },
          },
          {
            title: "是否成交",
            key: "isDeal",
            minWidth: 140,
            align: "center",
            render: (h, params) => {
              return h(
                "i-switch",
                {
                  props: {
                    value: params.row.isDeal,
                    size: "default",
                    disabled:
                      params.row.isDeal === true || params.row.isDeal === false,
                  },
                },
                h("span", { isDeal: "open" }, "开"),
                h("span", { isDeal: "close" }, "关")
              );
            },
          },
          {
            title: "成交金额",
            key: "price",
            minWidth: 140,
          },

          {
            title: "成交截图",
            key: "dealPicture",
            minWidth: 200,
            render: (h, params) => {
              return params.row.dealPicture
                ? h(
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
                          width: "50px",
                          height: "50px",
                          margin: "5px 15px 5px 5px",
                          verticalAlign: "middle",
                        },
                        attrs: {
                          src: params.row.dealPicture,
                        },
                      }),
                      //   h("div", params.row.goodsName,)
                    ]
                  )
                : "";
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 200,
          },
          {
            title: "操作",
            key: "",
            width: 120,
            align: "center",
            fixed: "right",
            render: (h, params) => {
              const { statusText } = params.row;
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
                        api.ContentPlatFormOrderDealInfo(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              contentPlatFormOrderId,
                              isToHospital,
                              tohospitalDate,
                              isDeal,
                              lastDealHospitalId,
                              dealPicture,
                              price,
                              remark,
                            } = res.data.contentPlatFormOrderDealInfoInfo;
                            this.isEdit = true;
                            this.form.tohospitalDate = this.$moment(
                              tohospitalDate
                            ).format("YYYY-MM-DD");
                            this.form.isToHospital = isToHospital;
                            this.form.contentPlatFormOrderId = contentPlatFormOrderId;
                            this.form.isDeal = isDeal;
                            this.form.lastDealHospitalId = lastDealHospitalId;
                            this.form.dealPicture = dealPicture;
                            this.uploadObj.uploadList = this.form.dealPicture
                              ? [this.form.dealPicture]
                              : [];
                            this.form.price = price;
                            this.form.remark = remark;
                            this.form.id = id;
                            this.editModel = true;
                          }
                        });
                      },
                    },
                  },
                  "编辑"
                ),
              ]);
            },
          },
        ],
      },
    };
  },
  methods: {
    submiteChange(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            contentPlatFormOrderId,
            isToHospital,
            tohospitalDate,
            dealPicture,
            isDeal,
            lastDealHospitalId,
            remark,
            price,
          } = this.form;
          const data = {
            id,
            contentPlatFormOrderId,
            isToHospital,
            tohospitalDate:
              isToHospital == true
                ? this.$moment(tohospitalDate).format("YYYY-MM-DD")
                : null,
            isDeal,
            lastDealHospitalId: isDeal == true ? lastDealHospitalId : null,
            dealPicture: isDeal == true ? dealPicture : "",
            remark,
            price: isDeal === true ? price : 0,
          };
          api.updateContentPlatFormOrderDealInfo(data).then((res) => {
            if (res.code === 0) {
              this.handleCancelClick("form");
              this.geTransactionStatus();
              this.$Message.success({
                content: "修改成功",
                duration: 3,
              });
            }
          });
        }
      });
    },
    // 图片
    handleUploadChange(values) {
      this.form.dealPicture = values[0];
    },
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
        }
      });
    },
    // 获取成交情况列表
    geTransactionStatus() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const {
        contentPlatFormOrderId,
        isHospital,
      } = this.transactionStatusParams;
      const { pageNum, pageSize } = this.transactionStatusPage;
      const data = {
        pageNum,
        pageSize,
        contentPlatFormOrderId,
      };
      //   等于2是医院端成交情况接口
      if (isHospital == 2) {
        api.hospitalContentPlatFormOrderDealInfo(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.transactionStatusPage.data = list;
            this.transactionStatusPage.totalCount = totalCount;
          }
        });
      } else {
        api.contentPlatFormOrderDealInfo(data).then((res) => {
          if (res.code === 0) {
            const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
            this.transactionStatusPage.data = list;
            this.transactionStatusPage.totalCount = totalCount;
          }
        });
      }
    },

    // 获取列表分页
    handlePageChange(pageNum) {
      const { contentPlatFormOrderId } = this.transactionStatusParams;
      const { pageSize } = this.transactionStatusPage;
      const data = {
        pageNum,
        pageSize,
        contentPlatFormOrderId,
      };
      api.contentPlatFormOrderDealInfo(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.contentPlatFormOrderDealInfo;
          this.transactionStatusPage.data = list;
          this.transactionStatusPage.totalCount = totalCount;
        }
      });
    },
    // 取消
    cancel(name) {
      this.transactionStatusParams.transactionStatusModel = false;
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel();
      }
    },

    handleModalChange(value) {
      if (!value) {
        this.editModel = false;
        this.uploadObj.uploadList = [];
      }
    },
    // 取消
    handleCancelClick(name) {
      this.isEdit = false;
      this.editModel = false;
      this.$refs[name].resetFields();
      this.uploadObj.uploadList = [];
    },
  },
  created() {
    this.getHospitalInfonameList();
  },
  watch: {
    transactionStatusParams: {
      handler(transactionStatusParams) {
        this.geTransactionStatus();
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.page {
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img {
  width: 100%;
  height: auto;
}
</style>
