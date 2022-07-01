import types from "./types";
import { createStore } from "vuex";
import { StoreState } from "@/models/storeModel";
const { SET_JX_VALUE } = types.all(false);
const state: StoreState = {
  jx: "AL",
  userInfo: {
    name: "myName",
  }
};
const mutations = {
  getUserInfo(state: StoreState, name: string | number) {
    state.userInfo.name = name;
  },
  [SET_JX_VALUE](state: StoreState, value: string) {
    state.jx = value;
  },
};
const actions = {
  async getUserData({ commit }) {
    commit('getUserInfo')
  },
};
const getters = {
  userInfoGetter(state: StoreState) {
    return state.userInfo.name;
  },
};
const store = createStore({
  state,
  actions,
  getters,
  mutations,
});

export default store;
