<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <Button
          type="primary"
          @click="
            controlModal = true;
            title = '添加';
          "
          >添加</Button
        >
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

    <Modal
      v-model="controlModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      :width="title == '修改' ? 1200 : 600"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
        
      >
        <FormItem label="类型名称" prop="name">
          <Input v-model="form.name" placeholder="请输入类型名称"></Input>
        </FormItem>
        <FormItem label="是否有效" prop="valid" v-show="isEdit === true">
          <i-switch v-model="form.valid" />
        </FormItem>
        <Divider  />
        <FormItem label="是否选择模板" prop="hasModel" v-if="title == '修改'">
          <i-switch v-model="form.hasModel" @on-change="hasModelChange"/>
        </FormItem>
        <Row :gutter="30">
          <Col span="7">
            <FormItem label="回访主题" prop="trackTypeThemeModelVoObj.trackThemeId"  v-if="title == '修改' && form.hasModel === true" key="回访主题">
              <Select v-model="form.trackTypeThemeModelVoObj.trackThemeId" placeholder="请选择回访主题" filterable >
                <Option
                  v-for="item in trackTheme"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <div v-if="title == '修改' && form.hasModel === true"> <span class="title">第</span><Input v-model="form.trackTypeThemeModelVoObj.daysLater"  type="number" number style="width:80px;margin:0 10px"></Input><span class="title">天回访</span> </div>
          </Col>
          <Col span="7">
            <FormItem label="回访计划" prop="trackTypeThemeModelVoObj.trackPlan" v-if="title == '修改' && form.hasModel === true" key="回访计划">
              <Input v-model="form.trackTypeThemeModelVoObj.trackPlan" placeholder="请输入回访计划"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <Button type="primary" @click="addTemplateChange" v-if="title == '修改' && form.hasModel === true" >确定添加</Button>
          </Col>
        </Row>
        <div  v-if="title == '修改' && form.hasModel === true" class="h2">回访模板列表</div>
        <div class="list" v-if="title == '修改' && form.hasModel === true">
          <Table border :columns="query.columns2" :data="form.trackTypeThemeModelVo"   height="300"></Table>
        </div>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/baseDataMaintenance";
