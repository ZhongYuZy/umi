import fly from "../../http/api.js"
import Vue from "vue"
export default {
	// 命名空间
	namespaced: true,
	state: {
		getCartList: [],
		updateCartList: [],
		delCartList: [],
		getAppAddressList: [],
		addAddressList: [],
		delAddressList: [],
		addOrderList:[],
		n:0
	},
	mutations: {
		setCart(state, data) {
			state.getCartList = data
		},
		setupdateCart(state, data) {
			state.updateCartList = data
		},
		setdelCart(state, data) {
			state.delCartList = data
		},
		setAppAddress(state, data) {
			state.getAppAddressList = data
		},
		setaddAddress(state, data) {
			state.addAddressList = data
		},
		setdelAddress(state, data) {
			state.delAddressList = data
		},
		addOrder(state, data) {
			state.addOrderList = data
		},
		setn(state, data) {
			state.n = data
		},
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		async getCart({
			commit
		}, params) {
			try {
				let res = await fly.getCart(params)
				if (res.code === 200) {
					res.data.map(item => {
						Vue.set(item, "checked", false)
					})
					commit('setCart', res.data)
					commit("setn",res.total)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async updateCart({
			commit
		}, params) {
			try {
				let res = await fly.updateCart(params)
				if (res.code === 200) {
					commit('setupdateCart', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async delCart({
			commit,
			dispatch
		}, params) {
			try {
				let res = await fly.delCart(params)
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
				if (res.code === 200) {
					dispatch("getCart", params.user_id)
					commit('setdelCart', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getAppAddress({
			commit
		}, params) {
			try {
				let res = await fly.getAppAddress(params)
				if (res.code === 200) {
					if(res.data.length>0){
						res.data.map(item => {
							Vue.set(item, "tel", item.mobile)
							item.address = (item.address + ',' + item.detailAddress).split(',').join(" ")
						})
						console.log(res.data);
						commit('setAppAddress', res.data)
					}
				}
			} catch (err) {
				console.log(err)
			}
		},
		async addAddress({
			commit,
			dispatch
		}, params) {
			try {
				let res = await fly.addAddress(params)
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
				if (res.code === 200) {
					commit('setaddAddress', res.data)
					dispatch("getAppAddress", uni.getStorageSync("user")._id)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async delAddress({
			commit,
			dispatch
		}, params) {
			try {
				let res = await fly.delAddress(params)
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
				if (res.code === 200) {
					commit('setdelAddress', res.data)
					dispatch("getAppAddress", uni.getStorageSync("user")._id)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async addOrder({
			commit
		}, params) {
			try {
				let res = await fly.addOrder(params)
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
				if (res.code === 200) {
					commit('setaddOrder', res.data)
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
