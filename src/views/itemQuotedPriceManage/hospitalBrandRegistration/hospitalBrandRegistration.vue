<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalBrandRegis()"
          />
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalBrandRegis()"
            >查询</Button
          >
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="exportHospitalMessage()"
            >导出</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
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
    </Card>

    <Modal v-model="controlModal" title="修改医院报名信息" :mask-closable="false" width="1000">
            <Form ref="form" :model="form" label-position="left" :label-width="80" >
                <FormItem label="医院" prop="hospitalName">
                    <Input
                        v-model="form.hospitalName"
                        placeholder="请输入医院"
                        maxlength="12"
                    />
                </FormItem>
                <FormItem label="产品类型" prop="goodsType">
                    <Select
                        v-model="form.goodsType"
                        placeholder="请选择产品类型"
                        filterable
                        >
                        <Option
                            v-for="item in typeList"
                            :value="item.name"
                            :key="item.name"
                            >{{ item.name }}</Option
                        >
                    </Select>
                </FormItem>
                <FormItem label="商品Id" prop="goodsId">
                    <Input
                        v-model="form.goodsId"
                        placeholder="请输入商品Id（12位数字）"
                        maxlength="12"
                    />
                    <div class="hospital_text">注：需填写电脑网页版网址链接，请勿填写淘口令、手机短链。 例子：https://detail.tmall.com/item.htm?spm=id=6XXXXXXXXXX8</div>
                </FormItem>
                <FormItem label="商品链接" prop="goodsUrl">
                    <Input
                        v-model="form.goodsUrl"
                        placeholder="请输入商品链接"
                    />
                    <div class="hospital_text">注：需填写电脑网页版网址链接，请勿填写淘口令、手机短链。 例子：https://detail.tmall.com/item.htm?spm=id=6XXXXXXXXXX8</div>
                    <div class="hospital_text"></div>
                </FormItem>
                <FormItem label="预估销量" prop="allSaleNum">
                    <Input
                        v-model="form.allSaleNum"
                        placeholder="请输入预估销量"
                        type="number"
                        number
                    />
                </FormItem>
                <FormItem label="超出预估原因" prop="exceededReason">
                    <Input
                        v-model="form.exceededReason"
                        placeholder="请输入超出预估原因"
                    />
                    <div class="hospital_text">注：为了商家在参与活动的同时保持合规经营，建议旗舰店商家销售总支数不超过350支， O2O商家（阿里健康店、本地生活店）销售总支数不超过200支。如超出预估销售支数，请在超出预估支数说明填写原因。如未超出预估支数，可直接写：无</div>
                    <div class="hospital_text"></div>
                </FormItem>
                <div style="font-weight:bold">添加规格：</div>
                <Row :gutter="30">
                    <Col span="8">
                        <FormItem label="sku名称" prop="skuName">
                            <Input
                                v-model="detailform.skuName"
                                placeholder="请输入sku名称"
                            />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="价格" prop="price">
                            <Input
                                v-model="detailform.price"
                                placeholder="请输入价格"
                                number
                                type="number"
                            />
                        </FormItem>
                    </Col>
                    <Col span="7">
                        <FormItem label="SKU所代表支数/点数" prop="allCount">
                            <Input
                                v-model="detailform.allCount"
                                placeholder="输入SKU所代表支数/点数"
                                number
                                type="number"
                            />
                        </FormItem>
                    </Col>
                    <Col span="3">
                         <Button type="primary" @click="addSpecification">添加</Button>
                    </Col>
                </Row>
                <div class="table">
                    <Table border :columns="query.editColumns" :data="form.tmallGoodsSkuVo"   height="300"></Table>
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
                <Button type="primary" @click="handleSubmit('form')">提交</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
