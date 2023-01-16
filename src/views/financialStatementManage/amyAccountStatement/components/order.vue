<template>
  <div>
     <Table border :columns="query.columns" :data="query.data"></Table>
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
        <!-- <div class="foot_left">
          <div class="foot_title">当前对账单合计服务费：<span style="color:red;font-weight:bold">{{reconciliationParams.returnBackTotalPrice == 0 ? 0 : reconciliationParams.returnBackTotalPrice.toFixed(2)}}</span></div>
          <div class="foot_title">累计审核服务费合计：<span style="color:red;font-weight:bold">{{settlePriceNum == 0 ? 0 : settlePriceNum.toFixed(2)}}</span></div>
        </div> -->
     <Modal
        v-model="controlModal"
        title="审核"
        :mask-closable="false"
        @on-visible-change="handleModalVisibleChanges"
        width="800"
      >
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidates"
          label-position="left"
          :label-width="110"
        >
        <div class="form_content">
          <div class="form_left">
            <div class="form_title">审核中的成交单</div>
            <FormItem label="成交金额" prop="checkPriceRight">
              <Input
                v-model="form.checkPriceRight"
                placeholder="请输入成交金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="信息服务费比例" prop="proportionOfInformationServiceFee">
              <Input
                v-model="form.proportionOfInformationServiceFee"
                placeholder="请输入信息服务费比例"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="信息服务费金额" prop="informationServiceFeePrice">
              <Input
                v-model="form.informationServiceFeePrice"
                placeholder="请输入信息服务费金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="系统使用费比例" prop="systemUsageFeeProportion">
              <Input
                v-model="form.systemUsageFeeProportion"
                placeholder="请输入系统使用费比例"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="系统使用费金额" prop="systemUsageFeePrice">
              <Input
                v-model="form.systemUsageFeePrice"
                placeholder="请输入系统使用费金额"
                type="number"
                number
                disabled
              />
            </FormItem>
            <FormItem label="服务费合计" prop="totalServiceFee">
              <Input
                v-model="form.totalServiceFee"
                placeholder="请输入服务费合计"
                type="number"
                number
                disabled
              />
            </FormItem>
          </div>
          <div class="form_right">
            <div class="form_title">对账单</div>
            <FormItem label="审核状态" prop="checkState">
              <Select v-model="form.checkState" placeholder="审核状态">
                <Option
                  v-for="item in checkStateArr"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
            <FormItem label="对账金额" prop="checkPrice">
              <Input
                v-model="form.checkPrice"
                placeholder="请输入对账金额"
                type="number"
                number
              />
            </FormItem>
            <FormItem label="服务费合计" prop="settlePrice">
              <Input
                v-model="form.settlePrice"
                placeholder="请输入服务费合计"
                type="number"
                number
              />
            </FormItem>
            <FormItem label="审核图片" prop="checkPicture" key="checkPicture">
              <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
            </FormItem>
            <FormItem label="审核备注" prop="checkRemark">
              <Input v-model="form.checkRemark" type="textarea" :rows="3"></Input>
            </FormItem>
          </div>
        </div>
          <Spin fix v-if="flag == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
        </Form>
        <div slot="footer">
          <Button @click="cancelSubmit('form')">取消</Button>
          <Button type="primary" @click="handleSubmit('form')">确定</Button>
        </div>
     </Modal>
  </div>
</template>

<script>
import * as api from "@/api/orderManage";
import * as reconapi from "@/api/reconciliationDocuments";
import upload from "@/components/upload/upload";

