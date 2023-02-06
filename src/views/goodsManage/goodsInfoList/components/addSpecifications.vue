<template>
  <div>
    <Modal
      v-model="specificationsModel"
      title="添加规格"
      :mask-closable="false"
      @on-visible-change="addHispitalChange"
      width="85%"
    >
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="right"
          :label-width="90"
        >
          <Row :gutter="10">
            <Col span="6">
              <FormItem label="规格" prop="standards">
                <Input v-model="form.standards" placeholder="选择规格"></Input>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="购买值" prop="price">
                <Input v-model="form.price" placeholder="购买值" type="number" number></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="抵扣积分" prop="integralAmount">
                <Input v-model="form.integralAmount" placeholder="抵扣积分" type="number" number :disabled="exchangeType != 7"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="图片" prop="standardsImg">
                <upload
                  :uploadObj="thumbPicUrlUploadObj"
                  @uploadChange="handleThumbPicUrlUploadChange"
                />
              </FormItem>
            </Col>
            <Col span="3">
              <Button type="primary" @click="handleAddSubmitClick">
                添加
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="table">
         <Table border :columns="query.columns" :data="query.data"   height="300"></Table>
         
      </div>
      <div slot="footer" class="footer">
          <div class="title">注：当改商品的支付方式为人民币支付的形式时，购买值即意为"金额"；另外若为积分支付形式时，购买值即意为"积分"</div>
          <div>
            <Button @click="handleCancelClick('form')">取消</Button>
            <Button type="primary" @click="handleSubmitClick()">确定</Button>
          </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import upload from "@/components/upload/upload";
export default {
  components:{
    upload
  },
  props: {
    addSpecificationsModel: Boolean,
    goodsInfo: Object,
    exchangeType:Number
  },
  data() {
    return {
      thumbPicUrlUploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 1,
        // 文件列表
        uploadList: [],
      },
      index:0,
      height:'120px',
      form: {
        standards: "",
        price: null,
        standardsImg:"",
        integralAmount:null
      },
      specificationsModel: false,
      query: {
        data: [],
        columns: [
          {
            title: "规格名称",
            key: "standards",
            render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.standards
                        },
                        style: {
                            width: "200px",
                        },
                        on: {
                            input: (val) => {
                                this.query.data[params.index].standards =  val
                            }
                        },
                    });
                },
          },
          {
            title: "购买值",
            key: "price",
            align: "center",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.price
                },
                style: {
                  width: "100px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data[params.index].price = value;
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "抵扣积分",
            key: "integralAmount",
            align: "center",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.integralAmount,
                  disabled:this.exchangeType !=7
                },
                style: {
                  width: "100px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data[params.index].integralAmount = value;
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "缩略图",
            key: "standardsImg",
            align: "center",
            minWidth: 150,
            render: (h, params) => {
              return h(
                "viewer",
                {
                  props: {
                    options: {
                      toolbar: false,
                      title: false,
                      navbar: false,
                    },
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "50px",
                      height: "50px",
                      margin: "5px 0",
                      verticalAlign: "middle",
                    },
                    attrs: {
                      src: params.row.standardsImg,
                    },
                  }),
                ]
              );
            },
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
        ],
      },
    };
  },
  mounted(){
    this.$nextTick(()=>{ // 页面渲染完成后的回调
    })
  },
  methods: {
    // 缩略图
    handleThumbPicUrlUploadChange(values) {
      this.form.standardsImg = values[0];
    },
    // 确认添加
    handleAddSubmitClick() {
      const { standards, price,standardsImg ,integralAmount} = this.form;
      let hospitalArr = [] 
      if(!standards){
        this.$Message.error('请输入规格')
        return
      };
      if(!price){
        this.$Message.error('请输入购买值')
        return
      };
      if(this.exchangeType == 7){
        if(!integralAmount){
          this.$Message.error('请输入抵扣积分')
          return
        };
      }
      

      this.query.data.push({standards:standards,price:Number(price),integralAmount:Number(integralAmount),index:this.index++,standardsImg:standardsImg})
      this.form = {}
      this.thumbPicUrlUploadObj.uploadList = [];
    },

    // modal 显示状态发生变化时触发
    addHispitalChange(value) {
      if (!value) {
        this.handleCancelClick("form");
      }
    },

    // 取消
    handleCancelClick(name) {
      this.$emit("update:addSpecificationsModel", false);
      // this.query.data = []
      this.form = {}
      this.thumbPicUrlUploadObj.uploadList = [];
    },

    // 提交
    handleSubmitClick() {
      if(!this.query.data.length) {
        this.$Message.error('请输入规格')
        return
      }
      const hospitalData = this.query.data.map(item=> {
        return {
          standards:item.standards,
          price:item.price,
          standardsImg:item.standardsImg,
          integralAmount:item.integralAmount

        }
      })
      this.$emit('goodsStandardsPrice',this.query.data)
      this.$emit("update:addSpecificationsModel", false);
    }
  },
  watch: {
    addSpecificationsModel(value) {
      this.specificationsModel = value;
      if(this.goodsInfo) {
        if(this.goodsInfo.goodsStandardPrice){
           // 回显
          this.query.data = this.goodsInfo.goodsStandardPrice 
        }
       
      } 
    },
  },
};
</script>
<style scoped>
/* .ivu-select{
  height: 100px;
  overflow-y: scroll;
} */
.footer{
  display: flex;
  justify-content: space-between;
}
.title{
  color: red;
}
</style>
