<template>
  <div class="contents">
    <div class="h3">成交明细</div>
    <Form
      ref="form"
      :model="form"
      label-position="left"
      :label-width="90"
    >
      <Row :gutter="30">
        <Col span="8">
            <FormItem label="项目名称" prop="goodsName">
              <Input
                v-model="form.goodsName"
                placeholder="请输入项目名称"
              ></Input>
            </FormItem>
            </Col>
        <Col span="8">
          <FormItem label="项目规格" prop="goodsSpec">
            <Input
              v-model="form.goodsSpec"
              placeholder="请输入项目规格"
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="数量" prop="quantity" >
            <Input
              v-model="form.quantity"
              placeholder="请输入数量(最小是0)"
              type="number"
              number
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="金额" prop="price">
            <Input
              v-model="form.price"
              placeholder="请输入金额(最小是0)"
              type="number"
              number
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <Button type="primary" @click="addDetail">添加明细</Button>
        </Col>
      </Row>
    </Form>
    
    <Divider style="margin-top:5px"/>
    <div class="h3">明细栏</div>
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
    id:String,
    contentPlatFormOrderDealDetails:Array
  },
  data() {
    return {
      form: {
        // 项目名称
        goodsName: '',
        // 项目规格
        goodsSpec: '',
        // 数量
        quantity: null,
        // 金额
        price: null,
        contentPlatFormOrderId:''
      },
      query:{
        data:[],
        columns:[
          {
            title: "项目名称",
            key: "goodsName",
            align: "center",
            minWidth:100
          },
          {
            title: "项目规格",
            key: "goodsSpec",
            align: "center",
            minWidth:100
          },
          {
            title: "数量",
            key: "quantity",
            align: "center",
            minWidth:100
          },
          {
            title: "金额",
            key: "price",
            align: "center",
            minWidth:100
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
                      disabled:params.row.createBy != Number(sessionStorage.getItem('employeeId'))
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
    addDetail(){
      const { goodsName,goodsSpec,quantity,price,contentPlatFormOrderId} = this.form
      if(!goodsName){
        this.$Message.warning('请输入项目名称')
        return
      }
      if(!goodsSpec){
        this.$Message.warning('请输入项目规格')
        return
      }
      if(quantity == null){
        this.$Message.warning('请输入数量(最小是0)')
        return
      }else{
        if(quantity<0){
          this.$Message.warning('数量(最小是0)')
          return
        }
      }
      if(price == null){
        this.$Message.warning('请输入金额最小是0')
        return
      }else{
        if(price<0){
          this.$Message.warning('金额最小是0')
          return
        }
      }
      this.query.data.push({
        goodsName,
        goodsSpec,
        quantity,
        price,
        contentPlatFormOrderId:this.id,
        index:this.index++,
        createBy:Number(sessionStorage.getItem('employeeId'))
      })
      this.$emit('handle',this.query.data)
      this.form.goodsName = ''
      this.form.goodsSpec = ''
      this.form.quantity = null
      this.form.price = null
      this.form.contentPlatFormOrderId = ''
     
    }
  },
  watch:{
    contentPlatFormOrderDealDetails(value){
      if(value){
        this.query.data = value
      }
    }
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