<template>
  <div class="conetent_wrap">
     <Card :dis-hover="true" style="margin-bottom:10px">
      <div class="header_wrap">
        <div class="left">
            <div class="week_con">
               <div v-for="(item,index) in list" :key="index" class="item_week" :style="{borderBottom:curIndex == index ? '2px solid #4a9bf0' : 'none',}">
                    <span @click="dateClick(item,index)">{{item}}</span>
                </div>
                <div class="user">按用户查看：</div>
                <Select
                    v-model="query.acceptBy"
                    style="width:200px"
                    filterable
                    :disabled="isDirector == 'true' ? false : true"
                    @on-change="getlistByCalendar()"
                >
                    <Option
                    v-for="item in employee"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                    >
                </Select>
                <div class="user">通知类型：</div>
                <Select
                    v-model="query.noticeType"
                    style="width:200px"
                    filterable
                    @on-change="getlistByCalendar()"
                >
                    <Option
                    v-for="item in appointmentTypeList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                    >
                </Select>
            </div>
        </div>
      </div>
    </Card>
    <Card class="container" >
        <div v-if="query.messageNoticeInfo.length == 0 || query.messageNoticeInfo == []" class="nodata">暂无数据</div>
        <div v-else>
            <div v-for="(item,index) in query.messageNoticeInfo" :key="index" class="list_content">
                <div class="date" @click="showClick(item,index)">{{ $moment(new Date(item.createDate)).format("YYYY-MM-DD")}} <i class="iconfont  iconDown" :class="item.isShow==true ? 'icon-xiangxia1' : 'icon-xiangshang1'"></i></div>
                <div class="line_date"></div>
                <div class="con_line"  v-if="item.isShow==true">
                    <div class="list_con" v-for="(i,d) in item.details" :key="d" >
                        <template >
                            <div  style="cursor: pointer;">
                                <div class="list" >
                                    <span class="time" >{{ $moment(new Date(i.createDate)).format("HH:mm")}}</span>
                                    <div class="circle"  :style="{border: i.isRead == false ? '1px solid #ccc' : '#4a9bf0',background:i.isRead == false ? '#ccc' : '#4a9bf0'}"></div>
                                    <div @click="detail(item,i.noticeType,i.orderId)">
                                        <span class="type_con">【<span class="type">{{i.noticeTypeText}}</span>】 </span>
                                        <span> {{i.acceptByEmpName}} <span>{{i.noticeContent}}</span></span>
                                            <Radio v-model="i.isRead" style="margin-left:10px" @on-change="isReadClick(i)"><span :style="{color: i.isRead == false ? '#ccc' : '#4a9bf0',marginLeft:'5px'}" >{{i.isRead == false ? '未读' : '已读'}}</span></Radio>
                                    </div>
                                </div>
                                <div class="lines" v-if="d !== item.details.length - 1"></div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="con_line"  v-else>
                        <div class="list_con"  v-if="item.details[0]">
                            请展开数据！
                        </div>
                </div>
            </div>
        </div>
        
    </Card>
    <Card  class="message_container">
        <div class="message">
            <div class="yd">已读： <span class="text">{{messageInfo.readCount}}</span></div>
            <div class="nodatas">未读： <span  class="text">{{messageInfo.unReadCount}}</span></div>
        </div>
    </Card>

    <!-- 日程通知详情 -->
    <appointmentCalendarList :detailModel.sync="appointmentCalendarListModel" :params="appointmentCalendarListParams"/>
    <!-- 订单通知详情 -->
    <contentDetail :detailModel.sync="contentDetailModel" :detailList="detailList" />
    
  </div>
</template>
<script>
import * as api from "@/api/customerAppointmentSchedule";
import * as emApi from "@/api/employeeManage";
import * as orderApi from "@/api/orderManage";

import appointmentCalendarList from "@/components/appointmentCalendarList/list.vue"
import contentDetail from "@/components/contentDetail/detail.vue";

