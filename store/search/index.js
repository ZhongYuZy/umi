import fly from "../../http/api.js"
export default {
  // 命名空间
  namespaced: true,
  state: {
    searchList: [],
		getSearchWordsList:[]
  },
  mutations: {
    setsearch(state, data) {
      state.searchList = data
    },
		setSearchWords(state, data) {
		  state.getSearchWordsList = data
		}
  },
  // 发异步请求的
  actions: {
    // async await
    // 异步操作同步化: 用一个变量接收请求的结果
    // 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
    async search({
      commit
    },params) {
      try {
        let res = await fly.search(params)
        if (res.code===200) {
					console.log(res);
          commit('setsearch', res.data)
        }
      } catch (err) {
        console.log(err)
      }
    },
		async getSearchWords({
		  commit
		}) {
		  try {
		    let res = await fly.getSearchWords()
		    if (res.code===200) {
					console.log(res);
		      commit('setSearchWords', res.data)
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
