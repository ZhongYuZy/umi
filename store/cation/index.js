import fly from "../../http/api.js"
export default {
  // 命名空间
  namespaced: true,
  state: {
    getCategoryList: []
  },
  mutations: {
    setCategory(state, data) {
      state.getCategoryList = data
    }
  },
  // 发异步请求的
  actions: {
    // async await
    // 异步操作同步化: 用一个变量接收请求的结果
    // 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
    async getCategory({ 
      commit
    }) {
      try {
        let res = await fly.getCategory()
        if (res.code===200) {
					console.log(res);
          commit('setCategory', res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    // async login({commit}, params) {
    //   setTimeout(() => {
    //     console.log(params)
    //   }, 2000)
    // }
  },
}
