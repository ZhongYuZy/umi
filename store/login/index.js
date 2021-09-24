import fly from "../../http/api.js"
export default {
	// 命名空间
	namespaced: true,
	state: {
		getCodeList: [],
		registerList: [],
		userLoginList: [],
		mobileLoginList:[]
	},
	mutations: {
		setCode(state, data) {
			state.getCodeList = data
		},
		segister(state, data) {
			state.registerList = data
		},
		setmobileLogin(state, data) {
			state.mobileLoginList = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		async getCode({
			commit
		}, params) {
			try {
				let res = await fly.getCode(params)
				if (res.code === 200) {
					commit('setCode', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async register({
			commit
		}, params) {
			try {
				let res = await fly.register(params)
				uni.showToast({
					title:res.msg,
					icon:"none"
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pages/login/login"
					})
				},1000)
				commit('segister', res)
			} catch (err) {
				console.log(err)
			}
		},
		async userLogin({
			commit
		}, params) {
			try {
				let res = await fly.userLogin(params)
				uni.showToast({
					title:res.msg,
					icon:"none"
				})
				if (res.code === 200) {
					uni.setStorageSync("user",res.data)
					uni.setStorageSync("token",res.token)
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/home/home"
						})
					},1000)
					commit('sserLogin', res)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async mobileLogin({
			commit
		}, params) {
			try {
				let res = await fly.mobileLogin(params)
				uni.showToast({
					title:res.msg,
					icon:"none"
				})
				if (res.code === 200) {
					uni.setStorageSync("user",res.data)
					uni.setStorageSync("token",res.token)
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/home/home"
						})
					},1000)
					commit('setmobileLogin', res)
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
