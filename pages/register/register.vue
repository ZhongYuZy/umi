<template>
	<view>
		<view class="body">
			<view style="font-size: 18px;font-weight: 700;">注册小米账号</view>
			<view style="color: #0B84FF;font-size: 13px;margin-top: 20rpx;">系统会根据您选择的国家/地区的法律法规存储您的个人信息</view>
			<view>
				<cc-form :model.sync="model" :rules="rules" ref="form">
					<cc-form-item label="手机号" prop="mobile">
						<cc-field :value.sync="model.mobile" :border="false"></cc-field>
					</cc-form-item>
					<cc-form-item label="验证码" prop="code">
						<cc-field :value.sync="model.code" :border="false"></cc-field>
						<view style="padding: 0 10rpx;width: 160rpx;color: #0B84FF;" @click="give" v-if="show">获取验证码
						</view>
						<view style="padding: 0 10rpx;width: 160rpx;" v-else>{{num}}秒后重新发送</view>
					</cc-form-item>
					<cc-form-item label="用户名" prop="username">
						<cc-field :value.sync="model.username" :border="false"></cc-field>
					</cc-form-item>
					<cc-form-item label="密码" prop="password">
						<cc-field type="password" :value.sync="model.password" :border="false"></cc-field>
					</cc-form-item>
					<cc-form-item>
						<cc-button type="primary" @click="submit" block round>提交</cc-button>
					</cc-form-item>
				</cc-form>
			</view>
			<cc-toast ref="cToast"></cc-toast>
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
			let checkAge = (rule, value, callback) => {
				if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value))
					return callback(new Error('请输入正确的手机号'));
				else {
					callback()
				}
			}
			return {
				model: {
					username: '',
					password: '',
					code: '',
					mobile: ''
				},
				rules: {
					username: [{
							required: true,
							message: '用户名不能为空',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 6,
							message: '用户名2-6位之间',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}],
					mobile: [{
							required: true,
							message: '手机号不能为空',
							trigger: 'blur'
						},
						{
							validator: checkAge,
							trigger: 'blur'
						}
					],
					code: [{
							required: true,
							message: '验证码不能为空',
							trigger: 'blur',
						},
						{
							min: 6,
							max: 6,
							message: '验证码为6位',
							trigger: 'blur'
						}
					]
				},
				show: true,
				num: 60
			}
		},
		methods: {
			give() {
				this.timer()
				this.getCode({
					mobile: this.model.mobile
				})
			},
			timer() {
				let a = setInterval(() => {
					if (this.num > 0) {
						this.num--
						this.show = false
					} else {
						clearInterval(a)
						this.num = 60
						this.show = true
					}
				}, 1000)
			},
			...loginActions(["getCode", "register"]),
			submit() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.register({
							mobile: this.model.mobile,
							code: this.model.code,
							username: this.model.username,
							password: this.model.password
						})
					} else {
						console.log('fail')
					}
				})
			},
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...loginState(["getCodeList", "registerList"])
		},
		watch: {
			// registerList: {
			// 	handler(val) {
			// 		if (val.code === 200) {
			// 			this.$refs.cToast.show({
			// 				// toast类型
			// 				title: val.msg,
			// 				type: 'success',
			// 				// 是否显示图标
			// 				icon: null,
			// 				// 自定义图标
			// 				customIcon: '',
			// 				// 是否加载状态
			// 				loading: null,
			// 				// 出现位置
			// 				position: null,
			// 				// 持续时间
			// 				duration: null,
			// 				// 结束跳转url
			// 				url: "/pages/login/login",
			// 				// 跳转传参
			// 				query: null,
			// 				// toast结束回调
			// 				callback: null,
			// 				// 结束后是否返回上一级 优先级高于url
			// 				back: null
			// 			})
			// 		} else {
			// 			this.$refs.cToast.show({
			// 				// toast类型
			// 				title: "注册失败",
			// 				type: 'error',
			// 				// 是否显示图标
			// 				icon: null,
			// 				// 自定义图标
			// 				customIcon: '',
			// 				// 是否加载状态
			// 				loading: null,
			// 				// 出现位置
			// 				position: null,
			// 				// 持续时间
			// 				duration: null,
			// 				// 结束跳转url
			// 				url: null,
			// 				// 跳转传参
			// 				query: null,
			// 				// toast结束回调
			// 				callback: null,
			// 				// 结束后是否返回上一级 优先级高于url
			// 				back: null
			// 			})
			// 		}
			// 	},
			// 	deep: true
			// }

		}
	}
</script>

<style scoped lang="scss">
	.body {
		background-color: #f8f8f8;
		height: 100vh;
		padding: 20rpx 40rpx;
	}
</style>
