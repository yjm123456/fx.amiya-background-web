<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <!-- <TabPane label="机构看板" name="mechanism">
        <div>
          <mechanism
            :activeName="activeName"
          ></mechanism>
        </div>
      </TabPane> -->
      <TabPane label="机构日运营" name="todayDate">
        <div>
          <todayDate
            :activeName="activeName"
          ></todayDate>
        </div>
      </TabPane>
      <TabPane label="机构年运营" name="yearDate">
        <div>
          <yearDate
            :activeName="activeName"
          ></yearDate>
        </div>
      </TabPane>
      <TabPane label="运营占比" name="proportionOfOperation">
        <div>
          <proportionOfOperation
            :activeName="activeName"
          ></proportionOfOperation>
        </div>
      </TabPane>
      <TabPane label="全国机构/城市当月数据" name="wholeCountry">
        <div>
          <wholeCountry
            :activeName="activeName"
          ></wholeCountry>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import mechanism from "./views/mechanism/mechanism.vue"
import todayDate from "./views/todayDate/todayDate.vue"
import yearDate from "./views/yearDate/yearDate.vue"
import proportionOfOperation from "./views/proportionOfOperation/proportionOfOperation.vue"
import wholeCountry from "./views/wholeCountry/wholeCountry"

export default {
  components:{
    mechanism,
    todayDate,
    yearDate,
    proportionOfOperation,
    wholeCountry
  },
  data(){
    return {
    //   activeName: "mechanism",
      activeName: "todayDate",
    }
  },
  methods:{
    
  }
}
</script>
