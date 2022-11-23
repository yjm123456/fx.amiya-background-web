<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyword"
            placeholder="请输入关键词"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getGreatHospitalOperationHealth()"
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
            @click="getGreatHospitalOperationHealth()"
            >查询</Button
          >
        </div>
        <div class="right">
          <Button
            type="primary"
            @click="
              controlModal = true;
              title = '添加';
            "
            >添加</Button
          >
        </div>
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table :row-class-name="rowClassName" border :columns="query.columns" :data="query.data" height="500"></Table>
      </div>
      <div>
        <div class="h1">啊美雅批注</div>
        <Input
            v-model="query.remark"
            placeholder="请输入啊美雅批注"
            style="width: 100%; "
            type="textarea"
            :rows="4"
        />
        <div class="button"><Button type="primary" @click="amyButton">提交</Button></div>
      </div>
      <!-- <div class="page_wrap">
        <Page
          ref="pages"
          :current="query.pageNum"
          :page-size="query.pageSize"
          :total="query.totalCount"
          show-total
          show-elevator
          @on-change="handlePageChange"
        />
      </div> -->
    </Card>

    <Modal
      v-model="controlModal"
      :title="title"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="1000"
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
          <FormItem label="医院" prop="hospitalId">
            <Select
              v-model="form.hospitalId"
              placeholder="请选择医院"
              @on-change="hospitalIdChange"
              filterable
            >
              <Option
                v-for="item in hospitalInfo"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="指标名称" prop="indicatorsId">
            <Select
              v-model="form.indicatorsId"
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

        </Col>
        <Col span="8">
          <FormItem label="前月新客上门率" prop="lastNewCustomerVisitRate">
            <Input v-model="form.lastNewCustomerVisitRate" placeholder="请输入前月新客上门率" type="number" number @on-change="lastNewCustomerVisitRateChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="上月新客上门率" prop="thisNewCustomerVisitRate">
            <Input v-model="form.thisNewCustomerVisitRate" placeholder="请输入上月新客上门率" type="number" number @on-change="thisNewCustomerVisitRateChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="新客上门环比" prop="newCustomerVisitChainRatio">
            <Input v-model="form.newCustomerVisitChainRatio" placeholder="请输入新客上门环比" type="number" number disabled></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="前月新客成交率" prop="lastNewCustomerDealRate">
            <Input v-model="form.lastNewCustomerDealRate" placeholder="请输入前月新客成交率" type="number" number @on-change="lastNewCustomerDealRateChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="上月新客成交率" prop="thisNewCustomerDealRate">
            <Input v-model="form.thisNewCustomerDealRate" placeholder="请输入上月新客成交率" type="number" number @on-change="thisNewCustomerDealRateChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="新客成交率环比" prop="newCustomerDealChainRatio">
            <Input v-model="form.newCustomerDealChainRatio" placeholder="请输入新客成交率环比" type="number" number disabled></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="前月新客客单价" prop="lastNewCustomerUnitPrice">
            <Input v-model="form.lastNewCustomerUnitPrice" placeholder="请输入前月新客客单价" type="number" number @on-change="lastNewCustomerUnitPriceChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="上月新客客单价" prop="thisNewCustomerUnitPrice">
            <Input v-model="form.thisNewCustomerUnitPrice" placeholder="请输入上月新客客单价" type="number" number @on-change="thisNewCustomerUnitPriceChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="新客客单价环比" prop="newCustomerUnitPriceChainRatio">
            <Input v-model="form.newCustomerUnitPriceChainRatio" placeholder="请输入新客客单价环比" type="number" number disabled></Input>
          </FormItem>
        </Col>
         

        <Col span="8">
          <FormItem label="前月老客复购率" prop="lastOldCustomerRepurchaseRate">
            <Input v-model="form.lastOldCustomerRepurchaseRate" placeholder="请输入前月老客复购率" type="number" number @on-change="lastOldCustomerRepurchaseRateChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="上月老客复购率" prop="thisOldCustomerRepurchaseRate">
            <Input v-model="form.thisOldCustomerRepurchaseRate" placeholder="请输入上月老客复购率" type="number" number @on-change="thisOldCustomerRepurchaseRateChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="老客复购率环比" prop="oldCustomerRepurchaseChainRatio">
            <Input v-model="form.oldCustomerRepurchaseChainRatio " placeholder="请输入老客复购率环比" type="number" number disabled></Input>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="前月老客客单价" prop="lastOldCustomerUnitPrice">
            <Input v-model="form.lastOldCustomerUnitPrice" placeholder="请输入前月老客客单价" type="number" number @on-change="lastOldCustomerUnitPriceChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="上月老客客单价" prop="thisOldCustomerUnitPrice">
            <Input v-model="form.thisOldCustomerUnitPrice" placeholder="请输入上月老客客单价" type="number" number @on-change="thisOldCustomerUnitPriceChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="老客客单价环比" prop="oldCustomerUnitPriceChainRatio">
            <Input v-model="form.oldCustomerUnitPriceChainRatio " placeholder="请输入老客客单价环比" type="number" number disabled></Input>
          </FormItem>
        </Col>
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
import * as api from "@/api/GreatHospitalOperationHealth";
import * as hospitalManage from "@/api/hospitalManage";

