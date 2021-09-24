import Vue from "vue"
import Vuex from 'vuex'
import home from './home/index.js'
import details from "./details/index.js"
import cation from "./cation/index.js"
import search from "./search/index.js"
import login from "./login/index.js"
import shop from "./shop/index.js"
import my from "./my/index.js"
import spike from "./spike/index.js"
import xiaomihome from "./xiaomihome/index.js"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  // 模块化
  modules: {
    home,details,cation,search,login,shop,my,spike,xiaomihome
  }
})