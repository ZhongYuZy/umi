<template>
	<view>
		<!-- #ifdef H5 -->
		<view style="padding: 20rpx 0;">
			<cc-search :value.sync="value" round :showAction="false" class="H5_search" @focus="handleFocus"></cc-search>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view style="height: 50rpx;"></view>
		<view class="weixinSearch">
			<cc-search :value.sync="value" round :showAction="false" class="H5_search" @focus="handleFocus"></cc-search>
		</view>
		<!-- #endif -->
		<view class="body displayF">
			<view>
				<scroll-view scroll-y="true" scroll-left="0" class="left">
					<view v-for="(item,index) in getCategoryList" :key="index" @click="choose(index)">
						<view v-if="item.isShow" class="word" :class="{color:active===index}">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="right" style="width: 550rpx;">
				<view class="img">
					<image src="../../static/1.jpeg" mode=""></image>
				</view>
				<scroll-view scroll-x="true" scroll-left="0" style="white-space: nowrap;" class="scro"
					v-if="getCategoryList[active]">
					<view v-for="(item,index) in getCategoryList[active].list" :key="index" class="topWord1"
						@click="choose1(item,index)" :class="{color1:active1===index} " v-if="item.isShow">
						<view class="content" :class="{color1:active1===index}">{{item.name}}</view>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" scroll-left="0" class="every" v-if="getCategoryList[active]"
					:scroll-into-view="Item">
					<view v-for="(item,index) in getCategoryList[active].list" :key="index" v-if="item.isShow"
						:id="'dome'+index">
						<view style="margin: 40rpx 0 0 0;">{{item.name}}</view>
						<view v-for="(item1,index1) in item.list" :key="index1">
							<view v-for="(item2,index2) in item1[item.name]" :key="index2" @click="jump(item2)">
								<view class="lable displayF align-itemsC">
									<image :src="item2.cover" mode=""></image>
									<view style="padding: 5rpx 0; margin-left: 20rpx;">
										<view class="name">{{item2.name}}</view>
										<view style="font-size: 12px;">￥<span
												style="font-size: 15px;margin: 0 5rpx;">{{item2.presentPrice}}</span>起
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from "vuex"
	let cationModule = createNamespacedHelpers('cation')
	let {
		mapState: cationState,
		mapActions: cationActions
	} = cationModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				active: 0,
				active1: 0,
				Item:''
			}
		},
		methods: {
			...cationActions(["getCategory"]),
			choose(index) {
				this.active = index
			},
			choose1(item,index) {
				this.active1 = index
				this.Item=`dome${index}`
			},
			jump(item){
				uni.navigateTo({
					url:`/pages/details/details?id=${item._id}`,
				})
			},
			handleFocus(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			}
		},
		mounted() {
			this.getCategory()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...cationState(["getCategoryList"])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.H5_search {
		background-color: white !important;
	}

	/* #ifdef MP-WEIXIN */
	.body {
		height: 1108rpx;
	}

	.left {
		width: 200rpx;
		height: 1108rpx;
	}

	/* #endif */
	/* #ifdef H5 */
	.body {
		height: 1120rpx;
	}

	.left {
		width: 200rpx;
		height: 1120rpx;
	}

	/* #endif */
	.word {
		padding-left: 20rpx;
		border-left: 2px solid white;
		margin: 40rpx 0;
		color: gray;
		font-size: 13px;
	}

	.color {
		border-left: 2px solid #f85e22;
		color: black;
	}

	.right {
		padding: 0 20rpx;
	}

	.img {
		width: 100%;
		background: #eeeeee;
		height: 200rpx;
		border-radius: 10rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.topWord1 {
		display: inline-block;
		margin-right: 20rpx;
	}

	.scro {
		padding: 20rpx 0;
		border-bottom: 1px solid #eeeeee;
	}

	.content {
		padding: 10rpx;
		border-radius: 10rpx;
		color: gray;
		font-size: 13px;
	}

	.color1 {
		background: #eeeeee;
		color: black;
	}

	/* #ifdef H5 */
	.every {
		height: 824rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.every {
		height: 810rpx;
	}

	/* #endif */
	.lable {
		width: 100%;
		height: 150rpx;
		background: #eeeeee;
		border-radius: 10rpx;
		padding-left: 20rpx;
		margin: 20rpx 0;

		image {
			width: 80rpx;
			height: 110rpx;
		}
	}

	.name {
		width: 360rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 5rpx;
		font-size: 14px;
	}
</style>
