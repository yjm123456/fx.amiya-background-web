const home = {
  namespaced: true,
  state: {
    isCollapsed: false,
  },
  mutations: {
    setCollapsede(state, value) {
      state.isCollapsed = value;
    },
  },
};

export default home;
