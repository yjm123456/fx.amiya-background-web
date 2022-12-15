<template>
  <div class="content">
    <div class="left">
      <Tabs ref="tabs" v-model="activeName" type="card">
        <TabPane label="机构数据" name="hospitalData">
          <div>
            <hospitalData :activeName="activeName"></hospitalData>
          </div>
        </TabPane>
        <TabPane label="数据比例" name="dataProportion">
          <div>
            <dataProportion :activeName="activeName"></dataProportion>
          </div>
        </TabPane>
      </Tabs>
      <Card style="margin:10px 0"> 
        <tables></tables>
      </Card>
      <Card>
        <datas :dataParams="dataParams"></datas>
      </Card>
    </div>
    <div class="right">
      <Card>
        <div>
          <img
            :src="hospitalInfo.thumbPicUrl"
            alt=""
            class="img"
          />
          <div class="title2">
            {{hospitalInfo.name}}
          </div>
          <div class="title">成立时间：{{hospitalInfo.hospitalCreateDate ? this.$moment(hospitalInfo.hospitalCreateDate).format("YYYY-MM-DD") : ''}}</div>
          <div class="title">面积：{{hospitalInfo.area}} ㎡</div>
          <div class="title">{{hospitalInfo.address}}</div>
        </div>
      </Card>
      <Card style="margin-top:10px">
        <div>
          <div class="title3">咨询热线：{{hospitalInfo.phone}}</div>
          <div class="title3">医院级别：<span v-for="(item,index) in list" :key="item">{{item}} <span v-if="index !== list.length - 1" >，</span></span></div>
          <div class="title3">医院简介：{{hospitalInfo.description}}</div>
          <div class="valid_con">
            <span class="valid_title">是否接收消息通知</span>
            <!-- :before-change="beforeChange" -->
            <i-switch v-model="messageRecieve.isReceive" disabled/>
          </div>
          <div class="title3">接收时段：{{messageRecieve.startTime}} - {{messageRecieve.endTime}}<span class="edit" @click="controlModal=true">修改</span></div>
        </div>
      </Card>
      <Modal
        v-model="controlModal"
        title="修改接收消息通知"
        :mask-closable="false"
        @on-visible-change="handleModalVisibleChange"
      >
        <Form
          ref="form"
          :model="form"
          :rules="ruleValidate"
          label-position="left"
          :label-width="110"
        > 
        <FormItem label="是否接受消息" prop="isReceive" >
          <i-switch v-model="form.isReceive" />
        </FormItem>
          <FormItem label="接收时间" prop="time">
            <Time-picker
                :value="form.time"
                format="HH:mm"
                type="timerange"
                placement="bottom-end"
                placeholder="选择医院营业时间"
                style="width: 190px"
                @on-change="hospitalTime"
                @on-clear="form.time = []"
              ></Time-picker>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button @click="cancelSubmit('form')">取消</Button>
          <Button type="primary" @click="handleSubmit('form')">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/hospitalManage";
