<template>
  <div class="vue-dropdown default-theme">
    <div
      class="cur-name"
      :class="isShow ? 'show' : ''"
      @click="isShow = !isShow"
    >
      {{ selectd ? selectd : placeholder}}
    </div>
    <div class="list-and-search" :class="isShow ? 'on' : ''">
      <div class="search-module clearfix" v-show="isNeedSearch">
        <input
          class="search-text"
          @keyup="search($event)"
          :placeholder="searchPlaceholder"
        />
      </div>
      <ul class="list-module">
        <li
          v-for="(item, index) in itemlist"
          @click="selectToggle(item)"
          :key="index"
        >
          <span class="list-item-text">{{ item }}</span>
        </li>
      </ul>
      <div class="tip-nodata" v-show="isNeedSearch && itemlist.length == 0">
        {{ nodatatext }}
      </div>
      <!-- <div class="select-page" v-show="isNeedPage">
        <span @click="prevePage">上一页</span>
        <span>{{pageNum}} / {{pageCount}}</span>
        <span @click="nextPage">下一页</span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      selectd: null,
    };
  },
  props: {
    // 父组件传来的数据
    itemlist: {
      type: Array,
      default: function () {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    // 搜索Placeholder的默认值
    searchPlaceholder: {
      type: String,
      default: "搜索",
    },
    // 是否需要搜索框
    isNeedSearch: {
      type: Boolean,
      default: false,
    },
    // 是否需要分页
    isNeedPage: {
      type: Boolean,
      default: false,
    },
    // 当前页数
    pageNum:{
      type: Number,
      default: 1,
    },
    // 总页数
    pageCount:{
      type: Number,
      default: 0,
    },
    // 没有搜索到时的文本提示
    nodatatext: {
      type: String,
      default: "未找到结果",
    },
  },
  created() {
    //点击组件以外的地方，收起
    document.addEventListener(
      "click",
      (e) => {
        if (!this.$el.contains(e.target)) {
          this.isShow = false;
        }
      },
      false
    );
  },
  methods: {
    // 选择
    selectToggle(item) {
      this.selectd = item;
      this.isShow = false;
      this.$emit("selectChange", this.selectd);
    },
    // 搜索
    search(e) {
      let searchvalue = e.currentTarget.value;
      this.$emit("searchChange", searchvalue);
    },
    // 上一页
    prevePage() {
      this.$emit("prevePage");
    },
    // 下一页
    nextPage() {
      this.$emit("nextPage");
    },
  },
};
</script>

<style lang="less" scoped>
.list-and-search {
  background: #fff;
  border: 1px solid #ccc;
  display: none;
  position: absolute;
  top: 42px;
  z-index: 999;
  width: 100%;
  transition: all 1s;
  &.on {
    display: block;
  }
}
.cur-name {
  height: 32px;
  line-height: 32px;
  text-indent: 10px;
  position: relative;
  color: #777;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 30px;
  &:after {
    position: absolute;
    right: 9px;
    top: 13px;
    content: " ";
    width: 0;
    height: 0;
    border-right: 6px solid transparent;
    border-top: 6px solid #7b7b7b;
    border-left: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
  &.show {
    &:after {
      right: 9px;
      top: 6px;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #7b7b7b;
      border-left: 6px solid transparent;
      border-top: 6px solid transparent;
    }
  }
}
.vue-dropdown.default-theme {
  box-sizing: border-box;
  position: relative;
  width: 200px;
  z-index: 10;
  border-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  &._self-show {
    display: block !important;
  }
  .search-module {
    position: relative;
    border-bottom: 1px solid #ccc;
    .search-text {
      width: 100%;
      height: 30px;
      text-indent: 10px;
      box-shadow: none;
      outline: none;
      border: none;
    }
  }
  input::-webkit-input-placeholder {
    font-size: 14px;
  }
  .list-module {
    max-height: 300px;
    overflow-y: auto;
    li {
      &._self-hide {
        display: none;
      }
      margin-top: 0.4em;
      padding: 0.4em;
      &:hover {
        cursor: pointer;
        color: #fff;
        background: #00a0e9;
      }
    }
  }
}
.tip-nodata {
  font-size: 14px;
  padding: 10px 0;
  text-indent: 10px;
  text-align: center;
}
.select-page {
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  & > span {
    flex: 1;
    text-align: center;
    color: #2d8cf0;
    font-weight: bold;
  }
}
</style>