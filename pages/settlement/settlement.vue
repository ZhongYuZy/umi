<template>
	<view style="background: #f3f3f3;height: 100%">
		<view style="padding: 20rpx;">
			<view class="top">
				<view class="address displayF justify-contentC align-itemsC" v-if="getAppAddressList.length===0"
					@click="jump">暂无收货地址</view>
				<view v-else class="address1" @click="choose">
					<view class="frist displayF" v-if="arr">
						<view class="">{{arr}}</view>
						<view v-if="list.isDefault" class="def">默认</view>
					</view>
					<view class="displayF justify-contentB align-itemsC">
						<view style="font-size: 18px;margin: 10rpx 0;">{{list.detailAddress}}</view>
						<view>></view>
					</view>
					<view class="displayF" style="font-size: 14px;">
						<view style="margin-right: 5rpx;">{{list.username}}</view>
						<view>{{list.tel.slice(0,3)}}****{{list.tel.slice(7,12)}}</view>
					</view>
				</view>
				<view style="background: white;height: 34rpx;">
					<image src="../../static/caitiao.jpg" mode="" style="width: 100%;height: 10rpx;"></image>
				</view>
			</view>
			<view class="body">
				<view v-for="(item,index) in shop" :key="index" class="shopping displayF">
					<image :src="item.goods.cover" mode="" style="width: 150rpx;height: 150rpx;"></image>
					<view style="margin-left: 20rpx;">
						<view class="name">{{item.goods.name}}</view>
						<view class="displayF" style="flex-wrap: wrap;width: 350rpx;">
							<view v-for="(item1,index1) in item.spec" :key="index1"
								style="color: gray;margin-right: 10rpx;font-size: 12px;margin-top: 10rpx;">
								{{item1.checked}}
							</view>
						</view>
					</view>
					<view class="price displayF flex-directionC align-itemsE" style="margin-left: 20rpx;">
						<view>￥{{item.count*item.goods.presentPrice}}</view>
						<view style="color: gray;font-size: 14px;margin-top: 10rpx;">x{{item.count}}</view>
					</view>
				</view>
			</view>
			<view class="sum">
				<view class="sumWord displayF justify-contentB">
					<view>商品总价</view>
					<view>￥{{sum}}</view>
				</view>
				<view class="sumWord displayF justify-contentB">
					<view>运费</view>
					<view>包邮</view>
				</view>
				<view class="sumWord displayF justify-contentB">
					<view>优惠券</view>
					<view>无可用</view>
				</view>
			</view>
			<view class="bill">
				<view class="sumWord displayF justify-contentB">
					<view>发票</view>
					<view>电子普通发票-个人</view>
				</view>
			</view>
		</view>
		<view class="foot displayF justify-contentB align-itemsC">
			<view>共{{sum1}}件,合计<span style="color: #f85e22;font-size: 18px;font-weight: 700;">￥{{sum}}</span></view>
			<view>
				<cc-button type="warning" round @click="payment">去付款</cc-button>
			</view>
		</view>
		<cc-password-input :value.sync="show" @complete="handleComplete"></cc-password-input>
	</view>

</template>

<script>
	import cloneDeep from "lodash/cloneDeep"
	import {
		createNamespacedHelpers
	} from "vuex"
	let shopModule = createNamespacedHelpers('shop')
	let {
		mapState: shopState,
		mapActions: shopActions
	} = shopModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				shop: '',
				list: null,
				arr: "",
				show: false,
				value: ''
			}
		},
		methods: {
			...shopActions(["getAppAddress","addOrder"]),
			jump() {
				uni.navigateTo({
					url: '/pages/addAddress/addAddress'
				})
			},
			choose() {
				uni.navigateTo({
					url: '/pages/addressList/addressList'
				})
			},
			payment() {
				if (this.list) {
					this.show = true
				} else {
					uni.showToast({
						title: "暂无地址,请添加",
						icon: "none"
					})
				}
			},
			handleComplete(val) {
				if(val!=="123456"){
					uni.showToast({
						title:'密码错误，请重新输入',
						icon:"none"
					})
				}else{
					this.addOrder({
						user_id:uni.getStorageSync("user")._id,
						price:this.sum,
						address:this.list,
						count:this.sum1,
						pay_time:Date.now(),
						goods_list:this.shop,
						mobile:this.list.tel,
					})
					uni.switchTab({
						url:'/pages/home/home'
					})
				}
			},
		},
		mounted() {
			this.shop = uni.getStorageSync("shop")
		},
		onLoad() {

		},
		onShow() {
			let user = uni.getStorageSync("user")
			this.getAppAddress(user._id)
		},
		filters: {},
		computed: {
			...shopState(["getAppAddressList","addOrderList"]),
			sum() {
				let num = 0
				if (this.shop.length > 0) {
					this.shop.map(item => {
						num += item.count * item.goods.presentPrice
					})
				}
				return num
			},
			sum1() {
				let num = 0
				if (this.shop.length > 0) {
					this.shop.map(item => {
						num += item.count
					})
				}
				return num
			}
		},
		watch: {
			getAppAddressList(val) {
				let address = uni.getStorageSync("address")
				if (address) {
					this.list = address
					this.arr = this.list.address.split(" ").slice(0, 3).join('')
				} else {
					let obj = val.filter(i => {
						return i.isDefault === true
					})
					this.list = obj[obj.length - 1]
					this.arr = this.list.address.split(" ").slice(0, 3).join('')
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.top {
		border-radius: 10rpx;
		overflow: hidden;
	}

	.address {
		background-color: white;
		width: 100%;
		height: 200rpx;
	}

	.body {
		background: white;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}

	.shopping {
		margin: 10rpx 0 5rpx 0;
	}

	.name {
		width: 350rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.sum {
		background: white;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}

	.sumWord {
		margin: 10rpx 0 15rpx 0;
	}

	.bill {
		background: white;
		border-radius: 10rpx;
		padding: 40rpx 20rpx;
		margin-top: 20rpx;
	}

	/* #ifdef H5 */
	.foot {
		background: white;
		width: 750rpx;
		padding: 30rpx 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.foot {
		background: white;
		width: 710rpx;
		padding: 30rpx 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	/* #endif */
	.address1 {
		background-color: white;
		padding: 20rpx;
	}

	.frist {
		font-size: 14px;
	}

	.def {
		color: white;
		margin-left: 10rpx;
		padding: 5rpx;
		background-color: #f85e22;
		border-radius: 10rpx;
		font-size: 12px;
	}
</style>
