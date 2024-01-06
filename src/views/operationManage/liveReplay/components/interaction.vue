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
        <Button type="primary" @click="getAutoLiveReplayInteractionlData">自动填写</Button>
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/liveReplay";

export default {
  props: {
    interactionModel: Boolean,
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
                  disabled:params.row.replayTarget == '直播间曝光-进入率(%)' || params.row.replayTarget == '直播间曝光-进入率' || params.row.replayTarget == '新增关注率(%)' || params.row.replayTarget == '新增关注率' || params.row.replayTarget == '评论率(%)' || params.row.replayTarget == '评论率' || params.row.replayTarget == '点赞率(%)' || params.row.replayTarget == '点赞率'|| params.row.replayTarget == '新加团率(%)' || params.row.replayTarget == '新加团率'
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
                  value: params.row.lastLivingData
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
    // 计算数据
    lastLivingDataNum(){
      this.query.data2.map((item,index)=>{
        // （当前数值-同比数值）/同比数值*100 保留2位小数
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
          // 计算曝光值
          if(this.query.data2[0].dataTarget !=0){
            let num = (this.query.data2[1].dataTarget/this.query.data2[0].dataTarget*100).toFixed(2)
            // item.lastLivingCompare = Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            if(num < 0 ){
                this.query.data2[2].dataTarget =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
            }else{
                this.query.data2[2].dataTarget =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            }
          }else{
            this.query.data2[2].dataTarget = 0
          }

          // 计算新增关注率
          // if(item.sort == 7){
            if(this.query.data2[1].dataTarget !=0){
              let num = (this.query.data2[6].dataTarget/this.query.data2[1].dataTarget*100).toFixed(2)
              // item.lastLivingCompare = Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
              if(num < 0 ){
                  this.query.data2[7].dataTarget =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
              }else{
                  this.query.data2[7].dataTarget =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
              }
            }else{
              this.query.data2[7].dataTarget = 0
            }
          // }

          // 计算评论率
          if(this.query.data2[1].dataTarget !=0){
            let num = (this.query.data2[8].dataTarget/this.query.data2[1].dataTarget*100).toFixed(2)
            // item.lastLivingCompare = Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            if(num < 0 ){
                this.query.data2[9].dataTarget =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
            }else{
                this.query.data2[9].dataTarget =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            }
          }else{
            this.query.data2[9].dataTarget = 0
          }

          // 计算点赞率
          if(this.query.data2[1].dataTarget !=0){
            let num = (this.query.data2[10].dataTarget/this.query.data2[1].dataTarget*100).toFixed(2)
            // item.lastLivingCompare = Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            if(num < 0 ){
                this.query.data2[11].dataTarget =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
            }else{
                this.query.data2[11].dataTarget =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            }
          }else{
            this.query.data2[11].dataTarget = 0
          }

          // 计算新加团率
          if(this.query.data2[1].dataTarget !=0){
            let num = (this.query.data2[12].dataTarget/this.query.data2[1].dataTarget*100).toFixed(2)
            // item.lastLivingCompare = Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            if(num < 0 ){
                this.query.data2[13].dataTarget =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
            }else{
                this.query.data2[13].dataTarget =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
            }
          }else{
            this.query.data2[13].dataTarget = 0
          }
          
          
          
          
      })
    },
    // 互动数据 自动填写
    getAutoLiveReplayInteractionlData(){
      const data = {
        replayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
      }
      api.LiveReplayInteractionlData(data).then(res=>{
        if(res.code === 0){
          const {liveReplayInfoInteractionlDataVoList} = res.data.data
          // 取同比数据
          liveReplayInfoInteractionlDataVoList.map((item,index)=>{
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
            replayTarget: "曝光值",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:1,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "直播间进入量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:2,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "直播间曝光-进入率(%)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:3,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "平均停留时长(min)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:4,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "人气高点（最高在线）",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:5,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "人气低点（最低在线人数）",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:6,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "新增关注量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:7,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
            
          },
          {
            replayTarget: "新增关注率(%)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:8,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "评论量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:9,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "评论率(%)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:10,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "点赞量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:11,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "点赞率(%)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:12,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "新加粉丝团数量",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:13,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayTarget: "新加团率(%)",
            dataTarget: 0,
            lastLivingData: 0,
            lastLivingCompare: 0,
            questionAnalize: "",
            laterPeriodSolution: "",
            sort:14,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },

         ]
    },
    // 添加数据
    addClick(){
      this.isLoading = true;
        api.addLiveReplayInteractionlData(this.query.data2).then((res) => {
            if(res.code === 0){
              this.isLoading = false;
                this.cancelSubmit()
                this.$Message.success('修改成功！')
                // this.getLiveReplayInteractionlData()
            }else {
                setTimeout(() => {
                  this.isLoading = false;
                }, 3000);
              }
        })
    },  
    // 获取复盘基础信息列表
    getLiveReplayInteractionlData() {
      const data = {
        liveReplayId: sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : '',
        valid:true

      };
      api.getLiveReplayInteractionlData(data).then((res) => {
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
        this.$emit("update:interactionModel", false);
         this.getData()
         this.getLiveReplayInteractionlData()
      }
    },
    // 取消
    cancelSubmit(){
        this.control = false
        this.$emit("update:interactionModel", false);
        this.getData()
        //  this.getLiveReplayInteractionlData()
    },
    // 确认
    handleSubmit(){
        const data ={
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
        }
        // 先删除数据 再进去添加数据
        api.deleteLiveReplayInteractionlData(data).then((res) => {
            if(res.code === 0){
                this.addClick()
            }
        })
        
    }
  },
  watch: {
    interactionModel(value) {
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
