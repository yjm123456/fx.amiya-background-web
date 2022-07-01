<template>
  <div class="tags-nav">
    <div class="btn-con left-btn">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div ref="scrollOuter" class="scroll-outer">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group>
          <Tag
            type="dot"
            v-for="(item, index) in tagNavListInfo"
            :key="`tag-nav-${index}`"
            :data-route-item="item"
            :color="isActive(item) ? 'primary' : 'default'"
            :closable="item.name !== defaultPageRoutePage.substr(1,defaultPageRoutePage.length-1)"
            ref="tagsPageOpened"
            @click.native="turnToPage(item)"
            @on-close="handleClose(item)"
          >{{ item.meta.title }}</Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tagBodyLeft: 0,
      outerPadding: 4,
      defaultPageRoutePage: sessionStorage.getItem("defaultPageRoutePage"),
    }
  },
  computed: {
    tagNavListInfo() {
      return this.$store.state.tag.tagNavList;
    },
  },
  methods: {
    //判断页面的路由是否为当前路由
    isActive(route) {
      return route.path === this.$route.path;
    },
    //关闭标签
    handleClose (route) {
      this.$store.dispatch("deleteTag", route).then((tagNavList) => {
        let route = tagNavList.slice(-1)[0];
        if (route) {
          let { name, params, query, meta, path } = route;
          this.$router.push({
            name,
            params,
            query,
            meta,
          });
        } else {
          this.$router.push("/");
        }
      });
    },
    //切换路由
    turnToPage(route) {
      let { name, params, query, meta, path } = route;
      this.$router.push({
        name,
        params,
        query,
        meta,
      });
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    moveToView (tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    getTagElementByRoute (route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (this.routeEqual(route, item.$attrs['data-route-item'])) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    },
    routeEqual(route1, route2){
      const params1 = route1.params || {}
      const params2 = route2.params || {}
      const query1 = route1.query || {}
      const query2 = route2.query || {}
      return (route1.name === route2.name) && this.objEqual(params1, params2) && this.objEqual(query1, query2)
    },
    objEqual(obj1, obj2){
      const keysArr1 = Object.keys(obj1)
      const keysArr2 = Object.keys(obj2)
      if (keysArr1.length !== keysArr2.length) return false
      else if (keysArr1.length === 0 && keysArr2.length === 0) return true
      else return !keysArr1.some(key => obj1[key] != obj2[key])
    }
  },
  watch: {
    '$route' (to) {
      this.getTagElementByRoute(to)
    }
  },
  mounted () {
    setTimeout(() => {
      this.getTagElementByRoute(this.$route)
    }, 200)
  }
}
</script>
<style lang="less">
.tags-nav{
  position: relative;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
  padding: 0;
  height:40px;
  background:#F0F0F0;
  margin-bottom: 10px;
  cursor: pointer;
  .btn-con{
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    button{
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn{
      left: 0;
    }
    &.right-btn{
      right: 0;
    }
  }
  .scroll-outer{
    position: absolute;
    left: 28px;
    right: 28px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 3px 2px rgba(100,100,100,.1) inset;
    .scroll-body{
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
      .ivu-tag-dot-inner{
        transition: background .2s ease;
      }
    }
  }
}
</style>
