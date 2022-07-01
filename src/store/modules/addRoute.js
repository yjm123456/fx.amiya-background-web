import router from "../../router/index.js";
// 路由表
import { dynamicRouter } from "../../router/index";
// 深拷贝
import { deepClone } from "@/utils/util";
const addRoute = {
  state: {},
  mutations: {
    addRoutes(state, routes) {
      let routerInfo = deepClone(dynamicRouter[0]);
      let temp = [];
      routes.forEach((ajaxRoute) => {
        routerInfo.children.forEach((route) => {
          if (ajaxRoute.path === route.path) {
            temp.push(route);
          }
        });
      });
      routerInfo.children = temp;
      router.addRoutes([routerInfo]);
    },
  },
  actions: {
    addRoutes({ commit }, routes) {
      return commit("addRoutes", routes);
    },
  },
};

export default addRoute;
