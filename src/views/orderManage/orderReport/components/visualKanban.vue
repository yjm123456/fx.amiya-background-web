<template>
    <div>
        <Modal
            v-model="control"
            :mask-closable="false"
            @on-visible-change="handleModalVisibleChange"
            width="100%"
            height="100%"
            fullscreen
        >
                <div id="app" v-if="control==true">
                    <vue-particles
                        color="#fff"
                        :particleOpacity="0.7"
                        :particlesNumber="60"
                        shapeType="circle"
                        :particleSize="4"
                        linesColor="#fff"
                        :linesWidth="1"
                        :lineLinked="true"
                        :lineOpacity="0.4"
                        :linesDistance="150"
                        :moveSpeed="2"
                        :hoverEffect="true"
                        hoverMode="grab"
                        :clickEffect="true"
                        clickMode="push"
                        class="lizi"
                    >
                    </vue-particles>
                    <div class="content">
                        <div class="header">
                                <div class="header_data">
                                    <div class="weather_con" v-if="weather.wendu">
                                        <div class="">{{weather.wendu}}  ℃</div>
                                        <div class="">{{weatherType}}</div>
                                    </div>
                                    <div class="date">{{currentTime}}</div>
                                </div>
                                <div class="title">啊美雅数据监控中心</div>
                            </div>
                            <div class="section">
                                <!-- 订单量数据 -->
                                <div class="data_con">
                                    <ul class="item_con">
                                        <li class="item">
                                            <div class="order_num">
                                                <div class="order">{{orderData.todayWriteOffOrderQuantity ? orderData.todayWriteOffOrderQuantity : 0}}</div>
                                            </div>
                                            <div class="order_title">今日核销订单量</div>
                                        </li>
                                        <li class="item2">
                                            <div class="order_num">
                                                <div class="order2">{{orderData.todayOrderQuantity ? orderData.todayOrderQuantity : 0}}</div>
                                            </div>
                                            <div class="order_title2">今日总订单</div>
                                        </li>
                                        <li class="item">
                                            <div class="order_num">
                                                <div class="order">{{orderData.todayClosedOrderQuantity ? orderData.todayClosedOrderQuantity : 0}}</div>
                                            </div>
                                            <div class="order_title">今日订单关闭量</div>
                                        </li>
                                    </ul>
                                </div>
                                <!-- 表格数据 -->
                                <div class="tabel_con">
                                    <div class="tabel_title">今日派单情况</div>
                                    <Table stripe  :columns="columns" :data="orderData.todaySendOrderInfo" :height="340"   :row-class-name="rowClassName" ref="table" class="data1" style="width:100%;height:88%;border:1px solid #00E0DB;overflow:hidden"></Table>
                                </div>
                            </div>
                            <div class="footer">
                                <div class="footer_content">
                                    <div class="footer_titlt">各医院接单情况</div>
                                    <hospitalOrders :orderData="orderData"></hospitalOrders>
                                </div>
                                <div class="footer_content2">
                                    <div class="footer_titlt2">今日录单情况</div>
                                    <Table stripe class="table_addOrder" :columns="todayAddOrderColumns" :data="orderData.todayAddOrderNum" :height="270" style="width:100%;height:80%;border:1px solid #00E0DB;overflow:hidden;margin-top:20px" ref="tables" :row-class-name="rowClassName" ></Table>

                                </div>
                            </div>
                    </div>
                </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import * as api from "@/api/orderManage";
import hospitalOrders from "./hospitalOrders.vue"
import recording from "./recording.vue"