import datas from "./components/data.vue";
import hospitalData from "./views/hospitalData.vue";
import dataProportion from "./views/dataProportion.vue";
import tables from "./components/table.vue"
export default {
  components: {
    datas,
    dataProportion,
    hospitalData,
    tables
  },
 data() {
    return {
      form: {
        // 是否接收消息
        isReceive: false,
        // 开始时间
        startTime: "",
        // 结束时间
        endTime: "",
        id:"",
        time:[]
      },

      ruleValidate: {
        time: [
          {
            required: true,
            message: "请选择接收时间",
          },
        ],
        
      },
      messageRecieve:{},
      controlModal:false,
      activeName: "hospitalData",
      hospitalId:sessionStorage.getItem('hospitalId'),
      hospitalInfo:{},
      tagInfo:[],
      scaleTagList:[],
      list:[],
      // 未处理派单
      dataParams:{
        NotRepeatedSendOrder:0
      },
      
    };
  },
  created() {
      this.getHospital()
      this.getNotRepeatedSendOrder()
      this.isReceiveMessages()
    },
  methods: {
     // 营业时间
    hospitalTime(data) {
      if (!data) return;
      this.form.time = data;
    },
    // 是否接收消息通知
    isReceiveMessages(){
      api.getHospitalMessageRecieve().then((res) => {
        if(res.code === 0){
            this.messageRecieve = res.data.messageRecieve
        }
      })
    },
    // 确认
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
          const {id,startTime,endTime,time,isReceive} = this.form
          const data = { 
            id:this.messageRecieve.id,
            startTime:time[0],
            endTime:time[1],
            isReceive
          }
            // 修改
            api.updateHospitalMessageRecieve(data).then((res) => {
              if (res.code === 0) {
                this.isEdit = false;
                this.cancelSubmit("form");
                this.isReceiveMessages();
                this.$Message.success({
                  content: "修改成功",
                  duration: 3,
                });
              }
            });
      });
    },

    // 取消
    cancelSubmit(name) {
      this.controlModal = false;
      this.form.time = []
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$refs["form"].resetFields();
      }
    },
    // 获取医院获取派单未处理信息条数
    getNotRepeatedSendOrder(){
      api.getNotRepeatedSendOrder().then((res) => {
        if(res.code === 0){
          this.dataParams.NotRepeatedSendOrder = res.data.NotRepeatedSendOrder
        }
      })
    },
    // 获取医院信息
    getHospital(){
      api.byIdHospitalInfo(this.hospitalId).then((res) => {
        if(res.code === 0){
          this.hospitalInfo = res.data.hospitalInfo
          this.scaleTagList = res.data.hospitalInfo.scaleTagList
          const data = {
            type:0
          }
          api.TagInfonameList(data).then((res) => {
            if(res.code === 0){
              let list =[]
              this.scaleTagList.map(item=>{
                res.data.tagInfo.map(item2=>{
                  if(item == item2.id){
                    list.push(item2.name)
                  }
                })
              })
              this.list = list
             
            }
          })
        }
      })
    },
    
    // beforeChange() {
    //   return new Promise((resolve, reject) => {
    //     this.$Modal.confirm({
    //       title: "确认提示",
    //       content: "您确认要接收消息通知？",
    //       onOk: () => {
    //         resolve();
    //       },
    //       onCancel: () => {
    //         reject();
    //       },
    //     });
    //   });
    // },
  },
  watch: {
    activeName: {
      handler(value) {
        if (value === "hospitalData") {
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 75%;
  margin-right: 10px;
}
.right {
  width: 24%;
  margin-top: 3%;
}
.list {
  display: flex;
  align-items: center;
  .item {
    width: 350px;
    height: 130px;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    color: #fff;
    border-radius: 6px;
    .icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .icon2 {
      position: absolute;
      right: 10px;
      bottom: 0px;
    }
    .item_title {
      font-size: 18px;
    }
    .item_num {
      font-size: 24px;
      margin: 5px 0;
    }
    .item_proportion {
      font-size: 12px;
    }
  }
  .blue {
    background: #2263b2;
  }
  .green {
    background: #59b47d;
    margin: 0 100px 0 50px;
  }
  .yellow {
    background: #ffb142;
  }
  .orange {
    background: #ff705e;
    margin: 0 100px 0 50px;
  }
}
.content {
  color: #000;
}
.img {
  width: 60px;
  height: 60px;
  display: block;
  margin: 10px auto 0;
  border-radius: 50%;
}
.title,
.title2,.title3 {
  margin: 10px 0;
  color: #000;
}
.title {
  font-size: 12px;
}
.title2 {
  font-weight: bold;
}
.title3{
  font-size: 14px;
}
.valid_con{
  display: flex;
  align-items: center;
}
.valid_title{
  margin-right: 20px;
}
.edit{
  color: #2388ee;
  cursor: pointer;
  margin-left: 20px;
}
</style>
