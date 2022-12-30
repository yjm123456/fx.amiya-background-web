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
        <FormItem label="升单金额"  prop="checkBuyAgainPrice">
          <Input v-model="form.checkBuyAgainPrice" placeholder="请输入升单金额" type="number" number/>
        </FormItem>
        <FormItem label="服务费合计"  prop="checkSettlePrice">
          <Input v-model="form.checkSettlePrice" placeholder="请输入服务费合计"  type="number" number/>
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
import * as api from "@/api/customerManage";
import upload from "@/components/upload/upload";
export default {
  components: {
    upload,
  },
  props: {
    toExamineModal: Boolean,
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
        // 审核升单金额
        checkBuyAgainPrice:null,
        // 服务费合计
        checkSettlePrice:null,
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
        checkBuyAgainPrice: [
          {
            required: true,
            message: "请输入升单金额",
          },
        ],
        checkSettlePrice: [
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
          const {id,checkState,checkSettlePrice,checkBuyAgainPrice,checkRemark,checkPicture} = this.form
          const data = {
            id:this.itemInfo.id,
            checkState,
            checkBuyAgainPrice ,
            checkSettlePrice,
            checkRemark,
            checkPicture
          }
          api.customerManageCheck(data).then((res) => {
            if (res.code === 0) {
              this.handleCancel("form");
              this.$emit("handleRefreshCustomerList");
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
      this.$emit("update:toExamineModal", false);
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
    toExamineModal(value) {
      this.control = value;
    },
    itemInfo(value){
      if(value.price){
       this.form.checkBuyAgainPrice = value.price
      }
    }
  },
};
</script>