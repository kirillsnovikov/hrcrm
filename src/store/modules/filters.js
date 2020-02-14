import { SAVE_FILTER_DATA } from '@/store/actions/filters';

const state = {
  filters: []
};

const getters = {
  getFilters: state => state.filters
};

const actions = {
  [SAVE_FILTER_DATA]: ({ commit }, payload) => {
    commit(SAVE_FILTER_DATA, payload);
  }
};

const mutations = {
  [SAVE_FILTER_DATA]: (state, filterData) => {
    state.filters = filterData;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
