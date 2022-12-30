<template>
  <div>
    <Modal
      v-model="control"
      title="审核"
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
       <FormItem label="审核状态" prop="checkState">
         <Select
            v-model="form.checkState"
            placeholder="审核状态"
          >
            <Option
              v-for="item in checkStateList"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="对账金额"  prop="checkPrice">
          <Input v-model="form.checkPrice" placeholder="请输入对账金额" type="number" number/>
        </FormItem>
        <FormItem label="服务费合计"  prop="settlePrice">
          <Input v-model="form.settlePrice" placeholder="请输入服务费合计"  type="number" number/>
        </FormItem>
        <FormItem label="审核图片" prop="checkPicture" key="checkPicture">
          <upload :uploadObj="uploadObj" @uploadChange="handleUploadChange" />
        </FormItem>
        <FormItem label="审核备注" prop="checkRemark">
          <Input v-model="form.checkRemark" type="textarea" :rows="3"></Input>
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
import * as api from "@/api/orderManage";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  props: {
    toExamineModel: Boolean,
    // checkStateList:Array,
    itemInfo:Object
  },
  data() {
    return {
      uploadObj: {
        // 是否开启多图
        multiple: false,
        // 图片个数
        length: 2,
        // 文件列表
        uploadList: [],
      },
      checkStateList:[
        {
          id:1,
          name:'审核不通过'
        },
        {
          id:2,
          name:'审核通过'
        }
      ],
      control: false,
      form: {
        id:null,
        // 审核状态
        checkState:'',
        // 审核对账金额
        checkPrice:null,
        // 服务费合计
        settlePrice:null,
        // 审核备注
        checkRemark:'',
        // 审核图片
        checkPicture:[]
      },
      ruleValidates: {
        checkState: [
          {
            required: true,
            message: "请选择审核状态",
          },
        ],
        checkPrice: [
          {
            required: true,
            message: "请输入对账金额",
          },
        ],
        settlePrice: [
          {
            required: true,
            message: "请输入服务费合计",
          },
        ],
      },
    };
  },
  methods: {
    // 图片
    handleUploadChange(values) {
      this.form.checkPicture = values;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const {id,checkState,settlePrice,checkPrice,checkRemark,checkPicture} = this.form
          const data = {
            id:this.itemInfo.id,
            checkState,
            checkPrice ,
            settlePrice,
            checkRemark,
            checkPicture
          }
          api.checkOrder(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$emit("handleRefreshPageChange");
              this.form.checkRemark = ''
              this.$Message.success({
                content: "提交成功",
                duration: 3,
              });
            }
          });
        }
      });
    },

    handleCancel(name) {
      this.$emit("update:toExamineModel", false);
      // this.$refs[name].resetFields();
      this.form.checkState = ''
      this.form.checkSettlePrice = null
      this.form.checkRemark = ''
      this.uploadObj.uploadList = [];
      // this.$refs[name].resetFields();
    },
    // modal 显示状态发生变化时触发
    handleModalVisibleChange(value) {
      if (!value) {
        this.handleCancel();
        // this.handleCancel("form");
      }
    },
  },
  watch: {
    toExamineModel(value) {
      this.control = value;
    },
  },
};
</script>