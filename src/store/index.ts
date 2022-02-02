import Vue from 'vue';
import Vuex from 'vuex';
import {ImageStoreObj} from '@/interfaces/ImageStoreObj';
import {IimageState} from '@/store/IimageState';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    image_object: {data: []}
  },
  getters: {
    currentObject(state: IimageState): ImageStoreObj {
      return state.image_object;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {}
});
