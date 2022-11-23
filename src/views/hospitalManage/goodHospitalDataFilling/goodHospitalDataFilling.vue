<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalInfo()"
          />
          <Select
            v-model="query.indicatorsId"
            placeholder="请选择指标名称"
            style="width: 200px; margin-left: 10px"
            filterable
          >
            <Option
              v-for="item in indicatorNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalInfo()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="addClick"
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
      
    </Card>
   <Modal
      v-model="controlModal"
      title="添加"
      :mask-closable="false"
      width="1000"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="130"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem
              label="指标名称"
              prop="indicatorId"
              :rules="[
                {
                  required: true,
                  message: '请选择指标名称',
                  trigger: 'change',
                },
              ]"
            >
              <Select
                v-model="form.indicatorId"
                placeholder="请选择指标名称"
                filterable
              >
                <Option
                  v-for="item in indicatorNameList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="派单数"
              prop="dispatchNum1"
              :rules="[
                {
                  required: true,
                  message: '派单数',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.dispatchNum1"
                placeholder="请输入派单数"
                @on-change="dispatchNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客上门人数"
              prop="newVisitNum1"
              :rules="[
                {
                  required: true,
                  message: '新客上门人数',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.newVisitNum1"
                placeholder="请输入新客上门人数"
                @on-change="newVisitNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客上门率(%)"
              prop="newVisitNumRate1"
              :rules="[
                {
                  required: true,
                  message: '新客上门率',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.newVisitNumRate1"
                placeholder="请输入新客上门率"
                @on-change="newVisitNumRate2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客成交人数"
              prop="newDealNum1"
              :rules="[
                {
                  required: true,
                  message: '新客成交人数',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.newDealNum1"
                placeholder="请输入新客成交人数"
                @on-change="newDealNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客成交率(%)"
              prop="newDealRate1"
              :rules="[
                {
                  required: true,
                  message: '新客成交率',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.newDealRate1"
                placeholder="请输入新客成交率"
                @on-change="newDealRate2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客业绩"
              prop="newAchievementNum1"
              :rules="[
                {
                  required: true,
                  message: '新客业绩',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.newAchievementNum1"
                placeholder="请输入新客业绩"
                @on-change="newAchievementNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客客单价"
              prop="newPrice1"
              :rules="[
                {
                  required: true,
                  message: '新客客单价',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.newPrice1"
                placeholder="请输入新客客单价"
                @on-change="newPrice2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客上门人数"
              prop="oldVisitNum1"
              :rules="[
                {
                  required: true,
                  message: '老客上门人数',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.oldVisitNum1"
                placeholder="请输入老客上门人数"
                @on-change="oldVisitNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客成交人数"
              prop="oldDealNum1"
              :rules="[
                {
                  required: true,
                  message: '老客成交人数',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.oldDealNum1"
                placeholder="请输入老客成交人数"
                @on-change="oldDealNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客成交率(%)"
              prop="oldDealRate1"
              :rules="[
                {
                  required: true,
                  message: '老客成交率',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.oldDealRate1"
                placeholder="请输入老客成交率"
                @on-change="oldDealRate2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客业绩"
              prop="oldAchievementNum1"
              :rules="[
                {
                  required: true,
                  message: '老客业绩',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.oldAchievementNum1"
                placeholder="请输入老客业绩"
                @on-change="oldAchievementNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客客单价"
              prop="oldPrice1"
              :rules="[
                {
                  required: true,
                  message: '老客客单价',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.oldPrice1"
                placeholder="请输入老客客单价"
                @on-change="oldPrice2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客业绩占比(%)"
              prop="oldAchievementProportion1"
              :rules="[
                {
                  required: true,
                  message: '老客业绩占比',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.oldAchievementProportion1"
                placeholder="请输入老客业绩占比"
                @on-change="oldAchievementProportion2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="总业绩"
              prop="totalPerformance1"
              :rules="[
                {
                  required: true,
                  message: '总业绩',
                  trigger: 'change',
                },
              ]"
            >
              <Input
                v-model="form.totalPerformance1"
                placeholder="请输入总业绩"
                @on-change="totalPerformance2Change"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="detailModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form2"
        :model="form2"
        :rules="ruleValidate"
        label-position="left"
        :label-width="110"
      > 
        <FormItem label="指标名称" prop="indicatorId">
          <Select
            v-model="form2.indicatorId"
            placeholder="请选择指标名称"
            filterable
          >
            <Option
              v-for="item in indicatorNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="运营维度名称" prop="operationName">
          <Input v-model="form2.operationName" placeholder="请输入运营维度名称" disabled></Input>
        </FormItem>
        <FormItem label="运营维度值" prop="operationValue">
          <Input v-model="form2.operationValue" placeholder="请输入运营维度值"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelSubmit('form2')">取消</Button>
        <Button type="primary" @click="handleSubmit('form2')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
export default {
  data() {
    return {
      // 查询
      query: {
        keyword: "",
        indicatorsId:sessionStorage.getItem('indicatorsId'),
        columns: [
         
          {
            title: "指标名称",
            key: "indicatorName",
          },
          {
            title: "运营维度名称",
            key: "operationName",
          },
          {
            title: "运营维度值",
            key: "operationValue",
          },
          
          {
            title: "操作",
            key: "",
            align:'center',
            width: 100,
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
                        api.byIdGreatHospitalDataWrite(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              id,
                              indicatorId,
                              operationName,
                              operationValue
                            } = res.data.greatHospitalDataWriteInfo;
                            this.isEdit = true;
                            this.form2.indicatorId = indicatorId;
                            this.form2.operationName = operationName;
                            this.form2.operationValue = operationValue;
                            this.form2.id = id;
                            this.detailModal = true;
                          }
                        });
                      },
                    },
                  },
                  "修改"
                ),
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "error",
                //       size: "small",
                //     },
                //     on: {
                //       click: () => {
                //         this.$Modal.confirm({
                //           title: "删除提示",
                //           content: "是否确认删除？",
                //           onOk: () => {
                //             const { id } = params.row;
                //             api.deleteHGreatHospitalDataWrite(id).then((res) => {
                //               if (res.code === 0) {
                //                 this.getHospitalInfo();
                //                 this.$Message.success({
                //                   content: "删除成功",
                //                   duration: 3,
                //                 });
                //               }
                //             });
                //           },
                //           onCancel: () => {},
                //         });
                //       },
                //     },
                //   },
                //   "删除"
                // ),
              ]);
            },
          },
        ],
        data: [],
        totalCount: 0,
      },

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,
      detailModal:false,
      form2: {
        id:"",
        indicatorId:'',
        operationName:'',
        operationValue:''
      },
      form: {
        id: "",
        indicatorId:'',
        // 派单数
        dispatchNum1: null,
        // 新客上门
        newVisitNum1: null,
        // 新客上门率
        newVisitNumRate1: null,
        // 新客成交人数
        newDealNum1: null,
        // 新客成交率
        newDealRate1: null,
        // 新客业绩
        newAchievementNum1: null,
        // 新客客单价
        newPrice1: null,
        // 老客上门人数
        oldVisitNum1: null,
        // 老客成交人数
        oldDealNum1: null,
        // 老客成交率
        oldDealRate1: null,
        // 老客业绩
        oldAchievementNum1: null,
        // 老客客单价
        oldPrice1: null,
        // 老客业绩占比
        oldAchievementProportion1: null,
        // 总业绩
        totalPerformance1: null,
      },

      ruleValidate: {
        indicatorId: [
          {
            required: true,
            message: "请选择指标名称",
          },
        ],
        operationName: [
          {
            required: true,
            message: "请输入运营维度名称",
          },
        ],
        operationValue: [
          {
            required: true,
            message: "请输入运营维度值",
          },
        ],
       
      },
      indicatorNameList:[],
      dispatchNumlist1:[],
      dispatchNumlist2:[],
      dispatchNumlist3:[],
      dispatchNumlist4:[],
      dispatchNumlist5:[],
      dispatchNumlist6:[],
      dispatchNumlist6:[],
      dispatchNumlist7:[],
      dispatchNumlist8:[],
      dispatchNumlist9:[],
      dispatchNumlist10:[],
      dispatchNumlist11:[],
      dispatchNumlist12:[],
      dispatchNumlist13:[],
      dispatchNumlist14:[],
      

    };
  },
  methods: {
    addClick(){
      if(this.query.data.length == 0){
        this.controlModal = true;
      }else{
        this.$Message.warning('当前指标数据已存在请勿重复添加')
        return
      }
    },
    // 派单数
    dispatchNum2Change(){
      const {indicatorId,dispatchNum1} = this.form
        this.dispatchNumlist1 = [
            {
                indicatorId:indicatorId,
                operationName:'派单数',
                operationValue:dispatchNum1,
            }
        ]
    },
    // 新客上门人数
    newVisitNum2Change(){
        const {indicatorId,newVisitNum1} = this.form
        this.dispatchNumlist2 = [
            {
                indicatorId:indicatorId,
                operationName:'新客上门人数',
                operationValue:newVisitNum1,
            }
        ]
    },
    // 新客上门率
    newVisitNumRate2Change(){
        const {indicatorId,newVisitNumRate1} = this.form
        this.dispatchNumlist3 = [
            {
                indicatorId:indicatorId,
                operationName:'新客上门率',
                operationValue:newVisitNumRate1,
            }
        ]
    },
    // 新客成交人数
    newDealNum2Change(){
        const {indicatorId,newDealNum1} = this.form
        this.dispatchNumlist4 = [
            {
                indicatorId:indicatorId,
                operationName:'新客成交人数',
                operationValue:newDealNum1,
            }
        ]
    },
    // 新客成交率
    newDealRate2Change(){
       const {indicatorId,newDealRate1} = this.form
        this.dispatchNumlist5 = [
            {
                indicatorId:indicatorId,
                operationName:'新客成交率',
                operationValue:newDealRate1,
            }
        ]
    },
    // 新客业绩
    newAchievementNum2Change(){
       const {indicatorId,newAchievementNum1} = this.form
        this.dispatchNumlist6 = [
            {
                indicatorId:indicatorId,
                operationName:'新客业绩',
                operationValue:newAchievementNum1,
            }
        ]
    },
    // 新客客单价
    newPrice2Change(){
        const {indicatorId,newPrice1} = this.form
        this.dispatchNumlist7 = [
            {
                indicatorId:indicatorId,
                operationName:'新客客单价',
                operationValue:newPrice1,
            }
        ]
    },
    // 老客上门人数
    oldVisitNum2Change(){
        const {indicatorId,oldVisitNum1} = this.form
        this.dispatchNumlist8 = [
            {
                indicatorId:indicatorId,
                operationName:'老客上门人数',
                operationValue:oldVisitNum1,
            }
        ]
    },
    // 老客成交人数
    oldDealNum2Change(){
        const {indicatorId,oldDealNum1} = this.form
        this.dispatchNumlist9 = [
            {
                indicatorId:indicatorId,
                operationName:'老客成交人数',
                operationValue:oldDealNum1,
            }
        ]
    },
    // 老客成交率
    oldDealRate2Change(){
       const {indicatorId,oldDealRate1} = this.form
        this.dispatchNumlist10 = [
            {
                indicatorId:indicatorId,
                operationName:'老客成交率',
                operationValue:oldDealRate1,
            }
        ]
    },
    // 老客业绩
    oldAchievementNum2Change(){
        const {indicatorId,oldAchievementNum1} = this.form
        this.dispatchNumlist11 = [
            {
                indicatorId:indicatorId,
                operationName:'老客业绩',
                operationValue:oldAchievementNum1,
            }
        ]
    },
    // 老客客单价
    oldPrice2Change(){
        const {indicatorId,oldPrice1} = this.form
        this.dispatchNumlist12 = [
            {
                indicatorId:indicatorId,
                operationName:'老客客单价',
                operationValue:oldPrice1,
            }
        ]
    },
    // 老客业绩占比
    oldAchievementProportion2Change(){
        const {indicatorId,oldAchievementProportion1} = this.form
        this.dispatchNumlist13 = [
            {
                indicatorId:indicatorId,
                operationName:'老客业绩占比',
                operationValue:oldAchievementProportion1,
            }
        ]
    },
    // 总业绩
    totalPerformance2Change(){
        const {indicatorId,totalPerformance1} = this.form
        this.dispatchNumlist14 = [
            {
                indicatorId:indicatorId,
                operationName:'总业绩',
                operationValue:totalPerformance1,
            }
        ]
    },
      // 获取机构运营指标名称列表
    getHospitalOperationIndicatorNameList() {
      api.getHospitalOperationIndicatorNameList().then((res) => {
        if (res.code === 0) {
          const {indicatorNameList} = res.data
          this.indicatorNameList = indicatorNameList;
          sessionStorage.setItem('indicatorsId',indicatorNameList[0].id)
        }
      });
    },
    // 获取优秀机构数据填报列表
    getHospitalInfo() {
      const { keyword,indicatorsId} = this.query;
      const data = { keyword,indicatorsId };
      api.getHGreatHospitalDataWrite(data).then((res) => {
        if (res.code === 0) {
          this.query.data = res.data.greatHospitalDataWriteInfo;
        }
      });
    },

    
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            api.editGreatHospitalDataWrite(this.form2).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form2");
                this.getHospitalInfo();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const HospitalOperationDataList = this.dispatchNumlist1.concat(...this.dispatchNumlist2,...this.dispatchNumlist3,...this.dispatchNumlist4,...this.dispatchNumlist5,
           ...this.dispatchNumlist6,...this.dispatchNumlist7,...this.dispatchNumlist8,...this.dispatchNumlist9,...this.dispatchNumlist10,...this.dispatchNumlist11,
           ...this.dispatchNumlist12,...this.dispatchNumlist13,...this.dispatchNumlist14
           )
            // 添加
            api.addGreatHospitalDataWrite(HospitalOperationDataList).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalInfo();
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
      this.detailModal = false
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
        this.$refs["form2"].resetFields();
      }
    },
  },
  created() {
    this.getHospitalInfo();
    this.getHospitalOperationIndicatorNameList()
  },
};
</script>
<style lang="less" scoped>
.header_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  margin-top: 16px;
}
.page_wrap {
  margin-top: 16px;
  text-align: right;
}
</style>