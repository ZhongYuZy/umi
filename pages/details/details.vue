<template>
	<view style="background: #f7f7f7;">
		<cc-sticky>
			<view class="weixinDetails">
				<!-- #ifdef MP-WEIXIN -->
				<view style="height: 50rpx;color:white" :class="{bor:flag===false}"></view>
				<!-- #endif -->
				<view style="padding-bottom: 20rpx;" :class="{bor:flag===false}">
					<cc-nav-bar :background="background">
						<template #left>
							<view class="img displayF justify-contentC align-itemsC" :class="{bor:flag===false}" @click="back">
								<image src="../../static/back.png" mode=""></image>
							</view>
						</template>
						<template #default>
							<view v-if="!flag" style="display: flex;">
								<view v-for="(item,index) in list" :key="index" style="margin-right: 20rpx;">
									<view style="font-size: 14px;">{{item}}</view>
								</view>
							</view>
						</template>
					</cc-nav-bar>
				</view>
			</view>
		</cc-sticky>
		<view>
			<swiper :autoplay="true" class="img_img" indicator-dots="true" interval="2000" duration="500" style="height: 480rpx;">
				<swiper-item v-if="goodsDetailList.video!==''" v-for="(item,index) in goodsDetailList.video"
					:key="index">
					<video :src="item" id="myVideo" style="width: 100%; height: 100%;" controls='false' loop='true'
						autoplay='true'></video>
				</swiper-item>
				<swiper-item v-for="(item,index) in goodsDetailList.pic" :key="index" >
					<image :src="item" class="img_img" style="width: 750rpx;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view style="background: white;padding: 20rpx;">
			<view class="displayF align-itemsE">
				<view style="color:#f85e22;font-weight: 700;" class="displayF align-itemsS">￥<span
						style="font-size: 25px;">{{goodsDetailList.presentPrice}}</span></view>
				<view style="color: gray;font-size: 14px;text-decoration: line-through;margin-left: 10rpx;"
					v-if="goodsDetailList.presentPrice!==goodsDetailList.originalPrice">
					￥{{goodsDetailList.originalPrice}}</view>
			</view>
			<view style="font-size: 18px;font-weight: 700;margin: 10rpx 0;">{{goodsDetailList.name}}</view>
			<view style="font-size: 12px;">{{goodsDetailList.introduction}}</view>
			<view v-if="goodsDetailList.sellDesc">
				<view style="margin: 10rpx 0;" v-for="(item,index) in goodsDetailList.sellDesc[0].split('\n')"
					:key="index" class="displayF align-itemsC">
					<view v-if="index===0" class="displayF align-itemsC">
						<image src="../../static/1.png" mode="" style="width: 30rpx;height: 30rpx;margin-right: 20rpx;">
						</image>
					</view>
					<view v-if="index===1" class="displayF align-itemsC">
						<image src="../../static/2.png" mode="" style="width: 30rpx;height: 30rpx;margin-right: 20rpx;">
						</image>
					</view>
					<view v-if="index===2" class="displayF align-itemsC">
						<image src="../../static/3.png" mode="" style="width: 30rpx;height: 30rpx;margin-right: 20rpx;">
						</image>
					</view>
					<view style="font-size: 12px;">{{item}}</view>
				</view>
			</view>
		</view>
		<view v-if="goodsDetailList.params&&goodsDetailList.params.length>0">
			<scroll-view scroll-x="true" scroll-left="0" style="white-space: nowrap;background: white;border-top: 1px solid #eeeeee;">
				<view class="parameter displayF">
					<view v-for="(item,index) in goodsDetailList.params" class="displayF flex-directionC justify-contentC align-itemsC" style="padding: 20rpx;" @click="open">
						<image :src="item.url" mode="" style="width: 40rpx;height: 40rpx;"></image>
						<view style="font-size: 13px;margin: 5rpx 0;">{{item.name}}</view>
						<view style="width:150rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 13px;text-align: center;">{{item.desc}}</view>
					</view>
				</view>
			</scroll-view>
			<cc-popup :show.sync="show" mode="bottom" height="1100" closeable>
				<view class="essential">关键参数</view>
				<scroll-view scroll-y="true" scroll-left="0" style="height: 820rpx;">
					<view v-for="(item,index) in goodsDetailList.params" :key="index" class="word displayF">
						<view style="width: 100rpx;color: gray;">{{item.name}}</view>
						<view style="width: 540rpx;margin-left: 40rpx;">{{item.desc}}</view>
					</view>
				</scroll-view>
				<view style="position: fixed;width: 710rpx;margin: 20rpx;" >
					<cc-button round type="warning" block @click="off">确定</cc-button>
				</view>
			</cc-popup>
		</view>
		<detailsOne @code="code" :showflag="showflag" v-if="Object.values(goodsDetailList).length>0" :goodsDetailList="goodsDetailList"></detailsOne>
		<detailsTwo v-if="Object.values(goodsDetailList).length>0" :goodsDetailList="goodsDetailList"></detailsTwo>
		<detailsThree></detailsThree>
		<detailsFour v-if="Object.values(goodsDetailList).length>0" :goodsDetailList="goodsDetailList"></detailsFour>
		<view style="padding-bottom: 10rpx;" class="foot">
			<cc-goods-action :options="options" :buttons="buttons" @click="click" @clickButton="clickButton">
			</cc-goods-action>
		</view>
	</view>

