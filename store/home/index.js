import fly from "../../http/api.js"
export default {
  // 命名空间
  namespaced: true,
  state: {
    getBannerList: [],
		getNavList:[],
		getNewList:[],
		getRecommendNavList:[],
		getNavGoodsList:[],
		getNoticeList:[]
  },
  mutations: {
    setBanner(state, data) {
      state.getBannerList = data
    },
		setNav(state, data) {
		  state.getNavList = data
		},
		setNew(state, data) {
		  state.getNewList = data
		},
		setRecommendNav(state, data) {
		  state.getRecommendNavList = data
		},
		setNavGoods(state, data) {
		  state.getNavGoodsList = data
		},
		setNotice(state, data) {
		  state.getNoticeList = data
		}
  },
  // 发异步请求的
  actions: {
    // async await
    // 异步操作同步化: 用一个变量接收请求的结果
    // 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
    async getBanner({
      commit
    }) {
      try {
        let res = await fly.getBanner()
        if (res.code===200) {
					res.data.map(item=>{
						item.image=item.url
					})
          commit('setBanner', res.data)
        }
      } catch (err) {
        console.log(err)
      }
    },
		async getNav({
		  commit
		}) {
		  try {
		    let res = await fly.getNav()
		    if (res.code===200) {
		      commit('setNav', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async getNew({
		  commit
		}) {
		  try {
		    let res = await fly.getNew()
		    if (res.code===200) {
		      commit('setNew', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async getRecommendNav({
		  commit
		}) {
		  try {
		    let res = await fly.getRecommendNav()
		    if (res.code===200) {
		      commit('setRecommendNav', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async getNavGoods({
		  commit
		},params) {
		  try {
		    let res = await fly.getNavGoods(params)
		    if (res.code===200) {
		      commit('setNavGoods', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async getNotice({
		  commit
		},params) {
		  try {
		    let res = await fly.getNotice(params)
		    if (res.code===200) {
					console.log(res.data);
		      commit('setNotice', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
    // async login({commit}, params) {
    //   setTimeout(() => {
    //     console.log(params)
    //   }, 2000)
    // }
  },
}
