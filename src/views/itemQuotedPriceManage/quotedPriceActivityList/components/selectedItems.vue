<template>
  <div>
    <Modal
      v-model="control"
      title="多选项目"
      :mask-closable="false"
      width="1000"
      @on-visible-change="handleModalVisibleChange"
      fullscreen
    >
      <Row :gutter="16">
        <Col span="12"
          ><item
            ref="item"
            :selectedItemList="selectedItemList"
            @handleSelectItem="handleSelectItem"
            :itemId="itemId"
          ></item
        ></Col>
        <Col span="12"
          ><selectedItem
            ref="selectedItem"
            :selectedItemList="selectedItemList"
            @handleDeleteItem="handleDeleteItem"
          ></selectedItem
        ></Col>
      </Row>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="submit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/itemQuotedPriceManage";
// 项目列表
import item from "./components/item";
// 已选项目
import selectedItem from "./components/selectedItem";
export default {
  components: {
    item,
    selectedItem,
  },
  props: {
    // 控制弹框显示隐藏
    setItemOffer: {
      type: Boolean,
    },
    // 活动编号
    activityId: {
      type: Number,
    },
  },
  data() {
    return {
      control: false,

      // 已选择项目
      selectedItemList: [],

      // 当前删除的项目编号
      itemId: null,
    };
  },
  methods: {
    // 获取已选择项目
    getItemInfo() {
      const data = {
        activityId: this.activityId,
      };
      api.byActivityIdGetItemList(data).then((res) => {
        if (res.code === 0) {
          this.selectedItemList = res.data.activityDetail;
        }
      });
    },

    // 添加项目
    handleSelectItem(items) {
      const selectedItem = this.$refs.selectedItem.data;
      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < selectedItem.length; j++) {
          if (items[i] && selectedItem[j]) {
            if (items[i].itemId === selectedItem[j].itemId) {
              items[i].livePrice = selectedItem[j].livePrice;
            }
          }
        }
      }
      this.$refs.selectedItem.data = items;
    },

    // 删除项目
    handleDeleteItem(itemId) {
      this.itemId = itemId;
    },

    // modal 关闭
    handleModalVisibleChange(value) {
      if (value === false) {
        this.cancel();
      }
    },

    // 取消提交添加项目
    cancel() {
      this.$emit("handleResetControlModalValueClick");
      this.$refs.item.items = [];
    },

    // 提交添加项目
    submit() {
      // 选择的项目
      const selectedItem = this.$refs.selectedItem.data;
      if (!selectedItem.length) {
        this.$Message.error({
          content: "请选择项目",
          duration: 5,
        });
        return;
      }
      // 提交参数
      const activityItemList = selectedItem.map((_item) => {
        return {
          itemId: _item.itemId,
          salePrice: _item.salePrice,
          livePrice: _item.livePrice,
        };
      });
      // 判断直播价格是否为空或为0
      for (let i = 0; i < activityItemList.length; i++) {
        if (!activityItemList[i].livePrice) {
          this.$Message.error({
            content: "请输入直播价格",
            duration: 5,
          });
          return false;
        }
      }
      // 调取接口
      const data = {
        activityId: this.activityId,
        activityItemList,
      };
      api.addActivityItem(data).then((res) => {
        if (res.code === 0) {
          this.cancel();
          this.$Message.success({
            content: "添加成功",
            duration: 3,
          });
        }
      });
    }
  },
  watch: {
    setItemOffer: {
      handler(newVal) {
        this.control = newVal;
        if (newVal) {
          this.getItemInfo();
        }
      },
      immediate: true,
    },
  },
};
</script>
