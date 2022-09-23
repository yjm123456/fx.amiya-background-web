<template>
  <div>
    <Modal
      v-model="hispitalModel"
      title="添加会员价格"
      :mask-closable="false"
      @on-visible-change="addHispitalChange"
      width="1000"
    >
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="right"
          :label-width="110"
        >
          <Row :gutter="30">
            <Col span="13">
              <FormItem label="会员等级" prop="memberRankId">
                <Select
                  v-model="form.memberRankId"
                  placeholder="请选择会员等级"
                  :transfer="true"
                  :label-in-value="true"
                  filterable
                >
                  <Option
                    :value="item.id"
                    v-for="item in memberRankNames"
                    :key="item.id"

                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="会员价格" prop="price">
                <Input v-model="form.price" placeholder="会员价格"></Input>
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
export default {
  props: {
    memberModel: Boolean,
    memberRankNames: Array,
    goodsInfo: Object
  },
  data() {
    return {
      height:'120px',
      form: {
        memberRankId: null,
        price: null,
      },
      hispitalModel: false,
      query: {
        data: [],
        columns: [
          {
            title: "会员等级",
            key: "memberCardName",
          },
          {
            title: "会员价格",
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
                        const {memberRankId} = params.row;
                        const findIndex = this.query.data.findIndex(item=> item.memberRankId === memberRankId);
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
        // console.log(this.$refs.tableHeight)
    })
  },
  methods: {
    // 确认添加
    handleAddSubmitClick() {
      const { memberRankId, price } = this.form;
      let hospitalArr = [] 
      if(!memberRankId){
        this.$Message.error('请选择会员等级')
        return
      }
      if(!price){
        this.$Message.error('请输入价格')
        return
      };
    if (this.query.data.find(item=> item.memberRankId === memberRankId)) {
            this.$Message.error('请勿重复添加')
            return
      }else{
        // 没有重复的往数组里添加
        hospitalArr.push({memberRankId:memberRankId,price:Number(price)})
    }
      // 判断医院id和添加的id是否相同 相同添加一个price字段
      this.memberRankNames.map(hospitalnameListItem=>{
        hospitalArr.map(item=>{
          if(item.memberRankId === hospitalnameListItem.id){
            this.query.data.push({
              memberCardName: hospitalnameListItem.name,
              memberRankId:item.memberRankId,
              price:item.price,
            });
          }
        })
      })
      this.form = {}
    },

    // modal 显示状态发生变化时触发
    addHispitalChange(value) {
      if (!value) {
        this.handleCancelClick("form");
      }
    },

    // 取消
    handleCancelClick(name) {
      this.$emit("update:memberModel", false);
      this.form = {}
    },

    // 提交
    handleSubmitClick() {
      // if(!this.query.data.length) {
      //   this.$Message.error('请选择会员等级')
      //   return
      // }
      const hospitalData = this.query.data.map(item=> {
        return {
          memberRankId:item.memberRankId,
          price:item.price,
        }
      })
      this.$emit('addmemberPrice',this.query.data)
      this.$emit("update:memberModel", false);
    }
  },
  watch: {
    memberModel(value) {
      this.hispitalModel = value;
      if(this.goodsInfo) {
        // 回显
        this.query.data = this.goodsInfo.goodsMemberRankPrices 
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
