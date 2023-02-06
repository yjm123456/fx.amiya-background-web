<!--
<template>
  <div class="calendar">
    <div class="heading">
      <button @click.prevent="prevMonth">上个月</button>
      <h2>{{ currentMonth }}</h2>
      <button @click.prevent="nextMonth">下个月</button>
    </div>
    <table>
      <thead >
        <tr >
          <th v-for="(day,index) in daysOfWeek" :key="index">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week,index) in calendar" :key="index">
          <td v-for="(day,index) in week" :key="index" :class="{ 'other-month': day.month !== currentMonthIndex }">
            <div class="date" @click="selectDate(day)" :class="{ 'selected': selectedDate === day.date }">
              {{ day.date }}
              <slot name="content-{{ day.date }}"></slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import * as api from "@/api/customerAppointmentSchedule";

export default {
  props:{
    activeName:String,
  },
  data() {
    return {
      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
      currentDate: new Date(),
      selectedDate: null,
      query:{
        startDate: '',
        endDate: ''
      },
     //  接口数据
      calendarList:[]
    };
  },
  computed: {
    currentMonth() {
      return `${this.currentDate.getFullYear()}年${this.currentDate.getMonth() + 1}月`;
    },
    currentMonthIndex() {
      return this.currentDate.getMonth();
    },
    calendar() {
        // this.query.startDate = this.$moment().add('month', 0).format('YYYY-MM') + '-01'
        //     this.query.endDate = this.$moment(this.query.startDate).add('month', 1).add('days', -1).format('YYYY-MM-DD')
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      const firstDayOfCalendar = new Date(
        firstDayOfMonth.getFullYear(),
        firstDayOfMonth.getMonth(),
        firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
      );
      const lastDayOfCalendar = new Date(
        lastDayOfMonth.getFullYear(),
        lastDayOfMonth.getMonth(),
        lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())
      );
      debugger
      const calendar = [];
      let week = [];
      let day = new Date(firstDayOfCalendar);
      while (day <= lastDayOfCalendar) {
        if (week.length === 7) {
          calendar.push(week);
          week = [];
        }
        week.push({
          year: day.getFullYear(),
          month: day.getMonth(),
          date: day.getDate(),
        
        });
        day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
      }
      calendar.push(week);
      return calendar;
    }
  },
  methods: {
    // 获取日历数据
    getlistByCalendar(){
        let startDate = this.$moment().add('month', 0).format('YYYY-MM') + '-01'
        const data = {
            startDate:startDate,
            endDate:this.$moment(startDate).add('month', 1).add('days', -1).format('YYYY-MM-DD')
        }
        api.getlistByCalendar(data).then(res=>{
            const {customerAppointmentScheduleInfo} = res.data
            this.calendarList  =  customerAppointmentScheduleInfo.map(item=> {
                let date = item.appointmentDate.split('T')[0]
                let dateArr = date.split('-')
                let if_year = dateArr[0]
                let if_month = dateArr[1]
                let if_day = dateArr[2]
                return {
                    ...item,
                    if_year:Number(if_year),
                    if_month:Number(if_month),
                    if_day:Number(if_day),
                }
            })
            this.calendar.forEach(item=> {
                item = item.map(m=> {
                    this.calendarList.forEach(f=> {
                        // console.log(m.year === f.if_year && m.month === f.if_month && m.date === f.if_day)
                        if(m.year === f.if_year && m.month === f.if_month && m.date === f.if_day) {
                            console.log("Ex")
                            m = {
                                ...m,
                                ...f
                            }
                        }
                    })
                    return m;
                })
            })
            console.log(this.calendar,"fsfsfsfs")
            console.log(this.calendarList)
        })
    },
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
    selectDate(day) {
      if (day.month === this.currentMonthIndex) {
        this.selectedDate = day.date;
      }
    }
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "appointmentData") {
          this.getlistByCalendar();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.heading{
    width: 100%;
    display: flex;
    margin-bottom: 20px;
}
table{
    width: 100%;
    /* border: 1px solid #ccc; */
    height: 600px;
}
tbody{
    text-align: center;
}
td{
    border: 1px solid #ccc;
}
thead{
        border: 1px solid #ccc;
    }

</style>
-->

<template>
  <!-- 外部 -->
  <div class="waibu">
    <!-- 头部 -->
    <div class="title">
      <span class="let" @click="shang"> 《 </span>
      <div>
        {{ this.currentyear }}年{{ this.currentmonth }}月{{ this.currentday }}
      </div>
      <span class="rig" @click="xia"> 》 </span>
    </div>

    <!-- 周一到周日 -->
    <div class="zoumo">
      <p v-for="item in sun" :key="item">{{ item }}</p>
    </div>
    <div class="box">
      <!-- 上个月剩余天数 -->
      <div class="sy" v-for="item in shanggeyue" :key="'a' + item">{{ item }}</div>
      <!-- 当前月份 -->
      <div v-for="(item,index) in days" :key="index"  class="item_Con">
        <p class="data" :style="{color:mon == currentmonth && item.day == day ? 'red' : '',fontWeight:mon == currentmonth && item.day == day ? 'bold' : ''}">{{item.day}}</p>
        <div class="item" v-for="(ind,d) in item.ccstomerAppointmentScheduleDetailsVos" :key="d"> 
            <span class="text" v-if="ind.importantTypeText">【{{ind.importantTypeText}}】</span>
            <span class="text2">{{ind.phone}}</span>
            <span class="text3">{{ind.appointmentTypeText}}</span>
        </div>
        <div class="smegma" v-if="item.ccstomerAppointmentScheduleDetailsVos" @click="detail(item)">详情</div>
      </div>
    </div>
    <!-- 详情 -->
    <detail :detailModel.sync="detailModel" :params="params"/>
    
  </div>
</template>

<script>
import * as api from "@/api/customerAppointmentSchedule";
import detail from "@/components/appointmentCalendarList/list.vue"
export default {
components:{
  detail
},
props:{
    activeName:String
},
  name: "rili",
  data() {
    return {
      sun: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      // 当前日
      currentday: new Date().getDate(),
      // 当前月
      currentmonth: new Date().getMonth() + 1,
      // 当前年
      currentyear: new Date().getFullYear(),
      days:[],
      day:this.$moment().format("DD"),
      mon:this.$moment().format("MM"),
      // model
      detailModel:false,
      params:{
        startDate:''
      }
    };
  },
  computed: {
    // 当前月的天数
    danqianyue:{
      // // 有3个参数，第一个是年，第二个是月，然后输入0代表当前月份   这样就可以获取天数了
      // return new Date(this.currentyear,this.currentmonth,0).getDate()

      get () {
        let dayCount = new Date(this.currentyear, this.currentmonth, 0).getDate();
        let days = [];
        const currentDate = new Date(); // 当前时间
        const year = currentDate.getFullYear(); // 年份
        const month = currentDate.getMonth(); // 月份

        const daysInMonth = new Date(year, month + 1, 0).getDate(); // 当前月份天数
        for (let i = 1; i <= dayCount; i++) {
          days.push({
            day: i,
          });
        }
        return days;
      },
      set(values) {
        this.days = values
      }
    },
    // 获取上个月的剩余多少天
    shanggeyue() {
      return new Date(this.currentyear, this.currentmonth - 1, 1).getDay();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // 详情
    detail(value){
      this.detailModel = true
      this.params.startDate = this.$moment(value.ccstomerAppointmentScheduleDetailsVos[0].appointmentDate).format("YYYY-MM-DD")
    },
    shang() {
    //   console.log("上个月");
      if (this.currentmonth === 1) {
        this.currentyear--, (this.currentmonth = 13);
      }
      this.currentmonth--;
      this.init();
    },
    xia() {
    //   console.log("下个月");
      if (this.currentmonth === 12) {
        this.currentyear++, (this.currentmonth = 0);
      }
      this.currentmonth++;
      this.init();
    },
    init() {
      let currentDate = new Date(
        this.currentyear,
        this.currentmonth,
        this.currentday
      );
      let firstDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
      let lastDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
    //   console.log(this.$moment(firstDate).format("YYYY-MM-DD"), "firstDate");
    //   console.log(this.$moment(lastDate).format("YYYY-MM-DD"), "lastDate");

      const data = {
        startDate:  this.$moment(firstDate).format("YYYY-MM-DD"),
        endDate:  this.$moment(lastDate).format("YYYY-MM-DD"),
      };
      api.getlistByCalendar(data).then((res) => {
        const { customerAppointmentScheduleInfo } = res.data;
        this.calendarList = customerAppointmentScheduleInfo
        this.danqianyue = this.danqianyue.map(item=> {
            this.calendarList.forEach(item2=> {
                if(item.day === item2.date) {
                    item = {
                        ...item,
                        ...item2
                    }
                    return
                }else{
                    return{
                        day:item,
                        ccstomerAppointmentScheduleDetailsVos:[]

                    }
                }
            })
            return item;
        })
        // this.calendarList = customerAppointmentScheduleInfo.map((item) => {
        //   let date = item.appointmentDate.split("T")[0];
        //   let dateArr = date.split("-");
        //   let if_year = dateArr[0];
        //   let if_month = dateArr[1];
        //   let if_day = dateArr[2];
        //   return {
        //     ...item,
        //     if_year: Number(if_year),
        //     if_month: Number(if_month),
        //     if_day: Number(if_day),
        //   };
        // });
        // this.danqianyue = this.danqianyue.map(item=> {
        //     this.calendarList.forEach(item2=> {
        //         if(item.day === item2.if_day) {
        //             item = {
        //                 ...item,
        //                 ...item2
        //             }
        //         }
        //     })
        //     return item;
        // })
       
      });
    },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "appointmentData") {
          this.init();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.waibu {
  width: 100%;
  /* height: 500px; */
  margin: 0 auto;
  background-color: #f5f5f5;
}

.title {
  height: 40px;
  background-color: cadetblue;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.title div {
  align-self: center;
}
.title .let,
.title .rig {
  align-self: center;
  margin: 0 20px;
  cursor: pointer;
}

/* 周末 */
.zoumo {
  display: flex;
  justify-content: inherit;
  margin-top: 10px;
  
}
.zoumo p {
  display: flex;
  justify-content: center;
  width: calc(100% / 7);
  /* margin: 0 27px; */
}

/* 日历内容 */
.box {
    width: 100%;
  display: flex;
  justify-content: inherit;
  flex-wrap: wrap;
}
.box div {
  width: 100%;
  display: flex;
  justify-content: center;
  width: calc(100% / 7);
  
  text-align: start !important;
}
.item{
    border: none !important;
    width: 100% !important;
    margin-bottom: 3px;
    
}
.data{
    padding-left:10px;
    text-align: center !important;
    margin-bottom: 5px;
}
.text{
    width:70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.text2{
    width:82px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.text3{
    width:60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* //剩余的天数 */
.sy {
  visibility: hidden;
}
.item_Con{
    height: 110px;
    position: relative;
    padding: 10px;
    /* width: 14%; */
    border: 1px solid #ccc;
    display: block !important;
    overflow-y: hidden;
}
.smegma{
    width: 200%;
    height: 20px;
    background: #ccc;
    position: absolute;
    bottom: 0px;
    right: 0px;
    cursor: pointer;
}

</style>
