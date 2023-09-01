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
      <Table border :columns="query.columns2" :data="query.data2"  ref="flowTable"></Table>
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
        <Button type="primary" @click="getAutoLiveReplayFlowOptimize">自动填写</Button>
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/liveReplay";

export default {
  props: {
    flowModel: Boolean,
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
            title: "流量来源",
            key: "flowSource",
          },
          {
            title: "引流人数",
            key: "drainageCount",
            align: "center",
            className: "colored",
          },
          {
            title: "所占比例(%)",
            key: "proportion",
            align: "center",
          },
          {
            title: "上一场引流人数",
            key: "lastDrainageCount",
            align: "center",
          },
          {
            title: "上一场占比对比(%)",
            key: "lastDrainageProportion",
            align: "center",
          },
          {
            title: "问题分析",
            key: "problemAnalysis",
            align: "center",
          },
          {
            title: "后续解决方案",
            key: "laterSolution",
            align: "center",
          },
        ],
        columns2: [
          {
            title: "流量来源",
            key: "flowSource",
          },
          
          {
            title: "引流人数",
            key: "drainageCount",
            align: "center",
            className: "colored",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.drainageCount,
                  disabled:params.row.flowSource == '总场观'
                },
                style: {
                  width: "150px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2[params.index].drainageCount = value;
                    this.lastLivingDataNum()
                  },
                },
              });
            },
          },
          {
            title: "所占比例(%)",
            key: "proportion",
            align: "center",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.proportion,
                  disabled:true 
                },
                style: {
                  width: "150px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].proportion = value;
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "上一场引流人数",
            key: "lastDrainageCount",
            align: "center",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.lastDrainageCount,
                  disabled:params.row.flowSource == '总场观'
                },
                style: {
                  width: "150px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2[params.index].lastDrainageCount = value;
                    this.lastLivingDataNum()
                  },
                },
              });
            },
          },
          {
            title: "上一场占比对比(%)",
            key: "lastDrainageProportion",
            align: "center",
            min: 0,
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.lastDrainageProportion,
                  disabled:true 
                },
                style: {
                  width: "150px",
                },
                on: {
                  "on-change": (value) => {
                    this.query.data2.map((item,index)=>{
                      if(index=== params.index){
                        this.query.data2[params.index].lastDrainageProportion = value;
                      }
                    })
                  },
                },
              });
            },
          },
          {
            title: "问题分析",
            key: "problemAnalysis",
            align: "center",
            render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.problemAnalysis,
                            type:'textarea',
                            rows:2
                        },
                        style: {
                            width: "100%",
                            padding:'10px 0'
                        },
                        on: {
                            input: (val) => {
                                this.query.data2[params.index].problemAnalysis =  val
                            }
                        },
                    });
                },
          },
          {
            title: "后续解决方案",
            key: "laterSolution",
            align: "center",
            render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.laterSolution,
                            type:'textarea',
                            rows:2
                        },
                        style: {
                            width: "100%",
                        },
                        on: {
                            input: (val) => {
                                this.query.data2[params.index].laterSolution =  val
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
        let allNum = 0
        let allNum2 = 0
        this.query.data2.map((item,index)=>{
            if(item.sort!=1){
              // 计算总场次
                allNum+=Number(item.drainageCount)
                // 计算总的上一场引流人数
                allNum2+=Number(item.lastDrainageCount)
                this.query.data2[0].drainageCount = allNum
                this.query.data2[0].lastDrainageCount = allNum2
            }
        })
        this.query.data2.map((item,index)=>{
            // 计算上一场占比对比
            if(item.lastDrainageCount !=0){
                // 引流人数-上一场引流人数）/上一场引流人数*100  保留2位小数
                let num = (((item.drainageCount - item.lastDrainageCount)/item.lastDrainageCount)*100).toFixed(2)
                // item.lastLivingCompare = Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
                if(num < 0 ){
                    item.lastDrainageProportion =   Math.floor(num * 100) / 100 <-100 ? -100 : Math.floor(num * 100) / 100
                }else{
                    item.lastDrainageProportion =   Math.floor(num * 100) / 100 >100 ? 100 : Math.floor(num * 100) / 100
                }
            }else{
              item.lastDrainageProportion = 0
            }
            // 计算所占比例  引流人数/总场观*100
            if(allNum == 0){
                item.proportion = 0
            }else{
                // 引流人数/总场观*100
                let num2 = (item.drainageCount/allNum*100).toFixed(2)
                if(num2 < 0 ){
                    item.proportion =   Math.floor(num2 * 100) / 100 <-100 ? -100 : Math.floor(num2 * 100) / 100
                }else{
                    item.proportion =   Math.floor(num2 * 100) / 100 >100 ? 100 : Math.floor(num2 * 100) / 100
                }
            }
        })
    },
    // 成交数据 自动填写
    getAutoLiveReplayFlowOptimize(){
      const data = {
        replayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
      }
      api.LiveReplayFlowOptimize(data).then(res=>{
        if(res.code === 0){
          const {liveReplayFlowOptimizeDataVoList} = res.data.data
          if(liveReplayFlowOptimizeDataVoList){
            // 取同比数据
            liveReplayFlowOptimizeDataVoList.map((item,index)=>{
                this.query.data2[index].lastDrainageCount = item.lastDrainageCount
            })
          }
          
          //计算同比值
          this.lastLivingDataNum()
        }
      })
    },
    // 获取编辑基础数据
    getData(){
      this.query.data2 =  [
          {
            flowSource: "总场观",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 0,
            sort:1,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "推荐feed",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 1,
            sort:2,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "开播通知(视频号)",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 2,
            sort:3,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "分享(视频号)",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 3,
            sort:4,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "直播广场(抖音)",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 4,
            sort:5,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "同城feed",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 5,
            sort:6,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
            
          },
          {
            flowSource: "关注tab",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 6,
            sort:7,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "其他流量",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 7,
            sort:8,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "短视频引流",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 8,
            sort:9,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "个人主页",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 9,
            sort:10,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "抖音商城(抖音)",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 10,
            sort:11,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "DOU+广告(抖音)",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 11,
            sort:12,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "其他竞价广告",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 12,
            sort:13,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "千川PC版(抖音)",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 13,
            sort:14,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "小店随心推",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 14,
            sort:15,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "品牌广告",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 15,
            sort:16,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "品牌广告-其他",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 16,
            sort:17,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            flowSource: "微信豆(视频号)",
            proportion: 0,
            drainageCount: 0,
            lastDrainageCount: 0,
            lastDrainageProportion: 0,
            problemAnalysis: "",
            laterSolution: "",
            index: 17,
            sort:18,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          }
        ]
    },
    // 添加数据
    addClick(){
      this.isLoading = true
        api.addLiveReplayFlowOptimize(this.query.data2).then((res) => {
            if(res.code === 0){
              this.isLoading = false
                this.cancelSubmit()
                this.$Message.success('修改成功！')
                // this.getLiveReplayFlowOptimize()
            }else {
                setTimeout(() => {
                  this.isLoading = false;
                }, 3000);
              }
        })
    },  
    // 获取直播分析流量优化列表
    getLiveReplayFlowOptimize() {
      const data = {
        liveReplayId: sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : '',
        valid:true

      };
      api.getLiveReplayFlowOptimize(data).then((res) => {
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
        this.$emit("update:flowModel", false);
         this.getData()
         this.getLiveReplayFlowOptimize()
      }
    },
    // 取消
    cancelSubmit(){
        this.control = false
        this.$emit("update:flowModel", false);
        this.getData()
        // this.getLiveReplayFlowOptimize()
    },
    // 确认
    handleSubmit(){
        const data ={
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
        }
        // 先删除数据 再进去添加数据
        api.deleteLiveReplayFlowOptimize(data).then((res) => {
            if(res.code === 0){
                this.addClick()
            }
        })
        
    }
  },
  watch: {
    flowModel(value) {
      this.control = value;
    },
    
  },
};
</script>
