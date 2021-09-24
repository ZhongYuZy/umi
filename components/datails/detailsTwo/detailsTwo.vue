<template>
  <view>
    <view class="detailsTwo">
			<view class="top displayF justify-contentB align-itemsC">
				<view>用户评价</view>
				<view class="right displayF justify-contentB align-itemsC">
					<view></view>
					<image src="../../../static/right.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
				</view>
			</view>
			<view v-if="goodsDetailList.comment.length>0">
				<scroll-view scroll-x="true" style="white-space: nowrap;padding: 20rpx;">
					<view v-for="(item,index) in goodsDetailList.comment" :key="index" class="word">
						<view class="displayF">
							<image src="../../../static/user/touxiang.png" mode="" style="width: 100rpx;height: 100rpx;"></image>
							<view style="margin-left: 20rpx;">
								<view>{{item.user.username}}</view>
								<cc-rate :value.sync="item.rate"></cc-rate>
							</view>
						</view>
						<view class="displayF">
							<view v-for="(item1,index1) in item.pic" :key="index1">
								<image :src="item1.url" style="width: 80rpx;height: 80rpx;"></image>
							</view>
						</view>
						<view style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.content}}</view>
					</view>
				</scroll-view>
			</view>
			<view v-else>暂无评论</view>
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
			},
		},
    data() {
      return {}
    },
    methods: {
		},
    mounted() {
		console.log(this.goodsDetailList);
    },
    onLoad() {

    },
    onShow() {

    },
    filters: {},
    computed: {
		},
    watch: {},
  }
</script>

<style scoped lang="scss">
.detailsTwo{
	padding: 20rpx;
	margin-top: 20rpx;
	background: white;
}
.word{
	padding: 20rpx;
	border: 1px solid #eeeeee;
	border-radius: 10rpx;
	width: 500rpx;
	margin: 0 20rpx 0 0;
}
</style>
