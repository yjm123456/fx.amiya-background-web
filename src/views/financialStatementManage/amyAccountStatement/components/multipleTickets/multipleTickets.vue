<template>
  <div class="contents">
    <div class="h3">添加详情</div>
    <Form
      ref="form"
      :model="form"
      label-position="left"
      :label-width="90"
    >
      <Row :gutter="30">
        <Col span="6">
            <FormItem label="发票金额" prop="separateBillPrice">
              <Input
                v-model="form.separateBillPrice"
                placeholder="请输入发票金额"
                type="number"
                number
                @on-change="taxRateChange(form.taxRate)"
              ></Input>
            </FormItem>
            </Col>
        <Col span="6">
          <FormItem label="税率(%)" prop="taxRate">
            <Input
              v-model="form.taxRate"
              placeholder="请输入税率"
              type="number"
              number
              @on-change="taxRateChange(form.taxRate)"
            ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="税额" prop="taxPrice">
            <Input
              v-model="form.taxPrice"
              placeholder="请输入税额"
              type="number"
              number
              disabled
            ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="不含税金额" prop="notInTaxPrice">
            <Input
              v-model="form.notInTaxPrice"
              placeholder="请输入不含税金额"
              type="number"
              number
              disabled
            ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="其他费用" prop="otherPrice">
            <Input
              v-model="form.otherPrice"
              placeholder="请输入其他费用"
              type="number"
              number
            ></Input>
          </FormItem>
        </Col>

        <Col span="6">
          <FormItem label="费用备注" prop="otherPriceRemark">
            <Input
              v-model="form.otherPriceRemark"
              placeholder="请输入费用"
              type="textarea"
              :rows="4"
            ></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="收款公司" prop="collectionCompanyId">
            <Select
              v-model="form.collectionCompanyId"
              placeholder="请选择收款公司"
              filterable
            >
              <Option
                v-for="item in companyNameList"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <Button type="primary" @click="addDetail">生成发票</Button>
        </Col>
      </Row>
    </Form>
    
    <Divider style="margin-top:-6px"/>
    <div class="h3">发票栏</div>
    <Table
      border
      :columns="query.columns"
      :data="query.data"
    ></Table>
  </div>
</template>
<script>
export default {
  props:{
    companyNameList:Array,
  },
  data() {
    return {
      form: {
        // 客户 医院
        hospitalId: null,
        // 信息服务费
        returnBackPriceNum: null,
        // 系统使用费
        systemUpdatePriceNum: null,
        // 发票金额
        separateBillPrice: null,
        // 对账金额
        dealPrice: null,
        // 其他费用
        otherPrice: null,
        // 费用备注
        otherPriceRemark: "",
        // 开票时间
        createDate: "",
        // 账单归属时间
        time: "",
        // 税率
        taxRate: null,
        // 税额
        taxPrice: null,
        // 不含税金额
        notInTaxPrice: null,
        // 收款公司
        collectionCompanyId: null,
        // 开票事由
        createBillReason: "",
        // 票据类型
        billType: 0,
        collectionCompanyName:''
      },
      query:{
        data:[],
        columns:[
          {
            title: "发票金额",
            key: "separateBillPrice",
            align: "center",
            minWidth:100
          },
          {
            title: "税率",
            key: "taxRate",
            align: "center",
            minWidth:100
          },
          {
            title: "税额",
            key: "taxPrice",
            align: "center",
            minWidth:100
          },
          {
            title: "不含税金额",
            key: "notInTaxPrice",
            align: "center",
            minWidth:100
          },
          {
            title: "其他费用",
            key: "otherPrice",
            align: "center",
            minWidth:200,
            tooltip:true,
          },
          {
            title: "费用备注",
            key: "otherPriceRemark",
            align: "center",
            minWidth:200,
            tooltip:true,
          },
          {
            title: "收款公司",
            key: "collectionCompanyName",
            align: "center",
            minWidth:200,
            tooltip:true,
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
      },
      index:0
    };
  },
  created(){

  },
  methods:{
    taxRateChange(value){
      const {separateBillPrice,taxRate} = this.form
      // 税率
      let num = (taxRate/100).toFixed(2)
      // 含税计算公式 （发票金额/（（1+税率）*税率）--保留2位小数）
      this.form.taxPrice = ((separateBillPrice / (1+Number(num))) * Number(num)).toFixed(2)
      // 不含税
      this.form.notInTaxPrice = (separateBillPrice - this.form.taxPrice).toFixed(2)
    },
    addDetail(){
      const { separateBillPrice,taxRate,taxPrice,notInTaxPrice,otherPrice,otherPriceRemark,collectionCompanyId} = this.form
      if(!separateBillPrice){
        this.$Message.warning('请输入发票金额')
        return
      }
      if(!taxRate){
        this.$Message.warning('请输入税率')
        return
      }
      if(!taxPrice){
        this.$Message.warning('请输入税额')
        return
      }
      if(!notInTaxPrice){
        this.$Message.warning('请输入不含税金额')
        return
      }
      if(!collectionCompanyId){
        this.$Message.warning('请选择收款公司')
        return
      }
      if(this.query.data.length >1){
        this.$Message.warning('只能添加两个收款公司')
        this.form.taxRate = null
        this.form.taxPrice = null
        this.form.notInTaxPrice = null
        this.form.collectionCompanyId = null
        this.form.separateBillPrice = null
        this.form.otherPrice = ''
        this.form.otherPriceRemark = ''
        this.form.collectionCompanyName = ''
        return
      }
      this.companyNameList.map(item=>{
        if(item.id == collectionCompanyId) {
          this.query.data.push({
            separateBillPrice:separateBillPrice,
            taxRate:taxRate,
            taxPrice:Number(taxPrice),
            notInTaxPrice:Number(notInTaxPrice),
            otherPrice:otherPrice?otherPrice : 0,
            otherPriceRemark:otherPriceRemark,
            collectionCompanyId:collectionCompanyId,
            collectionCompanyName:item.name,
            index:this.index++
          })
        }
      })
      this.$emit('handle',this.query.data)
      this.form.taxRate = null
      this.form.taxPrice = null
      this.form.notInTaxPrice = null
      this.form.collectionCompanyId = null
      this.form.separateBillPrice = null
      this.form.otherPrice = ''
      this.form.otherPriceRemark = ''
      this.form.collectionCompanyName = ''
    }
  },
  watch:{
    
  }
};
</script>
<style scoped>
.contents{
  width: 100%;
  padding: 0 18px;
  box-sizing: border-box;
}
.h3{
  font-weight: bold;
  margin-top: -10px;
  margin-bottom: 15px;
  color: #000;
}
</style>