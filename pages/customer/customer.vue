<template>
	<view style="height: 100%;">
		<view class="head">
			<view class="srccu">
				<view v-for="(item,index) in messageList" :key="index" :id="`chatItem-${index}`">
					<view v-if="item.platform==='admin'" class="displayF justify-contentS">
						<view class="left">{{item.value}}</view>
					</view>
					<view v-else class="displayF justify-contentE" style="width: 710rpx;">
						<view class="right">{{item.value}}</view>
					</view>
				</view>
			</view>
			<view class="block"></view>
		</view>
		<view class="foot displayF align-itemsC">
			<cc-search :value.sync="value" icon="none" :showAction="false" placeholder=" " style="width: 500rpx;">
			</cc-search>
			<image src="../../static/emoji.png" style="width: 50rpx;height: 50rpx;margin-left: 20rpx;" @click="choose">
			</image>
			<cc-button round type="primary" style="height: 80rpx;margin-left: 50rpx;" @click="send">发送
			</cc-button>
		</view>
		<cc-popup :show.sync="show" mode="bottom" height="500">
			<view class="displayF flex-wrapW">
				<view v-for="(item,index) in emojiList" :key="index" class="box" @click="add(item)">
					{{item}}
				</view>
			</view>
		</cc-popup>
	</view>

</template>

<script>
	import emoji from "../../lib/emoji.js"
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				show: false,
				emojiList: emoji,
				user: '',
				messageList: [],
			}
		},
		methods: {
			choose() {
				this.show = true
			},
			add(item) {
				this.value = this.value + `${item}`
				this.show = false
			},
			send() {
				if (this.value) {
					this.$socket.emit('event', {
						username: this.user.username,
						value: this.value,
						platform: 'app'
					})
					this.value = ""
				}
			}
		},
		mounted() {
			this.user = uni.getStorageSync("user")
			this.$socket.on('broadcast', val => {
				this.messageList.push(val)
			})
			// this.$socket.on('disconnect',val=>{
			// 	if(val) this.mask=true
			// })
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			messageList: {
				handler(val) {
					this.$nextTick(() => {
						let top = 0
						let length = this.messageList.length
						if (length) {
							for (let i = 0; i < length; i++) {
								let chatItem = uni.createSelectorQuery().in(this).select(`#chatItem-${i}`)
									.boundingClientRect(res => {
										top += res.height
										// 滚动方法
										uni.pageScrollTo({
											// 距离顶部的位置
											scrollTop: top,
											duration: 0
										})
									}).exec()
							}
						}

					})
				},
				deep: true
			}
		},
	}
</script>

<style scoped lang="scss">
	.foot {
		padding: 20rpx 0;
		border-top: 1px solid #eeeeee;
		position: fixed;
		background: white;
		bottom: 0;
		left: 0;
	}

	.box {
		flex: 1;
		font-size: 20px;
		padding: 20rpx 20rpx 0 20rpx;
	}

	.head {
		height: 1120rpx;
		padding: 0 20rpx 0 20rpx;
	}

	/* #ifdef H5 */
	.srccu {
		overflow-y: scroll;
	}

	.block {
		height: 122rpx;
	}

	.left {
		padding: 5px 10px;
		border-radius: 5px;
		background: #ededed;
		margin-bottom: 10px;
		max-width: 710rpx;
		word-wrap: break-word;
	}

	.right {
		padding: 5px 10px;
		border-radius: 5px;
		background: #96ea6a;
		margin-bottom: 10px;
		max-width: 710rpx;
		word-wrap: break-word;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.srccu {
		overflow-y: scroll;
	}

	.block {
		height: 143rpx;
		
	}

	.left {
		padding: 5px 10px;
		border-radius: 5px;
		background: #ededed;
		margin-bottom: 10px;
		max-width: 670rpx;
		word-wrap: break-word;
	}

	.right {
		padding: 5px 10px;
		border-radius: 5px;
		background: #96ea6a;
		margin-bottom: 10px;
		max-width: 670rpx;
		word-wrap: break-word;
	}

	/* #endif */
</style>
