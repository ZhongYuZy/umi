import fly from "../../http/api.js"
import dayjs from "dayjs"
export default {
	// 命名空间
	namespaced: true,
	state: {
		getStoreHomeList: []
	},
	mutations: {
		setStoreHome(state, data) {
			state.getStoreHomeList = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		async getStoreHome({
			commit
		}, params) {
			try {
				let res = await fly.getStoreHome(params)
				if (res.code === 200) {
					console.log(res.data.data.store_type_list);
					commit('setStoreHome', res.data.data.store_type_list)
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
