import { getRouteTitleHandled } from "../../utils/util";
const tag = {
  state: {
    tagNavList: sessionStorage.getItem("tagNavList")
      ? JSON.parse(sessionStorage.getItem("tagNavList"))
      : [],
  },
  mutations: {
    // 添加tag
    addTag(state, route) {
      let { name, path, meta, params } = getRouteTitleHandled(route);
      let newList = [...state.tagNavList];
      if (newList.findIndex((item) => item.path === path) >= 0) {
        state.tagNavList = newList;
      } else {
        state.tagNavList.push({ name, path, meta, params });
      }
      sessionStorage.setItem("tagNavList", JSON.stringify(state.tagNavList));
    },
    // 删除tag
    deleteTag(state, route) {
      let index = state.tagNavList.findIndex(
        (tagNavItem) => tagNavItem.path === route.path
      );
      if (index >= 0) {
        state.tagNavList.splice(index, 1);
      }
      sessionStorage.setItem("tagNavList", JSON.stringify(state.tagNavList));
    },
    // 清空tag
    clearTag(state) {
      state.tagNavList.splice(0);
    },
  },
  actions: {
    addTag({ commit }, route) {
      commit("addTag", route);
    },
    deleteTag({ commit, state }, route) {
      return new Promise((resolve) => {
        commit("deleteTag", route);
        resolve([...state.tagNavList]);
      });
    },
    clearTag({ commit }) {
      commit("clearTag");
    },
  },
};

export default tag;
