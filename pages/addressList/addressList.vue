<template>
	<view style="height: 100%;background: #f3f3f3;">
		<view style="padding: 20rpx;">
			<view v-if="list&&list.length>0">
				<cc-address-list :value="chosenAddressId" :list="list" default-tag-text="默认" @edit="edit" @add="add"
					@select="click($event)"></cc-address-list>
				<view style="height: 108rpx;"></view>
			</view>
			<view class="displayF justify-contentC" style="margin-top: 100rpx;" v-else>暂无地址,请添加</view>
		</view>
	</view>

</template>

<script>
	import cloneDeep from "lodash/cloneDeep"
	import {
		createNamespacedHelpers
	} from "vuex"
	let shopModule = createNamespacedHelpers('shop')
	let {
		mapState: shopState,
		mapActions: shopActions
	} = shopModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				list: null,
				chosenAddressId: null
			}
		},
		methods: {
			...shopActions(["getAppAddress"]),
			edit(e) {
				uni.navigateTo({
					url: `/pages/addAddress/addAddress?arr=${JSON.stringify(e.item)}`
				})
			},
			add() {
				uni.navigateTo({
					url: '/pages/addAddress/addAddress'
				})
			},
			click(e) {
				console.log(e);
				uni.setStorageSync("address", e.item)
				uni.navigateTo({
					url: '/pages/settlement/settlement'
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			let user = uni.getStorageSync("user")
			this.getAppAddress(user._id)
		},
		filters: {},
		computed: {
			...shopState(["getAppAddressList"]),
		},
		watch: {
			getAppAddressList: {
				handler(val) {
					if (val) {
						let obj = val.filter(item => {
							return item.isDefault === true
						})
						this.chosenAddressId = obj[obj.length - 1].id
						this.list = cloneDeep(val)
					}
				},
				deep: true

			}
		},
	}
</script>

<style scoped lang="scss">
	/* #ifdef H5 */
	.word {
		width: 100%;
		padding: 20rpx;
		background-color: white;
		border-radius: 10rpx;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.word {
		width: 670rpx;
		padding: 20rpx;
		background-color: white;
		border-radius: 10rpx;
	}

	/* #endif */
</style>
