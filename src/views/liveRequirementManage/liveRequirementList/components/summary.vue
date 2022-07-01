<template>
  <div>
    <div class="total_view">
      <div>
        <Card>
          <CellGroup>
            <Cell
              title="总发起"
              :extra="headCollectivityData.totalCount + ''"
            />
            <Cell
              title="已解决"
              :extra="headCollectivityData.treatedQuantity + ''"
            />
            <Cell
              title="未解决"
              :extra="headCollectivityData.unTreatedQuantity + ''"
            />
            <Cell
              title="已作废"
              :extra="headCollectivityData.cancelQuantity + ''"
            />
            <Cell title="解决率">
              <Progress
                :percent="headCollectivityData.treatedRate"
                slot="extra"
              />
            </Cell>
          </CellGroup>
        </Card>
      </div>
      <div>
        <Card>
          <pie
            :requirementTypeRateList="
              headCollectivityData.requirementTypeRateList
            "
          ></pie>
        </Card>
      </div>
      <div>
        <Card>
          <CellGroup>
            <Cell
              title="平均响应时长"
              :extra="headCollectivityData.avgResponseHour + '小时'"
            />
            <Cell
              title="平均处理时长"
              :extra="headCollectivityData.avgExecuteHour + '小时'"
            />
          </CellGroup>
        </Card>
        <Card class="stay_complete_demand">
          <CellGroup>
            <Cell
              title="待确认完成需求"
              :extra="headCollectivityData.waitConfirmFinishQuantity + ''"
              @click.native="handleCellClick"
            />
          </CellGroup>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import pie from "./pie";
export default {
  components: { pie },
  props: {
    headCollectivityData: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleCellClick() {
      this.$emit("controlStayCompleteDemandModal");
    },
  },
};
</script>
<style lang="less" scoped>
.total_view {
  display: flex;
  > div:nth-child(1) {
    flex: 1;
    /deep/ .ivu-card-body {
      box-sizing: border-box;
      padding: 5px;
      .ivu-cell {
        .ivu-cell-footer {
          color: #808695;
          width: 200px;
          text-align: right;
        }
      }
    }
  }
  > div:nth-child(2) {
    flex: 1;
    /deep/ .ivu-card-body {
      height: 198px;
      box-sizing: border-box;
      padding: 5px;
      .ivu-cell {
        .ivu-cell-footer {
          color: #808695;
          width: 200px;
          text-align: right;
        }
      }
    }
  }
  > div:nth-child(3) {
    flex: 1;
    /deep/ .ivu-card-body {
      box-sizing: border-box;
      padding: 5px;
      .ivu-cell {
        .ivu-cell-footer {
          color: #808695;
          width: 200px;
          text-align: right;
        }
      }
    }
    .stay_complete_demand {
      margin-top: 5px;
      font-weight: bold;
      /deep/ .ivu-cell-main {
        color: #2d8cf0;
      }
      /deep/ .ivu-cell-extra {
        color: #2d8cf0;
      }
    }
  }
  > div:nth-child(2) {
    margin: 0 10px;
  }
}
</style>
