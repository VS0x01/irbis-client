import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/axios'
import app from './modules/app'
import authors from './modules/authors'
import works from './modules/works'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    authors,
    works
  }
})

store.$http = axios

export default store
