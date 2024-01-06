<template>
  <div>
    <Tabs ref="tabs" v-model="activeName">
      <TabPane label="啊美雅" name="ameya">
        <div>
          <ameya
            :activeName="activeName"
          ></ameya>
        </div>
      </TabPane>
      <TabPane label="刀刀组" name="daodao">
        <div>
          <daodao
            :activeName="activeName"
          ></daodao>
        </div>
      </TabPane>
      <TabPane label="吉娜组" name="jina">
        <div>
          <jina
            :activeName="activeName"
          ></jina>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import ameya from "./views/ameya/ameya.vue"
import daodao from "./views/daodao/daodao.vue"
import jina from "./views/jina/jina.vue"

export default {
  components:{
    ameya,
    daodao,
    jina
  },
  data(){
    return {
      activeName: "ameya",
    }
  },
  methods:{
    
  }
}
</script>
