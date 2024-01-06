<template>
  <div>
    <Modal
      v-model="beatingAndCuttingGroupModels"
      title="拍剪组数据报表"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="100%"
      fullscreen
    >
      <DatePicker
        type="date"
        placeholder="开始日期"
        style="width: 160px;"
        :value="query.startDate"
        v-model="query.startDate"
      ></DatePicker>
      <DatePicker
        type="date"
        placeholder="结束日期"
        style="width: 160px; margin-left: 10px"
        :value="query.endDate"
        v-model="query.endDate"
      ></DatePicker>
      <Select
        v-model="query.contentPlatFormId"
        placeholder="请选择主播平台"
        @on-change="contentPlateChange(query.contentPlatFormId)"
        style="width: 180px; margin-left: 10px"
      >
        <Option
          v-for="item in contentPalteForms"
          :value="item.id"
          :key="item.id"
          >{{ item.contentPlatformName }}</Option
        >
      </Select>
      <Select
        v-model="query.liveAnchorId"
        placeholder="请选择主播IP账号"
        style="width: 180px; margin-left: 10px"
        :disabled="query.contentPlatFormId == null"
      >
        <Option v-for="item in liveAnchors" :value="item.id" :key="item.id">{{
          item.hostAccountName
        }}</Option>
      </Select>
      <Select
        v-model="query.shootingEmpId"
        placeholder="请选择拍摄人员"
        style="width: 180px; margin-left: 10px"
      >
        <Option v-for="item in employeeAll" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Select
        v-model="query.clipEmpId"
        placeholder="请选择剪辑人员"
        style="width: 180px; margin-left: 10px"
      >
        <Option v-for="item in employee2All" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Button type="primary" style="margin:0 10px" @click="getbeatingAndCuttingGroup">查询</Button>
      <Button type="primary" @click="exportsendOrder"  v-has="{ role: ['fx.amiya.permission.EXPORT'] }">导出</Button>
      <Card class="container">
        <div>
            <Table border :columns="query.columns" :data="query.data" height="700"></Table>
        </div>
       </Card>
        <div slot="footer" class=" foot">
          <div style="display:flex">
            <div class="num">总条数：<div style="color:red">{{pageCount}}</div></div>
          </div>
          <Button @click="cancelSubmits()">关闭页面</Button>
          <!-- <Button type="primary" @click="handleSubmit()">确定</Button> -->
        </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";
import * as pattingScissorsApi from "@/api/shootingAndClip";
import { download } from "@/utils/util";
export default {
  props: {
    beatingAndCuttingGroupModel: {
        type: Boolean,
    },
    contentPalteForms: {
      type: Array,
    },
  },
  data() {
    return{
        beatingAndCuttingGroupModels:false,
        pageCount:0,
        query:{
          startDate:this.$moment().startOf('month').format("YYYY-MM-DD"),
          endDate:this.$moment(new Date()).format("YYYY-MM-DD"),
          shootingEmpId:-1,
          clipEmpId:-1,
          liveAnchorId:null,
          columns: [
            
            {
                title: "登记日期",
                key: "recordDate",
                minWidth: 140,
                align: "center",
                render: (h, params) => {
                    return h(
                        "div",
                        params.row.recordDate ? this.$moment(params.row.recordDate).format("YYYY-MM-DD") : ''
                    );
                },
            },
            {
              title: "拍摄人员",
              key: "shootingEmpName",
              minWidth: 160,
              align: "center",
            },
            {
              title: "剪辑人员",
              key: "clipEmpName",
              minWidth: 160,
              align: "center",
            },
            {
                title: "主播",
                key: "liveAnchorName",
                minWidth: 130,
                align:'center'
            },
            {
                title: "视频标题",
                key: "title",
                minWidth: 160,
                align:'center'
            },
            {
                title: "视频类型",
                key: "videoType",
                minWidth: 160,
                align:'center'
            },
            
            {
                title: "创建日期",
                key: "createDate",
                align: "center",
                minWidth: 140,
                render: (h, params) => {
                    return h(
                        "div",
                        this.$moment(params.row.createDate).format("YYYY-MM-DD")
                    );
                },
            },
          ],
          data: [],
        },
        employeeAll: [{ id: -1, name: "全部拍摄人员" }],
        employee2All: [{ id: -1, name: "全部剪辑人员" }],
        liveAnchors: [],
    }
  },
  methods:{
    contentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
    },
    // 根据平台id去获取IP账号
    getLiveValidList(value) {
      const data = {
        contentPlatFormId: value,
      };
      api.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.liveAnchors = liveAnchors;
        }
      });
    },
    // 获取拍摄人员
    getEmployeeByPositionId(value) {
      const data = {
        positionId: 27,
      };
      pattingScissorsApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employeeAll = [...this.employeeAll, ...employee];
        }
      });
    },
    // 获取剪辑人员
    getEmployeeByPositionId2(value) {
      const data = {
        positionId: 28,
      };
      pattingScissorsApi.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.employee2All = [...this.employee2All, ...employee];
        }
      });
    },
    // 获取拍剪组报表
    getbeatingAndCuttingGroup() {
      const { startDate,endDate,shootingEmpId,clipEmpId,liveAnchorId } = this.query;
      const data = { 
            startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
            endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
            shootingEmpId : shootingEmpId == -1 ? null : shootingEmpId,
            clipEmpId:clipEmpId == -1 ? null : clipEmpId,
            liveAnchorId
        };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      api.shootingAndClipReport(data).then((res) => {
        if (res.code === 0) {
          const { customerSendOrderReport} = res.data;
          this.query.data = customerSendOrderReport;
          this.pageCount = this.query.data.length
        }
      });
    },
    // 导出
    exportsendOrder(){
      const { startDate,endDate,shootingEmpId,clipEmpId,liveAnchorId} = this.query;
      const data = { 
        startDate: this.$moment(startDate).format("YYYY-MM-DD")  ,
        endDate  :endDate ? this.$moment(endDate).format("YYYY-MM-DD") : "",
        shootingEmpId : shootingEmpId == -1 ? null : shootingEmpId,
            clipEmpId:clipEmpId == -1 ? null : clipEmpId,
            liveAnchorId
      };
      if(!startDate || !endDate){
        this.$Message.error('请选择日期')
        return
      }
      if(this.query.data.length==0){
          this.$Message.error('没有数据时不支持导出')
          return
      }
      api.shootingAndClipReportExport(data).then((res) => {
        let name = this.$moment(new Date(startDate)).format("YYYY-MM-DD") + '-' + this.$moment(new Date(endDate)).format("YYYY-MM-DD") + '拍剪组数据报表'
          download(res,name);
      });
    },
    handleModalVisibleChange(value){
        if (!value) {
          this.isEdit = false;
          this.query.data = []
          this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
          this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
          this.pageCount = 0
          this.$emit("update:beatingAndCuttingGroupModel", false);
      }
    },
    // 取消
    cancelSubmits(name) {
      this.isEdit = false;
      this.control = false;
      this.query.data = []
      this.query.startDate =  this.$moment().startOf('month').format("YYYY-MM-DD")
      this.query.endDate =  this.$moment(new Date()).format("YYYY-MM-DD")
      this.pageCount = 0
      this.$emit("update:beatingAndCuttingGroupModel", false);
    },
  },
  created(){
    this.getEmployeeByPositionId()
    this.getEmployeeByPositionId2()
  },
  watch: {
    beatingAndCuttingGroupModel(value){
        this.beatingAndCuttingGroupModels = value;
        
    },
    
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
.foot{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.num{
  margin-right: 20px ;
  font-size: 18px;
  display: flex;
}
</style>
