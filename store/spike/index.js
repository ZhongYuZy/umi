import fly from "../../http/api.js"
import Vue from "vue"
import dayjs from "dayjs"
export default {
	// 命名空间
	namespaced: true,
	state: {
		getSeckillList: []
	},
	mutations: {
		setSeckill(state, data) {
			state.getSeckillList = data
		}
	},
	// 发异步请求的
	actions: {
		// async await
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		async getSeckill({
			commit
		}) {
			try {
				let res = await fly.getSeckill()
				if (res.code === 200) {
					let time=dayjs(dayjs().format("YYYY-MM-DD ")+'0:00:00').valueOf()
					let arr=[]
					res.data.map((i,q)=>{
						if((dayjs(i.start_time).valueOf()>=time)||dayjs(i.end_time).valueOf()>time){
							arr.push(i)
						}
					})
					commit('setSeckill', arr)
					console.log(arr);
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
