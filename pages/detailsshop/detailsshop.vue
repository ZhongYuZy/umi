<template>
	<view>
		<view id="container" style="width: 710rpx;height: 500rpx;margin-left: 20rpx;"></view>
		<scroll-view scroll-y="true" class="scr">
			<!-- 店铺名称 -->
			<view style="padding: 20rpx 0;border-bottom: 1px solid #eeeeee;" class="displayF align-itemsC">
				<view class="displayF justify-contentC align-itemsC" style="width: 90rpx;">
					<image src="../../static/mihome/store_name.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
				</view>
				<view style="width: 620rpx;margin-left: 20rpx;">
					{{arr.store_name}}
				</view>
			</view>
			<!-- 时间 -->
			<view style="padding: 20rpx 0;border-bottom: 1px solid #eeeeee;" class="displayF align-itemsC">
				<view class="displayF justify-contentC align-itemsC" style="width: 90rpx;">
					<image src="../../static/mihome/time.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
				</view>
				<view>
					<view
						style="width: 620rpx;margin:0 0 10rpx 20rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
						营业时间</view>
					<view
						style="width: 620rpx;margin-left: 20rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;color: gray;font-size: 14px;">
						{{arr.shop_time}}
					</view>
				</view>
			</view>
			<!-- 地址 -->
			<view style="padding: 20rpx 0;border-bottom: 1px solid #eeeeee;" class="displayF align-itemsC">
				<view class="displayF justify-contentC align-itemsC" style="width: 90rpx;">
					<image src="../../static/mihome/location.png" mode="" style="width: 30rpx;height: 40rpx;"></image>
				</view>
				<view>
					<view
						style="width: 420rpx;margin:0 0 10rpx 20rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
						地址</view>
					<view
						style="width: 420rpx;margin-left: 20rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;color: gray;font-size: 14px;">
						{{arr.address}}
					</view>
				</view>
				<view style="height: 132rpx;width: 150rpx;margin-left: 50rpx;border-left: 1px solid #eeeeee;" class="displayF flex-directionC justify-contentC align-itemsC" @click="go">
					<image src="../../static/mihome/go.png" mode="" style="width: 50rpx;height: 50rpx;"></image>
					<view style="font-size: 14px;margin-top: 5rpx;color: #6a9be4;">到这去</view>
				</view>
			</view>
			<!-- 电话 -->
			<view style="padding: 20rpx 0;border-bottom: 1px solid #eeeeee;" class="displayF align-itemsC">
				<view class="displayF justify-contentC align-itemsC" style="width: 90rpx;">
					<image src="../../static/mihome/tel.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
				</view>
				<view>
					<view
						style="width: 420rpx;margin:0 0 10rpx 20rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
						电话</view>
					<view
						style="width: 420rpx;margin-left: 20rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;color: gray;font-size: 14px;">
						{{arr.tel}}
					</view>
				</view>
				<view style="height: 132rpx;width: 150rpx;margin-left: 50rpx;border-left: 1px solid #eeeeee;" class="displayF flex-directionC justify-contentC align-itemsC">
					<image src="../../static/mihome/phone.png" mode="" style="width: 50rpx;height: 50rpx;"></image>
					<view style="font-size: 14px;margin-top: 5rpx;color: #09bb07;">去联系</view>
				</view>
			</view>
			<!-- 支持服务 -->
			<view style="padding: 20rpx 0;border-bottom: 1px solid #eeeeee;" class="displayF align-itemsC">
				<view class="displayF justify-contentC align-itemsC" style="width: 90rpx;">
					<image src="../../static/mihome/service.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
				</view>
				<view>
					<view
						style="width: 620rpx;margin:0 0 10rpx 20rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
						支持服务</view>
					<view
						style="width: 620rpx;margin-left: 20rpx;color: gray;font-size: 14px;">
						{{obj}}
					</view>
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
				obj:''
			}
		},
		methods: {
			go(){
				uni.navigateTo({
					url:"/pages/goshop/goshop"
				})
				uni.setStorageSync("arr",this.arr)
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.arr = uni.getStorageSync("map")
			this.$utils.getLocation(this.arr)
			this.obj=this.arr.support_service.join("、")
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
</style>
