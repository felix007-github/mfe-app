import Vuex from 'vuex';
import Vue from 'vue';
import mutations from './mutations';
import actions from './action';
Vue.use(Vuex);

const state = {
  isLoading: false,
}
const getters = {
  loadingState: state => {
    return state.isLoading
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
