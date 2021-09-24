<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="H5_search1">
			<cc-search :value.sync="value" round class="search" actionText="搜索" @input="handleInput" @confirm="confirm1" @cancel="cancel"></cc-search>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="weixin_search">
			<cc-search :value.sync="value" round actionText="搜索" @input="handleInput" @confirm="confirm1"
				@cancel="cancel"></cc-search>
		</view>
		<!-- #endif -->
		<!-- 遮罩层 -->
		<view class="box" v-if="flag" @click="off">
			<view v-for="(item,index) in searchList" :key="index" class="lable" @click="jump(item,index)">
				{{item.name}}
			</view>
		</view>
		<view class="history">
			<view class="displayF justify-contentB align-itemsC">
				<view>搜索历史</view>
				<image src="../../static/icon/下载.png" style="width: 40rpx;height: 40rpx;" @click="remove"></image>
			</view>
			<view style="display: flex;flex-wrap: wrap;">
				<view v-for="(item,index) in list" :key="index" class="srach" @click="jump1(item)">{{item.name}}</view>
			</view>
			<!-- 确定清除历史记录 -->
			<cc-dialog @confirm="confirm" :show.sync="show" showCancelButton content="您确定清空搜索历史记录吗？">
			</cc-dialog>
		</view>
		<view class="found">
			<view>搜索发现</view>
			<view class="displayF justify-contentC" style="margin-bottom: 20rpx;">
				<image src="../../static/banners/1.jpeg" mode="" style="width: 600rpx;height: 300rpx;"></image>
			</view>
			<view class="list">
				<view v-for="(item,index) in getSearchWordsList" :key="index" class="listWord" @click="jump1(item)">
					{{item.name}}
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
				list: null,
				show: false
			}
		},
		methods: {
			...searchActions(["search", "getSearchWords"]),
			off(){
				this.flag=false
				this.value=""
			},
			handleInput(e) {
				this.flag = true
				this.search({
					current: "",
					pageSize: '',
					query: this.value,
				})
			},
			jump(item, index) {
				uni.navigateTo({
					url: `/pages/details/details?id=${item._id}`,
				})
				this.$utils.saveHistory({
					key: "srach",
					data: this.value,
					attr: "name"
				})
				this.list = this.$utils.getHistory({
					key: "srach"
				})
				this.value = ""
			},
			remove() {
				this.show = true
			},
			confirm() {
				uni.removeStorageSync("srachHistory")
				this.list = this.$utils.getHistory({
					key: "srach"
				})
			},
			confirm1() {
				this.$utils.saveHistory({
					key: "srach",
					data: this.value,
					attr: "name"
				})
				this.list = this.$utils.getHistory({
					key: "srach"
				})
				uni.navigateTo({
					url: `/pages/goods/goods?value=${this.value}`
				})
				this.value = ""
			},
			cancel() {
				this.confirm1()
			},
			jump1(item) {
				this.$utils.saveHistory({
					key: "srach",
					data: item.name,
					attr: "name"
				})
				this.list = this.$utils.getHistory({
					key: "srach"
				})
				uni.navigateTo({
					url: `/pages/goods/goods?value=${item.name}`
				})
			}
		},
		mounted() {
			this.list = this.$utils.getHistory({
					key: "srach"
				}),
				this.getSearchWords()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...searchState(["searchList", "getSearchWordsList"])
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

	.H5_search1 {
		padding-bottom: 20rpx;
	}

	/* #ifdef H5 */
	.box {
		height: 1000rpx;
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
	.lable {
		background-color: white;
		padding: 20rpx;
		border-bottom: 1px solid #eeeeee;
	}

	.history {
		padding: 20rpx;
	}

	.srach {
		font-size: 13px;
		background: #eeeeee;
		padding: 10rpx 15rpx;
		border-radius: 26rpx;
		margin: 10rpx 10rpx;
	}

	.found {
		padding: 20rpx;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
	}

	/* #ifdef H5 */
	.listWord {
		width: 354rpx;
		padding: 0 0 30rpx 20rpx;
	}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.listWord {
		width: 330rpx;
		padding: 0 0 30rpx 20rpx;
	}
	/* #endif */
</style>