export default {
  data() {
    return {
      // 查询
      query: {
        remark:'',
        keyword: "",
        indicatorsId:sessionStorage.getItem('indicatorsId'),
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "医院",
            key: "hospitalName",
            width:220
          },
          {
            title: "指标名称",
            key: "indicatorsName",
            width:200
          },
          {
            title: "前月新客上门率",
            key: "lastNewCustomerVisitRate",
            width:140
          },
          {
            title: "上月新客上门率",
            key: "thisNewCustomerVisitRate",
            width:140
          },
          {
            title: "新客上门率环比",
            key: "newCustomerVisitChainRatio",
            width:140
          },
          {
            title: "前月新客成交率",
            key: "lastNewCustomerDealRate",
            width:140
          },
          {
            title: "上月新客成交率",
            key: "thisNewCustomerDealRate",
            width:140
          },

          {
            title: "新客成交率环比",
            key: "newCustomerDealChainRatio",
            width:140
          },
          {
            title: "前月新客客单价",
            key: "lastNewCustomerUnitPrice",
            width:140
          },
          {
            title: "上月新客客单价",
            key: "thisNewCustomerUnitPrice",
            width:140
          },
          {
            title: "新客客单价环比",
            key: "newCustomerUnitPriceChainRatio",
            width:140
          },
          
          {
            title: "前月老客复购率",
            key: "lastOldCustomerRepurchaseRate",
            width:140
          },
          {
            title: "上月老客复购率",
            key: "thisOldCustomerRepurchaseRate",
            width:140
          },

          {
            title: "老客复购率环比",
            key: "oldCustomerRepurchaseChainRatio",
            width:140
          },
          {
            title: "前月老客客单价",
            key: "lastOldCustomerUnitPrice",
            width:140
          },
          {
            title: "上月老客客单价",
            key: "thisOldCustomerUnitPrice",
            width:140
          },

          {
            title: "老客客单价环比",
            key: "oldCustomerUnitPriceChainRatio",
            width:140
          },
          {
            title: "操作",
            key: "",
            width: 150,
            "fixed": "right",
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
                        api.byIdGreatHospitalOperationHealth(id).then((res) => {
                          if (res.code === 0) {
                             const {
                              id,
                              hospitalId,
                              indicatorsId,
                              lastNewCustomerVisitRate,
                              thisNewCustomerVisitRate,
                              newCustomerVisitChainRatio,
                              lastNewCustomerDealRate,
                              thisNewCustomerDealRate,
                              newCustomerDealChainRatio,
                              lastNewCustomerUnitPrice,
                              thisNewCustomerUnitPrice,
                              newCustomerUnitPriceChainRatio,
                              lastOldCustomerRepurchaseRate,
                              thisOldCustomerRepurchaseRate ,
                              oldCustomerRepurchaseChainRatio ,
                              lastOldCustomerUnitPrice  ,
                              thisOldCustomerUnitPrice  ,
                              oldCustomerUnitPriceChainRatio  
                            } = res.data.greatHospitalOperationHealthInfo;
                            this.isEdit = true;
                            this.form.hospitalId = hospitalId;
                            this.form.indicatorsId = indicatorsId;
                            this.form.lastNewCustomerVisitRate = lastNewCustomerVisitRate;
                            this.form.thisNewCustomerVisitRate = thisNewCustomerVisitRate;
                            this.form.newCustomerVisitChainRatio = newCustomerVisitChainRatio;
                            this.form.lastNewCustomerDealRate = lastNewCustomerDealRate;
                            this.form.thisNewCustomerDealRate = thisNewCustomerDealRate;
                            this.form.newCustomerDealChainRatio = newCustomerDealChainRatio;
                            this.form.lastNewCustomerUnitPrice = lastNewCustomerUnitPrice;
                            this.form.thisNewCustomerUnitPrice = thisNewCustomerUnitPrice;
                            this.form.newCustomerUnitPriceChainRatio = newCustomerUnitPriceChainRatio;
                            this.form.lastOldCustomerRepurchaseRate = lastOldCustomerRepurchaseRate;
                            this.form.thisOldCustomerRepurchaseRate = thisOldCustomerRepurchaseRate;
                            this.form.oldCustomerRepurchaseChainRatio = oldCustomerRepurchaseChainRatio;
                            this.form.lastOldCustomerUnitPrice = lastOldCustomerUnitPrice;
                            this.form.thisOldCustomerUnitPrice = thisOldCustomerUnitPrice;
                            this.form.oldCustomerUnitPriceChainRatio = oldCustomerUnitPriceChainRatio;
                            this.form.id = id;
                            this.controlModal = true;
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
                            api.deleteGreatHospitalOperationHealth(id).then((res) => {
                              if (res.code === 0) {
                                this.getGreatHospitalOperationHealth();
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

      // 控制 modal
      controlModal: false,

      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id:"",
        // 医院id 
        hospitalId:null,
        // 归属指标
        indicatorsId:'',
        // 前月新客上门率
        lastNewCustomerVisitRate:null,
        // 上月新客上门率
        thisNewCustomerVisitRate:null,
        // 新客上门率环比
        newCustomerVisitChainRatio:null,
        // 前月新客成交率
        lastNewCustomerDealRate:null,
        // 上月新客成交率
        thisNewCustomerDealRate:null,
        // 新客成交率环比
        newCustomerDealChainRatio:null,
        // 前月新客客单价
        lastNewCustomerUnitPrice:null,
        // 上月新客客单价
        thisNewCustomerUnitPrice:null,
        // 新客客单价环比
        newCustomerUnitPriceChainRatio:null,
        // 前月老客复购率
        lastOldCustomerRepurchaseRate :null,
        // 上月老客复购率
        thisOldCustomerRepurchaseRate  :null,
        // 老客复购率环比
        oldCustomerRepurchaseChainRatio  :null,
        //  前月老客客单价
        lastOldCustomerUnitPrice  :null,
        // 上月老客客单价
        thisOldCustomerUnitPrice  :null,
        //  老客客单价环比
        oldCustomerUnitPriceChainRatio  :null
      },

      ruleValidate: {
        hospitalId: [
          {
            required: true,
            message: "请选择医院",
          },
        ],
        indicatorsId: [
          {
            required: true,
            message: "请选择指标",
          },
        ],
        lastNewCustomerVisitRate: [
          {
            required: true,
            message: "请输入前月新客上门率",
          },
        ],
        thisNewCustomerVisitRate: [
          {
            required: true,
            message: "请输入上月新客上门率",
          },
        ],
        newCustomerVisitChainRatio: [
          {
            required: true,
            message: "请输入新客上门率环比",
          },
        ],
        lastNewCustomerDealRate: [
          {
            required: true,
            message: "请输入前月新客成交率",
          },
        ],
        thisNewCustomerDealRate: [
          {
            required: true,
            message: "请输入前月新客成交率",
          },
        ],
        newCustomerDealChainRatio: [
          {
            required: true,
            message: "请输入新客成交率环比",
          },
        ],

        lastNewCustomerUnitPrice: [
          {
            required: true,
            message: "请输入前月新客客单价",
          },
        ],
        thisNewCustomerUnitPrice: [
          {
            required: true,
            message: "请输入上月新客客单价",
          },
        ],
        newCustomerUnitPriceChainRatio: [
          {
            required: true,
            message: "请输入新客客单价环比",
          },
        ],

        lastOldCustomerRepurchaseRate : [
          {
            required: true,
            message: "请输入前月老客复购率",
          },
        ],
        thisOldCustomerRepurchaseRate  : [
          {
            required: true,
            message: "请输入上月老客复购率",
          },
        ],
        oldCustomerRepurchaseChainRatio : [
          {
            required: true,
            message: "请输入老客复购率环比",
          },
        ],

        lastOldCustomerUnitPrice: [
          {
            required: true,
            message: "请输入前月老客客单价",
          },
        ],
        thisOldCustomerUnitPrice: [
          {
            required: true,
            message: "请输入上月老客客单价",
          },
        ],
        oldCustomerUnitPriceChainRatio : [
          {
            required: true,
            message: "请输入老客客单价环比",
          },
        ],

      },
      hospitalInfo:[],
      indicatorNameList:[],
    };
  },
  methods: {
    byIdRemark(){
      const {indicatorsId} = this.query
      const data = {
        indicatorId:indicatorsId,
      }
      api.getAmiyaRemark(data).then((res) => {
        this.query.remark = res.data.amiyaRemark.amiyaRemark
      })
    },
    // 阿美雅批注
    amyButton(){
      const {indicatorsId,remark} = this.query
      const data = {
        indicatorId:indicatorsId,
        remark:remark
      }
      api.addAmiyaRemark(data).then((res) => {
        this.$Message.success('已提交')
        this.byIdRemark()
      })
    },
    rowClassName (row, index) {
        if (index === 0) {
            return 'one';
        }else if (index === 1) {
            return 'two';
        }else if (index === 2) {
            return 'three';
        }
        return '';
    },
    hospitalIdChange(){
      const data ={
        hospitalId:this.form.hospitalId
      }
      api.gethospitalNewCustomerAchievement(data).then((res) => {
        if (res.code === 0) {
          const {hospitalNewCustomerAchievement} = res.data
          this.form.lastNewCustomerVisitRate = hospitalNewCustomerAchievement.lastNewCustomerVisitRate
          this.form.thisNewCustomerVisitRate = hospitalNewCustomerAchievement.thisNewCustomerVisitRate
          this.form.newCustomerVisitChainRatio = hospitalNewCustomerAchievement.newCustomerVisitChainRatio
          this.form.lastNewCustomerDealRate = hospitalNewCustomerAchievement.lastNewCustomerDealRate
          this.form.thisNewCustomerDealRate = hospitalNewCustomerAchievement.thisNewCustomerDealRate
          this.form.newCustomerDealChainRatio = hospitalNewCustomerAchievement.newCustomerDealChainRatio
          this.form.lastNewCustomerUnitPrice = hospitalNewCustomerAchievement.lastNewCustomerUnitPrice
          this.form.thisNewCustomerUnitPrice = hospitalNewCustomerAchievement.thisNewCustomerUnitPrice
          this.form.newCustomerUnitPriceChainRatio = hospitalNewCustomerAchievement.newCustomerUnitPriceChainRatio
        }
      });
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
    // 获取医院名称列表
    getHospitalInfonameList() {
      hospitalManage.HospitalInfonameList().then((res) => {
        if (res.code === 0) {
          this.hospitalInfo = res.data.hospitalInfo;
        }
      });
    },
    lastNewCustomerVisitRateChange(){
        // （上月-前月）/前月*100
        const {lastNewCustomerVisitRate,thisNewCustomerVisitRate} =  this.form
        this.form.newCustomerVisitChainRatio = (((Number(thisNewCustomerVisitRate)-Number(lastNewCustomerVisitRate)) / Number(lastNewCustomerVisitRate)).toFixed(2))*100
    },
    thisNewCustomerVisitRateChange(){
        const {lastNewCustomerVisitRate,thisNewCustomerVisitRate} =  this.form
        this.form.newCustomerVisitChainRatio = (((Number(thisNewCustomerVisitRate)-Number(lastNewCustomerVisitRate)) / Number(lastNewCustomerVisitRate)).toFixed(2))*100
    },
    lastNewCustomerDealRateChange(){
        const {lastNewCustomerDealRate,thisNewCustomerDealRate} =  this.form
        this.form.newCustomerDealChainRatio = (((Number(thisNewCustomerDealRate)-Number(lastNewCustomerDealRate)) / Number(lastNewCustomerDealRate)).toFixed(2))*100
    },
    thisNewCustomerDealRateChange(){
        const {lastNewCustomerDealRate,thisNewCustomerDealRate} =  this.form
        this.form.newCustomerDealChainRatio = (((Number(thisNewCustomerDealRate)-Number(lastNewCustomerDealRate)) / Number(lastNewCustomerDealRate)).toFixed(2))*100
    },
    lastNewCustomerUnitPriceChange(){
        const {lastNewCustomerUnitPrice,thisNewCustomerUnitPrice} =  this.form
        this.form.newCustomerUnitPriceChainRatio = (((Number(thisNewCustomerUnitPrice)-Number(lastNewCustomerUnitPrice)) / Number(lastNewCustomerUnitPrice)).toFixed(2))*100
    },
    thisNewCustomerUnitPriceChange(){
        const {lastNewCustomerUnitPrice,thisNewCustomerUnitPrice} =  this.form
        this.form.newCustomerUnitPriceChainRatio = (((Number(thisNewCustomerUnitPrice)-Number(lastNewCustomerUnitPrice)) / Number(lastNewCustomerUnitPrice)).toFixed(2))*100
    },
    thisOldCustomerRepurchaseRateChange(){
        const {lastOldCustomerRepurchaseRate,thisOldCustomerRepurchaseRate} =  this.form
        this.form.oldCustomerRepurchaseChainRatio = (((Number(thisOldCustomerRepurchaseRate)-Number(lastOldCustomerRepurchaseRate)) / Number(lastOldCustomerRepurchaseRate)).toFixed(2))*100
    },
    lastOldCustomerRepurchaseRateChange(){
        const {lastOldCustomerRepurchaseRate,thisOldCustomerRepurchaseRate} =  this.form
        this.form.oldCustomerRepurchaseChainRatio = (((Number(thisOldCustomerRepurchaseRate)-Number(lastOldCustomerRepurchaseRate)) / Number(lastOldCustomerRepurchaseRate)).toFixed(2))*100
    },
    lastOldCustomerUnitPriceChange(){
        const {lastOldCustomerUnitPrice,thisOldCustomerUnitPrice} =  this.form
        this.form.oldCustomerUnitPriceChainRatio = (((Number(thisOldCustomerUnitPrice)-Number(lastOldCustomerUnitPrice)) / Number(lastOldCustomerUnitPrice)).toFixed(2))*100
    },
    thisOldCustomerUnitPriceChange(){
        const {lastOldCustomerUnitPrice,thisOldCustomerUnitPrice} =  this.form
        this.form.oldCustomerUnitPriceChainRatio = (((Number(thisOldCustomerUnitPrice)-Number(lastOldCustomerUnitPrice)) / Number(lastOldCustomerUnitPrice)).toFixed(2))*100
    },
    // 获取优秀健康指标列表
    getGreatHospitalOperationHealth() {
      const { keyword,indicatorsId} = this.query;
      const data = { 
        keyword ,
        indicatorsId:indicatorsId == -1 ? null : indicatorsId,
        };
      api.getGreatHospitalOperationHealth(data).then((res) => {
        if (res.code === 0) {
          const { greatHospitalOperationHealthInfo } = res.data
          this.query.data = greatHospitalOperationHealthInfo;
          this.byIdRemark()
        }
      });
    },

    // 获取优秀健康指标列表分页
    handlePageChange(pageNum) {
        const {  pageSize ,keyword} = this.query;
        const data = { pageNum, pageSize ,keyword };
        api.getGreatHospitalOperationHealth(data).then((res) => {
            if (res.code === 0) {
              const { greatHospitalOperationHealthInfo } = res.data
              this.query.data = greatHospitalOperationHealthInfo;
            }
        });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            //  const {id, hospitalId, indicatorsId, lastNewCustomerVisitRate,thisNewCustomerVisitRate,newCustomerVisitChainRatio,lastNewCustomerDealRate,
            // thisNewCustomerDealRate,newCustomerDealChainRatio,lastNewCustomerUnitPrice,thisNewCustomerUnitPrice,newCustomerUnitPriceChainRatio } = this.form;
            // const  data = { id,hospitalId ,indicatorsId,lastNewCustomerVisitRate,thisNewCustomerVisitRate,newCustomerVisitChainRatio,lastNewCustomerDealRate,
            // thisNewCustomerDealRate,newCustomerDealChainRatio,lastNewCustomerUnitPrice,thisNewCustomerUnitPrice,newCustomerUnitPriceChainRatio} 
            // 修改
            api.editGreatHospitalOperationHealth(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getGreatHospitalOperationHealth();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { hospitalId, indicatorsId, lastNewCustomerVisitRate,thisNewCustomerVisitRate,newCustomerVisitChainRatio,lastNewCustomerDealRate,
            thisNewCustomerDealRate,newCustomerDealChainRatio,lastNewCustomerUnitPrice,thisNewCustomerUnitPrice,newCustomerUnitPriceChainRatio,
            lastOldCustomerRepurchaseRate,thisOldCustomerRepurchaseRate ,oldCustomerRepurchaseChainRatio ,
            lastOldCustomerUnitPrice  ,thisOldCustomerUnitPrice  ,oldCustomerUnitPriceChainRatio  
             } = this.form;
            const  data = { hospitalId ,indicatorsId,lastNewCustomerVisitRate,thisNewCustomerVisitRate,newCustomerVisitChainRatio,lastNewCustomerDealRate,
            thisNewCustomerDealRate,newCustomerDealChainRatio,lastNewCustomerUnitPrice,thisNewCustomerUnitPrice,newCustomerUnitPriceChainRatio,
            lastOldCustomerRepurchaseRate,thisOldCustomerRepurchaseRate ,oldCustomerRepurchaseChainRatio ,
            lastOldCustomerUnitPrice  ,thisOldCustomerUnitPrice  ,oldCustomerUnitPriceChainRatio  
            } 
            // 添加
            api.addGreatHospitalOperationHealth(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getGreatHospitalOperationHealth();
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
      this.$refs[name].resetFields();
    },

    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.isEdit = false;
        this.$refs["form"].resetFields();
      }
    },
  },
  created() {
    this.getGreatHospitalOperationHealth();
    this.getHospitalInfonameList()
    this.getHospitalOperationIndicatorNameList()
    this.byIdRemark()
  },
};
</script>
<style lang="less" >
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
.ivu-table .one td{
    color: red;
}
.ivu-table .two td{
    color:  #ff6600;
}
.ivu-table .three td{
    color: orange;
}
.h1{
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 15px 0;
}
.button{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>