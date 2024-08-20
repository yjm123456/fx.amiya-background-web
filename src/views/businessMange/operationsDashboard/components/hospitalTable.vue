<template>
  <div>
    <Card class="container">
      <div class="h3">机构转化情况</div>
      <div class="tab2" >
        <div
          class="tab_item"
          v-for="(item, index) in platformList"
          :key="index"
          @click="checkTab(index, item)"
          :class="{ active2: item.isSelected }"
        >
          <!-- <i class="iconfont  icons" :class="item.icon"></i> -->
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div>
        <Table border :columns="query.columns" :data="query.data"  :row-class-name="rowClassName"></Table>
      </div>
    </Card>
  </div>
</template>
<script>
import * as api from "@/api/amiyaOperationsBoard";
export default {
    props: {
        params:Object
    },
  data() {
    return {
      // 平台
      platformList: [
        {
          name: "刀刀组",
          id: 1,
          isSelected: true,
        },
        {
          name: "吉娜组",
          id: 2,
          isSelected: true,
        },
        {
          name: "合作达人",
          id: 3,
          isSelected: true,
        },
        
      ],
      // 查询
      query: {
        columns: [
          {
            title: "城市",
            key: "city",
            width:100,
            align:'center',
            fixed:'left',
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        // padding:'10px',backgroundColor: '#fff9e6',
                        color:'#000',
                        fontSize:'15px',
                        fontWeight:'bold',
                      } 
                },
                      params.row.city );
            }
          },
          {
            title: "医院",
            key: "hospitalName",
            width:180,
            fixed:'left',
            tooltip:true,
            className: 'test-name',
            render: (h, params) => {
                return h('div', { 
                    style: { 
                        // padding:'10px',backgroundColor: '#fff9e6',
                        color:'#000',
                        fontSize:'15px',
                        fontWeight:'bold',
                      } 
                },
                      params.row.hospitalName );
            }
          },
          {
            title: "派单量",
            key: "sendNum",
            width:90,
            align:'center',
            className: 'test-name',
          },
          {
            title: "上门数",
            key: "visitNum",
            width:90,
            align:'center',
            className: 'test-name',
          },
          {
            title: "上门率",
            key: "visitRate",
            align:'center',
            className: 'test-name',
            width:110,
            render: (h, params) => {
              return h(
                    "div",
                    params.row.visitRate ? params.row.visitRate + '%' : 0
                  )
                
            },
          },
          {
            title: "新客成交",
            key: "newCustomerDealNum",
            width:140,
            className: 'test-name',
            align:'center',
          },
          {
            title: "新客成交率",
            key: "newCustomerDealRate",
            align:'center',
            width:110,
            className: 'test-name',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.newCustomerDealRate ? params.row.newCustomerDealRate + '%' : 0
                  )
                
            },
          },
          {
            title: "新客业绩",
            key: "newCustomerAchievement",
            width:140,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.newCustomerAchievement ? (params.row.newCustomerAchievement).toFixed(2) : 0
                  )
                
            },
          },
          
          {
            title: "老客成交",
            key: "oldCustomerDealNum",
            width:140,
            align:'center',
            className: 'test-name',
          },
          {
            title: "老客业绩",
            key: "oldCustomerAchievement",
            width:140,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.oldCustomerAchievement ? (params.row.oldCustomerAchievement).toFixed(2) : 0
                  )
                
            },
          },
          
          {
            title: "总业绩",
            width:150,
            align:'center',
            className: 'test-name',
            key: "totalAchievement",
            render: (h, params) => {
              return h(
                    "div",
                    params.row.totalAchievement ? (params.row.totalAchievement).toFixed(2) : 0
                  )
                
            },
          },
          {
            title: "新客客单价",
            className: 'test-name',
            key: "newCustomerUnitPrice",
            width:110,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.newCustomerUnitPrice ? (params.row.newCustomerUnitPrice).toFixed(2) : 0
                  )
                
            },
          },
          {
            title: "老客客单价",
            className: 'test-name',
            key: "oldCustomerUnitPrice",
            width:110,
            align:'center',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.oldCustomerUnitPrice ? (params.row.oldCustomerUnitPrice).toFixed(2) : 0
                  )
                
            },
          },
          {
            title: "新老客占比",
            key: "newOrOldCustomerRate",
            width:110,
            align:'center',
            className: 'test-name',
          },
          {
            title: "贡献",
            key: "rate",
            width:110,
            align:'center',
            className: 'test-name',
            render: (h, params) => {
              return h(
                    "div",
                    params.row.rate + '%'
                  )
                
            },
          },
          
        ],
        data: [],
      },
    };
  },
  methods: {
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
    checkTab(index, value) {
      this.platformList[index].isSelected = !this.platformList[index].isSelected;
      this.getData()
    },
    getData(){
        this.getHospitalTransformData()
    },
    // 全国机构运营当日数据
    getHospitalTransformData() {
        const {startDate,endDate} =  this.params
        const data = {
            startDate: this.$moment(startDate).format("YYYY-MM-DD") ,
            endDate: this.$moment(endDate).format("YYYY-MM-DD"),
            showDaoDao:this.platformList.find((item) => item.id == 1).isSelected,
            showJiNa:this.platformList.find((item) => item.id == 2).isSelected,
            showCooperate:this.platformList.find((item) => item.id == 3).isSelected,
        }
        api.hospitalTransformData(data).then((res) => {
            if (res.code === 0) {
            const { data } = res.data;
            this.query.data = data;
            }
        });
    },
  },
  created() {
  },
  
};
</script>
<style scoped lang="less">
/deep/.ivu-table th.test-name,.ivu-table-header thead tr th,.thead {
    background: #f7e8b1;
}
/deep/.ivu-table th.test-name {
    background: #f7e8b1;
    border: 1px solid rgb(221, 220, 220);
}
/deep/.ivu-table-border td:nth-child(1){
    background: #fff9e6;
}
/deep/.ivu-table-border td:nth-child(2){
    background: #fff9e6;
}

</style>
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
.tab_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 15px 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.tab2 {
  display: flex;
}
.tab_item {
  background: #f0f0f0;
  padding: 1px 15px;
  box-sizing: border-box;
  margin:0  30px 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.active2{
  color: red;
  border: 1px solid red;
}
.h3{
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: center;
}
/deep/.ivu-table-border td:nth-child(1){
    background: #fff9e6;
}
/deep/.ivu-table-border td:nth-child(2){
    background: #fff9e6;
}
</style>