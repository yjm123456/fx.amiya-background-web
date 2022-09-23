<template>
  <div>
    <Modal
      v-model="hispitalModel"
      title="添加抵用券"
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
              <FormItem label="抵用券" prop="consumptionVoucherId">
                <Select
                  v-model="form.consumptionVoucherId"
                  placeholder="请选择抵用券"
                  :transfer="true"
                  :label-in-value="true"
                  filterable
                >
                  <Option
                    :value="item.consumptionVoiucherId"
                    v-for="item in consumptionVoucherNames"
                    :key="item.consumptionVoiucherId"

                    >{{ item.consumptionVoucherName }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <!-- <Col span="8">
              <FormItem label="会员价格" prop="price">
                <Input v-model="form.price" placeholder="会员价格"></Input>
              </FormItem>
            </Col> -->
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
    voucherModel: Boolean,
    consumptionVoucherNames: Array,
    goodsInfo: Object
  },
  data() {
    return {
      height:'120px',
      form: {
        consumptionVoucherId: null,
        price: null,
      },
      hispitalModel: false,
      query: {
        data: [],
        columns: [
          {
            title: "抵用券",
            key: "consumptionName",
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
                        const {consumptionVoucherId} = params.row;
                        const findIndex = this.query.data.findIndex(item=> item.consumptionVoucherId === consumptionVoucherId);
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
      const { consumptionVoucherId, price } = this.form;
      let hospitalArr = [] 
      if(!consumptionVoucherId){
        this.$Message.error('请选择抵用券')
        return
      }
    if (this.query.data.find(item=> item.consumptionVoucherId == consumptionVoucherId)) {
            this.$Message.error('请勿重复添加')
            return
      }else{
        // 没有重复的往数组里添加
        hospitalArr.push({consumptionVoucherId:consumptionVoucherId})
    }
      // 判断医院id和添加的id是否相同 相同添加一个price字段
      this.consumptionVoucherNames.map(hospitalnameListItem=>{
        hospitalArr.map(item=>{
          if(item.consumptionVoucherId == hospitalnameListItem.consumptionVoiucherId){
            this.query.data.push({
              consumptionName: hospitalnameListItem.consumptionVoucherName,
              consumptionVoucherId:item.consumptionVoucherId,
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
      this.$emit("update:voucherModel", false);
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
          consumptionVoucherId:item.consumptionVoucherId,
        }
      })
      this.$emit('addVoucherPrice',this.query.data)
      this.$emit("update:voucherModel", false);
    }
  },
  watch: {
    voucherModel(value) {
      this.hispitalModel = value;
      if(this.goodsInfo) {
        // 回显
        this.query.data = this.goodsInfo.goodsConsumptionVoucher 
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
