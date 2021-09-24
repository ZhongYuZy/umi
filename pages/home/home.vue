<template>
	<view class="back">
		<!-- #ifdef MP-WEIXIN -->
		<cc-sticky>
			<view class="top">
				<view class="blank"></view>
				<view class="displayF nav">
					<view class="img displayF justify-contentC align-itemsC">
						<image src="/static/logo.png"></image>
					</view>
					<view class="search">
						<cc-search :value.sync="value" round :showAction="false" @focus="handleFocus"></cc-search>
					</view>
				</view>
			</view>
		</cc-sticky>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<cc-sticky>
			<view class="H5_top displayF" :class="{H5_topcolor:flag===false}">
				<view class="H5_img displayF justify-contentC align-itemsC" v-if="flag">
					<image src="/static/logo.png" mode=""></image>
				</view>
				<view>
					<cc-search :show-action="false" :class="{cc_searchcolor:flag===false}" @focus="handleFocus"></cc-search>
				</view>
			</view>
		</cc-sticky>
		<!-- #endif -->
		<view class="box"></view>
		<view class="first">
			<cc-notice-bar volume link closeable  @clickRight="clickRight" v-if="flag1">
				<view class="displayF">
					<view v-for="(item,index) in getNoticeList" :key="index">
						{{item.content}}
					</view>
				</view>
			</cc-notice-bar>
			<cc-swiper @click="handleClick" @change="handleChange" :list="getBannerList"></cc-swiper>
		</view>
		<homeOne></homeOne>
		<homeTwo :show1="show1" :show2="show2"></homeTwo>
	</view>

</template>

<script>
	import homeOne from "../../components/homeOne/homeOne.vue"
	import homeTwo from "../../components/homeTwo/homeTwo.vue"
	import {
		createNamespacedHelpers
	} from "vuex"
	let homeModule = createNamespacedHelpers('home')
	let {
		mapState: homeState,
		mapActions: homeActions
	} = homeModule
	export default {
		components: {
			homeOne,
			homeTwo
		},
		props: {},
		data() {
			return {
				value: '',
				flag: true,
				show1:false,
				show2:false,
				flag1:true
			}
		},
		methods: {
			...homeActions(["getBanner","getNotice"]),
			handleClick(val) {
			},
			handleChange(val) {},
			handleFocus(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			},
			clickRight(){
				this.flag1=false
			}
		},
		mounted() {
			this.getBanner()
			this.getNotice()
		},
		onLoad() {

		},
		onShow() {
		},
		filters: {},
		computed: {
			...homeState(["getBannerList","getNoticeList"])
		},
		watch: {},
		// 路由组件监听滚动
		onPageScroll(e) {
			if (e.scrollTop >= 15) {
				this.flag = false
				// this.background = '#ffffff'
			} else {
				this.flag = true
				// this.background = 'transparent'
			}
			if (e.scrollTop >= 530){
				this.show1=true
			} else {
				this.show1 = false
				// this.background = 'transparent'
			}
			if (e.scrollTop >= 510){
				this.show2=true
			} else {
				this.show2 = false
				// this.background = 'transparent'
			}
		},
	}
</script>

<style scoped lang="scss">
	.back {
		background: #f7f7f7;
		height: 100%;
		width: 100%;
		position: relative;
	}

	.top {
		background: #f85e22;
	}

	.blank {
		height: 50rpx;
	}

	.nav {
		padding: 0 20rpx 20rpx 20rpx;
	}

	.img {
		background: white;
		width: 60rpx;
		height: 60rpx;
		border-radius: 20rpx;

		image {
			width: 30rpx;
			height: 30rpx;
		}
	}

	.search {
		height: 60rpx;
	}

	.H5_top {
		background-color: #f85e22;
		padding: 30rpx 20rpx;
	}

	.cc_searchcolor {
		background: white !important;
		width: 624rpx;
	}

	.H5_topcolor {
		background-color: white;
	}

	.H5_img {
		background: white;
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.box {
		background: #f95f23;
		width: 750rpx;
		height: 150rpx;
		border-radius: 0 0 30% 30%;
	}

	.first {
		width: 710rpx;
		margin-left: 20rpx;
		height: 300rpx;
		position: absolute;
		top: 150rpx;
		background: white;
		border-radius: 10rpx;
		overflow: hidden;
	}
</style>
