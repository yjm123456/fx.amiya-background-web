<template>
  <div>
    <Card>
      <div>
        <DatePicker
          type="date"
          placeholder="请选择日期"
          style="width: 160px;margin-right: .625rem"
          :value="params.date"
          v-model="params.date"
        ></DatePicker>
        <Select
          v-model="params.contentplatformId"
          placeholder="请选择平台"
          @on-change="contentPlateChange(params.contentplatformId)"
          filterable
          style="width: 160px; margin-left: 10px"
        >
          <Option
            v-for="item in params.contentPalteForms"
            :value="item.id"
            :key="item.id"
            >{{ item.contentPlatformName }}</Option
          >
        </Select>
        <Select
          v-model="params.liveAnchorId"
          placeholder="请选择主播IP"
          filterable
          style="width: 160px; margin: 0 10px"
          :disabled="params.contentplatformId == null"
        >
          <Option
            v-for="item in params.liveAnchors"
            :value="item.id"
            :key="item.id"
            >{{ item.hostAccountName }}</Option
          >
        </Select>
        <Button type="primary" @click="queryClick()">查询</Button>
      </div>
      <div class="item">
        <div class="h3_con">
          <span></span>
          <span class="h3">基础数据</span>
          <span><Button type="primary" @click="addClick">添加</Button></span>
        </div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      <div class="item">
        <div class="h3_con">
          <span></span>
          <span class="h3">直播分析-成交数据</span>
          <span><Button type="primary" @click="dealDataClick">编辑</Button></span>
        </div>
        <dealData :params="params" :dealDataModel.sync="dealDataModel" ref="dealData" />
      </div>
      <div class="item">
        <div class="h3_con">
          <span></span>
          <span class="h3">直播分析-互动数据</span>
          <span><Button type="primary" @click="interactionClick">编辑</Button></span>
        </div>
        <interaction :params="params" :interactionModel.sync="interactionModel" ref="interaction" />
      </div>
      <div class="item">
        <div class="h3_con">
          <span></span>
          <span class="h3">直播分析-单品TOP10数据</span>
          <span><Button type="primary" @click="goodsTop10Click">编辑</Button></span>
        </div>
        <goodsTop10 :params="params" :goodsTop10Model.sync="goodsTop10Model" ref="goodsTop10" />
      </div>
      <div class="item">
        <div class="h3_con">
          <span></span>
          <span class="h3">直播分析-流量优化</span>
          <span><Button type="primary" @click="flowClick">编辑</Button></span>
        </div>
        <flow :params="params" :flowModel.sync="flowModel" ref="flow" />
      </div>
      <div class="item">
        <div class="h3_con">
          <span></span>
          <span class="h3">直播分析-话术内容</span>
          <span><Button type="primary" @click="contentClick">编辑</Button></span>
        </div>
        <contents :params="params" :contentModel.sync="contentModel" ref="content" />
      </div>
      
      
    </Card>
    <Modal
      v-model="foundationModel"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="50%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="80"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="平台" prop="contentPlatformId">
              <Select
                v-model="form.contentPlatformId"
                placeholder="请选择平台"
                @on-change="formContentPlateChange(form.contentPlatformId)"
                filterable
              >
                <Option
                  v-for="item in params.contentPalteForms"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.contentPlatformName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主播IP" prop="liveAnchorId">
              <Select
                v-model="form.liveAnchorId"
                placeholder="请选择主播IP"
                filterable
                :disabled="form.contentPlatformId == null"
              >
                <Option
                  v-for="item in params.liveAnchors"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.hostAccountName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="直播日期" prop="liveDate">
              <DatePicker
                type="date"
                placeholder="请选择直播日期"
                style="width: 100%;"
                :value="form.liveDate"
                v-model="form.liveDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="直播时长" prop="liveDuration">
              <Input
                v-model="form.liveDuration"
                placeholder="请输入直播时长"
                type="number"
                number
                style="width:80%"
              ></Input>
              <span style="font-size:16px"> (min)</span>
              
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="团队成员" prop="livePersonnels">
              <Select
                v-model="form.livePersonnels"
                placeholder="请选择团队成员"
                filterable
                multiple
              >
                <Option
                  v-for="item in params.employee"
                  :value="item.name"
                  :key="item.name"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="GMV" prop="gmv">
              <Input
                v-model="form.gmv"
                placeholder="请输入GMV"
                type="number"
                number
              ></Input>
            </FormItem>
          </Col>
          <Spin fix v-if="isLoading == true">
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>加载中...</div>
          </Spin>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as orderApi from "@/api/orderManage";
