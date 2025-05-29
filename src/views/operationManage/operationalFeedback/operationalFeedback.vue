<template>
  <div>
    <Card :dis-hover="true">
      <div class="header_wrap">
        <div class="left">
          <Input
            v-model="query.keyWord"
            placeholder="请输入关键词"
            style="width: 180px; "
            @keyup.enter.native="getRunTangDateOperationListWithPage()"
          />
          <DatePicker
            type="date"
            placeholder="开始时间"
            style="width:120px;margin-left: 10px"
            :value="query.startDate"
            v-model="query.startDate"
            ></DatePicker>
          <DatePicker
            type="date"
            placeholder="结束时间"
            style="width:120px;margin-left: 10px"
            :value="query.endDate"
            v-model="query.endDate"
            ></DatePicker>
           <Select
            v-model="query.valid"
            placeholder="请选择是否有效"
            filterable
            style="width:140px;margin-left: 10px"
            >
            <Option
                v-for="item in validList"
                :value="item.type"
                :key="item.type"
                >{{ item.name }}</Option
            >
            </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getRunTangDateOperationListWithPage()"
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
      width="60%"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="140"
      >
        <Row :gutter="30">
          <Col span="8">
            <FormItem label="登记时间" prop="recordDate" >
              <DatePicker
                type="date"
                placeholder="登记时间"
                style="width:100%"
                :value="form.recordDate"
                v-model="form.recordDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="基础主播" prop="liveAnchorBaseId" >
              <Select
                  v-model="form.liveAnchorBaseId"
                  placeholder="请选择基础主播"
                  filterable
                  transfer
                >
                  <Option
                    v-for="item in liveAnchorBaseInfos"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="主动添加（客户）" prop="customerAddNum">
              <Input
                v-model="form.customerAddNum"
                placeholder="请输入主动添加（客户）"
                type="number"
                number
                @on-change="totalAddNumChange()"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="被动添加（我们）" prop="companyAddNum">
              <Input
                v-model="form.companyAddNum"
                placeholder="请输入被动添加（我们）"
                type="number"
                number
                @on-change="totalAddNumChange()"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="当日添加总数" prop="totalAddNum">
              <Input
                v-model="form.totalAddNum"
                placeholder="请输入当日添加总数"
                type="number"
                number
                @on-change="totalAddNumChange()"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="有效沟通" prop="effictiveCommunicationNum">
              <Input
                v-model="form.effictiveCommunicationNum"
                placeholder="请输入有效沟通"
                type="number"
                number
                @on-change="totalAddNumChange()"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="有效沟通率（%）" prop="effictiveCommunicationRate">
              <Input
                v-model="form.effictiveCommunicationRate"
                placeholder="请输入有效沟通率"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="无效客资" prop="invalidCustomerNum">
              <Input
                v-model="form.invalidCustomerNum"
                placeholder="请输入无效客资"
                type="number"
                number
                @on-change="totalAddNumChange()"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="有效客资" prop="effictiveCustomerNum">
              <Input
                v-model="form.effictiveCustomerNum"
                placeholder="请输入有效客资"
                type="number"
                number
                @on-change="totalAddNumChange()"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="客资有效率（%）" prop="effictiveCustomerRate">
              <Input
                v-model="form.effictiveCustomerRate"
                placeholder="请输入客资有效率"
                type="number"
                number
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="2"
              ></Input>
            </FormItem>
          </Col>
          <Spin fix v-if="flag == true">
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
import * as api from "@/api/runTangDateOperation";
import * as liveAnchorBaseInfoApi from "@/api/liveAnchorBaseInfo";