import * as api from "@/api/itemQuotedPriceManage";
import { download } from "@/utils/util";
export default {
  components:{

  },
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        columns: [
          
          {
            title: "医院",
            key: "hospitalName",
          },
          {
            title: "产品类型",
            key: "goodsType",
          },
          {
            title: "商品Id",
            key: "goodsId",
          },
          {
            title: "商品链接",
            key: "goodsUrl",
          },
          {
            title: "预估销量",
            key: "allSaleNum",
          },
          {
            title: "超出预估销量原因",
            key: "exceededReason",
          },
          {
            title: "操作",
            key: "",
            width: 200,
            align:'center',
            render: (h, params) => {
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
                        // this.controlModal = true;
                        api.byIdHospitalBrandApply(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              id,
                              goodsId,
                              goodsUrl,
                              tmallGoodsSkuVo,
                              hospitalName,
                              goodsType,
                              allSaleNum,
                              exceededReason
                            } = res.data.hospitalBrandApplyInfo;
                            this.isEdit = true;
                            this.form.goodsId = goodsId;
                            this.form.goodsUrl = goodsUrl;
                            this.form.tmallGoodsSkuVo = tmallGoodsSkuVo;
                            this.form.hospitalName = hospitalName;
                            this.form.goodsType = goodsType;
                            this.form.allSaleNum = allSaleNum;
                            this.form.exceededReason = exceededReason;
                            this.form.id = id;
                            this.controlModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: "是否确认删除？",
                          onOk: () => {
                            const { id } = params.row;
                            api.deleteHospitalBrandApply(id).then((res) => {
                              if (res.code === 0) {
                                this.getHospitalBrandRegis();
                                this.$Message.success({
                                  content: "删除成功",
                                  duration: 3,
                                });
                              }
                            });
                          },
                          onCancel: () => {},
                        });
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
        ],
        editColumns:[
            {
                title: "sku名称",
                key: "skuName",
                align: "center",
                render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.skuName
                        },
                        style: {
                            width: "200px",
                        },
                        on: {
                            input: (val) => {
                                this.form.tmallGoodsSkuVo[params.index].skuName =  val
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
                        this.form.tmallGoodsSkuVo.map((item,index)=>{
                            if(index=== params.index){
                                this.form.tmallGoodsSkuVo[params.index].price = value;
                            }
                        })
                    },
                    },
                });
                },
            },
            {
                title: "总数量",
                key: "allCount",
                align: "center",
                min: 0,
                render: (h, params) => {
                return h("InputNumber", {
                    props: {
                    value: params.row.allCount
                    },
                    style: {
                    width: "100px",
                    },
                    on: {
                    "on-change": (value) => {
                        this.form.tmallGoodsSkuVo.map((item,index)=>{
                            if(index=== params.index){
                                this.form.tmallGoodsSkuVo[params.index].allCount = value;
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
                            this.form.tmallGoodsSkuVo.splice(params.index,1)
                        },
                        },
                    },
                    "删除"
                    ),
                ]);
                },
            },
        ],
        data: [],
        totalCount: 0,
      },
      typeList:[
          {
              name:'乔雅登',
              id:0
          },
          {
              name:'酷塑',
              id:1
          }
      ],
      flag:false,
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",
      // 是否是编辑
      isEdit: false,
      detailform:{
          skuName:'',
          price:null,
          allCount:null
      },
      form: {
            goodsId: '',
            goodsUrl:'',
            tmallGoodsSkuVo: [],
            hospitalName:'',
            allSaleNum:null,
            goodsType:'',
            exceededReason:''
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入名称",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入描述",
          },
        ],
      },
    };
  },
  methods: {
    // 添加规格
        addSpecification(){
            const {price,skuName,allCount} = this.detailform
            if(!skuName){
                 this.$Message.warning('请先输入sku名称')
                 return
            }
            if(!price){
                 this.$Message.warning('请先输入价格')
                 return
            }
            if(!allCount){
                 this.$Message.warning('请先输入SKU所代表支数/点数')
                 return
            }
            this.form.tmallGoodsSkuVo.push({
              price,
              skuName,
              allCount,
            })
            this.detailform = {}
            
        },
    // 获取医院品牌报名信息
    getHospitalBrandRegis() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize ,keyword} = this.query;
      const data = { pageNum, pageSize ,keyword };
      api.getHospitalBrandApply(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.hospitalBrandApplyInfo;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院品牌报名信息分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword} = this.query;
        const data = { pageNum, pageSize ,keyword };
        api.getHospitalBrandApply(data).then((res) => {
            if (res.code === 0) {
            const { list, totalCount } = res.data.hospitalBrandApplyInfo;
            this.query.data = list;
            this.query.totalCount = totalCount;
            }
        });
    },
    // 导出
    exportHospitalMessage(){
      const { keyword} = this.query;
      const data = { 
        keyWord:keyword
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.exportHospitalBrandApply(data).then((res) => {
        let name = '医院品牌报名'
          download(res,name);
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
              const {id,hospitalName ,goodsId,goodsUrl,tmallGoodsSkuVo,goodsType,allSaleNum,exceededReason}  = this.form
              const data = {
                  tmallGoodsSkuDto:tmallGoodsSkuVo,
                  hospitalName,
                  goodsId,
                  goodsUrl,
                  id,
                  goodsType,
                  allSaleNum,
                  exceededReason
              }
            if(tmallGoodsSkuVo.length<=0){
              this.$Message.warning('请先添加规格')
              return
            }
            // 修改
            api.editHospitalBrandApply(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalBrandRegis();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } 
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.controlModal = false;
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getHospitalBrandRegis();
    // this.getLogisticsCompanyList()
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.hospital_text{
    color: red;
}
</style>