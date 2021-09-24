<template>
	<view>
		<view class="sheet">
			<view class="first displayF align-itemsC justify-contentB" @click="open" >
				<view class="left">已选</view>
				<view class="right displayF align-itemsC justify-contentB">
					<view v-if="goodsDetailList.sku.length>0">{{goodsDetailList.sku.map(item=>{
								return item.checked
							}).join(" ")}} x{{value}}</view>
					<image src="../../../static/right.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
				</view>
			</view>
			<view class="first displayF align-itemsC justify-contentB">
				<view class="left">送至</view>
				<view class="right displayF align-itemsC justify-contentB">
					<view class="address">{{address}}</view>
					<image src="../../../static/right.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
				</view>
			</view>
			<!-- <view class="first displayF align-itemsC justify-contentB">
				<view class="left">门店</view>
				<view class="right1 displayF align-itemsC justify-contentB">
					<view>11</view>
					<image src="../../../static/right.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
				</view>
			</view> -->
		</view>
		<cc-popup :show.sync="show" mode="bottom" height="1100" closeable>
			<view style="padding: 20rpx;" class="displayF">
				<view>
					<image :src="goodsDetailList.cover" mode="" style="width: 200rpx;height: 200rpx;"></image>
				</view>
				<view style="margin-left: 30rpx;">
					<view class="displayF align-itemsC" style="margin-top: 40rpx;">
						<view style="color: #f85e22;font-size: 18px;">￥{{goodsDetailList.presentPrice}}</view>
						<view style="color: gray;font-size: 14px;text-decoration: line-through;">
							￥{{goodsDetailList.originalPrice}}</view>
					</view>
					<view style="margin-top: 20rpx;" v-if="goodsDetailList.sku.length>0">{{goodsDetailList.sku.map(item=>{
						return item.checked
					}).join(" ")}}</view>
				</view>
			</view>
			<view style="padding: 20rpx;">
				<view v-for="(item,index) in goodsDetailList.spec" :key="index">
					<view style="margin: 20rpx 0;">{{item.name}}</view>
					<view class="displayF" style="flex-wrap: wrap;">
						<view v-for="(item1,index1) in item.checkList" :key="index1" class="title" @click="choose(item,index,item1,index1)" :class="item.showFlag===index1?'color':''">
							{{item1}}
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 20rpx;" class="displayF justify-contentB">
				<view>购买数量</view>
				<view>
					<cc-stepper @minus="minus" @plus="plus" :value.sync="value"></cc-stepper>
				</view>
			</view>
			<view class="displayF choose" style="width: 710rpx;border-radius: 42rpx;overflow: hidden;margin-left: 20rpx;">
				<cc-button type="warning" block @click="jion" style="width: 355rpx;">加入购物车</cc-button>
				<cc-button type="error" block @click="immediately" style="width: 355rpx;">立即购买</cc-button>
			</view>
		</cc-popup>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from "vuex"
	let detailsModule = createNamespacedHelpers('details')
	let {
		mapState: detailsState,
		mapActions: detailsActions
	} = detailsModule
	export default {
		components: {},
		props: {
			goodsDetailList: {
				type: Object,
				required: true
			},
			showflag:{
				type:Boolean,
				required:true
			}
		},
		data() {
			return {
				show: this.showflag,
				value: 1,
				address:"定位中"
			}
		},
		methods: {
			open() {
				this.show = true
			},
			minus() {
				this.value--
			},
			plus() {
				this.value++
			},
			choose(item,index,item1,index1){
				this.$set(item,"showFlag",index1)
				this.$set(this.goodsDetailList.sku,index,{name:item.name,checked:item1})
			},
			...detailsActions(["addCart"]),
			// 选择商品
			Cart(){
				let user=uni.getStorageSync("user")
				this.addCart({
					user_id:user._id,
					count:this.value,
					goods:this.goodsDetailList,
					spec:this.goodsDetailList.sku
				})
				this.show=false
			},
			// 加入购物车
			jion(){
				this.$utils.checkLogin({
					key:"user",
					next:this.Cart,
					item:''
				})
			},
			// 立即购买
			immediately(){
				let obj=[]
				obj.push({
					count:this.value,
					goods:this.goodsDetailList,
					spec:this.goodsDetailList.sku,
					_id:this.goodsDetailList._id,
					isComment:false
				})
				uni.setStorageSync("shop",obj)
				uni.navigateTo({
					url:"/pages/settlement/settlement"
				})
			}
		},
		mounted() {
			this.$utils.getLocation1({}).then((res)=>{
				if(res.code===200){
					this.address=res.data.formattedAddress
				}
			}).catch((err)=>{
				
			})
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...detailsState(["addCartList"])
		},
		watch: {
			showflag(val){
				this.show=val
			},
			show(val){
				this.$emit("code",val)
			}
		},
	}
</script>

<style scoped lang="scss">
	.sheet {
		margin-top: 20rpx;
		background-color: white;
	}

	.left {
		padding: 20rpx;
		font-size: 13px;
	}

	.right {
		border-bottom: 1px solid #eeeeee;
		width: 600rpx;
		padding: 20rpx 20rpx 20rpx 0;
	}

	.right1 {
		width: 600rpx;
		padding: 20rpx 20rpx 20rpx 0;
	}

	.title {
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		background: #eeeeee;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.color{
		color: #f85e22;
		border: 1px solid #f85e22;
		background: white;
	}
	.choose{
		position: fixed;
		left: 0rpx;
		bottom: 20rpx;
	}
	.address{
		width: 500rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
