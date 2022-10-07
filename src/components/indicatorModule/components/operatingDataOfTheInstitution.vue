<template>
  <div>
    <!-- <Card :dis-hover="true"> -->
      <div class="header_wrap" >
        <div class="left">
         <!--  <Input
            v-model="query.keyword"
            placeholder="请输入关键字"
            style="width: 200px; margin-left: 10px"
            @keyup.enter.native="getHospitalOperationData()"
          />
          <Select
            v-model="query.indicatorsId"
            placeholder="请选择指标名称"
            style="width: 200px; margin-left: 10px"
            filterable
            :disabled="employeeType=='hospitalEmployee'"
          >
            <Option
              v-for="item in indicatorNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Select
            v-model="query.hospitalId"
            placeholder="请选择医院"
            style="width: 200px; margin-left: 10px"
            :disabled="employeeType=='hospitalEmployee'"
          >
            <Option
              v-for="item in hospitalInfo"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
          <Button
            type="primary"
            style="margin-left: 10px"
            @click="getHospitalOperationData()"
            >查询</Button
          >-->
        </div> 
        <div class="right">
          <Button
            type="primary"
            @click="addClick"
            v-if="employeeType=='hospitalEmployee'"
            >添加</Button
            
          >
        </div>
      </div>
    <!-- </Card> -->

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data" height="390"></Table>
      </div>
      <div class="h1">机构分析</div>
        <Input
            v-model="query.hospitalOperationRemark"
            placeholder="请输入机构分析"
            style="width: 100%; "
            type="textarea"
            :rows="3"
            :disabled="employeeType != 'hospitalEmployee'"
        />
        <div class="h1">阿美雅批注</div>
        <Input
            v-model="query.amiyaOperationRemark"
            placeholder="请输入阿美雅批注"
            style="width: 100%; "
            type="textarea"
            :rows="3"
            :disabled="employeeType== 'hospitalEmployee'"
        />
        <div class="button"><Button type="primary" @click="submitClick">提交</Button></div>
    </Card>

    <Modal
      v-model="controlModal"
      :title="title"
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
        <div class="title">前月</div>
        <Divider style="margin-top:4px" />
        <Row :gutter="30">
          <Col span="8">
            <FormItem
              label="派单数"
              prop="dispatchNum1"
              :rules="[
                {
                  required: true,
                  message: '派单数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.dispatchNum1"
                type="number"
                number
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
                  message: '新客上门人数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newVisitNum1"
                type="number"
                number
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
                  message: '新客上门率(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newVisitNumRate1"
                type="number"
                number
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
                  message: '新客成交人数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newDealNum1"
                type="number"
                number
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
                  message: '新客成交率(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newDealRate1"
                type="number"
                number
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
                  message: '新客业绩(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newAchievementNum1"
                type="number"
                number
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
                  message: '新客客单价(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newPrice1"
                type="number"
                number
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
                  message: '老客上门人数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldVisitNum1"
                type="number"
                number
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
                  message: '老客成交人数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldDealNum1"
                type="number"
                number
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
                  message: '老客成交率(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldDealRate1"
                type="number"
                number
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
                  message: '老客业绩(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldAchievementNum1"
                type="number"
                number
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
                  message: '老客客单价(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldPrice1"
                type="number"
                number
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
                  message: '老客业绩占比(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldAchievementProportion1"
                type="number"
                number
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
                  message: '总业绩(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.totalPerformance1"
                type="number"
                number
                placeholder="请输入总业绩"
                @on-change="totalPerformance2Change"
              ></Input>
            </FormItem>
          </Col>
        </Row>

        <div class="title">上月</div>
        <Divider style="margin-top:4px" />
        <Row :gutter="30">
          <Col span="8">
            <FormItem
              label="派单数"
              prop="dispatchNum2"
              :rules="[
                {
                  required: true,
                  message: '派单数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.dispatchNum2"
                type="number"
                number
                placeholder="请输入派单数"
                @on-change="dispatchNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客上门人数"
              prop="newVisitNum2"
              :rules="[
                {
                  required: true,
                  message: '新客上门人数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newVisitNum2"
                type="number"
                number
                placeholder="请输入新客上门人数"
                @on-change="newVisitNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客上门率(%)"
              prop="newVisitNumRate2"
              :rules="[
                {
                  required: true,
                  message: '新客上门率(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newVisitNumRate2"
                type="number"
                number
                placeholder="请输入新客上门率"
                @on-change="newVisitNumRate2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客成交人数"
              prop="newDealNum2"
              :rules="[
                {
                  required: true,
                  message: '新客成交人数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newDealNum2"
                type="number"
                number
                placeholder="请输入新客成交人数"
                @on-change="newDealNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客成交率(%)"
              prop="newDealRate2"
              :rules="[
                {
                  required: true,
                  message: '新客成交率(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newDealRate2"
                type="number"
                number
                placeholder="请输入新客成交率"
                @on-change="newDealRate2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客业绩"
              prop="newAchievementNum2"
              :rules="[
                {
                  required: true,
                  message: '新客业绩(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newAchievementNum2"
                type="number"
                number
                placeholder="请输入新客业绩"
                @on-change="newAchievementNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客客单价"
              prop="newPrice2"
              :rules="[
                {
                  required: true,
                  message: '新客客单价(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.newPrice2"
                type="number"
                number
                placeholder="请输入新客客单价"
                @on-change="newPrice2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客上门人数"
              prop="oldVisitNum2"
              :rules="[
                {
                  required: true,
                  message: '老客上门人数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldVisitNum2"
                type="number"
                number
                placeholder="请输入老客上门人数"
                @on-change="oldVisitNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客成交人数"
              prop="oldDealNum2"
              :rules="[
                {
                  required: true,
                  message: '老客成交人数(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldDealNum2"
                type="number"
                number
                placeholder="请输入老客成交人数"
                @on-change="oldDealNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客成交率(%)"
              prop="oldDealRate2"
              :rules="[
                {
                  required: true,
                  message: '老客成交率(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldDealRate2"
                type="number"
                number
                placeholder="请输入老客成交率"
                @on-change="oldDealRate2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客业绩"
              prop="oldAchievementNum2"
              :rules="[
                {
                  required: true,
                  message: '老客业绩(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldAchievementNum2"
                type="number"
                number
                placeholder="请输入老客业绩"
                @on-change="oldAchievementNum2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客客单价"
              prop="oldPrice2"
              :rules="[
                {
                  required: true,
                  message: '老客客单价(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldPrice2"
                type="number"
                number
                placeholder="请输入老客客单价"
                @on-change="oldPrice2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客业绩占比(%)"
              prop="oldAchievementProportion2"
              :rules="[
                {
                  required: true,
                  message: '老客业绩占比(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.oldAchievementProportion2"
                type="number"
                number
                placeholder="请输入老客业绩占比"
                @on-change="oldAchievementProportion2Change"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="总业绩"
              prop="totalPerformance2"
              :rules="[
                {
                  required: true,
                  message: '总业绩(最小是0)',
                  trigger: 'change',
                  type: 'number',
                  min: 0,
                },
              ]"
            >
              <Input
                v-model="form.totalPerformance2"
                type="number"
                number
                placeholder="请输入总业绩"
                @on-change="totalPerformance2Change"
              ></Input>
            </FormItem>
          </Col>
        </Row>

        <div class="title">环比</div>
        <Divider style="margin-top:4px" />
        <Row :gutter="30">
          <Col span="8">
            <FormItem
              label="派单数"
              prop="dispatchNum3"
            >
              <Input
                v-model="form.dispatchNum3"
                type="number"
                number
                placeholder="请输入派单数"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客上门人数"
              prop="newVisitNum3"
            >
              <Input
                v-model="form.newVisitNum3"
                type="number"
                number
                placeholder="请输入新客上门人数"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客上门率(%)"
              prop="newVisitNumRate3"
            >
              <Input
                v-model="form.newVisitNumRate3"
                type="number"
                number
                placeholder="请输入新客上门率"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客成交人数"
              prop="newDealNum3"
            >
              <Input
                v-model="form.newDealNum3"
                type="number"
                number
                placeholder="请输入新客成交人数"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客成交率(%)"
              prop="newDealRate3"
            >
              <Input
                v-model="form.newDealRate3"
                type="number"
                number
                placeholder="请输入新客成交率"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客业绩"
              prop="newAchievementNum3"
            >
              <Input
                v-model="form.newAchievementNum3"
                type="number"
                number
                placeholder="请输入新客业绩"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="新客客单价"
              prop="newPrice3"
            >
              <Input
                v-model="form.newPrice3"
                type="number"
                number
                placeholder="请输入新客客单价"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客上门人数"
              prop="oldVisitNum3"
            >
              <Input
                v-model="form.oldVisitNum3"
                type="number"
                number
                placeholder="请输入老客上门人数"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客成交人数"
              prop="oldDealNum3"
            >
              <Input
                v-model="form.oldDealNum3"
                type="number"
                number
                placeholder="请输入老客成交人数"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客成交率(%)"
              prop="oldDealRate3"
            >
              <Input
                v-model="form.oldDealRate3"
                type="number"
                number
                placeholder="请输入老客成交率"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客业绩"
              prop="oldAchievementNum3"
            >
              <Input
                v-model="form.oldAchievementNum3"
                type="number"
                number
                placeholder="请输入老客业绩"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客客单价"
              prop="oldPrice3"
            >
              <Input
                v-model="form.oldPrice3"
                type="number"
                number
                placeholder="请输入老客客单价"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="老客业绩占比(%)"
              prop="oldAchievementProportion3"
            >
              <Input
                v-model="form.oldAchievementProportion3"
                type="number"
                number
                placeholder="请输入老客业绩占比"
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="总业绩"
              prop="totalPerformance3"
            >
              <Input
                v-model="form.totalPerformance3"
                type="number"
                number
                placeholder="请输入总业绩"
                disabled
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
    <!-- 编辑指标 -->
    <editHospitalData :editcontrolModal.sync="editcontrolModal" :hospitalOperationDataInfo="hospitalOperationDataInfo" @getHospitalOperationData="getHospitalOperationData"></editHospitalData>
  </div>
</template>
<script>
import * as api from "@/api/GreatHospitalOperationHealth";
import editHospitalData from "./editHospitalData.vue"

export default {
    props:{
        active:String,
        indicatorsId:String,
        indicatorNameList:Array,
        hospitalInfo:Array,
        hospitalId:Number,
    },
    components:{
      editHospitalData
    },
  data() {
    return {
       
      // 查询
      query: {
        amiyaOperationRemark:'',
        hospitalOperationRemark:'',
        keyword: "",
        indicatorsId:'',
        hospitalId:-1,
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: "运营维度",
            key: "operationName",
          },
          {
            title: "上月数据",
            key: "lastMonthData",
          },
          {
            title: "前月数据",
            key: "beforeMonthData",
          },
          {
            title: "环比",
            key: "chainRatio",
            render: (h, params) => {
              return h("div", params.row.chainRatio + "%");
            },
          },
          {
            title: "优秀机构",
            key: "greatHospital",
          },
          {
            title: "操作",
            key: "",
            width: 120,
            align:'center',
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                      disabled: sessionStorage.getItem('employeeType') == 'amiyaEmployee',
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        const { id } = params.row;
                        this.title = "修改";
                        api.byIdHospitalOperationData(id).then((res) => {
                          if (res.code === 0) {
                            this.hospitalOperationDataInfo = res.data.hospitalOperationDataInfo
                            this.editcontrolModal = true;
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
                //             api.deleteHospitalOperationData(id).then((res) => {
                //               if (res.code === 0) {
                //                 this.getHospitalOperationData();
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
      employeeType:sessionStorage.getItem('employeeType'),

      // 控制 modal
      controlModal: false,
      editcontrolModal:false,
      // modal title
      title: "添加",

      // 是否是编辑
      isEdit: false,

      form: {
        id: "",
        // 派单数
        dispatchNum1: null,
        dispatchNum2: null,
        dispatchNum3: null,
        // 新客上门
        newVisitNum1: null,
        newVisitNum2: null,
        newVisitNum3: null,
        // 新客上门率
        newVisitNumRate1: null,
        newVisitNumRate2: null,
        newVisitNumRate3: null,
        // 新客成交人数
        newDealNum1: null,
        newDealNum2: null,
        newDealNum3: null,
        // 新客成交率
        newDealRate1: null,
        newDealRate2: null,
        newDealRate3: null,
        // 新客业绩
        newAchievementNum1: null,
        newAchievementNum2: null,
        newAchievementNum3: null,
        // 新客客单价
        newPrice1: null,
        newPrice2: null,
        newPrice3: null,
        // 老客上门人数
        oldVisitNum1: null,
        oldVisitNum2: null,
        oldVisitNum3: null,
        // 老客成交人数
        oldDealNum1: null,
        oldDealNum2: null,
        oldDealNum3: null,
        // 老客成交率
        oldDealRate1: null,
        oldDealRate2: null,
        oldDealRate3: null,
        // 老客业绩
        oldAchievementNum1: null,
        oldAchievementNum2: null,
        oldAchievementNum3: null,
        // 老客客单价
        oldPrice1: null,
        oldPrice2: null,
        oldPrice3: null,
        // 老客业绩占比
        oldAchievementProportion1: null,
        oldAchievementProportion2: null,
        oldAchievementProportion3: null,
        // 总业绩
        totalPerformance1: null,
        totalPerformance2: null,
        totalPerformance3: null,
      },

      ruleValidate: {
        dispatchNum3: [
          {
            required: true,
            message: "请输入派单数",
          },
        ],
        newVisitNum3: [
          {
            required: true,
            message: "请输入新客上门",
          },
        ],
        newVisitNumRate3: [
          {
            required: true,
            message: "请输入新客上门率",
          },
        ],
        newDealNum3: [
          {
            required: true,
            message: "请输入新客成交人数",
          },
        ],
        newDealRate3: [
          {
            required: true,
            message: "请输入新客成交率",
          },
        ],
        newAchievementNum3: [
          {
            required: true,
            message: "请输入新客业绩",
          },
        ],
        newPrice3: [
          {
            required: true,
            message: "请输入新客客单价",
          },
        ],
        oldVisitNum3: [
          {
            required: true,
            message: "请输入老客上门人数",
          },
        ],

        oldDealNum3: [
          {
            required: true,
            message: "请输入老客成交人数",
          },
        ],
        oldDealRate3: [
          {
            required: true,
            message: "请输入老客成交率",
          },
        ],

        oldAchievementNum3: [
          {
            required: true,
            message: "请输入老客业绩",
          },
        ],
        oldPrice3: [
          {
            required: true,
            message: "请输入老客客单价",
          },
        ],

        oldAchievementProportion3: [
          {
            required: true,
            message: "请输入老客业绩占比",
          },
        ],
        totalPerformance3: [
          {
            required: true,
            message: "请输入总业绩",
          },
        ],
      },
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
      hospitalOperationDataInfo:{}
    };
    
    
  },
  methods: {
    getHospitalOperationRemark(){
      const data = { 
        indicatorId:this.indicatorsId,
        hospitalId:this.hospitalId
      };
      api.getHospitalOperationRemark(data).then((res) => {
        if (res.code === 0) {
          const {hospitalOperationRemark } = res.data;
          this.query.amiyaOperationRemark = hospitalOperationRemark.amiyaOperationRemark;
          this.query.hospitalOperationRemark = hospitalOperationRemark.hospitalOperationRemark
        }
      });
    },
    submitClick(){
      const {amiyaOperationRemark,hospitalOperationRemark} = this.query
      const data = {
        indicatorId:this.indicatorsId,
        hospitalId:this.hospitalId,
        hospitalOperationRemark,
        amiyaOperationRemark
      }
      api.addHospitalOperationRemark(data).then((res) => {
        if (res.code === 0) {
          this.$Message.success('已提交')
          this.getHospitalOperationRemark()
        }
      });
    },
    addClick(){
      if(this.query.data.length == 0){
        this.controlModal = true;
        this.title = '添加';
        
      }else{
        this.$Message.warning('当前指标数据已添加,请勿重复添加')
        return
      }
    },
    // 派单数
    dispatchNum2Change(){
        const {dispatchNum1,dispatchNum2} = this.form
        if(dispatchNum1 == 0 || dispatchNum2 == 0){
          this.form.dispatchNum3 = 0
          return
        }
        // 前月1 上月2 环比3
        this.form.dispatchNum3 = (((dispatchNum2-dispatchNum1)/dispatchNum1)*100).toFixed(2)
        this.dispatchNumlist1 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'派单数',
                lastMonthData:dispatchNum2,
                beforeMonthData:dispatchNum1,
                chainRatio: this.form.dispatchNum3
            }
        ]
    },
    // 新客上门人数
    newVisitNum2Change(){
        const {newVisitNum1,newVisitNum2} = this.form
        if(newVisitNum1 == 0 || newVisitNum2 == 0){
          this.form.newVisitNum3 = 0
          return
        }
        // 前月1 上月2 环比3
        this.form.newVisitNum3 = (((newVisitNum2-newVisitNum1)/newVisitNum1)*100).toFixed(2)
        this.dispatchNumlist2 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'新客上门人数',
                lastMonthData:newVisitNum2,
                beforeMonthData:newVisitNum1,
                chainRatio: this.form.newVisitNum3
            }
        ]
    },
    // 新客上门率
    newVisitNumRate2Change(){
        const {newVisitNumRate1,newVisitNumRate2} = this.form
        if(newVisitNumRate1 == 0 || newVisitNumRate2 == 0){
          this.form.newVisitNumRate3 = 0
          return
        }
        this.form.newVisitNumRate3 = (((newVisitNumRate2-newVisitNumRate1)/newVisitNumRate1)*100).toFixed(2)
        this.dispatchNumlist3 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'新客上门率',
                lastMonthData:newVisitNumRate2,
                beforeMonthData:newVisitNumRate1,
                chainRatio: this.form.newVisitNumRate3
            }
        ]
    },
    // 新客成交人数
    newDealNum2Change(){
        const {newDealNum1,newDealNum2} = this.form
        if(newDealNum1 == 0 || newDealNum2 == 0){
          this.form.newDealNum3 = 0
          return
        }
        this.form.newDealNum3 = (((newDealNum2-newDealNum1)/newDealNum1)*100).toFixed(2)
        this.dispatchNumlist4 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'新客成交人数',
                lastMonthData:newDealNum2,
                beforeMonthData:newDealNum1,
                chainRatio: this.form.newDealNum3
            }
        ]
    },
    // 新客成交率
    newDealRate2Change(){
        const {newDealRate1,newDealRate2} = this.form
        if(newDealRate1 == 0 || newDealRate2 == 0){
          this.form.newDealRate3 = 0
          return
        }
        this.form.newDealRate3 = (((newDealRate2-newDealRate1)/newDealRate1)*100).toFixed(2)
        this.dispatchNumlist5 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'新客成交率',
                lastMonthData:newDealRate2,
                beforeMonthData:newDealRate1,
                chainRatio: this.form.newDealRate3
            }
        ]
    },
    // 新客业绩
    newAchievementNum2Change(){
        const {newAchievementNum1,newAchievementNum2} = this.form
        if(newAchievementNum1 == 0 || newAchievementNum2 == 0){
          this.form.newAchievementNum3 = 0
          return
        }
        this.form.newAchievementNum3 = (((newAchievementNum2-newAchievementNum1)/newAchievementNum1)*100).toFixed(2)
        this.dispatchNumlist6 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'新客业绩',
                lastMonthData:newAchievementNum2,
                beforeMonthData:newAchievementNum1,
                chainRatio: this.form.newAchievementNum3
            }
        ]
    },
    // 新客客单价
    newPrice2Change(){
        const {newPrice1,newPrice2} = this.form
        if(newPrice1 == 0 || newPrice2 == 0){
          this.form.newPrice3 = 0
          return
        }
        this.form.newPrice3 = (((newPrice2-newPrice1)/newPrice1)*100).toFixed(2)
        this.dispatchNumlist7 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'新客客单价',
                lastMonthData:newPrice2,
                beforeMonthData:newPrice1,
                chainRatio: this.form.newPrice3
            }
        ]
    },
    // 老客上门人数
    oldVisitNum2Change(){
        const {oldVisitNum1,oldVisitNum2} = this.form
        if(oldVisitNum1 == 0 || oldVisitNum2 == 0){
          this.form.oldVisitNum3 = 0
          return
        }
        this.form.oldVisitNum3 = (((oldVisitNum2-oldVisitNum1)/oldVisitNum1)*100).toFixed(2)
        this.dispatchNumlist8 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'老客上门人数',
                lastMonthData:oldVisitNum2,
                beforeMonthData:oldVisitNum1,
                chainRatio: this.form.oldVisitNum3
            }
        ]
    },
    // 老客成交人数
    oldDealNum2Change(){
        const {oldDealNum1,oldDealNum2} = this.form
        if(oldDealNum1 == 0 || oldDealNum2 == 0){
          this.form.oldDealNum3 = 0
          return
        }
        this.form.oldDealNum3 = (((oldDealNum2-oldDealNum1)/oldDealNum1)*100).toFixed(2)
        this.dispatchNumlist9 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'老客成交人数',
                lastMonthData:oldDealNum2,
                beforeMonthData:oldDealNum1,
                chainRatio: this.form.oldDealNum3
            }
        ]
    },
    // 老客成交率
    oldDealRate2Change(){
        const {oldDealRate1,oldDealRate2} = this.form
        if(oldDealRate1 == 0 || oldDealRate2 == 0){
          this.form.oldDealRate3 = 0
          return
        }
        this.form.oldDealRate3 = (((oldDealRate2-oldDealRate1)/oldDealRate1)*100).toFixed(2)
        this.dispatchNumlist10 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'老客成交率',
                lastMonthData:oldDealRate2,
                beforeMonthData:oldDealRate1,
                chainRatio: this.form.oldDealRate3
            }
        ]
    },
    // 老客业绩
    oldAchievementNum2Change(){
        const {oldAchievementNum1,oldAchievementNum2} = this.form
        if(oldAchievementNum1 == 0 || oldAchievementNum2 == 0){
          this.form.oldAchievementNum3 = 0
          return
        }
        this.form.oldAchievementNum3 = (((oldAchievementNum2-oldAchievementNum1)/oldAchievementNum1)*100).toFixed(2)
        this.dispatchNumlist11 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'老客业绩',
                lastMonthData:oldAchievementNum2,
                beforeMonthData:oldAchievementNum1,
                chainRatio: this.form.oldAchievementNum3
            }
        ]
    },
    // 老客客单价
    oldPrice2Change(){
        const {oldPrice1,oldPrice2} = this.form
        if(oldPrice1 == 0 || oldPrice2 == 0){
          this.form.oldPrice3 = 0
          return
        }
        this.form.oldPrice3 = (((oldPrice2-oldPrice1)/oldPrice1)*100).toFixed(2)
        this.dispatchNumlist12 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'老客客单价',
                lastMonthData:oldPrice2,
                beforeMonthData:oldPrice1,
                chainRatio: this.form.oldPrice3
            }
        ]
    },
    // 老客业绩占比
    oldAchievementProportion2Change(){
        const {oldAchievementProportion1,oldAchievementProportion2} = this.form
        if(oldAchievementProportion1 == 0 || oldAchievementProportion2 == 0){
          this.form.oldAchievementProportion3 = 0
          return
        }
        this.form.oldAchievementProportion3 = (((oldAchievementProportion2-oldAchievementProportion1)/oldAchievementProportion1)*100).toFixed(2)
        this.dispatchNumlist13 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'老客业绩占比',
                lastMonthData:oldAchievementProportion2,
                beforeMonthData:oldAchievementProportion1,
                chainRatio: this.form.oldAchievementProportion3
            }
        ]
    },
    // 总业绩
    totalPerformance2Change(){
        const {totalPerformance1,totalPerformance2} = this.form
        if(totalPerformance1 == 0 || totalPerformance2 == 0){
          this.form.totalPerformance3 = 0
          return
        }
        this.form.totalPerformance3 = (((totalPerformance2-totalPerformance1)/totalPerformance1)*100).toFixed(2)
        this.totalPerformance14 = [
            {
                hospitalId:Number(sessionStorage.getItem('hospitalId')),
                indicatorsId:this.indicatorsId,
                operationName:'总业绩',
                lastMonthData:totalPerformance2,
                beforeMonthData:totalPerformance1,
                chainRatio: this.form.totalPerformance3
            }
        ]
    },
    // 获取机构运营数据列表
    getHospitalOperationData() {
      const { keyword,indicatorsId,hospitalId } = this.query;
      const data = { keyword ,indicatorsId,hospitalId};
      api.getHospitalOperationData(data).then((res) => {
        if (res.code === 0) {
          const {hospitalOperationDataInfo } = res.data;
          this.query.data = hospitalOperationDataInfo;
        }
      });
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            api.editHospitalOperationData(this.form).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.getHospitalOperationData();
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
            api.addHospitalOperationData(HospitalOperationDataList).then((res) => {
              if (res.code === 0) {
                this.cancelSubmit("form");
                this.getHospitalOperationData();
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
   
  },
   watch:{
    active: {
        handler(value) {
            if (value === "operatingDataOfTheInstitution") {
              this.query.indicatorsId = this.indicatorsId
              if(this.employeeType == 'hospitalEmployee'){
                this.query.hospitalId = Number(sessionStorage.getItem('hospitalId'))
              }else{
                this.query.hospitalId = this.hospitalId
              }
                this.getHospitalOperationData();
                this.getHospitalOperationRemark()
            }
        },
        immediate: true,
    },
   
      
    }
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
.line {
  display: flex;
}
.h1{
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 5px 0;
}
.button{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
