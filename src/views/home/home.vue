<template>
  <div class="layout">
    <Layout style="height: 100%">
      <Sider
        hide-trigger
        :style="{ background: '#fff', overflow: 'hidden' }"
        ref="side"
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <div class="logo-con">
          <img v-show="!isCollapsed" :src="maxLogo" key="max-logo" />
          <img v-show="isCollapsed" :src="minLogo" key="min-logo" />
        </div>
        <Menu
          :class="menuitemClasses"
          accordion
          theme="dark"
          width="auto"
          @on-open-change="handleMenuOpen"
          :open-names="$route.meta.openName"
          :active-name="$route.path"
          ref="menu"
        >
          <template v-for="item in menuList">
            <!-- 二级菜单 -->
            <template v-if="item.subMenus && item.subMenus.length > 0">
              <Submenu :name="item.description" :key="item.path">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  <span>{{ item.description }}</span>
                </template>
                <template v-for="sub in item.subMenus">
                  <MenuItem
                    :name="sub.path"
                    :to="sub.path"
                    :key="sub.description"
                    >{{ sub.description }}</MenuItem
                  >
                </template>
              </Submenu>
            </template>
            <!-- 一级菜单 -->
            <template v-else>
              <MenuItem :name="item.path" :to="item.path" :key="item.path">
                <Icon type="ios-navigate"></Icon>
                <span>{{ item.description }}</span>
              </MenuItem>
            </template>
          </template>
        </Menu>
      </Sider>

      <Layout>
        <div>
          <vhead
            :isCollapsed="isCollapsed"
            @toggleCollapse="toggleCollapse"
          ></vhead>
        </div>
        <div>
          <tagsNav></tagsNav>
        </div>
        <Content class="content-wrapper">
          <keep-alive>
            <router-view
              v-if="$route.meta.keepAlive && isRouterAlive"
            ></router-view>
          </keep-alive>
          <router-view
            v-if="!$route.meta.keepAlive && isRouterAlive"
          ></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import vhead from "./components/head/head.vue";
import tagsNav from "./components/tags-nav/tags-nav.vue";
import minLogo from "@/assets/images/logo_min.png";
import maxLogo from "@/assets/images/logo.png";
export default {
  components: {
    vhead,
    tagsNav,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      //折叠菜单
      isCollapsed: false,
      //菜单数据
      menuList: [],
      minLogo,
      maxLogo,
    };
  },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  mounted() {
    this.getMenuListInfo();
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    // 获取菜单数据
    getMenuListInfo() {
      this.menuList = JSON.parse(sessionStorage.getItem("menus"));
      this.$nextTick(function () {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    },
    // 折叠菜单
    toggleCollapse() {
      this.$refs.side.toggleCollapse();
      this.$store.commit("home/setCollapsede", this.isCollapsed);
    },
    // 展开菜单
    handleMenuOpen() {
      this.isCollapsed = false;
    },
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    }
  },
};
</script>
<style scoped>
.layout {
  height: 100vh;
  border: 1px solid #d7dde4;
  background-color: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.layout >>> .ivu-layout-sider {
  height: 100%;
  background: #515a6e !important;
}
.layout >>> .ivu-layout-sider-children {
  overflow-y: scroll;
  margin-right: -18px;
}
.logo-con {
  height: 64px;
  padding: 10px;
}
.logo-con img {
  height: 44px;
  width: auto;
  display: block;
  margin: 0 auto;
}
.content-wrapper {
  margin: 0 18px 10px 18px;
  overflow: auto;
}
/*  二级菜单展开箭头隐藏 */
.collapsed-menu >>> .ivu-menu-submenu-title-icon {
  display: none;
}
/* 二级菜单文字隐藏 */
.collapsed-menu >>> span {
  display: none;
}
/* 二级菜单内容隐藏 */
.collapsed-menu >>> .ivu-menu {
  display: none;
}
/* 菜单展开文字 */
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 100px;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
/* 菜单展开icon */
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
/* 菜单折叠文字 */
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
/* 菜单折叠icon */
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
