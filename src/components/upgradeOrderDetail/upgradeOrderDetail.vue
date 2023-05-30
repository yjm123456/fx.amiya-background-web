<template>
  <div>
    <Modal
      v-model="controlModel"
      title="订单详情"
      :mask-closable="false"
      width="1000"
      @on-visible-change="handleModalVisibleChange"
    >
      <div class="order_con">
        <!-- <span class="title_bold">订单编号：</span><span class="order_id">{{upgradeOrderObjs.id}}</span><span  v-clipboard:success="copyChange(upgradeOrderObjs.id)">复制</span> -->
        <span class="title_bold">订单编号：</span>
        <input
          type="text"
          v-model="upgradeOrderObjs.consumeId"
          style="border:none;color:red;width:140px"
          disabled
        />
        <button
          type="button"
          v-clipboard:copy="upgradeOrderObjs.consumeId"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          style="border:none;padding:1px 4px;box-sizing:border-box;background:#ccc;border-radius:5px;font-size:10px"
        >
          复制
        </button>
      </div>
      <div class="mr">
        <Steps :current="time==2 ? 2 :(time ==1 ? 1 : 0)">
          <Step title="升单" :content="upgradeOrderObjs.createDate ? this.$moment(upgradeOrderObjs.createDate).format('YYYY-MM-DD HH:mm:ss') : ''"></Step>
          <Step title="审核" :content="upgradeOrderObjs.checkDate ? this.$moment(upgradeOrderObjs.checkDate).format('YYYY-MM-DD HH:mm:ss') : ''"></Step>
          <Step title="回款" :content="upgradeOrderObjs.returnBackDate ? this.$moment(upgradeOrderObjs.returnBackDate).format('YYYY-MM-DD HH:mm:ss') : ''"></Step>
      </Steps>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>客户信息</div>
        <div class="order_content">
          <div>
            <span class="title_bold">客户昵称：</span>
            <span>{{ upgradeOrderObjs.nickName }} </span>
          </div>
          <div class="fl_end">
            <div class="mr_top">
              <span class="title_bold">手机号：</span>
              <span>{{ upgradeOrderObjs.phone }} </span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>主播客服信息</div>
        <div class="order_content">
          <div>
            <span class="title_bold">主播账号：</span>
            <span>{{ upgradeOrderObjs.liveAnchorName }} </span>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>升单信息</div>
        <div class="order_content">
          <div>
            <span class="title_bold">项目名称：</span>
            <span>{{ upgradeOrderObjs.itemName }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">金额：</span>
            <span>{{ upgradeOrderObjs.price }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">升单日期：</span>
            <span
              >{{
                upgradeOrderObjs.buyAgainTime
                  ? this.$moment(upgradeOrderObjs.buyAgainTime).format(
                      "YYYY-MM-DD"
                    )
                  : ""
              }}
            </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">升单类型：</span>
            <span>{{ upgradeOrderObjs.buyAgainTypeText }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">消费类型：</span>
            <span>{{ upgradeOrderObjs.consumeType==0 ? '当天其他消费' : '再消费' }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">渠道：</span>
            <span>{{ upgradeOrderObjs.channelText }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">三方单号：</span>
            <span>{{ upgradeOrderObjs.otherContentPlatFormOrderId }} </span>
          </div>
           <div class="mr_top">
            <span class="title_bold">是否携带订单：</span>
            <i-switch v-model="upgradeOrderObjs.isAddedOrder" disabled />
          </div>
          <div class="mr_top">
            <span class="title_bold">订单号：</span>
            <span>{{ upgradeOrderObjs.orderId }}</span>
          </div>
          <div class="mr_top">
            <span class="title_bold">核销日期：</span>
            <span
              >{{
                upgradeOrderObjs.writeOffDate
                  ? this.$moment(upgradeOrderObjs.writeOffDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              }}
            </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">是否为面诊卡：</span>
            <i-switch v-model="upgradeOrderObjs.isCconsultationCard" disabled />
          </div>
          <div class="mr_top">
            <span class="title_bold">是否领取加购礼：</span>
            <i-switch v-model="upgradeOrderObjs.isReceiveAdditionalPurchase" disabled />
          </div>
          <div class="mr_top">
            <span class="title_bold">归属自播/外播：</span>
            <span>{{ upgradeOrderObjs.isSelfLiving==true ? '外播' : '自播' }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">人次：</span>
            <span>{{ upgradeOrderObjs.personTime }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">备注：</span>
            <span>{{ upgradeOrderObjs.remark }} </span>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>图片信息</div>
        <div class="order_content">
          <div>
            <span class="title_bold">是否有升单证明：</span>
            <i-switch v-model="upgradeOrderObjs.hasBuyagainEvidence" disabled />
          </div>
          <div style="display:flex;align-items:center;margin-top:10px">
            <span class="title_bold">升单证明截图：</span>
            <viewer v-if="upgradeOrderObjs.buyagainEvidencePic"  baseLayerPicker ="true">
              <img :src="upgradeOrderObjs.buyagainEvidencePic" alt="" class="unImg">
            </viewer>
          </div>
          <div class="mr_top">
            <span class="title_bold">是否与医院确认：</span>
            <i-switch v-model="upgradeOrderObjs.isCheckToHospital" disabled />
          </div>
          <div style="display:flex;align-items:center;margin-top:10px">
            <span class="title_bold">医院确认截图：</span>
            <viewer v-if="upgradeOrderObjs.checkToHospitalPic"  baseLayerPicker ="true" >
              <img :src="upgradeOrderObjs.checkToHospitalPic" alt="" class="unImg">
            </viewer>
          </div>
        </div>
      </div>
      <div class="order_message">
        <div class="message_title"><span class="line"></span>财务信息</div>
        <div class="order_content">
          <div>
            <span class="title_bold">审核时间：</span>
            <span
              >{{
                upgradeOrderObjs.checkDate
                  ? this.$moment(upgradeOrderObjs.checkDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              }}
            </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">审核人：</span>
            <span>{{ upgradeOrderObjs.checkByEmpName }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">审核状态：</span>
            <span>{{ upgradeOrderObjs.checkState }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">对账金额：</span>
            <span>{{ upgradeOrderObjs.checkBuyAgainPrice }} </span>
          </div>
          <!-- <div class="mr_top">
            <span class="title_bold">服务费合计：</span>
            <span>{{ upgradeOrderObjs.settlePrice }} </span>
          </div> -->
          <div class="mr_top">
            <span class="title_bold">是否开票：</span>
            <i-switch v-model="upgradeOrderObjs.isCreateBill" disabled />
          </div>
          <div class="mr_top">
            <span class="title_bold">开票公司：</span>
            <span>{{ upgradeOrderObjs.createBillCompany }} </span>
          </div>
          <div class="mr_top">
            <span class="title_bold">是否回款：</span>
            <i-switch v-model="upgradeOrderObjs.isReturnBackPrice" disabled />
          </div>
          <div class="mr_top">
            <span class="title_bold">回款时间：</span>
            <span
              >{{
                upgradeOrderObjs.returnBackDate
                  ? this.$moment(upgradeOrderObjs.returnBackDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : ""
              }}
            </span>
          </div>
          <div class="fl_end">
            <div class="mr_top">
              <span class="title_bold">回款金额：</span>
              <span>{{ upgradeOrderObjs.returnBackPrice }} </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <Table
        border
        :columns="query.columns"
        :data="query.data"
        height="102"
        style="margin-top:10px"
      ></Table> -->
      <div slot="footer">
        <Button @click="handleCancelClick()">取消</Button>
      </div>
    </Modal>
   
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as OrderCheckPictureApi from "@/api/OrderCheckPicture.js";

export default {
  props: {
    upgradeOrderDetailModel: Boolean,
    upgradeOrderObj:Object
  },
  components: {
    
  },
  data() {
    return {
        time:'',
        upgradeOrderObjs:{},
       controlModel: false,
    };
  },

  methods: {
   onCopy: function(e) {
      this.$Message.success("你已复制成功！");
    },
    onError: function(e) {
      console.log("无法复制文本！");
      this.$Message.error("无法复制文本！");
    },
    // modal 显示状态发生变化时触发
    handleVisibleChange(value) {
      if (!value) {
        this.query.doubleOrderModel = false;
      }
    },
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancelClick();
        this.$emit("update:upgradeOrderDetailModel", false);
      }
    },
    // 取消
    handleCancelClick(name) {
      this.$emit("update:upgradeOrderDetailModel", false);
    },
  },
  watch: {
    upgradeOrderDetailModel(value) {
      this.controlModel = value;
    },
    upgradeOrderObj(value) {
        this.upgradeOrderObjs = value
        this.time = value.returnBackDate ? 2 :(value.checkDate ? 1 : 0)

    },
  },
};
</script>
<style scoped>
.order_con {
  background: #fcfcfc;
  border: 1px solid #dad0d0;
  padding: 10px 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: #000;
}
.order_message {
  margin-top: 20px;
  color: #000;
}

.line {
  width: 1px;
  height: 20px;
  border: 2px solid #4381e6;
  background: #4381e6;
  margin-right: 5px;
  margin-left: 0;
}
.message_title {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.order_content {
  margin-top: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  border: 1px solid #dad0d0;
  margin-bottom: 20px;
}
.title_bold {
  font-weight: bold;
}
.order_type {
  display: flex;
}
.order_time {
  margin-left: 100px;
}
.mr_top {
  margin-top: 10px;
}
.mr {
  margin: 20px 0 10px;
}
.fl_end {
  display: flex;
  justify-content: space-between;
}
.img {
  width: 100%;
  height: auto;
}
.order_id {
  color: red;
}
.unImg{
  width: 40px;
  height: 40px;
  
}
</style>
