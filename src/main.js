import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// ui库
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 公共样式-组件
import commonalityStype from "./components";
Vue.use(commonalityStype);

import io from "socket.io-client";
// Vue.prototype.$socket = io.connect("http://60.205.200.110:7005");
// Vue.prototype.$socket = io.connect("https://60.205.200.110:7004");
// Vue.prototype.$socket = io.connect("https://192.168.0.188:7004");
// Vue.prototype.$socket = io.connect("http://192.168.1.44:7005");
// Vue.prototype.$socket = io.connect("https://192.168.1.44:7004");

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
