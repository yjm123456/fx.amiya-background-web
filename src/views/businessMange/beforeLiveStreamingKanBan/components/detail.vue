<template>
  <div class="content">
    <Modal
      title="详情"
      footer-hide
      v-model="control"
      width="80%"
      @on-visible-change="handleModalChange"
    >
      <div>
            <Table border :columns="query.columns" :data="query.data"></Table>
            <div class="footer">
                <Button @click="cancel" style="margin-top: 10px">关闭页面</Button>
            </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
export default {
  components:{
      
  },
  props: {
    detailModel:Boolean,
    params:Object
  },
  data() {
    return {
      control:false,
      query:{
        columns: [
          {
            title: "主播IP",
            key: "liveanchorIP",
            minWidth: 200,
            tooltip: true,
            align: "center",
          },
         
          {
            title: "累计线索",
            key: "clueCount",
            minWidth: 180,
            align: "center",
            tooltip: true,
          },
          
          {
            title: "去年同比",
            key: "yearOnYear",
            minWidth: 180,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.yearOnYear ? params.row.yearOnYear + '%' : '0%'
              );
            },
          },
         
          {
            title: "上月环比",
            key: "chain",
            minWidth: 180,
            tooltip:true,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.point ? params.row.point + '%' : '0%'
              );
            },
          },
          {
            title: "目标完成率",
            key: "targetComplete",
            minWidth: 300,
            tooltip:true,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.targetComplete ? params.row.targetComplete + '%' : '0%'
              );
            },
          },
        ],
        data:[]
      }
    };
  },
  methods: {
    
   
    // 获取部门详情
    getBeforeLiveLiveanchorIPDataClick() {
      const { startDate, endDate ,assistantId} = this.params;
      const data = {
        startDate:startDate ? this.$moment(startDate).format("YYYY-MM-DD") : null,
        endDate:endDate ? this.$moment(endDate).format("YYYY-MM-DD") : null,
        assistantId
      };
      api.getBeforeLiveLiveanchorIPData(data).then((res) => {
            if (res.code === 0) {
            this.query.data = res.data.data;
            }
        });
      
    },

    
    // 取消
    cancel(name) {
      this.$emit("update:detailModel", false);
    },

    handleModalChange(value) {
      if (!value) {
        this.$emit("update:detailModel", false);
      }
    },
  },
  watch: {
    detailModel(value) {
        this.control = value
        if(value == true){
            this.getBeforeLiveLiveanchorIPDataClick()
        }
      
    },
  },
};
</script>
<style scoped lang="less">
.page{
    display: flex;
    margin: 20px 0;
    justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.img {
  width: 100%;
  height: auto;
}
</style>
