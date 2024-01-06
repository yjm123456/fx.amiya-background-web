<template>
  <div>
    <Modal
      v-model="control"
      title="转移"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidates"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="接收人" prop="acceptBy">
          <Select
            v-model="form.acceptBy"
            placeholder="请选择接收人"
            filterable
          >
            <Option
              v-for="item in transferParams.employee"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <Spin fix v-if="isLoading == true">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/contentPlatFormOrderAddWork";
export default {
  components: {},
  props: {
    transferModel: Boolean,
    transferParams: Object,
  },
  data() {
    return {
      isLoading: false,
      control: false,
      form: {
        // 接收人
        acceptBy: null,
       
      },
      ruleValidates: {
        acceptBy: [
          {
            required: true,
            message: "请选择接收人",
          },
        ],
        
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const data = {
            id: this.transferParams.id,
           acceptBy:this.form.acceptBy
          };
          this.isLoading = true;
          api.updateAcceptBy(data).then((res) => {
            if (res.code === 0) {
              this.isLoading = false;
              this.handleCancel("form");
              this.$emit("getContentPlatFormOrderAddWork");
              this.$Message.success({
                content: "转移成功",
                duration: 3,
              });
            } else {
              setTimeout(() => {
                this.isLoading = false;
              }, 3000);
            }
          });
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:transferModel", false);
      this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel("form");
      }
    },
  },
  watch: {
    transferModel(value) {
      this.control = value;
    },
    itemInfo(value) {
      if (value.price) {
        this.form.checkBuyAgainPrice = value.price;
      }
    },
  },
};
</script>
