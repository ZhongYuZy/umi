<template>
	<view>
		<view style="font-size: 18px;font-weight: 700;margin: 30rpx;">小米账号登录</view>
		<view class="displayF justify-contentB" style="padding: 30rpx;">
			<view class="left">
				验证码已发送至 +86 {{value}}
			</view>
			<view style="font-size: 13px;color: #007AFF;" @click="black">修改</view>
		</view>
		<view style="padding: 30rpx;">
			<view class="displayF inpt body align-itemsC">
				<cc-field :value.sync="value1"></cc-field>
				<view style="width: 300rpx;background: #eeeeee;height: 82rpx;color: gray;"
					class="displayF justify-contentC align-itemsC" v-if="show">重新发送{{num}}s</view>
				<view style="width: 300rpx;background: #eeeeee;height: 82rpx;color: gray;"
					class="displayF justify-contentC align-itemsC" v-if="!show" @click="click">重新发送</view>
			</view>
		</view>
		<view style="padding: 0 30rpx;">
			<cc-button :disabled="disabled" block type="primary" round @click="login">登录</cc-button>
		</view>
	</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from "vuex"
	let loginModule = createNamespacedHelpers('login')
	let {
		mapState: loginState,
		mapActions: loginActions
	} = loginModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				value1: '',
				num: 60,
				show: true,
				disabled:true
			}
		},
		methods: {
			black() {
				uni.navigateBack({})
			},
			...loginActions(["getCode","mobileLogin"]),
			click() {
				this.getCode({
					mobile: this.value
				})
				let a = setInterval(() => {
					if (this.num > 0) {
						this.num--
					} else {
						clearInterval(a)
						this.show = false
						this.num = 60
					}
				}, 1000)
			},
			login(){
				this.mobileLogin({
					mobile:this.value,
					code:this.value1
				})
			}
		},
		mounted() {

		},
		onLoad(e) {
			this.value = e.value
			this.getCode({
				mobile: this.value
			})
			let a = setInterval(() => {
				if (this.num > 0) {
					this.num--
				} else {
					clearInterval(a)
					this.show = false
					this.num = 60
				}
			}, 1000)
		},
		onShow() {

		},
		filters: {},
		computed: {
			...loginState(["getCodeList","mobileLoginList"])
		},
		watch: {
			value1(val){
				if(val!==""){
					this.disabled=false
				}else{
					this.disabled=true
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.left {
		font-size: 13px;
	}

	.body {
		padding: 20rpx;
		border-radius: 40rpx;
		background: #eeeeee;
	}
</style>
