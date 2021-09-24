<template>
	<view>
		<view id="container" style="width: 710rpx;height: 500rpx;margin-left: 20rpx;"></view>
		<view class="foot">
			<view class="top displayF align-itemsC">
				<view class="home">小米之家</view>
			</view>
			<scroll-view scroll-y="true" class="scr">
				<view v-if="list&&list[0]&&list[0].store_list.length>0">
					<view v-for="(item,index) in list[0].store_list" :key="index" class="box" @click="choose(item)">
						<view class="one">{{item.store_name}}</view>
						<view class="two">{{item.shop_time}}</view>
						<view class="three">{{item.address}}</view>
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
	let xiaomihomeModule = createNamespacedHelpers('xiaomihome')
	let {
		mapState: xiaomihomeState,
		mapActions: xiaomihomeActions
	} = xiaomihomeModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				arr: '',
				list:[]
			}
		},
		methods: {
			...xiaomihomeActions(["getStoreHome"]),
			choose(item){
				uni.setStorageSync("map",item)
				uni.navigateTo({
					url:"/pages/detailsshop/detailsshop"
				})
			}
		},
		mounted() {},
		onLoad(e) {
			this.arr = JSON.parse(e.arr)
		},
		onShow() {
			this.getStoreHome({
				area_name: this.arr.name,
				area_id: this.arr.id
			})
		},
		filters: {},
		computed: {
			...xiaomihomeState(["getStoreHomeList"])
		},
		watch: {
			getStoreHomeList(val) {
				if (val) {
					this.list=val
					if (val[0].store_list[0]) {
						this.$utils.getLocation(val[0].store_list[0])
					}
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	/* #ifdef H5 */
	.foot {
		height: 746rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.foot {
		height: 707rpx;
	}

	/* #endif */
	.top {
		height: 100rpx;
	}

	.home {
		padding: 10rpx;
		border: 1px solid red;
		border-radius: 40rpx;
		margin-left: 20rpx;
		color: red;
	}

	/* #ifdef H5 */
	.scr {
		height: 646rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.scr {
		height: 607rpx;
	}

	/* #endif */
	.box{
		padding: 20rpx 0;
		border-bottom: 1px solid #eeeeee;
	}
	.one{
		width: 710rpx;
		margin-left: 20rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.two{
		width: 710rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: gray;
		margin: 10rpx 20rpx;
		font-size: 15px;
	}
	.three{
		width: 710rpx;
		margin-left: 20rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		color: gray;		
		font-size: 15px;
	}
</style>
