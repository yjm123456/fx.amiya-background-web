<template>
  <div>
    <Modal
      v-model="control"
      title="添加标签"
      :mask-closable="false"
      @on-visible-change="handleModalVisibleChange"
    >
      <Form ref="form" :model="form" label-position="left" :label-width="100" :rules="ruleValidate">
        <FormItem label="标签" prop="tagIds">
          <Select
            v-model="form.tagIds"
            multiple
            placeholder="请选择标签"
            filterable
          >
            <Option
              v-for="item in tagParams.customerTagNameList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel('form')">取消</Button>
        <Button type="primary" @click="handleSubmit('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/api/customerManage";
export default {
  components: {},
  props: {
    tagModel: Boolean,
    tagParams: Object,
    customerTagList:Array
  },
  data() {
    return {
      control: false,
      form: {
        //
        tagIds: [],
      },
      ruleValidate: {
        tagIds: [
          {
            required: true,
            message: "请选择标签",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {tagIds} = this.form
          const data = {
            customerId:this.tagParams.id,
            tagIds:tagIds
          };
          api.addCustomerTag(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$Message.success({
                content: "添加成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:tagModel", false);
      this.$refs['form'].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
      }
    },
  },
  watch: {
    tagModel(value) {
      this.control = value;
     
    },
    customerTagList(value){
       this.form.tagIds = value
    }
  },
};
</script>
