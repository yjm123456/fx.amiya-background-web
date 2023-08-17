<template>
  <div>
     <Card>
        <div>
            <DatePicker
              type="date"
              placeholder="请选择日期"
              style="width: 160px;margin-right: .625rem"
              :value="query.startDate"
              v-model="query.startDate"
            ></DatePicker>
            <Button type="primary" @click="handleSubmitClick()">查询</Button>
        </div>
        <div class="item">
            <div class="h3_con">
                <span></span>
                <span class="h3">基础数据</span>
                <span><Button type="primary" @click="handleSubmitClick()">编辑</Button></span>
            </div>
            <div class="table">
                <Table border :columns="query.columns1" :data="query.data1"   ></Table>
            </div>
        </div>
        <div  class="item">
            <div class="h3_con">
                <span></span>
                <span class="h3">直播分析-成交数据</span>
                <span><Button type="primary" @click="handleSubmitClick()">编辑</Button></span>
            </div>
            <div class="table">
                <Table border :columns="query.columns" :data="query.data"   ></Table>
            </div>
        </div>
        <div  class="item">
            <div class="h3_con">
                <span></span>
                <span class="h3">直播分析-互动数据</span>
                <span><Button type="primary" @click="handleSubmitClick()">编辑</Button></span>
            </div>
            <div class="table">
                <Table border :columns="query.columns2" :data="query.data2"   ></Table>
            </div>
        </div>
        <div  class="item">
            <div class="h3_con">
                <span><Button type="primary" @click="handleSubmitClick()">自动生成</Button></span>
                <span class="h3">直播分析-单品TOP10数据</span>
                <span><Button type="primary" @click="handleSubmitClick()">编辑</Button></span>
            </div>
            <div class="table">
                <Table border :columns="query.columns3" :data="query.data3"   ></Table>
            </div>
        </div>
        <div  class="item">
            <div class="h3_con">
                <span></span>
                <span class="h3">直播分析-流量优化数据</span>
                <span><Button type="primary" @click="handleSubmitClick()">编辑</Button></span>
            </div>
            <div class="table">
                <Table border :columns="query.columns4" :data="query.data4"   ></Table>
            </div>
        </div>
        <div  class="item">
            <div class="h3_con">
                <span></span>
                <span class="h3">直播分析-话术内容</span>
                <span><Button type="primary" @click="handleSubmitClick()">编辑</Button></span>
            </div>
            <div class="table">
                <Table border :columns="query.columns5" :data="query.data5"   ></Table>
            </div>
        </div>
      </Card>
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
        startDate:this.$moment().subtract(1,'days').format("YYYY-MM-DD"),
        data: [{
            name:'商品曝光量',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'342342342',
            index:0
        },{
            name:'商品点击量',
            num1:0,
            num2:100,
            num3:30,
            text1:'',
            text2:'',
            index:1
        },{
            name:'商品曝光-点击率',
            num1:50,
            num2:30,
            num3:20,
            text1:'',
            text2:'sdasdad',
            index:2
        },{
            name:'创建订单量',
            num1:0,
            num2:0,
            num3:0,
            text1:'',
            text2:'',
            index:3
        },{
            name:'点击-生单率',
            num1:450,
            num2:56,
            num3:34,
            text1:'',
            text2:'',
            index:4
        },{
            name:'成交量',
            num1:34,
            num2:3,
            num3:4,
            text1:'',
            text2:'',
            index:5,
            cellClassName: {
                num1: 'demo-table-info-cell-num1',
                num2: 'demo-table-info-cell-num1'
            }
        },{
            name:'成交额',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:6,
            cellClassName: {
                num1: 'demo-table-info-cell-num1',
                num2: 'demo-table-info-cell-num1'
            }
        },{
            name:'生单-成交转化率',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:7
        }],
        columns: [
          {
            title: "复盘指标",
            key: "name",
          },
          {
            title: "数据指标",
            key: "num1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num1
            //     },
            //     style: {
            //       width: "150px",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         console.log(value)
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             console.log(index ,params.index)
            //             this.query.data[params.index].num1 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "同比数据",
            key: "num2",
            align: "center",
            className: 'colored',
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num2
            //     },
            //     style: {
            //       width: "150px",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num2 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "同比增长",
            key: "num3",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num3
            //     },
            //     style: {
            //       width: "150px",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num3 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "问题分析",
            key: "text1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text1,
            //                 type:'textarea',
            //                 rows:2
            //             },
            //             style: {
            //                 width: "100%",
            //                 padding:'10px 0'
            //             },
            //             on: {
            //                 input: (val) => {
            //                     console.log(val)
            //                     this.query.data[params.index].text1 =  val
            //                 }
            //             },
            //         });
            //     },
          },
          {
            title: "后续解决",
            key: "text2",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text2,
            //                 type:'textarea',
            //                 rows:2
            //             },
            //             style: {
            //                 width: "100%",
            //             },
            //             on: {
            //                 input: (val) => {
            //                     this.query.data[params.index].text2 =  val
            //                 }
            //             },
            //         });
            //     },
          },
        ],
        data1:[
            {
                name:'刀刀',
                name2:'daodao',
                date:'2023-08-12',
                GMV:2000,
                name3:'100',
                name4:'张三'
            }
        ],
        columns1: [
            {
                title: "平台",
                key: "name",
            },
            {
                title: "主播IP",
                key: "name2",
            },
            {
                title: "直播时间",
                key: "date",
            },
            {
                title: "直播时长（分）",
                key: "name3",
            },
            {
                title: "GMV",
                key: "GMV",
            },
            {
                title: "团队成员",
                key: "name4",
            },
            
        ],
        data2: [{
            name:'曝光值',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'342342342',
            index:0
        },{
            name:'直播间进入量',
            num1:0,
            num2:100,
            num3:30,
            text1:'',
            text2:'',
            index:1
        },{
            name:'直播间曝光-进入率',
            num1:50,
            num2:30,
            num3:20,
            text1:'',
            text2:'sdasdad',
            index:2
        },{
            name:'平均停留时长',
            num1:0,
            num2:0,
            num3:0,
            text1:'',
            text2:'',
            index:3
        },{
            name:'人气高点（最高在线）',
            num1:450,
            num2:56,
            num3:34,
            text1:'',
            text2:'',
            index:4
        },{
            name:'人气低点（最低在线人数）',
            num1:34,
            num2:3,
            num3:4,
            text1:'',
            text2:'',
            index:5,
            
        },{
            name:'新增关注量',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:6,
            
        },{
            name:'新增关注率',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:7
        },{
            name:'评论量',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:8
        },{
            name:'评论率',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:9
        },{
            name:'点赞量',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:10
        },{
            name:'点赞率',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:11
        },{
            name:'新加粉丝团数量',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:12
        },{
            name:'新加团率',
            num1:100,
            num2:200,
            num3:300,
            text1:'',
            text2:'',
            index:13
        }],
        columns2: [
          {
            title: "复盘指标",
            key: "name",
          },
          {
            title: "数据指标",
            key: "num1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num1,
            //       // disabled:params.row.index == 11 ? true : false
            //     },
            //     style: {
            //       width: "150px",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         console.log(value)
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             console.log(index ,params.index)
            //             this.query.data[params.index].num1 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "同比数据",
            key: "num2",
            align: "center",
            min: 0,
            // render: (h, params) => {
          
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num2,
            //       // disabled:params.row.index == 11 ? true : false
            //     },
            //     style: {
            //       width: "150px",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num2 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "同比增长",
            key: "num3",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num3
            //     },
            //     style: {
            //       width: "150px",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num3 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "问题分析",
            key: "text1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text1,
            //                 type:'textarea',
            //                 rows:2
            //             },
            //             style: {
            //                 width: "100%",
            //                 padding:'10px 0'
            //             },
            //             on: {
            //                 input: (val) => {
            //                     console.log(val)
            //                     this.query.data[params.index].text1 =  val
            //                 }
            //             },
            //         });
            //     },
          },
          {
            title: "后续解决",
            key: "text2",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text2,
            //                 type:'textarea',
            //                 rows:2,
                            
            //             },
            //             style: {
            //                 width: "100%",
            //             },
            //             on: {
            //                 input: (val) => {
            //                     this.query.data[params.index].text2 =  val
            //                 }
            //             },
            //         });
            //     },
          },
        ],
        columns3: [
          {
            title: "商品",
            key: "name",
          },
          {
            title: "GMV(按此列排序)",
            key: "num1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num1,
            //       // disabled:params.row.index == 11 ? true : false
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         console.log(value)
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             console.log(index ,params.index)
            //             this.query.data[params.index].num1 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "创建订单量",
            key: "num2",
            align: "center",
            min: 0,
            // render: (h, params) => {
          
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num2,
            //       // disabled:params.row.index == 11 ? true : false
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num2 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "成交量",
            key: "num3",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num3
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num3 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "商品曝光-点击率",
            key: "num4",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num4
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num4 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "商品曝光量",
            key: "num5",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num5
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num5 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "商品点击-生单转化率",
            key: "num6",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num6
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num6 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "商品浏览量",
            key: "num7",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num7
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num7 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "生单-成交转化率",
            key: "num8",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num8
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num8 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "商品问题",
            key: "text1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text1,
            //                 type:'textarea',
            //                 rows:2
            //             },
            //             style: {
            //                 width: "100%",
            //                 padding:'10px 0'
            //             },
            //             on: {
            //                 input: (val) => {
            //                     console.log(val)
            //                     this.query.data[params.index].text1 =  val
            //                 }
            //             },
            //         });
            //     },
          },
        ],
        data3: [{
            name:'商品1',
            num1:100,
            num2:200,
            num3:300,
            num4:300,
            num5:300,
            num6:300,
            num7:300,
            num8:300,
            text1:'112123123',
            index:0
        },{
            name:'商品2',
            num1:100,
            num2:200,
            num3:300,
            num4:300,
            num5:300,
            num6:300,
            num7:300,
            num8:300,
            text1:'112123123',
            index:1
        }],
        data4: [{
            name:'推荐feed',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:0
        },{
            name:'开播通知',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:1
        },{
            name:'分享',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:2
        },{
            name:'直播广场',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:3
        },{
            name:'同城feed',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:4
        },{
            name:'关注tab',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:5
        },{
            name:'其他流量',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:6
        },{
            name:'个人主页',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:7
        },{
            name:'抖音商城',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:8
        },{
            name:'DOU+广告',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:9
        },{
            name:'其他竞价广告',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:10
        },{
            name:'千川PC版',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:11
        },{
            name:'小店随心推',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:12
        },{
            name:'品牌广告',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:13
        },{
            name:'品牌广告-其他',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:14
        },{
            name:'微信豆',
            num1:100,
            num2:200,
            num3:300,
            text1:'112123123',
            text2:'112123123',
            index:15
        }],
        columns4: [
          {
            title: "流量来源",
            key: "name",
          },
          {
            title: "所占比例",
            key: "num1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num1,
            //       // disabled:params.row.index == 11 ? true : false
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         console.log(value)
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             console.log(index ,params.index)
            //             this.query.data[params.index].num1 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "引流人数",
            key: "num2",
            align: "center",
            min: 0,
            // render: (h, params) => {
          
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num2,
            //       // disabled:params.row.index == 11 ? true : false
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num2 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          {
            title: "上一场引流人数/上一场占比对比",
            key: "num3",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //   return h("InputNumber", {
            //     props: {
            //       value: params.row.num3
            //     },
            //     style: {
            //       width: "100%",
            //     },
            //     on: {
            //       "on-change": (value) => {
            //         this.query.data.map((item,index)=>{
            //           if(index=== params.index){
            //             this.query.data[params.index].num3 = value;
            //           }
            //         })
            //       },
            //     },
            //   });
            // },
          },
          
          {
            title: "问题分析",
            key: "text1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text1,
            //                 type:'textarea',
            //                 rows:2
            //             },
            //             style: {
            //                 width: "100%",
            //                 padding:'10px 0'
            //             },
            //             on: {
            //                 input: (val) => {
            //                     console.log(val)
            //                     this.query.data[params.index].text1 =  val
            //                 }
            //             },
            //         });
            //     },
          },
          {
            title: "后续解决方案",
            key: "text2",
            align: "center",
            min: 0,
            render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.text2,
                            type:'textarea',
                            rows:2
                        },
                        style: {
                            width: "100%",
                            padding:'10px 0'
                        },
                        on: {
                            input: (val) => {
                                this.query.data[params.index].text2 =  val
                            }
                        },
                    });
                },
          },
        ],
        data5:[{
            name:'互动是否给观众理由',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:0
        },{
            name:'互动频率是否足够',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:1
        },{
            name:'互动环节操作是否麻烦',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:2
        },{
            name:'是否按照四环节进行介绍',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:3
        },{
            name:'是否通过场景化描述进行介绍',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:4
        },{
            name:'是否有效体现客户需求及痛点',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:5
        },{
            name:'控场话术是否有效',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:6
        },{
            name:'话术是否出现重大失误',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:7
        },{
            name:'话术是否出现违规行为',
            text1:'112123123',
            text2:'112123123',
            text3:'112123123',
            text4:'112123123',
            index:8
        }],
        columns5: [
          {
            title: "流量来源",
            key: "name",
          },
          {
            title: "复盘内容",
            key: "text1",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text1,
            //                 type:'textarea',
            //                 rows:5
            //             },
            //             style: {
            //                 width: "100%",
            //                 padding:'10px 0'
            //             },
            //             on: {
            //                 input: (val) => {
            //                     console.log(val)
            //                     this.query.data[params.index].text1 =  val
            //                 }
            //             },
            //         });
            //     },
          },
          {
            title: "话术表现",
            key: "text2",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text2,
            //                 type:'textarea',
            //                 rows:5
            //             },
            //             style: {
            //                 width: "100%",
            //                 padding:'10px 0'
            //             },
            //             on: {
            //                 input: (val) => {
            //                     console.log(val)
            //                     this.query.data[params.index].text2 =  val
            //                 }
            //             },
            //         });
            //     },
          },
          {
            title: "问题分析",
            key: "text3",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text3,
            //                 type:'textarea',
            //                 rows:5
            //             },
            //             style: {
            //                 width: "100%",
            //                 padding:'10px 0'
            //             },
            //             on: {
            //                 input: (val) => {
            //                     console.log(val)
            //                     this.query.data[params.index].text3 =  val
            //                 }
            //             },
            //         });
            //     },
          },
          {
            title: "后续解决方案",
            key: "text4",
            align: "center",
            min: 0,
            // render: (h, params) => {
            //         return h("Input", {
            //             props: {
            //                 value: params.row.text4,
            //                 type:'textarea',
            //                 rows:5
            //             },
            //             style: {
            //                 width: "100%",
            //                 padding:'10px 0'
            //             },
            //             on: {
            //                 input: (val) => {
            //                     console.log(val)
            //                     this.query.data[params.index].text4 =  val
            //                 }
            //             },
            //         });
            //     },
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
  created(){
    //给同比数据那一列添加颜色
    this.query.columns[2].className = "colored";
    // this.query.columns[1]
    console.log(this.query.columns[2])
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
<style scoped lang="less">
.h3_con{
    display: flex;
    justify-content: space-between;
}
.h3{
    font-size: 24px;
    margin-bottom: 10px;
    color: #000;

}
.item{
    margin-bottom: 40px;
}
/deep/.ivu-table td.colored{
    color: orange;
}


/deep/.ivu-table .demo-table-info-cell-num1 {
    color: orange;
}
// /deep/.ivu-input-number-input-wrap .ivu-input-number-input{
// color: orange;
// }

</style>