</template>

<script>
	import detailsOne from "../../components/datails/detailsOne/detailsOne.vue"
	import detailsTwo from "../../components/datails/detailsTwo/detailsTwo.vue"
	import detailsThree from "../../components/datails/detailsThree/detailsThree.vue"
	import detailsFour from "../../components/datails/detailsFour/detailsFour.vue"
	import {
		createNamespacedHelpers
	} from "vuex"
	let detailsModule = createNamespacedHelpers('details')
	let {
		mapState: detailsState,
		mapActions: detailsActions
	} = detailsModule
	let shopModule = createNamespacedHelpers('shop')
	let {
		mapState: shopState,
		mapActions: shopActions
	} = shopModule
	export default {
		components: {detailsOne,detailsTwo,detailsThree,detailsFour},
		props: {},
		data() {
			return {
				flag: true,
				list: ["商品", "评价", "详情", "推荐"],
				id: null,
				background: 'transparent',
				show:false,
				showflag:false,
				options: [{
						text: '首页',
						icon: 'home',
					},
					{
						text: '客服',
						icon: 'chat'
					},
					{
						text: '购物车',
						icon: 'cart',
						info:0
					}
				],
				buttons: [{
						text: '加入购物车'
					},
					{
						text: '立即购买'
					}
				],
			}
		},
		methods: {
			...detailsActions(["goodsDetail"]),
			...shopActions(["getCart"]),
			// 视频
			getFileType(fileName) {
				// 后缀获取
				let suffix = '';
				// 获取类型结果
				let result = '';
				try {
					const flieArr = fileName.split('.');
					suffix = flieArr[flieArr.length - 1];
				} catch (err) {
					suffix = '';
				}
				// 图片格式
				const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
				// 进行图片匹配
				result = imglist.find(item => item === suffix);
				if (result) {
					return 'image';
				}
				// 匹配 视频
				const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
				result = videolist.find(item => item === suffix);
				if (result) {
					return 'video';
				}
			},
		back(){
			uni.navigateBack({})
		},
		open(){
			this.show=true
		},
		off(){
			this.show=false
		},
		click(e) {
			if (e.index === 0) {
				uni.switchTab({
					url: "/pages/home/home"
				})
			}
			if (e.index === 1) {
				uni.navigateTo({
					url: "/pages/customer/customer"
				})
			}
			if (e.index === 2) {
				uni.switchTab({
					url: "/pages/shopcart/shopcart"
				})
			}
		},
		clickButton(e) {
		this.showflag=true
		},
		code(val){
			this.showflag=val
		}
		},
		mounted() {
			this.goodsDetail({
				id: this.id
			})
			this.getCart(uni.getStorageSync("user")._id)
		},
		onLoad(e) {
			this.id = e.id
		},
		onShow() {

		},
		filters: {},
		computed: {
			...detailsState(["goodsDetailList"]),
			...shopState(["n"]),
		},
		watch: {
			n:{
				handler(val){
					if(val){
						this.options[2].info=val
					}
				},
				immediate:true
			}
		},
		// 路由组件监听滚动
		onPageScroll(e) {
			if (e.scrollTop >= 15) {
				this.flag = false
				this.background = "#FFFFFF"
			} else {
				this.flag = true
				this.background = "transparent"
			}
		}
	}
</script>

<style scoped lang="scss">
	.img {
		width: 55rpx;
		height: 55rpx;
		border-radius: 50%;
		background: #f7f7f7;
		border: 1px solid gray;

		image {
			width: 55rpx;
			height: 55rpx;
		}
	}

	.bor {
		border: none !important;
		background: white !important;
	}
	.essential{
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		font-weight: 700;
	}
	.word{
		padding: 20rpx;
	}
	.foot {
		position: fixed;
		bottom: 0;
		left: 0;
		background: white;
		width: 750rpx;
	}
</style>
