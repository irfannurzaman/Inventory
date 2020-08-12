import { defineModule, defineMutations, defineGetters } from 'direct-vuex';
import { LayoutState } from '../models/storeModel';
import { SUBMODULE_LIST } from '~/app/constants/submoduleList.constant';

const state: LayoutState = {
  currentModule: null,
};

const mutations = defineMutations<LayoutState>()({
  SET_CURRENT_MODULE(state, currentModule) {
    state.currentModule = currentModule;
  },
});

const getters = defineGetters<LayoutState>()({
  submoduleMenu: (state) =>
    state.currentModule
      ? SUBMODULE_LIST[state.currentModule]
      : state.currentModule,
});

const layoutModule = defineModule({
  namespaced: true,
  state,
  mutations,
  getters,
});

export default layoutModule;