import * as contentPlatForm from "@/api/baseDataMaintenance";
import * as api from "@/api/shootingAndClip";
import * as liveReplayApi from "@/api/liveReplay";

import dealData from "./components/dealData.vue"
import flow from "./components/flow.vue"
import contents from "./components/content.vue"
import interaction from "./components/interaction.vue"
import goodsTop10 from "./components/goodsTop10.vue"
export default {
  components: {
    dealData,
    flow,
    contents,
    interaction,
    goodsTop10
  },
  data() {
    return {
      params: {
        date:this.$moment().subtract(1, "days").format("YYYY-MM-DD"),
        // date: this.$moment().format("YYYY-MM-DD"),
        contentplatformId:  '',
        liveAnchorId: null,
        // 平台数据
        contentPalteForms: [],
        // 主播
        liveAnchors: [],
        // 团队成员
        employee:[],
        title:'添加'
      },
      // 基础数据model
      foundationModel:false,
      // 成交数据model
      dealDataModel:false,
      // 流量优化model
      flowModel:false,
      // 话术内容model
      contentModel:false,
      // 互动数据model
      interactionModel:false,
      // top10数据
      goodsTop10Model:false,
      mainTableId:sessionStorage.getItem('mainTableId'),
      query: {
        // contentplatformId:'',
        // liveAnchorId:null,
        // date:'',
        columns: [
          {
            title: "平台",
            key: "contentPlatformName",
          },
          {
            title: "主播",
            key: "liveAnchorName",
          },
          {
            title: "直播时间",
            key: "liveDate",
            render: (h, params) => {
              return h(
                "div",
                params.row.liveDate
                  ? this.$moment(params.row.liveDate).format("YYYY-MM-DD")
                  : ""
              );
            },
          },
          {
            title: "直播时长(min)",
            key: "liveDuration",
          },
          {
            title: "GMV",
            key: "gmv",
          },
          {
            title: "团队成员",
            key: "livePersonnels",
            render: (h, params) => {
              return h("div", params.row.livePersonnels.toString()
                
              );
            },
          },
          {
            title: "操作",
            key: "",
            width: 150,
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
                        this.title = "修改";
                        liveReplayApi.byIdLiveReplay(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              liveAnchorId,
                              contentPlatformId,
                              liveDate,
                              livePersonnels,
                              gmv,
                              liveDuration,
                            } = res.data.data;
                            this.contentPlateChange(contentPlatformId);
                            this.form.liveAnchorId = liveAnchorId;
                            this.form.contentPlatformId = contentPlatformId;
                            this.form.liveDate = this.$moment(liveDate).format(
                              "YYYY-MM-DD"
                            );

                            this.form.livePersonnels = livePersonnels;
                            this.form.gmv = gmv;
                            this.form.liveDuration = liveDuration;
                            this.form.id = id;
                            this.foundationModel = true;
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
                            const data ={
                                id:id
                            }
                            liveReplayApi.deleteLiveReplay(data).then((res) => {
                              if (res.code === 0) {
                                this.title = '添加'
                                this.getFoundationData();
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
        data: [],
        totalCount: 0,
      },
      form: {
        // 平台
        contentPlatformId: "",
        // 主播IP
        liveAnchorId: null,
        // 直播日期
        liveDate: "",
        // 直播时长
        liveDuration: null,
        // gmv
        gmv: null,
        // 直播人员
        livePersonnels: [],
        id: "",
      },

      ruleValidate: {
        contentPlatformId: [
          {
            required: true,
            message: "请选择平台",
          },
        ],
        liveAnchorId: [
          {
            required: true,
            message: "请选择主播IP",
          },
        ],
        liveDate: [
          {
            required: true,
            message: "请选择直播日期",
          },
        ],
        livePersonnels: [
          {
            required: true,
            message: "请选择团队成员",
          },
        ],
        gmv: [
          {
            required: true,
            message: "请输入gmv",
          },
        ],
        liveDuration: [
          {
            required: true,
            message: "请输入直播时长",
          },
        ],
      },
      isLoading:false,
      title:'添加'
    };
  },
  methods: {
    
    // 添加基础数据
    addClick(){
      if(this.query.data == 0){
        this.foundationModel = true
        return
      }else{
        this.$Message.warning('基础数据已存在！')
        return
      }
    },
    // 查询
    queryClick(){
        const { date,contentplatformId,liveAnchorId } = this.params
      if(!date){
        this.$Message.warning('请选择日期！')
        return
      }
      if(!contentplatformId){
        this.$Message.warning('请选择平台！')
        return
      }
      if(!liveAnchorId){
        this.$Message.warning('请选择主播IP！')
        return
      }
      this.getFoundationData()
      // this.$nextTick(()=>{
      //   this.$refs.dealData.getLiveReplayProductDealData()
      // })
      
    },
    // 直播分析-成交数据 编辑
    dealDataClick(){
      if(this.query.data == [] || this.query.data.length == 0){
          this.$Message.warning('请添加基础信息！')
        return
      }else{
        // 没有数据情况清空输入框数据赋值为空
        this.$refs.dealData.getData()
        this.dealDataModel=true
        this.$refs.dealData.getLiveReplayProductDealData()
        return
      }
    },
    // 直播分析-流量优化 编辑
    flowClick(){
      if(this.query.data == [] || this.query.data.length == 0){
          this.$Message.warning('请添加基础信息！')
        return
      }else{
        // 没有数据情况清空输入框数据赋值为空
        this.$refs.flow.getData()
        this.flowModel=true
        this.$refs.flow.getLiveReplayFlowOptimize()
        return
      }
    },
    // 直播分析-话术内容 编辑
    contentClick(){
      if(this.query.data == [] || this.query.data.length == 0){
          this.$Message.warning('请添加基础信息！')
        return
      }else{
        // 没有数据情况清空输入框数据赋值为空
        this.$refs.content.getData()
        this.contentModel=true
        this.$refs.content.getLiveReplayWordAnalyse()
        return
      }
    },
    // 直播分析-互动数据
    interactionClick(){
      if(this.query.data == [] || this.query.data.length == 0){
          this.$Message.warning('请添加基础信息！')
        return
      }else{
        // 没有数据情况清空输入框数据赋值为空
        this.$refs.interaction.getData()
        this.interactionModel=true
        this.$refs.interaction.getLiveReplayInteractionlData()
        return
      }
    },
    // 直播分析-单品top10
    goodsTop10Click(){
      if(this.query.data == [] || this.query.data.length == 0){
          this.$Message.warning('请添加基础信息！')
        return
      }else{
        // 没有数据情况清空输入框数据赋值为空
        this.$refs.goodsTop10.query.data2=[]
        this.goodsTop10Model=true
        // 获取列表
        this.$refs.goodsTop10.getLiveReplayMerchandiseTopData()
        // 获取商品
        this.$refs.goodsTop10.getItemNameByBrandIdAndCategoryId()
        return
      }
    },
    // 获取直播间
    getEmployeeByPositionId() {
      const data = {
        // 线上测试都是9
        positionId: 9,
      };
      api.getEmployeeByPositionId(data).then((res) => {
        if (res.code === 0) {
          const { employee } = res.data;
          this.params.employee = employee;
        }
      });
    },
    //   获取平台（下拉框）
    getContentValidList() {
      contentPlatForm.getContentPlatFormValidList().then((res) => {
        if (res.code === 0) {
          const { contentPalteForms } = res.data;
          this.params.contentPalteForms = contentPalteForms;
          // this.params.contentplatformId = contentPalteForms[0].id 
          // this.contentPlateChange(contentPalteForms[0].id)
        }
      });
    },
    formContentPlateChange(value) {
      if (!value) {
        return;
      }
      this.getLiveValidList(value);
    },
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
      orderApi.getLiveValidList(data).then((res) => {
        if (res.code === 0) {
          const { liveAnchors } = res.data;
          this.params.liveAnchors = liveAnchors;
          // this.params.liveAnchorId = liveAnchors[0].id
          // this.$nextTick(()=>{
          //   this.$refs.foundation.getFoundationData()
          // })
        }
      });
    },
    // 获取复盘基础信息列表
    getFoundationData() {
      const { contentplatformId, liveAnchorId, date } = this.params;
      const data = {
        contentplatformId: contentplatformId,
        liveAnchorId: liveAnchorId,
        date: this.$moment(date).format("YYYY-MM-DD"),
      };
      liveReplayApi.getLiveReplay(data).then((res) => {
        if (res.code === 0) {
          const { data } = res.data;
          
          
          if(data.length>0){
            sessionStorage.setItem('mainId',data[0].id)
            // 获取商品接口
            this.$refs.goodsTop10.getItemNameByBrandIdAndCategoryId();
          }else{
            // 先删除存储的id 防止下一次查询时获取的还是上一次的ID
            sessionStorage.removeItem('mainId')
            // 获取基础数据
            this.$refs.dealData.getData()
          }
          this.query.data = data;
          // 接口方法
          this.$refs.dealData.getLiveReplayProductDealData();
          this.$refs.flow.getLiveReplayFlowOptimize();
          this.$refs.content.getLiveReplayWordAnalyse();
          this.$refs.interaction.getLiveReplayInteractionlData();
          this.$refs.goodsTop10.getLiveReplayMerchandiseTopData();
          // 计算方法 单独调用不放在接口里面调用 防止计算数据手动填写时也调用该方法
          this.$refs.dealData.lastLivingDataNum();
          this.$refs.flow.lastLivingDataNum();
          this.$refs.interaction.lastLivingDataNum();
          this.$refs.goodsTop10.lastLivingDataNum();
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {
            contentPlatformId,
            liveAnchorId,
            liveDate,
            liveDuration,
            livePersonnels,
            gmv,
            id,
          } = this.form;
          const data = {
            contentPlatformId,
            liveAnchorId,
            liveDate: this.$moment(liveDate).format("YYYY-MM-DD"),
            liveDuration,
            livePersonnels,
            gmv,
            id,
          };
          if (this.title == "修改") {
            this.isLoading = true;
            // 修改
            liveReplayApi.updateLiveReplay(data).then((res) => {
              if (res.code === 0) {
                
                this.isLoading = false;
                this.cancelSubmit("form");
                this.getFoundationData();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              } else {
                setTimeout(() => {
                  this.isLoading = false;
                }, 3000);
              }
            });
          } else {
            const {
              contentPlatformId,
              liveAnchorId,
              liveDate,
              liveDuration,
              livePersonnels,
              gmv,
            } = this.form;
            const data = {
              contentPlatformId,
              liveAnchorId,
              liveDate: this.$moment(liveDate).format("YYYY-MM-DD"),
              liveDuration,
              livePersonnels,
              gmv,
            };
            // 添加
            this.isLoading = true;
            liveReplayApi.addLiveReplay(data).then((res) => {
              if (res.code === 0) {
                this.contentPlateChange(contentPlatformId)
                this.params.date=this.$moment(liveDate).format("YYYY-MM-DD")
                this.params.contentplatformId=contentPlatformId
                this.params.liveAnchorId=liveAnchorId
                this.isLoading = false;
                this.cancelSubmit("form");
                this.getFoundationData();
                this.$Message.success({
                  content: "添加成功",
                  duration: 3,
                });
              } else {
                setTimeout(() => {
                  this.isLoading = false;
                }, 3000);
              }
            });
          }
        }
      });
    },

    // 取消
    cancelSubmit(name) {
      this.isEdit = false;
      this.$refs[name].resetFields();
      this.foundationModel = false
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        this.foundationModel = false
      }
    },
  },
  created() {
    this.getContentValidList();
    this.getEmployeeByPositionId();
  },
  
};
</script>
<style scoped lang="less">
.h3_con {
  display: flex;
  justify-content: space-between;
}
.h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #000;
}
.item {
  margin-bottom: 40px;
}
</style>
