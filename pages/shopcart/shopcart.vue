<template>
	<view style="background: #eeeeee;height: 100%;">
		<!-- #ifdef MP-WEIXIN -->
		<view style="height: 40rpx;background: #f8f8f8;"></view>
		<!-- #endif -->
		<view class="displayF justify-contentC align-itemsC" style="height: 80rpx;background: #f8f8f8;">购物车</view>
		<view v-if="user">
			<view v-if="getCartList1.length>0" style="height: 100%;">
				<view class="displayF justify-contentE" style="padding:10rpx 20rpx;background: #f8f8f8;">
					<view v-if="show" @click="ok">完成</view>
					<view v-else @click="off">编辑</view>
				</view>
				<!-- 小米自营 -->
				<view style="padding:40rpx 20rpx 20rpx 20rpx;">
					<cc-checkbox @change="handleChange($event)" :checked.sync="checked1" :option="item1">
					</cc-checkbox>
				</view>
				<!-- 商品 -->
				<view v-for="(item,index) in getCartList1" :key="index">
					<cc-swipe-cell>
						<view class="shop displayF align-itemsC">
							<cc-checkbox @change="handleChange2($event,item)" :checked.sync="item.checked"
								:option="item3">
							</cc-checkbox>
							<view style="background: #eeeeee;border-radius: 10rpx;width: 200rpx;height: 220rpx;"
								class="displayF justify-contentC align-itemsC">
								<image :src="item.goods.cover" mode="" style="width: 160rpx;height: 180rpx;"></image>
							</view>
							<view style="margin-left: 20rpx;width:370rpx;height: 220rpx;">
								<view
									style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;margin-bottom: 10rpx;">
									{{item.goods.name}}
								</view>
								<view class="displayF" style="flex-wrap: wrap;">
									<view v-for="(item1,index1) in item.spec" :key="index1">
										<view
											style="padding: 10rpx;background: #eeeeee;border-radius: 10rpx;font-size: 12px;color: gray;margin-right: 10rpx;">
											{{item1.checked}}
										</view>
									</view>
								</view>
								<view class="displayF justify-contentB" style="margin-top: 60rpx;">
									<view style="font-size: 13px;color: #f85e22;">￥<span
											style="font-size: 18px;">{{item.goods.presentPrice}}</span></view>
									<view>
										<cc-stepper @minus="minus(item,$event)" @plus="plus(item,$event)"
											:value.sync="item.count"></cc-stepper>
									</view>
								</view>
							</view>
						</view>
						<template #right>
							<cc-button type="error" @click="remove1(item)">删除</cc-button>
						</template>
					</cc-swipe-cell>
				</view>
				<!-- 全选 -->
				<view style="padding: 20rpx;background: white;" class="remove displayF justify-contentB align-itemsC">
					<cc-checkbox @change="handleChange" :checked.sync="checked1" :option="item2">
					</cc-checkbox>
					<cc-button round style="width: 200rpx;" @click="remove" v-if="show">删除</cc-button>
					<view class="displayF align-itemsC" v-else>
						<view>合计:<span style="font-size: 13px;color:#f85e22 ;">￥</span><span
								style="font-size: 18px;color:#f85e22 ;margin-right: 10rpx;">{{sum.toFixed(2)}}</span>
						</view>
						<cc-button v-if="sum1===0" type="warning" round style="width: 200rpx;" disabled="disabled">
							结算({{sum1}})</cc-button>
						<cc-button v-else type="warning" round style="width: 200rpx;" @click="settlement">结算({{sum1}})
						</cc-button>
					</view>
				</view>
			</view>
			<view v-else class="displayF flex-directionC align-itemsC"
				style="height: 100vh;width: 710rpx;margin-left: 20rpx;">
				<view class="displayF justify-contentC" style="margin-top: 100rpx;margin-bottom: 20rpx;">
					<image src="../../static/tabbar/icon-cart.png" mode="" style="height: 100rpx;width: 120rpx;">
					</image>
				</view>
				<view style="margin: 0 0 20rpx 0;font-size: 18px;">购物车还是空的</view>
				<view style="width: 710rpx;">
					<cc-button block type="warning" @click="jump1">到小米商城逛逛</cc-button>
				</view>
			</view>
		</view>
		<view v-else class="displayF justify-contentC" style="height: 100vh;">
			<view class="displayF align-itemsC" style="height: 82rpx;margin-top: 200rpx;">
				<view>检测到未登录...</view>
				<view>
					<cc-button @click="jump">点击登录</cc-button>
				</view>
			</view>
		</view>
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
				user: '',
				token: '',
				checked1: false,
				item1: {
					label: '小米自营',
					checkedColor: '#f85e22'
				},
				item2: {
					label: '全选',
					checkedColor: '#f85e22'
				},
				item3: {
					checkedColor: '#f85e22'
				},
				show: true,
				getCartList1: "",
				disabled: true
			}
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			...shopActions(["getCart", "updateCart", "delCart"]),
			jump1() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			handleChange(e) {
				this.getCartList1.map(item => {
					item.checked = e
				})
			},
			handleChange2(e, item) {
				item.checked = e
				this.checked1 = this.getCartList1.every(item => {
					return item.checked === true
				})
			},
			minus(item, e) {
				this.updateCart({
					id: item._id,
					user_id: this.user._id,
					count: e,
				})
			},
			plus(item, e) {
				this.updateCart({
					id: item._id,
					user_id: this.user._id,
					count: e,
				})
			},
			remove() {
				let obj = this.getCartList1.filter(item => {
					return item.checked === true
				})
				this.delCart({
					user_id: this.user._id,
					id: obj[0]._id
				})
			},
			remove() {
				let obj = this.getCartList1.filter(item => {
					return item.checked === true
				})
				this.delCart({
					user_id: this.user._id,
					id: obj[0]._id
				})
			},
			remove1(item) {
				this.delCart({
					user_id: this.user._id,
					id: item._id
				})
			},
			ok() {
				this.show = false
			},
			off() {
				this.show = true
			},
			settlement() {
				let list = this.getCartList1.filter(item => {
					return item.checked === true
				})
				uni.setStorageSync("shop", list)
				uni.navigateTo({
					url: "/pages/settlement/settlement"
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync("user")
			this.token = uni.getStorageSync('token')
			this.getCart(this.user._id)
		},
		filters: {},
		computed: {
			...shopState(["getCartList", "updateCartList", "delCartList"]),
			sum() {
				let sum1 = 0
				if (this.getCartList1.length > 0) {
					this.getCartList1.map(i => {
						if (i.checked) {
							sum1 += i.count * i.goods.presentPrice
						}
					})
				}
				return sum1
			},
			sum1() {
				if (this.getCartList1.length > 0) {
					return this.getCartList1.filter(item => {
						return item.checked === true
					}).length
				}
			}
		},
		watch: {
			getCartList(val) {
				if (val) {
					this.getCartList1 = cloneDeep(val)
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	/* #ifdef H5 */
	.remove {
		width: 750rpx;
		height: 128rpx;
		position: fixed;
		bottom: 100rpx;
		left: 0;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.remove {
		width: 750rpx;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	/* #endif */
	/* #ifdef H5 */
	.shop {
		width: 710rpx;
		margin: 20rpx;
		background-color: white;
		border-radius: 10rpx;
		padding: 20rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.shop {
		width: 670rpx;
		margin: 20rpx;
		background-color: white;
		border-radius: 10rpx;
		padding: 20rpx;
	}

	/* #endif */
</style>
