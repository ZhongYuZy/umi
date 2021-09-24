<template>
	<view>
		<view class="homesearch">
			<cc-search :value.sync="value" :showAction="false" @input="handleInput($event)"></cc-search>
		</view>
		<view style="padding-top: 80rpx;" v-if="show">
			<cc-index-bar v-if="getAreaListList.length>0">
				<view v-for="(item, index) in getAreaListList" :key="index" style="padding: 0 0 0 20rpx;">
					<view>{{item.py_head}}</view>
					<view v-for="(item1,index1) in item.name_list" :key="index1" @click="jump(item1)">
						<view>{{item1.name}}</view>
					</view>
				</view>
			</cc-index-bar>
		</view>
		<view v-else>
			<view v-if="list.data" style="padding-top: 80rpx;">
				<view v-if="list.data.area_list.length>0">
					<view v-for="(item,index) in list.data.area_list" :key="index" class="content" @click="jump(item)">
						{{item.name}}
					</view>
				</view>
				<view v-else>
					<view class="content">暂无数据</view>
				</view>
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
				value: "",
				show: true,
				list: []
			}
		},
		methods: {
			...myActions(["getAreaList", "searchAreaList"]),
			handleInput(e) {
				this.searchAreaList(e.detail.value)
			},
			jump(e) {
			uni.navigateTo({
				url:`/pages/map/map?arr=${JSON.stringify(e)}`
			})
			}
		},
		mounted() {
			this.getAreaList()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...myState(["getAreaListList", "searchAreaListList"])
		},
		watch: {
			value(val) {
				if (val === "") {
					this.show = true
				} else {
					this.show = false
				}
			},
			searchAreaListList(val) {
				if (val.data) {
					this.list = val
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.homesearch {
		position: fixed;
		width: 100%;
	}

	.content {
		padding: 10rpx 20rpx;
		border-bottom: 1px solid #eeeeee;
	}
</style>
