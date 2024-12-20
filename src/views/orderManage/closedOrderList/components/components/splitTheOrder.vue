<template>
  <div class="content">
    <Modal
      title="拆单"
      footer-hide
      v-model="splitTheOrderModels"
      width="1000px"
      :closable="false"
      @click="handleModalVisibleChange"

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
            <FormItem label="成交编号" prop="dealId" >
                <Input
                    v-model="form.dealId"
                    placeholder="请输入成交编号"
                    disabled
                ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="原成交金额" prop="dealPrice" >
                <Input
                    v-model="form.dealPrice"
                    placeholder="请输入原成交金额"
                    disabled
                ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="成交金额" prop="price" >
              
                <Input
                    v-model="form.price"
                    placeholder="请输入成交金额"
                ></Input>
                <div style="font-size:12px;color:red;position:relative;left:-100px;top:-10px">当前单成交金额</div>
            </FormItem>
          </Col>
     </Row>
     <Divider style="margin-top:5px"/>
     <div class="h3">添加拆单明细</div>
     <Row :gutter="30">
        <Col span="8">
          <FormItem label="成交编号" prop="dealId">
            <Input
              v-model="form.dealId"
              placeholder="请输入成交编号"
              disabled
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="拆单金额" prop="splitTheOrderPrice" >
            <Input
              v-model="form.splitTheOrderPrice"
              placeholder="请输入拆单金额"
              type="number"
              number
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <Button type="primary" @click="addDetail">添加</Button>
        </Col>
      </Row>
      <Divider style="margin-top:5px"/>
      <div class="h3">明细栏</div>
      <div style="height:300px;margin-bottom:10px">
        <Table
          border
          :columns="query.columns"
          :data="query.data"
          height="300"
        ></Table>
      </div>
    </Form>
      <div class="footer" >
          <Button @click="cancel('form')" style="margin-right: 10px" >取消</Button>
          <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/shoppingCartRegistration";
import * as orderApi from "@/api/orderManage";

export default {
  components:{
      
  },
  props: {
    splitTheOrderModel: Boolean,
    splitTheOrderParams:Object,
  },
  data() {
    return {
      index:0,
      splitTheOrderModels:false,
      form:{
         //成交编号  
          dealId:null,
         //   原成交金额
          dealPrice:null,
        //   成交金额
          price:null,
          // 拆单金额
          splitTheOrderPrice:null,
      },
      ruleValidate: {
        // splitTheOrder: [
        //   {
        //     required: true,
        //     message: "请输入拆单金额",
        //   },
        // ],
        dealId: [
          {
            required: true,
            message: "请输入成交编号",
          },
        ],
        dealPrice: [
          {
            required: true,
            message: "请输入原成交金额",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入成交金额",
          },
        ],
      },
      query:{
        data:[],
        columns:[
          {
            title: "成交编号",
            key: "dealId",
            align: "center",
            minWidth:150,
            tooltip:true
          },
          
          {
            title: "成交金额",
            key: "splitTheOrderPrice",
            align: "center",
            minWidth:100,
            tooltip:true
          },
          {
            title: "操作",
            align: "center",
            width: 150,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        const {index} = params.row;
                        const findIndex = this.query.data.findIndex(item=> item.index === index);
                        this.query.data.splice(findIndex,1)
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
          
        ]
      }
    };
  },
  methods: {
      addDetail(){
        const { dealId,splitTheOrderPrice} = this.form
        if(!dealId){
          this.$Message.warning('请输入成交编号')
          return
        }
        if(!splitTheOrderPrice){
          this.$Message.warning('请输入拆单金额')
          return
        }
        this.query.data.push({
          splitTheOrderPrice,
          dealId,
          index:this.index++,
        })
        this.form.splitTheOrderPrice = null
        // this.cancel('form')
      },
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
            if(valid){
              const {dealPrice,price,dealId} = this.form
              if(this.query.data.length == 0 || this.query.data == []){
                this.$Message.warning('请先添加拆单明细！')
                return
              }
              // 合计拆单数组的金额
              let price1 = 0
              // 金额数组传给后端
              let price2 = []
              
              this.query.data.map(item=>{
                price1 +=item.splitTheOrderPrice
                price2.push(item.splitTheOrderPrice)
              })
              // 合计拆单数组金额以及成交金额 用于和元成交金额做对比
              let price3 =   Math.round((Number(price) + Number(price1)) * 100) / 100;
              let price4 =  Math.round((Number(dealPrice)) * 100) / 100
              if( price4  != price3){
                this.$Message.warning('拆单后累计金额与原成交金额不一致，请重新确认！')
                return
              }
              const data = {
                dealId:dealId,
                price:price2,
                localDealPirce:Number(price)
              }
              orderApi.splitDealInfo(data).then((res) => {
                  if(res.code == 0){
                      this.$Message.success('拆单成功')
                      this.cancel('form')
                      this.$emit('getContentPlatFormOrderDealInfo')
                  }
              })
            }
        })
       
      },
    // 取消
    cancel(name) {
      this.$refs[name].resetFields();
      this.query.data = []
      this.$emit("update:splitTheOrderModel", false);
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.cancel('form');
        this.$emit("update:splitTheOrderModel", false);
      }
        
    },
  },
  watch: {
    splitTheOrderModel: {
      handler(splitTheOrderModel) {
        this.splitTheOrderModels = splitTheOrderModel
        this.form.dealId = this.splitTheOrderParams.dealId
        this.form.dealPrice = this.splitTheOrderParams.dealPrice
        
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.img_o {
  width: 100%;
  height: auto;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img,.img_o{
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.no_date{
  text-align: center;
}
.img_cons{
  display: flex;
  flex-wrap: wrap;
}
.h3{
  font-weight: bold;
  color: #000;
}
</style>
