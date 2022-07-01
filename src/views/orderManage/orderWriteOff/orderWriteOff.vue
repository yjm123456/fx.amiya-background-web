<template>
    <div>
    <Card :dis-hover="true">
      <div>
        <Input
          v-model="query.writeOffCode "
          placeholder="请输入核销编码"
          style="width: 200px"
          @keyup.enter.native="getCodeList()"
        />
        <Button
          type="primary"
          style="margin-left: 10px"
          @click="getCodeList()"
          >查询</Button
        >
      </div>
    </Card>

    <Card class="container">
      <div>
        <Table border :columns="query.columns" :data="query.data"></Table>
      </div>
    </Card>

    <Modal
      v-model="writeOffModel"
      title="核销"
      :mask-closable="false"
      width="30%"
      footer-hide
      @on-visible-change="handleModalVisibleChange"
    >
      <div>
        <Form
            ref="form"
            :model="form"
            :rules="ruleValidate"
            label-position="left"
            :label-width="120"
        >
           
            <FormItem label="选择医院" prop="hospitalId">
                <Select v-model="form.hospitalId" filterable>
                    <Option v-for="item in allHospital" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </Form>
        <div class="footer">
            <Button @click="handleCancel('form')" style="margin-right:10px">取消</Button>
            <Button type="primary" @click="handleSubmit('form')">确定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as api from "@/api/orderManage";

export default{
    data(){
        return {
            form:{  
                hospitalId :'',
                orderId:''
            },
            flag:false,
            allHospital:[],
            writeOffModel:false,
            query: {
                writeOffCode : "",
                columns: [
                {
                    title: "订单号",
                    key: "id",
                    minWidth: 200,
                },
                {
                    title: "下单平台",
                    key: "appTypeText",
                    minWidth: 200,
                },
                {
                    title: "商品",
                    key: "thumbPicUrl",
                    minWidth: 400,
                    render: (h, params) => {
                    return h(
                        "viewer",
                        {
                        props: {
                            zoomable: false,
                        },
                        style: {
                            display: "flex",
                        },
                        },
                        [
                        h("img", {
                            style: {
                            width: "50px",
                            height: "50px",
                            margin: "5px 15px 5px 5px",
                            verticalAlign: "middle",
                            },
                            attrs: {
                            src: params.row.thumbPicUrl,
                            },
                        }),
                        h("div", params.row.goodsName),
                        ]
                    );
                    },
                },
                {
                    title: "实付款",
                    key: "actualPayment",
                    minWidth: 200,
                },
                {
                    title: "订单状态",
                    key: "statusText",
                    minWidth: 180,
                },
                {
                    title: "预约门店",
                    key: "appointmentHospital",
                    minWidth: 200,
                },
                {
                    title: "操作",
                    width:200,
                    fixed: "right",
                    align: "center",
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
                                    this.form.orderId = id
                                    
                                    if(this.flag == false){
                                        this.writeOffModel = true
                                        this.getAllHospitalList()
                                    }else{
                                        this.$Message.error('该订单已核销')
                                    }

                                },
                                },
                            },
                            this.flag == false ? "核销" : "已核销"
                            ),
                            
                        ]);
                    },
                },
              ],
              data: [],
            },
            ruleValidate: {
                hospitalId: [
                    {
                        required: true,
                        message: "请选择医院",
                    },
                ],
            },
            
        }

    },
    methods : {
        getCodeList(){
            const {writeOffCode} = this.query
            const data = {
                writeOffCode : writeOffCode
            }
            if(writeOffCode){
                api.getCodeList(data).then((res) => {
                    if(res.code === 0){
                        const { order} = res.data;
                        this.query.data = order;
                    }
                })
            }else{
                this.$Message.error('请输入核销编码')
            }
            
        },
        // 获取所有的医院
        getAllHospitalList(){
            const data = {

            }
            api.getAllHospitalList(data).then((res) => {
                if(res.code === 0){
                    const {hospitalInfo} = res.data
                    this.allHospital = hospitalInfo
                }
            })
        },
        handleCancel(name) {
            this.writeOffModel= false
        },

        // modal 显示状态发生变化时触发
        handleModalVisibleChange(value) {
            if (!value) {
                this.handleCancel("form");
            }
        },
        handleSubmit(){
            const {hospitalId,orderId}  =  this.form
            const data = {
                hospitalId ,
                orderId
            }
            if(!hospitalId){
                this.$Message.error('请先选择医院')
                return
            }else{
                api.orderWriteOff(data).then((res) => {
                    if(res.code === 0){
                        this.$Message.success('核销成功')
                        this.flag = true
                        this.writeOffModel = false
                    }
                })
            }
             
        }
    },
    created() {
        // this.getCodeList();
    }
}
</script>
<style scoped>
    .footer{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>
