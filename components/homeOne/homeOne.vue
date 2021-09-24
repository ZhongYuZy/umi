<template>
	<view>
		<view class="homeOne">
			<view v-for="(item,index) in getNavList" :key="index" class="img" @click="spike(index)">
				<image :src="item.url" mode=""></image>
			</view>
		</view>
		<view class="popnwe">
			<view class="popnweOne">人气上新</view>
			<view class="popnweTwo">
				<view v-for="(item,index) in getNewList" :key="index" v-if="index<3" class="popnweTwoContent" :class="{mar:index===1}" @click="jump(item)">
					<view class="popnweimg displayF justify-contentC align-itemsC"><image :src="item.cover" mode=""></image></view>
					<view style="margin-top: 20rpx;width: 223rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.name}}</view>
				</view>
			</view>
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
		props: {},
		data() {
			return {}
		},
		methods: {
			...homeActions(["getNav","getNew"]),
			jump(item){
				uni.navigateTo({
					url:`/pages/details/details?id=${item._id}`
				})
			},
			spike(index){
				if(index===0){
					uni.navigateTo({
						url:"/pages/spike/spike"
					})
				}
			}
		},
		mounted() {
			this.getNav()
			this.getNew()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homeState(["getNavList",'getNewList'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.homeOne {
		margin-top: 190rpx;
		width: 710rpx;
		margin-left: 20rpx;
		background: white;
		border-radius: 10rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.img {
		flex: 1;

		image {
			width: 142rpx;
			height: 142rpx;
		}
	}
	.popnwe{
		background: white;
		padding: 20rpx;
		margin-top: 20rpx;
	}
	.popnweOne{
		font-size: 16px;
		font-weight: 700;
	}
	.popnweTwo{
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 0;
		text-align: center;
	}
	.popnweTwoContent{
		flex: 1;
	}
	.mar{
		margin: 0 20rpx;
	}
	.popnweimg{
		background: #f7f7f7;
		height: 222rpx;
		border-radius: 10rpx;
		image{
			width: 150rpx;
			height: 150rpx;
		}
	}
</style>