export default {
  components:{
    appointmentCalendarList,
    contentDetail
  },
  data(){
    return{
        single:false,
        curIndex:0,
        list:['今日','昨日','本周','上周','本月','上月'],
        list2:[{
            time:'4.16',
            stepList:[{
                time:'09:18',
                name:'步骤1'
            },{
                time:'09:18',
                name:'步骤2'
            },{
                time:'09:18',
                name:'步骤3'
            },{
                time:'09:18',
                name:'步骤4'
            }]
        },{
            time:'4.17',
            stepList:[{
                time:'10:18',
                name:'步骤1'
            },{
                time:'10:18',
                name:'步骤2'
            },{
                time:'10:18',
                name:'步骤3'
            },{
                time:'10:18',
                name:'步骤4'
            }]
        }],
        query:{
            startDate: this.$moment(new Date()).format("YYYY-MM-DD"),
            endDate: '',
            keyWord:'',
            pageNum:null,
            pageSize:null,
            // 通知类型
            noticeType:-1,
            // 用户
            acceptBy:sessionStorage.getItem('isDirector') == 'false' ?  Number(sessionStorage.getItem('employeeId')) : Number(sessionStorage.getItem('employeeId')) ,
            // 日历数据
            messageNoticeInfo:[],
            
        },
        isDirector:sessionStorage.getItem('isDirector'),
        employeeId:sessionStorage.getItem('employeeId'),
        employee:[],

        // 日程通知model
        appointmentCalendarListModel:false,
        appointmentCalendarListParams:{
            startDate:''
        },

        // 订单通知model以及传参
        contentDetailModel:false,
        detailList:[],

        // 总条数以及已读
        messageInfo:{},

        // 通知类型
        appointmentTypeList:[{id:-1,name:'全部通知类型'}]
    }
  },
  methods:{
    // 详情
    detail(value,noticeType,id){
        // noticeType=2是日程通知 1是订单通知
        if(noticeType == 2){
            this.appointmentCalendarListParams.startDate = this.$moment(new Date(value.createDate)).format("YYYY-MM-DD");
            this.appointmentCalendarListModel = true
            return
        }else if(noticeType == 1){
            orderApi.byIdContentPlateForm(id).then((res) => {
                if (res.code === 0) {
                this.contentDetailModel = true;
                const { orderInfo } = res.data;
                this.detailList = [orderInfo];
                }
            });
            return
        }
    },

    // 获取通知类型
    getMessageNoticeTypeList(){
        api.getMessageNoticeTypeList().then(res=>{
            if(res.code == 0){
                const {appointmentTypeList} =  res.data
                this.appointmentTypeList = [...this.appointmentTypeList,...appointmentTypeList]
            }
        })
    },

    // 获取所有员工
    getEmployeeByPositionId(){
      const data ={
        positionId:null
      }
      emApi.getEmployeeByPositionId(data).then(res=>{
        if(res.code===0){
          this.employee = res.data.employee
        }
      })
    },
    // 修改未读消息
    isReadClick(value){
        const data = {
            id:value.id
        }
        api.updateMessageNotice(data).then(res=>{
            if(res.code === 0){
                window.location.reload();
            }
        })
            return
        
    },
    // 日期筛选
    dateClick(value,index){
        this.curIndex = index
        if(value == '今日'){
            this.query.startDate = this.$moment(new Date()).format("YYYY-MM-DD")
            this.query.endDate = this.$moment(new Date()).format("YYYY-MM-DD")
            this.getlistByCalendar()
            return
        }else if(value == '昨日'){
            this.query.startDate = this.$moment().subtract(1, 'days').format("YYYY-MM-DD")
            this.query.endDate = this.$moment().subtract(1, 'days').format("YYYY-MM-DD")
            this.getlistByCalendar()
            return
        }else if(value == '本周'){
            this.query.startDate = this.$moment(new Date()).isoWeekday(1).format('YYYY-MM-DD')
            this.query.endDate = this.$moment().weekday(7).format('YYYY-MM-DD')
            this.getlistByCalendar()
            return
        }else if(value == '上周'){
            this.query.startDate = this.$moment(this.$moment().week(this.$moment().week() - 1).startOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD')
            this.query.endDate = this.$moment(this.$moment().week(this.$moment().week() - 1).endOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD');
            this.getlistByCalendar()
            return
        }else if(value == '本月'){
            this.query.startDate = this.$moment().add('month', 0).format('YYYY-MM') + '-01'
            this.query.endDate = this.$moment(this.query.startDate).add('month', 1).add('days', -1).format('YYYY-MM-DD')
            this.getlistByCalendar()
            return
        }
        else if(value == '上月'){
            this.query.startDate = this.$moment().subtract('month', 1).format('YYYY-MM') + '-01'
            this.query.endDate = this.$moment(this.query.startDate).subtract('month', -1).add('days', -1).format('YYYY-MM-DD')
            this.getlistByCalendar()
            return
        }
    },
    // 获取日历列表
    getlistByCalendar(){
        const { startDate , endDate , keyWord , pageNum , pageSize,acceptBy,noticeType} = this.query
        const data ={
            pageNum,
            pageSize,
            keyWord,
            startDate,
            endDate,
            acceptBy,
            noticeType: noticeType == -1 ? null : noticeType
        }
        api.MessageNoticelist(data).then(res=>{
            if(res.code == 0){
                const {messageReturnVos} = res.data.messageNoticeInfo
                this.messageInfo = res.data.messageNoticeInfo
                if(messageReturnVos){
                    this.query.messageNoticeInfo = messageReturnVos.map(item=>{
                        return {
                            ...item,
                            isShow:true,
                            single:item.isRead== true ? true :false
                        }
                    })
                }
            }
        })
    },
    showClick(value){
        this.$set(value,'isShow',!value.isShow)
    }
  },
  created(){
    // this.query.messageNoticeInfo.map(item=>{
    //     this.$set(item,'isShow',true)
    // })
    this.getlistByCalendar()
    this.getEmployeeByPositionId()
    this.getMessageNoticeTypeList()
  },
  
}
</script>

<style scoped>
.container{
    height: 650px;
    overflow-y: scroll;
}
.message_container{
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.message{
    width: 100%;
    display: flex;
    align-items: center;
}
.text{
    color: red;
    font-weight: bold;
}
.yd{
    font-weight: bold;
}
.nodatas{
    margin-left: 30px;
    font-weight: bold;
}
.week_con{
    display: flex;
    align-items: center;
}
.item_week{
    margin-right: 30px;
    cursor: pointer;
    padding-bottom: 3px;
}
.list_con{
  margin-bottom: -5px;
  margin-left: 20px;
}
.list{
  display: flex;
  align-items: center;
}
.list_content{
    margin-bottom: 30px;
    display: flex;
}
.con_line{
    border: 2px solid #4a9bf0;
    padding: 20px;
    width: 100%;
}
.circle{
  width: 12px;
  height: 12px;
  background: #ccc;
  border-radius: 50%;
  margin-right: 10px;
  margin-bottom: 3px;
}
.lines{
  height: 40px;
  width: 1px;
  background: #ccc;
  margin-left: 50px;
  /* margin-left: 5px; */
  margin-top: -10px;
}

.date{
    width: 120px;
    height: 40px;
    border: 2px solid #4a9bf0;
    padding: 5px;
    text-align: center;
    margin-bottom: 10px;
    cursor: pointer;
}
.line_date{
    width: 80px;
    height: 2px;
    background: #4a9bf0;
    margin-top: 20px;
}
.time{
  margin-right: 10px;
}
.nodata{
    text-align: center;
    margin-top: 20px;
}
.type_con{
    margin-right: 10px;
}
.type{
    font-size: 12px;
}
.user{
    margin-left: 30px;
}
</style>