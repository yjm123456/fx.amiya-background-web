<template>
  <div>
    <Table border :columns="query.columns" :data="query.data"></Table>
    <Modal
      v-model="control"
      title="编辑"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="80%"
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
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/liveReplay";

export default {
  props: {
    contentModel: Boolean,
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
            title: "复盘内容",
            key: "replayContent",
          },
          {
            title: "话术表现",
            key: "wordManifestation",
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
            title: "复盘内容",
            key: "replayContent",
          },
          {
            title: "话术表现",
            key: "wordManifestation",
            align: "center",
            render: (h, params) => {
                    return h("Input", {
                        props: {
                            value: params.row.wordManifestation,
                            type:'textarea',
                            rows:2
                        },
                        style: {
                            width: "100%",
                            padding:'10px 0'
                        },
                        on: {
                            input: (val) => {
                                this.query.data2[params.index].wordManifestation =  val
                            }
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
    // 获取编辑基础数据
    getData(){
      this.query.data2 = [
          {
            replayContent: "互动是否给观众理由",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 0,
            sort:1,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayContent: "互动频率是否足够",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 1,
            sort:2,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayContent: "互动环节操作是否麻烦",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 2,
            sort:3,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayContent: "是否按照四环节进行介绍",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 3,
            sort:4,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayContent: "是否通过场景化描述进行介绍",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 4,
            sort:5,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayContent: "是否有效体现客户需求及痛点",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 5,
            sort:6,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayContent: "控场话术是否有效",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 6,
            sort:7,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayContent: "话术是否出现重大失误",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 7,
            sort:8,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
          {
            replayContent: "话术是否出现违规行为",
            wordManifestation: "",
            problemAnalysis: "",
            laterSolution: "",
            index: 8,
            sort:9,
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
          },
         ]
    },
    // 添加数据
    addClick(){
      this.isLoading = true;
        api.addLiveReplayWordAnalyse(this.query.data2).then((res) => {
            if(res.code === 0){
              this.isLoading = false;
                this.cancelSubmit()
                this.$Message.success('修改成功！')
                // this.getLiveReplayWordAnalyse()
            }else {
              setTimeout(() => {
                this.isLoading = false;
              }, 3000);
            }
        })
    },  
    // 获取复盘基础信息列表
    getLiveReplayWordAnalyse() {
      const data = {
        liveReplayId: sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : '',
        valid:true

      };
      api.getLiveReplayWordAnalyse(data).then((res) => {
        if (res.code === 0) {
          const { data } = res.data;
           this.query.data = data;
           if(data.length == 0|| data == []){
            this.getData()
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
        this.$emit("update:contentModel", false);
         this.getData()
         this.getLiveReplayWordAnalyse()
      }
    },
    // 取消
    cancelSubmit(){
        this.control = false
        this.$emit("update:contentModel", false);
        this.getData()
        // this.getLiveReplayWordAnalyse()
    },
    // 确认
    handleSubmit(){
        const data ={
            liveReplayId:sessionStorage.getItem('mainId') ? sessionStorage.getItem('mainId') : ''
        }
        // 先删除数据 再进去添加数据
        api.deleteLiveReplayWordAnalyse(data).then((res) => {
            if(res.code === 0){
                this.addClick()
            }
        })
        
    }
  },
  watch: {
    contentModel(value) {
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