export default {
  components: {
    upload,
  },
  props: {
    reconciliationParams: Object,
    active:String
  },
  data() {
    return {
      settlePriceNum:0,
      flag: false,
      // 审核状态 审核成功/审核失败
      checkStateArr: [
        { id: 2, name: "审核通过" },
        { id: 1, name: "审核不通过" },
      ],
      controlModal: false,
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 2,
        // 文件列表
        uploadList: [],
      },
      form: {
        // 左边字段
        // 成交金额
        checkPriceRight:0,
        // 信息服务费比例
        proportionOfInformationServiceFee:0,
        // 信息服务费金额
        informationServiceFeePrice:0,
        // 系统使用费比列
        systemUsageFeeProportion:0,
        // 系统使用费金额
        systemUsageFeePrice:0,
        // 服务费合计
        totalServiceFee:0,

        // 右边字段
        id: null,
        // 审核状态
        checkState: "",
        // 对账金额
        checkPrice: null,
        // 服务费合计
        settlePrice: null,
        // 审核备注
        checkRemark: "",
        // 审核图片
        checkPicture: [],
        // 成交情况id
        orderDealInfoId: "",
      },

      ruleValidates: {
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkPrice: [
          {
            required: true,
            message: "请输入对账金额",
          },
        ],
        settlePrice: [
          {
            required: true,
            message: "请输入服务费合计",
          },
        ],
      },
      control: false,
      query: {
        checkState:-1,
        ReturnBackPriceState:'-1',
        ReturnBackPriceStateList:[
            {
              status:'-1',
              name:'全部回款状态'
            },
            {
              status:'true',
              name:'已回款'
            },
            {
              status:'false',
              name:'未回款'
            }
          ],
        orderAppTypes:[{orderType: -1, appTypeText: "全部平台"}],
        writeOffStartDate:'',
        writeOffEndDate:'',
        keyword: "",
        appType:null,
        orderNature:null,
        pageNum: 1,
        pageSize: 10,
        showDirection:1,
        columns: [
          {
            title: "对账单编号",
            key: "reconciliationDocumentsId",
            minWidth: 170,
            align: "center",
          },
          {
            title: "订单号",
            key: "id",
            minWidth: 170,
            align: "center",
          },
          {
            title: "手机号",
            key: "phone",
            minWidth: 140,
            align: "center",
          },
          {
            title: "成交时间",
            key: "writeOffDate",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              return params.row.writeOffDate
                ? h(
                    "div",
                    this.$moment(params.row.writeOffDate).format("YYYY-MM-DD")
                  )
                : "";
            },
          },
          {
            title: "成交金额",
            key: "actualPayment",
            minWidth: 120,
            align: "center",
          },
          {
            title: "审核状态",
            key: "checkState",
            minWidth: 120,
            align: "center",
            render: (h, params) => {
              if (params.row.checkState == "审核通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#04B05D",
                    },
                  },
                  params.row.checkState
                );
              }else if (params.row.checkState == "审核中") {
                return h(
                  "div",
                  {
                    style: {
                      color: "#fccc02",
                    },
                  },
                  params.row.checkState
                );
              }   else if (params.row.checkState == "未审核") {
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  params.row.checkState
                );
              } else if (params.row.checkState == "审核不通过") {
                return h(
                  "div",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.checkState
                );
              } else {
                return h(
                  "div",
                  {
                    style: {
                      color: "#515a6e",
                    },
                  },
                  params.row.checkState
                );
              }
            },
          },
          {
            title: "对账金额",
            key: "checkPrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "服务费合计",
            key: "settlePrice",
            minWidth: 120,
            align: "center",
          },
          {
            title: "归属主播",
            key: "liveAnchor",
            minWidth: 120,
            align: "center",
          },
          {
            title: "归属客服",
            key: "belongEmpName",
            minWidth: 120,
            align: "center",
          },
          
          {
            title: "操作",
            align: "center",
            minWidth: 100,
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled:
                        params.row.checkState == "审核通过" && params.row.actualPayment == params.row.checkPrice,
                    },
                    style: {
                      marginRight: ".3125rem",
                    },
                    on: {
                      click: () => {
                        const {
                          id,
                          actualPayment,
                          settlePrice,
                        } = params.row;
                        this.controlModal = true;
                        this.form.id = id;
                        this.form.orderDealInfoId = id;
                        // 审核按钮显示字段
                        // 对账金额
                        this.form.checkPrice = this.reconciliationParams.totalDealPrice;
                        // 服务费合计
                        this.form.settlePrice = this.reconciliationParams.returnBackTotalPrice;
                        
                        // 成交金额 （审核中的成交单）
                        this.form.checkPriceRight = actualPayment
                        this.form.proportionOfInformationServiceFee = this.reconciliationParams.returnBackPricePercent
                        this.form.systemUsageFeeProportion = this.reconciliationParams.systemUpdatePricePercent
                        this.form.informationServiceFeePrice = ((this.form.checkPriceRight * this.form.proportionOfInformationServiceFee) /100).toFixed(2)
                        this.form.systemUsageFeePrice = ((this.form.checkPriceRight * this.form.systemUsageFeeProportion) /100).toFixed(2)
                        this.form.totalServiceFee = (Number(this.form.informationServiceFeePrice) + Number(this.form.systemUsageFeePrice)).toFixed(2)
                      },
                    },
                  },
                  "审核"
                ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },
    };
  },
  methods: {
    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.uploadObj.uploadList = [];
      this.$refs[name].resetFields();
    },
    // 图片
    handleUploadChange(values) {
      this.form.checkPicture = values;
    },
    // 审核
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            id,
            checkState,
            checkPrice,
            settlePrice,
            checkRemark,
            checkPicture,
            checkPriceRight,
            totalServiceFee
          } = this.form;
          const data = {
            id,
            checkState,
            settlePrice,
            checkPrice,
            checkRemark,
            checkPicture,
            reconciliationDocumentsId: this.reconciliationParams.id,
          };
          if(checkPriceRight != checkPrice || totalServiceFee !=settlePrice){
            this.$Modal.confirm({
              title: "审核确认提示",
              content: "当前成交单与对账单的对账金额或服务费合计不一致，是否仍要审核通过？",
              onOk: () => {
                api.checkOrder(data).then((res) => {
                  if (res.code === 0) {
                    this.flag = false;
                    this.controlModal = false;
                    this.cancelSubmit("form");
                    this.getContentPlatFormOrderDealInfo(
                      this.reconciliationParams.customerPhone
                    );
                    this.getTotalCheckReturnBackPriceByIdChange(this.reconciliationParams.id)
                    this.$Message.success({
                      content: "提交成功",
                      duration: 3,
                    });
                  } else {
                    setTimeout(() => {
                      this.flag = false;
                    }, 3000);
                  }
                });
              },
              onCancel: () => {},
            });
            return
          }
          this.flag = true;
          api.checkOrder(data).then((res) => {
            if (res.code === 0) {
              this.flag = false;
              this.controlModal = false;
              this.cancelSubmit("form");
              this.getContentPlatFormOrderDealInfo(
                this.reconciliationParams.customerPhone
              );
              this.getTotalCheckReturnBackPriceByIdChange(this.reconciliationParams.id)
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
            } else {
              setTimeout(() => {
                this.flag = false;
              }, 3000);
            }
          });
        }
      });
    },
    // 获取累计审核服务费合计
    getTotalCheckReturnBackPriceByIdChange(value){
      const data = {
        recommandId:value
      }
      reconapi.getTotalCheckReturnBackPriceById(data).then((res) => {
        if(res.code === 0){
          this.$emit('settlePriceChange',res.data.TotalCheckReturnBackPriceById)
        }
      })
    },
    // 获取下单平台已成交列表
    getContentPlatFormOrderDealInfo(value) {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword,writeOffStartDate,writeOffEndDate,appType,orderNature,checkState,ReturnBackPriceState} = this.query;
      const data = { 
          pageNum, 
          pageSize ,
          keyword:value ,
          writeOffStartDate: writeOffStartDate ? this.$moment(writeOffStartDate).format("YYYY-MM-DD") : "",
          writeOffEndDate: writeOffEndDate ? this.$moment(writeOffEndDate).format("YYYY-MM-DD") : "",
          appType,
          orderNature,
          checkState: checkState == -1 ? null : checkState,
          ReturnBackPriceState:ReturnBackPriceState=='-1' ? null : ReturnBackPriceState
        };
      api.tmallOrderFinishLlistWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.order;
          this.query.data = list;
          this.query.totalCount = totalCount;
          // let settlePriceNum = 0
          // this.query.data.map(item=>{
          //   if(this.reconciliationParams.id == item.reconciliationDocumentsId){
          //     if(item.checkState == '审核通过' || item.checkState == '审核中'){
          //       settlePriceNum +=item.settlePrice
          //     }
          //   }
          // })
          // this.settlePriceNum = settlePriceNum
          // this.$emit('settlePriceChange1',settlePriceNum)
          // const data = {
          //   recommandId:this.reconciliationParams.id
          // }
          // reconapi.getTotalCheckReturnBackPriceById(data).then((res) => {
            
          //   if(res.code === 0){

          //     this.$emit('settlePriceChange',res.data.TotalCheckReturnBackPriceById)
          //   }
          // })
        }
      });
    },

    // 获取下单平台已成交列表分页
    handlePageChange(pageNum) {
      const { pageSize ,keyword,writeOffStartDate,writeOffEndDate,appType,orderNature,checkState,ReturnBackPriceState} = this.query;
      const data = { 
          pageNum, 
          pageSize ,
          keyword ,
          writeOffStartDate: writeOffStartDate ? this.$moment(writeOffStartDate).format("YYYY-MM-DD") : "",
          writeOffEndDate: writeOffEndDate ? this.$moment(writeOffEndDate).format("YYYY-MM-DD") : "",
          appType,
          orderNature,
          checkState: checkState == -1 ? null : checkState,
          ReturnBackPriceState:ReturnBackPriceState=='-1' ? null : ReturnBackPriceState
        };
        api.tmallOrderFinishLlistWithPage(data).then((res) => {
            if (res.code === 0) {
                const { list, totalCount } = res.data.order;
                this.query.data = list;
                this.query.totalCount = totalCount;
                // let settlePriceNum = 0
                // this.query.data.map(item=>{
                //     if(this.reconciliationParams.id == item.reconciliationDocumentsId){
                //       if(item.checkState == '审核通过' || item.checkState == '审核中'){
                //         settlePriceNum +=item.settlePrice
                //       }
                //     }
                // })
                // this.settlePriceNum = settlePriceNum
                // this.$emit('settlePriceChange1',settlePriceNum)
                // const data = {
                //   recommandId:this.reconciliationParams.id
                // }
                // reconapi.getTotalCheckReturnBackPriceById(data).then((res) => {
                  
                //   if(res.code === 0){

                //     this.$emit('settlePriceChange',res.data.TotalCheckReturnBackPriceById)
                //   }
                // })
            }
        });
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChanges(value) {
      if (!value) {
        this.isEdit = false;
        this.controlModal = false;
        this.uploadObj.uploadList = [];
        this.$refs["form"].resetFields();
      }
    },
    
  },
  watch: {
    active: {
      handler(value) {
        if (value === "order") {
            this.getContentPlatFormOrderDealInfo(this.reconciliationParams.customerPhone)
            this.settlePriceNum = 0
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.page_wrap {
  text-align: right;
  margin-top: 10px;
}
.foot{
  display: flex;
  justify-content: space-between;
}
.foot_left{
  display: flex;
}
.foot_title{
  font-size: 16px;
  margin-right: 30px;
}
.form_content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.form_left,.form_right{
  width: 46%;
}
.form_title{
  font-weight: bold;
  margin: 10px 0 ;
  color: black;
}
</style>