import * as commonApi from "@/api/common";
import { CarouselItem } from 'view-design';
export default {
  data() {
    return {
      // 查询
      query: {
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "类型名称",
            key: "name",
          },
          {
            title: "是否有效",
            key: "valid",
            render: (h, params) => {
              if (params.row.valid == true) {
                return h("Icon", {
                  props: {
                    type: "md-checkmark",
                  },
                  style: {
                    fontSize: "18px",
                    color: "#559DF9",
                  },
                });
              } else {
                return h("Icon", {
                  props: {
                    type: "md-close",
                  },
                  style: {
                    fontSize: "18px",
                    color: "red",
                  },
                });
              }
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
                        const { id, name, valid } = params.row;
                        this.title = "修改";
                        this.isEdit = true;
                        this.form.id = id;
                        this.form.name = name;
                        this.form.valid = valid;
                        this.controlModal = true;
                        api.byIdTrack(id).then((res) => {
                          if(res.code === 0 ){
                            const {
                              hasModel,
                              trackTypeThemeModel
                            } = res.data.giftInfo
                            this.form.trackTypeThemeModelVo = trackTypeThemeModel
                            this.form.hasModel = hasModel
                          }
                        })
                        // this.form.trackTypeThemeModelVoObj.trackTypeId = id
                        sessionStorage.setItem('trackTypeId',id)
                        this.getByTrackTypeIdGetTrackThemeList(id)
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
                            api.deleteTrackType(id).then((res) => {
                              if (res.code === 0) {
                                this.getTrackTypeList();
                                this.$Message.success({
                                  content: "删除成功",
                                  duration: 3,
                                });
                              }
                            });
                          },
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
        columns2:[
          {
            title: "回访模板",
            key: "trackThemeName",
          },
          {
            title:"第n天回访",
            key: "daysLater",
            render: (h, params) => {
                return h("InputNumber", {
                    props: {
                        value: params.row.daysLater
                    },
                    style: {
                        width: "100px",
                    },
                    on: {
                        input: (val) => {
                            this.form.trackTypeThemeModelVo[params.index].daysLater =  val
                        }
                    },
                });
            },
          },
          {
            title: "回访计划",
            key: "trackPlan",
            render:(h,params)=>{
                return h('Input',{
                    props:{
                        placeholder:"请输入回访计划",
                        value:params.row.trackPlan
                    },
                    on:{
                        'on-blur': (event) => {
                            this.form.trackTypeThemeModelVo[params.index].trackPlan = event.target._value;
                        }
                    }
                })
            },
          },
          {
            title: "操作",
            align: "center",
            width: 120,
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
                        const {id} = params.row;
                        const findIndex = this.form.trackTypeThemeModelVo.findIndex(item=> item.index === params.row.index);
                        this.form.trackTypeThemeModelVo.splice(findIndex,1)
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
      index:0,
      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        name: "",
        id: "",
        valid: false,
        hasModel:false,
        trackTypeThemeModelVo:[],
        trackTypeThemeModelVoObj:{
          id:'',
          // 回访类型
          trackThemeId:null,
          // 回访主题
          trackThemeId:null,
          trackThemeName:'',
          // 第n天回访
          daysLater:null,
          // 回访计划
          trackPlan:'',
        }
      },

      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入类型名称",
          },
        ],
      },
      trackTheme:[]
    };
  },
  methods: {
    // 添加模板
    addTemplateChange(){
      const {trackThemeId,daysLater,trackPlan,id} = this.form.trackTypeThemeModelVoObj
      if(!trackThemeId){
        this.$Message.warning('请选择回访主题')
        return
      }
      if(!daysLater){
        this.$Message.warning('请输入第n天回访')
        return
      }
      if(daysLater < 0){
        this.$Message.warning('天数必须大于1')
        return
      }
      if(!trackPlan){
        this.$Message.warning('请输入回访计划')
        return
      }
      this.trackTheme.map(item=>{
        if(item.id==trackThemeId){
          this.form.trackTypeThemeModelVoObj.trackThemeName = item.name
        }
      })
      // this.form.trackTypeThemeModelVo.push(this.form.trackTypeThemeModelVoObj)
      this.form.trackTypeThemeModelVo.push({
        id,
        trackThemeId,
        trackPlan,
        trackTypeId:Number(sessionStorage.getItem('trackTypeId')),
        daysLater,
        trackThemeName:this.form.trackTypeThemeModelVoObj.trackThemeName,
        index:this.index++,
      })
      this.form.trackTypeThemeModelVoObj = {}
    },
    hasModelChange(){
      if(this.form.hasModel == false){
        this.trackThemeId = null
        this.daysLater = null
        this.trackPlan = null
      }
    },
    // 根据回访类型id获取回访主题
    getByTrackTypeIdGetTrackThemeList(id){
      commonApi.byTrackTypeIdGetTrackThemeList(id).then((res) => {
        if (res.code === 0) {
          const {trackTheme} = res.data
          this.trackTheme = trackTheme
        }
      })
    },
    // 获取医院可预约人数列表
    getTrackTypeList() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
      };
      api.getTrackTypeList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackType;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取医院可预约人数列表分页
    handlePageChange(pageNum) {
      const { pageSize } = this.query;
      const data = {
        pageNum,
        pageSize,
      };
      api.getTrackTypeList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.trackType;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const {id,valid,hasModel,trackTypeThemeModelVo,name} = this.form
            const data ={
              id,
              valid,
              hasModel,
              trackTypeThemeModelVo,
              name
            }
            // 修改
            api.updateTrackType(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getTrackTypeList();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            let { name } = this.form;
            // 添加
            api.addTrackType({ name }).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getTrackTypeList();
                this.$Message.success({
                  content: "添加成功",
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
      this.form.trackTypeThemeModelVo = []
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.form.trackTypeThemeModelVo = []
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getTrackTypeList();
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
.title{
  margin-top: 2px;
}
.h2{
  margin: 10px 0 ;
  font-size: 16px;
  font-weight: bold;
}
</style>
