<template>
	<view>
		<view class="four">
			<view class="top displayF">
				<view :class="{color:active===index}" v-for="(item,index) in list" :key="index"
					class="title displayF justify-contentC align-itemsC" @click="choose(index)">
					{{item}}
				</view>
			</view>
			<view v-if="active===0">
				<view v-if="goodsDetailList.detail">
					<view v-html="goodsDetailList.detail" style="font-size: 0;"></view>
				</view>
				<view v-else>暂无数据</view>
			</view>
			<view v-if="active===1">
				<view v-if="goodsDetailList.specParams">
					<view v-html="goodsDetailList.specParams" style="font-size: 0;"></view>
				</view>
				<view v-else class="displayF justify-contentC">暂无数据</view>
			</view>
			<view style="height: 100rpx;"></view>
			
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			goodsDetailList: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				list: ["商品介绍", "商品参数"],
				active: 0,
			}
		},
		methods: {
			choose(index) {
				this.active = index
			},
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.four {
		margin-top: 20rpx;
		background-color: white;
	}

	.title {
		flex: 1;
		padding: 20rpx;
		font-size: 13px;
	}

	.color {
		color: #f85e22;
	}

	
</style>
