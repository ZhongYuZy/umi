<template>
	<view style="height: 100%;background: #f8f8f8;">
		<view class="top displayF">
			<view v-for="(item,index) in list" :key="index"
				class="word displayF flex-directionC justify-contentC align-itemsC" @click="choose(index)"
				:class="active===index?'color':''">
				<view>{{item}}</view>
				<view class="foot" :class="active===index?'color1':''"></view>
			</view>
		</view>
		<view v-if="active===0">
			<view v-if="arr" style="background: #eeeeee;">
				<view v-for="(item,index) in arr" :key="index" class="arrword">
					<view class="displayF justify-contentB align-itemsC">
						<view>{{item.time}}</view>
						<view @click="open(item)">
							<image src="../../static/image/icon_close.png" mode="" style="width: 40rpx;height: 40rpx;">
							</image>
						</view>
					</view>
					<view v-for="(item1,index1) in item.goods_list" :key="index1" class="displayF"
						style="margin-bottom: 20rpx;">
						<image :src="item1.goods.cover" mode="" style="width: 150rpx;height: 180rpx;"></image>
						<view style="margin-left: 20rpx;width: 500rpx;">
							<view
								style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-top: 10rpx;">
								{{item1.goods.name}}</view>
							<view class="displayF" style="flex-wrap: wrap;margin: 10rpx 0;">
								<view v-for="(item2,index2) in item1.spec" :key="index2" class="loble">
									{{item2.checked}}
								</view>
							</view>
							<view class="displayF justify-contentB align-itemsC">
								<view><span
										style="color: #ff6600;font-size: 18px;margin-right: 10rpx;">￥{{item1.goods.presentPrice}}</span>x{{item1.count}}
								</view>
								<view v-if="item1.isComment===false" class="evaluation" @click="jump1(item1)">未评价</view>
							</view>
						</view>
					</view>
					<view class="left">{{
							item.address.address.split(" ").join('')
						}}</view>
					<view class="left">
						订单号：{{item.id}}
					</view>
					<view class="left">
						实际支付：<span style="color: #ff6600;font-size: 18px;">￥{{(item.price).toFixed(2)}}</span>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="displayF flex-directionC justify-contentC align-itemsC" style="height: 400rpx;">
					<image src="../../static/cart.png" mode="" style="width: 100rpx;height: 100rpx;"></image>
					<view style="margin: 20rpx 0;color: gray;">您没有相关订单</view>
					<view>
						<cc-button type="warning" style="width: 500rpx;" @click="jump">到小米商城逛逛</cc-button>
					</view>
				</view>
			</view>
		</view>
		<view v-if="active===1">
			<view class="displayF flex-directionC justify-contentC align-itemsC" style="height: 400rpx;">
				<image src="../../static/cart.png" mode="" style="width: 100rpx;height: 100rpx;"></image>
				<view style="margin: 20rpx 0;color: gray;">您没有相关订单</view>
			</view>
		</view>
		<view v-if="active===2">
			<view class="displayF flex-directionC justify-contentC align-itemsC" style="height: 400rpx;">
				<image src="../../static/cart.png" mode="" style="width: 100rpx;height: 100rpx;"></image>
				<view style="margin: 20rpx 0;color: gray;">您没有相关订单</view>
			</view>
		</view>
		<cc-dialog :show.sync="show" showCancelButton content="您确定删除吗？" @confirm="confirm"></cc-dialog>
	</view>

</template>

<script>
	import cloneDeep from "lodash/cloneDeep"
	import {
		createNamespacedHelpers
	} from "vuex"
	let myModule = createNamespacedHelpers('my')
	let {
		mapState: myState,
		mapActions: myActions
	} = myModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				user: "",
				list: ["全部", "待付款", "待收货"],
				active: 0,
				index: null,
				arr: null,
				address: null,
				time: null,
				show:false,
				item:null
			}
		},
		methods: {
			...myActions(["getAppOrder","delOrder"]),
			choose(index) {
				this.active = index
			},
			jump() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			open(item){
				this.show=true
				this.item=item
			},
			confirm(){
				this.delOrder({
					orderId:this.item.id,
					user_id:this.user._id
				})
			},
			jump1(e){
				uni.setStorageSync("Evaluation",e)
				uni.navigateTo({
					url:"/pages/evaluation/evaluation"
				})
			}
		},
		mounted() {

		},
		onLoad(e) {
			this.active = Number(e.index)
		},
		onShow() {
			this.user = uni.getStorageSync("user")
			this.getAppOrder(this.user._id)
		},
		filters: {},
		computed: {
			...myState(["getAppOrderList","delOrderList"])
		},
		watch: {
			getAppOrderList(val) {
				if (val) {
					this.arr = cloneDeep(val)
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.top {
		background: white;
		height: 100rpx;
	}

	.word {
		flex: 1;
	}

	.color {
		color: #ff6600;
	}

	.foot {
		background: white;
		width: 50rpx;
		height: 4rpx;
		border-radius: 2rpx;
		margin: 10rpx 0;
	}

	.color1 {
		background: #ff6600;
	}

	/* #ifdef H5 */
	.arrword {
		width: 710rpx;
		margin: 20rpx 0 0 20rpx;
		background: white;
		border-radius: 10rpx;
		padding: 20rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.arrword {
		width: 670rpx;
		margin: 20rpx 0 0 20rpx;
		background: white;
		border-radius: 10rpx;
		padding: 20rpx;
	}

	/* #endif */
	.loble {
		color: gray;
		background: #f8f8f8;
		font-size: 12px;
		padding: 10rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;
	}

	.evaluation {
		font-size: 13px;
		padding: 10rpx;
		border-radius: 10rpx;
		border: 1px solid #eeeeee;
	}
	.left{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin: 10rpx 0;
	}
</style>
