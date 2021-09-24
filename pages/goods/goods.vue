<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="H5_search1">
			<cc-search :value.sync="value" round class="search" actionText="搜索" @focus="handleFocus"
				@input="handleInput" @confirm="confirm1" @cancel="cancel"></cc-search>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="weixin_search">
			<cc-search :value.sync="value" round actionText="搜索" @focus="handleFocus"
				@input="handleInput" @confirm="confirm1" @cancel="cancel"></cc-search>
		</view>
		<!-- #endif -->
		<!-- 遮罩层 -->
		<view class="box" v-if="flag" @click="off">
			<view v-for="(item,index) in searchList" :key="index" class="lable" @click="jump(item,index)">
				{{item.name}}
			</view>
		</view>
		<view class="content">
			<view v-for="(item,index) in searchList" :key="index" class="contentWord displayF" @click=jump1(item)>
				<image :src="item.cover" style="width: 250rpx;height: 350rpx;margin: 0 20rpx;"></image>
				<view class="details">
					<view>{{item.name}}</view>
					<view
						style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color: gray;font-size: 13px;margin: 20rpx 0;">
						{{item.introduction}}</view>
					<view style="font-size: 16px;color: #f85e22;">￥<span
							style="font-size: 20px;margin: 0 5rpx;">{{item.presentPrice}}</span>起</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from "vuex"
	let searchModule = createNamespacedHelpers('search')
	let {
		mapState: searchState,
		mapActions: searchActions
	} = searchModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				flag: false,
			}
		},
		methods: {
			...searchActions(["search"]),
			jump(item, index) {
				uni.navigateTo({
					url: `/pages/details/details?id=${item._id}`,
				})
				this.flag = false
			},
			jump1(item) {
				uni.navigateTo({
					url: `/pages/details/details?id=${item._id}`,
				})
			},
			handleFocus() {
				if (this.value !== "") {
					this.flag = true
					this.search({
						current: "",
						pageSize: '',
						query: this.value,
					})
				}
			},
			handleInput(e) {
				this.flag=true
				this.search({
					current: "",
					pageSize: '',
					query: this.value,
				})
			},
			off() {
				this.flag = false
				this.value=""
			},
			confirm1() {
				this.search({
					current: "",
					pageSize: '',
					query: this.value,
				})
				this.flag=false
			},
			cancel() {
				this.confirm1()
			},
		},
		mounted() {

		},
		onLoad(e) {
			this.value = e.value
			this.search({
				current: "",
				pageSize: '',
				query: e.value,
			})
		},
		onShow() {

		},
		filters: {},
		computed: {
			...searchState(["searchList"])
		},
		watch: {
			value(val) {
				if (val === "") {
					this.flag = false
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.search {
		background: #f8f8f8 !important;
	}

	.lable {
		background-color: white;
		padding: 20rpx;
		border-bottom: 1px solid #eeeeee;
	}

	/* #ifdef H5 */
	.box {
		height: 1174rpx;
		position: fixed;
		top: 160rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		overflow-y: auto;
		z-index: 999;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.box {
		height: 1000rpx;
		position: fixed;
		top: 80rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		overflow-y: auto;
	}

	/* #endif */
	.contentWord {
		padding: 20rpx;
		border-bottom: 1px solid #eeeeee;
	}

	.details {
		width: 400rpx;
		padding: 30rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
