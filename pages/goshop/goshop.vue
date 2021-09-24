<template>
	<view>
		<view id="container" style="width: 710rpx;height: 500rpx;margin-left: 20rpx;"></view>
		<view id="container1" style="width: 710rpx;height: 500rpx;margin-left: 20rpx;display: none;"></view>
		<scroll-view scroll-y="true" class="scr" v-if="list">
			<view class="word">{{list&&list.routes&&list.routes[0].policy}}</view>
			<view class="word displayF align-itemsC">
				<view style="width: 150rpx;">起点：</view>
				<view>{{starts}}</view>
			</view>
			<view class="word displayF align-itemsC">
				<view style="width: 180rpx;">终点：</view>
				<view>{{item.address}}</view>
			</view>
			<view class="word">距离：{{list&&list.routes&&list.routes[0].distance/1000}}公里</view>
			<view class="word">预计时间：{{(list&&list.routes&&list.routes[0].time/3600).toFixed(2)}}小时</view>
			<view class="word">距离收费站预计还有：{{list&&list.routes&&list.routes[0].tolls/1000}}公里</view>
			<view class="word1">
				<view>驾车路线</view>
				<view v-for="(item,index) in list&&list.routes&&list.routes[0].steps" :key="index" class="title">
					{{item.instruction}}
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				arr: '',
				item: '',
				item1: '',
				list:'',
				starts:''
			}
		},
		methods: {},
		mounted() {
			this.item = uni.getStorageSync("arr")
			this.$utils.getLocation1({}).then((res) => {
				if (res.code === 200) {
					console.log(res);
					this.starts=res.data.formattedAddress
					this.item1 = res.data.position
					this.$utils.getLocation2(this.item, this.item1).then((res) => {
						if (res.code === 200) {
							console.log(res.route);
							this.list=res.route
						}
					}).catch((err) => {})
				}
			}).catch((err) => {})

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
/* #ifdef H5 */
	.scr {
		height: 746rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.scr {
		height: 707rpx;
	}

	/* #endif */
	.word{
		width: 710rpx;
		margin-left: 20rpx;
		padding: 20rpx 0;
		border-bottom: 1px solid #eeeeee;
	}
	.word1{
		width: 710rpx;
		margin-left: 20rpx;
		padding: 20rpx 0;
	}
	.title{
		width:650rpx;
		margin-left: 40rpx;
		padding: 20rpx 0;
		border-bottom: 1px solid #eeeeee;
	}
</style>
