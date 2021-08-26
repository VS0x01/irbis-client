import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import authors from './modules/authors'
import works from './modules/works'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    authors,
    works
  }
})
