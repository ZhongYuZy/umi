<template>
  <view style="height: 100%;padding: 0 20rpx;">
    <view class="displayF">
			<view style="width: 118rpx;height: 100rpx;" class="displayF flex-directionC justify-contentC align-itemsC">
				<view style="font-size: 16px;font-weight: 700;">热卖中</view>
				<view style="font-size: 12px;">不能错过</view>
			</view>
			<view class="displayF">
				<view v-for="(item,index) in list1" :key="index" style="width: 118rpx;height: 100rpx;" class="displayF flex-directionC justify-contentC align-itemsC" @click="choose(index,item)">
					<view style="font-size: 16px;font-weight: 700;" :class="active===index?'color1':''">{{item}}:00</view>
					<view style="font-size: 12px;" class="color" :class="active===index?'color2':''">{{index===0?"抢购中":"即将开抢"}}</view>
				</view>
			</view>
		</view>
		<view>
			<view v-for="(item,index) in goodsList":key="index" class="word displayF">
				<image :src="item.goods[0].cover" mode="" style="width: 200rpx;height: 200rpx;"></image>
				<view style="width: 480rpx;">
					<view>{{item.goods[0].name}}</view>
					<view class="displayF justify-contentB align-itemsE">
						<view style="font-size: 18px;margin-top: 10rpx;color:#fd6727;font-weight: 700;">￥{{item.price}}<span style="font-size: 14px;color: gray;text-decoration: line-through;">￥{{item.goods[0].presentPrice}}</span></view>
						<view class="right displayF flex-directionC justify-contentC align-itemsC" :class="active!==0?'back':''">
							<view>{{active===0?"去抢购":"去预约"}}</view>
							<view style="width: 180rpx;margin-left: 20rpx;" v-if="active===0"><cc-progress
							 :percentage="percentage" 
							 bg-color="#ffffff" inBgColor="#eeeeee"></cc-progress></view>
						</view>
					</view>
				</view>
			</view>
		</view>
  </view>

</template>

<script>
	import dayjs from "dayjs"
	import {
		createNamespacedHelpers
	} from "vuex"
	let spikeModule = createNamespacedHelpers('spike')
	let {
		mapState: spikeState,
		mapActions: spikeActions
	} = spikeModule
  export default {
    components: {},
    props: {},
    data() {
      return {
				list:[
					0,
					8,
					10,
					12,
					14,
					16,
					18,
					20,
					22,
				],
				current:dayjs().hour()%2===0&&dayjs().hour()>=8?dayjs().hour():dayjs().hour()-1,
				active:0,
				goodsList:[],
				percentage:""
			}
    },
    methods: {
			...spikeActions(["getSeckill"]),
			choose(index,item){
				this.active=index
				this.current=item
				this.goodsList=[]
				if(this.getSeckillList){
					this.getSeckillList.map(i=>{
					let a=this.current
					let b=this.current+2
					let c=dayjs(i.start_time).hour()
					let d=dayjs(i.end_time).hour()
					if((c<a&&d>a)||(c>=a&&d<=b)||(c>=a&&d>b&&c<b)){
						this.goodsList.push(i)
					}
					})
				}
			}
		},
    mounted() {
		this.getSeckill()
    },
    onLoad() {

    },
    onShow() {

    },
    filters: {},
    computed: {
			...spikeState(["getSeckillList"]),
			list1(){
				let a=dayjs().hour()%2===0&&dayjs().hour()>=8?dayjs().hour():dayjs().hour()-1
				if(a===24){
					a=0
				}
				let n=this.list.indexOf(a)
				return this.list.slice(n,n+5)
			}
		},
    watch: {
			getSeckillList(val){
				if(val){
					val.map(i=>{
					let a=this.current
					let b=this.current+2
					let c=dayjs(i.start_time).hour()
					let d=dayjs(i.end_time).hour()
					if((c<a&&d>a)||(c>=a&&d<=b)||(c>=a&&d>b&&c<b)){
						this.goodsList.push(i)
						this.goodsList.map(item=>{
							this.percentage=Number((dayjs().valueOf()-dayjs(item.start_time).valueOf())/(dayjs(item.end_time).valueOf()-dayjs(item.start_time).valueOf())).toFixed(2)*100
						})
					}
					})
				}
				
			}
		},
  }
</script>

<style scoped lang="scss">
.color{
	padding: 5rpx;
	background: white;
	border-radius: 20rpx;
}
.color2{
	padding: 5rpx;
	background: red;
	border-radius: 20rpx;
	color: white;
}
.color1{
	color: red;
}
.word{
	background-color: #f8f8f8;
	border-radius: 10rpx;
	padding: 20rpx 0; 
	margin-top: 20rpx;
}
.right{
	width: 200rpx;
	height: 100rpx;
	background: red;
	border-radius: 10rpx;
	margin-top: 20rpx;
	color: white;
}
.back{
	background: green;
}
</style>
