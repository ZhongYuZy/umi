// #ifdef H5
const key = '7928c4717de7737a20303d1748551a91'
import AMapLoader from '@amap/amap-jsapi-loader'
// #endif

// #ifdef MP-WEIXIN
const amapFile = require('../lib/amap-wx.js')
const key = '07f1bd089f8b9e78c9d1d8453cd32bcd'
const myAmapFun = new amapFile.AMapWX({
	key
})
// #endif




export default {
	//检测用户是否登录
	// key:本地存储用户信息的key
	// next:传入一个函数 下一步的操作
	// item:next函数需要的参数
	checkLogin({
		key,
		next,
		item
	}) {
		//检测本地有没有用户信息
		let user = uni.getStorageSync(key)
		if (user) {
			//已经登录 继续下一步操作
			next(item)
		} else {
			//未登录 提示用户是否跳转
			uni.showModal({
				title: '登录后才可使用此功能',
				content: '点击跳转登录/注册',
				success: (res) => {
					if (res.confirm) {
						//跳转到登录页
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else {
						// Toast('您取消了操作')
					}
				}
			})
		}
	},
	saveHistory({
		key,
		data,
		attr
	}) {
		// 如果是其余的数据 判断的属性可能就不叫name了
		// 拼接一个名字
		let name = key + 'History'
		let history = uni.getStorageSync(name)
		if (history) {
			// 之前存储过
			let arr = uni.getStorageSync(name)
			// 检测数据是否已经存在
			let item = null
			if (typeof data === 'string') {
				arr = arr.filter(i => {
					return i[attr] !== data
				})
				let obj = {
					[attr]: data
				}
				arr.unshift(obj)
			} else {
				arr = arr.filter(i => {
					return i[attr] !== data[attr]
				})
				arr.unshift(data)
			}
			uni.setStorageSync(name, arr)
		} else {
			// 第一次存储
			// 把存储的数据都转换成对象
			let arr = []
			if (typeof data === 'string') {
				let obj = {
					name: data
				}
				arr.unshift(obj)
			} else {
				arr.unshift(data)
			}
			uni.setStorageSync(name, arr)
		}
	},
	// 获取存储记录
	getHistory({
		key
	}) {
		let name = key + 'History'
		let arr = uni.getStorageSync(name)
		if (arr) return arr
		else return null
	},
	// 清除
	removeHistory({
		key,
		data,
	}) {
		let name = key + 'History'
		let list = this.getHistory({
			key
		})
		let newlist = list.filter(item => {
			return item.gid !== data
		})
		uni.setStorageSync(name, newlist)
	},

	getLocation(item) {
		// #ifdef H5
		return new Promise((resovle, reject) => {
			AMapLoader.load({
					key,
					version: '1.4.15',
					Loca: {
						// 是否加载 Loca， 缺省不加载
						version: '1.3.2' // Loca 版本，缺省 1.3.2
					}
				})
				.then(AMap => {
					this.map = new AMap.Map('container', {
						'center': [item.position.lng, item.position
							.lat
						]
					})

					let temp =
						`<div class="flex1"><image src="http://i8.mifile.cn/v1/a1/87fbaa8d-73a4-247a-acea-dea9fed47099.png" style="width:70px;height:70px"></image><div class="flex2">${item.store_name}</div></div>`
					let marker = new AMap.Marker({
						position: new AMap.LngLat(item.position
							.lng, item.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
						title: item.store_name,
						content: temp,
						zoom: 15
					});
					this.map.add(marker);

					return this.map.plugin('AMap.Geolocation', function() {
						var geolocation = new AMap.Geolocation({
							// 是否使用高精度定位，默认：true
							enableHighAccuracy: true,
							// 设置定位超时时间，默认：无穷大
							timeout: 10000,
							// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
							buttonOffset: new AMap.Pixel(10, 20),
							//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
							zoomToAccuracy: true,
							//  定位按钮的排放位置,  RB表示右下
							buttonPosition: 'RB'
						})

						geolocation.getCurrentPosition(function(status, result) {
							if (status == 'complete') {
								onComplete(result)
							} else {
								onError(result)
							}
						})

						function onComplete(data) {
							// data是具体的定位信息
							resovle({
								code: 200,
								msg: '定位成功',
								data
							})
							// console.log(data)
						}

						function onError(data) {
							// 定位出错
							reject({
								code: 500,
								msg: '定位失败',
								data
							})
						}
					})
				})
				.catch(e => {
					console.log(e)
				})
		})
		// #endif
		// #ifdef MP-WEIXIN
		return new Promise((resovle, reject) => {
			myAmapFun.getRegeo({
				success: data => {
					//成功回调
					resovle({
						code: 200,
						msg: '定位成功',
						data
					})
					// console.log(data)
				},
				fail: info => {
					//失败回调
					reject({
						code: 500,
						msg: '定位失败',
						info
					})
					console.log(info)
				}
			})
		})
		// #endif
	},
	getLocation1() {
		// #ifdef H5
		return new Promise((resovle, reject) => {
			AMapLoader.load({
					key,
					version: '1.4.15',
					Loca: {
						// 是否加载 Loca， 缺省不加载
						version: '1.3.2' // Loca 版本，缺省 1.3.2
					}
				})
				.then(AMap => {
					this.map = new AMap.Map('container')
					// 					let temp =
					// 						`<div class="flex1"><image src="http://i8.mifile.cn/v1/a1/87fbaa8d-73a4-247a-acea-dea9fed47099.png" style="width:70px;height:70px"></image><div class="flex2">${item.store_name}</div></div>`
					// 					let marker = new AMap.Marker({
					// 						position: new AMap.LngLat(item.position
					// 							.lng, item.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
					// 						title: item.store_name,
					// 						content: temp
					// 					});
					// 					this.map.add(marker);

					return this.map.plugin('AMap.Geolocation', function() {
						var geolocation = new AMap.Geolocation({
							// 是否使用高精度定位，默认：true
							enableHighAccuracy: true,
							// 设置定位超时时间，默认：无穷大
							timeout: 10000,
							// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
							buttonOffset: new AMap.Pixel(10, 20),
							//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
							zoomToAccuracy: true,
							//  定位按钮的排放位置,  RB表示右下
							buttonPosition: 'RB'
						})

						geolocation.getCurrentPosition(function(status, result) {
							if (status == 'complete') {
								onComplete(result)
							} else {
								onError(result)
							}
						})

						function onComplete(data) {
							// data是具体的定位信息
							resovle({
								code: 200,
								msg: '定位成功',
								data
							})
							// console.log(data)
						}

						function onError(data) {
							// 定位出错
							reject({
								code: 500,
								msg: '定位失败',
								data
							})
						}
					})
				})
				.catch(e => {
					console.log(e)
				})
		})
		// #endif
		// #ifdef MP-WEIXIN
		return new Promise((resovle, reject) => {
			myAmapFun.getRegeo({
				success: data => {
					//成功回调
					resovle({
						code: 200,
						msg: '定位成功',
						data
					})
					// console.log(data)
				},
				fail: info => {
					//失败回调
					reject({
						code: 500,
						msg: '定位失败',
						info
					})
					console.log(info)
				}
			})
		})
		// #endif
	},
	getLocation2(item, item1) {
		let route=null
		// #ifdef H5
		return new Promise((resovle, reject) => {
			AMapLoader.load({
					key,
					version: '1.4.15',
					Loca: {
						// 是否加载 Loca， 缺省不加载
						version: '1.3.2' // Loca 版本，缺省 1.3.2
					}
				})
				.then(AMap => {
					console.log(item);
					console.log(item1);
					this.map = new AMap.Map('container1')
						// 路线规划
						AMap.plugin('AMap.Driving', function() {
							var driving = new AMap.Driving({
								// 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
								policy: AMap.DrivingPolicy.LEAST_TIME
							})
							var startLngLat = [item1.lng, item1.lat]
							var endLngLat = [item.position
								.lng, item.position.lat
							]
							driving.search(startLngLat, endLngLat, function(status, result) {
								route = result
								console.log(result);
								// 未出错时，result即是对应的路线规划方案
							})
						})
					
					// 					let temp =
					// 						`<div class="flex1"><image src="http://i8.mifile.cn/v1/a1/87fbaa8d-73a4-247a-acea-dea9fed47099.png" style="width:70px;height:70px"></image><div class="flex2">${item.store_name}</div></div>`
					// 					let marker = new AMap.Marker({
					// 						position: new AMap.LngLat(item.position
					// 							.lng, item.position.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
					// 						title: item.store_name,
					// 						content: temp
					// 					});
					// 					this.map.add(marker);
	
					return this.map.plugin('AMap.Geolocation', function() {
						var geolocation = new AMap.Geolocation({
							// 是否使用高精度定位，默认：true
							enableHighAccuracy: true,
							// 设置定位超时时间，默认：无穷大
							timeout: 10000,
							// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
							buttonOffset: new AMap.Pixel(10, 20),
							//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
							zoomToAccuracy: true,
							//  定位按钮的排放位置,  RB表示右下
							buttonPosition: 'RB'
						})
	
						geolocation.getCurrentPosition(function(status, result) {
							if (status == 'complete') {
								onComplete(result)
							} else {
								onError(result)
							}
						})
	
						function onComplete(data) {
							// data是具体的定位信息
							resovle({
								code: 200,
								msg: '定位成功',
								data,
								route:route
							})
							// console.log(data)
						}
	
						function onError(data) {
							// 定位出错
							reject({
								code: 500,
								msg: '定位失败',
								data
							})
						}
					})
				})
				.catch(e => {
					console.log(e)
				})
		})
		// #endif
		// #ifdef MP-WEIXIN
		return new Promise((resovle, reject) => {
			myAmapFun.getRegeo({
				success: data => {
					//成功回调
					resovle({
						code: 200,
						msg: '定位成功',
						data
					})
					// console.log(data)
				},
				fail: info => {
					//失败回调
					reject({
						code: 500,
						msg: '定位失败',
						info
					})
					console.log(info)
				}
			})
		})
		// #endif
	}
}

// 如果调用一个方法 想如果成功进入then 失败进入catch
// 不能处理失败的
// 高德地图api
// getLocation().then(res =>{}).catch(err => {})

// new Promise传入一个回调函数 回调函数传入两个参数 这两个参数都是函数
// resolve是处理成功的 reject是处理失败的
// return new Promise((resolve, reject) => {

// })
