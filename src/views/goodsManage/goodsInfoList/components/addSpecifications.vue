<template>
  <div>
    <Modal
      v-model="specificationsModel"
      title="添加规格"
      :mask-closable="false"
      @on-visible-change="addHispitalChange"
      width="70%"
    >
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="right"
          :label-width="90"
        >
          <Row :gutter="30">
            <Col span="8">
              <FormItem label="规格" prop="standards">
                <Input v-model="form.standards" placeholder="选择规格"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="价格" prop="price">
                <Input v-model="form.price" placeholder="价格" type="number" number></Input>
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
      <div slot="footer">
        <Button @click="handleCancelClick('form')">取消</Button>
        <Button type="primary" @click="handleSubmitClick()">确定</Button>
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
    goodsInfo: Object
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
        standardsImg:""
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
            title: "价格",
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
      const { standards, price,standardsImg } = this.form;
      let hospitalArr = [] 
      if(!standards){
        this.$Message.error('请输入规格')
        return
      };
      if(!price){
        this.$Message.error('请输入价格')
        return
      };

      this.query.data.push({standards:standards,price:Number(price),index:this.index++,standardsImg:standardsImg})
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
          standardsImg:item.standardsImg

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
</style>
