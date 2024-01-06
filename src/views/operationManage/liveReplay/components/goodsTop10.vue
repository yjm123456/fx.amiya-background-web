<template>
  <div>
    
    <Table border :columns="query.columns" :data="query.data"></Table>
    <Modal
      v-model="control"
      title="编辑"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="90%"
    >
      <Button type="primary" @click="addDataClick" style="margin-bottom:10px">添加数据</Button>
      <Table border :columns="query.columns2" :data="query.data2"></Table>
      <div slot="footer">
        <Spin fix v-if="isLoading == true">
          <Icon
            type="ios-loading"
            size="18"
            class="demo-spin-icon-load"
          ></Icon>
          <div>加载中...</div>
        </Spin>
        <Button @click="cancelSubmit">取消</Button>
        <Button type="primary" @click="getAutoLiveReplayMerchandiseTopData">自动填写</Button>
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/liveReplay";
import * as itemQuotedPriceManageApi from "@/api/itemQuotedPriceManage";

export default {
  props: {
    goodsTop10Model: Boolean,
    params: Object,
  },
  data() {
    return {
      isLoading:false,
        control:false,
      query: {
        data: [],
        data2:[],
        columns: [
          {
            title: "商品名称",
            key: "itemName",
            tooltip:true
          },
          {
            title: "GMV",
            key: "gmv",
            align: "center",
          },
          {
            title: "商品曝光量",
            key: "merchandiseShowNum",
            align: "center",
            className: "colored",
          },
          {
            title: "商品浏览量",
            key: "merchandiseVisitNum",
            align: "center",
          },
          {
            title: "曝光-点击率(%)",
            key: "merchandiseShowVisitRate",
            align: "center",
          },
          {
            title: "创建订单量",
            key: "merchandiseCreateOrderNum",
            align: "center",
          },
          {
            title: "点击-生单转化率(%)",
            key: "merchandiseVisitCreateOrderRate",
            align: "center",
          },
          {
            title: "成交量",
            key: "merchandiseDealNum",
            align: "center",
          },
          {
            title: "生单-成交转化率(%)",
            key: "merchandiseCreateOrderDealRate",
            align: "center",
          },
          {
            title: "商品问题",
            key: "merchandiseQuestion",
            align: "center",
          },
        ],
        columns2: [
          {
            title: '商品',
            key: 'itemId',
            minWidth:180,
            render: (h, params) => {
              return h('Select', {        //创建一个select下拉框
                props:{                   //定义select的属性
                  placeholder:'请选择商品',
                  value:String(this.query.data2[params.index].itemId) ,     //初始化给下拉框赋值
                   transfer:true
                },
                on: {                     //给select添加事件
                    'on-change':(event) => {
                        this.query.data2[params.index].itemId = event;      //选择option给value赋值
                    }
                },
              },
                this.goodsList.map((type)=>{          //循环展示下拉框数据   this.goodsList是从后台获取到的数据
                    return h('Option', {
                        props:{
                            value:type.id,
                            label:type.name
                        }
                    }, type);
                })
              )
            }
          },
          {
            title: "GMV",
            key: "gmv",
            minWidth:120,
            align: "center",
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.gmv
                },
                style: {
                  width: "100%",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].gmv = value;
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "商品曝光量",
            key: "merchandiseShowNum",
            align: "center",
            className: "colored",
            minWidth:120,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.merchandiseShowNum
                },
                style: {
                  width: "100%",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].merchandiseShowNum = value;
                        this.lastLivingDataNum()
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "商品浏览量",
            key: "merchandiseVisitNum",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.merchandiseVisitNum
                },
                style: {
                  width: "100%",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].merchandiseVisitNum = value;
                        this.lastLivingDataNum()
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "曝光-点击率(%)",
            key: "merchandiseShowVisitRate",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.merchandiseShowVisitRate,
                  disabled:true 
                },
                style: {
                  width: "100%",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].merchandiseShowVisitRate = value;
                        
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "创建订单量",
            key: "merchandiseCreateOrderNum",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.merchandiseCreateOrderNum
                },
                style: {
                  width: "100%",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].merchandiseCreateOrderNum = value;
                        this.lastLivingDataNum()
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "点击-生单转化率(%)",
            key: "merchandiseVisitCreateOrderRate",
            align: "center",
            minWidth:140,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.merchandiseVisitCreateOrderRate,
                  disabled:true 
                },
                style: {
                  width: "100%",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].merchandiseVisitCreateOrderRate = value;
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "成交量",
            key: "merchandiseDealNum",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.merchandiseDealNum
                },
                style: {
                  width: "100%",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].merchandiseDealNum = value;
                        this.lastLivingDataNum()
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "生单-成交转化率(%)",
            key: "merchandiseCreateOrderDealRate",
            align: "center",
            minWidth:120,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.merchandiseCreateOrderDealRate,
                  disabled:true 
                },
                style: {
                  width: "100%",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].merchandiseCreateOrderDealRate = value;
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "商品问题",
            key: "merchandiseQuestion",
            align: "center",
            minWidth:200,
            render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.merchandiseQuestion,
                            type:'textarea',
                            rows:2
                        },
                        style: {
                            width: "100%",
                            padding:'10px 0'
                        },
                        on: {
                            input: (val) => {
                                this.query.data2[params.index].merchandiseQuestion =  val
                            }
                        },
                    });
                },
          },
          {
            title: "操作",
            key: "",
            width: 120,
            align:'center',
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
                        const {sort} = params.row;
                        const findIndex = this.query.data2.findIndex(item=> item.sort === sort);
                        this.query.data2.splice(findIndex,1)
                        if(this.query.data2){
                          this .query.data2.map((item, index)=>{item.sort = index+1})
                        }
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
      // 商品
      goodsList:[],
      sort:1
    };
  },
  methods: {
    // 计算值
    lastLivingDataNum(){
      this.query.data2.map((item,index)=>{
          // 计算商品曝光-点击率
          if(item.merchandiseShowNum !=0){
            // （当前数值-同比数值）/同比数值*100 保留2位小数
            let num = (item.merchandiseVisitNum/item.merchandiseShowNum*100).toFixed(2)
            if(num < 0 ){
                item.merchandiseShowVisitRate =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
            }else{
                item.merchandiseShowVisitRate =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            }
          }else{
            item.merchandiseShowVisitRate = 0
          }

          // 计算商品点击-生单转化率
          if(item.merchandiseVisitNum !=0){
            // （当前数值-同比数值）/同比数值*100 保留2位小数
            let num = (item.merchandiseCreateOrderNum/item.merchandiseVisitNum*100).toFixed(2)
            if(num < 0 ){
                item.merchandiseVisitCreateOrderRate =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
            }else{
                item.merchandiseVisitCreateOrderRate =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            }
          }else{
            item.merchandiseVisitCreateOrderRate = 0
          }

          // 计算生单-成交转化率
          if(item.merchandiseCreateOrderNum !=0){
            // （当前数值-同比数值）/同比数值*100 保留2位小数
            let num = (item.merchandiseDealNum/item.merchandiseCreateOrderNum*100).toFixed(2)
            if(num < 0 ){
                item.merchandiseCreateOrderDealRate =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
            }else{
                item.merchandiseCreateOrderDealRate =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            }
          }else{
            item.merchandiseCreateOrderDealRate = 0
          }
      })
    },
    // 添加数据
    addDataClick(){
      if(this.query.data2 || this.query.data2.length !=0){
        this.query.data2.map((item,index)=>{
          if(item.sort == this.query.data2.length+1)
          this.sort = item.sort++
        })
      }
      this.query.data2.push({
        liveReplayId: sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : '',
        itemId:null,
        gmv:0,
        merchandiseShowNum:0,
        merchandiseVisitNum:0,
        merchandiseShowVisitRate:0,
        merchandiseCreateOrderNum:0,
        merchandiseVisitCreateOrderRate:0,
        merchandiseDealNum:0,
        merchandiseCreateOrderDealRate:0,
        merchandiseQuestion:'',
        sort: this.sort++
      })
      // 重新赋值sort
      this .query.data2.map((item, index)=>{item.sort = index+1})
    },
    // 获取商品
    getItemNameByBrandIdAndCategoryId(){
      const data = {
        brandId:'',
        itemDetailsId:'',

      }
      itemQuotedPriceManageApi.getItemNameByBrandIdAndCategoryId(data).then(res=>{
        if(res.code === 0){
            this.goodsList = res.data.items
        }
      })
    },
    // 自动填写
    getAutoLiveReplayMerchandiseTopData(){
      const data = {
        replayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
      }
      api.LiveReplayMerchandiseTopData(data).then(res=>{
        if(res.code === 0){
            this.query.data2 = res.data.data
            this .query.data2.map((item, index)=>{item.sort = index+1})
        }
      })
    },
    // 编辑数据
    editClick(){
      this.isLoading = true;
        api.addLiveReplayMerchandiseTopData(this.query.data2).then((res) => {
            if(res.code === 0){
              this.isLoading = false;
                this.cancelSubmit()
                this.$Message.success('修改成功！')
                // this.getLiveReplayMerchandiseTopData()
            }else {
                setTimeout(() => {
                  this.isLoading = false;
                }, 3000);
              }
        })
    },  
    // 获取复盘基础信息列表
    getLiveReplayMerchandiseTopData() {
      const data = {
        liveReplayId: sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : '',
        valid:true

      };
      api.getLiveReplayMerchandiseTopData(data).then((res) => {
        if (res.code === 0) {
          const { data } = res.data;
           this.query.data = data;
           if(data.length == 0|| data == []){
            return
           }else{
            this.query.data2 = data;
           }
        }
      });
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.control = false
        this.$emit("update:goodsTop10Model", false);
        this.query.data2 = []
        this.getLiveReplayMerchandiseTopData()
      }
    },
    // 取消
    cancelSubmit(){
        this.control = false
        this.$emit("update:goodsTop10Model", false);
        this.query.data2 = []
        // this.getLiveReplayMerchandiseTopData()
    },
    // 确认
    handleSubmit(){
       for (var i = 0; i < this.query.data2.length; i++) {
          if(!this.query.data2[i].itemId){
            this.$Message.warning("请确认列表商品是否有值！");
            break 
          }
          if(this.query.data2[i].gmv==null){
            this.$Message.warning("请确认列表gmv是否有值！");
            break 
          }
          if(this.query.data2[i].merchandiseShowNum==null){
            this.$Message.warning("请确认列表gmv是否有值！");
            break 
          }
          if(this.query.data2[i].merchandiseVisitNum==null){
            this.$Message.warning("请确认列表gmv是否有值！");
            break 
          }
          if(this.query.data2[i].merchandiseShowVisitRate==null){
            this.$Message.warning("请确认列表gmv是否有值！");
            break 
          }
          if(this.query.data2[i].merchandiseCreateOrderNum==null){
            this.$Message.warning("请确认列表gmv是否有值！");
            break 
          }
          if(this.query.data2[i].merchandiseVisitCreateOrderRate==null){
            this.$Message.warning("请确认列表gmv是否有值！");
            break 
          }
          if(this.query.data2[i].merchandiseDealNum==null){
            this.$Message.warning("请确认列表gmv是否有值！");
            break 
          }
          if(this.query.data2[i].merchandiseCreateOrderDealRate==null){
            this.$Message.warning("请确认列表gmv是否有值！");
            break 
          }
          // 防止调用多次
          if(this.query.data2[i].sort == this.query.data2.length){
            const data ={
                liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
            }
            // 先删除数据 再进去添加数据
            api.deleteLiveReplayMerchandiseTopData(data).then((res) => {
                if(res.code === 0){
                    this.editClick()
                }
            })
          }
          
        }
       
        
        
    }
  },
  watch: {
    goodsTop10Model(value) {
      this.control = value;
    },
    params: {
      handler(value) {
        this.title = value.title;
        // this.query.contentplatformId = value.contentplatformId
        // this.query.liveAnchorId = value.liveAnchorId
        // this.query.date = value.date
      },
      deep: true,
    },
  },
};
</script>