export default {
    components:{
        hospitalOrders,
        recording
    },
    props: {
        visualKanbanModel: {
            type: Boolean,
        },
    },
    data(){
        return{
            local: {
                // ip地址所在城市
                city: '',
            },
            weatherType:"",
            weather:{},
            timer: null, //定义一个定时器的变量
            currentTime: null, // 获取当前时间
            control:false,
            orderData:{},
            columns: [
                    {
                        title: '订单号',
                        key: 'orderId',
                        width:90,
                        tooltip:true
                    },
                    {
                        title: '商品',
                        key: 'goodsName',
                        width:80,
                        tooltip:true
                    },
                    {
                        title: '实付款',
                        key: 'acturalPayment',
                        width:80,
                        tooltip:true
                    },
                    {
                        title: '派单医院',
                        key: 'sendHospital',
                        tooltip:true
                    }
                ],
                todayAddOrderColumns: [
                    {
                        title: '订单号',
                        key: 'orderId',
                        width:190,
                    },
                    {
                        title: '项目',
                        key: 'projectName',
                        width:130,
                        tooltip:true
                    },
                    {
                        title: '订单类型',
                        key: 'orderType',
                        width:130,
                        tooltip:true
                    },
                    {
                        title: '客户名字',
                        key: 'customerName',
                        tooltip:true
                    },
                ],
                data: [],

                data1Time:null
        }
    },
    methods:{
        // 根据中国天气网获取天气
        getWeather_mini(){
            const data = {
                city:"杭州"
            }
            api.getWeather_mini(data).then((res) => {
                if(res.desc=='OK'){
                    this.weather  = res.data
                    this.weatherType = this.weather.forecast[0].type
                }
            })
        },
        
        // 获取可视化看板数据
        visualKanbanInfo(){
            api.getOrderCenterData().then((res) => {
                if(res.code === 0){
                    const {orderData} = res.data
                    this.orderData = orderData;
                    this.init();
                }
            })
        },
        handleModalVisibleChange(value){
            if (!value) {
                this.$emit("update:visualKanbanModel", false);
            }
        },
         rowClassName :function (row, index) {
            if(index%2==0){
            return 'ivu-table-stripe-even';
            }
            else return 'ivu-table-stripe-odd';
        },
        // 给表格添加滚动效果
        init() {
            this.$nextTick(()=>{
                const tableWrap = document.querySelector(".tabel_con");
                if((this.orderData.todaySendOrderInfo.length * 40) >(Number(tableWrap.offsetHeight)-80)) {
                    this.orderData.todaySendOrderInfo = [...this.orderData.todaySendOrderInfo,...this.orderData.todaySendOrderInfo];
                    // this.$refs.table.$refs.body.childNodes[0].style.animation = "marquee 30s linear infinite"
                    // console.log(this.$refs.table.$refs.body.childNodes[0])
                    // console.log(document.querySelector(".data1").querySelector(".ivu-table-body"))
                    this.$nextTick(()=>{
                        // 拿到表格挂载后的真实DOM
                        const table = document.querySelector(".data1")
                        // 拿到表格中承载数据的div元素
                        const divData = table.querySelector(".ivu-table-body")
                        // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
                        this.data1Time = setInterval(() => {
                            // 元素自增距离顶部1像素
                            divData.scrollTop += 1
                            // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
                            if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
                                // 重置table距离顶部距离
                                divData.scrollTop = 0
                            }
                        }, 20)
                    })

                    
                }
            })
            this.$nextTick(()=>{
                const tableWraps = document.querySelector(".footer_content2");
                if((this.orderData.todayAddOrderNum.length * 40) > (Number(tableWraps.offsetHeight)-80)) {
                    this.orderData.todayAddOrderNum = [...this.orderData.todayAddOrderNum,...this.orderData.todayAddOrderNum];
                    // this.$refs.tables.$refs.body.childNodes[0].style.animation = "marquee 5s linear infinite"
                    this.$nextTick(()=>{
                        // 拿到表格挂载后的真实DOM
                        const table = document.querySelector(".table_addOrder")
                        // 拿到表格中承载数据的div元素
                        const divData = table.querySelector(".ivu-table-body")
                        // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
                        this.data2Time = setInterval(() => {
                            // 元素自增距离顶部1像素
                            divData.scrollTop += 1
                            // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
                            if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
                                // 重置table距离顶部距离
                                divData.scrollTop = 0
                            }
                        }, 20)
                    })
                }
            })
           
        },
        // 获取时间
        getTime(){
            let _this = this; 
            this.timer = setInterval(() => {
            let newDate = new Date();
            _this.currentTime =
                newDate.getFullYear() +
                "-" +
                ((newDate.getMonth() + 1)<10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)) +
                "-" +
                (newDate.getDate()<10 ? '0' + newDate.getDate() : newDate.getDate()) +
                " " +
                (newDate.getHours()<10 ? '0' + newDate.getHours() : newDate.getHours()) +
                ":" +
                (newDate.getMinutes()<10 ? '0' + newDate.getMinutes() : newDate.getMinutes()) +
                ": " +
                (newDate.getSeconds()<10 ? '0' + newDate.getSeconds() : newDate.getSeconds()); 
            }, 1000);
        },
    },
    
     mounted() {
        this.getTime()
    },
    created(){
        // console.log(this.local.city)
    },
    watch:{
        visualKanbanModel(value){
            this.control = value;
            // 每一个小时刷新一次可视化看板数据 
            if(this.control ==true){
                setInterval(() => {
                    this.visualKanbanInfo()
                    setTimeout(visualKanbanInfo, 0)
                }, 3600000)
            }
        },
    }
}
</script>
<style lang="less" scoped>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background:url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/3964abd7fcc0479499d6a579f9c41380.png) no-repeat no-repeat;
  background-size: 100% 100%;
  color: #00E0DB;
  position: relative;
  z-index: 999;
  overflow-y: hidden;
}
.content{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.container {
    
}

/deep/.ivu-table {
    background: #000;
    color: #fff;
}

/deep/.ivu-table-tbody{
    overflow-y: scroll;
}
/deep/ .ivu-modal-body {
    border:none;
    position: absolute ;
    bottom: 0;
    padding: 0 ;
}
/deep/ .ivu-modal-footer{
        border:none;
}
.tabel_title{
    background: #4b8b95;
    color: #01ede9;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
}
/deep/.ivu-table th{
    background: #000;
    color: #fff;
}

/deep/.ivu-table td{
  background-color: #182328;
  color: #fff;
  overflow-x: hidden;
}

/*偶数行*/
/deep/.ivu-table-stripe-even td{
    background-color: #143b48!important;
    height: 40px;
}
/*奇数行*/
/deep/.ivu-table-stripe-odd td{
    background-color: #051b26!important;
    height: 40px;
}
/deep/ .ivu-table-overflowX{
    overflow-x: hidden;
}
// 暂无数据的时候隐藏滚动条
/deep/ .ivu-table-tip{
    overflow-x: hidden;
}
/*浮在某行*/
// /deep/.ivu-table-row-hover td {
//     background-color: #d63333!important;
// }
// /*选中某一行高亮*/
// /deep/.ivu-table-row-highlight td {
//     background-color: #d63333!important;
// }

.header{
    background:url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/c1fd6b91ad6947a3bf72644c15677f91.png) no-repeat no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 11%;
    color: #00E0DB;
    position: relative;
    .header_data{
        display: flex;
        position: absolute;
        left: 3%;
        top: 11%;
        .date{
            width: 100px;
            margin-left: 10px;
        }
        .weather_con{
            border-right: 1px solid #00E0DB;
            padding: 0 10px;
            box-sizing: border-box;
            height: 40px;
        }
    }
    .title{
        font-size: 30px;
        text-align: center;
        padding-top: 21px;
        box-sizing: border-box;
    }
}
.section{
    width: 100%;
    display: flex;
    padding: 0 2%;
    box-sizing: border-box;
    margin-top: 1%;
    height: 41%;
    .data_con{
        width: 77%;
        // height: 28%;
        // height: 382px;
        background: url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/85a819256cc74c6c99e500b22b8c4baf.png) no-repeat no-repeat;
        background-size: 100% 100%;
        margin-right: 20px;
        .item_con{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4%;
            box-sizing: border-box;
        }
    }
    .item{
        width: 307px;
        height: 232px;
        background:url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/cfe5c317b9a9493289e5bcf08a50f1a7.png) no-repeat no-repeat;
        background-size: 100% 100%;
        padding-top: 12px;
        box-sizing: border-box;
    }
    .item2{
        width: 411px;
        height: 299px;
        background:url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/25826e2a17a14ef7aa286ce17ba52de1.png) no-repeat no-repeat;
        background-size: 100% 100%;
        //margin-left: 30px;
        padding-top: 11px;
        box-sizing: border-box;
    }
    .item,.item2{
        .order_num{
            text-align: center;
            margin-top: 20%;
            .order{
                font-size: 28px;
                color: #00E0DB;
            }
            .order2{
                font-size: 36px;
                color: #00E0DB;
            }
            .order_text{
                font-size: 20px;
            }
        }
        .order_title{
            text-align: center;
            // margin-top: 16%;
            margin-top: 23%;
            color: #fff;
        }
        .order_title2{
            text-align: center;
            // margin-top: 21%;
            margin-top: 23%;
            color: #fff;
        }
    }
    .tabel_con{
        width: 22%;
        // height: 382px;
    }
}
.footer{
    width: 100%;
    height: 38%;
    margin-top: 1%;
    display: flex;
    justify-content: space-between;
    padding: 0 2%;
    box-sizing: border-box;
    .footer_content{
        width: 60%;
        background: url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/84aaab4402f84407b9c50e92c30da984.png) no-repeat no-repeat;
        background-size: 100% 100%;
        padding: 1%;
        box-sizing: border-box;
        .footer_titlt{
            width: 504px;
            height: 34px;
            line-height: 34px;
            font-size: 18px;
            background: url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/fbb9fade3d824037b230847058b120bc.png) no-repeat no-repeat;
            background-size: 100% 100%;
            text-align: center;
            margin: 0 auto;
        }
    }
    .footer_content2{
        width: 39%;
        background: url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/3d288873fbfc444e9b78c7faeccc963e.png) no-repeat no-repeat;
        background-size: 100% 100%;
        padding: 1%;
        box-sizing: border-box;
        .footer_titlt2{
            width: 350px;
            height: 34px;
            line-height: 34px;
            font-size: 18px;
            background: url(https://ameiya.oss-cn-hangzhou.aliyuncs.com/43f51873674a4484bb21d29adee94ebe.png) no-repeat no-repeat;
            background-size: 100% 100%;
            text-align: center;
            margin: 0 auto;
        }
    }
    
}
</style>