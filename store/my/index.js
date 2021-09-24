import fly from "../../http/api.js"
import dayjs from "dayjs"
export default {
	// 命名空间
	namespaced: true,
	state: {
		getAppOrderList: [],
		delOrderList: [],
		createCommentList: [],
		getAreaListList: [],
		searchAreaListList: []
	},
	mutations: {
		setAppOrder(state, data) {
			state.getAppOrderList = data
		},
		setdelOrder(state, data) {
			state.delOrderList = data
		},
		setgetAreaList(state, data) {
			state.getAreaListList = data
		},
		setsearchAreaList(state, data) {
			state.searchAreaListList = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		async getAppOrder({
			commit
		}, params) {
			try {
				let res = await fly.getAppOrder(params)
				if (res.code === 200) {
					res.data.map(i => {
						i.time = dayjs(i.pay_time).format("YYYY-MM-DD HH:mm:ss")
						i.goods_list.map(item1 => {
							item1.order_id = i.id
						})
					})
					console.log(res);
					commit('setAppOrder', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async delOrder({
			commit,
			dispatch
		}, params) {
			try {
				let res = await fly.delOrder(params)
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
				if (res.code === 200) {
					dispatch("getAppOrder", uni.getStorageSync("user")._id)
					commit('setdelOrder', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async createComment({
			commit,
			dispatch
		}, params) {
			try {
				let res = await fly.createComment(params)
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
				if (res.code === 200) {
					dispatch("getAppOrder", uni.getStorageSync("user")._id)
					commit('setcreateComment', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getAreaList({
			commit
		}, params) {
			try {
				let res = await fly.getAreaList(params)
				if (res.code === 200) {
					commit('setgetAreaList', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async searchAreaList({
			commit
		}, params) {
			try {
				let res = await fly.searchAreaList(params)
				if (res.code === 200) {
					commit('setsearchAreaList', res.data)
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