export default {
  data() {
    return {
        flag:false,
        validList:[{
            type:'true',
            name:'有效'
        },
        {
            type:'false',
            name:'无效'
        }],
      // 查询
      query: {
        startDate:this.$moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        endDate:this.$moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        keyWord: "",
        valid:'true',
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "创建人",
            key: "createByName",
            minWidth:120,
            align:'center'
          },
          {
            title: "登记时间",
            key: "recordDate",
            minWidth:130,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.recordDate ?  this.$moment(params.row.recordDate).format("YYYY-MM-DD") : ''
              );
            },
          },
          {
            title: "基础主播",
            key: "liveAnchorBaseName",
            minWidth:160,
            align:'center'
          },
          {
            title: "主动添加（客户）",
            key: "customerAddNum",
            minWidth:150,
            align:'center'
          },
          {
            title: "被动添加（我们）",
            key: "companyAddNum",
            minWidth:150,
            align:'center'
          },
          {
            title: "当日添加总数",
            key: "totalAddNum",
            minWidth:140,
            align:'center'
          },
          {
            title: "有效沟通",
            key: "effictiveCommunicationNum",
            minWidth:100,
            align:'center'
          },
          {
            title: "有效沟通率",
            key: "effictiveCommunicationRate",
            minWidth:120,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.effictiveCommunicationRate ? params.row.effictiveCommunicationRate  + '%' : 0
              );
            },
          },
          {
            title: "无效客资",
            key: "invalidCustomerNum",
            minWidth:100,
            align:'center'
          },
          {
            title: "有效客资",
            key: "effictiveCustomerNum",
            minWidth:100,
            align:'center'
          },
          {
            title: "客资有效率",
            key: "effictiveCustomerRate",
            minWidth:160,
            align:'center',
            render: (h, params) => {
              return h(
                "div",
                params.row.effictiveCustomerRate ? params.row.effictiveCustomerRate  + '%' : 0
              );
            },
          },
          {
            title: "备注",
            key: "remark",
            minWidth:300,
            align:'center',
            tooltip:true
          },
          {
            title: "操作",
            key: "",
            align:'center',
            minWidth: 160,
            fixed:'right',
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
                        api.byIdRunTangDateOperation(id).then((res) => {
                          if (res.code === 0) {
                            const {
                              id,
                              recordDate, 
                              liveAnchorBaseId, 
                              customerAddNum, 
                              companyAddNum,
                              totalAddNum,
                              effictiveCommunicationNum,
                              effictiveCommunicationRate,
                              invalidCustomerNum,
                              effictiveCustomerNum,
                              effictiveCustomerRate,
                              remark
                            } = res.data.runTangDateOperation;
                            this.isEdit = true;
                            this.form.recordDate = recordDate;
                            this.form.liveAnchorBaseId = liveAnchorBaseId;
                            this.form.customerAddNum = customerAddNum;
                            this.form.companyAddNum = companyAddNum;
                            this.form.totalAddNum = totalAddNum;
                            this.form.effictiveCommunicationNum = effictiveCommunicationNum;
                            this.form.effictiveCommunicationRate = effictiveCommunicationRate;
                            this.form.invalidCustomerNum = invalidCustomerNum;
                            this.form.effictiveCustomerNum = effictiveCustomerNum;
                            this.form.effictiveCustomerRate = effictiveCustomerRate;
                            this.form.remark = remark;
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
                            api.deleteRunTangDateOperation(id).then((res) => {
                              if (res.code === 0) {
                                this.getRunTangDateOperationListWithPage();
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
        id: "",
        // 登记时间
        recordDate: this.$moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        // 创建人
        createByName:'',
        // 基础主播id
        liveAnchorBaseId:'',
        // 主动添加（客户）
        customerAddNum:null,
        // 被动添加（我们）
        companyAddNum:null,
        // 当日添加总数
        totalAddNum:null,
        // 有效沟通
        effictiveCommunicationNum:null,
        // 有效沟通率
        effictiveCommunicationRate:null,
        // 无效客资
        invalidCustomerNum:null,
        // 有效客资
        effictiveCustomerNum:null,
        // 客资有效率
        effictiveCustomerRate:null,
        // 备注
        remark:''
      },

      ruleValidate: {
        recordDate: [
          {
            required: true,
            message: "请选择登记时间",
          },
        ],
        liveAnchorBaseId: [
          {
            required: true,
            message: "请选择基础主播",
          },
        ],
        customerAddNum: [
          {
            required: true,
            message: "请输入主动添加（客户）",
          },
        ],
        companyAddNum: [
          {
            required: true,
            message: "请输入被动添加（我们）",
          },
        ],
        totalAddNum: [
          {
            required: true,
            message: "请输入当日添加总数",
          },
        ],
        effictiveCommunicationNum: [
          {
            required: true,
            message: "请输入有效沟通",
          },
        ],
        effictiveCommunicationRate: [
          {
            required: true,
            message: "请输入有效沟通率",
          },
        ],
        invalidCustomerNum: [
          {
            required: true,
            message: "请输入无效客资",
          },
        ],
        effictiveCustomerNum: [
          {
            required: true,
            message: "请输入有效客资",
          },
        ],
        effictiveCustomerRate: [
          {
            required: true,
            message: "请输入客资有效率",
          },
        ],
      },
      //   基础主播
      liveAnchorBaseInfos:[]
    };

  },
  methods: {
    totalAddNumChange(value){
      const {effictiveCommunicationNum,effictiveCustomerNum,customerAddNum,companyAddNum,invalidCustomerNum,totalAddNum} = this.form
      this.form.totalAddNum = customerAddNum + companyAddNum
      const num1 = (effictiveCommunicationNum / this.form.totalAddNum) * 100
      const num2 = (effictiveCustomerNum / this.form.totalAddNum) * 100
      this.form.effictiveCommunicationRate =  Math.round(num1  * 100) / 100;
      this.form.effictiveCustomerRate =  Math.round(num2 * 100) / 100;
      this.form.effictiveCustomerNum =  customerAddNum + companyAddNum - invalidCustomerNum
    }, 
    // 主播基础数据列表
    getLiveAnchorBaseInfoValids(){
      liveAnchorBaseInfoApi.getLiveAnchorBaseInfoValid().then((res) => {
        if (res.code === 0) {
          const {liveAnchorBaseInfos} = res.data
          this.liveAnchorBaseInfos = liveAnchorBaseInfos
        }
      });
    },
    // 获取润棠运营反馈列表
    getRunTangDateOperationListWithPage() {
      this.$nextTick(() => {
        this.$refs["pages"].currentPage = 1;
      });
      const { pageNum, pageSize, keyWord,startDate,endDate,valid } = this.query;
      const data = { 
        pageNum, 
        pageSize, 
        keyWord,
        startDate : this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date(endDate)).format("YYYY-MM-DD"),
        valid 
      };
      this.flag = true;
      api.RunTangDateOperationListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.runTangDateOperation;
          this.flag = false;
          this.query.data = list;
          this.query.totalCount = totalCount;
        }
      });
    },

    // 获取润棠运营反馈列表分页
    handlePageChange(pageNum) {
      const { pageSize, keyWord,startDate,endDate,valid } = this.query;
      const data = { 
        pageNum, 
        pageSize, 
        keyWord,
        startDate : this.$moment(new Date(startDate)).format("YYYY-MM-DD"),
        endDate: this.$moment(new Date(endDate)).format("YYYY-MM-DD"),
        valid 
      };
      this.flag = true;
      api.RunTangDateOperationListWithPage(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.runTangDateOperation;
          this.flag = false;
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
            const { id,recordDate, liveAnchorBaseId, customerAddNum, companyAddNum,totalAddNum,effictiveCommunicationNum,effictiveCommunicationRate,invalidCustomerNum,effictiveCustomerNum,effictiveCustomerRate,remark} = this.form;
            const data = { id,recordDate:this.$moment(new Date(recordDate)).format("YYYY-MM-DD"), liveAnchorBaseId, customerAddNum,companyAddNum ,totalAddNum,effictiveCommunicationNum,effictiveCommunicationRate,invalidCustomerNum,effictiveCustomerNum,effictiveCustomerRate,remark};
            // 修改
            api.updateRunTangDateOperation(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getRunTangDateOperationListWithPage();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
          } else {
            const { recordDate, liveAnchorBaseId, customerAddNum, companyAddNum,totalAddNum,effictiveCommunicationNum,effictiveCommunicationRate,invalidCustomerNum,effictiveCustomerNum,effictiveCustomerRate,remark} = this.form;
            const data = { recordDate:this.$moment(new Date(recordDate)).format("YYYY-MM-DD"), liveAnchorBaseId, customerAddNum,companyAddNum ,totalAddNum,effictiveCommunicationNum,effictiveCommunicationRate,invalidCustomerNum,effictiveCustomerNum,effictiveCustomerRate,remark};
            // 添加
            api.addRunTangDateOperation(data).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getRunTangDateOperationListWithPage();
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
    this.getRunTangDateOperationListWithPage();
    this.getLiveAnchorBaseInfoValids()
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
