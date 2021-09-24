import Vue from 'vue'
import App from './App'
import ccUI from 'cc-ui-uni-app'
import store from './store/index.js'
import utils from "./utils/utils.js"
import io from '@hyoga/uni-socket.io'; 
Vue.use(ccUI)
Vue.config.productionTip = false
Vue.prototype.$store=store
Vue.prototype.$utils=utils
App.mpType = 'app'
const socket = io('http://localhost:3000', { 
query: {}, 
transports: [ 'websocket', 'polling' ], 
timeout: 5000, 
}); 
Vue.prototype.$socket= socket
const app = new Vue({
    ...App,
		store
})
app.$mount()
