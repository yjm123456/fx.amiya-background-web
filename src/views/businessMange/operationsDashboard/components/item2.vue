<template>
    <div class="center_content">
          <div class="center_item">
            <div class="item1" >
              <div class="h2">线索量</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：121</div>
                    <div class="h3">累计</div>
                    <div class="h3">10000</div>
                </div>
                <div class="item_right">
                    <div>当月同比：100%</div>
                    <div>当月环比：100%</div>
                    <div>当月目标达成率：100%</div>
                </div>
              </div>
            </div>
            <div class="item2" >
              <div class="h2">退卡量</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：121</div>
                    <div class="h3">累计</div>
                    <div class="h3">10000</div>
                </div>
                <div class="item_right">
                    <div>当月同比：100%</div>
                    <div>当月环比：100%</div>
                    <div>当月目标达成率：100%</div>
                </div>
              </div>
            </div>
            <div class="item3" >
              <div class="h2">分诊量</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：121</div>
                    <div class="h3">累计</div>
                    <div class="h3">10000</div>
                </div>
                <div class="item_right">
                    <div>当月同比：100%</div>
                    <div>当月环比：100%</div>
                    <div>当月目标达成率：100%</div>
                </div>
              </div>
            </div>
            <div class="item4" >
              <div class="h2">加v量</div>
              <div class="item">
                <div class="item_left">
                    <div>当日：121</div>
                    <div class="h3">累计</div>
                    <div class="h3">10000</div>
                </div>
                <div class="item_right">
                    <div>当月同比：100%</div>
                    <div>当月环比：100%</div>
                    <div>当月目标达成率：100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
export default{
    props:{
        background:String,
        name:String,
        day:String
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.center_content{
  width: 100%;
}
.center_item{
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* padding: 0 10px;
  box-sizing: border-box; */
  text-align: center;
  color: #fff;
}
.item1,.item2,.item3,.item4{
  flex:1;
  margin:10px;
  padding: 10px 0;
  box-sizing: border-box;
  border-radius: 10px;
}
.item{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: start;
}
.item1{
  background-image:   linear-gradient(to right,#8ED6E5, #0AABBD);
}
.item2{
  background: linear-gradient(to right,#AEB5F3, #7381FB);
}
.item3{
  background:  linear-gradient(to right,#D7A3FA, #BB5DF9);
}
.item4{
  background:  linear-gradient(to right,#F69A56, #F37F51);
}
.h2{
    font-size: 16px;
    margin-bottom:5px ;
}
.h3{
    font-size:16px;
    text-align:center
}
</style>