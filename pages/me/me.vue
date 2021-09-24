<template>
	<view style="height: 100%;background: #f8f8f8;">
		<!-- #ifdef MP-WEIXIN -->
		<view style="height: 110rpx;background-color: #ec7b11;"></view>
		<!-- #endif -->
		<view class="top displayF align-itemsC">
			<view style="margin-left: 20rpx;">
				<image src="../../static/user/touxiang.png" mode="" style="width: 80rpx;height: 80rpx;"></image>
			</view>
			<view v-if="user" class="name">{{user.username}}</view>
			<view v-else class="name" @click="jump">登录/注册</view>
		</view>
		<view class="middle">
			<view class="one displayF justify-contentB align-itemsC">
				<view class="left">我的订单</view>
				<view class="right displayF align-itemsC" @click="jumpmy(0)">
					全部订单
					<image src="../../static/right.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
				</view>
			</view>
			<view class="two displayF">
				<view class="twoWord displayF flex-directionC justify-contentC align-itemsC"
					v-for="(item,index) in list" :key="index" @click="jumpmy(index+1)">
					<image src="../../static/user/daifukuan.png" mode="" v-if="index===0"
						style="width: 50rpx;height: 50rpx;"></image>
					<image src="../../static/user/daishouhuo.png" mode="" v-if="index===1"
						style="width: 50rpx;height: 50rpx;"></image>
					<image src="../../static/user/tuihuanxiu.png" mode="" v-if="index===2"
						style="width: 50rpx;height: 50rpx;"></image>
					{{item}}
				</view>
			</view>
		</view>
		<view class="body">
			<view v-for="(item,index) in list1" :key="index" class="bodyWord displayF">
				<image src="../../static/user/huiyuanzhongxin.png" v-if="index===0"
					style="width: 50rpx;height: 50rpx;margin: 20rpx;"></image>
				<image src="../../static/user/youhui.png" v-if="index===1"
					style="width: 50rpx;height: 50rpx;margin: 20rpx;"></image>
				<view class="title displayF align-itemsC justify-contentB" :class="index===0?'title1':''">
					{{item}}
					<image src="../../static/right.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
				</view>
			</view>
		</view>
		<view class="body">
			<view v-for="(item,index) in list2" :key="index" class="bodyWord displayF" @click="xiaomihome(index)">
				<image src="../../static/user/fuwuzhongxin.png" v-if="index===0"
					style="width: 50rpx;height: 50rpx;margin: 20rpx;"></image>
				<image src="../../static/user/xiaomizhijia.png" v-if="index===1"
					style="width: 50rpx;height: 50rpx;margin: 20rpx;"></image>
				<view class="title displayF align-itemsC justify-contentB" :class="index===0?'title1':''">
					{{item}}
					<image src="../../static/right.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
				</view>
			</view>
		</view>
		<view class="body">
			<view v-for="(item,index) in list3" :key="index" class="bodyWord displayF">
				<image src="../../static/user/fma.png" v-if="index===0"
					style="width: 50rpx;height: 50rpx;margin: 20rpx;"></image>
				<image src="../../static/user/liwu.png" v-if="index===1"
					style="width: 50rpx;height: 50rpx;margin: 20rpx;"></image>
				<view class="title displayF align-itemsC justify-contentB" :class="index===0?'title1':''">
					{{item}}
					<image src="../../static/right.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="bodyWord displayF">
				<image src="../../static/user/shezhi.png" mode="" style="width: 50rpx;height: 50rpx;margin: 20rpx;">
				</image>
				<view class="title displayF align-itemsC justify-contentB" >
					设置
					<image src="../../static/right.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				user: null,
				list: ["待付款", "待收货", "退换修"],
				list1: ["会员中心", "我的优惠"],
				list2: ["服务中心", "小米之家"],
				list3: ["我的F码", "礼物码兑换"],
			}
		},
		methods: {
			jump(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			jumpmy(index){
				this.$utils.checkLogin({
					key:"user",
					next:this.myorders,
					item:index
				})
			},
			myorders(index){
				uni.navigateTo({
					url:`/pages/myorders/myorders?index=${index}`
				})
			},
			xiaomihome(index){
				if(index===1){
					uni.navigateTo({
						url:'/pages/xiaomihome/xiaomihome'
					})
				}
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync("user")
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top {
		height: 150rpx;
		background-color: #ec7b11;
	}

	.name {
		color: white;
		margin-left: 20rpx;
	}

	.middle {
		background-color: white;
	}

	.one {
		width: 710rpx;
		margin-left: 20rpx;
		padding: 20rpx 0;
	}

	.two {
		border-top: 1px solid #eeeeee;
	}

	.twoWord {
		flex: 1;
		height: 150rpx;
	}

	.body {
		background: white;
		margin-top: 20rpx;
	}

	.title {
		width: 660rpx;
	}

	.title1 {
		border-bottom: 1px solid #eeeeee;
	}
</style>
