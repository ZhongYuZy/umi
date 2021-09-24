<template>
  <view>
		<cc-address-edit @save="save" :addressInfo="addressInfo" v-if="addressInfo" @delete="deleted"></cc-address-edit>
		<cc-address-edit @save="save" v-if="!addressInfo" :showDelete="false"></cc-address-edit>
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
    props: {
		},
    data() {
      return {
				list:null,
				addressInfo:null,
				id:null
			}
    },
    methods: {
			...shopActions(["addAddress","delAddress"]),
			// 点击保存
			save(e){
				let user=uni.getStorageSync("user")
				this.addAddress({
					user_id:user._id,
					username:e.name,
					mobile:e.tel,
					address:`${e.province},${e.city},${e.county}`,
					detailAddress:e.addressDetail,
					isDefault:e.isDefault,
				})
				uni.navigateTo({
					url:"/pages/addressList/addressList"
				})
			},
			deleted(){
				let user=uni.getStorageSync("user")
				this.delAddress({
					addressId:this.id,
					user_id:user._id
				})
				uni.navigateTo({
					url:"/pages/addressList/addressList"
				})
			}
		},
    mounted() {

    },
    onLoad(e) {
			if(e.arr){
				this.id=JSON.parse(e.arr).id
				this.addressInfo=JSON.parse(e.arr)
				this.addressInfo.name=this.addressInfo.username
				this.addressInfo.province=this.addressInfo.address.split(" ")[0]
				this.addressInfo.city=this.addressInfo.address.split(" ")[1]
				this.addressInfo.county=this.addressInfo.address.split(" ")[2]
				this.addressInfo.addressDetail=this.addressInfo.detailAddress
			}
    },
    onShow() {

    },
    filters: {},
    computed: {
			...shopState(["addAddressList","delAddressList"]),
		},
    watch: {},
  }
</script>

<style scoped lang="scss">

</style>
