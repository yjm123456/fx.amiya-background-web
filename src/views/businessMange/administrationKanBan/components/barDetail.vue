<template>
  <div>
    <Modal
      v-model="control"
      title="详情"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
      width="53%"
    >
      <div class="wrapper">
        <div ref="dom" :style="{ width: '100%', height: '400px' }"></div>
      </div>
      <div slot="footer">
        <Button @click="cancel('form')">取消</Button>
        <!-- <Button type="primary" @click="handleSubmit('form')">确定</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
import { on, off } from "@/utils/util";
import tdTheme from "@/components/theme.json";
import * as echarts from "echarts";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  props: {
    detailModel: Boolean,
    detailData: Array,
    title:String
  },
  data() {
    return {
      myChart: "",
      control: false,
    };
  },
  methods: {
    // 业绩
    myEcharts(value) {
      let name = [];
      let list1 = [];
      let list2 = [];
      let list3 = [];
      value.map((item) => {
        name.unshift(item.name);
        list1.unshift(item.beforeLiveValue);
        list2.unshift(item.livingValue);
        list3.unshift(item.afterLiveValue);
      });
      let option = {
        tooltip: {
          trigger: "axis",
          formatter:this.title == '分诊量' ?   (params) => {
                let list = []
                let listItem = ''
                let axisValueLabel = params[0].axisValueLabel
                
                for (let i = 0; i < params.length; i++) {
                    list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].data  +'人' +
                        '</span>'
                    )
                }
                listItem = list.join('<br>')
                return axisValueLabel + '<br>' + listItem
            }: (params) => {
                let list = []
                let listItem = ''
                let axisValueLabel = params[0].axisValueLabel
                
                for (let i = 0; i < params.length; i++) {
                    list.push(
                        '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        params[i].color +
                        ';margin-right: 5px;border-radius: 50%;}"></i>' +
                        '<span style="display:inline-block;">' +
                        params[i].seriesName +
                        '</span><span style="display:inline-block;">&nbsp&nbsp' +
                        params[i].data  +'%' +
                        '</span>'
                    )
                }
                listItem = list.join('<br>')
                return axisValueLabel + '<br>' + listItem
            }
        },
        calculable: true,
        xAxis: [
          {
            type: "value",
            // prettier-ignore
            
          },
        ],
        yAxis: [
          {
            type: "category",
            data: name,
            axisLabel: {
              formatter: function(value) {
                return value.length > 5 ? value.slice(0, 5) + "..." : value;
              },
            },
          },
        ],
        series: [
          {
            name:  "直播前",
            type: "bar",
            data: list1,
          },
          {
            name:  "直播中",
            type: "bar",
            data: list2,
          },
          {
            name:  "直播后",
            type: "bar",
            data: list3,
          },
        ],
      };
      this.myChart = echarts.init(this.$refs.dom, "tdTheme");
      this.myChart.clear();
      this.myChart.setOption(option);
      on(window, "resize", this.myChart.resize);
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.$emit("update:detailModel", false);
      }
    },
    cancel() {
      this.$emit("update:detailModel", false);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.myChart.resize);
  },
  watch: {
    detailData(value) {
      if(this.detailModel == true){
        this.$nextTick(() => {
          this.myEcharts(value);
        });
      }
      
    },
    detailModel(value) {
      this.control = value;
      if (value == true) {
        // this.$nextTick(() => {
        // this.myEcharts(this.detailData);
        // });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 400px;
  // margin-left: 5%;
}
</style>
