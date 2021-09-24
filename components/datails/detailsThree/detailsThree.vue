<template>
	<view>
		<view class="three">
			<view class="displayF justify-contentC align-itemsC">
				<view v-for="(item,index) in list" :key="index"
					class="head displayF flex-directionC justify-contentC align-itemsC" @click="choose(index)">
					<view :class="{color:active===index}">{{item}}</view>
					<view class="foot" :class="{color1:active===index}"></view>
				</view>
			</view>
			<view>
				<swiper :autoplay="true" class="img_img" indicator-dots="true" interval="2000" duration="500" style="height: 540rpx;">
					<swiper-item class="cover displayF">
						<view v-for="(item,index) in getRecommendList.slice(0,6)" :key="index"
							class="coverContent displayF flex-directionC justify-contentC align-itemsC">
							<view style="background-color: #f7f7f7; width: 190rpx;height: 190rpx;border-radius: 10rpx;"
								class="displayF justify-contentC align-itemsC">
								<image :src="item.cover" mode=""></image>
							</view>
							<view class="name">{{item.name}}</view>
							<view class="displayF align-itemsE" style="width: 190rpx;">
								<view class="price">￥{{item.presentPrice}}</view>
								<view v-if="item.presentPrice!==item.originalPrice" class="price1">
									￥{{item.originalPrice}}</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="cover displayF">
						<view v-for="(item,index) in getRecommendList.slice(6,8)" :key="index"
							class="coverContent displayF flex-directionC justify-contentC align-itemsC">
							<view style="background-color: #f7f7f7; width: 190rpx;height: 190rpx;border-radius: 10rpx;"
								class="displayF justify-contentC align-itemsC">
								<image :src="item.cover" mode=""></image>
							</view>
							<view class="name">{{item.name}}</view>
							<view class="displayF align-itemsE" style="width: 190rpx;">
								<view class="price">￥{{item.presentPrice}}</view>
								<view v-if="item.presentPrice!==item.originalPrice" class="price1">
									￥{{item.originalPrice}}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from "vuex"
	let detailsModule = createNamespacedHelpers('details')
	let {
		mapState: detailsState,
		mapActions: detailsActions
	} = detailsModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				list: ["为你推荐", "劲爆推荐"],
				active: 0
			}
		},
		methods: {
			choose(index) {
				this.active = index
			},
			...detailsActions(["getRecommend"]),

		},
		mounted() {
			this.getRecommend()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...detailsState(["getRecommendList"])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.three {
		margin-top: 20rpx;
		background: white;
		padding: 20rpx;
	}

	.foot {
		border: 2rpx solid white;
		background: white;
		width: 60rpx;
		margin-top: 5rpx;
		border-radius: 2rpx;
	}

	.head {
		margin-right: 20rpx;
	}

	.color {
		color: #f85e22;
	}

	.color1 {
		background-color: #f85e22;
		border: 2rpx solid #f85e22;
	}

	.cover {
		flex-wrap: wrap;
	}

	.coverContent {
		height: 270rpx;
		flex: 1;
		padding: 20rpx;

		image {
			width: 150rpx;
			height: 150rpx;
		}
	}

	.name {
		width: 190rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 14px;
	}

	.price {
		font-size: 13px;
		color:#f85e22 ;
	}

	.price1 {
		color: gray;
		font-size: 12px;
		text-decoration: line-through;
	}
</style>
