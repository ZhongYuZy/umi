<template>
	<view>
		<view v-if="num===1">
			<view class="logo displayF flex-directionC align-itemsC justify-contentC">
				<image src="../../static/logo.png" style="width: 60rpx;height: 60rpx;"></image>
				<view style="font-size: 14px;margin-top: 20rpx;color: gray;">让每个人都能享受科技的乐趣</view>
			</view>
			<view style="padding: 0 30rpx;">
				<view style="font-size: 18px;font-weight: 700;margin-bottom: 40rpx;">小米账号登录</view>
				<view class="inpt">
					<cc-field :value.sync="value" type="tel" label="+86" @blur="handleBlur"></cc-field>
				</view>
				<view style="margin-top: 20rpx;font-size: 13px;color: red;" v-if="show">输入的正确手机号</view>
				<view style="margin: 80rpx 0;">
					<cc-button :disabled="disabled" block type="primary" round @click="yanzheng">下一步</cc-button>
				</view>
				<view class="displayF justify-contentC align-itemsC" style="color: gray;">
					<view @click="conversion">用户密码登录</view>
					<view style="margin: 0 20rpx;">|</view>
					<view @click="jump">立即注册</view>
				</view>
			</view>
		</view>
		<view v-if="num===2">
			<view class="logo displayF flex-directionC align-itemsC justify-contentC">
				<image src="../../static/logo.png" style="width: 60rpx;height: 60rpx;"></image>
				<view style="font-size: 14px;margin-top: 20rpx;color: gray;">让每个人都能享受科技的乐趣</view>
			</view>
			<view style="padding: 0 30rpx;">
				<view style="font-size: 18px;font-weight: 700;margin-bottom: 40rpx;">小米账号登录</view>
				<view class="inpt" style="margin-bottom: 30rpx;">
					<cc-field :value.sync="value1" type="tel" label="账号" @blur="handleBlur1" ></cc-field>
				</view>
				<view style="font-size: 13px;color: red;margin-bottom: 30rpx;" v-if="show1">输入的正确账号</view>
				<view class="inpt" style="margin-bottom: 30rpx;">
					<cc-field :value.sync="value2" label="密码" type="password" @blur="handleBlur2"></cc-field>
				</view>
				<view style="font-size: 13px;color: red;margin-bottom: 30rpx;" v-if="show2">输入的正确密码</view>
				<view style="margin: 80rpx 0;">
					<cc-button :disabled="disabled1" block type="primary" round @click="login">登录</cc-button>
				</view>
				<view class="displayF justify-contentC align-itemsC" style="color: gray;">
					<view @click="conversion1">手机号登录</view>
					<view style="margin: 0 20rpx;">|</view>
					<view @click="jump">立即注册</view>
				</view>
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
				disabled: true,
				show: false,
				num:1,
				value1:'',
				value2:'',
				show1: false,
				show2: false,
				disabled1: true
			}
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			},
			handleBlur() {
				if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.value)) {
					this.show = true
					this.disabled = true
				} else {
					this.show = false
					this.disabled = false
				}
			},
			conversion(){
				this.num=2
			},
			conversion1(){
				this.num=1
			},
			handleBlur1(){
				if(this.value1===""){
					this.show1=true
				}else{
					this.show1=false
				}
			},
			handleBlur2(){
				if(this.value2.trim().length<2||this.value2.trim().length>6){
					this.show2=true
				}else{
					this.show2=false
				}
			},
			...loginActions(["userLogin"]),
			login(){
				this.userLogin({
					username:this.value1,
					password:this.value2
				})
			},
			yanzheng(){
				uni.navigateTo({
					url:`/pages/yanzheng/yanzheng?value=${this.value}`
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...loginState(["userLoginList"])
		},
		watch: {
			value(val) {
				if (val === "") {
					this.show = false
					this.disabled = false
				} else {
					this.handleBlur()
				}
			},
			value1(val) {
				if (val === "") {
					this.show1 = false
				} else {
					this.handleBlur1()
					if(this.show1===false&&this.value2&&this.show2===false){
						this.disabled1=false
						console.log(11);
					}
				}
			},
			value2(val) {
				if (val === "") {
					this.show2 = false
				} else {
					this.handleBlur2()
					if(this.show1===false&&this.value1&&this.show2===false){
						this.disabled1=false
					}
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.logo {
		height: 400rpx;
	}
</style>
