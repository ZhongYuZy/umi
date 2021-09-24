<template>
	<view>
		<view style="height: 40rpx;"></view>
		<!-- #ifdef H5 -->
		<cc-sticky :offset-top="84">
			<view style="width: 750rpx;">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="homeTwo" :class="{showColor:show1===true}">
						<view v-for="(item,index) in getRecommendNavList" :key="index" class="word"
							@click="choose(item,index)">
							<view class="title" :class="{color:active===index}" style="width: 116rpx; text-align: center;">{{item.name}}</view>
							<view class="content" :class="{back:active===index}" v-if="show1===false">{{item.desc}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</cc-sticky>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<cc-sticky :offset-top="120">
			<view style="width: 750rpx;">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="homeTwo" :class="{showColor:show2===true}">
						<view v-for="(item,index) in getRecommendNavList" :key="index" class="word"
							@click="choose(item,index)">
							<view class="title" :class="{color:active===index}" style="width: 116rpx; text-align: center;">{{item.name}}</view>
							<view class="content" :class="{back:active===index}" v-if="show2===false">{{item.desc}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</cc-sticky>
		<!-- #endif -->
		<view class="body displayF justify-contentB">
			<scroll-view scroll-y="true" scroll-left="0" class="sy">
				<view class="body1 displayF justify-contentB">
					<view class="bodyContent" v-for="(item,index) in getNavGoodsList" :key="index" @click="jump(item._id)">
						<view class="img displayF justify-contentC align-itemsC">
							<image :src="item.cover" mode=""></image>
						</view>
						<view class="foot">
							<view class="shopName">{{item.name}}</view>
							<view style="font-weight: 700;color: #f85e22;">￥{{item.presentPrice}}</view>
							<view v-if="item.presentPrice!==item.originalPrice"
								style="font-size: 12px; color:gray;text-decoration: line-through;">
								￥{{item.originalPrice}}
							</view>
							<view class="displayF" style="margin-top: 10rpx;">
								<view v-if="item.isHot" class="label">热</view>
								<view v-if="item.isNewGood" class="label">新</view>
							</view>
						</view>
						<view class="remove" @click.stop="open(index)">
							<image src="../../static/image/icon_close.png" mode=""></image>
						</view>
						<!-- 遮罩层 -->
						<cc-mask :show.sync="show" bgColor="rgba(0, 0, 0, 0.2)"
							style="position: absolute;top:0;left:0;right:0;bottom:0" v-if="active1===index">
							<view class="displayF flex-directionC justify-contentC align-itemsC" style="height: 100%;">
								<view class="choose displayF justify-contentC align-itemsC">不感兴趣</view>
								<view class="choose displayF justify-contentC align-itemsC">品类不喜欢</view>
								<view class="choose displayF justify-contentC align-itemsC">看过了</view>
								<view class="choose displayF justify-contentC align-itemsC">已购买了</view>
							</view>
						</cc-mask>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		createNamespacedHelpers
	} from "vuex"
	let homeModule = createNamespacedHelpers('home')
	let {
		mapState: homeState,
		mapActions: homeActions
	} = homeModule
	export default {
		components: {},
		props: {
			show1: {
				type: Boolean,
				required: true
			},
			show2: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
				active: 0,
				show: false,
				active1: 0
			}
		},
		methods: {
			...homeActions(["getRecommendNav", "getNavGoods"]),
			choose(item, index) {
				this.active = index
				this.getNavGoods({
					id: item._id
				})
			},
			open(index) {
				this.show = true
				this.active1 = index
			},
			// 跳转路由
			jump(id){
				uni.navigateTo({
					url:`/pages/details/details?id=${id}`,
				})
			}
		},
		mounted() {
			this.getRecommendNav()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homeState(["getRecommendNavList", "getNavGoodsList"])
		},
		watch: {
			getRecommendNavList(val) {
				this.getNavGoods({
					id: val[0]._id
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.scroll-view_H {
		white-space: nowrap;
	}

	.homeTwo {
		display: flex;
	}
.showColor{
	background: white;
}
	.word {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}

	.title {
		font-size: 16px;
		font-weight: 700;
	}

	.content {
		font-size: 12px;
		color: gray;
		padding: 5rpx 10rpx;
		margin-top: 5rpx;
		border-radius: 20rpx;
	}

	.color {
		color: #f85e22;
	}

	.back {
		color: white;
		background: #f85e22;
	}

	.body {
		flex-wrap: wrap;
		padding: 20rpx 20rpx 0 20rpx;
	}

	.body1 {
		flex-wrap: wrap;
	}

	.bodyContent {
		width: 345rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		position: relative;
	}

	.img {
		background-color: #fdfdfd;
		padding: 40rpx 0;

		image {
			width: 120rpx;
			height: 180rpx;
		}
	}

	.foot {
		background: white;
		padding: 20rpx;
	}

	.shopName {
		height: 82rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.label {
		background: #f85e22;
		padding: 5rpx 10rpx;
		border-radius: 5rpx;
		color: white;
		margin-right: 10rpx;
	}

	.remove {
		position: absolute;
		top: 10rpx;
		left: 290rpx;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.choose {
		background: white;
		width: 300rpx;
		height: 60rpx;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
	}
	/* #ifdef H5 */
	.sy{
		height: 1100rpx;
	}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.sy{
		height: 1010rpx;
	}
	/* #endif */
</style>
