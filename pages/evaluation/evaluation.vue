<template>
	<view>
		<view style="width: 710rpx;margin-left: 20rpx;">
			<view class="displayF">
				<image :src="goods.goods.cover" mode="" style="width: 200rpx;height: 200rpx;"></image>
				<view style="margin-left: 20rpx;padding-top: 20rpx;">
					<view>{{goods.goods.name}}</view>
					<view style="color: #ff6f13;font-weight: 700;margin-top: 20rpx;">￥{{goods.goods.presentPrice}}</view>
				</view>
			</view>
			<view class="displayF">评分：<cc-rate @change="change" :value.sync="value"></cc-rate>
			</view>
			<view>
				内容：<cc-field :maxlength="200" show-word-limit :value.sync="value1" type="textarea" rows="4">
				</cc-field>
			</view>
			<view>
				<cc-upload :action="action" @uplpadSuccess="uplpadSuccess" isPreview :header="header" @delete="deleted(index)"></cc-upload>
			</view>
			<view>
				是否匿名：
				<cc-switch :value.sync="checked" @change='onChange'></cc-switch>
			</view>
			<view style="margin-top: 20rpx;">
				<cc-button type="warning" block @click="submit">提交评价</cc-button>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from "vuex"
	let myModule = createNamespacedHelpers('my')
	let {
		mapState: myState,
		mapActions: myActions
	} = myModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				user: null,
				goods: null,
				value: 0,
				value1: null,
				action: 'http://localhost:7001/app/upload',
				header: {
					'authorization': uni.getStorageSync('token')
				},
				fileList: [],
				checked: false
			}
		},
		methods: {
			change(val) {
				this.value=val
			},
			uplpadSuccess(e) {
				console.log(e);
				this.fileList.push(e.data.data)
			},
			deleted(index){
				this.fileList.splice(index.index,1)
			},
			onChange(val) {
				this.checked = val
			},
			...myActions(["createComment"]),
			submit(){
				this.createComment({
					user_id:this.user._id,
					goods_id:this.goods._id,
					order_id:this.goods.order_id,
					rate:this.value,
					content:this.value1,
					pic:this.fileList,
					isAnonymous:this.checked,
					comment_time:Date.now()
				})
				uni.navigateTo({
					url:"/pages/myorders/myorders"
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync("user")
			this.goods = uni.getStorageSync("Evaluation")
			console.log(this.goods);
		},
		filters: {},
		computed: {
			...myState(["createCommentList"])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
