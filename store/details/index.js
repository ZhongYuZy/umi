import fly from "../../http/api.js"
import Vue from "vue"
export default {
  // 命名空间
  namespaced: true,
  state: {
    goodsDetailList: [],
		getRecommendList:[],
		addCartList:[]
  },
  mutations: {
    setgoodsDetail(state, data) {
      state.goodsDetailList = data
    },
		setRecommend(state, data) {
		  state.getRecommendList = data
		},
		setaddCart(state, data) {
		  state.addCartList = data
		}
  },
  // 发异步请求的
  actions: {
    // async await
    // 异步操作同步化: 用一个变量接收请求的结果
    // 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
    async goodsDetail({ 
      commit
    },params) {
      try {
        let res = await fly.goodsDetail(params)
        if (res.code===200) {
					let arr=[]
					res.data.spec.map(item=>{
						Vue.set(item,"showFlag",0)
						arr.push({name:item.name,checked:item.checkList[0]})
					})
					Vue.set(res.data,"sku",arr)
          commit('setgoodsDetail', res.data)
        }
      } catch (err) {
        console.log(err)
      }
    },
		async getRecommend({
		  commit
		}) {
		  try {
		    let res = await fly.getRecommend()
		    if (res.code===200) {
					res.data.map(item=>{
						item.image=item.cover
					})
		      commit('setRecommend', res.data)
		    }
		  } catch (err) {
		    console.log(err)
		  }
		},
		async addCart({
		  commit,dispatch
		},params) {
		  try {
		    let res = await fly.addCart(params)
				uni.showToast({
					title:res.msg,
					icon:"none"
				})
		    if (res.code===200) {
					console.log(res);
		      commit('setaddCart', res.data)
					dispatch("shop/getCart",uni.getStorageSync("user")._id,{root:true})
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
