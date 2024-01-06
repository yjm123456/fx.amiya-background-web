<template>
  <div>
    <Table border :columns="query.columns" :data="query.data"></Table>
    <Modal
      v-model="control"
      title="编辑"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="85%"
    >
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
        <Button type="primary" @click="getAutoLiveReplayProductDealData">自动填写</Button>
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/liveReplay";

export default {
  props: {
    dealDataModel: Boolean,
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
            title: "复盘指标",
            key: "replayTarget",
          },
          {
            title: "数据指标",
            key: "dataTarget",
            align: "center",
          },
          {
            title: "同比数据",
            key: "lastLivingData",
            align: "center",
            className: "colored",
          },
          {
            title: "同比增长(%)",
            key: "lastLivingCompare",
            align: "center",
          },
          {
            title: "问题分析",
            key: "questionAnalize",
            align: "center",
          },
          {
            title: "后续解决",
            key: "laterPeriodSolution",
            align: "center",
          },
        ],
        columns2: [
          {
            title: "复盘指标",
            key: "replayTarget",
          },
          {
            title: "数据指标",
            key: "dataTarget",
            align: "center",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.dataTarget,
                  disabled:params.row.replayTarget == '商品曝光-点击率(%)' || params.row.replayTarget == '商品曝光-点击率' || params.row.replayTarget == '点击-生单率(%)' || params.row.replayTarget == '点击-生单率' || params.row.replayTarget == '生单-成交转化率(%)' || params.row.replayTarget == '生单-成交转化率' 
                },
                style: {
                  width: "150px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].dataTarget = value;
                        this.lastLivingDataNum()
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "同比数据",
            key: "lastLivingData",
            align: "center",
            className: "colored",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.lastLivingData,
                   
                },
                style: {
                  width: "150px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].lastLivingData = value;
                        this.lastLivingDataNum()
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "同比增长(%)",
            key: "lastLivingCompare",
            align: "center",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.lastLivingCompare,
                  disabled:true
                },
                style: {
                  width: "150px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].lastLivingCompare = value;
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "问题分析",
            key: "questionAnalize",
            align: "center",
            render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.questionAnalize,
                            type:'textarea',
                            rows:2
                        },
                        style: {
                            width: "100%",
                            padding:'10px 0'
                        },
                        on: {
                            input: (val) => {
                                this.query.data2[params.index].questionAnalize =  val
                            }
                        },
                    });
                },
          },
          {
            title: "后续解决",
            key: "laterPeriodSolution",
            align: "center",
            render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.laterPeriodSolution,
                            type:'textarea',
                            rows:2
                        },
                        style: {
                            width: "100%",
                        },
                        on: {
                            input: (val) => {
                                this.query.data2[params.index].laterPeriodSolution =  val
                            }
                        },
                    });
                },
          },
        ],
      },
    };
  },
  methods: {
    // 计算同比数据
    lastLivingDataNum(){
      this.query.data2.map((item,index)=>{
        // 同比增长计算（当前数值-同比数值）/同比数值*100 保留2位小数
        if(item.lastLivingData !=0){
          let num = (((item.dataTarget - item.lastLivingData)/item.lastLivingData)*100).toFixed(2)
          // item.lastLivingCompare = Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
          if(num < 0 ){
              item.lastLivingCompare =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
          }else{
              item.lastLivingCompare =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
          }
        }else{
          item.lastLivingCompare = 0
        }
        // 商品曝光-点击率(%)
        if(this.query.data2[0].dataTarget !=0){
          let num1 = (this.query.data2[1].dataTarget/this.query.data2[0].dataTarget*100).toFixed(2)
          // item.lastLivingCompare = Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
          if(num1 < 0 ){
              this.query.data2[2].dataTarget =   Math.floor(num1 * 100) / 100 <-100 ? -100 : Math.floor(num1 * 100) / 100
          }else{
              this.query.data2[2].dataTarget =   Math.floor(num1 * 100) / 100 >100 ? 100 : Math.floor(num1 * 100) / 100
          }
        }else{
          this.query.data2[2].dataTarget = 0
        }

        // // 点击-生单率(%)
        if(this.query.data2[1].dataTarget !=0){
          let num2 = (this.query.data2[3].dataTarget/this.query.data2[1].dataTarget*100).toFixed(2)
          // item.lastLivingCompare = Math.floor(num2 * 100) / 100 >100 ? 100 : Math.floor(num2 * 100) / 100
          if(num2 < 0 ){
              this.query.data2[4].dataTarget =   Math.floor(num2 * 100) / 100 <-100 ? -100 : Math.floor(num2 * 100) / 100
          }else{
              this.query.data2[4].dataTarget =   Math.floor(num2 * 100) / 100 >100 ? 100 : Math.floor(num2 * 100) / 100
          }
        }else{
          this.query.data2[4].dataTarget = 0
        }
        //生单-成交转化率(%)
        if(this.query.data2[3].dataTarget !=0){
          let num2 = (this.query.data2[5].dataTarget/this.query.data2[3].dataTarget*100).toFixed(2)
          // item.lastLivingCompare = Math.floor(num2 * 100) / 100 >100 ? 100 : Math.floor(num2 * 100) / 100
          if(num2 < 0 ){
              this.query.data2[7].dataTarget =   Math.floor(num2 * 100) / 100 <-100 ? -100 : Math.floor(num2 * 100) / 100
          }else{
              this.query.data2[7].dataTarget =   Math.floor(num2 * 100) / 100 >100 ? 100 : Math.floor(num2 * 100) / 100
          }
        }else{
          this.query.data2[7].dataTarget = 0
        }
    })
    },
    // 成交数据 自动填写
    getAutoLiveReplayProductDealData(){
      const data = {
        replayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
      }
      api.LiveReplayProductDealData(data).then(res=>{
        if(res.code === 0){
          const {dealNum,dealPrice,liveReplayInfoProductDealDataVoList} = res.data.data
          this.query.data2[5].dataTarget = dealNum
          this.query.data2[6].dataTarget = dealPrice
          // 取同比数据
          liveReplayInfoProductDealDataVoList.map((item,index)=>{
            this.query.data2[index].lastLivingData = item.dataTarget
          })
          //计算同比值
          this.lastLivingDataNum()
        }
      })
    },
    // 获取编辑基础数据
    getData(){
      this.query.data2 = [
          {
            replayTarget: "商品曝光量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            index: 0,
            sort:1,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "商品点击量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            index: 1,
            sort:2,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "商品曝光-点击率(%)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            index: 2,
            sort:3,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "创建订单量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            index: 3,
            sort:4,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "点击-生单率(%)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            index: 4,
            sort:5,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "成交量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            index: 5,
            sort:6,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
            
          },
          {
            replayTarget: "成交额",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            index: 6,
            sort:7,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "生单-成交转化率(%)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            index: 7,
            sort:8,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
         ]
    },
    // 添加数据
    addClick(){
      this.isLoading = true;
        api.addLiveReplayProductDealData(this.query.data2).then((res) => {
            if(res.code === 0){
              this.isLoading = false;
                this.cancelSubmit()
                this.$Message.success('修改成功！')
                // this.getLiveReplayProductDealData()
            }else {
              setTimeout(() => {
                this.isLoading = false;
              }, 3000);
            }
        })
    },  
    // 获取复盘基础信息列表
    getLiveReplayProductDealData() {
      const data = {
        liveReplayId: sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : '',
        valid:true

      };
      api.getLiveReplayProductDealData(data).then((res) => {
        if (res.code === 0) {
          const { data } = res.data;
           this.query.data = data;

           if(data.length == 0|| data == []){
            this.getData()
            return
           }else{
            this.query.data2 = data;
            // 计算同比值
            // this.lastLivingDataNum()
           }
        }
      });
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.control = false
        this.$emit("update:dealDataModel", false);
         this.getData()
         this.getLiveReplayProductDealData()
      }
    },
    // 取消
    cancelSubmit(){
        this.control = false
        this.$emit("update:dealDataModel", false);
        this.getData()
        // this.getLiveReplayProductDealData()
    },
    // 确认
    handleSubmit(){
        const data ={
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
        }
        // 先删除数据 再进去添加数据
        api.deleteLiveReplayProductDealData(data).then((res) => {
            if(res.code === 0){
                this.addClick()
            }
        })
        
    }
  },
  watch: {
    dealDataModel(value) {
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
